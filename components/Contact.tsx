'use client'

import Reveal from './Reveal'
import ContactForm from './ContactForm'

export default function Contact() {
  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="contact__glow" aria-hidden="true"></div>
      <div className="contact__content">
        <h1 id="contact-title" className="contact__headline reveal reveal-delay-1">Let&apos;s Work Together</h1>
        <p className="contact__subtitle reveal reveal-delay-1">
          Have a project in mind? I&apos;d love to hear about it. Whether it&apos;s creative direction, 
          AI automation, or visual storytelling—let&apos;s bring your vision to life.
        </p>
        
        <div className="contact__divider reveal reveal-delay-2"></div>
        
        {/* Contact Form */}
        <div id="contact-form" className="contact__form-wrapper reveal reveal-delay-2">
          <div className="contact-form__intro">
            <p className="contact-form__intro-text">Send me a message and I&apos;ll get back to you within 24 hours.</p>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}

