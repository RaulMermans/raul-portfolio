# Project Tasks

> AI-readable task list for vibe coding sessions. Update this file as tasks are completed.

## Current Sprint

### In Progress
- [ ] _None currently_

### Pending
- [ ] Adaptar el portfolio a `output: 'export'` para poder desplegarlo como sitio estatico en IONOS Hosting Plus
- [ ] Approve and implement canonical host redirects so `http://raulmermans.com`, `http://www.raulmermans.com`, and `https://raulmermans.com` consolidate to `https://www.raulmermans.com`
- [ ] Review legacy `/projects/*` URLs and approve the redirect map versus leaving unmatched URLs as proper 404 cleanup
- [ ] Review the Spanish legal pages before treating them as official legal text
- [ ] Review the Overflow legal copy against the live app stack before treating it as final legal text (provider list, data retention, account deletion flow)

## Backlog

### Features
- [ ] Add new case study template
- [ ] Improve mobile navigation
- [ ] Add dark mode toggle

### Performance
- [ ] Audit Core Web Vitals
- [ ] Optimize image loading
- [ ] Review bundle size

### Content
- [ ] Update about page copy
- [ ] Add new photography images

## Completed

### May 2026
- [x] Redesign the About landing with localized Spanish and English editorial versions
- [x] Audit Spanish and English landing parity and restore missing language counterparts
- [x] Rework `/case-studies/` into an immersive masonry browser interface with the Raúl Mermans design system
- [x] Remove intermediate case-study category landing pages
- [x] Replace DataBrief AI sample-data section with software architecture narrative
- [x] Center DataBrief AI mini-nav and widen case-study text measure
- [x] Fix case-study navbar contrast on dark hero backgrounds
- [x] Redesign `/case-studies/` as a direct randomized project gallery with category filters
- [x] Add DataBrief AI bounded AI analytics workflow case study

### April 2026
- [x] Add Overflow-specific support, privacy, and terms pages for App Store Connect
- [x] Add a Spanish site variant under `/es/*` with a language toggle, localized metadata, translated case studies/apps pages, and translated legal pages

### March 2026
- [x] Implement safe SEO fixes for titles, heading hierarchy, structured data scoping, sitemap normalization, and custom 404 handling
- [x] Add a repo-level UI UX Lead agent workflow that routes design work through the highest-level skill stack
- [x] Reframe the Overflow landing page into a lighter progressive-reveal product story
- [x] Redesign the Overflow app landing page into a clearer product case study
- [x] Refresh page-level SEO metadata with unique English descriptions
- [x] Optimize photography landing image loading and editorial gallery flow
- [x] Optimize homepage interaction fluidity
- [x] Refine homepage section carousel arrows and initial card alignment
- [x] Enhance App Coverflow gallery with dynamic theme-based glow and metrics
- [x] Fix case study visual glitches (squares, text fragments, FilmStrip implementation)
- [x] Resolve font rendering issues by adding `latin-ext` subset

### January 2026
- [x] Apply security baseline (SECURITY.md, CSP headers, npm audit in CI)
- [x] Add vibe coding setup (AGENTS.md, Cursor rules)

---

## Task Format

When adding tasks, use this format:
```
- [ ] Brief description (context if needed)
```

When completing tasks:
```
- [x] Brief description (context if needed)
```

Move completed tasks to the "Completed" section with the month/year.
