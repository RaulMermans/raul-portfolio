---
name: seo-optimizer
description: Guide for SEO optimization in the portfolio. This skill should be used when creating pages, writing metadata, implementing structured data, or ensuring search engine visibility. Covers metadata patterns, Open Graph, structured data schemas, and semantic HTML best practices.
---

# SEO Optimizer

This skill provides guidance for maximizing search engine visibility of the portfolio.

## Metadata Checklist

Every page needs:

- [ ] Unique, descriptive title (50-60 characters)
- [ ] Meta description (150-160 characters)
- [ ] Canonical URL
- [ ] Open Graph tags (title, description, image)
- [ ] Twitter card tags
- [ ] Proper heading hierarchy (single H1)

## Title Format

### Pattern

```
{Page Title} — Raúl Mermans
```

### Examples

```tsx
// Homepage
title: 'Raúl Mermans — Visual Storyteller & Creative Director in Spain'

// About page
title: 'About — Raúl Mermans'

// Case study
title: 'AI Sports Campaign — Raúl Mermans'

// Photography
title: 'Photography — Raúl Mermans'
```

### Title Template (Root Layout)

```tsx
// app/layout.tsx
export const metadata: Metadata = {
  title: {
    default: 'Raúl Mermans — Visual Storyteller & Creative Director',
    template: '%s — Raúl Mermans',
  },
}
```

Child pages then use simple titles:
```tsx
export const metadata: Metadata = {
  title: 'About', // Becomes "About — Raúl Mermans"
}
```

## Meta Description

### Guidelines

- 150-160 characters (Google truncates longer)
- Include primary keyword naturally
- Describe page content accurately
- Include call-to-action when appropriate
- Unique for every page

### Examples

```tsx
// Homepage
description: 'Visual storytelling and creative direction by Raúl Mermans. Specializing in photography, brand identity, and AI-powered creatives. Based in Spain.'

// Case study
description: 'AI Sports Campaign case study by Raúl Mermans. Building an n8n automation system for consistent, campaign-grade AI-generated imagery.'

// About
description: 'Learn about Raúl Mermans, a visual storyteller based in Spain specializing in photography, brand identity, and AI-powered creative direction.'
```

## Complete Metadata Template

```tsx
import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://raulmermans.com'

export const metadata: Metadata = {
  // Basic
  title: 'Page Title — Raúl Mermans',
  description: 'Page description with keywords, 150-160 characters.',
  
  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Open Graph
  openGraph: {
    title: 'Page Title — Raúl Mermans',
    description: 'Description for social sharing.',
    url: `${baseUrl}/page-path`,
    siteName: 'Raúl Mermans',
    locale: 'en_US',
    type: 'website', // or 'article' for case studies
    images: [
      {
        url: `${baseUrl}/images/og/page-og.webp`,
        width: 1200,
        height: 630,
        alt: 'Page preview description',
      },
    ],
  },
  
  // Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'Page Title — Raúl Mermans',
    description: 'Description for Twitter.',
    images: [`${baseUrl}/images/og/page-og.webp`],
  },
  
  // Canonical
  alternates: {
    canonical: `${baseUrl}/page-path`,
  },
}
```

## Open Graph Images

### Specifications

- Size: 1200×630 pixels (1.91:1 ratio)
- Format: WebP or PNG
- Max file size: 8MB (prefer under 1MB)
- Include branding/logo
- Clear, readable text

### Per-Page OG Images

```
public/images/og/
├── default-og.webp     # Fallback
├── about-og.webp       # About page
├── photography-og.webp # Photography
└── case-studies/
    ├── ai-sports-og.webp
    └── remoria-og.webp
```

### Using Hero Images as OG

For case studies, the hero image can double as OG image:

```tsx
openGraph: {
  images: [
    {
      url: `${baseUrl}/images/case-studies/ai-sports/hero/hero.webp`,
      width: 1920,
      height: 1080,
      alt: 'AI Sports Campaign by Raúl Mermans',
    },
  ],
}
```

## Structured Data

### Person Schema (Homepage)

```tsx
import { StructuredData } from '@/components/StructuredData'

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Raúl Mermans',
  url: 'https://raulmermans.com',
  image: 'https://raulmermans.com/images/about/profile.webp',
  jobTitle: 'Visual Storyteller & Creative Director',
  description: 'Photography, brand identity, and AI-powered creatives',
  sameAs: [
    'https://instagram.com/raulmermans',
    'https://linkedin.com/in/raulmermans',
  ],
  knowsAbout: [
    'Photography',
    'Brand Identity',
    'Creative Direction',
    'AI-Powered Design',
  ],
}

<StructuredData data={personSchema} />
```

### CreativeWork Schema (Case Studies)

```tsx
const caseStudySchema = {
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: 'AI Sports Campaign',
  description: 'An n8n automation system for consistent AI-generated campaign imagery.',
  author: {
    '@type': 'Person',
    name: 'Raúl Mermans',
    url: 'https://raulmermans.com',
  },
  dateCreated: '2025-01-01',
  image: 'https://raulmermans.com/images/case-studies/ai-sports/hero/hero.webp',
  url: 'https://raulmermans.com/case-studies/ai-sports',
  keywords: ['AI', 'automation', 'creative direction', 'sports marketing'],
}
```

