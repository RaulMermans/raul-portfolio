import type { Metadata } from 'next'
import '@/styles/case-study-new.css'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Case Studies',
  description:
    'Case studies by Raúl Mermans spanning campaigns, marketing intelligence, digital products, brand thinking, visual direction, and AI-assisted tools.',
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
