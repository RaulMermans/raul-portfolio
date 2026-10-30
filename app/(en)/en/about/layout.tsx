import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'About',
  description:
    'Raúl Mermans builds across AI, product, data and creative systems, with a business and marketing foundation and current Big Data studies.',
  path: '/about',
  locale: 'en',
  image: {
    url: '/images/about/profile.webp',
    alt: 'Portrait of Raúl Mermans',
  },
  type: 'profile',
  keywords: ['about Raúl Mermans', 'AI systems', 'product development', 'decision intelligence', 'Big Data', 'brand systems'],
})

export default function EnglishAboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
