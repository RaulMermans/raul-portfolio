#!/usr/bin/env node

/**
 * Bot Status Checker
 * Checks the status of all automated bots
 */

const https = require('https')
const http = require('http')

const port = process.env.PORT || 3000
const url = `http://localhost:${port}/api/bot/status`

console.log('🤖 Checking Bot Status...\n')
console.log(`Connecting to: ${url}\n`)

const request = http.get(url, (res) => {
  let data = ''

  res.on('data', (chunk) => {
    data += chunk
  })

  res.on('end', () => {
    try {
      const result = JSON.parse(data)
      
      if (result.success) {
        console.log('✅ All bots are active!\n')
        
        console.log('📊 Performance Bot:')
        console.log(`   Score: ${result.bots.performance.score}/100`)
        if (result.bots.performance.metrics.lcp) {
          console.log(`   LCP: ${result.bots.performance.metrics.lcp.toFixed(0)}ms`)
        }
        if (result.bots.performance.metrics.fid) {
          console.log(`   FID: ${result.bots.performance.metrics.fid.toFixed(0)}ms`)
        }
        if (result.bots.performance.metrics.cls) {
          console.log(`   CLS: ${result.bots.performance.metrics.cls.toFixed(3)}`)
        }
        if (result.bots.performance.recommendations.length > 0) {
          console.log(`   Recommendations: ${result.bots.performance.recommendations.length}`)
        }
        
        console.log('\n💾 Cache Bot:')
        console.log(`   Active: ${result.bots.cache.active}`)
        console.log(`   Cache Size: ${result.bots.cache.size} entries`)
        
        console.log('\n🚨 Error Bot:')
        console.log(`   Active: ${result.bots.error.active}`)
        console.log(`   Total Errors: ${result.bots.error.totalErrors}`)
        console.log(`   Recent Errors: ${result.bots.error.recentErrors}`)
        
        console.log('\n✨ All systems operational!\n')
      } else {
        console.error('❌ Error:', result.error)
        process.exit(1)
      }
    } catch (error) {
      console.error('❌ Failed to parse response:', error.message)
      console.log('Raw response:', data)
      process.exit(1)
    }
  })
})

request.on('error', (error) => {
  console.error('❌ Connection error:', error.message)
  console.log('\n💡 Make sure the development server is running:')
  console.log('   npm run dev\n')
  process.exit(1)
})

request.setTimeout(5000, () => {
  request.destroy()
  console.error('❌ Request timeout')
  console.log('\n💡 Make sure the development server is running:')
  console.log('   npm run dev\n')
  process.exit(1)
})

