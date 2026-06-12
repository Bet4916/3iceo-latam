/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'pub-94aa83314f8a41088bff3c1130d43ebd.r2.dev',
    ],
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

      {
        source: '/:path*.data.br',
        headers: [
          { key: 'Content-Encoding', value: 'br' },
          { key: 'Content-Type', value: 'application/octet-stream' },
        ],
      },
      {
        source: '/:path*.wasm.br',
        headers: [
          { key: 'Content-Encoding', value: 'br' },
          { key: 'Content-Type', value: 'application/wasm' },
        ],
      },
      {
        source: '/:path*.framework.js.br',
        headers: [
          { key: 'Content-Encoding', value: 'br' },
          { key: 'Content-Type', value: 'application/javascript' },
        ],
      },
    ]
  },
}

module.exports = nextConfig