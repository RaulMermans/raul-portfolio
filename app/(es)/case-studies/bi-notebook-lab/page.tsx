import type { Metadata } from 'next'
import IndependentSystemCaseStudy from '@/components/case-studies/IndependentSystemCaseStudy'
import { getIndependentSystem } from '@/data/independent-systems'
import { buildPageMetadata } from '@/lib/metadata'

const system = getIndependentSystem('bi-notebook-lab', 'es')
export const metadata: Metadata = buildPageMetadata({
  title: 'BI Notebook Lab',
  description: system.summary,
  path: '/case-studies/bi-notebook-lab',
  locale: 'es',
  image: { url: system.socialImage, width: 1400, height: 748, alt: 'Modelo semántico de BI Notebook Lab' },
})

export default function Page() {
  return <IndependentSystemCaseStudy slug="bi-notebook-lab" />
}
