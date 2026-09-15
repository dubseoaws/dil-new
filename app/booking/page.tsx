import type { Metadata } from 'next'
import { BookingPage } from '@/src/components/BookingPage'

export const metadata: Metadata = {
  title: 'Book Your Appointment | Dental Implants London',
  description: 'Request a dental implant consultation at our South Kensington or City of London clinic in a few simple steps.',
  robots: { index: false },
}

export default function Page() {
  return <BookingPage />
}
