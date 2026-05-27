'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

function FadeIn({ children, delay = 0, style }: {
  children: React.ReactNode; delay?: number; style?: React.CSSProperties
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
      style={style}
    >{children}</motion.div>
  )
}

type TipoSesion = 'registro' | 'apertura' | 'conferencia' | 'taller' | 'panel' | 'pausa' | 'networking' | 'clausura'

interface Sesion {
  hora: string
  titulo: string
  tipo: TipoSesion
  ponente?: string
  highlight?: boolean
}

interface DiaAgenda {
  id: string
  diaSemana: string
  diaNum: string
  mes: string
  tema: string
  colorAccent: string
  manana: Sesion[]
  tarde: Sesion[]
}

const TIPO_STYLE: Record<TipoSesion, { bg: string; text: string; border: string }> = {
  registro:    { bg: '#E6F3EE', text: '#097589',  border: '#AEE5DA' },
  apertura:    { bg: '#09344e', text: '#ffffff',   border: '#09344e' },
  conferencia: { bg: '#F7F6F3', text: '#12303E',   border: '#097589' },
  taller:      { bg: '#E6F3EE', text: '#004A3B',   border: '#03A383' },
  pausa:       { bg: '#F0F4F7', text: '#5A6E77',   border: '#D9DEE2' },
  panel:       { bg: '#DAEBF2', text: '#1C495C',   border: '#4886B5' },
  networking:  { bg: '#FDEEF6', text: '#802254',   border: '#B53077' },
  clausura:    { bg: '#12303E', text: '#ffffff',   border: '#12303E' },
}

const FLAG_NAMES: Record<string, string> = {
  co: 'Colombia', es: 'España', mx: 'México', ve: 'Venezuela',
  ar: 'Argentina', pe: 'Perú', ec: 'Ecuador', cl: 'Chile',
}
function Flag({ code }: { code: string }) {
  return (
    <img
      src={`https://flagcdn.com/w20/${code}.png`}
      srcSet={`https://flagcdn.com/w40/${code}.png 2x`}
      width={20} height={14}
      alt={FLAG_NAMES[code] ?? code.toUpperCase()}
      style={{ display: 'inline-block', borderRadius: 2, flexShrink: 0, marginTop: 2, objectFit: 'cover' }}
    />
  )
}

