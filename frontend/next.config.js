/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/marketing/home',
        permanent: false,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/unity-game/:path*',
        headers: [
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Embedder-Policy', value: 'require-corp' },
        ],
      },
    ]
  },
}

module.exports = nextConfig