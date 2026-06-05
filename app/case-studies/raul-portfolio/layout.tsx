import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import { absoluteRouteUrl, absoluteUrl, buildPageMetadata, siteConfig } from '@/lib/metadata'

const title = 'Raul Mermans Portfolio — Sistema de portafolio de marca personal'
const description =
  'Caso de estudio de Raul Mermans Portfolio, un sistema de identidad digital para estrategia, trabajo de IA/producto, fotografía y experimentación visual.'

export const metadata: Metadata = buildPageMetadata({
  title,
  description,
  path: '/case-studies/raul-portfolio',
  locale: 'es',
  image: {
    url: '/images/case-studies/case-studies-thumbnail.webp',
    alt: 'Caso de estudio de Raul Mermans Portfolio',
  },
  type: 'article',
  keywords: [
    'Raul Mermans Portfolio',
    'sistema de marca personal',
    'identidad digital',
    'arquitectura de portafolio',
    'diseño web editorial',
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
        name: 'Inicio',
        item: siteConfig.url,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Casos de estudio',
        item: `${siteConfig.url}/case-studies`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Raul Mermans Portfolio',
        item: `${siteConfig.url}/case-studies/raul-portfolio`,
      },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
}

export default function RaulPortfolioLayout({
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
          '@id': `${siteConfig.url}/#raul-portfolio-case-study`,
          headline: title,
          name: 'Raul Mermans Portfolio',
          description,
          url: absoluteRouteUrl('/case-studies/raul-portfolio'),
          mainEntityOfPage: absoluteRouteUrl('/case-studies/raul-portfolio'),
          image: absoluteUrl('/images/case-studies/case-studies-thumbnail.webp'),
          articleSection: 'Casos de estudio',
          keywords: [
            'sistema de marca personal',
            'identidad digital',
            'arquitectura de portafolio',
            'diseño web editorial',
          ],
        }}
      />
      {children}
    </>
  )
}
