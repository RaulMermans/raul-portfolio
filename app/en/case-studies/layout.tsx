import type { Metadata } from 'next'
import '@/styles/case-study-new.css'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Case Studies',
  description:
    'Case studies on creative AI systems, agentic workflows, automation layers, brand intelligence systems, and internal tools for creative teams, brand builders, and culture-led projects.',
  path: '/case-studies',
  locale: 'en',
  image: {
    url: '/images/sections/case-studies-bg.webp',
    alt: 'Case studies by Raúl Mermans',
  },
  keywords: ['case studies', 'creative AI systems', 'brand intelligence systems', 'internal creative tools'],
})

export default function EnglishCaseStudiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
