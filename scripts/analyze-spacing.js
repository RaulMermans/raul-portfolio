#!/usr/bin/env node

/**
 * Spacing Analysis Script
 * Uses Design Department to analyze and fix spacing issues in CSS files
 */

const fs = require('fs')
const path = require('path')

const CSS_FILES = [
  'styles/case-study-new.css',
  'styles/globals.css'
]

// Analyze CSS for spacing issues
function analyzeSpacing(cssContent) {
  const issues = {
    negativeSpacing: [],
    excessiveSpacing: [],
    inconsistentSpacing: [],
    recommendations: []
  }

  // Find negative margins/padding
  const negativePattern = /(?:margin|padding|gap|top|bottom|left|right):\s*-?\d+(?:px|rem|em|vh|vw|%)/g
  const lines = cssContent.split('\n')
  
  lines.forEach((line, index) => {
    const lineNum = index + 1
    const trimmed = line.trim()
    
    // Check for negative values (excluding intentional -1px for visually-hidden)
    if (negativePattern.test(trimmed) && !trimmed.includes('visually-hidden')) {
      const match = trimmed.match(/(?:margin|padding|gap|top|bottom|left|right):\s*-(\d+)/)
      if (match) {
        issues.negativeSpacing.push({
          line: lineNum,
          content: trimmed,
          value: match[1]
        })
      }
    }
    
    // Check for excessive spacing (XL spacing used too frequently)
    if (trimmed.includes('space-xl') && trimmed.includes('padding')) {
      issues.excessiveSpacing.push({
        line: lineNum,
        content: trimmed,
        note: 'XL spacing in padding - consider if this creates too much vertical space'
      })
    }
    
    // Check for hardcoded spacing that should use variables
    if (/(?:margin|padding):\s*\d+px/.test(trimmed) && !trimmed.includes('clamp')) {
      issues.inconsistentSpacing.push({
        line: lineNum,
        content: trimmed,
        note: 'Hardcoded spacing value - should use CSS variable'
      })
    }
  })

  // Generate recommendations
  if (issues.negativeSpacing.length > 0) {
    issues.recommendations.push(
      `Found ${issues.negativeSpacing.length} negative spacing value(s) - review for intentional use`
    )
  }
  
  if (issues.excessiveSpacing.length > 3) {
    issues.recommendations.push(
      `Found ${issues.excessiveSpacing.length} instances of XL spacing - consider reducing for better vertical rhythm`
    )
  }
  
  if (issues.inconsistentSpacing.length > 0) {
    issues.recommendations.push(
      `Found ${issues.inconsistentSpacing.length} hardcoded spacing value(s) - standardize using CSS variables`
    )
  }

  return issues
}

// Fix spacing issues
function fixSpacing(cssContent, issues) {
  let fixed = cssContent
  const fixes = []

  // Fix negative spacing (remove if not intentional)
  issues.negativeSpacing.forEach(issue => {
    // Skip if it's a positioning trick or intentional
    if (issue.content.includes('top: -') && issue.content.includes('image')) {
      // Likely intentional for image positioning
      return
    }
    
    // For other cases, we'll note but not auto-fix without context
    fixes.push({
      line: issue.line,
      original: issue.content,
      note: 'Review negative spacing - may be intentional for layout'
    })
  })

  // Reduce excessive XL spacing in some contexts
  if (issues.excessiveSpacing.length > 3) {
    // Only reduce padding, not margins
    const xlPaddingPattern = /padding:\s*var\(--case-study-space-xl\)/g
    let count = 0
    fixed = fixed.replace(xlPaddingPattern, (match, offset) => {
      if (count < 2) {
        // Keep first 2 as they're likely major section breaks
        count++
        return match
      }
      // Replace with lg for less excessive spacing
      return match.replace('space-xl', 'space-lg')
    })
    
    if (count > 2) {
      fixes.push({
        note: `Reduced ${count - 2} excessive XL padding values to LG for better spacing`
      })
    }
  }

  return { fixed, fixes }
}

// Main analysis
function main() {
  console.log('🔍 Analyzing spacing issues using Design Department...\n')
  
  const allIssues = {}
  const allFixes = []

  CSS_FILES.forEach(filePath => {
    const fullPath = path.join(process.cwd(), filePath)
    
    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  File not found: ${filePath}`)
      return
    }

    console.log(`📄 Analyzing: ${filePath}`)
    const content = fs.readFileSync(fullPath, 'utf-8')
    const issues = analyzeSpacing(content)
    allIssues[filePath] = issues

    // Report issues
    if (issues.negativeSpacing.length > 0) {
      console.log(`  ❌ Negative spacing: ${issues.negativeSpacing.length} issue(s)`)
      issues.negativeSpacing.slice(0, 3).forEach(issue => {
        console.log(`     Line ${issue.line}: ${issue.content.substring(0, 60)}...`)
      })
    }

    if (issues.excessiveSpacing.length > 0) {
      console.log(`  ⚠️  Excessive spacing: ${issues.excessiveSpacing.length} instance(s)`)
    }

    if (issues.inconsistentSpacing.length > 0) {
      console.log(`  📝 Inconsistent spacing: ${issues.inconsistentSpacing.length} hardcoded value(s)`)
    }

    // Apply fixes
    if (issues.recommendations.length > 0) {
      const { fixed, fixes } = fixSpacing(content, issues)
      
      if (fixes.length > 0) {
        fs.writeFileSync(fullPath, fixed, 'utf-8')
        console.log(`  ✅ Applied ${fixes.length} fix(es)`)
        allFixes.push(...fixes)
      } else {
        console.log(`  ✓ No automatic fixes needed`)
      }

      // Show recommendations
      issues.recommendations.forEach(rec => {
        console.log(`  💡 ${rec}`)
      })
    } else {
      console.log(`  ✓ No spacing issues found`)
    }
    
    console.log('')
  })

  // Summary
  const totalIssues = Object.values(allIssues).reduce((sum, issues) => {
    return sum + issues.negativeSpacing.length + issues.inconsistentSpacing.length
  }, 0)

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log(`📊 Summary:`)
  console.log(`   Total issues found: ${totalIssues}`)
  console.log(`   Fixes applied: ${allFixes.length}`)
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  if (totalIssues === 0 && allFixes.length === 0) {
    console.log('✅ All spacing looks good!')
  }
}

main()

