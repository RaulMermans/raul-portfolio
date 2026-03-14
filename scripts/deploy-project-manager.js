#!/usr/bin/env node

/**
 * Project Manager Deployment Script
 * Orchestrates audit improvements and delegates tasks to departments
 */

const { orchestrateRequest } = require('../lib/project-manager')
const { autoCoordinator } = require('../lib/departments')

async function deployProjectManager() {
  console.log('🚀 Deploying Project Manager...\n')

  // Main request: Improve on all audit findings
  const mainRequest = `
    Improve on all audit findings:
    - Fix security issues (rate limiting, console.log removal)
    - Add accessibility improvements (skip links, alt text)
    - Optimize performance (lazy loading, constants)
    - Improve code quality (logger utility, env validation)
    - Clean up codebase
  `

  console.log('📋 Analyzing request...')
  const analysis = orchestrateRequest(mainRequest)
  
  console.log('\n🎯 Delegating tasks to departments...\n')
  
  // Delegate to auto coordinator
  try {
    const result = await autoCoordinator.handleRequest(mainRequest)
    
    console.log('\n✅ Project Manager Deployment Complete!\n')
    console.log('📊 Summary:')
    console.log(`   Departments Deployed: ${result.summary.departmentsDeployed.join(', ')}`)
    console.log(`   Total Actions: ${result.summary.totalActions}`)
    console.log(`   Successful: ${result.summary.successfulActions}`)
    console.log(`   Failed: ${result.summary.failedActions}`)
    
    if (result.summary.recommendations.length > 0) {
      console.log('\n💡 Recommendations:')
      result.summary.recommendations.forEach(rec => {
        console.log(`   • ${rec}`)
      })
    }
    
    return result
  } catch (error) {
    console.error('❌ Error during deployment:', error)
    throw error
  }
}

// Run if called directly
if (require.main === module) {
  deployProjectManager()
    .then(() => {
      console.log('\n✨ All tasks completed!')
      process.exit(0)
    })
    .catch((error) => {
      console.error('\n❌ Deployment failed:', error)
      process.exit(1)
    })
}

module.exports = { deployProjectManager }

