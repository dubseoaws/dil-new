import Link from 'next/link'
import {
  Anchor, ArrowRight, ArrowUpRight, BadgeCheck, Bandage, BriefcaseMedical, Calendar, ChevronDown, ClipboardList,
  Clock, Columns3, Headset, LayoutGrid, Lock, Map, MessageCircle, Microscope, Phone, Ruler, Scan,
  ShieldCheck, SlidersHorizontal, Star, Stethoscope, TrainFront, Utensils, Wallet,
} from 'lucide-react'
import { clinics } from '../data/clinics'
import { dentists, imageFor, reviews } from '../data/site'

const PHONE_HREF = 'tel:02071833573'
const MAPS_SOUTH_KENSINGTON = 'https://www.google.com/maps?q=20+Old+Brompton+Road,+South+Kensington,+London+SW7+3DL'
const MAPS_CITY = 'https://www.google.com/maps?q=5+Ave+Maria+Lane,+London+EC4M+7AQ'

const SPECIFICATIONS = [
  { label: 'Architecture', title: 'Narrow Diameter', text: 'Smaller single-piece titanium post' },
  { label: 'Indication Method', title: 'Targeted Placement', text: 'Single-piece screw design, minimally invasive' },
]

const INDICATIONS = [
  { Icon: LayoutGrid, title: 'Limited space between teeth', text: 'Engineered specifically to fit narrow gaps where conventional implants are structurally too wide.' },
  { Icon: Lock, title: 'Stabilising removable dentures', text: 'Eliminating denture slippage and restoring natural everyday confidence when eating and speaking.' },
  { Icon: Columns3, title: 'Reduced bone volume', text: 'Accommodated in shallow or narrow bone corridors without needing complex invasive bone grafts.' },
]

const STEPS = [
  { number: '01', title: 'Assessment & Planning', text: 'Clinical evaluation and personalised treatment plan' },
  { number: '02', title: 'Implant Placement', text: 'Mini implants placed at carefully determined positions' },
  { number: '03', title: 'Restoration', text: 'Replacement tooth or denture attachment fitted' },
]

const BENEFITS = [
  { Icon: Anchor, title: 'Stabilising removable dentures' },
  { Icon: Scan, title: 'Supporting teeth in limited spaces' },
  { Icon: Utensils, title: 'Helping improve chewing stability' },
  { Icon: Bandage, title: 'May reduce need for bone grafting' },
  { Icon: Ruler, title: 'Narrower diameter for restricted sites' },
  { Icon: SlidersHorizontal, title: 'Personalised to individual needs' },
]

const COMPARISON = [
  ['Diameter', 'Standard width', 'Narrower diameter'],
  ['Common uses', 'Single teeth, bridges, full arches', 'Denture stabilisation, limited spaces'],
  ['Bone requirements', 'Sufficient bone width needed', 'May suit reduced bone volume'],
  ['Restoration range', 'Wide range of restorations', 'Specific clinical indications'],
]

const APPROACH = [
  { Icon: BriefcaseMedical, title: 'Experienced clinicians', text: 'Skilled in a range of implant treatments' },
  { Icon: Microscope, title: 'Careful assessment', text: 'Thorough evaluation before treatment begins' },
  { Icon: ClipboardList, title: 'Personalised planning', text: 'Treatment tailored to your clinical needs' },
  { Icon: Headset, title: 'Ongoing support', text: 'Reviews and aftercare throughout treatment' },
]

