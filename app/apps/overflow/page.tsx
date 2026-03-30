import type { Metadata } from 'next'
import StructuredData from '@/components/StructuredData'
import OverflowLanding from './OverflowLanding'
import { absoluteRouteUrl, absoluteUrl, buildPageMetadata, siteConfig } from '@/lib/metadata'

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
  return (
    <>
      <StructuredData
        type="SoftwareApplication"
        data={{
          '@id': `${siteConfig.url}/#overflow-app`,
          name: 'Overflow',
          description:
            'Overflow is a calm performance journal for iPhone focused on routines, scheduling, fast logging, and meaningful progress.',
          url: absoluteRouteUrl('/apps/overflow'),
          image: absoluteUrl('/images/apps/overflow/Today-tab.webp'),
          operatingSystem: 'iOS',
          applicationCategory: 'HealthApplication',
          softwareVersion: 'Private beta',
          featureList: ['Workout logging', 'Routine planning', 'Scheduling', 'Progress tracking'],
        }}
      />
      <OverflowLanding />
    </>
  )
}
