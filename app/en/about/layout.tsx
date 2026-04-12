import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'About',
  description:
    'About Raúl Mermans, an AI systems architect combining business logic, practical implementation, and creative judgment for modern teams.',
  path: '/about',
  locale: 'en',
  image: {
    url: '/images/about/profile.webp',
    alt: 'Portrait of Raúl Mermans',
  },
  type: 'profile',
  keywords: ['about Raúl Mermans', 'AI systems architect', 'automation consultant'],
})

export default function EnglishAboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
