'use client'

import { useEffect, useRef } from 'react'

interface Shape {
  baseX: number
  baseY: number
  x: number
  y: number
  size: number
  baseSize: number
  opacity: number
  baseOpacity: number
  phase: 'normal' | 'exploding' | 'regenerating'
  phaseTime: number
  isHovered: boolean
}

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number>()
  const mousePositionRef = useRef({ x: 0.5, y: 0.5 })
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 })
  const shapesRef = useRef<Shape[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    // Only enable on desktop (hover-capable devices)
    const isDesktop = window.matchMedia('(hover: hover)').matches
    if (!isDesktop) return

    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    // Set canvas size - using 1:1 for performance (grain doesn't need high DPR)
    const updateCanvasSize = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
    }
    updateCanvasSize()

    // Analog grain/noise generation - more organic, film-like
    const generateGrain = () => {
      const rect = container.getBoundingClientRect()
      const width = Math.ceil(rect.width)
      const height = Math.ceil(rect.height)
      const imageData = ctx.createImageData(width, height)
      const data = imageData.data
      const grainIntensity = 0.18 // More visible analog grain
      const baseR = 245
      const baseG = 240
      const baseB = 235

      for (let i = 0; i < data.length; i += 4) {
        // More organic grain pattern
        const grain = (Math.random() - 0.5) * grainIntensity * 255
        const variation = Math.random() * 0.04 // Subtle color variation
        
        data[i] = Math.max(0, Math.min(255, baseR + grain + variation * 10))     // R
        data[i + 1] = Math.max(0, Math.min(255, baseG + grain + variation * 8))  // G
        data[i + 2] = Math.max(0, Math.min(255, baseB + grain + variation * 6))  // B
        data[i + 3] = 255         // A
      }

      return imageData
    }

    let grainImageData = generateGrain()
    let time = 0
    let isAnimating = true

    // Smooth mouse tracking with easing - listen to hero section for mouse events
    const heroSection = container.closest('.hero') as HTMLElement | null
    const handleMouseMove = (e: Event) => {
      const mouseEvent = e as MouseEvent
      if (!container || !heroSection) return
      const rect = heroSection.getBoundingClientRect()
      targetMouseRef.current = {
        x: (mouseEvent.clientX - rect.left) / rect.width,
        y: (mouseEvent.clientY - rect.top) / rect.height,
      }
    }

    // Smooth interpolation
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor
    }

    // Animation loop - optimized with early exit
    const animate = () => {
      if (!isAnimating) return

      // Smooth mouse position interpolation
      mousePositionRef.current.x = lerp(
        mousePositionRef.current.x,
        targetMouseRef.current.x,
        0.05
      )
      mousePositionRef.current.y = lerp(
        mousePositionRef.current.y,
        targetMouseRef.current.y,
        0.05
      )

      const { x, y } = mousePositionRef.current
      const rect = container.getBoundingClientRect()

      // Clear canvas
      ctx.fillStyle = '#F5F0EB'
      ctx.fillRect(0, 0, rect.width, rect.height)

      // Calculate smooth distortion based on mouse position (analog feel)
      const distortionX = (x - 0.5) * 2
      const distortionY = (y - 0.5) * 2
      const distortionIntensity = Math.sqrt(distortionX * distortionX + distortionY * distortionY)
      
      // "Reaching" effect - more dramatic when hovering
      const reachIntensity = Math.min(distortionIntensity * 2, 1.5) // Amplify the reach more
      const reachX = distortionX * reachIntensity
      const reachY = distortionY * reachIntensity
      
      // Subtle analog distortion - like film grain moving (very slow)
      const grainOffsetX = Math.sin(time * 0.0005) * 2
      const grainOffsetY = Math.cos(time * 0.0003) * 2
      
      ctx.save()
      // Apply dramatic "reaching" distortion - background stretches toward cursor
      ctx.translate(
        rect.width * 0.5 + reachX * 40 + grainOffsetX, // More dramatic reach
        rect.height * 0.5 + reachY * 40 + grainOffsetY
      )
      // Stretching scale effect - background expands toward cursor
      const scaleX = 1 + Math.abs(reachX) * 0.12 // More visible stretch horizontally
      const scaleY = 1 + Math.abs(reachY) * 0.12 // More visible stretch vertically
      ctx.scale(scaleX, scaleY)
      ctx.translate(-rect.width * 0.5, -rect.height * 0.5)
      ctx.putImageData(grainImageData, 0, 0)
      ctx.restore()

      // Geometric shapes that "reach" toward cursor - more dramatic movement
      const mouseX = x * rect.width
      const mouseY = y * rect.height
      
      // Initialize shapes with explode/regenerate animation state
      if (!shapesRef.current.length) {
        shapesRef.current = [
          {
            baseX: rect.width * 0.15,
            baseY: rect.height * 0.25,
            x: rect.width * 0.15,
            y: rect.height * 0.25,
            size: 200,
            baseSize: 200,
            opacity: 0.04,
            baseOpacity: 0.04,
            phase: 'normal' as const,
            phaseTime: 0,
            isHovered: false,
          },
          {
            baseX: rect.width * 0.85,
            baseY: rect.height * 0.75,
            x: rect.width * 0.85,
            y: rect.height * 0.75,
            size: 160,
            baseSize: 160,
            opacity: 0.035,
            baseOpacity: 0.035,
            phase: 'normal' as const,
            phaseTime: 0,
            isHovered: false,
          },
          {
            baseX: rect.width * 0.5,
            baseY: rect.height * 0.5,
            x: rect.width * 0.5,
            y: rect.height * 0.5,
            size: 120,
            baseSize: 120,
            opacity: 0.03,
            baseOpacity: 0.03,
            phase: 'normal' as const,
            phaseTime: 0,
            isHovered: false,
          },
        ]
      }

      const shapes = shapesRef.current
      
      // Update shapes based on animation phase
      shapes.forEach((shape, index) => {
        // Update base positions on resize (maintain proportional positions)
        const positions = [
          { x: 0.15, y: 0.25 },
          { x: 0.85, y: 0.75 },
          { x: 0.5, y: 0.5 },
        ]
        shape.baseX = rect.width * positions[index].x
        shape.baseY = rect.height * positions[index].y

        // Check if mouse is hovering over this circle
        const dxToMouse = mouseX - shape.x
        const dyToMouse = mouseY - shape.y
        const distanceToMouse = Math.sqrt(dxToMouse * dxToMouse + dyToMouse * dyToMouse)
        const isCurrentlyHovered = distanceToMouse < shape.size * 1.2 // Hover threshold (120% of radius)
        
        // Detect hover state changes
        if (isCurrentlyHovered && !shape.isHovered) {
          // Just started hovering - trigger explode
          shape.isHovered = true
          if (shape.phase === 'normal' || shape.phase === 'regenerating') {
            shape.phase = 'exploding'
            shape.phaseTime = 0
          }
        } else if (!isCurrentlyHovered && shape.isHovered) {
          // Just stopped hovering - trigger regenerate
          shape.isHovered = false
          if (shape.phase === 'normal' || shape.phase === 'exploding') {
            shape.phase = 'regenerating'
            shape.phaseTime = 0
            shape.size = 0
            shape.opacity = 0
          }
        }
        
        // Handle explode/regenerate animation
        if (shape.phase === 'exploding') {
          shape.phaseTime += 16 // ~60fps
          const explodeDuration = 600 // 600ms explode
          const progress = Math.min(shape.phaseTime / explodeDuration, 1)
          
          // Ease out for explosion
          const easeOut = 1 - Math.pow(1 - progress, 3)
          
          // Scale up and fade out
          shape.size = shape.baseSize * (1 + easeOut * 2.5) // Scale to 3.5x
          shape.opacity = shape.baseOpacity * (1 - easeOut) // Fade to 0
          
          if (progress >= 1) {
            // Explosion complete - stay exploded while hovered
            if (!shape.isHovered) {
              shape.phase = 'regenerating'
              shape.phaseTime = 0
              shape.size = 0
              shape.opacity = 0
            }
          }
        } else if (shape.phase === 'regenerating') {
          shape.phaseTime += 16
          const regenerateDuration = 800 // 800ms regenerate
          const progress = Math.min(shape.phaseTime / regenerateDuration, 1)
          
          // Ease out for regeneration
          const easeOut = 1 - Math.pow(1 - progress, 2)
          
          // Scale from 0 and fade in
          shape.size = shape.baseSize * easeOut
          shape.opacity = shape.baseOpacity * easeOut
          
          if (progress >= 1) {
            shape.phase = 'normal'
            shape.phaseTime = 0
            shape.size = shape.baseSize
            shape.opacity = shape.baseOpacity
          }
        }

        // Calculate direction to cursor
        const dx = mouseX - shape.baseX
        const dy = mouseY - shape.baseY
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = Math.sqrt(rect.width * rect.width + rect.height * rect.height)
        const normalizedDistance = Math.min(distance / maxDistance, 1)
        
        // Reach intensity based on cursor proximity (only when not exploding/regenerating)
        const reachFactor = shape.phase === 'normal' 
          ? (1 - normalizedDistance) * reachIntensity * 0.6 
          : 0
        
        // Move shape toward cursor (reaching effect)
        shape.x = shape.baseX + dx * reachFactor * 0.3
        shape.y = shape.baseY + dy * reachFactor * 0.3
        
        // Stretch shape toward cursor
        const stretchX = shape.phase === 'normal'
          ? 1 + Math.abs(dx / rect.width) * reachFactor * 0.5
          : 1
        const stretchY = shape.phase === 'normal'
          ? 1 + Math.abs(dy / rect.height) * reachFactor * 0.5
          : 1
        
        // Grow and intensify on hover (only when normal)
        if (shape.phase === 'normal') {
          shape.size = shape.size + reachIntensity * 60
          shape.opacity = shape.opacity + reachIntensity * 0.05
        }

        ctx.save()
        ctx.globalAlpha = shape.opacity
        ctx.fillStyle = '#1A1714'
        ctx.translate(shape.x, shape.y)
        ctx.scale(stretchX, stretchY)
        ctx.beginPath()
        ctx.arc(0, 0, shape.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      time += 1

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    // Start animation
    animate()

    // Regenerate grain on resize (debounced)
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        updateCanvasSize()
        grainImageData = generateGrain()
      }, 150)
    }

    // Event listeners - attach to hero section for mouse tracking
    if (heroSection) {
      heroSection.addEventListener('mousemove', handleMouseMove, { passive: true })
    }
    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      isAnimating = false
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      clearTimeout(resizeTimeout)
      if (heroSection) {
        heroSection.removeEventListener('mousemove', handleMouseMove)
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div ref={containerRef} className="hero__background-animation" aria-hidden="true">
      <canvas ref={canvasRef} className="hero__background-canvas" />
    </div>
  )
}

