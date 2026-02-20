'use client'

import { useEffect } from 'react'

/**
 * Case study page setup: dark header styling and scroll reveal animations.
 * Shared by remoria and ai-sports case study pages.
 */
export function useCaseStudySetup() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const logo = document.querySelector('.ui__logo')
    const nav = document.querySelector('.ui__nav')
    const menuBtn = document.querySelector('.ui__menu-btn')
    if (logo) logo.classList.add('on-dark')
    if (nav) nav.classList.add('on-dark')
    if (menuBtn) menuBtn.classList.add('on-dark')

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Detect mobile device
    const isMobile = window.innerWidth < 768

    // Mobile: higher threshold and larger rootMargin to prevent bouncing
    // Desktop: lower threshold for earlier trigger
    const threshold = isMobile ? 0.3 : 0.1
    const rootMargin = isMobile ? '0px 0px -100px 0px' : '0px 0px -50px 0px'

    const reveals = document.querySelectorAll('.reveal')

    // If reduced motion, show all immediately
    if (prefersReducedMotion) {
      reveals.forEach((el) => el.classList.add('visible'))
      return () => {
        if (logo) logo.classList.remove('on-dark')
        if (nav) nav.classList.remove('on-dark')
        if (menuBtn) menuBtn.classList.remove('on-dark')
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold, rootMargin }
    )
    reveals.forEach((el) => observer.observe(el))

    return () => {
      observer.disconnect()
      if (logo) logo.classList.remove('on-dark')
      if (nav) nav.classList.remove('on-dark')
      if (menuBtn) menuBtn.classList.remove('on-dark')
    }
  }, [])
}
