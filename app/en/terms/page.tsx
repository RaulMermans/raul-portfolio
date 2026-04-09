import type { Metadata } from 'next'
import TermsOfService from '../../terms/page'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Terms of Service',
  description:
    'Terms of Service for Raúl Mermans covering the rules, limitations, and responsibilities that apply when using this portfolio website.',
  path: '/terms',
  locale: 'en',
  noIndex: true,
})

export default function EnglishTermsOfServicePage() {
  return <TermsOfService />
}
