import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, Search } from 'lucide-react'
import { ClinicLocations } from './ClinicLocations'
import './InnerPage.css'
import './AllOnFour.css'

type BlogEntry = { path: string; title: string; description: string; image?: string; alt?: string }

const heroVideos: Record<string, { id: string; title: string }> = {
  '/single-tooth-implant': { id: 'JyjVdDbavkA', title: 'Impacted Wisdom Tooth | The Hidden Problem at the Back of Your Mouth' },
  '/all-on-4-dental-implants': { id: 'mWMhRZo2E54', title: 'All-on-4 page video' },
}

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
    const textNodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
    while (textNodes.nextNode()) textNodes.currentNode.textContent = textNodes.currentNode.textContent?.replace(/\\u(201[3489cd]|00b7|2713)/gi, (_match, code: string) => String.fromCharCode(parseInt(code, 16))) || ''
    const isBlogArticle = path.startsWith('/blog/') && !path.startsWith('/blog/page/')
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
      if (children.length < 2 || element.querySelector('h1')) return
      const isCollection = !isBlogArticle && children.every(child => ['DIV', 'ARTICLE', 'A'].includes(child.tagName) && child.querySelectorAll('h2,h3,h4').length === 1) && children.every(child => child.querySelector('h2,h3,h4')?.tagName === children[0].querySelector('h2,h3,h4')?.tagName)
      if (isCollection) {
        element.classList.add('inner-grid')
        if (children.length === 3 || children.length > 6) element.classList.add('inner-grid-three')
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
    const isMediaOnly = (element: Element) => !!element.querySelector('img') && !element.querySelector('h2,h3,h4,p,ul,ol,table') && (element.textContent?.trim().length || 0) < 80
    Array.from(document.querySelectorAll('div')).reverse().forEach(element => {
      if (!element.isConnected || element.closest('.inner-profile')) return
      const children = Array.from(element.children)
      const images = Array.from(element.querySelectorAll('img'))
      const before = images.find(image => /^before\b/i.test(image.alt))
      const after = images.find(image => /^after\b/i.test(image.alt))
      if (images.length === 2 && before && after && !element.querySelector('h2,h3,h4,p,figure')) {
        const comparison = document.createElement('div')
        comparison.className = 'inner-comparison-pair'
        for (const [label, image] of [['Before', before], ['After', after]] as const) {
          const figure = document.createElement('figure')
          const caption = document.createElement('figcaption')
          caption.textContent = label
          figure.append(image, caption)
          comparison.append(figure)
        }
        element.replaceWith(comparison)
        return
      }
      if (isBlogArticle) return
      if (!element.closest('.inner-item') && children.length >= 3 && children.every(child => ['DIV', 'SPAN'].includes(child.tagName) && !child.querySelector('h2,h3,h4,img,a,ul,ol') && !child.textContent?.includes('?') && (child.textContent?.trim().length || 0) > 0 && (child.textContent?.trim().length || 0) < 180)) {
        element.classList.add('inner-facts-grid')
        if (children.every(child => /^[\s\d£%]|^from /i.test(child.textContent || ''))) element.classList.add('inner-stats-grid')
      }
      if (children.length >= 2 && children.every(child => child.tagName === 'DIV' && !child.querySelector('h2,h3,h4,img') && child.querySelectorAll('p').length >= 2 && /Google review/.test(child.textContent || ''))) element.classList.add('inner-reviews-grid')
      if (element.querySelector(':scope > h2')?.textContent?.includes('Signature') && element.parentElement?.children.length === 2) {
        element.parentElement.classList.add('inner-feature-layout')
        element.nextElementSibling?.classList.add('inner-price-display')
      }
      if (children.length >= 2 && children.length <= 4 && children.every(child => child.tagName === 'DIV' && child.querySelector(':scope > p') && !child.querySelector('h2,h3,h4')) && children.some(child => child.querySelector(':scope > a[href^="tel:"]')) && children.some(child => Array.from(child.querySelectorAll('li')).some(item => /^Monday/.test(item.textContent || '')))) element.classList.add('inner-clinic-details')
      if (children.length === 2 && !element.classList.contains('inner-grid') && !element.closest('.inner-item') && !element.querySelector('.inner-comparison-pair')) {
        const media = children.find(isMediaOnly)
        const copy = children.find(child => child !== media && !!child.querySelector('h2,h3,h4,p,ul,ol'))
        if (media && copy && copy.querySelectorAll('img').length === 0) {
          element.classList.add('inner-media-layout')
          media.classList.add('inner-media-column')
          copy.classList.add('inner-copy-column')
        }
      }
      if (children.length >= 2 && children.length <= 16 && !element.classList.contains('inner-grid') && children.every(child => child.tagName === 'A' && !child.classList.contains('source-booking') && child.getAttribute('href')?.startsWith('/') && !!child.textContent?.trim())) {
        element.classList.add('inner-link-grid')
      }
      if (children.length >= 2 && children.length <= 8 && children.every(child => isMediaOnly(child) || child.classList.contains('inner-comparison-pair'))) element.classList.add('inner-media-gallery')
    })
    document.querySelectorAll('li').forEach(item => {
      if (item.children.length === 2 && Array.from(item.children).every(child => child.tagName === 'SPAN')) {
        item.classList.add('inner-key-value')
        item.parentElement?.classList.add('inner-hours-list')
      }
    })
    document.querySelectorAll('.inner-grid').forEach(grid => {
      if (grid.querySelector('.inner-comparison-pair')) {
        grid.classList.remove('inner-image-grid', 'inner-grid-three')
        grid.classList.add('inner-results-grid')
        grid.querySelectorAll('span, p, div').forEach(element => {
          if (/^(Drag|Swipe|DragSwipe)( to compare results)?$/.test(element.textContent?.trim() || '') && !element.querySelector('h2,h3,img')) element.remove()
        })
      }
    })
    let root: Element = document.body
    while (root.children.length === 1 && root.firstElementChild?.tagName === 'DIV' && !root.classList.contains('inner-grid')) root = root.firstElementChild
    const splitSections = (element: Element): Element[] => {
      if (isBlogArticle || element.className || !['DIV', 'SECTION'].includes(element.tagName)) return [element]
      const children = Array.from(element.children)
      const hasDirectText = Array.from(element.childNodes).some(node => node.nodeType === Node.TEXT_NODE && node.textContent?.trim())
      if (hasDirectText) return [element]
      if (children.length === 1 && children[0].tagName === 'DIV') return splitSections(children[0])
      if (children.length >= 3 && children.every(child => child.tagName === 'DIV') && children.filter(child => child.querySelector('h2')).length > children.length / 2) return children.flatMap(splitSections)
      return [element]
    }
    const sections = (root.classList.contains('inner-grid') ? [root] : Array.from(root.children)).flatMap(splitSections).filter(element => element.textContent?.trim() || element.querySelector('img'))
    if (isBlogArticle && sections.length > 1 && isMediaOnly(sections[0])) {
      sections[0].classList.add('inner-article-image')
      sections[1].prepend(sections[0])
      sections.shift()
    }
    if (path === '/all-on-4-dental-implants') {
      sections.forEach(section => {
        const heading = section.querySelector('h2,h3')
        if (!heading || heading.textContent === 'Our Clinic Locations') return
        const title = heading.textContent || ''
        const sectionHeader = document.createElement('div')
        sectionHeader.className = 'all-on-four-section-heading'
        const eyebrow = heading.previousElementSibling
        if (eyebrow?.tagName === 'SPAN') sectionHeader.append(eyebrow)
        sectionHeader.append(heading)
        const body = document.createElement('div')
        body.className = 'all-on-four-section-body'
        body.append(...Array.from(section.childNodes))
        section.append(sectionHeader, body)
        section.classList.add('all-on-four-section')
        if (/^Replacing a Full Arch|^What Are All-on-4|^Who Is Suitable|^All-on-4 Price|^Areas We Serve|^Frequently Asked|^Considering All-on-4|^Watch:/.test(title)) section.classList.add('all-on-four-editorial')
        if (/^Benefits|^Why Choose/.test(title)) section.classList.add('all-on-four-features')
        if (title === 'The All-on-4 Treatment Process') section.classList.add('all-on-four-process')
        if (title === 'Frequently Asked Questions') {
          body.querySelectorAll('div').forEach(element => {
            if (element.children.length > 2 && Array.from(element.children).every(child => child.children.length === 1 && child.firstElementChild?.tagName === 'SPAN' && child.textContent?.trim().endsWith('?'))) element.classList.add('all-on-four-questions')
          })
        }
      })
    }
    const headings = Array.from(document.querySelectorAll('h2,h3')).filter(heading => !heading.closest('.inner-item')).slice(0, path === '/all-on-4-dental-implants' ? 24 : 14).map((heading, index) => {
      const id = heading.id || `page-section-${index + 1}`
      heading.id = id
      return { id, title: heading.textContent || '' }
    })
    return { hero: heroHtml, sections: sections.map((section, index) => {
      const locationHeading = Array.from(section.querySelectorAll('h2')).find(heading => heading.textContent === 'Our Clinic Locations')
      if (locationHeading?.nextElementSibling?.tagName === 'DIV') locationHeading.nextElementSibling.remove()
      const showLocations = !!locationHeading || (path === '/contact' && !!Array.from(section.querySelectorAll('h3')).find(heading => heading.textContent === 'Find Us On The Map')) || (index === 0 && ['/south-kensington', '/city-of-london', '/areas-we-serve'].includes(path))
      return { html: section.outerHTML, showLocations }
    }), headings }
  })
  const isDirectory = path === '/blog' || path.startsWith('/blog/page/')
  const isArticle = (path.startsWith('/blog/') && !isDirectory) || /terms|policy|privacy|complaints/.test(path)
  const heroVideo = heroVideos[path]
  return <article className={`inner-page imported-content${isArticle ? ' inner-reading-page' : ''}${path === '/all-on-4-dental-implants' ? ' all-on-four-page' : ''}`}>
    <header className={`inner-page-heading${heroVideo ? ' inner-heading-with-video' : ''}`}><div className="container"><div className="page-hero-copy" dangerouslySetInnerHTML={{ __html: content.hero }} />{heroVideo && <div className="inner-hero-video"><iframe className="inner-treatment-video" title={heroVideo.title} src={`https://www.youtube-nocookie.com/embed/${heroVideo.id}?rel=0`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /><a href={`https://www.youtube.com/watch?v=${heroVideo.id}`} target="_blank" rel="noopener noreferrer">Watch on YouTube<ArrowRight size={16} /></a></div>}</div></header>
    {content.headings.length > 1 && <nav className="inner-page-navigation container" aria-label="On this page"><details><summary>On this page</summary><ol>{content.headings.map(heading => <li key={heading.id}><a href={`#${heading.id}`}>{heading.title}</a></li>)}</ol></details></nav>}
    <div className="inner-page-body">{isDirectory ? <BlogDirectory initialPage={Number(path.split('/')[3]) || 1} /> : content.sections.map((section, index) => <section className="inner-band" key={index}><div className="container inner-band-content"><div dangerouslySetInnerHTML={{ __html: section.html }} />{section.showLocations && <ClinicLocations />}</div></section>)}</div>
  </article>
}