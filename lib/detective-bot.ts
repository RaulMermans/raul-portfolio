/**
 * DETECTIVE BOT
 * 
 * A systematic debugging and problem-solving bot that investigates issues
 * when we're stuck and can't find the root cause.
 * 
 * Capabilities:
 * - Deep investigation of CSS issues (spacing, layout, visibility)
 * - Component rendering analysis
 * - Image loading and placeholder detection
 * - DOM structure analysis
 * - Style cascade investigation
 * - Margin/padding collapse detection
 * - Hidden element detection
 * - Performance bottleneck identification
 */

export interface InvestigationResult {
  issue: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  evidence: string[]
  rootCause?: string
  solution: string
  confidence: number // 0-100
}

export interface InvestigationReport {
  timestamp: string
  problem: string
  results: InvestigationResult[]
  recommendations: string[]
  nextSteps: string[]
}

/**
 * Investigates CSS spacing issues (gaps, margins, padding)
 */
export function investigateSpacing(element: HTMLElement | null, context: string = 'general'): InvestigationResult[] {
  const results: InvestigationResult[] = []
  
  if (!element) {
    results.push({
      issue: 'Element not found',
      severity: 'critical',
      evidence: [`Element does not exist in DOM for context: ${context}`],
      solution: 'Verify element selector and ensure component renders correctly',
      confidence: 100,
    })
    return results
  }

  const styles = window.getComputedStyle(element)
  const rect = element.getBoundingClientRect()

  // Check for unexpected spacing
  const marginTop = parseFloat(styles.marginTop)
  const marginBottom = parseFloat(styles.marginBottom)
  const paddingTop = parseFloat(styles.paddingTop)
  const paddingBottom = parseFloat(styles.paddingBottom)
  const minHeight = parseFloat(styles.minHeight)

  if (minHeight > 0 && rect.height < minHeight) {
    results.push({
      issue: 'Element has min-height creating unwanted space',
      severity: 'high',
      evidence: [
        `min-height: ${minHeight}px`,
        `actual height: ${rect.height}px`,
        `gap: ${minHeight - rect.height}px`,
      ],
      rootCause: 'CSS min-height property forcing minimum space even when content is smaller',
      solution: 'Remove or reduce min-height, or use min-height: auto when empty',
      confidence: 90,
    })
  }

  if (marginBottom > 20 || marginTop > 20) {
    results.push({
      issue: 'Large margins creating gaps',
      severity: 'medium',
      evidence: [
        `margin-top: ${marginTop}px`,
        `margin-bottom: ${marginBottom}px`,
      ],
      solution: 'Reduce margins or set to 0 if adjacent sections have same background',
      confidence: 85,
    })
  }

  if (paddingTop > 30 || paddingBottom > 30) {
    results.push({
      issue: 'Large padding creating visual gaps',
      severity: 'medium',
      evidence: [
        `padding-top: ${paddingTop}px`,
        `padding-bottom: ${paddingBottom}px`,
      ],
      solution: 'Reduce padding, especially if section has same background as adjacent section',
      confidence: 80,
    })
  }

  // Check for aspect-ratio creating space
  const aspectRatio = styles.aspectRatio
  if (aspectRatio && aspectRatio !== 'auto' && element.children.length === 0) {
    results.push({
      issue: 'Aspect-ratio creating space for empty element',
      severity: 'high',
      evidence: [
        `aspect-ratio: ${aspectRatio}`,
        `element is empty (no children)`,
      ],
      rootCause: 'CSS aspect-ratio property forces dimensions even when element has no content',
      solution: 'Hide element when empty or remove aspect-ratio when no content',
      confidence: 95,
    })
  }

  return results
}

/**
 * Investigates image loading and placeholder issues
 */
