/**
 * Comprehensive UX/UI Audit
 * Runs full audit on entire website and identifies issues
 */

const fs = require('fs')
const path = require('path')

function auditCSS() {
  const cssPath = path.join(__dirname, '../styles/globals.css')
  const css = fs.readFileSync(cssPath, 'utf-8')
  
  const issues = {
    overlapping: [],
    zIndex: [],
    layout: [],
    spacing: [],
    responsive: [],
    accessibility: [],
  }

  // Check for z-index conflicts
  const zIndexRegex = /z-index:\s*(\d+)/g
  const zIndexValues = new Set()
  let match
  while ((match = zIndexRegex.exec(css)) !== null) {
    zIndexValues.add(parseInt(match[1]))
  }
  if (zIndexValues.size > 20) {
    issues.zIndex.push(`Too many z-index values (${zIndexValues.size}) - potential conflicts`)
  }

  // Check for overlapping elements (position: absolute/fixed without proper containment)
  const absoluteFixedRegex = /position:\s*(absolute|fixed)/g
  const absoluteFixedCount = (css.match(absoluteFixedRegex) || []).length
  if (absoluteFixedCount > 30) {
    issues.overlapping.push(`Many absolute/fixed elements (${absoluteFixedCount}) - check for overlaps`)
  }

  // Check for overflow issues
  const overflowHiddenRegex = /overflow:\s*hidden/g
  const overflowCount = (css.match(overflowHiddenRegex) || []).length
  if (overflowCount > 50) {
    issues.layout.push(`Many overflow:hidden (${overflowCount}) - may hide content`)
  }

  // Check for spacing inconsistencies
  const hardcodedSpacing = (css.match(/(?:margin|padding|gap):\s*\d+px/g) || []).length
  if (hardcodedSpacing > 20) {
    issues.spacing.push(`${hardcodedSpacing} hardcoded spacing values - use CSS variables`)
  }

  // Check for responsive issues
  const mediaQueries = (css.match(/@media/g) || []).length
  if (mediaQueries < 5) {
    issues.responsive.push(`Only ${mediaQueries} media queries - may need more breakpoints`)
  }

  // Check for accessibility
  const focusStates = (css.match(/:focus/g) || []).length
  if (focusStates < 10) {
    issues.accessibility.push(`Only ${focusStates} focus states - need more for keyboard navigation`)
  }

  return issues
}

function auditComponents() {
  const componentsPath = path.join(__dirname, '../components')
  const components = fs.readdirSync(componentsPath).filter(f => f.endsWith('.tsx'))
  
  const issues = {
    missingAria: [],
    missingFocus: [],
    touchTargets: [],
  }

  components.forEach(component => {
    const content = fs.readFileSync(path.join(componentsPath, component), 'utf-8')
    
    // Check for missing aria labels
    if (content.includes('<button') && !content.includes('aria-label') && !content.includes('aria-labelledby')) {
      issues.missingAria.push(`${component}: buttons missing aria labels`)
    }
    
    // Check for touch targets
    if (content.includes('<button') || content.includes('<a')) {
      // Would need to check CSS for min-height: 44px
    }
  })

  return issues
}

function runAudit() {
  console.log('🔍 Comprehensive UX/UI Audit\n')
  console.log('=' .repeat(60) + '\n')

  const cssIssues = auditCSS()
  const componentIssues = auditComponents()

  console.log('📊 CSS Issues:\n')
  Object.entries(cssIssues).forEach(([category, items]) => {
    if (items.length > 0) {
      console.log(`   ${category.toUpperCase()}:`)
      items.forEach(item => console.log(`      - ${item}`))
      console.log('')
    }
  })

  console.log('📦 Component Issues:\n')
  Object.entries(componentIssues).forEach(([category, items]) => {
    if (items.length > 0) {
      console.log(`   ${category.toUpperCase()}:`)
      items.forEach(item => console.log(`      - ${item}`))
      console.log('')
    }
  })

  const totalIssues = Object.values(cssIssues).flat().length + Object.values(componentIssues).flat().length
  
  console.log('='.repeat(60))
  console.log(`\n📈 Total Issues Found: ${totalIssues}\n`)

  return { cssIssues, componentIssues, totalIssues }
}

if (require.main === module) {
  runAudit()
}

module.exports = { runAudit, auditCSS, auditComponents }

