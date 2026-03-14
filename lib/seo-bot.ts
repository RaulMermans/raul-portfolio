/**
 * SEO Bot
 * Automated SEO monitoring and optimization
 * Runs in background to improve search rankings
 */

interface SEOIssue {
  type: 'missing' | 'invalid' | 'duplicate' | 'warning'
  severity: 'critical' | 'warning' | 'info'
  message: string
  element?: string
  suggestion?: string
}

interface SEOReport {
  timestamp: number
  url: string
  score: number
  issues: SEOIssue[]
  recommendations: string[]
}

class SEOBot {
  private issues: SEOIssue[] = []
  private reports: SEOReport[] = []
  private readonly maxReports = 50

  /**
   * Scan current page for SEO issues
   */
  scanPage(): SEOReport {
    if (typeof window === 'undefined') {
      return this.getEmptyReport()
    }

    this.issues = []
    const url = window.location.href

    // Check meta tags
    this.checkMetaTags()

    // Check structured data
    this.checkStructuredData()

    // Check images
    this.checkImages()

    // Check links
    this.checkLinks()

    // Check headings
    this.checkHeadings()

    // Check performance (SEO factor)
    this.checkPerformance()

    // Calculate score
    const score = this.calculateScore()

    // Generate recommendations
    const recommendations = this.generateRecommendations()

    const report: SEOReport = {
      timestamp: Date.now(),
      url,
      score,
      issues: [...this.issues],
      recommendations,
    }

    this.reports.push(report)
    if (this.reports.length > this.maxReports) {
      this.reports.shift()
    }

    return report
  }

  /**
   * Check meta tags
   */
  private checkMetaTags(): void {
    // Title
    const title = document.querySelector('title')
    if (!title || !title.textContent?.trim()) {
      this.issues.push({
        type: 'missing',
        severity: 'critical',
        message: 'Missing or empty <title> tag',
        element: 'title',
        suggestion: 'Add a descriptive title tag (50-60 characters)',
      })
    } else if (title.textContent.length > 60) {
      this.issues.push({
        type: 'warning',
        severity: 'warning',
        message: 'Title tag is too long',
        element: 'title',
        suggestion: `Shorten title to 50-60 characters (current: ${title.textContent.length})`,
      })
    }

    // Meta description
    const description = document.querySelector('meta[name="description"]')
    if (!description || !description.getAttribute('content')?.trim()) {
      this.issues.push({
        type: 'missing',
        severity: 'critical',
        message: 'Missing or empty meta description',
        element: 'meta[name="description"]',
        suggestion: 'Add a meta description (150-160 characters)',
      })
    } else {
      const desc = description.getAttribute('content') || ''
      if (desc.length > 160) {
        this.issues.push({
          type: 'warning',
          severity: 'warning',
          message: 'Meta description is too long',
          element: 'meta[name="description"]',
          suggestion: `Shorten description to 150-160 characters (current: ${desc.length})`,
        })
      }
    }

    // Open Graph
    const ogTitle = document.querySelector('meta[property="og:title"]')
    const ogDescription = document.querySelector('meta[property="og:description"]')
    const ogImage = document.querySelector('meta[property="og:image"]')

    if (!ogTitle || !ogDescription || !ogImage) {
      this.issues.push({
        type: 'missing',
        severity: 'warning',
        message: 'Missing Open Graph tags',
        element: 'meta[property^="og:"]',
        suggestion: 'Add og:title, og:description, and og:image for better social sharing',
      })
    }

    // Twitter Card
    const twitterCard = document.querySelector('meta[name="twitter:card"]')
    if (!twitterCard) {
      this.issues.push({
        type: 'missing',
        severity: 'info',
        message: 'Missing Twitter Card',
        element: 'meta[name="twitter:card"]',
        suggestion: 'Add Twitter Card meta tags for better Twitter sharing',
      })
    }
  }

  /**
   * Check structured data
   */
  private checkStructuredData(): void {
    const scripts = document.querySelectorAll('script[type="application/ld+json"]')
    if (scripts.length === 0) {
      this.issues.push({
        type: 'missing',
        severity: 'warning',
        message: 'No structured data (JSON-LD) found',
        element: 'script[type="application/ld+json"]',
        suggestion: 'Add structured data for better search visibility',
      })
    } else {
      // Validate JSON-LD
      scripts.forEach((script, index) => {
        try {
          const json = JSON.parse(script.textContent || '{}')
          if (!json['@type']) {
            this.issues.push({
              type: 'invalid',
              severity: 'warning',
              message: `Structured data missing @type`,
              element: `script[type="application/ld+json"]:nth-child(${index + 1})`,
              suggestion: 'Add @type to structured data',
            })
          }
        } catch (error) {
          this.issues.push({
            type: 'invalid',
            severity: 'critical',
            message: `Invalid JSON-LD syntax`,
            element: `script[type="application/ld+json"]:nth-child(${index + 1})`,
            suggestion: 'Fix JSON syntax in structured data',
          })
        }
      })
    }
  }

