import type { Metadata } from 'next'
import HomePage from '../page'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Applied AI Systems for Marketing, CRM, and Creative Teams',
  description:
    'Applied AI systems, agentic workflows, automation layers, and internal AI tools for marketing, CRM, and creative teams that need faster execution with quality, control, and brand coherence.',
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
