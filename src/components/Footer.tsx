import Link from 'next/link'
import { ArrowUpRight, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react'
import { treatmentMenu } from '../data/treatments'
import { clinics } from '../data/clinics'
import { Brand, Button } from './ui'

// Footer shows the primary treatments; the full list lives in the header dropdown and /conditions.
const footerTreatments = treatmentMenu.filter(item => ['/single-tooth-implant', '/multiple-dental-implants', '/all-on-4-dental-implants', '/implant-supported-bridge', '/implant-retained-dentures', '/dentures', '/full-mouth-reconstruction', '/bone-graft-for-dental-implants'].includes(item.path))

export function Footer() {
  return <>
    <section className="regulation"><div className="container"><div><ShieldCheck size={27} strokeWidth={1.4} /><span>Trusted &amp; regulated<b>Registered with UK&apos;s Leading Healthcare Bodies</b></span></div><a href="https://www.gdc-uk.org/registration/the-register">GDC<span>General Dental Council<ArrowUpRight size={12} /></span></a><a href="https://www.cqc.org.uk/location/1-20629579981">CQC<span>Care Quality Commission<ArrowUpRight size={12} /></span></a></div></section>
    <footer className="footer"><div className="container"><div className="footer-grid">
      <div><Brand /><p>Established dental implants London practice with clinics in South Kensington and the City of London. Affordable teeth implants from £2,950 with 0% finance (subject to status), placed by GDC-registered implant dentists.</p><a href="https://www.instagram.com/dentalimplantlondon/" className="text-link">Instagram<ArrowUpRight size={15} /></a></div>
      <div><h3>Navigation</h3>{[['Meet the Team', '/team'], ['Smile Gallery', '/gallery'], ['Implant Cost', '/dental-implants-cost'], ['Areas We Serve', '/areas-we-serve'], ['Blog', '/blog'], ['FAQ', '/faq'], ['Contact Us', '/contact']].map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}</div>
      <div><h3>Treatments</h3>{footerTreatments.map(item => <Link href={item.path} key={item.path}>{item.title}</Link>)}<Link href="/conditions" className="footer-more">View all treatments<ArrowUpRight size={14} /></Link></div>
      <div><h3>Contact</h3>{clinics.map(clinic => <div className="footer-clinic" key={clinic.path}><Link href={clinic.path}><b>{clinic.name}</b></Link><span><MapPin size={14} />{clinic.address}</span><a href={`tel:${clinic.phone.replaceAll(' ', '')}`}><Phone size={14} />{clinic.phone}</a></div>)}<a href="mailto:info@dental-implants-london.co.uk"><Mail size={14} />info@dental-implants-london.co.uk</a></div>
    </div>
    <div className="footer-bottom"><span>© 2026 Dental Implants London. All rights reserved.</span><div className="footer-legal">{[['Terms and Conditions', '/terms'], ['Privacy Policy', '/privacy-policy'], ['Membership Policy', '/membership-policy'], ['Cookie Policy', '/cookie-policy'], ['Cancellation Policy', '/cancellation-policy'], ['Complaints Procedure', '/terms#complaints']].map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}</div></div>
    <div className="footer-bottom footer-registration"><span className="registration-copy">Dedicated Dental Implants Department of Medical &amp; Dental limited: CQC Registration 1-20629579981</span><a href="https://www.dubseo.co.uk/">Design &amp; Developed By DubSEO<ArrowUpRight size={13} /></a></div>
    </div></footer>
    <div className="mobile-booking"><a href="tel:02071833573" aria-label="Call our clinic"><Phone size={20} /></a><Button>Free 15-min chat</Button></div>
  </>
}
