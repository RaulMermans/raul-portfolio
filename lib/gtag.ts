/**
 * Google Analytics gtag helper functions
 * Use these to track custom events throughout your app
 */

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

// Declare gtag function type
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void
    dataLayer: any[]
  }
}

/**
 * Track a pageview
 */
export const pageview = (url: string) => {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) return

  if (window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    })
  }
}

/**
 * Track a custom event
 * @param action - The action being tracked (e.g., 'click', 'submit', 'download')
 * @param category - The category of the event (e.g., 'button', 'form', 'navigation')
 * @param label - Optional label for the event
 * @param value - Optional numeric value
 */
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) return

  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

/**
 * Track button clicks
 */
export const trackButtonClick = (buttonName: string, location?: string) => {
  event({
    action: 'click',
    category: 'button',
    label: `${buttonName}${location ? ` - ${location}` : ''}`,
  })
}

/**
 * Track form submissions
 */
export const trackFormSubmit = (formName: string) => {
  event({
    action: 'submit',
    category: 'form',
    label: formName,
  })
}

/**
 * Track link clicks (external links)
 */
export const trackLinkClick = (url: string, linkText?: string) => {
  event({
    action: 'click',
    category: 'link',
    label: linkText || url,
  })
}

/**
 * Track file downloads
 */
export const trackDownload = (fileName: string, fileType?: string) => {
  event({
    action: 'download',
    category: 'file',
    label: `${fileName}${fileType ? ` (${fileType})` : ''}`,
  })
}

/**
 * Track social media clicks
 */
export const trackSocialClick = (platform: string) => {
  event({
    action: 'click',
    category: 'social',
    label: platform,
  })
}

/**
 * Track case study views
 */
export const trackCaseStudyView = (caseStudyName: string) => {
  event({
    action: 'view',
    category: 'case_study',
    label: caseStudyName,
  })
}

