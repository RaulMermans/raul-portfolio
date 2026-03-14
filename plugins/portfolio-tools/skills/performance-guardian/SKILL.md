---
name: performance-guardian
description: Guide for maintaining performance in the portfolio. This skill should be used when optimizing loading times, managing caching, implementing lazy loading, or ensuring Core Web Vitals compliance. Covers caching rules, bundle optimization, and Lighthouse score targets.
---

# Performance Guardian

This skill provides guidance for maintaining fast loading times and excellent Core Web Vitals scores.

## Core Web Vitals Targets

| Metric | Target | Good | Needs Improvement | Poor |
|--------|--------|------|-------------------|------|
| LCP (Largest Contentful Paint) | < 2.5s | < 2.5s | 2.5s - 4s | > 4s |
| FID (First Input Delay) | < 100ms | < 100ms | 100ms - 300ms | > 300ms |
| CLS (Cumulative Layout Shift) | < 0.1 | < 0.1 | 0.1 - 0.25 | > 0.25 |
| INP (Interaction to Next Paint) | < 200ms | < 200ms | 200ms - 500ms | > 500ms |

## Caching Strategy

### Cache Headers (next.config.js)

The project uses these cache rules - DO NOT MODIFY without careful review:

```javascript
// API routes - NEVER cache
'/api/:path*': 'no-cache, no-store, must-revalidate'

// Static assets (fingerprinted) - Cache aggressively
'/_next/static/:path*': 'public, max-age=31536000, immutable'

// Fonts - Cache aggressively
'/fonts/:path*': 'public, max-age=31536000, immutable'

// Images - Cache with revalidation
'/images/:path*': 'public, max-age=3600, stale-while-revalidate=86400'

// Next.js image optimization - Cache with revalidation
'/_next/image': 'public, max-age=3600, stale-while-revalidate=86400'

// HTML pages - Always revalidate
'/:path*': 'public, max-age=0, must-revalidate'
```

### Cache Rules

- **NEVER** cache API routes or POST requests
- **NEVER** long-cache HTML (breaks deploy freshness)
- **ONLY** cache fingerprinted assets aggressively
- **ALWAYS** use `stale-while-revalidate` for images

## Image Optimization

### Priority Loading

Add `priority` to above-the-fold images:

```tsx
// Hero image - loads immediately
<Image
  src={heroImage}
  alt="Hero"
  priority
  sizes="100vw"
/>

// Below-fold images - lazy load (default)
<Image
  src={galleryImage}
  alt="Gallery"
  sizes="50vw"
/>
```

### Responsive Sizes

Always specify `sizes` to help browser choose optimal image:

```tsx
// Full width
sizes="100vw"

// Half width on desktop
sizes="(max-width: 768px) 100vw, 50vw"

// Fixed max width
sizes="(max-width: 400px) 100vw, 400px"
```

### Image Format

Next.js automatically serves AVIF/WebP. Configure in next.config.js:

```javascript
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
}
```

## Code Splitting

### Dynamic Imports

Use dynamic imports for heavy components:

```tsx
import dynamic from 'next/dynamic'

// Heavy animation component - client only
const HeroBackground = dynamic(() => import('./HeroBackground'), {
  ssr: false,
  loading: () => <div className="hero-background" aria-hidden="true" />,
})

// Conditional loading
const AdminPanel = dynamic(() => import('./AdminPanel'), {
  loading: () => <Skeleton />,
})
```

### When to Use Dynamic Imports

- Heavy visualization libraries (charts, maps)
- Below-the-fold content
- Conditionally rendered components
- Client-only components (ssr: false)

### Route-Based Splitting

Next.js automatically splits by route. Keep page components focused.

## Bundle Size

### Before Adding Dependencies

1. Check bundle impact: `npm run build && npm run analyze`
2. Look for lighter alternatives
3. Consider if you can implement manually
4. Check if tree-shakeable

### Common Heavy Libraries to Avoid

| Library | Size | Alternative |
|---------|------|-------------|
| moment.js | 300KB+ | date-fns, dayjs |
| lodash | 70KB+ | lodash-es (tree-shake) |
| animate.css | 80KB+ | CSS transitions |
| jquery | 90KB+ | Native DOM APIs |

### Import Only What You Need

```tsx
// Bad - imports entire library
import _ from 'lodash'

// Good - imports single function
import debounce from 'lodash/debounce'

// Better - native implementation
const debounce = (fn, ms) => {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), ms)
  }
}
```

## Lazy Loading

### Component Lazy Loading

```tsx
const Gallery = dynamic(() => import('@/components/Gallery'), {
  loading: () => <GallerySkeleton />,
})
```

### Intersection Observer Pattern

