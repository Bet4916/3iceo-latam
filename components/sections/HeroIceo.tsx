'use client'

/**
 * ══════════════════════════════════════════════════════════════════════
 *  HeroIceo — Componente hero unificado del sistema ICEO-LATAM
 *  Ruta sugerida: frontend/components/sections/HeroIceo.tsx
 * ══════════════════════════════════════════════════════════════════════
 */

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

// ─── TIPOS ────────────────────────────────────────────────────────────────────

export type WaveVariant = 'default' | 'overlap' | 'sharp' | 'none'

interface CtaProps {
  label: string
  href: string
  target?: '_blank' | '_self'
  icon?: string
  onClick?: (e: React.MouseEvent) => void
}

export interface HeroIceoProps {
  badge?: string
  title: React.ReactNode
  description: React.ReactNode
  cta: CtaProps
  ctaSecondary?: CtaProps
  image: string
  imageAlt?: string
  imageLabel?: string
  imageScale?: number
  imageRatio?: string
  waveVariant?: WaveVariant
  waveColor?: string
  children?: React.ReactNode
}

// ─── OLAS ─────────────────────────────────────────────────────────────────────

function Wave({ variant, color }: { variant: WaveVariant; color: string }) {
  if (variant === 'none') return null

  if (variant === 'overlap') {
    return (
      <div style={{ lineHeight: 0, marginTop: 0 }}>
        <svg viewBox="0 0 1440 72" preserveAspectRatio="none" style={{ width: '100%', height: 72, display: 'block' }}>
          <path d="M0,40 C240,72 480,12 720,42 C960,72 1200,22 1440,42 L1440,72 L0,72 Z" fill={color} />
        </svg>
      </div>
    )
  }

  if (variant === 'sharp') {
    return (
      <div style={{ lineHeight: 0, marginTop: -2 }}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: '100%', height: 60, display: 'block' }}>
          <path d="M0,0 C200,60 400,0 600,40 C800,80 1000,10 1200,50 C1320,70 1400,30 1440,40 L1440,60 L0,60 Z" fill={color} />
        </svg>
      </div>
    )
  }

  return (
    <div style={{ lineHeight: 0, marginTop: -2 }}>
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: '100%', height: 60, display: 'block' }}>
        <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,20 1440,30 L1440,60 L0,60 Z" fill={color} />
      </svg>
    </div>
  )
}

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────

