import { OverflowPageView, getOverflowMetadata } from '@/app/(es)/apps/overflow/overflow-page-shared'

export const metadata = getOverflowMetadata('es')

export default function SpanishOverflowPage() {
  return <OverflowPageView locale="es" />
}
