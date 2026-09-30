import Link from 'next/link'
import {
  Anchor, ArrowRight, ArrowUpRight, BadgeCheck, BriefcaseMedical, Calendar, CalendarCheck, ChevronDown,
  CircleSlash, ClipboardList, Clock, Frown, HandHeart, Headset, Info, Lock, Map, MessageCircle, Microscope,
  Phone, Radiation, Ruler, ShieldCheck, Sparkles, Star, Stethoscope, TrainFront, TriangleAlert,
  Utensils, Wallet, Wand2,
} from 'lucide-react'
import { clinics } from '../data/clinics'
import { dentists, faqs, imageFor, reviews } from '../data/site'

const PHONE_HREF = 'tel:02071833573'
const MAPS_SOUTH_KENSINGTON = 'https://www.google.com/maps?q=20+Old+Brompton+Road,+South+Kensington,+London+SW7+3DL'
const MAPS_CITY = 'https://www.google.com/maps?q=5+Ave+Maria+Lane,+London+EC4M+7AQ'

const HIGHLIGHTS = [
  { Icon: Wallet, title: '0% Finance Available', text: 'Subject to status, so the cost can be spread across monthly payments' },
  { Icon: Anchor, title: 'Anchored by dental implants', text: 'Several implants placed at strategic positions along the jaw' },
  { Icon: Lock, title: 'Fixed in place', text: 'Not removed for daily cleaning in the way that dentures are' },
  { Icon: CalendarCheck, title: 'Free 15-minute consultation', text: 'Discuss your requirements with our clinical team' },
]

const METRICS = [
  { label: 'Load Distribution', value: 'Several', text: 'Implants placed at strategic positions along the jaw' },
  { label: 'Retention Method', value: 'Fixed', text: 'Permanently attached, so the bridge does not move during use' },
]

const INDICATIONS = [
  { Icon: Frown, title: 'Most or all teeth missing', text: 'Replacing all teeth in the upper or lower jaw, or in both arches.' },
  { Icon: HandHeart, title: 'Failing dentures', text: 'A fixed implant supported alternative for uncomfortable or unstable dentures.' },
  { Icon: TriangleAlert, title: 'Extensive tooth loss', text: 'Where tooth loss has followed decay, gum disease, or trauma.' },
  { Icon: Ruler, title: 'Severe damage to remaining teeth', text: 'Where conventional restoration of the remaining teeth is impractical.' },
]

const STEPS = [
  { number: '01', Icon: Radiation, title: 'Assessment & Planning', text: 'Thorough clinical evaluation and personalised treatment plan' },
  { number: '02', Icon: Stethoscope, title: 'Implant Placement', text: 'Strategic placement of implants along the jaw' },
  { number: '03', Icon: Wand2, title: 'Bridge Attachment', text: 'Custom full arch bridge fitted once healing is confirmed' },
]

const BENEFITS = [
  { Icon: Utensils, title: 'Improved chewing function' },
  { Icon: Lock, title: 'Greater stability than removable dentures' },
  { Icon: ShieldCheck, title: 'Fixed restoration — no daily removal' },
  { Icon: Sparkles, title: 'May help maintain jawbone structure' },
  { Icon: CircleSlash, title: 'No adhesives or clasps required' },
  { Icon: Clock, title: 'Designed for long-term function' },
]

const COMPARISON = [
  ['Support', 'Gums and adhesive', 'Dental implants'],
  ['Stability', 'May move during use', 'Fixed securely to implants'],
  ['Removal', 'Removed daily for cleaning', 'Fixed — not removed'],
  ['Bone preservation', 'Does not stimulate bone', 'May help maintain bone'],
]

const APPROACH = [
  { Icon: BriefcaseMedical, title: 'Complex case experience', text: 'Skilled in full arch implant restorations' },
  { Icon: Microscope, title: 'Careful planning', text: 'Thorough assessment before treatment begins' },
  { Icon: ClipboardList, title: 'Personalised approach', text: 'Treatment tailored to your clinical needs' },
  { Icon: Headset, title: 'Ongoing support', text: 'Reviews and aftercare throughout treatment' },
]

