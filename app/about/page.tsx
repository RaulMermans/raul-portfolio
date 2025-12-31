'use client'

import { useEffect, useRef } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Reveal from '@/components/Reveal'

export default function AboutPage() {
  const connectSectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const logo = document.querySelector('.ui__logo')
    const nav = document.querySelector('.ui__nav')
    const menuBtn = document.querySelector('.ui__menu-btn')
    const connectSection = connectSectionRef.current

    if (!connectSection || !logo || !nav || !menuBtn) return

    const updateOnScroll = () => {
      const scrollTop = window.scrollY
      const connectTop = connectSection.offsetTop
      const viewportHeight = window.innerHeight

      const inDarkSection = scrollTop + viewportHeight * 0.1 >= connectTop

      logo.classList.toggle('on-dark', inDarkSection)
      nav.classList.toggle('on-dark', inDarkSection)
      menuBtn.classList.toggle('on-dark', inDarkSection)
    }

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
              <img
                src="/images/about/profile.webp"
                alt="Raúl Mermans"
                className="bio__image"
              />
              <div className="bio__image-frame" aria-hidden="true"></div>
            </div>

            <div className="bio__content">
              <p className="bio__page-title reveal">About</p>
              <p className="label bio__label reveal reveal--delay-1">The Story</p>
              <h1 className="bio__headline reveal reveal--delay-1">
                I make things that feel like something.
              </h1>

              <p className="bio__text reveal reveal--delay-2">
                I&apos;m Raúl — a <span className="bio__highlight">photographer, brand builder, and creative</span> based in Spain. I spend most of my time somewhere between a camera, a screen, and an idea that won&apos;t leave me alone until I make it real.
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
                aria-label="Instagram"
              >
                IG
              </a>
              <a
                href="https://linkedin.com/in/raulmermans"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                LI
              </a>
              <a
                href="https://unsplash.com/@raulmermans"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Unsplash"
              >
                UN
              </a>
              <a
                href="https://twitter.com/raulmermans"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                X
              </a>
            </div>

            <p className="connect__location reveal reveal--delay-3">Madrid, Spain</p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

