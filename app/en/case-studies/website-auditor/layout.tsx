import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import { absoluteRouteUrl, absoluteUrl, buildPageMetadata, siteConfig } from '@/lib/metadata'

const title = 'Website Audit Agent — Evidence-Based AI Audit Workflow'
const description =
  'Technical case study for Website Audit Agent, an evidence-backed AI audit workflow that separates deterministic scoring from bounded LLM synthesis.'
const image = '/images/case-studies/website-auditor/thumb/thumb.png'
const keywords = [
  'website audit agent',
  'AI audit workflow',
  'agentic workflow',
  'deterministic scoring',
  'bounded LLM synthesis',
  'prospect intelligence',
  'evidence-based AI system',
]

export const metadata: Metadata = buildPageMetadata({
  title,
  description,
  path: '/case-studies/website-auditor',
  locale: 'en',
  image: {
    url: image,
    alt: 'Website Audit Agent case study by Raul Mermans',
  },
  type: 'article',
  keywords,
  absoluteTitle: true,
})

function BreadcrumbSchema() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${siteConfig.url}/en`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Case Studies',
        item: `${siteConfig.url}/en/case-studies`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Website Audit Agent',
        item: `${siteConfig.url}/en/case-studies/website-auditor`,
      },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
}

export default function EnglishWebsiteAuditorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <BreadcrumbSchema />
      <StructuredData
        type="Article"
        data={{
          '@id': `${siteConfig.url}/#website-auditor-case-study-en`,
          headline: title,
          name: 'Website Audit Agent',
          description,
          url: absoluteRouteUrl('/en/case-studies/website-auditor'),
          mainEntityOfPage: absoluteRouteUrl('/en/case-studies/website-auditor'),
          image: absoluteUrl(image),
          articleSection: 'Case Studies',
          keywords,
        }}
      />
      {children}
    </>
  )
}
