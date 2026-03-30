# AI Agent Instructions

> Quick reference for AI coding assistants working on this portfolio project.

## Project Overview

**Stack**: Next.js 14 (App Router) + TypeScript + Tailwind CSS + Resend (email)  
**Deployment**: IONOS (SFTP) + Cloudflare, auto-deploy via GitHub Actions  
**Purpose**: Personal portfolio showcasing photography, brand identity, and AI-powered creative work

## Architecture

```
app/                    # Next.js App Router
  ├── page.tsx          # Homepage (Hero + Work + Contact)
  ├── about/            # About page
  ├── case-studies/     # Dynamic case study pages
  ├── photography/      # Photography gallery
  ├── visuals/          # Visuals gallery
  └── api/              # API routes (contact form, health checks)

components/             # React components (Client & Server)
lib/                    # Utilities, constants, validation
data/                   # Static data (case studies, content)
public/images/          # Static images organized by section
styles/                 # Global CSS + component styles
types/                  # TypeScript type definitions
```

## Key Patterns

### Components
- Use `'use client'` directive only when needed (interactivity, hooks)
- BEM-style class naming: `hero__content`, `hero__cta--primary`
- Refs for DOM manipulation, passive event listeners for performance
- Import constants from `@/lib/constants`

```tsx
// Component pattern
'use client'
import { useRef, useEffect } from 'react'
import { SOME_CONSTANT } from '@/lib/constants'

export default function ComponentName() {
  const ref = useRef<HTMLElement>(null)
  // ... component logic
  return <section ref={ref} className="component-name">...</section>
}
```

### API Routes
- Always rate limit public endpoints
- Validate and sanitize all inputs
- Use `escapeHtml()` for user content
- Return consistent error responses

```tsx
// API route pattern
import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit, getClientIdentifier } from '@/lib/rate-limiter'

export async function POST(request: NextRequest) {
  const clientId = getClientIdentifier(request)
  const rateLimit = checkRateLimit(clientId)
  if (!rateLimit.success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }
  // ... handle request
}
```

### Data/Content
- Case studies defined in `data/case-studies.ts`
- Content separated in `data/case-studies-content.ts`
- Images follow path pattern: `/images/case-studies/{name}/thumb/thumb.webp`

### Metadata & SEO
- Shared SEO helpers live in `lib/metadata.ts`
- Prefer `buildPageMetadata()` for route-level metadata instead of duplicating title, canonical, Open Graph, Twitter, and robots config
- Shared structured data lives in `components/StructuredData.tsx`
- Technical SEO routes live in `app/sitemap.ts`, `app/robots.ts`, and `app/manifest.ts`

### Styling
- Tailwind for utility classes
- Custom CSS in `styles/globals.css` for complex components
- CSS variables for colors: `var(--color-0)`, `var(--color-accent)`
- Reveal animations: `.reveal`, `.reveal-delay-1`, `.reveal-delay-2`

## Common Tasks

### Add a new case study
1. Add entry to `data/case-studies.ts`
2. Create page in `app/case-studies/[slug]/page.tsx`
3. Add images to `public/images/case-studies/[name]/`

### Add a new component
1. Create in `components/` with PascalCase name
2. Add `'use client'` only if interactive
3. Use BEM naming for CSS classes
4. Import in parent component

### Modify API endpoint
1. Edit route in `app/api/[endpoint]/route.ts`
2. Ensure rate limiting is in place
3. Validate inputs, sanitize outputs
4. Test with `curl` or Postman

## Code Quality

- **TypeScript**: Strict mode, explicit types for props
- **ESLint**: `npm run lint` before committing
- **Type Check**: `npm run type-check`
- **Security**: Input validation, HTML escaping, rate limiting

## Environment Variables

Required:
- `NEXT_PUBLIC_SITE_URL` - Site URL

Optional:
- `RESEND_API_KEY` - For contact form emails
- `CONTACT_EMAIL` - Email recipient
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics

See `.env.example` for full list.

## Task Management

Check `TASKS.md` for current project tasks. When completing work:
1. Mark tasks as done: `- [x] Task description`
2. Move to "Completed" section with date
3. Add new tasks discovered during work

## Session Continuity

