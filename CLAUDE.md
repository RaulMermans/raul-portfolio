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

**Committing:** `git add <files> && git commit -m "🎨 Description" && git push`

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

### Auto-Pilot Skills

| Skill | Trigger | Location |
|-------|---------|----------|
| **security-auditor** | Auto-activates on API keys, passwords, unsafe inputs | `plugins/portfolio-tools/skills/security-auditor/` |
| **design-system** | Auto-activates on UI/CSS changes | `plugins/portfolio-tools/skills/design-system/` |

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
