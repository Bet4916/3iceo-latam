'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { IconLinkedin, IconInstagram, IconFacebook, IconYoutube } from '@/components/ui/icons'

// ─── ANIMATION HELPERS ────────────────────────────────────────────────────────
const FadeIn = ({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) => (
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

// ─── DATOS ────────────────────────────────────────────────────────────────────
const MOMENTOS = [
  { num: '30', label: 'Panelistas',                       bg: 'linear-gradient(135deg,#09344e 0%,#1C495C 100%)', image: '/icons/panelistas.svg'       },
  { num: '14', label: 'Conferencias',                     bg: 'linear-gradient(135deg,#097589 0%,#09344e 100%)', image: '/icons/conferencias.svg'     },
  { num: '02', label: 'Conversatorios',                   bg: 'linear-gradient(135deg,#4886B5 0%,#12303E 100%)', image: '/icons/conversatorios.svg'   },
  { num: '28', label: 'Organizaciones en el Marketplace', bg: 'linear-gradient(135deg,#03A383 0%,#09344e 100%)', image: '/icons/org_marletplace.svg'  },
  { num: '02', label: 'Convenios',                        bg: 'linear-gradient(135deg,#1C495C 0%,#097589 100%)', image: '/icons/convenios.svg'        },
  { num: '05', label: 'Talleres',                         bg: 'linear-gradient(135deg,#12303E 0%,#4886B5 100%)', image: '/icons/talleres.svg'         },
  { num: '17', label: 'Entidades aliadas',                bg: 'linear-gradient(135deg,#09344e 0%,#03A383 100%)', image: '/icons/ent_aliados.svg'      },
  { num: '03', label: 'Días de Marketplace',              bg: 'linear-gradient(135deg,#097589 0%,#4886B5 100%)', image: '/icons/dias_marletplace.svg' },
  { num: '09', label: 'Universidades aliadas',            bg: 'linear-gradient(135deg,#1C495C 0%,#09344e 100%)', image: '/icons/uni_aliadas.svg'      },
]

const IMPACTO = [
  { num: '1209', label: 'Asistentes Presenciales y Virtuales', icon: '/icons/icon_asistentes.svg'                   },
  { num: '192',  label: 'Organizaciones Ambientales',          icon: '/icons/icon_organizaciones.svg'               },
  { num: '06',   label: 'Entidades Públicas',                  icon: '/icons/icon_ent_pub.svg'                      },
  { num: '+135', label: 'Estudiantes Universitarios',          icon: '/icons/icon_estudiantes.svg'                  },
  { num: '31',   label: 'Participantes Independientes',        icon: '/icons/icon_participantes_independientes.svg' },
]

const REDES = [
  { num: '7784+', label: 'Interacciones en los contenidos de la plataforma', bg: 'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)', Icon: IconInstagram, platform: 'Instagram' },
  { num: '6511+', label: 'Interacciones en los contenidos de la plataforma', bg: '#1877F2',                                                           Icon: IconFacebook,  platform: 'Facebook'  },
  { num: '851',   label: 'Asistentes al streaming virtual',                  bg: '#FF0000',                                                           Icon: IconYoutube,   platform: 'YouTube'   },
  { num: '1502',  label: 'Interacciones en los videos del congreso',         bg: '#0A66C2',                                                           Icon: IconLinkedin,  platform: 'LinkedIn'  },
]

const PERSONALIDADES = [
  {
    name: 'Luis Alfonso Aguirre',
    role: 'Gerente de Programa\nPWF Colombia',
    flag: '🇨🇴',
    li:   'https://www.linkedin.com/in/luis-alfonso-aguirre-montealegre-0770a91a/',
    img:  '/icons/luis_alfonso.svg',
  },
  {
    name: 'José Serrano Serna',
    role: 'Director Ejecutivo Presidente\nAwaq ONG',
    flag: '🇪🇸',
    li:   'https://www.linkedin.com/in/jsserna5575/',
    img:  '/icons/jose_serrano.svg',
  },
  {
    name: 'Begoña de la Hera',
    role: 'Directora Programa TED\nAwaq ONG',
    flag: '🇪🇸',
    li:   'https://www.linkedin.com/in/bego%C3%B1a-de-la-hera-25ba801a/',
    img:  '/icons/begona_hera.svg',
  },
  {
    name: 'Rolando Evelio Pérez',
    role: 'Profesor Planta Tecnológico\nde Monterrey',
    flag: '🇲🇽',
    li:   'https://www.linkedin.com/in/rolando-evelio-p%C3%A9rez-vers%C3%B3n-4137a8264/',
    img:  '/icons/rolando_evelio.jpg',
  },
]

const ENTREVISTAS = [
  { id: 1, label: 'Carolina Acosta',    src: '/videos/entrevista_1.mp4' },
  { id: 2, label: 'Franklin Corrales',  src: '/videos/entrevista_2.mp4' },
  { id: 3, label: 'Pablo Javier Rojas', src: '/videos/entrevista_3.mp4' },
  { id: 4, label: 'Mónica Castillo',    src: '/videos/entrevista_4.mp4' },
]

// ─── PAGE 
export default function SegundoIceoPage() {
  const [activeVideo, setActiveVideo] = useState(0)

  const dragRef    = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const startX     = useRef(0)
  const scrollLeft = useRef(0)

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true
    startX.current = e.pageX - (dragRef.current?.offsetLeft ?? 0)
    scrollLeft.current = dragRef.current?.scrollLeft ?? 0
    if (dragRef.current) dragRef.current.style.cursor = 'grabbing'
  }
  const onMouseUp = () => {
    isDragging.current = false
    if (dragRef.current) dragRef.current.style.cursor = 'grab'
  }
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !dragRef.current) return
    e.preventDefault()
    const x    = e.pageX - dragRef.current.offsetLeft
    const walk = (x - startX.current) * 1.4
    dragRef.current.scrollLeft = scrollLeft.current - walk
  }

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>

      {/* ══════════════════════════════════════════════════════════════════
          HERO —
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{
        backgroundColor: '#74B4A7',  
        paddingTop: 120,
        paddingBottom: 0,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* */}
        <div style={{
          position: 'absolute', top: -80, right: -80,
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,74,59,0.30) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: 40, left: -60,
          width: 300, height: 300, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,74,59,0.20) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="container-brand" style={{ padding: '0 48px 80px' }}>
          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}
            className="hero-iceo-grid"
          >
            {/* ── Texto ── */}
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Badge — fondo oscuro semitransparente para leer sobre verde */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                backgroundColor: 'rgba(0,74,59,0.25)',
                border: '1px solid rgba(192,255,242,0.45)',
                borderRadius: 999, padding: '6px 16px',
                marginBottom: 20,
              }}>
                <span style={{
                  fontSize: 10, letterSpacing: '0.1em', fontWeight: 600,
                  fontFamily: 'Poppins, sans-serif',
                  color: '#C0FFF2',          /* */
                  textTransform: 'uppercase',
                }}>
                  Edición 2024 · Cali, Colombia
                </span>
              </div>

              <h1 style={{
                fontFamily: 'Gloock, Georgia, serif',
                fontSize: 'clamp(36px, 5vw, 60px)',
                fontWeight: 400,
                color: '#ffffff',
                lineHeight: 1.1,
                marginBottom: 20,
              }}>
                Memoria del<br />
                {/* Highlight en blanco puro — el AEE5DA se pierde sobre verde */}
                <span style={{ color: '#ffffff', fontWeight: 700 }}>2° ICEO</span>
              </h1>

              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: 15,
                color: 'rgba(255,255,255,0.85)', lineHeight: 1.75,
                marginBottom: 32, maxWidth: 440,
              }}>
                Descubre el impacto que logramos en la segunda edición del congreso
                en 2024 y aprende más sobre este movimiento que transforma
                organizaciones ambientales en Latinoamérica.
              </p>

              {/* CTA — navy oscuro para máximo contraste sobre el verde aqua */}
              <Link href="/docs/memoria_2iceo.pdf" target="_blank" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                backgroundColor: '#DAE8F2',
                color: '#fff',
                fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600,
                padding: '12px 28px', borderRadius: 999,
                textDecoration: 'none', letterSpacing: '0.04em',
                boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
                textTransform: 'uppercase',
                transition: 'background-color 0.2s, transform 0.15s',
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.backgroundColor = '#1C495C'; el.style.transform = 'translateY(-1px)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.backgroundColor = '#09344e'; el.style.transform = 'translateY(0)' }}
              >
                Ver Memoria →
              </Link>
            </motion.div>

            {/* ── Imagen hero ── */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
              style={{ position: 'relative' }}
            >
              {/* Marco decorativo — borde translúcido visible sobre verde */}
              <div style={{
                position: 'absolute', top: -16, right: -16,
                width: '100%', height: '100%',
                border: '2px solid rgba(255,255,255,0.30)',
                borderRadius: 16, zIndex: 0,
              }} />
              <div style={{
                position: 'relative', zIndex: 1,
                borderRadius: 14, overflow: 'hidden',
                aspectRatio: '16/10',
                boxShadow: '8px 8px 40px rgba(0,0,0,0.3)',
              }}>
                <img
                  src="/icons/2do_iceo.svg"
                  alt="2° ICEO LATAM"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave: aqua → blanco */}
        <div style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: '100%', height: 60, display: 'block' }}>
            <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,20 1440,30 L1440,60 L0,60 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          MOMENTOS QUE DEFINIERON EL CONGRESO
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#fff', padding: '80px 0' }}>
        <div className="container-brand" style={{ padding: '0 48px' }}>
          <FadeIn>
            <h2 style={{
              fontFamily: 'Poppins, sans-serif', fontSize: 28, fontWeight: 600,
              color: '#09344e', textAlign: 'center', marginBottom: 48,
            }}>
              Momentos que definieron el congreso
            </h2>
          </FadeIn>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="momentos-grid">
            {MOMENTOS.map((m, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div style={{
                  borderRadius: 12, overflow: 'hidden',
                  boxShadow: '2px 2px 8px rgba(18,48,62,0.15)',
                  position: 'relative', aspectRatio: '4/3',
                }}>
                  <img
                    src={m.image} alt={m.label}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    background: 'linear-gradient(0deg,rgba(9,52,78,0.95) 0%,transparent 100%)',
                    padding: '32px 16px 14px',
                    display: 'flex', alignItems: 'flex-end', gap: 10,
                  }}>
                    <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 40, fontWeight: 700, color: '#fff', lineHeight: 1 }}>
                      {m.num}
                    </span>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.9)', lineHeight: 1.3, paddingBottom: 4, maxWidth: 100 }}>
                      {m.label}
                    </span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          IMPACTO DEL EVENTO
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#F7F6F3', padding: '80px 0' }}>
        <div className="container-brand" style={{ padding: '0 48px' }}>
          <FadeIn>
            <h2 style={{
              fontFamily: 'Poppins, sans-serif', fontSize: 28, fontWeight: 600,
              color: '#09344e', textAlign: 'center', marginBottom: 48,
            }}>
              Impacto del evento
            </h2>
          </FadeIn>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'center' }}>
            {IMPACTO.map((item, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div style={{
                  background: '#fff', borderRadius: 12, padding: '28px 24px',
                  textAlign: 'center', minWidth: 160, flex: '1 1 160px', maxWidth: 200,
                  boxShadow: '2px 2px 8px rgba(18,48,62,0.10)',
                }}>
                  <div style={{ marginBottom: 8, display: 'flex', justifyContent: 'center' }}>
                    <img src={item.icon} alt={item.label} width={36} height={36} style={{ display: 'block' }} />
                  </div>
                  <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 34, fontWeight: 700, color: '#03A383', lineHeight: 1 }}>
                    {item.num}
                  </div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#5A6E77', marginTop: 8, lineHeight: 1.4 }}>
                    {item.label}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          ALCANCE EN REDES SOCIALES
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#fff', padding: '80px 0' }}>
        <div className="container-brand" style={{ padding: '0 48px' }}>
          <FadeIn>
            <h2 style={{
              fontFamily: 'Poppins, sans-serif', fontSize: 28, fontWeight: 600,
              color: '#09344e', textAlign: 'center', marginBottom: 48,
            }}>
              Alcance en Redes Sociales
            </h2>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }} className="redes-grid">
            {REDES.map((r, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div style={{
                  background: r.bg, borderRadius: 14, padding: '28px 20px',
                  textAlign: 'center', color: '#fff',
                  boxShadow: '2px 2px 12px rgba(18,48,62,0.15)',
                }}>
                  <div style={{ marginBottom: 8 }}><r.Icon size={32} color="white" /></div>
                  <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 30, fontWeight: 700, lineHeight: 1 }}>{r.num}</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, marginTop: 8, opacity: 0.9, lineHeight: 1.4 }}>{r.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Wave blanca → navy (para sección Personalidades) */}
      <div style={{ lineHeight: 0, backgroundColor: '#fff' }}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: '100%', height: 60, display: 'block' }}>
          <path d="M0,20 C480,60 960,0 1440,20 L1440,60 L0,60 Z" fill="#09344e" />
        </svg>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          PERSONALIDADES DESTACADAS
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#09344e', padding: '80px 0' }}>
        <div className="container-brand" style={{ padding: '0 48px' }}>
          <FadeIn>
            <h2 style={{
              fontFamily: 'Poppins, sans-serif', fontSize: 28, fontWeight: 600,
              color: '#fff', textAlign: 'center', marginBottom: 56,
            }}>
              Personalidades destacadas
            </h2>
          </FadeIn>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, justifyItems: 'center' }} className="pers-grid">
            {PERSONALIDADES.map((p, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{ textAlign: 'center', width: '100%', maxWidth: 200 }}>
                  <div style={{ position: 'relative', width: 180, height: 180, margin: '0 auto 20px' }}>
                    <div style={{
                      position: 'absolute', inset: -5, borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(3,163,131,0.45) 0%, rgba(9,117,137,0.2) 100%)',
                    }} />
                    <div style={{
                      position: 'relative', width: 180, height: 180, borderRadius: '50%',
                      overflow: 'hidden', border: '4px solid #09344e',
                      boxShadow: '0 6px 28px rgba(0,0,0,0.4)',
                    }}>
                      <img src={p.img} alt={p.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
                    </div>
                    <Link href={p.li} target="_blank" rel="noopener noreferrer"
                      style={{
                        position: 'absolute', bottom: 8, left: 8,
                        width: 32, height: 32, borderRadius: '50%',
                        backgroundColor: '#0A66C2',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.35)',
                        border: '2px solid #09344e', transition: 'transform 0.15s',
                      }}
                      onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.12)'}
                      onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)'}
                    >
                      <IconLinkedin size={15} color="white" />
                    </Link>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, marginBottom: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 18, lineHeight: 1, flexShrink: 0 }}>{p.flag}</span>
                    <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>
                      {p.name}
                    </span>
                  </div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.55)', lineHeight: 1.55, whiteSpace: 'pre-line' }}>
                    {p.role}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Wave navy → #F7F6F3 */}
      <div style={{ lineHeight: 0, backgroundColor: '#09344e' }}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: '100%', height: 60, display: 'block' }}>
          <path d="M0,40 C360,0 1080,60 1440,20 L1440,60 L0,60 Z" fill="#F7F6F3" />
        </svg>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          VOCES DEL CONGRESO
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#F7F6F3', padding: '80px 0' }}>
        <div className="container-brand" style={{ padding: '0 48px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start' }} className="voces-grid">
            <FadeIn>
              <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 28, fontWeight: 600, color: '#09344e', marginBottom: 16 }}>
                Voces del Congreso
              </h2>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#5A6E77', lineHeight: 1.75, marginBottom: 16 }}>
                El 2° ICEO fue un espacio de encuentro entre organizaciones, comunidades,
                líderes y jóvenes que construyen soluciones desde sus territorios. Conoce
                tres de las más compartidas experiencias, saberes y alianzas que hizo
                posibles el congreso.
              </p>
              <blockquote style={{
                borderLeft: '3px solid #03A383',
                paddingLeft: 18, margin: '24px 0',
                fontFamily: 'Inter, sans-serif', fontSize: 14, fontStyle: 'italic',
                color: '#5A6E77', lineHeight: 1.75,
              }}>
                "El 2° ICEO LATAM fue un espacio enriquecedor entre organizaciones
                ambientales y tecnológicas que movilizamos permanentemente."
              </blockquote>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 600, color: '#03A383', marginBottom: 24 }}>
                — Participante destacado, 2° ICEO
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 14 }}>
                  {ENTREVISTAS.map((e, i) => (
                    <button key={e.id} onClick={() => setActiveVideo(i)}
                      style={{
                        padding: '8px 4px', borderRadius: 8,
                        border: activeVideo === i ? '2px solid #03A383' : '2px solid #C3DED9',
                        backgroundColor: activeVideo === i ? '#03A383' : '#fff',
                        color: activeVideo === i ? '#fff' : '#5A6E77',
                        fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 600,
                        cursor: 'pointer', transition: 'all 0.2s', letterSpacing: '0.02em',
                      }}
                    >
                      {e.label}
                    </button>
                  ))}
                </div>
                <div style={{ borderRadius: 14, overflow: 'hidden', boxShadow: '4px 4px 24px rgba(9,52,78,0.2)', backgroundColor: '#000', aspectRatio: '16/9', position: 'relative' }}>
                  <video key={ENTREVISTAS[activeVideo].src} controls
                    style={{ width: '100%', height: '100%', display: 'block', objectFit: 'contain', backgroundColor: '#000' }}
                    poster=""
                  >
                    <source src={ENTREVISTAS[activeVideo].src} type="video/mp4" />
                    Tu navegador no soporta la reproducción de video.
                  </video>
                </div>
                <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 12, color: '#5A6E77', marginTop: 10, textAlign: 'center', letterSpacing: '0.03em' }}>
                  {ENTREVISTAS[activeVideo].label} · 2° ICEO LATAM
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          RELEVANCIA E IMPACTO
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#09344e', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
        <div className="container-brand" style={{ padding: '0 48px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 60, alignItems: 'center' }} className="relevancia-grid">
            <FadeIn>
              <div style={{ borderRadius: 14, overflow: 'hidden', aspectRatio: '4/3', boxShadow: '8px 8px 40px rgba(0,0,0,0.3)' }}>
                <img src="/icons/2do_iceo.svg" alt="Relevancia e Impacto 2° ICEO"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 28, fontWeight: 600, color: '#fff', marginBottom: 16, lineHeight: 1.25 }}>
                Relevancia e impacto en la{' '}
                <span style={{ color: '#76E2CC' }}>comunidad ambiental</span>
              </h2>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.75, marginBottom: 14 }}>
                El 2° ICEO LATAM se consolidó como un espacio clave para visibilizar
                el trabajo de organizaciones y tecnólogos que movilizamos permanentemente.
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.75, marginBottom: 28 }}>
                Su impacto se refleja en nuevas alianzas, intercambio de saberes y
                fortalecimiento de iniciativas ambientales en toda la región.
              </p>
              <Link href="/docs/memoria_2iceo.pdf" target="_blank" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                backgroundColor: '#74B4A7', color: '#fff',
                fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600,
                padding: '12px 28px', borderRadius: 999, textDecoration: 'none',
                letterSpacing: '0.04em', textTransform: 'uppercase',
                transition: 'background-color 0.2s',
              }}
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#3C625B')}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#03A383')}
              >
                Conocer más →
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CTA — LEE LA MEMORIA COMPLETA
          Gradiente usando tonos aquamarina oficiales
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{
        background: 'linear-gradient(135deg, #03A383 0%, #3C625B 100%)',
        padding: '72px 48px', textAlign: 'center',
      }}>
        <FadeIn>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 28, fontWeight: 600, color: '#fff', marginBottom: 28 }}>
            Lee la memoria del 2° ICEO completa
          </h2>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/docs/memoria_2iceo.pdf" target="_blank" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              backgroundColor: '#fff', color: '#03A383',
              fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 700,
              padding: '13px 32px', borderRadius: 999,
              textDecoration: 'none', letterSpacing: '0.04em', textTransform: 'uppercase',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            }}>
              ↓ Descargar memoria
            </Link>
            <Link href="/docs/memoria_2iceo.pdf" target="_blank" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              backgroundColor: 'transparent', color: '#fff',
              border: '2px solid rgba(255,255,255,0.8)',
              fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 700,
              padding: '11px 32px', borderRadius: 999,
              textDecoration: 'none', letterSpacing: '0.04em', textTransform: 'uppercase',
            }}>
              Ver memoria
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          DONACIÓN
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#fff', padding: '80px 0' }}>
        <div className="container-brand" style={{ padding: '0 48px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="donacion-grid">
            <FadeIn>
              <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 28, fontWeight: 600, color: '#09344e', marginBottom: 14, lineHeight: 1.25 }}>
                ¡Gracias a tu donación, nadie se queda fuera!
              </h2>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#5A6E77', lineHeight: 1.75, marginBottom: 12 }}>
                Tu ayuda garantiza que organizaciones ambientales que no cuentan
                con recursos puedan asistir al 2° ICEO y formar parte de un espacio
                de aprendizaje, colaboración y transformación climática.
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#5A6E77', lineHeight: 1.6, marginBottom: 28, opacity: 0.8 }}>
                El importe irá íntegramente destinado a cubrir alojamiento,
                manutención, transporte y tasas.
              </p>
              <Link href="/marketing/donaciones" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                backgroundColor: '#B53077', color: '#fff',
                fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 700,
                padding: '13px 32px', borderRadius: 999, textDecoration: 'none',
                letterSpacing: '0.04em', boxShadow: '0 2px 16px rgba(181,48,119,0.30)',
                textTransform: 'uppercase',
              }}>
                Dona ahora →
              </Link>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div style={{ borderRadius: 14, overflow: 'hidden', aspectRatio: '4/3', boxShadow: '4px 4px 24px rgba(9,52,78,0.12)' }}>
                <img src="/icons/planta_donacion.svg" alt="Donación 2° ICEO"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          REDES SOCIALES
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#F7F6F3', padding: '80px 0' }}>
        <div className="container-brand" style={{ padding: '0 48px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }} className="follow-grid">
            <FadeIn>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src="/icons/follow.svg" alt="Follow us on social media"
                  style={{ width: '100%', maxWidth: 380, height: 'auto', display: 'block' }} />
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 22, fontWeight: 600, color: '#09344e', marginBottom: 12 }}>
                ¡Pásate por nuestras Redes Sociales y síguenos!
              </h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#5A6E77', lineHeight: 1.75, marginBottom: 24 }}>
                Publicamos contenido acerca de la labor que hacemos, podrás conocer
                proyectos y a nosotros más a fondo.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {[
                  { label: 'Instagram', bg: '#E1306C', Icon: IconInstagram },
                  { label: 'Facebook',  bg: '#1877F2', Icon: IconFacebook  },
                  { label: 'LinkedIn',  bg: '#0A66C2', Icon: IconLinkedin  },
                ].map(({ label, bg, Icon }) => (
                  <Link key={label} href="#" style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    backgroundColor: bg, color: '#fff',
                    fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 600,
                    padding: '8px 18px', borderRadius: 999, textDecoration: 'none',
                  }}>
                    <Icon size={14} color="white" />
                    {label}
                  </Link>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── RESPONSIVE ── */}
      <style suppressHydrationWarning>{`
        @media (max-width: 900px) {
          .hero-iceo-grid   { grid-template-columns: 1fr !important; }
          .momentos-grid    { grid-template-columns: repeat(2,1fr) !important; }
          .redes-grid       { grid-template-columns: repeat(2,1fr) !important; }
          .pers-grid        { grid-template-columns: repeat(2,1fr) !important; }
          .voces-grid       { grid-template-columns: 1fr !important; }
          .relevancia-grid  { grid-template-columns: 1fr !important; }
          .donacion-grid    { grid-template-columns: 1fr !important; }
          .follow-grid      { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 580px) {
          .momentos-grid  { grid-template-columns: 1fr !important; }
          .redes-grid     { grid-template-columns: 1fr 1fr !important; }
          .pers-grid      { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  )
}