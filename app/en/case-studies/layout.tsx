import type { Metadata } from 'next'
import '@/styles/case-study-new.css'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Case Studies',
  description:
    'Case studies on applied AI systems, agentic workflows, automation layers, brand intelligence systems, and operational prototypes for marketing, CRM, creative, and brand teams.',
  path: '/case-studies',
  locale: 'en',
  image: {
    url: '/images/sections/case-studies-bg.webp',
    alt: 'Case studies by Raúl Mermans',
  },
  keywords: ['case studies', 'AI systems case studies', 'brand systems'],
})

export default function EnglishCaseStudiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
