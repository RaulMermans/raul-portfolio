# Raul Mermans — Portfolio

Personal portfolio website for Raul Mermans, built as a case-study driven system for brand strategy, cultural storytelling, AI/product work, photography, and visual experimentation.

The site is designed to function less like a static résumé and more like a living creative archive: a structured space for presenting projects, systems, narratives, and visual direction.

## Overview

This repository contains the source code for my personal portfolio.

The portfolio brings together:

- Case studies across AI systems, brand strategy, campaigns, and creative direction
- A modular project architecture for repeatable case-study pages
- Photography and visual work
- A bilingual, editorial-style personal brand presence
- A static deployment workflow through GitHub Actions and IONOS

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** CSS Modules and global CSS
- **Animation / Interaction:** Framer Motion, Lenis, Swiper
- **Deployment:** GitHub Actions → IONOS
- **Output:** Static export

## Project Structure

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

## Key Features

### Case-study system

The site is structured around repeatable case-study patterns. Each project can be presented through a combination of:

- Strategic context
- Problem framing
- System or campaign architecture
- Visual direction
- Execution details
- Outcomes, learnings, and next steps

### Visual archive

The portfolio includes image-led sections for photography, visuals, AI-generated experiments, and creative references.

### Static-first deployment

The site is optimized for static deployment. Changes pushed to the configured `main` branch trigger the GitHub Actions deployment workflow and refresh the IONOS-hosted website.

## Local Development

### Requirements

- Node.js 18+
- npm 9+

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

## Deployment

This portfolio deploys from pushes to `main`.

The GitHub Actions workflow type-checks, lints, builds the static Next.js export, verifies the expected homepage copy, uploads tracked files to IONOS, and checks the live English and Spanish HTML after deployment.

Deployment credentials are stored in GitHub Secrets and are not committed to the repository.

Required GitHub Secrets:

```txt
SFTP_HOST
SFTP_USER
SFTP_PASSWORD
SFTP_REMOTE_PATH
```

Optional GitHub Secrets:

```txt
SFTP_PORT
```

`SFTP_PORT` defaults to `22`. `SFTP_REMOTE_PATH` must be the document root serving `www.raulmermans.com`; the workflow intentionally has no `/` fallback. The SFTP action removes only files tracked by its remote hash manifest, so manually created remote files are left untouched.

Local/private deployment helper scripts are intentionally ignored.

## Environment Variables

Use `.env.example` as the reference for public-safe environment configuration.

Do not commit real credentials, API keys, passwords, tokens, or private deployment details.

## Repository Notes

This repository is intended as a public source reference for the portfolio system, not as a generic template.

The code may be reused according to the license terms, but the creative assets, project narratives, photography, case-study imagery, copywriting, and personal identity materials are protected.

## License

### Code

The source code in this repository is licensed under the MIT License.

### Creative Assets

All visual assets, photography, case-study imagery, copywriting, brand systems, project narratives, and personal identity materials are © Raul Mermans. All rights reserved.

These materials may not be copied, redistributed, remixed, reused, or used commercially without explicit written permission.

## Author

**Raul Mermans**<br>
Brand & Cultural Architect<br>
Portfolio: [raulmermans.com](https://www.raulmermans.com)
EOF
