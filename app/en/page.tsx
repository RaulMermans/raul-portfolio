import type { Metadata } from 'next'
import HomePage from '../page'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Raul Mermans — Entrepreneur & Creator',
  description:
    'Raul Mermans builds brands, products, and ventures across culture, business, storytelling, and technology.',
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
  return <HomePage />
}
