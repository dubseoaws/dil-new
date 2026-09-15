import { ArrowRight } from 'lucide-react'
import type { InnerContent } from '@/lib/html'
import { ClinicLocations } from './ClinicLocations'
import { BlogDirectory, type BlogEntry } from './BlogDirectory'

const heroVideos: Record<string, { id: string; title: string }> = {
  '/single-tooth-implant': { id: 'JyjVdDbavkA', title: 'Impacted Wisdom Tooth | The Hidden Problem at the Back of Your Mouth' },
  '/all-on-4-dental-implants': { id: 'mWMhRZo2E54', title: 'All-on-4 page video' },
}

export function InnerPage({ content, path, blog }: { content: InnerContent; path: string; blog?: { articles: BlogEntry[]; total: number; page: number } }) {
  const isDirectory = path === '/blog' || path.startsWith('/blog/page/')
  const isArticle = (path.startsWith('/blog/') && !isDirectory) || /terms|policy|privacy|complaints/.test(path)
  const heroVideo = heroVideos[path]
  return <article className={`inner-page imported-content${isArticle ? ' inner-reading-page' : ''}${path === '/all-on-4-dental-implants' ? ' all-on-four-page' : ''}`}>
    <header className={`inner-page-heading${heroVideo ? ' inner-heading-with-video' : ''}`}><div className="container"><div className="page-hero-copy" dangerouslySetInnerHTML={{ __html: content.hero }} />{heroVideo && <div className="inner-hero-video"><iframe className="inner-treatment-video" title={heroVideo.title} src={`https://www.youtube-nocookie.com/embed/${heroVideo.id}?rel=0`} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /><a href={`https://www.youtube.com/watch?v=${heroVideo.id}`} target="_blank" rel="noopener noreferrer">Watch on YouTube<ArrowRight size={16} /></a></div>}</div></header>
    {content.headings.length > 1 && <nav className="inner-page-navigation container" aria-label="On this page"><details><summary>On this page</summary><ol>{content.headings.map(heading => <li key={heading.id}><a href={`#${heading.id}`}>{heading.title}</a></li>)}</ol></details></nav>}
    <div className="inner-page-body">{isDirectory && blog ? <BlogDirectory initialPage={blog.page} initialArticles={blog.articles} total={blog.total} /> : content.sections.map((section, index) => <section className="inner-band" key={index}><div className="container inner-band-content"><div dangerouslySetInnerHTML={{ __html: section.html }} />{section.showLocations && <ClinicLocations />}</div></section>)}</div>
  </article>
}
