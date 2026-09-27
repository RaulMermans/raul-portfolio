import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import { absoluteRouteUrl, buildPageMetadata, siteConfig } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Estudios visuales',
  description:
    'Estudios visuales de Raúl Mermans: mundos de imagen, atmósferas de marca y experimentos sobre campaña, gusto y reglas de sistema.',
  path: '/visuals',
  locale: 'es',
  image: {
    url: '/images/sections/visuals-bg.webp',
    alt: 'Estudios visuales de Raúl Mermans',
  },
  keywords: ['visuales con IA', 'portadas', 'conceptos visuales', 'experimentos creativos'],
})

export default function SpanishVisualsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <StructuredData
        type="CollectionPage"
        data={{
          '@id': `${siteConfig.url}/#visuals-page-es`,
          name: 'Estudios visuales de Raúl Mermans',
          description:
            'Estudios visuales de Raúl Mermans: mundos de imagen, atmósferas de marca y experimentos sobre campaña, gusto y reglas de sistema.',
          url: absoluteRouteUrl('/visuals'),
        }}
      />
      {children}
    </>
  )
}
