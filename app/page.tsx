'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import SectionCards from '@/components/SectionCards'
import About from '@/components/About'
import Services from '@/components/Services'
import Contact from '@/components/Contact'
import Socials from '@/components/Socials'
import ErrorBoundary from '@/components/ErrorBoundary'
import { absoluteRouteUrl, siteConfig } from '@/lib/metadata'

// Dynamic import for non-critical component - improves INP
const BackToTop = dynamic(() => import('@/components/BackToTop'), { ssr: false })

const homeServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': `${siteConfig.url}/#services`,
  name: 'Services by Raúl Mermans',
  itemListElement: [
    {
      '@type': 'Service',
      position: 1,
      name: 'AI Systems',
      serviceType: 'Applied AI Systems Design',
      description:
        'Applied AI systems that turn repetitive, judgment-heavy work into reliable execution through automation logic, orchestration, and AI-enabled workflows.',
      provider: {
        '@type': 'Person',
        '@id': `${siteConfig.url}/#person`,
      },
      areaServed: {
        '@type': 'Country',
        name: 'Spain',
      },
      url: absoluteRouteUrl('/'),
    },
    {
      '@type': 'Service',
      position: 2,
      name: 'Web Development',
      serviceType: 'Web Design and Development',
      description:
        'Modern, performance-minded websites and digital experiences designed for clear storytelling, conversion, and premium execution.',
      provider: {
        '@type': 'Person',
        '@id': `${siteConfig.url}/#person`,
      },
      areaServed: {
        '@type': 'Country',
        name: 'Spain',
      },
      url: absoluteRouteUrl('/'),
    },
    {
      '@type': 'Service',
      position: 3,
      name: 'Photography',
      serviceType: 'Brand and Editorial Photography',
      description:
        'Photography that supports brand storytelling through composition, visual restraint, and imagery shaped for editorial and commercial use.',
      provider: {
        '@type': 'Person',
        '@id': `${siteConfig.url}/#person`,
      },
      areaServed: {
        '@type': 'Country',
        name: 'Spain',
      },
      url: absoluteRouteUrl('/photography'),
    },
    {
      '@type': 'Service',
      position: 4,
      name: 'Creative Direction',
      serviceType: 'Creative Direction and Brand Systems',
      description:
        'Creative direction spanning brand identity, visual systems, and campaign thinking so every touchpoint feels coherent, intentional, and commercially credible.',
      provider: {
        '@type': 'Person',
        '@id': `${siteConfig.url}/#person`,
      },
      areaServed: {
        '@type': 'Country',
        name: 'Spain',
      },
      url: absoluteRouteUrl('/'),
    },
  ],
}

export default function Home() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const root = document.documentElement
    const body = document.body
    root.classList.add('homepage')
    body.style.overflowY = 'auto'
    root.style.scrollSnapType = 'none'
    body.style.scrollSnapType = 'none'

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let revealObserver: IntersectionObserver | null = null

    const revealElement = (element: Element) => {
      element.classList.add('visible')
      revealObserver?.unobserve(element)
    }

    const isNearViewport = (element: Element) => {
      const rect = element.getBoundingClientRect()
      return rect.top < window.innerHeight + 160 && rect.bottom > -120
    }

    const setupRevealObserver = () => {
      const revealElements = Array.from(document.querySelectorAll('.reveal:not(.visible)'))
      if (revealElements.length === 0) return

      if (prefersReducedMotion) {
        revealElements.forEach((element) => element.classList.add('visible'))
        return
      }

      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              revealElement(entry.target)
            }
          })
        },
        { threshold: 0.08, rootMargin: '120px 0px -60px 0px' }
      )

      revealElements.forEach((element) => {
        if (isNearViewport(element)) {
          revealElement(element)
        } else {
          revealObserver?.observe(element)
        }
      })
    }

    requestAnimationFrame(setupRevealObserver)

    // Section transitions - fade/slide when sections enter viewport
    const sectionSelectors = '[data-home-section="hero"], [data-home-section="work"], .about, .services, .contact, .socials'
    const sectionElements = document.querySelectorAll(sectionSelectors)
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    sectionElements.forEach((el) => {
      el.classList.add('section-transition')
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('section-visible')
      }
      sectionObserver.observe(el)
    })

    return () => {
      revealObserver?.disconnect()
      sectionObserver.disconnect()
      root.classList.remove('homepage')
      root.style.scrollSnapType = 'none'
      body.style.scrollSnapType = 'none'
    }
  }, [])

  return (
    <ErrorBoundary>
      <main id="main-content">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homeServiceSchema) }}
        />
        <Header />
        <Hero />
        <SectionCards />
        
        {/* Social Proof Section - Placeholder for future content
        * Suggested location for "Trusted By" logos or testimonial quotes
        * Uncomment and populate when client logos/testimonials are available
        *
        * <section className="social-proof" aria-label="Client testimonials">
        *   <div className="social-proof__inner">
        *     <p className="social-proof__label">Trusted By</p>
        *     <div className="social-proof__logos">
        *       {/* Add client logos here - recommended: 4-6 logos *}
        *       {/* <Image src="/images/clients/logo1.svg" alt="Client Name" width={120} height={40} /> *}
        *     </div>
        *     <blockquote className="social-proof__testimonial">
        *       <p className="social-proof__quote">
        *         "Quote from a satisfied client about the quality of work and results achieved."
        *       </p>
        *       <cite className="social-proof__cite">
        *         — Client Name, Company
        *       </cite>
        *     </blockquote>
        *   </div>
        * </section>
        */}
        
        <About />
        <Services />
        <Contact />
        <Socials />
        <Footer />
        <BackToTop />
      </main>
    </ErrorBoundary>
  )
}
