import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { load } from 'cheerio'

const pages = JSON.parse(await readFile(new URL('../src/data/live-content.json', import.meta.url), 'utf8'))
const destination = new URL('../public/content/', import.meta.url)
await mkdir(destination, { recursive: true })
const index = []
for (const page of pages) {
  const document = load(page.html)
  document('h1').first().parent().addClass('page-hero-copy')
  page.html = document('body').html()
  const filename = `${page.path === '/' ? 'home' : page.path.slice(1).replaceAll('/', '__')}.json`
  await writeFile(new URL(filename, destination), JSON.stringify(page))
  index.push({ path: page.path, title: page.seoTitle, file: filename })
}
await writeFile(new URL('../src/data/page-index.json', import.meta.url), JSON.stringify(index))
const blogIndex = pages.filter(page => page.path.startsWith('/blog/') && !page.path.startsWith('/blog/page/')).map(page => {
  const document = load(page.html)
  const image = document('img').first()
  return { path: page.path, title: document('h1').first().text(), description: page.description, image: image.attr('src'), alt: image.attr('alt') }
})
await writeFile(new URL('blog-index.json', destination), JSON.stringify(blogIndex))
const home = pages.find(page => page.path === '/')
const document = load(home.html)
const sections = document('section').map((index, element) => ({ title: document(element).find('h2').first().text().trim(), html: document(element).html() })).get()
await writeFile(new URL('../src/data/home.json', import.meta.url), JSON.stringify({ images: home.images, sections }))
const assets = {
  hero: 'https://res.cloudinary.com/da1zmp1ib/image/upload/v1765881695/IMG_2016_2_r5vjdp.jpg',
  kensington: pages.find(page => page.path === '/south-kensington').images.find(image => image.alt.startsWith('Exterior')).src,
  city: pages.find(page => page.path === '/city-of-london').images[0].src,
  ...Object.fromEntries(home.images.filter(image => !image.alt.includes('Couple')).map((image, index) => [`source-${index}`, image.src])),
}
await mkdir(new URL('../public/images/', import.meta.url), { recursive: true })
const localAssets = {}
await Promise.all(Object.entries(assets).map(async ([name, url]) => {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Image failed: ${url}`)
  const extension = new URL(url).pathname.split('.').pop()
  const filename = `${name}.${extension}`
  await writeFile(new URL(`../public/images/${filename}`, import.meta.url), Buffer.from(await response.arrayBuffer()))
  localAssets[url] = `/images/${filename}`
}))
await writeFile(new URL('../src/data/assets.json', import.meta.url), JSON.stringify(localAssets))
console.log(`Prepared ${index.length} routes, ${sections.length} homepage sections, and ${Object.keys(localAssets).length} local images.`)