import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Raúl Mermans',
  description: 'Privacy Policy for Raúl Mermans portfolio website.',
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

