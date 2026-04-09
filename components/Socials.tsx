'use client'

import { getSiteCopy } from '@/data/site-copy'
import Reveal from './Reveal'
import { type Locale } from '@/lib/i18n'

interface SocialsProps {
  locale?: Locale
}

export default function Socials({ locale = 'en' }: SocialsProps) {
  const copy = getSiteCopy(locale).home.socials
  return (
    <section id="socials" className="socials" aria-labelledby="socials-title">
      <div className="socials__glow" aria-hidden="true"></div>
      <div className="socials__content">
        <p className="label socials__label reveal">{copy.label}</p>
        <h2 id="socials-title" className="socials__title reveal reveal-delay-1">{copy.title}</h2>
        
        <div className="socials__divider reveal reveal-delay-2"></div>
        
        <ul className="socials__links reveal reveal-delay-2">
          <li>
            <a 
              href="mailto:raulmermans@gmail.com" 
              className="link" 
              aria-label="Send email to Raúl Mermans"
            >
              Email
            </a>
          </li>
          <li>
            <a 
              href="https://www.instagram.com/raulmeermans/" 
              className="link" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Visit Raúl Mermans on Instagram (opens in new tab)"
            >
              Instagram
            </a>
          </li>
          <li>
            <a 
              href="https://linkedin.com/in/raulmermans" 
              className="link" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Visit Raúl Mermans on LinkedIn (opens in new tab)"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a 
              href="https://unsplash.com/@raulmermans" 
              className="link" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Visit Raúl Mermans on Unsplash (opens in new tab)"
            >
              Unsplash
            </a>
          </li>
        </ul>
        
        <div className="socials__divider reveal reveal-delay-3"></div>
        
        <div className="ai-products reveal reveal-delay-3">
          <p className="label ai-products__label">{copy.selectedLinks}</p>
          <ul className="ai-products__links">
            <li>
              <a 
                href="https://promptbase.com/profile/mangerm" 
                className="btn" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="View PromptBase profile (opens in new tab)"
              >
                PromptBase Profile
              </a>
            </li>
            <li>
              <a 
                href="https://raulmermans.gumroad.com/" 
                className="btn" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Visit Gumroad Store (opens in new tab)"
              >
                Gumroad Store
              </a>
            </li>
          </ul>
        </div>
        
        <p className="socials__location reveal reveal-delay-4">{copy.location}</p>
      </div>
    </section>
  )
}
