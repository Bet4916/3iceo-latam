'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

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
    >{children}</motion.div>
  )
}

// ─── REDES SOCIALES OFICIALES ─────────────────────────────────────────────────
const SOCIAL_LINKS = [
  { icon: '/icons/icon_instagram.svg', label: 'Instagram', href: 'https://www.instagram.com/awaqongd' },
  { icon: '/icons/icon_facebook.svg',  label: 'Facebook',  href: 'https://www.facebook.com/somosawaq/' },
  { icon: '/icons/icon_linkedin.svg',  label: 'LinkedIn',  href: 'https://www.linkedin.com/showcase/congreso-organizaciones-ambientales-latam/' },
]

// ─── DÍAS / LÍNEAS TEMÁTICAS (contenido oficial v3) ──────────────────────────
const DIAS = [
  {
    label:    'DÍA 1 · AGUA Y TERRITORIOS',
    badge:    'Agua y territorios',
    title:    'Agua, territorios vivos y comunidades',
    accentColor: '#097589',
    body: 'Proteger las fuentes hídricas que sostienen la biodiversidad, la cultura y la vida rural. Esta línea sitúa al agua dulce, los nacimientos y las cuencas como base de conservación, comunidad y futuro territorial. Promueve una mirada integral que conecta el diagnóstico, la visión compartida y las acciones necesarias para activar el cambio desde los territorios.',
    puntos: [
      { n: '1', title: 'Análisis de la problemática actual', desc: 'Comprender qué está ocurriendo hoy y cuál es el estado real de las fuentes hídricas y los territorios.' },
      { n: '2', title: '¿A dónde queremos llegar?', desc: 'Definir una visión compartida de protección, recuperación y sostenibilidad para los territorios vivos.' },
      { n: '3', title: '¿Qué proyectos o iniciativas hacen falta?', desc: 'Identificar soluciones, alianzas y acciones concretas para activar el cambio.' },
    ],
    img: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
    imgAlt: 'Río y comunidad en bosque tropical latinoamericano',
    imgRight: true,
  },
  {
    label:    'DÍA 2 · COOPERACIÓN E INNOVACIÓN',
    badge:    'Cooperación e innovación',
    title:    'Cooperación internacional al desarrollo, innovación y mundo rural',
    accentColor: '#4886B5',
    body: 'Conectar conocimiento, tecnologías y alianzas internacionales para activar soluciones territoriales. Esta línea impulsa la transferencia universidad–territorio, la cooperación al desarrollo, la innovación aplicada y los modelos rurales sostenibles, generando impacto real y duradero.',
    bullets: [
      'Alianzas Europa–LATAM y cooperación al desarrollo.',
      'Transferencia universidad–territorio y tecnología aplicada.',
      'Innovación para la solución de desafíos territoriales.',
      'Bioeconomía y desarrollo rural sostenible con enfoque territorial.',
      'Intercambio de conocimiento, buenas prácticas y proyectos colaborativos.',
    ],
    img: '/icons/ent_aliados.svg',
    imgAlt: 'Aliados y cooperación internacional ICEO LATAM',
    imgRight: false,
  },
  {
    label:    'DÍA 3 · CONCLUSIONES',
    badge:    'Jornada de cierre',
    title:    'Conclusiones',
    accentColor: '#C8A84B',
    body: 'Sintetizar aprendizajes, acuerdos y próximos pasos del congreso. Este espacio convierte las conversaciones principales en memoria, conclusiones útiles y una hoja de ruta compartida para futuras alianzas.',
    bullets: [
      'Síntesis de las dos líneas principales.',
      'Memorias, conclusiones y compromisos institucionales.',
      'Hoja de ruta ICEO LATAM para próximas alianzas.',
    ],
    img: '/icons/conferencias.svg',
    imgAlt: 'Conferencias y clausura del congreso ICEO LATAM',
    imgRight: true,
  },
]

