import Link from 'next/link'
import { ArrowRight, ArrowUpRight, BadgeCheck, CalendarDays, Check, HeartHandshake, MoveHorizontal, Phone, ShieldCheck } from 'lucide-react'
import { localBookingHtml } from '@/lib/html'
import home from '../data/home.json'
import { imageFor } from '../data/site'
import { booking, finance } from '../data/treatments'
import { Button } from './ui'
import { Compare } from './Compare'
import { HeroVideos } from './HeroVideos'
import { TreatmentTabs } from './TreatmentTabs'
import { ClinicLocations } from './ClinicLocations'
import { FaqSection, GoogleReviews, SectionHeading, SmileGallery, TeamSection } from './PageSections'

const steps = [
  ['Initial Consultation', 'Your journey starts with a consultation, including CT scans and X-rays, to check your eligibility and devise a personalised treatment plan for you.'],
  ['Implant Placement', 'A titanium implant is placed surgically into the jawbone, functioning as a secure tooth root. Recovery takes 3-6 months with a temporary denture provided.'],
  ['Abutment Attachment', 'After healing, an abutment is placed onto the implant, offering the stable foundation required for your final crown.'],
  ['Crown Placement', 'A custom made crown is then fitted on your teeth, restoring the full function and natural aesthetics of your smile.'],
]

function SourceSection({ title }: { title: string }) {
  const section = home.sections.find(section => section.title.includes(title))
  if (!section) return null
  if (title === 'Dental Implants Cost in London') return <section className="section cost-section"><div className="container"><SectionHeading eyebrow="Affordable pricing" title={title}><Link href="/dental-implants-cost" className="text-link">Complete dental implants cost guide<ArrowUpRight size={17} /></Link></SectionHeading><p className="cost-intro">The cost of dental implants in London typically ranges around £3,000 to £4,000 for a single implant with crown and abutment. At our South Kensington clinic, we believe in accessible excellence. By focusing on efficiency and expertise, we offer premium implants including Zirconia crowns starting from £2,950*.</p><div className="cost-table-wrap"><table className="cost-table"><thead><tr><th scope="col">Treatment / Service</th><th scope="col">Dental Implants London<small>Our Price</small></th><th scope="col">Other London Clinics<small>Standard Price</small></th></tr></thead><tbody>{[['Single Implant + Crown', 'From £2,950*', 'From £3,000'], ['Full Arch (All-on-4)', 'From £12,995', 'From £15,000'], ['Implant Quality', 'Premium', 'Varies (Often Standard)'], ['Consultation', 'Free Initial Assessment', 'from £150']].map(([label, price, other]) => <tr key={label}><th scope="row">{label}</th><td><Check size={15} />{price}</td><td>{other}</td></tr>)}</tbody></table></div><p className="cost-note">*All-inclusive implant price covering the implant, abutment and zirconia crown. 0% finance available over 12 months, subject to status.</p><p className="cost-note">Want to know more? See our <Link href="/dental-implants-cost">complete dental implants cost guide</Link> with finance options and what&apos;s included.</p><div className="cost-actions"><Button>Book consultation</Button><a className="text-link" href="tel:02071833573">Call 020 71833573<Phone size={15} /></a></div></div></section>
  const style = title.startsWith('What') ? 'understanding' : title.startsWith('Who') ? 'candidacy' : title.includes('Longevity') ? 'longevity' : 'quality'
  return <section className={`source-band source-${style}`}><div className="container source-copy" dangerouslySetInnerHTML={{ __html: localBookingHtml(section.html || '') }} /></section>
}

