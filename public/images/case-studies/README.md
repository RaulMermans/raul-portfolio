# Case Studies Images

This folder contains cover images for case studies.

## Current Images

- `ai-sports-campaign.webp` - Cover image for AI Sports Campaign case study
- `remoria.webp` - Cover image for Remoria case study

## How to Add/Replace Images

1. **Save your image** to this folder (`/public/images/case-studies/`)
2. **Recommended format**: WebP for best performance
3. **Recommended size**: 900x1200px or larger (portrait orientation)
4. **Update the path** in `app/case-studies/page.tsx` in the `caseStudies` array

## Image Requirements

- Format: WebP (preferred), JPG, or PNG
- Size: At least 900px wide
- Aspect ratio: 3:4 or 4:5 portrait orientation (for filmstrip cards)
- File size: Keep under 400KB if possible (Next.js will optimize)

## Adding New Case Studies

When adding a new case study:
1. Add the cover image to this folder
2. Update the `caseStudies` array in `app/case-studies/page.tsx`
3. Use the format: `/images/case-studies/your-case-study-name.webp`

