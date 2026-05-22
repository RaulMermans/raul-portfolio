# Raul Mermans Portfolio

This repository contains the source code for Raul Mermans' personal portfolio: a Next.js-based portfolio system for case studies, creative strategy, brand systems, and AI/product work.

## Tech Stack

- Next.js 14 with the App Router
- TypeScript
- Tailwind CSS and custom global CSS
- Static export-ready build output

## Key Features

- Portfolio homepage with localized Spanish and English content
- Case study system for AI systems, automation, brand, and product work
- Photography and visual archive sections
- App and prototype pages with shared metadata helpers
- Static-safe contact flow using the visitor's email client
- SEO helpers, sitemap, robots, manifest, and structured data

## Case Study System

Case studies are driven by route files under `app/case-studies/` and shared data in `data/`. Each case study combines narrative copy, project metadata, localized UI text, and assets from `public/images/case-studies/`.

The public repository keeps the portfolio implementation visible while preserving ownership of the creative assets and project narratives.

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
```

The project is configured for static export via `next.config.js`.

## Environment

`.env.example` lists the public template variables. Do not commit real `.env` files.

## License

Source code is licensed under MIT. Creative assets, photography, case study imagery, copywriting, brand systems, project narratives, and personal identity materials are not open licensed.

## Asset Usage

Do not copy, redistribute, remix, reuse, or commercially use the visual assets, photography, case study materials, or personal identity work without explicit written permission.

## Public Repo Note

This repository is published as a portfolio source reference. It is not a starter template, client deliverable, or reusable asset pack.
