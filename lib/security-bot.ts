/**
 * Security Bot
 * Monitors security vulnerabilities and threats
 * Runs in background to protect the website
 */

interface SecurityIssue {
  type: 'vulnerability' | 'exposed' | 'invalid' | 'warning'
  severity: 'critical' | 'high' | 'medium' | 'low'
  message: string
  component?: string
  suggestion?: string
}

interface SecurityReport {
  timestamp: number
  score: number
  issues: SecurityIssue[]
  recommendations: string[]
}

class SecurityBot {
  private issues: SecurityIssue[] = []
  private reports: SecurityReport[] = []
  private readonly maxReports = 20

  /**
   * Scan for security issues
   */
  scanSecurity(): SecurityReport {
    if (typeof window === 'undefined') {
      return this.getEmptyReport()
    }

    this.issues = []

    // Check for exposed secrets (basic check)
    this.checkExposedSecrets()

    // Check HTTPS
    this.checkHTTPS()

    // Check Content Security Policy
    this.checkCSP()

    // Check for XSS vulnerabilities (basic)
    this.checkXSSVulnerabilities()

    // Check form security
    this.checkFormSecurity()

    // Calculate score
    const score = this.calculateScore()

    // Generate recommendations
    const recommendations = this.generateRecommendations()

    const report: SecurityReport = {
      timestamp: Date.now(),
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
   * Check for exposed secrets (basic check)
   */
  private checkExposedSecrets(): void {
    // Check page source for common secret patterns
    const pageSource = document.documentElement.outerHTML

    // Check for API keys (basic pattern matching)
    const apiKeyPatterns = [
      /api[_-]?key\s*[:=]\s*["']([^"']{20,})["']/gi,
      /secret[_-]?key\s*[:=]\s*["']([^"']{20,})["']/gi,
      /password\s*[:=]\s*["']([^"']{8,})["']/gi,
    ]

    apiKeyPatterns.forEach((pattern) => {
      if (pattern.test(pageSource)) {
        this.issues.push({
          type: 'exposed',
          severity: 'critical',
          message: 'Potential secret exposed in page source',
          component: 'page source',
          suggestion: 'Remove secrets from client-side code. Use environment variables.',
        })
      }
    })
  }

  /**
   * Check HTTPS
   */
  private checkHTTPS(): void {
    if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
      this.issues.push({
        type: 'warning',
        severity: 'high',
        message: 'Site not using HTTPS',
        component: 'protocol',
        suggestion: 'Use HTTPS to encrypt data transmission',
      })
    }
  }

  /**
   * Check Content Security Policy
   */
  private checkCSP(): void {
    const metaCSP = document.querySelector('meta[http-equiv="Content-Security-Policy"]')
    if (!metaCSP) {
      // Check if CSP is set via headers (can't detect in client-side, but can warn)
      this.issues.push({
        type: 'warning',
        severity: 'medium',
        message: 'Content Security Policy not detected',
        component: 'CSP',
        suggestion: 'Implement CSP headers to prevent XSS attacks',
      })
    }
  }

  /**
   * Check for XSS vulnerabilities (basic)
   */
  private checkXSSVulnerabilities(): void {
    // Check for innerHTML usage (potential XSS)
    // This is a simplified check - would need static analysis in production
    const scripts = document.querySelectorAll('script')
    scripts.forEach((script) => {
      const content = script.textContent || ''
      if (content.includes('innerHTML') && !content.includes('sanitize')) {
        this.issues.push({
          type: 'vulnerability',
          severity: 'medium',
          message: 'Potential XSS vulnerability: innerHTML usage',
          component: 'script',
          suggestion: 'Use textContent or sanitize HTML before using innerHTML',
        })
      }
    })
  }

  /**
   * Check form security
   */
  private checkFormSecurity(): void {
    const forms = document.querySelectorAll('form')
    forms.forEach((form) => {
      // Check if form has CSRF protection
      const csrfToken = form.querySelector('input[name*="csrf"], input[name*="token"]')
      if (!csrfToken && form.method.toLowerCase() === 'post') {
        this.issues.push({
          type: 'warning',
          severity: 'medium',
          message: 'Form missing CSRF protection',
          component: 'form',
          suggestion: 'Add CSRF token to forms',
        })
      }

      // Check for password fields without proper attributes
      const passwordFields = form.querySelectorAll('input[type="password"]')
      passwordFields.forEach((field) => {
        if (!field.hasAttribute('autocomplete')) {
          this.issues.push({
            type: 'warning',
            severity: 'low',
            message: 'Password field missing autocomplete attribute',
            component: 'form',
            suggestion: 'Add autocomplete="current-password" or autocomplete="new-password"',
          })
        }
      })
    })
  }

  /**
   * Calculate security score (0-100)
   */
  private calculateScore(): number {
    let score = 100

    this.issues.forEach((issue) => {
      if (issue.severity === 'critical') score -= 20
      else if (issue.severity === 'high') score -= 15
      else if (issue.severity === 'medium') score -= 10
      else if (issue.severity === 'low') score -= 5
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
      recommendations.push(`Fix ${criticalIssues.length} critical security issue(s) immediately`)
    }

    const exposedSecrets = this.issues.filter((i) => i.type === 'exposed')
    if (exposedSecrets.length > 0) {
      recommendations.push('Remove exposed secrets from client-side code')
    }

    const httpsIssue = this.issues.find((i) => i.component === 'protocol')
    if (httpsIssue) {
      recommendations.push('Enable HTTPS for secure data transmission')
    }

    return recommendations
  }

  /**
   * Get empty report
   */
  private getEmptyReport(): SecurityReport {
    return {
      timestamp: Date.now(),
      score: 0,
      issues: [],
      recommendations: [],
    }
  }

  /**
   * Get latest report
   */
  getLatestReport(): SecurityReport | null {
    return this.reports.length > 0 ? this.reports[this.reports.length - 1] : null
  }

  /**
   * Start monitoring (runs in background)
   */
  startMonitoring(): void {
    if (typeof window === 'undefined') return

    // Run scan after page load (non-blocking)
    if (document.readyState === 'complete') {
      this.scanSecurity()
    } else {
      window.addEventListener('load', () => {
        // Use requestIdleCallback for non-blocking execution
        if ('requestIdleCallback' in window) {
          requestIdleCallback(() => this.scanSecurity(), { timeout: 3000 })
        } else {
          setTimeout(() => this.scanSecurity(), 3000)
        }
      })
    }
  }
}

// Singleton instance
export const securityBot = new SecurityBot()

// Auto-start monitoring in browser (non-blocking)
if (typeof window !== 'undefined') {
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    securityBot.startMonitoring()
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      securityBot.startMonitoring()
    })
  }
}

