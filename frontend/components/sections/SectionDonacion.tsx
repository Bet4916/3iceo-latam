'use client'

/**
 * SectionDonacion — versión unificada
 * Ruta: frontend/components/sections/SectionDonacion.tsx
 *
 * PROPS:
 *  bg           → color de fondo. Default: '#09344e'
 *  theme        → 'dark' | 'light'
 *  waveColor    → color final de la ola inferior. Default: '#ffffff'
 *  showWave     → muestra la ola inferior (triple wave). Default: true
 *  showTopWave  → muestra la ola de entrada superior. Default: false
 *  topWaveFrom  → color de fondo de la sección anterior (para la ola superior). Default: '#ffffff'
 */

import { motion } from 'framer-motion'
import Link from 'next/link'

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
  >
    {children}
  </motion.div>
)

export interface SectionDonacionProps {
  bg?: string
  theme?: 'dark' | 'light'
  waveColor?: string
  showWave?: boolean
  showTopWave?: boolean
  topWaveFrom?: string
}

export default function SectionDonacion({
  bg = '#09344e',
  theme = 'dark',
  waveColor = '#ffffff',
  showWave = true,
  showTopWave = false,
  topWaveFrom = '#ffffff',
}: SectionDonacionProps) {

  const eyebrow   = theme === 'dark' ? '#74B4A7'                 : '#097589'
  const titleCol  = theme === 'dark' ? '#ffffff'                 : '#09344e'
  const bodyCol   = theme === 'dark' ? 'rgba(255,255,255,0.65)' : '#5A6E77'
  const secBorder = theme === 'dark' ? 'rgba(255,255,255,0.4)'  : 'rgba(9,52,78,0.35)'
  const secText   = theme === 'dark' ? '#ffffff'                 : '#09344e'

  return (
    <>
      {/* ── Ola de entrada (opcional) ── */}
      {showTopWave && (
        <div style={{ lineHeight: 0, backgroundColor: topWaveFrom }}>
          <svg viewBox="0 0 1440 72" preserveAspectRatio="none"
            style={{ width: '100%', height: 72, display: 'block' }}>
            <path
              d={`M0,0 C240,72 480,0 720,${72 * 0.6} C960,72 1200,${72 * 0.2} 1440,${72 * 0.65} L1440,72 L0,72 Z`}
              fill={bg}
            />
          </svg>
        </div>
      )}

      <section style={{ backgroundColor: bg, padding: '80px 48px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}
            className="donacion-grid"
          >
            {/* ── Texto ── */}
            <FadeIn>
              <p style={{
                fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 600,
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: eyebrow, marginBottom: 16,
              }}>
                Nadie se queda fuera
              </p>
              <h2 style={{
                fontFamily: 'Gloock, Georgia, serif', fontWeight: 400,
                fontSize: 'clamp(28px,3.5vw,48px)',
                color: titleCol, lineHeight: 1.1, marginBottom: 20,
              }}>
                ¡Gracias a ti, construimos el futuro ambiental de LATAM!
              </h2>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: 15,
                color: bodyCol, lineHeight: 1.75,
                marginBottom: 36, maxWidth: 480,
              }}>
                Tu donación permite que organizaciones ambientales sin recursos puedan
                asistir al 3ICEO. El importe irá íntegramente destinado a cubrir
                alojamiento, transporte y dietas.
              </p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <Link
                  href="/marketing/donaciones"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    backgroundColor: '#B53077', color: '#fff',
                    fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 700,
                    padding: '14px 34px', borderRadius: 999, textDecoration: 'none',
                    letterSpacing: '0.05em',
                    boxShadow: '0 4px 24px rgba(181,48,119,0.45)',
                  }}
                >
                  DONA AHORA →
                </Link>
                <Link
                  href="/marketing/registro"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    border: `2px solid ${secBorder}`,
                    color: secText,
                    fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 600,
                    padding: '14px 30px', borderRadius: 999, textDecoration: 'none',
                    letterSpacing: '0.04em',
                  }}
                >
                  Inscribirme al congreso
                </Link>
              </div>
            </FadeIn>

            {/* ── Imagen ── */}
            <FadeIn delay={0.15}>
              <div style={{
                position: 'relative', borderRadius: 20,
                overflow: 'hidden',
                backgroundColor: bg,
              }}>
                <img
                  src="/icons/planta_donacion.svg"
                  alt="Donación — planta en manos"
                  style={{ width: '100%', height: 'auto', display: 'block', maxHeight: 360, objectFit: 'cover' }}
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Triple wave inferior (opcional) ── */}
      {showWave && (
        <div style={{ position: 'relative', height: 96, overflow: 'hidden', lineHeight: 0, backgroundColor: bg }}>
          <svg viewBox="0 0 1440 96" preserveAspectRatio="none"
            style={{ position: 'absolute', bottom: 0, width: '100%', height: '100%' }}>
            <path fill="#BED1DA" opacity="0.9"
              d="M0,55 C200,20 400,85 600,55 C800,25 1000,80 1200,52 C1320,36 1400,68 1440,55 L1440,96 L0,96 Z"/>
          </svg>
          <svg viewBox="0 0 1440 96" preserveAspectRatio="none"
            style={{ position: 'absolute', bottom: 0, width: '100%', height: '100%' }}>
            <path fill="#4886B5"
              d="M0,68 C240,40 480,90 720,62 C900,40 1080,82 1260,60 C1360,48 1420,72 1440,62 L1440,96 L0,96 Z"/>
          </svg>
          <svg viewBox="0 0 1440 96" preserveAspectRatio="none"
            style={{ position: 'absolute', bottom: 0, width: '100%', height: '100%' }}>
            <path fill={waveColor}
              d="M0,75 C180,52 360,90 540,70 C720,50 900,88 1080,68 C1230,52 1370,78 1440,68 L1440,96 L0,96 Z"/>
          </svg>
        </div>
      )}
    </>
  )
}