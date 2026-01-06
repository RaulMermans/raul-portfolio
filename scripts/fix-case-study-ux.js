#!/usr/bin/env node

/**
 * Case Study UX Fix Script
 * Uses Design and Frontend Departments to fix gallery and next case study UX
 */

const fs = require('fs')
const path = require('path')

console.log('🎨 Design Department + Frontend Department Task Execution\n')
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

// Task 1: Verify Remoria gallery images
console.log('📋 Task 1: Verify Remoria Gallery Images')
console.log('   Department: Frontend Developer\n')

const remoriaGalleryPath = path.join(process.cwd(), 'public/images/case-studies/remoria/gallery')
const galleryFiles = fs.existsSync(remoriaGalleryPath)
  ? fs.readdirSync(remoriaGalleryPath).filter(f => f.endsWith('.webp')).sort()
  : []

console.log(`   Found ${galleryFiles.length} gallery images:`)
galleryFiles.forEach((file, i) => {
  const filePath = path.join(remoriaGalleryPath, file)
  const stats = fs.statSync(filePath)
  const sizeKB = (stats.size / 1024).toFixed(2)
  console.log(`   ✅ ${file} (${sizeKB} KB)`)
})

// Check data file
const dataFile = path.join(process.cwd(), 'data/case-studies-content.ts')
const dataContent = fs.readFileSync(dataFile, 'utf-8')

const expectedGallery = ['gallery-1.webp', 'gallery-2.webp', 'gallery-3.webp', 'gallery-4.webp']
const missingInData = expectedGallery.filter(file => 
  !dataContent.includes(`'gallery', '${file}'`)
)
const extraInData = expectedGallery.filter(file => 
  dataContent.includes(`'gallery', '${file}'`) && !galleryFiles.includes(file)
)

if (missingInData.length > 0) {
  console.log(`   ⚠️  Missing in data: ${missingInData.join(', ')}`)
} else {
  console.log('   ✅ All images referenced in data file')
}

console.log('')

// Task 2: Verify Next Case Study Component
console.log('📋 Task 2: Verify Next Case Study Component')
console.log('   Department: UX/UI Designer + Frontend Developer\n')

const nextComponentPath = path.join(process.cwd(), 'components/case-studies/CaseStudyNext.tsx')
const nextComponent = fs.readFileSync(nextComponentPath, 'utf-8')

const hasPreview = nextComponent.includes('preview-image')
const hasScrollHint = nextComponent.includes('scroll-hint')
const hasImageImport = nextComponent.includes("import Image from 'next/image'")
const hasUseEffect = nextComponent.includes('useEffect')

console.log(`   Preview image: ${hasPreview ? '✅' : '❌ Missing'}`)
console.log(`   Scroll hint: ${hasScrollHint ? '✅' : '❌ Missing'}`)
console.log(`   Image import: ${hasImageImport ? '✅' : '❌ Missing'}`)
console.log(`   Scroll detection: ${hasUseEffect ? '✅' : '❌ Missing'}`)

console.log('')

// Task 3: Check CSS
console.log('📋 Task 3: Verify CSS Styling')
console.log('   Department: UX/UI Designer\n')

const cssFile = path.join(process.cwd(), 'styles/case-study-new.css')
const cssContent = fs.readFileSync(cssFile, 'utf-8')

const hasPreviewCSS = cssContent.includes('preview-image')
const hasHintCSS = cssContent.includes('scroll-hint')
const hasAnimations = cssContent.includes('@keyframes bounceHint')

console.log(`   Preview CSS: ${hasPreviewCSS ? '✅' : '❌ Missing'}`)
console.log(`   Scroll hint CSS: ${hasHintCSS ? '✅' : '❌ Missing'}`)
console.log(`   Animations: ${hasAnimations ? '✅' : '❌ Missing'}`)

console.log('')

// Summary
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
console.log('📊 Summary:')
const allGood = hasPreview && hasScrollHint && hasImageImport && hasUseEffect && hasPreviewCSS && hasHintCSS && hasAnimations
console.log(`   Status: ${allGood ? '✅ All components in place' : '⚠️  Some components missing'}`)
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

if (!allGood) {
  console.log('🔧 Recommendations:')
  if (!hasPreview) console.log('   - Add preview image to CaseStudyNext component')
  if (!hasScrollHint) console.log('   - Add scroll hint indicator')
  if (!hasImageImport) console.log('   - Import Next.js Image component')
  if (!hasUseEffect) console.log('   - Add scroll detection with useEffect')
  if (!hasPreviewCSS) console.log('   - Add preview image CSS styles')
  if (!hasHintCSS) console.log('   - Add scroll hint CSS styles')
  if (!hasAnimations) console.log('   - Add bounce animations')
  console.log('')
  process.exit(1)
} else {
  console.log('✅ All departments verified - components are properly implemented!')
}

