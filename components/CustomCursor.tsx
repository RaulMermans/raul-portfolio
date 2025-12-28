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
      // Hide cursor on non-desktop devices
      return
    }

    // Hide default cursor
    document.body.style.cursor = 'none'

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX
      mouseY.current = e.clientY
      
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`
        dotRef.current.style.top = `${e.clientY}px`
      }
      
      setIsVisible(true)
    }


    const handleMouseDown = () => {
      setIsClicking(true)
    }

    const handleMouseUp = () => {
      setIsClicking(false)
    }

    // Animate ring with smooth follow
    const animateRing = () => {
      ringX.current += (mouseX.current - ringX.current) * 0.15
      ringY.current += (mouseY.current - ringY.current) * 0.15
      
      if (ringRef.current) {
        ringRef.current.style.left = `${ringX.current}px`
        ringRef.current.style.top = `${ringY.current}px`
      }
      
      animationFrameRef.current = requestAnimationFrame(animateRing)
    }
    animateRing()

    // Handle interactive elements with event delegation
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.service') ||
        target.closest('.section-card') ||
        target.closest('.btn') ||
        target.closest('.link')
      ) {
        setIsHovering(true)
      }
    }

    const handleMouseLeaveEl = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.service') ||
        target.closest('.section-card') ||
        target.closest('.btn') ||
        target.closest('.link')
      ) {
        setIsHovering(false)
      }
    }

    // Keep cursor visible on scroll - only hide when mouse actually leaves window
    const handleWindowMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 || e.clientX <= 0 || 
          e.clientX >= window.innerWidth || 
          e.clientY >= window.innerHeight) {
        setIsVisible(false)
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleWindowMouseLeave)
    document.addEventListener('mouseenter', () => setIsVisible(true))
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseover', handleMouseEnter)
    document.addEventListener('mouseout', handleMouseLeaveEl)

    return () => {
      document.body.style.cursor = ''
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleWindowMouseLeave)
      document.removeEventListener('mouseenter', () => setIsVisible(true))
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseover', handleMouseEnter)
      document.removeEventListener('mouseout', handleMouseLeaveEl)
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
