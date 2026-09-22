import Link from 'next/link'
import { ArrowUpRight, Plus } from 'lucide-react'
import home from '../data/home.json'
import { assets, dentists, faqs, imageFor, reviews } from '../data/site'
import { GoogleG, GoogleStars, GoogleWordmark } from './GoogleMarks'
import { TeamControls } from './TeamControls'

const REVIEW_PROFILE = 'https://share.google/FEhlEzh1JDaOMlqB0'
const AVATAR_COLOURS = ['#1a73e8', '#c5221f', '#137333', '#b06000', '#8430ce', '#00697d']

function avatarColour(seed: string) {
  let total = 0
  for (let index = 0; index < seed.length; index += 1) total += seed.charCodeAt(index)
  return AVATAR_COLOURS[total % AVATAR_COLOURS.length]
}

export function SectionHeading({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return <div className="section-heading"><div><span className="eyebrow"><span />{eyebrow}</span><h2>{title}</h2></div>{children}</div>
}

export function GoogleReviews() {
  // The track holds two copies of the list so the translate loop is seamless.
  const loop = [...reviews, ...reviews]
  return <section className="review-section"><div className="container review-head"><div><span className="eyebrow"><span />Patient reviews</span><h2>What Our London <em>Patients Say</em></h2></div><a className="google-rating-card" href={REVIEW_PROFILE} target="_blank" rel="noopener noreferrer"><span className="grc-brand"><GoogleWordmark />Reviews</span><span className="grc-score"><strong>4.9</strong><span><GoogleStars value={4.9} size={19} /><small>Based on 247 reviews</small></span></span><span className="grc-link">See all reviews<ArrowUpRight size={15} /></span></a></div><div className="review-marquee"><div className="review-track" style={{ '--review-count': reviews.length } as React.CSSProperties}>{loop.map((review, index) => <figure className="review-card" key={`${review.name}-${index}`} aria-hidden={index >= reviews.length || undefined}><figcaption className="review-author"><span className="avatar" style={{ background: avatarColour(review.name) }}>{review.initials.charAt(0)}</span><span><b>{review.name}</b><small>Google review</small></span><GoogleG size={21} /></figcaption><GoogleStars size={17} /><blockquote>{review.text}</blockquote></figure>)}</div></div><div className="container review-foot"><a className="text-link" href={REVIEW_PROFILE}>View more patient reviews<ArrowUpRight size={17} /></a><small className="review-disclaimer">These are genuine reviews from our patients. Individual treatment outcomes may vary.</small></div></section>
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
