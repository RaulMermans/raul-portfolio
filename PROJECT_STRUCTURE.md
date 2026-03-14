# Project Structure

## Core Directories

### `app/`
Next.js App Router pages and API routes.

**Pages:**
- `page.tsx` - Homepage
- `about/page.tsx` - About page
- `case-studies/` - Case studies listing and individual pages
- `photography/page.tsx` - Photography gallery
- `visuals/page.tsx` - Visuals gallery
- `privacy/page.tsx` - Privacy policy
- `terms/page.tsx` - Terms of service

**API Routes:**
- `api/contact/route.ts` - Contact form handler
- `api/health/route.ts` - Health check
- `api/departments/` - Department status endpoints

### `components/`
Reusable React components.

**Key Components:**
- `Header.tsx` - Site header/navigation
- `Footer.tsx` - Site footer
- `Hero.tsx` - Homepage hero section
- `SectionCards.tsx` - Homepage section cards
- `About.tsx` - About section (homepage)
- `Services.tsx` - Services section
- `Contact.tsx` - Contact section with form
- `NextCaseStudy.tsx` - Random next case study component

### `lib/`
Utility functions and backend bots.

**Bots:**
- `performance-bot.ts` - Performance monitoring
- `error-bot.ts` - Error tracking
- `seo-bot.ts` - SEO monitoring
- `departments/` - Department coordinators

### `public/images/`
Static image assets.

**Structure:**
- `case-studies/{name}/` - Case study images
- `photography/{category}/` - Photography images
- `visuals/{category}/` - Visuals images
- `about/` - About page images
- `sections/` - Section background images
- `services/` - Service images

### `styles/`
- `globals.css` - Global styles and CSS variables

### `types/`
- `index.ts` - TypeScript type definitions

## Configuration Files

- `next.config.js` - Next.js configuration
- `.github/workflows/deploy.yml` - GitHub Actions deploy to IONOS SFTP
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `.env.example` - Environment variables template
