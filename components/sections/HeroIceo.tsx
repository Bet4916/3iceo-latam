'use client'

/**
 * ══════════════════════════════════════════════════════════════════════
 *  HeroIceo — Componente hero unificado del sistema ICEO-LATAM
 *  Ruta sugerida: frontend/components/sections/HeroIceo.tsx
 *
 *  PROPS:
 *  ┌──────────────┬──────────────────────────────────────────────────────┐
 *  │ badge        │ Texto del chip superior (ej. "3ª Edición · Cali")    │
 *  │ title        │ JSX del h1 — permite spans de color                  │
 *  │ description  │ H2 descriptivo — acepta JSX con <br /> para corte    │
 *  │              │ exacto según especificaciones del Excel de copy       │
 *  │ cta          │ { label, href, target?, icon?, onClick? }            │
 *  │ ctaSecondary │ { label, href, target?, icon?, onClick? } — opcional │
 *  │ image        │ src de la imagen/SVG derecha                         │
 *  │ imageAlt     │ alt de la imagen                                     │
 *  │ imageLabel   │ Texto del chip flotante sobre la imagen              │
 *  │ imageScale   │ Escala la imagen. Default: 1. Usar 1.40 p/ SVGs     │
 *  │ imageRatio   │ Relación de aspecto del frame. Default: '16 / 10'    │
 *  │ waveVariant  │ 'default' | 'overlap' | 'sharp' | 'none'            │
 *  │ waveColor    │ Color de relleno de la ola (def: '#ffffff')          │
 *  │ children     │ Slot libre — se renderiza DENTRO de la ola, encima  │
 *  └──────────────┴──────────────────────────────────────────────────────┘
 *
 *  USO DEL PROP description (H2 con corte exacto):
 *  ┌─────────────────────────────────────────────────────────────────────┐
 *  │  description={                                                      │
 *  │    <>                                                               │
 *  │      Colabora como voluntario virtual, aliado o medio de prensa     │
 *  │      <br /> y ayuda a impulsar el congreso                          │
 *  │    </>                                                              │
 *  │  }                                                                  │
 *  └─────────────────────────────────────────────────────────────────────┘
 *
 *  RELACIÓN DE ASPECTO (imageRatio):
 *  · '16 / 10' → rectangular estándar (default)
 *  · '16 / 9'  → más panorámico / cine
 *  · '3 / 2'   → un poco más cuadrado
 *  · '4 / 3'   → cuadrado clásico
 *  El frame mantiene SIEMPRE esta proporción sin importar la imagen;
 *  objectFit: cover recorta lo que sobre.
 *
 *  VARIANTES DE OLA:
 *  · 'default' → ola suave estándar (memoria, home…)
 *  · 'overlap' → ola baja + children sobresaliendo (agenda con días)
 *  · 'sharp'   → quiebre más pronunciado
 *  · 'none'    → sin ola (corte recto)
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
  /** Ruta del icono (SVG o imagen) que se muestra a la izquierda del label */
  icon?: string
  /** Handler opcional — útil para scroll suave, analytics, etc. */
  onClick?: (e: React.MouseEvent) => void
}

export interface HeroIceoProps {
  badge?: string
  title: React.ReactNode
  /** H2 descriptivo. Acepta JSX con <br /> para forzar el corte de línea exacto. */
  description: React.ReactNode
  cta: CtaProps
  ctaSecondary?: CtaProps
  image: string
  imageAlt?: string
  imageLabel?: string
  /** Escala la imagen dentro del frame. Default: 1. Usar 1.40 para SVGs que no llenan el contenedor */
  imageScale?: number
  /** Relación de aspecto del frame de imagen. Default: '16 / 10' (rectangular) */
  imageRatio?: string
  waveVariant?: WaveVariant
  waveColor?: string
  children?: React.ReactNode
}

// ─── OLAS ─────────────────────────────────────────────────────────────────────

