'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Search } from 'lucide-react'

export type BlogEntry = { path: string; title: string; description: string; image?: string; alt?: string }

// The page renders its own ten articles; the full index is fetched afterwards for search and pagination.
export function BlogDirectory({ initialPage, initialArticles, total }: { initialPage: number; initialArticles: BlogEntry[]; total: number }) {
  const [articles, setArticles] = useState(initialArticles)
  const [loaded, setLoaded] = useState(false)
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(initialPage)
  const [failed, setFailed] = useState(false)
  useEffect(() => {
    const controller = new AbortController()
    fetch('/content/blog-index.json', { signal: controller.signal }).then(response => {
      if (!response.ok) throw new Error('Articles unavailable')
      return response.json()
    }).then((all: BlogEntry[]) => { setArticles(all); setLoaded(true) }).catch(error => { if (error.name !== 'AbortError') setFailed(true) })
    return () => controller.abort()
  }, [])
  const matches = loaded ? articles.filter(article => `${article.title} ${article.description}`.toLowerCase().includes(query.trim().toLowerCase())) : articles
  const pageCount = Math.max(1, Math.ceil((loaded ? matches.length : total) / 10))
  const visible = loaded ? matches.slice((pageNumber - 1) * 10, pageNumber * 10) : articles
  return <section className="inner-band"><div className="container inner-band-content">
    <div className="inner-directory-toolbar"><label><span>Search articles</span><div><Search size={18} /><input type="search" value={query} onChange={event => { setQuery(event.target.value); setPageNumber(1) }} disabled={!loaded} /></div></label><p role="status">{failed ? 'Articles unavailable' : `${loaded ? matches.length : total} articles`}</p></div>
    {failed && <a href="https://www.dental-implants-london.co.uk/blog">View original blog</a>}
    {loaded && !matches.length && <p>No articles found.</p>}
    <div className="inner-grid inner-image-grid inner-blog-grid">{visible.map(article => <article className="inner-item" key={article.path}><Link href={article.path}>{article.image && <img src={article.image} alt={article.alt || ''} loading="lazy" onError={event => { event.currentTarget.style.display = 'none' }} />}<div><h2>{article.title}</h2><p>{article.description}</p><span className="text-link">Read article<ArrowRight size={16} /></span></div></Link></article>)}</div>
    {pageCount > 1 && <nav className="inner-pagination" aria-label="Article pagination"><button className="icon-button" title="Previous page" aria-label="Previous page" disabled={!loaded || pageNumber === 1} onClick={() => setPageNumber(number => number - 1)}><ArrowLeft size={20} /></button><span role="status">Page {pageNumber} of {pageCount}</span><button className="icon-button" title="Next page" aria-label="Next page" disabled={!loaded || pageNumber === pageCount} onClick={() => setPageNumber(number => number + 1)}><ArrowRight size={20} /></button></nav>}
  </div></section>
}
