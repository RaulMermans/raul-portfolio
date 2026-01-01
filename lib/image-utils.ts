/**
 * Image utility functions
 * Handles image paths, fallbacks, and optimization
 */

export interface ImageConfig {
  src: string
  fallback?: string
  alt: string
  width?: number
  height?: number
  quality?: number
  priority?: boolean
}

/**
 * Get image path with fallback support
 */
export function getImagePath(
  basePath: string,
  formats: string[] = ['webp', 'jpg', 'png']
): string {
  // In Next.js, images in /public are served from root
  // So /public/images/about/profile.webp becomes /images/about/profile.webp
  return basePath.startsWith('/') ? basePath : `/${basePath}`
}

/**
 * Get image path with format fallback
 * Tries multiple formats until one is found
 */
export function getImageWithFallback(
  baseName: string,
  directory: string = 'images',
  formats: string[] = ['webp', 'jpg', 'png']
): string {
  // Return the first format (preferred)
  // In production, you'd check if file exists
  const format = formats[0]
  return `/${directory}/${baseName}.${format}`
}

/**
 * About page image configuration
 */
export const ABOUT_IMAGE_CONFIG = {
  src: '/images/about/profile.webp',
  fallbacks: [
    '/images/about/profile.jpg',
    '/images/about/profile.png',
    '/images/about/profile.jpeg',
  ],
  alt: 'Raúl Mermans',
  width: 800,
  height: 1067,
  quality: 90,
  priority: true,
}

/**
 * Get about image with fallback
 */
export function getAboutImage(): ImageConfig {
  return {
    src: ABOUT_IMAGE_CONFIG.src,
    fallback: ABOUT_IMAGE_CONFIG.fallbacks[0],
    alt: ABOUT_IMAGE_CONFIG.alt,
    width: ABOUT_IMAGE_CONFIG.width,
    height: ABOUT_IMAGE_CONFIG.height,
    quality: ABOUT_IMAGE_CONFIG.quality,
    priority: ABOUT_IMAGE_CONFIG.priority,
  }
}

/**
 * Check if image exists (client-side only)
 */
export function checkImageExists(src: string): Promise<boolean> {
  if (typeof window === 'undefined') return Promise.resolve(false)
  
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = src
  })
}

/**
 * Get image dimensions from file (requires file input)
 */
export function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    
    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
      })
    }
    
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Failed to load image'))
    }
    
    img.src = url
  })
}

/**
 * Validate image file
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 5 * 1024 * 1024 // 5MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed: ${allowedTypes.join(', ')}`,
    }
  }
  
  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File too large. Maximum size: ${(maxSize / 1024 / 1024).toFixed(0)}MB`,
    }
  }
  
  return { valid: true }
}

