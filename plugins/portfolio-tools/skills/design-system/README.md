# Raúl Mermans — Design System

A design system extracted from **raulmermans.com** — a personal portfolio site by Raúl Mermans, a Spain-based applied AI systems builder, web developer, photographer, and creative director. The site is bilingual (Spanish primary / English secondary) and positions Raúl as a "business-minded builder, systems-first by default" who designs AI workflows, automation, and product-minded interfaces for modern brands.

> Source repo: `RaulMermans/raul-portfolio` (private). Stack: Next.js 14 App Router · TypeScript · Tailwind + CSS Modules + Global CSS · IONOS hosting · Cloudflare CDN.

---

## Index

| File | What's in it |
|---|---|
| `README.md` | This file — brand context, content + visual + iconography fundamentals |
| `colors_and_type.css` | All CSS custom properties + semantic type classes (`.ds-h1`, `.ds-eyebrow`, etc.) |
| `SKILL.md` | Skill manifest — how an AI agent should use this system |
| `assets/` | Logos, section background images, social marks, favicon |
| `fonts/` | Web fonts loaded via Google Fonts CDN; this folder also lists the original local-file substitutions |
| `preview/` | Self-contained HTML cards rendered into the Design System tab |
| `ui_kits/portfolio/` | High-fidelity recreation of the portfolio website (Hero, Header, SectionCards carousel, Services accordion, Footer, Contact form) |

---

## Brand context

**Who:** Raúl Mermans — independent builder/operator based in Spain, available worldwide.
**What he sells:** Four services, ranked by emphasis — (1) AI Systems (agentic workflows, orchestration, deployment logic), (2) Web Development, (3) Photography, (4) Creative Direction.
**Audience:** Modern brand and product teams that need sharper execution between marketing, CRM, content, ops, and creative.
**Surfaces:** Marketing site (home, about, services, contact, case studies, photography gallery, visuals gallery, apps showcase including the **Overflow** sub-site).
**Languages:** Spanish (default) + English. Routes are mirrored under `/en/...` and `/es/...`.

---

## Content fundamentals

### Voice
- **Operator-builder, not designer-aesthete.** Copy reads like someone who ships systems for a living. Confident, restrained, slightly dry.
- **Outcome over feature.** Sentences usually end on what the work *does for a team* (consistency, control, execution speed) rather than what was technically built.
- **First person where it adds intent**, third person elsewhere. The about page uses *"I came into this work through business…"* — the rest of the site mostly avoids "we"/"you" theatre.
- **Bilingual without translation feel.** Spanish is the primary voice; English copy is rewritten, not translated. Casing/punctuation rules differ slightly per locale.

### Casing
- **UPPERCASE** is reserved for display type (hero name, section titles, services, eyebrows) — never used for body sentences.
- **Title Case** for nav links, button labels, footer column headings.
- **Sentence case** for body and CTAs longer than two words ("Start a project", "View Work").
- **Eyebrows** are uppercase mono with `0.30em` tracking — almost spelled letter-by-letter.

### Vocabulary signals (use these)
> *"applied AI systems · agentic workflows · orchestration · deployment logic · automation infrastructure · workflow logic · human review loops · decision flows · creative infrastructure · brand systems · product surfaces · calmer interfaces · operational clarity · execution · commercially credible · visual restraint · supporting craft"*

### Phrases to avoid
- No emoji. Anywhere.
- No exclamation marks.
- No "we'll help you unlock…" SaaS-speak.
- No "demo theatre" — Raúl literally calls this out: *"built for real teams, not demo theatre."*

### Sample copy (verbatim)
- Hero summary (EN): **"Designing AI systems for modern brands."**
- Service lede (AI Systems): **"Applied AI systems that turn repetitive, judgment-heavy work into reliable execution. Agents, orchestration, and decision flows built for real teams, not demo theatre."**
- Contact headline: **"Let's Build the Right System"**
- Section eyebrow (Photography): **"Supporting craft: composition, restraint, image judgment"**

### Punctuation quirks
- `//` and `/` are used as visual list markers in services (each item is rendered with a `/` before it).
- `·` (interpunct) separates inline micro-lists: *"AI Systems · Agents · Automation"*.
- `—` (em dash) joins identity statements: *"Raúl Mermans — AI Systems · Agents · Automation"*.

---

## Visual foundations

### Color
A **cream-on-ink** palette with a single crimson accent. Five cream tones from `#FAF8F5` (paper) to `#DDD5C8` (border), four ink tones from `#1A1714` (text/footer) to `#8A827A` (faint label). One signature accent — `--accent: #C41E3A` (crimson) — used sparingly for hover, focus rings, error, and underline emphasis. Three warm gradient hues (`--warm #FFAA88`, `--rose #FFB5A0`, `--gradient-soft #E8D0C8`) appear *only* inside the contact section glow and the section-card scrims. Each section also has a per-section accent for the carousel: case studies (`#b94a53`), apps (`#3f9f8b`), photography (`#9c7847`), visuals (`#d86d43`).

