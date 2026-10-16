import type { Metadata } from 'next'
import HomePage from '@/components/HomePage'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Raúl Mermans | AI Systems, Product & Data',
  description:
    'Raúl Mermans builds AI systems, data products and decision-support tools with business judgment, technical execution and creative direction.',
  path: '/',
  locale: 'en',
  image: {
    url: '/images/sections/case-studies-bg.webp',
    alt: 'Raúl Mermans portfolio',
  },
  keywords: [
    'AI systems',
    'agentic systems',
    'decision intelligence',
    'product development',
    'creative strategy',
  ],
  absoluteTitle: true,
})

export default function EnglishHomePage() {
  return <HomePage locale="en" />
}
