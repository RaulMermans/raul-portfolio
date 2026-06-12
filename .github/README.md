# Raul Mermans — Portfolio

Personal portfolio website for Raul Mermans, built as a case-study driven system for brand strategy, cultural storytelling, AI/product work, photography, and visual experimentation.

The site is designed to function less like a static résumé and more like a living creative archive: a structured space for presenting projects, systems, narratives, visual direction, and creative-business positioning.

Portfolio: [raulmermans.com](https://www.raulmermans.com)

---

## 30-second summary

This repository contains the source code for my personal portfolio.

The portfolio brings together:

1. Case studies across AI systems, brand strategy, campaigns, and creative direction.
2. A modular project architecture for repeatable case-study pages.
3. Photography, visual work, and creative experiments.
4. A bilingual editorial-style personal brand presence.
5. A static deployment workflow through GitHub Actions and IONOS.

The project is not only a personal website. It is a structured brand and narrative system for presenting multidisciplinary work across strategy, technology, culture, and visual direction.

---

## What this proves

This project demonstrates that I can:

* Build a personal brand system through code, content, and visual direction.
* Structure case studies around strategy, context, execution, and creative outcomes.
* Translate multidisciplinary work into a coherent digital identity.
* Combine editorial storytelling with frontend development.
* Build and maintain a static-first portfolio using Next.js, TypeScript, and automated deployment.
* Design a digital archive for brand, AI/product work, photography, and cultural references.
* Protect the separation between reusable code and owned creative assets.

---

## Why this exists

My work sits between brand strategy, cultural storytelling, product thinking, AI systems, and visual experimentation.

A conventional résumé is too flat for that kind of profile.

This portfolio exists to create a more complete representation of the work:

* the strategic thinking behind projects
* the systems and structures behind execution
* the visual language surrounding the work
* the cultural context that informs the direction
* the relationship between creative identity and technical infrastructure

The goal is to make the portfolio feel like a curated archive, not a list of deliverables.

---

## What it includes

### Case-study system

The site is structured around repeatable case-study patterns. Each project can be presented through a combination of:

* strategic context
* problem framing
* system or campaign architecture
* visual direction
* execution details
* outcomes, learnings, and next steps

### Creative archive

The portfolio includes image-led sections for:

* photography
* visual experiments
* AI-generated explorations
* creative references
* campaign and brand imagery

### Personal brand presence

The site supports a bilingual, editorial-style identity that connects:

* brand strategy
* cultural direction
* AI/product work
* business thinking
* photography
* visual storytelling

### Static-first deployment

The portfolio is optimized for static deployment. Changes pushed to the configured `main` branch trigger the GitHub Actions deployment workflow and refresh the IONOS-hosted website.

---

## What it is not

This repository is intentionally scoped.

It is **not**:

* a generic portfolio template
* a public design system package
* a reusable CMS product
* a stock photography archive
* a place to freely reuse creative assets
* a complete archive of all private or client-facing work

The source code may be reused according to the license terms, but the creative assets, project narratives, photography, case-study imagery, copywriting, and personal identity materials are protected.

---

## Tech stack

| Layer                   | Technology                   |
| ----------------------- | ---------------------------- |
| Framework               | Next.js 14                   |
| Language                | TypeScript                   |
| Styling                 | CSS Modules and global CSS   |
| Animation / interaction | Framer Motion, Lenis, Swiper |
| Deployment              | GitHub Actions → IONOS       |
| Output                  | Static export                |

---

## Project structure

```txt
.
├── app/                  # Next.js App Router pages
│   ├── about/            # About page
│   ├── case-studies/     # Project and case-study pages
│   ├── photography/      # Photography gallery
│   └── visuals/          # Visual archive
├── components/           # Reusable interface components
├── data/                 # Structured project and content data
├── hooks/                # Custom React hooks
├── lib/                  # Shared utilities
├── public/               # Static assets and images
├── styles/               # Global and page-specific styles
└── types/                # TypeScript definitions
```

---

## Content architecture

The portfolio is organized around a few core content types.

| Area         | Purpose                                                               |
| ------------ | --------------------------------------------------------------------- |
| About        | Personal positioning, background, and creative-business identity      |
| Case studies | Structured project narratives across strategy, systems, and execution |
| Photography  | Image-led archive of visual work                                      |
| Visuals      | Experimental visual references, AI imagery, and creative direction    |
| Data files   | Structured content powering project pages and reusable sections       |
| Components   | Interface patterns used across the site                               |

This makes the portfolio easier to maintain as the body of work grows.

---

## Design direction

The portfolio is designed around an editorial and cultural-strategic sensibility.

The interface prioritizes:

* clear hierarchy
* strong visual rhythm
* restrained motion
* modular case-study layouts
* image-led storytelling
* bilingual readability
* a balance between strategic clarity and creative atmosphere

The intention is to make the site feel more like a curated creative system than a conventional student portfolio.

---

## How to review this repo

Start here:

1. `app/` — page structure and routing
2. `app/case-studies/` — project and case-study pages
3. `data/` — structured content and project data
4. `components/` — reusable interface components
5. `styles/` — global and page-level styling
6. `.github/workflows/` — deployment workflow
7. `public/` — static images and creative assets

This repo is best reviewed as a personal brand and narrative system, not just as a frontend website.

---

## Local development

### Requirements

* Node.js 18+
* npm 9+

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

The local development server will start at:

```txt
http://localhost:3000
```

### Run checks

```bash
npm run lint
npm run type-check
npm run build
```

---

## Deployment

This portfolio deploys from pushes to `main`.

The GitHub Actions workflow:

1. type-checks the project
2. runs linting
3. builds the static Next.js export
4. verifies the expected homepage copy
5. uploads tracked files to IONOS
6. checks the live English and Spanish HTML after deployment

Deployment credentials are stored in GitHub Secrets and are not committed to the repository.

### Required GitHub Secrets

```txt
SFTP_HOST
SFTP_USER
SFTP_PASSWORD
SFTP_REMOTE_PATH
```

### Optional GitHub Secrets

```txt
SFTP_PORT
```

`SFTP_PORT` defaults to `22`.

`SFTP_REMOTE_PATH` must be the document root serving `www.raulmermans.com`; the workflow intentionally has no `/` fallback.

The SFTP action removes only files tracked by its remote hash manifest, so manually created remote files are left untouched.

Local/private deployment helper scripts are intentionally ignored.

---

## Environment variables

Use `.env.example` as the reference for public-safe environment configuration.

Do not commit real credentials, API keys, passwords, tokens, or private deployment details.

---

## Repository notes

This repository is intended as a public source reference for the portfolio system, not as a generic template.

The code may be reused according to the license terms, but the creative assets, project narratives, photography, case-study imagery, copywriting, and personal identity materials are protected.

---

## Portfolio relevance

This project connects my technical and creative work into one public-facing system.

It demonstrates:

* personal brand architecture
* case-study storytelling
* frontend product execution
* editorial web design
* visual archive design
* bilingual portfolio structure
* static deployment automation
* creative asset governance
* the connection between brand strategy, AI/product work, and cultural storytelling

The main point of the project is not that it is a website.

The point is that it turns a multidisciplinary identity into a structured digital system.

---

## License

### Code

The source code in this repository is licensed under the MIT License.

### Creative assets

All visual assets, photography, case-study imagery, copywriting, brand systems, project narratives, and personal identity materials are © Raul Mermans. All rights reserved.

These materials may not be copied, redistributed, remixed, reused, or used commercially without explicit written permission.

---

## Author

**Raul Mermans**
Brand & Cultural Architect
Portfolio: [raulmermans.com](https://www.raulmermans.com)