const FAQS = [
  ['What are mini dental implants?', 'Mini dental implants are narrow-diameter implants that are smaller than standard dental implants. They consist of a single-piece titanium post that is placed into the jawbone and can support a range of restorations depending on the clinical situation.'],
  ['Are mini dental implants suitable for everyone?', 'Mini dental implants are not a replacement for standard implants in every situation. Suitability depends on individual clinical factors, including the location of the missing teeth, bone quality, and the type of restoration required. A thorough assessment is carried out during a consultation to determine the most appropriate treatment approach.'],
  ['Are mini implants used for dentures?', 'Yes. Patients who wear removable dentures and experience problems with stability may benefit from implant retained dentures supported by mini implants. Several mini implants placed along the jaw can help secure a denture more firmly, improving comfort and function during daily use.'],
  ['How long do mini dental implants last?', 'A healing period follows placement to allow the implant to stabilise within the bone. With proper oral hygiene, routine dental care, and ongoing review appointments to monitor progress, mini implants can provide long-lasting stability for dentures and restorations.'],
  ['Are mini implants smaller than regular implants?', 'The primary difference between mini dental implants and standard dental implants is size. Standard implants are wider in diameter, whereas mini implants have a narrower diameter suited for situations with limited bone width or restricted interdental spaces.'],
]

const RELATED = [
  { href: '/', title: 'Dental Implants', text: 'Full tooth replacement' },
  { href: '/implant-retained-dentures', title: 'Implant Retained Dentures', text: 'Stabilised arch support' },
  { href: '/single-tooth-implant', title: 'Single Tooth Implant', text: 'Targeted restoration' },
  { href: '/dental-implants-cost', title: 'Dental Implants Cost', text: 'Transparent pricing & finance' },
]

const CLINIC_BADGES = ['Flagship Practice', 'City Branch']

const Stars = ({ size }: { size: number }) => <span className="hsp-stars">{[0, 1, 2, 3, 4].map(index => <Star key={index} size={size} fill="currentColor" strokeWidth={0} />)}</span>

