#!/usr/bin/env node

/**
 * Image Upload Helper Script
 * Helps upload and optimize images for the portfolio website
 */

const fs = require('fs')
const path = require('path')

// Image configuration
const IMAGE_CONFIG = {
  about: {
    path: 'public/images/about/profile',
    formats: ['webp', 'jpg', 'png'],
    recommendedSize: { width: 800, height: 1067 },
    aspectRatio: '3:4',
  },
  sections: {
    path: 'public/images/sections',
    formats: ['webp'],
    recommendedSize: { width: 1920, height: 1080 },
    aspectRatio: '16:9',
  },
  photography: {
    path: 'public/images/photography',
    formats: ['webp', 'jpg'],
    recommendedSize: { width: 1920, height: 1280 },
    aspectRatio: '3:2',
  },
}

function printInstructions(imageType = 'about') {
  const config = IMAGE_CONFIG[imageType]
  if (!config) {
    console.error(`Unknown image type: ${imageType}`)
    process.exit(1)
  }

  console.log('\n📸 Image Upload Instructions\n')
  console.log(`Image Type: ${imageType.toUpperCase()}`)
  console.log(`Target Path: ${config.path}/`)
  console.log(`Recommended Size: ${config.recommendedSize.width}x${config.recommendedSize.height}px`)
  console.log(`Aspect Ratio: ${config.aspectRatio}`)
  console.log(`Accepted Formats: ${config.formats.join(', ')}\n`)
  
  console.log('Steps:')
  console.log('1. Prepare your image file')
  console.log(`2. Save it to: ${config.path}/`)
  console.log(`3. Name it appropriately (e.g., profile.webp for about images)`)
  console.log('4. Run this script again to verify\n')
  
  if (imageType === 'about') {
    console.log('For About page portrait:')
    console.log('  - File name: profile.webp (or profile.jpg/png)')
    console.log('  - Location: public/images/about/profile.webp')
    console.log('  - The code will automatically use it!\n')
  }
}

function checkImageExists(imagePath) {
  const fullPath = path.join(process.cwd(), imagePath)
  if (fs.existsSync(fullPath)) {
    const stats = fs.statSync(fullPath)
    console.log(`✅ Image found: ${imagePath}`)
    console.log(`   Size: ${(stats.size / 1024).toFixed(2)} KB`)
    return true
  }
  return false
}

function verifyAboutImage() {
  console.log('\n🔍 Checking for About page image...\n')
  
  const formats = ['webp', 'jpg', 'jpeg', 'png']
  let found = false
  
  for (const format of formats) {
    const imagePath = `public/images/about/profile.${format}`
    if (checkImageExists(imagePath)) {
      found = true
      console.log(`\n✅ About image is ready!`)
      console.log(`   The website will use: /images/about/profile.${format}\n`)
      break
    }
  }
  
  if (!found) {
    console.log('❌ About image not found')
    printInstructions('about')
  }
  
  return found
}

// Main execution
const args = process.argv.slice(2)
const command = args[0]

if (command === 'check' || command === 'verify') {
  verifyAboutImage()
} else if (command === 'help' || !command) {
  console.log('\n📸 Image Upload Helper\n')
  console.log('Usage:')
  console.log('  node scripts/upload-image.js [command]\n')
  console.log('Commands:')
  console.log('  check, verify  - Check if about image exists')
  console.log('  about         - Show instructions for about image')
  console.log('  help          - Show this help message\n')
  
  verifyAboutImage()
} else if (IMAGE_CONFIG[command]) {
  printInstructions(command)
} else {
  console.error(`Unknown command: ${command}`)
  console.log('Run "node scripts/upload-image.js help" for usage')
  process.exit(1)
}

