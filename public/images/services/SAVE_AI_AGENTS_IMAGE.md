# AI Agents Service Image

## Save Your Image Here

Save your AI Agents image (robotic arm reaching towards human hand) as:

**File path:** `/public/images/services/ai-agents.webp`

## Image Requirements

- **Format:** WebP (recommended) or JPG/PNG
- **Size:** 300x225px or larger (will be optimized by Next.js)
- **Aspect Ratio:** 4:3 or similar
- **File Name:** `ai-agents.webp` (or `.jpg`/`.png`)

## Steps

1. **Save the image** you just shared to this location:
   ```
   public/images/services/ai-agents.webp
   ```

2. **If your image is JPG/PNG**, you can:
   - Save it as `ai-agents.jpg` or `ai-agents.png`
   - Or convert to WebP for better performance

3. **Update the code** if needed (if you use .jpg or .png instead of .webp):
   - Edit `components/Services.tsx`
   - Change line 13: `image: '/images/services/ai-agents.webp'` to match your file extension

## Image Optimization (Optional)

For best performance, convert to WebP:
- Use online tools like Squoosh.app
- Or use the optimize script: `./scripts/optimize-image.sh your-image.jpg public/images/services/ai-agents.webp`

## Current Setup

The code is already configured to use:
- Path: `/images/services/ai-agents.webp`
- Component: `Services.tsx`
- Service: AI Agents (00-1)

Once you save the image, it will automatically appear in the Services section!

