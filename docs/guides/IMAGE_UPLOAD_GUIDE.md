# Image Upload Guide

Complete guide for uploading and managing images in the portfolio website.

## Quick Start

### Upload About Page Portrait

1. **Prepare your image**
   - Format: WebP (preferred), JPG, or PNG
   - Size: 800x1067px or larger (portrait orientation)
   - File size: Under 300KB recommended

2. **Save the image**
   ```
   /public/images/about/profile.webp
   ```
   (Or `profile.jpg` / `profile.png` - the code will work with any)

3. **Verify**
   ```bash
   node scripts/upload-image.js check
   ```

## Image Locations

### About Page Portrait
- **Path**: `/public/images/about/profile.webp`
- **Used in**: 
  - Homepage About section (`components/About.tsx`)
  - About page (`app/about/page.tsx`)
- **Dimensions**: 800x1067px (3:4 aspect ratio)
- **Formats**: WebP, JPG, PNG

### Section Background Images
- **Path**: `/public/images/sections/`
- **Files**:
  - `case-studies-bg.webp`
  - `photography-bg.webp`
  - `visuals-bg.webp` (if needed)
- **Dimensions**: 1920x1080px (16:9 aspect ratio)

### Photography Gallery
- **Path**: `/public/images/photography/`
- **Subfolders**: `architecture/`, `landscape/`, `street/`
- **Formats**: WebP, JPG
- **Dimensions**: Variable (will be optimized by Next.js)

## Tools & Scripts

### 1. Image Upload Helper Script

Check if images are in place:
```bash
node scripts/upload-image.js check
```

Get instructions for specific image type:
```bash
node scripts/upload-image.js about
node scripts/upload-image.js sections
node scripts/upload-image.js photography
```

### 2. Image Optimization Script

Convert and optimize images to WebP:
```bash
chmod +x scripts/optimize-image.sh
./scripts/optimize-image.sh ~/Downloads/portrait.jpg public/images/about/profile.webp
```

Or with custom quality (1-100):
```bash
./scripts/optimize-image.sh image.png public/images/about/profile.webp 85
```

### 3. Online Tools

If you don't have command-line tools:
- **Squoosh**: https://squoosh.app/ (Best for WebP conversion)
- **ImageOptim**: https://imageoptim.com/ (Mac app)
- **TinyPNG**: https://tinypng.com/ (Online compression)

## Image Optimization Best Practices

### 1. Format Selection

- **WebP**: Best compression, modern browsers
- **JPG**: Good for photos, universal support
- **PNG**: Good for graphics with transparency

### 2. Size Guidelines

| Image Type | Recommended Size | Max File Size |
|------------|----------------|---------------|
| About Portrait | 800x1067px | 300KB |
| Section Backgrounds | 1920x1080px | 500KB |
| Gallery Images | 1920x1280px | 400KB |
| Thumbnails | 400x400px | 100KB |

### 3. Optimization Steps

1. **Resize** to recommended dimensions
2. **Compress** using tools (Squoosh, ImageOptim)
3. **Convert** to WebP if possible
4. **Test** file size (should be under recommendations)

## Code Integration

### Automatic Image Handling

The code automatically:
- Optimizes images via Next.js Image component
- Generates responsive sizes
- Lazy loads images (except priority images)
- Provides fallbacks for missing images

### Manual Image Updates

If you need to update image paths in code:

**About Page** (`app/about/page.tsx`):
```typescript
<Image
  src="/images/about/profile.webp"  // Update this path
  alt="Raúl Mermans"
  width={800}
  height={1067}
  // ...
/>
```

**Homepage About** (`components/About.tsx`):
```typescript
<Image
  src="/images/about/profile.webp"  // Update this path
  alt="Portrait of Raúl Mermans"
  fill
  // ...
/>
```

## Troubleshooting

### Image Not Showing

1. **Check file path**: Must be in `/public/images/...`
2. **Check filename**: Case-sensitive, must match exactly
3. **Check format**: WebP, JPG, PNG supported
4. **Clear cache**: Hard refresh (Cmd+Shift+R / Ctrl+Shift+R)
5. **Check console**: Look for 404 errors

### Image Too Large

1. **Resize** using image editor
2. **Compress** using optimization tools
3. **Convert** to WebP format
4. **Check** file size (should be < 300KB for portraits)

### Wrong Aspect Ratio

1. **Crop** image to correct ratio
2. **Update** width/height in code if needed
3. **Use** `object-fit: cover` for automatic cropping

## Verification Checklist

After uploading images:

- [ ] Image file exists in correct location
- [ ] File name matches code reference
- [ ] File size is reasonable (< 500KB)
- [ ] Image displays correctly in browser
- [ ] Image is optimized (WebP if possible)
- [ ] Responsive sizes work on mobile
- [ ] Alt text is descriptive

## Additional Resources

- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [WebP Guide](https://developers.google.com/speed/webp)
- [Image Optimization Tools](https://web.dev/fast/#optimize-your-images)

