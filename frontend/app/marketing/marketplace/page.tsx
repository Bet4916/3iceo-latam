'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { motion } from 'framer-motion'
import SectionDonacion from '@/components/sections/SectionDonacion'
import SectionRedes from '@/components/sections/SectionRedes'

// ─── EcoWorld (sin SSR) ────────────────────────────────────────────────────────
const EcoWorldEmbed = dynamic(
  () => import('@/components/ui/EcoWorldEmbed'),
  { ssr: false }
)

// ─── FADE IN ──────────────────────────────────────────────────────────────────
function FadeIn({
  children,
  delay = 0,
  style,
}: {
  children: React.ReactNode
  delay?: number
  style?: React.CSSProperties
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      style={style}
    >
      {children}
    </motion.div>
  )
}

// ─── WAVE HELPERS ─────────────────────────────────────────────────────────────
const WaveDown = ({ from, to, height = 72 }: { from: string; to: string; height?: number }) => (
  <div style={{ lineHeight: 0, backgroundColor: from }}>
    <svg viewBox={`0 0 1440 ${height}`} preserveAspectRatio="none"
      style={{ width: '100%', height, display: 'block' }}>
      <path
        d={`M0,0 C240,${height} 480,0 720,${height * 0.6} C960,${height} 1200,${height * 0.2} 1440,${height * 0.65} L1440,${height} L0,${height} Z`}
        fill={to}
      />
    </svg>
  </div>
)

// ─── STATS ────────────────────────────────────────────────────────────────────
const STATS = [
  { num: '28',  label: 'Organizaciones', icon: '/icons/org_marletplace.svg'  },
  { num: '03',  label: 'Días de Marketplace', icon: '/icons/dias_marletplace.svg' },
  { num: '9',   label: 'Países representados', icon: '/icons/uni_aliadas.svg' },
  { num: '100%',label: 'Enfoque sostenible', icon: '/icons/market_ex.svg' },
]

// ─── CATEGORÍAS ───────────────────────────────────────────────────────────────
const CATEGORIAS = [
  { label: 'Economía Circular',    icon: '/icons/market_ex.svg',          color: '#097589' },
  { label: 'Biodiversidad',        icon: '/icons/org_marletplace.svg',     color: '#1C495C' },
  { label: 'Energías Renovables',  icon: '/icons/dias_marletplace.svg',    color: '#074954' },
  { label: 'Agua y Saneamiento',   icon: '/icons/uni_aliadas.svg',         color: '#437287' },
  { label: 'Educación Ambiental',  icon: '/icons/ent_aliados.svg',         color: '#09344e' },
  { label: 'Innovación Social',    icon: '/icons/conversatorios.svg',      color: '#1C495C' },
]

