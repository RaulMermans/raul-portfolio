import type { Metadata } from 'next'
import HomePage from '../page'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'AI, Product, Data and Brand Systems',
  description:
    'Raúl Mermans builds AI-powered products, decision tools, and brand systems across business, technology, and culture.',
  path: '/',
  locale: 'en',
  image: {
    url: '/images/sections/case-studies-bg.webp',
    alt: 'Raúl Mermans portfolio',
  },
  keywords: [
    'applied AI',
    'product development',
    'data intelligence',
    'CRM systems',
    'brand systems',
  ],
})

export default function EnglishHomePage() {
  return <HomePage />
}
