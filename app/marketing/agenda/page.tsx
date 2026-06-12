'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import HeroIceo from '@/components/sections/HeroIceo'
import SectionDonacion from '@/components/sections/SectionDonacion'
import SectionRedes from '@/components/sections/SectionRedes'

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

function Flag({ code }: { code: string }) {
  return (
    <img
      src={`https://flagcdn.com/w20/${code}.png`}
      srcSet={`https://flagcdn.com/w40/${code}.png 2x`}
      width={20} height={14} alt={code.toUpperCase()}
      style={{ display: 'inline-block', borderRadius: 2, flexShrink: 0, marginTop: 2, objectFit: 'cover' }}
    />
  )
}

// ─── Tipo unificado para ponentes ─────────────────────────────────────────────
interface Ponente {
  foto:       string
  nombre:     string
  pais:       string
  org:        string
  rol:        string
  social:     string
  socialType: 'linkedin' | 'instagram'
}

// ─── Fallback ─────────────────────────────────────────────────────
const PONENTES_FALLBACK: Ponente[] = [
  { foto: '/icons/jose_serrano.svg',                          nombre: 'José Serrano Serna',              pais: 'es', org: 'Awaq ONGD',                      rol: 'CEO-Presidente Awaq ONGD',                          social: 'https://www.linkedin.com/in/jsserna5575/',                                                          socialType: 'linkedin'  },
  { foto: '/icons/luis_alfonso.svg',                          nombre: 'Luis Alfonso Aguirre',            pais: 'co', org: 'PMI® Colombia',                  rol: 'Program Manager PMI® Colombia',                    social: 'https://www.linkedin.com/in/luis-alfonso-aguirre-montealegre-0770a91a/',                             socialType: 'linkedin'  },
  { foto: '/icons/begona_hera.svg',                           nombre: 'Begoña de la Hera',               pais: 'es', org: 'Awaq ONGD',                      rol: 'Directora Programa TEDI · Directora Proyecto ABT', social: 'https://www.linkedin.com/in/bego%C3%B1a-de-la-hera-25ba801a/',                                      socialType: 'linkedin'  },
  { foto: '/icons/rolando_evelio.jpg',                        nombre: 'Rolando Evelio Pérez Versón',     pais: 'mx', org: 'Tecnológico de Monterrey',        rol: 'Profesor Planta · Director Técnico ABT',            social: 'https://www.linkedin.com/in/rolando-evelio-p%C3%A9rez-vers%C3%B3n-4137a8264/',                       socialType: 'linkedin'  },
  { foto: '/images/ponentes_Camilo_Andrés_Aguilar.jpeg',      nombre: 'Hno. Camilo Andrés Aguilar',      pais: 'co', org: 'Universidad de La Salle',        rol: 'Coordinador de Utopía',                             social: 'https://www.linkedin.com/in/camilo-andr%C3%A9s-aguilar-g%C3%B3mez-437a32258/',                       socialType: 'linkedin'  },
  { foto: '/images/ponentes_Gustavo_Herrera.jpeg',            nombre: 'Mtro. Gustavo Herrera Caballero', pais: 'co', org: 'SELA',                           rol: 'Coordinador Desarrollo Social',                     social: 'https://www.linkedin.com/in/gustavo-herrera-3528a979/',                                             socialType: 'linkedin'  },
  { foto: '/images/ponentes_Liza_Rodriguez_Galvis.jpeg',      nombre: 'Liza Rodríguez Galvis',           pais: 'co', org: 'Gobernación Valle del Cauca',    rol: 'Secretaria General',                                social: 'https://www.instagram.com/lizarodriguez18',                                                         socialType: 'instagram' },
  { foto: '/images/ponentes_Nasly_Vidales.jpeg',              nombre: 'Nasly Fernanda Gonzales Vidales', pais: 'co', org: 'Secretaría Ambiente Valle Cauca', rol: 'Subsecretaria Desarrollo Sostenible',               social: 'https://www.linkedin.com/in/nasly-fernanda-vidales-gonz%C3%A1lez-1080b5b6/',                         socialType: 'linkedin'  },
  { foto: '/images/ponentes_Jhonatan_Alexander_Becerra.jpeg', nombre: 'Jhonatan Alexander Becerra',      pais: 'co', org: 'F.U. Juan de Castellanos',       rol: 'Líder Desarrollo Tecnológico',                      social: 'https://www.linkedin.com/in/jhonatan-alexander-becerra-duitama/',                                    socialType: 'linkedin'  },
  { foto: '/images/ponentes_William_Fernando_Bernal.jpeg',    nombre: 'William Fernando Bernal Suárez',  pais: 'co', org: 'F.U. Juan de Castellanos',       rol: 'Líder Desarrollo Tecnológico',                      social: 'https://www.linkedin.com/in/william-bernal-13457b60/',                                              socialType: 'linkedin'  },
  { foto: '/images/ponentes_Magda_Lorena_Pineda.jpeg',        nombre: 'Magda Lorena Pineda Rodríguez',   pais: 'co', org: 'F.U. Juan de Castellanos',       rol: 'Líder Desarrollo Tecnológico',                      social: 'https://www.linkedin.com/in/magda-pineda-rodriguez/',                                               socialType: 'linkedin'  },
  { foto: '/images/ponente_Cristhian_Utopía.jpeg',            nombre: 'John Cristhian Fernández',        pais: 'co', org: 'F.U. Juan de Castellanos',       rol: 'Líder Desarrollo Tecnológico',                      social: 'https://www.linkedin.com/in/john-cristhian-fernandez-lizarazo-a7230047/',                            socialType: 'linkedin'  },
  { foto: '/images/ponentes_Santiago_Granados.jpg',           nombre: 'Santiago Granados Gutiérrez',     pais: 'co', org: 'CEPAL-ONU',                      rol: 'Consultor',                                         social: 'https://www.linkedin.com/in/santiago-granados-guti%C3%A9rrez-94a65a21/',                             socialType: 'linkedin'  },
]

