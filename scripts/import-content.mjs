import { load } from 'cheerio'
import { mkdir, writeFile } from 'node:fs/promises'

const origin = 'https://www.dental-implants-london.co.uk'
const output = new URL('../src/data/', import.meta.url)
await mkdir(output, { recursive: true })
const sitemapResponse = await fetch(`${origin}/sitemap.xml`)
if (!sitemapResponse.ok) throw new Error('Sitemap unavailable')
const sitemap = load(await sitemapResponse.text(), { xml: true })
const urls = sitemap('loc').map((index, element) => sitemap(element).text()).get()
const pages = []

function absolute(value) {
  if (!value || value.startsWith('#')) return value
  const url = new URL(value, origin)
  if (url.pathname === '/_next/image') return absolute(url.searchParams.get('url'))
  return url.href
}

async function importPage(url) {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`${url}: ${response.status}`)
  const source = await response.text()
  const document = load(source)
  const main = document('main').first()
  const root = main.length ? main : document('body')
  const title = root.find('h1').first().text().trim()
  if (!title) throw new Error(`Missing title: ${url}`)
  const meta = name => document(`meta[name="${name}"]`).attr('content') || ''
  const property = name => document(`meta[property="${name}"]`).attr('content') || ''
  const seo = {
    canonical: document('link[rel="canonical"]').attr('href') || '',
    keywords: meta('keywords'),
    robots: meta('robots'),
    author: meta('author'),
    ogTitle: property('og:title'),
    ogDescription: property('og:description'),
    ogUrl: property('og:url'),
    ogSiteName: property('og:site_name'),
    ogType: property('og:type'),
    ogImage: property('og:image'),
    ogImageWidth: property('og:image:width'),
    ogImageHeight: property('og:image:height'),
    ogImageAlt: property('og:image:alt'),
    publishedTime: property('article:published_time'),
    articleAuthor: property('article:author'),
    twitterCard: meta('twitter:card'),
    twitterTitle: meta('twitter:title'),
    twitterDescription: meta('twitter:description'),
    twitterImage: meta('twitter:image'),
  }
  const schema = document('script[type="application/ld+json"]').map((index, element) => document(element).text().trim()).get()
  const images = root.find('img').map((index, element) => ({ src: absolute(document(element).attr('src')), alt: document(element).attr('alt') || '' })).get()
  const media = [...new Set(source.match(/https:\/\/res\.cloudinary\.com\/[^\s"<>\\]+/g) || [])]
  const sections = root.find('section').map((index, element) => ({ title: document(element).find('h2').first().text().trim(), text: document(element).text().replace(/\s+/g, ' ').trim() })).get()
  root.find('script,style,svg,noscript,iframe,form').remove()
  root.find('*').each((index, element) => {
    const node = document(element)
    const attributes = { ...element.attribs }
    for (const name of Object.keys(attributes)) {
      if (!['href', 'src', 'alt', 'colspan', 'rowspan', 'id', 'open'].includes(name)) node.removeAttr(name)
    }
    if (element.tagName === 'img') {
      node.attr('src', absolute(node.attr('src')))
      node.attr('loading', 'lazy')
    }
    if (element.tagName === 'a') {
      const target = absolute(node.attr('href'))
      if (target?.startsWith(origin) && !target.includes('/booking')) node.attr('href', target.slice(origin.length) || '/')
      else if (target) node.attr('href', target)
    }
    if (element.tagName === 'button') {
      const text = node.text().trim()
      if (/consultation|book|chat|assessment/i.test(text)) node.replaceWith(`<a class="source-booking" href="${origin}/booking">${text.replaceAll('&', '&amp;').replaceAll('<', '&lt;')}</a>`)
      else node.replaceWith(node.contents())
    }
  })
  pages.push({ path: new URL(url).pathname.replace(/\/$/, '') || '/', title, seoTitle: document('title').text(), description: document('meta[name="description"]').attr('content') || '', seo, schema, images, media, sections, html: root.html(), source: url })
  console.log(`Imported ${new URL(url).pathname}: ${images.length} images`)
}

for (let offset = 0; offset < urls.length; offset += 5) await Promise.all(urls.slice(offset, offset + 5).map(importPage))
pages.sort((first, second) => first.path.localeCompare(second.path))
await writeFile(new URL('live-content.json', output), JSON.stringify(pages, null, 2))
console.log(`Verified ${pages.length} pages; ${pages.reduce((total, entry) => total + entry.images.length, 0)} image references. Source: ${origin}`)