# Placeholder Images

This folder contains fallback/placeholder images used when the main image fails to load.

## Current Placeholders

- `visuals-fallback.webp` - Fallback image for visuals gallery and photography gallery (used in lightbox and error handlers)

## Usage

These images are used as fallbacks in error handlers. They should be:
- Generic enough to work in any context
- Small file size for quick loading
- Neutral in color and style

## Image Requirements

- Format: WebP (preferred), JPG, or PNG
- Size: 800-1200px wide
- File size: Keep under 100KB if possible

## When to Add New Placeholders

If you need category-specific fallbacks, you can add:
- `photography-fallback.webp` - For photography gallery
- `case-studies-fallback.webp` - For case studies
- `services-fallback.webp` - For services section
- `sections-fallback.webp` - For section cards

Currently, `visuals-fallback.webp` is used as a universal fallback for all galleries.
