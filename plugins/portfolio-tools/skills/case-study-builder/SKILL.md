---
name: case-study-builder
description: Guide for creating and managing case studies in the portfolio. This skill should be used when adding new case studies, modifying existing case study content, creating case study pages, or organizing case study images. Provides content schema, page scaffolding, and image path conventions.
---

# Case Study Builder

This skill provides guidance for creating consistent, well-structured case studies in the portfolio.

## Case Study Architecture

A complete case study requires:

1. **Content Entry** in `data/case-studies-content.ts`
2. **Index Entry** in `data/case-studies.ts`
3. **Page Component** in `app/case-studies/[slug]/page.tsx`
4. **Layout with Metadata** in `app/case-studies/[slug]/layout.tsx`
5. **Images** in `public/images/case-studies/[slug]/`

## Content Schema

### Full Content Structure

Located in `data/case-studies-content.ts`:

```typescript
import { getCaseStudyImagePath } from '@/lib/case-study-images'

'case-study-slug': {
  id: 'case-study-slug',
  accentColor: 'var(--accent)', // CSS variable for theming
  
  hero: {
    title: 'Case Study Title',
    tagline: 'A memorable one-liner',
    subtitle: 'Role & Year • 2025',
    image: {
      src: getCaseStudyImagePath('case-study-slug', 'hero', 'hero.webp'),
      alt: 'Descriptive alt text',
      quality: 90,
      sizes: '100vw',
    },
  },
  
  overview: {
    description: 'Main description with **bold text** for emphasis.',
    intentQuote: 'A quote summarizing the intent.',
    meta: [
      { label: 'Type', value: 'Project Type' },
      { label: 'Role', value: 'Your Role' },
      { label: 'Tools', value: 'Tool 1, Tool 2, Tool 3' },
      { label: 'Deliverables', value: 'Deliverable 1, Deliverable 2' },
    ],
  },
  
  challenge: {
    quote: 'The core question or challenge.',
    context: 'Detailed context with **bold emphasis** where needed.',
    successCriteria: [
      'First criterion',
      'Second criterion',
      'Third criterion',
    ],
  },
  
  approach: {
    text: 'Description of the approach with **bold** highlights.',
    tools: ['Tool 1', 'Tool 2', 'Tool 3'],
    system: {
      label: 'The System/Framework',
      items: [
        { title: 'Component 1', description: 'Description of component' },
        { title: 'Component 2', description: 'Description of component' },
        { title: 'Component 3', description: 'Description of component' },
      ],
    },
    images: [
      {
        src: getCaseStudyImagePath('case-study-slug', 'approach', 'approach-1.webp'),
        alt: 'Approach image description',
        quality: 90,
        sizes: '(max-width: 768px) 100vw, 50vw',
      },
    ],
  },
  
  fullBleedImages: [
    {
      src: getCaseStudyImagePath('case-study-slug', 'full', 'full.webp'),
      alt: 'Full bleed image description',
      quality: 90,
      sizes: '100vw',
    },
  ],
  
  featureImage: {
    src: getCaseStudyImagePath('case-study-slug', 'feature', 'feature.webp'),
    alt: 'Feature image description',
    quality: 90,
    sizes: '(max-width: 1400px) 100vw, 1400px',
  },
  
  gallery: {
    rows: [
      {
        layout: '2-col', // '2-col' | '3-col' | 'asymmetric'
        items: [
          {
            src: getCaseStudyImagePath('case-study-slug', 'gallery', 'gallery-1.webp'),
            alt: 'Gallery image 1',
            quality: 90,
            sizes: '(max-width: 768px) 100vw, 50vw',
          },
          {
            src: getCaseStudyImagePath('case-study-slug', 'gallery', 'gallery-2.webp'),
            alt: 'Gallery image 2',
            quality: 90,
            sizes: '(max-width: 768px) 100vw, 50vw',
          },
        ],
      },
    ],
  },
  
  results: {
    text: 'Summary of results and outcomes.',
    takeawayQuote: 'The key takeaway in quote form.',
  },
}
```

### Index Entry

Located in `data/case-studies.ts`:

```typescript
{
  id: 2, // Unique ID
  title: 'Case Study Title',
  description: 'Short description for cards and previews.',
  image: '/images/case-studies/case-study-slug/thumb/thumb.webp',
  href: '/case-studies/case-study-slug',
  color: 'var(--color-2)', // Accent color variable
  subtitle: 'Role & Service Type',
}
```

## Image Path Conventions

### Directory Structure

