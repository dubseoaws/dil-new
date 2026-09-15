import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { contentPages, loadBlogIndex, loadPage } from '@/lib/content'
import { galleryContent, innerPageContent, localBookingHtml } from '@/lib/html'
import { Button } from '@/src/components/ui'
import { InnerPage } from '@/src/components/InnerPage'
import { GalleryPage } from '@/src/components/GalleryPage'
import { PageSections } from '@/src/components/PageSections'

export const dynamicParams = false

export function generateStaticParams() {
  return contentPages.filter(page => page.path !== '/' && page.path !== '/booking').map(page => ({ slug: page.path.slice(1).split('/') }))
}

const routeOf = async (params: Promise<{ slug: string[] }>) => `/${(await params).slug.join('/')}`

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const page = await loadPage(await routeOf(params))
  if (!page) return {}
  // Some imported titles carry the brand suffix twice.
  return { title: page.seoTitle.replace(/(\s*\|\s*Dental Implants London)+$/i, ' | Dental Implants London'), description: page.description }
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const path = await routeOf(params)
  const page = await loadPage(path)
  if (!page) notFound()
  const html = localBookingHtml(page.html)
  const isDirectory = path === '/blog' || path.startsWith('/blog/page/')
  const blog = isDirectory ? await blogPage(path) : undefined

  return <main id="main" className="content-page">
    <div className="container breadcrumbs"><Link href="/">Dental Implants London</Link><ChevronRight size={14} /><span>{page.title}</span></div>
    {path === '/gallery'
      ? <GalleryPage gallery={galleryContent(html)} />
      : <InnerPage content={innerPageContent(html, path)} path={path} blog={blog} />}
    <PageSections path={path} />
    <section className="contact-band"><div className="container"><h2>Get in Touch</h2><Button light>Book consultation</Button></div></section>
  </main>
}

async function blogPage(path: string) {
  const articles = await loadBlogIndex()
  const page = Number(path.split('/')[3]) || 1
  return { page, total: articles.length, articles: articles.slice((page - 1) * 10, page * 10) }
}
