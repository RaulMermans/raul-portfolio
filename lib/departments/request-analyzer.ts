/**
 * Request Analyzer
 * Intelligently determines which departments should handle a request
 * 
 * Analyzes user requests and automatically routes to appropriate departments
 */

export type RequestType = 
  | 'performance' 
  | 'design' 
  | 'accessibility' 
  | 'responsive' 
  | 'spacing' 
  | 'typography' 
  | 'colors' 
  | 'errors' 
  | 'optimization'
  | 'ux'
  | 'ui'
  | 'mobile'
  | 'seo'
  | 'images'
  | 'code-quality'
  | 'general'

export interface RequestAnalysis {
  request: string
  detectedTypes: RequestType[]
  departments: ('developer' | 'design' | 'management')[]
  confidence: number
  priority: 'high' | 'medium' | 'low'
  suggestedActions: string[]
}

class RequestAnalyzer {
  // Keywords mapping to request types
  private keywordMap: Record<RequestType, string[]> = {
    performance: ['performance', 'speed', 'slow', 'fast', 'optimize', 'bundle', 'load time', 'lcp', 'fid', 'cls'],
    design: ['design', 'visual', 'look', 'appearance', 'aesthetic', 'style', 'beautiful', 'ugly'],
    accessibility: ['accessibility', 'a11y', 'screen reader', 'keyboard', 'focus', 'aria', 'wcag'],
    responsive: ['responsive', 'mobile', 'tablet', 'desktop', 'breakpoint', 'viewport', 'device'],
    spacing: ['spacing', 'margin', 'padding', 'gap', 'space', 'breathing room', 'tight', 'cramped'],
    typography: ['typography', 'font', 'text', 'type', 'readability', 'line height', 'font size'],
    colors: ['color', 'colour', 'palette', 'contrast', 'dark', 'light', 'theme'],
    errors: ['error', 'bug', 'broken', 'crash', 'fail', 'issue', 'problem', 'not working'],
    optimization: ['optimize', 'optimization', 'improve', 'better', 'enhance', 'refactor'],
    ux: ['ux', 'user experience', 'usability', 'interaction', 'flow', 'navigation', 'intuitive'],
    ui: ['ui', 'interface', 'layout', 'component', 'element', 'button', 'link'],
    mobile: ['mobile', 'phone', 'iphone', 'android', 'touch', 'swipe', 'tap'],
    seo: ['seo', 'search', 'meta', 'sitemap', 'robots', 'indexing'],
    images: ['image', 'picture', 'photo', 'img', 'loading', 'optimize image'],
    'code-quality': ['code quality', 'clean code', 'refactor', 'maintainable', 'best practices'],
    general: ['improve', 'fix', 'update', 'change', 'modify', 'enhance'],
  }

  // Department routing based on request types
  private departmentRouting: Record<RequestType, ('developer' | 'design' | 'management')[]> = {
    performance: ['developer'],
    design: ['design'],
    accessibility: ['design', 'developer'],
    responsive: ['design', 'developer'],
    spacing: ['design'],
    typography: ['design'],
    colors: ['design'],
    errors: ['developer'],
    optimization: ['developer', 'design'],
    ux: ['design', 'developer'],
    ui: ['design'],
    mobile: ['design', 'developer'],
    seo: ['management'],
    images: ['design', 'developer'],
    'code-quality': ['developer'],
    general: ['developer', 'design', 'management'],
  }