```
public/images/case-studies/[slug]/
├── thumb/
│   └── thumb.webp          # Card thumbnail (800x600)
├── hero/
│   └── hero.webp           # Hero image (1920x1080+)
├── approach/
│   ├── approach-1.webp     # Approach section images
│   └── approach-2.webp
├── feature/
│   └── feature.webp        # Feature highlight (1400px wide)
├── full/
│   └── full.webp           # Full-bleed image (1920px+)
└── gallery/
    ├── gallery-1.webp      # Gallery images
    ├── gallery-2.webp
    └── gallery-3.webp
```

### Image Path Helper

Always use `getCaseStudyImagePath()` for consistency:

```typescript
import { getCaseStudyImagePath } from '@/lib/case-study-images'

// Usage
getCaseStudyImagePath('case-study-slug', 'hero', 'hero.webp')
// Returns: /images/case-studies/case-study-slug/hero/hero.webp

getCaseStudyImagePath('case-study-slug', 'gallery', 'gallery-1.webp')
// Returns: /images/case-studies/case-study-slug/gallery/gallery-1.webp
```

### Image Specifications

| Type | Folder | Dimensions | Quality | Sizes Attribute |
|------|--------|------------|---------|-----------------|
| Thumbnail | thumb | 800x600 | 85 | 400px |
| Hero | hero | 1920x1080+ | 90 | 100vw |
| Approach | approach | 1200x900 | 90 | (max-width: 768px) 100vw, 50vw |
| Feature | feature | 1400x auto | 90 | (max-width: 1400px) 100vw, 1400px |
| Full Bleed | full | 1920x auto | 90 | 100vw |
| Gallery | gallery | varies | 90 | depends on layout |

### Gallery Sizes by Layout

```typescript
// 2-col layout
sizes: '(max-width: 768px) 100vw, 50vw'

// 3-col layout  
sizes: '(max-width: 768px) 100vw, 33vw'

// Asymmetric (large + small)
// Large: sizes: '(max-width: 768px) 100vw, 66vw'
// Small: sizes: '(max-width: 768px) 100vw, 33vw'
```

## Page Component Template

Create `app/case-studies/[slug]/page.tsx`:

```tsx
'use client'

import { useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CaseStudyHero from '@/components/case-studies/CaseStudyHero'
import CaseStudyMeta from '@/components/case-studies/CaseStudyMeta'
import CaseStudySection from '@/components/case-studies/CaseStudySection'
import CaseStudyImage from '@/components/case-studies/CaseStudyImage'
import CaseStudyGallery from '@/components/case-studies/CaseStudyGallery'
import CaseStudyNext from '@/components/case-studies/CaseStudyNext'
import BoldText from '@/components/case-studies/BoldText'
import { getCaseStudyContent } from '@/data/case-studies-content'
import { caseStudies } from '@/data/case-studies'
import '@/styles/case-study-new.css'

export default function CaseStudyPage() {
  const content = getCaseStudyContent('case-study-slug')
  const nextCaseStudy = caseStudies.find((cs) => cs.href === '/case-studies/next-slug')

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Header styling for dark hero
    const logo = document.querySelector('.ui__logo')
    const nav = document.querySelector('.ui__nav')
    const menuBtn = document.querySelector('.ui__menu-btn')
    if (logo) logo.classList.add('on-dark')
    if (nav) nav.classList.add('on-dark')
    if (menuBtn) menuBtn.classList.add('on-dark')

    // Scroll reveal animations
    const reveals = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    reveals.forEach((el) => observer.observe(el))

    return () => {
      observer.disconnect()
      if (logo) logo.classList.remove('on-dark')
      if (nav) nav.classList.remove('on-dark')
      if (menuBtn) menuBtn.classList.remove('on-dark')
    }
  }, [])

  if (!content) {
    return <div>Case study not found</div>
  }

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <div className="grain" aria-hidden="true"></div>

      <Header />

      <main id="main-content" className="case-study-page-new">
        <CaseStudyHero hero={content.hero} accentColor={content.accentColor} />

        {content.overview?.meta && (
          <CaseStudyMeta meta={content.overview.meta} accentColor={content.accentColor} />
        )}

        {content.overview && (
          <CaseStudySection title="Overview" variant="light" id="overview">
            <div className="case-study-intro">
              <p className="case-study-intro__text">
                <BoldText text={content.overview.description} />
              </p>
              {content.overview.intentQuote && (
                <blockquote className="case-study-intro__quote">
                  {content.overview.intentQuote}
                </blockquote>
              )}
            </div>
          </CaseStudySection>
        )}

        {content.challenge && (
          <CaseStudySection title="The Challenge" variant="dark" id="challenge">
            <div className="case-study-challenge">
              <h3 className="case-study-challenge__quote">{content.challenge.quote}</h3>
              <p className="case-study-challenge__text">
                <BoldText text={content.challenge.context} />
              </p>
              {content.challenge.successCriteria?.length > 0 && (
                <div className="case-study-challenge__criteria">
                  <h4 className="case-study-challenge__criteria-title">Success Criteria</h4>
                  <ul className="case-study-challenge__criteria-list">
                    {content.challenge.successCriteria.map((criterion, index) => (
                      <li key={index} className="case-study-challenge__criteria-item">
                        {criterion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </CaseStudySection>
        )}

        {content.fullBleedImages?.length > 0 && (
          <section className="case-study-fullbleed">
            {content.fullBleedImages.map((image, index) => (
              image?.src && (
                <CaseStudyImage
                  key={index}
                  image={image}
                  aspectRatio="16/9"
                  className="case-study-fullbleed__image"
                />
              )
            ))}
          </section>
        )}

        {content.approach && (
          <CaseStudySection title="The Approach" variant="light" id="approach">
            <div className="case-study-approach">
              <p className="case-study-approach__text">
                <BoldText text={content.approach.text} />
              </p>
              {/* Add tools, system, images as needed */}
            </div>
          </CaseStudySection>
        )}

        {content.featureImage && (
          <section className="case-study-feature">
            <CaseStudyImage
              image={content.featureImage}
              aspectRatio="16/9"
              className="case-study-feature__image"
            />
          </section>
        )}

        {content.gallery?.rows && (
          <CaseStudyGallery rows={content.gallery.rows} accentColor={content.accentColor} />
        )}

        {content.results && (
          <CaseStudySection title="Results" variant="dark" id="results">
            <div className="case-study-results">
              <p className="case-study-results__text">
                <BoldText text={content.results.text} />
              </p>
              <blockquote className="case-study-results__quote">
                {content.results.takeawayQuote}
              </blockquote>
            </div>
          </CaseStudySection>
        )}

        <CaseStudyNext nextCaseStudy={nextCaseStudy} accentColor={content.accentColor} />
      </main>

      <Footer />
    </>
  )
}
```

