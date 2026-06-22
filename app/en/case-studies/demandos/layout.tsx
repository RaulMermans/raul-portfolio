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
  'DemandOS case study: a public machine-learning prototype for demand forecasting, stockout risk, and internal reorder guidance using synthetic operational data.'
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
]

const baseMetadata = buildPageMetadata({
  title,
  description,
  path: '/case-studies/demandos',
  locale: 'en',
  image: {
    url: image,
    alt: 'DemandOS demand forecasting and inventory intelligence workspace',
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

export default function EnglishDemandOsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const url = absoluteRouteUrl('/en/case-studies/demandos')

  return (
    <>
      <StructuredData
        type="Article"
        data={{
          '@id': `${siteConfig.url}/#demandos-case-study-en`,
          headline: title,
          name: 'DemandOS',
          description,
          url,
          mainEntityOfPage: url,
          image: absoluteUrl(image),
          articleSection: 'Case Studies',
          keywords,
          datePublished: '2026-06-22',
          dateModified: '2026-06-22',
        }}
      />
      {children}
    </>
  )
}
