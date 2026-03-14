#!/usr/bin/env node

/**
 * Deployment Verification Script
 * Checks that all critical files and configurations are in place
 */

const fs = require('fs')
const path = require('path')

const checks = {
  passed: [],
  failed: [],
}

function checkFile(filePath, description) {
  const fullPath = path.join(process.cwd(), filePath)
  if (fs.existsSync(fullPath)) {
    checks.passed.push(`✅ ${description}`)
    return true
  } else {
    checks.failed.push(`❌ ${description} - Missing: ${filePath}`)
    return false
  }
}

function checkDirectory(dirPath, description) {
  const fullPath = path.join(process.cwd(), dirPath)
  if (fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory()) {
    checks.passed.push(`✅ ${description}`)
    return true
  } else {
    checks.failed.push(`❌ ${description} - Missing: ${dirPath}`)
    return false
  }
}

console.log('🔍 Verifying deployment readiness...\n')

// Critical files
checkFile('package.json', 'package.json exists')
checkFile('next.config.js', 'next.config.js exists')
checkFile('railway.json', 'railway.json exists')
checkFile('tsconfig.json', 'tsconfig.json exists')
checkFile('.gitignore', '.gitignore exists')
checkFile('.nvmrc', 'Node version specified')

// Essential directories
checkDirectory('app', 'app directory exists')
checkDirectory('components', 'components directory exists')
checkDirectory('public', 'public directory exists')
checkDirectory('styles', 'styles directory exists')

// Critical app files
checkFile('app/layout.tsx', 'Root layout exists')
checkFile('app/page.tsx', 'Homepage exists')
checkFile('app/robots.ts', 'robots.txt generator exists')
checkFile('app/sitemap.ts', 'sitemap generator exists')

// Image directories
checkDirectory('public/images/case-studies', 'Case studies images directory')
checkDirectory('public/images/photography', 'Photography images directory')
checkDirectory('public/images/visuals', 'Visuals images directory')

// Results
console.log('\n📊 Results:\n')
console.log(`✅ Passed: ${checks.passed.length}`)
console.log(`❌ Failed: ${checks.failed.length}\n`)

if (checks.passed.length > 0) {
  console.log('Passed checks:')
  checks.passed.forEach((check) => console.log(`  ${check}`))
}

if (checks.failed.length > 0) {
  console.log('\nFailed checks:')
  checks.failed.forEach((check) => console.log(`  ${check}`))
  process.exit(1)
} else {
  console.log('\n🎉 All checks passed! Ready for deployment.')
  process.exit(0)
}