function Wave({ variant, color }: { variant: WaveVariant; color: string }) {
  if (variant === 'none') return null

  // overlap: ola que cubre naturalmente los children
  if (variant === 'overlap') {
    return (
      <div style={{ lineHeight: 0, marginTop: 0 }}>
        <svg
          viewBox="0 0 1440 72"
          preserveAspectRatio="none"
          style={{ width: '100%', height: 72, display: 'block' }}
        >
          <path
            d="M0,40 C240,72 480,12 720,42 C960,72 1200,22 1440,42 L1440,72 L0,72 Z"
            fill={color}
          />
        </svg>
      </div>
    )
  }

  // sharp: ola pronunciada
  if (variant === 'sharp') {
    return (
      <div style={{ lineHeight: 0, marginTop: -2 }}>
        <svg
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          style={{ width: '100%', height: 60, display: 'block' }}
        >
          <path
            d="M0,0 C200,60 400,0 600,40 C800,80 1000,10 1200,50 C1320,70 1400,30 1440,40 L1440,60 L0,60 Z"
            fill={color}
          />
        </svg>
      </div>
    )
  }

  // default: ola suave estándar
  return (
    <div style={{ lineHeight: 0, marginTop: -2 }}>
      <svg
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        style={{ width: '100%', height: 60, display: 'block' }}
      >
        <path
          d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,20 1440,30 L1440,60 L0,60 Z"
          fill={color}
        />
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
        {/* ── Efectos de fondo ────────────────────────────────────────── */}
        {/* Dot grid */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'radial-gradient(circle, rgba(9,52,78,0.9) 1px, transparent 1px)', backgroundSize: '26px 26px', pointerEvents: 'none' }} />
        {/* Glows */}
        <div style={{ position: 'absolute', top: -80, right: -80, width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle, rgba(9,52,78,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 60, left: -60, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(9,52,78,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        {/* Glossy / satin layers */}
        <div style={{ position: 'absolute', top: -120, left: '-5%', width: '65%', height: '85%', background: 'linear-gradient(118deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.04) 40%, transparent 65%)', transform: 'rotate(-6deg)', pointerEvents: 'none', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: 0, right: '-5%', width: '50%', height: '70%', background: 'linear-gradient(305deg, rgba(255,255,255,0.09) 0%, transparent 55%)', pointerEvents: 'none', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', top: '10%', left: '30%', width: '40%', height: '60%', background: 'radial-gradient(ellipse at 50% 40%, rgba(255,255,255,0.10) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, right: '15%', width: '30%', height: '45%', background: 'radial-gradient(ellipse at 60% 20%, rgba(174,229,218,0.18) 0%, transparent 60%)', pointerEvents: 'none' }} />

        {/* ── Contenido ───────────────────────────────────────────────── */}
        <div
          className="container-brand"
          style={{
            padding: waveVariant === 'overlap' ? '0 48px 8px' : '0 48px 88px',
            position: 'relative',
          }}
        >
          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}
            className="hero-iceo-grid"
          >
            {/* ── TEXTO ── */}
            <motion.div
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

              {/* H1 — título corto, UNA sola línea según Excel */}
              <h1
                style={{
                  fontFamily: 'Gloock, Georgia, serif',
                  fontSize: 'clamp(32px, 4vw, 56px)',
                  fontWeight: 400,
                  color: '#09344e',
                  lineHeight: 1.08,
                  marginBottom: 20,
                  letterSpacing: '-0.01em',
                  whiteSpace: 'nowrap',
                }}
              >
                {title}
              </h1>

              {/* H2 — descriptivo en dos líneas con corte exacto */}
              <h2
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 'clamp(16px, 1.8vw, 20px)',
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
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                {/* ── CTA Principal ── */}
                <Link
                  href={cta.href}
                  target={cta.target}
                  onClick={cta.onClick}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: '#09344e', color: '#fff', fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 700, padding: '13px 30px', borderRadius: 999, textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase', boxShadow: '0 4px 22px rgba(9,52,78,0.38)', transition: 'background-color 0.2s, transform 0.15s' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.backgroundColor = '#1C495C'; el.style.transform = 'translateY(-1px)' }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.backgroundColor = '#09344e'; el.style.transform = 'translateY(0)' }}
                >
                  {cta.icon && (
                    <img
                      src={cta.icon}
                      alt=""
                      aria-hidden="true"
                      style={{ width: 18, height: 18, objectFit: 'contain', flexShrink: 0 }}
                    />
                  )}
                  {cta.label}
                </Link>

                {/* ── CTA Secundario ── */}
                {ctaSecondary && (
                  <Link
                    href={ctaSecondary.href}
                    target={ctaSecondary.target}
                    onClick={ctaSecondary.onClick}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: 'rgba(9,52,78,0.10)', color: '#09344e', fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600, padding: '12px 28px', borderRadius: 999, textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase', border: '1.5px solid rgba(9,52,78,0.25)', transition: 'background-color 0.2s' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(9,52,78,0.18)')}
                    onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(9,52,78,0.10)')}
                  >
                    {ctaSecondary.icon && (
                      <img
                        src={ctaSecondary.icon}
                        alt=""
                        aria-hidden="true"
                        style={{ width: 18, height: 18, objectFit: 'contain', flexShrink: 0 }}
                      />
                    )}
                    {ctaSecondary.label}
                  </Link>
                )}
              </div>
            </motion.div>

            {/* ── IMAGEN con stacked cards ── */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
              onMouseEnter={() => setImageHovered(true)}
              onMouseLeave={() => setImageHovered(false)}
              style={{ position: 'relative', padding: '14px 18px 22px 13px', cursor: 'default' }}
            >
              {/* Capa 0 · Navy #09344e · trasera */}
              <div style={{ position: 'absolute', inset: 0, backgroundColor: '#09344e', borderRadius: 20, transform: `rotate(${imageHovered ? 1.5 : 5}deg) scale(${imageHovered ? 1 : 1.01})`, transition: 'transform 0.55s cubic-bezier(0.22,1,0.36,1)', zIndex: 0, boxShadow: '4px 14px 48px rgba(9,52,78,0.60)', willChange: 'transform', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 40%, transparent 65%)', borderRadius: 'inherit', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '60%', height: '60%', background: 'radial-gradient(ellipse at 60% 30%, rgba(72,134,181,0.35) 0%, transparent 65%)', pointerEvents: 'none' }} />
              </div>

              {/* Capa 1 · #ADD2D9 · intermedia */}
              <div style={{ position: 'absolute', inset: 0, backgroundColor: '#ADD2D9', borderRadius: 16, transform: `rotate(${imageHovered ? -1 : -3}deg) scale(${imageHovered ? 1 : 1.005})`, transition: 'transform 0.55s cubic-bezier(0.22,1,0.36,1)', zIndex: 1, willChange: 'transform', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(118deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 35%, transparent 60%)', borderRadius: 'inherit', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: '-15%', right: '-5%', width: '55%', height: '55%', background: 'radial-gradient(ellipse at 55% 65%, rgba(174,229,218,0.40) 0%, transparent 65%)', pointerEvents: 'none' }} />
              </div>

              {/* Capa 2 · Imagen · frontal — proporción fija con aspectRatio */}
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

        {/* ── Children en overlap: DENTRO del section teal, antes de la ola ── */}
        {children && waveVariant === 'overlap' && (
          <div style={{ position: 'relative', zIndex: 1 }}>
            {children}
          </div>
        )}

        {/* ── Ola ─────────────────────────────────────────────────────── */}
        <Wave variant={waveVariant} color={waveColor} />
      </section>

      {/* ── Children en variantes no-overlap: debajo de la ola ── */}
      {children && waveVariant !== 'overlap' && (
        <div style={{ position: 'relative', zIndex: 10 }}>
          {children}
        </div>
      )}

      {/* ── Responsive ──────────────────────────────────────────────── */}
      <style suppressHydrationWarning>{`
        .hero-iceo-grid {
          grid-template-columns: 1fr 1fr;
        }
        @media (max-width: 900px) {
          .hero-iceo-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  )
}