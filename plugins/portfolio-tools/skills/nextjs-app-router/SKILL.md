---
name: nextjs-app-router
description: Guide for Next.js 14 App Router patterns in the portfolio. This skill should be used when creating pages, layouts, API routes, or working with metadata. Covers server/client component decisions, metadata generation, routing conventions, and data fetching patterns.
---

# Next.js App Router

This skill provides guidance for Next.js 14 App Router patterns used in the portfolio.

## File Conventions

### Directory Structure

```
app/
├── layout.tsx          # Root layout (required)
├── page.tsx            # Homepage
├── not-found.tsx       # 404 page
├── global-error.tsx    # Error boundary
├── about/
│   ├── layout.tsx      # Section layout with metadata
│   └── page.tsx        # Page component
├── case-studies/
│   ├── layout.tsx      # Case studies section layout
│   ├── [slug]/         # Dynamic route
│   │   ├── layout.tsx  # Per-case-study metadata
│   │   └── page.tsx    # Case study page
└── api/
    └── contact/
        └── route.ts    # API route handler
```

### File Purposes

| File | Purpose |
|------|---------|
| `page.tsx` | UI for a route segment |
| `layout.tsx` | Shared UI wrapper + metadata |
| `loading.tsx` | Loading UI (Suspense) |
| `error.tsx` | Error UI boundary |
| `not-found.tsx` | 404 UI |
| `route.ts` | API endpoint |

## Server vs Client Components

### Decision Tree

```
Does the component need...?
│
├── React hooks (useState, useEffect, useRef)?
│   └── 'use client'
│
├── Event handlers (onClick, onChange, onSubmit)?
│   └── 'use client'
│
├── Browser APIs (window, document, localStorage)?
│   └── 'use client'
│
├── Third-party client libraries?
│   └── 'use client'
│
└── None of the above?
    └── Server Component (no directive)
```

### Server Component (Default)

```tsx
// No 'use client' directive needed
import { getData } from '@/lib/data'

export default async function Page() {
  const data = await getData() // Can fetch directly
  
  return (
    <main>
      <h1>{data.title}</h1>
    </main>
  )
}
```

**Benefits:**
- Zero JavaScript sent to client
- Direct database/API access
- Smaller bundle size
- Better SEO

### Client Component

```tsx
'use client'

import { useState, useEffect } from 'react'

export default function InteractiveComponent() {
  const [count, setCount] = useState(0)
  
  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  )
}
```

**When Required:**
- Interactivity (clicks, inputs)
- State management
- Effects (useEffect)
- Browser-only APIs

### Composition Pattern

Keep client components small and at the leaves:

```tsx
// page.tsx (Server Component)
import ClientButton from './ClientButton'

export default function Page() {
  return (
    <main>
      <h1>Server-rendered title</h1>
      <p>Server-rendered content</p>
      <ClientButton /> {/* Only this is client */}
    </main>
  )
}
```

## Metadata

### Static Metadata (Layout)

```tsx
import type { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://raulmermans.com'

export const metadata: Metadata = {
  title: 'Page Title — Raúl Mermans',
  description: 'Page description for SEO (150-160 characters recommended).',
  
  // Open Graph (social sharing)
  openGraph: {
    title: 'Page Title — Raúl Mermans',
    description: 'Description for social cards.',
    url: `${baseUrl}/page-path`,
    siteName: 'Raúl Mermans',
    type: 'website', // or 'article' for blog posts
    images: [
      {
        url: `${baseUrl}/images/og-image.webp`,
        width: 1200,
        height: 630,
        alt: 'Page preview image',
      },
    ],
  },
  
  // Twitter card
  twitter: {
    card: 'summary_large_image',
    title: 'Page Title — Raúl Mermans',
    description: 'Description for Twitter.',
  },
  
  // Canonical URL
  alternates: {
    canonical: `${baseUrl}/page-path`,
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
```

### Dynamic Metadata

```tsx
import type { Metadata } from 'next'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await fetchData(params.slug)
  
  return {
    title: `${data.title} — Raúl Mermans`,
    description: data.description,
  }
}

export default function Page({ params }: Props) {
  // ...
}
```

### Title Template (Root Layout)

```tsx
// app/layout.tsx
export const metadata: Metadata = {
  title: {
    default: 'Raúl Mermans — Visual Storyteller',
    template: '%s — Raúl Mermans', // Child pages use this
  },
}
```

Child layouts can then use simple titles:
```tsx
export const metadata: Metadata = {
  title: 'About', // Becomes "About — Raúl Mermans"
}
```

## Routing

### Static Routes

```
app/about/page.tsx      → /about
app/contact/page.tsx    → /contact
app/work/page.tsx       → /work
```

### Dynamic Routes

```
app/case-studies/[slug]/page.tsx  → /case-studies/ai-sports
                                  → /case-studies/remoria
```

Access params:
```tsx
export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params
  return <div>Case study: {slug}</div>
}
```

### Route Groups

Use parentheses for organization without URL impact:

```
app/(marketing)/about/page.tsx   → /about
app/(marketing)/contact/page.tsx → /contact
app/(portfolio)/work/page.tsx    → /work
```

