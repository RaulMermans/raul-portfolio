import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Business Intelligence & Data Systems',
  description:
    'Business intelligence and data systems case studies by Raúl Mermans: dashboards, benchmark interfaces, and strategic-reading systems that turn structured data into clear decisions.',
  path: '/case-studies/data-systems',
  locale: 'en',
  image: {
    url: '/images/sections/case-studies-bg.webp',
    alt: 'Data systems case studies by Raúl Mermans',
  },
  keywords: ['data systems', 'business intelligence', 'dashboards', 'benchmark'],
})

export default function EnglishDataSystemsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
