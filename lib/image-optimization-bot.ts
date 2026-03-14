/**
 * Image Optimization Bot
 * Automated image optimization and monitoring
 * Improves performance by optimizing images
 */

interface ImageInfo {
  src: string
  width: number
  height: number
  size: number
  format: string
  needsOptimization: boolean
  recommendations: string[]
}

interface ImageReport {
  timestamp: number
  totalImages: number
  optimized: number
  needsOptimization: number
  totalSize: number
  potentialSavings: number
  images: ImageInfo[]
}

class ImageOptimizationBot {
  private reports: ImageReport[] = []
  private readonly maxReports = 20

  /**
   * Scan page for images
   */
  scanImages(): ImageReport {
    if (typeof window === 'undefined') {
      return this.getEmptyReport()
    }

    const images = Array.from(document.querySelectorAll('img'))
    const imageInfos: ImageInfo[] = []
    let totalSize = 0
    let potentialSavings = 0

    images.forEach((img) => {
      const info = this.analyzeImage(img)
      imageInfos.push(info)
      totalSize += info.size
      if (info.needsOptimization) {
        potentialSavings += info.size * 0.3 // Estimate 30% savings
      }
    })

    const report: ImageReport = {
      timestamp: Date.now(),
      totalImages: images.length,
      optimized: imageInfos.filter((i) => !i.needsOptimization).length,
      needsOptimization: imageInfos.filter((i) => i.needsOptimization).length,
      totalSize,
      potentialSavings,
      images: imageInfos,
    }

    this.reports.push(report)
    if (this.reports.length > this.maxReports) {
      this.reports.shift()
    }

    return report
  }

  /**
   * Analyze individual image
   */
  private analyzeImage(img: HTMLImageElement): ImageInfo {
    const src = img.src || img.getAttribute('src') || ''
    const width = img.naturalWidth || img.width || 0
    const height = img.naturalHeight || img.height || 0
    const recommendations: string[] = []
    let needsOptimization = false

    // Check format
    const format = this.getImageFormat(src)
    if (format !== 'webp' && format !== 'avif') {
      recommendations.push(`Convert to WebP or AVIF format (current: ${format})`)
      needsOptimization = true
    }

    // Check if using Next.js Image component
    if (!img.hasAttribute('data-nimg')) {
      recommendations.push('Use Next.js Image component for automatic optimization')
      needsOptimization = true
    }

    // Check dimensions vs display size
    const displayWidth = img.width || 0
    const displayHeight = img.height || 0
    if (width > displayWidth * 2 || height > displayHeight * 2) {
      recommendations.push(
        `Image is larger than needed (${width}x${height} displayed as ${displayWidth}x${displayHeight})`
      )
      needsOptimization = true
    }

    // Check lazy loading
    if (!img.hasAttribute('loading') && !img.hasAttribute('data-nimg')) {
      recommendations.push('Add loading="lazy" for images below the fold')
    }

    // Check alt text
    if (!img.alt) {
      recommendations.push('Add alt text for SEO and accessibility')
    }

    // Estimate size (rough calculation)
    const size = this.estimateImageSize(width, height, format)

    return {
      src,
      width,
      height,
      size,
      format,
      needsOptimization,
      recommendations,
    }
  }

  /**
   * Get image format from src
   */
  private getImageFormat(src: string): string {
    const match = src.match(/\.(jpg|jpeg|png|gif|webp|avif|svg)/i)
    return match ? match[1].toLowerCase() : 'unknown'
  }

  /**
   * Estimate image size (rough calculation)
   */
  private estimateImageSize(width: number, height: number, format: string): number {
    const pixels = width * height
    let bytesPerPixel = 3 // RGB

    if (format === 'png') bytesPerPixel = 4 // RGBA
    else if (format === 'webp') bytesPerPixel = 2.5 // Compressed
    else if (format === 'avif') bytesPerPixel = 1.5 // Highly compressed
    else if (format === 'jpeg' || format === 'jpg') bytesPerPixel = 2.5 // Compressed

    return Math.round(pixels * bytesPerPixel)
  }

  /**
   * Preload critical images
   */
  preloadCriticalImages(urls: string[]): void {
    if (typeof window === 'undefined') return

    urls.forEach((url) => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = url
      document.head.appendChild(link)
    })
  }

  /**
   * Lazy load images below the fold
   */
  enableLazyLoading(): void {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return

    const images = document.querySelectorAll('img:not([loading])')
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement
          if (img.dataset.src) {
            img.src = img.dataset.src
            img.removeAttribute('data-src')
          }
          imageObserver.unobserve(img)
        }
      })
    })

    images.forEach((imgElement) => {
      const img = imgElement as HTMLImageElement
      if (img.getBoundingClientRect().top > window.innerHeight) {
        // Image is below the fold
        const src = img.src
        img.dataset.src = src
        img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg"%3E%3C/svg%3E' // Placeholder
        imageObserver.observe(img)
      }
    })
  }

  /**
   * Get empty report
   */
  private getEmptyReport(): ImageReport {
    return {
      timestamp: Date.now(),
      totalImages: 0,
      optimized: 0,
      needsOptimization: 0,
      totalSize: 0,
      potentialSavings: 0,
      images: [],
    }
  }

  /**
   * Get latest report
   */
  getLatestReport(): ImageReport | null {
    return this.reports.length > 0 ? this.reports[this.reports.length - 1] : null
  }

  /**
   * Start monitoring (runs in background)
   */
  startMonitoring(): void {
    if (typeof window === 'undefined') return

    // Run scan after images load
    if (document.readyState === 'complete') {
      this.scanImages()
    } else {
      window.addEventListener('load', () => {
        // Use requestIdleCallback for non-blocking execution
        if ('requestIdleCallback' in window) {
          requestIdleCallback(() => this.scanImages(), { timeout: 3000 })
        } else {
          setTimeout(() => this.scanImages(), 3000)
        }
      })
    }
  }
}

// Singleton instance
export const imageOptimizationBot = new ImageOptimizationBot()

// Auto-start monitoring in browser (non-blocking)
if (typeof window !== 'undefined') {
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    imageOptimizationBot.startMonitoring()
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      imageOptimizationBot.startMonitoring()
    })
  }
}

