# Images Directory

This directory contains all images used throughout the portfolio website.

## Folder Structure

```
images/
├── about/              # About section and About page images
├── case-studies/      # Case study cover images
├── photography/       # Photography gallery images (by category)
├── placeholders/      # Fallback/placeholder images
├── projects/          # Project images (legacy, may be used in future)
├── sections/          # Homepage section card background images
├── services/          # Service section images
└── visuals/           # Visuals gallery images (by category)
```

## Quick Reference

### Where to Add Images

- **Section Cards (Homepage)**: `/images/sections/`
  - `case-studies-bg.webp`
  - `photography-bg.webp`
  - `visuals-bg.webp`

- **About Section**: `/images/about/`
  - `profile.webp`

- **Services**: `/images/services/`
  - `ai-agents.webp`
  - `web-development.webp`
  - `photography.webp`
  - `creative-direction.webp`

- **Case Studies**: `/images/case-studies/`
  - `ai-sports-campaign.webp`
  - `remoria.webp`
  - (Add more as needed)

- **Photography**: `/images/photography/[category]/`
  - `landscape/`
  - `architecture/`
  - `street/`

- **Visuals**: `/images/visuals/[category]/`
  - `ai-art/`
  - `album-covers/`
  - `experiments/`
  - `client-work/`

- **Placeholders**: `/images/placeholders/`
  - `visuals-fallback.webp`

## Image Guidelines

### Format
- **Preferred**: WebP (best compression and quality)
- **Acceptable**: JPG, PNG

### Sizing
- **Section backgrounds**: 1920x1080px or larger
- **Profile images**: 800x800px or larger (square)
- **Service images**: 600x400px or larger
- **Case study covers**: 900x1200px or larger (portrait)
- **Gallery images**: Varies by category

### File Size
- Keep images under 500KB when possible
- Next.js will automatically optimize images
- Use WebP format for best compression

## Adding New Images

1. **Save your image** to the appropriate folder
2. **Use WebP format** when possible
3. **Name files descriptively** (e.g., `case-studies-bg.webp`)
4. **Update the code** if using a different filename than expected

## Automatic Folder Creation

When new image placeholders are added to the code, the corresponding folders will be automatically created. Check the README in each folder for specific requirements.