### Type
Four families, strict roles:
- **Bebas Neue** (display): every uppercase headline, hero, section title, service title.
- **DM Sans** (body): every running sentence, lede, and form label that isn't an eyebrow.
- **Space Mono** (mono): eyebrows, labels, button text, footer column headings, navigation. Always uppercase, always letter-spaced.
- **Source Serif 4** (reading): reserved for long-form content — case-study body text, about page paragraphs.

The scale is **fluid clamp()** between 320px and 1200px viewports. Hero scales 4rem → 7.5rem.

### Spacing & layout
- A 12-step rem-based scale (`--space-1` 0.25rem → `--space-12` 8rem).
- Header is fixed at **80px** tall.
- Touch targets minimum **44px** everywhere — encoded as `--touch-min`.
- Sections fill the viewport on desktop (`min-height: 100vh`) and free-flow on mobile.
- Max content widths: 1200px (footer/about), 600px (contact), 700px (testimonial), 800px (legal pages).

### Backgrounds
- Default page background is `--cream`. Alternating sections use `--cream-warm`. Footer is `--ink`.
- A **fixed full-screen grain overlay** sits at `z-index: 500` with `opacity: 0.03` and `mix-blend-mode: multiply` — gives every surface a paper-like texture. Generated inline as an SVG fractal-noise data-URI.
- Section cards use full-bleed photographic backgrounds (`/images/sections/*.webp`) with a top-to-bottom dark scrim for legibility.
- The contact and socials sections feature a **soft animated radial glow** using the warm/rose/cream-soft palette, blurred at 120px and pulsing on an 8s `glowPulse` keyframe.

### Animation
- Default ease: `cubic-bezier(0.16, 1, 0.3, 1)` — a "soft slow-out" curve used for nearly every transition.
- Reveal-on-scroll: opacity 0 → 1 + translateY(40px → 0) over 0.8s. Staggered with `reveal-delay-1..4` (0.1s → 0.4s).
- Buttons grow a circular crimson ink-blot from center on hover (`::before` width/height 0 → 300px over 0.6s).
- Cards lift `translateY(-3px)` and pick up a `0 6px 16px rgba(196,30,58,0.20)` shadow on hover.
- No bounce, no spring, no rotate-on-load. The whole system is **fade + lift + slide-up**.
- Reduced-motion preference clamps every duration to `0.01ms`.

### Hover & press states
- Links: color shifts from `--ink-faint` → `--ink`, a 1.5px underline scales `scaleX(0)` → `scaleX(1)` from the left, and the element shifts `translateX(2px)`.
- Buttons: border + text both adopt `--accent`, background fades to `rgba(196,30,58,0.06)`, and the element lifts 3px.
- Press: buttons return to `translateY(0)` in 0.1s; tap-highlight on mobile is `rgba(196,30,58,0.10)`.
- Service tiles in the accordion **steal flex** on hover (siblings collapse to `flex: 0.5`, hovered tile expands to `flex: 3`).

### Borders & dividers
- Hairline 1px borders only. Three semantic variants:
  - `var(--border-light)` = `1px solid var(--cream-dark)` — primary divider on light surfaces.
  - `var(--border-dark)` = `1px solid var(--ink)` — used between service columns.
  - `var(--border-faint)` = `1px solid rgba(255,255,255,0.15)` — on dark footer surface.
- No multi-pixel borders, no double borders, no inset rings.

### Shadow system
- Almost no shadow on resting elements — the system relies on hairlines, scrims, and grain instead.
- **`--shadow-soft`** `0 2px 8px rgba(26,23,20,0.04)` — form inputs at rest.
- **`--shadow-card`** `0 8px 32px rgba(26,23,20,0.08), 0 2px 8px rgba(26,23,20,0.04)` — contact form glass card.
- **`--shadow-hover-accent`** `0 6px 16px rgba(196,30,58,0.20)` — button hover lift.
- **`--shadow-focus-accent`** `0 0 0 4px rgba(196,30,58,0.10)` — focus ring on interactive elements.

### Transparency & blur
- Used in three specific places:
  1. **Glassmorphism cards** (`.glass`): `rgba(245,240,235,0.7)` + `backdrop-filter: blur(12px) saturate(180%)`. The contact form sits on this.
  2. **Dark glass** (`.glass-dark`): `rgba(26,23,20,0.8)` + `blur(16px) saturate(120%)` — mobile menu overlay.
  3. **Section glows**: `filter: blur(120px)` for the warm radial behind contact + socials.
