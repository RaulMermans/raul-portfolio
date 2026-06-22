import type { Metadata } from 'next'
import '@/styles/demandos-case-study.css'
import StructuredData from '@/components/StructuredData'
import {
  absoluteRouteUrl,
  absoluteUrl,
  buildPageMetadata,
  siteConfig,
} from '@/lib/metadata'

const title = 'DemandOS — Machine Learning Demand Forecasting Case Study'
const description =
  'Caso de estudio de DemandOS: prototipo público de machine learning para previsión de demanda, riesgo de stockout y recomendaciones internas de reposición usando datos sintéticos operativos.'
const image = '/images/case-studies/demandos/02-home-dashboard.png'
const keywords = [
  'DemandOS',
  'machine learning',
  'previsión de demanda',
  'inteligencia de inventario',
  'riesgo de stockout',
  'scikit-learn',
  'FastAPI',
  'Next.js',
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

export default function SpanishDemandOsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const url = absoluteRouteUrl('/es/case-studies/demandos')

  return (
    <>
      <StructuredData
        type="Article"
        data={{
          '@id': `${siteConfig.url}/#demandos-case-study-es`,
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