```tsx
const [isVisible, setIsVisible] = useState(false)
const ref = useRef<HTMLDivElement>(null)

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.disconnect()
      }
    },
    { rootMargin: '100px' } // Load 100px before visible
  )

  if (ref.current) observer.observe(ref.current)
  return () => observer.disconnect()
}, [])

return (
  <div ref={ref}>
    {isVisible && <HeavyComponent />}
  </div>
)
```

## Font Optimization

### Next.js Font Loading

```tsx
// app/layout.tsx
import { Inter, Bebas_Neue } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Show fallback immediately
  variable: '--font-inter',
})

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bebas',
})
```

### Font Display Values

- `swap` - Show fallback immediately, swap when loaded (recommended)
- `optional` - Use fallback if font doesn't load quickly
- `block` - Hide text briefly while loading (avoid)

## Render Blocking

### Avoid Render-Blocking Resources

- Defer non-critical JavaScript
- Inline critical CSS
- Use `async` or `defer` for scripts

### Critical CSS

Keep above-fold styles minimal:

```css
/* Critical - inline in <head> */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
}

/* Non-critical - can load async */
.footer {
  /* ... */
}
```

## Layout Shift Prevention

### Reserve Space for Images

```tsx
// Always specify dimensions
<Image
  src={image}
  alt="Description"
  width={800}
  height={600}
/>

// Or use aspect-ratio container
<div style={{ aspectRatio: '16/9', position: 'relative' }}>
  <Image src={image} alt="Description" fill />
</div>
```

### Reserve Space for Dynamic Content

```css
/* Skeleton with fixed dimensions */
.skeleton {
  width: 100%;
  height: 200px; /* Match expected content height */
}
```

### Font Loading Shift

Use `font-display: swap` with similar fallback metrics:

```css
:root {
  --font-fallback: system-ui, -apple-system, sans-serif;
}

body {
  font-family: var(--font-inter), var(--font-fallback);
}
```

## Event Handler Optimization

### Passive Event Listeners

```tsx
// Always use passive for scroll/touch
element.addEventListener('scroll', handler, { passive: true })
element.addEventListener('touchstart', handler, { passive: true })
element.addEventListener('wheel', handler, { passive: true })
```

### Debounce/Throttle

```tsx
// Debounce resize handlers
useEffect(() => {
  let timeoutId: NodeJS.Timeout
  
  const handleResize = () => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      // Expensive operation
    }, 150)
  }
  
  window.addEventListener('resize', handleResize, { passive: true })
  return () => {
    window.removeEventListener('resize', handleResize)
    clearTimeout(timeoutId)
  }
}, [])
```

### RAF for Animations

```tsx
// Use requestAnimationFrame for visual updates
const handleScroll = () => {
  requestAnimationFrame(() => {
    // Update visual state
  })
}
```

## Measurement

### Lighthouse

Run Lighthouse audits regularly:

```bash
# Chrome DevTools > Lighthouse tab
# Or use CLI
npx lighthouse https://raulmermans.com --view
```

### Web Vitals Monitoring

```tsx
// Track Core Web Vitals
import { onCLS, onFID, onLCP, onINP } from 'web-vitals'

onCLS(console.log)
onFID(console.log)
onLCP(console.log)
onINP(console.log)
```

### Performance API

```tsx
// Measure specific operations
performance.mark('start')
// ... operation
performance.mark('end')
performance.measure('Operation', 'start', 'end')

const measure = performance.getEntriesByName('Operation')[0]
console.log(`Duration: ${measure.duration}ms`)
```

## Performance Checklist

### Initial Load

- [ ] Hero image has `priority`
- [ ] No render-blocking resources
- [ ] Fonts use `display: swap`
- [ ] Critical CSS is inline or preloaded
- [ ] JavaScript is code-split

### Runtime

- [ ] Scroll handlers use passive listeners
- [ ] Animations use RAF
- [ ] Event handlers are debounced/throttled
- [ ] Heavy components are lazy loaded

### Images

- [ ] All images have `sizes` attribute
- [ ] WebP format used
- [ ] Appropriate quality (not 100 everywhere)
- [ ] Lazy loading for below-fold

### Bundle

- [ ] No unnecessary dependencies
- [ ] Tree-shaking enabled
- [ ] Dynamic imports for heavy code
- [ ] Production build is optimized

## Verification Commands

```bash
# Build and analyze
npm run build

# Check bundle size
npm run analyze # If configured

# Lighthouse audit
npx lighthouse https://raulmermans.com --view

# Check cache headers
curl -I https://www.raulmermans.com
curl -I https://www.raulmermans.com/_next/static/chunks/main.js
curl -I https://www.raulmermans.com/images/hero.webp
```

## Quick Wins

1. **Add priority to hero image** - Immediate LCP improvement
2. **Lazy load below-fold images** - Reduce initial load
3. **Use passive event listeners** - Smoother scrolling
4. **Debounce resize handlers** - Less CPU usage
5. **Specify image dimensions** - Zero CLS
6. **Use font-display: swap** - Faster text render
