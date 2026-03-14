# Visuals Images

This folder contains all images for the Visuals sublanding page.

## Folder Structure

- `ai-art/` - AI-generated artwork pieces
- `album-covers/` - Album cover designs
- `client-work/` - Client commission work
- `experiments/` - Experimental visual work
- `visual-concepts/` - Visual concept explorations

## Required Images

Based on the current code in `app/visuals/page.tsx`, you need to upload the following images:

### AI Art (`/ai-art/`)
- `neon-genesis.webp` - For "Neon Genesis" (RM-NG-24-001)
- `digital-bloom.webp` - For "Digital Bloom" (RM-DB-24-003)
- `synthetic-dreams.webp` - For "Synthetic Dreams" (RM-SD-23-006)

### Album Covers (`/album-covers/`)
- `midnight-waves.webp` - For "Midnight Waves" (RM-MW-24-002)
- `echoes.webp` - For "Echoes" (RM-EC-24-005)
- `chromatic.webp` - For "Chromatic" (RM-CH-23-008)

### Experiments (`/experiments/`)
- `glitch-protocol.webp` - For "Glitch Protocol" (RM-GP-24-004)
- `particle-field.webp` - For "Particle Field" (RM-PF-23-007)

### Visual Concepts (`/visual-concepts/`)
- `concept-a.webp` - For "Concept A" (RM-VC-24-001)
- `concept-b.webp` - For "Concept B" (RM-VC-24-002)
- `concept-c.webp` - For "Concept C" (RM-VC-24-003)

## Image Specifications

- **Format**: WebP (preferred for best compression)
- **Dimensions**: 
  - Work cards: `clamp(360px, 36vw, 560px)` width × `78vh` height (max 750px)
  - Recommended: 900-1200px wide, maintain aspect ratio
  - **Aspect Ratio**: Approximately 3:4 or 4:5 works well for the card layout
- **File Size**: Keep under 200KB per image for optimal performance
- **Quality**: 80-90% for WebP compression

## Fallback

If an image fails to load, the code will automatically try to load:
- `/images/placeholders/image-placeholder.webp`

Make sure this placeholder exists, or images will show as broken.

## How to Add Images

1. Save your images as WebP format
2. Name them exactly as listed above (use kebab-case: `neon-genesis.webp`)
3. Place them in the correct subfolder based on the work type:
   - AI Art → `/ai-art/`
   - Album Covers → `/album-covers/`
   - Experiments → `/experiments/`
   - Visual Concepts → `/visual-concepts/`
4. The images will automatically appear on the visuals page

## Adding New Works

To add new visual works:
1. Add a new entry to the `works` array in `app/visuals/page.tsx`
2. Set the `image` path to match the folder structure: `/images/visuals/{category}/{filename}.webp`
3. Upload the corresponding image to the appropriate folder
4. Use kebab-case naming: `my-new-piece.webp`

