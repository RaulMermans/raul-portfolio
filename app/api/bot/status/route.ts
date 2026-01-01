import { NextResponse } from 'next/server'
import { performanceBot } from '@/lib/performance-bot'
import { cacheBot } from '@/lib/cache-bot'
import { errorBot } from '@/lib/error-bot'
import { seoBot } from '@/lib/seo-bot'
import { imageOptimizationBot } from '@/lib/image-optimization-bot'
import { accessibilityBot } from '@/lib/accessibility-bot'
import { analyticsBot } from '@/lib/analytics-bot'
import { securityBot } from '@/lib/security-bot'

/**
 * Bot Status API
 * Returns status of all automated bots
 */

export async function GET() {
  try {
    const performanceReport = performanceBot.generateReport()
    const cacheStats = cacheBot.getStats()
    const errorStats = errorBot.getErrorStats()
    const seoReport = seoBot.getLatestReport()
    const imageReport = imageOptimizationBot.getLatestReport()
    const a11yReport = accessibilityBot.getLatestReport()
    const analyticsReport = analyticsBot.generateReport()
    const securityReport = securityBot.getLatestReport()

    return NextResponse.json({
      success: true,
      bots: {
        performance: {
          active: true,
          score: performanceReport.score,
          metrics: performanceReport.metrics,
          recommendations: performanceReport.recommendations,
        },
        cache: {
          active: true,
          size: cacheStats.size,
          keys: cacheStats.keys.length,
        },
        error: {
          active: true,
          totalErrors: errorStats.total,
          recentErrors: errorStats.recent.length,
        },
        seo: {
          active: true,
          score: seoReport?.score || 0,
          issues: seoReport?.issues.length || 0,
          recommendations: seoReport?.recommendations || [],
        },
        imageOptimization: {
          active: true,
          totalImages: imageReport?.totalImages || 0,
          needsOptimization: imageReport?.needsOptimization || 0,
          potentialSavings: imageReport?.potentialSavings || 0,
        },
        accessibility: {
          active: true,
          score: a11yReport?.score || 0,
          issues: a11yReport?.issues.length || 0,
          wcagCompliance: a11yReport?.wcagCompliance || { levelA: 0, levelAA: 0, levelAAA: 0 },
        },
        analytics: {
          active: true,
          sessions: analyticsReport.sessions,
          pageviews: analyticsReport.pageviews,
          averageSessionDuration: analyticsReport.averageSessionDuration,
        },
        security: {
          active: true,
          score: securityReport?.score || 0,
          issues: securityReport?.issues.length || 0,
          recommendations: securityReport?.recommendations || [],
        },
      },
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to get bot status',
      },
      { status: 500 }
    )
  }
}
