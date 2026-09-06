import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Brand Systems',
  description:
    'Brand systems case studies by Raúl Mermans: identities, visual rules, and brand logic designed to scale without losing precision or coherence.',
  path: '/case-studies/brand-systems',
  locale: 'en',
  image: {
    url: '/images/sections/case-studies-bg.webp',
    alt: 'Brand systems case studies by Raúl Mermans',
  },
  keywords: ['brand systems', 'visual identity', 'creative direction', 'branding'],
})

export default function EnglishBrandSystemsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
