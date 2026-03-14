/**
 * MOBILE OPTIMIZER BOT
 * 
 * Comprehensive mobile design and performance optimization system.
 * Proactively monitors, analyzes, and improves mobile experience.
 * 
 * Capabilities:
 * - Mobile design analysis and adaptation
 * - Touch interaction optimization
 * - Mobile performance monitoring
 * - Responsive layout validation
 * - Mobile-specific bug detection
 * - Proactive improvements and fixes
 */

export interface MobileIssue {
  type: 'touch-target' | 'spacing' | 'font-size' | 'layout' | 'performance' | 'viewport' | 'image' | 'interaction' | 'accessibility'
  severity: 'critical' | 'high' | 'medium' | 'low'
  element?: string
  description: string
  suggestion: string
  autoFixable: boolean
  currentValue?: string | number
  recommendedValue?: string | number
}

export interface MobileReport {
  timestamp: string
  deviceType: 'mobile' | 'tablet' | 'desktop'
  viewport: { width: number; height: number }
  issues: MobileIssue[]
  performance: {
    lcp?: number
    fid?: number
    cls?: number
    fcp?: number
    bundleSize?: number
  }
  recommendations: string[]
  score: number // 0-100
}

export interface MobileOptimization {
  id: string
  name: string
  description: string
  priority: 'critical' | 'high' | 'medium' | 'low'
  execute: () => void | Promise<void>
}

// Mobile design standards
const MOBILE_STANDARDS = {
  minTouchTarget: 44, // iOS/Android minimum
  minFontSize: 16, // Prevents zoom on iOS
  minSpacing: 16, // Comfortable spacing
  maxContentWidth: 600, // Optimal reading width
  safeAreaPadding: 20, // Notch/safe area padding
  imageMaxWidth: 100, // Percentage
  buttonMinHeight: 48,
  inputMinHeight: 48,
}

// Performance thresholds for mobile
const MOBILE_PERFORMANCE_THRESHOLDS = {
  lcp: { good: 2500, poor: 4000 }, // Mobile is slower
  fid: { good: 100, poor: 300 },
  cls: { good: 0.1, poor: 0.25 },
  fcp: { good: 1800, poor: 3000 },
  bundleSize: { good: 150000, poor: 300000 }, // 150KB - 300KB
}

/**
 * Analyzes an element for mobile-specific issues
 */
export function analyzeMobileElement(
  element: HTMLElement,
  context: string = 'general'
): MobileIssue[] {
  const issues: MobileIssue[] = []
  const styles = window.getComputedStyle(element)
  const rect = element.getBoundingClientRect()

  // Check touch target size
  if (rect.width < MOBILE_STANDARDS.minTouchTarget || rect.height < MOBILE_STANDARDS.minTouchTarget) {
    const isInteractive = element.tagName === 'BUTTON' || 
                         element.tagName === 'A' || 
                         element.getAttribute('role') === 'button' ||
                         element.onclick !== null

    if (isInteractive) {
      issues.push({
        type: 'touch-target',
        severity: 'high',
        element: element.tagName.toLowerCase(),
        description: `Touch target is too small (${Math.round(rect.width)}×${Math.round(rect.height)}px). Minimum recommended: ${MOBILE_STANDARDS.minTouchTarget}×${MOBILE_STANDARDS.minTouchTarget}px`,
        suggestion: `Increase padding or min-height/min-width to at least ${MOBILE_STANDARDS.minTouchTarget}px`,
        autoFixable: true,
        currentValue: `${Math.round(rect.width)}×${Math.round(rect.height)}`,
        recommendedValue: `${MOBILE_STANDARDS.minTouchTarget}×${MOBILE_STANDARDS.minTouchTarget}`,
      })
    }
  }

  // Check font size
  const fontSize = parseFloat(styles.fontSize)
  if (fontSize < MOBILE_STANDARDS.minFontSize && element.tagName !== 'SMALL') {
    issues.push({
      type: 'font-size',
      severity: 'medium',
      element: element.tagName.toLowerCase(),
      description: `Font size (${fontSize}px) is below minimum (${MOBILE_STANDARDS.minFontSize}px). iOS will auto-zoom on input focus.`,
      suggestion: `Increase font-size to at least ${MOBILE_STANDARDS.minFontSize}px`,
      autoFixable: true,
      currentValue: fontSize,
      recommendedValue: MOBILE_STANDARDS.minFontSize,
    })
  }

  // Check spacing
  const paddingTop = parseFloat(styles.paddingTop)
  const paddingBottom = parseFloat(styles.paddingBottom)
  const minPadding = Math.min(paddingTop, paddingBottom)
  
  if (minPadding < MOBILE_STANDARDS.minSpacing && context === 'content') {
    issues.push({
      type: 'spacing',
      severity: 'low',
      element: element.tagName.toLowerCase(),
      description: `Vertical spacing (${minPadding}px) is below recommended minimum (${MOBILE_STANDARDS.minSpacing}px)`,
      suggestion: `Increase padding to at least ${MOBILE_STANDARDS.minSpacing}px for better mobile readability`,
      autoFixable: true,
      currentValue: minPadding,
      recommendedValue: MOBILE_STANDARDS.minSpacing,
    })
  }

  return issues
}

