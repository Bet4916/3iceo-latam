'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

// ─── Fade-in on scroll helper ─────────────────────────────────────────────────
function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  )
}

// ─── DATA ────────────────────────────────────────────────────────────────────
const PONENTES = [
  { nombre: 'Dra. Ana Rodríguez',  cargo: 'Directora de Biodiversidad, UICN',          img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80' },
  { nombre: 'Prof. Carlos Mendez', cargo: 'Cátedra de Cambio Climático, Univ. Cali',   img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=80' },
  { nombre: 'Laura Cifuentes',     cargo: 'Directora Ejecutiva, Fundación Verde',       img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80' },
  { nombre: 'Ing. Marco Solís',    cargo: 'Innovación Sostenible, Empresa SolarTech',   img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80' },
]

const AGENDA_ITEMS = [
  { hora: '09:00',  titulo: 'Inauguración y bienvenida institucional',  tipo: 'Plenaria' },
  { hora: '10:00',  titulo: 'Conferencia magistral: El futuro del ecosistema ambiental en LATAM', tipo: 'Conferencia' },
  { hora: '11:30',  titulo: 'Mesas de trabajo — Líneas temáticas',       tipo: 'Taller' },
  { hora: '13:00',  titulo: 'Almuerzo y networking en el Marketplace',   tipo: 'Networking' },
  { hora: '15:00',  titulo: 'Panel: Financiación de proyectos verdes',   tipo: 'Panel' },
  { hora: '17:00',  titulo: 'Cierre y presentación de manifiestos',      tipo: 'Plenaria' },
]

const TIPO_COLOR: Record<string, string> = {
  Plenaria:   '#097589',
  Conferencia:'#4886B5',
  Taller:     '#03A383',
  Networking: '#B53077',
  Panel:      '#74B4A7',
}

const TESTIMONIOS = [
  { texto: 'El 2ICEO transformó nuestra forma de entender la colaboración entre organizaciones. Volvimos con alianzas concretas.', nombre: 'M. García', org: 'Fundación Bosques Vivos' },
  { texto: 'Una experiencia única que conecta a los actores clave del sector ambiental de toda Latinoamérica.',                    nombre: 'J. Pérez',   org: 'ONG EcoAndes' },
  { texto: 'El marketplace nos permitió visibilizar nuestro proyecto ante financiadores que no habríamos alcanzado de otra forma.', nombre: 'L. Torres',  org: 'Coop. AguaLimpia' },
]

const LOGOS_PARTNERS = ['AWAQ', 'Univ. San Buenaventura', 'Humans Pro', 'UICN', 'GreenPeace LATAM', 'WWF Colombia']

export default function HomePage() {
  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* ── HERO STANDARD (fondo blanco, dos columnas, imagen flotante) ── */}
      <section style={{
        paddingTop: 96,
        backgroundColor: '#fff',
        overflow: 'hidden',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '60px 48px 0' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center',
          }} className="hero-grid">

            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Eyebrow */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                backgroundColor: '#E6F3EE', borderRadius: 999,
                padding: '5px 14px', marginBottom: 20,
                fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 600,
                color: '#097589', letterSpacing: '0.06em',
              }}>
                🌿 CALI, COLOMBIA · 2025
              </div>

              <h1 style={{
                fontFamily: 'Gloock, Georgia, serif',
                fontSize: 'clamp(38px, 4.5vw, 58px)',
                fontWeight: 400, color: '#09344e', lineHeight: 1.1, marginBottom: 20,
              }}>
                3er Congreso Internacional de Organizaciones Ambientales
              </h1>

              <p style={{
                fontFamily: 'Poppins, sans-serif', fontSize: 16,
                color: '#437287', lineHeight: 1.7, marginBottom: 12, maxWidth: 480,
              }}>
                El mayor encuentro anual del ecosistema ambiental latinoamericano.
                Aprendizaje, conexión y colaboración entre organizaciones, universidades y empresas.
              </p>

              {/* Chips */}
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 32 }}>
                {['🏠 Alojamiento', '🚌 Transporte', '🍽️ Dieta'].map(c => (
                  <span key={c} style={{
                    backgroundColor: '#E6F3EE', borderRadius: 999,
                    padding: '6px 14px',
                    fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 500,
                    color: '#09344e',
                  }}>{c}</span>
                ))}
              </div>

              {/* CTAs */}
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link href="/marketing/registro" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  backgroundColor: '#B53077', color: '#fff',
                  fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 700,
                  padding: '13px 28px', borderRadius: 999, textDecoration: 'none',
                  letterSpacing: '0.04em',
                  boxShadow: '0 2px 12px rgba(181,48,119,0.3)',
                }}>
                  QUIERO ASISTIR
                </Link>
                <Link href="/marketing/donaciones" style={{
                  display: 'inline-flex', alignItems: 'center',
                  backgroundColor: 'transparent', color: '#B53077',
                  fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 700,
                  padding: '13px 28px', borderRadius: 999, textDecoration: 'none',
                  border: '2px solid #B53077', letterSpacing: '0.04em',
                }}>
                  DONAR
                </Link>
              </div>
            </motion.div>

            {/* Right: imagen con decoración */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ position: 'relative' }}
            >
              <div style={{
                borderRadius: '16px 16px 60px 16px',
                overflow: 'hidden', height: 380,
                boxShadow: '8px 8px 32px rgba(9,52,78,0.18)',
              }}>
                <img
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80"
                  alt="Grupo de organizaciones ambientales reunidas"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              {/* Decorative blob */}
              <div style={{
                position: 'absolute', bottom: -24, right: -24,
                width: 120, height: 120,
                background: 'radial-gradient(circle, #AEE5DA 0%, transparent 70%)',
                borderRadius: '50%', zIndex: -1, opacity: 0.7,
              }} />
              {/* Date badge */}
              <div style={{
                position: 'absolute', top: 20, left: -20,
                backgroundColor: '#fff', borderRadius: 12,
                padding: '12px 18px',
                boxShadow: '2px 2px 12px rgba(9,52,78,0.15)',
                fontFamily: 'Poppins, sans-serif',
              }}>
                <div style={{ fontSize: 11, color: '#097589', fontWeight: 600, letterSpacing: '0.08em' }}>PRÓXIMA EDICIÓN</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#09344e' }}>2025</div>
                <div style={{ fontSize: 11, color: '#5A6E77' }}>Cali, Colombia</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave transition to next section */}
        <div style={{ marginTop: 60, lineHeight: 0 }}>
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: '100%', height: 60, display: 'block' }}>
            <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,20 1440,30 L1440,60 L0,60 Z" fill="#F7F6F3" />
          </svg>
        </div>
      </section>

      {/* ── PONENTES DESTACADOS ──────────────────────────────────────────── */}
      <section style={{ backgroundColor: '#F7F6F3', padding: '64px 48px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <span style={{
                fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 600,
                color: '#097589', letterSpacing: '0.1em', textTransform: 'uppercase',
                display: 'block', marginBottom: 8,
              }}>PONENTES</span>
              <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 28, color: '#09344e' }}>
                Voces que inspiran el cambio
              </h2>
            </div>
          </FadeIn>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24,
          }} className="speakers-grid">
            {PONENTES.map((p, i) => (
              <FadeIn key={p.nombre} delay={i * 0.1}>
                <div style={{
                  backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden',
                  boxShadow: '2px 2px 8px rgba(9,52,78,0.08)',
                  transition: 'transform .2s, box-shadow .2s',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '4px 8px 20px rgba(9,52,78,0.15)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '2px 2px 8px rgba(9,52,78,0.08)' }}
                >
                  <div style={{ height: 180, overflow: 'hidden' }}>
                    <img src={p.img} alt={p.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '16px 18px' }}>
                    <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 15, color: '#09344e', marginBottom: 4 }}>{p.nombre}</div>
                    <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 12, color: '#5A6E77', lineHeight: 1.4 }}>{p.cargo}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.4}>
            <div style={{ textAlign: 'center', marginTop: 32 }}>
              <Link href="/marketing/agenda" style={{
                fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 600,
                color: '#097589', textDecoration: 'none',
                borderBottom: '2px solid #097589', paddingBottom: 2,
              }}>
                Ver todos los ponentes →
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── AGENDA RESUMIDA ───────────────────────────────────────────────── */}
      <section style={{ backgroundColor: '#fff', padding: '64px 48px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <span style={{
                fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 600,
                color: '#097589', letterSpacing: '0.1em', textTransform: 'uppercase',
                display: 'block', marginBottom: 8,
              }}>PROGRAMA</span>
              <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 28, color: '#09344e' }}>
                Agenda del congreso
              </h2>
            </div>
          </FadeIn>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 860, margin: '0 auto' }}>
            {AGENDA_ITEMS.map((item, i) => (
              <FadeIn key={item.hora} delay={i * 0.08}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 20,
                  backgroundColor: '#F7F6F3', borderRadius: 10,
                  padding: '16px 20px',
                  borderLeft: `4px solid ${TIPO_COLOR[item.tipo]}`,
                  transition: 'background .2s',
                }}
                  onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.backgroundColor = '#EFF4F7')}
                  onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.backgroundColor = '#F7F6F3')}
                >
                  <span style={{
                    fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 14,
                    color: '#097589', minWidth: 48, flexShrink: 0,
                  }}>{item.hora}</span>
                  <span style={{
                    fontFamily: 'Poppins, sans-serif', fontSize: 15, color: '#09344e', flex: 1,
                  }}>{item.titulo}</span>
                  <span style={{
                    backgroundColor: TIPO_COLOR[item.tipo],
                    color: '#fff', borderRadius: 999,
                    padding: '3px 12px',
                    fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 600,
                    flexShrink: 0,
                  }}>{item.tipo}</span>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.5}>
            <div style={{ textAlign: 'center', marginTop: 32 }}>
              <Link href="/marketing/agenda" className="btn-action-outline" style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 600,
                color: '#097589', textDecoration: 'none',
                border: '2px solid #097589', borderRadius: 999, padding: '11px 28px',
              }}>
                Ver agenda completa →
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── TESTIMONIOS ──────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: '#09344e', padding: '64px 48px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <FadeIn>
            <h2 style={{
              fontFamily: 'Gloock, Georgia, serif', fontWeight: 400, fontSize: 32,
              color: '#fff', textAlign: 'center', marginBottom: 40,
            }}>
              Voces del 2ICEO
            </h2>
          </FadeIn>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24,
          }} className="testimonials-grid">
            {TESTIMONIOS.map((t, i) => (
              <FadeIn key={t.nombre} delay={i * 0.15}>
                <div style={{
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  borderRadius: 12, padding: '28px 24px',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}>
                  <p style={{
                    fontFamily: 'Poppins, sans-serif', fontSize: 14, fontStyle: 'italic',
                    color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, marginBottom: 20,
                  }}>
                    "{t.texto}"
                  </p>
                  <div style={{
                    fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600, color: '#AEE5DA',
                  }}>{t.nombre}</div>
                  <div style={{
                    fontFamily: 'Poppins, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 2,
                  }}>{t.org}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOGOS PARTNERS ───────────────────────────────────────────────── */}
      <section style={{ backgroundColor: '#fff', padding: '48px 48px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <FadeIn>
            <p style={{
              fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 600,
              color: '#5A6E77', textAlign: 'center', letterSpacing: '0.1em',
              textTransform: 'uppercase', marginBottom: 28,
            }}>
              Organizaciones que hacen posible el 3ICEO
            </p>
          </FadeIn>
          <div style={{
            display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
            alignItems: 'center', gap: 32,
          }}>
            {LOGOS_PARTNERS.map(logo => (
              <div key={logo} style={{
                backgroundColor: '#F7F6F3', borderRadius: 8,
                padding: '12px 24px',
                fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600,
                color: '#5A6E77',
              }}>
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BANNER DONACIÓN ──────────────────────────────────────────────── */}
      <section style={{ backgroundColor: '#E6F3EE', padding: '64px 48px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
          <FadeIn>
            <h2 style={{
              fontFamily: 'Gloock, Georgia, serif', fontWeight: 400, fontSize: 'clamp(24px,3vw,36px)',
              color: '#09344e', marginBottom: 16,
            }}>
              ¡Gracias a ti, nadie se queda fuera!
            </h2>
            <p style={{
              fontFamily: 'Poppins, sans-serif', fontSize: 15, color: '#437287',
              lineHeight: 1.7, marginBottom: 28, maxWidth: 560, margin: '0 auto 28px',
            }}>
              Tu donación permite que organizaciones ambientales sin recursos puedan
              asistir al 3ICEO. El importe cubre alojamiento, transporte y dietas.
            </p>
            <Link href="/marketing/donaciones" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              backgroundColor: '#B53077', color: '#fff',
              fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 700,
              padding: '13px 32px', borderRadius: 999, textDecoration: 'none',
              letterSpacing: '0.04em',
              boxShadow: '0 2px 16px rgba(181,48,119,0.3)',
            }}>
              DONAR AHORA →
            </Link>
          </FadeIn>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid          { grid-template-columns: 1fr !important; }
          .speakers-grid      { grid-template-columns: 1fr 1fr !important; }
          .testimonials-grid  { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .speakers-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
