'use client'

import { useEffect, useRef, useState } from 'react'

interface RevealProps {
  children: React.ReactNode
  delay?: 1 | 2 | 3
}

export default function Reveal({ children, delay }: RevealProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    // If reduced motion, show immediately without animation
    if (prefersReducedMotion) {
      setIsVisible(true)
      return
    }

    // Detect mobile device
    const isMobile = window.innerWidth < 768
    
    // Mobile: higher threshold and larger rootMargin to prevent bouncing
    // Desktop: lower threshold for earlier trigger
    const threshold = isMobile ? 0.3 : 0.15
    const rootMargin = isMobile ? '0px 0px -100px 0px' : '0px 0px -50px 0px'

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            // Unobserve after first trigger to prevent bouncing
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? 'visible' : ''} ${delay ? `reveal-delay-${delay}` : ''}`}
    >
      {children}
    </div>
  )
}

