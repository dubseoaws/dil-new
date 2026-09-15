import Link from 'next/link'
import { ArrowUpRight, Clock3, MapPin, Phone } from 'lucide-react'
import { clinics } from '../data/clinics'

export function ClinicLocations() {
  return <div className="clinic-locations" data-clinic-locations>
    {clinics.map(clinic => <article className="clinic-location" key={clinic.path}>
      <iframe title={`${clinic.name} Google map`} src={`https://maps.google.com/maps?q=${encodeURIComponent(clinic.address)}&output=embed`} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
      <div className="clinic-location-details">
        <h3><Link href={clinic.path}>{clinic.name}<ArrowUpRight size={20} /></Link></h3>
        <address><MapPin size={19} /><span>{clinic.address}</span></address>
        <a className="clinic-location-phone" href={`tel:${clinic.phone.replaceAll(' ', '')}`}><Phone size={18} />{clinic.phone}</a>
        <h4><Clock3 size={18} />Opening Hours</h4>
        <dl>{clinic.hours.map(([day, hours]) => <div key={day}><dt>{day}</dt><dd>{hours}</dd></div>)}</dl>
        <div className="clinic-location-actions"><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinic.address)}`} target="_blank" rel="noopener noreferrer">Open in Google Maps<ArrowUpRight size={17} /></a><Link href={clinic.path}>Visit clinic<ArrowUpRight size={17} /></Link></div>
      </div>
    </article>)}
  </div>
}
