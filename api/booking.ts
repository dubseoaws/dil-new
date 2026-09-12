import type { IncomingMessage, ServerResponse } from 'node:http'
import { clinics } from '../src/data/clinics.ts'
import { services, upcomingDays, isoDate, slotsFor } from '../src/data/booking.ts'

type BookingRequest = IncomingMessage & { body?: unknown }
const attempts = new Map<string, { count: number; expires: number }>()

const fields = ['service', 'price', 'clinic', 'clinicAddress', 'date', 'dateLabel', 'time', 'name', 'email', 'phone', 'notes'] as const
type Field = (typeof fields)[number]
const limits: Record<Field, number> = { service: 120, price: 20, clinic: 120, clinicAddress: 200, date: 10, dateLabel: 80, time: 5, name: 120, email: 160, phone: 40, notes: 2000 }
const required: Field[] = ['service', 'clinic', 'date', 'time', 'name', 'email', 'phone']

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]!)
const singleLine = (value: string) => value.replace(/[\r\n]+/g, ' ').trim()

const readBody = async (request: BookingRequest) => {
  if (Number(request.headers['content-length']) > 32_000) throw new Error('Request too large')
  if (request.body && typeof request.body === 'object') {
    if (JSON.stringify(request.body).length > 32_000) throw new Error('Request too large')
    return request.body as Record<string, unknown>
  }
  if (typeof request.body === 'string' && Buffer.byteLength(request.body) > 32_000) throw new Error('Request too large')
  if (typeof request.body === 'string') return JSON.parse(request.body) as Record<string, unknown>
  const chunks: Buffer[] = []
  let size = 0
  for await (const chunk of request) {
    size += (chunk as Buffer).length
    if (size > 32_000) throw new Error('Request too large')
    chunks.push(chunk as Buffer)
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}') as Record<string, unknown>
}

const send = (response: ServerResponse, status: number, payload: unknown) => {
  response.statusCode = status
  response.setHeader('Content-Type', 'application/json')
  response.setHeader('Cache-Control', 'no-store')
  response.end(JSON.stringify(payload))
}

export default async function handler(request: BookingRequest, response: ServerResponse) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return send(response, 405, { error: 'Method not allowed' })
  }
  try {
    if (!request.headers.origin || new URL(request.headers.origin).host !== request.headers.host) throw new Error('Invalid origin')
  } catch {
    return send(response, 403, { error: 'Please submit your request from our booking page.' })
  }
  if (!request.headers['content-type']?.startsWith('application/json')) return send(response, 415, { error: 'JSON required.' })
  const now = Date.now()
  for (const [key, attempt] of attempts) if (attempt.expires <= now) attempts.delete(key)
  const address = process.env.VERCEL ? String(request.headers['x-real-ip'] || 'unknown') : request.socket.remoteAddress || 'unknown'
  const attempt = attempts.get(address) || { count: 0, expires: now + 15 * 60_000 }
  if (attempt.count >= 5 || (!attempts.has(address) && attempts.size >= 5000)) {
    response.setHeader('Retry-After', '900')
    return send(response, 429, { error: 'Too many requests. Please try again later or call 020 71833573.' })
  }
  attempt.count++
  attempts.set(address, attempt)

  let raw: Record<string, unknown>
  try {
    raw = await readBody(request)
    if (!raw || Array.isArray(raw) || typeof raw !== 'object') throw new Error('Invalid body')
  } catch {
    return send(response, 400, { error: 'Could not read your booking request.' })
  }

  const booking = {} as Record<Field, string>
  for (const field of fields) {
    const value = typeof raw[field] === 'string' ? raw[field].trim() : ''
    if (value.length > limits[field]) return send(response, 400, { error: `The ${field} field is too long.` })
    booking[field] = field === 'notes' ? value : singleLine(value)
  }
  const missing = required.filter(field => !booking[field])
  if (missing.length) return send(response, 400, { error: 'Please complete every step before confirming.' })
  if (raw.website || raw.consent !== true) return send(response, 400, { error: 'Please check your details and contact permission.' })
  if (typeof raw.submissionId !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(raw.submissionId)) return send(response, 400, { error: 'Please reload the booking page and try again.' })
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(booking.email)) return send(response, 400, { error: 'Please enter a valid email address.' })
  if (!/^[0-9+()\s-]{7,}$/.test(booking.phone)) return send(response, 400, { error: 'Please enter a valid phone number.' })
  if (!/^\d{4}-\d{2}-\d{2}$/.test(booking.date) || !/^\d{2}:\d{2}$/.test(booking.time)) return send(response, 400, { error: 'Please choose a valid date and time.' })
  const service = services.find(item => item.name === booking.service)
  const clinic = clinics.find(item => item.name === booking.clinic)
  const date = upcomingDays().find(item => isoDate(item) === booking.date)
  if (!service || !clinic || (service.clinic && service.clinic !== clinic.path) || !date || !slotsFor(clinic.opening[date.getUTCDay()]).includes(booking.time)) {
    return send(response, 400, { error: 'Please choose a valid service, clinic and preferred time within the next 28 days.' })
  }
  booking.price = service.price
  booking.clinicAddress = clinic.address
  booking.dateLabel = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(date)

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.BOOKING_EMAIL_TO
  const from = process.env.BOOKING_EMAIL_FROM
  if (!apiKey || !to || !from) {
    console.error('Booking email is not configured: set RESEND_API_KEY, BOOKING_EMAIL_TO and BOOKING_EMAIL_FROM.')
    return send(response, 500, { error: 'Online booking is temporarily unavailable. Please call 020 71833573.' })
  }

  const reference = `DIL-${raw.submissionId.toUpperCase()}`
  const rows: [string, string][] = [
    ['Reference', reference],
    ['Service', `${booking.service}${booking.price ? ` (${booking.price})` : ''}`],
    ['Clinic', `${booking.clinic}${booking.clinicAddress ? `, ${booking.clinicAddress}` : ''}`],
    ['Date', booking.dateLabel || booking.date],
    ['Preferred time (Europe/London)', booking.time],
    ['Name', booking.name],
    ['Email', booking.email],
    ['Phone', booking.phone],
    ['Notes', booking.notes || '—'],
    ['Contact permission', 'Granted for this appointment request'],
  ]
  const html = `<h2 style="font-family:system-ui,sans-serif">New appointment request</h2><table style="font-family:system-ui,sans-serif;font-size:15px;border-collapse:collapse">${rows
    .map(([label, value]) => `<tr><th align="left" style="padding:6px 16px 6px 0;vertical-align:top;color:#555">${escapeHtml(label)}</th><td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`)
    .join('')}</table>`

  try {
    const email = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json', 'Idempotency-Key': raw.submissionId },
      signal: AbortSignal.timeout(15000),
      body: JSON.stringify({
        from,
        to: to.split(',').map(address => address.trim()).filter(Boolean),
        reply_to: booking.email,
        subject: `Appointment request ${reference} — ${booking.service} at ${booking.clinic}`,
        html,
        text: rows.map(([label, value]) => `${label}: ${value}`).join('\n'),
      }),
    })
    if (!email.ok) {
      console.error('Resend rejected the booking email:', email.status)
      return send(response, 502, { error: 'We could not send your request. Please call 020 71833573.' })
    }
    const result = await email.json() as { id?: string }
    if (!result.id) return send(response, 502, { error: 'We could not confirm your request was sent. Please call 020 71833573.' })
  } catch {
    console.error('Booking email request failed.')
    return send(response, 502, { error: 'We could not send your request. Please call 020 71833573.' })
  }

  return send(response, 200, { reference })
}
