import Link from 'next/link'
import { getSiteCopy } from '@/data/site-copy'
import { type Locale, localizePath } from '@/lib/i18n'

interface FooterProps {
  locale?: Locale
}

export default function Footer({ locale = 'en' }: FooterProps) {
  const currentYear = new Date().getFullYear()
  const copy = getSiteCopy(locale).footer
  const isSpanish = locale === 'es'
  const topLabel = isSpanish ? 'Volver arriba' : 'Back to top'
  const externalLabel = isSpanish ? 'Abre en una pestaña nueva' : 'Opens in a new tab'
  const elsewhereLabel = isSpanish ? 'En otros sitios' : 'Elsewhere'
  const studioLabel = isSpanish ? 'Estudio' : 'Studio'
  const studioLinks = [
    { label: isSpanish ? 'Sobre mí' : 'About', href: '/about' },
    { label: isSpanish ? 'Contacto' : 'Contact', href: '/#contact', hash: '#contact' },
    { label: isSpanish ? 'Disponibilidad' : 'Availability', href: '/#contact', hash: '#contact' },
    { label: 'Press', href: 'mailto:raulmermans@gmail.com' },
  ]
  const socialLinks = [
    { label: 'GitHub', href: 'https://github.com/RaulMermans' },
    { label: 'Instagram', href: 'https://www.instagram.com/raulmeermans/' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/raulmermans' },
    { label: 'Unsplash', href: 'https://unsplash.com/@raulmermans' },
    { label: 'X / Twitter', href: 'https://twitter.com/raulmermans' },
  ]

  return (
    <footer id="footer" className="footer">
      <div className="footer__inner">
        <div className="footer__top">
          <div className="footer__top-panel footer__back-panel">
            <a href="#main-content" className="footer__back-top" aria-label={topLabel}>
              <span className="footer__arrow" aria-hidden="true" />
              <span>{topLabel}</span>
            </a>
          </div>

          <nav className="footer__nav" aria-label={isSpanish ? 'Navegación del pie de página' : 'Footer navigation'}>
            <div className="footer__column">
              <h2>{elsewhereLabel}</h2>
              <ul>
                {socialLinks.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} target="_blank" rel="noopener noreferrer" aria-label={`${item.label}. ${externalLabel}`}>
                        {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer__column">
              <h2>{studioLabel}</h2>
              <ul>
                {studioLinks.map((item) => (
                  <li key={item.label}>
                    {item.href.startsWith('mailto:') ? (
                      <a href={item.href}>{item.label}</a>
                    ) : (
                      <Link href={localizePath(item.href, locale)}>{item.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div className="footer__bottom">
          <div className="footer__name-lockup" aria-label={`Raúl Mermans ${currentYear}`}>
            <span>Raúl</span>
            <span>
              Mermans
              <sup>©{currentYear}</sup>
            </span>
          </div>

          <div className="footer__meta">
            <p>
              {copy.builtBy}
            </p>
            <p>
              {isSpanish ? 'Con base en Madrid' : 'Based in Madrid'}
            </p>
            <div className="footer__legal">
              <Link href={localizePath('/privacy', locale)}>{copy.privacy}</Link>
              <Link href={localizePath('/terms', locale)}>{copy.terms}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
