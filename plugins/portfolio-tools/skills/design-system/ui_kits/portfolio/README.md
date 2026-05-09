# Portfolio Website UI Kit — Raúl Mermans

A high-fidelity recreation of **raulmermans.com** as modular JSX components. Click-through prototype; not production code.

## What's inside

| File | Purpose |
|---|---|
| `index.html` | Assembled single-page view — scroll through Hero → Work → Services → About → Contact → Footer |
| `Header.jsx` | Fixed 80px nav, RM logo, uppercase links, EN/ES switch |
| `Hero.jsx` | Full-viewport intro with radial glow, large display type, CTA pair, scroll hint |
| `SectionCards.jsx` | 3D carousel for Work — Case Studies / Apps / Photography / Visuals |
| `Services.jsx` | Accordion with flex-steal hover behavior |
| `About.jsx` | Portrait + long-form reading-serif body |
| `Contact.jsx` | Glass-card form with crimson focus states + soft warm glow |
| `Footer.jsx` | Dark ink surface, 4-column layout, letter-mark social row |
| `Grain.jsx` | The fixed-position fractal-noise overlay used brand-wide |

## Design sources

- Production site: `raulmermans.com`
- Source repo: `RaulMermans/raul-portfolio` (Next.js 14 App Router + TS + CSS Modules)
- Reference files: `styles/globals.css`, `components/*.tsx`, `app/[lang]/page.tsx`

## Covered / Deferred

**Covered:** all chrome, the homepage sequence, content system, CTAs, form states, footer.
**Deferred:** sub-routes (`/work/[slug]`, `/photography/[album]`, `/visuals/[slug]`, `/apps/overflow`) — these share the header/footer shell, so extending the kit means adding a `CaseStudyPage.jsx` and `GalleryPage.jsx` when needed.
