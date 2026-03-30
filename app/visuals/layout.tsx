import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Visuals',
  description:
    'AI visuals, album covers, and visual concepts by Raúl Mermans, showing the image systems and creative experimentation behind his broader practice.',
  path: '/visuals',
  image: {
    url: '/images/sections/visuals-bg.webp',
    alt: 'AI visuals by Raúl Mermans',
  },
  keywords: ['AI visuals', 'album covers', 'visual concepts', 'creative experiments'],
})

export default function VisualsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
