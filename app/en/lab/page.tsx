import type { Metadata } from 'next'
import LabPageShared from '../../lab/lab-page-shared'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Lab',
  description:
    'Archive of products, experiments, visuals, and side work by Raúl Mermans, separated from the main consulting path.',
  path: '/lab',
  locale: 'en',
  keywords: ['lab', 'experiments', 'apps', 'products'],
})

export default function EnglishLabPage() {
  return <LabPageShared locale="en" />
}