const PAGE_FAQS: [string, string][] = [
  ['What is a full arch implant bridge?', 'A full arch implant bridge is a fixed restoration that replaces all teeth in the upper or lower jaw. It is supported by dental implants placed strategically in the jawbone, providing a stable, non-removable alternative to conventional dentures. Suitability is determined through clinical assessment.'],
  ['How many implants support a full arch bridge?', 'The number of implants required varies depending on individual bone quality, jaw anatomy, and clinical factors. Several implants are typically placed at strategic positions along the arch to support the bridge. Your clinician will determine the appropriate number following a thorough assessment.'],
  ['Is the treatment painful?', 'Implant placement is carried out under local anaesthetic to manage discomfort during the procedure. Some soreness or swelling may occur during the healing period afterwards. Your clinician will provide aftercare guidance and appropriate advice on managing any post-procedure discomfort.'],
  ['How long do full arch implant bridges last?', 'The longevity of a full arch implant bridge depends on factors including bone quality, oral hygiene, and overall health. With appropriate care and regular professional reviews, implant bridges are designed to provide long-term function. Your clinician will discuss expected outcomes.'],
  ['Are full arch bridges removable?', 'No, a full arch implant bridge is a fixed restoration that is securely attached to the dental implants. Unlike removable dentures, the bridge stays in place and is not taken out for daily cleaning. It is maintained through regular brushing and professional hygiene appointments.'],
]

const ALL_FAQS: [string, string][] = [...PAGE_FAQS, ...faqs as [string, string][]]

const RELATED = [
  { href: '/all-on-4-dental-implants', title: 'All-on-4 Dental Implants', text: 'Full arch on four implants' },
  { href: '/implant-retained-dentures', title: 'Implant Retained Dentures', text: 'Stabilised removable option' },
  { href: '/full-mouth-reconstruction', title: 'Full Mouth Reconstruction', text: 'Both arches restored' },
  { href: '/dental-implants-cost', title: 'Dental Implants Cost', text: 'Transparent pricing & finance' },
]

const CLINIC_BADGES = ['Open 7 Days', "St Paul's Area"]

const Stars = ({ size }: { size: number }) => <span className="hsp-stars">{[0, 1, 2, 3, 4].map(index => <Star key={index} size={size} fill="currentColor" strokeWidth={0} />)}</span>

