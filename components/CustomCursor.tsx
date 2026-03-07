'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [isHovering, setIsHovering] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        // Only show on desktop devices with hover capability
        const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches
        if (!isDesktop) return

        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
        }

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            // Check if hovering over interactive elements
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('interactive')
            ) {
                setIsHovering(true)
            } else {
                setIsHovering(false)
            }
        }

        window.addEventListener('mousemove', updateMousePosition)
        window.addEventListener('mouseover', handleMouseOver)

        return () => {
            window.removeEventListener('mousemove', updateMousePosition)
            window.removeEventListener('mouseover', handleMouseOver)
        }
    }, [pathname]) // Re-run effect when route changes to catch new interactive elements

    // Don't render cursor on touch devices to avoid double-tap issues
    if (typeof window !== 'undefined' && !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        return null
    }

    const variants = {
        default: {
            x: mousePosition.x - 10,
            y: mousePosition.y - 10,
            scale: 1,
            backgroundColor: 'transparent',
            border: '2px solid rgba(196, 30, 58, 0.7)', // Accent color faint border
            mixBlendMode: 'normal' as const
        },
        hover: {
            x: mousePosition.x - 24,
            y: mousePosition.y - 24,
            scale: 2.4, // Expands to 48px area
            backgroundColor: 'rgba(255, 255, 255, 1)',
            border: 'none',
            mixBlendMode: 'difference' as const, // Inverts colors beneath it
        }
    }

    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
        @media (hover: hover) and (pointer: fine) {
          body { cursor: none; }
          a, button, input { cursor: none !important; }
        }
      `}} />
            <motion.div
                className="fixed top-0 left-0 w-5 h-5 rounded-full pointer-events-none z-[9999]"
                variants={variants}
                animate={isHovering ? "hover" : "default"}
                transition={{
                    type: "spring",
                    stiffness: 700,
                    damping: 35,
                    mass: 0.1
                }}
            />
        </>
    )
}
