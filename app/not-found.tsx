'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

export default function NotFound() {
  const [frameNum, setFrameNum] = useState(0)
  const orbRef = useRef<HTMLDivElement>(null)
  const pageRef = useRef<HTMLElement>(null)
  const glitchWrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Frame counter animation
    const interval = setInterval(() => {
      setFrameNum((prev) => (prev + 1) % 10000)
    }, 50)

    // Orb parallax
    const pageElement = pageRef.current
    const orbElement = orbRef.current
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!orbElement || !pageElement) return
      const rect = pageElement.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5

      orbElement.style.transform = `translate(calc(-50% + ${x * 30}px), calc(-50% + ${y * 30}px)) scale(1)`
    }

    if (pageElement && window.matchMedia('(hover: hover)').matches) {
      pageElement.addEventListener('mousemove', handleMouseMove, { passive: true })
    }

    // Random glitch trigger
    const triggerGlitch = () => {
      if (glitchWrapperRef.current) {
        glitchWrapperRef.current.style.animation = 'none'
        // Trigger reflow
        void glitchWrapperRef.current.offsetHeight
        glitchWrapperRef.current.style.animation = ''
      }
      const nextGlitch = 3000 + Math.random() * 5000
      setTimeout(triggerGlitch, nextGlitch)
    }
    setTimeout(triggerGlitch, 2000)

    return () => {
      clearInterval(interval)
      if (pageElement) {
        pageElement.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [])

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      
      {/* Film Grain Overlay */}
      <div className="grain" aria-hidden="true"></div>
      
      {/* Scanlines */}
      <div className="scanlines" aria-hidden="true"></div>
      
      {/* Sprocket Holes (Film Strip) */}
      <div className="sprockets sprockets--left" aria-hidden="true">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="sprocket"></div>
        ))}
      </div>
      
      <div className="sprockets sprockets--right" aria-hidden="true">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="sprocket"></div>
        ))}
      </div>
      
      {/* Back Link */}
      <Link href="/" className="back-link">
        <span className="back-link__arrow">←</span>
        <span>Back</span>
      </Link>
      
      {/* Frame Counter */}
      <div className="frame-counter" aria-hidden="true">
        <div className="frame-counter__dot"></div>
        <span className="frame-counter__number">
          FRM <span>{String(frameNum).padStart(4, '0')}</span>
        </span>
      </div>

      {/* Main Content */}
      <main id="main-content" ref={pageRef} className="page-404" role="main">
        <div className="error-display">
          <div ref={glitchWrapperRef} className="glitch-wrapper" data-text="404">
            <h1 className="error-number">
              <span className="digit">4</span>
              <span className="digit digit--zero">
                0
                <div ref={orbRef} className="orb" aria-hidden="true"></div>
              </span>
              <span className="digit">4</span>
            </h1>
          </div>
        </div>
        
        <div className="content">
          <span className="label">Scene Not Found</span>
          <p className="message">
            This frame seems to be missing from the reel. 
            Let&apos;s rewind and get you back to the story.
          </p>
          <Link href="/" className="btn">
            <span>Return Home</span>
            <span className="btn__arrow">→</span>
          </Link>
        </div>
      </main>
    </>
  )
}