export function FullArchImplantBridgePage() {
  const [southKensington] = clinics
  const after = imageFor('After dental implant treatment')
  const before = imageFor('Before dental implant treatment')
  return <article className="hsp">
    {/* 1. Hero */}
    <header className="hsp-hero">
      <span className="hsp-hero-glow" aria-hidden="true" />
      <div className="hsp-container hsp-hero-grid">
        <div className="hsp-hero-copy">
          <span className="hsp-eyebrow-pill"><i /> Full Arch Tooth Replacement in London</span>
          <h1>Implant Supported Full Arch Bridge London</h1>
          <p className="hsp-lead">Full arch fixed teeth replacement from £12,995 at our South Kensington clinic. Replace all teeth in the upper or lower jaw with a fixed restoration anchored by dental implants. Free 15-minute consultation. 0% finance available.</p>
          <div className="hsp-actions">
            <Link className="hsp-btn hsp-btn-light" href="/booking">Free 15-Min Chat</Link>
            <Link className="hsp-btn hsp-btn-dark" href="/booking">1-Hour Consultation — £80</Link>
            <a className="hsp-btn hsp-btn-ghost" href={PHONE_HREF}><Phone size={20} />Call 020 71833573</a>
          </div>
          <p className="hsp-hero-note"><ShieldCheck size={16} />Treatment suitability is determined following consultation · Results vary between individuals</p>
        </div>
        <aside className="hsp-highlight-card">
          <div className="hsp-highlight-head">
            <span className="hsp-eyebrow">Clinical Highlights</span>
            <span className="hsp-chip hsp-chip-outline"><BadgeCheck size={15} />Verified Standard</span>
          </div>
          <div className="hsp-highlight-figure">
            <span className="hsp-overline">Surgical package fee</span>
            <strong>Starting from £12,995</strong>
          </div>
          <div className="hsp-highlight-list">
            {HIGHLIGHTS.map(item => <div className="hsp-highlight" key={item.title}>
              <item.Icon size={20} />
              <span>
                <strong>{item.title}</strong>
                <em>{item.text}</em>
              </span>
            </div>)}
          </div>
          <Link className="hsp-btn hsp-btn-dark hsp-btn-block" href="/booking">Book South Kensington Visit</Link>
        </aside>
      </div>
    </header>

    {/* 2. Understanding the treatment */}
    <section className="hsp-section hsp-bg-surface">
      <div className="hsp-container hsp-split hsp-split-even">
        <div className="hsp-split-copy">
          <span className="hsp-eyebrow">Understanding the Treatment</span>
          <h2>What Is an Implant Supported Full Arch Bridge?</h2>
          <p>An implant supported full arch bridge is a fixed dental restoration designed to replace all teeth in the upper or lower jaw. Rather than resting on the gums like a traditional denture, the bridge is anchored directly by dental implants placed into the jawbone.</p>
          <p>The implants act as artificial tooth roots, providing a stable and secure foundation for the full arch bridge. Once the implants have integrated with the surrounding bone, a custom-made bridge is permanently attached, restoring both the appearance and function of a complete set of teeth.</p>
          <p>Because the bridge is fixed in place, it does not need to be removed for cleaning in the way that removable dentures do. This type of restoration is designed to feel and function more like natural teeth, offering patients a long-term solution for complete tooth loss in one or both arches.</p>
        </div>
        <div className="hsp-spec-card">
          <div className="hsp-spec-head">
            <span className="hsp-card-icon hsp-card-icon-sm"><Anchor size={22} /></span>
            <span>
              <h3>Fixed Prosthetic Design</h3>
              <small>Anchored directly by dental implants</small>
            </span>
          </div>
          <div className="hsp-metrics">
            {METRICS.map(metric => <div className="hsp-metric" key={metric.label}>
              <span className="hsp-overline">{metric.label}</span>
              <strong>{metric.value}</strong>
              <p>{metric.text}</p>
            </div>)}
          </div>
          <p className="hsp-spec-note"><Info size={18} />The implants distribute biting forces through the jawbone, which may help maintain bone structure in areas where teeth have been lost.</p>
        </div>
      </div>
    </section>

    {/* 3. Candidate suitability */}
    <section className="hsp-section hsp-bg-low">
      <div className="hsp-container">
        <div className="hsp-heading">
          <span className="hsp-eyebrow">Is This Treatment Right for You?</span>
          <h2>Who May Need a Full Arch Implant Bridge?</h2>
          <p>A full arch implant bridge may be considered for patients who have lost most or all teeth in the upper or lower jaw. This includes those experiencing extensive tooth loss due to decay, gum disease, or trauma, as well as patients with severe damage to their remaining teeth that makes conventional restoration impractical.</p>
          <p>Patients who are struggling with failing or uncomfortable dentures may also wish to explore a fixed implant supported alternative. For those <Link href="/conditions/missing-teeth-single-multiple">replacing several missing teeth</Link> or facing the prospect of losing remaining teeth, a full arch bridge can provide a comprehensive fixed solution.</p>
          <p>Suitability for this treatment depends on individual clinical factors, including bone quality, oral health, and overall medical history. A thorough assessment is carried out during a consultation to determine whether this approach is appropriate for your circumstances.</p>
        </div>
        <div className="hsp-grid-4">
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
          <h2>How Full Arch Implant Bridges Work</h2>
          <p>The process begins with a comprehensive clinical assessment, including imaging, to evaluate bone quality and plan the placement of <Link href="/">dental implants</Link>. Several implants are placed at strategic positions along the jaw to provide optimal support for the full arch restoration.</p>
          <p>Following implant placement, a healing period is required to allow the implants to integrate with the surrounding bone. The length of this period varies depending on individual healing and the clinical circumstances of each case.</p>
          <p>Once integration is confirmed, impressions are taken and a custom full arch bridge is fabricated. The final bridge restoration is then securely attached to the implants, restoring the appearance and function of a complete arch of teeth. Review appointments are scheduled to monitor the restoration and provide ongoing care guidance.</p>
        </div>
        <div className="hsp-grid-3 hsp-grid-steps">
          {STEPS.map(step => <div className="hsp-card hsp-step" key={step.number}>
            <span className="hsp-step-head">
              <span className="hsp-step-number">{step.number}</span>
              <step.Icon size={24} />
            </span>
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
          <h2>Benefits of Full Arch Implant Bridges</h2>
          <p>A full arch implant bridge offers several potential advantages for patients who have lost all teeth in one arch. Because the bridge is fixed to implants rather than resting on the gums, it may provide greater stability and confidence during eating and speaking compared with removable dentures.</p>
          <p>The implants distribute biting forces through the jawbone, which may help maintain bone structure in areas where teeth have been lost. This can contribute to supporting long-term oral health and facial structure.</p>
          <p>As a fixed restoration, a full arch implant bridge removes the need for denture adhesives, clasps, or daily removal. The bridge is maintained through regular brushing and professional hygiene appointments, providing a straightforward care routine.</p>
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
          <h2>Full Arch Bridges vs Removable Dentures</h2>
          <p>Removable dentures are a well-established option for replacing a full arch of missing teeth. They rest on the gums and are held in place by suction or adhesive. While they can restore appearance and basic function, some patients experience difficulties with stability, comfort, or confidence when eating and speaking.</p>
          <p>An implant supported full arch bridge, by contrast, is fixed to dental implants placed in the jawbone. This provides a more secure foundation, meaning the restoration does not move during use. Patients who have struggled with loose or uncomfortable dentures may also wish to consider <Link href="/implant-retained-dentures">implant retained dentures</Link> as an alternative approach.</p>
          <p>In terms of maintenance, removable dentures need to be taken out daily for cleaning and typically require periodic adjustments or relining. A fixed full arch bridge is cared for in a similar way to natural teeth, through regular brushing and professional hygiene appointments.</p>
          <p>The most appropriate option depends on individual clinical circumstances, preferences, and budget. Your clinician will discuss both approaches and recommend the treatment best suited to your needs.</p>
        </div>
        <div className="hsp-table-wrap">
          <table className="hsp-table">
            <thead><tr><th>Consideration</th><th>Removable Dentures</th><th className="hsp-table-highlight">Full Arch Implant Bridge</th></tr></thead>
            <tbody>
              {COMPARISON.map(([consideration, denture, bridge]) => <tr key={consideration}>
                <td>{consideration}</td><td>{denture}</td><td className="hsp-table-highlight">{bridge}</td>
              </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </section>

    {/* 7. Before & after */}
    <section className="hsp-section hsp-bg-porcelain">
      <div className="hsp-container">
        <div className="hsp-heading-row">
          <div className="hsp-heading">
            <span className="hsp-eyebrow">Before &amp; After</span>
            <h2>Real Patient Results</h2>
            <p>An implant supported bridge case treated by Dr Kamran Yazdi at our London clinic.</p>
          </div>
        </div>
        <div className="hsp-grid-2">
          {[['Before', before], ['After', after]].map(([label, image]) => <figure className="hsp-case" key={label as string}>
            <span className="hsp-case-photo">
              <img {...image as { src: string, alt: string }} loading="lazy" />
              <span className="hsp-case-tag">{label as string}</span>
            </span>
            <figcaption>{(image as { alt: string }).alt}</figcaption>
          </figure>)}
        </div>
        <p className="hsp-disclaimer">Individual results may vary. Treatment by our implant team.</p>
      </div>
    </section>

    {/* 8. Cost information */}
    <section className="hsp-section hsp-bg-low">
      <div className="hsp-container hsp-split">
        <div className="hsp-split-copy">
          <span className="hsp-eyebrow">Cost Information</span>
          <h2>Full Arch Implant Bridge Cost in London</h2>
          <p>The cost of a full arch implant bridge in London varies depending on several factors. The number of implants required, the complexity of the treatment, and the type of final restoration all contribute to the overall cost.</p>
          <p>Additional considerations may include whether preparatory procedures are needed — such as bone grafting or extractions — and the materials selected for the bridge. Each treatment plan is personalised, so costs are determined following a clinical assessment.</p>
          <p>During your consultation, your clinician will provide a detailed treatment plan outlining the expected costs based on your individual needs. This ensures you have a clear understanding of the investment involved before proceeding with treatment.</p>
        </div>
        <div className="hsp-cost-card">
          <div className="hsp-cost-card-head">
            <span className="hsp-chip"><Wallet size={15} />Fee Transparency</span>
            <span className="hsp-chip hsp-chip-outline"><ShieldCheck size={15} />Verified Standard</span>
          </div>
          <p className="hsp-cost-card-note"><strong>Personalised pricing:</strong> Your treatment plan and associated costs are determined following a thorough clinical assessment. Contact us to arrange a consultation and receive an individualised estimate.</p>
          <div className="hsp-cost-card-figure">
            <span className="hsp-overline">Estimated treatment cost</span>
            <strong>From £12,995 per arch</strong>
            <em>0% Finance Available (subject to status)</em>
          </div>
          <Link className="hsp-btn hsp-btn-dark hsp-btn-block" href="/booking">Request a Consultation<ArrowRight size={18} /></Link>
        </div>
      </div>
    </section>

    {/* 9. Our approach */}
    <section className="hsp-section hsp-bg-surface">
      <div className="hsp-container">
        <div className="hsp-heading">
          <span className="hsp-eyebrow">Our Approach</span>
          <h2>Why Choose Dental Implants London</h2>
          <p>At Dental Implants London, our clinicians have experience in complex implant restorations, including the planning and placement of full arch implant bridges. Each patient receives a careful assessment to develop a treatment plan suited to their individual circumstances.</p>
          <p>We take a personalised approach to treatment planning, considering the clinical factors specific to each case. Our aim is to provide clear, honest guidance so that patients can make informed decisions about their care.</p>
          <p>As a private implant clinic in London, we are committed to maintaining high standards of clinical care and communication throughout the treatment process. From the initial consultation to ongoing reviews, we work to ensure each patient feels informed and supported at every stage.</p>
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

    {/* 10. Serving patients across London */}
    <section className="hsp-section hsp-bg-clinical">
      <div className="hsp-container hsp-split hsp-split-even">
        <div className="hsp-split-copy">
          <span className="hsp-eyebrow-pill"><i /> Serving Patients Across London</span>
          <h2>Full Arch Dental Implants Near You</h2>
          <p>Our clinic in South Kensington welcomes patients from across London who are considering a full arch implant bridge. Whether you are exploring full arch dental implant options or have been referred for assessment, we are here to help.</p>
          <p>Conveniently located at 20 Old Brompton Road, our clinic is easily accessible from many parts of London. We understand that full arch restoration is a significant decision, and we aim to make the process as straightforward as possible from your first enquiry through to completion of treatment.</p>
          <div className="hsp-actions">
            <Link className="hsp-btn hsp-btn-dark" href="/booking">Book Consultation</Link>
            <a className="hsp-btn hsp-btn-ghost" href={PHONE_HREF}><Phone size={20} />Call {southKensington.phone}</a>
          </div>
        </div>
        <div className="hsp-locate-card">
          <span className="hsp-eyebrow">Prime Central London Surgery</span>
          <h3>South Kensington Clinic - {southKensington.address}</h3>
          <p className="hsp-locate-row"><TrainFront size={20} />2-min walk from South Kensington Station (District, Circle &amp; Piccadilly lines with seamless London-wide connections)</p>
          <p className="hsp-locate-row"><Clock size={20} />Extended Appointments: {southKensington.hours.map(([day, time]) => `${day} ${time}`).join(', ')}</p>
          <a className="hsp-text-link" href={MAPS_SOUTH_KENSINGTON} target="_blank" rel="noopener noreferrer"><Map size={18} />Open in Google Maps</a>
        </div>
      </div>
    </section>

    {/* 11. Team */}
    <section className="hsp-section hsp-bg-low">
      <div className="hsp-container">
        <div className="hsp-heading-row">
          <div className="hsp-heading">
            <span className="hsp-eyebrow">Our Team</span>
            <h2>London&apos;s Experienced Implant Dentists</h2>
            <p>Our dentists with a special interest in dental implants are highly qualified professionals with years of experience in implant dentistry.</p>
          </div>
          <Link className="hsp-text-link" href="/team">Read full bios<ArrowRight size={18} /></Link>
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

    {/* 12. Reviews */}
    <section className="hsp-section hsp-bg-surface">
      <div className="hsp-container">
        <div className="hsp-heading-row">
          <div className="hsp-heading">
            <span className="hsp-eyebrow">Patient reviews</span>
            <h2>What Our London Patients Say</h2>
          </div>
          <span className="hsp-rating"><Stars size={20} /><strong>4.9</strong><small>Google Reviews · Based on 247 reviews</small></span>
        </div>
        <div className="hsp-grid-3">
          {reviews.map(review => <figure className="hsp-review" key={review.name}>
            <Stars size={16} />
            <blockquote>&ldquo;{review.text}&rdquo;</blockquote>
            <figcaption>{review.name}<small>Google review</small></figcaption>
          </figure>)}
        </div>
        <p className="hsp-disclaimer">These are genuine reviews from our patients. Individual treatment outcomes may vary.</p>
      </div>
    </section>

    {/* 13. Clinic locations */}
    <section className="hsp-section hsp-bg-low">
      <div className="hsp-container">
        <div className="hsp-heading">
          <span className="hsp-eyebrow">Two London Locations</span>
          <h2>Our Clinic Locations</h2>
          <p>Our clinic in South Kensington welcomes patients from across London who are considering a full arch implant bridge. Conveniently located at 20 Old Brompton Road, our clinic is easily accessible from many parts of London.</p>
        </div>
        <div className="hsp-grid-2">
          {clinics.map((clinic, index) => <div className="hsp-clinic" key={clinic.name}>
            <div>
              <div className="hsp-clinic-head">
                <h3>{clinic.name}</h3>
                <span className="hsp-chip hsp-chip-outline">{CLINIC_BADGES[index]}</span>
              </div>
              <p>{clinic.address}</p>
              <div className="hsp-clinic-field">
                <span className="hsp-overline">Telephone</span>
                <a href={`tel:${clinic.phone.replace(/\s/g, '')}`}>{clinic.phone}</a>
              </div>
              <div className="hsp-clinic-field hsp-clinic-hours">
                <span className="hsp-overline">Opening Hours</span>
                {clinic.hours.map(([day, time]) => <span key={day}><i>{day}</i><b>{time}</b></span>)}
              </div>
            </div>
            <div className="hsp-clinic-actions">
              <a href={index ? MAPS_CITY : MAPS_SOUTH_KENSINGTON} target="_blank" rel="noopener noreferrer"><Map size={18} />Open in Google Maps</a>
              <span>·</span>
              <Link href={clinic.path}>Visit clinic →</Link>
            </div>
          </div>)}
        </div>
      </div>
    </section>

    {/* 14. FAQs */}
    <section className="hsp-section hsp-bg-surface">
      <div className="hsp-container hsp-container-narrow">
        <div className="hsp-heading hsp-heading-centre">
          <span className="hsp-eyebrow">FAQs</span>
          <h2>Dental Implants London FAQs</h2>
          <p>Got questions about dental implants in London? Find answers below or visit our <Link href="/faq">full FAQ page</Link>.</p>
        </div>
        <div className="hsp-faqs">
          {ALL_FAQS.map(([question, answer]) => <details key={question}>
            <summary>{question}<ChevronDown size={22} /></summary>
            <p>{answer}</p>
          </details>)}
        </div>
      </div>
    </section>

    {/* 15. Closing CTA */}
    <section className="hsp-cta">
      <span className="hsp-cta-glow" aria-hidden="true" />
      <div className="hsp-container">
        <div className="hsp-cta-panel">
          <span className="hsp-cta-halo" aria-hidden="true" />
          <div className="hsp-cta-body">
            <span className="hsp-eyebrow-pill hsp-eyebrow-pill-dark hsp-eyebrow-pill-round"><i /> Take the Next Step</span>
            <h2>Find Out If a Full Arch Implant Bridge Is Right for You</h2>
            <p>If you are considering a full arch implant bridge, we invite you to <Link href="/booking">arrange an appointment</Link> at our London clinic. During your consultation, your clinician will assess your suitability, discuss the available options, and develop a personalised treatment plan tailored to your needs.</p>
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
