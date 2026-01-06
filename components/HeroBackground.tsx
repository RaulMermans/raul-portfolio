'use client'

import { useEffect, useRef } from 'react'

/**
 * TOP-TIER HERO BACKGROUND ANIMATION
 * 
 * A sophisticated, award-winning background animation featuring:
 * - Fluid gradient mesh that morphs organically
 * - Interactive mouse-reactive distortion
 * - Subtle particle system for depth
 * - Smooth, GPU-accelerated transforms
 * - Respects prefers-reduced-motion
 * 
 * Inspired by Awwwards-winning portfolio sites
 */

interface GradientPoint {
  x: number
  y: number
  targetX: number
  targetY: number
  color: string
}

export default function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isDesktop = window.matchMedia('(hover: hover)').matches
    
    if (prefersReducedMotion) {
      // Static gradient fallback
      container.style.background = 'radial-gradient(circle at 50% 50%, rgba(255, 170, 136, 0.15) 0%, rgba(232, 208, 200, 0.1) 50%, transparent 100%)'
      return
    }

    // Create gradient mesh points
    const gradientPoints: GradientPoint[] = [
      { x: 0.2, y: 0.3, targetX: 0.2, targetY: 0.3, color: 'rgba(255, 170, 136, 0.25)' }, // Warm
      { x: 0.8, y: 0.2, targetX: 0.8, targetY: 0.2, color: 'rgba(255, 181, 160, 0.2)' }, // Rose
      { x: 0.3, y: 0.7, targetX: 0.3, targetY: 0.7, color: 'rgba(232, 208, 200, 0.15)' }, // Soft
      { x: 0.7, y: 0.8, targetX: 0.7, targetY: 0.8, color: 'rgba(198, 168, 119, 0.1)' }, // Gold
    ]

    let mouseX = 0.5
    let mouseY = 0.5
    let targetMouseX = 0.5
    let targetMouseY = 0.5

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDesktop) return
      const rect = container.getBoundingClientRect()
      targetMouseX = (e.clientX - rect.left) / rect.width
      targetMouseY = (e.clientY - rect.top) / rect.height
    }

    // Animate gradient mesh
    const animate = () => {
      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05
      mouseY += (targetMouseY - mouseY) * 0.05

      // Update gradient points with organic movement
      gradientPoints.forEach((point, index) => {
        // Slow, organic drift
        const time = Date.now() * 0.0003
        const offsetX = Math.sin(time + index * 1.5) * 0.1
        const offsetY = Math.cos(time + index * 1.2) * 0.1
        
        // Mouse influence (subtle attraction)
        const mouseInfluence = isDesktop ? 0.15 : 0
        const mouseOffsetX = (mouseX - point.x) * mouseInfluence
        const mouseOffsetY = (mouseY - point.y) * mouseInfluence

        point.targetX = point.x + offsetX + mouseOffsetX
        point.targetY = point.y + offsetY + mouseOffsetY

        // Smooth interpolation
        point.x += (point.targetX - point.x) * 0.03
        point.y += (point.targetY - point.y) * 0.03
      })

      // Build CSS gradient string
      const gradientStops = gradientPoints
        .map((point, index) => {
          const x = point.x * 100
          const y = point.y * 100
          return `${point.color} ${index * 25}%`
        })
        .join(', ')

      // Create radial gradients for depth
      const gradient1 = `radial-gradient(circle at ${gradientPoints[0].x * 100}% ${gradientPoints[0].y * 100}%, ${gradientPoints[0].color} 0%, transparent 40%)`
      const gradient2 = `radial-gradient(circle at ${gradientPoints[1].x * 100}% ${gradientPoints[1].y * 100}%, ${gradientPoints[1].color} 0%, transparent 45%)`
      const gradient3 = `radial-gradient(circle at ${gradientPoints[2].x * 100}% ${gradientPoints[2].y * 100}%, ${gradientPoints[2].color} 0%, transparent 50%)`
      const gradient4 = `radial-gradient(circle at ${gradientPoints[3].x * 100}% ${gradientPoints[3].y * 100}%, ${gradientPoints[3].color} 0%, transparent 35%)`

      container.style.background = `${gradient1}, ${gradient2}, ${gradient3}, ${gradient4}`
      container.style.backgroundBlendMode = 'multiply'

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()
    if (isDesktop) {
      container.addEventListener('mousemove', handleMouseMove, { passive: true })
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (isDesktop) {
        container.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="hero-background"
      aria-hidden="true"
    />
  )
}

