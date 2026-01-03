'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import SectionCards from '@/components/SectionCards'
import About from '@/components/About'
import Services from '@/components/Services'
import Contact from '@/components/Contact'
import BackToTop from '@/components/BackToTop'
import ErrorBoundary from '@/components/ErrorBoundary'

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [currentSection, setCurrentSection] = useState(1)

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    // Enable scroll-snap for homepage
    // Only enable on desktop
    const enableScrollSnap = () => {
      if (window.innerWidth > 768) {
        document.documentElement.style.scrollSnapType = 'y mandatory'
      } else {
        document.documentElement.style.scrollSnapType = 'none'
      }
    }
    enableScrollSnap()
    window.addEventListener('resize', enableScrollSnap)
    document.body.style.overflowY = 'auto'
    
    const sections = document.querySelectorAll('section')
    const footer = document.querySelector('.footer')
    const total = sections.length + 1 // +1 for footer

    // Cache viewport height to avoid repeated calculations
    let viewportHeight = window.innerHeight
    
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - viewportHeight
      const percentage = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setScrollProgress(percentage)

      const viewportCenter = viewportHeight / 2
      let current = 1
      
      // Use for loop for better performance
      for (let i = 0; i < sections.length; i++) {
        const rect = sections[i].getBoundingClientRect()
        if (rect.top <= viewportCenter) {
          current = i + 1
        }
      }

      // Check if footer is in view
      if (footer) {
        const footerRect = footer.getBoundingClientRect()
        if (footerRect.top <= viewportCenter) {
          current = total
        }
      }

      setCurrentSection(current)
    }
    
    // Update viewport height on resize (debounced)
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
        { threshold: 0.1, rootMargin: '0px' }
      )

      revealElements.forEach((el) => {
        // Check if already in viewport
        const rect = el.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0
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
    })

    // Throttled scroll handler for better performance
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateProgress()
          // Check for reveals on scroll (only check visible ones)
          const revealElements = document.querySelectorAll('.reveal:not(.visible)')
          const viewportTop = 0
          const viewportBottom = viewportHeight
          
          for (let i = 0; i < revealElements.length; i++) {
            const el = revealElements[i] as HTMLElement
            const rect = el.getBoundingClientRect()
            if (rect.top < viewportBottom && rect.bottom > viewportTop) {
              el.classList.add('visible')
            }
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    updateProgress()
    handleScroll() // Check immediately

    return () => {
      window.removeEventListener('resize', enableScrollSnap)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      if (revealObserver) {
        revealObserver.disconnect()
      }
      // Cleanup scroll-snap on unmount
      if (typeof window !== 'undefined') {
        document.documentElement.style.scrollSnapType = ''
      }
    }
  }, [])

  return (
    <ErrorBoundary>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Header />
      
      <main id="main-content" role="main">
        <Hero />
        <SectionCards />
        <About />
        <Services />
        <Contact />
      </main>

      <Footer />

      <BackToTop />

      <div className="ui ui__progress" aria-hidden="true">
        <span className="ui__progress-text" id="progress-text">
          {String(currentSection).padStart(2, '0')}/{String(8).padStart(2, '0')}
        </span>
        <div className="ui__progress-bar">
          <div className="ui__progress-fill" id="progress" style={{ height: `${scrollProgress}%` }}></div>
        </div>
      </div>
    </ErrorBoundary>
  )
}
