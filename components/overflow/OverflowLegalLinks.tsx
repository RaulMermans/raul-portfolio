'use client'

import Link from 'next/link'
import { type Locale, localizePath } from '@/lib/i18n'

type OverflowLegalLinkKey = 'support' | 'privacy' | 'terms'

export default function OverflowLegalLinks({
  locale = 'es',
  currentPage,
}: {
  locale?: Locale
  currentPage?: OverflowLegalLinkKey
}) {
  const isSpanish = locale === 'es'
  const links = [
    {
      key: 'support' as const,
      label: isSpanish ? 'Soporte' : 'Support',
      href: localizePath('/overflow/support', locale),
    },
    {
      key: 'privacy' as const,
      label: isSpanish ? 'Privacidad' : 'Privacy',
      href: localizePath('/overflow/privacy', locale),
    },
    {
      key: 'terms' as const,
      label: isSpanish ? 'Términos' : 'Terms',
      href: localizePath('/overflow/terms', locale),
    },
  ]

  return (
    <nav
      aria-label={isSpanish ? 'Navegación legal de Overflow' : 'Overflow legal navigation'}
      className="legal-page__link-row"
    >
      {links.map((link) => (
        <Link
          key={link.key}
          href={link.href}
          className="legal-page__link-pill"
          aria-current={currentPage === link.key ? 'page' : undefined}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  )
}