const DIAS = [
  {
    id: 'martes', diaSemana: 'MARTES', diaNum: '17', mes: 'AGOSTO',
    label: 'DÍA 1',
    tema: 'Agua, territorios vivos y comunidades',
    desc: 'Un primer día para comprender la situación actual de las fuentes hídricas, compartir una visión de futuro y explorar qué iniciativas hacen falta para activar soluciones desde los territorios.',
    colorAccent: '#097589',
    accentShadow: '#C0EAE0',
    bullets: ['Apertura institucional y bienvenida','Conferencia magistral: estado actual de las fuentes hídricas','Panel: comunidades, biodiversidad y cultura territorial','Espacio de networking y articulación','Mesas o sesiones temáticas por retos del territorio','Taller colaborativo: visión compartida y prioridades de acción','Síntesis del Día 1'],
    manana: [
      { hora: '07:00 – 08:00', titulo: 'Registro de asistentes',           tipo: 'registro' as const    },
      { hora: '08:00 – 09:00', titulo: 'Apertura y bienvenida',             tipo: 'apertura' as const    },
      { hora: '09:00 – 10:00', titulo: 'Legados de la COP16',               tipo: 'conferencia' as const },
      { hora: '10:00 – 10:30', titulo: 'Pausa para café',                   tipo: 'pausa' as const       },
      { hora: '10:30 – 12:00', titulo: 'Política pública de la ley de línida · Política pública de equidad de género · Mujeres en biodiversidad y fortalecimiento institucional: un camino para transformar realidades', tipo: 'panel' as const },
    ],
    tarde: [
      { hora: '12:30 – 14:00', titulo: 'Pausa para almuerzo',              tipo: 'pausa' as const      },
      { hora: '14:00 – 15:30', titulo: 'Taller: Proyecto Ley de línida 315 de 2024 · Mujeres cuidadoras de la biodiversidad; fuerza legal para cuidar el territorio', tipo: 'taller' as const },
      { hora: '15:30 – 17:00', titulo: 'Talleres específicos',             tipo: 'taller' as const     },
      { hora: '15:30 – 17:00', titulo: 'Marketplace y Networking',         tipo: 'networking' as const },
    ],
  },
  {
    id: 'miercoles', diaSemana: 'MIÉRCOLES', diaNum: '18', mes: 'AGOSTO',
    label: 'DÍA 2',
    tema: 'Cooperación internacional al desarrollo, innovación y mundo rural',
    desc: 'Un segundo día orientado a conectar cooperación, transferencia de conocimiento e innovación aplicada para impulsar soluciones territoriales, bioeconomía y desarrollo rural sostenible.',
    colorAccent: '#09344e',
    accentShadow: '#B8CDD6',
    bullets: ['Apertura del Día 2 y recapitulación','Conferencia magistral: innovación para territorios vivos','Panel: cooperación al desarrollo y alianzas Europa–LATAM','Espacio de presentaciones, proyectos o pitches','Mesas temáticas: universidad, territorio y tecnología aplicada','Rueda de articulación y colaboración institucional','Síntesis del Día 2'],
    manana: [
      { hora: '07:00 – 08:00', titulo: 'Registro de asistentes',           tipo: 'registro' as const    },
      { hora: '08:00 – 08:45', titulo: 'Apertura Fabio Cardozo Montealegre · Gestor de Paz', tipo: 'apertura' as const },
      { hora: '08:45 – 09:30', titulo: 'UTOPÍA: Un horizonte educativo para el cuidado, la sostenibilidad y la ecología', tipo: 'conferencia' as const },
      { hora: '09:30 – 10:30', titulo: 'Pausa para café',                  tipo: 'pausa' as const       },
      { hora: '10:30 – 12:00', titulo: 'El papel de las mujeres en el cambio climático', tipo: 'conferencia' as const },
    ],
    tarde: [
      { hora: '12:30 – 14:00', titulo: 'Pausa para almuerzo',              tipo: 'pausa' as const      },
      { hora: '14:00 – 14:30', titulo: 'Rap del Agua y la Memoria',        tipo: 'taller' as const     },
      { hora: '14:30 – 15:30', titulo: 'Taller: Comunidades resilientes al cambio climático', tipo: 'taller' as const },
      { hora: '15:30 – 17:00', titulo: 'Marketplace y Networking',         tipo: 'networking' as const },
    ],
  },
  {
    id: 'jueves', diaSemana: 'JUEVES', diaNum: '19', mes: 'AGOSTO',
    label: 'DÍA 3 · JORNADA DE CONCLUSIONES',
    tema: 'Conclusiones',
    desc: 'Una jornada más breve para convertir aprendizajes y acuerdos en memoria útil, conclusiones compartidas y una hoja de ruta para futuras alianzas.',
    colorAccent: '#B58A00',
    accentShadow: '#E8D9A0',
    bullets: ['Apertura breve y recapitulación general','Relatoría y aprendizajes clave del congreso','Mesa de conclusiones y acuerdos','Construcción de hoja de ruta compartida','Cierre institucional y próximos pasos'],
    manana: [
      { hora: '07:00 – 08:00', titulo: 'Registro de asistentes',           tipo: 'registro' as const    },
      { hora: '08:00 – 08:30', titulo: 'Presentación José Serna | Awaq ONGD', tipo: 'apertura' as const },
      { hora: '08:30 – 09:00', titulo: 'Presentación Angélica | Awaq ONGD LATAM', tipo: 'conferencia' as const },
      { hora: '09:00 – 09:30', titulo: 'Presentación Directoras · Estaciones Biológicas', tipo: 'conferencia' as const },
      { hora: '09:30 – 10:15', titulo: 'Pausa para café',                  tipo: 'pausa' as const       },
      { hora: '10:15 – 10:45', titulo: 'Presentación Begoña | Awaq ONGD LATAM', tipo: 'conferencia' as const },
      { hora: '10:45 – 12:00', titulo: 'Presentación de Universidades',    tipo: 'conferencia' as const },
    ],
    tarde: [
      { hora: '12:00 – 13:00', titulo: 'Pausa para almuerzo',              tipo: 'pausa' as const      },
      { hora: '13:00 – 14:30', titulo: 'DEMO de los proyectos ABT y P&R', tipo: 'taller' as const     },
      { hora: '14:30 – 15:30', titulo: 'Manifiesto',                       tipo: 'panel' as const      },
      { hora: '15:30 – 17:00', titulo: 'Ceremonia de clausura y cierre Market Place (palodramo)', tipo: 'clausura' as const },
    ],
  },
]

