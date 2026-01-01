/**
 * Accessibility Bot (A11y Bot)
 * Automated accessibility monitoring and validation
 * Ensures WCAG compliance and better UX
 */

interface A11yIssue {
  type: 'missing' | 'invalid' | 'contrast' | 'keyboard' | 'aria'
  severity: 'critical' | 'warning' | 'info'
  message: string
  element?: string
  suggestion?: string
  wcagLevel?: 'A' | 'AA' | 'AAA'
}

interface A11yReport {
  timestamp: number
  url: string
  score: number
  issues: A11yIssue[]
  recommendations: string[]
  wcagCompliance: {
    levelA: number
    levelAA: number
    levelAAA: number
  }
}

class AccessibilityBot {
  private issues: A11yIssue[] = []
  private reports: A11yReport[] = []
  private readonly maxReports = 50

  /**
   * Scan page for accessibility issues
   */
  scanPage(): A11yReport {
    if (typeof window === 'undefined') {
      return this.getEmptyReport()
    }

    this.issues = []
    const url = window.location.href

    // Check images
    this.checkImages()

    // Check color contrast
    this.checkColorContrast()

    // Check ARIA labels
    this.checkAriaLabels()

    // Check keyboard navigation
    this.checkKeyboardNavigation()

    // Check headings
    this.checkHeadings()

    // Check forms
    this.checkForms()

    // Check focus management
    this.checkFocusManagement()

    // Calculate WCAG compliance
    const wcagCompliance = this.calculateWCAGCompliance()

    // Calculate score
    const score = this.calculateScore()

    // Generate recommendations
    const recommendations = this.generateRecommendations()

    const report: A11yReport = {
      timestamp: Date.now(),
      url,
      score,
      issues: [...this.issues],
      recommendations,
      wcagCompliance,
    }

    this.reports.push(report)
    if (this.reports.length > this.maxReports) {
      this.reports.shift()
    }

    return report
  }

  /**
   * Check images for alt text
   */
  private checkImages(): void {
    const images = document.querySelectorAll('img')
    let missingAlt = 0
    let decorativeImages = 0

    images.forEach((img) => {
      const alt = img.getAttribute('alt')
      const role = img.getAttribute('role')

      if (role === 'presentation' || role === 'none') {
        decorativeImages++
      } else if (alt === null) {
        missingAlt++
        this.issues.push({
          type: 'missing',
          severity: 'critical',
          message: 'Image missing alt text',
          element: 'img',
          suggestion: 'Add descriptive alt text or role="presentation" for decorative images',
          wcagLevel: 'A',
        })
      } else if (alt.trim() === '') {
        this.issues.push({
          type: 'invalid',
          severity: 'warning',
          message: 'Image has empty alt text',
          element: 'img',
          suggestion: 'Add descriptive alt text or use role="presentation" for decorative images',
          wcagLevel: 'A',
        })
      }
    })

    if (missingAlt > 0) {
      // Already added individual issues, just log summary
    }
  }

  /**
   * Check color contrast (simplified - would need actual color calculation in production)
   */
  private checkColorContrast(): void {
    // This is a simplified check - in production, you'd use a library
    // like contrast-ratio or calculate actual contrast ratios

    const textElements = document.querySelectorAll('p, span, a, h1, h2, h3, h4, h5, h6, li')
    let lowContrastCount = 0

    // Sample check - would need actual color calculation
    textElements.forEach((el) => {
      const style = window.getComputedStyle(el)
      const color = style.color
      const bgColor = style.backgroundColor

      // Simplified: check if colors are too similar
      // In production, use proper contrast calculation
      if (color === bgColor || (color.includes('rgb') && bgColor.includes('rgb'))) {
        lowContrastCount++
      }
    })

    if (lowContrastCount > 0) {
      this.issues.push({
        type: 'contrast',
        severity: 'warning',
        message: 'Potential color contrast issues detected',
        element: 'text elements',
        suggestion: 'Ensure text has sufficient contrast (WCAG AA: 4.5:1 for normal text, 3:1 for large text)',
        wcagLevel: 'AA',
      })
    }
  }

  /**
   * Check ARIA labels
   */
  private checkAriaLabels(): void {
    // Check interactive elements without labels
    const interactiveElements = document.querySelectorAll(
      'button, a, input, select, textarea, [role="button"], [role="link"]'
    )

    interactiveElements.forEach((el) => {
      const ariaLabel = el.getAttribute('aria-label')
      const ariaLabelledBy = el.getAttribute('aria-labelledby')
      const textContent = el.textContent?.trim() || ''
      const title = el.getAttribute('title')

      if (!ariaLabel && !ariaLabelledBy && !textContent && !title) {
        this.issues.push({
          type: 'aria',
          severity: 'critical',
          message: 'Interactive element missing accessible name',
          element: el.tagName.toLowerCase(),
          suggestion: 'Add aria-label, aria-labelledby, or visible text',
          wcagLevel: 'A',
        })
      }
    })

    // Check ARIA attributes
    const elementsWithAria = document.querySelectorAll('[aria-*]')
    elementsWithAria.forEach((el) => {
      const ariaExpanded = el.getAttribute('aria-expanded')
      const ariaHidden = el.getAttribute('aria-hidden')
      const ariaLive = el.getAttribute('aria-live')

      // Check for invalid ARIA states
      if (ariaExpanded && ariaExpanded !== 'true' && ariaExpanded !== 'false') {
        this.issues.push({
          type: 'invalid',
          severity: 'warning',
          message: 'Invalid aria-expanded value',
          element: el.tagName.toLowerCase(),
          suggestion: 'aria-expanded must be "true" or "false"',
          wcagLevel: 'A',
        })
      }
    })
  }