## Layout with Metadata Template

Create `app/case-studies/[slug]/layout.tsx`:

```tsx
import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://raulmermans.com'

export const metadata: Metadata = {
  title: 'Case Study Title — Raúl Mermans',
  description: 'Detailed description for SEO (150-160 characters). Include keywords: project type, skills used, outcome.',
  openGraph: {
    title: 'Case Study Title — Raúl Mermans',
    description: 'Same or similar description for social sharing.',
    url: `${baseUrl}/case-studies/case-study-slug`,
    type: 'article',
    images: [
      {
        url: `${baseUrl}/images/case-studies/case-study-slug/hero/hero.webp`,
        width: 1920,
        height: 1080,
        alt: 'Case Study Title',
      },
    ],
  },
  alternates: {
    canonical: `${baseUrl}/case-studies/case-study-slug`,
  },
}

export default function CaseStudyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
```

## Creation Checklist

When creating a new case study:

### 1. Content Preparation
- [ ] Write all copy sections (overview, challenge, approach, results)
- [ ] Identify success criteria (3-5 items)
- [ ] List tools and deliverables
- [ ] Craft quotes (intent quote, challenge question, takeaway)

### 2. Image Preparation
- [ ] Prepare hero image (1920x1080+, WebP)
- [ ] Create thumbnail (800x600, WebP)
- [ ] Prepare approach images (if applicable)
- [ ] Prepare gallery images (consistent sizing)
- [ ] Create feature image (if applicable)
- [ ] Write descriptive alt text for all images

### 3. File Creation
- [ ] Create image directory structure in `public/images/case-studies/[slug]/`
- [ ] Add content to `data/case-studies-content.ts`
- [ ] Add index entry to `data/case-studies.ts`
- [ ] Create `app/case-studies/[slug]/page.tsx`
- [ ] Create `app/case-studies/[slug]/layout.tsx`

### 4. Verification
- [ ] All images load correctly
- [ ] BoldText renders properly (check **bold** syntax)
- [ ] Gallery layouts display correctly
- [ ] Reveal animations trigger on scroll
- [ ] Header styling changes on dark sections
- [ ] SEO metadata is complete
- [ ] Page is accessible (skip link, alt texts)

## Bold Text Syntax

Use double asterisks for bold text in descriptions:

```typescript
description: 'Regular text with **bold emphasis** and more regular text.'
```

The `BoldText` component parses this and renders:
```html
<span>Regular text with <strong>bold emphasis</strong> and more regular text.</span>
```

## Accent Colors

Available accent color variables:
- `var(--accent)` - Default accent
- `var(--gold)` - Gold/warm accent
- `var(--color-0)` - First palette color
- `var(--color-1)` - Second palette color
- `var(--color-2)` - Third palette color

Choose based on the case study's visual identity.
