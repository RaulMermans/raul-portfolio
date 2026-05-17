---
name: new-page-checklist
description: Mandatory checklist when creating any new page in this portfolio. Covers the i18n file structure, metadata, sitemap, accessibility, and common bugs that break the build or hurt SEO. Read this before scaffolding any new route.
user-invocable: true
---

# New Page Checklist

Run through every section below when adding any public page to this site.
This checklist captures bugs and gaps found during the May 2026 production audit.

---

## 1. File structure — i18n routes

This site has **three route trees** for the same page:

| URL | Directory | Who visits |
|---|---|---|
| `/case-studies/foo` | `app/case-studies/foo/` | ES visitors (default locale) |
| `/en/case-studies/foo` | `app/en/case-studies/foo/` | EN visitors |
| `/es/case-studies/foo` | `app/es/case-studies/foo/` | Optional; ES explicit prefix |

**Every new public page needs at minimum:**

```
app/<path>/
├── page.tsx        ← ES version (default locale, no prefix)
└── layout.tsx      ← ES metadata

app/en/<path>/
├── page.tsx        ← re-export from parent: export { default } from '../../<path>/page'
└── layout.tsx      ← EN metadata (buildPageMetadata with locale: 'en')
```

The `app/es/<path>/` variant is optional — only add it if you need the explicit `/es/` prefix path (e.g. for canonical/sitemap parity with existing es pages).

**If the page shares logic across locales**, create a shared component:
```
app/<path>/
├── page-shared.tsx    ← 'use client', reads locale from usePathname()
├── page.tsx           ← import PageShared; return <PageShared />
└── layout.tsx

app/en/<path>/
├── page.tsx           ← export { default } from '../../<path>/page'
└── layout.tsx
```

---

## 2. Metadata — always use `buildPageMetadata`

Never write raw `Metadata` objects. Always use the helper:

```tsx
// app/<path>/layout.tsx
import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Page Title',                        // 50–60 chars
  description: 'Page description.',           // 150–160 chars
  path: '/case-studies/foo',                  // canonical path WITHOUT locale prefix
  locale: 'es',                               // 'es' | 'en'
  image: {
    url: '/images/sections/case-studies-bg.webp',
    alt: 'Descriptive alt text',
    width: 1200,                              // always include dimensions
    height: 630,
  },
  keywords: ['keyword 1', 'keyword 2'],
  // noIndex: true                             // ONLY for privacy, terms, legal, 404
})
```

`buildPageMetadata` automatically sets:
- Canonical URL with proper locale prefix
- `hreflang` alternates for both ES and EN
- Open Graph tags (title, description, image, locale)
- Twitter card tags
- Robots: `index: true, follow: true` (unless `noIndex: true`)
- googleBot directives

**Do NOT set `noIndex: true` on public acquisition pages.** Only use it for:
- `/privacy`, `/terms`, `/overflow/privacy`, `/overflow/terms`
- 404 / not-found pages

---

## 3. Sitemap — update `app/sitemap.ts` for every new public route

Add entries to the `localizedDefinitions` array. The sitemap generator automatically creates both locale variants.

```ts
// app/sitemap.ts — localizedDefinitions array
{ path: '/case-studies/foo', changeFrequency: 'monthly', priority: 0.8 },
```

Priority guide:
| Page type | Priority |
|---|---|
| Homepage | 1.0 |
| About, main case-studies index | 0.9 |
| Apps index | 0.88 |
| Individual case studies | 0.80–0.82 |
| Category pages | 0.78 |
| Photography, Visuals | 0.75 |
| Legal / support | 0.44–0.54 |

**After deploying:** submit the updated sitemap URL to Google Search Console.

---

## 4. Accessibility — required on every page

### Images
- Every `<Image>` must have a meaningful `alt` attribute
- Purely decorative images: `alt=""` (empty string, not omitted)
- Pattern for programmatic alt: `alt={`${category} photo by Raúl Mermans`}` not `alt="photo1"`

### Headings
- Exactly **one `<h1>`** per page (can be visually hidden with `className="visually-hidden"`)
- Logical h2 → h3 hierarchy, no skipped levels
- Section headings linked via `aria-labelledby` to the heading id

### Interactive elements
- Every `<button>` and `<Link>` must have a visible label or `aria-label`
- **`aria-label` must be locale-aware** for bilingual components:
  ```tsx
  aria-label={locale === 'es' ? 'Texto en español' : 'Text in English'}
  ```
  Never hardcode an English string in a component that renders in both locales.
