import Link from 'next/link'
import type { AppCta } from '@/data/apps'

interface AppCtaLinkProps {
  cta: AppCta
  variant?: 'primary' | 'secondary'
}

export default function AppCtaLink({
  cta,
  variant = 'primary',
}: AppCtaLinkProps) {
  const className =
    variant === 'primary'
      ? 'ui-button ui-button--primary'
      : 'ui-button ui-button--inverse'

  return (
    <Link
      href={cta.href}
      className={className}
      target={cta.external ? '_blank' : undefined}
      rel={cta.external ? 'noreferrer' : undefined}
    >
      {cta.label}
    </Link>
  )
}
