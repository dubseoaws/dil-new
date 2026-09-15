'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'

const scroll = (amount: number) => document.querySelector('.team-track')?.scrollBy({ left: amount, behavior: 'smooth' })

export function TeamControls() {
  return <div className="team-controls">
    <button className="icon-button" title="Previous dentists" aria-label="Previous dentists" onClick={() => scroll(-620)}><ChevronLeft size={20} /></button>
    <button className="icon-button" title="Next dentists" aria-label="Next dentists" onClick={() => scroll(620)}><ChevronRight size={20} /></button>
  </div>
}
