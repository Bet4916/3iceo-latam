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
const INSTALACIONES = [
  { label: 'Auditorio Central',   bg: 'linear-gradient(135deg,#09344e 0%,#1C495C 100%)', emoji: '🏛️' },
  { label: 'Auditorio 103 B Lago',bg: 'linear-gradient(135deg,#097589 0%,#03A383 100%)', emoji: '🎭' },
  { label: 'Auditorio 108 Lago',  bg: 'linear-gradient(135deg,#4886B5 0%,#097589 100%)', emoji: '🎓' },
  { label: 'Auditorio 103 A Lago',bg: 'linear-gradient(135deg,#12303E 0%,#437287 100%)', emoji: '📚' },
]

const SERVICIOS = [
  { label: 'Cafetería',          icon: '/icons/icon_cutlery.svg',   fallback: '🍽️' },
  { label: 'Parking gratuito',   icon: '/icons/icon_parking.svg',   fallback: '🅿️' },
  { label: 'Equipos multimedia', icon: '/icons/icon_streaming.svg', fallback: '📽️' },
  { label: 'Accesos adaptados',  icon: '/icons/icon_accesible.svg', fallback: '♿' },
  { label: 'Wifi gratuito',      icon: '/icons/icon_wifi.svg',      fallback: '📶' },
  { label: 'Áreas de descanso',  icon: '/icons/icon_bed.svg',       fallback: '🛋️' },
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
  { Icon: IconInstagram, href: 'https://instagram.com/awaqong',          label: 'Instagram' },
  { Icon: IconFacebook,  href: 'https://facebook.com/awaqong',           label: 'Facebook'  },
  { Icon: IconLinkedin,  href: 'https://linkedin.com/company/awaq-ong',  label: 'LinkedIn'  },
]

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function UniversidadPage() {
  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>

      {/* ══════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', minHeight: 420, overflow: 'hidden' }}>
        {/* Imagen de fondo — en prod usa <Image priority /> */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg,#09344e 0%,#1C495C 60%,#437287 100%)',
        }}>
          {/* Reemplaza con: <Image src="/images/san-buenaventura-hero.jpg" fill style={{objectFit:'cover',opacity:.35}} alt="" /> */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'url(https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=1400&q=75) center/cover',
            opacity: 0.22,
          }} />
        </div>

        {/* Overlay degradado para legibilidad */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg,rgba(9,52,78,0.92) 45%,rgba(9,52,78,0.4) 100%)',
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
                  <div style={{
                    background: inst.bg, aspectRatio: '4/3',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 48,
                  }}>
                    {/* Reemplaza con <Image src="/images/auditorio-X.jpg" fill objectFit="cover" /> */}
                    {inst.emoji}
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
                    {/* Icono — usa img si existe en /public/icons, fallback emoji */}
                    <div style={{
                      width: 44, height: 44, borderRadius: 10,
                      backgroundColor: '#E6F3EE',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <span style={{ fontSize: 20 }}>{svc.fallback}</span>
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
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#fff', padding: '72px 0' }}>
        <div className="container-brand" style={{ padding: '0 48px' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: 60, alignItems: 'center',
          }} className="marketplace-grid">

            {/* Imagen */}
            <FadeIn>
              <div style={{
                borderRadius: 14, overflow: 'hidden', aspectRatio: '4/3',
                boxShadow: '4px 4px 24px rgba(9,52,78,0.12)',
                background: 'linear-gradient(135deg,#AEE5DA 0%,#097589 60%,#09344e 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 64, opacity: 0.8,
              }}>
                🌿
                {/* Reemplaza con <Image src="/images/marketplace-universidad.jpg" fill objectFit="cover" /> */}
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

            {/* Video placeholder */}
            <FadeIn delay={0.12}>
              <div style={{
                borderRadius: 14, overflow: 'hidden',
                aspectRatio: '16/9',
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.12)',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: 12,
                boxShadow: '8px 8px 32px rgba(0,0,0,0.3)',
                cursor: 'pointer',
                position: 'relative',
              }}>
                {/* Play button */}
                <div style={{
                  width: 64, height: 64, borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  border: '2px solid rgba(255,255,255,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5.14v14l11-7-11-7z" />
                  </svg>
                </div>
                <span style={{
                  fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600,
                  color: 'rgba(255,255,255,0.6)',
                }}>
                  Ver video del campus
                </span>
                <p style={{
                  fontFamily: 'Inter, sans-serif', fontSize: 11,
                  color: 'rgba(255,255,255,0.35)', textAlign: 'center',
                  maxWidth: 260, margin: 0,
                }}>
                  Conoce las instalaciones donde se celebrará el 3° ICEO LATAM
                </p>
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
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#F7F6F3', padding: '72px 0' }}>
        <div className="container-brand" style={{ padding: '0 48px' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: 60, alignItems: 'center',
          }} className="ubicacion-grid">

            {/* Imagen campus */}
            <FadeIn>
              <div style={{
                borderRadius: 14, overflow: 'hidden', aspectRatio: '4/3',
                boxShadow: '4px 4px 24px rgba(9,52,78,0.12)',
                background: 'linear-gradient(135deg,#1C495C 0%,#74B4A7 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 72, opacity: 0.7,
              }}>
                🏔️
                {/* Reemplaza con <Image src="/images/campus-exterior.jpg" fill objectFit="cover" /> */}
              </div>
            </FadeIn>

            <FadeIn delay={0.12}>
              {/* Logo San Buenaventura — badge */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                backgroundColor: '#fff', border: '1px solid #D9DEE2',
                borderRadius: 8, padding: '6px 14px', marginBottom: 20,
                boxShadow: '2px 2px 8px rgba(9,52,78,0.07)',
              }}>
                <span style={{ fontSize: 14 }}>🎓</span>
                <span style={{
                  fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 700,
                  color: '#09344e', letterSpacing: '0.04em',
                }}>
                  UNIVERSIDAD DE SAN BUENAVENTURA
                </span>
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
                {/* Descarga el PDF del plano real */}
                <a href="/icons/icon_PDF.svg" download style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  border: '1.5px solid #D9DEE2', color: '#12303E',
                  fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 700,
                  padding: '10px 20px', borderRadius: 999, textDecoration: 'none',
                  backgroundColor: '#fff', letterSpacing: '0.04em', textTransform: 'uppercase',
                }}>
                  <IconPDF size={16} color="#097589" />
                  Descargar Plano PDF
                </a>
                <button style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  backgroundColor: '#097589', color: '#fff', border: 'none',
                  fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 700,
                  padding: '10px 20px', borderRadius: 999, cursor: 'pointer',
                  letterSpacing: '0.04em', textTransform: 'uppercase',
                }}>
                  Ver Plano
                </button>
              </div>
            </FadeIn>

            {/* Plano del campus */}
            <FadeIn delay={0.12}>
              <div style={{
                borderRadius: 14, overflow: 'hidden',
                boxShadow: '4px 8px 32px rgba(9,52,78,0.12)',
                border: '1px solid #D9DEE2',
              }}>
                {/*
                  Usa la imagen real:
                  <Image
                    src="/images/Mapa-SanBue.png"
                    width={700} height={900}
                    alt="Plano Universidad de San Buenaventura Cali"
                    style={{ width:'100%', height:'auto', display:'block' }}
                  />
                  — Mueve el archivo a: frontend/public/images/Mapa-SanBue.png
                */}
                <div style={{
                  background: 'linear-gradient(145deg,#F0EDE4 0%,#E8E0C8 40%,#C8D4A8 70%,#A8C080 100%)',
                  aspectRatio: '3/4',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  gap: 12, padding: 24,
                }}>
                  {/* Representación simplificada del campus */}
                  <svg width="100%" height="100%" viewBox="0 0 300 380" style={{ maxHeight: 360 }}>
                    {/* Área verde */}
                    <rect x="20" y="20" width="260" height="340" rx="8" fill="#C8D4A8" opacity="0.6"/>
                    {/* Edificios */}
                    <rect x="80" y="60" width="60" height="40" rx="4" fill="#437287" opacity="0.8"/>
                    <rect x="60" y="130" width="50" height="35" rx="4" fill="#09344e" opacity="0.85"/>
                    <rect x="130" y="100" width="70" height="50" rx="4" fill="#097589" opacity="0.8"/>
                    <rect x="170" y="170" width="55" height="40" rx="4" fill="#4886B5" opacity="0.75"/>
                    {/* Lago */}
                    <ellipse cx="155" cy="240" rx="50" ry="35" fill="#76E2CC" opacity="0.7"/>
                    {/* Cancha */}
                    <rect x="55" y="220" width="55" height="38" rx="6" fill="#4CAF50" opacity="0.7"/>
                    {/* Parqueadero */}
                    <rect x="110" y="290" width="120" height="50" rx="4" fill="#B0BEC5" opacity="0.6"/>
                    {/* Texto */}
                    <text x="150" y="370" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="11" fill="#09344e" opacity="0.6">
                      Plano Campus USB Cali
                    </text>
                    {/* Pins */}
                    {[
                      { x: 110, y: 75,  label: '1' },
                      { x: 85,  y: 145, label: '3' },
                      { x: 165, y: 120, label: '2' },
                      { x: 197, y: 185, label: '7' },
                      { x: 155, y: 240, label: '15'},
                    ].map(p => (
                      <g key={p.label} transform={`translate(${p.x},${p.y})`}>
                        <circle r="10" fill="#E85040" opacity="0.9"/>
                        <text textAnchor="middle" dy="4" fontFamily="Poppins,sans-serif"
                          fontSize="8" fontWeight="700" fill="white">{p.label}</text>
                      </g>
                    ))}
                  </svg>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          DONACIÓN
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

            <FadeIn delay={0.15}>
              <div style={{
                borderRadius: 14, overflow: 'hidden', aspectRatio: '4/3',
                boxShadow: '8px 8px 40px rgba(0,0,0,0.3)',
                background: 'linear-gradient(135deg,#C0FFF2 0%,#AEE5DA 50%,#76E2CC 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 80, opacity: 0.75,
              }}>
                🌱
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
                  { label: 'Instagram', bg: '#E1306C' },
                  { label: 'Facebook',  bg: '#1877F2' },
                  { label: 'LinkedIn',  bg: '#0A66C2' },
                ].map(({ label, bg }) => (
                  <Link key={label} href="#" style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    backgroundColor: '#fff', border: '1.5px solid #D9DEE2',
                    borderRadius: 10, padding: '12px 18px',
                    textDecoration: 'none',
                    boxShadow: '2px 2px 8px rgba(9,52,78,0.06)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{
                        width: 34, height: 34, borderRadius: 8,
                        backgroundColor: bg,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {/* usa <Ico src={`/icons/icon_${label.toLowerCase()}.svg`} size={18} /> */}
                        <span style={{ fontSize: 16 }}>
                          {label === 'Instagram' ? '📸' : label === 'Facebook' ? '👍' : '💼'}
                        </span>
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

            <FadeIn delay={0.15}>
              <div style={{
                background: 'linear-gradient(135deg,#74B4A7 0%,#097589 100%)',
                borderRadius: 20, padding: '44px 36px',
                textAlign: 'center', color: '#fff',
                boxShadow: '4px 4px 24px rgba(9,117,137,0.25)',
              }}>
                <div style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: 36, fontWeight: 800, letterSpacing: '0.04em', marginBottom: 4,
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
                  fontSize: 13, opacity: 0.6, marginBottom: 28,
                }}>
                  @awaqong
                </div>
                <div style={{ display: 'flex', gap: 14, justifyContent: 'center' }}>
                  {SOCIAL.map(({ Icon, href, label }) => (
                    <Link key={label} href={href} style={{
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
