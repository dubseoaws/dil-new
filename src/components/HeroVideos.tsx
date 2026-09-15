'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Play, X } from 'lucide-react'

const heroVideos = [
  { id: 'Huq5WJ2grKc', title: 'Dental Implants Explained | A Premium Solution for Missing Teeth' },
  { id: 'n33iO5y6N0g', title: '"I Can\'t Stop Smiling!" | Composite Bonding Patient Review' },
  { id: 'M_ZfyFgI9y0', title: 'Dental Bridge Treatment | Replace Missing Teeth and Restore Your Smile' },
]

export function HeroVideos() {
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
