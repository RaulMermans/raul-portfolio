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
  const profileLabel = isSpanish ? 'Perfil y contacto' : 'Profile & contact'
  const profileLinks = [
    { label: isSpanish ? 'Sobre mí' : 'About', href: '/about' },
    { label: isSpanish ? 'Contacto' : 'Contact', href: '/#contact', hash: '#contact' },
  ]
  const workLinks = [
    { label: isSpanish ? 'Casos de estudio' : 'Case Studies', href: '/case-studies' },
    { label: 'Apps', href: '/apps' },
    { label: isSpanish ? 'Fotografía' : 'Photography', href: '/photography' },
    { label: isSpanish ? 'Visuales' : 'Visuals', href: '/visuals' },
  ]
  const capabilityLinks = isSpanish ? [
    { label: 'Sistemas de IA y producto', href: '/services/prototipos-producto-ia' },
    { label: 'Datos e inteligencia para la decisión', href: '/services/automatizacion-creativa' },
    { label: 'Sistemas de marca y creatividad', href: '/services/sistemas-de-marca' },
  ] : [
    { label: 'AI Systems & Product', href: '/services/product-prototypes' },
    { label: 'Data & Decision Intelligence', href: '/services/creative-automation' },
    { label: 'Brand & Creative Systems', href: '/services/brand-systems' },
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
              <h2>{copy.work}</h2>
              <ul>
                {workLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={localizePath(item.href, locale)}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer__column">
              <h2>{copy.services}</h2>
              <ul>
                {capabilityLinks.map((item) => (
                  <li key={item.label}>
                    <Link href={localizePath(item.href, locale)}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer__column">
              <h2>{profileLabel}</h2>
              <ul>
                {profileLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={localizePath(item.href, locale)}>{item.label}</Link>
                  </li>
                ))}
                <li><a href="https://github.com/RaulMermans" target="_blank" rel="noopener noreferrer">GitHub ↗</a></li>
                <li><a href="https://linkedin.com/in/raulmermans" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></li>
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
            <p>{copy.availability}</p>
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
