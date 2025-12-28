'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import SectionCards from '@/components/SectionCards'
import About from '@/components/About'
import Services from '@/components/Services'
import Contact from '@/components/Contact'
import CustomCursor from '@/components/CustomCursor'
import BackToTop from '@/components/BackToTop'

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [currentSection, setCurrentSection] = useState(1)

  useEffect(() => {
    const sections = document.querySelectorAll('section')
    const footer = document.querySelector('.footer')
    const total = sections.length + 1 // +1 for footer

    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const percentage = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setScrollProgress(percentage)

      let current = 1
      sections.forEach((section, i) => {
        if (section.getBoundingClientRect().top <= window.innerHeight / 2) {
          current = i + 1
        }
      })

      // Check if footer is in view
      if (footer && footer.getBoundingClientRect().top <= window.innerHeight / 2) {
        current = total
      }

      setCurrentSection(current)
    }

    // Reveal animation observer for all .reveal elements
    const revealElements = document.querySelectorAll('.reveal')
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    )

    revealElements.forEach((el) => revealObserver.observe(el))

    window.addEventListener('scroll', updateProgress, { passive: true })
    updateProgress()

    return () => {
      window.removeEventListener('scroll', updateProgress)
      revealElements.forEach((el) => revealObserver.unobserve(el))
    }
  }, [])

  return (
    <>
      <CustomCursor />
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Header />
      
      <main id="main-content">
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
    </>
  )
}
