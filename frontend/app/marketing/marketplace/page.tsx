'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { motion } from 'framer-motion'
import HeroIceo from '@/components/sections/HeroIceo'
import SectionDonacion from '@/components/sections/SectionDonacion'
import SectionRedes from '@/components/sections/SectionRedes'

const EcoWorldEmbed = dynamic(
  () => import('@/components/ui/EcoWorldEmbed'),
  { ssr: false }
)

function FadeIn({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      style={style}
    >{children}</motion.div>
  )
}

// ─── STATS ────────────────────────────────────────────────────────────────────
const STATS = [
  {
    num: '28', label: 'Organizaciones',
    image: 'https://pub-94aa83314f8a41088bff3c1130d43ebd.r2.dev/2%20ICEO/Mermoria%202ICEO/momentos/marketplace.jpg',
  },
  {
    num: '03', label: 'Días de Marketplace',
    image: 'https://pub-94aa83314f8a41088bff3c1130d43ebd.r2.dev/2%20ICEO/Mermoria%202ICEO/momentos/dias_marketplace.jpg',
  },
  {
    num: '9', label: 'Países representados',
    image: 'https://pub-94aa83314f8a41088bff3c1130d43ebd.r2.dev/2%20ICEO/Mermoria%202ICEO/momentos/universidades.jpg',
  },
  {
    num: '100%', label: 'Enfoque sostenible',
    image: 'https://pub-94aa83314f8a41088bff3c1130d43ebd.r2.dev/2%20ICEO/Mermoria%202ICEO/momentos/panelistas.jpg',
  },
]

