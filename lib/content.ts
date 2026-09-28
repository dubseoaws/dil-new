import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import type { Metadata } from 'next'
import pageIndex from '@/src/data/page-index.json'

export type SourceSeo = {
  canonical: string; keywords: string; robots: string; author: string
  ogTitle: string; ogDescription: string; ogUrl: string; ogSiteName: string; ogType: string
  ogImage: string; ogImageWidth: string; ogImageHeight: string; ogImageAlt: string
  publishedTime: string; articleAuthor: string
  twitterCard: string; twitterTitle: string; twitterDescription: string; twitterImage: string
}
export type SourcePage = { title: string; seoTitle: string; description: string; html: string; path: string; seo?: SourceSeo; schema?: string[] }
export type PageEntry = { path: string; title: string; file: string }

export const contentPages = pageIndex as PageEntry[]

// Some imported titles carry the brand suffix twice.
export const cleanTitle = (title: string) => title.replace(/(\s*\|\s*Dental Implants London)+$/i, ' | Dental Implants London')

// Mirrors the head the live site serves for each route.
export function pageMetadata(page: SourcePage): Metadata {
  const seo = page.seo
  const title = cleanTitle(page.seoTitle)
  if (!seo) return { title, description: page.description }
  const images = seo.ogImage
    ? [{ url: seo.ogImage, width: Number(seo.ogImageWidth) || undefined, height: Number(seo.ogImageHeight) || undefined, alt: seo.ogImageAlt || undefined }]
    : undefined
  return {
    title,
    description: page.description,
    keywords: seo.keywords || undefined,
    authors: seo.author ? [{ name: seo.author }] : undefined,
    robots: seo.robots || undefined,
    alternates: seo.canonical ? { canonical: seo.canonical } : undefined,
    openGraph: {
      title: seo.ogTitle || title,
      description: seo.ogDescription || page.description,
      url: seo.ogUrl || undefined,
      siteName: seo.ogSiteName || undefined,
      images,
      ...(seo.ogType === 'article'
        ? { type: 'article' as const, publishedTime: seo.publishedTime || undefined, authors: seo.articleAuthor ? [seo.articleAuthor] : undefined }
        : { type: 'website' as const }),
    },
    twitter: {
      card: (seo.twitterCard as 'summary_large_image') || 'summary_large_image',
      title: seo.twitterTitle || title,
      description: seo.twitterDescription || page.description,
      images: seo.twitterImage ? [seo.twitterImage] : undefined,
    },
  }
}

export type BlogEntry = { path: string; title: string; description: string; image?: string; alt?: string }

export async function loadBlogIndex(): Promise<BlogEntry[]> {
  return JSON.parse(await readFile(join(process.cwd(), 'public', 'content', 'blog-index.json'), 'utf8')) as BlogEntry[]
}

// Route JSON is prepared into public/content by scripts/prepare-content.mjs and read at build time.
export async function loadPage(path: string): Promise<SourcePage | null> {
  const entry = contentPages.find(item => item.path === path)
  if (!entry) return null
  try {
    return JSON.parse(await readFile(join(process.cwd(), 'public', 'content', entry.file), 'utf8')) as SourcePage
  } catch {
    return null
  }
}
