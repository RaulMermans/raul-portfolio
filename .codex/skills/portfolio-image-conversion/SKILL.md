---
name: portfolio-image-conversion
description: Convert newly supplied photographs for the Raúl Mermans portfolio with the repository image pipeline before using them on a public page. Use when the user uploads or points to new image files for this site.
---

# Portfolio image conversion

Use the existing `scripts/convert-image.mjs` through `npm run images:convert -- <source> --output <destination.webp>`. It rotates according to EXIF, limits width to 2400px without upscaling, and writes WebP at quality 82 by default. Do not create a second conversion pipeline.

Before conversion, use `$portfolio-image-triage` to decide which images merit a public destination. Keep originals in their supplied location. Put selected files in the existing `public/images/photography/<series>/` folder (or the relevant current asset folder) with their source stems; leave held images outside `public/`. Never use `--force` without checking why an output exists.

Read the converted files' actual width and height with Sharp or another metadata reader, then enter those dimensions in the site's photo data. Run `npm run images:derive` for photography assets and verify the generated `srcset` files exist. Inspect the rendered images at desktop and phone widths to catch rotation, crop, and loading problems.
