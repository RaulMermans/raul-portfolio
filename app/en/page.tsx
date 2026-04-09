import type { Metadata } from 'next'
import HomePage from '../page'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'AI Systems and Creative Direction',
  description:
    'Raúl Mermans designs AI systems, automation, and product layers for modern brands with creative judgment and calm execution.',
  path: '/',
  locale: 'en',
  image: {
    url: '/images/sections/case-studies-bg.webp',
    alt: 'Raúl Mermans portfolio',
  },
  keywords: ['AI systems', 'automation', 'creative direction', 'portfolio'],
})

export default function EnglishHomePage() {
  return <HomePage />
}
