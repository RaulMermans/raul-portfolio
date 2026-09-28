import type { Metadata } from 'next'
import '@/styles/case-study-new.css'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Case Studies',
  description:
    'Independent AI systems, business intelligence, digital products, and creative work by Raúl Mermans, with architecture, evidence, and explicit limits.',
  path: '/case-studies',
  locale: 'en',
  image: {
    url: '/images/sections/case-studies-bg.webp',
    alt: 'Case studies by Raúl Mermans',
  },
  keywords: ['case studies', 'creative strategy', 'marketing intelligence', 'digital products', 'creative direction', 'AI-assisted tools'],
})

export default function EnglishCaseStudiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
