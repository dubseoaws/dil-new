import type { Metadata, Viewport } from 'next'
import { Header } from '@/src/components/Header'
import { Footer } from '@/src/components/Footer'
import '@/src/index.css'
import '@/src/App.css'
import '@/src/InnerPage.css'
import '@/src/AllOnFour.css'
import '@/src/ClinicLocations.css'
import '@/src/BookingPage.css'

export const metadata: Metadata = {
  title: 'Dental Implants London | From £2,950 | Two London Clinics',
  description: 'Trusted dental implants London clinic with highly experienced dentists. Premium dental implants from £2,950. Clinics in South Kensington and the City of London.',
  icons: { icon: [{ url: '/clinic-favicon.svg', type: 'image/svg+xml', sizes: 'any' }] },
}

export const viewport: Viewport = { themeColor: '#153e75' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en">
    <body>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      {children}
      <Footer />
    </body>
  </html>
}
