import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://raulmermans.com'

export const metadata: Metadata = {
  title: 'AI Sports Campaign — Raúl Mermans',
  description:
    'A Creative Direction Engine built in n8n—swap casting and wardrobe while locking the shot. Campaign-grade coherence from generative AI. AI automation system for creative direction.',
  openGraph: {
    title: 'AI Sports Campaign — Raúl Mermans',
    description: 'A Creative Direction Engine built in n8n—swap casting and wardrobe while locking the shot. Campaign-grade coherence from generative AI.',
    type: 'article',
    url: `${baseUrl}/case-studies/ai-sports`,
    publishedTime: '2026-01-01',
    authors: ['Raúl Mermans'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Sports Campaign — Raúl Mermans',
    description: 'A Creative Direction Engine built in n8n—swap casting and wardrobe while locking the shot. Campaign-grade coherence from generative AI.',
  },
  alternates: {
    canonical: `${baseUrl}/case-studies/ai-sports`,
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
      {
        '@type': 'ListItem',
        position: 3,
        name: 'AI Sports Campaign',
        item: `${baseUrl}/case-studies/ai-sports`,
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

export default function AISportsCampaignLayout({
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

