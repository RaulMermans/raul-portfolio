import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import { absoluteRouteUrl, buildPageMetadata, siteConfig } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Fotografía',
  description:
    'Fotografía de Raúl Mermans, mostrando el criterio visual, la composición y la contención que sostienen su trabajo más amplio en sistemas de IA y dirección creativa.',
  path: '/photography',
  locale: 'es',
  image: {
    url: '/images/sections/photography-bg.webp',
    alt: 'Galería de fotografía de Raúl Mermans',
  },
  keywords: ['portfolio de fotografía', 'fotografía editorial', 'fotografía de marca'],
})

export default function SpanishPhotographyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="photography-layout">
      <StructuredData
        type="CollectionPage"
        data={{
          '@id': `${siteConfig.url}/#photography-page-es`,
          name: 'Fotografía de Raúl Mermans',
          description:
            'Fotografía de Raúl Mermans, mostrando el criterio visual, la composición y la contención que sostienen su trabajo más amplio en sistemas de IA y dirección creativa.',
          url: absoluteRouteUrl('/es/photography'),
        }}
      />
      {children}
    </div>
  )
}