- No frosted UI panels in the body. Solid surfaces are the default.

### Corner radii
- **Default is `0`.** Buttons, service tiles, image frames, headers — all hard corners.
- Soft radii appear only where touch comfort demands them:
  - `--radius-md: 8px` — form inputs, select dropdowns.
  - `--radius-lg: 16px` — contact form glass card, success/error toasts.
  - `--radius-pill / --radius-circle` — social icon buttons (44px circle), back-to-top.

### Card pattern
The portfolio doesn't really use "cards" in the SaaS sense. The closest analogues are:
- **Section cards** (carousel): full-bleed image + dark scrim + bottom-left content stack. No rounding, no border. Active card sits at `scale(1)`, neighbors at `scale(0.89)` with `rotateY(±18deg)` and a subtle blur.
- **Service tile**: a vertical column inside an accordion grid, separated by 1px ink borders, no fill. Expands on hover.
- **Contact form glass card**: 16px radius, white-cream at 50% opacity, blurred backdrop, soft drop-shadow.

### Imagery vibe
- **Warm, slightly desaturated**, editorial. Photographs are run through `filter: grayscale(8–12%) brightness(0.97)` at rest and snap to `brightness(1.05) contrast(1.02)` on hover.
- Hero/section backgrounds are full-bleed `.webp` photography, never illustration.
- The about portrait sits inside a 3:4 aspect frame with a hairline offset border revealed on scroll.

### Layout rules
- Header is fixed top, transparent → `--cream` after scroll.
- Section anchor IDs: `#work`, `#services`, `#contact`, `#footer`. Smooth-scrolled.
- Scroll-snap is **disabled on the homepage** (`html.homepage`) — the snap CSS exists but is unset for natural scrolling.
- Back-to-top FAB: 44px circle, `--ink` background, bottom-right, fades in past viewport, swaps to `--accent` on hover.

---

## Iconography

Raúl's portfolio is **almost icon-free by design**. The visual restraint is part of the brand. What exists, in priority order:

1. **Letterform marks instead of icons.** Social links in the footer are rendered as 2-letter monospace labels — `IG · LI · UN · X` — inside 44px hairline circles. The site logo is `RM` set in Bebas Neue.
2. **Inline SVG, drawn locally** (small, stroke-based, 24×24, `stroke-width="2"`, rounded caps + joins). Used for the carousel chevrons and a single triangle indicator inside the form select.
3. **Unicode glyphs as decoration**, not as icons:
   - `→` arrow on buttons (`.btn--arrow::after`)
   - `↗` external/launch arrow on section card CTAs
   - `·` interpunct as a list separator
   - `//` and `/` as service-list markers
   - `✕` in the menu close button
4. **No icon font.** No Lucide, no Heroicons, no Font Awesome.
5. **No emoji.** None in any user-facing copy. Internal docs/READMEs in the repo use them but the brand surface does not.
6. **One inline-SVG decorative background**: `/public/images/sections/apps-bg.svg` — a single isometric pattern.

### Substitution rule for AI agents
If you genuinely need an icon for a new surface, **prefer a 2–3 letter monospace label inside a hairline circle** before reaching for a glyph. If a glyph is unavoidable, use the Unicode arrows above. Only as a last resort, link [Lucide](https://lucide.dev/) icons from CDN at `stroke-width="1.5"`, ink color, no fill — and flag the substitution as an exception, not a pattern.

### Logo
The site has no SVG wordmark — `RM` is set in Bebas Neue 1.5–2rem, `--cream` on `--ink` (footer) or `--ink` on `--cream` (header). A favicon at `/favicon.jpg` is referenced but is a JPG raster (the ds includes a clean recreation in `assets/logo-rm.svg`).

---

## Caveats & known substitutions

- **Fonts:** the production site loads `bebas-neue-400.woff2`, `dm-sans-normal-400-500.woff2` (and italic), `space-mono-400.woff2`, `source-serif-4-400-600.woff2` as local files. The repo did not expose these binaries to the import pipeline, so this design system loads them from **Google Fonts CDN** instead. The visual difference is nil for Bebas / DM Sans / Space Mono / Source Serif 4 (all Google Fonts originals). If you want to swap to local woff2s, drop them into `fonts/` and edit `colors_and_type.css`.
- **Section background photography** (`/images/sections/*.webp`) is referenced but not committed to the source repo (only README placeholders exist). The UI kit uses subtle generated placeholders styled with the brand palette — replace with real imagery when available.
- **Service photography** (`/images/services/*.webp`) — same situation, same fallback.
- **About portrait** — same situation; UI kit shows a styled placeholder block.
