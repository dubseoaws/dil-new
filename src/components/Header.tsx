'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, ArrowUpRight, ChevronDown, MapPin, Menu, Phone, X } from 'lucide-react'
import { treatmentMenu } from '../data/treatments'
import { Brand, Button } from './ui'


//All done
// content fixed


export function Header() {
  const pathname = usePathname()
  const [openedAt, setOpenedAt] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const menuOpen = openedAt === pathname // navigating away closes the menu
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpenedAt(null) }
    document.addEventListener('keydown', close)
    return () => document.removeEventListener('keydown', close)
  }, [])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  // Client-side navigation leaves the nav link focused, so :focus-within would hold the dropdown open.
  useEffect(() => {
    const active = document.activeElement
    if (active instanceof HTMLElement && active.closest('.site-header')) active.blur()
  }, [pathname])
  const current = (path: string) => (pathname === path || (path !== '/' && pathname.startsWith(`${path}/`)) ? 'page' : undefined)
  return <>
    <div className="topbar"><div className="container topbar-inner"><span><MapPin size={13} /><Link href="/south-kensington">South Kensington · 7 days</Link><span className="top-divider" /><Link href="/city-of-london">City of London · St Paul&apos;s</Link></span><a href="tel:02071833573"><Phone size={13} />020 71833573</a></div></div>
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}><div className="container header-inner"><Brand /><nav aria-label="Main navigation" className="desktop-nav"><div className="nav-dropdown"><Link href="/conditions" aria-current={current('/conditions')}>Treatments <ChevronDown size={13} /></Link><div className="dropdown-panel">{treatmentMenu.map(item => <Link href={item.path} key={item.path}>{item.title}<ArrowUpRight size={14} /></Link>)}<Link href="/missing-teeth">Missing Teeth<ArrowUpRight size={14} /></Link><Link href="/conditions">Conditions We Treat<ArrowRight size={14} /></Link></div></div><Link href="/dental-implants-cost" aria-current={current('/dental-implants-cost')}>Implant Cost</Link><Link href="/team" aria-current={current('/team')}>Meet the Team</Link><Link href="/gallery" aria-current={current('/gallery')}>Smile Gallery</Link><Link href="/contact" aria-current={current('/contact')}>Contact Us</Link></nav><div className="header-actions"><Button>Book consultation</Button><button className="icon-button menu-toggle" onClick={() => setOpenedAt(menuOpen ? null : pathname)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="mobile-navigation">{menuOpen ? <X /> : <Menu />}</button></div></div>
    {menuOpen && <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">{[['Treatments', '/conditions'], ['Implant Cost', '/dental-implants-cost'], ['Meet the Team', '/team'], ['Smile Gallery', '/gallery'], ['Contact Us', '/contact'], ['FAQs', '/faq']].map(([label, path]) => <Link href={path} key={path} aria-current={current(path)} onClick={() => setOpenedAt(null)}>{label}<ArrowUpRight size={18} /></Link>)}<Button onClick={() => setOpenedAt(null)}>Book consultation</Button></nav>}</header>
  </>
}
