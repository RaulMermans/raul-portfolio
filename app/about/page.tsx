'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import ContactForm from '@/components/ContactForm'

export default function AboutPage() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Disable scroll-snap for normal scrolling
    document.documentElement.style.scrollSnapType = 'none'
    document.body.style.overflowY = 'auto'

    // Reveal animation observer
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '50px 0px' }
    )

    document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el))

    return () => {
      revealObserver.disconnect()
      document.documentElement.style.scrollSnapType = ''
      document.body.style.overflowY = ''
    }
  }, [])

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <div className="grain" aria-hidden="true"></div>
      <Header />
      
      <main id="main-content" role="main">
        {/* About Section */}
        <section className="about-page">
          <div className="about-page__inner">
            {/* Left Column: Image */}
            <div className="about-page__left">
              <div className="about-page__image reveal">
                <Image
                  src="/images/about/profile.webp"
                  alt="Raúl Mermans"
                  width={800}
                  height={1067}
                  className="about-page__img"
                  priority
                  quality={90}
                  sizes="(max-width: 900px) 100vw, 40vw"
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                />
              </div>
            </div>

            {/* Right Column: Content */}
            <div className="about-page__content">
              <div className="about-page__header reveal">
                <p className="label about-page__label">About</p>
                <div className="about-page__divider"></div>
              </div>
              
              <h1 className="about-page__headline reveal reveal-delay-1">
                Digital Systems & Creative Direction
              </h1>

              <div className="about-page__text reveal reveal-delay-2">
                <p className="about-page__paragraph">
                  I build brand systems that turn cultural momentum into business outcomes. My background is in business administration, but I&apos;m self-taught in what actually moves the needle: brand strategy, visual storytelling, technical automation, and the frameworks that connect them.
                </p>
                
                <p className="about-page__paragraph">
                  Most people separate creative vision from technical execution. I don&apos;t. I&apos;ve built photography projects that function as brand narratives, designed identity systems that scale across platforms, and automated workflows that turn trend analysis into actionable content strategies. The thread connecting all of it is treating culture as a system you can read, interpret, and build with.
                </p>

                <p className="about-page__paragraph">
                  My work lives in the space between what a brand says and how it operates. I develop visual identities for cultural brands, architect automation systems for content and marketing, and translate emerging trends into strategies that create demand rather than chase it. I&apos;m interested in building the invisible infrastructure that makes a brand feel inevitable.
                </p>

                <p className="about-page__paragraph">
                  I work best with people who understand that the gap between where culture is moving and where most brands are stuck is an opportunity, not a problem. If you&apos;re building something that requires both strategic thinking and hands-on execution, let&apos;s talk.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact-form" className="about-page__contact-section">
          <div className="about-page__contact-inner">
            <div className="about-page__contact-header reveal">
              <p className="label about-page__contact-label">Get in Touch</p>
              <div className="about-page__contact-divider"></div>
            </div>

            <div className="about-page__contact-form-wrapper reveal reveal-delay-1">
              <ContactForm />
            </div>

            <div className="about-page__contact-links reveal reveal-delay-2">
              <a
                href="mailto:raulmermans@gmail.com"
                className="about-page__contact-link"
                aria-label="Send email to Raúl Mermans"
              >
                <span>Email</span>
                <span className="about-page__contact-arrow">→</span>
              </a>
              <a
                href="https://www.instagram.com/raulmeermans/"
                target="_blank"
                rel="noopener noreferrer"
                className="about-page__contact-link"
                aria-label="Visit Raúl Mermans on Instagram (opens in new tab)"
              >
                <span>Instagram</span>
                <span className="about-page__contact-arrow">↗</span>
              </a>
              <a
                href="https://linkedin.com/in/raulmermans"
                target="_blank"
                rel="noopener noreferrer"
                className="about-page__contact-link"
                aria-label="Visit Raúl Mermans on LinkedIn (opens in new tab)"
              >
                <span>LinkedIn</span>
                <span className="about-page__contact-arrow">↗</span>
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

