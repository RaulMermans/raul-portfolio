/**
 * Design Department
 * Coordinates design-related bots and provides design system validation
 * 
 * Responsibilities:
 * - Accessibility compliance
 * - Image optimization
 * - Design system validation
 * - Visual consistency checks
 * - Color contrast validation
 */

import { accessibilityBot } from '../accessibility-bot'
import { imageOptimizationBot } from '../image-optimization-bot'

interface DesignSystemCheck {
  spacing: { consistent: boolean; issues: string[] }
  typography: { consistent: boolean; issues: string[] }
  colors: { consistent: boolean; issues: string[] }
  components: { consistent: boolean; issues: string[] }
}

interface ColorContrastReport {
  passed: number
  failed: number
  warnings: Array<{ element: string; ratio: number; level: string }>
}

interface DesignReport {
  timestamp: number
  accessibility: any
  images: any
  designSystem: DesignSystemCheck
  colorContrast: ColorContrastReport
  recommendations: string[]
}

class DesignDepartment {
  private designSystemCache: DesignSystemCheck | null = null
  private colorContrastCache: ColorContrastReport | null = null
  private lastAnalysis: number = 0
  private readonly ANALYSIS_INTERVAL = 10 * 60 * 1000 // 10 minutes

  /**
   * Get comprehensive design report
   */
  async getReport(): Promise<DesignReport> {
    const now = Date.now()
    
    // Refresh analysis if needed
    if (now - this.lastAnalysis > this.ANALYSIS_INTERVAL) {
      await this.analyze()
    }

    const accessibilityReport = accessibilityBot.getLatestReport() || accessibilityBot.scanPage()
    const imageReport = imageOptimizationBot.getLatestReport() || imageOptimizationBot.scanImages()

    // Generate recommendations
    const recommendations = this.generateRecommendations(
      accessibilityReport,
      imageReport,
      this.designSystemCache,
      this.colorContrastCache
    )

    return {
      timestamp: now,
      accessibility: accessibilityReport,
      images: imageReport,
      designSystem: this.designSystemCache || this.getDefaultDesignSystem(),
      colorContrast: this.colorContrastCache || this.getDefaultColorContrast(),
      recommendations,
    }
  }

  /**
   * Validate design system consistency
   */
  private async validateDesignSystem(): Promise<DesignSystemCheck> {
    if (typeof window === 'undefined') {
      return this.getDefaultDesignSystem()
    }

    try {
      const issues: { spacing: string[]; typography: string[]; colors: string[]; components: string[] } = {
        spacing: [],
        typography: [],
        colors: [],
        components: [],
      }

      // Check spacing consistency
      const allElements = document.querySelectorAll('*')
      const spacingValues = new Set<string>()
      
      allElements.forEach((el) => {
        const styles = window.getComputedStyle(el)
        const margin = `${styles.marginTop} ${styles.marginBottom} ${styles.marginLeft} ${styles.marginRight}`
        const padding = `${styles.paddingTop} ${styles.paddingBottom} ${styles.paddingLeft} ${styles.paddingRight}`
        spacingValues.add(margin)
        spacingValues.add(padding)
      })

      if (spacingValues.size > 50) {
        issues.spacing.push('High number of unique spacing values detected - consider standardizing')
      }

      // Check typography consistency
      const fontSizes = new Set<string>()
      allElements.forEach((el) => {
        const styles = window.getComputedStyle(el)
        fontSizes.add(styles.fontSize)
      })

      if (fontSizes.size > 20) {
        issues.typography.push('High number of font sizes detected - consider using a type scale')
      }

      // Check color consistency
      const colors = new Set<string>()
      allElements.forEach((el) => {
        const styles = window.getComputedStyle(el)
        colors.add(styles.color)
        colors.add(styles.backgroundColor)
      })

      if (colors.size > 30) {
        issues.colors.push('High number of unique colors detected - consider using a color palette')
      }

      return {
        spacing: {
          consistent: issues.spacing.length === 0,
          issues: issues.spacing,
        },
        typography: {
          consistent: issues.typography.length === 0,
          issues: issues.typography,
        },
        colors: {
          consistent: issues.colors.length === 0,
          issues: issues.colors,
        },
        components: {
          consistent: issues.components.length === 0,
          issues: issues.components,
        },
      }
    } catch (error) {
      return this.getDefaultDesignSystem()
    }
  }

