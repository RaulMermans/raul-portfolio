import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Case Studies — Raúl Mermans',
  description: 'Explore detailed case studies showcasing creative projects and visual storytelling.',
}

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

