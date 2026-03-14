---
name: image-manager
description: Guide for managing images in the portfolio. This skill should be used when adding new images, optimizing existing images, implementing Next.js Image components, or organizing image directories. Provides path conventions, optimization settings, and responsive image patterns.
---

# Image Manager

This skill provides guidance for managing images consistently and efficiently in the portfolio.

## Image Format Standards

### Preferred Format: WebP

- Use WebP for all images
- 25-35% smaller than JPEG at equivalent quality
- Supports transparency (unlike JPEG)
- Next.js auto-serves AVIF/WebP when supported

### Quality Settings

| Image Type | Quality | Rationale |
|------------|---------|-----------|
| Hero images | 90 | High visibility, needs detail |
| Gallery images | 90 | Portfolio showcase |
| Thumbnails | 85 | Smaller, less critical |
| Backgrounds | 80 | Often blurred/overlaid |

## Directory Structure

```
public/images/
├── case-studies/
│   └── [slug]/
│       ├── thumb/
│       │   └── thumb.webp
│       ├── hero/
│       │   └── hero.webp
│       ├── approach/
│       │   ├── approach-1.webp
│       │   └── approach-2.webp
│       ├── feature/
│       │   └── feature.webp
│       ├── full/
│       │   └── full.webp
│       └── gallery/
│           ├── gallery-1.webp
│           ├── gallery-2.webp
│           └── gallery-3.webp
├── photography/
│   └── [collection]/
│       └── [image-name].webp
├── visuals/
│   └── [category]/
│       └── [image-name].webp
├── about/
│   └── profile.webp
└── og/
    └── og-image.webp
```

## Image Dimensions

### Recommended Sizes

| Type | Dimensions | Aspect Ratio |
|------|------------|--------------|
| Hero | 1920×1080+ | 16:9 |
| Feature | 1400×auto | varies |
| Full Bleed | 1920×auto | varies |
| Thumbnail | 800×600 | 4:3 |
| Gallery (2-col) | 960×720 | 4:3 |
| Gallery (3-col) | 640×480 | 4:3 |
| OG Image | 1200×630 | ~1.91:1 |
| Profile | 800×1067 | 3:4 |

### Mobile Considerations

Next.js generates responsive versions automatically:
- 640w, 750w, 828w, 1080w, 1200w, 1920w, 2048w, 3840w

Provide source images at 2x the display size for retina screens.

## Next.js Image Component

### Basic Usage

```tsx
import Image from 'next/image'

<Image
  src="/images/about/profile.webp"
  alt="Raúl Mermans portrait"
  width={800}
  height={1067}
  quality={90}
/>
```

### Fill Mode (Responsive Container)

```tsx
<div className="image-container" style={{ position: 'relative', aspectRatio: '16/9' }}>
  <Image
    src="/images/hero.webp"
    alt="Hero image"
    fill
    style={{ objectFit: 'cover' }}
    quality={90}
    sizes="100vw"
  />
</div>
```

### Priority Loading

Add `priority` to above-the-fold images (hero, first visible content):

```tsx
<Image
  src="/images/hero.webp"
  alt="Hero"
  fill
  priority // Preloads image
  quality={90}
  sizes="100vw"
/>
```

### Sizes Attribute

The `sizes` attribute tells the browser which image size to download:

```tsx
// Full width image
sizes="100vw"

// Half width on desktop, full on mobile
sizes="(max-width: 768px) 100vw, 50vw"

// Third width on desktop, full on mobile
sizes="(max-width: 768px) 100vw, 33vw"

// Fixed max width
sizes="(max-width: 1400px) 100vw, 1400px"
```

### Common Patterns by Context

**Hero Image**
```tsx
<Image
  src={heroImage.src}
  alt={heroImage.alt}
  fill
  priority
  quality={90}
  sizes="100vw"
  style={{ objectFit: 'cover' }}
/>
```

**Gallery Grid (2 columns)**
```tsx
<Image
  src={image.src}
  alt={image.alt}
  fill
  quality={90}
  sizes="(max-width: 768px) 100vw, 50vw"
  style={{ objectFit: 'cover' }}
/>
```

**Gallery Grid (3 columns)**
```tsx
<Image
  src={image.src}
  alt={image.alt}
  fill
  quality={90}
  sizes="(max-width: 768px) 100vw, 33vw"
  style={{ objectFit: 'cover' }}
/>
```

**Thumbnail Card**
```tsx
<Image
  src={thumbnail}
  alt={title}
  width={800}
  height={600}
  quality={85}
  sizes="(max-width: 768px) 100vw, 400px"
/>
```

## Image Path Utilities

### Case Study Images

