// =============================================
// CASE STUDIES LANDING PAGE
// Cinematic, editorial presentation
// =============================================

'use client'

import { useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CaseStudiesLanding from '@/components/CaseStudiesLanding'
import '@/styles/case-studies-landing.css'

export default function CaseStudiesPage() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Disable scroll-snap for normal scrolling
    document.documentElement.style.scrollSnapType = 'none'
    document.body.style.overflowY = 'auto'

    return () => {
      document.documentElement.style.scrollSnapType = ''
      document.body.style.overflowY = ''
    }
  }, [])

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className="grain" aria-hidden="true"></div>
      <Header />

      <main id="main-content" role="main">
        <CaseStudiesLanding />
      </main>

      <Footer />
    </>
  )
}
