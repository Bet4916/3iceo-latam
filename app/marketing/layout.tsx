import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import GoogleTranslate from '@/components/GoogleTranslate'

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GoogleTranslate />
      <Navbar />
      <main style={{ minHeight: '100vh' }}>{children}</main>
      <Footer />
    </>
  )
}