type TipoSesion = 'registro' | 'apertura' | 'conferencia' | 'taller' | 'panel' | 'pausa' | 'networking' | 'clausura'

const TIPO_STYLE: Record<TipoSesion, { bg: string; textColor: string; border: string }> = {
  registro:    { bg: '#E6F3EE', textColor: '#097589',  border: '#AEE5DA' },
  apertura:    { bg: '#09344e', textColor: '#ffffff',   border: '#09344e' },
  conferencia: { bg: '#F7F6F3', textColor: '#12303E',   border: '#097589' },
  taller:      { bg: '#E6F3EE', textColor: '#004A3B',   border: '#03A383' },
  pausa:       { bg: '#F0F4F7', textColor: '#5A6E77',   border: '#D9DEE2' },
  panel:       { bg: '#DAEBF2', textColor: '#1C495C',   border: '#4886B5' },
  networking:  { bg: '#FDEEF6', textColor: '#802254',   border: '#B53077' },
  clausura:    { bg: '#12303E', textColor: '#ffffff',   border: '#12303E' },
}

function SesionRow({ s }: { s: { hora: string; titulo: string; tipo: TipoSesion } }) {
  const st = TIPO_STYLE[s.tipo]
  const isDark = s.tipo === 'apertura' || s.tipo === 'clausura'
  return (
    <div style={{ display: 'flex', gap: 0, marginBottom: 6, alignItems: 'stretch' }}>
      <div style={{ width: 110, flexShrink: 0, paddingRight: 12, paddingTop: 12, textAlign: 'right' }}>
        <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 600, color: '#5A6E77', whiteSpace: 'nowrap' }}>
          {s.hora}
        </span>
      </div>
      <div style={{ flex: 1, backgroundColor: st.bg, borderLeft: `4px solid ${st.border}`, borderRadius: '0 8px 8px 0', padding: '11px 16px' }}>
        <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14.5, fontWeight: 600, color: isDark ? '#fff' : '#09344e', lineHeight: 1.4, display: 'block' }}>
          {s.titulo}
        </span>
      </div>
    </div>
  )
}

