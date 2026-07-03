import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Sobre Mí',
  description:
    'Sobre Raúl Mermans: perfil operativo entre CRM, marketing, herramientas asistidas por IA, workflows de marca, Madrid, Málaga y práctica visual.',
  path: '/about',
  locale: 'es',
  image: {
    url: '/images/about/profile.webp',
    alt: 'Retrato de Raúl Mermans',
  },
  type: 'profile',
  keywords: ['sobre Raúl Mermans', 'CRM', 'herramientas IA', 'workflows de marca'],
})

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
