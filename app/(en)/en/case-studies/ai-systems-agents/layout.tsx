import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'AI Systems & Agents',
  description:
    'AI systems and agents case studies by Raúl Mermans: applied agents and workflows that turn analysis, audits, and repeatable decisions into usable automation.',
  path: '/case-studies/ai-systems-agents',
  locale: 'en',
  image: {
    url: '/images/sections/case-studies-bg.webp',
    alt: 'AI Systems and Agents case studies by Raúl Mermans',
  },
  keywords: ['AI systems', 'AI agents', 'automation workflows', 'applied AI'],
})

export default function EnglishAiSystemsAgentsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
