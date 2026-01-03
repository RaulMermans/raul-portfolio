# Case Studies Placeholder Images

This document lists all placeholder images needed for the case studies pages.

## AI Sports Campaign (`/case-studies/ai-sports`)

### Required Placeholder Images:
1. **Hero Image**: `/images/placeholders/ai-sports-hero.webp`
   - Size: 1920x1080px (or similar aspect ratio)
   - Purpose: Hero background image

2. **Full Bleed Images**:
   - `/images/placeholders/ai-sports-full-1.webp` - Full width image 1
   - `/images/placeholders/ai-sports-full-2.webp` - Full width image 2

3. **Approach Section Images**:
   - `/images/placeholders/ai-sports-approach-1.webp` - Workflow visualization
   - `/images/placeholders/ai-sports-approach-2.webp` - Campaign variant comparison

4. **Feature Image**:
   - `/images/placeholders/ai-sports-feature.webp` - Hero output image (1400px wide)

5. **Gallery Images**:
   - `/images/placeholders/ai-sports-gallery-1.webp` - Campaign output variant 1
   - `/images/placeholders/ai-sports-gallery-2.webp` - Campaign output variant 2
   - `/images/placeholders/ai-sports-gallery-3.webp` - Campaign output variant 3
   - `/images/placeholders/ai-sports-gallery-4.webp` - Campaign consistency demonstration
   - `/images/placeholders/ai-sports-gallery-5.webp` - Wardrobe swap example

**Total: 10 images**

3. **Listing Page Thumbnail**:
   - `/images/placeholders/ai-sports-campaign.webp` - Used in case studies listing page
   - Size: 800x600px (4:3 aspect ratio)

**Total: 11 images (including listing thumbnail)**

---

## Remoria (`/case-studies/remoria`)

### Required Placeholder Images:
1. **Hero Image**: `/images/placeholders/remoria-hero.webp`
   - Size: 1920x1080px (or similar aspect ratio)
   - Purpose: Hero background image (Mediterranean light and stone textures)

2. **Full Bleed Images**:
   - `/images/placeholders/remoria-full-1.webp` - Luxury fragrance aesthetic
   - `/images/placeholders/remoria-full-2.webp` - Mediterranean warmth and light

3. **Approach Section Images**:
   - `/images/placeholders/remoria-approach-1.webp` - Moodboard exploration
   - `/images/placeholders/remoria-approach-2.webp` - Typography and material details

4. **Feature Image**:
   - `/images/placeholders/remoria-feature.webp` - Brand identity hero visual (1400px wide)

5. **Gallery Images**:
   - `/images/placeholders/remoria-gallery-1.webp` - Packaging concept
   - `/images/placeholders/remoria-gallery-2.webp` - Color and material palette
   - `/images/placeholders/remoria-gallery-3.webp` - Brand textures
   - `/images/placeholders/remoria-gallery-4.webp` - Visual identity system
   - `/images/placeholders/remoria-gallery-5.webp` - Brand storytelling

**Total: 10 images**

3. **Listing Page Thumbnail**:
   - `/images/placeholders/remoria-campaign.webp` - Used in case studies listing page
   - Size: 800x600px (4:3 aspect ratio)

**Total: 11 images (including listing thumbnail)**

---

## Image Specifications

### Format
- **Preferred**: WebP (`.webp`)
- **Alternative**: JPG/JPEG (`.jpg` or `.jpeg`)

### Dimensions
- **Hero Images**: 1920x1080px (16:9 aspect ratio)
- **Full Bleed Images**: 1920x1080px (16:9 aspect ratio)
- **Feature Images**: 1400x787px (16:9 aspect ratio)
- **Approach Images**: 900x675px (4:3 aspect ratio)
- **Gallery Images**: 600x450px (4:3 aspect ratio) or 900x675px (4:3 aspect ratio)

### File Size
- Keep under 200KB per image when possible
- Optimize for web (compressed, but maintain quality)

### Color/Theme
- **AI Sports Campaign**: Athletic, dynamic, modern, sports-related
- **Remoria**: Luxury, Mediterranean, stone textures, warm tones, elegant

---

## How to Add Images

1. **Prepare your images**:
   - Resize to the specified dimensions
   - Convert to WebP format (use tools like Squoosh, ImageOptim, or online converters)
   - Optimize file size

2. **Save to this folder**:
   - Place all images in `/public/images/placeholders/`
   - Use the exact filenames listed above

3. **Test**:
   - Run `npm run dev`
   - Visit the case study pages
   - Verify images load correctly

---

## Temporary Solution

Until you add the actual images, the pages will show broken image placeholders. You can:

1. **Use a simple placeholder service** (for development):
   - Replace paths with: `https://via.placeholder.com/1920x1080` (adjust dimensions as needed)
   - This is temporary and should be replaced with actual images

2. **Create simple colored placeholders**:
   - Create solid color images with text labels
   - Use image editing software or online tools

3. **Leave as-is**:
   - The pages will work, but images won't display
   - Add your images when ready

---

## Notes

- All image paths are relative to `/public/`
- Next.js Image component will automatically optimize these images
- Make sure to maintain aspect ratios for best display
- Consider creating a simple script to generate placeholder images if needed

