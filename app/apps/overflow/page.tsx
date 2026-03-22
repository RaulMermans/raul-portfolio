import type { Metadata } from 'next'
import OverflowLanding from './OverflowLanding'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://raulmermans.com'

export const metadata: Metadata = {
  title: 'Overflow Case Study',
  description:
    'Case study for Overflow, a calm iPhone workout tracker focused on routines, scheduling, fast session starts, and meaningful progress.',
  openGraph: {
    title: 'Overflow Case Study | Raul Mermans',
    description:
      'Case study for Overflow, a calm iPhone workout tracker focused on routines, scheduling, fast session starts, and meaningful progress.',
    url: `${baseUrl}/apps/overflow`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Overflow Case Study | Raul Mermans',
    description:
      'Case study for Overflow, a calm iPhone workout tracker focused on routines, scheduling, fast session starts, and meaningful progress.',
  },
  alternates: {
    canonical: `${baseUrl}/apps/overflow`,
  },
}

export default function OverflowPage() {
  return <OverflowLanding />
}
