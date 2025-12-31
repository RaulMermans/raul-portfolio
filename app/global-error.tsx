'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Global application error:', error)
  }, [error])

  return (
    <html lang="en">
      <body style={{
        margin: 0,
        padding: 0,
        fontFamily: 'system-ui, sans-serif',
        background: '#F5F0EB',
        color: '#1A1714',
      }}>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          textAlign: 'center',
        }}>
          <h1 style={{ 
            fontSize: 'clamp(2rem, 8vw, 4rem)',
            marginBottom: '1rem',
          }}>
            Something Went Wrong
          </h1>
          <p style={{ 
            marginBottom: '2rem', 
            color: '#6B635A',
            fontSize: '1.125rem',
            maxWidth: '500px',
          }}>
            We&apos;re sorry, but something unexpected happened. Please try again or return to the homepage.
          </p>
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            flexWrap: 'wrap', 
            justifyContent: 'center',
          }}>
            <button
              onClick={reset}
              style={{
                padding: '0.75rem 1.5rem',
                background: '#1A1714',
                color: '#F5F0EB',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '1rem',
                minWidth: '140px',
              }}
            >
              Try Again
            </button>
            <Link 
              href="/"
              style={{
                padding: '0.75rem 1.5rem',
                background: 'transparent',
                color: '#1A1714',
                border: '1px solid #1A1714',
                borderRadius: '4px',
                textDecoration: 'none',
                fontSize: '1rem',
                minWidth: '140px',
                display: 'inline-block',
              }}
            >
              Go Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  )
}

