#!/usr/bin/env node

/**
 * Verify all image paths in case study data match actual files
 */

const fs = require('fs')
const path = require('path')

// Read the case studies content file
const contentPath = path.join(process.cwd(), 'data', 'case-studies-content.ts')
const content = fs.readFileSync(contentPath, 'utf8')

// Extract image paths
const imagePaths = []
const pathRegex = /getCaseStudyImagePath\(['"]([^'"]+)['"],\s*['"]([^'"]+)['"],\s*['"]([^'"]+)['"]\)/g
let match
while ((match = pathRegex.exec(content)) !== null) {
  const [, caseStudyId, folder, filename] = match
  const fullPath = path.join(process.cwd(), 'public', 'images', 'case-studies', caseStudyId, folder, filename)
  imagePaths.push({
    caseStudyId,
    folder,
    filename,
    fullPath,
    referencedPath: `/images/case-studies/${caseStudyId}/${folder}/${filename}`
  })
}

console.log('\n🔍 Verifying all image paths...\n')

let allValid = true
const missing = []
const found = []

imagePaths.forEach(({ caseStudyId, folder, filename, fullPath, referencedPath }) => {
  if (fs.existsSync(fullPath)) {
    const stats = fs.statSync(fullPath)
    const sizeKB = (stats.size / 1024).toFixed(2)
    console.log(`✅ ${caseStudyId}/${folder}/${filename} (${sizeKB} KB)`)
    found.push({ caseStudyId, folder, filename })
  } else {
    console.log(`❌ MISSING: ${caseStudyId}/${folder}/${filename}`)
    console.log(`   Expected: ${fullPath}`)
    missing.push({ caseStudyId, folder, filename, fullPath })
    allValid = false
  }
})

// Check thumbnails in case-studies.ts
const caseStudiesPath = path.join(process.cwd(), 'data', 'case-studies.ts')
const caseStudiesContent = fs.readFileSync(caseStudiesPath, 'utf8')
const thumbRegex = /\/images\/case-studies\/([^/]+)\/thumb\/([^"']+)/g
console.log('\n📸 Checking thumbnails from case studies listing...\n')

while ((match = thumbRegex.exec(caseStudiesContent)) !== null) {
  const [, caseStudyId, filename] = match
  const fullPath = path.join(process.cwd(), 'public', 'images', 'case-studies', caseStudyId, 'thumb', filename)
  if (fs.existsSync(fullPath)) {
    const stats = fs.statSync(fullPath)
    const sizeKB = (stats.size / 1024).toFixed(2)
    console.log(`✅ Thumbnail: ${caseStudyId}/thumb/${filename} (${sizeKB} KB)`)
  } else {
    console.log(`❌ MISSING Thumbnail: ${caseStudyId}/thumb/${filename}`)
    missing.push({ caseStudyId, folder: 'thumb', filename, fullPath })
    allValid = false
  }
}

console.log('\n' + '━'.repeat(60))
console.log(`\n📊 Summary:\n`)
console.log(`✅ Found: ${found.length} images`)
console.log(`❌ Missing: ${missing.length} images`)

if (missing.length > 0) {
  console.log('\n❌ Missing Images:')
  missing.forEach(({ caseStudyId, folder, filename }) => {
    console.log(`   ${caseStudyId}/${folder}/${filename}`)
  })
  process.exit(1)
} else {
  console.log('\n✅ All images verified and correctly referenced!\n')
  process.exit(0)
}

