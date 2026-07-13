import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'About',
  description:
    'About Raúl Mermans: a designer and builder of AI systems for brand and creative teams, combining strategy, interface design, and working prototypes.',
  path: '/about',
  locale: 'en',
  image: {
    url: '/images/about/profile.webp',
    alt: 'Portrait of Raúl Mermans',
  },
  type: 'profile',
  keywords: ['about Raúl Mermans', 'CRM', 'AI systems', 'brand systems', 'product prototypes'],
})

export default function EnglishAboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
