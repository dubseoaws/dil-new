'use client'

import { useState } from 'react'
import { MoveHorizontal } from 'lucide-react'

type Image = { src: string; alt: string }

export function Compare({ before, after, title = 'dental treatment' }: { before: Image; after: Image; title?: string }) {
  const [position, setPosition] = useState(50)
  return <div className="comparison"><img {...after} loading="lazy" /><div className="comparison-before" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}><img {...before} loading="lazy" /></div><span className="compare-label before-label">Before</span><span className="compare-label after-label">After</span><div className="compare-line" style={{ left: `${position}%` }}><span><MoveHorizontal size={22} /></span></div><input aria-label={`Compare before and after ${title}`} type="range" min="0" max="100" value={position} onChange={event => setPosition(Number(event.target.value))} /></div>
}