// ─── PONENTES — textos oficiales actualizados ─────────────────────────────────
const PONENTES = [
  {
    foto: '/icons/jose_serrano.svg', nombre: 'José Serrano Serna', pais: 'es',
    org: 'Awaq ONGD', rol: 'CEO-Presidente Awaq ONGD · Promotor y Sponsor del 2ICEO-LATAM',
    ponencia: 'Apertura en nombre de la organización promotora y sponsor del 2ICEO-LATAM. Presentación del Programa Awaq-BioTech.',
    social: 'https://www.linkedin.com/in/jsserna5575/', socialType: 'linkedin' as const,
  },
  {
    foto: '/icons/luis_alfonso.svg', nombre: 'Luis Alfonso Aguirre', pais: 'co',
    org: 'PMI® Colombia', rol: 'Program Manager PMI® Colombia · Promotor y Sponsor del 2ICEO-LATAM',
    ponencia: 'Taller: Proyectos que dejan huella – "Formulación de Proyectos Sociales Sostenibles".',
    social: 'https://www.linkedin.com/in/luis-alfonso-aguirre-montealegre-0770a91a/', socialType: 'linkedin' as const,
  },
  {
    foto: '/icons/begona_hera.svg', nombre: 'Begoña de la Hera', pais: 'es',
    org: 'Awaq ONGD', rol: 'Directora Programa TEDI Awaq ONGD · Directora Proyecto ABT 2025-2028',
    ponencia: 'Presentación resultados parciales del proyecto ABT 2025 – Hoja de Ruta 2026-2027.',
    social: 'https://www.linkedin.com/in/bego%C3%B1a-de-la-hera-25ba801a/', socialType: 'linkedin' as const,
  },
  {
    foto: '/icons/rolando_evelio.jpg', nombre: 'Rolando Evelio Pérez Versón', pais: 'mx',
    org: 'Tecnológico de Monterrey', rol: 'Profesor Planta · Director Técnico ABT 2025-2028',
    ponencia: 'Presentación componentes tecnológicos IA, Programa ABT.',
    social: 'https://www.linkedin.com/in/rolando-evelio-p%C3%A9rez-vers%C3%B3n-4137a8264/', socialType: 'linkedin' as const,
  },
  {
    foto: '/images/ponentes_Camilo_Andrés_Aguilar.jpeg', nombre: 'Hno. Camilo Andrés Aguilar Gómez', pais: 'co',
    org: 'Universidad de La Salle', rol: 'Coordinador Universidad de La Salle · Coordinador de Utopía',
    ponencia: 'UTOPÍA: Un horizonte educativo para el cuidado, la sostenibilidad y la ecología integra.',
    social: 'https://www.linkedin.com/in/camilo-andr%C3%A9s-aguilar-g%C3%B3mez-437a32258/', socialType: 'linkedin' as const,
  },
  {
    foto: '/images/ponentes_Gustavo_Herrera.jpeg', nombre: 'Mtro. Gustavo Herrera Caballero', pais: 'co',
    org: 'SELA', rol: 'Coordinador SELA · Coordinador Desarrollo Social',
    ponencia: 'La experiencia del SELA en la implementación de la Agenda 2030.',
    social: 'https://www.linkedin.com/in/gustavo-herrera-3528a979/', socialType: 'linkedin' as const,
  },
  {
    foto: '/images/ponentes_Liza_Rodriguez_Galvis.jpeg', nombre: 'Liza Rodríguez Galvis', pais: 'co',
    org: 'Gobernación del Valle del Cauca', rol: 'Secretaria General de la Gobernación del Valle del Cauca',
    ponencia: 'Mujeres en biodiversidad y fortalecimiento institucional: un camino para transformar realidades.',
    social: 'https://www.instagram.com/lizarodriguez18?igsh=dHYzaml4NG02bGoy', socialType: 'instagram' as const,
  },
  {
    foto: '/images/ponentes_Nasly_Vidales.jpeg', nombre: 'Nasly Fernandea Gonzales Vidales', pais: 'co',
    org: 'Secretaría de Ambiente y Desarrollo Sostenible del Valle del Cauca', rol: 'Subsecretaria de Desarrollo Sostenible',
    ponencia: 'El papel de las mujeres en el cambio climático.',
    social: 'https://www.linkedin.com/in/nasly-fernanda-vidales-gonz%C3%A1lez-1080b5b6/', socialType: 'linkedin' as const,
  },
  {
    foto: '/images/ponentes_Jhonatan_Alexander_Becerra.jpeg', nombre: 'Jhonatan Alexander Becerra Duitama', pais: 'co',
    org: 'Fundación Universitaria Juan de Castellanos', rol: 'Líder Desarrollo Tecnológico',
    ponencia: 'Alianza Universidad Juan de Castellanos | Proyecto ABT.',
    social: 'https://www.linkedin.com/in/jhonatan-alexander-becerra-duitama/', socialType: 'linkedin' as const,
  },
  {
    foto: '/images/ponentes_William_Fernando_Bernal.jpeg', nombre: 'William Fernando Bernal Suárez', pais: 'co',
    org: 'Fundación Universitaria Juan de Castellanos', rol: 'Líder Desarrollo Tecnológico',
    ponencia: 'Alianza Universidad Juan de Castellanos | Proyecto ABT.',
    social: 'https://www.linkedin.com/in/william-bernal-13457b60/', socialType: 'linkedin' as const,
  },
  {
    foto: '/images/ponentes_Magda_Lorena_Pineda.jpeg', nombre: 'Magda Lorena Pineda Rodríguez', pais: 'co',
    org: 'Fundación Universitaria Juan de Castellanos', rol: 'Líder Desarrollo Tecnológico',
    ponencia: 'Alianza Universidad Juan de Castellanos | Proyecto ABT.',
    social: 'https://www.linkedin.com/in/magda-pineda-rodriguez/', socialType: 'linkedin' as const,
  },
  {
    foto: '/images/ponente_Cristhian_Utopía.jpeg', nombre: 'John Cristhian Fernández Lizarazo', pais: 'co',
    org: 'Fundación Universitaria Juan de Castellanos', rol: 'Líder Desarrollo Tecnológico',
    ponencia: 'Alianza Universidad Juan de Castellanos | Proyecto ABT.',
    social: 'https://www.linkedin.com/in/john-cristhian-fernandez-lizarazo-a7230047/', socialType: 'linkedin' as const,
  },
  {
    foto: '/images/ponentes_Santiago_Granados.jpg', nombre: 'Santiago Granados Guitierrez', pais: 'co',
    org: 'CEPAL-ONU', rol: 'Consultor',
    ponencia: 'Legados y desafíos de la COP16.',
    social: 'https://www.linkedin.com/in/santiago-granados-guti%C3%A9rrez-94a65a21/', socialType: 'linkedin' as const,
  },
]

