/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: "http://dev.all-in.jyminc.com/",
  trailingSlash: true,
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