Use the helper functions from `lib/case-study-images.ts`:

```typescript
import { getCaseStudyImagePath } from '@/lib/case-study-images'

// Returns: /images/case-studies/ai-sports/hero/hero.webp
getCaseStudyImagePath('ai-sports', 'hero', 'hero.webp')

// Folder options: 'hero' | 'thumb' | 'approach' | 'gallery' | 'feature' | 'full'
```

### General Images

```typescript
// Simple path construction
const imagePath = `/images/${section}/${filename}.webp`

// With fallback support
import { getImageWithFallback } from '@/lib/image-utils'

const imagePath = getImageWithFallback('profile', 'about')
```

## Alt Text Guidelines

### Requirements

- Every image MUST have alt text
- Describe the image content, not the file name
- Be concise but descriptive (125 characters max for screen readers)
- Don't start with "Image of" or "Picture of"

### Good Examples

```tsx
// Descriptive
alt="Raúl Mermans at work in his studio, editing photos on a large monitor"

// Context-aware
alt="AI Sports Campaign - Athletic model in dynamic running pose with dramatic lighting"

// For decorative images
alt="" // Empty but present
aria-hidden="true"
```

### Bad Examples

```tsx
// Too vague
alt="image"
alt="photo"

// Redundant
alt="Image of a person"

// Missing
// No alt attribute at all
```

## Image Optimization Workflow

### Converting to WebP

Using the project's optimization script:

```bash
# Single image
./scripts/optimize-image.sh input.jpg output.webp

# Or using cwebp directly
cwebp -q 90 input.jpg -o output.webp
```

### Batch Optimization

```bash
# Convert all JPGs in a directory to WebP
for file in *.jpg; do
  cwebp -q 90 "$file" -o "${file%.jpg}.webp"
done
```

### Online Tools

- Squoosh (squoosh.app) - Interactive quality comparison
- TinyPNG - Batch optimization
- ImageOptim (Mac) - Lossless optimization

## CaseStudyImage Component

The project provides a specialized component for case study images:

```tsx
import CaseStudyImage from '@/components/case-studies/CaseStudyImage'

<CaseStudyImage
  image={{
    src: '/images/case-studies/project/hero/hero.webp',
    alt: 'Project hero image',
    quality: 90,
    sizes: '100vw',
  }}
  aspectRatio="16/9"
  className="case-study-hero__image"
/>
```

### Props

| Prop | Type | Description |
|------|------|-------------|
| image | CaseStudyImage | Image config object |
| aspectRatio | string | CSS aspect-ratio (e.g., "16/9", "4/3") |
| className | string | Additional CSS class |

## Lazy Loading

### Default Behavior

Next.js Image lazy loads by default. Images load when approaching viewport.

### Eager Loading

For above-fold content, disable lazy loading with `priority`:

```tsx
<Image
  src={heroImage}
  alt="Hero"
  priority // Loads immediately
/>
```

### Placeholder Blur

For better UX during load:

```tsx
<Image
  src={image}
  alt="Gallery image"
  placeholder="blur"
  blurDataURL={blurDataUrl} // Base64 blur hash
/>
```

Generate blur hash:

```typescript
// Using plaiceholder or similar
import { getPlaiceholder } from 'plaiceholder'

const { base64 } = await getPlaiceholder('/path/to/image.webp')
```

## next.config.js Image Settings

Current configuration:

```javascript
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  minimumCacheTTL: 60,
  dangerouslyAllowSVG: false,
  contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
}
```

## Image Loading States

### With CSS Skeleton

```tsx
<div className="image-wrapper">
  <Image
    src={image}
    alt={alt}
    fill
    onLoadingComplete={(img) => {
      img.parentElement?.classList.add('loaded')
    }}
  />
</div>
```

```css
.image-wrapper {
  position: relative;
  background: var(--color-background-alt);
}

.image-wrapper::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
  animation: shimmer 1.5s infinite;
}

.image-wrapper.loaded::before {
  display: none;
}
```

## Common Issues

### Image Not Loading

1. Check path starts with `/` (not `./` or relative)
2. Verify file exists in `public/` directory
3. Check for typos in filename/extension
4. Ensure WebP format is correct

### Blurry Images

1. Source image too small - provide 2x size
2. Quality too low - increase quality setting
3. Wrong `sizes` attribute - browser downloading smaller version

### Layout Shift (CLS)

1. Always specify `width` and `height` OR use `fill` with container
2. Use `aspect-ratio` on container for responsive images
3. Reserve space with placeholder

### Slow Loading

1. Add `priority` to hero/above-fold images
2. Check `sizes` attribute is correct
3. Optimize source images
4. Use appropriate quality (not 100 for everything)