### ImageGallery Schema (Photography)

```tsx
const gallerySchema = {
  '@context': 'https://schema.org',
  '@type': 'ImageGallery',
  name: 'Photography by Raúl Mermans',
  description: 'Landscape, architecture, and street photography collections.',
  author: {
    '@type': 'Person',
    name: 'Raúl Mermans',
  },
  image: images.map(img => ({
    '@type': 'ImageObject',
    contentUrl: `https://raulmermans.com${img.src}`,
    name: img.alt,
  })),
}
```

### BreadcrumbList Schema

```tsx
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://raulmermans.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Case Studies',
      item: 'https://raulmermans.com/case-studies',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'AI Sports Campaign',
      item: 'https://raulmermans.com/case-studies/ai-sports',
    },
  ],
}
```

## Semantic HTML

### Heading Hierarchy

```html
<!-- Correct: Single H1, logical hierarchy -->
<h1>Page Title</h1>
<section>
  <h2>Section Title</h2>
  <h3>Subsection</h3>
  <h3>Subsection</h3>
</section>
<section>
  <h2>Another Section</h2>
</section>

<!-- Wrong: Multiple H1s, skipped levels -->
<h1>Title</h1>
<h1>Another Title</h1>
<h4>Skipped to H4</h4>
```

### Semantic Elements

```html
<header>Site header, navigation</header>

<main>Primary page content</main>

<article>Self-contained content (case study, blog post)</article>

<section>Thematic grouping with heading</section>

<aside>Tangentially related content</aside>

<nav>Navigation links</nav>

<footer>Site footer, legal links</footer>
```

### Article Structure (Case Studies)

```html
<main>
  <article>
    <header>
      <h1>Case Study Title</h1>
      <p>Subtitle/tagline</p>
    </header>
    
    <section id="overview">
      <h2>Overview</h2>
      <p>Content...</p>
    </section>
    
    <section id="challenge">
      <h2>The Challenge</h2>
      <p>Content...</p>
    </section>
    
    <section id="approach">
      <h2>The Approach</h2>
      <p>Content...</p>
    </section>
    
    <section id="results">
      <h2>Results</h2>
      <p>Content...</p>
    </section>
  </article>
</main>
```

## Image SEO

### Alt Text

- Describe image content
- Include relevant keywords naturally
- Keep under 125 characters
- Don't start with "Image of" or "Picture of"

```tsx
// Good
alt="Raúl Mermans editing photos in studio with large monitor display"

// Bad
alt="image1"
alt="Image of a person"
```

### Image File Names

```
// Good
ai-sports-hero.webp
remoria-brand-identity.webp
photography-landscape-mountains.webp

// Bad
IMG_1234.webp
hero.webp (not descriptive)
image (1).webp
```

## Internal Linking

### Navigation Links

```tsx
// Use descriptive link text
<Link href="/case-studies/ai-sports">
  View AI Sports Campaign
</Link>

// Avoid generic text
<Link href="/case-studies/ai-sports">
  Click here {/* Bad */}
</Link>
```

### Related Content

```tsx
// Link to related case studies
<section>
  <h2>Related Work</h2>
  <Link href="/case-studies/remoria">Remoria Brand Identity</Link>
  <Link href="/photography">Photography Portfolio</Link>
</section>
```

## Canonical URLs

### Why Canonicals Matter

- Prevents duplicate content issues
- Consolidates link equity
- Tells Google the "official" URL

### Implementation

```tsx
alternates: {
  canonical: `${baseUrl}/case-studies/ai-sports`,
}
```

### URL Normalization

Ensure consistency:
- Always use `www` or always omit it
- Always use `https`
- No trailing slashes (or always trailing slashes)
- Lowercase paths

## robots.txt

Located at `public/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://raulmermans.com/sitemap.xml

# Disallow admin/API routes
Disallow: /api/
```

## Sitemap

Next.js can generate sitemaps automatically:

```tsx
// app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://raulmermans.com'
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/case-studies/ai-sports`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    // Add all pages...
  ]
}
```

## Performance Impact on SEO

Google considers Core Web Vitals:

- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

See `performance-guardian` skill for optimization.

## SEO Audit Checklist

### Technical

- [ ] All pages have unique titles
- [ ] All pages have meta descriptions
- [ ] Canonical URLs set correctly
- [ ] No broken internal links
- [ ] Images have alt text
- [ ] Site loads under 3 seconds
- [ ] Mobile-friendly (responsive)
- [ ] HTTPS enabled
- [ ] robots.txt configured
- [ ] Sitemap submitted to Google Search Console

### Content

- [ ] Single H1 per page
- [ ] Logical heading hierarchy
- [ ] Descriptive link text
- [ ] Keyword-rich but natural copy
- [ ] Fresh, updated content

### Structured Data

- [ ] Person schema on homepage
- [ ] CreativeWork schema on case studies
- [ ] BreadcrumbList for navigation
- [ ] Validated with Google Rich Results Test