Use `SESSION.md` to maintain context across coding sessions:

**At session start:**
- Read `SESSION.md` for current state and context
- Check "Active Work" and "Pending Decisions"

**At session end:**
- Update status and add session entry
- Note blockers, decisions, and next steps

This ensures seamless handoffs between sessions.

## Git Commit Convention

Use atomic commits with conventional prefixes:

```bash
feat(scope): add new feature       # New functionality
fix(scope): resolve bug            # Bug fixes
docs(scope): update documentation  # Documentation only
style(scope): formatting/CSS       # No logic changes
refactor(scope): restructure code  # No behavior change
perf(scope): improve performance   # Performance improvements
chore(scope): maintenance          # Dependencies, config
```

**Examples:**
```bash
git commit -m "feat(case-study): add remoria gallery section"
git commit -m "fix(contact): handle empty form submission"
git commit -m "style(hero): adjust mobile padding"
```

## Required: Use Project Skills

Before implementing ANY task, read the relevant skill(s):

| Task Type | Required Skill(s) |
|-----------|-------------------|
| UI/CSS changes, landing pages, dashboards, product UI, design systems | **`plugins/portfolio-tools/skills/ui-ux-lead/SKILL.md`** (default UX/UI orchestration skill), **`ai-skills/ui-ux-pro-max/`** (UI-UX Pro Max — read SKILL.md, run search.py for design system), `design-system/SKILL.md`, `visual-hierarchy/SKILL.md` |
| Case study work | `case-study-builder/SKILL.md` |
| New components | `component-scaffolder/SKILL.md`, `design-system/SKILL.md` |
| API routes | `api-route-builder/SKILL.md`, `security-auditor/SKILL.md` |
| Images | `image-manager/SKILL.md` |
| Animations | `animation-system/SKILL.md` |
| Performance | `performance-guardian/SKILL.md` |
| SEO | `seo-optimizer/SKILL.md` |
| Accessibility | `accessibility-enforcer/SKILL.md` |
| Next.js patterns | `nextjs-app-router/SKILL.md` |
| Deployment | `deployment-verifier/SKILL.md` |

**Always list which skills you consulted at the start of your work.**

### Default Design Intelligence: UI-UX Pro Max

For all UI, frontend, layout, design system, styling, or UX tasks, consult:

- **Skill path**: `ai-skills/ui-ux-pro-max/`
- **SKILL.md**: `ai-skills/ui-ux-pro-max/.claude/skills/ui-ux-pro-max/SKILL.md`
- **Search script**: `ai-skills/ui-ux-pro-max/.claude/skills/ui-ux-pro-max/scripts/search.py`

**Workflow**: Read SKILL.md → Run `--design-system` for new pages → Use `--domain` for style/color/typography details → Apply returned guidance to code.

### Default UX/UI Agent: UI UX Lead

For any substantial UI or UX work, start with:

- **Skill**: `plugins/portfolio-tools/skills/ui-ux-lead/SKILL.md`
- **Agent prompt**: `plugins/portfolio-tools/agents/ui-ux-lead.md`

This is the repo's default high-level design entry point. It is responsible for orchestrating:
- `ai-skills/ui-ux-pro-max/`
- `design-system/SKILL.md`
- `visual-hierarchy/SKILL.md`
- supporting skills such as `case-study-builder`, `nextjs-app-router`, `accessibility-enforcer`, `animation-system`, and `performance-guardian` when relevant

**Default rule**: if a task meaningfully changes how a page or component looks, reads, flows, or feels, invoke `ui-ux-lead` first and treat it as mandatory.

## Keeping Documentation Current

When completing tasks, update these files if you discover:
- New patterns worth documenting
- Corrections to existing guidance
- New skills or commands created
- Changed deployment/config details

Files to update:
- `AGENTS.md` - Quick reference for AI agents
- `CLAUDE.md` - Detailed guide with caching/deployment specifics
- `.cursor/rules/*.mdc` - Domain-specific rules

## Don't Do

- Don't commit `.env` files or secrets
- Don't use `dangerouslySetInnerHTML` without escaping
- Don't skip rate limiting on public APIs
- Don't add dependencies without checking bundle size impact
- Don't use `any` type - define proper interfaces
