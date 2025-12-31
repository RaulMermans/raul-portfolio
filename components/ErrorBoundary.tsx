'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import Link from 'next/link'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    // You can log to an error reporting service here
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="error-boundary" style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          textAlign: 'center',
          background: 'var(--cream)',
          color: 'var(--ink)',
        }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Something went wrong</h1>
          <p style={{ marginBottom: '2rem', color: 'var(--ink-muted)' }}>
            We&apos;re sorry, but something unexpected happened. Please try refreshing the page.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={() => window.location.reload()}
              className="btn"
              style={{ minWidth: '120px' }}
            >
              Refresh Page
            </button>
            <Link href="/" className="btn btn--outline" style={{ minWidth: '120px' }}>
              Go Home
            </Link>
          </div>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details style={{ marginTop: '2rem', textAlign: 'left', maxWidth: '600px' }}>
              <summary style={{ cursor: 'pointer', marginBottom: '1rem' }}>Error Details (Dev Only)</summary>
              <pre style={{
                background: 'var(--cream-dark)',
                padding: '1rem',
                borderRadius: '4px',
                overflow: 'auto',
                fontSize: '0.875rem',
              }}>
                {this.state.error.toString()}
                {this.state.error.stack}
              </pre>
            </details>
          )}
        </div>
      )
    }

    return this.props.children
  }
}

