'use client'

import { useState } from 'react'
import type { GalleryContent } from '@/lib/html'
import { Button } from './ui'
import { Compare } from './Compare'

export function GalleryPage({ gallery }: { gallery: GalleryContent }) {
  const [category, setCategory] = useState('All')
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
