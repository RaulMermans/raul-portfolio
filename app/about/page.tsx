'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Header from '@/components/Header'
import Reveal from '@/components/Reveal'

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
      { threshold: 0.15 }
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
        {/* COMBINED BIO & CONNECT SECTION */}
        <section className="about-page">
          <div className="about-page__inner">
            {/* Left Column: Image + Contact */}
            <div className="about-page__left">
              {/* Image */}
              <div className="about-page__image reveal">
                <Image
                  src="/images/about/profile.webp"
                  alt="Raúl Mermans"
                  width={800}
                  height={1067}
                  className="about-page__img"
                  priority
                  quality={90}
                  sizes="(max-width: 900px) 100vw, 35vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>

              {/* Contact Section - Under Image */}
              <div className="about-page__contact reveal reveal--delay-3">
                <div className="about-page__contact-header">
                  <p className="label about-page__contact-label">Get in Touch</p>
                  <div className="about-page__contact-divider"></div>
                  <p className="about-page__location">Madrid, Spain</p>
                </div>

                <a
                  href="mailto:raulmermans@gmail.com"
                  className="about-page__email-link"
                  aria-label="Send email to Raúl Mermans"
                >
                  <span className="about-page__email-text">raulmermans@gmail.com</span>
                  <span className="about-page__email-arrow">→</span>
                </a>

                <div className="about-page__social">
                  <a
                    href="https://www.instagram.com/raulmeermans/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about-page__social-link"
                    aria-label="Visit Raúl Mermans on Instagram (opens in new tab)"
                  >
                    <span className="about-page__social-text">Instagram</span>
                    <span className="about-page__social-arrow">↗</span>
                  </a>
                  <a
                    href="https://linkedin.com/in/raulmermans"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about-page__social-link"
                    aria-label="Visit Raúl Mermans on LinkedIn (opens in new tab)"
                  >
                    <span className="about-page__social-text">LinkedIn</span>
                    <span className="about-page__social-arrow">↗</span>
                  </a>
                  <a
                    href="https://unsplash.com/@raulmermans"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about-page__social-link"
                    aria-label="Visit Raúl Mermans on Unsplash (opens in new tab)"
                  >
                    <span className="about-page__social-text">Unsplash</span>
                    <span className="about-page__social-arrow">↗</span>
                  </a>
                  <a
                    href="https://twitter.com/raulmermans"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about-page__social-link"
                    aria-label="Visit Raúl Mermans on Twitter (opens in new tab)"
                  >
                    <span className="about-page__social-text">Twitter</span>
                    <span className="about-page__social-arrow">↗</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Full Content */}
            <div className="about-page__content">
              <div className="about-page__bio">
                <div className="about-page__header">
                  <p className="label about-page__label reveal">About</p>
                  <div className="about-page__divider reveal reveal--delay-1"></div>
                </div>
                
                <h1 className="about-page__headline reveal reveal--delay-1">
                  Digital Systems & Creative Direction
                </h1>

                <div className="about-page__text reveal reveal--delay-2">
                  <p className="about-page__paragraph">
                    I&apos;ve always believed that the best things are built in the space between a sharp business mind and an untamed creative spirit. My foundation is in business administration, but my real work lives in the things I taught myself to see and build when no one was watching. I am an autodidact who prefers the grit of the process over the safety of a classroom.
                  </p>
                  
                  <p className="about-page__paragraph">
                    I have never been comfortable staying in one lane. My work is driven by a restless need to master whatever tool is required to bring a vision to life, regardless of the complexity. I don&apos;t see a wall between a technical system and a human story: I see them as parts of the same language. I am always pushing toward the edge of what can be achieved because I am not just looking for a project. I am looking for the next foundation to lay and the next boundary to break.
                  </p>

                  <p className="about-page__paragraph">
                    I don&apos;t use technology as a shortcut. I use it as a partner to human intuition. My practice is about architecting the invisible structures that define how a brand feels and how a person interacts with a screen. I build the frameworks that make sense of our digital future because I am not just interested in what we see: I am interested in the systems that make the experience possible.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

