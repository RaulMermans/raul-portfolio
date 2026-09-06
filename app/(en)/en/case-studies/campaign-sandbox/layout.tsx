import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import { absoluteRouteUrl, absoluteUrl, buildPageMetadata, siteConfig } from '@/lib/metadata'

const title = 'Campaign Sandbox — Internal AI Strategy Workspace | Raul Mermans'
const description =
  'A case study on building an internal AI campaign strategy workspace with bounded LLM workflows, deterministic scoring, quality gates, human route selection, and exportable strategy reports.'
const image = '/images/case-studies/campaign-sandbox/02-decision-cockpit.webp'
const keywords = [
  'Campaign Sandbox',
  'internal AI strategy workspace',
  'AI workflow design',
  'creative strategy',
  'deterministic scoring',
  'AI guardrails',
  'OpenAI structured outputs',
]

const baseMetadata = buildPageMetadata({
  title,
  description,
  path: '/case-studies/campaign-sandbox',
  locale: 'en',
  image: {
    url: image,
    alt: 'Campaign Sandbox decision cockpit',
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

export default function EnglishCampaignSandboxLayout({ children }: { children: React.ReactNode }) {
  const url = absoluteRouteUrl('/en/case-studies/campaign-sandbox')
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteConfig.url}/en` },
      { '@type': 'ListItem', position: 2, name: 'Case Studies', item: `${siteConfig.url}/en/case-studies` },
      { '@type': 'ListItem', position: 3, name: 'Campaign Sandbox', item: url },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <StructuredData
        type="Article"
        data={{
          '@id': `${siteConfig.url}/#campaign-sandbox-case-study-en`,
          headline: title,
          name: 'Campaign Sandbox',
          description,
          url,
          mainEntityOfPage: url,
          image: absoluteUrl(image),
          articleSection: 'Case Studies',
          keywords,
        }}
      />
      {children}
    </>
  )
}