export function MiniDentalImplantsPage() {
  const [southKensington] = clinics
  return <article className="hsp">
    {/* 1. Hero */}
    <header className="hsp-hero">
      <span className="hsp-hero-glow" aria-hidden="true" />
      <div className="hsp-container hsp-hero-grid">
        <div className="hsp-hero-copy">
          <span className="hsp-eyebrow-pill"><i /> Smaller-Diameter Implant Solutions in London</span>
          <h1>Mini Dental Implants London</h1>
          <p className="hsp-lead">Smaller-diameter implants from £2,950 at our South Kensington clinic. Mini implants may be considered for stabilising dentures or replacing teeth where space or bone volume is limited. Free 15-minute consultation to assess suitability.</p>
          <div className="hsp-actions">
            <Link className="hsp-btn hsp-btn-light" href="/booking">Free 15-Min Chat</Link>
            <Link className="hsp-btn hsp-btn-dark" href="/booking">1-Hour Consultation — £80</Link>
            <a className="hsp-btn hsp-btn-ghost" href={PHONE_HREF}><Phone size={20} />Call 020 71833573</a>
          </div>
          <p className="hsp-hero-note"><ShieldCheck size={16} />Treatment suitability is determined following consultation · Results vary between individuals</p>
        </div>
        <aside className="hsp-price-panel">
          <span className="hsp-eyebrow-pill hsp-eyebrow-pill-dark"><i /> Price Transparency</span>
          <p className="hsp-price-panel-note">Personalised pricing: Your treatment plan and associated costs are determined following a thorough clinical assessment. Contact us to arrange a consultation and receive an individualised estimate.</p>
          <div className="hsp-price-panel-figure">
            <span className="hsp-overline">Estimated Investment</span>
            <strong>From £2,950 per arch / treatment</strong>
            <em>0% Finance Available (subject to status)</em>
          </div>
          <Link className="hsp-btn hsp-btn-light hsp-btn-block" href="/booking">Request a Consultation</Link>
        </aside>
      </div>
    </header>

    {/* 2. Understanding the treatment */}
    <section className="hsp-section hsp-bg-surface">
      <div className="hsp-container hsp-split">
        <div className="hsp-split-copy">
          <span className="hsp-eyebrow">Understanding the Treatment</span>
          <h2>What Are Mini Dental Implants?</h2>
          <p>Mini dental implants are narrow-diameter implants that are smaller than standard dental implants. They consist of a single-piece titanium post that is placed into the jawbone and can support a range of restorations depending on the clinical situation.</p>
          <p>Because of their reduced size, mini implants may be considered in situations where standard implants are not suitable — for example, where there is limited bone width or restricted space between existing teeth. They can be used to stabilise removable dentures or, in certain cases, to support individual replacement teeth.</p>
          <p>Mini dental implants are not a replacement for standard implants in every situation. The choice between the two depends on individual clinical factors, which your clinician will assess during a consultation.</p>
        </div>
        <div className="hsp-spec-card">
          <div className="hsp-spec-head"><span className="hsp-eyebrow">Clinical Focus</span><Stethoscope size={22} /></div>
          <h3>Implant Specifications</h3>
          <div className="hsp-spec-list">
            {SPECIFICATIONS.map(item => <div className="hsp-spec" key={item.label}>
              <span className="hsp-overline">{item.label}</span>
              <strong>{item.title}</strong>
              <p>{item.text}</p>
            </div>)}
          </div>
          <p className="hsp-spec-note">Preserves bone volume and fits restricted interdental spaces without extensive grafting.</p>
        </div>
      </div>
    </section>

    {/* 3. Assessing suitability */}
    <section className="hsp-section hsp-bg-low">
      <div className="hsp-container">
        <div className="hsp-heading">
          <span className="hsp-eyebrow">Assessing Suitability</span>
          <h2>Who May Be Suitable for Mini Dental Implants?</h2>
          <p>Mini dental implants may be considered for patients who have limited space between teeth, making it difficult to place a standard-diameter implant. They may also be appropriate where bone volume has reduced and a narrower implant can be accommodated without the need for additional bone grafting procedures.</p>
          <p>Patients who wear removable dentures and experience problems with stability may benefit from <Link href="/implant-retained-dentures">implant retained dentures</Link> supported by mini implants. Several mini implants placed along the jaw can help secure a denture more firmly, improving comfort and function during daily use.</p>
          <p>Suitability for mini dental implants depends on individual clinical factors, including the location of the <Link href="/missing-teeth">missing teeth</Link>, bone quality, and the type of restoration required. A thorough assessment is carried out during a consultation to determine the most appropriate treatment approach.</p>
        </div>
        <div className="hsp-grid-3">
          {INDICATIONS.map(item => <div className="hsp-card" key={item.title}>
            <span className="hsp-card-icon"><item.Icon size={24} /></span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>)}
        </div>
      </div>
    </section>

    {/* 4. Treatment process */}
    <section className="hsp-section hsp-bg-surface">
      <div className="hsp-container">
        <div className="hsp-heading">
          <span className="hsp-eyebrow">The Treatment Process</span>
          <h2>How Mini Dental Implants Work</h2>
          <p>The process begins with a clinical assessment, including imaging, to evaluate bone quality and determine the appropriate placement positions. Where suitable, the mini implant is placed into the jawbone through a minimally invasive approach. Once placed, the mini implant provides a connection point for the restoration. Depending on the clinical situation, a replacement tooth or a denture attachment may be fitted. In some cases, a denture can be adapted on the same day to connect to the newly placed implants. A healing period follows placement to allow the implant to stabilise within the bone. Your clinician will schedule review appointments to monitor progress and provide ongoing care guidance throughout the treatment process.</p>
        </div>
        <div className="hsp-grid-3 hsp-grid-steps">
          {STEPS.map(step => <div className="hsp-card hsp-step" key={step.number}>
            <span className="hsp-step-number">{step.number}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </div>)}
        </div>
      </div>
    </section>

    {/* 5. Potential advantages */}
    <section className="hsp-section hsp-bg-clinical">
      <div className="hsp-container">
        <div className="hsp-heading">
          <span className="hsp-eyebrow">Potential Advantages</span>
          <h2>Benefits of Mini Dental Implants</h2>
          <p>Mini dental implants offer several potential advantages depending on the clinical situation. For patients with removable dentures, mini implants can provide additional stability, which may help improve chewing function and comfort during daily use. Their smaller diameter means they may be suitable in areas where limited bone width makes standard implants more challenging. This can reduce the need for additional bone grafting procedures in some cases, simplifying the overall treatment process. Mini implants can also support replacement teeth in situations where space between adjacent teeth is restricted. The specific advantages depend on the individual case, and your clinician will explain what can realistically be expected based on your clinical assessment.</p>
        </div>
        <div className="hsp-benefits">
          {BENEFITS.map(item => <div className="hsp-benefit" key={item.title}>
            <span className="hsp-card-icon hsp-card-icon-sm"><item.Icon size={20} /></span>
            <h3>{item.title}</h3>
          </div>)}
        </div>
      </div>
    </section>

    {/* 6. Comparison */}
    <section className="hsp-section hsp-bg-surface">
      <div className="hsp-container">
        <div className="hsp-heading">
          <span className="hsp-eyebrow">Comparing Your Options</span>
          <h2>Mini Dental Implants vs Standard Implants</h2>
          <p>The primary difference between mini dental implants and standard <Link href="/">dental implants</Link> is size. Standard implants are wider in diameter and are typically used for replacing individual teeth or supporting fixed bridges. Mini implants have a narrower diameter and are suited to different clinical situations.</p>
          <p>Standard implants generally require sufficient bone width for placement and can support a wide range of restorations, including single crowns, bridges, and full arch restorations. Mini implants are more commonly used for stabilising dentures or in areas where space is limited.</p>
          <p>The treatment planning considerations also differ. Standard implants typically involve a longer healing period, while mini implants may allow for faster restoration in certain cases. The most appropriate option depends on individual clinical factors, which are assessed during a consultation.</p>
        </div>
        <div className="hsp-table-wrap">
          <table className="hsp-table">
            <thead><tr><th>Consideration</th><th>Standard Implants</th><th className="hsp-table-highlight">Mini Implants</th></tr></thead>
            <tbody>
              {COMPARISON.map(([consideration, standard, mini]) => <tr key={consideration}>
                <td>{consideration}</td><td>{standard}</td><td className="hsp-table-highlight">{mini}</td>
              </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </section>

    {/* 7. Cost information */}
    <section className="hsp-section hsp-bg-porcelain">
      <div className="hsp-container hsp-split">
        <div className="hsp-split-copy">
          <span className="hsp-eyebrow">Cost Information</span>
          <h2>Mini Dental Implants Cost in London</h2>
          <p>The cost of mini dental implants in London varies depending on several factors. The number of implants required, the complexity of the treatment, and the type of restoration all contribute to the overall cost.</p>
          <p>Additional considerations may include whether any preparatory procedures are needed and the specific clinical requirements of each case. Each treatment plan is personalised, so costs are determined following a clinical assessment.</p>
          <p>During your consultation, your clinician will provide a detailed treatment plan outlining the expected costs based on your individual needs. This ensures you have a clear understanding of the investment involved before proceeding with treatment.</p>
        </div>
        <div className="hsp-cost-card">
          <div className="hsp-cost-card-head">
            <span className="hsp-chip"><Wallet size={15} />Price Transparency</span>
            <span className="hsp-chip hsp-chip-outline"><ShieldCheck size={15} />Verified Standard</span>
          </div>
          <p className="hsp-cost-card-note">Personalised pricing: Your treatment plan and associated costs are determined following a thorough clinical assessment. Contact us to arrange a consultation and receive an individualised estimate.</p>
          <div className="hsp-cost-card-figure">
            <span className="hsp-overline">Estimated Investment</span>
            <strong>From £2,950 per arch / treatment</strong>
            <em>0% Finance Available (subject to status)</em>
          </div>
          <Link className="hsp-btn hsp-btn-dark hsp-btn-block" href="/booking">Request a Consultation<ArrowRight size={18} /></Link>
        </div>
      </div>
    </section>

    {/* 8. Our approach */}
    <section className="hsp-section hsp-bg-surface">
      <div className="hsp-container">
        <div className="hsp-heading">
          <span className="hsp-eyebrow">Our Approach</span>
          <h2>Why Choose Dental Implants London</h2>
          <p>At Dental Implants London, our clinicians have experience in implant dentistry, including the assessment and placement of mini dental implants. Each patient receives a careful evaluation to determine the most appropriate treatment approach for their individual circumstances.</p>
          <p>We take a personalised approach to treatment planning, considering the clinical factors specific to each case. Our aim is to provide clear, honest guidance so that patients can make informed decisions about their care.</p>
          <p>As a private implant clinic in London, we are committed to maintaining high standards of clinical care and communication throughout the treatment process. From the initial consultation to ongoing reviews, we work to ensure each patient feels informed and supported.</p>
        </div>
        <div className="hsp-grid-4">
          {APPROACH.map(item => <div className="hsp-card hsp-card-quiet" key={item.title}>
            <span className="hsp-card-icon hsp-card-icon-sm"><item.Icon size={22} /></span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>)}
        </div>
      </div>
    </section>

    {/* 9. Serving patients across London */}
    <section className="hsp-section hsp-bg-low">
      <div className="hsp-container hsp-split hsp-split-even">
        <div className="hsp-split-copy">
          <span className="hsp-eyebrow">Serving Patients Across London</span>
          <h2>Mini Dental Implants Near You</h2>
          <p>Our clinic in South Kensington welcomes patients from across London who are considering mini dental implants. Whether you are exploring mini dental implant options or have been referred for assessment, we are here to help.</p>
          <p>Conveniently located at 20 Old Brompton Road, our clinic is easily accessible from many parts of London. We understand that choosing implant treatment is an important decision, and we aim to make the process as straightforward as possible from your first enquiry through to completion of treatment.</p>
          <div className="hsp-actions">
            <Link className="hsp-btn hsp-btn-dark" href="/booking">Book Consultation</Link>
            <a className="hsp-btn hsp-btn-ghost" href={PHONE_HREF}><Phone size={20} />Call {southKensington.phone}</a>
          </div>
        </div>
        <div className="hsp-locate-card">
          <span className="hsp-eyebrow">Prime Central London Surgery</span>
          <h3>South Kensington Clinic - {southKensington.address}</h3>
          <p className="hsp-locate-row"><TrainFront size={20} />2-min walk from South Kensington Station (District, Circle &amp; Piccadilly lines with seamless London-wide connections)</p>
          <p className="hsp-locate-row"><Clock size={20} />Extended Appointments: Mon-Thu 9am-8pm, Fri 8am-5pm, Sat-Sun 10am-4pm</p>
          <a className="hsp-text-link" href={MAPS_SOUTH_KENSINGTON} target="_blank" rel="noopener noreferrer"><Map size={18} />Open in Google Maps</a>
        </div>
      </div>
    </section>

    {/* 10. Team */}
    <section className="hsp-section hsp-bg-surface">
      <div className="hsp-container">
        <div className="hsp-heading-row">
          <div className="hsp-heading">
            <span className="hsp-eyebrow">Our Team</span>
            <h2>London&apos;s Experienced Implant Dentists</h2>
            <p>Our dentists with a special interest in dental implants are highly qualified professionals with years of experience in implant dentistry.</p>
          </div>
          <Link className="hsp-text-link" href="/team">Read Full Bios<ArrowRight size={18} /></Link>
        </div>
        <div className="hsp-grid-4">
          {dentists.slice(0, 4).map(([name, role, gdc]) => <Link className="hsp-dentist" href="/team" key={name}>
            <span className="hsp-dentist-photo"><img {...imageFor(name)} loading="lazy" /></span>
            <span className="hsp-dentist-info">
              <h3>{name}</h3>
              <em>{role}</em>
              <small><BadgeCheck size={14} />GDC: {gdc}</small>
            </span>
          </Link>)}
        </div>
      </div>
    </section>

    {/* 11. Reviews */}
    <section className="hsp-section hsp-bg-clinical">
      <div className="hsp-container">
        <div className="hsp-heading-row">
          <div className="hsp-heading">
            <span className="hsp-eyebrow">Patient Testimonials</span>
            <h2>What Our London Patients Say</h2>
          </div>
          <span className="hsp-rating"><Stars size={20} /><strong>4.9</strong><small>Based on 247 reviews</small></span>
        </div>
        <div className="hsp-grid-3">
          {reviews.map(review => <figure className="hsp-review" key={review.name}>
            <Stars size={16} />
            <blockquote>&ldquo;{review.text}&rdquo;</blockquote>
            <figcaption>{review.name}</figcaption>
          </figure>)}
        </div>
        <p className="hsp-disclaimer">These are genuine reviews from our patients. Individual treatment outcomes may vary.</p>
      </div>
    </section>

    {/* 12. Clinic locations */}
    <section className="hsp-section hsp-bg-surface">
      <div className="hsp-container">
        <div className="hsp-heading">
          <span className="hsp-eyebrow">Two London Locations</span>
          <h2>Our Clinic Locations</h2>
        </div>
        <div className="hsp-grid-2">
          {clinics.map((clinic, index) => <div className="hsp-clinic" key={clinic.name}>
            <div>
              <span className="hsp-eyebrow">{CLINIC_BADGES[index]}</span>
              <h3>{clinic.name}</h3>
              <p>{clinic.address}</p>
              <div className="hsp-clinic-field">
                <span className="hsp-overline">Telephone</span>
                <a href={`tel:${clinic.phone.replace(/\s/g, '')}`}>{clinic.phone}</a>
              </div>
              <div className="hsp-clinic-field">
                <span className="hsp-overline">Opening Hours</span>
                <p>{clinic.hours.map(([day, time]) => `${day} ${time}`).join(', ')}</p>
              </div>
            </div>
            <div className="hsp-clinic-actions">
              <a href={index ? MAPS_CITY : MAPS_SOUTH_KENSINGTON} target="_blank" rel="noopener noreferrer">Open in Google Maps</a>
              <span>·</span>
              <Link href={clinic.path}>Visit clinic</Link>
            </div>
          </div>)}
        </div>
      </div>
    </section>

    {/* 13. FAQs */}
    <section className="hsp-section hsp-bg-low">
      <div className="hsp-container hsp-container-narrow">
        <div className="hsp-heading hsp-heading-centre">
          <span className="hsp-eyebrow">FAQs</span>
          <h2>Dental Implants London FAQs</h2>
          <p>Got questions about mini dental implants in London? Find answers below or visit our <Link href="/faq">full FAQ page</Link>.</p>
        </div>
        <div className="hsp-faqs">
          {FAQS.map(([question, answer]) => <details key={question}>
            <summary>{question}<ChevronDown size={22} /></summary>
            <p>{answer}</p>
          </details>)}
        </div>
      </div>
    </section>

    {/* 14. Closing CTA */}
    <section className="hsp-cta">
      <span className="hsp-cta-glow" aria-hidden="true" />
      <div className="hsp-container">
        <div className="hsp-cta-panel">
          <span className="hsp-cta-halo" aria-hidden="true" />
          <div className="hsp-cta-body">
            <span className="hsp-eyebrow-pill hsp-eyebrow-pill-dark hsp-eyebrow-pill-round"><i /> Take the Next Step</span>
            <h2>Find Out If Mini Dental Implants Are Right for You</h2>
            <p>If you are considering mini dental implants, we invite you to book a consultation at our London clinic. During your appointment, your clinician will assess your suitability, discuss the available options, and develop a personalised treatment plan tailored to your needs.</p>
            <div className="hsp-actions hsp-actions-centre">
              <Link className="hsp-btn hsp-btn-light" href="/booking"><MessageCircle size={20} />Free 15-Min Chat</Link>
              <Link className="hsp-btn hsp-btn-accent" href="/booking"><Calendar size={20} />1-Hour Consultation — £80</Link>
              <a className="hsp-btn hsp-btn-outline" href={PHONE_HREF}><Phone size={20} />Call 020 71833573</a>
            </div>
          </div>
          <div className="hsp-related">
            <div className="hsp-related-rule"><span />Related Treatments<span /></div>
            <div className="hsp-grid-4">
              {RELATED.map(item => <Link className="hsp-related-card" href={item.href} key={item.title}>
                <span><strong>{item.title}</strong><em>{item.text}</em></span>
                <ArrowUpRight size={20} />
              </Link>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  </article>
}
