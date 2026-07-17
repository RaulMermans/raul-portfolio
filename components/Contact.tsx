'use client'

import { getSiteCopy } from '@/data/site-copy'
import { PUBLIC_CONTACT_EMAIL, PUBLIC_CONTACT_MAILTO } from '@/lib/contact'
import { type Locale } from '@/lib/i18n'

interface ContactProps {
  locale?: Locale
}

const LINKEDIN_URL = 'https://linkedin.com/in/raulmermans'
const GITHUB_URL = 'https://github.com/RaulMermans'

export default function Contact({ locale = 'en' }: ContactProps) {
  const copy = getSiteCopy(locale).home.contact
  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="contact__glow" aria-hidden="true"></div>
      <div className="contact__content">
        <h2 id="contact-title" className="contact__headline reveal reveal-delay-1">{copy.title}</h2>
        <p className="contact__subtitle reveal reveal-delay-1">
          {copy.subtitle}
        </p>
        
        <div className="contact__divider reveal reveal-delay-2"></div>

        <div id="contact-form" className="contact-direct reveal reveal-delay-2">
          <div className="contact-direct__meta">
            <p className="contact-direct__intro">{copy.intro}</p>
            <div className="contact-direct__status">
              <span>{copy.availability}</span>
              <span>{copy.location}</span>
            </div>
          </div>

          <div className="contact-direct__links" aria-label={copy.linksLabel}>
            <a href={PUBLIC_CONTACT_MAILTO} className="contact-direct__link">
              <span>{copy.emailLabel}</span>
              <strong>{PUBLIC_CONTACT_EMAIL}</strong>
              <span aria-hidden="true">→</span>
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-direct__link"
            >
              <span>{copy.linkedinLabel}</span>
              <strong>Raúl Mermans</strong>
              <span aria-hidden="true">↗</span>
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-direct__link"
            >
              <span>{copy.githubLabel}</span>
              <strong>RaulMermans</strong>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
