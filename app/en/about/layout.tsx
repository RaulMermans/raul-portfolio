import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'About',
  description:
    'About Raúl Mermans: a multidisciplinary creative strategist working across brand, marketing, culture, data, design, digital products, and emerging technology.',
  path: '/about',
  locale: 'en',
  image: {
    url: '/images/about/profile.webp',
    alt: 'Portrait of Raúl Mermans',
  },
  type: 'profile',
  keywords: ['about Raúl Mermans', 'creative strategy', 'marketing', 'brand', 'data', 'creative direction'],
})

export default function EnglishAboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
