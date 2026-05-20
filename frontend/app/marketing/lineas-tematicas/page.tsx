'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

// ─── FADE-IN HELPER ──────────────────────────────────────────────────────────
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

// ─── DATE BADGE ──────────────────────────────────────────────────────────────
function DateBadge({ text }: { text: string }) {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      backgroundColor: '#F0F4F7',
      border: '1px solid #D9DEE2',
      borderRadius: 999,
      padding: '5px 16px',
      marginBottom: 20,
    }}>
      <span style={{
        fontFamily: 'Poppins, sans-serif',
        fontSize: 12,
        fontWeight: 600,
        color: '#09344e',
        letterSpacing: '0.04em',
      }}>
        {text}
      </span>
    </div>
  )
}

// ─── DATOS DE LOS DÍAS ────────────────────────────────────────────────────────
const DIAS = [
  {
    badge:  'Martes 17 FEBRERO',
    title:  'Análisis de los resultados de la COP 16',
    body: [
      'El 3ICEO LATAM dedicará un espacio estratégico a examinar los resultados de la COP16, celebrada en Colombia, y sus implicaciones para América Latina. A través de paneles, diálogos y talleres, se abordarán los principales compromisos adoptados, sus retos de implementación, y las oportunidades para integrarlos en las políticas públicas, territoriales y comunitarias.',
      'Este eje busca facilitar la articulación entre gobiernos, academia, sector privado y organizaciones sociales para traducir las decisiones globales en acciones locales, que fortalezcan la resiliencia, la participación y la gobernanza ambiental desde los territorios.',
    ],
    imgRight: true,  // imagen a la derecha, texto a la izquierda
  },
  {
    badge:  'Miércoles 18 FEBRERO',
    title:  'Empoderamiento de mujeres, jóvenes y comunidades en seguridad y justicia climática',
    body: [
      'El liderazgo de mujeres, jóvenes y comunidades locales es esencial para avanzar en la justicia climática. Esta línea temática visibiliza sus contribuciones y promueve su participación en la toma de decisiones ambientales. A través del intercambio de experiencias, herramientas de formación y espacios de reconocimiento, se impulsará su capacidad de incidencia en escenarios nacionales y regionales.',
      'El congreso será un escenario para fortalecer redes de apoyo, proponer soluciones inclusivas y fomentar alianzas multiactor que respalden el rol transformador de estos liderazgos en la sostenibilidad del planeta.',
    ],
    imgRight: false, // imagen a la izquierda, texto a la derecha
  },
  {
    badge:  'Jueves 19 FEBRERO',
    title:  'Comunidad, tecnología y biodiversidad',
    body: [
      'Esta línea propone un diálogo entre saberes comunitarios y tecnologías emergentes como camino para proteger la biodiversidad y construir territorios sostenibles. Se abordarán experiencias donde mujeres, jóvenes y líderes sociales utilizan herramientas digitales para el monitoreo ambiental, la educación climática y la acción colaborativa.',
      'El objetivo es visibilizar modelos innovadores que conectan la acción local con el conocimiento científico y tecnológico, fortaleciendo capacidades en las comunidades para responder a los desafíos del cambio climático y fomentar nuevas formas de gobernanza ambiental.',
    ],
    imgRight: true,
  },
]

const SOCIAL_LINKS = [
  { icon: '/icons/icon_instagram.svg', label: 'Instagram', href: 'https://instagram.com/somosawaq' },
  { icon: '/icons/icon_facebook.svg',  label: 'Facebook',  href: 'https://facebook.com/somosawaq'  },
  { icon: '/icons/icon_linkedin.svg',  label: 'LinkedIn',  href: 'https://linkedin.com/company/somosawaq' },
]

