import type { Metadata } from 'next'
import '@/styles/case-study-new.css'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Case Studies',
  description:
    'Case studies by Raúl Mermans covering AI systems, automation workflows, brand systems, and product-minded creative execution.',
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
