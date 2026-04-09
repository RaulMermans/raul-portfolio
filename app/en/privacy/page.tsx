import type { Metadata } from 'next'
import PrivacyPolicy from '../../privacy/page'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Privacy Policy',
  description:
    'Privacy Policy for Raúl Mermans covering how contact requests, analytics data, and personal information are collected, used, and protected.',
  path: '/privacy',
  locale: 'en',
  noIndex: true,
})

export default function EnglishPrivacyPolicyPage() {
  return <PrivacyPolicy />
}