### Parallel Routes

```
app/@modal/login/page.tsx
app/layout.tsx  // Receives { modal } prop
```

## API Routes

### Route Handler Pattern

```tsx
// app/api/endpoint/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  return NextResponse.json({ data: 'value' })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  
  // Process...
  
  return NextResponse.json(
    { success: true },
    { status: 200 }
  )
}
```

### Available Methods

```tsx
export async function GET(request: NextRequest) {}
export async function POST(request: NextRequest) {}
export async function PUT(request: NextRequest) {}
export async function PATCH(request: NextRequest) {}
export async function DELETE(request: NextRequest) {}
export async function HEAD(request: NextRequest) {}
export async function OPTIONS(request: NextRequest) {}
```

### Request Helpers

```tsx
export async function GET(request: NextRequest) {
  // URL and search params
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')
  
  // Headers
  const authHeader = request.headers.get('authorization')
  
  // Cookies
  const token = request.cookies.get('token')
  
  return NextResponse.json({ query })
}
```

### Response Helpers

```tsx
// JSON response
return NextResponse.json({ data }, { status: 200 })

// With headers
return NextResponse.json(
  { data },
  {
    status: 200,
    headers: {
      'Cache-Control': 'no-store',
      'X-Custom-Header': 'value',
    },
  }
)

// Redirect
return NextResponse.redirect(new URL('/login', request.url))

// Error response
return NextResponse.json(
  { error: 'Not found' },
  { status: 404 }
)
```

## Loading States

### Loading UI

```tsx
// app/case-studies/loading.tsx
export default function Loading() {
  return (
    <div className="loading-skeleton">
      <div className="skeleton skeleton--hero" />
      <div className="skeleton skeleton--text" />
    </div>
  )
}
```

### Suspense Boundaries

```tsx
import { Suspense } from 'react'

export default function Page() {
  return (
    <main>
      <h1>Page Title</h1>
      <Suspense fallback={<LoadingSkeleton />}>
        <AsyncComponent />
      </Suspense>
    </main>
  )
}
```

## Error Handling

### Error Boundary

```tsx
// app/case-studies/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
```

### Not Found

```tsx
// app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div>
      <h2>Page Not Found</h2>
      <p>Could not find the requested resource.</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}
```

Trigger programmatically:
```tsx
import { notFound } from 'next/navigation'

export default function Page({ params }) {
  const data = getData(params.id)
  
  if (!data) {
    notFound() // Renders not-found.tsx
  }
  
  return <div>{data.title}</div>
}
```

## Navigation

### Link Component

```tsx
import Link from 'next/link'

// Basic link
<Link href="/about">About</Link>

// With hash
<Link href="/#contact">Contact</Link>

// Dynamic route
<Link href={`/case-studies/${slug}`}>View Case Study</Link>

// Prefetch disabled (for less important links)
<Link href="/terms" prefetch={false}>Terms</Link>
```

### Programmatic Navigation

```tsx
'use client'

import { useRouter } from 'next/navigation'

export default function Component() {
  const router = useRouter()
  
  const handleClick = () => {
    router.push('/destination')
    // router.replace('/destination') // No history entry
    // router.back() // Go back
    // router.refresh() // Refresh current route
  }
}
```

### Safe Navigation Utility

Use the project's safe navigation helper:

```tsx
import { safeNavigate } from '@/lib/safeNavigation'

// Prevents navigation during transitions
safeNavigate('/destination')
```

## Dynamic Imports

### Client Component Lazy Loading

```tsx
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
  ssr: false, // Skip server rendering if needed
})

export default function Page() {
  return (
    <div>
      <HeavyComponent />
    </div>
  )
}
```

### Conditional Loading

```tsx
const AdminPanel = dynamic(() => import('./AdminPanel'), {
  loading: () => <Skeleton />,
})

export default function Page({ isAdmin }) {
  return (
    <div>
      {isAdmin && <AdminPanel />}
    </div>
  )
}
```

## Environment Variables

### Server-side (default)

```tsx
// Only available in Server Components and API routes
const apiKey = process.env.API_KEY
```

### Client-side

```tsx
// Must be prefixed with NEXT_PUBLIC_
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
```

### Validation

Check `lib/env-validation.ts` for required variables before using.

## Common Patterns in This Project

### Page with Scroll Reveal

```tsx
'use client'

import { useEffect } from 'react'

export default function Page() {
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )
    
    reveals.forEach((el) => observer.observe(el))
    
    return () => observer.disconnect()
  }, [])
  
  return (
    <main>
      <section className="reveal">Content</section>
    </main>
  )
}
```

### Layout with Conditional Header Style

```tsx
'use client'

import { useEffect } from 'react'

export default function DarkHeroPage() {
  useEffect(() => {
    const logo = document.querySelector('.ui__logo')
    if (logo) logo.classList.add('on-dark')
    
    return () => {
      if (logo) logo.classList.remove('on-dark')
    }
  }, [])
  
  return <main>{/* Dark hero content */}</main>
}
```
