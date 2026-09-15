'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, BadgeCheck, CalendarDays, Check, Clock3, Loader2, MapPin, Phone, ShieldCheck } from 'lucide-react'
import { clinics } from '../data/clinics'
import { services, isoDate, upcomingDays, slotsFor } from '../data/booking'

const stepNames = ['Service', 'Clinic', 'Date', 'Time', 'Details']
const dayFormat = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', weekday: 'short', day: 'numeric', month: 'short' })
const longDayFormat = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

export function BookingPage() {
  const [step, setStep] = useState(0)
  const [service, setService] = useState<(typeof services)[number] | null>(null)
  const [clinic, setClinic] = useState<(typeof clinics)[number] | null>(null)
  const [date, setDate] = useState<Date | null>(null)
  const [time, setTime] = useState('')
  const [details, setDetails] = useState({ name: '', email: '', phone: '', notes: '' })
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)
  const [reference, setReference] = useState('')
  const [days] = useState(upcomingDays)
  const pending = useRef(false)
  const submission = useRef({ payload: '', id: '' })
  const panel = useRef<HTMLDivElement>(null)
  const availableClinics = service?.clinic ? clinics.filter(item => item.path === service.clinic) : clinics
  const slots = clinic && date ? slotsFor(clinic.opening[date.getUTCDay()]) : []

  useEffect(() => { panel.current?.focus() }, [step, reference])

  const chooseService = (choice: (typeof services)[number]) => {
    setService(choice)
    if (choice.clinic && clinic && clinic.path !== choice.clinic) { setClinic(null); setDate(null); setTime('') }
    setStep(1)
  }
  const chooseClinic = (choice: (typeof clinics)[number]) => {
    setClinic(choice)
    setDate(null)
    setTime('')
    setStep(2)
  }

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (pending.current) return
    setError('')
    if (!service || !clinic || !date || !slots.includes(time)) return setError('Please complete every step before confirming.')
    pending.current = true
    setSending(true)
    try {
      const form = event.currentTarget as HTMLFormElement
      const payload = JSON.stringify({ service: service.name, clinic: clinic.name, date: isoDate(date), time, ...details, consent: true, website: new FormData(form).get('website') || '' })
      if (submission.current.payload !== payload) submission.current = { payload, id: crypto.randomUUID() }
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...JSON.parse(payload), submissionId: submission.current.id }),
        signal: AbortSignal.timeout(25000),
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok || typeof result.reference !== 'string') throw new Error(result.error || 'We could not send your request. Please call 020 71833573.')
      setReference(result.reference)
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Something went wrong. Please call 020 71833573.')
    } finally {
      pending.current = false
      setSending(false)
    }
  }

  if (reference) return <main id="main" className="booking-page"><div className="container"><div className="booking-confirmed" ref={panel} tabIndex={-1}>
    <span className="booking-confirmed-icon"><Check size={34} /></span>
    <h1>Your appointment request has been received</h1>
    <p>We have emailed your request to the clinic. A member of the team will contact you to confirm your slot.</p>
    <dl className="booking-summary">
      <div><dt>Reference</dt><dd>{reference}</dd></div>
      <div><dt>Service</dt><dd>{service!.name} · {service!.price}</dd></div>
      <div><dt>Clinic</dt><dd>{clinic!.name}</dd></div>
      <div><dt>Date</dt><dd>{longDayFormat.format(date!)}</dd></div>
      <div><dt>Time</dt><dd>{time}</dd></div>
      <div><dt>Name</dt><dd>{details.name}</dd></div>
      <div><dt>Email</dt><dd>{details.email}</dd></div>
      <div><dt>Phone</dt><dd>{details.phone}</dd></div>
    </dl>
    <div className="booking-confirmed-actions"><Link className="button" href="/">Back to homepage<ArrowRight size={17} /></Link><a className="text-link" href="tel:02071833573"><Phone size={16} />020 71833573</a></div>
  </div></div></main>

  return <main id="main" className="booking-page">
    <div className="container">
      <header className="booking-heading">
        <span className="eyebrow"><span />Online Booking</span>
        <h1>Book Your Appointment</h1>
        <p>Schedule your consultation in just a few simple steps</p>
        <div className="booking-badges"><span><span className="stars">★★★★★</span>4.9/5 from 247 Google Reviews</span><span><BadgeCheck size={16} />GDC Registered</span><span><ShieldCheck size={16} />Est. Implant Clinic</span></div>
      </header>

      <ol className="booking-steps">{stepNames.map((name, index) => <li key={name} className={index === step ? 'current' : index < step ? 'done' : ''} aria-current={index === step ? 'step' : undefined}><span>{index < step ? <Check size={14} /> : index + 1}</span>{name}</li>)}</ol>

      <div className="booking-assurances"><span><Check size={15} />No deposit required</span><span><Check size={15} />Free cancellation</span><a href="tel:02071833573"><Phone size={15} />020 71833573</a></div>

      <div className="booking-panel" ref={panel} tabIndex={-1}>
        {step === 0 && <section aria-labelledby="booking-service">
          <h2 id="booking-service">Select Your Service</h2>
          <p className="booking-panel-intro">Choose the treatment you would like to book</p>
          <div className="booking-options">{services.map(item => <button type="button" key={item.name} className={`booking-option${service?.name === item.name ? ' selected' : ''}`} onClick={() => chooseService(item)}>
            <span className="booking-option-title">{item.name}<b>{item.price}</b></span>
            <span className="booking-option-text">{item.text}</span>
          </button>)}</div>
        </section>}

        {step === 1 && <section aria-labelledby="booking-clinic">
          <h2 id="booking-clinic">Choose Your Clinic</h2>
          <p className="booking-panel-intro">{service?.clinic ? `${service.name} is available at our South Kensington clinic only.` : 'Select your preferred London clinic.'}</p>
          <div className="booking-options">{availableClinics.map(item => <button type="button" key={item.path} className={`booking-option${clinic?.path === item.path ? ' selected' : ''}`} onClick={() => chooseClinic(item)}>
            <span className="booking-option-title">{item.name}</span>
            <span className="booking-option-text"><MapPin size={15} />{item.address}</span>
            <span className="booking-option-text"><Clock3 size={15} />{item.hours.map(([day, hours]) => `${day} ${hours}`).join(' · ')}</span>
          </button>)}</div>
        </section>}

        {step === 2 && <section aria-labelledby="booking-date">
          <h2 id="booking-date">Pick a Date</h2>
          <p className="booking-panel-intro">Dates shown follow {clinic?.name} opening hours.</p>
          <div className="booking-dates">{days.map(day => {
            const closed = !clinic?.opening[day.getUTCDay()]
            return <button type="button" key={isoDate(day)} disabled={closed} className={`booking-date${date && isoDate(date) === isoDate(day) ? ' selected' : ''}`} onClick={() => { setDate(day); setTime(''); setStep(3) }}>
              <span>{dayFormat.format(day)}</span>{closed && <small>Closed</small>}
            </button>
          })}</div>
        </section>}

        {step === 3 && <section aria-labelledby="booking-time">
          <h2 id="booking-time">Choose a Time</h2>
          <p className="booking-panel-intro">{date && longDayFormat.format(date)} at {clinic?.name}</p>
          <div className="booking-times">{slots.map(slot => <button type="button" key={slot} className={`booking-time${time === slot ? ' selected' : ''}`} onClick={() => { setTime(slot); setStep(4) }}>{slot}</button>)}</div>
          <p className="booking-note">Times are in London local time and are requests, not guaranteed bookings. The clinic will confirm your slot by phone or email.</p>
        </section>}

        {step === 4 && <section aria-labelledby="booking-details">
          <h2 id="booking-details">Your Details</h2>
          <p className="booking-panel-intro">We use these details to confirm your appointment.</p>
          <form className="booking-form" onSubmit={submit} aria-busy={sending}>
            <fieldset className="booking-form-fields" disabled={sending}>
            <label>Full name<input name="name" autoComplete="name" required maxLength={120} value={details.name} onChange={event => setDetails({ ...details, name: event.target.value })} /></label>
            <label>Email<input name="email" type="email" autoComplete="email" required maxLength={160} value={details.email} onChange={event => setDetails({ ...details, email: event.target.value })} /></label>
            <label>Phone<input name="phone" type="tel" autoComplete="tel" required maxLength={40} pattern={'[0-9+\\(\\)\\s\\-]{7,}'} value={details.phone} onChange={event => setDetails({ ...details, phone: event.target.value })} /></label>
            <label className="booking-form-wide">Anything you would like us to know (optional)<textarea name="notes" rows={4} maxLength={2000} value={details.notes} onChange={event => setDetails({ ...details, notes: event.target.value })} /></label>
            <label hidden aria-hidden="true" className="booking-honeypot">Website<input name="website" autoComplete="off" tabIndex={-1} /></label>
            <label className="booking-consent booking-form-wide"><input type="checkbox" name="consent" required /><span>I agree to be contacted about this appointment request and have read the <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.</span></label>
            </fieldset>
            <dl className="booking-summary booking-form-wide">
              <div><dt><CalendarDays size={15} />Service</dt><dd>{service?.name} · {service?.price}</dd></div>
              <div><dt><MapPin size={15} />Clinic</dt><dd>{clinic?.name}</dd></div>
              <div><dt><Clock3 size={15} />When</dt><dd>{date && longDayFormat.format(date)} at {time}</dd></div>
            </dl>
            {error && <p className="booking-error booking-form-wide" role="alert">{error}</p>}
            <button type="submit" className="button booking-form-wide" disabled={sending}>{sending ? <>Sending<Loader2 className="booking-spinner" size={17} /></> : <>Confirm appointment request<ArrowRight size={17} /></>}</button>
          </form>
        </section>}
      </div>

      <div className="booking-navigation">
        <button type="button" className="text-link" onClick={() => setStep(step - 1)} disabled={step === 0 || sending}><ArrowLeft size={16} />Back</button>
        {step < 4 && <button type="button" className="button" onClick={() => setStep(step + 1)} disabled={(step === 0 && !service) || (step === 1 && !clinic) || (step === 2 && !date) || (step === 3 && !time)}>Continue<ArrowRight size={17} /></button>}
      </div>
    </div>
  </main>
}
