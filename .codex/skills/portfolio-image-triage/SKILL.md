---
name: portfolio-image-triage
description: Review new photographs for the Raúl Mermans portfolio, record factual metadata, and select only images that strengthen an existing series or justify a new story. Use when the user supplies a batch of photos or asks where they belong.
---

# Portfolio image triage

Compare every supplied frame with the active series and its current sequence in `data/photography-series.ts`. Identify subject, light, orientation, distinctiveness, and narrative role (`atmosphere`, `context`, `process`, `proof`, or `navigation`). Prefer a varied sequence over several similar views. Do not publish an image merely because it was supplied, and do not revive withdrawn routes or assets.

For each frame, record its original filename, actual dimensions and orientation, visible subject, possible series and role, and decision (`selected` or `held`) in a dated intake note under `docs/photography-intake/`. Treat place, date, people, and provenance as unknown unless supplied or verified; do not infer them from the image. For selected photos, add factual Spanish and English alt text and converted dimensions to `data/photography.ts`, then place them deliberately in `data/photography-series.ts`. Keep held files in their original location, outside `public/`.

Use `$portfolio-experience-system` and `$portfolio-art-direction` for any public placement. Use `$portfolio-image-conversion` for selected files. Verify no duplicate image appears in multiple active series and inspect the rendered route at desktop and mobile widths, including its visual regression baseline. Summarize the selection and the reasons for holding the rest.
