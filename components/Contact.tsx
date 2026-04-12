'use client'

import { getSiteCopy } from '@/data/site-copy'
import Reveal from './Reveal'
import ContactForm from './ContactForm'
import { type Locale } from '@/lib/i18n'

interface ContactProps {
  locale?: Locale
}

export default function Contact({ locale = 'en' }: ContactProps) {
  const copy = getSiteCopy(locale).home.contact
  return (
    <section id="contact" className="contact" data-home-section="contact" aria-labelledby="contact-title">
      <div className="contact__glow" aria-hidden="true"></div>
      <div className="contact__content">
        <h2 id="contact-title" className="contact__headline reveal reveal-delay-1">{copy.title}</h2>
        <p className="contact__subtitle reveal reveal-delay-1">
          {copy.subtitle}
        </p>

        <ol className="contact__steps reveal reveal-delay-2" aria-label={locale === 'es' ? 'Qué ocurre después' : 'What happens next'}>
          {copy.steps.map((step, index) => (
            <li key={step} className="contact__step">
              <span className="contact__step-index">{index + 1}</span>
              <span className="contact__step-text">{step}</span>
            </li>
          ))}
        </ol>
        
        <div className="contact__divider reveal reveal-delay-2"></div>
        
        {/* Contact Form */}
        <div id="contact-form" className="contact__form-wrapper reveal reveal-delay-3">
          <div className="contact-form__intro">
            <p className="contact-form__intro-text">{copy.intro}</p>
          </div>
          <ContactForm locale={locale} />
        </div>
      </div>
    </section>
  )
}