// ─── PROGRAMA ─────────────────────────────────────────────────────────────────
const DIAS: DiaAgenda[] = [
  {
    id: 'martes', diaSemana: 'MARTES', diaNum: '17', mes: 'FEBRERO',
    tema: 'Análisis de los resultados de la COP 16',
    colorAccent: '#097589',
    manana: [
      { hora: '09:00 – 09:30', titulo: 'Registro de asistentes',                                              tipo: 'registro'    },
      { hora: '09:30 – 09:45', titulo: 'Apertura y Bienvenida',                                               tipo: 'apertura'    },
      { hora: '09:45 – 10:45', titulo: 'Legados y desafíos de la COP16', ponente: 'Santiago Granados · CEPAL-ONU', tipo: 'conferencia', highlight: true },
      { hora: '10:45 – 11:00', titulo: 'Pausa',                                                                tipo: 'pausa'       },
      { hora: '11:00 – 12:30', titulo: 'La experiencia del SELA en la implementación de la Agenda 2030', ponente: 'Mtro. Gustavo Herrera · SELA', tipo: 'conferencia' },
    ],
    tarde: [
      { hora: '13:00 – 13:45', titulo: 'Pausa para el almuerzo',                                               tipo: 'pausa'       },
      { hora: '14:00 – 15:30', titulo: 'Mesa de trabajo: Articulación entre gobiernos, academia y sector privado', tipo: 'taller'   },
      { hora: '15:30 – 16:30', titulo: 'Panel: Compromisos globales en acción local',                         tipo: 'panel'       },
      { hora: '16:30 – 17:00', titulo: 'Networking y cierre del día',                                         tipo: 'networking'  },
    ],
  },
  {
    id: 'miercoles', diaSemana: 'MIÉRCOLES', diaNum: '18', mes: 'FEBRERO',
    tema: 'Mujeres líderes en Organizaciones Ambientales',
    colorAccent: '#B53077',
    manana: [
      { hora: '09:00 – 09:30', titulo: 'Registro de asistentes',                                              tipo: 'registro'    },
      { hora: '09:30 – 10:30', titulo: 'El papel de las mujeres en el cambio climático', ponente: 'Nasly Fernandea Gonzales Vidales · Secretaría Ambiente Valle', tipo: 'conferencia', highlight: true },
      { hora: '10:30 – 11:30', titulo: 'Mujeres en biodiversidad y fortalecimiento institucional', ponente: 'Liza Rodríguez Galvis · Gobernación del Valle del Cauca', tipo: 'conferencia' },
      { hora: '11:30 – 12:00', titulo: 'Talleres: Comunidades resilientes y género',                          tipo: 'taller'      },
    ],
    tarde: [
      { hora: '13:00 – 13:45', titulo: 'Pausa para el almuerzo',                                              tipo: 'pausa'       },
      { hora: '14:00 – 15:30', titulo: 'Panel: Redes de apoyo y soluciones inclusivas en justicia climática', tipo: 'panel'       },
      { hora: '15:30 – 16:30', titulo: 'Taller: Herramientas de formación para líderes ambientales comunitarias', tipo: 'taller' },
      { hora: '16:30 – 17:00', titulo: 'Networking y cierre del día',                                         tipo: 'networking'  },
    ],
  },
  {
    id: 'jueves', diaSemana: 'JUEVES', diaNum: '19', mes: 'FEBRERO',
    tema: 'Tecnología y conservación ambiental',
    colorAccent: '#03A383',
    manana: [
      { hora: '09:00 – 09:30', titulo: 'Registro de asistentes',                                              tipo: 'registro'    },
      { hora: '09:30 – 10:30', titulo: 'UTOPÍA: Un horizonte educativo para el cuidado y la ecología integra', ponente: 'Hno. Camilo Andrés Aguilar · Univ. La Salle', tipo: 'conferencia', highlight: true },
      { hora: '10:30 – 12:30', titulo: 'Alianza Universidad Juan de Castellanos | Proyecto ABT', ponente: 'Magda Lorena Pineda · John Cristhian Fernández · Jhonatan Becerra · William Bernal', tipo: 'conferencia' },
    ],
    tarde: [
      { hora: '13:00 – 13:45', titulo: 'Pausa para el almuerzo',                                              tipo: 'pausa'       },
      { hora: '14:00 – 15:00', titulo: 'Mesa de trabajo: Tecnología para el monitoreo ambiental y la acción colaborativa', tipo: 'taller' },
      { hora: '15:00 – 16:00', titulo: 'Panel de cierre: Construyendo redes de conocimiento territorial',    tipo: 'panel'       },
      { hora: '16:00 – 17:00', titulo: 'Clausura del 3ICEO LATAM',                                           tipo: 'clausura'    },
    ],
  },
]

