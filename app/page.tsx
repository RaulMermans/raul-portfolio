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

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [currentSection, setCurrentSection] = useState(1)

  useEffect(() => {
    const sections = document.querySelectorAll('section')
    const total = sections.length

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

      <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-center gap-3 opacity-0 animate-[fadeIn_0.8s_ease-out_1.4s_forwards]">
        <span className="font-mono text-xs text-ink-muted [writing-mode:vertical-rl]">
          {String(currentSection).padStart(2, '0')}/{String(6).padStart(2, '0')}
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
