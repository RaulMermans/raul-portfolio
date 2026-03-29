'use client'

import Reveal from './Reveal'
import ContactForm from './ContactForm'

export default function Contact() {
  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="contact__glow" aria-hidden="true"></div>
      <div className="contact__content">
        <h2 id="contact-title" className="contact__headline reveal reveal-delay-1">Let&apos;s Build the Right System</h2>
        <p className="contact__subtitle reveal reveal-delay-1">
          Working on AI systems, automation, internal tools, or creative operations? Send context.
          I design workflows and interfaces that help teams execute with more speed, consistency,
          and control.
        </p>
        
        <div className="contact__divider reveal reveal-delay-2"></div>
        
        {/* Contact Form */}
        <div id="contact-form" className="contact__form-wrapper reveal reveal-delay-2">
          <div className="contact-form__intro">
            <p className="contact-form__intro-text">Send a short brief and I&apos;ll get back to you within 24 hours.</p>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
