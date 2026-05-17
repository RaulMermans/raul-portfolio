import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Sistemas de IA y Agentes',
  description:
    'Casos de estudio de agentes y sistemas de IA aplicada de Raúl Mermans: flujos de análisis, auditoría y decisiones repetibles convertidas en herramientas utilizables.',
  path: '/case-studies/ai-systems-agents',
  locale: 'es',
  image: {
    url: '/images/sections/case-studies-bg.webp',
    alt: 'Casos de estudio de sistemas de IA y agentes por Raúl Mermans',
  },
  keywords: ['sistemas de IA', 'agentes de IA', 'automatización', 'flujos de trabajo con IA'],
})

export default function AiSystemsAgentsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