function PonenteCard({ p }: { p: Ponente }) {
  return (
    <div style={{ backgroundColor: '#F0F4F7', borderRadius: 40, padding: '32px 24px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: 310, flexShrink: 0, boxShadow: '2px 2px 10px rgba(9,52,78,0.08)', transition: 'transform 0.22s, box-shadow 0.22s' }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '2px 8px 22px rgba(9,52,78,0.14)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '2px 2px 10px rgba(9,52,78,0.08)' }}
    >
      <div style={{ width: 140, height: 140, borderRadius: '50%', overflow: 'hidden', border: '4px solid #fff', boxShadow: '0 2px 14px rgba(9,52,78,0.15)', marginBottom: 16, flexShrink: 0, backgroundColor: '#DDE8EE' }}>
        <img src={p.foto} alt={p.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
      </div>
      <div style={{ display: 'flex', gap: 6, alignItems: 'flex-start', marginBottom: 6, width: '100%', justifyContent: 'center' }}>
        <Flag code={p.pais} />
        <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 700, color: '#09344e', textAlign: 'center', lineHeight: 1.25 }}>{p.nombre}</span>
      </div>
      <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 600, color: '#097589', textAlign: 'center', lineHeight: 1.4, marginBottom: 3 }}>{p.org}</p>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#5A6E77', textAlign: 'center', lineHeight: 1.35, marginBottom: 16 }}>{p.rol}</p>
      {p.socialType === 'instagram' ? (
        <a href={p.social} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: 8, backgroundColor: '#fff', boxShadow: '0 1px 6px rgba(9,52,78,0.12)', textDecoration: 'none', transition: 'background-color 0.2s' }}
          onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#E1306C')}
          onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#fff')}
        ><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" stroke="#E1306C" strokeWidth="1.8"/><circle cx="12" cy="12" r="4" stroke="#E1306C" strokeWidth="1.8"/><circle cx="17.5" cy="6.5" r="1" fill="#E1306C"/></svg></a>
      ) : (
        <a href={p.social} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: 8, backgroundColor: '#fff', boxShadow: '0 1px 6px rgba(9,52,78,0.12)', textDecoration: 'none', transition: 'background-color 0.2s' }}
          onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#0A66C2')}
          onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#fff')}
        ><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" stroke="#0A66C2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><rect x="2" y="9" width="4" height="12" stroke="#0A66C2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><circle cx="4" cy="4" r="2" stroke="#0A66C2" strokeWidth="1.8"/></svg></a>
      )}
    </div>
  )
}

