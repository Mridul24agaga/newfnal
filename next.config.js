/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    images: {
      domains: ['im.runware.ai'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'im.runware.ai',
          port: '',
          pathname: '/image/**',
        },
      ],
      unoptimized: true,
    },
  }
  
  module.exports = nextConfig
  