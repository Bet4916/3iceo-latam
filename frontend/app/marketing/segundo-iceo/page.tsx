'use client'

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
  { num: '30', label: 'Panelistas',                      emoji: '🎙️', bg: 'linear-gradient(135deg,#09344e 0%,#1C495C 100%)' },
  { num: '14', label: 'Conferencias',                    emoji: '🏛️', bg: 'linear-gradient(135deg,#097589 0%,#09344e 100%)' },
  { num: '02', label: 'Conversatorios',                  emoji: '💬', bg: 'linear-gradient(135deg,#4886B5 0%,#12303E 100%)' },
  { num: '28', label: 'Organizaciones en el Marketplace',emoji: '🌿', bg: 'linear-gradient(135deg,#03A383 0%,#09344e 100%)' },
  { num: '02', label: 'Convenios',                       emoji: '🤝', bg: 'linear-gradient(135deg,#1C495C 0%,#097589 100%)' },
  { num: '05', label: 'Talleres',                        emoji: '🛠️', bg: 'linear-gradient(135deg,#12303E 0%,#4886B5 100%)' },
  { num: '17', label: 'Entidades aliadas',               emoji: '🏢', bg: 'linear-gradient(135deg,#09344e 0%,#03A383 100%)' },
  { num: '03', label: 'Días de Marketplace',             emoji: '📅', bg: 'linear-gradient(135deg,#097589 0%,#4886B5 100%)' },
  { num: '08', label: 'Universidades aliadas',           emoji: '🎓', bg: 'linear-gradient(135deg,#1C495C 0%,#09344e 100%)' },
]

const IMPACTO = [
  { num: '1209', label: 'Asistentes Presenciales y Virtuales', icon: '👥' },
  { num: '192',  label: 'Organizaciones Ambientales',          icon: '🌱' },
  { num: '06',   label: 'Entidades Públicas',                  icon: '🏛️' },
  { num: '+135', label: 'Estudiantes Universitarios',          icon: '🎓' },
  { num: '31',   label: 'Participantes Independientes',        icon: '👤' },
]

const REDES = [
  { num: '7784+', label: 'Interacciones en los contenidos de la plataforma', bg: 'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)', Icon: IconInstagram,  platform: 'Instagram'  },
  { num: '6511+', label: 'Interacciones en los contenidos de la plataforma', bg: '#1877F2',                                                            Icon: IconFacebook,   platform: 'Facebook'   },
  { num: '851',   label: 'Asistentes al streaming virtual',                  bg: '#FF0000',                                                            Icon: IconYoutube,    platform: 'YouTube'    },
  { num: '1502',  label: 'Interacciones en los videos del congreso',        bg: '#0A66C2',                                                            Icon: IconLinkedin,   platform: 'LinkedIn'   },
]

