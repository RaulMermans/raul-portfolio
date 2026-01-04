'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Contact from '@/components/Contact'
import Socials from '@/components/Socials'

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
        {/* Hero/Bio Section */}
        <section className="about-hero">
          <div className="about-hero__container">
            {/* Image Section */}
            <div className="about-hero__image-wrapper reveal">
              <div className="about-hero__image">
                <Image
                  src="/images/about/profile.webp"
                  alt="Raúl Mermans"
                  fill
                  priority
                  quality={85}
                  sizes="(max-width: 900px) 100vw, 500px"
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                  className="about-hero__img"
                />
              </div>
            </div>

            {/* Content Section */}
            <div className="about-hero__content">
              <div className="about-hero__header reveal">
                <p className="label about-hero__label">About</p>
              </div>
              
              <h1 className="about-hero__title reveal reveal-delay-1">
                Digital Systems & Creative Direction
              </h1>

              <div className="about-hero__text reveal reveal-delay-2">
                <p>
                  I build brand systems that turn cultural momentum into business outcomes. My background is in business administration, but I&apos;m self-taught in what actually moves the needle: brand strategy, visual storytelling, technical automation, and the frameworks that connect them.
                </p>
                
                <p>
                  Most people separate creative vision from technical execution. I don&apos;t. I&apos;ve built photography projects that function as brand narratives, designed identity systems that scale across platforms, and automated workflows that turn trend analysis into actionable content strategies. The thread connecting all of it is treating culture as a system you can read, interpret, and build with.
                </p>
                
                <p>
                  My work lives in the space between what a brand says and how it operates. I develop visual identities for cultural brands, architect automation systems for content and marketing, and translate emerging trends into strategies that create demand rather than chase it. I&apos;m interested in building the invisible infrastructure that makes a brand feel inevitable.
                </p>
                
                <p>
                  I work best with people who understand that the gap between where culture is moving and where most brands are stuck is an opportunity, not a problem. If you&apos;re building something that requires both strategic thinking and hands-on execution, let&apos;s talk.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <Contact />

        {/* Socials Section */}
        <Socials />

      </main>

      {/* Footer */}
      <Footer />
    </>
  )
}
