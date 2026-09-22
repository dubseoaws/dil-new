import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { booking } from '../data/treatments'
import { BrandMark } from './BrandMark'

export function Brand() {
  return <Link href="/" className="brand" aria-label="Dental Implants London home"><BrandMark /><span>Dental Implants<span className="brand-city">LONDON</span></span></Link>
}

export function Button({ children, href = booking, light = false, onClick }: { children: React.ReactNode; href?: string; light?: boolean; onClick?: () => void }) {
  const className = `button ${light ? 'button-light' : ''}`
  if (!href.startsWith('/')) return <a className={className} href={href} onClick={onClick}>{children}<ArrowUpRight size={17} /></a>
  return <Link className={className} href={href} onClick={onClick}>{children}<ArrowUpRight size={17} /></Link>
}
