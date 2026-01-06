/**
 * DETECTIVE INVESTIGATION: Spacing Issues in Case Studies
 * 
 * Hypothesis-based investigation to find the root cause of huge gaps
 */

const fs = require('fs')
const path = require('path')

const cssFile = path.join(__dirname, '../styles/case-study-new.css')
const css = fs.readFileSync(cssFile, 'utf8')

console.log('🔍 DETECTIVE BOT: SPACING INVESTIGATION')
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

const hypotheses = [
  {
    name: 'min-height on .case-study-next-new creates huge space',
    pattern: /\.case-study-next-new\s*\{[^}]*min-height:\s*(\d+vh)/s,
    severity: 'critical',
    evidence: [],
    solution: 'Remove or reduce min-height: 60vh to auto or smaller value',
  },
  {
    name: 'min-height on image containers creates gaps',
    pattern: /min-height:\s*(\d+px)/g,
    severity: 'high',
    evidence: [],
    solution: 'Review all min-height values and remove when not needed',
  },
  {
    name: 'Large padding values accumulating',
    pattern: /padding:\s*var\(--case-study-space-(xl|lg)\)/g,
    severity: 'medium',
    evidence: [],
    solution: 'Reduce padding values, especially between adjacent sections',
  },
  {
    name: 'Margin-bottom values creating gaps',
    pattern: /margin-bottom:\s*var\(--case-study-space-(xl|lg|md)\)/g,
    severity: 'medium',
    evidence: [],
    solution: 'Reduce margin-bottom values',
  },
]

console.log('📋 TESTING HYPOTHESES:\n')

hypotheses.forEach((hypothesis, index) => {
  console.log(`${index + 1}. ${hypothesis.name}`)
  
  if (hypothesis.pattern.global) {
    // For global patterns, find all matches
    const matches = [...css.matchAll(hypothesis.pattern)]
    if (matches.length > 0) {
      matches.forEach((match, i) => {
        // Find context around the match
        const matchIndex = match.index
        const before = css.substring(Math.max(0, matchIndex - 100), matchIndex)
        const after = css.substring(matchIndex, Math.min(css.length, matchIndex + 100))
        
        // Extract class name if possible
        const beforeLines = before.split('\n')
        const classLine = beforeLines[beforeLines.length - 1].trim()
        
        hypothesis.evidence.push({
          match: match[0],
          value: match[1] || match[2] || 'found',
          context: classLine,
          position: `Around line ${css.substring(0, matchIndex).split('\n').length}`,
        })
      })
      
      console.log(`   ✅ CONFIRMED: Found ${matches.length} occurrence(s)`)
      hypothesis.evidence.forEach((ev, i) => {
        console.log(`      ${i + 1}. ${ev.match} - ${ev.position}`)
        if (ev.context) {
          console.log(`         Context: ${ev.context.substring(0, 60)}...`)
        }
      })
      console.log(`   🎯 Solution: ${hypothesis.solution}\n`)
    } else {
      console.log(`   ❌ NOT FOUND\n`)
    }
  } else {
    // For single-match patterns
    const match = css.match(hypothesis.pattern)
    if (match) {
      const matchIndex = match.index
      const before = css.substring(Math.max(0, matchIndex - 150), matchIndex)
      const after = css.substring(matchIndex, Math.min(css.length, matchIndex + 150))
      
      const beforeLines = before.split('\n')
      const context = beforeLines.slice(-3).join('\n') + '\n' + match[0] + '\n' + after.split('\n').slice(0, 3).join('\n')
      
      hypothesis.evidence.push({
        match: match[0],
        value: match[1],
        context: context,
        position: `Line ${css.substring(0, matchIndex).split('\n').length}`,
      })
      
      console.log(`   ✅ CONFIRMED: ${match[0]}`)
      console.log(`   🎯 Solution: ${hypothesis.solution}\n`)
    } else {
      console.log(`   ❌ NOT FOUND\n`)
    }
  }
})

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
console.log('📊 SUMMARY OF FINDINGS:\n')

const confirmedHypotheses = hypotheses.filter(h => h.evidence.length > 0)

if (confirmedHypotheses.length === 0) {
  console.log('⚠️  No issues found with current hypotheses. Need to investigate further.')
} else {
  confirmedHypotheses.forEach((hyp, index) => {
    console.log(`${index + 1}. [${hyp.severity.toUpperCase()}] ${hyp.name}`)
    console.log(`   Issues: ${hyp.evidence.length}`)
    console.log(`   Fix: ${hyp.solution}\n`)
  })
  
  console.log('🎯 RECOMMENDED FIXES:\n')
  
  // Priority fixes
  const critical = confirmedHypotheses.filter(h => h.severity === 'critical')
  if (critical.length > 0) {
    console.log('🚨 CRITICAL (Fix immediately):')
    critical.forEach((hyp, i) => {
      console.log(`   ${i + 1}. ${hyp.solution}`)
    })
    console.log('')
  }
  
  const high = confirmedHypotheses.filter(h => h.severity === 'high')
  if (high.length > 0) {
    console.log('⚠️  HIGH PRIORITY:')
    high.forEach((hyp, i) => {
      console.log(`   ${i + 1}. ${hyp.solution}`)
    })
    console.log('')
  }
}

// Additional analysis: Find all min-height occurrences
console.log('\n📋 ALL min-height VALUES FOUND:\n')
const minHeightPattern = /min-height:\s*([^;]+);/g
const minHeights = [...css.matchAll(minHeightPattern)]
minHeights.forEach((match, i) => {
  const matchIndex = match.index
  const before = css.substring(Math.max(0, matchIndex - 200), matchIndex)
  const selector = before.split('{').pop().split('\n').filter(l => l.trim()).pop()?.trim() || 'unknown'
  console.log(`${i + 1}. ${selector}: ${match[1].trim()}`)
})

