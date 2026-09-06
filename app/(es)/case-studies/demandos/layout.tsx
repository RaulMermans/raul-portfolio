import type { Metadata } from 'next'
import '@/styles/demandos-case-study.css'
import StructuredData from '@/components/StructuredData'
import {
  absoluteRouteUrl,
  absoluteUrl,
  buildPageMetadata,
  siteConfig,
} from '@/lib/metadata'

const title = 'DemandOS — Decisiones de inventario desde datos raw de comercio'
const description =
  'Caso de estudio de DemandOS: prototipo público de machine learning para previsión de demanda, riesgo de stockout y recomendaciones internas de reposición usando datos sintéticos operativos.'
const image = '/images/case-studies/demandos/02-home-dashboard.png'
const keywords = [
  'DemandOS',
  'machine learning',
  'demand forecasting',
  'inventory intelligence',
  'stockout risk',
  'scikit-learn',
  'FastAPI',
  'Next.js',
  'Neon Postgres',
  'synthetic data',
]

const baseMetadata = buildPageMetadata({
  title,
  description,
  path: '/case-studies/demandos',
  locale: 'es',
  image: {
    url: image,
    alt: 'DemandOS: forecasting, riesgo de stockout y recomendaciones internas',
    width: 1440,
    height: 900,
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

export default function DemandOsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const url = absoluteRouteUrl('/case-studies/demandos')
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: siteConfig.url },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Casos de estudio',
        item: `${siteConfig.url}/case-studies`,
      },
      { '@type': 'ListItem', position: 3, name: 'DemandOS', item: url },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <StructuredData
        type="Article"
        data={{
          '@id': `${siteConfig.url}/#demandos-case-study`,
          headline: title,
          name: 'DemandOS',
          description,
          url,
          mainEntityOfPage: url,
          image: absoluteUrl(image),
          articleSection: 'Casos de estudio',
          keywords,
          datePublished: '2026-06-22',
          dateModified: '2026-06-22',
        }}
      />
      {children}
    </>
  )
}
