import Link from 'next/link'
import { type Locale, localizePath } from '@/lib/i18n'

export default function BackLink({ href, locale, label }: { href: string; locale: Locale; label?: string }) {
  return (
    <Link href={localizePath(href, locale)} className="ui-back-link" data-testid="site-back-link">
      <span aria-hidden="true">←</span> {label ?? (locale === 'es' ? 'Volver' : 'Back')}
    </Link>
  )
}
