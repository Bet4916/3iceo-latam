'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { IconLinkedin } from '@/components/ui/icons'

// ─── ANIMATION HELPER ─────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
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

// ─── TIPOS ────────────────────────────────────────────────────────────────────
interface Ponente {
  nombre: string
  cargo: string
  org: string
  pais: string
  flag: string
  img: string
  li: string
}

interface Sesion {
  hora: string
  titulo: string
  ponente?: string
  tipo: 'registro' | 'apertura' | 'conferencia' | 'taller' | 'pausa' | 'panel' | 'networking' | 'clausura'
  highlight?: boolean
}

interface DiaAgenda {
  id: string
  diaSemana: string
  diaNum: string
  mes: string
  temaTitulo: string
  temaDesc: string
  manana: Sesion[]
  tarde: Sesion[]
}

// ─── DATOS ────────────────────────────────────────────────────────────────────
const PONENTES: Ponente[] = [
  {
    nombre: 'José Serrano Serna',
    cargo:  'CEO-Presidente',
    org:    'Awaq ONGD',
    pais:   'España / Colombia',
    flag:   '🇪🇸',
    img:    'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
    li:     '#',
  },
  {
    nombre: 'Laura Cifuentes',
    cargo:  'Directora de Biodiversidad',
    org:    'Fundación Verde',
    pais:   'Colombia',
    flag:   '🇨🇴',
    img:    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    li:     '#',
  },
  {
    nombre: 'Rolando Evelio Pérez',
    cargo:  'Profesor Planta',
    org:    'Tec de Monterrey',
    pais:   'México',
    flag:   '🇲🇽',
    img:    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    li:     '#',
  },
  {
    nombre: 'Begoña de la Hera',
    cargo:  'Directora Programa TED',
    org:    'Awaq ONGD',
    pais:   'España',
    flag:   '🇪🇸',
    img:    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    li:     '#',
  },
]

const TIPO_COLOR: Record<Sesion['tipo'], { bg: string; text: string; border: string }> = {
  registro:    { bg: '#E6F3EE', text: '#097589',  border: '#AEE5DA' },
  apertura:    { bg: '#09344e', text: '#fff',      border: '#09344e' },
  conferencia: { bg: '#F7F6F3', text: '#12303E',   border: '#097589' },
  taller:      { bg: '#E6F3EE', text: '#004A3B',   border: '#03A383' },
  pausa:       { bg: '#F7F6F3', text: '#5A6E77',   border: '#D9DEE2' },
  panel:       { bg: '#DAEBF2', text: '#1C495C',   border: '#4886B5' },
  networking:  { bg: '#E0B6CD', text: '#802254',   border: '#B53077' },
  clausura:    { bg: '#09344e', text: '#fff',      border: '#09344e' },
}

