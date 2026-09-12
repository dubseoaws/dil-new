import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ArrowUpRight, Check, ChevronDown, ChevronRight, MapPin, Menu, Phone, Play, ShieldCheck, X, MoveHorizontal, Mail, CalendarDays, HeartHandshake, ScanLine, BadgeCheck } from 'lucide-react'
import home from './data/home.json'
import pageIndex from './data/page-index.json'
import './App.css'
import { InnerPage } from './InnerPage'
import { ClinicLocations } from './ClinicLocations'
import { BookingPage } from './BookingPage'
import { assets, imageFor } from './data/site'
import { FaqSection, GoogleReviews, PageSections, SectionHeading, SmileGallery, TeamSection } from './PageSections'

const live = 'https://www.dental-implants-london.co.uk'
const booking = '/booking'
const finance = 'https://lead.tabeo.co.uk/south-kensington-medical-and-dental/finance'
function localBookingHtml(html: string) {
  const document = new DOMParser().parseFromString(html, 'text/html')
  document.querySelectorAll('a[href]').forEach(link => {
    try {
      const url = new URL(link.getAttribute('href')!, window.location.origin)
      if ([window.location.host, 'www.dental-implants-london.co.uk', 'dental-implants-london.co.uk'].includes(url.host) && /^\/booking(?:\/|$)/.test(url.pathname)) {
        link.setAttribute('href', `/booking${url.search}${url.hash}`)
        link.removeAttribute('target')
      }
    } catch { return }
  })
  return document.body.innerHTML
}
const treatments = [
  { title: 'Single Tooth Implant', path: '/single-tooth-implant', text: "Our most popular treatment for replacing one missing tooth. A titanium implant is surgically placed into your jawbone, where it fuses naturally over 3-6 months. We then attach a custom-made zirconia crown that matches your existing teeth perfectly. Unlike bridges, single implants don't require grinding down healthy adjacent teeth, preserving your natural tooth structure. Prices start from £2,950 including implant, abutment, and crown." },
  { title: 'All-on-4 / All-on-6', path: '/all-on-4-dental-implants', text: 'Revolutionary full-arch restoration using just 4 or 6 strategically angled implants to support a complete set of teeth. All-on-4 is ideal for patients with moderate bone loss, while All-on-6 provides extra stability for those who grind their teeth or want maximum durability. Many patients receive their new teeth the same day as surgery. This treatment eliminates loose dentures and can significantly improve chewing efficiency.' },
  { title: 'Implant-Retained Dentures', path: '/implant-retained-dentures', text: "Transform your existing loose dentures into a secure, stable solution. We place 2-4 implants per arch that 'snap' onto your denture using special attachments. This prevents embarrassing slipping during eating or speaking, eliminates the need for messy denture adhesives, and significantly improves chewing efficiency. Your dentures remain removable for easy cleaning while providing the confidence of a fixed solution." },
  { title: 'Bone Grafting & Sinus Lifts', path: '/bone-graft-for-dental-implants', text: "Don't let bone loss stop you from getting dental implants. Our experienced dentists perform advanced bone grafting procedures to rebuild lost jawbone, creating a solid foundation for implants. Sinus lift surgery is available for upper jaw implants where the sinus cavity has expanded. Using the latest regenerative techniques and biocompatible materials, we can often make implants possible even in complex cases other clinics have turned away." },
]
const steps = [
  ['Initial Consultation', 'Your journey starts with a consultation, including CT scans and X-rays, to check your eligibility and devise a personalised treatment plan for you.'],
  ['Implant Placement', 'A titanium implant is placed surgically into the jawbone, functioning as a secure tooth root. Recovery takes 3-6 months with a temporary denture provided.'],
  ['Abutment Attachment', 'After healing, an abutment is placed onto the implant, offering the stable foundation required for your final crown.'],
  ['Crown Placement', 'A custom made crown is then fitted on your teeth, restoring the full function and natural aesthetics of your smile.'],
]

