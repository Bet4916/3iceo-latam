'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import HeroIceo from '@/components/sections/HeroIceo'
import SectionDonacion from '@/components/sections/SectionDonacion'
import SectionRedes from '@/components/sections/SectionRedes'

function FadeIn({ children, delay = 0, style, className }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties; className?: string }) {
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

const ORGANIZADORES = [
  {
    logo: '/icons/AWAQ_aliado.svg',
    name: 'Awaq ONGD',
    href: '#',
    desc: 'AWAQ es una organización de cooperación internacional que, desde 2019, se dedica al desarrollo de proyectos de investigación científica y conservación de ecosistemas en comunidades menos favorecidas. A través de Estaciones Biológicas, AWAQ implementa modelos económicos alternativos con el objetivo de mejorar la calidad de vida de los habitantes de estas comunidades.',
    accentBg: '#ADC6D9',
  },
  {
    logo: '/icons/humans_pro.svg',
    name: 'HumansPRO®',
    href: '#',
    desc: 'Como Ente de Acreditación Internacional, promovemos la confianza y la transparencia en los procesos de certificación, garantizando que nuestras acreditaciones reflejen competencia, excelencia y cumplimiento de estándares internacionales. Colaboramos con diversos sectores como industria, tecnología, educación y salud.',
    accentBg: '#4886B5',
  },
  {
    logo: '/icons/logo_uni_USB.svg',
    name: 'Universidad de San Buenaventura',
    href: '#',
    desc: 'La Universidad de San Buenaventura en Cali es una institución de educación superior que se distingue por su enfoque católico y franciscano, buscando la formación integral del ser humano y la transformación de la sociedad. Fue fundada por la comunidad Franciscana y ha contribuido al desarrollo de la educación colombiana desde su creación.',
    accentBg: '#ADC6D9',
  },
]

const SOCIOS = [
  {
    logo: '/icons/gob_valle_cauca.svg',
    isJpg: false,
    name: 'Gobernación del Valle del Cauca',
    desc: 'Máxima autoridad administrativa del departamento, promueve el desarrollo integral, la prosperidad y la preservación cultural de sus habitantes.',
    href: '#',
    accentBg: '#097589',
  },
  {
    logo: '/icons/sc_uni_lasalle_utopia.svg',
    isJpg: false,
    name: 'Proyecto Utopía · U. de La Salle',
    desc: 'Referente de transformación territorial y agroecología con sentido social. Modelo educativo rural orientado a la paz y la sostenibilidad.',
    href: '#',
    accentBg: '#4886B5',
  },
  {
    logo: '/icons/sc_proyecto_colombia.svg',
    isJpg: false,
    name: 'Proyectando Colombia',
    desc: 'Integra regiones y fortalece la imagen de PMI® en Colombia, contribuyendo al desarrollo sostenible a través de la gestión de proyectos.',
    href: '#',
    accentBg: '#ADC6D9',
  },
  {
    logo: '/icons/sc_sophic.svg',
    isJpg: false,
    name: 'SoPhIC',
    desc: 'Asociación gremial de doctores e investigadores de Colombia, generando impacto social, económico y científico a nivel nacional e internacional.',
    href: '#',
    accentBg: '#74B4A7',
  },
  {
    logo: '/icons/sc_juanDcastellanos.jpg',
    isJpg: true,
    name: 'F.U. Juan de Castellanos',
    desc: 'Aliada en la articulación entre academia, sostenibilidad y acción comunitaria. Comprometida con el desarrollo rural y la conservación ambiental.',
    href: '#',
    accentBg: '#097589',
  },
]

// ─── ORGANIZADOR CARD ─────────────────────────────────────────────────────────
// height: 100% en todos los niveles → todas las cards de la fila tienen el mismo alto
function OrgCard({ org, delay = 0 }: { org: typeof ORGANIZADORES[0]; delay?: number }) {
  return (
    <FadeIn delay={delay} style={{ flex: '1 1 0', minWidth: 260, maxWidth: 360, height: '100%' }}>
      <div style={{ position: 'relative', height: '100%' }}>
        {/* Sombra decorativa desplazada */}
        <div style={{
          position: 'absolute', inset: 0,
          borderRadius: '48px 8px 48px 8px',
          backgroundColor: org.accentBg,
          transform: 'translate(10px, 10px)',
          zIndex: 0,
        }} />
        {/* Card */}
        <div style={{
          position: 'relative', zIndex: 1, height: '100%',
          borderRadius: '48px 8px 48px 8px',
          backgroundColor: '#ffffff',
          padding: '28px 26px 26px',
          boxShadow: '0 4px 20px rgba(9,52,78,0.10)',
          display: 'flex', flexDirection: 'column',
          transition: 'transform 0.22s',
          boxSizing: 'border-box',
        }}
          onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)'}
          onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'}
        >
          {/* Logo */}
          <div style={{
            width: '100%', height: 148, flexShrink: 0,
            borderRadius: '32px 4px 20px 4px',
            border: '2px solid #AEE5DA', backgroundColor: '#F8FDFC',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px 24px', marginBottom: 22, overflow: 'hidden',
          }}>
            <img src={org.logo} alt={org.name} style={{ maxWidth: '100%', maxHeight: 100, objectFit: 'contain', display: 'block' }} />
          </div>

          <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 17, fontWeight: 700, color: '#09344e', lineHeight: 1.25, marginBottom: 12, flexShrink: 0 }}>
            {org.name}
          </h3>

          {/* flex: 1 → ocupa el espacio disponible empujando el link al fondo */}
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13.5, color: '#12303E', lineHeight: 1.7, flex: 1, marginBottom: 18 }}>
            {org.desc}
          </p>

          <a href={org.href} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'Poppins, sans-serif', fontSize: 13.5, fontWeight: 600, color: '#097589', textDecoration: 'none', transition: 'gap 0.2s', flexShrink: 0 }}
            onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.gap = '10px'}
            onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.gap = '6px'}
          >
            Saber más
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M10 5l3 3-3 3" stroke="#097589" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </FadeIn>
  )
}

