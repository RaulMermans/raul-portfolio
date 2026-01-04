import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://raulmermans.com'

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'Explore detailed case studies showcasing creative projects and visual storytelling by Raúl Mermans. AI automation systems, brand identity, and creative direction.',
  openGraph: {
    title: 'Case Studies — Raúl Mermans',
    description: 'Explore detailed case studies showcasing creative projects and visual storytelling by Raúl Mermans.',
    url: `${baseUrl}/case-studies`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Studies — Raúl Mermans',
    description: 'Explore detailed case studies showcasing creative projects and visual storytelling by Raúl Mermans.',
  },
  alternates: {
    canonical: `${baseUrl}/case-studies`,
  },
}

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