const SOCIAL = [
  { icon: '/icons/icon_instagram.svg', label: 'Instagram', href: 'https://www.instagram.com/awaqongd' },
  { icon: '/icons/icon_facebook.svg',  label: 'Facebook',  href: 'https://www.facebook.com/somosawaq/' },
  { icon: '/icons/icon_linkedin.svg',  label: 'LinkedIn',  href: 'https://www.linkedin.com/showcase/congreso-organizaciones-ambientales-latam/' },
]

// ─── PONENTE CARD ─────────────────────────────────────────────────────────────
function PonenteCard({ p }: { p: typeof PONENTES[0] }) {
  return (
    <div style={{
      backgroundColor: '#F0F4F7', borderRadius: 40, padding: '32px 24px 28px',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      width: 310, flexShrink: 0,
      boxShadow: '2px 2px 10px rgba(9,52,78,0.08)',
      transition: 'transform 0.22s, box-shadow 0.22s',
    }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '2px 8px 22px rgba(9,52,78,0.14)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '2px 2px 10px rgba(9,52,78,0.08)' }}
    >
      <div style={{
        width: 145, height: 145, borderRadius: '50%', overflow: 'hidden',
        border: '4px solid #fff', boxShadow: '0 2px 14px rgba(9,52,78,0.15)',
        marginBottom: 20, flexShrink: 0, backgroundColor: '#DDE8EE',
      }}>
        <img src={p.foto} alt={p.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
      </div>
      <div style={{ display: 'flex', gap: 7, alignItems: 'flex-start', marginBottom: 6, width: '100%', justifyContent: 'center' }}>
        <Flag code={p.pais} />
        <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 700, color: '#09344e', textAlign: 'center', lineHeight: 1.25 }}>
          {p.nombre}
        </span>
      </div>
      <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 600, color: '#097589', textAlign: 'center', lineHeight: 1.4, marginBottom: 4 }}>
        {p.org}
      </p>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#5A6E77', textAlign: 'center', lineHeight: 1.35, marginBottom: 14 }}>
        {p.rol}
      </p>
      <div style={{ width: '55%', borderTop: '1.5px dashed #BED1DA', marginBottom: 14 }} />
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#12303E', textAlign: 'center', lineHeight: 1.6, flex: 1, marginBottom: 18 }}>
        {p.ponencia}
      </p>
      {p.socialType === 'instagram' ? (
        <a href={p.social} target="_blank" rel="noopener noreferrer" aria-label={`Instagram de ${p.nombre}`}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 8, backgroundColor: '#fff', boxShadow: '0 1px 6px rgba(9,52,78,0.12)', textDecoration: 'none', transition: 'background-color 0.2s' }}
          onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#E1306C')}
          onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#fff')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="2" width="20" height="20" rx="5" stroke="#E1306C" strokeWidth="1.8"/>
            <circle cx="12" cy="12" r="4" stroke="#E1306C" strokeWidth="1.8"/>
            <circle cx="17.5" cy="6.5" r="1" fill="#E1306C"/>
          </svg>
        </a>
      ) : (
        <a href={p.social} target="_blank" rel="noopener noreferrer" aria-label={`LinkedIn de ${p.nombre}`}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 8, backgroundColor: '#fff', boxShadow: '0 1px 6px rgba(9,52,78,0.12)', textDecoration: 'none', transition: 'background-color 0.2s' }}
          onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#0A66C2')}
          onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#fff')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" stroke="#0A66C2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="2" y="9" width="4" height="12" stroke="#0A66C2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="4" cy="4" r="2" stroke="#0A66C2" strokeWidth="1.8"/>
          </svg>
        </a>
      )}
    </div>
  )
}

