import type { Metadata } from 'next'
import NotFoundExperience from '@/components/NotFoundExperience'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Page not found',
  description:
    'The page you requested could not be found. Explore case studies, apps, and AI systems work by Raúl Mermans.',
  path: '/404',
  canonicalPath: '/404',
  noIndex: true,
  absoluteTitle: true,
})

export default function NotFound() {
  return <NotFoundExperience />
}
