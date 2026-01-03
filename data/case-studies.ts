export interface CaseStudy {
  id: number
  title: string
  description: string
  image: string
  href: string
  color: string
  subtitle?: string
}

export const caseStudies: CaseStudy[] = [
  {
    id: 0,
    title: 'AI Sports Campaign',
    description: 'A groundbreaking visual campaign merging AI-generated imagery with athletic excellence. Pushing the boundaries of sports marketing through creative technology.',
    image: '/images/placeholders/ai-sports-campaign.webp',
    href: '/case-studies/ai-sports',
    color: 'var(--color-0)',
    subtitle: 'AI Automation System & Creative Direction',
  },
  {
    id: 1,
    title: 'Remoria',
    description: 'A comprehensive brand identity project exploring classical aesthetics and contemporary design. Building visual systems that create lasting impressions.',
    image: '/images/placeholders/remoria-campaign.webp',
    href: '/case-studies/remoria',
    color: 'var(--color-1)',
    subtitle: 'Brand Identity & Creative Direction',
  },
]

/**
 * Get a random case study, excluding the current one
 * Uses sessionStorage to keep the selection consistent during the session
 */
export function getRandomCaseStudy(currentHref: string): CaseStudy {
  if (typeof window === 'undefined') {
    // Server-side: return first available (not current)
    const available = caseStudies.filter((cs) => cs.href !== currentHref)
    return available[0] || caseStudies[0]
  }

  // Client-side: use sessionStorage for consistency
  const storageKey = `next-case-study-${currentHref}`
  const stored = sessionStorage.getItem(storageKey)

  if (stored) {
    try {
      const parsed = JSON.parse(stored)
      // Verify the stored case study still exists and isn't the current one
      const found = caseStudies.find((cs) => cs.href === parsed.href && cs.href !== currentHref)
      if (found) {
        return found
      }
    } catch (e) {
      // Invalid stored data, continue to generate new
    }
  }

  // Generate new random selection
  const available = caseStudies.filter((cs) => cs.href !== currentHref)
  if (available.length === 0) {
    return caseStudies[0] // Fallback if somehow all are filtered
  }

  const randomIndex = Math.floor(Math.random() * available.length)
  const selected = available[randomIndex]

  // Store in sessionStorage
  sessionStorage.setItem(storageKey, JSON.stringify(selected))

  return selected
}

