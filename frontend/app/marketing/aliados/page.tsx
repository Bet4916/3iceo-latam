'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

// ─── FADE-IN HELPER ──────────────────────────────────────────────────────────
function FadeIn({
  children,
  delay = 0,
  style,
  className,
}: {
  children: React.ReactNode
  delay?: number
  style?: React.CSSProperties
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── DATA ─────────────────────────────────────────────────────────────────────

/**
 * ORGANIZADORES — las instituciones que hacen posible el 3ICEO.
 * Descripciones extraídas de la referencia oficial del proyecto.
 */
const ORGANIZADORES = [
  {
    logo: '/icons/AWAQ_aliado.svg',
    name: 'Awaq ONGD',
    href: '#',
    desc: 'AWAQ es una organización de cooperación internacional que, desde 2019, se dedica al desarrollo de proyectos de investigación científica y conservación de ecosistemas en comunidades menos favorecidas. A través de Estaciones Biológicas, AWAQ implementa modelos económicos alternativos con el objetivo de mejorar la calidad de vida de los habitantes de estas comunidades.',
  },
  {
    logo: '/icons/humans_pro.svg',
    name: 'HumansPRO®',
    href: '#',
    desc: 'Como Ente de Acreditación Internacional, promovemos la confianza y la transparencia en los procesos de certificación, garantizando que nuestras acreditaciones reflejen competencia, excelencia y cumplimiento de estándares internacionales. Colaboramos con diversos sectores como industria, tecnología, educación y salud.',
  },
  {
    logo: '/icons/logo_uni_USB.svg',
    name: 'Universidad de San Buenaventura',
    href: '#',
    desc: 'La Universidad de San Buenaventura en Cali es una institución de educación superior que se distingue por su enfoque católico y franciscano, buscando la formación integral del ser humano y la transformación de la sociedad. Fue fundada por la comunidad Franciscana y ha contribuido al desarrollo de la educación colombiana desde su creación.',
  },
]

/**
 * SOCIOS COLABORADORES — aliados con rol activo en el 3ICEO.
 * 5 socios = 5 slides en el carousel.
 */
const SOCIOS = [
  {
    logo: '/icons/gob_valle_cauca.svg',
    isJpg: false,
    name: 'Gobernación del Valle del Cauca',
    desc: 'La Gobernación del Valle del Cauca es la máxima autoridad administrativa del departamento, encargada de implementar políticas y programas para el bienestar de la población. Su objetivo principal es promover el desarrollo integral, la prosperidad y el bienestar de los habitantes, así como la preservación de los valores culturales y patrimoniales.',
    href: '#',
  },
  {
    logo: '/icons/sc_uni_lasalle_utopia.svg',
    isJpg: false,
    name: 'Proyecto Utopía | Universidad de la Salle',
    desc: 'Este proyecto es un referente de transformación territorial y agroecología con sentido social. Su modelo educativo rural, orientado a la paz y la sostenibilidad, se alinea con el enfoque del ICEO de fortalecer redes que promuevan justicia ambiental y soluciones sostenibles desde los territorios.',
    href: '#',
  },
  {
    logo: '/icons/sc_proyecto_colombia.svg',
    isJpg: false,
    name: 'Proyectando Colombia',
    desc: 'El propósito de «Proyectando Colombia» es integrar las regiones, fortalecer la imagen de PMI® en el país y contribuir al desarrollo sostenible a través de la gestión de proyectos. Para lograr este objetivo, hemos diseñado cinco iniciativas estratégicas que abordan áreas clave de impacto.',
    href: '#',
  },
  {
    logo: '/icons/sc_sophic.svg',
    isJpg: false,
    name: 'SoPhIC',
    desc: 'La Sociedad de Doctores e Investigadores de Colombia (SoPhIC) es una asociación gremial colombiana sin ánimo de lucro, creada por doctores y doctorandos para integrar investigadores de todas las disciplinas académicas, a nivel nacional e internacional, y generar impacto social, económico y científico.',
    href: '#',
  },
  {
    logo: '/icons/sc_juanDcastellanos.jpg',
    isJpg: true,
    name: 'Fundación Universitaria Juan D Castellanos',
    desc: 'Desde Bollacá, se une al ICEO como aliada en la articulación entre academia, sostenibilidad y acción comunitaria. Su compromiso con el desarrollo rural y la conservación ambiental refuerza el propósito del Congreso de construir redes de conocimiento y transformación territorial.',
    href: '#',
  },
]

const SOCIAL_LINKS = [
  { icon: '/icons/icon_instagram.svg', label: 'Instagram', href: 'https://instagram.com/somosawaq' },
  { icon: '/icons/icon_facebook.svg',  label: 'Facebook',  href: 'https://facebook.com/somosawaq'  },
  { icon: '/icons/icon_linkedin.svg',  label: 'LinkedIn',  href: 'https://linkedin.com/company/somosawaq' },
]

// ─── SOCIOS CAROUSEL ─────────────────────────────────────────────────────────
// Muestra 1 card completa + cards parciales a los lados (peek ~12%).
// 5 socios = 5 dots. Se puede ampliar con más entradas en SOCIOS[].
function SociosCarousel() {
  const [current, setCurrent] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const total = SOCIOS.length

  const scrollTo = useCallback((idx: number) => {
    const next = Math.max(0, Math.min(idx, total - 1))
    setCurrent(next)
    const el = trackRef.current
    if (!el) return
    const card = el.children[next] as HTMLElement
    if (!card) return
    const containerW = el.clientWidth
    const cardW = card.offsetWidth
    const cardLeft = card.offsetLeft
    el.scrollTo({ left: cardLeft - (containerW - cardW) / 2, behavior: 'smooth' })
  }, [total])

  // Sync dots on manual scroll/drag
  const onScroll = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const containerW = el.clientWidth
    let best = 0, bestDist = Infinity
    Array.from(el.children).forEach((child, i) => {
      const c = child as HTMLElement
      const center = c.offsetLeft + c.offsetWidth / 2
      const dist = Math.abs(el.scrollLeft + containerW / 2 - center)
      if (dist < bestDist) { bestDist = dist; best = i }
    })
    setCurrent(best)
  }, [])

  return (
    <div style={{ position: 'relative' }}>

      {/* ── Track ────────────────────────────────────────────────────────── */}
      <div
        ref={trackRef}
        onScroll={onScroll}
        style={{
          display: 'flex',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
          gap: 20,
          /* Padding lateral: deja ver ~80px de la card adyacente */
          paddingInline: 'calc((100% - 75%) / 2)',
        }}
      >
        {SOCIOS.map((socio) => (
          <div
            key={socio.name}
            style={{
              flex: '0 0 75%',
              scrollSnapAlign: 'center',
            }}
          >
            <SocioCard socio={socio} />
          </div>
        ))}
      </div>

      {/* ── Prev arrow ───────────────────────────────────────────────────── */}
      {current > 0 && (
        <button
          onClick={() => scrollTo(current - 1)}
          aria-label="Anterior"
          style={{
            position: 'absolute', top: '50%', left: 0,
            transform: 'translateY(-50%)',
            width: 44, height: 44, borderRadius: '50%',
            backgroundColor: '#ffffff',
            border: '1.5px solid #C3DED9',
            boxShadow: '2px 2px 10px rgba(9,52,78,0.14)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', zIndex: 10,
            transition: 'border-color 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = '#097589'
            e.currentTarget.style.boxShadow = '2px 4px 14px rgba(9,52,78,0.22)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = '#C3DED9'
            e.currentTarget.style.boxShadow = '2px 2px 10px rgba(9,52,78,0.14)'
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11 4l-5 5 5 5" stroke="#09344e" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      {/* ── Next arrow ───────────────────────────────────────────────────── */}
      {current < total - 1 && (
        <button
          onClick={() => scrollTo(current + 1)}
          aria-label="Siguiente"
          style={{
            position: 'absolute', top: '50%', right: 0,
            transform: 'translateY(-50%)',
            width: 44, height: 44, borderRadius: '50%',
            backgroundColor: '#ffffff',
            border: '1.5px solid #C3DED9',
            boxShadow: '2px 2px 10px rgba(9,52,78,0.14)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', zIndex: 10,
            transition: 'border-color 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = '#097589'
            e.currentTarget.style.boxShadow = '2px 4px 14px rgba(9,52,78,0.22)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = '#C3DED9'
            e.currentTarget.style.boxShadow = '2px 2px 10px rgba(9,52,78,0.14)'
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M7 4l5 5-5 5" stroke="#09344e" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      {/* ── Dots ─────────────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 28 }}>
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Slide ${i + 1}`}
            style={{
              width: i === current ? 28 : 8,
              height: 8,
              borderRadius: 4,
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              backgroundColor: i === current ? '#097589' : '#BED1DA',
              transition: 'width 0.3s ease, background-color 0.3s ease',
            }}
          />
        ))}
      </div>

      <style suppressHydrationWarning>{`div::-webkit-scrollbar{display:none}`}</style>
    </div>
  )
}

// ─── SOCIO CARD ───────────────────────────────────────────────────────────────
// Logo centrado en contenedor con borde aqua (igual al Figma).
// Título navy, descripción Inter, link teal.
function SocioCard({ socio }: { socio: typeof SOCIOS[0] }) {
  return (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: 18,
      padding: '28px 28px 24px',
      boxShadow: '2px 2px 12px rgba(9,52,78,0.09)',
      display: 'flex',
      flexDirection: 'column',
      gap: 0,
      height: '100%',
      transition: 'box-shadow 0.22s, transform 0.22s',
    }}
      onMouseEnter={e => {
        const d = e.currentTarget as HTMLDivElement
        d.style.boxShadow = '2px 8px 24px rgba(9,52,78,0.15)'
        d.style.transform = 'translateY(-3px)'
      }}
      onMouseLeave={e => {
        const d = e.currentTarget as HTMLDivElement
        d.style.boxShadow = '2px 2px 12px rgba(9,52,78,0.09)'
        d.style.transform = 'translateY(0)'
      }}
    >
      {/* Logo container — borde aqua, fondo blanco cálido */}
      <div style={{
        width: '100%',
        height: 160,
        borderRadius: 12,
        border: '2px solid #AEE5DA',
        backgroundColor: '#F8FDFC',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        marginBottom: 20,
        overflow: 'hidden',
      }}>
        <img
          src={socio.logo}
          alt={socio.name}
          style={{
            maxWidth: '100%',
            maxHeight: '120px',
            objectFit: 'contain',
            display: 'block',
            borderRadius: socio.isJpg ? 8 : 0,
          }}
        />
      </div>

      {/* Texto */}
      <h3 style={{
        fontFamily: 'Poppins, sans-serif',
        fontSize: 18,
        fontWeight: 700,
        color: '#09344e',
        lineHeight: 1.25,
        marginBottom: 12,
      }}>
        {socio.name}
      </h3>

      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: 14,
        color: '#12303E',
        lineHeight: 1.7,
        flex: 1,
        marginBottom: 18,
      }}>
        {socio.desc}
      </p>

      {/* Saber más → con línea teal debajo */}
      <div>
        <a
          href={socio.href}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontFamily: 'Poppins, sans-serif',
            fontSize: 14,
            fontWeight: 600,
            color: '#097589',
            textDecoration: 'none',
            transition: 'gap 0.2s',
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.gap = '10px')}
          onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.gap = '6px')}
        >
          Saber más
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M10 5l3 3-3 3" stroke="#097589" strokeWidth="1.6"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
        <div style={{
          marginTop: 10,
          height: 1,
          backgroundColor: '#097589',
          opacity: 0.2,
          width: '100%',
        }} />
      </div>
    </div>
  )
}

// ─── ORGANIZER CARD ───────────────────────────────────────────────────────────
// Fiel al screenshot de referencia: logo grande con borde aqua arriba,
// título bold navy, descripción completa, "Saber más →".
function OrgCard({ org, delay = 0 }: { org: typeof ORGANIZADORES[0]; delay?: number }) {
  return (
    <FadeIn delay={delay} style={{ flex: '1 1 0', minWidth: 260, maxWidth: 340 }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: 18,
        padding: '24px 24px 26px',
        boxShadow: '2px 2px 10px rgba(9,52,78,0.08)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        transition: 'box-shadow 0.22s, transform 0.22s',
      }}
        onMouseEnter={e => {
          const d = e.currentTarget as HTMLDivElement
          d.style.boxShadow = '2px 8px 22px rgba(9,52,78,0.15)'
          d.style.transform = 'translateY(-4px)'
        }}
        onMouseLeave={e => {
          const d = e.currentTarget as HTMLDivElement
          d.style.boxShadow = '2px 2px 10px rgba(9,52,78,0.08)'
          d.style.transform = 'translateY(0)'
        }}
      >
        {/* Logo container — gran, con borde aqua */}
        <div style={{
          width: '100%',
          height: 148,
          borderRadius: 12,
          border: '2px solid #AEE5DA',
          backgroundColor: '#F8FDFC',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px 24px',
          marginBottom: 20,
          overflow: 'hidden',
        }}>
          <img
            src={org.logo}
            alt={org.name}
            style={{
              maxWidth: '100%',
              maxHeight: '100px',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </div>

        <h3 style={{
          fontFamily: 'Poppins, sans-serif',
          fontSize: 17,
          fontWeight: 700,
          color: '#09344e',
          lineHeight: 1.25,
          marginBottom: 12,
        }}>
          {org.name}
        </h3>

        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 13.5,
          color: '#12303E',
          lineHeight: 1.7,
          flex: 1,
          marginBottom: 16,
        }}>
          {org.desc}
        </p>

        <a
          href={org.href}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontFamily: 'Poppins, sans-serif',
            fontSize: 13.5,
            fontWeight: 600,
            color: '#097589',
            textDecoration: 'none',
            transition: 'gap 0.2s',
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.gap = '10px')}
          onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.gap = '6px')}
        >
          Saber más
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M10 5l3 3-3 3" stroke="#097589" strokeWidth="1.6"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </FadeIn>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function AliadosPage() {
  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>

      {/* ════════════════════════════════════════════════════════════════════
          1. HERO — "Aliados"
          Blanco, título Georgia grande, subtítulo, imagen derecha con blob.
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ paddingTop: 88, backgroundColor: '#ffffff' }}>
        <div className="container-brand" style={{ padding: '52px 48px 0' }}>
          <div className="hero-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: 56,
            alignItems: 'center',
          }}>
            {/* Texto izquierda */}
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
                fontSize: 'clamp(42px, 5.5vw, 66px)',
                fontWeight: 700, color: '#09344e',
                lineHeight: 1.05, marginBottom: 20, letterSpacing: '-0.01em',
              }}>
                Aliados
              </h1>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: 16,
                color: '#5A6E77', lineHeight: 1.7, maxWidth: 440, marginBottom: 32,
              }}>
                Construimos redes de conocimiento y acción colectiva junto a organizaciones,
                instituciones y comunidades comprometidas con la sostenibilidad ambiental
                de Latinoamérica.
              </p>
              <Link href="/marketing/registro" className="btn-cta"
                style={{ fontSize: 13, letterSpacing: '0.05em' }}>
                QUIERO ASISTIR →
              </Link>
            </FadeIn>

            {/* Imagen decorativa derecha */}
            <FadeIn delay={0.12}>
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <div style={{
                  position: 'absolute', bottom: -20, right: -20,
                  width: 240, height: 170, borderRadius: 18,
                  background: 'linear-gradient(135deg, #8CCDFF 0%, #4886B5 100%)',
                  opacity: 0.3, zIndex: 0,
                }} />
                <div style={{
                  position: 'relative', zIndex: 1,
                  width: 380, height: 236, borderRadius: 20,
                  overflow: 'hidden',
                  boxShadow: '4px 4px 28px rgba(9,52,78,0.16)',
                  background: 'linear-gradient(135deg, #E6F3EE 0%, #AEE5DA 45%, #097589 100%)',
                }}>
                  <img src="/icons/aliados.svg" alt="Red de aliados AWAQ"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* ── Wave blanca → #F0F4F7 ── */}
        <div style={{ marginTop: 56, lineHeight: 0 }}>
          <svg viewBox="0 0 1440 64" preserveAspectRatio="none"
            style={{ width: '100%', height: 64, display: 'block' }}>
            <path d="M0,0 C180,64 360,0 540,40 C720,64 900,8 1080,44 C1260,64 1380,20 1440,36 L1440,64 L0,64 Z"
              fill="#F0F4F7" />
          </svg>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          2. ORGANIZADORES
          Fondo #F0F4F7, 3 tarjetas blancas en fila.
          Cada tarjeta: logo grande con borde aqua, título, descripción, link.
          Igual al screenshot de referencia Image 1.
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#F0F4F7', padding: '72px 48px 80px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>

          <FadeIn>
            <h2 style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 'clamp(24px, 2.8vw, 32px)',
              fontWeight: 700, color: '#09344e',
              lineHeight: 1.2, textAlign: 'center', marginBottom: 44,
            }}>
              Organizadores
            </h2>
          </FadeIn>

          <div className="org-row" style={{
            display: 'flex',
            gap: 24,
            justifyContent: 'center',
            alignItems: 'stretch',
            flexWrap: 'wrap',
          }}>
            {ORGANIZADORES.map((org, i) => (
              <OrgCard key={org.name} org={org} delay={i * 0.09} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Wave #F0F4F7 → blanca ── */}
      <div style={{ lineHeight: 0, backgroundColor: '#F0F4F7' }}>
        <svg viewBox="0 0 1440 56" preserveAspectRatio="none"
          style={{ width: '100%', height: 56, display: 'block' }}>
          <path d="M0,56 C240,0 480,56 720,28 C960,0 1200,48 1440,20 L1440,56 L0,56 Z"
            fill="#ffffff" />
        </svg>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          3. SOCIOS COLABORADORES — Carousel
          Fondo blanco, 1 card completa + parciales a los lados.
          Botones prev/next + dots. Al agregar socios en SOCIOS[], escala solo.
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#ffffff', padding: '72px 0 80px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>

          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 52, padding: '0 48px' }}>
              <h2 style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(24px, 2.8vw, 32px)',
                fontWeight: 700, color: '#09344e',
                lineHeight: 1.2, marginBottom: 12,
              }}>
                Socios Colaboradores
              </h2>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: 15,
                color: '#5A6E77', lineHeight: 1.7, maxWidth: 540, margin: '0 auto',
              }}>
                Organizaciones, instituciones académicas y entidades que nos acompañan
                activamente en la construcción del 3ICEO.
              </p>
            </div>
          </FadeIn>

          {/* Carousel con 44px de margen para las flechas */}
          <div style={{ padding: '0 44px', position: 'relative' }}>
            <SociosCarousel />
          </div>
        </div>
      </section>

      {/* ── Wave blanca → aqua pálido ── */}
      <div style={{ lineHeight: 0 }}>
        <svg viewBox="0 0 1440 56" preserveAspectRatio="none"
          style={{ width: '100%', height: 56, display: 'block' }}>
          <path d="M0,0 C360,56 720,0 1080,40 C1260,56 1380,16 1440,32 L1440,56 L0,56 Z"
            fill="#E6F3EE" />
        </svg>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          4. DONACIÓN CTA
          Fondo aqua pálido (#E6F3EE), texto izquierda + planta derecha.
          Imagen planta_donacion.svg con acento teal detrás.
          Igual al screenshot Image 3 de referencia.
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#E6F3EE', padding: '72px 48px 80px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="donacion-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 64,
            alignItems: 'center',
          }}>

            {/* Izquierda — texto */}
            <FadeIn>
              <h2 style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(26px, 3vw, 38px)',
                fontWeight: 700, color: '#09344e',
                lineHeight: 1.2, marginBottom: 20,
              }}>
                ¡Gracias a tu donación, nadie se queda fuera!
              </h2>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: 15,
                color: '#12303E', lineHeight: 1.7, marginBottom: 14,
              }}>
                Tu ayuda permitirá que organizaciones ambientales que no cuentan con
                recursos puedan asistir al 3ICEO y formar parte de un espacio de
                aprendizaje, conexión y colaboración única.
              </p>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: 15,
                color: '#12303E', lineHeight: 1.7, marginBottom: 32,
              }}>
                El importe irá íntegramente destinado a cubrir alojamiento, transporte y dietas.
              </p>
              <Link
                href="/marketing/donaciones"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  backgroundColor: '#B53077', color: '#ffffff',
                  fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 700,
                  padding: '13px 30px', borderRadius: 999,
                  textDecoration: 'none', letterSpacing: '0.05em',
                  boxShadow: '0 2px 16px rgba(181,48,119,0.3)',
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
                DONA AHORA
              </Link>
            </FadeIn>

            {/* Derecha — imagen planta con acento aqua detrás */}
            <FadeIn delay={0.14}>
              <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                {/* Acento aqua/teal detrás (como en el screenshot) */}
                <div style={{
                  position: 'absolute',
                  top: 16, right: -10,
                  width: '88%', height: '88%',
                  borderRadius: 18,
                  backgroundColor: '#AEE5DA',
                  zIndex: 0,
                }} />
                <div style={{
                  position: 'relative', zIndex: 1,
                  borderRadius: 18,
                  overflow: 'hidden',
                  boxShadow: '4px 4px 24px rgba(9,52,78,0.15)',
                  maxWidth: 480,
                  width: '100%',
                }}>
                  <img
                    src="/icons/planta_donacion.svg"
                    alt="Donación"
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Wave aqua pálido → blanca ── */}
      <div style={{ lineHeight: 0, backgroundColor: '#E6F3EE' }}>
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none"
          style={{ width: '100%', height: 48, display: 'block' }}>
          <path d="M0,48 C360,0 720,48 1080,20 C1260,8 1380,40 1440,24 L1440,48 L0,48 Z"
            fill="#ffffff" />
        </svg>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          5. FOLLOW US
          Fondo blanco, follow.svg izquierda, texto + redes sociales derecha.
          Igual al screenshot Image 3 de referencia (layout blanco/claro).
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#ffffff', padding: '72px 48px 80px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="follow-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gap: 64,
            alignItems: 'center',
          }}>

            {/* Izquierda — imagen Follow */}
            <FadeIn>
              <img
                src="/icons/follow.svg"
                alt="Follow us on social media"
                style={{
                  width: 260,
                  height: 'auto',
                  display: 'block',
                  flexShrink: 0,
                  filter: 'drop-shadow(0 4px 16px rgba(9,52,78,0.12))',
                }}
              />
            </FadeIn>

            {/* Derecha — texto + redes */}
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
                  color: '#5A6E77', lineHeight: 1.7, marginBottom: 28, maxWidth: 460,
                }}>
                  Publicamos contenido a cerca de la labor que hacemos, podrás conocer
                  nuestros proyectos y a nosotros más a fondo.
                </p>

                {/* Social links — íconos + texto en línea, como en el screenshot */}
                <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'center' }}>
                  {SOCIAL_LINKS.map(s => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        fontFamily: 'Inter, sans-serif',
                        fontSize: 15,
                        fontWeight: 500,
                        color: '#09344e',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLAnchorElement).style.color = '#097589'
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLAnchorElement).style.color = '#09344e'
                      }}
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
        @media (max-width: 1024px) {
          .donacion-grid { grid-template-columns: 1fr !important; }
          .donacion-grid > div:last-child { display: none !important; }
        }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-grid > div:last-child { display: none !important; }
          .follow-grid { grid-template-columns: 1fr !important; }
          .follow-grid > div:first-child { display: none !important; }
          .org-row { flex-direction: column !important; align-items: center !important; }
          .org-row > * { max-width: 100% !important; width: 100% !important; }
        }
      `}</style>
    </div>
  )
}
