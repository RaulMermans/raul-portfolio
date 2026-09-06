import type { Metadata } from 'next'
import HomePage from '../../(es)/page'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Raul Mermans | Brand strategy, creative systems, and products',
  description:
    'Raul Mermans builds brands, products, and creative systems where business, culture, research, and technology meet.',
  path: '/',
  locale: 'en',
  image: {
    url: '/images/sections/case-studies-bg.webp',
    alt: 'Raúl Mermans portfolio',
  },
  keywords: [
    'entrepreneur',
    'creator',
    'brand building',
    'product development',
    'ventures',
  ],
  absoluteTitle: true,
})

export default function EnglishHomePage() {
  return <HomePage locale="en" />
}
