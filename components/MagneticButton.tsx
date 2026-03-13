'use client'

import React, { forwardRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

interface MagneticButtonProps {
    children: React.ReactNode
    className?: string
    intensity?: number
}

const MagneticButton = forwardRef<HTMLDivElement, MagneticButtonProps>(({
    children,
    className = '',
    intensity = 30 // How far it pulls towards the cursor
}, parentRef) => {
    const prefersReducedMotion = useReducedMotion()
    const baseX = useMotionValue(0)
    const baseY = useMotionValue(0)
    const x = useSpring(baseX, { stiffness: 150, damping: 15, mass: 0.1 })
    const y = useSpring(baseY, { stiffness: 150, damping: 15, mass: 0.1 })

    const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
        if (prefersReducedMotion) return

        const { clientX, clientY, currentTarget } = e
        const { height, width, left, top } = currentTarget.getBoundingClientRect()
        const middleX = clientX - (left + width / 2)
        const middleY = clientY - (top + height / 2)

        // Calculate new position based on intensity
        baseX.set(middleX * (intensity / 100))
        baseY.set(middleY * (intensity / 100))
    }

    const reset = () => {
        baseX.set(0)
        baseY.set(0)
    }

    return (
        <motion.div
            className={className}
            ref={parentRef}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            style={{ x, y }}
        >
            {children}
        </motion.div>
    )
})

MagneticButton.displayName = 'MagneticButton'

export default MagneticButton
