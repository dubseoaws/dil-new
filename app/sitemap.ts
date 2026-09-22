import type { MetadataRoute } from 'next'
import { contentPages } from '@/lib/content'

export const dynamic = 'force-static'

const origin = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dental-implants-london.co.uk').replace(/\/$/, '')

function priorityOf(path: string) {
  if (path === '/') return 1
  if (path.startsWith('/blog/page/')) return 0.4
  if (path.startsWith('/blog/')) return 0.6
  if (path === '/blog' || path.startsWith('/conditions/') || path.startsWith('/areas-we-serve/')) return 0.7
  return 0.9
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return contentPages.map(page => ({
    url: page.path === '/' ? origin : `${origin}${page.path}`,
    lastModified,
    changeFrequency: page.path === '/' ? 'weekly' : ('monthly' as const),
    priority: priorityOf(page.path),
  }))
}
