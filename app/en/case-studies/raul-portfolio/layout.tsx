import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import { absoluteRouteUrl, absoluteUrl, buildPageMetadata, siteConfig } from '@/lib/metadata'

const title = 'Raul Mermans Portfolio — Personal Brand Portfolio System'
const description =
  'Case study for Raul Mermans Portfolio, a digital identity and case-study system for strategy, AI/product work, photography, and visual experimentation.'

export const metadata: Metadata = buildPageMetadata({
  title,
  description,
  path: '/case-studies/raul-portfolio',
  locale: 'en',
  image: {
    url: '/images/case-studies/case-studies-thumbnail.webp',
    alt: 'Raul Mermans Portfolio case study',
  },
  type: 'article',
  keywords: [
    'Raul Mermans Portfolio',
    'personal brand system',
    'digital identity',
    'portfolio architecture',
    'editorial web design',
  ],
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
        name: 'Raul Mermans Portfolio',
        item: `${siteConfig.url}/en/case-studies/raul-portfolio`,
      },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
}

export default function EnglishRaulPortfolioLayout({
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
          '@id': `${siteConfig.url}/#raul-portfolio-case-study-en`,
          headline: title,
          name: 'Raul Mermans Portfolio',
          description,
          url: absoluteRouteUrl('/en/case-studies/raul-portfolio'),
          mainEntityOfPage: absoluteRouteUrl('/en/case-studies/raul-portfolio'),
          image: absoluteUrl('/images/case-studies/case-studies-thumbnail.webp'),
          articleSection: 'Case Studies',
          keywords: [
            'personal brand system',
            'digital identity',
            'portfolio architecture',
            'editorial web design',
          ],
        }}
      />
      {children}
    </>
  )
}
