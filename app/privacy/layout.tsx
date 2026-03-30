import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Privacy Policy',
  description:
    'Privacy Policy for Raúl Mermans covering how contact requests, analytics data, and personal information are collected, used, and protected.',
  path: '/privacy',
  noIndex: true,
})

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
