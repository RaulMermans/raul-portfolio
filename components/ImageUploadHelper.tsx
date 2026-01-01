'use client'

/**
 * Image Upload Helper Component
 * Provides UI for uploading and previewing images
 * For development/admin use only
 */

import { useState, useRef } from 'react'
import { validateImageFile, getImageDimensions } from '@/lib/image-utils'

interface ImageUploadHelperProps {
  targetPath: string
  onUpload?: (file: File) => void
}

export default function ImageUploadHelper({ targetPath, onUpload }: ImageUploadHelperProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError(null)

    // Validate file
    const validation = validateImageFile(file)
    if (!validation.valid) {
      setError(validation.error || 'Invalid file')
      return
    }

    // Get dimensions
    try {
      const dims = await getImageDimensions(file)
      setDimensions(dims)
    } catch (err) {
      setError('Failed to load image')
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    // Callback
    if (onUpload) {
      onUpload(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      const fakeEvent = {
        target: { files: [file] },
      } as any
      handleFileSelect(fakeEvent)
    }
  }

  if (process.env.NODE_ENV === 'production') {
    return null // Don't show in production
  }

  return (
    <div
      className="image-upload-helper"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      style={{
        padding: '2rem',
        border: '2px dashed #ccc',
        borderRadius: '8px',
        textAlign: 'center',
        margin: '2rem 0',
      }}
    >
      <h3 style={{ marginBottom: '1rem' }}>Image Upload Helper</h3>
      <p style={{ marginBottom: '1rem', color: '#666' }}>
        Target: <code>{targetPath}</code>
      </p>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />

      <button
        onClick={() => fileInputRef.current?.click()}
        style={{
          padding: '0.75rem 1.5rem',
          background: '#1A1714',
          color: '#F5F0EB',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '1rem',
        }}
      >
        Select Image
      </button>

      {error && (
        <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>
      )}

      {preview && (
        <div style={{ marginTop: '1rem' }}>
          <img
            src={preview}
            alt="Preview"
            style={{
              maxWidth: '300px',
              maxHeight: '300px',
              borderRadius: '4px',
              marginBottom: '1rem',
            }}
          />
          {dimensions && (
            <p style={{ fontSize: '0.875rem', color: '#666' }}>
              Dimensions: {dimensions.width} × {dimensions.height}px
            </p>
          )}
          <p style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.5rem' }}>
            Save this file to: <code>{targetPath}</code>
          </p>
        </div>
      )}
    </div>
  )
}

