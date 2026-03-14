# Image Display Troubleshooting

## Why Images Might Not Be Appearing

### Common Causes:

1. **Missing `position: relative` on container**
   - **Issue**: Next.js `Image` component with `fill` prop requires the parent to have `position: relative`
   - **Fix**: Added `position: relative` to all image containers
   - **Files Fixed**: 
     - `CaseStudyImage.tsx`
     - `CaseStudyGallery.tsx`

2. **Incorrect Image Paths**
   - **Check**: Verify paths in `data/case-studies-content.ts` match actual file locations
   - **Format**: `/images/case-studies/{case-study-id}/{folder}/{filename}`
   - **Case Sensitivity**: Linux/production servers are case-sensitive (macOS is not)

3. **Missing Image Files**
   - **Check**: Run `node scripts/validate-case-study-images.js {case-study-id}`
   - **Verify**: All required images exist in `public/images/case-studies/` folders

4. **Browser Console Errors**
   - **Check**: Open browser DevTools → Console
   - **Look for**: 404 errors showing which images failed to load
   - **Fix**: Update paths or ensure files exist

5. **Next.js Image Optimization**
   - **Issue**: Next.js might be trying to optimize non-existent images
   - **Check**: Network tab in DevTools for failed image requests
   - **Fix**: Ensure images are in `public/` folder (not `src/` or `app/`)

### Debugging Steps:

1. Check browser console for errors
2. Verify image paths in network tab
3. Check file existence: `ls public/images/case-studies/{id}/`
4. Run validation script: `node scripts/validate-case-study-images.js {id}`
5. Clear Next.js cache: `rm -rf .next`

### Recent Fixes Applied:

✅ Added `position: relative` to image containers
✅ Added error handling with console logging
✅ Added `min-height` to prevent layout shift
✅ Improved image loading states