export default function HeroIceo({
  badge,
  title,
  description,
  cta,
  ctaSecondary,
  image,
  imageAlt = 'ICEO LATAM',
  imageLabel,
  imageScale = 1,
  imageRatio = '16 / 10',
  waveVariant = 'default',
  waveColor = '#ffffff',
  children,
}: HeroIceoProps) {
  const [imageHovered, setImageHovered] = useState(false)

  return (
    <>
      <section
        style={{
          backgroundColor: '#74B4A7',
          paddingTop: 88,
          paddingBottom: 0,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* ── Efectos de fondo ── */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'radial-gradient(circle, rgba(9,52,78,0.9) 1px, transparent 1px)', backgroundSize: '26px 26px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: -80, right: -80, width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle, rgba(9,52,78,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 60, left: -60, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(9,52,78,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: -120, left: '-5%', width: '65%', height: '85%', background: 'linear-gradient(118deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.04) 40%, transparent 65%)', transform: 'rotate(-6deg)', pointerEvents: 'none', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: 0, right: '-5%', width: '50%', height: '70%', background: 'linear-gradient(305deg, rgba(255,255,255,0.09) 0%, transparent 55%)', pointerEvents: 'none', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', top: '10%', left: '30%', width: '40%', height: '60%', background: 'radial-gradient(ellipse at 50% 40%, rgba(255,255,255,0.10) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, right: '15%', width: '30%', height: '45%', background: 'radial-gradient(ellipse at 60% 20%, rgba(174,229,218,0.18) 0%, transparent 60%)', pointerEvents: 'none' }} />

        {/* ── Contenido ── */}
        <div
          className="container-brand hero-iceo-wrapper"
          style={{ position: 'relative' }}
        >
          <div className="hero-iceo-grid">

            {/* ── TEXTO ── */}
            <motion.div
              className="hero-iceo-text"
              initial={{ opacity: 0, x: -32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              {badge && (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: 'rgba(9,52,78,0.14)', border: '1px solid rgba(9,52,78,0.22)', borderRadius: 999, padding: '6px 16px', marginBottom: 24 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#09344e', opacity: 0.65, flexShrink: 0, display: 'inline-block' }} />
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 600, color: '#09344e', letterSpacing: '0.10em', textTransform: 'uppercase' }}>{badge}</span>
                </div>
              )}

              {/* H1 */}
              <h1 className="hero-iceo-h1">
                {title}
              </h1>

              {/* H2 */}
              <h2
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 'clamp(15px, 1.8vw, 20px)',
                  fontWeight: 400,
                  color: '#12303E',
                  lineHeight: 1.55,
                  maxWidth: 550,
                  marginBottom: 36,
                  letterSpacing: '-0.005em',
                }}
              >
                {description}
              </h2>

              {/* CTAs */}
              <div className="hero-iceo-ctas">
                <Link
                  href={cta.href}
                  target={cta.target}
                  onClick={cta.onClick}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: '#09344e', color: '#fff', fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 700, padding: '13px 30px', borderRadius: 999, textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase', boxShadow: '0 4px 22px rgba(9,52,78,0.38)', transition: 'background-color 0.2s, transform 0.15s' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.backgroundColor = '#1C495C'; el.style.transform = 'translateY(-1px)' }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.backgroundColor = '#09344e'; el.style.transform = 'translateY(0)' }}
                >
                  {cta.icon && <img src={cta.icon} alt="" aria-hidden="true" style={{ width: 18, height: 18, objectFit: 'contain', flexShrink: 0 }} />}
                  {cta.label}
                </Link>

                {ctaSecondary && (
                  <Link
                    href={ctaSecondary.href}
                    target={ctaSecondary.target}
                    onClick={ctaSecondary.onClick}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: 'rgba(9,52,78,0.10)', color: '#09344e', fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600, padding: '12px 28px', borderRadius: 999, textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase', border: '1.5px solid rgba(9,52,78,0.25)', transition: 'background-color 0.2s' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(9,52,78,0.18)')}
                    onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(9,52,78,0.10)')}
                  >
                    {ctaSecondary.icon && <img src={ctaSecondary.icon} alt="" aria-hidden="true" style={{ width: 18, height: 18, objectFit: 'contain', flexShrink: 0 }} />}
                    {ctaSecondary.label}
                  </Link>
                )}
              </div>
            </motion.div>

            {/* ── IMAGEN con stacked cards ── */}
            <motion.div
              className="hero-iceo-image-wrapper"
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
              onMouseEnter={() => setImageHovered(true)}
              onMouseLeave={() => setImageHovered(false)}
              style={{ position: 'relative', padding: '14px 18px 22px 13px', cursor: 'default' }}
            >
              {/* Capa 0 · Navy · trasera */}
              <div style={{ position: 'absolute', inset: 0, backgroundColor: '#09344e', borderRadius: 20, transform: `rotate(${imageHovered ? 1.5 : 5}deg) scale(${imageHovered ? 1 : 1.01})`, transition: 'transform 0.55s cubic-bezier(0.22,1,0.36,1)', zIndex: 0, boxShadow: '4px 14px 48px rgba(9,52,78,0.60)', willChange: 'transform', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 40%, transparent 65%)', borderRadius: 'inherit', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '60%', height: '60%', background: 'radial-gradient(ellipse at 60% 30%, rgba(72,134,181,0.35) 0%, transparent 65%)', pointerEvents: 'none' }} />
              </div>

              {/* Capa 1 · intermedia */}
              <div style={{ position: 'absolute', inset: 0, backgroundColor: '#ADD2D9', borderRadius: 16, transform: `rotate(${imageHovered ? -1 : -3}deg) scale(${imageHovered ? 1 : 1.005})`, transition: 'transform 0.55s cubic-bezier(0.22,1,0.36,1)', zIndex: 1, willChange: 'transform', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(118deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 35%, transparent 60%)', borderRadius: 'inherit', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: '-15%', right: '-5%', width: '55%', height: '55%', background: 'radial-gradient(ellipse at 55% 65%, rgba(174,229,218,0.40) 0%, transparent 65%)', pointerEvents: 'none' }} />
              </div>

              {/* Capa 2 · Imagen · frontal */}
              <div style={{ position: 'relative', zIndex: 2, borderRadius: 14, overflow: 'hidden', transform: `rotate(${imageHovered ? 0 : -1.5}deg)`, transition: 'transform 0.55s cubic-bezier(0.22,1,0.36,1)', boxShadow: '0 16px 56px rgba(0,0,0,0.38)', willChange: 'transform', isolation: 'isolate', backgroundColor: '#000', width: '100%', aspectRatio: imageRatio }}>
                <img
                  src={image}
                  alt={imageAlt}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: imageScale !== 1 ? `scale(${imageScale})` : 'none' }}
                />
              </div>

              {/* Label flotante */}
              {imageLabel && (
                <div style={{ position: 'absolute', bottom: 10, left: 18, zIndex: 3, display: 'flex', alignItems: 'center', gap: 6, backgroundColor: 'rgba(9,52,78,0.82)', backdropFilter: 'blur(8px)', borderRadius: 999, padding: '4px 12px', border: '1px solid rgba(72,134,181,0.45)', opacity: imageHovered ? 0 : 1, transition: 'opacity 0.3s ease', pointerEvents: 'none' }}>
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 10, fontWeight: 700, color: '#AEE5DA', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{imageLabel}</span>
                </div>
              )}
            </motion.div>

          </div>
        </div>

        {/* ── Children en overlap ── */}
        {children && waveVariant === 'overlap' && (
          <div style={{ position: 'relative', zIndex: 1 }}>
            {children}
          </div>
        )}

        <Wave variant={waveVariant} color={waveColor} />
      </section>

      {/* ── Children en variantes no-overlap ── */}
      {children && waveVariant !== 'overlap' && (
        <div style={{ position: 'relative', zIndex: 10 }}>
          {children}
        </div>
      )}

      <style suppressHydrationWarning>{`
        /* ── Wrapper padding ── */
        .hero-iceo-wrapper {
          padding: 0 48px 88px;
        }

        /* ── Grid principal ── */
        .hero-iceo-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }

        /* ── H1 ── */
        .hero-iceo-h1 {
          font-family: Gloock, Georgia, serif;
          font-size: clamp(28px, 4vw, 56px);
          font-weight: 400;
          color: #09344e;
          line-height: 1.08;
          margin-bottom: 20px;
          letter-spacing: -0.01em;
          white-space: nowrap;
        }

        /* ── CTAs ── */
        .hero-iceo-ctas {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          align-items: center;
        }

        /* ── Tablet: 768–1023px ── */
        @media (min-width: 768px) and (max-width: 1023px) {
          .hero-iceo-wrapper {
            padding: 0 32px 64px;
          }
          .hero-iceo-grid {
            grid-template-columns: 1fr 1fr;
            gap: 36px;
          }
          .hero-iceo-h1 {
            white-space: normal;
            font-size: clamp(24px, 3.5vw, 40px);
          }
        }

        /* ── Móvil: < 768px ── */
        @media (max-width: 767px) {
          .hero-iceo-wrapper {
            padding: 0 20px 48px;
          }
          .hero-iceo-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .hero-iceo-text {
            order: 1;
            text-align: center;
          }
          .hero-iceo-image-wrapper {
            order: 2;
            /* Reducir rotación de las capas decorativas en móvil para evitar overflow */
            max-width: 480px;
            margin: 0 auto;
          }
          .hero-iceo-h1 {
            white-space: normal;
            font-size: clamp(26px, 7vw, 38px);
          }
          .hero-iceo-ctas {
            justify-content: center;
          }
        }

        /* ── Overlap: ajuste del padding inferior cuando hay children ── */
        @media (max-width: 767px) {
          .hero-iceo-wrapper[data-overlap="true"] {
            padding-bottom: 8px;
          }
        }
      `}</style>
    </>
  )
}