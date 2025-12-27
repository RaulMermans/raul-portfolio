'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import ProjectSection from '@/components/ProjectSection'
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

    window.addEventListener('scroll', updateProgress, { passive: true })
    updateProgress()

    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <>
      <CustomCursor />
      <Header />
      
      <main id="main-content">
        <Hero />
        <ProjectSection />
        <About />
        <Services />
        <Contact />
      </main>

      <Footer />

      <BackToTop />

      <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-center gap-3 opacity-0 animate-[fadeIn_0.8s_ease-out_1.4s_forwards] hidden md:flex">
        <span className="font-mono text-xs text-ink-muted [writing-mode:vertical-rl]">
          {String(currentSection).padStart(2, '0')}/{String(7).padStart(2, '0')}
        </span>
        <div className="w-0.5 h-[60px] bg-cream-dark rounded-sm overflow-hidden">
          <div
            className="w-full bg-ink transition-[height] duration-300 ease-out"
            style={{ height: `${scrollProgress}%` }}
          ></div>
        </div>
      </div>
    </>
  )
}
