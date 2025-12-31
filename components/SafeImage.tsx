'use client'

import { useState, useEffect } from 'react'
import Image, { ImageProps } from 'next/image'

interface SafeImageProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string
  fallbackAlt?: string
  showPlaceholder?: boolean
}

/**
 * SafeImage component with error handling and fallback
 * Prevents broken images from breaking the layout
 */
export default function SafeImage({
  src,
  alt,
  fallbackSrc = '/images/placeholders/image-placeholder.webp',
  fallbackAlt,
  showPlaceholder = true,
  className,
  ...props
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(src as string)
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setImgSrc(src as string)
    setHasError(false)
    setIsLoading(true)
  }, [src])

  const handleError = () => {
    if (!hasError) {
      setHasError(true)
      setImgSrc(fallbackSrc)
      setIsLoading(false)
    }
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  // If image fails to load and no fallback, show placeholder
  if (hasError && imgSrc === fallbackSrc && showPlaceholder) {
    return (
      <div
        className={`safe-image-placeholder ${className || ''}`}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--cream-dark)',
          color: 'var(--ink-muted)',
          minHeight: props.height ? `${props.height}px` : '200px',
          width: props.width ? `${props.width}px` : '100%',
        }}
        aria-label={fallbackAlt || alt || 'Image placeholder'}
      >
        <span style={{ fontSize: '0.875rem' }}>Image unavailable</span>
      </div>
    )
  }

  return (
    <div className={`safe-image-wrapper ${className || ''}`} style={{ position: 'relative' }}>
      {isLoading && (
        <div
          className="safe-image-loader"
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--cream-dark)',
            zIndex: 1,
          }}
          aria-hidden="true"
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              border: '3px solid var(--cream-dark)',
              borderTopColor: 'var(--accent)',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
            }}
          />
        </div>
      )}
      <Image
        src={imgSrc}
        alt={alt || ''}
        onError={handleError}
        onLoad={handleLoad}
        className={className}
        {...props}
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

