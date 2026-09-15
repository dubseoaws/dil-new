'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, ScanLine } from 'lucide-react'
import { treatments } from '../data/treatments'

export function TreatmentTabs({ visual }: { visual: { src: string; alt: string } }) {
  const [selectedTreatment, setSelectedTreatment] = useState(0)
  const treatment = treatments[selectedTreatment]
  return <div className="treatments-layout">
    <div className="treatment-tabs" role="tablist" aria-label="Dental implant treatments" aria-orientation="vertical">{treatments.map((item, index) => <button id={`treatment-tab-${index}`} key={item.path} className={selectedTreatment === index ? 'active' : ''} onClick={() => setSelectedTreatment(index)} onKeyDown={event => { if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) { event.preventDefault(); const next = event.key === 'Home' ? 0 : event.key === 'End' ? treatments.length - 1 : (index + (event.key === 'ArrowDown' ? 1 : -1) + treatments.length) % treatments.length; setSelectedTreatment(next); document.getElementById(`treatment-tab-${next}`)?.focus() } }} role="tab" aria-selected={selectedTreatment === index} aria-controls="treatment-panel" tabIndex={selectedTreatment === index ? 0 : -1}><span>0{index + 1}</span>{item.title}<ArrowUpRight size={20} /></button>)}</div>
    <div className="treatment-panel" id="treatment-panel" role="tabpanel" aria-labelledby={`treatment-tab-${selectedTreatment}`}><div className="treatment-visual"><img {...visual} loading="lazy" /><span><ScanLine size={16} />Digital Treatment Planning</span></div><div className="treatment-copy" key={treatment.title}><span className="eyebrow">0{selectedTreatment + 1} / 04</span><h3>{treatment.title}</h3><p>{treatment.text}</p><Link className="text-link" href={treatment.path}>{treatment.title}<ArrowUpRight size={17} /></Link></div></div>
  </div>
}
