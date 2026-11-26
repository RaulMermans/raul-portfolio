import type { Metadata } from 'next'
import HomePage from '@/components/HomePage'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Raúl Mermans | Technical and Creative Portfolio',
  description:
    'Meet Raúl Mermans and choose a technical portfolio of software, AI and data, or a creative portfolio of photography and visual identity.',
  path: '/',
  locale: 'en',
  image: {
    url: '/images/photography/landscape/Landscape18.webp',
    alt: 'A sailing ship on a hazy sea at dusk, photographed by Raúl Mermans',
  },
  keywords: [
    'AI systems',
    'technical portfolio',
    'creative portfolio',
    'photography',
  ],
  absoluteTitle: true,
})

export default function EnglishHomePage() {
  return <HomePage locale="en" />
}
