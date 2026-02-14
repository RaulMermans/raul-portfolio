# Claude Code Assistant Guide

Quick reference for AI assistants working on this Next.js portfolio project.

## 📚 Existing Documentation

**Read these first before making changes:**
- `README.md` - Quick start, project structure, tech stack
- `DEPLOYMENT.md` - Railway + Cloudflare setup, verification steps
- `ENV_SETUP.md` - Environment variables configuration
- `PROJECT_STRUCTURE.md` - Detailed directory structure
- `docs/guides/CONTACT_FORM_SETUP.md` - Resend email configuration

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router, TypeScript)
- **Styling:** CSS Modules + Global CSS
- **Deployment:** Railway (origin) + Cloudflare (CDN)
- **Email:** Resend API (contact form)
- **Node:** 18.0.0 (see `.nvmrc`)

## 📁 Key Directories

- `app/` - Next.js App Router (pages + API routes)
- `components/` - React components
- `lib/` - Utilities, bots (performance, error, SEO)
- `public/images/` - Static assets (case-studies/, photography/, visuals/)
- `next.config.js` - **CACHE HEADERS (critical!)**
- `middleware.ts` - Security headers only (no caching logic)

See `PROJECT_STRUCTURE.md` for full details.

## 🔧 Development Commands

```bash
npm install        # Install dependencies
npm run dev        # Dev server (http://localhost:3000)
npm run build      # Production build
npm start          # Production server
npm run lint       # ESLint
npm run type-check # TypeScript validation
```

## 🔐 Environment Variables

**Local:** Copy `.env.example` → `.env.local`

