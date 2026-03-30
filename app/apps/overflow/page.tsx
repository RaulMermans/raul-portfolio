import type { Metadata } from 'next'
import OverflowLanding from './OverflowLanding'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Overflow App Case Study',
  description:
    'Overflow case study by Raúl Mermans, a calm iPhone workout tracker focused on routines, scheduling, fast logging, and meaningful progress.',
  path: '/apps/overflow',
  image: {
    url: '/images/apps/overflow/Today-tab.webp',
    alt: 'Overflow workout tracker app by Raúl Mermans',
  },
  keywords: ['Overflow app', 'workout tracker', 'iPhone fitness app', 'app case study'],
})

export default function OverflowPage() {
  return <OverflowLanding />
}