export function HomePage() {
  return <main id="main">
    <section className="hero hero-with-videos"><div className="container hero-inner"><div className="hero-content"><div className="hero-introduction"><span className="eyebrow"><span />Established implant clinic in London</span><h1>Dental Implants<br /><em>London.</em></h1><a className="hero-reviews" href="https://share.google/FEhlEzh1JDaOMlqB0"><span className="google-g">G</span><span><span className="stars">★★★★★</span><span className="review-score"><b>4.9/5</b> from 247 Google Reviews</span></span><ArrowUpRight size={15} /></a></div><div className="hero-booking"><p className="hero-description">Trusted dental implants London clinic with highly experienced dentists. Get natural-looking, long-lasting dental implants with premium quality at affordable prices.</p><div className="hero-price"><span>From <strong>£2,950</strong></span><span className="price-divider" /><span>Or from <strong className="monthly">£67.80<small>/mo*</small></strong></span></div><div className="hero-buttons"><Button>Free 15-min chat</Button><Link className="text-link" href={booking}>1-hour consultation · £80<ArrowUpRight size={16} /></Link></div></div></div><HeroVideos /></div></section>
    <section className="trust-strip"><div className="container trust-grid">{[{ Icon: ShieldCheck, title: 'Premium Quality', text: 'Premium Zirconia Crown' }, { Icon: CalendarDays, title: '0% Finance*', text: 'Available over 12 months' }, { Icon: BadgeCheck, title: 'GDC Registered', text: 'Experienced Dentists' }, { Icon: HeartHandshake, title: 'Long-Term Care', text: 'Ongoing support and aftercare included' }].map(({ Icon, title, text }) => <div className="trust-item" key={title}><Icon size={27} strokeWidth={1.35} /><div><b>{title}</b><span>{text}</span></div></div>)}</div></section>
    <div className="container finance-disclaimer">*Representative example: Borrow £2,950 over 60 months at 14.9% APR. Monthly payment £67.80. Total amount payable £4,068. Finance subject to status. 0% APR available over 12 months. <a href={finance}>Calculate your finance here <ArrowUpRight size={12} /></a></div>

    <section className="section intro-section"><div className="container intro-grid"><div><span className="eyebrow"><span />Established implant clinics in London</span><h2>Dental Implants London:<br /><em>Two Convenient<br />Clinic Locations</em></h2><a href="#clinics" className="text-link">Visit our clinics<ArrowUpRight size={17} /></a></div><div className="intro-copy"><p>Looking for dental implants in London? With clinics in <Link href="/south-kensington">South Kensington</Link> and the <Link href="/city-of-london">City of London near St Paul&apos;s</Link>, there&apos;s a Dental Implants London clinic near you. Our London dental implants are placed by GDC-registered dentists with 50+ years of combined experience in implant dentistry, using premium titanium implants that integrate seamlessly with your jawbone.</p><p>Whether you need a <Link href="/single-tooth-implant">single tooth implant</Link>, <Link href="/implant-retained-dentures">implant-retained dentures</Link>, or full mouth restoration with All-on-4, we offer affordable dental implants London patients trust, starting from just £2,950.</p><div className="intro-stat"><strong>50+</strong><span>years combined<br />experience</span><span className="stat-separator" /><strong>4.9<span>★</span></strong><span>rated on<br />Google Reviews</span></div></div></div></section>

    <section className="section treatments-section" id="treatments"><div className="container"><SectionHeading eyebrow="Implant treatments" title="Dental Implant Services London"><Link className="text-link" href="/conditions">Conditions We Treat<ArrowUpRight size={17} /></Link></SectionHeading><TreatmentTabs visual={imageFor('State of the art')} /></div></section>

    <section className="section results-section" id="results"><div className="container results-grid"><div className="results-copy"><span className="eyebrow"><span />Before &amp; after gallery</span><h2>Dental Implants<br /><em>London Results</em></h2><p>Individual results may vary. Photographs shown with patient consent.</p><Link className="text-link" href="/gallery">View full gallery<ArrowUpRight size={17} /></Link><div className="result-detail"><ShieldCheck size={23} strokeWidth={1.3} /><span>Premium titanium implants<br /><b>Premium Zirconia Crown</b></span></div></div><div><Compare before={imageFor('Before dental')} after={imageFor('After dental')} /><div className="comparison-footnote"><span><MoveHorizontal size={15} />Before / After</span><span>Individual results may vary</span></div></div></div></section>

    <section className="signature-section" id="pricing"><div className="container signature-grid"><div><span className="eyebrow"><span />Transparent pricing</span><h2>The Signature<br /><em>Implant.</em></h2><p>Premium dental implants including a Zirconia crown, from £2,950 per tooth. One all-inclusive price covering the implant, abutment and crown — with no hidden extras.</p><div className="signature-tags"><span>High quality</span><span>Competitive pricing</span><span>Same day consultations</span></div></div><div className="signature-price"><span className="eyebrow">All-inclusive price</span><div className="large-price"><span>from</span>£2,950<sup>*</sup></div><span className="per-tooth">Per tooth · Implant, abutment and Zirconia crown</span><ul>{['Premium Zirconia Crown', 'Long-term Guarantee Available (Conditions Apply)', 'Priority Appointments', '0% Finance Available (subject to status)'].map(item => <li key={item}><Check size={17} />{item}</li>)}</ul><Button light>Book free consultation</Button><Link className="signature-consult" href={booking}>1-hour consultation · £80<ArrowUpRight size={15} /></Link><small>*All-inclusive price per tooth covering the implant, abutment and Zirconia crown. 0% finance available over 12 months, subject to status. <Link href="/terms">Terms apply.</Link></small></div></div></section>

    <SourceSection title="Dental Implants Cost in London" />
    <SourceSection title="What Are Dental Implants?" />

    <section className="section process-section"><div className="container"><SectionHeading eyebrow="Treatment process" title="How Dental Implants Work"><p>Understanding the dental implant procedure helps you make informed decisions. Here is a step-by-step breakdown of how we place dental implants at our London clinic.</p></SectionHeading><div className="process-grid">{steps.map(([title, text], index) => <div className="process-step" key={title}><div className="step-number"><span>0{index + 1}</span>{index < 3 && <ArrowRight size={17} />}</div><h3>{title}</h3><p>{text}</p></div>)}</div><div className="process-note"><span>“Proper care ensures dental implants serve as a long-lasting solution for missing teeth.”</span><Link href="/dental-implants-cost" className="text-link">View Dental Implant Costs<ArrowUpRight size={17} /></Link></div></div></section>

    <SourceSection title="Who Can Get Dental Implants?" />
    <SourceSection title="Dental Implant Longevity" />
    <SourceSection title="Quality Dental Implants" />

    <TeamSection />

    <GoogleReviews />

    <SmileGallery />

    <section className="section clinics-section" id="clinics"><div className="container"><SectionHeading eyebrow="Two London Locations" title="Our Clinic Locations"><p>With two London clinics — South Kensington and the City of London — we welcome patients from across the capital. Looking for dental implants near me in London? One of our clinics is close by, each with excellent transport links.</p></SectionHeading><ClinicLocations /><Link href="/areas-we-serve" className="text-link areas-link">View all areas we serve<ArrowUpRight size={17} /></Link></div></section>

    <FaqSection />
    <section className="contact-band"><div className="container"><div><span className="eyebrow">Visit our clinics</span><h2>Get in Touch</h2></div><div><Button light>Free 15-min chat</Button><a className="contact-phone" href="tel:02071833573"><Phone size={18} />020 71833573</a></div></div></section>
  </main>
}
