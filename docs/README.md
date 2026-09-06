# Documentation

## Project Structure

- **`app/`** - Next.js App Router pages
- **`components/`** - React components
- **`lib/`** - Utility functions and shared helpers
- **`public/`** - Static assets (images, fonts)
- **`styles/`** - Global CSS
- **`types/`** - TypeScript definitions

## Portfolio governance

- **[Portfolio experience system](PORTFOLIO_EXPERIENCE_SYSTEM.md)** - The canonical brand, UX, art-direction, case-study, and quality rules for public portfolio work.

## Production contracts

- `scripts/verify-export.sh` checks required static files and editorial output.
- `scripts/verify-canonical-output.mjs` checks rendered language, canonical,
  hreflang, schema, and default-locale contracts.
- `data/case-study-editorial.ts` defines the deliberate portfolio order; the
  case-study index presents it as selected work, experiments, and archive.
- `data/photography.ts` is the source of truth for localized photography alt
  text and derivative source sets.

The corresponding routed skills live in `.codex/skills/`. Start any public-route change with `$portfolio-experience-system`.

## Image Upload Locations

- **Case Studies:** `public/images/case-studies/{case-study-name}/`
- **Photography:** `public/images/photography/{category}/`
- **Visuals:** `public/images/visuals/{category}/`
- **About:** `public/images/about/profile.webp`
- **Sections:** `public/images/sections/`

See README.md files in each image folder for specific requirements.
