'use client'

import Reveal from './Reveal'
import ContactForm from './ContactForm'

export default function Contact() {
  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="contact__glow" aria-hidden="true"></div>
      <div className="contact__content">
        <p className="label contact__label reveal">Get in Touch</p>
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
        
        <div className="contact__divider reveal reveal-delay-4"></div>
        
        <div className="contact__links reveal reveal-delay-4" role="list">
          <a 
            href="mailto:raulmermans@gmail.com" 
            className="link" 
            aria-label="Send email to Raúl Mermans"
          >
            Email
          </a>
          <a 
            href="https://www.instagram.com/raulmeermans/" 
            className="link" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Visit Raúl Mermans on Instagram (opens in new tab)"
          >
            Instagram
          </a>
          <a 
            href="https://linkedin.com/in/raulmermans" 
            className="link" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Visit Raúl Mermans on LinkedIn (opens in new tab)"
          >
            LinkedIn
          </a>
          <a 
            href="https://unsplash.com/@raulmermans" 
            className="link" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Visit Raúl Mermans on Unsplash (opens in new tab)"
          >
            Unsplash
          </a>
        </div>
        
        <div className="contact__divider reveal reveal-delay-5"></div>
        
        <div className="ai-products reveal reveal-delay-5">
          <p className="label ai-products__label">AI Products</p>
          <div className="ai-products__links" role="list">
            <a 
              href="https://promptbase.com/profile/mangerm" 
              className="btn" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="View Image Prompts on PromptBase (opens in new tab)"
            >
              Image Prompts
            </a>
            <a 
              href="https://raulmermans.gumroad.com/" 
              className="btn" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Visit Gumroad Store (opens in new tab)"
            >
              Gumroad Store
            </a>
          </div>
        </div>
        
        <p className="contact__location reveal reveal-delay-6">Spain — Available Worldwide</p>
      </div>
    </section>
  )
}

