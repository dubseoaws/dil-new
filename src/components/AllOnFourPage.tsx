import Link from 'next/link'
import { Anchor, ArrowRight, ArrowUpRight, Award, Check, ClipboardList, HeartHandshake, Info, LayoutGrid, Lock, MapPin, MessageCircle, MoveHorizontal, Phone, ShieldCheck, Smile, Sparkles, Utensils, X } from 'lucide-react'
import type { AllOnFourContent } from '@/lib/html'
import { dentists, imageFor } from '../data/site'
import { Compare } from './Compare'
import { ClinicLocations } from './ClinicLocations'
import { VideoCard } from './VideoCard'
import { FaqSection, GoogleReviews, TeamSection } from './PageSections'

const VIDEO = { id: 'mWMhRZo2E54', title: 'Watch: Full Mouth Dental Implants', caption: 'Dental Implants London · South Kensington & City' }
const benefitIcons = [Lock, Anchor, Utensils, Smile, LayoutGrid, Sparkles]
const reasonIcons = [MapPin, Award, ShieldCheck, MessageCircle, ClipboardList, HeartHandshake]

const Html = ({ as: Tag = 'p', html, className }: { as?: 'p' | 'small' | 'span'; html: string; className?: string }) => <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />
// Keeps "All-on-4" on one line in balanced headings instead of breaking at its hyphens.
const Title = ({ text }: { text: string }) => <>{text.split(/(All-on-4)/).map((part, index) => part === 'All-on-4' ? <span className="ao4-nowrap" key={index}>{part}</span> : part)}</>

