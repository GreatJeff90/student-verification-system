// next.config.js - Remove the experimental.appDir since it's enabled by default in Next.js 14
/** @type {import('next').NextConfig} */
const nextConfig = {
  // No need for experimental.appDir in Next.js 14
  images: {
    domains: ['localhost'],
  },
}

module.exports = nextConfig