import Link from 'next/link'
import { ArrowUpRight, BadgeCheck, Plus, Quote } from 'lucide-react'
import home from '../data/home.json'
import { assets, dentists, faqs, imageFor, reviews } from '../data/site'
import { TeamControls } from './TeamControls'

export function SectionHeading({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return <div className="section-heading"><div><span className="eyebrow"><span />{eyebrow}</span><h2>{title}</h2></div>{children}</div>
}

export function GoogleReviews() {
  // The track holds two copies of the list so the translate loop is seamless.
  const loop = [...reviews, ...reviews]
  return <section className="review-section"><div className="container review-head"><div><span className="eyebrow"><span />Patient reviews</span><h2>What Our London <em>Patients Say</em></h2></div><div className="review-rating"><span className="google-g">G</span><strong>4.9<span>/5</span></strong><span><span className="stars">★★★★★</span><small>247 Google Reviews</small></span></div></div><div className="review-marquee"><div className="review-track" style={{ '--review-count': reviews.length } as React.CSSProperties}>{loop.map((review, index) => <figure className="review-card" key={`${review.name}-${index}`} aria-hidden={index >= reviews.length || undefined}><Quote className="review-quote" size={26} /><blockquote>{review.text}</blockquote><figcaption className="review-author"><span className="avatar">{review.initials}</span><span><b>{review.name}</b><small><span className="google-g">G</span>Google review</small></span><BadgeCheck size={17} /></figcaption></figure>)}</div></div><div className="container review-foot"><a className="text-link" href="https://share.google/FEhlEzh1JDaOMlqB0">View more patient reviews<ArrowUpRight size={17} /></a><small className="review-disclaimer">These are genuine reviews from our patients. Individual treatment outcomes may vary.</small></div></section>
}

export function TeamSection() {
  return <section className="section team-section" id="team"><div className="container"><SectionHeading eyebrow="Our team" title="London's Experienced Implant Dentists"><TeamControls /></SectionHeading><p className="section-intro">Our dentists with a special interest in dental implants are highly qualified professionals with years of experience in implant dentistry.</p><div className="team-track">{dentists.map(([name, role, gdc]) => <Link className="dentist" href="/team" key={name}><div className="dentist-photo"><img {...imageFor(name)} loading="lazy" /><span><ArrowUpRight size={22} /></span></div><div className="dentist-info"><h3>{name}</h3><span>{role}</span><small>GDC: {gdc}</small></div></Link>)}</div><Link href="/team" className="text-link team-link">Read full bios<ArrowUpRight size={17} /></Link></div></section>
}

export function SmileGallery() {
  return <section className="section gallery-strip"><div className="container"><SectionHeading eyebrow="Before &amp; after gallery" title="Dental Implants London Results"><Link href="/gallery" className="text-link">View full gallery<ArrowUpRight size={17} /></Link></SectionHeading><div className="gallery-grid">{home.images.filter(image => image.alt.startsWith('Dental implants London')).map(image => <Link href="/gallery" key={image.src}><img src={assets[image.src] || image.src} alt={image.alt} loading="lazy" /><ArrowUpRight size={19} /></Link>)}</div><small>Individual results may vary. Photographs shown with patient consent.</small></div></section>
}

export function FaqSection() {
  return <section className="section faq-section" id="faq"><div className="container faq-layout"><div><span className="eyebrow"><span />FAQs</span><h2>Dental Implants<br /><em>London FAQs</em></h2><p>Got questions about dental implants in London? Find answers below or visit our <Link href="/faq">full FAQ page.</Link></p><Link className="text-link" href="/faq">Full FAQ page<ArrowUpRight size={17} /></Link></div><div className="faq-list">{faqs.map(([question, answer], index) => <details key={question} open={index === 0}><summary>{question}<Plus size={19} /></summary><p>{answer}</p></details>)}</div></div></section>
}

// Blog articles, the pricing page and booking keep their own focused layout.
export function PageSections({ path }: { path: string }) {
  const isBlogArticle = path.startsWith('/blog/') && !path.startsWith('/blog/page/')
  if (isBlogArticle || path === '/dental-implants-cost' || path === '/booking') return null
  return <>
    <GoogleReviews />
    {path !== '/faq' && <FaqSection />}
    {path !== '/gallery' && <SmileGallery />}
    {path !== '/team' && <TeamSection />}
  </>
}
