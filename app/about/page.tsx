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
                  I build <span className="highlight">brand systems</span> that turn <span className="highlight">cultural momentum</span> into <span className="highlight">business outcomes</span>. My background is in business administration, but I&apos;m <span className="highlight">self-taught</span> in what actually moves the needle: <span className="highlight">brand strategy</span>, <span className="highlight">visual storytelling</span>, <span className="highlight">technical automation</span>, and the frameworks that connect them.
                </p>
                
                <p>
                  Most people separate <span className="highlight">creative vision</span> from <span className="highlight">technical execution</span>. I don&apos;t. I&apos;ve built photography projects that function as <span className="highlight">brand narratives</span>, designed <span className="highlight">identity systems</span> that scale across platforms, and automated workflows that turn <span className="highlight">trend analysis</span> into actionable <span className="highlight">content strategies</span>. The thread connecting all of it is treating <span className="highlight">culture as a system</span> you can read, interpret, and build with.
                </p>
                
                <p>
                  My work lives in the space between what a brand says and how it operates. I develop <span className="highlight">visual identities</span> for <span className="highlight">cultural brands</span>, architect <span className="highlight">automation systems</span> for content and marketing, and translate <span className="highlight">emerging trends</span> into strategies that <span className="highlight">create demand</span> rather than chase it. I&apos;m interested in building the <span className="highlight">invisible infrastructure</span> that makes a brand feel inevitable.
                </p>
                
                <p>
                  I work best with people who understand that the gap between where <span className="highlight">culture is moving</span> and where most brands are stuck is an <span className="highlight">opportunity</span>, not a problem. If you&apos;re building something that requires both <span className="highlight">strategic thinking</span> and <span className="highlight">hands-on execution</span>, let&apos;s talk.
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
