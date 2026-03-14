import type { Metadata } from 'next'
import OverflowLanding from './OverflowLanding'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://raulmermans.com'

export const metadata: Metadata = {
  title: 'Overflow App',
  description:
    'Discover Overflow, a calm workout tracking app for iPhone that helps you log training, build routines, and measure progress with less noise and more focus.',
  openGraph: {
    title: 'Overflow App — Raúl Mermans',
    description:
      'Discover Overflow, a calm workout tracking app for iPhone that helps you log training, build routines, and measure progress with less noise and more focus.',
    url: `${baseUrl}/apps/overflow`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Overflow App — Raúl Mermans',
    description:
      'Discover Overflow, a calm workout tracking app for iPhone that helps you log training, build routines, and measure progress with less noise and more focus.',
  },
  alternates: {
    canonical: `${baseUrl}/apps/overflow`,
  },
}

export default function OverflowPage() {
  return <OverflowLanding />
}
