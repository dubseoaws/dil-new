// Compares the rendered <head> of the local production build against live.
import { load } from 'cheerio'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

const origin = 'https://www.dental-implants-london.co.uk'
const root = new URL('..', import.meta.url).pathname
const index = JSON.parse(await readFile(join(root, 'src/data/page-index.json'), 'utf8'))

const sample = Number(process.argv[2]) || 60
const paths = index.map(entry => entry.path)
const picked = paths.filter((_, i) => i % Math.max(1, Math.floor(paths.length / sample)) === 0)

const norm = v => (v || '').replace(/\s+/g, ' ').trim()
const dedupe = t => t.replace(/(\s*\|\s*Dental Implants London)+$/i, ' | Dental Implants London')

function head(html) {
  const $ = load(html)
  const meta = n => norm($(`meta[name="${n}"]`).attr('content'))
  const prop = n => norm($(`meta[property="${n}"]`).attr('content'))
  return {
    title: dedupe(norm($('title').first().text())),
    description: meta('description'),
    keywords: meta('keywords'),
    robots: meta('robots'),
    author: meta('author'),
    canonical: norm($('link[rel="canonical"]').attr('href')),
    ogTitle: prop('og:title'),
    ogDescription: prop('og:description'),
    ogUrl: prop('og:url'),
    ogSiteName: prop('og:site_name'),
    ogType: prop('og:type'),
    ogImage: prop('og:image'),
    ogImageAlt: prop('og:image:alt'),
    publishedTime: prop('article:published_time'),
    twitterCard: meta('twitter:card'),
    twitterTitle: meta('twitter:title'),
    twitterImage: meta('twitter:image'),
    schema: $('script[type="application/ld+json"]').length,
  }
}

async function localHtml(path) {
  const file = path === '/' ? 'index.html' : `${path.slice(1)}.html`
  return readFile(join(root, '.next/server/app', file), 'utf8')
}

const diffs = []
for (let i = 0; i < picked.length; i += 6) {
  await Promise.all(picked.slice(i, i + 6).map(async path => {
    let live, local
    try { live = head(await (await fetch(`${origin}${path}`)).text()) } catch (e) { diffs.push({ path, field: 'live-fetch', detail: e.message }); return }
    try { local = head(await localHtml(path)) } catch (e) { diffs.push({ path, field: 'local-build', detail: e.message }); return }
    for (const key of Object.keys(live)) {
      if (String(live[key]) !== String(local[key])) diffs.push({ path, field: key, live: live[key], local: local[key] })
    }
  }))
  process.stdout.write(`\r${Math.min(i + 6, picked.length)}/${picked.length} pages, ${diffs.length} field diffs`)
}

console.log(`\n\nCompared rendered heads for ${picked.length} pages`)
if (!diffs.length) console.log('No differences — local head matches live on every checked field.')
else {
  const byField = diffs.reduce((a, d) => { a[d.field] = (a[d.field] || 0) + 1; return a }, {})
  console.log('Differences by field:', byField)
  diffs.slice(0, 12).forEach(d => console.log(`\n${d.path} [${d.field}]\n  live : ${d.live ?? d.detail}\n  local: ${d.local ?? ''}`))
}
