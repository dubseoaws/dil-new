import { JSDOM } from 'jsdom'
import { assets } from '@/src/data/site'

const SHOW_TEXT = 4
const TEXT_NODE = 3
const liveHosts = ['www.dental-implants-london.co.uk', 'dental-implants-london.co.uk']
// These source images 404 on the upstream CDN; rendering them would show a broken-image icon.
const deadImages = [
  'Can_You_Get_Dental_Implants_If_You_Have_Gum_Recession_placeholder.jpg',
  'Dental_Implants_and_MRI_Scans_What_You_Need_to_Know_placeholder.jpg',
  'How_Long_Does_a_Dental_Implant_Procedure_Actually_Take_placeholder.jpg',
  'One_Implant_or_Two_Adjacent_Missing_Teeth_placeholder.jpg',
  'What_Happens_If_You_Dont_Replace_Missing_Back_Tooth_placeholder.jpg',
  'Denture_Adhesives_Are_the_chemicals_harmful_for_long_term_use_o51q0u.jpg',
]

// Every transform below runs at build time, so imported markup ships as static HTML instead of being parsed in the browser.
const parse = (html: string) => new JSDOM(`<!doctype html><html><body>${html}</body></html>`).window.document

export function localBookingHtml(html: string) {
  const document = parse(html)
  document.querySelectorAll('a[href]').forEach(link => {
    try {
      const url = new URL(link.getAttribute('href')!, 'https://www.dental-implants-london.co.uk')
      if (liveHosts.includes(url.host) && /^\/booking(?:\/|$)/.test(url.pathname)) {
        link.setAttribute('href', `/booking${url.search}${url.hash}`)
        link.removeAttribute('target')
      }
    } catch { return }
  })
  return document.body.innerHTML
}

export type InnerContent = {
  hero: string
  sections: { html: string; showLocations: boolean }[]
  headings: { id: string; title: string }[]
}

export function innerPageContent(html: string, path: string): InnerContent {
  const document = parse(html)
  const textNodes = document.createTreeWalker(document.body, SHOW_TEXT)
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
    wrapper.setAttribute('tabindex', '0')
    wrapper.setAttribute('role', 'region')
    wrapper.setAttribute('aria-label', 'Scrollable comparison table')
    table.before(wrapper)
    wrapper.append(table)
  })
  // The first image is usually the LCP element, so it stays eager.
  document.querySelectorAll('img').forEach(image => { if (deadImages.some(name => image.getAttribute('src')?.endsWith(name))) image.remove() })
  document.querySelectorAll('img').forEach((image, index) => { if (index > 0) image.setAttribute('loading', 'lazy') })
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
    const hasDirectText = Array.from(element.childNodes).some(node => node.nodeType === TEXT_NODE && node.textContent?.trim())
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
  return {
    hero: heroHtml,
    sections: sections.map((section, index) => {
      const locationHeading = Array.from(section.querySelectorAll('h2')).find(heading => heading.textContent === 'Our Clinic Locations')
      if (locationHeading?.nextElementSibling?.tagName === 'DIV') locationHeading.nextElementSibling.remove()
      const showLocations = !!locationHeading || (path === '/contact' && !!Array.from(section.querySelectorAll('h3')).find(heading => heading.textContent === 'Find Us On The Map')) || (index === 0 && ['/south-kensington', '/city-of-london', '/areas-we-serve'].includes(path))
      return { html: section.outerHTML, showLocations }
    }),
    headings,
  }
}

export type GalleryImage = { src: string; alt: string }
export type GalleryContent = {
  title: string
  eyebrow: string
  bookingLabel: string
  stats: string[][]
  disclosure: string
  closing: string[]
  cases: { id: number; title: string; category: string; before: GalleryImage; after: GalleryImage }[]
}

export function galleryContent(html: string): GalleryContent {
  const document = parse(html)
  const root = document.body.firstElementChild!
  const hero = document.querySelector('.page-hero-copy')!
  const asset = (image: Element): GalleryImage => {
    const src = image.getAttribute('src') || ''
    return { src: assets[src] || src, alt: image.getAttribute('alt') || '' }
  }
  const cases = Array.from(document.querySelectorAll('h3')).filter(heading => heading.parentElement?.parentElement?.querySelector('img[alt^="Before"]')).map((heading, index) => {
    const card = heading.parentElement!.parentElement!
    return {
      id: index,
      title: heading.textContent || '',
      category: heading.parentElement!.querySelector('span')!.textContent || '',
      before: asset(card.querySelector('img[alt^="Before"]')!),
      after: asset(card.querySelector('img[alt^="After"]')!),
    }
  })
  return {
    title: hero.querySelector('h1')?.textContent || '',
    eyebrow: hero.querySelector('span')?.textContent || '',
    bookingLabel: hero.querySelector('a')?.textContent || '',
    stats: Array.from(hero.nextElementSibling!.children).map(stat => Array.from(stat.querySelectorAll('p')).map(value => value.textContent || '')),
    disclosure: root.children[2].innerHTML,
    closing: Array.from(root.children).slice(4).map(section => section.innerHTML),
    cases,
  }
}
