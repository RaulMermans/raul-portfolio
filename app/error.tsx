'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error for debugging (only in development)
    if (process.env.NODE_ENV === 'development') {
      console.error('Application error:', error)
    }
  }, [error])

  return (
    <div className="error-page" style={{
      minHeight: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      textAlign: 'center',
      background: 'var(--cream)',
      color: 'var(--ink)',
    }}>
      <h1 style={{ 
        fontSize: 'clamp(2rem, 8vw, 4rem)',
        marginBottom: '1rem',
        fontFamily: 'var(--font-display), "Bebas Neue", Impact, sans-serif',
        textTransform: 'uppercase',
        letterSpacing: 'var(--tracking-tight)',
      }}>
        Something Went Wrong
      </h1>
      <p style={{ 
        marginBottom: '2rem', 
        color: 'var(--ink-muted)',
        fontSize: 'var(--text-md)',
        maxWidth: '500px',
      }}>
        We&apos;re sorry, but something unexpected happened. Please try again or return to the homepage.
      </p>
      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        flexWrap: 'wrap', 
        justifyContent: 'center',
        marginBottom: '2rem',
      }}>
        <button
          onClick={reset}
          className="btn"
          style={{ minWidth: '140px' }}
          aria-label="Try again"
        >
          Try Again
        </button>
        <Link 
          href="/" 
          className="btn btn--outline" 
          style={{ minWidth: '140px' }}
        >
          Go Home
        </Link>
      </div>
      {error.digest && (
        <p style={{ 
          fontSize: 'var(--text-xs)', 
          color: 'var(--ink-faint)',
          marginTop: '2rem',
        }}>
          Error ID: {error.digest}
        </p>
      )}
    </div>
  )
}

