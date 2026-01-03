import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://raulmermans.com'

export const metadata: Metadata = {
  title: 'AI Sports Campaign — Raúl Mermans',
  description:
    'A Creative Direction Engine built in n8n—swap casting and wardrobe while locking the shot. Campaign-grade coherence from generative AI.',
  openGraph: {
    title: 'AI Sports Campaign — Raúl Mermans',
    description: 'Generative AI gives you images. This system gives you campaigns.',
    type: 'article',
    url: `${baseUrl}/case-studies/ai-sports`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Sports Campaign — Raúl Mermans',
    description: 'Generative AI gives you images. This system gives you campaigns.',
  },
}

export default function AISportsCampaignLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