const DIAS: DiaAgenda[] = [
  {
    id:         'martes',
    diaSemana:  'MARTES',
    diaNum:     '17',
    mes:        'FEBRERO',
    temaTitulo: 'Análisis de los resultados de la COP 16.',
    temaDesc:   'Un día dedicado al análisis de los acuerdos globales y su impacto en las organizaciones ambientales de Latinoamérica.',
    manana: [
      { hora: '07:00 – 08:00', titulo: 'Registro de asistentes',                                                tipo: 'registro' },
      { hora: '08:00 – 09:00', titulo: 'Apertura y bienvenida',                                                tipo: 'apertura', highlight: true },
      { hora: '09:00 – 10:00', titulo: 'Legados de la COP16',                                                  tipo: 'conferencia' },
      { hora: '10:00 – 10:30', titulo: 'Pausa para café',                                                       tipo: 'pausa' },
      { hora: '10:30 – 12:00', titulo: 'Política pública de la ley de tránisito · Política pública de equidad de género · Mujeres en biodiversidad y fortalecimiento institucional', tipo: 'taller' },
    ],
    tarde: [
      { hora: '12:30 – 14:00', titulo: 'Pausa para almuerzo',                                    tipo: 'pausa' },
      { hora: '14:00 – 16:00', titulo: 'Taller: Proyecto Ley de Iniciativa 315 de 2024 — Medidas ciudadanas de la biodiversidad, fuerza legal para cuidar el territorio', tipo: 'taller', highlight: true },
      { hora: '14:30 – 03:00', titulo: 'Talleres específicos',                                   tipo: 'taller' },
      { hora: '15:30 – 17:00', titulo: 'Marketplace & Networking',                               tipo: 'networking' },
    ],
  },
  {
    id:         'miercoles',
    diaSemana:  'MIÉRCOLES',
    diaNum:     '18',
    mes:        'FEBRERO',
    temaTitulo: 'Mujeres líderes en Organizaciones Ambientales.',
    temaDesc:   'Exploración del liderazgo femenino en el sector ambiental, con énfasis en educación integral y ecología.',
    manana: [
      { hora: '07:00 – 08:00', titulo: 'Registro de asistentes',                                       tipo: 'registro' },
      { hora: '08:00 – 08:45', titulo: 'Apertura Fabio Cardozo Montealegre — Gestor de Paz',           tipo: 'apertura', highlight: true },
      { hora: '08:45 – 09:30', titulo: 'UTOPÍA: Un horizonte educativa para el cuidado, la sostenibilidad y la ecología integral', tipo: 'conferencia' },
      { hora: '09:30 – 10:30', titulo: 'Pausa para café',                                               tipo: 'pausa' },
      { hora: '10:30 – 12:00', titulo: 'El papel de las mujeres en el cambio climático',               tipo: 'panel' },
    ],
    tarde: [
      { hora: '12:30 – 14:00', titulo: 'Pausa para almuerzo',                                tipo: 'pausa' },
      { hora: '14:00 – 14:30', titulo: 'Rap del Agua y la Montaña',                          tipo: 'clausura', highlight: true },
      { hora: '14:30 – 15:30', titulo: 'Comunidades resilientes al cambio climático',        tipo: 'taller' },
      { hora: '15:30 – 17:00', titulo: 'Marketplace & Networking',                           tipo: 'networking' },
    ],
  },
  {
    id:         'jueves',
    diaSemana:  'JUEVES',
    diaNum:     '19',
    mes:        'FEBRERO',
    temaTitulo: 'Tecnología y conservación ambiental.',
    temaDesc:   'Presentación de proyectos biotecnológicos y estaciones biológicas como herramientas clave para la conservación.',
    manana: [
      { hora: '07:00 – 08:00', titulo: 'Registro de asistentes',                          tipo: 'registro' },
      { hora: '08:00 – 08:30', titulo: 'Presentación José Serna | Awaq ONGD',             tipo: 'apertura', highlight: true },
      { hora: '08:30 – 09:00', titulo: 'Presentación Angélica | Awaq ONGD LATAM',        tipo: 'conferencia' },
      { hora: '09:00 – 09:30', titulo: 'Presentación Directoras — Estaciones Biológicas', tipo: 'conferencia' },
      { hora: '09:30 – 10:15', titulo: 'Pausa para café',                                 tipo: 'pausa' },
      { hora: '10:15 – 10:45', titulo: 'Presentación Begoña | Awaq ONGD LATAM',          tipo: 'conferencia' },
      { hora: '10:15 – 12:00', titulo: 'Presentación de Universidades',                   tipo: 'panel' },
    ],
    tarde: [
      { hora: '12:00 – 13:00', titulo: 'Pausa para almuerzo',                                       tipo: 'pausa' },
      { hora: '13:00 – 14:30', titulo: 'DEMO de los proyectos ABT y P&R',                           tipo: 'taller', highlight: true },
      { hora: '14:30 – 15:30', titulo: 'Manifiesto',                                                 tipo: 'panel' },
      { hora: '11:30 – 17:00', titulo: 'Ceremonia de Clausura y cierre Market Place (salsódromo)',   tipo: 'clausura', highlight: true },
    ],
  },
]

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function AgendaPage() {
  const [diaActivo, setDiaActivo] = useState<string>('martes')
  const diaData = DIAS.find(d => d.id === diaActivo)!

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
        {/* Blobs decorativos */}
        <div style={{
          position: 'absolute', top: -60, right: -60, width: 380, height: 380,
          borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(9,117,137,0.22) 0%,transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: 40, left: -40, width: 280, height: 280,
          borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(72,134,181,0.18) 0%,transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="container-brand" style={{ padding: '0 48px 0' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: 56, alignItems: 'center',
          }} className="hero-agenda-grid">

            {/* Texto */}
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                backgroundColor: 'rgba(9,117,137,0.18)',
                border: '1px solid rgba(9,117,137,0.4)',
                borderRadius: 999, padding: '6px 16px', marginBottom: 20,
              }}>
                <span style={{
                  fontFamily: 'Poppins, sans-serif', fontSize: 10, fontWeight: 600,
                  color: '#AEE5DA', textTransform: 'uppercase', letterSpacing: '0.1em',
                }}>
                  3° Edición · Cali, Colombia
                </span>
              </div>

              <h1 style={{
                fontFamily: 'Gloock, Georgia, serif',
                fontSize: 'clamp(30px, 4vw, 52px)',
                fontWeight: 400, color: '#fff',
                lineHeight: 1.15, marginBottom: 18,
              }}>
                Agenda del <span style={{ color: '#AEE5DA' }}>3° Congreso</span> Internacional de Organizaciones Ambientales
              </h1>

              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: 15,
                color: 'rgba(255,255,255,0.72)', lineHeight: 1.75,
                marginBottom: 32, maxWidth: 420,
              }}>
                Solicita tu asistencia para no quedarte sin plaza. El aforo es limitado.
              </p>

              <Link href="/marketing/registro" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                backgroundColor: '#B53077', color: '#fff',
                fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 700,
                padding: '13px 32px', borderRadius: 999, textDecoration: 'none',
                letterSpacing: '0.04em', textTransform: 'uppercase',
                boxShadow: '0 4px 20px rgba(181,48,119,0.35)',
              }}>
                Quiero Asistir →
              </Link>
            </motion.div>

            {/* Imagen hero */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
              style={{ position: 'relative' }}
            >
              <div style={{
                position: 'absolute', top: -12, right: -12,
                width: '100%', height: '100%',
                border: '2px solid rgba(174,229,218,0.2)',
                borderRadius: 16, zIndex: 0,
              }} />
              <div style={{
                position: 'relative', zIndex: 1,
                borderRadius: 14, overflow: 'hidden',
                aspectRatio: '4/3',
                boxShadow: '8px 8px 40px rgba(0,0,0,0.4)',
              }}>
                {/* Reemplaza con <Image> en producción */}
                <img
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80"
                  alt="Congreso ICEO"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(180deg,transparent 50%,rgba(9,52,78,0.6) 100%)',
                }} />
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── TABS DE DÍAS ── */}
        <div style={{
          marginTop: 48,
          display: 'flex', justifyContent: 'center', gap: 0,
          paddingBottom: 0,
        }}>
          {DIAS.map((dia) => {
            const activo = diaActivo === dia.id
            return (
              <button
                key={dia.id}
                onClick={() => setDiaActivo(dia.id)}
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: 13, fontWeight: activo ? 700 : 500,
                  padding: '14px 36px',
                  backgroundColor: activo ? '#fff' : 'rgba(255,255,255,0.10)',
                  color:           activo ? '#09344e' : 'rgba(255,255,255,0.70)',
                  border: 'none', cursor: 'pointer',
                  borderRadius: activo ? '10px 10px 0 0' : '10px 10px 0 0',
                  transition: 'all .2s',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
                }}
              >
                <span style={{ fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>
                  {dia.diaSemana}
                </span>
                <span style={{
                  fontSize: activo ? 26 : 20, fontWeight: 800, lineHeight: 1,
                  color: activo ? '#097589' : 'inherit',
                }}>
                  {dia.diaNum}
                </span>
                <span style={{ fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  {dia.mes}
                </span>
              </button>
            )
          })}
        </div>

        {/* Wave */}
        <div style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 40" preserveAspectRatio="none" style={{ width: '100%', height: 40, display: 'block' }}>
            <path d="M0,20 C480,40 960,0 1440,20 L1440,40 L0,40 Z" fill="#F7F6F3" />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          HORARIOS DEL DÍA SELECCIONADO
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#F7F6F3', padding: '60px 0 80px' }}>
        <div className="container-brand" style={{ padding: '0 48px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={diaActivo}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Título del día */}
              <div style={{
                display: 'flex', alignItems: 'flex-start', gap: 28,
                marginBottom: 40,
              }}>
                {/* Date pill */}
                <div style={{
                  background: '#09344e', borderRadius: 12,
                  padding: '16px 20px', textAlign: 'center',
                  minWidth: 90, flexShrink: 0,
                  boxShadow: '2px 2px 8px rgba(9,52,78,0.2)',
                }}>
                  <div style={{
                    fontFamily: 'Poppins, sans-serif', fontSize: 10, fontWeight: 700,
                    color: '#AEE5DA', letterSpacing: '0.1em', textTransform: 'uppercase',
                  }}>
                    {diaData.diaSemana}
                  </div>
                  <div style={{
                    fontFamily: 'Poppins, sans-serif', fontSize: 38, fontWeight: 800,
                    color: '#fff', lineHeight: 1,
                  }}>
                    {diaData.diaNum}
                  </div>
                  <div style={{
                    fontFamily: 'Poppins, sans-serif', fontSize: 10, fontWeight: 600,
                    color: '#AEE5DA', letterSpacing: '0.08em', textTransform: 'uppercase',
                    marginTop: 2,
                  }}>
                    {diaData.mes}
                  </div>
                </div>

                <div style={{ paddingTop: 4 }}>
                  <h2 style={{
                    fontFamily: 'Poppins, sans-serif', fontSize: 22, fontWeight: 700,
                    color: '#09344e', marginBottom: 8, lineHeight: 1.25,
                  }}>
                    {diaData.temaTitulo}
                  </h2>
                  <p style={{
                    fontFamily: 'Inter, sans-serif', fontSize: 14,
                    color: '#5A6E77', lineHeight: 1.7, maxWidth: 600,
                  }}>
                    {diaData.temaDesc}
                  </p>
                </div>
              </div>

              {/* Horario MAÑANA / TARDE */}
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24,
              }} className="horario-grid">

                {/* MAÑANA */}
                <div>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 700,
                    color: '#097589', letterSpacing: '0.1em', textTransform: 'uppercase',
                    marginBottom: 14,
                  }}>
                    ☀️ MAÑANA
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {diaData.manana.map((s, i) => (
                      <SesionRow key={i} sesion={s} />
                    ))}
                  </div>
                </div>

                {/* TARDE */}
                <div>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 700,
                    color: '#B53077', letterSpacing: '0.1em', textTransform: 'uppercase',
                    marginBottom: 14,
                  }}>
                    🌤️ TARDE
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {diaData.tarde.map((s, i) => (
                      <SesionRow key={i} sesion={s} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* CTAs Agenda */}
          <FadeIn style={{ marginTop: 48, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <a href="#" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              backgroundColor: '#097589', color: '#fff',
              fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 700,
              padding: '13px 28px', borderRadius: 999, textDecoration: 'none',
              letterSpacing: '0.04em', textTransform: 'uppercase',
            }}>
              ↓ Descargar horarios PDF
            </a>
            <Link href="/marketing/lineas-tematicas" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              backgroundColor: 'transparent', color: '#097589',
              border: '2px solid #097589',
              fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 700,
              padding: '11px 28px', borderRadius: 999, textDecoration: 'none',
              letterSpacing: '0.04em', textTransform: 'uppercase',
            }}>
              Ver líneas temáticas →
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          PONENTES DESTACADOS
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#fff', padding: '80px 0' }}>
        <div className="container-brand" style={{ padding: '0 48px' }}>

          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 12 }}>
              <span style={{
                fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 600,
                color: '#097589', letterSpacing: '0.12em', textTransform: 'uppercase',
              }}>
                PONENTES
              </span>
            </div>
            <h2 style={{
              fontFamily: 'Poppins, sans-serif', fontSize: 28, fontWeight: 600,
              color: '#09344e', textAlign: 'center', marginBottom: 48,
            }}>
              Conoce a nuestros ponentes
            </h2>
          </FadeIn>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 24,
          }} className="ponentes-grid">
            {PONENTES.map((p, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div
                  style={{
                    backgroundColor: '#fff', borderRadius: 14, overflow: 'hidden',
                    boxShadow: '2px 2px 8px rgba(9,52,78,0.08)',
                    transition: 'transform .2s, box-shadow .2s',
                    display: 'flex', flexDirection: 'column',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px)'
                    ;(e.currentTarget as HTMLDivElement).style.boxShadow = '4px 12px 28px rgba(9,52,78,0.15)'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
                    ;(e.currentTarget as HTMLDivElement).style.boxShadow = '2px 2px 8px rgba(9,52,78,0.08)'
                  }}
                >
                  {/* Foto */}
                  <div style={{ height: 200, overflow: 'hidden', position: 'relative' }}>
                    <img
                      src={p.img}
                      alt={p.nombre}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    {/* Gradient overlay */}
                    <div style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0, height: 60,
                      background: 'linear-gradient(0deg,rgba(9,52,78,0.7) 0%,transparent 100%)',
                    }} />
                    {/* Flag */}
                    <div style={{
                      position: 'absolute', bottom: 10, left: 14,
                      fontSize: 18, lineHeight: 1,
                    }}>
                      {p.flag}
                    </div>
                  </div>

                  {/* Info */}
                  <div style={{ padding: '16px 18px 20px', flex: 1 }}>
                    <div style={{
                      fontFamily: 'Poppins, sans-serif', fontWeight: 700,
                      fontSize: 15, color: '#09344e', marginBottom: 2,
                    }}>
                      {p.nombre}
                    </div>
                    <div style={{
                      fontFamily: 'Poppins, sans-serif', fontSize: 12,
                      color: '#097589', fontWeight: 600, marginBottom: 2,
                    }}>
                      {p.cargo}
                    </div>
                    <div style={{
                      fontFamily: 'Inter, sans-serif', fontSize: 12,
                      color: '#5A6E77', marginBottom: 14,
                    }}>
                      {p.org}
                    </div>

                    <Link href={p.li} style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      width: 32, height: 32, borderRadius: '50%',
                      backgroundColor: '#0A66C2', color: '#fff',
                    }}>
                      <IconLinkedin size={15} color="white" />
                    </Link>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Paginación decorativa */}
          <FadeIn style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 32 }}>
            {[0, 1, 2, 3].map(i => (
              <div key={i} style={{
                width: i === 0 ? 24 : 8, height: 8, borderRadius: 999,
                backgroundColor: i === 0 ? '#097589' : '#D9DEE2',
                transition: 'all .2s',
              }} />
            ))}
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          DONACIÓN
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{
        background: 'linear-gradient(135deg,#09344e 0%,#1C495C 100%)',
        padding: '80px 0',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: -80, right: -80, width: 360, height: 360,
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
                fontFamily: 'Poppins, sans-serif', fontSize: 32, fontWeight: 700,
                color: '#fff', marginBottom: 14, lineHeight: 1.25,
              }}>
                ¡Gracias a tu donación, nadie se queda fuera!
              </h2>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: 15,
                color: 'rgba(255,255,255,0.75)', lineHeight: 1.75, marginBottom: 12,
              }}>
                Tu ayuda permite que organizaciones ambientales sin recursos puedan
                asistir al 3° ICEO y formar parte de un espacio de aprendizaje,
                conexión y colaboración único.
              </p>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: 13,
                color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: 28,
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
                borderRadius: 14, overflow: 'hidden',
                boxShadow: '8px 8px 40px rgba(0,0,0,0.35)',
                aspectRatio: '4/3',
              }}>
                <img
                  src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80"
                  alt="Donación"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
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
              <div style={{
                background: 'linear-gradient(135deg,#74B4A7 0%,#097589 100%)',
                borderRadius: 20, padding: '40px 36px',
                textAlign: 'center', color: '#fff',
                boxShadow: '4px 4px 24px rgba(9,117,137,0.25)',
              }}>
                <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 36, fontWeight: 800, letterSpacing: '0.04em', marginBottom: 4 }}>
                  FOLLOW US!
                </div>
                <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 600, opacity: 0.85, marginBottom: 4 }}>
                  ON SOCIAL MEDIA
                </div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, opacity: 0.65, marginBottom: 24 }}>
                  @awaqong
                </div>
                <div style={{ display: 'flex', gap: 14, justifyContent: 'center' }}>
                  {['instagram', 'facebook', 'linkedin'].map(net => (
                    <Link key={net} href="#" style={{
                      width: 42, height: 42, borderRadius: '50%',
                      border: '2px solid rgba(255,255,255,0.6)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff', textDecoration: 'none',
                      fontFamily: 'Poppins, sans-serif', fontSize: 16, fontWeight: 700,
                    }}>
                      {net === 'instagram' ? '📷' : net === 'facebook' ? '👥' : '💼'}
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { label: 'Instagram', bg: '#E1306C', icon: '📸' },
                  { label: 'Facebook',  bg: '#1877F2', icon: '👍' },
                  { label: 'LinkedIn',  bg: '#0A66C2', icon: '💼' },
                ].map(({ label, bg, icon }) => (
                  <Link key={label} href="#" style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    backgroundColor: '#fff', border: '1.5px solid #D9DEE2',
                    borderRadius: 10, padding: '12px 18px',
                    textDecoration: 'none', color: '#12303E',
                    fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 600,
                    transition: 'border-color .2s',
                    boxShadow: '2px 2px 8px rgba(9,52,78,0.06)',
                  }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 8,
                      backgroundColor: bg,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 18, flexShrink: 0,
                    }}>
                      {icon}
                    </div>
                    {label}
                    <span style={{ marginLeft: 'auto', color: '#097589', fontSize: 12 }}>→</span>
                  </Link>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── RESPONSIVE ── */}
      <style suppressHydrationWarning>{`
        @media (max-width: 1024px) {
          .ponentes-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 900px) {
          .hero-agenda-grid { grid-template-columns: 1fr !important; }
          .horario-grid     { grid-template-columns: 1fr !important; }
          .donacion-grid    { grid-template-columns: 1fr !important; }
          .follow-grid      { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .ponentes-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  )
}

// ─── COMPONENTE FILA DE SESIÓN ─────────────────────────────────────────────────
function SesionRow({ sesion }: { sesion: Sesion }) {
  const colors = TIPO_COLOR[sesion.tipo]
  const isPausa = sesion.tipo === 'pausa'

  return (
    <div style={{
      display: 'flex', gap: 12, alignItems: 'flex-start',
      backgroundColor: sesion.highlight ? colors.bg : '#fff',
      borderRadius: 10,
      borderLeft: `3px solid ${colors.border}`,
      padding: isPausa ? '8px 14px' : '12px 14px',
      boxShadow: sesion.highlight ? `0 2px 10px ${colors.border}40` : '2px 2px 8px rgba(9,52,78,0.05)',
      opacity: isPausa ? 0.7 : 1,
    }}>
      {/* Hora */}
      <span style={{
        fontFamily: 'Poppins, sans-serif', fontWeight: 700,
        fontSize: 11, color: '#097589',
        minWidth: 88, flexShrink: 0, paddingTop: 2,
        lineHeight: 1.4,
      }}>
        {sesion.hora}
      </span>

      {/* Título */}
      <span style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: 13, color: sesion.highlight ? colors.text : '#12303E',
        lineHeight: 1.5, flex: 1,
        fontWeight: sesion.highlight ? 600 : 400,
      }}>
        {sesion.titulo}
      </span>

      {/* Badge tipo */}
      {!isPausa && (
        <span style={{
          fontFamily: 'Poppins, sans-serif', fontSize: 9, fontWeight: 700,
          color: colors.text, backgroundColor: colors.bg,
          border: `1px solid ${colors.border}`,
          borderRadius: 999, padding: '3px 8px',
          textTransform: 'uppercase', letterSpacing: '0.06em',
          flexShrink: 0, alignSelf: 'flex-start', marginTop: 2,
          whiteSpace: 'nowrap',
        }}>
          {sesion.tipo}
        </span>
      )}
    </div>
  )
}
