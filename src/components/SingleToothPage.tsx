import Link from 'next/link'
import { ArrowRight, ArrowUpRight, BadgeCheck, Bandage, Bug, Check, CircleCheck, Cog, Construction, HeartCrack, ImageOff, Phone, ShieldCheck, Smile, Sparkles } from 'lucide-react'
import type { SingleToothContent } from '@/lib/html'
import { ClinicLocations } from './ClinicLocations'
import { FaqSection, GoogleReviews, TeamSection } from './PageSections'

const Html = ({ html, className }: { html: string; className?: string }) => <p className={className} dangerouslySetInnerHTML={{ __html: html }} />

const PRICE_CARD_INCLUDES = ['Titanium Implant Fixture', 'Custom Abutment', 'Custom Zirconia Crown']

const VIDEO_ID = 'JyjVdDbavkA'

const USE_DETAILS = [
  { Icon: Smile, text: 'Permanent, single-gap restoration without grinding down neighbouring enamel.' },
  { Icon: HeartCrack, text: 'Addressing advanced periodontitis or bone degradation securely.' },
  { Icon: ImageOff, text: 'Structural trauma restorations with natural anatomical aesthetics.' },
  { Icon: Bug, text: 'Long-term solution when the natural root structure cannot be preserved.' },
  { Icon: Construction, text: 'Replacing recurrent sub-gingival decay beneath legacy crown margins.' },
  { Icon: Bandage, text: 'Definitive replacement when endodontic retreatment is non-viable.' },
]

const RESULT_CASES = [
  { badge: 'Case 1 · Before & After', chip: 'Before', note: 'Before & After restoration' },
  { badge: 'Case 2 · Aesthetic View', chip: 'After', note: 'Pre-op defect & Final Zirconia' },
]

const PART_FOOTERS = [
  { Icon: BadgeCheck, label: 'Biocompatible Grade 4 Titanium' },
  { Icon: Cog, label: 'Micro-Milled Stability Connector' },
  { Icon: Sparkles, label: 'Shade-Matched Zirconia Aesthetic' },
]

const AFTERCARE_POINTS = [
  'Twice daily interdental cleaning around implant neck',
  'Dedicated implant hygiene reviews every 6 months',
  'Comprehensive aftercare warranty coverage',
]

