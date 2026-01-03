'use client'

import Reveal from './Reveal'
import ContactForm from './ContactForm'

export default function Contact() {
  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="contact__glow" aria-hidden="true"></div>
      <div className="contact__content">
        <p className="label contact__label reveal">Get in Touch</p>
        <h1 id="contact-title" className="contact__headline reveal reveal-delay-1">Let&apos;s Work</h1>
        <h1 className="contact__test-headline" style={{ fontSize: '2rem', color: 'var(--accent)', marginTop: '1rem' }}>🚀 TEST: Deployment Verification Active</h1>
        <p className="contact__subtitle reveal reveal-delay-1">Ready to bring your vision to life? Let&apos;s start a conversation.</p>
        
        {/* CTA Button */}
        <a 
          href="#contact-form" 
          className="contact__cta btn reveal reveal-delay-2"
          aria-label="Scroll to contact form"
          onClick={(e) => {
            e.preventDefault()
            const form = document.getElementById('contact-form')
            if (form) {
              form.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
          }}
        >
          <span>Get in Touch</span>
          <span className="btn__arrow">→</span>
        </a>
        
        <div className="contact__divider reveal reveal-delay-3"></div>
        
        {/* Contact Form */}
        <div id="contact-form" className="contact__form-wrapper reveal reveal-delay-3">
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

