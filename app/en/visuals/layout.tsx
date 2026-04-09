import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import { absoluteRouteUrl, buildPageMetadata, siteConfig } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Visuals',
  description:
    'AI visuals, album covers, and visual concepts by Raúl Mermans, showing the image systems and creative experimentation behind his broader practice.',
  path: '/visuals',
  locale: 'en',
  image: {
    url: '/images/sections/visuals-bg.webp',
    alt: 'AI visuals by Raúl Mermans',
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
          name: 'Visuals by Raúl Mermans',
          description:
            'AI visuals, album covers, and visual concepts by Raúl Mermans, showing the image systems and creative experimentation behind his broader practice.',
          url: absoluteRouteUrl('/en/visuals'),
        }}
      />
      {children}
    </>
  )
}