- Form inputs: `<label htmlFor="id">` + `id` on the input + `aria-describedby` for errors

### Keyboard & focus
- Focusable order must follow visual order
- Focus state must be visible (don't remove `:focus-visible` outlines)
- Modal/overlay: trap focus inside while open, restore on close

### Skip link
The root layout includes a skip-to-content link via `<LocaleDocument />`. You do not need to add it per-page.

---

## 5. Common bugs — things that break the build silently

### Smart / curly quotes in JSX break TypeScript
```tsx
// ❌ BROKEN — looks fine in editor but fails tsc
<section className="my-class">

// ✅ CORRECT
<section className="my-class">
```
If you copy-paste from Notion, Google Docs, or a design tool, run:
```bash
python3 -c "
with open('path/to/file.tsx', 'rb') as f: c = f.read()
fixed = c.replace(b'\xe2\x80\x9c', b'\"').replace(b'\xe2\x80\x9d', b'\"')
with open('path/to/file.tsx', 'wb') as f: f.write(fixed)
"
```

### Missing shared component → build error
If multiple pages import a shared file that doesn't exist yet, the build fails even if those pages look fine individually. Create the shared file before the pages that import it.

### `redirect()` from `next/navigation` does not work in Client Components with `output: 'export'`
```tsx
// ❌ Fails in static export
'use client'
import { redirect } from 'next/navigation'
redirect('/somewhere')

// ✅ Use null return or useRouter().replace() instead
if (!data) return null
```

### `usePathname()` returns the actual path during static export
During `next build` with `output: 'export'`, `usePathname()` correctly returns the static path for each page, so `getLocaleFromPath(pathname)` works as expected.

---

## 6. Performance — image and script rules

### next/image
```tsx
// Above the fold (LCP candidates)
<Image priority fetchPriority="high" loading="eager" ... />

// Below the fold
<Image loading="lazy" ... />

// Always include sizes to prevent oversized downloads
sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"

// fill requires position: relative on parent
<div style={{ position: 'relative', aspectRatio: '16/9' }}>
  <Image fill ... />
</div>
```

### Scripts
- Analytics: `<Script strategy="afterInteractive">` — already handled by `GoogleAnalytics` component
- Never add `<script>` tags directly to page files
- Non-critical JS: load via `requestIdleCallback` (see `lib/lazy-bots.ts` for pattern)
- Heavy components: use `dynamic(() => import(...), { ssr: false })` for client-only interactives

---

## 7. Build verification — run all three checks

```bash
npm run lint          # ESLint — catches JSX/import errors
npm run type-check    # tsc via Next.js tsconfig
npx tsc --noEmit      # bare tsc — catches files Next.js tsconfig might skip
npm run build         # full static export — catches runtime errors
```

Run all four, not just one. `npm run type-check` and `npx tsc --noEmit` can give different results because Next.js wraps the compiler with additional type stubs.

---

## 8. Pre-flight checklist

Before marking a new page as done, verify every item:

### SEO
- [ ] `layout.tsx` exists with `buildPageMetadata` for both ES and EN routes
- [ ] `noIndex` is NOT set (unless intentionally private)
- [ ] `app/sitemap.ts` updated with the new path
- [ ] Title is 50–60 chars, description is 150–160 chars
- [ ] OG image has `width: 1200, height: 630`
- [ ] Canonical path is correct (no locale prefix in the `path` argument)

### Accessibility
- [ ] Exactly one `<h1>` on the page
- [ ] All images have meaningful `alt` text (or `alt=""` if decorative)
- [ ] All `aria-label` strings are locale-aware
- [ ] Interactive elements have visible labels
- [ ] Page is navigable by keyboard

### i18n
- [ ] ES page at `app/<path>/page.tsx` + `layout.tsx`
- [ ] EN page at `app/en/<path>/page.tsx` + `layout.tsx`
- [ ] EN layout uses `locale: 'en'` in `buildPageMetadata`
- [ ] Shared components detect locale from `usePathname()` not hardcoded strings

### Performance
- [ ] Hero/LCP image uses `priority` and `fetchPriority="high"`
- [ ] Below-fold images use `loading="lazy"`
- [ ] `sizes` attribute set on all images
- [ ] No new render-blocking scripts added

### Build
- [ ] `npm run lint` passes
- [ ] `npm run type-check` passes
- [ ] `npx tsc --noEmit` passes
- [ ] No smart/curly quotes in JSX attributes
- [ ] All imported modules exist (no missing shared components)
