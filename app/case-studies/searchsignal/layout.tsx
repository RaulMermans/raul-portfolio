import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import { absoluteRouteUrl, absoluteUrl, buildPageMetadata, siteConfig } from '@/lib/metadata'

const title = 'SearchSignal | Preparación de catálogo para búsqueda ecommerce'
const description = 'Caso de estudio de SearchSignal, un framework inspeccionable para validar calidad de catálogo, elegibilidad de búsqueda y recuperación ecommerce antes de desplegar búsqueda.'
const image = '/images/case-studies/searchsignal/thumb.svg'
const keywords = ['SearchSignal', 'búsqueda ecommerce', 'calidad de catálogo', 'recuperación híbrida', 'arquitectura de información', 'sistemas de producto']

export const metadata: Metadata = buildPageMetadata({ title, description, path: '/case-studies/searchsignal', locale: 'es', image: { url: image, alt: 'Visual del sistema SearchSignal', width: 1200, height: 800 }, type: 'article', keywords, absoluteTitle: true })

export default function SearchSignalLayout({ children }: { children: React.ReactNode }) {
  const url = absoluteRouteUrl('/case-studies/searchsignal')
  const breadcrumb = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Inicio', item: siteConfig.url }, { '@type': 'ListItem', position: 2, name: 'Casos de estudio', item: `${siteConfig.url}/case-studies` }, { '@type': 'ListItem', position: 3, name: 'SearchSignal', item: url }] }
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} /><StructuredData type="Article" data={{ '@id': `${siteConfig.url}/#searchsignal-case-study`, headline: title, name: 'SearchSignal', description, url, mainEntityOfPage: url, image: absoluteUrl(image), articleSection: 'Casos de estudio', keywords }} />{children}</>
}
