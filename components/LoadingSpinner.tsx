'use client'

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large'
  className?: string
  ariaLabel?: string
}

/**
 * LoadingSpinner component
 * Provides consistent loading states across the application
 */
export default function LoadingSpinner({
  size = 'medium',
  className = '',
  ariaLabel = 'Loading',
}: LoadingSpinnerProps) {
  const sizeMap = {
    small: '20px',
    medium: '40px',
    large: '60px',
  }

  return (
    <div
      className={`loading-spinner ${className}`}
      role="status"
      aria-label={ariaLabel}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: sizeMap[size],
          height: sizeMap[size],
          border: `3px solid var(--cream-dark)`,
          borderTopColor: 'var(--accent)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
        aria-hidden="true"
      />
      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}

