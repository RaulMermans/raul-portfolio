// Only load bundle-analyzer when ANALYZE=true (dev only, not installed in production)
const withBundleAnalyzer = process.env.ANALYZE === 'true'
  ? require('@next/bundle-analyzer')({ enabled: true })
  : (config) => config

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  transpilePackages: ['swiper'],
  output: 'export',
  trailingSlash: true,
  turbopack: {
    root: __dirname,
  },
  images: {
    // IONOS receives pre-generated assets; no runtime image server is available.
    unoptimized: true,
    qualities: [75, 80, 82, 84, 85, 88, 90],
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
}

module.exports = withBundleAnalyzer(nextConfig)
