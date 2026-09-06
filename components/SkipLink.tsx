import type { Locale } from '@/lib/i18n'

const labels: Record<Locale, string> = {
  es: 'Saltar al contenido principal',
  en: 'Skip to main content',
}

export default function SkipLink({ locale }: { locale: Locale }) {
  return (
    <a href="#main-content" className="skip-link">
      {labels[locale]}
    </a>
  )
}