function Brand() {
  return <a href="/" className="brand" aria-label="Dental Implants London home"><span className="brand-symbol"><span /><span /><span /></span><span>Dental Implants<span className="brand-city">LONDON</span></span></a>
}

function Button({ children, href = booking, light = false }: { children: React.ReactNode; href?: string; light?: boolean }) {
  return <a className={`button ${light ? 'button-light' : ''}`} href={href}>{children}<ArrowUpRight size={17} /></a>
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', close)
    return () => document.removeEventListener('keydown', close)
  }, [])
  return <>
    <div className="topbar"><div className="container topbar-inner"><span><MapPin size={13} /><a href="/south-kensington">South Kensington · 7 days</a><span className="top-divider" /><a href="/city-of-london">City of London · St Paul's</a></span><a href="tel:02071833573"><Phone size={13} />020 71833573</a></div></div>
    <header className="site-header"><div className="container header-inner"><Brand /><nav aria-label="Main navigation" className="desktop-nav"><div className="nav-dropdown"><a href="/conditions">Treatments <ChevronDown size={13} /></a><div className="dropdown-panel">{treatments.map(item => <a href={item.path} key={item.path}>{item.title}<ArrowUpRight size={14} /></a>)}<a href="/conditions">Conditions We Treat<ArrowRight size={14} /></a></div></div><a href="/dental-implants-cost">Implant Cost</a><a href="/team">Meet the Team</a><a href="/gallery">Smile Gallery</a><a href="/contact">Contact Us</a></nav><div className="header-actions"><Button>Book consultation</Button><button className="icon-button menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="mobile-navigation">{menuOpen ? <X /> : <Menu />}</button></div></div>
    {menuOpen && <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">{[['Treatments', '/conditions'], ['Implant Cost', '/dental-implants-cost'], ['Meet the Team', '/team'], ['Smile Gallery', '/gallery'], ['Contact Us', '/contact'], ['FAQs', '/faq']].map(([label, path]) => <a href={path} key={path}>{label}<ArrowUpRight size={18} /></a>)}<Button>Book consultation</Button></nav>}</header>
  </>
}

function Compare({ before = imageFor('Before dental'), after = imageFor('After dental'), title = 'dental treatment' }: { before?: { src: string; alt: string }; after?: { src: string; alt: string }; title?: string }) {
  const [position, setPosition] = useState(50)
  return <div className="comparison"><img {...after} loading="lazy" /><div className="comparison-before" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}><img {...before} loading="lazy" /></div><span className="compare-label before-label">Before</span><span className="compare-label after-label">After</span><div className="compare-line" style={{ left: `${position}%` }}><span><MoveHorizontal size={22} /></span></div><input aria-label={`Compare before and after ${title}`} type="range" min="0" max="100" value={position} onChange={event => setPosition(Number(event.target.value))} /></div>
}

function SourceSection({ title }: { title: string }) {
  const section = home.sections.find(section => section.title.includes(title))
  if (!section) return null
  if (title === 'Dental Implants Cost in London') return <section className="section cost-section"><div className="container"><SectionHeading eyebrow="Affordable pricing" title={title}><a href="/dental-implants-cost" className="text-link">Complete dental implants cost guide<ArrowUpRight size={17} /></a></SectionHeading><p className="cost-intro">The cost of dental implants in London typically ranges around £3,000 to £4,000 for a single implant with crown and abutment. At our South Kensington clinic, we believe in accessible excellence. By focusing on efficiency and expertise, we offer premium implants including Zirconia crowns starting from £2,950*.</p><div className="cost-table-wrap"><table className="cost-table"><thead><tr><th scope="col">Treatment / Service</th><th scope="col">Dental Implants London<small>Our Price</small></th><th scope="col">Other London Clinics<small>Standard Price</small></th></tr></thead><tbody>{[['Single Implant + Crown', 'From £2,950*', 'From £3,000'], ['Full Arch (All-on-4)', 'From £12,995', 'From £15,000'], ['Implant Quality', 'Premium', 'Varies (Often Standard)'], ['Consultation', 'Free Initial Assessment', 'from £150']].map(([label, price, other]) => <tr key={label}><th scope="row">{label}</th><td><Check size={15} />{price}</td><td>{other}</td></tr>)}</tbody></table></div><p className="cost-note">*All-inclusive implant price covering the implant, abutment and zirconia crown. 0% finance available over 12 months, subject to status.</p><p className="cost-note">Want to know more? See our <a href="/dental-implants-cost">complete dental implants cost guide</a> with finance options and what's included.</p><div className="cost-actions"><Button>Book consultation</Button><a className="text-link" href="tel:02071833573">Call 020 71833573<Phone size={15} /></a></div></div></section>
  const style = title.startsWith('What') ? 'understanding' : title.startsWith('Who') ? 'candidacy' : title.includes('Longevity') ? 'longevity' : 'quality'
  return <section className={`source-band source-${style}`}><div className="container source-copy" dangerouslySetInnerHTML={{ __html: localBookingHtml(section.html || '') }} /></section>
}

