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
  const emailLabel = isSpanish ? 'Enviar email a Raúl Mermans' : 'Send email to Raúl Mermans'
  const contactLabel = isSpanish ? 'Contacto directo' : 'Direct contact'
  const socialLabel = isSpanish ? 'Social' : 'Social'
  const availability = isSpanish
    ? 'Disponible para sistemas de IA, automatización y dirección creativa.'
    : 'Available for AI systems, automation, and creative direction.'
  const topLabel = isSpanish ? 'Volver arriba' : 'Back to top'
  const externalLabel = isSpanish ? 'Abre en una pestaña nueva' : 'Opens in a new tab'

  return (
    <footer id="footer" className="footer">
      <div className="footer__inner">
        <div className="footer__masthead" aria-label="Raúl Mermans">
          <Link href={localizePath('/', locale)} className="footer__wordmark">
            Raúl Mermans
          </Link>
          <a href="#main-content" className="footer__top-link">
            {topLabel}
          </a>
        </div>

        <div className="footer__top">
          <section className="footer__brand" aria-labelledby="footer-brand-heading">
            <p id="footer-brand-heading" className="footer__eyebrow">
              {contactLabel}
            </p>
            <p className="footer__tagline">{copy.tagline}</p>
            <p className="footer__availability">{availability}</p>
            <a href="mailto:raulmermans@gmail.com" className="footer__email" aria-label={emailLabel}>
              <span>raulmermans@gmail.com</span>
              <span aria-hidden="true">→</span>
            </a>
          </section>

          <nav className="footer__nav" aria-label={isSpanish ? 'Navegación del pie de página' : 'Footer navigation'}>
            <div className="footer__column">
              <h2>{copy.work}</h2>
              <ul>
                {copy.workLinks.map((item) => (
                  <li key={item.label}>
                    <Link href={localizePath(item.href, locale)}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer__column">
              <h2>{copy.services}</h2>
              <ul>
                {copy.serviceLinks.map((item) => (
                  <li key={item.label}>
                    <Link href={localizePath(item.href, locale)}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer__column">
              <h2>{copy.resources}</h2>
              <ul>
                {copy.resourceLinks.map((item) => (
                  <li key={item.label}>
                    {'external' in item && item.external ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer" aria-label={`${item.label}. ${externalLabel}`}>
                        {item.label}
                      </a>
                    ) : (
                      <Link href={localizePath(item.href, locale)}>{item.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer__column">
              <h2>{socialLabel}</h2>
              <ul>
                <li>
                  <a href="https://www.instagram.com/raulmeermans/" target="_blank" rel="noopener noreferrer" aria-label={`Instagram. ${externalLabel}`}>
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="https://linkedin.com/in/raulmermans" target="_blank" rel="noopener noreferrer" aria-label={`LinkedIn. ${externalLabel}`}>
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="https://unsplash.com/@raulmermans" target="_blank" rel="noopener noreferrer" aria-label={`Unsplash. ${externalLabel}`}>
                    Unsplash
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/raulmermans" target="_blank" rel="noopener noreferrer" aria-label={`X. ${externalLabel}`}>
                    X
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="footer__bottom">
          <p className="footer__vibe-text">{copy.builtBy}</p>
          <p className="footer__copy">© {currentYear} Raúl Mermans. {copy.rightsReserved}</p>
          <div className="footer__legal">
            <Link href={localizePath('/privacy', locale)}>{copy.privacy}</Link>
            <Link href={localizePath('/terms', locale)}>{copy.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
