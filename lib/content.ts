import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import pageIndex from '@/src/data/page-index.json'

export type SourcePage = { title: string; seoTitle: string; description: string; html: string; path: string }
export type PageEntry = { path: string; title: string; file: string }

export const contentPages = pageIndex as PageEntry[]

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
