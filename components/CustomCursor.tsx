'use client'

import { useEffect, useRef } from 'react'

/**
 * New reliable custom cursor with smooth animations
 * Features:
 * - Simple dot + ring design
 * - Always visible when mouse is in viewport
 * - Smooth RAF-based animations
 * - No disappearing issues
 */
export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  
  const mousePos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const isVisible = useRef(true)
  const isHovering = useRef(false)
  const isClicking = useRef(false)
  const rafId = useRef<number>()

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Only show on desktop with precise pointing
    const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!isDesktop) {
      return
    }

    // Hide default cursor
    document.body.style.cursor = 'none'

    // Initialize cursor position to center
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    mousePos.current = { x: centerX, y: centerY }
    ringPos.current = { x: centerX, y: centerY }

    // Update cursor position immediately
    const updateCursor = () => {
      if (!cursorRef.current || !dotRef.current || !ringRef.current) return

      // Update dot position immediately (no lag)
      dotRef.current.style.transform = `translate(${mousePos.current.x}px, ${mousePos.current.y}px) translate(-50%, -50%)`

      // Smooth ring follow with easing
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.15
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.15
      ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`

      // Update visibility
      cursorRef.current.style.opacity = isVisible.current ? '1' : '0'

      // Update classes
      cursorRef.current.classList.toggle('hovering', isHovering.current)
      cursorRef.current.classList.toggle('clicking', isClicking.current)

      rafId.current = requestAnimationFrame(updateCursor)
    }

    // Start animation loop
    rafId.current = requestAnimationFrame(updateCursor)

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      isVisible.current = true
    }

    // Mouse leave handler - only hide when truly outside
    const handleMouseLeave = (e: MouseEvent) => {
      // Check if mouse is actually outside viewport
      if (e.clientX <= 0 || e.clientY <= 0 || 
          e.clientX >= window.innerWidth || 
          e.clientY >= window.innerHeight) {
        isVisible.current = false
      }
    }

    // Mouse enter handler
    const handleMouseEnter = () => {
      isVisible.current = true
    }

    // Click handlers
    const handleMouseDown = () => {
      isClicking.current = true
    }

    const handleMouseUp = () => {
      isClicking.current = false
    }

    // Check for interactive elements (event delegation)
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target) return

      // Check if target or parent is interactive
      const isInteractive = 
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.closest('.btn') !== null ||
        target.closest('.link') !== null ||
        target.closest('.service') !== null ||
        target.closest('.section-card') !== null ||
        target.closest('[role="button"]') !== null ||
        window.getComputedStyle(target).cursor === 'pointer'

      isHovering.current = isInteractive
    }

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseover', handleMouseOver, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true })
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true })
    document.addEventListener('mousedown', handleMouseDown, { passive: true })
    document.addEventListener('mouseup', handleMouseUp, { passive: true })

    // Keep cursor visible on window focus
    window.addEventListener('focus', () => {
      isVisible.current = true
    })

    // Cleanup
    return () => {
      document.body.style.cursor = ''
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('focus', () => {})
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="cursor-new"
      aria-hidden="true"
    >
      <div ref={ringRef} className="cursor-new__ring" />
      <div ref={dotRef} className="cursor-new__dot" />
    </div>
  )
}
