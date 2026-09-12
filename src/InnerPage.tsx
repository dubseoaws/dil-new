import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, Search } from 'lucide-react'
import './InnerPage.css'

type BlogEntry = { path: string; title: string; description: string; image?: string; alt?: string }

function BlogDirectory({ initialPage }: { initialPage: number }) {
  const [articles, setArticles] = useState<BlogEntry[]>([])
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(initialPage)
  const [failed, setFailed] = useState(false)
  useEffect(() => {
    const controller = new AbortController()
    fetch('/content/blog-index.json', { signal: controller.signal }).then(response => {
      if (!response.ok) throw new Error('Articles unavailable')
      return response.json()
    }).then(setArticles).catch(error => { if (error.name !== 'AbortError') setFailed(true) })
    return () => controller.abort()
  }, [])
  const matches = articles.filter(article => `${article.title} ${article.description}`.toLowerCase().includes(query.trim().toLowerCase()))
  const pageCount = Math.max(1, Math.ceil(matches.length / 10))
  return <section className="inner-band"><div className="container inner-band-content">
    <div className="inner-directory-toolbar"><label><span>Search articles</span><div><Search size={18} /><input type="search" value={query} onChange={event => { setQuery(event.target.value); setPageNumber(1) }} /></div></label><p role="status">{failed ? 'Articles unavailable' : !articles.length ? 'Loading articles...' : `${matches.length} articles`}</p></div>
    {failed && <a href="https://www.dental-implants-london.co.uk/blog">View original blog</a>}
    {!!articles.length && !matches.length && <p>No articles found.</p>}
    <div className="inner-grid inner-image-grid inner-blog-grid">{matches.slice((pageNumber - 1) * 10, pageNumber * 10).map(article => <article className="inner-item" key={article.path}><a href={article.path}>{article.image && <img src={article.image} alt={article.alt || ''} loading="lazy" />}<div><h2>{article.title}</h2><p>{article.description}</p><span className="text-link">Read article<ArrowRight size={16} /></span></div></a></article>)}</div>
    {matches.length > 10 && <nav className="inner-pagination" aria-label="Article pagination"><button className="icon-button" title="Previous page" aria-label="Previous page" disabled={pageNumber === 1} onClick={() => setPageNumber(number => number - 1)}><ArrowLeft size={20} /></button><span role="status">Page {pageNumber} of {pageCount}</span><button className="icon-button" title="Next page" aria-label="Next page" disabled={pageNumber === pageCount} onClick={() => setPageNumber(number => number + 1)}><ArrowRight size={20} /></button></nav>}
  </div></section>
}

export function InnerPage({ html, path }: { html: string; path: string }) {
  const [content] = useState(() => {
    const document = new DOMParser().parseFromString(html, 'text/html')
    const hero = document.querySelector('.page-hero-copy')
    const heroHtml = hero?.innerHTML || ''
    hero?.remove()
    document.querySelectorAll('nav').forEach(nav => {
      if (nav.querySelector('ol') && !nav.querySelector('h2,h3')) nav.remove()
    })
    document.querySelectorAll('div, span').forEach(element => {
      if (!element.textContent?.trim() && !element.querySelector('img, iframe, input, a, video')) element.remove()
    })
    document.querySelectorAll('div').forEach(element => {
      const children = Array.from(element.children)
      if (children.length < 2 || children.length > 16 || element.querySelector('h1')) return
      const isCollection = children.every(child => ['DIV', 'ARTICLE', 'A'].includes(child.tagName) && child.querySelectorAll('h2,h3,h4').length === 1)
      if (isCollection) {
        element.classList.add('inner-grid')
        children.forEach(child => child.classList.add('inner-item'))
        if (children.every(child => child.querySelector('img'))) element.classList.add('inner-image-grid')
        if (children.every(child => /^(Dr[. ]|Jack Button|Laila Alhussein)/.test(child.querySelector('img')?.getAttribute('alt') || ''))) element.classList.add('inner-staff-grid')
      }
    })
    document.querySelectorAll('table').forEach(table => {
      const wrapper = document.createElement('div')
      wrapper.className = 'inner-table-scroll'
      wrapper.tabIndex = 0
      wrapper.setAttribute('role', 'region')
      wrapper.setAttribute('aria-label', 'Scrollable comparison table')
      table.before(wrapper)
      wrapper.append(table)
    })
    document.querySelectorAll('img').forEach(image => { image.loading = 'lazy' })
    if (path === '/contact') {
      const mapHeading = Array.from(document.querySelectorAll('h3')).find(heading => heading.textContent === 'Find Us On The Map')
      if (mapHeading) {
        const map = document.createElement('iframe')
        map.className = 'inner-clinic-map'
        map.title = 'South Kensington clinic location'
        map.src = 'https://maps.google.com/maps?q=20%20Old%20Brompton%20Road%2C%20London%20SW7%203DL&output=embed'
        map.loading = 'lazy'
        map.referrerPolicy = 'strict-origin-when-cross-origin'
        mapHeading.after(map)
      }
    }
    document.querySelectorAll('div').forEach(element => {
      const children = Array.from(element.children)
      if (children.length === 2 && children[0].tagName === 'SPAN' && children[0].textContent?.trim().endsWith('?') && children[1].tagName === 'DIV') {
        const details = document.createElement('details')
        const summary = document.createElement('summary')
        summary.textContent = children[0].textContent
        details.append(summary, children[1])
        element.replaceWith(details)
      }
      if (children.length === 2 && children.every(child => child.tagName === 'SPAN')) element.classList.add('inner-key-value')
      if (path === '/team' && children.length === 2 && children[0].querySelector('img') && children[1].querySelector('h2')) {
        element.className = 'inner-profile'
        element.parentElement?.classList.remove('inner-grid', 'inner-image-grid')
      }
    })
    let root: Element = document.body
    while (root.children.length === 1 && root.firstElementChild?.tagName === 'DIV' && !root.classList.contains('inner-grid')) root = root.firstElementChild
    const sections = (root.classList.contains('inner-grid') ? [root] : Array.from(root.children)).filter(element => element.textContent?.trim() || element.querySelector('img'))
    const headings = Array.from(document.querySelectorAll('h2,h3')).filter(heading => !heading.closest('.inner-item')).slice(0, 14).map((heading, index) => {
      const id = heading.id || `page-section-${index + 1}`
      heading.id = id
      return { id, title: heading.textContent || '' }
    })
    return { hero: heroHtml, sections: sections.map(section => section.outerHTML), headings }
  })
  const isDirectory = path === '/blog' || path.startsWith('/blog/page/')
  const isArticle = (path.startsWith('/blog/') && !isDirectory) || /terms|policy|privacy|complaints/.test(path)
  return <article className={`inner-page imported-content${isArticle ? ' inner-reading-page' : ''}`}>
    <header className="inner-page-heading"><div className="container"><div className="page-hero-copy" dangerouslySetInnerHTML={{ __html: content.hero }} /></div></header>
    {content.headings.length > 1 && <nav className="inner-page-navigation container" aria-label="On this page"><details><summary>On this page</summary><ol>{content.headings.map(heading => <li key={heading.id}><a href={`#${heading.id}`}>{heading.title}</a></li>)}</ol></details></nav>}
    <div className="inner-page-body">{isDirectory ? <BlogDirectory initialPage={Number(path.split('/')[3]) || 1} /> : content.sections.map((section, index) => <section className="inner-band" key={index}><div className="container inner-band-content" dangerouslySetInnerHTML={{ __html: section }} /></section>)}</div>
  </article>
}