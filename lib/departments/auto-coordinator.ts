/**
 * Auto Coordinator
 * Automatically coordinates departments based on user requests
 * 
 * This is the main entry point for automatic department deployment
 */

import { requestAnalyzer, RequestAnalysis } from './request-analyzer'
import { improvementExecutor, ImprovementPlan, ImprovementResult } from './improvement-executor'
import { developerDepartment } from './developer-department'
import { designDepartment } from './design-department'
import { managementDepartment } from './management-department'

export interface AutoCoordinationResult {
  analysis: RequestAnalysis
  plans: ImprovementPlan[]
  results: ImprovementResult[]
  summary: {
    departmentsDeployed: string[]
    totalActions: number
    successfulActions: number
    failedActions: number
    recommendations: string[]
  }
}

class AutoCoordinator {
  /**
   * Automatically handle a user request
   * Analyzes the request and deploys appropriate departments
   */
  async handleRequest(userRequest: string): Promise<AutoCoordinationResult> {
    // Step 1: Analyze the request
    const analysis = requestAnalyzer.analyzeRequest(userRequest)

    console.log(`🔍 Request Analysis:`)
    console.log(`   Detected types: ${analysis.detectedTypes.join(', ')}`)
    console.log(`   Departments: ${analysis.departments.join(', ')}`)
    console.log(`   Priority: ${analysis.priority}`)
    console.log(`   Confidence: ${analysis.confidence}%`)

    // Step 2: Generate improvement plans
    const plans = improvementExecutor.generateImprovementPlan(analysis)

    console.log(`\n📋 Improvement Plans:`)
    plans.forEach(plan => {
      console.log(`   ${plan.department.toUpperCase()}: ${plan.actions.length} actions`)
    })

    // Step 3: Execute improvements
    const results = await improvementExecutor.executeImprovements(analysis)

    // Step 4: Generate summary
    const successfulActions = results.filter(r => r.success).length
    const failedActions = results.filter(r => !r.success).length

    const recommendations: string[] = []
    
    // Add recommendations based on results
    if (failedActions > 0) {
      recommendations.push(`${failedActions} action(s) failed - review errors`)
    }
    
    if (analysis.detectedTypes.includes('performance')) {
      recommendations.push('Monitor performance metrics after changes')
    }
    
    if (analysis.detectedTypes.includes('accessibility')) {
      recommendations.push('Test accessibility improvements with screen readers')
    }
    
    if (analysis.detectedTypes.includes('responsive')) {
      recommendations.push('Test on multiple devices and screen sizes')
    }

    const summary = {
      departmentsDeployed: analysis.departments,
      totalActions: results.length,
      successfulActions,
      failedActions,
      recommendations,
    }

    return {
      analysis,
      plans,
      results,
      summary,
    }
  }

  /**
   * Get quick status of all departments
   */
  async getQuickStatus() {
    const [devStatus, designStatus, mgmtStatus] = await Promise.all([
      Promise.resolve(developerDepartment.getStatus()),
      Promise.resolve(designDepartment.getStatus()),
      Promise.resolve(managementDepartment.getStatus()),
    ])

    return {
      developer: devStatus,
      design: designStatus,
      management: mgmtStatus,
      overall: {
        healthy: devStatus.healthy && designStatus.healthy && mgmtStatus.healthy,
        totalIssues: devStatus.issues + designStatus.issues + mgmtStatus.issues,
      },
    }
  }

  /**
   * Smart improvement suggestion
   * Analyzes current state and suggests improvements
   */
  async suggestImprovements(): Promise<string[]> {
    const suggestions: string[] = []

    // Get department reports
    const [devReport, designReport] = await Promise.all([
      developerDepartment.getReport(),
      designDepartment.getReport(),
    ])

    // Developer suggestions
    if (devReport.performance?.score && devReport.performance.score < 80) {
      suggestions.push('Performance score below optimal - consider optimization')
    }
    if (devReport.errors?.totalErrors > 0) {
      suggestions.push(`${devReport.errors.totalErrors} error(s) detected - review error logs`)
    }
    if (devReport.bundle?.recommendations.length > 0) {
      suggestions.push(...devReport.bundle.recommendations)
    }

    // Design suggestions
    if (!designReport.designSystem.spacing.consistent) {
      suggestions.push('Spacing inconsistencies detected - standardize spacing system')
    }
    if (!designReport.designSystem.typography.consistent) {
      suggestions.push('Typography inconsistencies detected - implement type scale')
    }
    if (!designReport.designSystem.colors.consistent) {
      suggestions.push('Color inconsistencies detected - review color palette')
    }
    if (designReport.colorContrast?.failed > 0) {
      suggestions.push(`${designReport.colorContrast.failed} color contrast issue(s) detected`)
    }
    if (designReport.accessibility?.issues?.length > 0) {
      suggestions.push(`${designReport.accessibility.issues.length} accessibility issue(s) detected`)
    }

    return suggestions
  }
}

export const autoCoordinator = new AutoCoordinator()