export function AllOnFourPage({ content }: { content: AllOnFourContent }) {
  const { hero, overview, concept, difference, benefits, suitability, process, video, pricing, comparison, cases, reasons, areas, cta, related } = content
  const [chat, consultation, call] = hero.actions
  const phone = call?.label.replace(/^Call\s*/, '') || ''
  const team = dentists.slice(0, 4)

  return <article className="ao4">
    <header className="ao4-hero"><div className="container ao4-hero-grid">
      <div className="ao4-hero-copy">
        <span className="ao4-eyebrow"><MapPin size={14} />{hero.eyebrow}</span>
        <h1><Title text={hero.title} /></h1>
        <p>{hero.intro}</p>
        <div className="ao4-hero-actions">
          {chat && <Link className="button" href={chat.href}>{chat.label}<ArrowUpRight size={17} /></Link>}
          {consultation && <Link className="button ao4-button-outline" href={consultation.href}>{consultation.label}</Link>}
          {call && <a className="ao4-call" href={call.href}><Phone size={16} />{call.label}</a>}
        </div>
        <small className="ao4-note">{hero.note}</small>
      </div>
      <VideoCard id={VIDEO.id} title={VIDEO.title} caption={VIDEO.caption} className="ao4-hero-video" />
    </div></header>

    <section className="ao4-band">
      <div className="container">
        <div className="ao4-centre"><h2 id="overview"><Title text={overview.title} /></h2>{overview.paragraphs.map(html => <Html key={html} html={html} />)}</div>
        <div className="ao4-columns">
          <div className="ao4-panel">
            <h3 id="concept">{concept.title}</h3>
            {concept.paragraphs.slice(0, -1).map(html => <Html key={html} html={html} />)}
            <div className="ao4-callout"><Info size={18} /><Html html={concept.paragraphs.at(-1) || ''} /></div>
          </div>
          <div className="ao4-panel">
            <h3 id="difference">{difference.title}</h3>
            <Html html={difference.intro} />
            <div className="ao4-versus">{difference.columns.map((column, index) => <div className={index ? 'ao4-versus-highlight' : ''} key={column.title}><h4>{column.title}</h4><ul>{column.items.map(item => <li key={item}><Check size={15} />{item}</li>)}</ul></div>)}</div>
            <Html html={difference.closing} className="ao4-small" />
          </div>
        </div>
      </div>
    </section>

    <section className="ao4-band ao4-band-tint">
      <div className="container">
        <div className="ao4-centre"><h2 id="benefits"><Title text={benefits.title} /></h2><Html html={benefits.intro} /></div>
        <div className="ao4-cards">{benefits.items.map((item, index) => { const Icon = benefitIcons[index] || Check; return <div className="ao4-card" key={item.title}><span className="ao4-icon"><Icon size={22} strokeWidth={1.6} /></span><h3>{item.title}</h3><p>{item.text}</p></div> })}</div>
        <Html html={benefits.note} className="ao4-disclaimer" />
      </div>
    </section>

    <section className="ao4-band">
      <div className="container ao4-split">
        <div>
          <h2 id="suitability"><Title text={suitability.title} /></h2>
          <Html html={suitability.intro} />
          <ul className="ao4-checklist">{suitability.items.map(item => <li key={item}><Check size={17} />{item}</li>)}</ul>
          <Link className="button" href="/booking">{suitability.action}<ArrowUpRight size={17} /></Link>
        </div>
        <aside className="ao4-info"><h3><Info size={20} />{suitability.aside.title}</h3>{suitability.aside.paragraphs.map(html => <Html key={html} html={html} />)}</aside>
      </div>
    </section>

    <section className="ao4-band ao4-band-tint">
      <div className="container ao4-narrow">
        <div className="ao4-centre"><h2 id="video">{video.title}</h2><Html html={video.text} /></div>
        <VideoCard id={VIDEO.id} title={video.title} className="ao4-feature-video" />
      </div>
    </section>

    <section className="ao4-band">
      <div className="container">
        <div className="ao4-centre"><span className="ao4-eyebrow">{cases.eyebrow}</span><h2 id="cases"><Title text={cases.title} /></h2>{cases.paragraphs.map(html => <Html key={html} html={html} />)}</div>
        <div className="ao4-cases">{cases.items.map(item => <figure className="ao4-case" key={item.after.src}><div className="ao4-case-head"><span className="ao4-eyebrow">{item.eyebrow}</span><h3>{item.title}</h3><span className="ao4-case-hint"><MoveHorizontal size={15} />Drag to compare results</span></div><Compare before={item.before} after={item.after} title="All-on-4 treatment" /><figcaption>{item.caption}</figcaption></figure>)}</div>
        <div className="ao4-cases-foot"><Html html={cases.credit} /><Link className="button ao4-button-outline" href={cases.gallery.href}>{cases.gallery.label}<ArrowUpRight size={17} /></Link></div>
      </div>
    </section>

    <section className="ao4-band ao4-band-tint">
      <div className="container">
        <div className="ao4-centre"><h2 id="process"><Title text={process.title} /></h2><Html html={process.intro} /></div>
        <ol className="ao4-steps">{process.steps.map(step => <li key={step.number}><span className="ao4-step-number">{step.number}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>
        <Html html={process.note} className="ao4-disclaimer" />
      </div>
    </section>

    <section className="ao4-band">
      <div className="container ao4-split ao4-split-wide">
        <div>
          <h2 id="pricing"><Title text={pricing.title} /></h2>
          {pricing.lead.map(html => <Html key={html} html={html} />)}
          <ul className="ao4-checklist">{pricing.factors.map(item => <li key={item}><Check size={17} />{item}</li>)}</ul>
          {pricing.trailing.map(html => <Html key={html} html={html} />)}
        </div>
        <aside className="ao4-price-card">
          <span className="ao4-eyebrow">Pricing overview</span>
          <h3>Full Arch (All-on-4)</h3>
          <div className="ao4-price">From £12,995</div>
          <ul>{['Detailed, personalised quotation following consultation', 'Finance options may be available, subject to status', 'Regular hygiene appointments and periodic reviews'].map(item => <li key={item}><Check size={16} />{item}</li>)}</ul>
          <Link className="button button-light" href={pricing.action.href}>{pricing.action.label}<ArrowUpRight size={17} /></Link>
        </aside>
      </div>
    </section>

    <section className="ao4-band ao4-band-tint">
      <div className="container">
        <div className="ao4-centre"><h2 id="comparison"><Title text={comparison.title} /></h2><Html html={comparison.intro} /></div>
        <div className="ao4-table-scroll" tabIndex={0} role="region" aria-label="Scrollable comparison table"><table className="ao4-table"><thead><tr>{comparison.head.map(cell => <th scope="col" key={cell}>{cell}</th>)}</tr></thead><tbody>{comparison.rows.map(([label, implants, dentures]) => <tr key={label}><th scope="row">{label}</th><td><Check size={15} />{implants}</td><td><X size={15} />{dentures}</td></tr>)}</tbody></table></div>
        <Html html={comparison.note} className="ao4-disclaimer" />
      </div>
    </section>

    <section className="ao4-band">
      <div className="container">
        <div className="ao4-centre"><h2 id="reasons">{reasons.title}</h2><Html html={reasons.intro} /></div>
        <div className="ao4-cards">{reasons.items.map((item, index) => { const Icon = reasonIcons[index] || Check; return <div className="ao4-card" key={item.title}><span className="ao4-icon"><Icon size={22} strokeWidth={1.6} /></span><h3>{item.title}</h3><p>{item.text}</p></div> })}</div>
      </div>
    </section>

    <section className="ao4-band ao4-band-tint">
      <div className="container ao4-centre">
        <span className="ao4-eyebrow">{areas.eyebrow}</span><h2 id="areas">{areas.title}</h2><Html html={areas.intro} />
        <div className="ao4-chips">{areas.places.map(place => <span key={place}>{place}</span>)}</div>
        <Html html={areas.note} className="ao4-small" />
      </div>
    </section>

    <section className="ao4-band">
      <div className="container">
        <div className="ao4-centre"><span className="ao4-eyebrow">Our team</span><h2 id="team">London&apos;s Experienced Implant Dentists</h2><p>Our dentists with a special interest in dental implants are highly qualified professionals with years of experience in implant dentistry.</p></div>
        <div className="ao4-team">{team.map(([name, role, gdc]) => <Link className="ao4-dentist" href="/team" key={name}><img {...imageFor(name)} loading="lazy" /><div><h3>{name}</h3><span>{role}</span><small>GDC: {gdc}</small></div></Link>)}</div>
        <div className="ao4-centre"><Link className="button ao4-button-outline" href="/team">Meet Full Team<ArrowUpRight size={17} /></Link></div>
      </div>
    </section>

    <TeamSection />

    <section className="ao4-band ao4-band-tint">
      <div className="container"><div className="ao4-centre"><span className="ao4-eyebrow">Two London Locations</span><h2 id="locations">Our Clinic Locations</h2></div><ClinicLocations /></div>
    </section>

    <GoogleReviews />
    <FaqSection />

    <section className="ao4-cta">
      <div className="container">
        <div className="ao4-centre">
          <h2><Title text={cta.title} /></h2>
          {cta.paragraphs.map(html => <Html key={html} html={html} />)}
          <div className="ao4-hero-actions">
            <Link className="button button-light" href={cta.action.href}>{cta.action.label}<ArrowUpRight size={17} /></Link>
            {chat && <Link className="button ao4-button-ghost" href={chat.href}>{chat.label}</Link>}
            {phone && <a className="ao4-call" href={call.href}><Phone size={16} />{phone}</a>}
          </div>
        </div>
        <div className="ao4-related">
          <h3>{related.title}</h3>
          <div className="ao4-related-links">{related.links.map(item => <Link href={item.href} key={item.href}><b>{item.title}</b><span>{item.text}</span><ArrowRight size={15} /></Link>)}</div>
          <Link className="ao4-related-more" href={related.more.href}>{related.more.label}</Link>
        </div>
      </div>
    </section>

    <section className="ao4-cta">
      <div className="container ao4-centre">
        <h2>Get in Touch</h2>
        <div className="ao4-hero-actions">
          <Link className="button button-light" href="/booking">Book consultation<ArrowUpRight size={17} /></Link>
          {phone && <a className="ao4-call" href={call.href}><Phone size={16} />{phone}</a>}
        </div>
      </div>
    </section>
  </article>
}
