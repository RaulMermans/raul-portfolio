import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import { absoluteRouteUrl, absoluteUrl, buildPageMetadata, siteConfig } from '@/lib/metadata'

const title = 'BlogAgent — AI Editorial Workflow | Raul Mermans'
const description =
  'AI editorial workflow for generating copy-ready blog drafts with research, candidate validation, review, and human control.'
const image = '/images/case-studies/blogagent/thumb/thumb.svg'
const keywords = [
  'BlogAgent',
  'agentic workflow',
  'LLM systems',
  'editorial AI',
  'source-aware drafting',
  'human-in-the-loop',
  'Python',
  'FastAPI',
]

const baseMetadata = buildPageMetadata({
  title,
  description,
  path: '/case-studies/blogagent',
  locale: 'en',
  image: {
    url: image,
    alt: 'BlogAgent AI editorial workflow',
    width: 1600,
    height: 1000,
  },
  type: 'article',
  keywords,
  absoluteTitle: true,
})

export const metadata: Metadata = {
  ...baseMetadata,
  title: { absolute: title },
  openGraph: { ...baseMetadata.openGraph, title },
  twitter: { ...baseMetadata.twitter, title },
}

export default function EnglishBlogAgentLayout({ children }: { children: React.ReactNode }) {
  const url = absoluteRouteUrl('/en/case-studies/blogagent')
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteConfig.url}/en` },
      { '@type': 'ListItem', position: 2, name: 'Case Studies', item: `${siteConfig.url}/en/case-studies` },
      { '@type': 'ListItem', position: 3, name: 'BlogAgent', item: url },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <StructuredData
        type="Article"
        data={{
          '@id': `${siteConfig.url}/#blogagent-case-study-en`,
          headline: title,
          name: 'BlogAgent',
          description,
          url,
          mainEntityOfPage: url,
          image: absoluteUrl(image),
          articleSection: 'Case Studies',
          keywords,
          datePublished: '2026-06-14',
          dateModified: '2026-06-14',
        }}
      />
      {children}
    </>
  )
}
