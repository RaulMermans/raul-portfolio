// =============================================
// CASE STUDY IMAGE UTILITIES
// Helper functions for case study image paths
// =============================================

/**
 * Get the base path for a case study's images
 */
function getCaseStudyBasePath(caseStudyId: string): string {
  return `/images/case-studies/${caseStudyId}`
}

/**
 * Get the full path for a case study image
 */
export function getCaseStudyImage(
  caseStudyId: string,
  folder: string,
  filename: string
): string {
  const cleanFilename = filename.startsWith('/') ? filename.slice(1) : filename
  return `${getCaseStudyBasePath(caseStudyId)}/${folder}/${cleanFilename}`
}

/**
 * Common image getters
 */
export function getCaseStudyHero(caseStudyId: string, filename: string = 'hero.webp'): string {
  return getCaseStudyImage(caseStudyId, 'hero', filename)
}

export function getCaseStudyThumb(caseStudyId: string, filename: string = 'thumb.webp'): string {
  return getCaseStudyImage(caseStudyId, 'thumb', filename)
}

export function getCaseStudyGallery(
  caseStudyId: string,
  filename: string
): string {
  return getCaseStudyImage(caseStudyId, 'gallery', filename)
}

export function getCaseStudyFeature(
  caseStudyId: string,
  filename: string = 'feature.webp'
): string {
  return getCaseStudyImage(caseStudyId, 'feature', filename)
}

export function getCaseStudyFull(
  caseStudyId: string,
  filename: string
): string {
  return getCaseStudyImage(caseStudyId, 'full', filename)
}

export function getCaseStudyApproach(
  caseStudyId: string,
  filename: string
): string {
  return getCaseStudyImage(caseStudyId, 'approach', filename)
}

/**
 * Get case study image path (alias for getCaseStudyImage)
 */
export function getCaseStudyImagePath(
  caseStudyId: string,
  folder: 'hero' | 'thumb' | 'approach' | 'gallery' | 'feature' | 'full',
  filename: string
): string {
  return getCaseStudyImage(caseStudyId, folder, filename)
}