export function SingleToothPage({ content }: { content: SingleToothContent }) {
  const { hero, overview, uses, signature, results, quote, parts, procedure, aftercare, cta, links } = content
  const [chat, consultation, call] = hero.actions
  const resultImages = [results.before, results.after]

  return <article className="ao4 sti">
    <header className="ao4-hero">
      <div className="container sti-badge-row"><span className="sti-badge"><BadgeCheck size={13} strokeWidth={2.2} />{hero.eyebrow}</span></div>
      <div className="container ao4-hero-grid sti-hero-grid">
        <div className="ao4-hero-copy">
          <h1>{hero.title}</h1>
          <p className="sti-hero-price">
            <span className="sti-hero-price-label">Treatment Investment</span>
            <strong>{hero.price}</strong>
            <em>All-Inclusive</em>
          </p>
          <p>{hero.intro}</p>
          <div className="sti-hero-actions">
            {chat && <Link className="sti-button-primary" href={chat.href}>{chat.label}</Link>}
            {consultation && <Link className="sti-button-soft" href={consultation.href}>{consultation.label}</Link>}
            {call && <a className="sti-call" href={call.href}><Phone size={15} />{call.label}</a>}
          </div>
          <ul className="sti-trust">{hero.trust.map((item, index) => <li className={index ? undefined : 'sti-trust-finance'} key={item}><CircleCheck size={15} strokeWidth={2} />{item}</li>)}</ul>
        </div>
        <figure className="sti-video">
          <div className="sti-video-frame">
            <iframe src={`https://www.youtube.com/embed/${VIDEO_ID}`} title="Single Tooth Implant Procedure Walkthrough" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
          </div>
          <figcaption>
            <span>Procedure Walkthrough &amp; Patient Video</span>
            <a href={`https://www.youtube.com/watch?v=${VIDEO_ID}`} target="_blank" rel="noopener noreferrer">Watch on YouTube<ArrowUpRight size={13} /></a>
          </figcaption>
        </figure>
      </div>
    </header>

    <section className="ao4-band" id="overview">
      <div className="container">
        <div className="sti-heading"><span className="ao4-eyebrow">Clinical Definition</span><h2>{overview.title}</h2><p>{overview.text}</p></div>
        <div className="sti-heading sti-uses-heading"><h3>{uses.title}</h3><p>{uses.intro}</p></div>
        <div className="sti-uses">{uses.items.map((item, index) => {
          const detail = USE_DETAILS[index]
          return <div className="sti-use" key={item}>
            <span className="sti-use-icon">{detail && <detail.Icon size={20} strokeWidth={1.8} />}</span>
            <div><h4>{item}</h4>{detail && <p>{detail.text}</p>}</div>
          </div>
        })}</div>
      </div>
    </section>

    <section className="signature-section" id="fees"><div className="container signature-grid sti-signature">
      <div className="sti-signature-copy">
        <span className="sti-signature-eyebrow">{signature.eyebrow}</span>
        <h2 dangerouslySetInnerHTML={{ __html: signature.titleHtml }} />
        <p className="sti-signature-price">{signature.priceLabel} {signature.price}<sup>*</sup></p>
        <p className="sti-signature-intro">{signature.intro}</p>
        <ul className="sti-signature-features">{[...signature.tags, ...signature.features].map(item => <li key={item}><CircleCheck size={18} strokeWidth={1.8} />{item}</li>)}</ul>
        <div className="sti-signature-actions">
          {signature.actions[0] && <Link className="sti-button-primary" href={signature.actions[0].href}>{signature.actions[0].label}</Link>}
          {signature.actions[1] && <Link className="sti-button-muted" href={signature.actions[1].href}>{signature.actions[1].label}</Link>}
        </div>
        <small className="sti-signature-note" dangerouslySetInnerHTML={{ __html: signature.note }} />
      </div>
      <div className="sti-price-card">
        <span className="sti-price-card-name">{signature.card[0]}</span>
        <span className="sti-price-card-tag">{signature.card[1]}</span>
        <div className="sti-price-card-amount">{signature.card[2]}</div>
        <span className="sti-price-card-unit">{signature.card[3]}</span>
        <ul className="sti-price-card-list">
          {PRICE_CARD_INCLUDES.map(item => <li key={item}><span>{item}</span><em>Included</em></li>)}
        </ul>
        {signature.actions[0] && <Link className="sti-price-card-button" href={signature.actions[0].href}>Lock In This Price</Link>}
      </div>
    </div></section>

    <section className="ao4-band" id="results">
      <div className="container">
        <div className="ao4-centre"><span className="ao4-eyebrow">{results.eyebrow}</span><h2>{results.title}</h2></div>
        <div className="sti-results">{RESULT_CASES.map((item, index) => <figure className="sti-result" key={item.badge}>
          <div className="sti-result-media">
            <span className="sti-result-case">{item.badge}</span>
            <img {...resultImages[index]} loading="lazy" />
            <span className={index ? 'sti-result-chip sti-result-chip-after' : 'sti-result-chip'}>{item.chip}</span>
          </div>
          <figcaption><span>{item.note}</span><span>Dr Kamran</span></figcaption>
        </figure>)}</div>
        <p className="ao4-disclaimer">{results.caption}</p>
        <blockquote className="sti-quote">
          <p>{quote.text}</p>
          <div className="sti-quote-foot">
            <span>— Clinical Implant Advisory Note</span>
            <Link className="sti-button-dark" href={quote.action.href}>{quote.action.label}</Link>
          </div>
        </blockquote>
      </div>
    </section>

    <section className="ao4-band ao4-band-tint" id="parts">
      <div className="container">
        <div className="sti-heading"><span className="ao4-eyebrow">Biomechanical Architecture</span><h2>{parts.title}</h2><p>{parts.intro}</p></div>
        <div className="sti-parts">{parts.items.map((item, index) => {
          const footer = PART_FOOTERS[index]
          return <div className="sti-part" key={item.title}>
            <span className="sti-part-number">{item.title.split('.')[0]}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            {footer && <span className="sti-part-foot"><footer.Icon size={15} strokeWidth={1.8} />{footer.label}</span>}
          </div>
        })}</div>
      </div>
    </section>

    <section className="ao4-band" id="procedure">
      <div className="container ao4-split sti-split">
        <div>
          <span className="ao4-eyebrow">Clinical Pathway</span>
          <h2>{procedure.title}</h2>
          {procedure.paragraphs.map(text => <p key={text}>{text}</p>)}
        </div>
        <aside className="sti-aftercare" id="aftercare">
          <div className="sti-aftercare-head">
            <span className="sti-aftercare-icon"><ShieldCheck size={20} strokeWidth={1.8} /></span>
            <div><span className="sti-aftercare-eyebrow">Longevity &amp; Care</span><h3>{aftercare.title}</h3></div>
          </div>
          <p>{aftercare.text}</p>
          <ul className="sti-aftercare-list">{AFTERCARE_POINTS.map(item => <li key={item}><Check size={14} strokeWidth={2.6} />{item}</li>)}</ul>
          <Link className="sti-aftercare-button" href="/booking">Book Hygiene Maintenance</Link>
        </aside>
      </div>
    </section>

    <section className="ao4-cta sti-cta">
      <div className="container">
        <span className="sti-cta-eyebrow">South Kensington Surgery</span>
        <h2>{cta.title}</h2>
        <Html className="sti-cta-text" html={cta.textHtml} />
        <Link className="sti-button-primary" href={cta.action.href}>{cta.action.label}</Link>
        <div className="sti-links">{links.map(item => <Link href={item.href} key={item.href}><span className="sti-link-eyebrow">{item.eyebrow}</span><b>{item.title}</b><span className="sti-link-foot">{item.text}<ArrowRight size={18} /></span></Link>)}</div>
      </div>
    </section>

    <TeamSection />

    <section className="ao4-band ao4-band-tint">
      <div className="container"><div className="ao4-centre"><span className="ao4-eyebrow">Two London Locations</span><h2 id="locations">Our Clinic Locations</h2></div><ClinicLocations /></div>
    </section>

    <GoogleReviews />
    <FaqSection />

    <section className="ao4-band sti-contact">
      <div className="container ao4-centre">
        <span className="ao4-eyebrow">Begin Your Treatment</span>
        <h2>Get in Touch</h2>
        <p>Established dental implants London practice with clinics in South Kensington and the City of London. Affordable teeth implants from £2,950 with 0% finance (subject to status), placed by GDC-registered implant dentists.</p>
        <div className="sti-contact-actions">
          <Link className="sti-button-primary" href="/booking">Book consultation</Link>
          {call && <a className="sti-button-soft" href={call.href}><Phone size={15} />{call.label.replace(/^Call\s*/, '')}</a>}
        </div>
      </div>
    </section>
  </article>
}