// ─── SOCIO CARD COMPACTA ──────────────────────────────────────────────────────
// height: 100% en todos los niveles → todas del mismo alto dentro de su fila de grid
function SocioCard({ socio, index }: { socio: typeof SOCIOS[0]; index: number }) {
  return (
    <FadeIn delay={index * 0.06} style={{ height: '100%' }}>
      <div style={{ position: 'relative', height: '100%' }}>
        {/* Sombra de color desplazada */}
        <div style={{
          position: 'absolute', inset: 0,
          borderRadius: '32px 6px 32px 6px',
          backgroundColor: socio.accentBg,
          opacity: 0.35,
          transform: 'translate(6px, 6px)',
          zIndex: 0,
        }} />
        {/* Card */}
        <div style={{
          position: 'relative', zIndex: 1, height: '100%',
          borderRadius: '32px 6px 32px 6px',
          backgroundColor: '#ffffff',
          padding: '22px 20px 20px',
          boxShadow: '0 2px 14px rgba(9,52,78,0.09)',
          display: 'flex', flexDirection: 'column',
          transition: 'transform 0.2s',
          boxSizing: 'border-box',
        }}
          onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'}
          onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'}
        >
          {/* Logo */}
          <div style={{
            width: '100%', height: 100, flexShrink: 0,
            borderRadius: '22px 4px 14px 4px',
            border: `2px solid ${socio.accentBg}55`,
            backgroundColor: '#F8FDFC',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '14px 16px', marginBottom: 16, overflow: 'hidden',
          }}>
            <img src={socio.logo} alt={socio.name} style={{ maxWidth: '100%', maxHeight: 72, objectFit: 'contain', display: 'block', borderRadius: socio.isJpg ? 6 : 0 }} />
          </div>

          <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 700, color: '#09344e', lineHeight: 1.3, marginBottom: 8, flexShrink: 0 }}>
            {socio.name}
          </h3>

          {/* flex: 1 → empuja el link al fondo */}
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12.5, color: '#5A6E77', lineHeight: 1.65, flex: 1, marginBottom: 14 }}>
            {socio.desc}
          </p>

          <a href={socio.href} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: 'Poppins, sans-serif', fontSize: 12.5, fontWeight: 600, color: '#097589', textDecoration: 'none', transition: 'gap 0.2s', flexShrink: 0 }}
            onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.gap = '9px'}
            onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.gap = '5px'}
          >
            Saber más
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M10 5l3 3-3 3" stroke="#097589" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </FadeIn>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function AliadosPage() {
  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>

      {/* ══ 1. HERO ════════════════════════════════════════════════════════════ */}
      <HeroIceo
        badge="3ICEO · LATAM"
        title={<>Aliados del<br /><span style={{ color: '#ffffff' }}>3° ICEO</span></>}
        description="Construimos redes de conocimiento y acción colectiva junto a organizaciones, instituciones y comunidades comprometidas con la sostenibilidad ambiental de Latinoamérica."
        cta={{ label: 'QUIERO ASISTIR →', href: '/marketing/registro' }}
        ctaSecondary={{ label: 'Ver programa', href: '/marketing/agenda' }}
        image="/icons/aliados.svg"
        imageAlt="Red de aliados ICEO LATAM"
        imageLabel="3° ICEO · Aliados · 2027"
        waveVariant="default"
        imageScale={1.40}
        waveColor="#F0F4F7"
      />

      {/* ══ 2. ORGANIZADORES ══════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#F0F4F7', padding: '80px 48px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <FadeIn>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(24px,2.8vw,32px)', fontWeight: 700, color: '#09344e', textAlign: 'center', marginBottom: 56 }}>
              Organizadores
            </h2>
          </FadeIn>
          {/* display:grid con 3 columnas iguales → mismo ancho garantizado.
              align-items:stretch → mismo alto garantizado.
              padding para que las sombras no se corten. */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, alignItems: 'stretch', padding: '0 8px 16px' }} className="org-grid">
            {ORGANIZADORES.map((org, i) => (
              <OrgCard key={org.name} org={org} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Wave #F0F4F7 → blanca ── */}
      <div style={{ lineHeight: 0, backgroundColor: '#F0F4F7' }}>
        <svg viewBox="0 0 1440 56" preserveAspectRatio="none" style={{ width: '100%', height: 56, display: 'block' }}>
          <path d="M0,56 C240,0 480,56 720,28 C960,0 1200,48 1440,20 L1440,56 L0,56 Z" fill="#ffffff" />
        </svg>
      </div>

      {/* ══ 3. SOCIOS COLABORADORES — collage ═════════════════════════════════ */}
      <section style={{ backgroundColor: '#ffffff', padding: '80px 48px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(24px,2.8vw,32px)', fontWeight: 700, color: '#09344e', marginBottom: 12 }}>
                Socios Colaboradores
              </h2>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#5A6E77', lineHeight: 1.7, maxWidth: 520, margin: '0 auto' }}>
                Organizaciones, instituciones académicas y entidades que nos acompañan activamente en la construcción del 3ICEO.
              </p>
            </div>
          </FadeIn>
          {/* Grid 3 columnas, align-items:stretch → mismo alto en cada fila */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28, alignItems: 'stretch', padding: '0 8px 16px' }} className="socios-grid">
            {SOCIOS.map((socio, i) => (
              <SocioCard key={socio.name} socio={socio} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4. DONACIÓN — unificado ═══════════════════════════════════════════ */}
      <SectionDonacion bg="#09344e" theme="dark" waveColor="#ffffff" showWave={true} showTopWave={true}/>

      {/* ══ 5. REDES SOCIALES — unificado ════════════════════════════════════ */}
      <SectionRedes bg="#ffffff" theme="light" />

      <style suppressHydrationWarning>{`
        @media (max-width: 900px) {
          .org-grid    { grid-template-columns: 1fr !important; }
          .socios-grid { grid-template-columns: repeat(2,1fr) !important; }
          .follow-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 580px) {
          .socios-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}