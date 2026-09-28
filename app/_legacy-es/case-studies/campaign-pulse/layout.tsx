import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import { absoluteRouteUrl, absoluteUrl, buildPageMetadata, siteConfig } from '@/lib/metadata'

const title = 'Campaign Pulse — Caso de estudio de inteligencia de marketing'
const description =
  'Centro de mando local-first para rendimiento de newsletters, ingesta CSV, analítica frente a objetivos, presión de audiencia e informes operativos mensuales.'
const image = '/images/case-studies/campaign-pulse/overview.png'
const keywords = [
  'Campaign Pulse',
  'inteligencia de marketing',
  'producto de datos',
  'analítica de newsletters',
  'adaptador CSV',
  'presión de audiencia',
  'prototipo local-first',
]

const baseMetadata = buildPageMetadata({
  title,
  description,
  path: '/case-studies/campaign-pulse',
  locale: 'es',
  image: {
    url: image,
    alt: 'Overview del centro de mando de inteligencia de marketing Campaign Pulse',
    width: 1440,
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

export default function SpanishCampaignPulseLayout({ children }: { children: React.ReactNode }) {
  const url = absoluteRouteUrl('/es/case-studies/campaign-pulse')
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${siteConfig.url}/es` },
      { '@type': 'ListItem', position: 2, name: 'Casos de estudio', item: `${siteConfig.url}/es/case-studies` },
      { '@type': 'ListItem', position: 3, name: 'Campaign Pulse', item: url },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <StructuredData
        type="Article"
        data={{
          '@id': `${siteConfig.url}/#campaign-pulse-case-study-es`,
          headline: title,
          name: 'Campaign Pulse',
          description,
          url,
          mainEntityOfPage: url,
          image: absoluteUrl(image),
          articleSection: 'Casos de estudio',
          keywords,
        }}
      />
      {children}
    </>
  )
}
