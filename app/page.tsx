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
    
    // Add class to html to identify homepage for CSS
    document.documentElement.classList.add('homepage')
    
    // Enable scroll-snap for homepage
    // Only enable on desktop
    const enableScrollSnap = () => {
      const isDesktop = window.innerWidth > 768
      const html = document.documentElement
      
      if (isDesktop) {
        // Wait for all sections to be rendered
        requestAnimationFrame(() => {
          // Set scroll-snap on html element (CSS will also apply, but this ensures it)
          html.style.scrollSnapType = 'y mandatory'
          
          // Apply scroll-snap-align to all sections - use multiple selectors to catch all
          const selectors = [
            'section.hero',
            'section.section-card', 
            'section.about',
            'section.services',
            'section.contact',
            'footer.footer',
            '.hero',
            '.section-card',
            '.about',
            '.services',
            '.contact',
            '.footer'
          ]
          
          selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector)
            elements.forEach((element: any) => {
              if (element) {
                element.style.scrollSnapAlign = 'start'
                element.style.scrollSnapStop = 'always'
              }
            })
          })
        })
      } else {
        html.style.scrollSnapType = 'none'
        const sections = document.querySelectorAll('section, footer')
        sections.forEach((section: any) => {
          if (section) {
            section.style.scrollSnapAlign = 'unset'
            section.style.scrollSnapStop = 'unset'
          }
        })
      }
    }
    
    // Run after a short delay to ensure all components are mounted
    setTimeout(() => {
      enableScrollSnap()
    }, 100)
    
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
        document.documentElement.classList.remove('homepage')
        document.documentElement.style.scrollSnapType = ''
        const sections = document.querySelectorAll('section, footer')
        sections.forEach((section: any) => {
          if (section) {
            section.style.scrollSnapAlign = ''
            section.style.scrollSnapStop = ''
          }
        })
      }
    }
  }, [])

  return (
    <ErrorBoundary>
      <Header />
      <Hero />
      <SectionCards />
      <About />
      <Services />
      <Contact />
      <Footer />
      <BackToTop />
    </ErrorBoundary>
  )
}
