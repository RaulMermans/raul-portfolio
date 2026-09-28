import type { Metadata } from 'next'
import HomePage from '@/components/HomePage'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Raul Mermans | AI systems, products, and creative strategy',
  description:
    'Raul Mermans builds independent AI systems, digital products, and business intelligence tools alongside brands, ventures, and creative work.',
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
