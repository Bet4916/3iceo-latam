import type { Metadata } from 'next'
import { Poppins, Inter } from 'next/font/google'
import '../styles/globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: '3ICEO LATAM — Congreso Internacional de Organizaciones Ambientales',
    template: '%s | 3ICEO LATAM',
  },
  description:
    'Congreso Internacional de Organizaciones Ambientales de Latinoamérica, organizado por AWAQ ONGD junto a la Universidad de San Buenaventura en Cali.',
  keywords: [
    '3ICEO',
    'LATAM',
    'medio ambiente',
    'congreso',
    'sostenibilidad',
    'AWAQ',
    'organizaciones ambientales',
    'Latinoamérica',
  ],
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: '3ICEO LATAM',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${poppins.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
