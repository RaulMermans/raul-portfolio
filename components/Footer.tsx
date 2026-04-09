import Link from 'next/link'
import { getSiteCopy } from '@/data/site-copy'
import { type Locale, localizePath } from '@/lib/i18n'

interface FooterProps {
  locale?: Locale
}

export default function Footer({ locale = 'en' }: FooterProps) {
  const currentYear = new Date().getFullYear()
  const copy = getSiteCopy(locale).footer

  return (
    <footer id="footer" className="footer">
      <div className="footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <p className="footer__logo">Raúl Mermans</p>
            <p className="footer__tagline">{copy.tagline}</p>
            <a 
              href="mailto:raulmermans@gmail.com" 
              className="footer__email"
              aria-label="Send email to Raúl Mermans"
            >
              raulmermans@gmail.com
            </a>
            
            <div className="footer__social">
              <a href="https://www.instagram.com/raulmeermans/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">IG</a>
              <a href="https://linkedin.com/in/raulmermans" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">LI</a>
              <a href="https://unsplash.com/@raulmermans" target="_blank" rel="noopener noreferrer" aria-label="Unsplash">UN</a>
              <a href="https://twitter.com/raulmermans" target="_blank" rel="noopener noreferrer" aria-label="Twitter">X</a>
            </div>
          </div>

          <div className="footer__column">
            <h4>{copy.work}</h4>
            <ul>
              {copy.workLinks.map((item) => (
                <li key={item.label}>
                  <Link href={localizePath(item.href, locale)}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__column">
            <h4>{copy.services}</h4>
            <ul>
              {copy.serviceLinks.map((item) => (
                <li key={item.label}>
                  <Link href={localizePath(item.href, locale)}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__column">
            <h4>{copy.resources}</h4>
            <ul>
              {copy.resourceLinks.map((item) => (
                <li key={item.label}>
                  {'external' in item && item.external ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer">
                      {item.label}
                    </a>
                  ) : (
                    <Link href={localizePath(item.href, locale)}>{item.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">© {currentYear} Raúl Mermans. {copy.rightsReserved}</p>
          <div className="footer__legal">
            <Link href={localizePath('/privacy', locale)}>{copy.privacy}</Link>
            <Link href={localizePath('/terms', locale)}>{copy.terms}</Link>
          </div>
        </div>

        <div className="footer__vibe">
          <p className="footer__vibe-text">{copy.builtBy}</p>
        </div>
      </div>
    </footer>
  )
}
