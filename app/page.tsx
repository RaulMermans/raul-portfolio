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
    
    // Add class to html to identify homepage for CSS
    document.documentElement.classList.add('homepage')
    
    document.body.style.overflowY = 'auto'
    
    // Ensure scroll-snap is disabled on mount
    if (typeof window !== 'undefined') {
      document.documentElement.style.scrollSnapType = 'none'
      document.body.style.scrollSnapType = 'none'
    }
    
    // Cache viewport height to avoid repeated calculations
    let viewportHeight = window.innerHeight

    // Update viewport height on resize
    const handleResize = () => {
      viewportHeight = window.innerHeight
    }
    window.addEventListener('resize', handleResize, { passive: true })

    // Reveal animation observer for all .reveal elements
    let revealObserver: IntersectionObserver | null = null
    
    const setupRevealObserver = () => {
      // Clean up existing observer
      if (revealObserver) {
        revealObserver.disconnect()
      }

      const revealElements = document.querySelectorAll('.reveal:not(.visible)')
      
      if (revealElements.length === 0) return

      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible')
              revealObserver?.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.01, rootMargin: '100px 0px 100px 0px' }
      )

      revealElements.forEach((el) => {
        // Check if already in viewport - be more lenient
        const rect = el.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight + 200 && rect.bottom > -200
        if (isVisible) {
          el.classList.add('visible')
        } else {
          revealObserver?.observe(el)
        }
      })
    }

    // Run after React hydration
    requestAnimationFrame(() => {
      setupRevealObserver()
      // Also check periodically for dynamically added elements
      setTimeout(setupRevealObserver, 100)
      setTimeout(setupRevealObserver, 500)
      setTimeout(setupRevealObserver, 1000)
    })

    // Section transitions - fade/slide when sections enter viewport
    const sectionSelectors = '.hero, .section-cards-container, .about, .services, .contact, .socials'
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

    // Throttled scroll handler for better performance
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Check for reveals on scroll (only check visible ones)
          const revealElements = document.querySelectorAll('.reveal:not(.visible)')
          const viewportTop = 0
          const viewportBottom = viewportHeight
          
          revealElements.forEach((el) => {
            const rect = el.getBoundingClientRect()
            if (rect.top < viewportBottom + 200 && rect.bottom > viewportTop - 200) {
              el.classList.add('visible')
              revealObserver?.unobserve(el)
            }
          })
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Check immediately

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      if (revealObserver) {
        revealObserver.disconnect()
      }
      sectionObserver.disconnect()
      // Cleanup on unmount
      if (typeof window !== 'undefined') {
        document.documentElement.classList.remove('homepage')
        document.documentElement.style.scrollSnapType = 'none'
        document.body.style.scrollSnapType = 'none'
      }
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
