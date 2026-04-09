import { OverflowPageView, getOverflowMetadata } from '../../../apps/overflow/overflow-page-shared'

export const metadata = getOverflowMetadata('es')

export default function SpanishOverflowPage() {
  return <OverflowPageView locale="es" />
}