// ─── CARRUSEL ─────────────────────────────────────────────────────────────────
function PonenteCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState(0)
  const CARD_W = 310 + 24

  const scrollTo = useCallback((dir: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    const next = Math.max(0, Math.min(el.scrollLeft + dir * CARD_W * 3, el.scrollWidth - el.clientWidth))
    el.scrollTo({ left: next, behavior: 'smooth' })
  }, [])

  const onScroll = useCallback(() => {
    if (trackRef.current) setPos(trackRef.current.scrollLeft)
  }, [])

  const canPrev = pos > 10
  const canNext = trackRef.current ? pos < trackRef.current.scrollWidth - trackRef.current.clientWidth - 10 : true

  return (
    <div style={{ position: 'relative' }}>
      <div ref={trackRef} onScroll={onScroll} style={{
        display: 'flex', gap: 24, overflowX: 'auto', paddingBottom: 8,
        scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch', paddingInline: 4,
      }}>
        {PONENTES.map(p => <PonenteCard key={p.nombre} p={p} />)}
      </div>
      {canPrev && (
        <button onClick={() => scrollTo(-1)} aria-label="Anterior" style={{
          position: 'absolute', top: '50%', left: -20, transform: 'translateY(-50%)',
          width: 40, height: 40, borderRadius: '50%', border: '1.5px solid #D9DEE2',
          backgroundColor: '#fff', boxShadow: '2px 2px 8px rgba(9,52,78,0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', zIndex: 2, transition: 'border-color 0.2s',
        }}
          onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.borderColor = '#097589'}
          onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.borderColor = '#D9DEE2'}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L6 8l4 5" stroke="#09344e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
      {canNext && (
        <button onClick={() => scrollTo(1)} aria-label="Siguiente" style={{
          position: 'absolute', top: '50%', right: -20, transform: 'translateY(-50%)',
          width: 40, height: 40, borderRadius: '50%', border: '1.5px solid #D9DEE2',
          backgroundColor: '#fff', boxShadow: '2px 2px 8px rgba(9,52,78,0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', zIndex: 2, transition: 'border-color 0.2s',
        }}
          onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.borderColor = '#097589'}
          onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.borderColor = '#D9DEE2'}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 3l4 5-4 5" stroke="#09344e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
      <style suppressHydrationWarning>{`div::-webkit-scrollbar{display:none}`}</style>
    </div>
  )
}

