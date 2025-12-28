'use client'

import { useEffect, useState, useRef } from 'react'

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  
  const mouseX = useRef(0)
  const mouseY = useRef(0)
  const ringX = useRef(0)
  const ringY = useRef(0)
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    if (typeof window === 'undefined') return

    const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!isDesktop) {
      return
    }

    // Hide default cursor
    document.body.style.cursor = 'none'

    // Use transform for better performance (GPU accelerated)
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX
      mouseY.current = e.clientY
      
      // Update dot immediately (no lag)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
      }
      
      setIsVisible(true)
    }

    // Smooth ring animation using requestAnimationFrame with faster follow
    const animateRing = () => {
      // Faster follow speed (0.2 instead of 0.15) for less lag
      ringX.current += (mouseX.current - ringX.current) * 0.2
      ringY.current += (mouseY.current - ringY.current) * 0.2
      
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX.current}px, ${ringY.current}px) translate(-50%, -50%)`
      }
      
      animationFrameRef.current = requestAnimationFrame(animateRing)
    }
    animateRing()

    const handleMouseDown = () => {
      setIsClicking(true)
    }

    const handleMouseUp = () => {
      setIsClicking(false)
    }

    // Check for interactive elements using event delegation
    const checkInteractive = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target) return
      
      const isInteractive = Boolean(
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.service') ||
        target.closest('.section-card') ||
        target.closest('.btn') ||
        target.closest('.link') ||
        target.closest('[role="button"]') ||
        target.style.cursor === 'pointer'
      )
      
      setIsHovering(isInteractive)
    }

    // Keep cursor visible - only hide when actually leaving window
    const handleMouseLeave = (e: MouseEvent) => {
      // Only hide if mouse is actually outside viewport
      if (e.clientY <= 0 || e.clientX <= 0 || 
          e.clientX >= window.innerWidth || 
          e.clientY >= window.innerHeight) {
        setIsVisible(false)
      }
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    // Use passive listeners for better performance
    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mousemove', checkInteractive, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true })
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true })
    document.addEventListener('mousedown', handleMouseDown, { passive: true })
    document.addEventListener('mouseup', handleMouseUp, { passive: true })

    return () => {
      document.body.style.cursor = ''
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mousemove', checkInteractive)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <div
      className={`cursor ${isVisible ? 'visible' : ''} ${isHovering ? 'hovering' : ''} ${isClicking ? 'clicking' : ''}`}
      aria-hidden="true"
    >
      <div ref={dotRef} className="cursor__dot" />
      <div ref={ringRef} className="cursor__ring" />
    </div>
  )
}
