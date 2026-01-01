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
        {/* BIO SECTION */}
        <section className="bio">
          <div className="bio__inner">
            <div className="bio__image-wrapper reveal">
              <Image
                src="/images/about/profile.webp"
                alt="Raúl Mermans"
                width={800}
                height={1067}
                className="bio__image"
                priority
                quality={90}
                sizes="(max-width: 900px) 100vw, 45vw"
                style={{ objectFit: 'cover' }}
              />
              <div className="bio__image-frame" aria-hidden="true"></div>
            </div>

            <div className="bio__content">
              <p className="bio__page-title reveal">About</p>
              <p className="label bio__label reveal reveal--delay-1">The Story</p>
              <h1 className="bio__headline reveal reveal--delay-1">
                Digital Systems & Creative Direction
              </h1>

              <p className="bio__text reveal reveal--delay-2">
                I&apos;m a self-taught builder obsessed with how stories and systems fit together. I&apos;ve taken my business background and turned it into a practice of creating digital environments where AI and human intuition work side-by-side.
              </p>
              
              <p className="bio__text reveal reveal--delay-3">
                My work lives at the crossroads of visuals and meaning. I&apos;m drawn to fashion, culture, and the kind of projects that have a point of view. Lately, I&apos;ve been deep into AI — not to replace the craft, but to push it somewhere new.
              </p>
            </div>
          </div>
        </section>

        {/* CONNECT SECTION */}
        <section className="connect" id="connect">
          <div className="connect__glow" aria-hidden="true"></div>
          <div className="connect__content">
            <p className="label connect__label reveal">Let&apos;s Talk</p>
            <h2 className="connect__headline reveal reveal--delay-1">Say Hello</h2>
            <p className="connect__text reveal reveal--delay-2">
              Whether it&apos;s a project, a collaboration, or just a conversation — I&apos;m always up for it.
            </p>

            <a
              href="mailto:raulmermans@gmail.com"
              className="btn btn--arrow connect__email reveal reveal--delay-2"
              aria-label="Send email to Raúl Mermans"
            >
              Get in Touch
            </a>

            <div className="connect__divider reveal reveal--delay-3" aria-hidden="true"></div>

            <p className="connect__social-label reveal reveal--delay-3">Find me online</p>
            <div className="connect__social reveal reveal--delay-3">
              <a
                href="https://www.instagram.com/raulmeermans/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Raúl Mermans on Instagram (opens in new tab)"
              >
                IG
              </a>
              <a
                href="https://linkedin.com/in/raulmermans"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Raúl Mermans on LinkedIn (opens in new tab)"
              >
                LI
              </a>
              <a
                href="https://unsplash.com/@raulmermans"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Raúl Mermans on Unsplash (opens in new tab)"
              >
                UN
              </a>
              <a
                href="https://twitter.com/raulmermans"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Raúl Mermans on Twitter (opens in new tab)"
              >
                X
              </a>
            </div>

            <p className="connect__location reveal reveal--delay-3">Madrid, Spain</p>
          </div>
        </section>
      </main>
    </>
  )
}