function PonenteCarousel({ ponentes }: { ponentes: Ponente[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState(0)
  const scrollTo = useCallback((dir: 1 | -1) => {
    const el = trackRef.current; if (!el) return
    el.scrollTo({ left: Math.max(0, Math.min(el.scrollLeft + dir * (310 + 20) * 3, el.scrollWidth - el.clientWidth)), behavior: 'smooth' })
  }, [])
  const onScroll = useCallback(() => { if (trackRef.current) setPos(trackRef.current.scrollLeft) }, [])
  const canPrev = pos > 10
  const canNext = trackRef.current ? pos < trackRef.current.scrollWidth - trackRef.current.clientWidth - 10 : true
  return (
    <div style={{ position: 'relative' }}>
      <div ref={trackRef} onScroll={onScroll} style={{ display: 'flex', gap: 20, overflowX: 'auto', paddingBottom: 8, scrollbarWidth: 'none', paddingInline: 4 }}>
        {ponentes.map(p => <PonenteCard key={p.nombre} p={p} />)}
      </div>
      {canPrev && <button onClick={() => scrollTo(-1)} aria-label="Anterior" style={{ position: 'absolute', top: '50%', left: -20, transform: 'translateY(-50%)', width: 38, height: 38, borderRadius: '50%', border: '1.5px solid #D9DEE2', backgroundColor: '#fff', boxShadow: '2px 2px 8px rgba(9,52,78,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 2 }}><svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 3L6 8l4 5" stroke="#09344e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></button>}
      {canNext && <button onClick={() => scrollTo(1)} aria-label="Siguiente" style={{ position: 'absolute', top: '50%', right: -20, transform: 'translateY(-50%)', width: 38, height: 38, borderRadius: '50%', border: '1.5px solid #D9DEE2', backgroundColor: '#fff', boxShadow: '2px 2px 8px rgba(9,52,78,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 2 }}><svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 3l4 5-4 5" stroke="#09344e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></button>}
      <style suppressHydrationWarning>{`div::-webkit-scrollbar{display:none}`}</style>
    </div>
  )
}

export default function AgendaPage() {
  const [diaActivo, setDiaActivo]   = useState(0)
  const [ponentes,  setPonentes]    = useState<Ponente[]>(PONENTES_FALLBACK)

  // ── Carga ponentes desde Salesforce, mantiene fallback si falla ──
 useEffect(() => {
  fetch('/api/salesforce/ponentes')
    .then(r => r.json())
    .then(data => {
      if (data.ponentes?.length > 0) {
        // ← Combina fallback + Salesforce, sin duplicados por nombre
        setPonentes(prev => {
          const sfNombres = new Set(data.ponentes.map((p: Ponente) => p.nombre))
          const soloFallback = prev.filter(p => !sfNombres.has(p.nombre))
          return [...soloFallback, ...data.ponentes]
        })
      }
    })
    .catch(() => { /* mantiene fallback */ })
}, [])

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>

      <HeroIceo
        badge="3ª Edición · Cali, Colombia"
        title={<>Programa{' '}<span style={{ color: '#ffffff', fontVariantNumeric: 'lining-nums' }}>3er ICEO</span></>}
        description={<>Tres días de conferencias, paneles, talleres<br />y experiencias para activar soluciones hídricas</>}
        cta={{ label: 'QUIERO ASISTIR →', href: '/marketing/registro' }}
        ctaSecondary={{ label: 'VER LÍNEAS TEMÁTICAS', href: '/marketing/lineas-tematicas' }}
        image="/icons/panelistas.svg"
        imageAlt="Panelistas 3ICEO"
        imageLabel="3° ICEO · 17-19 Ago · Cali"
        imageScale={1.30}
        waveVariant="overlap"
        waveColor="#F0F4F7"
      >
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 20, paddingBottom: 0 }}>
          <div style={{ display: 'inline-flex', backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: 20, boxShadow: '0 8px 32px rgba(9,52,78,0.20)', overflow: 'hidden' }}>
            {DIAS.map((d, i) => {
              const active = diaActivo === i
              return (
                <div key={d.id} role="button" tabIndex={0}
                  onClick={() => { setDiaActivo(i); setTimeout(() => document.getElementById('programa')?.scrollIntoView({ behavior: 'smooth' }), 100) }}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { setDiaActivo(i); setTimeout(() => document.getElementById('programa')?.scrollIntoView({ behavior: 'smooth' }), 100) } }}
                  style={{ width: 155, paddingTop: 14, paddingBottom: 14, paddingLeft: 12, paddingRight: 12, backgroundColor: active ? '#ffffff' : 'transparent', borderTop: `3px solid ${active ? d.colorAccent : 'transparent'}`, borderRight: i < DIAS.length - 1 ? '1px solid rgba(9,52,78,0.08)' : 'none', cursor: 'pointer', transition: 'all 0.22s', textAlign: 'center', userSelect: 'none', outline: 'none', opacity: active ? 1 : 0.75 }}
                  onMouseEnter={e => { if (!active) { const el = e.currentTarget as HTMLDivElement; el.style.opacity = '1'; el.style.backgroundColor = 'rgba(9,52,78,0.04)' } }}
                  onMouseLeave={e => { if (!active) { const el = e.currentTarget as HTMLDivElement; el.style.opacity = '0.75'; el.style.backgroundColor = 'transparent' } }}
                >
                  <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 9, fontWeight: 700, color: '#5A6E77', letterSpacing: '0.14em', marginBottom: 3 }}>{d.mes}</div>
                  <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 34, fontWeight: 700, color: d.colorAccent, lineHeight: 1 }}>{d.diaNum}</div>
                  <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 700, color: d.colorAccent, marginTop: 3, letterSpacing: '0.06em' }}>{d.diaSemana}</div>
                </div>
              )
            })}
          </div>
        </div>
      </HeroIceo>

      {/* ══ PONENTES ══════════════════════════════════════════════════════════ */}
      <section id="ponentes" style={{ backgroundColor: '#F0F4F7', padding: '48px 48px 80px', marginTop: -2 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <FadeIn>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(22px, 2.5vw, 30px)', fontWeight: 700, color: '#09344e', textAlign: 'center', marginBottom: 44 }}>
              Conoce a nuestros ponentes
            </h2>
          </FadeIn>
          <div style={{ padding: '0 24px', position: 'relative' }}>
            <PonenteCarousel ponentes={ponentes} />
          </div>
        </div>
      </section>

      <div style={{ lineHeight: 0, backgroundColor: '#F0F4F7' }}>
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none" style={{ width: '100%', height: 48, display: 'block' }}>
          <path d="M0,48 C360,0 720,48 1080,20 C1260,8 1380,40 1440,28 L1440,48 L0,48 Z" fill="#ffffff" />
        </svg>
      </div>

      {/* ══ PROGRAMA ══════════════════════════════════════════════════════════ */}
      <section id="programa" style={{ backgroundColor: '#ffffff', padding: '72px 48px 88px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <FadeIn>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(24px, 2.8vw, 34px)', fontWeight: 700, color: '#09344e', textAlign: 'center', marginBottom: 8 }}>Talleres y horarios</h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#5A6E77', textAlign: 'center', marginBottom: 36, lineHeight: 1.6 }}>Agenda preliminar basada en las líneas temáticas. El copy final podrá ajustarse más adelante.</p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 52 }}>
              <div style={{ display: 'flex', gap: 4, backgroundColor: '#E8EDF1', borderRadius: 999, padding: '4px', boxShadow: 'inset 0 2px 6px rgba(9,52,78,0.08)' }}>
                {DIAS.map((d, i) => {
                  const active = diaActivo === i
                  return (
                    <button key={d.id} onClick={() => setDiaActivo(i)} style={{ fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 700, padding: '11px 26px', borderRadius: 999, border: 'none', cursor: 'pointer', backgroundColor: active ? d.colorAccent : 'transparent', color: active ? '#ffffff' : '#5A6E77', transition: 'all 0.25s', boxShadow: active ? `0 2px 14px ${d.colorAccent}55` : 'none', whiteSpace: 'nowrap' }}
                      onMouseEnter={e => { if (!active) (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(9,52,78,0.08)' }}
                      onMouseLeave={e => { if (!active) (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent' }}
                    >
                      {d.diaNum} {d.mes} · {d.diaSemana}
                    </button>
                  )
                })}
              </div>
            </div>
          </FadeIn>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            {DIAS.map((dia, i) => {
              const active = diaActivo === i
              return (
                <div key={dia.id} onClick={() => setDiaActivo(i)}
                  style={{ display: 'grid', gridTemplateColumns: '280px 1fr 1fr', gap: 0, opacity: active ? 1 : 0.50, transition: 'opacity 0.3s', cursor: active ? 'default' : 'pointer', position: 'relative' }}
                  className="dia-row-inner"
                  onMouseEnter={e => { if (!active) (e.currentTarget as HTMLDivElement).style.opacity = '0.75' }}
                  onMouseLeave={e => { if (!active) (e.currentTarget as HTMLDivElement).style.opacity = '0.50' }}
                >
                  <div style={{ position: 'relative', paddingRight: 16, paddingBottom: 16 }}>
                    <div style={{ position: 'absolute', inset: 0, borderRadius: '48px 8px 48px 8px', backgroundColor: active ? dia.accentShadow : '#D9E6EC', transform: 'translate(10px, 10px)', zIndex: 0 }} />
                    <div style={{ position: 'relative', zIndex: 1, borderRadius: '48px 8px 48px 8px', backgroundColor: active ? dia.colorAccent : '#9FB8C4', padding: '36px 20px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', textAlign: 'center', height: '100%', transition: 'background-color 0.3s', boxSizing: 'border-box', minHeight: 280 }}>
                      <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.70)', letterSpacing: '0.14em', marginBottom: 4, textTransform: 'uppercase' }}>{dia.diaSemana}</div>
                      <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 96, fontWeight: 700, color: '#ffffff', lineHeight: 1, marginBottom: 4 }}>{dia.diaNum}</div>
                      <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.75)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>{dia.mes}</div>
                      <div style={{ padding: '8px 12px', backgroundColor: 'rgba(255,255,255,0.18)', borderRadius: 10, width: '100%' }}>
                        <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.60)', letterSpacing: '0.10em', textTransform: 'uppercase', marginBottom: 4 }}>{dia.label}</div>
                        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.92)', lineHeight: 1.45, textAlign: 'center' }}>{dia.tema}</p>
                      </div>
                    </div>
                  </div>
                  <div style={{ backgroundColor: '#ffffff', padding: '24px 20px', borderTop: `3px solid ${active ? dia.colorAccent : '#E8EDF1'}`, borderBottom: `3px solid ${active ? dia.colorAccent : '#E8EDF1'}`, transition: 'border-color 0.3s' }}>
                    <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 700, color: '#09344e', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 16, paddingBottom: 10, borderBottom: '2px solid #F0F4F7' }}>MAÑANA</div>
                    {dia.manana.map((s, j) => <SesionRow key={j} s={s} />)}
                  </div>
                  <div style={{ backgroundColor: '#ffffff', padding: '24px 20px', borderTop: `3px solid ${active ? dia.colorAccent : '#E8EDF1'}`, borderBottom: `3px solid ${active ? dia.colorAccent : '#E8EDF1'}`, borderRight: `3px solid ${active ? dia.colorAccent : '#E8EDF1'}`, borderRadius: '0 20px 20px 0', transition: 'border-color 0.3s' }}>
                    <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 700, color: '#09344e', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 16, paddingBottom: 10, borderBottom: '2px solid #F0F4F7' }}>TARDE</div>
                    {dia.tarde.map((s, j) => <SesionRow key={j} s={s} />)}
                  </div>
                </div>
              )
            })}
          </div>
          <FadeIn delay={0.2}>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', marginTop: 56, flexWrap: 'wrap' }}>
              <a href="https://pub-94aa83314f8a41088bff3c1130d43ebd.r2.dev/2%20ICEO/Mermoria%202ICEO/3ICEO/Memorias_Congreso%202%C2%BAICEO.pdf" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 10, backgroundColor: '#097589', color: '#fff', fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 700, padding: '13px 26px', borderRadius: 999, textDecoration: 'none', letterSpacing: '0.05em', transition: 'background-color 0.2s' }}
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#074954')}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#097589')}
              >
                <img src="/icons/icon_PDF.svg" alt="PDF" width={18} height={18} style={{ display: 'block', filter: 'brightness(0) invert(1)' }} />
                DESCARGAR HORARIOS PDF
              </a>
              <Link href="/marketing/lineas-tematicas"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: '#03A383', color: '#fff', fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 700, padding: '13px 26px', borderRadius: 999, textDecoration: 'none', letterSpacing: '0.05em', transition: 'background-color 0.2s' }}
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#007A63')}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#03A383')}
              >VER LÍNEAS TEMÁTICAS</Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionDonacion bg="#09344e" theme="dark" showTopWave={true} topWaveFrom="#ffffff" waveColor="#ffffff" showWave={true} />
      <SectionRedes bg="#ffffff" theme="light" />

      <style suppressHydrationWarning>{`
        .hero-grid { grid-template-columns: 1fr 1fr; }
        @media (max-width: 1100px) { .dia-row-inner { grid-template-columns: 220px 1fr 1fr !important; } }
        @media (max-width: 900px) {
          .hero-grid     { grid-template-columns: 1fr !important; }
          .dia-row-inner { grid-template-columns: 1fr !important; }
          .donacion-grid { grid-template-columns: 1fr !important; }
          .follow-grid   { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}