// ─── CATEGORÍAS — iconos SVG formales ─────────────────────────────────────────
const CATEGORIAS = [
  {
    label: 'Economía Circular', color: '#097589',
    icon: (
      <svg width={26} height={26} viewBox="0 0 24 24" fill="none">
        <path d="M2 12a10 10 0 0 1 10-10" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M22 12a10 10 0 0 1-10 10" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M12 2l3 3-3 3M12 22l-3-3 3-3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="3" stroke="#fff" strokeWidth="1.8"/>
      </svg>
    ),
  },
  {
    label: 'Biodiversidad', color: '#1C495C',
    icon: (
      <svg width={26} height={26} viewBox="0 0 24 24" fill="none">
        <path d="M12 22V12M12 12C12 7 7 4 3 5c0 5 3 9 9 9zM12 12C12 7 17 4 21 5c0 5-3 9-9 9z" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'Energías Renovables', color: '#074954',
    icon: (
      <svg width={26} height={26} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="4" stroke="#fff" strokeWidth="1.8"/>
        <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'Agua y Saneamiento', color: '#437287',
    icon: (
      <svg width={26} height={26} viewBox="0 0 24 24" fill="none">
        <path d="M12 2C12 2 5 10 5 15a7 7 0 0 0 14 0c0-5-7-13-7-13z" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M9 17a3 3 0 0 0 6 0" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'Educación Ambiental', color: '#09344e',
    icon: (
      <svg width={26} height={26} viewBox="0 0 24 24" fill="none">
        <path d="M12 3L2 8l10 5 10-5-10-5z" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'Innovación Social', color: '#1C495C',
    icon: (
      <svg width={26} height={26} viewBox="0 0 24 24" fill="none">
        <path d="M12 2a7 7 0 0 1 7 7c0 3-1.5 5-3.5 6.5V17a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2v-1.5C6.5 14 5 12 5 9a7 7 0 0 1 7-7z" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M9 21h6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
]

const INSTRUCCIONES = [
  { key: 'WASD', label: 'Moverse',         desc: 'o flechas del teclado' },
  { key: 'E',    label: 'Interactuar',     desc: 'al acercarte a un stand' },
  { key: 'ESC',  label: 'Salir del stand', desc: 'cerrar panel de info'   },
]

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function MarketplacePage() {
  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>

      {/* ══ 1. HERO — unificado HeroIceo + Excel ══════════════════════════════
          H1 corto · H2 dos líneas con <br /> exacto
          Botón secundario → registro con stand pre-seleccionado
      ════════════════════════════════════════════════════════════════════ */}
      <HeroIceo
        badge="Marketplace Circular · 3ICEO"
        title={<>Marketplace <span style={{ color: '#ffffff' }}>3ICEO</span></>}
        description={<>Escaparate de organizaciones y soluciones sostenibles<br />del congreso ambiental más importante de LATAM</>}
        cta={{ label: 'EXPLORAR ECOWORLD →', href: '#ecoworld' }}
        ctaSecondary={{ label: 'Reserva tu stand', href: '/marketing/registro?tipo=asistencia&stand=true' }}
        image="/icons/market_ex.svg"
        imageAlt="Marketplace del 3ICEO"
        imageLabel="Marketplace · 3° ICEO · Cali"
        imageScale={1.30}
        waveVariant="default"
        waveColor="#F5FBFA"
      />

      {/* ══ 2. STATS — imagen de fondo full card (no icono dentro) ════════════ */}
      <section style={{ backgroundColor: '#F5FBFA', padding: '64px 48px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }} className="stats-grid">
            {STATS.map(({ num, label, image }, i) => (
              <FadeIn key={label} delay={i * 0.08}>
                {/* La imagen ES el card — overlay con el número encima */}
                <div style={{
                  position: 'relative',
                  borderRadius: 20, overflow: 'hidden',
                  aspectRatio: '4/3',
                  boxShadow: '4px 4px 24px rgba(9,52,78,0.15)',
                }}>
                  <img
                    src={image}
                    alt={label}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    onError={e => {
                      const el = e.currentTarget as HTMLImageElement
                      el.style.display = 'none'
                      if (el.parentElement) el.parentElement.style.background = 'linear-gradient(135deg,#09344e,#097589)'
                    }}
                  />
                  {/* Overlay degradado bottom */}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(9,52,78,0.88) 0%, rgba(9,52,78,0.20) 55%, transparent 100%)' }} />
                  {/* Número y label */}
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 18px', display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 38, fontWeight: 700, color: '#fff', lineHeight: 1 }}>{num}</span>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.80)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 3. QUÉ ES EL MARKETPLACE ══════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#ffffff', padding: '80px 48px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }} className="marketplace-desc-grid">

            {/* Imagen full */}
            <FadeIn>
              <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', aspectRatio: '4/3', boxShadow: '6px 6px 36px rgba(9,52,78,0.12)' }}>
                <img
                  src="https://pub-94aa83314f8a41088bff3c1130d43ebd.r2.dev/2%20ICEO/Mermoria%202ICEO/momentos/marketplace.jpg"
                  alt="Marketplace ICEO"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  onError={e => { (e.currentTarget as HTMLImageElement).src = '/icons/org_marletplace.svg' }}
                />
                <div style={{ position: 'absolute', bottom: 20, left: 20, backgroundColor: '#09344e', borderRadius: 12, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}>
                  <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="#AEE5DA" strokeWidth="1.8" strokeLinejoin="round"/>
                    <path d="M9 22V12h6v10" stroke="#AEE5DA" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                  <div>
                    <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 700, color: '#AEE5DA' }}>3 DÍAS</div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>de marketplace activo</div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Texto */}
            <FadeIn delay={0.12}>
              <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 700, color: '#097589', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: 14 }}>
                ¿Qué es el Marketplace Circular?
              </span>
              <h2 style={{ fontFamily: 'Gloock, Georgia, serif', fontWeight: 400, fontSize: 'clamp(26px, 3vw, 40px)', color: '#09344e', lineHeight: 1.15, marginBottom: 20 }}>
                Un escaparate de organizaciones y soluciones sostenibles
              </h2>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#5A6E77', lineHeight: 1.8, marginBottom: 18 }}>
                El Marketplace del 3ICEO es un expositor visual de organizaciones aprobadas — logos, redes, tipo de organización y proyectos alineados con las líneas temáticas del congreso. No es una tienda transaccional: es una vitrina de impacto.
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#5A6E77', lineHeight: 1.8, marginBottom: 32 }}>
                Cada stand es una puerta de entrada a un proyecto real. Conoce sus historias, sus productos y las personas detrás de cada solución ambiental.
              </p>
              {[
                'Expositor visual de organizaciones aprobadas por el comité',
                'Logos, redes sociales, tipo de organización y productos',
                'Conecta directamente con aliados y comunidad ambiental',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', backgroundColor: '#097589', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                    <svg width={11} height={11} viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#12303E', lineHeight: 1.6 }}>{item}</span>
                </div>
              ))}

              {/* CTA stand dentro de la descripción */}
              <div style={{ marginTop: 32 }}>
                <Link
                  href="/marketing/registro?tipo=asistencia&stand=true"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: '#B53077', color: '#fff', fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 700, padding: '12px 28px', borderRadius: 999, textDecoration: 'none', letterSpacing: '0.05em', boxShadow: '0 2px 16px rgba(181,48,119,0.30)', transition: 'background-color 0.2s, transform 0.15s' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.backgroundColor = '#802254'; el.style.transform = 'translateY(-1px)' }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.backgroundColor = '#B53077'; el.style.transform = 'translateY(0)' }}
                >
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round"/>
                    <path d="M9 22V12h6v10" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                  SOLICITAR MI STAND
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══ 4. CATEGORÍAS — iconos SVG formales ═══════════════════════════════ */}
      <section style={{ backgroundColor: '#F5FBFA', padding: '72px 48px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 700, color: '#097589', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: 12 }}>
                Áreas Temáticas
              </span>
              <h2 style={{ fontFamily: 'Gloock, Georgia, serif', fontWeight: 400, fontSize: 'clamp(24px, 2.8vw, 38px)', color: '#09344e', lineHeight: 1.2 }}>
                Soluciones para cada reto ambiental
              </h2>
            </div>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }} className="categorias-grid">
            {CATEGORIAS.map(({ label, icon, color }, i) => (
              <FadeIn key={label} delay={i * 0.07}>
                <div style={{ backgroundColor: '#fff', borderRadius: 16, padding: '24px 22px', display: 'flex', alignItems: 'center', gap: 16, boxShadow: '2px 2px 18px rgba(9,52,78,0.07)', border: '1px solid rgba(9,117,137,0.08)', transition: 'transform .2s, box-shadow .2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '4px 8px 28px rgba(9,52,78,0.13)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '2px 2px 18px rgba(9,52,78,0.07)' }}
                >
                  <div style={{ width: 48, height: 48, borderRadius: 12, backgroundColor: color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {icon}
                  </div>
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 600, color: '#09344e', lineHeight: 1.3 }}>{label}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Wave → EcoWorld */}
      <div style={{ lineHeight: 0, backgroundColor: '#F5FBFA' }}>
        <svg viewBox="0 0 1440 64" preserveAspectRatio="none" style={{ width: '100%', height: 64, display: 'block' }}>
          <path d="M0,0 C240,64 480,0 720,40 C960,64 1200,16 1440,44 L1440,64 L0,64 Z" fill="#09344e"/>
        </svg>
      </div>

      {/* ══ 5. ECOWORLD ═══════════════════════════════════════════════════════ */}
      <section id="ecoworld" style={{ backgroundColor: '#09344e', padding: '72px 48px 80px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: 'rgba(255,255,255,0.10)', border: '1px solid rgba(174,229,218,0.25)', borderRadius: 999, padding: '5px 16px', marginBottom: 18 }}>
                <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 10, fontWeight: 700, color: '#AEE5DA', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Experiencia inmersiva · EcoWorld</span>
              </div>
              <h2 style={{ fontFamily: 'Gloock, Georgia, serif', fontWeight: 400, fontSize: 'clamp(28px, 3.5vw, 46px)', color: '#ffffff', lineHeight: 1.1, marginBottom: 16 }}>Explora EcoWorld</h2>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.70)', lineHeight: 1.75, maxWidth: 560, margin: '0 auto' }}>
                Navega por el marketplace virtual en 3D. Acércate a cada stand y descubre las organizaciones participantes, sus proyectos y formas de contacto.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 40 }}>
              {INSTRUCCIONES.map(({ key, label, desc }) => (
                <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 10, backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, padding: '10px 18px' }}>
                  <div style={{ backgroundColor: '#097589', borderRadius: 8, padding: '4px 10px', fontFamily: 'monospace', fontSize: 14, fontWeight: 700, color: '#fff', letterSpacing: '0.06em', minWidth: 36, textAlign: 'center' }}>{key}</div>
                  <div>
                    <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600, color: '#fff', lineHeight: 1.2 }}>{label}</div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.50)', lineHeight: 1.3 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.14}>
            <div style={{ borderRadius: 20, overflow: 'hidden', border: '1.5px solid rgba(174,229,218,0.18)', boxShadow: '0 8px 48px rgba(0,0,0,0.4)' }}>
              <EcoWorldEmbed />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Wave EcoWorld → donación */}
      <div style={{ lineHeight: 0, backgroundColor: '#09344e' }}>
        <svg viewBox="0 0 1440 64" preserveAspectRatio="none" style={{ width: '100%', height: 64, display: 'block' }}>
          <path d="M0,64 C360,0 1080,64 1440,24 L1440,0 L0,0 Z" fill="#09344e"/>
          <path d="M0,64 C360,0 1080,64 1440,24 L1440,64 L0,64 Z" fill="#ffffff"/>
        </svg>
      </div>

      {/* ══ 6. DONACIÓN ═══════════════════════════════════════════════════════ */}
      <SectionDonacion
              bg="#ffffff"
              theme="light"
              showWave={false}
            />

      {/* ══ 7. REDES ══════════════════════════════════════════════════════════ */}
      <SectionRedes bg="#F7F6F3" theme="light" />

      <style suppressHydrationWarning>{`
        @media (max-width: 1024px) {
          .stats-grid      { grid-template-columns: repeat(2,1fr) !important; }
          .categorias-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 780px) {
          .marketplace-desc-grid { grid-template-columns: 1fr !important; }
          .stats-grid            { grid-template-columns: 1fr 1fr !important; }
          .categorias-grid       { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 520px) {
          .categorias-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}