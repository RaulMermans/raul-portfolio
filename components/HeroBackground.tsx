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
      
      // Subtle analog distortion - like film grain moving (very slow)
      const grainOffsetX = Math.sin(time * 0.0005) * 2
      const grainOffsetY = Math.cos(time * 0.0003) * 2
      
      ctx.save()
      // Apply subtle distortion based on mouse + organic movement
      ctx.translate(
        rect.width * 0.5 + distortionX * 8 + grainOffsetX,
        rect.height * 0.5 + distortionY * 8 + grainOffsetY
      )
      // Very subtle scale distortion for analog feel
      const scale = 1 + distortionIntensity * 0.01
      ctx.scale(scale, scale)
      ctx.translate(-rect.width * 0.5, -rect.height * 0.5)
      ctx.putImageData(grainImageData, 0, 0)
      ctx.restore()

      // Minimal geometric shapes - Kanye West aesthetic (very subtle)
      const shapes = [
        {
          x: rect.width * 0.15 + distortionX * 25,
          y: rect.height * 0.25 + distortionY * 15,
          size: 180 + distortionIntensity * 25,
          opacity: 0.02 + distortionIntensity * 0.015,
        },
        {
          x: rect.width * 0.85 + distortionX * -25,
          y: rect.height * 0.75 + distortionY * -15,
          size: 140 + distortionIntensity * 20,
          opacity: 0.018 + distortionIntensity * 0.012,
        },
        {
          x: rect.width * 0.5 + distortionX * 15,
          y: rect.height * 0.5 + distortionY * 10,
          size: 100 + distortionIntensity * 15,
          opacity: 0.015 + distortionIntensity * 0.01,
        },
      ]

      shapes.forEach((shape) => {
        ctx.save()
        ctx.globalAlpha = shape.opacity
        ctx.fillStyle = '#1A1714'
        ctx.beginPath()
        // Use slightly imperfect circles for analog feel
        ctx.arc(shape.x, shape.y, shape.size, 0, Math.PI * 2)
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