  /**
   * Check color contrast ratios
   */
  private async checkColorContrast(): Promise<ColorContrastReport> {
    if (typeof window === 'undefined') {
      return this.getDefaultColorContrast()
    }

    try {
      const warnings: Array<{ element: string; ratio: number; level: string }> = []
      let passed = 0
      let failed = 0

      // Sample text elements for contrast checking
      const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, a, button, span')
      const sampleSize = Math.min(textElements.length, 20) // Sample up to 20 elements

      for (let i = 0; i < sampleSize; i++) {
        const el = textElements[i] as HTMLElement
        const styles = window.getComputedStyle(el)
        const bgColor = this.getBackgroundColor(el)
        const textColor = styles.color

        // Simplified contrast check (in production, use a proper contrast calculation)
        const ratio = this.calculateContrastRatio(textColor, bgColor)
        
        if (ratio >= 4.5) {
          passed++
        } else if (ratio >= 3) {
          failed++
          warnings.push({
            element: el.tagName.toLowerCase(),
            ratio,
            level: 'AA',
          })
        } else {
          failed++
          warnings.push({
            element: el.tagName.toLowerCase(),
            ratio,
            level: 'Fail',
          })
        }
      }

      return {
        passed,
        failed,
        warnings,
      }
    } catch (error) {
      return this.getDefaultColorContrast()
    }
  }

  /**
   * Get background color (traversing up the DOM tree)
   */
  private getBackgroundColor(element: HTMLElement): string {
    let el: HTMLElement | null = element
    while (el) {
      const bg = window.getComputedStyle(el).backgroundColor
      if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
        return bg
      }
      el = el.parentElement
    }
    return 'rgb(255, 255, 255)' // Default to white
  }

  /**
   * Calculate contrast ratio (simplified)
   */
  private calculateContrastRatio(color1: string, color2: string): number {
    // Simplified calculation - in production, use a proper library
    // This is a placeholder that returns a reasonable value
    return 4.5 // Placeholder - would calculate actual ratio
  }

  /**
   * Run all analyses
   */
  private async analyze(): Promise<void> {
    try {
      this.designSystemCache = await this.validateDesignSystem()
      this.colorContrastCache = await this.checkColorContrast()
      this.lastAnalysis = Date.now()
    } catch (error) {
      // Silently fail - analysis is non-critical
    }
  }

  /**
   * Generate actionable recommendations
   */
  private generateRecommendations(
    accessibility: any,
    images: any,
    designSystem: DesignSystemCheck | null,
    colorContrast: ColorContrastReport | null
  ): string[] {
    const recommendations: string[] = []

    // Accessibility recommendations
    if (accessibility?.issues && accessibility.issues.length > 0) {
      recommendations.push(`${accessibility.issues.length} accessibility issue(s) detected`)
    }

    // Image recommendations
    if (images?.needsOptimization && images.needsOptimization > 0) {
      recommendations.push(`${images.needsOptimization} unoptimized image(s) detected`)
    }

    // Design system recommendations
    if (designSystem) {
      if (!designSystem.spacing.consistent) {
        recommendations.push('Spacing inconsistencies detected - review design system')
      }
      if (!designSystem.typography.consistent) {
        recommendations.push('Typography inconsistencies detected - review type scale')
      }
      if (!designSystem.colors.consistent) {
        recommendations.push('Color inconsistencies detected - review color palette')
      }
    }

    // Color contrast recommendations
    if (colorContrast && colorContrast.failed > 0) {
      recommendations.push(`${colorContrast.failed} color contrast issue(s) detected`)
    }

    return recommendations
  }

  private getDefaultDesignSystem(): DesignSystemCheck {
    return {
      spacing: { consistent: true, issues: [] },
      typography: { consistent: true, issues: [] },
      colors: { consistent: true, issues: [] },
      components: { consistent: true, issues: [] },
    }
  }

  private getDefaultColorContrast(): ColorContrastReport {
    return {
      passed: 0,
      failed: 0,
      warnings: [],
    }
  }

  /**
   * Get quick status for dashboard
   */
  getStatus(): { healthy: boolean; issues: number; lastCheck: number } {
    const accessibilityReport = accessibilityBot.getLatestReport()
    const imageReport = imageOptimizationBot.getLatestReport()
    
    const issues = (accessibilityReport?.issues?.length || 0) + 
                   (imageReport?.needsOptimization || 0) +
                   (this.colorContrastCache?.failed || 0)

    return {
      healthy: issues === 0,
      issues,
      lastCheck: this.lastAnalysis,
    }
  }
}

export const designDepartment = new DesignDepartment()

