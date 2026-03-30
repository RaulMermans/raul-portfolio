import type { Metadata } from 'next'
import { buildPageMetadata, siteConfig } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'AI Sports Campaign Case Study',
  description:
    'AI sports campaign case study by Raúl Mermans, showing an n8n-driven image system for consistent casting, styling, and campaign direction.',
  path: '/case-studies/ai-sports',
  image: {
    url: '/images/case-studies/ai-sports/hero/hero.webp',
    alt: 'AI Sports Campaign case study by Raúl Mermans',
  },
  type: 'article',
  keywords: ['AI campaign case study', 'n8n automation', 'AI image system'],
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
        item: siteConfig.url,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Case Studies',
        item: `${siteConfig.url}/case-studies`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'AI Sports Campaign',
        item: `${siteConfig.url}/case-studies/ai-sports`,
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  )
}

export default function AISportsCampaignLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <BreadcrumbSchema />
      {children}
    </>
  )
}
