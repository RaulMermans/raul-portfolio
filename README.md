# Raul Mermans — Portfolio

A personal portfolio system for brand strategy, cultural storytelling, AI/product case studies, photography, and visual experimentation.

This site is built as a living creative archive: part portfolio, part case-study system, part visual index. It is designed to present work across strategy, design, technology, and culture with an editorial structure rather than a standard résumé format.

## Overview

This repository contains the source code for [raulmermans.com](https://www.raulmermans.com).

The portfolio brings together:

- AI systems and product case studies
- Brand strategy and cultural storytelling work
- Campaign, identity, and creative direction projects
- Photography and visual experiments
- A repeatable case-study structure for future projects
- A static deployment workflow through GitHub Actions and IONOS

## Positioning

The project is not intended to be a generic portfolio template.

It is a personal presentation system built around a specific creative profile: brand and cultural strategy, AI-assisted product thinking, visual systems, and narrative-led project documentation.

The goal is to make each project feel like a clear strategic artifact, not just a gallery entry.

## Tech Stack

- **Framework:** Next.js
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
│   ├── case-studies/     # Case-study pages
│   ├── photography/      # Photography section
│   └── visuals/          # Visual archive
├── components/           # Reusable interface components
├── data/                 # Structured project/content data
├── docs/                 # Project documentation
├── hooks/                # Custom React hooks
├── lib/                  # Shared utilities
├── public/               # Static assets
├── scripts/              # Public-safe helper scripts
├── styles/               # Global and page-specific styles
└── types/                # TypeScript definitions
```

## Key Features

### Case-study architecture

The portfolio is structured around repeatable case-study patterns. Each project can be presented through:

- Context and challenge
- Strategic framing
- System or campaign architecture
- Visual direction
- Execution details
- Outcomes and learnings

### Creative archive

The site includes visual sections for photography, experiments, references, and image-led storytelling.

### Static-first build

The site is exported as a static Next.js project and deployed through GitHub Actions.

### Public-safe deployment

Deployment credentials are stored in GitHub Secrets and are not committed to the repository.

## Local Development

### Requirements

- Node.js 18+
- npm 9+

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

The site will be available at:

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

The GitHub Actions workflow builds the static Next.js export and uploads the generated output to the configured IONOS environment.

Required GitHub Secrets:

```txt
SFTP_HOST
SFTP_USER
SFTP_PASSWORD
SFTP_PORT
SFTP_REMOTE_PATH
```

Secret values are stored only in GitHub Secrets. They should never be committed to the repository.

## Environment Variables

Use `.env.example` as the public-safe reference.

```env
CONTACT_EMAIL=
```

Do not commit real credentials, API keys, passwords, tokens, or private deployment details.

## Security Notes

This is a static portfolio website.

No secrets should be committed to the repository. Deployment credentials live in GitHub Secrets. If a credential is ever exposed, it should be revoked at the provider immediately, even if removed from the codebase afterward.

## Repository Notes

This repository is public as a source reference for the portfolio system.

It is not a starter kit, template, or asset library. The code may be reused according to the license terms, but the creative assets and project materials are protected.

## License

### Code

The source code in this repository is licensed under the MIT License.

### Creative Assets

All visual assets, photography, case-study imagery, copywriting, brand systems, project narratives, and personal identity materials are © Raul Mermans. All rights reserved.

These materials may not be copied, redistributed, remixed, reused, or used commercially without explicit written permission.

## Author

**Raul Mermans**  
Brand & Cultural Architect  
[raulmermans.com](https://www.raulmermans.com)
