// =============================================
// CASE STUDY IMAGE PATH UTILITIES
// Uses the new folder structure: hero/, thumb/, approach/, etc.
// =============================================

import type { CaseStudyImageType } from '@/types/case-study'

/**
 * Get the base path for a case study's images
 */
function getCaseStudyBasePath(caseStudyId: string): string {
  return `/images/case-studies/${caseStudyId}`
}

/**
 * Get the path for a specific image type in a case study
 */
function getCaseStudyImageTypePath(caseStudyId: string, type: CaseStudyImageType): string {
  return `${getCaseStudyBasePath(caseStudyId)}/${type}`
}

/**
 * Get the full path for a case study image
 * @param caseStudyId - The case study identifier (e.g., 'ai-sports', 'remoria')
 * @param type - The image type folder (hero, thumb, approach, gallery, feature, full)
 * @param filename - The image filename (e.g., 'hero.webp', 'gallery-1.webp')
 */
export function getCaseStudyImage(
  caseStudyId: string,
  type: CaseStudyImageType,
  filename: string
): string {
  // Remove leading slash if present
  const cleanFilename = filename.startsWith('/') ? filename.slice(1) : filename
  return `${getCaseStudyImageTypePath(caseStudyId, type)}/${cleanFilename}`
}

/**
 * Get the hero image path
 */
export function getCaseStudyHero(caseStudyId: string, filename: string = 'hero.webp'): string {
  return getCaseStudyImage(caseStudyId, 'hero', filename)
}

/**
 * Get the thumbnail image path
 */
export function getCaseStudyThumb(caseStudyId: string, filename: string = 'thumb.webp'): string {
  return getCaseStudyImage(caseStudyId, 'thumb', filename)
}

/**
 * Get an approach image path
 */
export function getCaseStudyApproach(
  caseStudyId: string,
  filename: string
): string {
  return getCaseStudyImage(caseStudyId, 'approach', filename)
}

/**
 * Get a gallery image path
 */
export function getCaseStudyGallery(
  caseStudyId: string,
  filename: string
): string {
  return getCaseStudyImage(caseStudyId, 'gallery', filename)
}

/**
 * Get the feature image path
 */
export function getCaseStudyFeature(caseStudyId: string, filename: string = 'feature.webp'): string {
  return getCaseStudyImage(caseStudyId, 'feature', filename)
}

/**
 * Get a full-bleed image path
 */
export function getCaseStudyFull(
  caseStudyId: string,
  filename: string
): string {
  return getCaseStudyImage(caseStudyId, 'full', filename)
}

