# Case Study Image Organization

## Folder Structure

Each case study has its images organized by purpose in subfolders:

```
public/images/case-studies/
  {case-study-id}/
    hero/          # Hero images
      hero.webp
    thumb/         # Thumbnail images
      thumb.webp
    approach/      # Approach section images
      approach-1.webp
      approach-2.webp
      ...
    gallery/       # Gallery images
      gallery-1.webp
      gallery-2.webp
      gallery-3.webp
      gallery-4.webp
      gallery-5.webp
      ...
    feature/       # Feature images
      feature.webp
    full/          # Full-bleed images
      full-1.webp
      full-2.webp
      ...
```

## Image Types

### Hero (`hero/`)
- Main hero image displayed at the top of the case study page
- Should be high quality (90-95 quality setting)
- Recommended size: 1920x1080 or larger
- Format: WebP
- Filename: `hero.webp`

### Thumbnail (`thumb/`)
- Small thumbnail used in case studies listing
- Used in cards/grids on main case studies page
- Format: WebP
- Filename: `thumb.webp`

### Approach (`approach/`)
- Images displayed in the approach section
- Usually 2 images side by side
- Numbered sequentially: `approach-1.webp`, `approach-2.webp`, etc.
- Format: WebP

### Gallery (`gallery/`)
- Multiple gallery images displayed in grid layouts
- Numbered sequentially: `gallery-1.webp`, `gallery-2.webp`, etc.
- Can have 3, 2, or asymmetric row layouts
- Format: WebP

### Feature (`feature/`)
- Large feature image displayed between sections
- Usually has dark background
- High quality (95 quality setting)
- Format: WebP
- Filename: `feature.webp`

### Full (`full/`)
- Full-bleed images that span the entire viewport width
- Usually displayed between major sections
- Numbered sequentially: `full-1.webp`, `full-2.webp`, etc.
- Format: WebP

## Image Paths

Use the image path utilities from `lib/case-study-images.ts`:

```typescript
import {
  getCaseStudyHero,
  getCaseStudyThumb,
  getCaseStudyApproach,
  getCaseStudyGallery,
  getCaseStudyFeature,
  getCaseStudyFull,
} from '@/lib/case-study-images'

// Example usage
const heroPath = getCaseStudyHero('ai-sports')
// Returns: /images/case-studies/ai-sports/hero/hero.webp

const approachPath = getCaseStudyApproach('ai-sports', 'approach-1.webp')
// Returns: /images/case-studies/ai-sports/approach/approach-1.webp
```

## Best Practices

1. **File Naming**: Use kebab-case with descriptive names
   - ✅ `approach-1.webp`, `gallery-1.webp`
   - ❌ `Approach 1.webp`, `image1.webp`

2. **Image Optimization**: 
   - Use WebP format for better compression
   - Optimize file sizes before uploading
   - Recommended tools: Squoosh, ImageOptim, or similar

3. **Image Dimensions**:
   - Hero: 1920x1080 or larger (16:9 or similar)
   - Thumbnail: 800x600 or similar (4:3)
   - Approach: 1200x900 or similar (4:3)
   - Gallery: 1200x900 or similar (4:3)
   - Feature: 1920x1080 or larger (16:9)
   - Full: 1920x1080 or larger (16:9)

4. **Quality Settings**:
   - Hero: 90-95
   - Thumbnail: 80-85
   - Approach: 85-90
   - Gallery: 85-90
   - Feature: 90-95
   - Full: 90

5. **Alt Text**: Always provide descriptive alt text for accessibility

6. **Organization**: Keep images organized by purpose for easier management

## Migration Notes

If you're migrating from the old structure (images in root folder):

1. Create the subfolders (hero/, thumb/, approach/, etc.)
2. Move images to appropriate folders
3. Update image paths in content data to use utilities
4. Verify all images load correctly