/**
 * Analyzes viewport and meta tags for mobile optimization
 */
export function analyzeViewport(): MobileIssue[] {
  const issues: MobileIssue[] = []
  const viewport = document.querySelector('meta[name="viewport"]')
  
  if (!viewport) {
    issues.push({
      type: 'viewport',
      severity: 'critical',
      description: 'Missing viewport meta tag. Mobile browsers will render desktop layout.',
      suggestion: 'Add: <meta name="viewport" content="width=device-width, initial-scale=1.0">',
      autoFixable: false,
    })
  } else {
    const content = viewport.getAttribute('content') || ''
    if (!content.includes('width=device-width')) {
      issues.push({
        type: 'viewport',
        severity: 'critical',
        description: 'Viewport meta tag missing width=device-width',
        suggestion: 'Update viewport to include: width=device-width',
        autoFixable: false,
      })
    }
  }

  return issues
}

/**
 * Analyzes images for mobile optimization
 */
export function analyzeMobileImages(): MobileIssue[] {
  const issues: MobileIssue[] = []
  const images = document.querySelectorAll('img')

  images.forEach((img) => {
    const src = img.getAttribute('src') || ''
    const loading = img.getAttribute('loading')
    const sizes = img.getAttribute('sizes')
    const width = img.getAttribute('width')
    const height = img.getAttribute('height')

    // Check for lazy loading
    if (!loading || loading !== 'lazy') {
      // Only flag if image is below the fold
      const rect = img.getBoundingClientRect()
      if (rect.top > window.innerHeight) {
        issues.push({
          type: 'image',
          severity: 'medium',
          element: 'img',
          description: `Image below the fold missing lazy loading: ${src.substring(0, 50)}...`,
          suggestion: 'Add loading="lazy" attribute to improve mobile performance',
          autoFixable: true,
        })
      }
    }

    // Check for responsive images
    if (!sizes && !width) {
      issues.push({
        type: 'image',
        severity: 'low',
        element: 'img',
        description: 'Image missing responsive attributes (sizes or width)',
        suggestion: 'Add sizes attribute or width/height for better mobile optimization',
        autoFixable: false,
      })
    }
  })

  return issues
}

/**
 * Generates comprehensive mobile report
 */
export function generateMobileReport(): MobileReport {
  const issues: MobileIssue[] = []
  const viewport = {
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  }

  const deviceType = viewport.width < 768 ? 'mobile' : viewport.width < 1024 ? 'tablet' : 'desktop'

  // Analyze viewport
  if (typeof document !== 'undefined') {
    issues.push(...analyzeViewport())
    issues.push(...analyzeMobileImages())

    // Analyze interactive elements
    const interactiveElements = document.querySelectorAll('button, a, [role="button"], input, textarea, select')
    interactiveElements.forEach((el) => {
      if (el instanceof HTMLElement) {
        issues.push(...analyzeMobileElement(el, 'interactive'))
      }
    })

    // Analyze content areas
    const contentElements = document.querySelectorAll('main, article, section, .content, .text')
    contentElements.forEach((el) => {
      if (el instanceof HTMLElement) {
        issues.push(...analyzeMobileElement(el, 'content'))
      }
    })
  }

  // Calculate score
  const criticalIssues = issues.filter(i => i.severity === 'critical').length
  const highIssues = issues.filter(i => i.severity === 'high').length
  const mediumIssues = issues.filter(i => i.severity === 'medium').length
  const lowIssues = issues.filter(i => i.severity === 'low').length

  const score = Math.max(0, 100 - (criticalIssues * 20) - (highIssues * 10) - (mediumIssues * 5) - (lowIssues * 2))

  // Generate recommendations
  const recommendations: string[] = []
  
  if (criticalIssues > 0) {
    recommendations.push(`Fix ${criticalIssues} critical mobile issue(s) immediately`)
  }
  if (highIssues > 0) {
    recommendations.push(`Address ${highIssues} high-priority mobile issue(s)`)
  }
  if (deviceType === 'mobile' && issues.length > 10) {
    recommendations.push('Consider mobile-first design refactoring')
  }

  return {
    timestamp: new Date().toISOString(),
    deviceType,
    viewport,
    issues,
    performance: {}, // Will be populated by performance monitoring
    recommendations,
    score,
  }
}

