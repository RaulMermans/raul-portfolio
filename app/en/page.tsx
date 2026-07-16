import type { Metadata } from 'next'
import HomePage from '../page'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Creative Strategy Across Brand, Marketing, Culture, Data, and Technology',
  description:
    'Raúl Mermans works across brand, marketing, culture, data, design, digital products, and technology.',
  path: '/',
  locale: 'en',
  image: {
    url: '/images/sections/case-studies-bg.webp',
    alt: 'Raúl Mermans portfolio',
  },
  keywords: [
    'creative strategy',
    'brand strategy',
    'marketing strategy',
    'data and analytics',
    'creative direction',
    'AI and technology',
  ],
})

export default function EnglishHomePage() {
  return <HomePage />
}
