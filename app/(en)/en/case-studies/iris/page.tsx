import type { Metadata } from 'next'
import IndependentSystemCaseStudy from '@/components/case-studies/IndependentSystemCaseStudy'
import { getIndependentSystem } from '@/data/independent-systems'
import { buildPageMetadata } from '@/lib/metadata'

const system = getIndependentSystem('iris', 'en')
export const metadata: Metadata = buildPageMetadata({
  title: 'IRIS',
  description: system.summary,
  path: '/case-studies/iris',
  locale: 'en',
  image: { url: system.socialImage, width: 1200, height: 800, alt: 'IRIS' },
})

export default function Page() {
  return <IndependentSystemCaseStudy slug="iris" />
}
