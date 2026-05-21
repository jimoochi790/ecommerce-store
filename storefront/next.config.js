/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
  turbopack: {
    root: "/home/jimoochi/hermes-workspace/ecommerce-store/storefront",
  },
}

module.exports = nextConfig
