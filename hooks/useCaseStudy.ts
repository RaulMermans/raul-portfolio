// =============================================
// CASE STUDY HOOKS
// Reusable hooks for case study pages
// =============================================

import { useEffect } from 'react'

/**
 * Hook for case study animations and scroll effects
 * Handles header scroll effect and reveal animations
 */
export function useCaseStudyAnimations() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Header scroll effect
    const header = document.getElementById('header')
    const handleScroll = () => {
      if (header) {
        if (window.scrollY > 100) {
          header.classList.add('scrolled')
        } else {
          header.classList.remove('scrolled')
        }
      }
    }

    window.addEventListener('scroll', handleScroll)

    // Reveal animations
    const reveals = document.querySelectorAll('.reveal')
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    reveals.forEach((el) => revealObserver.observe(el))

    return () => {
      window.removeEventListener('scroll', handleScroll)
      revealObserver.disconnect()
    }
  }, [])
}

