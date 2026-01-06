/**
 * MOBILE AUDIT SYSTEM
 * 
 * Provides easy-to-use functions for auditing pages
 * Can be called from project manager or directly
 */

import { auditPage, generateMobileReport, formatMobileReport, MobileReport } from './mobile-optimizer'

/**
 * Run a comprehensive mobile audit on the current or specified page
 */
export async function runMobileAudit(pagePath?: string): Promise<MobileReport> {
  const path = pagePath || (typeof window !== 'undefined' ? window.location.pathname : '/')
  
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('📱 MOBILE AUDIT INITIATED')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  
  const report = auditPage(path)
  
  // Generate actionable recommendations
  const actionableItems = report.issues
    .filter(issue => issue.autoFixable || issue.severity === 'critical' || issue.severity === 'high')
    .map(issue => ({
      priority: issue.severity,
      type: issue.type,
      description: issue.description,
      fix: issue.suggestion,
      autoFixable: issue.autoFixable,
    }))

  if (actionableItems.length > 0) {
    console.log('\n🎯 ACTIONABLE ITEMS:')
    actionableItems.forEach((item, index) => {
      console.log(`\n${index + 1}. [${item.priority.toUpperCase()}] ${item.type}`)
      console.log(`   Issue: ${item.description}`)
      console.log(`   Fix: ${item.fix}`)
      if (item.autoFixable) {
        console.log(`   ✅ Can be auto-fixed`)
      }
    })
  }

  return report
}

/**
 * Get mobile score for a page (0-100)
 */
export function getMobileScore(pagePath?: string): number {
  const report = auditPage(pagePath)
  return report.score
}

/**
 * Check if page needs mobile improvements
 */
export function needsMobileImprovement(threshold: number = 70): boolean {
  const score = getMobileScore()
  return score < threshold
}

/**
 * Quick audit function for project manager integration
 */
export function quickAudit(): { score: number; needsImprovement: boolean; criticalIssues: number } {
  const report = auditPage()
  const criticalIssues = report.issues.filter(i => i.severity === 'critical' || i.severity === 'high').length
  
  return {
    score: report.score,
    needsImprovement: report.score < 70,
    criticalIssues,
  }
}

// Export for use in project manager
export { auditPage, generateMobileReport, formatMobileReport }

