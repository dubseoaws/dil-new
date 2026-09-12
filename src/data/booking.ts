export const services = [
  { name: '1-Hour Implant Consultation', price: '\u00a380', text: 'In-depth consultation with Dr Sam Parsno \u2014 \u00a380 deducted from treatment cost. Available at our South Kensington clinic only', clinic: '/south-kensington' },
  { name: 'Free 15-Min Implant Chat', price: 'FREE', text: 'Quick chat to see if dental implants are right for you' },
  { name: 'Free Cosmetic Consultation', price: 'FREE', text: 'Complimentary consultation to discuss your cosmetic dental goals' },
  { name: 'Dentist', price: '\u00a330', text: 'General dental examination and consultation' },
  { name: 'Hygienist', price: '\u00a349', text: 'Professional teeth cleaning and oral hygiene treatment' },
  { name: 'Emergency Dentist', price: '\u00a330', text: 'Urgent dental care when you need it most' },
  { name: 'Home Teeth Whitening', price: '\u00a3199', text: 'Professional whitening kit for use at home' },
]

export const isoDate = (date: Date) => date.toISOString().slice(0, 10)
export const upcomingDays = () => {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date())
  const part = (name: string) => parts.find(item => item.type === name)!.value
  const today = new Date(`${part('year')}-${part('month')}-${part('day')}T12:00:00Z`)
  return Array.from({ length: 28 }, (_, offset) => {
    const date = new Date(today)
    date.setUTCDate(date.getUTCDate() + offset + 1)
    return date
  })
}

export const slotsFor = (opening: [number, number] | null) => {
  if (!opening) return []
  const [open, close] = opening
  const slots: string[] = []
  for (let minutes = open * 60; minutes <= close * 60 - 60; minutes += 30) {
    slots.push(`${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`)
  }
  return slots
}