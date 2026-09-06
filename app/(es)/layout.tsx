import type { Metadata, Viewport } from 'next'
import '../../styles/globals.css'
import '../../styles/design-system.css'
import '../../styles/searchsignal-case-study.css'
import SiteDocument from '@/components/SiteDocument'
import { buildRootMetadata } from '@/lib/metadata'
import '@/lib/env-validation'

export const metadata: Metadata = buildRootMetadata('es')

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <SiteDocument locale="es">{children}</SiteDocument>
}
