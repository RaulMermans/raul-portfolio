# Caching Strategy

This document outlines the caching strategy for the portfolio website to optimize performance and reduce server load.

## Caching Layers

```
┌─────────────────────────────────────┐
│   Browser Cache (HTTP Cache)        │
│   - Static assets                   │
│   - Images                          │
│   - Fonts                           │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│   CDN Cache (Vercel Edge Network)   │
│   - Static pages                    │
│   - API responses                   │
│   - Images                          │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│   Next.js Cache (ISR/SSG)           │
│   - Pre-rendered pages              │
│   - API route responses             │
└─────────────────────────────────────┘
```

## Next.js Caching

### Static Generation (SSG)

For pages that don't change frequently:

```typescript
// app/about/page.tsx
export default function AboutPage() {
  return <div>About content</div>
}

// Pages are statically generated at build time
// Cached forever until next build
```

### Incremental Static Regeneration (ISR)

For pages that update occasionally:

```typescript
// app/projects/page.tsx
export const revalidate = 3600 // Revalidate every hour

export default async function ProjectsPage() {
  const projects = await fetchProjects()
  return <div>{/* Projects */}</div>
}
```

### API Route Caching

Cache API responses:

```typescript
// app/api/projects/route.ts
import { NextResponse } from 'next/server'

export const revalidate = 3600 // Cache for 1 hour

export async function GET() {
  const projects = await fetchProjects()
  
  return NextResponse.json(projects, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
```

### Dynamic Route Caching

For dynamic routes, use `generateStaticParams`:

```typescript
// app/projects/[slug]/page.tsx
export async function generateStaticParams() {
  const projects = await fetchProjects()
  return projects.map((project) => ({ slug: project.slug }))
}

export default async function ProjectPage({ params }) {
  const project = await fetchProject(params.slug)
  return <div>{/* Project content */}</div>
}
```

## HTTP Cache Headers

### Static Assets

Next.js automatically sets cache headers for static assets:
- **Cache-Control**: `public, max-age=31536000, immutable`
- Assets are cached for 1 year (browser cache)

### Images

Next.js Image component optimizes and caches images:

```typescript
import Image from 'next/image'

<Image
  src="/images/photo.jpg"
  alt="Photo"
  width={800}
  height={600}
  priority={false} // Lazy load by default
  // Images are automatically optimized and cached
/>
```

### Custom Cache Headers

Set cache headers in API routes:

```typescript
// app/api/data/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  const data = await fetchData()
  
  return NextResponse.json(data, {
    headers: {
      // Cache for 1 hour, allow stale for 24 hours
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      
      // Or no cache
      // 'Cache-Control': 'no-store, no-cache, must-revalidate',
      
      // Or cache in browser only
      // 'Cache-Control': 'private, max-age=3600',
    },
  })
}
```

## Image Caching

### Next.js Image Optimization

Next.js automatically:
- Optimizes images (WebP, AVIF formats)
- Generates responsive sizes
- Lazy loads images
- Caches optimized images

### Image Cache Strategy

```typescript
// app/photography/page.tsx
import Image from 'next/image'

export default function PhotographyPage() {
  return (
    <div>
      {photos.map((photo) => (
        <Image
          key={photo.id}
          src={photo.url}
          alt={photo.alt}
          width={1200}
          height={800}
          loading="lazy" // Lazy load (default)
          placeholder="blur" // Show blur placeholder
          blurDataURL={photo.blurDataURL}
          // Images are cached with immutable cache headers
        />
      ))}
    </div>
  )
}
```

## API Response Caching

### Cache-Control Headers

Use appropriate cache headers based on content type:

```typescript
// Frequently updated content (5 minutes)
'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600'

// Moderately updated content (1 hour)
'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'

// Rarely updated content (1 day)
'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800'

// Never cache (real-time data)
'Cache-Control': 'no-store, no-cache, must-revalidate'

// Private cache (user-specific)
'Cache-Control': 'private, max-age=3600'
```

### Example: Contact Form API

```typescript
// app/api/contact/route.ts
import { NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  // POST requests should not be cached
  // No cache headers needed (Next.js handles this)
  
  const result = await processContactForm(request)
  return NextResponse.json(result)
}
```

### Example: Projects API

```typescript
// app/api/projects/route.ts
import { NextResponse } from 'next/server'

export const revalidate = 3600 // Revalidate every hour

export async function GET() {
  const projects = await fetchProjects()
  
  return NextResponse.json(projects, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
```

## Client-Side Caching

### React Query / SWR (Optional)

For client-side data fetching with caching:

