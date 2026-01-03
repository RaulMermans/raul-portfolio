/**
 * Suggest Improvements Script
 * Analyzes current state and suggests improvements
 * 
 * Usage:
 *   node scripts/suggest-improvements.js
 */

const { autoCoordinator } = require('../lib/departments/auto-coordinator')

async function main() {
  console.log('💡 Smart Improvement Suggestions\n')
  console.log('Analyzing current state...\n')
  console.log('=' .repeat(60) + '\n')

  try {
    // Get quick status
    const status = await autoCoordinator.getQuickStatus()
    
    console.log('📊 Department Status:\n')
    console.log(`   Developer: ${status.developer.healthy ? '✅ Healthy' : '⚠️  Issues'} (${status.developer.issues} issues)`)
    console.log(`   Design: ${status.design.healthy ? '✅ Healthy' : '⚠️  Issues'} (${status.design.issues} issues)`)
    console.log(`   Management: ${status.management.healthy ? '✅ Healthy' : '⚠️  Issues'} (${status.management.issues} issues)`)
    console.log(`\n   Overall: ${status.overall.healthy ? '✅ Healthy' : '⚠️  Issues'} (${status.overall.totalIssues} total issues)`)

    // Get suggestions
    const suggestions = await autoCoordinator.suggestImprovements()

    console.log('\n' + '='.repeat(60))
    console.log('\n💡 Suggested Improvements:\n')

    if (suggestions.length === 0) {
      console.log('   ✅ No issues detected! Everything looks good.\n')
    } else {
      suggestions.forEach((suggestion, i) => {
        console.log(`   ${i + 1}. ${suggestion}`)
      })
      console.log('\n   Run: node scripts/auto-improve.js "<suggestion>" to address\n')
    }

    console.log('='.repeat(60) + '\n')

  } catch (error) {
    console.error('\n❌ Error:', error.message)
    process.exit(1)
  }
}

if (require.main === module) {
  main()
}

module.exports = { main }

