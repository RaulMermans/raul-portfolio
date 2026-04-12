import type { Metadata } from 'next'
import HomePage from '../page'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'AI Systems Architect for Modern Brands',
  description:
    'AI systems architect for modern brands. Raúl Mermans designs automation, agents, and operating systems for marketing, CRM, content, and creative teams.',
  path: '/',
  locale: 'en',
  image: {
    url: '/images/sections/case-studies-bg.webp',
    alt: 'Raúl Mermans portfolio',
  },
  keywords: ['AI systems architect', 'automation for brands', 'AI systems for marketing', 'consulting'],
})

export default function EnglishHomePage() {
  return <HomePage />
}