const heroVideos = [
  { id: 'Huq5WJ2grKc', title: 'Dental Implants Explained | A Premium Solution for Missing Teeth' },
  { id: 'n33iO5y6N0g', title: '"I Can\'t Stop Smiling!" | Composite Bonding Patient Review' },
  { id: 'M_ZfyFgI9y0', title: 'Dental Bridge Treatment | Replace Missing Teeth and Restore Your Smile' },
]

function HeroVideos() {
  const [selectedVideo, setSelectedVideo] = useState<(typeof heroVideos)[number] | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const closeButton = useRef<HTMLButtonElement>(null)
  const openVideo = (video: (typeof heroVideos)[number]) => {
    setSelectedVideo(video)
    dialog.current?.showModal()
    closeButton.current?.focus()
  }
  useEffect(() => {
    if (!selectedVideo) return
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = overflow }
  }, [selectedVideo])
  return <>
    <div className="hero-video-strip" aria-label="Clinic videos">{heroVideos.map((video, index) => <button className="hero-video" key={video.id} onClick={() => openVideo(video)} aria-label={`Play ${video.title}`}><span className="hero-video-image"><img src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`} alt="" fetchPriority={index === 0 ? 'high' : 'auto'} /><span className="hero-video-play"><Play size={26} fill="currentColor" /></span><span className="hero-video-number">0{index + 1}</span></span><span className="hero-video-title">{video.title}<ArrowUpRight size={18} /></span></button>)}</div>
    <dialog ref={dialog} className="hero-video-dialog" aria-label={selectedVideo?.title || 'Clinic video'} onClose={() => setSelectedVideo(null)} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close() }}>
      <div className="hero-video-dialog-heading"><h2>{selectedVideo?.title}</h2><button ref={closeButton} className="icon-button" aria-label="Close video" title="Close video" onClick={() => dialog.current?.close()}><X size={24} /></button></div>
      {selectedVideo && <><iframe key={selectedVideo.id} src={`https://www.youtube-nocookie.com/embed/${selectedVideo.id}?autoplay=1&rel=0`} title={selectedVideo.title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /><a className="text-link" href={`https://www.youtube.com/watch?v=${selectedVideo.id}`} target="_blank" rel="noopener noreferrer">Watch on YouTube<ArrowUpRight size={16} /></a></>}
    </dialog>
  </>
}

function HomePage() {
  const [selectedTreatment, setSelectedTreatment] = useState(0)
  const treatment = treatments[selectedTreatment]
  return <main id="main">
    <section className="hero hero-with-videos"><div className="container hero-inner"><div className="hero-content"><div className="hero-introduction"><span className="eyebrow"><span />Established implant clinic in London</span><h1>Dental Implants<br /><em>London.</em></h1><a className="hero-reviews" href="https://share.google/FEhlEzh1JDaOMlqB0"><span className="google-g">G</span><span><span className="stars">★★★★★</span><span className="review-score"><b>4.9/5</b> from 247 Google Reviews</span></span><ArrowUpRight size={15} /></a></div><div className="hero-booking"><p className="hero-description">Trusted dental implants London clinic with highly experienced dentists. Get natural-looking, long-lasting dental implants with premium quality at affordable prices.</p><div className="hero-price"><span>From <strong>£2,950</strong></span><span className="price-divider" /><span>Or from <strong className="monthly">£67.80<small>/mo*</small></strong></span></div><div className="hero-buttons"><Button>Free 15-min chat</Button><a className="text-link" href={booking}>1-hour consultation · £80<ArrowUpRight size={16} /></a></div></div></div><HeroVideos /></div></section>
    <section className="trust-strip"><div className="container trust-grid">{[{ Icon: ShieldCheck, title: 'Premium Quality', text: 'Premium Zirconia Crown' }, { Icon: CalendarDays, title: '0% Finance*', text: 'Available over 12 months' }, { Icon: BadgeCheck, title: 'GDC Registered', text: 'Experienced Dentists' }, { Icon: HeartHandshake, title: 'Long-Term Care', text: 'Ongoing support and aftercare included' }].map(({ Icon, title, text }) => <div className="trust-item" key={title}><Icon size={27} strokeWidth={1.35} /><div><b>{title}</b><span>{text}</span></div></div>)}</div></section>
    <div className="container finance-disclaimer">*Representative example: Borrow £2,950 over 60 months at 14.9% APR. Monthly payment £67.80. Total amount payable £4,068. Finance subject to status. 0% APR available over 12 months. <a href={finance}>Calculate your finance here <ArrowUpRight size={12} /></a></div>

    <section className="section intro-section"><div className="container intro-grid"><div><span className="eyebrow"><span />Established implant clinics in London</span><h2>Dental Implants London:<br /><em>Two Convenient<br />Clinic Locations</em></h2><a href="#clinics" className="text-link">Visit our clinics<ArrowUpRight size={17} /></a></div><div className="intro-copy"><p>Looking for dental implants in London? With clinics in <a href="/south-kensington">South Kensington</a> and the <a href="/city-of-london">City of London near St Paul's</a>, there's a Dental Implants London clinic near you. Our London dental implants are placed by GDC-registered dentists with 50+ years of combined experience in implant dentistry, using premium titanium implants that integrate seamlessly with your jawbone.</p><p>Whether you need a <a href="/single-tooth-implant">single tooth implant</a>, <a href="/implant-retained-dentures">implant-retained dentures</a>, or full mouth restoration with All-on-4, we offer affordable dental implants London patients trust, starting from just £2,950.</p><div className="intro-stat"><strong>50+</strong><span>years combined<br />experience</span><span className="stat-separator" /><strong>4.9<span>★</span></strong><span>rated on<br />Google Reviews</span></div></div></div></section>

    <section className="section treatments-section" id="treatments"><div className="container"><SectionHeading eyebrow="Implant treatments" title="Dental Implant Services London"><a className="text-link" href="/conditions">Conditions We Treat<ArrowUpRight size={17} /></a></SectionHeading><div className="treatments-layout"><div className="treatment-tabs" role="tablist" aria-label="Dental implant treatments" aria-orientation="vertical">{treatments.map((item, index) => <button id={`treatment-tab-${index}`} key={item.path} className={selectedTreatment === index ? 'active' : ''} onClick={() => setSelectedTreatment(index)} onKeyDown={event => { if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) { event.preventDefault(); const next = event.key === 'Home' ? 0 : event.key === 'End' ? treatments.length - 1 : (index + (event.key === 'ArrowDown' ? 1 : -1) + treatments.length) % treatments.length; setSelectedTreatment(next); document.getElementById(`treatment-tab-${next}`)?.focus() } }} role="tab" aria-selected={selectedTreatment === index} aria-controls="treatment-panel" tabIndex={selectedTreatment === index ? 0 : -1}><span>0{index + 1}</span>{item.title}<ArrowUpRight size={20} /></button>)}</div><div className="treatment-panel" id="treatment-panel" role="tabpanel" aria-labelledby={`treatment-tab-${selectedTreatment}`}><div className="treatment-visual"><img {...imageFor('State of the art')} loading="lazy" /><span><ScanLine size={16} />Digital Treatment Planning</span></div><div className="treatment-copy" key={treatment.title}><span className="eyebrow">0{selectedTreatment + 1} / 04</span><h3>{treatment.title}</h3><p>{treatment.text}</p><a className="text-link" href={treatment.path}>{treatment.title}<ArrowUpRight size={17} /></a></div></div></div></div></section>

    <section className="section results-section" id="results"><div className="container results-grid"><div className="results-copy"><span className="eyebrow"><span />Before & after gallery</span><h2>Dental Implants<br /><em>London Results</em></h2><p>Individual results may vary. Photographs shown with patient consent.</p><a className="text-link" href="/gallery">View full gallery<ArrowUpRight size={17} /></a><div className="result-detail"><ShieldCheck size={23} strokeWidth={1.3} /><span>Premium titanium implants<br /><b>Premium Zirconia Crown</b></span></div></div><div><Compare /><div className="comparison-footnote"><span><MoveHorizontal size={15} />Before / After</span><span>Individual results may vary</span></div></div></div></section>

    <section className="signature-section" id="pricing"><div className="container signature-grid"><div><span className="eyebrow"><span />Transparent pricing</span><h2>The Signature<br /><em>Implant.</em></h2><p>Premium dental implants including a Zirconia crown, from £2,950 per tooth. One all-inclusive price covering the implant, abutment and crown — with no hidden extras.</p><div className="signature-tags"><span>High quality</span><span>Competitive pricing</span><span>Same day consultations</span></div></div><div className="signature-price"><span className="eyebrow">All-inclusive price</span><div className="large-price"><span>from</span>£2,950<sup>*</sup></div><span className="per-tooth">Per tooth · Implant, abutment and Zirconia crown</span><ul>{['Premium Zirconia Crown', 'Long-term Guarantee Available (Conditions Apply)', 'Priority Appointments', '0% Finance Available (subject to status)'].map(item => <li key={item}><Check size={17} />{item}</li>)}</ul><Button light>Book free consultation</Button><a className="signature-consult" href={booking}>1-hour consultation · £80<ArrowUpRight size={15} /></a><small>*All-inclusive price per tooth covering the implant, abutment and Zirconia crown. 0% finance available over 12 months, subject to status. <a href="/terms">Terms apply.</a></small></div></div></section>

    <SourceSection title="Dental Implants Cost in London" />
    <SourceSection title="What Are Dental Implants?" />

    <section className="section process-section"><div className="container"><SectionHeading eyebrow="Treatment process" title="How Dental Implants Work"><p>Understanding the dental implant procedure helps you make informed decisions. Here is a step-by-step breakdown of how we place dental implants at our London clinic.</p></SectionHeading><div className="process-grid">{steps.map(([title, text], index) => <div className="process-step" key={title}><div className="step-number"><span>0{index + 1}</span>{index < 3 && <ArrowRight size={17} />}</div><h3>{title}</h3><p>{text}</p></div>)}</div><div className="process-note"><span>“Proper care ensures dental implants serve as a long-lasting solution for missing teeth.”</span><a href="/dental-implants-cost" className="text-link">View Dental Implant Costs<ArrowUpRight size={17} /></a></div></div></section>

    <SourceSection title="Who Can Get Dental Implants?" />
    <SourceSection title="Dental Implant Longevity" />
    <SourceSection title="Quality Dental Implants" />

    <TeamSection />

    <GoogleReviews />

    <SmileGallery />

    <section className="section clinics-section" id="clinics"><div className="container"><SectionHeading eyebrow="Two London Locations" title="Our Clinic Locations"><p>With two London clinics — South Kensington and the City of London — we welcome patients from across the capital. Looking for dental implants near me in London? One of our clinics is close by, each with excellent transport links.</p></SectionHeading><ClinicLocations /><a href="/areas-we-serve" className="text-link areas-link">View all areas we serve<ArrowUpRight size={17} /></a></div></section>

    <FaqSection />
    <section className="contact-band"><div className="container"><div><span className="eyebrow">Visit our clinics</span><h2>Get in Touch</h2></div><div><Button light>Free 15-min chat</Button><a className="contact-phone" href="tel:02071833573"><Phone size={18} />020 71833573</a></div></div></section>
  </main>
}