  /**
   * Check keyboard navigation
   */
  private checkKeyboardNavigation(): void {
    // Check for focusable elements
    const focusableElements = document.querySelectorAll(
      'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )

    let missingFocusStyles = 0
    focusableElements.forEach((el) => {
      const style = window.getComputedStyle(el, ':focus')
      const outline = style.outline
      const outlineWidth = style.outlineWidth

      if (outline === 'none' && outlineWidth === '0px') {
        // Check if there's an alternative focus indicator
        const boxShadow = style.boxShadow
        if (!boxShadow || boxShadow === 'none') {
          missingFocusStyles++
        }
      }
    })

    if (missingFocusStyles > 0) {
      this.issues.push({
        type: 'keyboard',
        severity: 'warning',
        message: `${missingFocusStyles} focusable element(s) missing visible focus styles`,
        element: 'focusable elements',
        suggestion: 'Add visible focus indicators for keyboard navigation',
        wcagLevel: 'AA',
      })
    }
  }

  /**
   * Check heading hierarchy
   */
  private checkHeadings(): void {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
    let previousLevel = 0
    let skippedLevels = 0

    headings.forEach((heading) => {
      const level = parseInt(heading.tagName.charAt(1))
      if (previousLevel > 0 && level > previousLevel + 1) {
        skippedLevels++
      }
      previousLevel = level
    })

    if (skippedLevels > 0) {
      this.issues.push({
        type: 'invalid',
        severity: 'warning',
        message: 'Heading hierarchy skipped levels',
        element: 'headings',
        suggestion: 'Use headings in order (h1 → h2 → h3, etc.)',
        wcagLevel: 'A',
      })
    }
  }

  /**
   * Check forms
   */
  private checkForms(): void {
    const inputs = document.querySelectorAll('input, select, textarea')
    inputs.forEach((input) => {
      const id = input.getAttribute('id')
      const name = input.getAttribute('name')
      const ariaLabel = input.getAttribute('aria-label')
      const ariaLabelledBy = input.getAttribute('aria-labelledby')

      // Check for label association
      if (id) {
        const label = document.querySelector(`label[for="${id}"]`)
        if (!label && !ariaLabel && !ariaLabelledBy) {
          this.issues.push({
            type: 'missing',
            severity: 'critical',
            message: 'Form input missing label',
            element: input.tagName.toLowerCase(),
            suggestion: 'Add <label> element or aria-label',
            wcagLevel: 'A',
          })
        }
      } else if (!ariaLabel && !ariaLabelledBy) {
        this.issues.push({
          type: 'missing',
          severity: 'warning',
          message: 'Form input missing accessible label',
          element: input.tagName.toLowerCase(),
          suggestion: 'Add id and <label>, or aria-label',
          wcagLevel: 'A',
        })
      }
    })
  }

  /**
   * Check focus management
   */
  private checkFocusManagement(): void {
    // Check for focus traps (modals, dropdowns)
    const modals = document.querySelectorAll('[role="dialog"], [role="alertdialog"]')
    modals.forEach((modal) => {
      const focusableElements = modal.querySelectorAll(
        'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (focusableElements.length === 0) {
        this.issues.push({
          type: 'keyboard',
          severity: 'warning',
          message: 'Modal missing focusable elements',
          element: '[role="dialog"]',
          suggestion: 'Add focusable elements or ensure focus is managed',
          wcagLevel: 'A',
        })
      }
    })
  }

  /**
   * Calculate WCAG compliance
   */
  private calculateWCAGCompliance(): { levelA: number; levelAA: number; levelAAA: number } {
    const levelAIssues = this.issues.filter((i) => i.wcagLevel === 'A')
    const levelAAIssues = this.issues.filter((i) => i.wcagLevel === 'AA')
    const levelAAAIssues = this.issues.filter((i) => i.wcagLevel === 'AAA')

    const totalLevelA = levelAIssues.length
    const totalLevelAA = levelAAIssues.length
    const totalLevelAAA = levelAAAIssues.length

    // Simplified scoring (would need more sophisticated calculation)
    return {
      levelA: totalLevelA,
      levelAA: totalLevelAA,
      levelAAA: totalLevelAAA,
    }
  }

  /**
   * Calculate accessibility score (0-100)
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
      recommendations.push(`Fix ${criticalIssues.length} critical accessibility issue(s)`)
    }

    const missingAlt = this.issues.filter((i) => i.type === 'missing' && i.element === 'img')
    if (missingAlt.length > 0) {
      recommendations.push(`Add alt text to ${missingAlt.length} image(s)`)
    }

    const contrastIssues = this.issues.filter((i) => i.type === 'contrast')
    if (contrastIssues.length > 0) {
      recommendations.push('Improve color contrast for better readability')
    }

    return recommendations
  }

  /**
   * Get empty report
   */
  private getEmptyReport(): A11yReport {
    return {
      timestamp: Date.now(),
      url: 'server',
      score: 0,
      issues: [],
      recommendations: [],
      wcagCompliance: { levelA: 0, levelAA: 0, levelAAA: 0 },
    }
  }

  /**
   * Get latest report
   */
  getLatestReport(): A11yReport | null {
    return this.reports.length > 0 ? this.reports[this.reports.length - 1] : null
  }

  /**
   * Start monitoring (runs in background)
   */
  startMonitoring(): void {
    if (typeof window === 'undefined') return

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
export const accessibilityBot = new AccessibilityBot()

// Auto-start monitoring in browser (non-blocking)
if (typeof window !== 'undefined') {
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    accessibilityBot.startMonitoring()
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      accessibilityBot.startMonitoring()
    })
  }
}