export function investigateImages(): InvestigationResult[] {
  const results: InvestigationResult[] = []
  const images = document.querySelectorAll('img, [style*="aspect-ratio"], .case-study-image-new')

  images.forEach((img, index) => {
    const element = img as HTMLElement
    const rect = element.getBoundingClientRect()
    const styles = window.getComputedStyle(element)

    // Check for images that failed to load but still take space
    if (img instanceof HTMLImageElement && !img.complete) {
      results.push({
        issue: `Image ${index + 1} may be loading and creating placeholder space`,
        severity: 'medium',
        evidence: [
          `src: ${img.src.substring(0, 50)}...`,
          `height: ${rect.height}px`,
          `display: ${styles.display}`,
        ],
        solution: 'Ensure image component returns null if image fails to load',
        confidence: 70,
      })
    }

    // Check for aspect-ratio on empty image containers
    const aspectRatio = styles.aspectRatio
    if (aspectRatio && aspectRatio !== 'auto' && element.children.length === 0) {
      results.push({
        issue: `Empty image container ${index + 1} has aspect-ratio creating space`,
        severity: 'high',
        evidence: [
          `aspect-ratio: ${aspectRatio}`,
          `width: ${rect.width}px`,
          `height: ${rect.height}px`,
          `container is empty`,
        ],
        rootCause: 'Image placeholder with aspect-ratio but no actual image',
        solution: 'Hide container when empty or remove aspect-ratio',
        confidence: 95,
      })
    }
  })

  return results
}

/**
 * Investigates section gaps by analyzing adjacent elements
 */
export function investigateSectionGaps(): InvestigationResult[] {
  const results: InvestigationResult[] = []
  
  const metaSection = document.querySelector('.case-study-meta-new')
  const overviewSection = document.querySelector('.case-study-section-new')

  if (metaSection && overviewSection) {
    const metaRect = metaSection.getBoundingClientRect()
    const overviewRect = overviewSection.getBoundingClientRect()
    const gap = overviewRect.top - metaRect.bottom

    if (gap > 20) {
      const metaStyles = window.getComputedStyle(metaSection)
      const overviewStyles = window.getComputedStyle(overviewSection)

      results.push({
        issue: 'Large gap between meta and overview sections',
        severity: 'high',
        evidence: [
          `Gap size: ${gap}px`,
          `Meta bottom: ${metaRect.bottom}px`,
          `Overview top: ${overviewRect.top}px`,
          `Meta padding-bottom: ${metaStyles.paddingBottom}`,
          `Meta margin-bottom: ${metaStyles.marginBottom}`,
          `Overview padding-top: ${overviewStyles.paddingTop}`,
          `Overview margin-top: ${overviewStyles.marginTop}`,
        ],
        rootCause: 'Combined padding/margin from adjacent sections with same background creating visual gap',
        solution: 'Reduce padding-bottom of meta section and padding-top of overview section when backgrounds match',
        confidence: 90,
      })
    }
  }

  return results
}

/**
 * Investigates hidden elements that still take space
 */
export function investigateHiddenElements(): InvestigationResult[] {
  const results: InvestigationResult[] = []
  
  const hiddenElements = document.querySelectorAll('[style*="display: none"], [style*="visibility: hidden"], .hidden')
  
  hiddenElements.forEach((el, index) => {
    const element = el as HTMLElement
    const rect = element.getBoundingClientRect()
    const styles = window.getComputedStyle(element)

    // Check if hidden element still has dimensions
    if (rect.height > 0 || rect.width > 0) {
      results.push({
        issue: `Hidden element ${index + 1} still taking up space`,
        severity: 'medium',
        evidence: [
          `display: ${styles.display}`,
          `visibility: ${styles.visibility}`,
          `height: ${rect.height}px`,
          `width: ${rect.width}px`,
        ],
        solution: 'Use display: none instead of visibility: hidden, or ensure element is removed from DOM',
        confidence: 80,
      })
    }
  })

  return results
}

/**
 * Main investigation function - runs all investigations
 */
