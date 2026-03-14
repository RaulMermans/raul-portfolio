// Only load bundle-analyzer when ANALYZE=true (dev only, not installed in production)
const withBundleAnalyzer = process.env.ANALYZE === 'true'
  ? require('@next/bundle-analyzer')({ enabled: true })
  : (config) => config

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  transpilePackages: ['swiper'],
  swcMinify: true,
  output: 'export',
  trailingSlash: true,
  // Note: Client components are already dynamic by default
  images: {
    // Static export on IONOS cannot use the Next.js image optimizer.
    unoptimized: true,
    // Removed Unsplash - using local images only
    formats: ['image/avif', 'image/webp'],
    // Optimize image loading
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Enable image optimization - reasonable cache TTL with revalidation
    minimumCacheTTL: 86400, // 24 hours — portfolio images rarely change; this dramatically reduces sharp re-processing and memory pressure
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Compress output
  compress: true,
  // Optimize fonts
  optimizeFonts: true,
  // Webpack configuration for path aliases
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname),
    }
    // Disable CSS caching in development
    if (process.env.NODE_ENV === 'development') {
      config.optimization = {
        ...config.optimization,
        moduleIds: 'named',
      }
    }
    return config
  },
  // Headers are NOT supported by static export.
  // Caching should be configured via .htaccess or Cloudflare Page Rules.
}

module.exports = withBundleAnalyzer(nextConfig)
