/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Force dynamic rendering to prevent static caching
  output: undefined, // Use default (not static export)
  // Disable static optimization for debugging
  experimental: {
    isrMemoryCacheSize: 0, // Disable ISR cache
  },
  images: {
    // Removed Unsplash - using local images only
    formats: ['image/avif', 'image/webp'],
    // Optimize image loading
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Enable image optimization
    minimumCacheTTL: 60,
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
  // Headers to prevent caching (AGGRESSIVE for debugging)
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate, max-age=0',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig

