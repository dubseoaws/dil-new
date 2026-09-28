import Link from 'next/link'
import type { Metadata } from 'next'
import { Button } from '@/src/components/ui'

export const metadata: Metadata = { title: 'Page not found | Dental Implants London' }

const suggestions = [
  { href: '/conditions', label: 'Implant treatments', detail: 'Single tooth, All-on-4, bridges and dentures' },
  { href: '/dental-implants-cost', label: 'Implant cost', detail: 'Transparent pricing from £2,950 with 0% finance' },
  { href: '/gallery', label: 'Smile gallery', detail: 'Before and after results from our clinics' },
  { href: '/contact', label: 'Contact us', detail: 'South Kensington and City of London clinics' },
]

export default function NotFound() {
  return <main id="main" className="route-state">
    <div className="container route-state-inner">
      <div className="route-state-copy">
        <span className="eyebrow"><span />Error 404</span>
        <h1>This page has <em>moved on.</em></h1>
        <p>The page you were looking for is no longer here. Let us point you towards the treatment information, pricing or clinic details you need.</p>
        <div className="route-state-actions">
          <Button href="/">Back to homepage</Button>
          <Link className="text-link" href="/booking">Book a consultation</Link>
        </div>
      </div>
      <nav className="route-state-links" aria-label="Suggested pages">
        {suggestions.map(item => <Link key={item.href} href={item.href}>
          <strong>{item.label}</strong>
          <span>{item.detail}</span>
        </Link>)}
      </nav>
    </div>
  </main>
}
