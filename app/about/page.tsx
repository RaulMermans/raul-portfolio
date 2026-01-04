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

  const services = [
    {
      number: '01',
      title: 'AI Agents',
      description: 'Intelligent automation systems that streamline workflows and unlock new possibilities.',
      items: ['Custom AI Solutions', 'Automation Workflows', 'Prompt Engineering'],
    },
    {
      number: '02',
      title: 'Web Development',
      description: 'Modern, performant web experiences crafted with precision.',
      items: ['Custom Web Design', 'Frontend Development', 'Performance Optimization'],
    },
    {
      number: '03',
      title: 'Photography',
      description: 'Visual narratives that capture the essence of brands and stories.',
      items: ['Brand Photography', 'Visual Storytelling', 'Editorial Shoots'],
    },
    {
      number: '04',
      title: 'Creative Direction',
      description: 'Strategic creative vision from concept to execution.',
      items: ['Brand Strategy', 'Visual Identity', 'Art Direction'],
    },
  ]

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <div className="grain" aria-hidden="true"></div>
      <Header />
      
      <main id="main-content" role="main">
        {/* Hero/Bio Section */}
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
                  quality={80}
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

        {/* Services Section */}
        <section id="services" className="about-services">
          <div className="about-services__inner">
            <div className="about-services__header reveal">
              <p className="label about-services__label">Services</p>
              <div className="about-services__divider"></div>
            </div>

            <h2 className="about-services__title reveal reveal-delay-1">
              What I Can Provide
            </h2>

            <p className="about-services__subtitle reveal reveal-delay-1">
              Strategic creative direction, technical execution, and the systems that connect them.
            </p>

            <div className="about-services__grid reveal reveal-delay-2">
              {services.map((service, index) => (
                <div key={service.number} className="about-services__card">
                  <div className="about-services__card-header">
                    <span className="about-services__card-number">{service.number}</span>
                    <h3 className="about-services__card-title">{service.title}</h3>
                  </div>
                  <p className="about-services__card-description">{service.description}</p>
                  <ul className="about-services__card-items">
                    {service.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="about-services__card-item">{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
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
