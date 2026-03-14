// =============================================
// CASE STUDY IMAGE POSITION MAPPING
// Ensures images appear in exact positions
// =============================================

import { getCaseStudyImagePath } from './case-study-images'

export interface ImagePosition {
  position: string
  folder: string
  filename: string
  description: string
  aspectRatio?: string
  required: boolean
}

export interface CaseStudyImageMap {
  [caseStudyId: string]: {
    hero: ImagePosition[]
    fullBleed: ImagePosition[]
    approach: ImagePosition[]
    feature: ImagePosition[]
    gallery: ImagePosition[]
    thumb: ImagePosition[]
  }
}

/**
 * Image position mapping for each case study
 * This ensures images appear in the exact position you want
 */
export const caseStudyImageMaps: CaseStudyImageMap = {
  'ai-sports': {
    hero: [
      {
        position: 'Hero Background',
        folder: 'hero',
        filename: 'Hero.webp',
        description: 'Main hero background image (dark theme)',
        aspectRatio: '16:9',
        required: true,
      },
    ],
    fullBleed: [
      {
        position: 'Full Bleed 1 (First)',
        folder: 'full',
        filename: 'Full-1.webp',
        description: 'First full-width image section',
        aspectRatio: '16:9',
        required: true,
      },
      {
        position: 'Full Bleed 2 (Second)',
        folder: 'full',
        filename: 'full-2.webp',
        description: 'Second full-width image section',
        aspectRatio: '16:9',
        required: true,
      },
    ],
    approach: [
      {
        position: 'Approach Image 1 (Left)',
        folder: 'approach',
        filename: 'approach-1.webp',
        description: 'First approach/workflow image (left side)',
        aspectRatio: '4:3',
        required: true,
      },
      {
        position: 'Approach Image 2 (Right)',
        folder: 'approach',
        filename: 'approach-2.webp',
        description: 'Second approach image (right side)',
        aspectRatio: '4:3',
        required: true,
      },
    ],
    feature: [
      {
        position: 'Feature Image (Large Showcase)',
        folder: 'feature',
        filename: 'feature_1.webp',
        description: 'Large featured showcase image',
        aspectRatio: '16:9',
        required: true,
      },
    ],
    gallery: [
      {
        position: 'Gallery Position 1 (Top-Left) - Color',
        folder: 'gallery',
        filename: 'gallery-1.webp',
        description: 'Top-left gallery image - will display in COLOR, landscape (4:3)',
        aspectRatio: '4:3',
        required: true,
      },
      {
        position: 'Gallery Position 2 (Top-Right) - Grayscale',
        folder: 'gallery',
        filename: 'gallery-2.webp',
        description: 'Top-right gallery image - will display in GRAYSCALE, portrait (3:4)',
        aspectRatio: '3:4',
        required: true,
      },
      {
        position: 'Gallery Position 3 (Bottom-Left) - Grayscale',
        folder: 'gallery',
        filename: 'gallery-3.webp',
        description: 'Bottom-left gallery image - will display in GRAYSCALE, portrait (3:4)',
        aspectRatio: '3:4',
        required: true,
      },
      {
        position: 'Gallery Position 4 (Bottom-Right) - Color',
        folder: 'gallery',
        filename: 'gallery4.webp',
        description: 'Bottom-right gallery image - will display in COLOR, landscape (4:3)',
        aspectRatio: '4:3',
        required: true,
      },
    ],
    thumb: [
      {
        position: 'Thumbnail (Case Studies List)',
        folder: 'thumb',
        filename: 'thumb.webp',
        description: 'Thumbnail image for case studies listing page',
        aspectRatio: '16:9',
        required: true,
      },
    ],
  },
}

/**
 * Get image path for a specific position
 */
export function getImageForPosition(
  caseStudyId: string,
  section: 'hero' | 'fullBleed' | 'approach' | 'feature' | 'gallery' | 'thumb',
  positionIndex: number = 0
): string | null {
  const map = caseStudyImageMaps[caseStudyId]
  if (!map || !map[section] || !map[section][positionIndex]) {
    return null
  }

  const imagePos = map[section][positionIndex]
  return getCaseStudyImagePath(caseStudyId, imagePos.folder as any, imagePos.filename)
}

/**
 * Get all image positions for a case study
 */
export function getImagePositions(caseStudyId: string) {
  return caseStudyImageMaps[caseStudyId] || null
}

/**
 * Validate that all required images exist (for build-time checking)
 */
export function validateCaseStudyImages(caseStudyId: string): {
  valid: boolean
  missing: Array<{ position: string; filename: string; folder: string }>
} {
  const map = caseStudyImageMaps[caseStudyId]
  if (!map) {
    return { valid: false, missing: [] }
  }

  const missing: Array<{ position: string; filename: string; folder: string }> = []

  Object.entries(map).forEach(([section, images]) => {
    images.forEach((img) => {
      if (img.required) {
        // In a real implementation, you'd check if file exists
        // For now, we just return the structure
        missing.push({
          position: img.position,
          filename: img.filename,
          folder: img.folder,
        })
      }
    })
  })

  return {
    valid: missing.length === 0,
    missing,
  }
}