**Required variables:**
- `NEXT_PUBLIC_SITE_URL` - Production URL (e.g., https://www.raulmermans.com)
- `RESEND_API_KEY` - Resend API key (for contact form)
- `CONTACT_EMAIL` - Email to receive contact form submissions
- `FROM_EMAIL` - Sender email (e.g., onboarding@resend.dev)

**Optional:**
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics ID (format: G-XXXXXXXXXX)

**Production:** Set these in Railway dashboard → Environment Variables

See `ENV_SETUP.md` and `docs/guides/CONTACT_FORM_SETUP.md` for details.

## 🚀 Deployment

- **Platform:** Railway (auto-deploys from GitHub)
- **CDN:** Cloudflare DNS (proxied with orange cloud ☁️)
- **Domain:** www + apex both CNAME → Railway domain

**See `DEPLOYMENT.md` for complete setup + verification steps.**

## ⚠️ Caching & Headers Guardrails

**CRITICAL:** All caching headers are set in `next.config.js:38-101`

### Current Rules (DO NOT CHANGE without careful review)

1. **API routes** (`/api/:path*`):
   ```
   Cache-Control: no-cache, no-store, must-revalidate
   ```
   ✅ Never cached (contact form, health checks, etc.)

2. **Fingerprinted static assets** (`/_next/static/:path*`):
   ```
   Cache-Control: public, max-age=31536000, immutable
   ```
   ✅ Aggressive 1-year caching (safe - hash-based)

3. **Fonts** (`/fonts/:path*`):
   ```
   Cache-Control: public, max-age=31536000, immutable
   ```
   ✅ Aggressive caching

4. **Images** (`/images/:path*`):
   ```
   Cache-Control: public, max-age=3600, stale-while-revalidate=86400
   ```
   ✅ 1-hour cache with graceful updates

5. **Next.js image optimization** (`/_next/image`):
   ```
   Cache-Control: public, max-age=3600, stale-while-revalidate=86400
   ```
   ✅ 1-hour cache with revalidation

6. **HTML pages** (`/:path*`):
   ```
   Cache-Control: public, max-age=0, must-revalidate
   ```
   ✅ No long-lived caching (ensures fresh deploys)

### Rules When Modifying Caching

- ❌ **NEVER** add global "cache everything" rules
- ❌ **NEVER** cache API routes or POST requests
- ❌ **NEVER** long-cache HTML (breaks deploy freshness)
- ✅ **ONLY** cache fingerprinted assets aggressively
- ✅ **ALWAYS** verify changes with curl tests (see below)

### Middleware

`middleware.ts` only sets **security headers** (X-Content-Type-Options, X-Frame-Options, etc.)
- Does NOT interfere with caching
- Do not add caching logic here

## ✅ Verification Commands

After deploying changes, verify with these commands:

### 1. Cloudflare Proxy Active
```bash
curl -I https://www.raulmermans.com
# Expected: server: cloudflare OR cf-ray: <id>
# Expected: cache-control: public, max-age=0, must-revalidate
```

### 2. Static Assets Cached Correctly
```bash
# Extract actual chunk path
CHUNK_PATH=$(curl -s https://www.raulmermans.com | grep -o '/_next/static/[^"]*\.js' | head -n 1)
echo "Testing: $CHUNK_PATH"

# First request (should be MISS)
curl -I "https://www.raulmermans.com${CHUNK_PATH}"
# Expected: cache-control: public, max-age=31536000, immutable
# Expected: cf-cache-status: MISS

# Second request (should be HIT)
curl -I "https://www.raulmermans.com${CHUNK_PATH}"
# Expected: cf-cache-status: HIT
```

### 3. API Routes NOT Cached
```bash
curl -I https://www.raulmermans.com/api/health
# Expected: cache-control: no-cache, no-store, must-revalidate
# Expected: cf-cache-status: DYNAMIC or BYPASS (NOT HIT)
```

### 4. Contact Form Works
```bash
# Manual test at https://www.raulmermans.com
# Fill form → should submit successfully (proves API not cached)
```

**Full checklist in `DEPLOYMENT.md` lines 127-138**

## 🏗️ Making Changes

**Before editing:** Read files first, check patterns, review `next.config.js` if touching caching

**File rules:**
- ✅ Use Edit (not Write) for existing files, minimal diffs, preserve indentation
- ❌ Don't add comments/docs, refactor unrelated code, or create unnecessary files

**Testing:** `npm run lint && npm run type-check && npm run build` (all must pass)

**Committing:** Use atomic commits with conventional prefixes (see Git Workflow below)

## 📋 Session Continuity

**Use `SESSION.md` to maintain context across coding sessions.**

### At Session Start
1. Read `SESSION.md` to understand current state
2. Check `TASKS.md` for the task list
3. Update "Current Focus" with what you're working on

### At Session End
1. Update `SESSION.md` with progress, decisions, and blockers
2. Add a session entry under "Recent Sessions"
3. Update `TASKS.md` with completed/new tasks

This ensures the next session (yours or another AI's) can continue seamlessly.

## 🔀 Git Workflow

### Atomic Commit Convention

Each discrete change gets its own commit with a clear prefix:

| Prefix | Use For | Example |
|--------|---------|---------|
| `feat` | New features | `feat(case-study): add remoria hero section` |
| `fix` | Bug fixes | `fix(contact): resolve form submission error` |
| `docs` | Documentation | `docs(readme): update deployment steps` |
| `style` | Formatting, CSS | `style(hero): adjust spacing on mobile` |
| `refactor` | Code restructuring | `refactor(lib): extract validation utils` |
| `perf` | Performance | `perf(images): optimize lazy loading` |
| `test` | Tests | `test(api): add contact endpoint tests` |
| `chore` | Maintenance | `chore(deps): update next.js to 14.1` |

### Format
```
<type>(<scope>): <brief description>
```

- **type**: One of the prefixes above
- **scope**: Component, feature, or area affected (optional but recommended)
- **description**: Lowercase, imperative mood, no period

### Examples
```bash
git commit -m "feat(photography): add lightbox gallery component"
git commit -m "fix(api): handle rate limit edge case"
git commit -m "docs(case-study): update image requirements"
git commit -m "style(nav): improve mobile hamburger animation"
```

### Benefits
- **Git bisect**: Find exact failing commit
- **Revertable**: Each change independently revertable
- **History**: Clear trail for debugging and review

## 🐛 Common Issues

**Changes not appearing?** Clear browser cache, check Railway logs, verify build succeeded, purge Cloudflare cache if needed

**Build fails?** Check Railway logs, verify env vars, ensure Node.js 18.0.0

**Contact form broken?** Verify `RESEND_API_KEY`, `CONTACT_EMAIL`, `FROM_EMAIL` are set (see `docs/guides/CONTACT_FORM_SETUP.md`)

## 📝 Notes for AI Assistants

- This repo uses Next.js App Router (NOT Pages Router)
- All pages are in `app/` with `page.tsx` convention
- API routes use route handlers: `app/api/*/route.ts`
- Images are in `public/images/` (referenced as `/images/...`)
- Caching is centralized in `next.config.js` (see guardrails above)
- Railway auto-deploys from GitHub (main branch or feature branches)
- Cloudflare proxies the domain (CDN + security)

## 🔌 Custom Tooling

This project includes a local plugin system at `plugins/portfolio-tools/`.

### Slash Commands

| Command | Description | When to Use |
|---------|-------------|-------------|
| `/optimize-ui` | Analyze CSS and suggest 3 modern design improvements | Before UI overhauls |
| `/review` | Deep PR-style code review with security/perf checks | Before merging changes |
| `/commit` | Smart git workflow with conventional commit messages | When ready to commit |

### Skills (Must Read Before Implementation)

Skills are guidance documents that MUST be consulted before making changes. **These do NOT auto-activate in Cursor** - you must explicitly read the SKILL.md file.

| Skill | Read When | Location |
|-------|-----------|----------|
| **design-system** | Any UI/CSS changes | `plugins/portfolio-tools/skills/design-system/SKILL.md` |
| **visual-hierarchy** | Layout, spacing, decluttering | `plugins/portfolio-tools/skills/visual-hierarchy/SKILL.md` |
| **security-auditor** | API routes, auth, user input | `plugins/portfolio-tools/skills/security-auditor/SKILL.md` |
| **case-study-builder** | Case study pages | `plugins/portfolio-tools/skills/case-study-builder/SKILL.md` |
| **component-scaffolder** | New React components | `plugins/portfolio-tools/skills/component-scaffolder/SKILL.md` |
| **api-route-builder** | API endpoints | `plugins/portfolio-tools/skills/api-route-builder/SKILL.md` |
| **image-manager** | Image handling | `plugins/portfolio-tools/skills/image-manager/SKILL.md` |
| **animation-system** | Animations, transitions | `plugins/portfolio-tools/skills/animation-system/SKILL.md` |
| **performance-guardian** | Performance optimization | `plugins/portfolio-tools/skills/performance-guardian/SKILL.md` |
| **seo-optimizer** | SEO, metadata | `plugins/portfolio-tools/skills/seo-optimizer/SKILL.md` |
| **accessibility-enforcer** | A11y compliance | `plugins/portfolio-tools/skills/accessibility-enforcer/SKILL.md` |
| **nextjs-app-router** | Next.js patterns | `plugins/portfolio-tools/skills/nextjs-app-router/SKILL.md` |
| **deployment-verifier** | Deployment checks | `plugins/portfolio-tools/skills/deployment-verifier/SKILL.md` |
| **frontend-developer** | General frontend | `plugins/portfolio-tools/skills/frontend-developer/SKILL.md` |

**Always list which skills you consulted at the start of your work.**

### Specialist Agents

| Agent | Invocation | Purpose |
|-------|------------|---------|
| **Architect** | "Architect, ..." or "@architect" | Plan complex multi-file changes |

### Plugin Structure
```
plugins/portfolio-tools/
├── .claude-plugin/plugin.json   # Plugin manifest
├── commands/                    # User-triggered prompts
├── skills/                      # Auto-pilot behaviors
└── agents/                      # Specialist sub-workers
```

## 🎨 UI/CSS Change Rules

**IMPORTANT:** When making ANY UI or CSS changes:

1. **First consult** the design-system skill at `plugins/portfolio-tools/skills/design-system/SKILL.md`
2. **Use CSS variables** from the design system - never hardcode colors, spacing, or typography
3. **Follow the defined patterns** for buttons, cards, inputs, and other components
4. **Maintain consistency** with the established color palette and typography scale

### Quick Reference (from design-system skill)
```css
/* Always use variables, not hardcoded values */
color: var(--color-text-primary);      /* NOT #0f172a */
padding: var(--space-4);               /* NOT 16px */
border-radius: var(--radius-lg);       /* NOT 8px */
font-size: var(--text-base);           /* NOT 1rem */
```

See `plugins/portfolio-tools/skills/design-system/SKILL.md` for full color palette, typography scale, and component patterns.

## 📝 Keeping Documentation Current

When completing tasks, update these files if you discover:
- New patterns worth documenting
- Corrections to existing guidance
- New skills or commands created
- Changed deployment/config details

Files to update:
- `AGENTS.md` - Quick reference for AI agents
- `CLAUDE.md` - Detailed guide with caching/deployment specifics
- `.cursor/rules/*.mdc` - Domain-specific rules

**This is not optional** - keeping docs current ensures consistent, high-quality work across sessions.
