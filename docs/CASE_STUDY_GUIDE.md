# Case Study Guide

## Overview

Case studies are now built using a component-based architecture with centralized content management. This makes it easy to add new case studies and maintain consistency across all projects.

## File Structure

```
public/images/case-studies/
  {case-study-id}/
    hero/          # Hero images
    thumb/         # Thumbnail images
    approach/      # Approach section images
    gallery/       # Gallery images
    feature/       # Feature images
    full/          # Full-bleed images

data/
  case-studies.ts              # Case study metadata (for listings)
  case-studies-content.ts      # Full case study content

components/case-studies/
  CaseStudyLayout.tsx          # Layout wrapper (header, footer, animations)
  CaseStudyHero.tsx            # Hero section
  CaseStudyOverview.tsx        # Overview section
  CaseStudyChallenge.tsx       # Challenge section
  CaseStudyApproach.tsx        # Approach section
  CaseStudyGallery.tsx         # Gallery section
  CaseStudyResults.tsx         # Results section
  CaseStudyFullImage.tsx       # Full-bleed image
  CaseStudyFeature.tsx         # Feature image

types/
  case-study.ts                # TypeScript type definitions

lib/
  case-study-images.ts         # Image path utilities
```

## Adding a New Case Study

### Step 1: Prepare Images

1. Create folders in `public/images/case-studies/{your-case-study-id}/`:
   - `hero/` - Hero image (required)
   - `thumb/` - Thumbnail for listings (required)
   - `approach/` - Approach section images (optional)
   - `gallery/` - Gallery images (optional)
   - `feature/` - Feature image (optional)
   - `full/` - Full-bleed images (optional)

2. Add images to appropriate folders:
   - `hero/hero.webp` - Main hero image
   - `thumb/thumb.webp` - Thumbnail (used in case studies listing)
   - `approach/approach-1.webp`, `approach/approach-2.webp`, etc.
   - `gallery/gallery-1.webp`, `gallery/gallery-2.webp`, etc.
   - `feature/feature.webp` - Feature highlight image
   - `full/full-1.webp`, `full/full-2.webp`, etc.

### Step 2: Add to Case Studies List

Edit `data/case-studies.ts`:

```typescript
export const caseStudies: CaseStudy[] = [
  // ... existing case studies
  {
    id: 2,
    title: 'Your Case Study Title',
    description: 'Brief description for listings',
    image: '/images/case-studies/your-case-study-id/thumb/thumb.webp',
    href: '/case-studies/your-case-study-id',
    color: 'var(--color-2)',
    subtitle: 'Your Subtitle',
  },
]
```

### Step 3: Add Case Study Content

Edit `data/case-studies-content.ts`:

1. Import image utilities:
```typescript
import {
  getCaseStudyHero,
  getCaseStudyFeature,
  getCaseStudyApproach,
  getCaseStudyGallery,
  getCaseStudyFull,
} from '@/lib/case-study-images'
```

2. Add your case study content:
```typescript
export const caseStudiesContent: Record<string, CaseStudyContent> = {
  // ... existing case studies
  'your-case-study-id': {
    id: 'your-case-study-id',
    hero: {
      title: 'Your Title',
      tagline: 'Your tagline',
      subtitle: 'Type & Role • Year',
      image: {
        src: getCaseStudyHero('your-case-study-id'),
        alt: 'Alt text',
        quality: 90,
        sizes: '100vw',
      },
    },
    overview: {
      meta: [
        { label: 'Type', value: 'Project Type' },
        { label: 'Role', value: 'Your Role' },
        { label: 'Tools', value: 'Tool 1, Tool 2, Tool 3' },
        {
          label: 'Deliverables',
          value: 'Deliverable 1, Deliverable 2',
          fullWidth: true,
        },
      ],
      text: 'Your overview text...',
      intent: 'Your intent statement',
      // variant: 'gold', // Optional: for gold accent (like Remoria)
    },
    challenge: {
      quote: 'Your challenge quote',
      text: 'Your challenge description...',
      criteria: [
        'Criterion 1',
        'Criterion 2',
        'Criterion 3',
      ],
      // variant: 'gold', // Optional
    },
    fullImages: [
      {
        src: getCaseStudyFull('your-case-study-id', 'full-1.webp'),
        alt: 'Alt text',
        quality: 90,
        sizes: '100vw',
      },
      // Add more full images as needed
    ],
    approach: {
      text: 'Your approach text. Use **bold** for emphasis.',
      tools: [
        { name: 'Tool 1' },
        { name: 'Tool 2' },
        // variant: 'gold', // Optional: for gold accent
      ],
      system: {
        label: 'System Label',
        items: [
          {
            title: 'Title 1',
            description: 'Description 1',
          },
          {
            title: 'Title 2',
            description: 'Description 2',
          },
        ],
      },
      images: [
        {
          src: getCaseStudyApproach('your-case-study-id', 'approach-1.webp'),
          alt: 'Alt text',
          quality: 90,
          sizes: '(max-width: 900px) 100vw, 50vw',
        },
      ],
    },
    feature: {
      src: getCaseStudyFeature('your-case-study-id'),
      alt: 'Feature image alt text',
      quality: 95,
      sizes: '(max-width: 1400px) 100vw, 1400px',
    },
    gallery: {
      rows: [
        {
          type: '3', // or '2' or 'asymmetric'
          items: [
            {
              src: getCaseStudyGallery('your-case-study-id', 'gallery-1.webp'),
              alt: 'Gallery image 1',
              quality: 90,
              sizes: '(max-width: 768px) 100vw, 33vw',
            },
            // Add more items
          ],
        },
      ],
    },
    results: {
      text: 'Your results text...',
      takeaway: 'Your takeaway quote',
      // variant: 'gold', // Optional
    },
    structuredData: {
      headline: 'Your Case Study Title',
      description: 'SEO description',
      datePublished: '2026-01-01',
      dateModified: '2026-01-01',
    },
  },
}
```