/**
 * Formats mobile report for display
 */
export function formatMobileReport(report: MobileReport): string {
  let output = `📱 MOBILE OPTIMIZER REPORT\n`
  output += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`
  output += `📊 Device Type: ${report.deviceType.toUpperCase()}\n`
  output += `📐 Viewport: ${report.viewport.width}×${report.viewport.height}px\n`
  output += `⭐ Mobile Score: ${report.score}/100\n\n`

  if (report.issues.length === 0) {
    output += `✅ No mobile issues detected! Excellent mobile optimization.\n`
    return output
  }

  output += `🔍 Issues Found: ${report.issues.length}\n\n`

  const bySeverity = {
    critical: report.issues.filter(i => i.severity === 'critical'),
    high: report.issues.filter(i => i.severity === 'high'),
    medium: report.issues.filter(i => i.severity === 'medium'),
    low: report.issues.filter(i => i.severity === 'low'),
  }

  Object.entries(bySeverity).forEach(([severity, issues]) => {
    if (issues.length > 0) {
      output += `\n${severity.toUpperCase()} (${issues.length}):\n`
      issues.slice(0, 5).forEach((issue, index) => {
        output += `  ${index + 1}. [${issue.type}] ${issue.description}\n`
        output += `     💡 ${issue.suggestion}\n`
        if (issue.autoFixable) {
          output += `     ✅ Auto-fixable\n`
        }
      })
      if (issues.length > 5) {
        output += `  ... and ${issues.length - 5} more\n`
      }
    }
  })

  if (report.recommendations.length > 0) {
    output += `\n📋 Recommendations:\n`
    report.recommendations.forEach((rec, index) => {
      output += `  ${index + 1}. ${rec}\n`
    })
  }

  return output
}

/**
 * Main mobile optimizer function
 */
export function optimizeMobile(): MobileReport {
  if (typeof window === 'undefined') {
    console.log('📱 Mobile Optimizer: Running in server environment, skipping analysis')
    return {
      timestamp: new Date().toISOString(),
      deviceType: 'desktop',
      viewport: { width: 0, height: 0 },
      issues: [],
      performance: {},
      recommendations: [],
      score: 100,
    }
  }

  console.log('📱 Mobile Optimizer: Analyzing mobile design and performance...')
  const report = generateMobileReport()
  console.log(formatMobileReport(report))
  return report
}

/**
 * Audit a specific page for mobile UX/UI and performance issues
 */
export function auditPage(pagePath: string = 'current'): MobileReport {
  if (typeof window === 'undefined') {
    console.log(`📱 Mobile Optimizer: Auditing page "${pagePath}" (server-side, will run on client)`)
    return {
      timestamp: new Date().toISOString(),
      deviceType: 'desktop',
      viewport: { width: 0, height: 0 },
      issues: [],
      performance: {},
      recommendations: [],
      score: 100,
    }
  }

  console.log(`📱 Mobile Optimizer: Running comprehensive audit for "${pagePath}"...`)
  const report = generateMobileReport()
  
  // Enhanced analysis for specific page types
  if (pagePath.includes('hero') || pagePath === '/') {
    analyzeHeroSection(report)
  }
  if (pagePath.includes('case-studies')) {
    analyzeCaseStudyPage(report)
  }
  if (pagePath.includes('visuals') || pagePath.includes('photography')) {
    analyzeGalleryPage(report)
  }

  console.log(formatMobileReport(report))
  return report
}

/**
 * Analyze hero section specifically
 */
function analyzeHeroSection(report: MobileReport): void {
  const hero = document.querySelector('.hero')
  if (!hero) return

  const heroContent = hero.querySelector('.hero__content')
  if (heroContent) {
    const styles = window.getComputedStyle(heroContent)
    const fontSize = parseFloat(styles.fontSize)
    
    // Check if hero text is readable on mobile
    if (fontSize < 24 && window.innerWidth < 768) {
      report.issues.push({
        type: 'font-size',
        severity: 'medium',
        element: 'hero__content',
        description: `Hero text may be too small on mobile (${fontSize}px). Consider larger font for impact.`,
        suggestion: 'Increase hero font size on mobile for better readability and impact',
        autoFixable: false,
        currentValue: fontSize,
        recommendedValue: 32,
      })
    }
  }

  // Check CTA buttons
  const ctas = hero.querySelectorAll('.hero__cta')
  ctas.forEach((cta) => {
    if (cta instanceof HTMLElement) {
      const rect = cta.getBoundingClientRect()
      if (rect.height < MOBILE_STANDARDS.buttonMinHeight) {
        report.issues.push({
          type: 'touch-target',
          severity: 'high',
          element: 'hero__cta',
          description: `Hero CTA button height (${Math.round(rect.height)}px) is below recommended minimum (${MOBILE_STANDARDS.buttonMinHeight}px)`,
          suggestion: `Increase button min-height to ${MOBILE_STANDARDS.buttonMinHeight}px for better mobile usability`,
          autoFixable: true,
          currentValue: Math.round(rect.height),
          recommendedValue: MOBILE_STANDARDS.buttonMinHeight,
        })
      }
    }
  })
}

/**
 * Analyze case study pages
 */
function analyzeCaseStudyPage(report: MobileReport): void {
  // Check image loading
  const images = document.querySelectorAll('.case-study-section img')
  images.forEach((img) => {
    if (img instanceof HTMLImageElement && !img.loading) {
      report.issues.push({
        type: 'image',
        severity: 'medium',
        element: 'img',
        description: 'Case study images missing lazy loading',
        suggestion: 'Add loading="lazy" to images below the fold',
        autoFixable: true,
      })
    }
  })

  // Check text readability
  const textBlocks = document.querySelectorAll('.case-study-section p')
  textBlocks.forEach((p) => {
    if (p instanceof HTMLElement) {
      const styles = window.getComputedStyle(p)
      const lineHeight = parseFloat(styles.lineHeight)
      const fontSize = parseFloat(styles.fontSize)
      
      if (lineHeight / fontSize < 1.5) {
        report.issues.push({
          type: 'spacing',
          severity: 'low',
          element: 'p',
          description: `Line height (${lineHeight}px) may be too tight for mobile reading`,
          suggestion: 'Increase line-height to at least 1.5× font-size for better mobile readability',
          autoFixable: false,
        })
      }
    }
  })
}

/**
 * Analyze gallery pages
 */
function analyzeGalleryPage(report: MobileReport): void {
  // Check touch interactions
  const interactiveElements = document.querySelectorAll('.visuals-card, .photography-card')
  interactiveElements.forEach((el) => {
    if (el instanceof HTMLElement) {
      const rect = el.getBoundingClientRect()
      if (rect.width < 200 && window.innerWidth < 768) {
        report.issues.push({
          type: 'layout',
          severity: 'medium',
          element: 'gallery-card',
          description: `Gallery cards may be too narrow on mobile (${Math.round(rect.width)}px)`,
          suggestion: 'Consider full-width cards on mobile for better touch targets',
          autoFixable: false,
        })
      }
    }
  })
}

/**
 * Initialize mobile optimizer bot
 */
export function initMobileOptimizer() {
  if (typeof window === 'undefined') {
    console.log('📱 Mobile Optimizer Bot initialized')
    console.log('   Proactively monitors and improves mobile design and performance')
  } else {
    // Run initial analysis
    const currentPath = window.location.pathname
    auditPage(currentPath)
    
    // Monitor on resize
    let resizeTimeout: NodeJS.Timeout
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        const path = window.location.pathname
        auditPage(path)
      }, 500)
    }, { passive: true })

    // Monitor route changes (Next.js)
    if (typeof window !== 'undefined') {
      let lastPath = window.location.pathname
      const checkRoute = () => {
        if (window.location.pathname !== lastPath) {
          lastPath = window.location.pathname
          setTimeout(() => auditPage(lastPath), 1000) // Wait for page to render
        }
      }
      setInterval(checkRoute, 500)
    }
  }
}

// Auto-initialize if running in Node.js
if (typeof window === 'undefined' && typeof process !== 'undefined') {
  initMobileOptimizer()
}

