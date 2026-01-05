'use client'

import { useEffect, useRef } from 'react'

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number>()
  const mousePositionRef = useRef({ x: 0.5, y: 0.5 })
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 })

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
      const grainIntensity = 0.12 // Subtle analog grain
      const baseR = 245
      const baseG = 240
      const baseB = 235

      for (let i = 0; i < data.length; i += 4) {
        // More organic grain pattern
        const grain = (Math.random() - 0.5) * grainIntensity * 255
        const variation = Math.random() * 0.03 // Subtle color variation
        
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

    // Smooth mouse tracking with easing
    const handleMouseMove = (e: MouseEvent) => {
      if (!container) return
      const rect = container.getBoundingClientRect()
      targetMouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
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
      const reachIntensity = Math.min(distortionIntensity * 1.5, 1.2) // Amplify the reach
      const reachX = distortionX * reachIntensity
      const reachY = distortionY * reachIntensity
      
      // Subtle analog distortion - like film grain moving (very slow)
      const grainOffsetX = Math.sin(time * 0.0005) * 2
      const grainOffsetY = Math.cos(time * 0.0003) * 2
      
      ctx.save()
      // Apply dramatic "reaching" distortion - background stretches toward cursor
      ctx.translate(
        rect.width * 0.5 + reachX * 25 + grainOffsetX, // Increased from 8 to 25 for dramatic reach
        rect.height * 0.5 + reachY * 25 + grainOffsetY
      )
      // Stretching scale effect - background expands toward cursor
      const scaleX = 1 + Math.abs(reachX) * 0.08 // Stretch horizontally
      const scaleY = 1 + Math.abs(reachY) * 0.08 // Stretch vertically
      ctx.scale(scaleX, scaleY)
      ctx.translate(-rect.width * 0.5, -rect.height * 0.5)
      ctx.putImageData(grainImageData, 0, 0)
      ctx.restore()

      // Geometric shapes that "reach" toward cursor - more dramatic movement
      const mouseX = x * rect.width
      const mouseY = y * rect.height
      
      const shapes = [
        {
          baseX: rect.width * 0.15,
          baseY: rect.height * 0.25,
          x: rect.width * 0.15,
          y: rect.height * 0.25,
          size: 180,
          baseSize: 180,
          opacity: 0.02,
          baseOpacity: 0.02,
        },
        {
          baseX: rect.width * 0.85,
          baseY: rect.height * 0.75,
          x: rect.width * 0.85,
          y: rect.height * 0.75,
          size: 140,
          baseSize: 140,
          opacity: 0.018,
          baseOpacity: 0.018,
        },
        {
          baseX: rect.width * 0.5,
          baseY: rect.height * 0.5,
          x: rect.width * 0.5,
          y: rect.height * 0.5,
          size: 100,
          baseSize: 100,
          opacity: 0.015,
          baseOpacity: 0.015,
        },
      ]

      // Make shapes "reach" toward cursor
      shapes.forEach((shape) => {
        // Calculate direction to cursor
        const dx = mouseX - shape.baseX
        const dy = mouseY - shape.baseY
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = Math.sqrt(rect.width * rect.width + rect.height * rect.height)
        const normalizedDistance = Math.min(distance / maxDistance, 1)
        
        // Reach intensity based on cursor proximity
        const reachFactor = (1 - normalizedDistance) * reachIntensity * 0.6
        
        // Move shape toward cursor (reaching effect)
        shape.x = shape.baseX + dx * reachFactor * 0.3
        shape.y = shape.baseY + dy * reachFactor * 0.3
        
        // Stretch shape toward cursor
        const stretchX = 1 + Math.abs(dx / rect.width) * reachFactor * 0.5
        const stretchY = 1 + Math.abs(dy / rect.height) * reachFactor * 0.5
        
        // Grow and intensify on hover
        shape.size = shape.baseSize + reachIntensity * 40
        shape.opacity = shape.baseOpacity + reachIntensity * 0.03

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

    // Event listeners
    container.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      isAnimating = false
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      clearTimeout(resizeTimeout)
      container.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div ref={containerRef} className="hero__background-animation" aria-hidden="true">
      <canvas ref={canvasRef} className="hero__background-canvas" />
    </div>
  )
}

