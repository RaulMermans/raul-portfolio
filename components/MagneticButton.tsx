'use client'

import React, { useRef, useState, forwardRef } from 'react'
import { motion } from 'framer-motion'

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
    const [position, setPosition] = useState({ x: 0, y: 0 })

    const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY, currentTarget } = e
        const { height, width, left, top } = currentTarget.getBoundingClientRect()
        const middleX = clientX - (left + width / 2)
        const middleY = clientY - (top + height / 2)

        // Calculate new position based on intensity
        setPosition({ x: middleX * (intensity / 100), y: middleY * (intensity / 100) })
    }

    const reset = () => {
        setPosition({ x: 0, y: 0 })
    }

    const { x, y } = position

    return (
        <motion.div
            className={className}
            ref={parentRef}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
            {children}
        </motion.div>
    )
})

MagneticButton.displayName = 'MagneticButton'

export default MagneticButton
