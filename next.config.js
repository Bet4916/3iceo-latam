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
      // ── Tu regla existente para el juego (COOP/COEP) ──────────────────────
      {
        source: '/unity-game/:path*',
        headers: [
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Embedder-Policy', value: 'require-corp' },
        ],
      },

      // ── NUEVO: sirve los archivos Brotli (.br) con el header correcto ─────
      //    Sin esto, el navegador recibe el .br en crudo y Unity falla con
      //    "Unable to parse ... .br" / "SyntaxError". Aplica en next dev y Vercel.
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