const PERSONALIDADES = [
  { name: 'José Serrano Serna',     role: 'Director Ejecutivo Presidente\nAwaq ONG',          flag: '🇨🇴', li: '#' },
  { name: 'Luis Alfonso Aguirre',   role: 'Gerente de Programa\nPWF Colombia',                flag: '🇨🇴', li: '#' },
  { name: 'Rolando Evelio Pérez',   role: 'Profesor Planta Tecnológico\nde Monterrey',        flag: '🇲🇽', li: '#' },
  { name: 'Begoña de la Hera',      role: 'Directora Programa TED\nAwaq ONG',                 flag: '🇪🇸', li: '#' },
]

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function SegundoIceoPage() {
  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>

      {/* ══════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{
        backgroundColor: '#09344e',
        paddingTop: 120,
        paddingBottom: 0,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative blobs */}
        <div style={{
          position: 'absolute', top: -80, right: -80,
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(9,117,137,0.25) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: 40, left: -60,
          width: 300, height: 300, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(72,134,181,0.2) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="container-brand" style={{ padding: '0 48px 80px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 64,
              alignItems: 'center',
            }}
            className="hero-iceo-grid"
          >
            {/* ── Texto ── */}
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Badge */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                backgroundColor: 'rgba(9,117,137,0.20)',
                border: '1px solid rgba(9,117,137,0.45)',
                borderRadius: 999, padding: '6px 16px',
                marginBottom: 20,
              }}>
                <span style={{ fontSize: 10, letterSpacing: '0.1em', fontWeight: 600, fontFamily: 'Poppins, sans-serif', color: '#AEE5DA', textTransform: 'uppercase' }}>
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
                <span style={{ color: '#AEE5DA' }}>2° ICEO</span>
              </h1>

              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: 15,
                color: 'rgba(255,255,255,0.75)', lineHeight: 1.75,
                marginBottom: 32, maxWidth: 440,
              }}>
                Descubre el impacto que logramos en la segunda edición del congreso
                en 2024 y aprende más sobre este movimiento que transforma
                organizaciones ambientales en Latinoamérica.
              </p>

              <Link href="#" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                backgroundColor: '#097589', color: '#fff',
                fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600,
                padding: '12px 28px', borderRadius: 999,
                textDecoration: 'none', letterSpacing: '0.04em',
                boxShadow: '0 4px 20px rgba(9,117,137,0.4)',
                textTransform: 'uppercase',
              }}>
                Ver Memoria →
              </Link>
            </motion.div>

            {/* ── Imagen ── */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
              style={{ position: 'relative' }}
            >
              {/* Decorative frame */}
              <div style={{
                position: 'absolute', top: -16, right: -16,
                width: '100%', height: '100%',
                border: '2px solid rgba(174,229,218,0.25)',
                borderRadius: 16, zIndex: 0,
              }} />
              <div style={{
                position: 'relative', zIndex: 1,
                borderRadius: 14, overflow: 'hidden',
                background: 'linear-gradient(135deg,#1C495C 0%,#097589 50%,#09344e 100%)',
                aspectRatio: '16/10',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '8px 8px 40px rgba(0,0,0,0.4)',
              }}>
                {/* placeholder — reemplaza con <Image src="..." /> */}
                <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.25)' }}>
                  <div style={{ fontSize: 64, marginBottom: 8 }}>🌿</div>
                  <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>
                    Imagen del congreso
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave */}
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

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 20,
            }}
            className="momentos-grid"
          >
            {MOMENTOS.map((m, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div style={{
                  borderRadius: 12, overflow: 'hidden',
                  boxShadow: '2px 2px 8px rgba(18,48,62,0.15)',
                  position: 'relative',
                }}>
                  {/* Image area */}
                  <div style={{
                    background: m.bg,
                    aspectRatio: '4/3',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 48, opacity: 0.85,
                  }}>
                    {m.emoji}
                  </div>
                  {/* Overlay label */}
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    background: 'linear-gradient(0deg,rgba(9,52,78,0.95) 0%,transparent 100%)',
                    padding: '32px 16px 14px',
                    display: 'flex', alignItems: 'flex-end', gap: 10,
                  }}>
                    <span style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: 40, fontWeight: 700, color: '#fff', lineHeight: 1,
                    }}>
                      {m.num}
                    </span>
                    <span style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 12, color: 'rgba(255,255,255,0.9)',
                      lineHeight: 1.3, paddingBottom: 4, maxWidth: 100,
                    }}>
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

          <div style={{
            display: 'flex', flexWrap: 'wrap',
            gap: 20, justifyContent: 'center',
          }}>
            {IMPACTO.map((item, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div style={{
                  background: '#fff', borderRadius: 12,
                  padding: '28px 24px', textAlign: 'center',
                  minWidth: 160, flex: '1 1 160px', maxWidth: 200,
                  boxShadow: '2px 2px 8px rgba(18,48,62,0.10)',
                }}>
                  <div style={{ fontSize: 36, marginBottom: 8 }}>{item.icon}</div>
                  <div style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: 34, fontWeight: 700, color: '#097589', lineHeight: 1,
                  }}>
                    {item.num}
                  </div>
                  <div style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 12, color: '#5A6E77', marginTop: 8, lineHeight: 1.4,
                  }}>
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

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 20,
          }} className="redes-grid">
            {REDES.map((r, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div style={{
                  background: r.bg, borderRadius: 14,
                  padding: '28px 20px', textAlign: 'center', color: '#fff',
                  boxShadow: '2px 2px 12px rgba(18,48,62,0.15)',
                }}>
                  <div style={{ marginBottom: 8 }}>
                    <r.Icon size={32} color="white" />
                  </div>
                  <div style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: 30, fontWeight: 700, lineHeight: 1,
                  }}>
                    {r.num}
                  </div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, marginTop: 8, opacity: 0.9, lineHeight: 1.4 }}>
                    {r.label}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Wave into dark section */}
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
              color: '#fff', textAlign: 'center', marginBottom: 48,
            }}>
              Personalidades destacadas
            </h2>
          </FadeIn>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 32,
          }} className="pers-grid">
            {PERSONALIDADES.map((p, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{ textAlign: 'center' }}>
                  {/* Avatar */}
                  <div style={{
                    width: 130, height: 130, borderRadius: '50%',
                    margin: '0 auto 12px',
                    background: 'linear-gradient(135deg,#1C495C 0%,#097589 100%)',
                    border: '3px solid rgba(174,229,218,0.4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 52, position: 'relative',
                    overflow: 'visible',
                  }}>
                    <span>👤</span>
                    {/* Flag badge */}
                    <span style={{
                      position: 'absolute', bottom: 4, right: 4,
                      fontSize: 18, lineHeight: 1,
                    }}>
                      {p.flag}
                    </span>
                  </div>

                  {/* LinkedIn */}
                  <Link href={p.li} style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: 30, height: 30, borderRadius: '50%',
                    backgroundColor: '#0A66C2', marginBottom: 8,
                    color: '#fff',
                  }}>
                    <IconLinkedin size={14} color="white" />
                  </Link>

                  <div style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 6,
                  }}>
                    {p.name}
                  </div>
                  <div style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 12, color: 'rgba(255,255,255,0.60)',
                    lineHeight: 1.5, whiteSpace: 'pre-line',
                  }}>
                    {p.role}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Wave out of dark section */}
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
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 60, alignItems: 'center',
            }}
            className="voces-grid"
          >
            <FadeIn>
              <h2 style={{
                fontFamily: 'Poppins, sans-serif', fontSize: 28, fontWeight: 600,
                color: '#09344e', marginBottom: 16,
              }}>
                Voces del Congreso
              </h2>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: 15,
                color: '#5A6E77', lineHeight: 1.75, marginBottom: 16,
              }}>
                El 2° ICEO fue un espacio de encuentro entre organizaciones, comunidades,
                líderes y jóvenes que construyen soluciones desde sus territorios. Conoce
                tres de las más compartidas experiencias, saberes y alianzas que hizo
                posibles el congreso.
              </p>

              {/* Quote */}
              <blockquote style={{
                borderLeft: '3px solid #097589',
                paddingLeft: 18, margin: '24px 0',
                fontFamily: 'Inter, sans-serif',
                fontSize: 14, fontStyle: 'italic',
                color: '#5A6E77', lineHeight: 1.75,
              }}>
                "El 2° ICEO LATAM fue un espacio enriquecedor entre organizaciones
                ambientales y tecnológicas que movilizamos permanentemente."
              </blockquote>

              <p style={{
                fontFamily: 'Poppins, sans-serif', fontSize: 12,
                fontWeight: 600, color: '#097589', marginBottom: 24,
              }}>
                — Participante destacado, 2° ICEO
              </p>

              <Link href="#" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                border: '2px solid #097589', color: '#097589',
                fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600,
                padding: '10px 24px', borderRadius: 999, textDecoration: 'none',
                letterSpacing: '0.04em', textTransform: 'uppercase',
              }}>
                ▶ Ver testimonios
              </Link>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div style={{
                borderRadius: 14, overflow: 'hidden',
                background: 'linear-gradient(135deg,#AEE5DA 0%,#097589 60%,#09344e 100%)',
                aspectRatio: '3/4',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '4px 4px 24px rgba(9,52,78,0.2)',
                fontSize: 80, opacity: 0.7,
              }}>
                💬
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          RELEVANCIA E IMPACTO
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{
        backgroundColor: '#09344e',
        padding: '80px 0',
        position: 'relative', overflow: 'hidden',
      }}>
        <div className="container-brand" style={{ padding: '0 48px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.1fr 1fr',
              gap: 60, alignItems: 'center',
            }}
            className="relevancia-grid"
          >
            <FadeIn>
              <div style={{
                borderRadius: 14, overflow: 'hidden',
                background: 'linear-gradient(135deg,#1C495C 0%,#097589 50%,#03A383 100%)',
                aspectRatio: '4/3',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '8px 8px 40px rgba(0,0,0,0.3)', fontSize: 80, opacity: 0.7,
              }}>
                🌳
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <h2 style={{
                fontFamily: 'Poppins, sans-serif', fontSize: 28, fontWeight: 600,
                color: '#fff', marginBottom: 16, lineHeight: 1.25,
              }}>
                Relevancia e impacto en la{' '}
                <span style={{ color: '#AEE5DA' }}>comunidad ambiental</span>
              </h2>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: 15,
                color: 'rgba(255,255,255,0.75)', lineHeight: 1.75, marginBottom: 14,
              }}>
                El 2° ICEO LATAM se consolidó como un espacio clave para visibilizar
                el trabajo de organizaciones y tecnólogos que movilizamos permanentemente.
              </p>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: 15,
                color: 'rgba(255,255,255,0.75)', lineHeight: 1.75, marginBottom: 28,
              }}>
                Su impacto se refleja en nuevas alianzas, intercambio de saberes y
                fortalecimiento de iniciativas ambientales en toda la región.
              </p>
              <Link href="#" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                backgroundColor: '#097589', color: '#fff',
                fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600,
                padding: '12px 28px', borderRadius: 999, textDecoration: 'none',
                letterSpacing: '0.04em', textTransform: 'uppercase',
              }}>
                Conocer más →
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          CTA — LEE LA MEMORIA COMPLETA
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{
        background: 'linear-gradient(135deg,#097589 0%,#03A383 100%)',
        padding: '72px 48px', textAlign: 'center',
      }}>
        <FadeIn>
          <h2 style={{
            fontFamily: 'Poppins, sans-serif', fontSize: 28, fontWeight: 600,
            color: '#fff', marginBottom: 28,
          }}>
            Lee la memoria del 2° ICEO completa
          </h2>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="#" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              backgroundColor: '#fff', color: '#097589',
              fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 700,
              padding: '13px 32px', borderRadius: 999,
              textDecoration: 'none', letterSpacing: '0.04em', textTransform: 'uppercase',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            }}>
              ↓ Descargar memoria
            </Link>
            <Link href="#" style={{
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
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 64, alignItems: 'center',
            }}
            className="donacion-grid"
          >
            <FadeIn>
              <h2 style={{
                fontFamily: 'Poppins, sans-serif', fontSize: 28, fontWeight: 600,
                color: '#09344e', marginBottom: 14, lineHeight: 1.25,
              }}>
                ¡Gracias a tu donación, nadie se queda fuera!
              </h2>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: 15,
                color: '#5A6E77', lineHeight: 1.75, marginBottom: 12,
              }}>
                Tu ayuda garantiza que organizaciones ambientales que no cuentan
                con recursos puedan asistir al 2° ICEO y formar parte de un espacio
                de aprendizaje, colaboración y transformación climática.
              </p>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: 13,
                color: '#5A6E77', lineHeight: 1.6, marginBottom: 28, opacity: 0.8,
              }}>
                El importe irá íntegramente destinado a cubrir alojamiento,
                manutención, transporte y tasas.
              </p>
              <Link href="/marketing/donaciones" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                backgroundColor: '#B53077', color: '#fff',
                fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 700,
                padding: '13px 32px', borderRadius: 999, textDecoration: 'none',
                letterSpacing: '0.04em',
                boxShadow: '0 2px 16px rgba(181,48,119,0.30)',
                textTransform: 'uppercase',
              }}>
                Dona ahora →
              </Link>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div style={{
                borderRadius: 14, overflow: 'hidden',
                background: 'linear-gradient(135deg,#C0FFF2 0%,#AEE5DA 50%,#76E2CC 100%)',
                aspectRatio: '4/3',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '4px 4px 24px rgba(9,52,78,0.12)',
                fontSize: 80, opacity: 0.7,
              }}>
                🤲
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          REDES SOCIALES — FOLLOW
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#F7F6F3', padding: '80px 0' }}>
        <div className="container-brand" style={{ padding: '0 48px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 48, alignItems: 'center',
            }}
            className="follow-grid"
          >
            <FadeIn>
              {/* Follow card */}
              <div style={{
                background: 'linear-gradient(135deg,#74B4A7 0%,#097589 100%)',
                borderRadius: 20, padding: '40px 36px',
                textAlign: 'center', color: '#fff',
                boxShadow: '4px 4px 24px rgba(9,117,137,0.25)',
              }}>
                <div style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: 36, fontWeight: 800, letterSpacing: '0.04em', marginBottom: 2,
                }}>
                  FOLLOW US!
                </div>
                <div style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: 14, fontWeight: 600, opacity: 0.85, marginBottom: 4,
                }}>
                  ON SOCIAL MEDIA
                </div>
                <div style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 13, opacity: 0.65, marginBottom: 24,
                }}>
                  @awaqong
                </div>
                <div style={{ display: 'flex', gap: 14, justifyContent: 'center' }}>
                  {([
                    { href: '#', Icon: IconInstagram },
                    { href: '#', Icon: IconFacebook  },
                    { href: '#', Icon: IconLinkedin  },
                    { href: '#', Icon: IconYoutube   },
                  ] as const).map(({ href, Icon }, i) => (
                    <Link key={i} href={href} style={{
                      width: 42, height: 42, borderRadius: '50%',
                      border: '2px solid rgba(255,255,255,0.6)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff',
                    }}>
                      <Icon size={18} color="white" />
                    </Link>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <h3 style={{
                fontFamily: 'Poppins, sans-serif', fontSize: 22, fontWeight: 600,
                color: '#09344e', marginBottom: 12,
              }}>
                ¡Pásate por nuestras Redes Sociales y síguenos!
              </h3>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: 15,
                color: '#5A6E77', lineHeight: 1.75, marginBottom: 24,
              }}>
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
