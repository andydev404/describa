/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    instrumentationHook: true
  },
  images: {
    remotePatterns: [
      { hostname: 'nextuipro.nyc3.cdn.digitaloceanspaces.com' },
      { hostname: 'utfs.io' }
    ]
  }
}

export default nextConfig
