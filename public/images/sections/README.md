# Section Card Background Images

This folder contains background images for the homepage section cards.

## Current Images

- `case-studies-bg.webp` - Background image for the Case Studies section card
- `photography-bg.webp` - Background image for the Photography section card
- `visuals-bg.webp` - Background image for the Visuals section card

## How to Add/Replace Images

1. **Save your image** to this folder (`/public/images/sections/`)
2. **Recommended format**: WebP for best performance
3. **Recommended size**: 1920x1080px or larger (will be optimized by Next.js)
4. **Update the path** in `components/SectionCards.tsx` if using a different filename

## Image Requirements

- Format: WebP (preferred), JPG, or PNG
- Size: At least 1920px wide for desktop displays
- Aspect ratio: 16:9 or similar landscape orientation
- File size: Keep under 500KB if possible (Next.js will optimize)
