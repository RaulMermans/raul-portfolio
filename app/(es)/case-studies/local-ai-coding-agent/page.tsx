import type { Metadata } from 'next'
import IndependentSystemCaseStudy from '@/components/case-studies/IndependentSystemCaseStudy'
import { getIndependentSystem } from '@/data/independent-systems'
import { buildPageMetadata } from '@/lib/metadata'

const system = getIndependentSystem('local-ai-coding-agent', 'es')
export const metadata: Metadata = buildPageMetadata({
  title: 'Local AI Coding Agent',
  description: system.summary,
  path: '/case-studies/local-ai-coding-agent',
  locale: 'es',
  image: { url: system.socialImage, width: 1200, height: 800, alt: 'Local AI Coding Agent' },
})

export default function Page() {
  return <IndependentSystemCaseStudy slug="local-ai-coding-agent" />
}
