import type { Metadata } from 'next'
import IndependentSystemCaseStudy from '@/components/case-studies/IndependentSystemCaseStudy'
import { getIndependentSystem } from '@/data/independent-systems'
import { buildPageMetadata } from '@/lib/metadata'

const system = getIndependentSystem('halo-control', 'en')
export const metadata: Metadata = buildPageMetadata({
  title: 'HALO Control',
  description: system.summary,
  path: '/case-studies/halo-control',
  locale: 'en',
  image: { url: system.socialImage, width: 1440, height: 940, alt: 'Synthetic HALO Control Room' },
})

export default function Page() {
  return <IndependentSystemCaseStudy slug="halo-control" />
}
