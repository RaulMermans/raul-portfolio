import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import { absoluteRouteUrl, absoluteUrl, buildPageMetadata, siteConfig } from '@/lib/metadata'

const title = 'SearchSignal | Ecommerce catalog readiness for search'
const description = 'A case study on SearchSignal, an inspectable framework for catalog quality, search eligibility, and ecommerce retrieval evaluation before search goes live.'
const image = '/images/case-studies/searchsignal/thumb.svg'
const keywords = ['SearchSignal', 'ecommerce search', 'catalog readiness', 'hybrid retrieval', 'information architecture', 'product systems']

export const metadata: Metadata = buildPageMetadata({ title, description, path: '/case-studies/searchsignal', locale: 'en', image: { url: image, alt: 'SearchSignal system visual', width: 1200, height: 800 }, type: 'article', keywords, absoluteTitle: true })

export default function EnglishSearchSignalLayout({ children }: { children: React.ReactNode }) {
  const url = absoluteRouteUrl('/en/case-studies/searchsignal')
  const breadcrumb = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${siteConfig.url}/en` }, { '@type': 'ListItem', position: 2, name: 'Case studies', item: `${siteConfig.url}/en/case-studies` }, { '@type': 'ListItem', position: 3, name: 'SearchSignal', item: url }] }
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} /><StructuredData type="Article" data={{ '@id': `${siteConfig.url}/#searchsignal-case-study-en`, headline: title, name: 'SearchSignal', description, url, mainEntityOfPage: url, image: absoluteUrl(image), articleSection: 'Case Studies', keywords }} />{children}</>
}