// ─── DIA SECTION ─────────────────────────────────────────────────────────────
// Alterna: texto|imagen  →  imagen|texto  →  texto|imagen
function DiaSection({
  dia,
  bgColor,
  delay = 0,
}: {
  dia: typeof DIAS[0]
  bgColor: string
  delay?: number
}) {
  const textCol = (
    <FadeIn delay={delay}>
      <div>
        <DateBadge text={dia.badge} />
        <h2 style={{
          fontFamily: 'Poppins, sans-serif',
          fontSize: 'clamp(24px, 2.8vw, 38px)',
          fontWeight: 700,
          color: '#09344e',
          lineHeight: 1.2,
          marginBottom: 20,
        }}>
          {dia.title}
        </h2>
        {dia.body.map((p, i) => (
          <p key={i} style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 15,
            color: '#12303E',
            lineHeight: 1.75,
            marginBottom: i < dia.body.length - 1 ? 14 : 0,
          }}>
            {p}
          </p>
        ))}
      </div>
    </FadeIn>
  )

  const imgCol = (
    <FadeIn delay={delay + 0.1}>
      <div style={{ position: 'relative' }}>
        {/* Acento de color detrás */}
        <div style={{
          position: 'absolute',
          ...(dia.imgRight
            ? { top: -16, left: -16 }
            : { top: -16, right: -16 }),
          width: '90%', height: '90%',
          borderRadius: 18,
          background: 'linear-gradient(135deg, #AEE5DA 0%, #4886B5 100%)',
          opacity: 0.3,
          zIndex: 0,
        }} />
        <div style={{
          position: 'relative', zIndex: 1,
          borderRadius: 18,
          overflow: 'hidden',
          boxShadow: '4px 4px 28px rgba(9,52,78,0.15)',
        }}>
          <img
            src="/icons/COP_16.svg"
            alt={dia.title}
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              maxHeight: 340,
              objectFit: 'cover',
            }}
          />
        </div>
      </div>
    </FadeIn>
  )

  return (
    <section style={{ backgroundColor: bgColor, padding: '80px 48px 88px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div className="dia-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 72,
          alignItems: 'center',
        }}>
          {dia.imgRight ? textCol : imgCol}
          {dia.imgRight ? imgCol  : textCol}
        </div>
      </div>

      {/* Separador sutil entre días */}
      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        height: 1,
        backgroundColor: '#D9DEE2',
        marginTop: 88,
        opacity: 0.5,
      }} />
    </section>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function LineasTematicasPage() {
  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>

      {/* ════════════════════════════════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ paddingTop: 88, backgroundColor: '#ffffff' }}>
        <div className="container-brand" style={{ padding: '52px 48px 0' }}>
          <div className="hero-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: 56,
            alignItems: 'center',
          }}>

            <FadeIn>
              <p style={{
                fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 600,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: '#097589', marginBottom: 12,
              }}>
                3ICEO · LATAM
              </p>
              <h1 style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: 'clamp(40px, 5vw, 64px)',
                fontWeight: 700, color: '#09344e',
                lineHeight: 1.05, marginBottom: 20,
              }}>
                Líneas Temáticas
              </h1>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: 16,
                color: '#5A6E77', lineHeight: 1.7,
                maxWidth: 460, marginBottom: 32,
              }}>
                El 3ICEO estructura su agenda en tres jornadas temáticas que abordan los
                desafíos ambientales más urgentes de Latinoamérica, impulsando el diálogo
                entre ciencia, política y comunidad.
              </p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <Link href="/marketing/registro" className="btn-cta"
                  style={{ fontSize: 13, letterSpacing: '0.05em' }}>
                  QUIERO ASISTIR →
                </Link>
                <a href="#dias" className="btn-outline"
                  style={{ fontSize: 13, letterSpacing: '0.05em' }}>
                  Ver programa
                </a>
              </div>
            </FadeIn>

            <FadeIn delay={0.12}>
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <div style={{
                  position: 'absolute', bottom: -20, right: -20,
                  width: 240, height: 170, borderRadius: 18,
                  background: 'linear-gradient(135deg, #76E2CC 0%, #03A383 100%)',
                  opacity: 0.3, zIndex: 0,
                }} />
                <div style={{
                  position: 'relative', zIndex: 1,
                  width: 380, height: 236, borderRadius: 20,
                  overflow: 'hidden',
                  boxShadow: '4px 4px 28px rgba(9,52,78,0.16)',
                  background: 'linear-gradient(135deg, #E6F3EE 0%, #76E2CC 40%, #03A383 100%)',
                }}>
                  <img
                    src="/icons/lineas_tematicas.svg"
                    alt="Líneas temáticas del 3ICEO"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Wave blanca → blanca (suave ondulación entre hero y días) */}
        <div style={{ marginTop: 56, lineHeight: 0 }}>
          <svg viewBox="0 0 1440 48" preserveAspectRatio="none"
            style={{ width: '100%', height: 48, display: 'block' }}>
            <path d="M0,0 C360,48 720,0 1080,32 C1260,44 1380,12 1440,24 L1440,48 L0,48 Z"
              fill="#F7F6F3" />
          </svg>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          2. LOS 3 DÍAS
          Cada día alterna: texto|imagen  →  imagen|texto  →  texto|imagen
          Todos usan COP_16.svg, con textos oficiales distintos por día.
      ════════════════════════════════════════════════════════════════════ */}
      <div id="dias">
        {DIAS.map((dia, i) => {
          // Alternar fondo suavemente: blanco cálido → blanco → blanco cálido
          const bg = i === 1 ? '#ffffff' : '#F7F6F3'
          return (
            <DiaSection
              key={dia.badge}
              dia={dia}
              bgColor={bg}
              delay={0}
            />
          )
        })}
      </div>

      {/* Wave → navy */}
      <div style={{ lineHeight: 0, backgroundColor: '#F7F6F3' }}>
        <svg viewBox="0 0 1440 64" preserveAspectRatio="none"
          style={{ width: '100%', height: 64, display: 'block' }}>
          <path d="M0,0 C240,64 480,0 720,40 C960,64 1200,16 1440,44 L1440,64 L0,64 Z"
            fill="#09344e" />
        </svg>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          3. CTA PONENTE — fondo navy
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#09344e', padding: '72px 48px 80px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="cta-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: 48,
            alignItems: 'center',
          }}>
            <FadeIn>
              <p style={{
                fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 600,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: '#74B4A7', marginBottom: 12,
              }}>
                LLAMADA A PONENTES
              </p>
              <h2 style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(24px, 2.8vw, 36px)',
                fontWeight: 700, color: '#ffffff',
                lineHeight: 1.2, marginBottom: 16,
              }}>
                ¿Tienes experiencias o investigaciones para compartir?
              </h2>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: 15,
                color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: 32,
                maxWidth: 540,
              }}>
                El 3ICEO abre sus puertas a ponentes de toda Latinoamérica. Si trabajas en
                alguna de estas líneas temáticas, inscríbete y comparte tu conocimiento
                con la comunidad ambiental del continente.
              </p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <Link
                  href="/marketing/registro"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    backgroundColor: '#B53077', color: '#ffffff',
                    fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 700,
                    padding: '12px 28px', borderRadius: 999,
                    textDecoration: 'none', letterSpacing: '0.05em',
                    boxShadow: '0 2px 16px rgba(181,48,119,0.35)',
                    transition: 'background-color 0.2s, transform 0.15s',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.backgroundColor = '#802254'
                    el.style.transform = 'translateY(-1px)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.backgroundColor = '#B53077'
                    el.style.transform = 'translateY(0)'
                  }}
                >
                  INSCRIBIRME COMO PONENTE
                </Link>
                <Link
                  href="/marketing/agenda"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    backgroundColor: 'transparent', color: '#ffffff',
                    fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600,
                    padding: '11px 24px', borderRadius: 999,
                    border: '1.5px solid rgba(255,255,255,0.35)',
                    textDecoration: 'none', letterSpacing: '0.04em',
                    transition: 'border-color 0.2s, background-color 0.2s',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.borderColor = 'rgba(255,255,255,0.7)'
                    el.style.backgroundColor = 'rgba(255,255,255,0.08)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.borderColor = 'rgba(255,255,255,0.35)'
                    el.style.backgroundColor = 'transparent'
                  }}
                >
                  Ver agenda →
                </Link>
              </div>
            </FadeIn>

            {/* Decoración — 3 fechas */}
            <FadeIn delay={0.12}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                flexShrink: 0,
              }} className="date-cards">
                {DIAS.map((d, i) => (
                  <div key={i} style={{
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    borderRadius: 12,
                    padding: '12px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                  }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%',
                      backgroundColor: ['#097589', '#B53077', '#03A383'][i],
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <span style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: 13, fontWeight: 700, color: '#fff',
                      }}>
                        {i + 1}
                      </span>
                    </div>
                    <span style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: 13, fontWeight: 500,
                      color: 'rgba(255,255,255,0.8)',
                    }}>
                      {d.badge}
                    </span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Wave navy → blanca */}
      <div style={{ lineHeight: 0, backgroundColor: '#09344e' }}>
        <svg viewBox="0 0 1440 56" preserveAspectRatio="none"
          style={{ width: '100%', height: 56, display: 'block' }}>
          <path d="M0,56 C360,0 720,56 1080,20 C1260,8 1380,44 1440,28 L1440,56 L0,56 Z"
            fill="#ffffff" />
        </svg>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          4. FOLLOW US — fondo blanco
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#ffffff', padding: '72px 48px 80px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="follow-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gap: 64,
            alignItems: 'center',
          }}>
            <FadeIn>
              <img
                src="/icons/follow.svg"
                alt="Follow us on social media"
                style={{
                  width: 260, height: 'auto', display: 'block', flexShrink: 0,
                  filter: 'drop-shadow(0 4px 16px rgba(9,52,78,0.12))',
                }}
              />
            </FadeIn>

            <FadeIn delay={0.12}>
              <div>
                <h3 style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: 'clamp(22px, 2.5vw, 30px)',
                  fontWeight: 700, color: '#09344e',
                  lineHeight: 1.2, marginBottom: 14,
                }}>
                  ¡Pásate por nuestras Redes Sociales y síguenos!
                </h3>
                <p style={{
                  fontFamily: 'Inter, sans-serif', fontSize: 15,
                  color: '#5A6E77', lineHeight: 1.7,
                  marginBottom: 28, maxWidth: 460,
                }}>
                  Publicamos contenido acerca de la labor que hacemos, podrás conocer
                  nuestros proyectos y a nosotros más a fondo.
                </p>
                <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'center' }}>
                  {SOCIAL_LINKS.map(s => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        fontFamily: 'Inter, sans-serif', fontSize: 15, fontWeight: 500,
                        color: '#09344e', textDecoration: 'none',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#097589')}
                      onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#09344e')}
                    >
                      <img src={s.icon} alt="" width={20} height={20} style={{ display: 'block' }} />
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── RESPONSIVE ─────────────────────────────────────────────────────── */}
      <style suppressHydrationWarning>{`
        @media (max-width: 900px) {
          .hero-grid   { grid-template-columns: 1fr !important; }
          .hero-grid > div:last-child { display: none !important; }
          .dia-grid    { grid-template-columns: 1fr !important; }
          .dia-grid > div:last-child { display: none !important; }
          .cta-grid    { grid-template-columns: 1fr !important; }
          .date-cards  { display: none !important; }
          .follow-grid { grid-template-columns: 1fr !important; }
          .follow-grid > div:first-child { display: none !important; }
        }
      `}</style>
    </div>
  )
}
