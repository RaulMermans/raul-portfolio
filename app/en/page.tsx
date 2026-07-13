import type { Metadata } from 'next'
import HomePage from '../page'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'AI Systems for Brand and Creative Teams',
  description:
    'Raúl Mermans designs and builds AI systems for brand and creative teams, from workflow strategy and interface design to functioning internal tools.',
  path: '/',
  locale: 'en',
  image: {
    url: '/images/sections/case-studies-bg.webp',
    alt: 'Raúl Mermans portfolio',
  },
  keywords: [
    'creative AI systems',
    'AI integrations',
    'brand workflows',
    'internal creative tools',
    'AI campaign systems',
    'brand systems',
  ],
})

export default function EnglishHomePage() {
  return <HomePage />
}
