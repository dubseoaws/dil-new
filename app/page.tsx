import type { Metadata } from 'next'
import { loadPage, pageMetadata } from '@/lib/content'
import { HomePage } from '@/src/components/HomePage'

export async function generateMetadata(): Promise<Metadata> {
  const page = await loadPage('/')
  return page ? pageMetadata(page) : {}
}

export default async function Page() {
  const page = await loadPage('/')
  return <>
    {page?.schema?.map((entry, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: entry }} />)}
    <HomePage />
  </>
}
