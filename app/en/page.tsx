import type { Metadata } from 'next'
import HomePage from '../page'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'AI Integrations for Creative Systems, Brand Workflows, and Cultural Execution',
  description:
    'Applied AI systems, automation layers, and internal tools for creative teams, brand builders, and culture-led projects that need faster execution with taste, control, and brand coherence.',
  path: '/',
  locale: 'en',
  image: {
    url: '/images/sections/case-studies-bg.webp',
    alt: 'Raúl Mermans portfolio',
  },
  keywords: [
    'creative AI systems',
    'AI integrations',
    'brand workflows',
    'internal creative tools',
    'AI campaign systems',
    'brand intelligence',
  ],
})

export default function EnglishHomePage() {
  return <HomePage />
}
