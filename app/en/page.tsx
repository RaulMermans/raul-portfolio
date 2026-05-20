import type { Metadata } from 'next'
import HomePage from '../page'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Applied AI Systems and Agentic Workflows',
  description:
    'Raúl Mermans builds applied AI systems, agentic workflows, and internal tools for brands and teams with product logic and brand intelligence.',
  path: '/',
  locale: 'en',
  image: {
    url: '/images/sections/case-studies-bg.webp',
    alt: 'Raúl Mermans portfolio',
  },
  keywords: ['applied AI systems', 'agentic workflows', 'internal AI tools', 'brand intelligence'],
})

export default function EnglishHomePage() {
  return <HomePage />
}
