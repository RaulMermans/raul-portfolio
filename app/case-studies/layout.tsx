import type { Metadata } from 'next'
import '@/styles/case-study-new.css'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://raulmermans.com'

export const metadata: Metadata = {
  title: 'Case Studies',
  description:
    'Explore case studies by Raúl Mermans spanning AI systems, automation workflows, brand systems, and product-minded creative execution.',
  openGraph: {
    title: 'Case Studies — Raúl Mermans',
    description:
      'Explore case studies by Raúl Mermans spanning AI systems, automation workflows, brand systems, and product-minded creative execution.',
    url: `${baseUrl}/case-studies`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Studies — Raúl Mermans',
    description:
      'Explore case studies by Raúl Mermans spanning AI systems, automation workflows, brand systems, and product-minded creative execution.',
  },
  alternates: {
    canonical: `${baseUrl}/case-studies`,
  },
}

function BreadcrumbSchema() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Case Studies',
        item: `${baseUrl}/case-studies`,
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  )
}

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <BreadcrumbSchema />
      {children}
    </>
  )
}
