'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  IconLocation,
  IconPDF,
  IconExternalLink,
  IconLinkedin,
  IconInstagram,
  IconFacebook,
} from '@/components/ui/icons'

// ─── ANIMATION HELPER ─────────────────────────────────────────────────────────
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
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      style={style}
    >
      {children}
    </motion.div>
  )
}

// ─── HELPER: Icono desde /public/icons ────────────────────────────────────────
function Ico({
  src,
  size = 22,
  style,
}: {
  src: string
  size?: number
  style?: React.CSSProperties
}) {
  return (
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      style={{ display: 'block', flexShrink: 0, ...style }}
    />
  )
}

// ─── DATOS ────────────────────────────────────────────────────────────────────
// ✅ CAMBIO: emojis reemplazados por imágenes oficiales instalaciones_N.svg
const INSTALACIONES = [
  { label: 'Auditorio Central',    bg: 'linear-gradient(135deg,#09344e 0%,#1C495C 100%)', imgSrc: '/icons/instalaciones_1.svg' },
  { label: 'Auditorio 103 B Lago', bg: 'linear-gradient(135deg,#097589 0%,#03A383 100%)', imgSrc: '/icons/instalaciones_2.svg' },
  { label: 'Auditorio 108 Lago',   bg: 'linear-gradient(135deg,#4886B5 0%,#097589 100%)', imgSrc: '/icons/instalaciones_3.svg' },
  { label: 'Auditorio 103 A Lago', bg: 'linear-gradient(135deg,#12303E 0%,#437287 100%)', imgSrc: '/icons/instalaciones_4.svg' },
]

// ✅ CAMBIO: emojis fallback reemplazados por SVGs oficiales de la sede
const SERVICIOS = [
  { label: 'Cafetería',          icon: '/icons/sede_food.svg'       },
  { label: 'Parking gratuito',   icon: '/icons/sede_parking.svg'    },
  { label: 'Equipos multimedia', icon: '/icons/sede_multimedia.svg' },
  { label: 'Accesos adaptados',  icon: '/icons/sede_wheelchair.svg' },
  { label: 'Wifi gratuito',      icon: '/icons/sede_wifi.svg'       },
  { label: 'Áreas de descanso',  icon: '/icons/sede_highway.svg'    },
]

const ESPACIOS_MAP = [
  'Edificio Los Cerezos',
  'Edificio Horizontes – Cafetería Central',
  'Edificio Las Palmas – Minimarket',
  'Biblioteca',
  'Edificio El Cedro',
  'Edificio El Lago',
  'Cancha Reglamentaria FIFA',
  'Piscina',
  'Parqueadero Visitantes',
  'Paradero MIO',
]