  /**
   * Analyze a user request and determine which departments should handle it
   */
  analyzeRequest(request: string): RequestAnalysis {
    const lowerRequest = request.toLowerCase()
    const detectedTypes: RequestType[] = []
    const departmentSet = new Set<'developer' | 'design' | 'management'>()
    const suggestedActions: string[] = []

    // Detect request types based on keywords
    for (const [type, keywords] of Object.entries(this.keywordMap)) {
      const matches = keywords.filter(keyword => lowerRequest.includes(keyword))
      if (matches.length > 0) {
        detectedTypes.push(type as RequestType)
        const departments = this.departmentRouting[type as RequestType]
        departments.forEach(dept => departmentSet.add(dept))
      }
    }

    // If no specific types detected, use general
    if (detectedTypes.length === 0) {
      detectedTypes.push('general')
      this.departmentRouting.general.forEach(dept => departmentSet.add(dept))
    }

    // Calculate confidence based on keyword matches
    const totalKeywords = Object.values(this.keywordMap).flat().length
    const matchedKeywords = detectedTypes.reduce((sum, type) => {
      return sum + this.keywordMap[type].filter(k => lowerRequest.includes(k)).length
    }, 0)
    const confidence = Math.min(100, Math.round((matchedKeywords / totalKeywords) * 100))

    // Determine priority
    let priority: 'high' | 'medium' | 'low' = 'medium'
    if (detectedTypes.includes('errors') || detectedTypes.includes('accessibility')) {
      priority = 'high'
    } else if (detectedTypes.includes('performance') || detectedTypes.includes('mobile')) {
      priority = 'high'
    } else if (detectedTypes.includes('general')) {
      priority = 'low'
    }

    // Generate suggested actions based on detected types
    if (detectedTypes.includes('performance')) {
      suggestedActions.push('Run performance audit', 'Optimize bundle size', 'Check Core Web Vitals')
    }
    if (detectedTypes.includes('design')) {
      suggestedActions.push('Review design system', 'Check visual consistency', 'Validate color palette')
    }
    if (detectedTypes.includes('accessibility')) {
      suggestedActions.push('Run accessibility scan', 'Check WCAG compliance', 'Test keyboard navigation')
    }
    if (detectedTypes.includes('responsive')) {
      suggestedActions.push('Test all breakpoints', 'Check mobile layout', 'Verify touch targets')
    }
    if (detectedTypes.includes('spacing')) {
      suggestedActions.push('Standardize spacing system', 'Check spacing consistency', 'Review padding/margins')
    }
    if (detectedTypes.includes('typography')) {
      suggestedActions.push('Review type scale', 'Check font sizes', 'Validate line heights')
    }
    if (detectedTypes.includes('errors')) {
      suggestedActions.push('Check error logs', 'Run error analysis', 'Fix reported issues')
    }

    return {
      request,
      detectedTypes,
      departments: Array.from(departmentSet),
      confidence,
      priority,
      suggestedActions,
    }
  }

  /**
   * Get department-specific actions for a request
   */
  getDepartmentActions(
    department: 'developer' | 'design' | 'management',
    analysis: RequestAnalysis
  ): string[] {
    const actions: string[] = []

    if (department === 'developer') {
      if (analysis.detectedTypes.includes('performance')) {
        actions.push('analyzePerformance', 'optimizeBundle', 'checkWebVitals')
      }
      if (analysis.detectedTypes.includes('errors')) {
        actions.push('checkErrors', 'fixBugs', 'analyzeErrorLogs')
      }
      if (analysis.detectedTypes.includes('responsive')) {
        actions.push('testBreakpoints', 'fixMobileIssues', 'optimizeTouch')
      }
      if (analysis.detectedTypes.includes('code-quality')) {
        actions.push('analyzeCode', 'refactorCode', 'checkBestPractices')
      }
    }

    if (department === 'design') {
      if (analysis.detectedTypes.includes('design')) {
        actions.push('reviewDesignSystem', 'checkVisualConsistency', 'validateColors')
      }
      if (analysis.detectedTypes.includes('accessibility')) {
        actions.push('checkAccessibility', 'testContrast', 'validateWCAG')
      }
      if (analysis.detectedTypes.includes('spacing')) {
        actions.push('standardizeSpacing', 'checkSpacingConsistency')
      }
      if (analysis.detectedTypes.includes('typography')) {
        actions.push('reviewTypeScale', 'checkTypography')
      }
      if (analysis.detectedTypes.includes('responsive')) {
        actions.push('testResponsive', 'checkMobileLayout')
      }
    }

    if (department === 'management') {
      if (analysis.detectedTypes.includes('seo')) {
        actions.push('checkSEO', 'validateMetadata', 'checkSitemap')
      }
      actions.push('coordinateDepartments', 'generateReport', 'trackProgress')
    }

    return actions
  }
}

export const requestAnalyzer = new RequestAnalyzer()

