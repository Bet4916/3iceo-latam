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

// ─── CHECK ICON ───────────────────────────────────────────────────────────────
function Check() {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
      <circle cx="8" cy="8" r="8" fill="#097589" opacity={0.12} />
      <path d="M4.5 8l2.5 2.5 4.5-4.5" stroke="#097589" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// ─── TARJETAS ─────────────────────────────────────────────────────────────────
const CARDS = [
  {
    badge:   'VOLUNTARIADO VIRTUAL',
    badgeColor: '#097589',
    icon:    '/icons/voluntariado.svg',
    iconBg:  'linear-gradient(135deg, #097589 0%, #1C495C 100%)',
    title:   'Voluntariado Virtual',
    desc:    'Apoya la logística digital, la comunicación y la atención a participantes antes y durante el congreso.',
    perks:   ['Certificado de participación', 'Acceso a todas las charlas', 'Kit oficial del voluntario'],
    cta:     { label: 'Postularme como voluntario/a', href: '/marketing/colabora/voluntariado', primary: true },
    note:    null,
  },
  {
    badge:   'ALIADOS ESTRATÉGICOS',
    badgeColor: '#B53077',
    icon:    '/icons/aliados.svg',
    iconBg:  'linear-gradient(135deg, #B53077 0%, #09344e 100%)',
    title:   'Aliados Estratégicos',
    desc:    'Suma capacidades, recursos, patrocinio o apoyo institucional para hacer posible el 3ICEO LATAM 2027.',
    perks:   ['Visibilidad institucional', 'Networking con inversores', 'Espacio en el Marketplace'],
    cta:     { label: 'Quiero ser aliado', href: '/marketing/patrocinadores', primary: true },
    note:    'Redirigir al formulario existente',
  },
  {
    badge:   'PRENSA Y MEDIOS',
    badgeColor: '#437287',
    icon:    '/icons/prensa.svg',
    iconBg:  'linear-gradient(135deg, #437287 0%, #09344e 100%)',
    title:   'Prensa y Medios',
    desc:    'Solicita tu acreditación para cubrir el congreso, entrevistar vocerías y acceder a materiales de prensa.',
    perks:   ['Kit de prensa', 'Material gráfico y audiovisual', 'Sala de prensa exclusiva'],
    cta:     { label: 'Acreditarme como medio', href: '/marketing/colabora/prensa', primary: true },
    note:    null,
  },
]

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function ColaboraPage() {
  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>

      {/* ════════════════════════════════════════════════════════════════════
          HERO — usa HeroIceo unificado
      ════════════════════════════════════════════════════════════════════ */}
      <HeroIceo
        badge="Colabora con el 3ICEO LATAM 2027"
        title={
        <>
            Colabora{' '}
            <span style={{ color: '#ffffff', fontVariantNumeric: 'lining-nums' }}>
              3er ICEO
            </span>
        </>
        }
        description="Súmate como voluntario virtual, aliado estratégico o medio acreditado para ampliar el impacto territorial del congreso."
        cta={{ label: 'Ser voluntario', href: '#como-colaborar' }}
        ctaSecondary={{ label: 'Donar', href: '/marketing/donaciones' }}
        image="/icons/convenios.svg"
        imageAlt="Colabora con 3ICEO"
        imageLabel="3ICEO LATAM 2027"
        waveVariant="default"
        waveColor="#ffffff"
      />

      {/* ════════════════════════════════════════════════════════════════════
          ¿CÓMO QUIERES COLABORAR?
      ════════════════════════════════════════════════════════════════════ */}
      <section id="como-colaborar" style={{ backgroundColor: '#fff', padding: '80px 0 88px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>

          {/* Header */}
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <h2 style={{
                fontFamily: 'Gloock, Georgia, serif', fontWeight: 400,
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                color: '#09344e', lineHeight: 1.1, marginBottom: 12,
              }}>
                ¿Cómo quieres colaborar?
              </h2>
              {/* Línea decorativa */}
              <div style={{
                width: 48, height: 3, borderRadius: 99,
                backgroundColor: '#B53077',
                margin: '0 auto',
              }} />
            </div>
          </FadeIn>

          {/* Cards */}
          <div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}
            className="colabora-cards-grid"
          >
            {CARDS.map(({ badge, badgeColor, iconBg, title, desc, perks, cta, note }, i) => (
              <FadeIn key={title} delay={i * 0.1}>
                <div style={{
                  backgroundColor: '#fff',
                  border: '1.5px solid #E8ECEE',
                  borderRadius: 20,
                  padding: '32px 28px',
                  display: 'flex', flexDirection: 'column',
                  boxShadow: '2px 2px 20px rgba(9,52,78,0.06)',
                  height: '100%',
                  transition: 'box-shadow 0.25s, transform 0.25s',
                }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.boxShadow = '4px 8px 32px rgba(9,52,78,0.13)'
                    el.style.transform = 'translateY(-3px)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.boxShadow = '2px 2px 20px rgba(9,52,78,0.06)'
                    el.style.transform = 'translateY(0)'
                  }}
                >
                  {/* Icono */}
                  <div style={{
                    width: 52, height: 52, borderRadius: 14,
                    background: iconBg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 20,
                  }}>
                    <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      {title === 'Voluntariado Virtual'
                        ? <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>
                        : title === 'Aliados Estratégicos'
                          ? <><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></>
                          : <><path d="M3 11l19-9-9 19-2-8-8-2z"/></>
                      }
                    </svg>
                  </div>

                  {/* Badge */}
                  <div style={{
                    display: 'inline-flex', alignItems: 'center',
                    backgroundColor: `${badgeColor}14`,
                    border: `1px solid ${badgeColor}30`,
                    borderRadius: 999, padding: '3px 10px', marginBottom: 14, alignSelf: 'flex-start',
                  }}>
                    <span style={{
                      fontFamily: 'Poppins, sans-serif', fontSize: 9, fontWeight: 700,
                      color: badgeColor, letterSpacing: '0.12em', textTransform: 'uppercase',
                    }}>{badge}</span>
                  </div>

                  <h3 style={{
                    fontFamily: 'Poppins, sans-serif', fontSize: 18, fontWeight: 700,
                    color: '#09344e', marginBottom: 10, lineHeight: 1.25,
                  }}>
                    {title}
                  </h3>
                  <p style={{
                    fontFamily: 'Inter, sans-serif', fontSize: 14,
                    color: '#5A6E77', lineHeight: 1.7, marginBottom: 20,
                  }}>
                    {desc}
                  </p>

                  {/* Perks */}
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {perks.map(p => (
                      <li key={p} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                        <Check />
                        <span style={{
                          fontFamily: 'Inter, sans-serif', fontSize: 13,
                          color: '#12303E', lineHeight: 1.5,
                        }}>{p}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Spacer */}
                  <div style={{ flex: 1 }} />

                  {/* CTA */}
                  <Link
                    href={cta.href}
                    style={{
                      display: 'block', textAlign: 'center',
                      fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 700,
                      color: badgeColor,
                      border: `2px solid ${badgeColor}`,
                      borderRadius: 999, padding: '11px 20px',
                      textDecoration: 'none', letterSpacing: '0.02em',
                      transition: 'background .2s, color .2s',
                      marginTop: 4,
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLAnchorElement
                      el.style.backgroundColor = badgeColor
                      el.style.color = '#fff'
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLAnchorElement
                      el.style.backgroundColor = 'transparent'
                      el.style.color = badgeColor
                    }}
                  >
                    {cta.label}
                  </Link>

                  {note && (
                    <p style={{
                      fontFamily: 'Poppins, sans-serif', fontSize: 11,
                      color: badgeColor, textAlign: 'center', marginTop: 10,
                      fontWeight: 500,
                    }}>
                      {note}
                    </p>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          MAPA DE FORMULARIOS — franja informativa
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#F5FBFA', padding: '72px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 44 }}>
              <span style={{
                fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 700,
                color: '#097589', letterSpacing: '0.12em', textTransform: 'uppercase',
                display: 'block', marginBottom: 12,
              }}>
                Vías de colaboración
              </span>
              <h2 style={{
                fontFamily: 'Gloock, Georgia, serif', fontWeight: 400,
                fontSize: 'clamp(24px, 2.8vw, 36px)',
                color: '#09344e', lineHeight: 1.2,
              }}>
                Colabora no compite con el registro
              </h2>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: 14,
                color: '#5A6E77', lineHeight: 1.7, marginTop: 12,
                maxWidth: 560, margin: '12px auto 0',
              }}>
                Este embudo es independiente: voluntarios, aliados, marketplace, prensa y apoyo económico tienen su propio flujo.
              </p>
            </div>
          </FadeIn>

          {/* Formularios grid */}
          {[
            { num: '1', label: 'Quiero asistir',            sub: 'Existente · sin cambios',  color: '#097589', tipo: 'Asistente' },
            { num: '2', label: 'Voluntariado Virtual',       sub: 'Nuevo',                    color: '#097589', tipo: 'Colaborador / Voluntariado' },
            { num: '3', label: 'Quiero ser aliado',          sub: 'Existente · redirigir',    color: '#097589', tipo: 'Aliado Estratégico' },
            { num: '4', label: 'Prensa y Medios',            sub: 'Nuevo',                    color: '#B53077', tipo: 'Medio' },
            { num: '5', label: 'Marketplace Territorial',    sub: 'Recomendado',              color: '#437287', tipo: 'Marketplace / Patrocinador' },
            { num: '6', label: 'Quiero apoyar / Donar',      sub: 'Solo si no hay pasarela',  color: '#09344e', tipo: 'Apoyo / Donación' },
          ].reduce<{ num: string; label: string; sub: string; color: string; tipo: string }[][]>((rows, item, i) => {
            if (i % 3 === 0) rows.push([])
            rows[rows.length - 1].push(item)
            return rows
          }, []).map((row, ri) => (
            <div key={ri} style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 16 }} className="forms-grid">
              {row.map(({ num, label, sub, color, tipo }) => (
                <FadeIn key={num} delay={Number(num) * 0.06}>
                  <div style={{
                    backgroundColor: '#fff', borderRadius: 14, padding: '20px 22px',
                    border: '1px solid #E4EAED',
                    display: 'flex', gap: 14, alignItems: 'flex-start',
                    boxShadow: '1px 1px 10px rgba(9,52,78,0.05)',
                  }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%',
                      backgroundColor: color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 700, color: '#fff' }}>{num}</span>
                    </div>
                    <div>
                      <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 600, color: '#09344e', marginBottom: 2 }}>{label}</div>
                      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color, fontWeight: 500, marginBottom: 4 }}>{sub}</div>
                      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#5A6E77' }}>Tipo: {tipo}</div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          ))}

          {/* Regla de oro */}
          <FadeIn delay={0.3}>
            <div style={{
              marginTop: 32,
              backgroundColor: 'rgba(9,117,137,0.06)',
              border: '1px solid rgba(9,117,137,0.18)',
              borderRadius: 12, padding: '16px 22px',
              display: 'flex', alignItems: 'flex-start', gap: 12,
            }}>
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
                <circle cx="12" cy="12" r="10" stroke="#097589" strokeWidth="1.8"/>
                <path d="M12 16v-4M12 8h.01" stroke="#097589" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 13, color: '#09344e', lineHeight: 1.6 }}>
                <strong>Regla de oro:</strong> Colabora no compite con Quiero asistir. Es un embudo separado para voluntarios, aliados, Marketplace, prensa y apoyo.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          DONACIÓN + REDES
      ════════════════════════════════════════════════════════════════════ */}
      <SectionDonacion bg="#09344e" theme="dark" waveColor="#FFFFFF" showWave />
      <SectionRedes bg="#FFFFFF" theme="light" />

      {/* ─── RESPONSIVE ── */}
      <style suppressHydrationWarning>{`
        @media (max-width: 900px) {
          .colabora-cards-grid { grid-template-columns: 1fr !important; }
          .forms-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .forms-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
