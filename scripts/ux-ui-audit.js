/**
 * UX/UI Audit Script
 * Uses Developer and Design Departments to analyze and improve UX/UI
 */

const fs = require('fs')
const path = require('path')

// Analyze CSS for UX/UI issues
function analyzeCSS() {
  const cssPath = path.join(__dirname, '../styles/globals.css')
  const css = fs.readFileSync(cssPath, 'utf-8')
  
  const issues = {
    spacing: [],
    typography: [],
    colors: [],
    accessibility: [],
    responsive: [],
    performance: [],
  }

  // Check for spacing inconsistencies
  const spacingRegex = /(?:margin|padding|gap):\s*([^;]+);/g
  const spacingValues = new Set()
  let match
  while ((match = spacingRegex.exec(css)) !== null) {
    spacingValues.add(match[1].trim())
  }
  if (spacingValues.size > 30) {
    issues.spacing.push(`Too many unique spacing values (${spacingValues.size}) - standardize using CSS variables`)
  }

  // Check for typography inconsistencies
  const fontSizeRegex = /font-size:\s*([^;]+);/g
  const fontSizes = new Set()
  while ((match = fontSizeRegex.exec(css)) !== null) {
    fontSizes.add(match[1].trim())
  }
  if (fontSizes.size > 20) {
    issues.typography.push(`Too many font sizes (${fontSizes.size}) - use a type scale`)
  }

  // Check for color inconsistencies
  const colorRegex = /(?:color|background|border-color):\s*([^;]+);/g
  const colors = new Set()
  while ((match = colorRegex.exec(css)) !== null) {
    const color = match[1].trim()
    if (!color.startsWith('var(--')) {
      colors.add(color)
    }
  }
  if (colors.size > 15) {
    issues.colors.push(`Too many hardcoded colors (${colors.size}) - use CSS variables`)
  }

  // Check for accessibility issues
  if (!css.includes('min-height: 44px') && !css.includes('min-height:44px')) {
    issues.accessibility.push('Missing minimum touch target size (44px) for interactive elements')
  }
  if (!css.includes('focus') && !css.includes(':focus')) {
    issues.accessibility.push('Missing focus states for keyboard navigation')
  }

  // Check for responsive design
  const mediaQueries = (css.match(/@media/g) || []).length
  if (mediaQueries < 3) {
    issues.responsive.push('Insufficient media queries - ensure mobile, tablet, and desktop breakpoints')
  }

  // Check for performance issues
  if (css.includes('!important')) {
    const importantCount = (css.match(/!important/g) || []).length
    if (importantCount > 50) {
      issues.performance.push(`Too many !important flags (${importantCount}) - refactor CSS specificity`)
    }
  }

  return issues
}

// Generate recommendations
function generateRecommendations(issues) {
  const recommendations = []

  if (issues.spacing.length > 0) {
    recommendations.push({
      priority: 'high',
      category: 'spacing',
      action: 'Standardize spacing using CSS variables (--space-*)',
      issues: issues.spacing,
    })
  }

  if (issues.typography.length > 0) {
    recommendations.push({
      priority: 'high',
      category: 'typography',
      action: 'Implement a consistent type scale',
      issues: issues.typography,
    })
  }

  if (issues.colors.length > 0) {
    recommendations.push({
      priority: 'medium',
      category: 'colors',
      action: 'Replace hardcoded colors with CSS variables',
      issues: issues.colors,
    })
  }

  if (issues.accessibility.length > 0) {
    recommendations.push({
      priority: 'high',
      category: 'accessibility',
      action: 'Add missing accessibility features',
      issues: issues.accessibility,
    })
  }

  if (issues.responsive.length > 0) {
    recommendations.push({
      priority: 'high',
      category: 'responsive',
      action: 'Improve responsive design coverage',
      issues: issues.responsive,
    })
  }

  if (issues.performance.length > 0) {
    recommendations.push({
      priority: 'medium',
      category: 'performance',
      action: 'Optimize CSS for better performance',
      issues: issues.performance,
    })
  }

  return recommendations
}

// Main audit function
function runAudit() {
  console.log('🔍 Running UX/UI Audit...\n')
  
  const issues = analyzeCSS()
  const recommendations = generateRecommendations(issues)

  console.log('📊 Audit Results:\n')
  console.log(`Spacing Issues: ${issues.spacing.length}`)
  console.log(`Typography Issues: ${issues.typography.length}`)
  console.log(`Color Issues: ${issues.colors.length}`)
  console.log(`Accessibility Issues: ${issues.accessibility.length}`)
  console.log(`Responsive Issues: ${issues.responsive.length}`)
  console.log(`Performance Issues: ${issues.performance.length}\n`)

  console.log('💡 Recommendations:\n')
  recommendations.forEach((rec, i) => {
    console.log(`${i + 1}. [${rec.priority.toUpperCase()}] ${rec.category.toUpperCase()}`)
    console.log(`   Action: ${rec.action}`)
    rec.issues.forEach(issue => console.log(`   - ${issue}`))
    console.log('')
  })

  return { issues, recommendations }
}

if (require.main === module) {
  runAudit()
}

module.exports = { runAudit, analyzeCSS, generateRecommendations }