const SOCIAL = [
  { Icon: IconInstagram, href: 'https://instagram.com/awaqong',          label: 'Instagram', iconSrc: '/icons/icon_instagram.svg' },
  { Icon: IconFacebook,  href: 'https://facebook.com/awaqong',           label: 'Facebook',  iconSrc: '/icons/icon_facebook.svg'  },
  { Icon: IconLinkedin,  href: 'https://linkedin.com/company/awaq-ong',  label: 'LinkedIn',  iconSrc: '/icons/icon_linkedin.svg'  },
]

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function UniversidadPage() {
  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>

      {/* ══════════════════════════════════════════════════════════════════
          HERO
          ✅ CAMBIO 1: imagen más visible — opacity subida de 0.22 → 0.55
                       overlay más suave de 0.92/0.4 → 0.55/0.15
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', minHeight: 420, overflow: 'hidden' }}>
        {/* Imagen de fondo — más visible ahora */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg,#09344e 0%,#1C495C 60%,#437287 100%)',
        }}>
          {/* Reemplaza con: <Image src="/images/san-buenaventura-hero.jpg" fill style={{objectFit:'cover',opacity:.55}} alt="" /> */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'url(https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=1400&q=75) center/cover',
            opacity: 0.55, /* ← era 0.22, ahora se ve bien la imagen */
          }} />
        </div>

        {/* Overlay degradado para legibilidad — más suave para que se vea la imagen */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg,rgba(9,52,78,0.55) 45%,rgba(9,52,78,0.15) 100%)',
          /* ← era rgba(9,52,78,0.92) y rgba(9,52,78,0.4) — ahora la imagen se ve */
        }} />

        <div className="container-brand" style={{
          position: 'relative', zIndex: 1,
          padding: '140px 48px 60px',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            style={{ maxWidth: 540 }}
          >
            {/* Badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              backgroundColor: 'rgba(9,117,137,0.20)',
              border: '1px solid rgba(9,117,137,0.45)',
              borderRadius: 999, padding: '5px 14px', marginBottom: 16,
            }}>
              <IconLocation size={12} color="#AEE5DA" />
              <span style={{
                fontFamily: 'Poppins, sans-serif', fontSize: 10, fontWeight: 600,
                color: '#AEE5DA', textTransform: 'uppercase', letterSpacing: '0.1em',
              }}>
                Universidad de San Buenaventura · Cali
              </span>
            </div>

            <h1 style={{
              fontFamily: 'Gloock, Georgia, serif',
              fontSize: 'clamp(32px, 4.5vw, 54px)',
              fontWeight: 400, color: '#fff', lineHeight: 1.12, marginBottom: 16,
            }}>
              Sede del evento
            </h1>

            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: 15,
              color: 'rgba(255,255,255,0.75)', lineHeight: 1.75, marginBottom: 28,
            }}>
              Conoce el entorno e instalaciones de la universidad donde nos reuniremos
              para celebrar este encuentro.
            </p>

            <Link href="/marketing/registro" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              backgroundColor: '#B53077', color: '#fff',
              fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 700,
              padding: '12px 28px', borderRadius: 999, textDecoration: 'none',
              letterSpacing: '0.04em', textTransform: 'uppercase',
              boxShadow: '0 4px 20px rgba(181,48,119,0.35)',
            }}>
              Quiero Asistir →
            </Link>
          </motion.div>
        </div>

        {/* Wave */}
        <div style={{ position: 'relative', zIndex: 1, lineHeight: 0 }}>
          <svg viewBox="0 0 1440 48" preserveAspectRatio="none"
            style={{ width: '100%', height: 48, display: 'block' }}>
            <path d="M0,28 C480,50 960,5 1440,28 L1440,48 L0,48 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          LAS INSTALACIONES
          ✅ CAMBIO: emojis 🏛️🎭🎓📚 → instalaciones_1-4.svg
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#fff', padding: '72px 0 64px' }}>
        <div className="container-brand" style={{ padding: '0 48px' }}>
          <FadeIn>
            <h2 style={{
              fontFamily: 'Poppins, sans-serif', fontSize: 28, fontWeight: 600,
              color: '#09344e', textAlign: 'center', marginBottom: 10,
            }}>
              Las instalaciones
            </h2>
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: 15,
              color: '#5A6E77', lineHeight: 1.75, textAlign: 'center',
              maxWidth: 640, margin: '0 auto 40px',
            }}>
              Contaremos con cuatro espacios estratégicamente distribuidos entre auditorios
              y espacios de trabajo participativo, ideales para la circulación, el aprendizaje
              colaborativo y el intercambio de experiencias ambientales.
            </p>
          </FadeIn>

          {/* Grid de auditorios */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 16, marginBottom: 16,
          }} className="inst-grid">
            {INSTALACIONES.map((inst, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div style={{
                  borderRadius: 12, overflow: 'hidden',
                  boxShadow: '2px 2px 8px rgba(9,52,78,0.10)',
                  transition: 'transform .2s, box-shadow .2s',
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'
                    ;(e.currentTarget as HTMLDivElement).style.boxShadow = '4px 12px 24px rgba(9,52,78,0.18)'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
                    ;(e.currentTarget as HTMLDivElement).style.boxShadow = '2px 2px 8px rgba(9,52,78,0.10)'
                  }}
                >
                  {/* ✅ imagen SVG oficial en lugar de emoji */}
                  <div style={{
                    background: inst.bg, aspectRatio: '4/3',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    overflow: 'hidden',
                  }}>
                    <img
                      src={inst.imgSrc}
                      alt={inst.label}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Labels */}
          <FadeIn>
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: 12,
              color: '#5A6E77', textAlign: 'center', letterSpacing: '0.02em',
            }}>
              {INSTALACIONES.map(i => i.label).join('  ·  ')}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SERVICIOS DISPONIBLES
          ✅ CAMBIO: emojis 🍽️🅿️📽️♿📶🛋️ → SVGs oficiales sede_*.svg
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#F7F6F3', padding: '72px 0' }}>
        <div className="container-brand" style={{ padding: '0 48px' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: 60, alignItems: 'center',
          }} className="servicios-grid">

            <FadeIn>
              <h2 style={{
                fontFamily: 'Poppins, sans-serif', fontSize: 26, fontWeight: 600,
                color: '#09344e', marginBottom: 16,
              }}>
                Servicios disponibles
              </h2>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: 14,
                color: '#5A6E77', lineHeight: 1.8,
              }}>
                Los principales auditorios del Congreso están dotados con equipamiento
                multimedia de última generación y conectividad Wi-Fi estable y gratuita
                para todos los asistentes. Estos espacios están diseñados para ofrecer
                comodidad y accesibilidad, con rutas de acceso señalizadas, zonas de
                parqueo cercanas y áreas de descanso disponibles para facilitar la
                participación continua. Todos los auditorios cuentan con acceso adaptado
                para personas con movilidad reducida.
              </p>
            </FadeIn>

            {/* Servicios grid 3x2 */}
            <FadeIn delay={0.12}>
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 16,
              }}>
                {SERVICIOS.map((svc, i) => (
                  <div key={i} style={{
                    backgroundColor: '#fff', borderRadius: 12,
                    padding: '18px 16px',
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    gap: 10, textAlign: 'center',
                    boxShadow: '2px 2px 8px rgba(9,52,78,0.07)',
                    border: '1px solid #D9DEE2',
                  }}>
                    {/* ✅ SVG oficial en lugar de emoji */}
                    <div style={{
                      width: 44, height: 44, borderRadius: 10,
                      backgroundColor: '#E6F3EE',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <img
                        src={svc.icon}
                        alt=""
                        width={24}
                        height={24}
                        style={{ display: 'block', objectFit: 'contain' }}
                      />
                    </div>
                    <span style={{
                      fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 600,
                      color: '#12303E', lineHeight: 1.3,
                    }}>
                      {svc.label}
                    </span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          MARKETPLACE / EXHIBICIÓN
          ✅ CAMBIO: emoji 🌿 → market_ex.svg
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#fff', padding: '72px 0' }}>
        <div className="container-brand" style={{ padding: '0 48px' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: 60, alignItems: 'center',
          }} className="marketplace-grid">

            {/* ✅ Imagen marketplace_ex.svg oficial */}
            <FadeIn>
              <div style={{
                borderRadius: 14, overflow: 'hidden', aspectRatio: '4/3',
                boxShadow: '4px 4px 24px rgba(9,52,78,0.12)',
              }}>
                <img
                  src="/icons/market_ex.svg"
                  alt="Marketplace del congreso"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </FadeIn>

            <FadeIn delay={0.12}>
              <span style={{
                fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 600,
                color: '#097589', letterSpacing: '0.1em', textTransform: 'uppercase',
                display: 'block', marginBottom: 12,
              }}>
                MARKETPLACE
              </span>
              <h2 style={{
                fontFamily: 'Poppins, sans-serif', fontSize: 26, fontWeight: 600,
                color: '#09344e', marginBottom: 14, lineHeight: 1.3,
              }}>
                Espacio para la exhibición y venta de productos y servicios
              </h2>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: 14,
                color: '#5A6E77', lineHeight: 1.8, marginBottom: 24,
              }}>
                El evento contará con espacios dedicados a la exposición y venta de
                iniciativas sostenibles. Descubre todos los proyectos y propuestas
                en nuestro marketplace.
              </p>
              <Link href="/marketing/marketplace" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                backgroundColor: '#097589', color: '#fff',
                fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 700,
                padding: '11px 24px', borderRadius: 999, textDecoration: 'none',
                letterSpacing: '0.04em', textTransform: 'uppercase',
              }}>
                Ver Marketplace →
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Wave into dark */}
      <div style={{ lineHeight: 0 }}>
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none"
          style={{ width: '100%', height: 48, display: 'block' }}>
          <path d="M0,24 C360,48 1080,0 1440,24 L1440,48 L0,48 Z" fill="#09344e" />
        </svg>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          CONOCE EL LUGAR — Universidad + Video
          ✅ CAMBIO: video placeholder → iframe YouTube real
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#09344e', padding: '72px 0' }}>
        <div className="container-brand" style={{ padding: '0 48px' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1.2fr',
            gap: 60, alignItems: 'center',
          }} className="conoce-grid">

            <FadeIn>
              <span style={{
                fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 600,
                color: '#AEE5DA', letterSpacing: '0.1em', textTransform: 'uppercase',
                display: 'block', marginBottom: 12,
              }}>
                CONOCE EL LUGAR
              </span>
              <h2 style={{
                fontFamily: 'Gloock, Georgia, serif', fontSize: 32,
                fontWeight: 400, color: '#fff', marginBottom: 16, lineHeight: 1.2,
              }}>
                Universidad de San Buenaventura
              </h2>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: 14,
                color: 'rgba(255,255,255,0.72)', lineHeight: 1.8, marginBottom: 28,
              }}>
                Reconocida por su enfoque humanista y su vínculo con el territorio.
                Un campus universitario ideal para encuentros que promueven la
                colaboración y acción ambiental. Un lugar que impulsa la reflexión,
                la cooperación y la acción conjunta.
              </p>
              <Link href="/marketing/registro" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                backgroundColor: '#B53077', color: '#fff',
                fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 700,
                padding: '12px 26px', borderRadius: 999, textDecoration: 'none',
                letterSpacing: '0.04em', textTransform: 'uppercase',
                boxShadow: '0 4px 16px rgba(181,48,119,0.35)',
              }}>
                Quiero Asistir →
              </Link>
            </FadeIn>

            {/* ✅ Video real de YouTube en lugar del placeholder con play button */}
            <FadeIn delay={0.12}>
              <div style={{
                borderRadius: 14, overflow: 'hidden',
                aspectRatio: '16/9',
                boxShadow: '8px 8px 32px rgba(0,0,0,0.3)',
                position: 'relative',
              }}>
                <iframe
                  src="https://www.youtube.com/embed/4mfOQ3PeFvI"
                  title="Universidad de San Buenaventura — Sede del 3° ICEO LATAM"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    position: 'absolute', top: 0, left: 0,
                    width: '100%', height: '100%',
                    border: 'none', display: 'block',
                  }}
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Wave out dark */}
      <div style={{ lineHeight: 0, backgroundColor: '#09344e' }}>
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none"
          style={{ width: '100%', height: 48, display: 'block' }}>
          <path d="M0,24 C480,48 960,0 1440,24 L1440,48 L0,48 Z" fill="#F7F6F3" />
        </svg>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          UBICACIÓN
          ✅ CAMBIO: emoji 🏔️ → ubicacion.svg | emoji 🎓 → logo_uni.svg
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#F7F6F3', padding: '72px 0' }}>
        <div className="container-brand" style={{ padding: '0 48px' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: 60, alignItems: 'center',
          }} className="ubicacion-grid">

            {/* ✅ ubicacion.svg en lugar de emoji 🏔️ */}
            <FadeIn>
              <div style={{
                borderRadius: 14, overflow: 'hidden', aspectRatio: '4/3',
                boxShadow: '4px 4px 24px rgba(9,52,78,0.12)',
              }}>
                <img
                  src="/icons/ubicacion.svg"
                  alt="Mapa de ubicación Universidad de San Buenaventura"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </FadeIn>

            <FadeIn delay={0.12}>
              {/* ✅ logo_uni.svg en lugar de emoji 🎓 */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                backgroundColor: '#fff', border: '1px solid #D9DEE2',
                borderRadius: 8, padding: '6px 14px', marginBottom: 20,
                boxShadow: '2px 2px 8px rgba(9,52,78,0.07)',
              }}>
                <img
                  src="/icons/logo_uni_USB.svg"
                  alt="Universidad de San Buenaventura"
                  height={20}
                  style={{ display: 'block', objectFit: 'contain', maxWidth: 120 }}
                />
              </div>

              <h2 style={{
                fontFamily: 'Poppins, sans-serif', fontSize: 24, fontWeight: 600,
                color: '#09344e', marginBottom: 14,
              }}>
                Ubicación
              </h2>

              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: 14,
                color: '#5A6E77', lineHeight: 1.8, marginBottom: 20,
              }}>
                Universidad de San Buenaventura, Cali — Ubicada en una zona céntrica
                y de fácil acceso, donde podrás acceder fácilmente desde las avenidas
                principales de la ciudad, como la Carrera 122 y la Calle 10, en la
                zona universitaria de la Avenida Cañasgordas.
              </p>

              <div style={{
                display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24,
              }}>
                <IconLocation size={16} color="#097589" />
                <span style={{
                  fontFamily: 'Inter, sans-serif', fontSize: 13,
                  color: '#097589', fontWeight: 500,
                }}>
                  C/Doctor Torres Navas 35, Cali 76110
                </span>
              </div>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a
                  href="https://www.usbcali.edu.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 600,
                    color: '#097589', textDecoration: 'none',
                    borderBottom: '1.5px solid #097589', paddingBottom: 2,
                  }}
                >
                  Ir al sitio de la universidad
                  <IconExternalLink size={13} color="#097589" />
                </a>

                <a
                  href="https://maps.google.com/?q=Universidad+San+Buenaventura+Cali"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    backgroundColor: '#097589', color: '#fff',
                    fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 700,
                    padding: '10px 20px', borderRadius: 999, textDecoration: 'none',
                    letterSpacing: '0.04em', textTransform: 'uppercase',
                  }}
                >
                  <IconLocation size={14} color="white" />
                  Ver en el mapa
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          PLANO DEL ESPACIO
          ✅ CAMBIO: SVG placeholder → ubicacion.svg | PDF → mapa_uni.pdf
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#fff', padding: '72px 0' }}>
        <div className="container-brand" style={{ padding: '0 48px' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1.4fr',
            gap: 56, alignItems: 'center',
          }} className="plano-grid">

            <FadeIn>
              <h2 style={{
                fontFamily: 'Poppins, sans-serif', fontSize: 26, fontWeight: 600,
                color: '#09344e', marginBottom: 12,
              }}>
                Plano del espacio
              </h2>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: 14,
                color: '#5A6E77', lineHeight: 1.8, marginBottom: 24,
              }}>
                ¡Consulta el mapa de las instalaciones y llévalo contigo para no perderte!
              </p>

              {/* Lista de espacios */}
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr',
                gap: '6px 20px', marginBottom: 28,
              }}>
                {ESPACIOS_MAP.map((esp, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#5A6E77',
                    padding: '4px 0',
                  }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                      backgroundColor: '#097589',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'Poppins, sans-serif', fontSize: 9, fontWeight: 700,
                      color: '#fff',
                    }}>
                      {i + 1}
                    </div>
                    {esp}
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {/* ✅ PDF real mapa_uni.pdf */}
                <a href="/icons/mapa_uni.pdf" target="_blank" rel="noopener noreferrer" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  border: '1.5px solid #D9DEE2', color: '#12303E',
                  fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 700,
                  padding: '10px 20px', borderRadius: 999, textDecoration: 'none',
                  backgroundColor: '#fff', letterSpacing: '0.04em', textTransform: 'uppercase',
                }}>
                  <IconPDF size={16} color="#097589" />
                  Descargar Plano PDF
                </a>
                <a
                  href="/icons/mapa_uni.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    backgroundColor: '#097589', color: '#fff',
                    fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 700,
                    padding: '10px 20px', borderRadius: 999, textDecoration: 'none',
                    letterSpacing: '0.04em', textTransform: 'uppercase',
                  }}
                >
                  Ver Plano
                </a>
              </div>
            </FadeIn>

            {/* ✅ ubicacion.svg en lugar del SVG mapa placeholder */}
            <FadeIn delay={0.12}>
              <div style={{
                borderRadius: 14, overflow: 'hidden',
                boxShadow: '4px 8px 32px rgba(9,52,78,0.12)',
                border: '1px solid #D9DEE2',
              }}>
                <img
                  src="/icons/sede_vista_acortada.svg"
                  alt="Plano Universidad de San Buenaventura Cali"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          DONACIÓN
          ✅ CAMBIO: emoji 🌱 → market_ex.svg
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{
        background: 'linear-gradient(135deg,#09344e 0%,#1C495C 100%)',
        padding: '80px 0', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: -60, right: -60, width: 340, height: 340,
          borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(9,117,137,0.18) 0%,transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="container-brand" style={{ padding: '0 48px' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: 60, alignItems: 'center',
          }} className="donacion-grid">

            <FadeIn>
              <h2 style={{
                fontFamily: 'Poppins, sans-serif', fontSize: 30, fontWeight: 700,
                color: '#fff', marginBottom: 14, lineHeight: 1.25,
              }}>
                ¡Gracias a tu donación,<br />nadie se queda fuera!
              </h2>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: 14,
                color: 'rgba(255,255,255,0.72)', lineHeight: 1.8, marginBottom: 10,
              }}>
                Tu ayuda permite que organizaciones ambientales sin recursos puedan
                asistir al 3° ICEO y formar parte de un espacio de aprendizaje,
                conexión y colaboración único.
              </p>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: 12,
                color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, marginBottom: 28,
              }}>
                El importe irá íntegramente destinado a cubrir alojamiento, transporte y dietas.
              </p>
              <Link href="/marketing/donaciones" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                backgroundColor: '#B53077', color: '#fff',
                fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 700,
                padding: '13px 32px', borderRadius: 999, textDecoration: 'none',
                letterSpacing: '0.04em', textTransform: 'uppercase',
                boxShadow: '0 4px 20px rgba(181,48,119,0.35)',
              }}>
                Dona ahora →
              </Link>
            </FadeIn>

            {/* ✅ market_ex.svg en lugar de emoji 🌱 */}
            <FadeIn delay={0.15}>
              <div style={{
                borderRadius: 14, overflow: 'hidden', aspectRatio: '4/3',
                boxShadow: '8px 8px 40px rgba(0,0,0,0.3)',
              }}>
                <img
                  src="/icons/planta_donacion.svg"
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          REDES SOCIALES
          ✅ CAMBIO 1: emojis 📸👍💼 → icon_instagram/facebook/linkedin.svg
          ✅ CAMBIO 2: texto "FOLLOW US!" eliminado → follow.svg ya lo tiene
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#F7F6F3', padding: '80px 0' }}>
        <div className="container-brand" style={{ padding: '0 48px' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: 48, alignItems: 'center',
          }} className="follow-grid">

            <FadeIn>
              <h3 style={{
                fontFamily: 'Poppins, sans-serif', fontSize: 24, fontWeight: 700,
                color: '#09344e', marginBottom: 12, lineHeight: 1.3,
              }}>
                ¡Pásate por nuestras Redes Sociales y síguenos!
              </h3>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: 14,
                color: '#5A6E77', lineHeight: 1.75, marginBottom: 28,
              }}>
                Publicamos contenido acerca de la labor que hacemos, podrás conocer
                proyectos y a nosotros más a fondo.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 300 }}>
                {[
                  { label: 'Instagram', bg: '#E1306C', href: 'https://instagram.com/awaqong',         iconSrc: '/icons/icon_instagram.svg' },
                  { label: 'Facebook',  bg: '#1877F2', href: 'https://facebook.com/awaqong',          iconSrc: '/icons/icon_facebook.svg'  },
                  { label: 'LinkedIn',  bg: '#0A66C2', href: 'https://linkedin.com/company/awaq-ong', iconSrc: '/icons/icon_linkedin.svg'  },
                ].map(({ label, bg, href, iconSrc }) => (
                  <Link key={label} href={href} target="_blank" rel="noopener noreferrer" style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    backgroundColor: '#fff', border: '1.5px solid #D9DEE2',
                    borderRadius: 10, padding: '12px 18px',
                    textDecoration: 'none',
                    boxShadow: '2px 2px 8px rgba(9,52,78,0.06)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      {/* ✅ Icono SVG oficial en lugar de emoji */}
                      <div style={{
                        width: 34, height: 34, borderRadius: 8,
                        backgroundColor: bg,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <img
                          src={iconSrc}
                          alt={label}
                          width={18}
                          height={18}
                          style={{ display: 'block', filter: 'brightness(0) invert(1)' }}
                        />
                      </div>
                      <span style={{
                        fontFamily: 'Poppins, sans-serif', fontSize: 14,
                        fontWeight: 600, color: '#12303E',
                      }}>
                        {label}
                      </span>
                    </div>
                    <span style={{ color: '#097589', fontSize: 13 }}>→</span>
                  </Link>
                ))}
              </div>
            </FadeIn>

            {/* ✅ CAMBIO 2: follow.svg reemplaza todo el texto "FOLLOW US!" / "ON SOCIAL MEDIA" */}
            <FadeIn delay={0.15}>
              <div style={{
                background: 'linear-gradient(135deg,#74B4A7 0%,#097589 100%)',
                borderRadius: 20, padding: '44px 36px',
                textAlign: 'center',
                boxShadow: '4px 4px 24px rgba(9,117,137,0.25)',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: 24,
              }}>
                {/* follow.svg ya contiene el texto "FOLLOW US!" y "@awaqong" internamente */}
                <img
                  src="/icons/follow.svg"
                  alt="Follow Us on Social Media"
                  style={{ width: '80%', maxWidth: 260, height: 'auto', display: 'block' }}
                />

                {/* Iconos sociales con SVGs oficiales */}
                <div style={{ display: 'flex', gap: 14, justifyContent: 'center' }}>
                  {SOCIAL.map(({ Icon, href, label, iconSrc }) => (
                    <Link key={label} href={href} target="_blank" rel="noopener noreferrer" style={{
                      width: 44, height: 44, borderRadius: '50%',
                      border: '2px solid rgba(255,255,255,0.55)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff', textDecoration: 'none',
                      transition: 'background .2s, border-color .2s',
                    }}>
                      <Icon size={18} color="white" />
                    </Link>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── RESPONSIVE ── */}
      <style suppressHydrationWarning>{`
        @media (max-width: 1024px) {
          .inst-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 900px) {
          .servicios-grid   { grid-template-columns: 1fr !important; }
          .marketplace-grid { grid-template-columns: 1fr !important; }
          .conoce-grid      { grid-template-columns: 1fr !important; }
          .ubicacion-grid   { grid-template-columns: 1fr !important; }
          .plano-grid       { grid-template-columns: 1fr !important; }
          .donacion-grid    { grid-template-columns: 1fr !important; }
          .follow-grid      { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .inst-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  )
}
