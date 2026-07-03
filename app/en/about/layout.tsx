import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'About',
  description:
    'About Raúl Mermans: an editorial operating profile across CRM, marketing, AI-assisted tools, brand workflows, Madrid, Málaga, and visual practice.',
  path: '/about',
  locale: 'en',
  image: {
    url: '/images/about/profile.webp',
    alt: 'Portrait of Raúl Mermans',
  },
  type: 'profile',
  keywords: ['about Raúl Mermans', 'CRM', 'AI-assisted tools', 'brand workflows'],
})

export default function EnglishAboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
