#!/usr/bin/env node

/**
 * Case Study Image Validator
 * 
 * Validates that all required images exist for a case study
 * 
 * Usage:
 *   node scripts/validate-case-study-images.js ai-sports
 */

const fs = require('fs')
const path = require('path')

const caseStudyId = process.argv[2]

if (!caseStudyId) {
  console.error('❌ Please provide a case study ID')
  console.log('Usage: node scripts/validate-case-study-images.js <case-study-id>')
  process.exit(1)
}

const basePath = path.join(process.cwd(), 'public', 'images', 'case-studies', caseStudyId)

if (!fs.existsSync(basePath)) {
  console.error(`❌ Case study folder not found: ${basePath}`)
  process.exit(1)
}

// Image mapping based on actual structure
const imageMap = {
  hero: ['Hero.webp', 'hero.webp'],
  full: ['Full-1.webp', 'full-1.webp', 'full-2.webp'],
  approach: ['approach-1.webp', 'approach-2.webp'],
  feature: ['feature_1.webp', 'feature.webp'],
  gallery: ['gallery-1.webp', 'gallery-2.webp', 'gallery-3.webp', 'gallery4.webp', 'gallery-4.webp'],
  thumb: ['thumb.webp'],
}

const requiredImages = {
  hero: ['Hero.webp'],
  full: ['Full-1.webp', 'full-2.webp'],
  approach: ['approach-1.webp', 'approach-2.webp'],
  feature: ['feature_1.webp'],
  gallery: ['gallery-1.webp', 'gallery-2.webp', 'gallery-3.webp', 'gallery4.webp'],
  thumb: ['thumb.webp'],
}

console.log(`\n🔍 Validating images for case study: ${caseStudyId}\n`)
console.log(`📁 Base path: ${basePath}\n`)

let allValid = true
const missing = []
const found = []

Object.entries(requiredImages).forEach(([folder, files]) => {
  const folderPath = path.join(basePath, folder)
  
  if (!fs.existsSync(folderPath)) {
    console.error(`❌ Folder missing: ${folder}/`)
    allValid = false
    files.forEach(file => {
      missing.push({ folder, file, reason: 'Folder does not exist' })
    })
    return
  }

  console.log(`📂 Checking ${folder}/:`)
  
  files.forEach(file => {
    const filePath = path.join(folderPath, file)
    const exists = fs.existsSync(filePath)
    
    if (exists) {
      const stats = fs.statSync(filePath)
      const sizeKB = (stats.size / 1024).toFixed(2)
      console.log(`  ✅ ${file} (${sizeKB} KB)`)
      found.push({ folder, file })
    } else {
      // Check for case variations
      const altFiles = imageMap[folder] || []
      const foundAlt = altFiles.find(alt => {
        const altPath = path.join(folderPath, alt)
        return fs.existsSync(altPath)
      })
      
      if (foundAlt) {
        console.log(`  ⚠️  ${file} not found, but found ${foundAlt} (case mismatch?)`)
        missing.push({ folder, file, found: foundAlt, reason: 'Case mismatch' })
      } else {
        console.log(`  ❌ ${file} - MISSING`)
        missing.push({ folder, file, reason: 'File not found' })
      }
      allValid = false
    }
  })
  
  console.log()
})

// Summary
console.log('━'.repeat(50))
console.log('\n📊 Summary:\n')
console.log(`✅ Found: ${found.length} images`)
console.log(`❌ Missing: ${missing.length} images`)

if (missing.length > 0) {
  console.log('\n❌ Missing Images:')
  missing.forEach(({ folder, file, found, reason }) => {
    if (found) {
      console.log(`   ${folder}/${file} → Found as ${folder}/${found} (rename?)`)
    } else {
      console.log(`   ${folder}/${file} - ${reason}`)
    }
  })
}

if (allValid) {
  console.log('\n✅ All required images are present!\n')
  process.exit(0)
} else {
  console.log('\n❌ Some images are missing. Please check the list above.\n')
  process.exit(1)
}

