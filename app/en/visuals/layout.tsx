import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import { absoluteRouteUrl, buildPageMetadata, siteConfig } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Visual Studies',
  description:
    'Visual studies by Raúl Mermans: image worlds, brand atmospheres, and experiments around campaign surfaces, taste, and system rules.',
  path: '/visuals',
  locale: 'en',
  image: {
    url: '/images/sections/visuals-bg.webp',
    alt: 'Visual studies by Raúl Mermans',
  },
  keywords: ['AI visuals', 'album covers', 'visual concepts', 'creative experiments'],
})

export default function EnglishVisualsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <StructuredData
        type="CollectionPage"
        data={{
          '@id': `${siteConfig.url}/#visuals-page-en`,
          name: 'Visual Studies by Raúl Mermans',
          description:
            'Visual studies by Raúl Mermans: image worlds, brand atmospheres, and experiments around campaign surfaces, taste, and system rules.',
          url: absoluteRouteUrl('/en/visuals'),
        }}
      />
      {children}
    </>
  )
}
