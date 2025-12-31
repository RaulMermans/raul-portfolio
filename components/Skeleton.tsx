'use client'

interface SkeletonProps {
  width?: string | number
  height?: string | number
  className?: string
  rounded?: boolean
  variant?: 'text' | 'circular' | 'rectangular'
}

/**
 * Skeleton component for loading states
 * Provides visual feedback while content is loading
 */
export default function Skeleton({
  width,
  height,
  className = '',
  rounded = false,
  variant = 'rectangular',
}: SkeletonProps) {
  const getStyles = () => {
    const baseStyles: React.CSSProperties = {
      backgroundColor: 'var(--cream-dark)',
      animation: 'pulse 1.5s ease-in-out infinite',
      display: 'inline-block',
    }

    if (width) {
      baseStyles.width = typeof width === 'number' ? `${width}px` : width
    }

    if (height) {
      baseStyles.height = typeof height === 'number' ? `${height}px` : height
    }

    if (variant === 'circular') {
      baseStyles.borderRadius = '50%'
      baseStyles.width = baseStyles.width || baseStyles.height || '40px'
      baseStyles.height = baseStyles.height || baseStyles.width || '40px'
    } else if (variant === 'text') {
      baseStyles.height = baseStyles.height || '1em'
      baseStyles.borderRadius = '4px'
    } else {
      baseStyles.borderRadius = rounded ? '8px' : '0'
    }

    return baseStyles
  }

  return (
    <div
      className={`skeleton ${className}`}
      style={getStyles()}
      aria-hidden="true"
    >
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  )
}

