'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getLocaleFromPath, localizePath } from '@/lib/i18n'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const pathname = usePathname()
  const locale = getLocaleFromPath(pathname)
  const copy =
    locale === 'es'
      ? {
          title: 'Algo salió mal',
          body: 'Lo sentimos, pero ocurrió algo inesperado. Inténtalo de nuevo o vuelve al inicio.',
          retry: 'Reintentar',
          home: 'Ir al inicio',
        }
      : {
          title: 'Something Went Wrong',
          body: "We're sorry, but something unexpected happened. Please try again or return to the homepage.",
          retry: 'Try Again',
          home: 'Go Home',
        }

  useEffect(() => {
    console.error('Global application error:', error)
  }, [error])

  return (
    <html lang={locale}>
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
            {copy.title}
          </h1>
          <p style={{ 
            marginBottom: '2rem', 
            color: '#6B635A',
            fontSize: '1.125rem',
            maxWidth: '500px',
          }}>
            {copy.body}
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
              {copy.retry}
            </button>
            <Link 
              href={localizePath('/', locale)}
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
              {copy.home}
            </Link>
          </div>
        </div>
      </body>
    </html>
  )
}
