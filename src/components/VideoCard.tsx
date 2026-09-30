'use client'

import { useState, type SyntheticEvent } from 'react'
import { Play } from 'lucide-react'

export function VideoCard({ id, title, caption, className = '' }: { id: string; title: string; caption?: string; className?: string }) {
  const [playing, setPlaying] = useState(false)
  // Videos without a maxres thumbnail serve a 120x90 grey placeholder instead of failing, so detect it by size.
  const useFallback = (event: SyntheticEvent<HTMLImageElement>) => {
    const image = event.currentTarget
    if (image.naturalWidth <= 120) image.src = `https://i.ytimg.com/vi/${id}/sddefault.jpg`
  }
  return <figure className={`ao4-video-card ${className}`}>
    <div className="ao4-video-frame">
      {playing
        ? <iframe src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`} title={title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
        : <button type="button" onClick={() => setPlaying(true)} aria-label={`Play ${title}`}><img src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`} alt="" onLoad={useFallback} onError={useFallback} /><span className="ao4-video-play"><Play size={28} fill="currentColor" /></span></button>}
    </div>
    {caption && <figcaption><b>{title}</b><span>{caption}</span></figcaption>}
  </figure>
}
