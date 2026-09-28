// One-off audit: compares live pages against the imported local content.
// Usage: node scripts/audit-content.mjs [--all]   (default: blog pages only)
import { load } from 'cheerio'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { join } from 'node:path'

const origin = 'https://www.dental-implants-london.co.uk'
const root = new URL('..', import.meta.url).pathname
const all = process.argv.includes('--all')

const index = JSON.parse(await readFile(join(root, 'src/data/page-index.json'), 'utf8'))
const localByPath = new Map(index.map(entry => [entry.path, entry]))

const sitemap = load(await (await fetch(`${origin}/sitemap.xml`)).text(), { xml: true })
const livePaths = sitemap('loc').map((i, el) => new URL(sitemap(el).text()).pathname.replace(/\/$/, '') || '/').get()
const targets = [...new Set(livePaths)].filter(path => all || path.startsWith('/blog')).sort()

const norm = value => (value || '').replace(/\s+/g, ' ').trim()
const dedupeBrand = title => title.replace(/(\s*\|\s*Dental Implants London)+$/i, ' | Dental Implants London')

async function loadLocal(path) {
  const entry = localByPath.get(path)
  if (!entry) return null
  try { return JSON.parse(await readFile(join(root, 'public/content', entry.file), 'utf8')) } catch { return null }
}

async function audit(path) {
  const issues = []
  let live
  try {
    const response = await fetch(`${origin}${path}`, { redirect: 'follow' })
    if (!response.ok) return [{ path, kind: 'live-error', detail: `HTTP ${response.status}` }]
    live = load(await response.text())
  } catch (error) {
    return [{ path, kind: 'live-error', detail: error.message }]
  }

  const liveSeo = {
    title: norm(live('title').first().text()),
    description: norm(live('meta[name="description"]').attr('content')),
    canonical: live('link[rel="canonical"]').attr('href') || '',
    ogTitle: norm(live('meta[property="og:title"]').attr('content')),
    ogDescription: norm(live('meta[property="og:description"]').attr('content')),
    ogImage: live('meta[property="og:image"]').attr('content') || '',
    robots: norm(live('meta[name="robots"]').attr('content')),
    schema: live('script[type="application/ld+json"]').length,
    h1: norm(live('main h1').first().text() || live('h1').first().text()),
  }

  const local = await loadLocal(path)
  if (!local) return [{ path, kind: 'missing-locally', detail: liveSeo.title }]

  if (dedupeBrand(norm(local.seoTitle)) !== dedupeBrand(liveSeo.title)) {
    issues.push({ path, kind: 'title', detail: `live="${liveSeo.title}" local="${norm(local.seoTitle)}"` })
  }
  if (norm(local.description) !== liveSeo.description) {
    issues.push({ path, kind: 'description', detail: `live="${liveSeo.description}" local="${norm(local.description)}"` })
  }
  if (norm(local.title) !== liveSeo.h1) {
    issues.push({ path, kind: 'h1', detail: `live="${liveSeo.h1}" local="${norm(local.title)}"` })
  }

  // Body-copy parity: compare visible text of the imported markup against live main.
  const liveMain = live('main').first()
  liveMain.find('script,style,noscript,svg,iframe,form,header,footer,nav').remove()
  const liveText = norm(liveMain.text())
  const localDoc = load(`<div>${local.html}</div>`)
  localDoc('script,style,noscript,svg,iframe,form').remove()
  const localText = norm(localDoc.root().text())
  const ratio = liveText.length ? localText.length / liveText.length : 1
  if (ratio < 0.9 || ratio > 1.12) {
    issues.push({ path, kind: 'content-length', detail: `live=${liveText.length} local=${localText.length} ratio=${ratio.toFixed(2)}` })
  }

  return { issues, liveSeo, path }
}

const results = []
const problems = []
for (let offset = 0; offset < targets.length; offset += 8) {
  const batch = await Promise.all(targets.slice(offset, offset + 8).map(audit))
  for (const item of batch) {
    if (Array.isArray(item)) { problems.push(...item); continue }
    results.push(item)
    problems.push(...item.issues)
  }
  process.stdout.write(`\r${Math.min(offset + 8, targets.length)}/${targets.length} checked, ${problems.length} issues`)
}

const byKind = problems.reduce((acc, item) => { acc[item.kind] = (acc[item.kind] || 0) + 1; return acc }, {})
console.log(`\n\nAudited ${targets.length} live URLs (${all ? 'all pages' : 'blog only'})`)
console.log('Issues by kind:', byKind)

const seoGaps = {
  canonical: results.filter(r => !r.liveSeo.canonical).length,
  ogTitle: results.filter(r => !r.liveSeo.ogTitle).length,
  ogImage: results.filter(r => !r.liveSeo.ogImage).length,
  schema: results.filter(r => !r.liveSeo.schema).length,
}
console.log('Live pages lacking each element:', seoGaps)

await mkdir(join(root, 'tmp'), { recursive: true })
await writeFile(join(root, 'tmp/audit-report.json'), JSON.stringify({ byKind, seoGaps, problems, results }, null, 2))
console.log('Full report: tmp/audit-report.json')
