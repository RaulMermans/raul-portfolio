'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
}

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Only enable on desktop
    const isDesktop = window.matchMedia('(hover: hover)').matches
    if (!isDesktop) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    updateCanvasSize()

    // Throttle particle creation for smoother, more controlled effect
    let lastParticleTime = 0
    const particleInterval = 50 // Create particles every 50ms instead of every mousemove

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      
      const now = Date.now()
      if (now - lastParticleTime < particleInterval) return
      lastParticleTime = now
      
      // Create fewer particles, more subtly
      for (let i = 0; i < 1; i++) {
        particlesRef.current.push({
          x: e.clientX + (Math.random() - 0.5) * 5,
          y: e.clientY + (Math.random() - 0.5) * 5,
          vx: (Math.random() - 0.5) * 0.8, // Reduced velocity
          vy: (Math.random() - 0.5) * 0.8,
          life: 1,
          maxLife: 1,
          size: Math.random() * 2 + 1, // Smaller particles
        })
      }
      
      // Limit particle count for performance
      if (particlesRef.current.length > 30) {
        particlesRef.current = particlesRef.current.slice(-30)
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.vx *= 0.92 // More friction for slower decay
        particle.vy *= 0.92
        particle.life -= 0.015 // Slower fade
        
        if (particle.life <= 0) return false
        
        const alpha = particle.life * 0.2 // More subtle opacity
        ctx.save()
        ctx.globalAlpha = alpha
        ctx.fillStyle = '#1A1714'
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
        
        return true
      })
      
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('resize', updateCanvasSize, { passive: true })

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', updateCanvasSize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="cursor-trail"
      aria-hidden="true"
    />
  )
}