// ─── SESION ROW ───────────────────────────────────────────────────────────────
function SesionRow({ s }: { s: Sesion }) {
  const st = TIPO_STYLE[s.tipo]
  return (
    <div style={{
      backgroundColor: st.bg, borderLeft: `3px solid ${st.border}`,
      borderRadius: 6, padding: '8px 12px', marginBottom: 6,
    }}>
      <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 10, fontWeight: 600, color: st.border, marginBottom: 2, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
        {s.hora}
      </div>
      <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 600, color: s.tipo === 'apertura' || s.tipo === 'clausura' ? '#fff' : '#09344e', lineHeight: 1.35 }}>
        {s.titulo}
      </div>
      {s.ponente && (
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: s.tipo === 'apertura' || s.tipo === 'clausura' ? 'rgba(255,255,255,0.7)' : '#5A6E77', marginTop: 2, lineHeight: 1.3 }}>
          {s.ponente}
        </div>
      )}
    </div>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function AgendaPage() {
  const [diaActivo, setDiaActivo] = useState(0)

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>

      {/* ════════════════════════════════════════════════════════════════════
          1. HERO — fondo #74B4A7 (--aqua-300)
          Colores del hero: navy #09344e para texto, blanco para "3°",
          botón acción en navy oscuro #09344e.
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{
        backgroundColor: '#74B4A7',
        paddingTop: 80, paddingBottom: 0,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.06,
          backgroundImage: 'radial-gradient(circle, rgba(9,52,78,0.8) 1px, transparent 1px)',
          backgroundSize: '28px 28px', pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '56px 48px 0', position: 'relative' }}>
          <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>

            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Eyebrow */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                border: '1px solid rgba(9,52,78,0.20)', borderRadius: 999,
                padding: '5px 14px', marginBottom: 20,
                backgroundColor: 'rgba(255,255,255,0.28)',
              }}>
                <span style={{
                  fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 600,
                  color: '#09344e', letterSpacing: '0.1em', textTransform: 'uppercase',
                }}>
                  3ª EDICIÓN · CALI, COLOMBIA
                </span>
              </div>

              {/* H1 — "3°" en blanco puro, el resto en navy */}
              <h1 style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: 'clamp(36px, 4.8vw, 60px)',
                fontWeight: 700, color: '#09344e',
                lineHeight: 1.08, marginBottom: 22, letterSpacing: '-0.01em',
              }}>
                Agenda del{' '}
                <span style={{ color: '#ffffff' }}>3°</span>{' '}
                Congreso Internacional de Organizaciones Ambientales
              </h1>

              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: 15,
                color: 'rgba(9,52,78,0.72)', lineHeight: 1.7,
                maxWidth: 400, marginBottom: 32,
              }}>
                Solicita tu asistencia para no quedarte sin plaza. El aforo es limitado.
              </p>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                {/* CTA principal — navy oscuro */}
                <Link
                  href="/marketing/registro"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    backgroundColor: '#09344e', color: '#fff',
                    fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 700,
                    padding: '13px 30px', borderRadius: 999, textDecoration: 'none',
                    letterSpacing: '0.06em',
                    boxShadow: '0 2px 18px rgba(9,52,78,0.30)',
                    transition: 'background-color 0.2s, transform 0.15s',
                  }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.backgroundColor = '#12303E'; el.style.transform = 'translateY(-1px)' }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.backgroundColor = '#09344e'; el.style.transform = 'translateY(0)' }}
                >
                  QUIERO ASISTIR →
                </Link>

                {/* Botón secundario — ver agenda (simulada como terminada) */}
                <a
                  href="#programa"
                  onClick={e => { e.preventDefault(); document.getElementById('programa')?.scrollIntoView({ behavior: 'smooth' }) }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    backgroundColor: 'rgba(255,255,255,0.30)', color: '#09344e',
                    fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600,
                    padding: '12px 22px', borderRadius: 999, textDecoration: 'none',
                    letterSpacing: '0.04em',
                    border: '1.5px solid rgba(9,52,78,0.20)',
                    transition: 'background-color 0.2s',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(255,255,255,0.50)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(255,255,255,0.30)')}
                >
                  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>
                  </svg>
                  VER AGENDA
                </a>
              </div>
            </motion.div>

            {/* Imagen derecha */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.1 }}
            >
              <div style={{
                borderRadius: 20, overflow: 'hidden',
                boxShadow: '0 8px 40px rgba(9,52,78,0.20)',
                backgroundColor: '#5C9E94', aspectRatio: '4/3',
              }}>
                <img src="/icons/panelistas.svg" alt="Panelistas del 3ICEO"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Tabs calendario */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, padding: '48px 48px 0', position: 'relative' }}>
          {DIAS.map((d, i) => {
            const active = diaActivo === i
            return (
              <button key={d.id}
                onClick={() => { setDiaActivo(i); document.getElementById('programa')?.scrollIntoView({ behavior: 'smooth' }) }}
                style={{
                  width: 130, padding: '14px 12px 16px',
                  backgroundColor: active ? '#ffffff' : 'rgba(9,52,78,0.07)',
                  border: 'none', borderRadius: '10px 10px 0 0',
                  cursor: 'pointer', transition: 'all 0.2s', textAlign: 'center',
                }}
                onMouseEnter={e => { if (!active) (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(9,52,78,0.14)' }}
                onMouseLeave={e => { if (!active) (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(9,52,78,0.07)' }}
              >
                <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 10, fontWeight: 700, color: active ? '#5A6E77' : 'rgba(9,52,78,0.50)', letterSpacing: '0.1em', marginBottom: 4 }}>
                  {d.diaSemana}
                </div>
                <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 32, fontWeight: 700, color: active ? d.colorAccent : 'rgba(9,52,78,0.55)', lineHeight: 1 }}>
                  {d.diaNum}
                </div>
                <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 10, fontWeight: 600, color: active ? '#5A6E77' : 'rgba(9,52,78,0.45)', letterSpacing: '0.1em', marginTop: 4 }}>
                  {d.mes}
                </div>
              </button>
            )
          })}
        </div>
      </section>
      

      {/* ════════════════════════════════════════════════════════════════════
          2. PONENTES
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#F0F4F7', padding: '72px 48px 80px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <FadeIn>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(22px, 2.5vw, 30px)', fontWeight: 700, color: '#09344e', textAlign: 'center', marginBottom: 44 }}>
              Conoce a nuestros ponentes
            </h2>
          </FadeIn>
          <div style={{ padding: '0 24px', position: 'relative' }}>
            <PonenteCarousel />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          3. TALLERES Y HORARIOS
      ════════════════════════════════════════════════════════════════════ */}
      <section id="programa" style={{ backgroundColor: '#ffffff', padding: '72px 48px 88px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <FadeIn>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(22px, 2.5vw, 30px)', fontWeight: 700, color: '#09344e', textAlign: 'center', marginBottom: 32 }}>
              Talleres y horarios
            </h2>
          </FadeIn>

          <FadeIn delay={0.05}>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 48, flexWrap: 'wrap' }}>
              {DIAS.map((d, i) => {
                const active = diaActivo === i
                return (
                  <button key={d.id} onClick={() => setDiaActivo(i)} style={{
                    fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600,
                    padding: '10px 22px', borderRadius: 999, border: 'none', cursor: 'pointer',
                    backgroundColor: active ? '#09344e' : '#F0F4F7',
                    color: active ? '#ffffff' : '#5A6E77',
                    transition: 'all 0.2s', letterSpacing: '0.03em',
                  }}
                    onMouseEnter={e => { if (!active) { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#E0E8EC'; (e.currentTarget as HTMLButtonElement).style.color = '#09344e' } }}
                    onMouseLeave={e => { if (!active) { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#F0F4F7'; (e.currentTarget as HTMLButtonElement).style.color = '#5A6E77' } }}
                  >
                    {active ? 'Programa' : 'Agenda'} {d.diaSemana.charAt(0) + d.diaSemana.slice(1).toLowerCase()}
                  </button>
                )
              })}
            </div>
          </FadeIn>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {DIAS.map((dia, i) => {
              const show = diaActivo === i
              return (
                <AnimatePresence key={dia.id} mode="wait">
                  {show && (
                    <motion.div
                      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      style={{ display: 'grid', gridTemplateColumns: '160px 1fr 1fr', gap: 20, alignItems: 'flex-start' }}
                      className="dia-row"
                    >
                      <div style={{
                        backgroundColor: dia.colorAccent, borderRadius: 16,
                        padding: '28px 16px', textAlign: 'center',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        minHeight: 200, position: 'sticky', top: 100,
                      }}>
                        <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.85)', letterSpacing: '0.1em', marginBottom: 8 }}>{dia.diaSemana}</div>
                        <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 52, fontWeight: 700, color: '#ffffff', lineHeight: 1 }}>{dia.diaNum}</div>
                        <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.85)', letterSpacing: '0.1em', marginTop: 8 }}>{dia.mes}</div>
                      </div>
                      <div>
                        <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 700, color: '#09344e', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12, paddingBottom: 8, borderBottom: '2px solid #F0F4F7' }}>MAÑANA</div>
                        {dia.manana.map((s, j) => <SesionRow key={j} s={s} />)}
                      </div>
                      <div>
                        <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 700, color: '#09344e', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12, paddingBottom: 8, borderBottom: '2px solid #F0F4F7' }}>TARDE</div>
                        {dia.tarde.map((s, j) => <SesionRow key={j} s={s} />)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )
            })}
          </div>

          <FadeIn delay={0.2}>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 40, flexWrap: 'wrap' }}>
              <a href="/docs/agenda-draft.pdf" target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                backgroundColor: '#097589', color: '#fff',
                fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 700,
                padding: '11px 22px', borderRadius: 999, textDecoration: 'none',
                letterSpacing: '0.05em', transition: 'background-color 0.2s',
              }}
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#074954')}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#097589')}
              >
                DESCARGAR HORARIO
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3v8M5 9l3 2 3-2M3 13h10" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <Link href="/marketing/lineas-tematicas" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                backgroundColor: '#03A383', color: '#fff',
                fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 700,
                padding: '11px 22px', borderRadius: 999, textDecoration: 'none',
                letterSpacing: '0.05em', transition: 'background-color 0.2s',
              }}
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#007A63')}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#03A383')}
              >
                VER LÍNEAS TEMÁTICAS
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <div style={{ lineHeight: 0 }}>
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none" style={{ width: '100%', height: 48, display: 'block' }}>
          <path d="M0,0 C360,48 720,0 1080,36 C1260,48 1380,12 1440,28 L1440,48 L0,48 Z" fill="#E6F3EE"/>
        </svg>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          4. DONACIÓN
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#E6F3EE', padding: '72px 48px 80px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="donacion-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <FadeIn>
              <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 700, color: '#09344e', lineHeight: 1.2, marginBottom: 18 }}>
                ¡Gracias a tu donación, nadie se queda fuera!
              </h2>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#12303E', lineHeight: 1.7, marginBottom: 14 }}>
                Tu ayuda permitirá que organizaciones ambientales que no cuenten con recursos puedan asistir al 3ICEO y formar parte de un espacio de aprendizaje, conexión y colaboración única.
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#12303E', lineHeight: 1.7, marginBottom: 32 }}>
                El importe irá íntegramente destinado a cubrir alojamiento, transporte y dietas.
              </p>
              <Link href="/marketing/donaciones" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                backgroundColor: '#B53077', color: '#fff',
                fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 700,
                padding: '13px 30px', borderRadius: 999, textDecoration: 'none',
                letterSpacing: '0.05em', boxShadow: '0 2px 16px rgba(181,48,119,0.28)',
                transition: 'background-color 0.2s, transform 0.15s',
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.backgroundColor = '#802254'; el.style.transform = 'translateY(-1px)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.backgroundColor = '#B53077'; el.style.transform = 'translateY(0)' }}
              >
                DONA AHORA
              </Link>
            </FadeIn>
            <FadeIn delay={0.14}>
              <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                <div style={{ position: 'absolute', top: 16, right: -10, width: '88%', height: '88%', borderRadius: 16, backgroundColor: '#AEE5DA', zIndex: 0 }} />
                <div style={{ position: 'relative', zIndex: 1, borderRadius: 16, overflow: 'hidden', boxShadow: '4px 4px 24px rgba(9,52,78,0.14)', maxWidth: 480, width: '100%' }}>
                  <img src="/icons/planta_donacion.svg" alt="Donación" style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <div style={{ lineHeight: 0, backgroundColor: '#E6F3EE' }}>
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none" style={{ width: '100%', height: 48, display: 'block' }}>
          <path d="M0,48 C360,0 720,48 1080,20 C1260,8 1380,40 1440,28 L1440,48 L0,48 Z" fill="#ffffff"/>
        </svg>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          5. FOLLOW
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#ffffff', padding: '72px 48px 80px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="follow-grid" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 64, alignItems: 'center' }}>
            <FadeIn>
              <img src="/icons/follow.svg" alt="Follow us" style={{ width: 260, height: 'auto', display: 'block', flexShrink: 0, filter: 'drop-shadow(0 4px 16px rgba(9,52,78,0.12))' }} />
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
                  {SOCIAL.map(s => (
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
          .hero-grid   { grid-template-columns: 1fr !important; }
          .hero-grid > div:last-child { display: none !important; }
          .dia-row     { grid-template-columns: 1fr !important; }
          .donacion-grid { grid-template-columns: 1fr !important; }
          .donacion-grid > div:last-child { display: none !important; }
          .follow-grid { grid-template-columns: 1fr !important; }
          .follow-grid > div:first-child { display: none !important; }
        }
      `}</style>
    </div>
  )
}