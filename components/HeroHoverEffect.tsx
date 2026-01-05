'use client'

import { useEffect, useRef } from 'react'

/**
 * Safe, high-level hover animation using CSS transforms
 * - GPU-accelerated (transform only)
 * - Respects prefers-reduced-motion
 * - Subtle parallax effect on hero elements
 * - Performance optimized
 */
export default function HeroHoverEffect() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isDesktop = window.matchMedia('(hover: hover)').matches
    
    if (prefersReducedMotion || !isDesktop) return

    let ticking = false
    let mouseX = 0.5
    let mouseY = 0.5
    let targetX = 0.5
    let targetY = 0.5

    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = container.getBoundingClientRect()
          targetX = (e.clientX - rect.left) / rect.width
          targetY = (e.clientY - rect.top) / rect.height
          ticking = false
        })
        ticking = true
      }
    }

    const animate = () => {
      // Smooth interpolation for fluid movement
      mouseX += (targetX - mouseX) * 0.05
      mouseY += (targetY - mouseY) * 0.05

      // Apply subtle parallax to background elements
      const parallaxX = (mouseX - 0.5) * 20
      const parallaxY = (mouseY - 0.5) * 20

      container.style.setProperty('--mouse-x', `${parallaxX}px`)
      container.style.setProperty('--mouse-y', `${parallaxY}px`)

      requestAnimationFrame(animate)
    }

    animate()
    container.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="hero-hover-effect"
      aria-hidden="true"
    />
  )
}

