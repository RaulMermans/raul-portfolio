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
      ? 'inline-flex items-center justify-center rounded-full border border-transparent bg-[#f5f0eb] px-6 py-3 text-sm font-medium text-[#171411] transition duration-300 hover:-translate-y-0.5 hover:bg-white'
      : 'inline-flex items-center justify-center rounded-full border border-white/[0.14] bg-white/[0.04] px-6 py-3 text-sm font-medium text-[#f5f0eb] transition duration-300 hover:-translate-y-0.5 hover:border-white/[0.22] hover:bg-white/[0.08]'

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