```typescript
// Using SWR
import useSWR from 'swr'

function ProjectsList() {
  const { data, error } = useSWR('/api/projects', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    dedupingInterval: 60000, // Dedupe requests for 1 minute
  })
  
  if (error) return <div>Error loading projects</div>
  if (!data) return <div>Loading...</div>
  
  return <div>{/* Projects */}</div>
}
```

### Browser Cache (Service Worker - Optional)

For offline support and advanced caching:

```typescript
// public/sw.js (Service Worker)
self.addEventListener('fetch', (event) => {
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.open('images').then((cache) => {
        return cache.match(event.request).then((response) => {
          return (
            response ||
            fetch(event.request).then((response) => {
              cache.put(event.request, response.clone())
              return response
            })
          )
        })
      })
    )
  }
})
```

## Cache Invalidation

### Time-Based Invalidation

Use `revalidate` for time-based cache invalidation:

```typescript
// Revalidate every hour
export const revalidate = 3600

// Revalidate every 5 minutes
export const revalidate = 300
```

### On-Demand Revalidation

Invalidate cache when content changes:

```typescript
// app/api/revalidate/route.ts
import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-revalidate-secret')
  
  // Verify secret
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  const { path } = await request.json()
  
  // Revalidate specific path
  revalidatePath(path)
  
  return NextResponse.json({ revalidated: true })
}
```

Call revalidation API when content updates:

```bash
curl -X POST https://yourdomain.com/api/revalidate \
  -H "x-revalidate-secret: your-secret" \
  -H "Content-Type: application/json" \
  -d '{"path": "/projects"}'
```

## Cache Strategy by Content Type

### Static Pages (Home, About, etc.)

```typescript
// Static generation with ISR
export const revalidate = 86400 // Revalidate daily

// Or fully static (no revalidation)
// No revalidate export needed
```

### Dynamic Pages (Projects, Blog Posts)

```typescript
// ISR with shorter revalidation
export const revalidate = 3600 // Revalidate hourly

// Or on-demand revalidation
// Use revalidatePath() when content updates
```

### API Routes

```typescript
// Cache API responses
export const revalidate = 3600

export async function GET() {
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
```

### Images

```typescript
// Next.js Image component handles caching automatically
// Images are cached with immutable headers
<Image src="/photo.jpg" width={800} height={600} />
```

## Performance Considerations

### Cache Size Limits

- **Browser cache**: ~50-100MB (varies by browser)
- **CDN cache**: Unlimited (Vercel Edge Network)
- **Next.js cache**: Limited by available disk space

### Cache Hit Rates

Monitor cache hit rates:
- Target: > 80% cache hit rate for static assets
- Target: > 60% cache hit rate for API responses

### Cache Warming

Pre-warm caches for critical pages:

```typescript
// scripts/warm-cache.ts
async function warmCache() {
  const pages = ['/', '/about', '/projects', '/photography']
  
  for (const page of pages) {
    await fetch(`https://yourdomain.com${page}`)
    console.log(`Warmed cache for ${page}`)
  }
}

warmCache()
```

## Best Practices

### 1. Cache Static Assets Aggressively

- Images, fonts, CSS, JS should be cached long-term
- Use immutable cache headers for versioned assets

### 2. Use ISR for Dynamic Content

- Balance freshness with performance
- Use shorter revalidation for frequently updated content

### 3. Implement Stale-While-Revalidate

- Serve stale content while revalidating
- Improves perceived performance

### 4. Cache at Multiple Levels

- Browser cache
- CDN cache
- Server-side cache

### 5. Monitor Cache Performance

- Track cache hit rates
- Monitor cache sizes
- Adjust cache durations based on data

## Cache Headers Reference

```
# Long-term cache (static assets)
Cache-Control: public, max-age=31536000, immutable

# Medium-term cache (ISR pages)
Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400

# Short-term cache (frequently updated)
Cache-Control: public, s-maxage=300, stale-while-revalidate=3600

# No cache (real-time data)
Cache-Control: no-store, no-cache, must-revalidate

# Private cache (user-specific)
Cache-Control: private, max-age=3600
```

## Checklist

- [ ] Static pages use SSG or ISR
- [ ] API routes have appropriate cache headers
- [ ] Images use Next.js Image component
- [ ] Cache revalidation strategy defined
- [ ] On-demand revalidation implemented (if needed)
- [ ] Cache headers tested
- [ ] Cache performance monitored

## Additional Resources

- [Next.js Caching](https://nextjs.org/docs/app/building-your-application/caching)
- [HTTP Caching](https://web.dev/http-cache/)
- [Cache-Control Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)

