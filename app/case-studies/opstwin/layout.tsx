import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import { absoluteRouteUrl, absoluteUrl, buildPageMetadata, siteConfig } from '@/lib/metadata'

const title = 'OpsTwin — Operational Simulation and Decision Lab'
const description = 'OpsTwin compares service-operation changes under matched simulated conditions, revealing observed impact, uncertainty, risk, resource pressure and economic tradeoffs before implementation.'
const image = '/images/case-studies/opstwin/thumb.svg'
const keywords = ['OpsTwin', 'operational simulation', 'decision support', 'discrete-event simulation', 'SimPy', 'service operations', 'FastAPI', 'Next.js']

export const metadata: Metadata = buildPageMetadata({
  title,
  description,
  path: '/case-studies/opstwin',
  locale: 'es',
  image: { url: image, alt: 'OpsTwin operational simulation decision lab', width: 1600, height: 1000 },
  type: 'article',
  keywords,
  absoluteTitle: true,
})

export default function OpsTwinLayout({ children }: { children: React.ReactNode }) {
  const url = absoluteRouteUrl('/case-studies/opstwin')
  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Casos de estudio', item: `${siteConfig.url}/case-studies` },
      { '@type': 'ListItem', position: 3, name: 'OpsTwin', item: url },
    ],
  }
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} /><StructuredData type="Article" data={{ '@id': `${siteConfig.url}/#opstwin-case-study`, headline: title, name: 'OpsTwin', description, url, mainEntityOfPage: url, image: absoluteUrl(image), articleSection: 'Case Studies', keywords }} />{children}</>
}
