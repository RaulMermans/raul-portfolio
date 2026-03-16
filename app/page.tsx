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

// Dynamic import for non-critical component - improves INP
const BackToTop = dynamic(() => import('@/components/BackToTop'), { ssr: false })

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
