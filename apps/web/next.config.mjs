/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.VERCEL ? undefined : 'export',
  distDir: process.env.VERCEL ? '.next' : 'out',
  images: {
    unoptimized: true
  }
};

export default nextConfig; 