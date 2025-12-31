# Visuals Images

This folder contains all images for the Visuals sublanding page.

## Folder Structure

- `ai-art/` - AI-generated artwork pieces
- `album-covers/` - Album cover designs
- `client-work/` - Client commission work
- `experiments/` - Experimental visual work

## Required Images

Based on the current code in `app/visuals/page.tsx`, you need to upload the following images:

### AI Art (`/ai-art/`)
- `piece-1.webp` - For "Neon Genesis"
- `piece-2.webp` - For "Digital Bloom"
- `piece-3.webp` - For "Synthetic Dreams"

### Album Covers (`/album-covers/`)
- `cover-1.webp` - For "Midnight Waves"
- `cover-2.webp` - For "Echoes"
- `cover-3.webp` - For "Chromatic"

### Experiments (`/experiments/`)
- `exp-1.webp` - For "Glitch Protocol"
- `exp-2.webp` - For "Particle Field"

## Image Specifications

- **Format**: WebP (preferred for best compression)
- **Dimensions**: 
  - Work cards: `clamp(280px, 22vw, 380px)` width × `clamp(450px, 70vh, 700px)` height
  - Recommended: 800-1200px wide, maintain aspect ratio
- **File Size**: Keep under 200KB per image for optimal performance
- **Quality**: 80-90% for WebP compression

## Fallback

If an image fails to load, the code will automatically try to load:
- `/images/placeholders/visuals-fallback.webp`

Make sure this placeholder exists, or images will show as broken.

## How to Add Images

1. Save your images as WebP format
2. Name them exactly as listed above
3. Place them in the correct subfolder
4. The images will automatically appear on the visuals page

## Adding New Works

To add new visual works:
1. Add a new entry to the `works` array in `app/visuals/page.tsx`
2. Upload the corresponding image to the appropriate folder
3. Use the naming convention: `piece-N.webp`, `cover-N.webp`, or `exp-N.webp`