// ─── 5 LÍNEAS TEMÁTICAS WEB ───────────────────────────────────────────────────
const LINEAS = [
  {
    num: '01', title: 'Territorios y naturaleza', color: '#097589',
    desc: 'Protección de fuentes hídricas, restauración ecológica, cuencas vivas, biodiversidad y soluciones basadas en naturaleza.',
    icon: (
      <svg width={30} height={30} viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M16 4C16 4 6 14 6 20a10 10 0 0 0 20 0C26 14 16 4 16 4z" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.9)" strokeWidth={1.8} strokeLinejoin="round"/>
        <path d="M11 23c1.5 2 4 3 6 2.5" stroke="rgba(255,255,255,0.7)" strokeWidth={1.6} strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: '02', title: 'Comunidad y cultura', color: '#B53077',
    desc: 'Comunidades, mujeres, juventudes y saberes locales como guardianes del agua, la biodiversidad y la memoria territorial.',
    icon: (
      <svg width={30} height={30} viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="10" cy="11" r="4" stroke="rgba(255,255,255,0.9)" strokeWidth={1.8}/>
        <circle cx="22" cy="11" r="4" stroke="rgba(255,255,255,0.9)" strokeWidth={1.8}/>
        <path d="M4 26c0-4 3-6 6-6M22 26c0-4-3-6-6-6M12 26c0-4 2-6 4-6s4 2 4 6" stroke="rgba(255,255,255,0.9)" strokeWidth={1.8} strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: '03', title: 'Innovación y conocimiento', color: '#4886B5',
    desc: 'Universidad-territorio, transferencia de conocimiento, ciencia ciudadana, inteligencia artificial, laboratorios y monitoreo ambiental.',
    icon: (
      <svg width={30} height={30} viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="16" r="3" stroke="rgba(255,255,255,0.9)" strokeWidth={1.8}/>
        <circle cx="6" cy="8" r="2.5" stroke="rgba(255,255,255,0.9)" strokeWidth={1.6}/>
        <circle cx="26" cy="8" r="2.5" stroke="rgba(255,255,255,0.9)" strokeWidth={1.6}/>
        <circle cx="6" cy="24" r="2.5" stroke="rgba(255,255,255,0.9)" strokeWidth={1.6}/>
        <circle cx="26" cy="24" r="2.5" stroke="rgba(255,255,255,0.9)" strokeWidth={1.6}/>
        <path d="M8 9.5L14 14M18 18l6 5.5M8 22.5L14 18M18 14l6-5.5" stroke="rgba(255,255,255,0.55)" strokeWidth={1.4}/>
      </svg>
    ),
  },
  {
    num: '04', title: 'Economías para la vida', color: '#03A383',
    desc: 'Bioeconomía, emprendimientos verdes, economía circular, marketplace territorial, turismo regenerativo y redes de valor local.',
    icon: (
      <svg width={30} height={30} viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M16 28V14" stroke="rgba(255,255,255,0.9)" strokeWidth={1.8} strokeLinecap="round"/>
        <path d="M16 14C16 8 10 5 6 6c0 6 4 10 10 10z" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.9)" strokeWidth={1.7} strokeLinejoin="round"/>
        <path d="M16 18c0-5 6-8 10-7-1 6-5 9-10 9z" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.9)" strokeWidth={1.7} strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    num: '05', title: 'Gobernanza y futuro regional', color: '#74B4A7',
    desc: 'Cooperación, política pública, participación, derechos de la naturaleza, financiación climática, manifiesto y hoja de ruta.',
    icon: (
      <svg width={30} height={30} viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="16" r="11" stroke="rgba(255,255,255,0.9)" strokeWidth={1.8}/>
        <path d="M16 5v3M16 24v3M5 16h3M24 16h3" stroke="rgba(255,255,255,0.5)" strokeWidth={1.4} strokeLinecap="round"/>
        <path d="M19 10l-4.5 6-4.5 2 4.5-6 4.5-2z" fill="rgba(255,255,255,0.9)" stroke="rgba(255,255,255,0.9)" strokeWidth={0.5} strokeLinejoin="round"/>
      </svg>
    ),
  },
]

// ─── DIA SECTION ─────────────────────────────────────────────────────────────
function DiaSection({ dia, bgColor }: { dia: typeof DIAS[0]; bgColor: string }) {
  const textCol = (
    <FadeIn>
      <div>
        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          backgroundColor: `${dia.accentColor}18`,
          border: `1px solid ${dia.accentColor}40`,
          borderRadius: 999, padding: '4px 14px', marginBottom: 12,
        }}>
          <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 700, color: dia.accentColor, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{dia.label}</span>
        </div>

        <h2 style={{
          fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(22px, 2.8vw, 34px)',
          fontWeight: 700, color: '#09344e', lineHeight: 1.2, marginBottom: 16,
        }}>{dia.title}</h2>

        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#12303E', lineHeight: 1.75, marginBottom: 20 }}>
          {dia.body}
        </p>

        {/* Puntos numerados (día 1) */}
        {'puntos' in dia && dia.puntos && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {(dia.puntos as Array<{n: string; title: string; desc: string}>).map(p => (
              <div key={p.n} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                  backgroundColor: dia.accentColor,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 700, color: '#fff' }}>{p.n}</span>
                </div>
                <div>
                  <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 600, color: '#09344e', marginBottom: 2 }}>{p.title}</p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#5A6E77', lineHeight: 1.6 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bullets (día 2 y 3) */}
        {'bullets' in dia && dia.bullets && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {(dia.bullets as string[]).map((b, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: dia.accentColor, flexShrink: 0, marginTop: 6 }} />
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#12303E', lineHeight: 1.6 }}>{b}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </FadeIn>
  )

  const imgCol = (
    <FadeIn delay={0.1}>
      <div style={{ position: 'relative' }}>
        <div style={{
          position: 'absolute',
          ...(dia.imgRight ? { top: -16, left: -16 } : { top: -16, right: -16 }),
          width: '90%', height: '90%', borderRadius: 18,
          backgroundColor: `${dia.accentColor}25`,
          zIndex: 0,
        }} />
        <div style={{
          position: 'relative', zIndex: 1, borderRadius: 18,
          overflow: 'hidden', boxShadow: '4px 4px 28px rgba(9,52,78,0.15)',
        }}>
          <img src={dia.img} alt={dia.imgAlt}
            style={{ width: '100%', height: 'auto', display: 'block', maxHeight: 340, objectFit: 'cover' }} />
        </div>
      </div>
    </FadeIn>
  )

  return (
    <section style={{ backgroundColor: bgColor, padding: '72px 48px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div className="dia-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>
          {dia.imgRight ? textCol : imgCol}
          {dia.imgRight ? imgCol  : textCol}
        </div>
      </div>
    </section>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function LineasTematicasPage() {
  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>

      {/* ════════════════════════════════════════════════════════════════════
          1. HERO — imagen de vuelta (lineas_tematicas.svg)
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ paddingTop: 88, backgroundColor: '#ffffff' }}>
        <div className="container-brand" style={{ padding: '52px 48px 0' }}>
          <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 56, alignItems: 'center' }}>

            <FadeIn>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#097589', marginBottom: 12 }}>
                3ICEO · LATAM
              </p>
              <h1 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 700, color: '#09344e', lineHeight: 1.05, marginBottom: 20 }}>
                Líneas Temáticas
              </h1>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, color: '#5A6E77', lineHeight: 1.7, maxWidth: 460, marginBottom: 8 }}>
                Agua, cooperación e innovación para territorios vivos.
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#5A6E77', lineHeight: 1.7, maxWidth: 460, marginBottom: 32 }}>
                ICEO LATAM se construye como un espacio regional para conectar conocimiento, comunidades, instituciones y soluciones alrededor de los territorios vivos.
              </p>
              <Link href="/marketing/registro" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                backgroundColor: '#B53077', color: '#fff',
                fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 700,
                padding: '13px 30px', borderRadius: 999, textDecoration: 'none',
                letterSpacing: '0.06em', boxShadow: '0 2px 16px rgba(181,48,119,0.30)',
                transition: 'background-color 0.2s, transform 0.15s',
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.backgroundColor = '#802254'; el.style.transform = 'translateY(-1px)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.backgroundColor = '#B53077'; el.style.transform = 'translateY(0)' }}
              >
                QUIERO ASISTIR →
              </Link>
            </FadeIn>

            {/* Imagen hero — de vuelta */}
            <FadeIn delay={0.12}>
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <div style={{
                  position: 'absolute', bottom: -20, right: -20,
                  width: 240, height: 170, borderRadius: 18,
                  background: 'linear-gradient(135deg, #76E2CC 0%, #03A383 100%)',
                  opacity: 0.3, zIndex: 0,
                }} />
                <div style={{
                  position: 'relative', zIndex: 1, width: 380, height: 252,
                  borderRadius: 20, overflow: 'hidden',
                  boxShadow: '4px 4px 28px rgba(9,52,78,0.16)',
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

        {/* Wave blanco → F7F6F3 */}
        <div style={{ marginTop: 72, lineHeight: 0 }}>
          <svg viewBox="0 0 1440 48" preserveAspectRatio="none" style={{ width: '100%', height: 48, display: 'block' }}>
            <path d="M0,0 C360,48 720,0 1080,32 C1260,44 1380,12 1440,24 L1440,48 L0,48 Z" fill="#F7F6F3"/>
          </svg>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          2. SECCIONES POR DÍA — con imágenes, texto oficial v3
      ════════════════════════════════════════════════════════════════════ */}
      <div id="lineas">
        {DIAS.map((dia, i) => {
          const bg = i === 1 ? '#ffffff' : '#F7F6F3'
          return <DiaSection key={dia.title} dia={dia} bgColor={bg} />
        })}
      </div>

      {/* Wave F7F6F3 → navy */}
      <div style={{ lineHeight: 0, backgroundColor: '#F7F6F3' }}>
        <svg viewBox="0 0 1440 64" preserveAspectRatio="none" style={{ width: '100%', height: 64, display: 'block' }}>
          <path d="M0,0 C240,64 480,0 720,40 C960,64 1200,16 1440,44 L1440,64 L0,64 Z" fill="#09344e"/>
        </svg>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          3. LÍNEAS TEMÁTICAS — 5 tarjetas grid sobre navy
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#09344e', padding: '72px 48px 88px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>

          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#74B4A7', marginBottom: 12 }}>
                PROGRAMA · 3ICEO LATAM
              </p>
              <h2 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 'clamp(26px, 3.5vw, 42px)', fontWeight: 700, color: '#ffffff', lineHeight: 1.15, marginBottom: 16 }}>
                Un marco vivo para ordenar<br />la conversación regional
              </h2>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.60)', lineHeight: 1.7, maxWidth: 560, margin: '0 auto' }}>
                Estas líneas temáticas son una guía preliminar de trabajo y podrán evolucionar conforme avancemos en la curaduría de contenidos, alianzas y convocatorias.
              </p>
            </div>
          </FadeIn>

          {/* Grid 3+2 */}
          <div className="lineas-grid-top" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 20 }}>
            {LINEAS.slice(0, 3).map((l, i) => (
              <FadeIn key={l.num} delay={i * 0.1}>
                <div style={{
                  backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 20, padding: '32px 28px', transition: 'background-color 0.2s, transform 0.2s', cursor: 'default',
                }}
                  onMouseEnter={e => { ;(e.currentTarget as HTMLDivElement).style.backgroundColor = 'rgba(255,255,255,0.10)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)' }}
                  onMouseLeave={e => { ;(e.currentTarget as HTMLDivElement).style.backgroundColor = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                    <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 700, color: l.color, letterSpacing: '0.1em' }}>{l.num}</span>
                    <div style={{ width: 52, height: 52, borderRadius: 14, backgroundColor: l.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {l.icon}
                    </div>
                  </div>
                  <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 18, fontWeight: 700, color: '#ffffff', lineHeight: 1.25, marginBottom: 14 }}>{l.title}</h3>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>{l.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="lineas-grid-bottom" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, maxWidth: 860, margin: '0 auto' }}>
            {LINEAS.slice(3).map((l, i) => (
              <FadeIn key={l.num} delay={0.3 + i * 0.1}>
                <div style={{
                  backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 20, padding: '32px 28px', transition: 'background-color 0.2s, transform 0.2s', cursor: 'default',
                }}
                  onMouseEnter={e => { ;(e.currentTarget as HTMLDivElement).style.backgroundColor = 'rgba(255,255,255,0.10)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)' }}
                  onMouseLeave={e => { ;(e.currentTarget as HTMLDivElement).style.backgroundColor = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                    <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 700, color: l.color, letterSpacing: '0.1em' }}>{l.num}</span>
                    <div style={{ width: 52, height: 52, borderRadius: 14, backgroundColor: l.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {l.icon}
                    </div>
                  </div>
                  <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 18, fontWeight: 700, color: '#ffffff', lineHeight: 1.25, marginBottom: 14 }}>{l.title}</h3>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>{l.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Banda transversal */}
          <FadeIn delay={0.5}>
            <div style={{
              marginTop: 32, backgroundColor: 'rgba(116,180,167,0.15)',
              border: '1px solid rgba(116,180,167,0.35)', borderRadius: 16,
              padding: '24px 32px', display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap',
            }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, backgroundColor: '#74B4A7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width={24} height={24} viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div style={{ flex: 1, minWidth: 200 }}>
                <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 700, color: '#74B4A7', marginBottom: 4, letterSpacing: '0.04em' }}>CAPA TRANSVERSAL</p>
                <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 15, fontWeight: 600, color: '#ffffff', lineHeight: 1.3, marginBottom: 4 }}>Manifiesto y hoja de ruta ICEO LATAM</p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.60)', lineHeight: 1.6 }}>
                  Durante el congreso se recogerán aprendizajes, acuerdos y prioridades para activar una agenda regional compartida.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Wave navy → aqua pálido */}
      <div style={{ lineHeight: 0, backgroundColor: '#09344e' }}>
        <svg viewBox="0 0 1440 56" preserveAspectRatio="none" style={{ width: '100%', height: 56, display: 'block' }}>
          <path d="M0,0 C360,56 720,0 1080,36 C1260,48 1380,12 1440,28 L1440,56 L0,56 Z" fill="#E6F3EE"/>
        </svg>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          4. CTA PONENTE — fondo aqua pálido
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#E6F3EE', padding: '72px 48px 80px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="cta-grid" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'center' }}>

            <FadeIn>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#097589', marginBottom: 12 }}>
                LLAMADA A PONENTES
              </p>
              <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(24px, 2.8vw, 36px)', fontWeight: 700, color: '#09344e', lineHeight: 1.2, marginBottom: 16 }}>
                ¿Tienes experiencias o investigaciones para compartir?
              </h2>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#5A6E77', lineHeight: 1.7, marginBottom: 32, maxWidth: 540 }}>
                El 3ICEO abre sus puertas a ponentes de toda Latinoamérica. Si trabajas en alguna de estas líneas temáticas, inscríbete y comparte tu conocimiento con la comunidad ambiental del continente.
              </p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <Link href="/marketing/registro" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  backgroundColor: '#B53077', color: '#ffffff',
                  fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 700,
                  padding: '12px 28px', borderRadius: 999, textDecoration: 'none', letterSpacing: '0.05em',
                  boxShadow: '0 2px 16px rgba(181,48,119,0.25)', transition: 'background-color 0.2s, transform 0.15s',
                }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.backgroundColor = '#802254'; el.style.transform = 'translateY(-1px)' }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.backgroundColor = '#B53077'; el.style.transform = 'translateY(0)' }}
                >
                  INSCRIBIRME COMO PONENTE
                </Link>
                <Link href="/marketing/agenda" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  backgroundColor: 'transparent', color: '#09344e',
                  fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600,
                  padding: '11px 24px', borderRadius: 999,
                  border: '1.5px solid rgba(9,52,78,0.30)', textDecoration: 'none', letterSpacing: '0.04em',
                  transition: 'border-color 0.2s, background-color 0.2s',
                }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = '#097589'; el.style.backgroundColor = 'rgba(9,117,137,0.07)' }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = 'rgba(9,52,78,0.30)'; el.style.backgroundColor = 'transparent' }}
                >
                  Ver agenda →
                </Link>
              </div>
            </FadeIn>

            {/* Derecha — 5 líneas mini-badges */}
            <FadeIn delay={0.12}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flexShrink: 0 }} className="lineas-cards">
                {LINEAS.map(l => (
                  <div key={l.num} style={{
                    backgroundColor: '#fff', border: `1.5px solid ${l.color}30`,
                    borderRadius: 12, padding: '12px 18px',
                    display: 'flex', alignItems: 'center', gap: 12,
                    boxShadow: '2px 2px 8px rgba(9,52,78,0.06)', minWidth: 260,
                  }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, flexShrink: 0, backgroundColor: l.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 700, color: '#fff' }}>{l.num}</span>
                    </div>
                    <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600, color: '#09344e', lineHeight: 1.3 }}>{l.title}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Wave aqua → blanca */}
      <div style={{ lineHeight: 0, backgroundColor: '#E6F3EE' }}>
        <svg viewBox="0 0 1440 56" preserveAspectRatio="none" style={{ width: '100%', height: 56, display: 'block' }}>
          <path d="M0,56 C360,0 720,56 1080,20 C1260,8 1380,44 1440,28 L1440,56 L0,56 Z" fill="#ffffff"/>
        </svg>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          5. FOLLOW US
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#ffffff', padding: '72px 48px 80px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="follow-grid" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 64, alignItems: 'center' }}>
            <FadeIn>
              <img src="/icons/follow.svg" alt="Follow us on social media"
                style={{ width: 260, height: 'auto', display: 'block', flexShrink: 0, filter: 'drop-shadow(0 4px 16px rgba(9,52,78,0.12))' }} />
            </FadeIn>
            <FadeIn delay={0.12}>
              <div>
                <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 'clamp(22px, 2.5vw, 30px)', color: '#09344e', lineHeight: 1.2, marginBottom: 14 }}>
                  ¡Pásate por nuestras Redes Sociales y síguenos!
                </h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#5A6E77', lineHeight: 1.7, marginBottom: 28, maxWidth: 460 }}>
                  Publicamos contenido acerca de la labor que hacemos, podrás conocer nuestros proyectos y a nosotros más a fondo.
                </p>
                <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'center' }}>
                  {SOCIAL_LINKS.map(s => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'Inter, sans-serif', fontSize: 15, fontWeight: 500, color: '#09344e', textDecoration: 'none', transition: 'color 0.2s' }}
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

      <style suppressHydrationWarning>{`
        @media (max-width: 900px) {
          .hero-grid        { grid-template-columns: 1fr !important; }
          .hero-grid > div:last-child { display: none !important; }
          .dia-grid         { grid-template-columns: 1fr !important; }
          .dia-grid > div:last-child { display: none !important; }
          .lineas-grid-top  { grid-template-columns: 1fr !important; }
          .lineas-grid-bottom { grid-template-columns: 1fr !important; }
          .cta-grid         { grid-template-columns: 1fr !important; }
          .lineas-cards     { display: none !important; }
          .follow-grid      { grid-template-columns: 1fr !important; }
          .follow-grid > div:first-child { display: none !important; }
        }
        @media (max-width: 600px) {
          section { padding-left: 20px !important; padding-right: 20px !important; }
          .lineas-grid-bottom { max-width: 100% !important; }
        }
      `}</style>
    </div>
  )
}