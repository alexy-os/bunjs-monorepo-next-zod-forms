/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@pnpm-monorepo/ui"],
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../'),
  }
}

module.exports = nextConfig 