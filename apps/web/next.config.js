/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@pnpm-monorepo/ui"],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@pnpm-monorepo/ui": "../../packages/ui/src"
    };
    return config;
  }
}

module.exports = nextConfig 