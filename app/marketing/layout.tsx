import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

// ─── REGLA IMPORTANTE ────────────────────────────────────────────────────────
// Este layout es el ÚNICO lugar donde se renderizan Navbar y Footer.
// NUNCA importes ni uses <Navbar> ni <Footer> dentro de ninguna page.tsx
// que viva bajo app/marketing/**
// ─────────────────────────────────────────────────────────────────────────────

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh' }}>{children}</main>
      <Footer />
    </>
  )
}