### Step 4: Create Page Component

Create `app/case-studies/{your-case-study-id}/page.tsx`:

```typescript
'use client'

import CaseStudyLayout from '@/components/case-studies/CaseStudyLayout'
import CaseStudyHero from '@/components/case-studies/CaseStudyHero'
import CaseStudyOverview from '@/components/case-studies/CaseStudyOverview'
import CaseStudyChallenge from '@/components/case-studies/CaseStudyChallenge'
import CaseStudyApproach from '@/components/case-studies/CaseStudyApproach'
import CaseStudyGallery from '@/components/case-studies/CaseStudyGallery'
import CaseStudyResults from '@/components/case-studies/CaseStudyResults'
import CaseStudyFullImage from '@/components/case-studies/CaseStudyFullImage'
import CaseStudyFeature from '@/components/case-studies/CaseStudyFeature'
import { getCaseStudyContent } from '@/data/case-studies-content'

export default function YourCaseStudyPage() {
  const content = getCaseStudyContent('your-case-study-id')

  if (!content) {
    return <div>Case study not found</div>
  }

  return (
    <CaseStudyLayout content={content}>
      <CaseStudyHero hero={content.hero} />
      <CaseStudyOverview overview={content.overview} />
      <CaseStudyChallenge challenge={content.challenge} />
      {content.fullImages?.[0] && <CaseStudyFullImage image={content.fullImages[0]} />}
      <CaseStudyApproach approach={content.approach} />
      {content.feature && <CaseStudyFeature image={content.feature} />}
      {content.gallery && <CaseStudyGallery gallery={content.gallery} />}
      {content.fullImages?.[1] && <CaseStudyFullImage image={content.fullImages[1]} />}
      <CaseStudyResults results={content.results} />
    </CaseStudyLayout>
  )
}
```

## Image Path Utilities

Use the image path utilities from `lib/case-study-images.ts`:

```typescript
import {
  getCaseStudyHero,
  getCaseStudyThumb,
  getCaseStudyApproach,
  getCaseStudyGallery,
  getCaseStudyFeature,
  getCaseStudyFull,
} from '@/lib/case-study-images'

// Get hero image path
const heroPath = getCaseStudyHero('case-study-id') // Uses hero/hero.webp
const customHero = getCaseStudyHero('case-study-id', 'custom-hero.webp')

// Get other image types
const thumbPath = getCaseStudyThumb('case-study-id')
const approachPath = getCaseStudyApproach('case-study-id', 'approach-1.webp')
const galleryPath = getCaseStudyGallery('case-study-id', 'gallery-1.webp')
const featurePath = getCaseStudyFeature('case-study-id')
const fullPath = getCaseStudyFull('case-study-id', 'full-1.webp')
```

## Components Reference

### CaseStudyLayout
Wrapper component that provides header, footer, animations, and structured data.

**Props:**
- `content: CaseStudyContent` - Case study content
- `children: React.ReactNode` - Page content

### CaseStudyHero
Hero section with background image, title, tagline, and subtitle.

**Props:**
- `hero: HeroSection`

### CaseStudyOverview
Overview section with meta information and description.

**Props:**
- `overview: OverviewSection`

### CaseStudyChallenge
Challenge section with quote, description, and success criteria.

**Props:**
- `challenge: ChallengeSection`

### CaseStudyApproach
Approach section with text, tools, systems, iterations, deliverables, and modules.

**Props:**
- `approach: ApproachSection`

### CaseStudyGallery
Gallery section with flexible row layouts (3 columns, 2 columns, asymmetric).

**Props:**
- `gallery: GallerySection`

### CaseStudyResults
Results section with text and takeaway quote.

**Props:**
- `results: ResultsSection`

### CaseStudyFullImage
Full-bleed image component.

**Props:**
- `image: CaseStudyImage`

### CaseStudyFeature
Feature image component with dark background.

**Props:**
- `image: CaseStudyImage`

## Variants

Some case studies use variants for styling (e.g., gold accent for Remoria):

- Set `variant: 'gold'` in `overview`, `challenge`, `results`, or `tools` to use gold accent
- Default variant is `'default'` (accent color)

## Type Safety

All types are defined in `types/case-study.ts`. TypeScript will catch errors during development.

## Best Practices

1. **Image Optimization**: Use WebP format, optimize file sizes
2. **Alt Text**: Always provide descriptive alt text for accessibility
3. **Sizes**: Use appropriate `sizes` attribute for responsive images
4. **Content Structure**: Follow the existing pattern for consistency
5. **Testing**: Test on different screen sizes after adding content

## Migration from Old Structure

If you have existing case studies using the old structure:

1. Move images to new folder structure
2. Update image paths in `case-studies-content.ts` to use utilities
3. Replace page component with new component-based structure
4. Verify all images load correctly