// ─── INSTRUCCIONES ECOWORLD ───────────────────────────────────────────────────
const INSTRUCCIONES = [
  { key: 'WASD', label: 'Moverse',         desc: 'o flechas del teclado' },
  { key: 'E',    label: 'Interactuar',     desc: 'al acercarte a un stand' },
  { key: 'ESC',  label: 'Salir del stand', desc: 'cerrar panel de info'  },
]

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function MarketplacePage() {
  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>

      {/* ════════════════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{
        position: 'relative', overflow: 'hidden',
        minHeight: 560, display: 'flex', alignItems: 'center',
        paddingTop: 100,
      }}>
        {/* Gradient base */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, #09344e 0%, #1C495C 55%, #097589 100%)',
        }} />

        {/* Imagen hero de fondo */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/icons/market_ex.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.25,
        }} />

        {/* Gradient overlay direccional */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(100deg, rgba(9,52,78,0.92) 0%, rgba(9,52,78,0.65) 55%, rgba(9,52,78,0.25) 100%)',
        }} />

        {/* Decoración geométrica sutil */}
        <div style={{
          position: 'absolute', right: -80, top: -80,
          width: 500, height: 500, borderRadius: '50%',
          border: '1.5px solid rgba(174,229,218,0.12)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', right: 20, top: 20,
          width: 340, height: 340, borderRadius: '50%',
          border: '1px solid rgba(174,229,218,0.08)',
          pointerEvents: 'none',
        }} />

        {/* Content */}
        <div style={{
          position: 'relative', zIndex: 2,
          maxWidth: 1280, margin: '0 auto',
          padding: '80px 48px',
          width: '100%',
        }}>
          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}
            className="marketplace-hero-grid"
          >
            {/* LEFT */}
            <FadeIn>
              {/* Eyebrow badge */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                backgroundColor: 'rgba(255,255,255,0.10)',
                border: '1px solid rgba(174,229,218,0.28)',
                borderRadius: 999, padding: '5px 14px', marginBottom: 22,
              }}>
                <span style={{
                  fontFamily: 'Poppins, sans-serif', fontSize: 10, fontWeight: 700,
                  color: '#AEE5DA', letterSpacing: '0.12em', textTransform: 'uppercase',
                }}>
                  Marketplace Circular · 3ICEO
                </span>
              </div>

              <h1 style={{
                fontFamily: 'Gloock, Georgia, serif', fontWeight: 400,
                fontSize: 'clamp(32px, 4vw, 56px)',
                color: '#ffffff', lineHeight: 1.05, marginBottom: 20,
              }}>
                El espacio donde las soluciones sostenibles cobran vida
              </h1>

              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: 15,
                color: 'rgba(255,255,255,0.78)', lineHeight: 1.75, marginBottom: 14,
              }}>
                Emprendedores locales y organizaciones de todos los tamaños se unen en el
                Marketplace Circular del 3ICEO para dar visibilidad a sus proyectos ambientales
                e impulsar conexiones reales con actores del ecosistema sostenible.
              </p>

              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: 13,
                color: 'rgba(255,255,255,0.52)', lineHeight: 1.7, marginBottom: 36,
              }}>
                3 días · 28 organizaciones · 9 países · 100% economía circular
              </p>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href="#ecoworld" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  backgroundColor: '#097589', color: '#fff',
                  fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 700,
                  padding: '13px 28px', borderRadius: 999, textDecoration: 'none',
                  letterSpacing: '0.05em', textTransform: 'uppercase',
                  boxShadow: '0 4px 20px rgba(9,117,137,0.40)',
                  transition: 'opacity .2s',
                }}>
                  Explorar EcoWorld →
                </a>
                <Link href="/marketing/registro" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  backgroundColor: 'rgba(255,255,255,0.10)',
                  border: '1.5px solid rgba(255,255,255,0.30)',
                  color: '#fff',
                  fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600,
                  padding: '13px 28px', borderRadius: 999, textDecoration: 'none',
                  letterSpacing: '0.05em', textTransform: 'uppercase',
                  transition: 'background .2s',
                }}>
                  Registrarse
                </Link>
              </div>
            </FadeIn>

            {/* RIGHT — imagen hero */}
            <FadeIn delay={0.15}>
              <div style={{
                borderRadius: 20, overflow: 'hidden',
                aspectRatio: '4/3',
                boxShadow: '8px 8px 48px rgba(0,0,0,0.35)',
                border: '1.5px solid rgba(255,255,255,0.12)',
              }}>
                <img
                  src="/icons/market_ex.svg"
                  alt="Marketplace del 3ICEO"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Wave hero → stats */}
      <WaveDown from="transparent" to="#F5FBFA" height={60} />

      {/* ════════════════════════════════════════════════════════════════════
          STATS / CIFRAS
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#F5FBFA', padding: '48px 0 56px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
          <div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}
            className="stats-grid"
          >
            {STATS.map(({ num, label, icon }, i) => (
              <FadeIn key={label} delay={i * 0.08}>
                <div style={{
                  backgroundColor: '#fff',
                  borderRadius: 16,
                  padding: '28px 24px',
                  textAlign: 'center',
                  boxShadow: '2px 2px 20px rgba(9,52,78,0.07)',
                  border: '1px solid rgba(9,117,137,0.10)',
                }}>
                  <img src={icon} alt="" width={40} height={40}
                    style={{ display: 'block', margin: '0 auto 14px', objectFit: 'contain' }} />
                  <div style={{
                    fontFamily: 'Gloock, Georgia, serif', fontSize: 36, fontWeight: 400,
                    color: '#09344e', lineHeight: 1,
                  }}>
                    {num}
                  </div>
                  <div style={{
                    fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 600,
                    color: '#437287', marginTop: 6, textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}>
                    {label}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          DESCRIPCIÓN — QUÉ ES EL MARKETPLACE
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#fff', padding: '80px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}
            className="marketplace-desc-grid"
          >
            {/* Imagen */}
            <FadeIn>
              <div style={{
                position: 'relative',
                borderRadius: 20, overflow: 'hidden',
                aspectRatio: '4/3',
                boxShadow: '6px 6px 36px rgba(9,52,78,0.12)',
              }}>
                <img
                  src="/icons/org_marletplace.svg"
                  alt="Organizaciones en el marketplace"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                {/* Badge flotante */}
                <div style={{
                  position: 'absolute', bottom: 20, left: 20,
                  backgroundColor: '#09344e',
                  borderRadius: 12, padding: '10px 16px',
                  display: 'flex', alignItems: 'center', gap: 10,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                }}>
                  <img src="/icons/dias_marletplace.svg" alt="" width={28} height={28}
                    style={{ filter: 'brightness(0) invert(1)', display: 'block' }} />
                  <div>
                    <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 700, color: '#AEE5DA' }}>
                      3 DÍAS
                    </div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>
                      de marketplace activo
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Texto */}
            <FadeIn delay={0.12}>
              <span style={{
                fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 700,
                color: '#097589', letterSpacing: '0.12em', textTransform: 'uppercase',
                display: 'block', marginBottom: 14,
              }}>
                ¿Qué es el Marketplace Circular?
              </span>
              <h2 style={{
                fontFamily: 'Gloock, Georgia, serif', fontWeight: 400,
                fontSize: 'clamp(26px, 3vw, 40px)',
                color: '#09344e', lineHeight: 1.15, marginBottom: 20,
              }}>
                Donde emprendedores y organizaciones muestran sus soluciones sostenibles
              </h2>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: 15,
                color: '#5A6E77', lineHeight: 1.8, marginBottom: 18,
              }}>
                El Marketplace Circular es el corazón del 3ICEO: un espacio físico y digital
                donde organizaciones de todos los tamaños —desde pequeños emprendedores locales
                hasta entidades internacionales— exponen, conectan y hacen crecer sus iniciativas
                de impacto ambiental.
              </p>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: 14,
                color: '#5A6E77', lineHeight: 1.8, marginBottom: 32,
              }}>
                Cada stand es una puerta de entrada a un proyecto real. Conoce sus historias,
                sus productos y las personas detrás de cada solución sostenible.
              </p>

              {/* Bullets */}
              {[
                'Visibilidad para proyectos ambientales sin importar el tamaño',
                'Conexión directa con aliados, inversores y comunidad',
                'Tres días de networking e intercambio de buenas prácticas',
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12,
                }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: '50%',
                    backgroundColor: '#097589',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, marginTop: 2,
                  }}>
                    <svg width={11} height={11} viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span style={{
                    fontFamily: 'Inter, sans-serif', fontSize: 14,
                    color: '#12303E', lineHeight: 1.6,
                  }}>
                    {item}
                  </span>
                </div>
              ))}
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          CATEGORÍAS / ÁREAS TEMÁTICAS
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#F5FBFA', padding: '72px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <span style={{
                fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 700,
                color: '#097589', letterSpacing: '0.12em', textTransform: 'uppercase',
                display: 'block', marginBottom: 12,
              }}>
                Áreas Temáticas
              </span>
              <h2 style={{
                fontFamily: 'Gloock, Georgia, serif', fontWeight: 400,
                fontSize: 'clamp(24px, 2.8vw, 38px)',
                color: '#09344e', lineHeight: 1.2,
              }}>
                Soluciones para cada reto ambiental
              </h2>
            </div>
          </FadeIn>

          <div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}
            className="categorias-grid"
          >
            {CATEGORIAS.map(({ label, icon, color }, i) => (
              <FadeIn key={label} delay={i * 0.07}>
                <div style={{
                  backgroundColor: '#fff',
                  borderRadius: 16, padding: '28px 24px',
                  display: 'flex', alignItems: 'center', gap: 16,
                  boxShadow: '2px 2px 18px rgba(9,52,78,0.07)',
                  border: '1px solid rgba(9,117,137,0.08)',
                  transition: 'transform .2s, box-shadow .2s',
                }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 12,
                    backgroundColor: color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <img src={icon} alt="" width={28} height={28}
                      style={{ filter: 'brightness(0) invert(1)', display: 'block', objectFit: 'contain' }} />
                  </div>
                  <span style={{
                    fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 600,
                    color: '#09344e', lineHeight: 1.3,
                  }}>
                    {label}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Wave → EcoWorld */}
      <WaveDown from="#F5FBFA" to="#09344e" height={64} />

      {/* ════════════════════════════════════════════════════════════════════
          ECOWORLD — MARKETPLACE VIRTUAL
      ════════════════════════════════════════════════════════════════════ */}
      <section id="ecoworld" style={{ backgroundColor: '#09344e', padding: '72px 0 80px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>

          {/* Header */}
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                backgroundColor: 'rgba(255,255,255,0.10)',
                border: '1px solid rgba(174,229,218,0.25)',
                borderRadius: 999, padding: '5px 16px', marginBottom: 18,
              }}>
                <span style={{
                  fontFamily: 'Poppins, sans-serif', fontSize: 10, fontWeight: 700,
                  color: '#AEE5DA', letterSpacing: '0.12em', textTransform: 'uppercase',
                }}>
                  Experiencia inmersiva · EcoWorld
                </span>
              </div>
              <h2 style={{
                fontFamily: 'Gloock, Georgia, serif', fontWeight: 400,
                fontSize: 'clamp(28px, 3.5vw, 46px)',
                color: '#ffffff', lineHeight: 1.1, marginBottom: 16,
              }}>
                Explora EcoWorld
              </h2>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: 15,
                color: 'rgba(255,255,255,0.70)', lineHeight: 1.75,
                maxWidth: 560, margin: '0 auto',
              }}>
                Navega por el marketplace virtual en 3D. Acércate a cada stand y descubre
                las organizaciones que participan en el 3ICEO, sus proyectos y formas de contacto.
              </p>
            </div>
          </FadeIn>

          {/* Instrucciones */}
          <FadeIn delay={0.08}>
            <div style={{
              display: 'flex', gap: 16, justifyContent: 'center',
              flexWrap: 'wrap', marginBottom: 40,
            }}>
              {INSTRUCCIONES.map(({ key, label, desc }) => (
                <div key={key} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  backgroundColor: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 12, padding: '10px 18px',
                }}>
                  <div style={{
                    backgroundColor: '#097589',
                    borderRadius: 8, padding: '4px 10px',
                    fontFamily: 'monospace', fontSize: 14, fontWeight: 700,
                    color: '#fff', letterSpacing: '0.06em',
                    minWidth: 36, textAlign: 'center',
                  }}>
                    {key}
                  </div>
                  <div>
                    <div style={{
                      fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600,
                      color: '#fff', lineHeight: 1.2,
                    }}>
                      {label}
                    </div>
                    <div style={{
                      fontFamily: 'Inter, sans-serif', fontSize: 11,
                      color: 'rgba(255,255,255,0.50)', lineHeight: 1.3,
                    }}>
                      {desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Embed */}
          <FadeIn delay={0.14}>
            <div style={{
              borderRadius: 20, overflow: 'hidden',
              border: '1.5px solid rgba(174,229,218,0.18)',
              boxShadow: '0 8px 48px rgba(0,0,0,0.4)',
            }}>
              <EcoWorldEmbed />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Wave EcoWorld → donación */}
      <WaveDown from="#09344e" to="#fff" height={64} />

      {/* ════════════════════════════════════════════════════════════════════
          SECCIÓN DONACIÓN (componente unificado)
      ════════════════════════════════════════════════════════════════════ */}
      <SectionDonacion
        bg="#09344e"
        theme="dark"
        waveColor="#ffffff"
        showWave={true}
        showTopWave={false}
      />

      {/* ════════════════════════════════════════════════════════════════════
          SECCIÓN REDES SOCIALES (componente unificado)
      ════════════════════════════════════════════════════════════════════ */}
      <SectionRedes bg="#F7F6F3" theme="light" />

      {/* ─── RESPONSIVE ──────────────────────────────────────────────────── */}
      <style suppressHydrationWarning>{`
        @media (max-width: 1024px) {
          .stats-grid     { grid-template-columns: repeat(2,1fr) !important; }
          .categorias-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 780px) {
          .marketplace-hero-grid  { grid-template-columns: 1fr !important; }
          .marketplace-desc-grid  { grid-template-columns: 1fr !important; }
          .categorias-grid        { grid-template-columns: 1fr 1fr !important; }
          .stats-grid             { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 520px) {
          .categorias-grid { grid-template-columns: 1fr !important; }
          .stats-grid      { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  )
}