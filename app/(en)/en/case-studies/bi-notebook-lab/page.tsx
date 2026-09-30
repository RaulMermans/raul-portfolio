import type { Metadata } from 'next'
import IndependentSystemCaseStudy from '@/components/case-studies/IndependentSystemCaseStudy'
import { getIndependentSystem } from '@/data/independent-systems'
import { buildPageMetadata } from '@/lib/metadata'

const system = getIndependentSystem('bi-notebook-lab', 'en')
export const metadata: Metadata = buildPageMetadata({
  title: 'BI Notebook Lab',
  description: system.summary,
  path: '/case-studies/bi-notebook-lab',
  locale: 'en',
  image: { url: system.socialImage, width: 1400, height: 748, alt: 'BI Notebook Lab semantic model' },
})

export default function Page() {
  return <IndependentSystemCaseStudy slug="bi-notebook-lab" />
}