export function investigate(problem: string, focusAreas: string[] = []): InvestigationReport {
  const results: InvestigationResult[] = []

  console.log(`🔍 Detective Bot: Investigating "${problem}"...`)

  // Always investigate spacing issues
  if (focusAreas.length === 0 || focusAreas.includes('spacing')) {
    const metaSection = document.querySelector('.case-study-meta-new') as HTMLElement
    const overviewSection = document.querySelector('.case-study-section-new') as HTMLElement
    
    results.push(...investigateSpacing(metaSection, 'meta section'))
    results.push(...investigateSpacing(overviewSection, 'overview section'))
    results.push(...investigateSectionGaps())
  }

  // Investigate images if relevant
  if (focusAreas.length === 0 || focusAreas.includes('images')) {
    results.push(...investigateImages())
  }

  // Investigate hidden elements
  if (focusAreas.length === 0 || focusAreas.includes('hidden')) {
    results.push(...investigateHiddenElements())
  }

  // Generate recommendations
  const recommendations: string[] = []
  const criticalIssues = results.filter(r => r.severity === 'critical')
  const highIssues = results.filter(r => r.severity === 'high')

  if (criticalIssues.length > 0) {
    recommendations.push(`Fix ${criticalIssues.length} critical issue(s) immediately`)
  }
  if (highIssues.length > 0) {
    recommendations.push(`Address ${highIssues.length} high-priority issue(s)`)
  }

  // Generate next steps
  const nextSteps: string[] = []
  results.forEach(result => {
    if (result.severity === 'critical' || result.severity === 'high') {
      nextSteps.push(result.solution)
    }
  })

  return {
    timestamp: new Date().toISOString(),
    problem,
    results,
    recommendations,
    nextSteps: [...new Set(nextSteps)], // Remove duplicates
  }
}

/**
 * Formats investigation report for display
 */
export function formatInvestigationReport(report: InvestigationReport): string {
  let output = `🔍 DETECTIVE BOT INVESTIGATION REPORT\n`
  output += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`
  output += `Problem: ${report.problem}\n`
  output += `Timestamp: ${report.timestamp}\n\n`

  if (report.results.length === 0) {
    output += `✅ No issues detected. The problem might be elsewhere.\n`
    return output
  }

  output += `📊 Issues Found: ${report.results.length}\n\n`

  const bySeverity = {
    critical: report.results.filter(r => r.severity === 'critical'),
    high: report.results.filter(r => r.severity === 'high'),
    medium: report.results.filter(r => r.severity === 'medium'),
    low: report.results.filter(r => r.severity === 'low'),
  }

  Object.entries(bySeverity).forEach(([severity, issues]) => {
    if (issues.length > 0) {
      output += `\n${severity.toUpperCase()} SEVERITY (${issues.length}):\n`
      issues.forEach((result, index) => {
        output += `\n  ${index + 1}. ${result.issue} (Confidence: ${result.confidence}%)\n`
        if (result.rootCause) {
          output += `     🎯 Root Cause: ${result.rootCause}\n`
        }
        output += `     📝 Evidence:\n`
        result.evidence.forEach(ev => {
          output += `        • ${ev}\n`
        })
        output += `     ✅ Solution: ${result.solution}\n`
      })
    }
  })

  if (report.recommendations.length > 0) {
    output += `\n📋 Recommendations:\n`
    report.recommendations.forEach((rec, index) => {
      output += `  ${index + 1}. ${rec}\n`
    })
  }

  if (report.nextSteps.length > 0) {
    output += `\n🎯 Next Steps:\n`
    report.nextSteps.forEach((step, index) => {
      output += `  ${index + 1}. ${step}\n`
    })
  }

  return output
}

/**
 * Initialize detective bot
 */
export function initDetectiveBot() {
  if (typeof window === 'undefined') {
    console.log('🔍 Detective Bot initialized (server-side)')
    return
  }

  console.log('🔍 Detective Bot initialized')
  console.log('   Use investigate("problem description") to investigate issues')

  // Expose globally for debugging
  if (typeof window !== 'undefined') {
    ;(window as any).detectiveBot = {
      investigate,
      formatReport: formatInvestigationReport,
      investigateSpacing,
      investigateImages,
      investigateSectionGaps,
    }
  }
}

// Auto-initialize
if (typeof window !== 'undefined') {
  initDetectiveBot()
}

