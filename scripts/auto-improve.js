/**
 * Auto Improve Script
 * Command-line tool for automatic department deployment
 * 
 * Usage:
 *   node scripts/auto-improve.js "improve the mobile experience"
 *   node scripts/auto-improve.js "fix spacing issues"
 *   node scripts/auto-improve.js "check performance"
 */

const { autoCoordinator } = require('../lib/departments/auto-coordinator')

async function main() {
  const request = process.argv.slice(2).join(' ')

  if (!request) {
    console.log('Usage: node scripts/auto-improve.js "<your request>"')
    console.log('\nExamples:')
    console.log('  node scripts/auto-improve.js "improve mobile experience"')
    console.log('  node scripts/auto-improve.js "fix spacing issues"')
    console.log('  node scripts/auto-improve.js "check performance"')
    console.log('  node scripts/auto-improve.js "improve accessibility"')
    process.exit(1)
  }

  console.log('🚀 Auto Coordinator - Automatic Department Deployment\n')
  console.log(`📝 Request: "${request}"\n`)
  console.log('=' .repeat(60) + '\n')

  try {
    const result = await autoCoordinator.handleRequest(request)

    console.log('\n' + '='.repeat(60))
    console.log('\n📊 Summary:\n')
    console.log(`   Departments Deployed: ${result.summary.departmentsDeployed.join(', ')}`)
    console.log(`   Total Actions: ${result.summary.totalActions}`)
    console.log(`   Successful: ${result.summary.successfulActions}`)
    console.log(`   Failed: ${result.summary.failedActions}`)

    if (result.summary.recommendations.length > 0) {
      console.log('\n💡 Recommendations:')
      result.summary.recommendations.forEach(rec => {
        console.log(`   - ${rec}`)
      })
    }

    if (result.results.length > 0) {
      console.log('\n📋 Detailed Results:')
      result.results.forEach((res, i) => {
        console.log(`\n   ${i + 1}. ${res.department.toUpperCase()} - ${res.action}`)
        console.log(`      Status: ${res.success ? '✅ Success' : '❌ Failed'}`)
        if (res.changes.length > 0) {
          console.log(`      Changes:`)
          res.changes.forEach(change => {
            console.log(`         - ${change}`)
          })
        }
        if (res.errors && res.errors.length > 0) {
          console.log(`      Errors:`)
          res.errors.forEach(error => {
            console.log(`         - ${error}`)
          })
        }
      })
    }

    console.log('\n' + '='.repeat(60))
    console.log('\n✅ Auto coordination complete!\n')

  } catch (error) {
    console.error('\n❌ Error:', error.message)
    process.exit(1)
  }
}

if (require.main === module) {
  main()
}

module.exports = { main }