  /**
   * Check images
   */
  private checkImages(): void {
    const images = document.querySelectorAll('img')
    let missingAlt = 0

    images.forEach((img) => {
      const alt = img.getAttribute('alt')
      if (alt === null || alt.trim() === '') {
        missingAlt++
      }
    })

    if (missingAlt > 0) {
      this.issues.push({
        type: 'missing',
        severity: 'warning',
        message: `${missingAlt} image(s) missing alt text`,
        element: 'img',
        suggestion: 'Add descriptive alt text to all images for SEO and accessibility',
      })
    }
  }

  /**
   * Check links
   */
  private checkLinks(): void {
    const links = document.querySelectorAll('a[href]')
    const brokenLinks: string[] = []

    // Check for empty or invalid hrefs
    links.forEach((link) => {
      const href = link.getAttribute('href')
      if (!href || href === '#' || href === 'javascript:void(0)') {
        brokenLinks.push(href || 'empty')
      }
    })

    if (brokenLinks.length > 0) {
      this.issues.push({
        type: 'invalid',
        severity: 'warning',
        message: `${brokenLinks.length} link(s) with empty or invalid href`,
        element: 'a[href]',
        suggestion: 'Fix or remove broken links',
      })
    }
  }

  /**
   * Check heading hierarchy
   */
  private checkHeadings(): void {
    const h1 = document.querySelectorAll('h1')
    if (h1.length === 0) {
      this.issues.push({
        type: 'missing',
        severity: 'warning',
        message: 'Missing H1 heading',
        element: 'h1',
        suggestion: 'Add a single H1 heading per page for SEO',
      })
    } else if (h1.length > 1) {
      this.issues.push({
        type: 'duplicate',
        severity: 'warning',
        message: `Multiple H1 headings found (${h1.length})`,
        element: 'h1',
        suggestion: 'Use only one H1 heading per page',
      })
    }
  }

  /**
   * Check performance (SEO factor)
   */
  private checkPerformance(): void {
    if ('performance' in window && 'timing' in window.performance) {
      const timing = window.performance.timing
      const loadTime = timing.loadEventEnd - timing.navigationStart

      if (loadTime > 3000) {
        this.issues.push({
          type: 'warning',
          severity: 'warning',
          message: `Page load time is slow (${Math.round(loadTime)}ms)`,
          element: 'performance',
          suggestion: 'Optimize page load time (target: < 3 seconds)',
        })
      }
    }
  }

  /**
   * Calculate SEO score (0-100)
   */
  private calculateScore(): number {
    let score = 100

    this.issues.forEach((issue) => {
      if (issue.severity === 'critical') score -= 10
      else if (issue.severity === 'warning') score -= 5
      else if (issue.severity === 'info') score -= 2
    })

    return Math.max(0, score)
  }

  /**
   * Generate recommendations
   */
  private generateRecommendations(): string[] {
    const recommendations: string[] = []

    const criticalIssues = this.issues.filter((i) => i.severity === 'critical')
    if (criticalIssues.length > 0) {
      recommendations.push(`Fix ${criticalIssues.length} critical SEO issue(s)`)
    }

    const missingMeta = this.issues.find((i) => i.element === 'meta[name="description"]')
    if (missingMeta) {
      recommendations.push('Add meta description for better search snippets')
    }

    const missingStructured = this.issues.find((i) => i.element?.includes('ld+json'))
    if (missingStructured) {
      recommendations.push('Add structured data (JSON-LD) for rich snippets')
    }

    return recommendations
  }

  /**
   * Get empty report
   */
  private getEmptyReport(): SEOReport {
    return {
      timestamp: Date.now(),
      url: 'server',
      score: 0,
      issues: [],
      recommendations: [],
    }
  }

  /**
   * Get latest report
   */
  getLatestReport(): SEOReport | null {
    return this.reports.length > 0 ? this.reports[this.reports.length - 1] : null
  }

  /**
   * Get all reports
   */
  getAllReports(): SEOReport[] {
    return [...this.reports]
  }

  /**
   * Start monitoring (runs on page load)
   */
  startMonitoring(): void {
    if (typeof window === 'undefined') return

    // Run initial scan after page load
    if (document.readyState === 'complete') {
      this.scanPage()
    } else {
      window.addEventListener('load', () => {
        // Use requestIdleCallback for non-blocking execution
        if ('requestIdleCallback' in window) {
          requestIdleCallback(() => this.scanPage(), { timeout: 2000 })
        } else {
          setTimeout(() => this.scanPage(), 2000)
        }
      })
    }
  }
}

// Singleton instance
export const seoBot = new SEOBot()

// Auto-start monitoring in browser (non-blocking)
if (typeof window !== 'undefined') {
  // Lazy load - only start after page is interactive
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    seoBot.startMonitoring()
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      seoBot.startMonitoring()
    })
  }
}

