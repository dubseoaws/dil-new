'use client'

import { useState } from 'react'
import { Play } from 'lucide-react'

export function VideoCard({ id, title, caption, className = '' }: { id: string; title: string; caption?: string; className?: string }) {
  const [playing, setPlaying] = useState(false)
  return <figure className={`ao4-video-card ${className}`}>
    <div className="ao4-video-frame">
      {playing
        ? <iframe src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`} title={title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
        : <button type="button" onClick={() => setPlaying(true)} aria-label={`Play ${title}`}><img src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`} alt="" /><span className="ao4-video-play"><Play size={28} fill="currentColor" /></span></button>}
    </div>
    {caption && <figcaption><b>{title}</b><span>{caption}</span></figcaption>}
  </figure>
}
