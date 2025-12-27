'use client'

import { useEffect, useState } from 'react'

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      className={`back-to-top fixed bottom-6 right-6 w-11 h-11 bg-ink border border-white/20 rounded-full flex items-center justify-center text-cream text-sm cursor-pointer opacity-0 invisible translate-y-5 transition-all duration-300 ease-out z-[90] hover:bg-accent hover:border-accent md:bottom-4 md:right-4 ${
        isVisible ? 'visible opacity-100 translate-y-0' : ''
      }`}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      ↑
    </button>
  )
}