type SourcePage = { title: string; seoTitle: string; description: string; html: string; path: string }

function GalleryPage({ page }: { page: SourcePage }) {
  const [category, setCategory] = useState('All')
  const [gallery] = useState(() => {
    const document = new DOMParser().parseFromString(page.html, 'text/html')
    const root = document.body.firstElementChild!
    const hero = document.querySelector('.page-hero-copy')!
    const cases = Array.from(document.querySelectorAll('h3')).filter(heading => heading.parentElement?.parentElement?.querySelector('img[alt^="Before"]')).map((heading, index) => {
      const card = heading.parentElement!.parentElement!
      const before = card.querySelector<HTMLImageElement>('img[alt^="Before"]')!
      const after = card.querySelector<HTMLImageElement>('img[alt^="After"]')!
      return { id: index, title: heading.textContent || '', category: heading.parentElement!.querySelector('span')!.textContent || '', before: { src: assets[before.src] || before.src, alt: before.alt }, after: { src: assets[after.src] || after.src, alt: after.alt } }
    })
    return {
      title: hero.querySelector('h1')!.textContent,
      eyebrow: hero.querySelector('span')!.textContent,
      bookingLabel: hero.querySelector('a')!.textContent,
      stats: Array.from(hero.nextElementSibling!.children).map(stat => Array.from(stat.querySelectorAll('p')).map(value => value.textContent)),
      disclosure: root.children[2].innerHTML,
      closing: Array.from(root.children).slice(4).map(section => section.innerHTML),
      cases,
    }
  })
  const categories = ['All', ...new Set(gallery.cases.map(item => item.category))]
  const visibleCases = gallery.cases.filter(item => category === 'All' || item.category === category)

  return <article className="gallery-page">
    <header className="gallery-heading"><div className="container"><span className="eyebrow">{gallery.eyebrow}</span><h1>{gallery.title}</h1><Button>{gallery.bookingLabel}</Button><dl className="gallery-stats">{gallery.stats.map(([value, label]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></div></header>
    <div className="container">
      <div className="gallery-toolbar"><div><label htmlFor="gallery-treatment">Treatments</label><select id="gallery-treatment" value={category} onChange={event => setCategory(event.target.value)}>{categories.map(value => <option key={value} value={value}>{value} ({value === 'All' ? gallery.cases.length : gallery.cases.filter(item => item.category === value).length})</option>)}</select></div><p role="status">{visibleCases.length} / {gallery.cases.length} Case Studies</p></div>
      <div className="gallery-disclosure" dangerouslySetInnerHTML={{ __html: gallery.disclosure }} />
      <div className="gallery-cases">{visibleCases.map(item => <section className="gallery-case" key={item.id} aria-labelledby={`case-${item.id}`}><Compare before={item.before} after={item.after} title={item.title} /><div className="gallery-case-caption"><span>{item.category}</span><h2 id={`case-${item.id}`}>{item.title}</h2></div></section>)}</div>
    </div>
    {gallery.closing.map((html, index) => <section key={index} className="gallery-closing"><div className="container" dangerouslySetInnerHTML={{ __html: html }} /></section>)}
  </article>
}

function ContentPage({ path }: { path: string }) {
  const [page, setPage] = useState<SourcePage | null>(null)
  const [failed, setFailed] = useState(false)
  const entry = pageIndex.find(item => item.path === path)
  useEffect(() => {
    if (!entry) return
    const controller = new AbortController()
    fetch(`/content/${entry.file}`, { signal: controller.signal }).then(response => { if (!response.ok) throw new Error('Content unavailable'); return response.json() }).then((data: SourcePage) => { setPage({ ...data, html: localBookingHtml(data.html) }); document.title = data.seoTitle; document.querySelector('meta[name="description"]')?.setAttribute('content', data.description) }).catch(error => { if (error.name !== 'AbortError') setFailed(true) })
    return () => controller.abort()
  }, [entry])
  if (!entry || failed) return <main id="main" className="container route-state"><h1>{failed ? 'Page unavailable' : 'Page not found'}</h1><Button href={failed ? `${live}${path}` : '/'}>{failed ? 'View original page' : 'Dental Implants London'}</Button></main>
  if (!page) return <main id="main" className="container route-state" aria-busy="true"><span className="loading-ring" /><p>Loading...</p></main>
  return <main id="main" className="content-page"><div className="container breadcrumbs"><a href="/">Dental Implants London</a><ChevronRight size={14} /><span>{page.title}</span></div>{path === '/gallery' ? <GalleryPage page={page} /> : <InnerPage key={path} html={page.html} path={path} />}<PageSections path={path} /><section className="contact-band"><div className="container"><h2>Get in Touch</h2><Button light>Book consultation</Button></div></section></main>
}

function Footer() {
  return <><section className="regulation"><div className="container"><div><ShieldCheck size={27} strokeWidth={1.4} /><span>Trusted & regulated<b>Registered with UK's Leading Healthcare Bodies</b></span></div><a href="https://www.gdc-uk.org/registration/the-register">GDC<span>General Dental Council<ArrowUpRight size={12} /></span></a><a href="https://www.cqc.org.uk/location/1-20629579981">CQC<span>Care Quality Commission<ArrowUpRight size={12} /></span></a></div></section><footer className="footer"><div className="container"><div className="footer-grid"><div><Brand /><p>Established dental implants London practice with clinics in South Kensington and the City of London. Affordable teeth implants from £2,950 with 0% finance (subject to status), placed by GDC-registered implant dentists.</p><a href="https://www.instagram.com/dentalimplantlondon/" className="text-link">Instagram<ArrowUpRight size={15} /></a></div><div><h3>Navigation</h3>{[['Meet the Team', '/team'], ['Smile Gallery', '/gallery'], ['Implant Cost', '/dental-implants-cost'], ['Areas We Serve', '/areas-we-serve'], ['Blog', '/blog'], ['FAQ', '/faq']].map(([label, href]) => <a href={href} key={href}>{label}</a>)}</div><div><h3>Treatments</h3>{treatments.map(item => <a href={item.path} key={item.path}>{item.title}</a>)}<a href="/conditions">Conditions We Treat</a><a href="/compare-treatments">Compare Treatments</a></div><div><h3>Contact</h3><p>20 Old Brompton Road,<br />South Kensington,<br />London SW7 3DL</p><a href="tel:02071833573"><Phone size={14} />020 71833573</a><a href="mailto:info@dental-implants-london.co.uk"><Mail size={14} />Email us</a><a href="/contact">Contact Us<ArrowUpRight size={14} /></a></div></div><div className="footer-legal">{[['Terms and Conditions', '/terms'], ['Privacy Policy', '/privacy-policy'], ['Membership Policy', '/membership-policy'], ['Cookie Policy', '/cookie-policy'], ['Cancellation Policy', '/cancellation-policy'], ['Complaints Procedure', '/terms#complaints']].map(([label, href]) => <a key={label} href={href}>{label}</a>)}</div><p className="registration-copy">Dedicated Dental Implants Department of Medical & Dental limited: CQC Registration 1-20629579981</p><div className="footer-bottom"><span>© 2026 Dental Implants London. All rights reserved.</span><a href="https://www.dubseo.co.uk/">Design & Developed By DubSEO<ArrowUpRight size={13} /></a></div></div></footer><div className="mobile-booking"><a href="tel:02071833573" aria-label="Call our clinic"><Phone size={20} /></a><Button>Free 15-min chat</Button></div></>
}

function App() {
  const path = window.location.pathname.replace(/\/$/, '') || '/'
  return <><a className="skip-link" href="#main">Skip to content</a><Header />{path === '/' ? <HomePage /> : /^\/booking(?:\/|$)/.test(path) ? <BookingPage /> : <ContentPage path={path} />}<Footer /></>
}

export default App