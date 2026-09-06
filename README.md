# Raul Mermans Portfolio

This repository contains the source code for Raul Mermans' personal
portfolio: a Next.js-based portfolio system for case studies, creative
strategy, brand systems, and AI/product work.

## Tech Stack

- Next.js 16 with the App Router and React 19
- TypeScript
- Tailwind CSS and custom global CSS
- Static export-ready build output

## Key Features

- Server-rendered Spanish default routes and English `/en/` routes
- Case study system for AI systems, automation, brand, and product work
- Photography and visual archive sections
- App and prototype pages with shared metadata helpers
- Static-safe contact flow using the visitor's email client
- SEO helpers, sitemap, robots, manifest, and structured data

## Case Study System

Case studies are driven by route files under `app/(es)/case-studies/` and
shared data in `data/`. Each case study combines narrative copy, project metadata,
localized UI text, and assets from `public/images/case-studies/`.

The public repository keeps the portfolio implementation visible while
preserving ownership of the creative assets and project narratives.

## Local Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000` to view the site locally.

## Build

```bash
npm run lint
npm run type-check
npm run build
npm run verify:export
npm run verify:canonical
```

The project is configured for static export via `next.config.js`.

## Deployment

This portfolio deploys from successful CI runs for pushes to `main`.

The GitHub Actions workflow builds the static Next.js export and uploads the
generated `out/` directory to the configured IONOS destination via SFTP. CI
runs type checks, lint, static-export checks, canonical-output checks, and the
critical Playwright/a11y suite before deployment is eligible to start.

Deployment credentials are stored in GitHub Secrets and are not committed to
the repository.

Required GitHub Secrets:

- `SFTP_HOST`
- `SFTP_USER`
- `SFTP_PASSWORD`
- `SFTP_REMOTE_PATH`

Optional GitHub Secrets:

- `SFTP_PORT` (defaults to `22`)

`SFTP_REMOTE_PATH` must point to the document root that serves
`https://www.raulmermans.com/`. The workflow intentionally has no `/` fallback.
The deployment mirror removes stale generated files so the document root matches
the verified static export.

## Canonical architecture

- Spanish is the canonical default: `/about/`, `/case-studies/`, and related routes.
- English equivalents live below `/en/`.
- Historical `/es/*` URLs are redirected at the IONOS layer by `public/.htaccess`.
- Each localized page emits its own server-rendered `lang`, canonical URL,
  `en-US`, `es-ES`, and `x-default` alternates.
- The document schema begins with stable Person and WebSite entities; page-level
  entities connect back to those IDs.

## Image strategy

Static hosting keeps Next's runtime image optimizer disabled. `npm run build`
generates WebP and AVIF photography derivatives at 480, 768, 1200, 1600, and
2400 pixels when the source is large enough. The gallery uses responsive
`srcset` markup, and generated assets are deliberately ignored by Git.

## Analytics

GA4 is optional and runs only in production when `NEXT_PUBLIC_GA_MEASUREMENT_ID`
is set. Initialization disables GA's automatic page view; the client records one
explicit page view for each SPA navigation. Consent collection, if required for
the deployment's audience, must be supplied separately from this event logic.

Local/private deployment helper scripts are intentionally ignored.

## Environment

`.env.example` lists the public template variables. Do not commit real `.env` files.

## License

Source code is licensed under MIT. Creative assets, photography, case study
imagery, copywriting, brand systems, project narratives, and personal identity
materials are not open licensed.

## Asset Usage

Do not copy, redistribute, remix, reuse, or commercially use the visual assets,
photography, case study materials, or personal identity work without explicit
written permission.

## Public Repo Note

This repository is published as a portfolio source reference. It is not a
starter template, client deliverable, or reusable asset pack.
