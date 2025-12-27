'use client'

import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!isDesktop) return

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX - 5, y: e.clientY - 5 })
      setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)

    const interactiveElements = document.querySelectorAll('a, button, .service')
    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeaveEl = () => setIsHovering(false)

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeaveEl)
    })

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeaveEl)
      })
    }
  }, [])

  return (
    <div
      className={`custom-cursor ${isVisible ? 'visible' : ''} ${isHovering ? 'hovering' : ''}`}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
      aria-hidden="true"
    />
  )
}

