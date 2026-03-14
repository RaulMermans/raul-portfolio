/**
 * Cache Bot
 * Automated caching and cache management system
 * Improves performance by intelligently managing cache
 */

interface CacheEntry {
  key: string
  value: any
  timestamp: number
  ttl: number // Time to live in milliseconds
}

class CacheBot {
  private cache: Map<string, CacheEntry> = new Map()
  private readonly defaultTTL = 3600000 // 1 hour

  /**
   * Set cache entry
   */
  set(key: string, value: any, ttl?: number): void {
    this.cache.set(key, {
      key,
      value,
      timestamp: Date.now(),
      ttl: ttl || this.defaultTTL,
    })
  }

  /**
   * Get cache entry
   */
  get<T = any>(key: string): T | null {
    const entry = this.cache.get(key)
    if (!entry) return null

    // Check if expired
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key)
      return null
    }

    return entry.value as T
  }

  /**
   * Check if key exists and is valid
   */
  has(key: string): boolean {
    return this.get(key) !== null
  }

  /**
   * Delete cache entry
   */
  delete(key: string): void {
    this.cache.delete(key)
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.cache.clear()
  }

  /**
   * Clean expired entries
   */
  cleanExpired(): void {
    const now = Date.now()
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        this.cache.delete(key)
      }
    }
  }

  /**
   * Get cache statistics
   */
  getStats() {
    this.cleanExpired()
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    }
  }

  /**
   * Preload critical resources
   */
  async preloadResources(urls: string[]): Promise<void> {
    if (typeof window === 'undefined') return

    for (const url of urls) {
      // Check if already cached
      if (this.has(`preload:${url}`)) continue

      try {
        // Prefetch resource
        const link = document.createElement('link')
        link.rel = 'prefetch'
        link.href = url
        document.head.appendChild(link)

        // Mark as preloaded
        this.set(`preload:${url}`, true, 86400000) // 24 hours
      } catch (error) {
        // Silently fail
      }
    }
  }

  /**
   * Warm cache for critical pages
   */
  async warmCache(pages: string[]): Promise<void> {
    if (typeof window === 'undefined') return

    for (const page of pages) {
      if (this.has(`warm:${page}`)) continue

      try {
        // Prefetch page
        await fetch(page, { method: 'HEAD' })
        this.set(`warm:${page}`, true, 3600000) // 1 hour
      } catch (error) {
        // Silently fail
      }
    }
  }
}

// Singleton instance
export const cacheBot = new CacheBot()

// Auto-clean expired entries every 5 minutes
if (typeof window !== 'undefined') {
  setInterval(() => {
    cacheBot.cleanExpired()
  }, 300000) // 5 minutes
}

