'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import HeroIceo from '@/components/sections/HeroIceo'
import SectionDonacion from '@/components/sections/SectionDonacion'
import SectionRedes from '@/components/sections/SectionRedes'

// ─── FADE IN ──────────────────────────────────────────────────────────────────
function FadeIn({
  children, delay = 0, style,
}: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-48px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      style={style}
    >
      {children}
    </motion.div>
  )
}

// ─── CHECK ────────────────────────────────────────────────────────────────────
function Check({ color }: { color: string }) {
  return (
    <svg width={18} height={18} viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
      <circle cx="8" cy="8" r="8" fill={color} opacity={0.14} />
      <path d="M4.5 8l2.5 2.5 4.5-4.5" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─── ICONOS POR TARJETA ───────────────────────────────────────────────────────
function CardIcon({ kind }: { kind: 'voluntariado' | 'aliados' | 'prensa' }) {
  const common = { width: 30, height: 30, viewBox: '0 0 24 24', fill: 'none', stroke: 'white', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  if (kind === 'voluntariado') {
    return (
      <svg {...common}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  }
  if (kind === 'aliados') {
    return (
      <svg {...common}>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    )
  }
  return (
    <svg {...common}>
      <path d="M3 11l19-9-9 19-2-8-8-2z" />
    </svg>
  )
}

// ─── ICONOS "POR QUÉ SUMARTE" ─────────────────────────────────────────────────
function WhyIcon({ kind }: { kind: 'impacto' | 'red' | 'visibilidad' }) {
  const c = { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: '#097589', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  if (kind === 'impacto') return <svg {...c}><path d="M12 21s-7-4.35-9.5-8.5C.5 9 2 5 5.5 5 7.5 5 9 6 12 9c3-3 4.5-4 6.5-4C22 5 23.5 9 21.5 12.5 19 16.65 12 21 12 21z" /></svg>
  if (kind === 'red') return <svg {...c}><circle cx="12" cy="5" r="2.5" /><circle cx="5" cy="18" r="2.5" /><circle cx="19" cy="18" r="2.5" /><path d="M12 7.5v4M10 13l-3.5 3M14 13l3.5 3" /></svg>
  return <svg {...c}><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" /><circle cx="12" cy="12" r="3" /></svg>
}

// ─── TARJETAS ─────────────────────────────────────────────────────────────────
const CARDS = [
  {
    kind: 'voluntariado' as const,
    badge: 'VOLUNTARIADO VIRTUAL',
    accent: '#097589',
    gradient: 'linear-gradient(135deg, #097589 0%, #1C495C 100%)',
    title: 'Voluntariado Virtual',
    desc: 'Apoya la logística digital, la comunicación y la atención a participantes antes y durante el congreso.',
    perks: ['Certificado de participación', 'Acceso a todas las charlas', 'Kit oficial del voluntario'],
    cta: { label: 'Postularme como voluntario/a', href: '/marketing/colabora/voluntariado' },
  },
  {
    kind: 'aliados' as const,
    badge: 'ALIADOS ESTRATÉGICOS',
    accent: '#B53077',
    gradient: 'linear-gradient(135deg, #B53077 0%, #09344e 100%)',
    title: 'Aliados Estratégicos',
    desc: 'Suma capacidades, recursos, patrocinio o apoyo institucional para hacer posible el 3er ICEO LATAM.',
    perks: ['Visibilidad institucional', 'Networking con inversores', 'Espacio en el Marketplace'],
    // ← Autoselecciona "ser aliado" (colaboración) en el formulario de registro
    cta: { label: 'Quiero ser aliado', href: '/marketing/registro?tipo=colaboracion' },
  },
  {
    kind: 'prensa' as const,
    badge: 'PRENSA Y MEDIOS',
    accent: '#437287',
    gradient: 'linear-gradient(135deg, #437287 0%, #09344e 100%)',
    title: 'Prensa y Medios',
    desc: 'Solicita tu acreditación para cubrir el congreso, entrevistar vocerías y acceder a materiales de prensa.',
    perks: ['Kit de prensa', 'Material gráfico y audiovisual', 'Sala de prensa exclusiva'],
    cta: { label: 'Acreditarme como medio', href: '/marketing/colabora/prensa' },
  },
]

const WHY = [
  { kind: 'impacto' as const, title: 'Impacto real', text: 'Tu apoyo llega a organizaciones y territorios que hoy no tienen recursos para participar en el congreso.' },
  { kind: 'red' as const, title: 'Red latinoamericana', text: 'Conecta con organizaciones, academia y empresas de más de 40 países comprometidas con lo ambiental.' },
  { kind: 'visibilidad' as const, title: 'Visibilidad', text: 'Posiciona tu organización ante la mayor comunidad ambiental de Latinoamérica.' },
]

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function ColaboraPage() {
  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>

      {/* ════════════════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════════════════ */}
      <HeroIceo
        badge="Colabora con el 3er ICEO LATAM"
        title={
          <>
            Colabora{' '}
            <span style={{ color: '#ffffff', fontVariantNumeric: 'lining-nums' }}>
              3er ICEO
            </span>
          </>
        }
        description="Súmate como voluntario virtual, aliado estratégico o medio acreditado para ampliar el impacto territorial del congreso."
        cta={{ label: 'Quiero colaborar', href: '#como-colaborar' }}
        ctaSecondary={{ label: 'Donar', href: '/marketing/donaciones' }}
        image="/icons/convenios.svg"
        imageAlt="Colabora con 3ICEO"
        imageLabel="3er ICEO LATAM"
        waveVariant="default"
        waveColor="#ffffff"
      />

      {/* ════════════════════════════════════════════════════════════════════
          ¿CÓMO QUIERES COLABORAR? — tarjetas rediseñadas
      ════════════════════════════════════════════════════════════════════ */}
      <section id="como-colaborar" style={{ position: 'relative', backgroundColor: '#fff', padding: '88px 0 96px', overflow: 'hidden' }}>
        {/* decoración suave de fondo */}
        <div style={{ position: 'absolute', top: -120, right: -120, width: 460, height: 460, borderRadius: '50%', background: 'radial-gradient(circle, rgba(9,117,137,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -140, left: -120, width: 460, height: 460, borderRadius: '50%', background: 'radial-gradient(circle, rgba(181,48,119,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 700, color: '#097589', letterSpacing: '0.14em', textTransform: 'uppercase', display: 'block', marginBottom: 14 }}>
                Vías de colaboración
              </span>
              <h2 style={{ fontFamily: 'Gloock, Georgia, serif', fontWeight: 400, fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#09344e', lineHeight: 1.1, marginBottom: 14 }}>
                ¿Cómo quieres colaborar?
              </h2>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#5A6E77', lineHeight: 1.7, maxWidth: 560, margin: '0 auto' }}>
                Elige la forma de sumarte que mejor encaja contigo o con tu organización. Cada vía tiene su propio camino.
              </p>
            </div>
          </FadeIn>

          {/* Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 28 }} className="colabora-cards-grid">
            {CARDS.map((card, i) => (
              <FadeIn key={card.title} delay={i * 0.1} style={{ height: '100%' }}>
                <article
                  style={{
                    backgroundColor: '#fff', border: '1px solid #E8ECEE', borderRadius: 22,
                    overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column',
                    boxShadow: '2px 4px 24px rgba(9,52,78,0.07)',
                    transition: 'box-shadow 0.25s, transform 0.25s',
                  }}
                  onMouseEnter={e => { const el = e.currentTarget; el.style.boxShadow = '6px 14px 40px rgba(9,52,78,0.16)'; el.style.transform = 'translateY(-5px)' }}
                  onMouseLeave={e => { const el = e.currentTarget; el.style.boxShadow = '2px 4px 24px rgba(9,52,78,0.07)'; el.style.transform = 'translateY(0)' }}
                >
                  {/* Cabecera de color */}
                  <div style={{ position: 'relative', background: card.gradient, padding: '26px 26px 22px', overflow: 'hidden' }}>
                    {/* brillo */}
                    <div style={{ position: 'absolute', top: -40, right: -30, width: 160, height: 160, background: 'radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 65%)', pointerEvents: 'none' }} />
                    <div style={{
                      width: 58, height: 58, borderRadius: 16,
                      backgroundColor: 'rgba(255,255,255,0.16)',
                      border: '1px solid rgba(255,255,255,0.28)',
                      backdropFilter: 'blur(4px)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16,
                    }}>
                      <CardIcon kind={card.kind} />
                    </div>
                    <span style={{
                      display: 'inline-block', fontFamily: 'Poppins, sans-serif', fontSize: 10, fontWeight: 700,
                      color: '#fff', letterSpacing: '0.12em', textTransform: 'uppercase',
                      backgroundColor: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.25)',
                      borderRadius: 999, padding: '4px 12px',
                    }}>
                      {card.badge}
                    </span>
                  </div>

                  {/* Cuerpo */}
                  <div style={{ padding: '24px 26px 28px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 19, fontWeight: 700, color: '#09344e', marginBottom: 10, lineHeight: 1.25 }}>
                      {card.title}
                    </h3>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#5A6E77', lineHeight: 1.7, marginBottom: 22 }}>
                      {card.desc}
                    </p>

                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 26px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {card.perks.map(p => (
                        <li key={p} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                          <Check color={card.accent} />
                          <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 13.5, color: '#09344e', lineHeight: 1.45 }}>{p}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Link
                      href={card.cta.href}
                      style={{
                        marginTop: 'auto', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                        backgroundColor: card.accent, color: '#fff',
                        fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 700,
                        padding: '13px 22px', borderRadius: 999, textDecoration: 'none',
                        letterSpacing: '0.02em', transition: 'filter 0.2s, transform 0.15s',
                        boxShadow: `0 4px 18px ${card.accent}3d`,
                      }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.filter = 'brightness(0.92)'; el.style.transform = 'translateY(-1px)' }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.filter = 'brightness(1)'; el.style.transform = 'translateY(0)' }}
                    >
                      {card.cta.label} →
                    </Link>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          ¿POR QUÉ SUMARTE?
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#E6F3EE', padding: '80px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <h2 style={{ fontFamily: 'Gloock, Georgia, serif', fontWeight: 400, fontSize: 'clamp(24px, 2.8vw, 38px)', color: '#09344e', lineHeight: 1.15 }}>
                ¿Por qué sumarte?
              </h2>
            </div>
          </FadeIn>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 28 }} className="why-grid">
            {WHY.map((w, i) => (
              <FadeIn key={w.title} delay={i * 0.1}>
                <div style={{
                  backgroundColor: '#fff', borderRadius: 18, padding: '32px 28px', height: '100%',
                  border: '1px solid #C9E6DD', boxShadow: '2px 4px 18px rgba(9,52,78,0.05)',
                  display: 'flex', flexDirection: 'column', gap: 14,
                }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, backgroundColor: '#F0FAF8', border: '1px solid #C9E6DD', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <WhyIcon kind={w.kind} />
                  </div>
                  <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 18, fontWeight: 700, color: '#09344e', margin: 0 }}>
                    {w.title}
                  </h3>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#5A6E77', lineHeight: 1.7, margin: 0 }}>
                    {w.text}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          DONACIÓN + REDES
      ════════════════════════════════════════════════════════════════════ */}
      <SectionDonacion bg="#09344e" theme="dark" showWave={false} showTopWave topWaveFrom="#E6F3EE" />
      <SectionRedes bg="#ffffff" theme="light" />

      {/* ─── RESPONSIVE ── */}
      <style suppressHydrationWarning>{`
        @media (max-width: 980px) {
          .colabora-cards-grid { grid-template-columns: 1fr 1fr !important; }
          .why-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 680px) {
          .colabora-cards-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}