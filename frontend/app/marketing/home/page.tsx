'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import SectionDonacion from '@/components/sections/SectionDonacion'
import SectionRedes from '@/components/sections/SectionRedes'

// ─── ANIMATION HELPER ─────────────────────────────────────────────────────────
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
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── ICON HELPERS ─────────────────────────────────────────────────────────────
function IconCalendar({ size = 16, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
      <line x1="8" y1="14" x2="8.01" y2="14" strokeWidth="2.5"/>
      <line x1="12" y1="14" x2="12.01" y2="14" strokeWidth="2.5"/>
      <line x1="16" y1="14" x2="16.01" y2="14" strokeWidth="2.5"/>
    </svg>
  )
}

function IconOrganizations({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  )
}
function IconDays({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>
    </svg>
  )
}
function IconGlobe({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  )
}
function IconRecycle({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1 4 1 10 7 10"/><polyline points="23 20 23 14 17 14"/>
      <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
    </svg>
  )
}

// ─── WAVE HELPERS ──────────────────────────────────────────────────────────────
const WaveDown = ({ from, to, height = 72 }: { from: string; to: string; height?: number }) => (
  <div style={{ lineHeight: 0, backgroundColor: from }}>
    <svg viewBox={`0 0 1440 ${height}`} preserveAspectRatio="none"
      style={{ width: '100%', height, display: 'block' }}>
      <path d={`M0,0 C240,${height} 480,0 720,${height * 0.6} C960,${height} 1200,${height * 0.2} 1440,${height * 0.65} L1440,${height} L0,${height} Z`} fill={to} />
    </svg>
  </div>
)
const WaveUp = ({ from, to, height = 72 }: { from: string; to: string; height?: number }) => (
  <div style={{ lineHeight: 0, backgroundColor: from }}>
    <svg viewBox={`0 0 1440 ${height}`} preserveAspectRatio="none"
      style={{ width: '100%', height, display: 'block' }}>
      <path d={`M0,${height} C360,0 720,${height} 1080,${height * 0.35} C1260,${height * 0.1} 1380,${height * 0.7} 1440,${height * 0.45} L1440,${height} L0,${height} Z`} fill={to} />
    </svg>
  </div>
)

// ─── DATOS ────────────────────────────────────────────────────────────────────

// STATS — 6 recuadros del Legado 2°ICEO con imagen R2 en lugar de ícono SVG.
// Imagen pequeña centrada arriba (40×40, border-radius 10, objectFit cover),
// número grande y label debajo — mismo diseño de tarjeta que antes.
const STATS = [
  { num: '1.209+', label: 'Asistentes',        image: '/icons/talleres.svg'       },
  { num: '192',    label: 'Organizaciones',     image: '/icons/convenios.svg'       },
  { num: '30',     label: 'Panelistas',         image: '/icons/panelistas.svg'    },
  { num: '17',     label: 'Entidades aliadas',  image: '/icons/ent_aliados.svg'   },
  { num: '14',     label: 'Conferencias',       image: '/icons/conferencias.svg'  },
  { num: '28',     label: 'Stands Marketplace', image: '/icons/org_marletplace.svg'     },
]

// ────────────────────────────────────────────────────────────────────────────
// AGENDA — 3 días mismo formato.
// Día 19: sin badge "etiqueta", texto de jornada va en la descripción.
// Colores: #097589 (teal oficial), #09344e (navy oficial), #B58A00 (dorado).
// ────────────────────────────────────────────────────────────────────────────
const AGENDA_DIAS = [
  {
    dia: '17', mes: 'FEB', diasemana: 'Martes',
    tema: 'Agua, territorios vivos y comunidades',
    color: '#097589',
    desc: 'Un primer día para comprender la situación actual de las fuentes hídricas, compartir una visión de futuro y explorar qué iniciativas hacen falta para activar soluciones desde los territorios.',
    sesiones: [
      'Apertura institucional y bienvenida',
      'Conferencia magistral: estado actual de las fuentes hídricas',
      'Panel: comunidades, biodiversidad y cultura territorial',
      'Espacio de networking y articulación',
      'Mesas o sesiones temáticas por retos del territorio',
      'Taller colaborativo: visión compartida y prioridades de acción',
      'Síntesis del Día 1',
    ],
  },
  {
    dia: '18', mes: 'FEB', diasemana: 'Miércoles',
    tema: 'Cooperación internacional al desarrollo, innovación y mundo rural',
    color: '#09344e',
    desc: 'Un segundo día orientado a conectar cooperación, transferencia de conocimiento e innovación aplicada para impulsar soluciones territoriales, bioeconomía y desarrollo rural sostenible.',
    sesiones: [
      'Apertura del Día 2 y recapitulación',
      'Conferencia magistral: innovación para territorios vivos',
      'Panel: cooperación al desarrollo y alianzas Europa–LATAM',
      'Espacio de presentaciones, proyectos o pitches',
      'Mesas temáticas: universidad, territorio y tecnología aplicada',
      'Rueda de articulación y colaboración institucional',
      'Síntesis del Día 2',
    ],
  },
  {
    dia: '19', mes: 'FEB', diasemana: 'Jueves',
    tema: 'Conclusiones',
    color: '#B58A00',
    // ← CAMBIO 2: sin etiqueta badge; texto integrado en la descripción
    desc: 'Jornada de conclusiones: una jornada más breve para convertir aprendizajes y acuerdos en memoria útil, conclusiones compartidas y una hoja de ruta para futuras alianzas.',
    sesiones: [
      'Apertura breve y recapitulación general',
      'Relatoría y aprendizajes clave del congreso',
      'Mesa de conclusiones y acuerdos',
      'Construcción de hoja de ruta compartida',
      'Cierre institucional y próximos pasos',
    ],
  },
]

const LINEAS = [
  { num: '01', title: 'Territorios y naturaleza',      color: '#097589',
    desc: 'Protección de fuentes hídricas, restauración ecológica, cuencas y biodiversidad.',
    icon: <svg width={32} height={32} viewBox="0 0 32 32" fill="none"><path d="M16 4C16 4 6 14 6 20a10 10 0 0 0 20 0C26 14 16 4 16 4z" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.9)" strokeWidth={1.8} strokeLinejoin="round"/><path d="M11 23c1.5 2 4 3 6 2.5" stroke="rgba(255,255,255,0.7)" strokeWidth={1.6} strokeLinecap="round"/></svg> },
  { num: '02', title: 'Comunidad y cultura',           color: '#B53077',
    desc: 'Comunidades, mujeres, juventudes y saberes locales como guardianes del territorio.',
    icon: <svg width={32} height={32} viewBox="0 0 32 32" fill="none"><circle cx="10" cy="11" r="4" stroke="rgba(255,255,255,0.9)" strokeWidth={1.8}/><circle cx="22" cy="11" r="4" stroke="rgba(255,255,255,0.9)" strokeWidth={1.8}/><path d="M4 26c0-4 3-6 6-6M22 26c0-4-3-6-6-6M12 26c0-4 2-6 4-6s4 2 4 6" stroke="rgba(255,255,255,0.9)" strokeWidth={1.8} strokeLinecap="round"/></svg> },
  { num: '03', title: 'Innovación y conocimiento',     color: '#4886B5',
    desc: 'Universidad–territorio, IA, ciencia ciudadana y monitoreo ambiental.',
    icon: <svg width={32} height={32} viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="6" stroke="rgba(255,255,255,0.9)" strokeWidth={1.8}/><path d="M16 4v4M16 24v4M4 16h4M24 16h4" stroke="rgba(255,255,255,0.9)" strokeWidth={1.8} strokeLinecap="round"/><path d="M7.5 7.5l3 3M21.5 21.5l3 3M21.5 10.5l3-3M7.5 24.5l3-3" stroke="rgba(255,255,255,0.6)" strokeWidth={1.5} strokeLinecap="round"/></svg> },
  { num: '04', title: 'Economía y finanzas verdes',    color: '#03A383',
    desc: 'Bioeconomía, bonos verdes, empresa sostenible y economía circular.',
    icon: <svg width={32} height={32} viewBox="0 0 32 32" fill="none"><rect x="4" y="20" width="5" height="8" rx="1" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.9)" strokeWidth={1.6}/><rect x="13" y="14" width="5" height="14" rx="1" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.9)" strokeWidth={1.6}/><rect x="22" y="8" width="5" height="20" rx="1" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.9)" strokeWidth={1.6}/><path d="M5 16l8-6 7 4 7-9" stroke="rgba(255,255,255,0.7)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { num: '05', title: 'Política y gobernanza',         color: '#74B4A7',
    desc: 'Legislación ambiental, compromisos internacionales y gobernanza participativa.',
    icon: <svg width={32} height={32} viewBox="0 0 32 32" fill="none"><path d="M6 28V14l10-10 10 10v14" stroke="rgba(255,255,255,0.9)" strokeWidth={1.8} strokeLinejoin="round"/><rect x="12" y="20" width="8" height="8" rx="1" stroke="rgba(255,255,255,0.9)" strokeWidth={1.6}/><path d="M4 14h24" stroke="rgba(255,255,255,0.7)" strokeWidth={1.4} strokeLinecap="round"/></svg> },
]

const PONENTES = [
  { foto: '/icons/jose_serrano.svg',                      nombre: 'José Serrano Serna',      flag: '🇪🇸', org: 'Awaq ONGD',               rol: 'CEO–Presidente',             social: 'https://www.linkedin.com/in/jsserna5575/', socialType: 'linkedin' },
  { foto: '/icons/luis_alfonso.svg',                      nombre: 'Luis Alfonso Aguirre',    flag: '🇨🇴', org: 'PMI® Colombia',             rol: 'Program Manager',            social: 'https://www.linkedin.com/in/luis-alfonso-aguirre-montealegre-0770a91a/', socialType: 'linkedin' },
  { foto: '/icons/begona_hera.svg',                       nombre: 'Begoña de la Hera',       flag: '🇪🇸', org: 'Awaq ONGD',               rol: 'Directora Programa TEDI',    social: 'https://www.linkedin.com/in/bego%C3%B1a-de-la-hera-25ba801a/', socialType: 'linkedin' },
  { foto: '/images/ponentes_Liza_Rodriguez_Galvis.jpeg',  nombre: 'Liza Rodríguez Galvis',   flag: '🇨🇴', org: 'Gobernación Valle del Cauca', rol: 'Secretaria General',         social: 'https://www.instagram.com/lizarodriguez18', socialType: 'instagram' },
  { foto: '/images/ponentes_Gustavo_Herrera.jpeg',        nombre: 'Mtro. Gustavo Herrera',   flag: '🇨🇴', org: 'SELA',                      rol: 'Coordinador Desarrollo Social', social: 'https://www.linkedin.com/in/gustavo-herrera-3528a979/', socialType: 'linkedin' },
  { foto: '/images/ponentes_Santiago_Granados.jpg',       nombre: 'Santiago Granados',       flag: '🇨🇴', org: 'CEPAL–ONU',                 rol: 'Consultor',                  social: 'https://www.linkedin.com/in/santiago-granados-guti%C3%A9rez-94a65a21/', socialType: 'linkedin' },
]

const ALIADOS_LOGOS = [
  { src: '/icons/AWAQ_aliado.svg',           name: 'Awaq ONGD'                          },
  { src: '/icons/humans_pro.svg',            name: 'HumansPRO®'                         },
  { src: '/icons/logo_uni_USB.svg',          name: 'Univ. San Buenaventura'             },
  { src: '/icons/gob_valle_cauca.svg',       name: 'Gobernación del Valle del Cauca'    },
  { src: '/icons/sc_uni_lasalle_utopia.svg', name: 'Proyecto Utopía · U. de La Salle'  },
  { src: '/icons/sc_sophic.svg',             name: 'SoPhIC'                             },
]

const NOTICIAS = [
  { tag: 'Impacto', tagColor: '#097589', titulo: '1.209 asistentes marcaron historia en el 2ICEO',
    desc: 'El segundo congreso superó todas las expectativas con participación de 192 organizaciones ambientales de 9 países latinoamericanos.', fecha: 'Dic 2026', href: '/marketing/comunicaciones', img: '/icons/panelistas.svg' },
  { tag: 'Alianzas', tagColor: '#B53077', titulo: 'Nueva alianza con la Gobernación del Valle del Cauca',
    desc: 'El Valle del Cauca se suma como socio institucional clave del 3ICEO, reforzando el vínculo entre el congreso y el territorio anfitrión.', fecha: 'Ene 2027', href: '/marketing/comunicaciones', img: '/icons/ent_aliados.svg' },
  { tag: 'Programa', tagColor: '#4886B5', titulo: 'Líneas temáticas del 3ICEO: agua, cooperación y conclusiones',
    desc: 'Presentamos el marco conceptual que guiará los tres días del congreso: de los resultados de COP a los territorios vivos.', fecha: 'Feb 2027', href: '/marketing/comunicaciones', img: '/icons/conferencias.svg' },
]

const ENTREVISTAS = [
  {
    id: 1, label: 'Carolina Acosta', org: 'Emprendimiento Linsalde',
    src: 'https://pub-94aa83314f8a41088bff3c1130d43ebd.r2.dev/2%20ICEO/Mermoria%202ICEO/Carolina%20Acosta%20-%20Negocio%20Verde%20(1).mp4',
    quote: '"Estamos rodeados de naturaleza, de un ambiente muy natural… Es un espacio muy importante para las mujeres y para todos en general, de poder visibilizar cada uno de los esfuerzos y proyectos que tenemos para ayudar a mantener el medio ambiente."',
    texto: 'Carolina transforma envases plásticos en bolsos artesanales, conectando recicladores, artesanos y economía circular en una sola iniciativa.',
  },
  {
    id: 2, label: 'Franklin Corrales', org: 'Mesa Amplia de Jóvenes Ambientalistas',
    src: 'https://pub-94aa83314f8a41088bff3c1130d43ebd.r2.dev/2%20ICEO/Mermoria%202ICEO/Entrevista%20editada_Franklin%20Corrales%20-%20jovenes%20ambientalistas-2o%20ICEO.mp4',
    quote: '"Desde la academia se puede seguir construyendo y dando conocimiento a todo el mundo de qué es lo que estamos haciendo en nuestros territorios para replicar estos casos de éxito."',
    texto: 'Franklin representa a la juventud ambientalista del Valle del Cauca, convencido de que el territorio sostenible también genera ingresos y procesos sociales.',
  },
  {
    id: 3, label: 'Pablo Javier Rojas', org: 'Universidad San Buenaventura Cali',
    src: 'https://pub-94aa83314f8a41088bff3c1130d43ebd.r2.dev/2%20ICEO/Mermoria%202ICEO/Entrevista%20editada_Pablo%20Javier%20Rojas%20-%20USBC--2o%20ICEO.mp4',
    quote: '"Ese compartir de experiencias y de saberes es muy importante para lograr impulsar el territorio, involucrando a una serie de actores, de tecnologías, de experiencias."',
    texto: 'Pablo trabaja en el Centro Interdisciplinario de Estudios Humanísticos de la USB Cali, tejiendo alianzas entre academia, sociedad civil y territorios.',
  },
  {
    id: 4, label: 'Mónica Castillo', org: 'Parques Nacionales Naturales de Colombia',
    src: 'https://pub-94aa83314f8a41088bff3c1130d43ebd.r2.dev/2%20ICEO/Mermoria%202ICEO/Entrevista%20editada_M%C3%B3nica%20Castillo-Parques%20Naturales%20de%20Colombia-2o%20ICEO.mp4',
    quote: '"Este congreso es muy importante porque logra unir esas iniciativas comunitarias pero también institucionales en un espacio académico que es fundamental."',
    texto: 'Parques Nacionales administra 65 áreas estratégicas en todo Colombia. Mónica destaca cómo el ICEO conecta lo institucional con lo comunitario.',
  },
]

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [activeVideo, setActiveVideo] = useState(0)

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>

      {/* ══════════════════════════════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{
        position: 'relative',
        height: '100vh',
        maxHeight: 720,
        minHeight: 560,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,#09344e 0%,#1C495C 55%,#437287 100%)' }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/icons/ubicacion_home.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center 45%', opacity: 0.55,
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(95deg, rgba(9,52,78,0.92) 0%, rgba(9,52,78,0.80) 38%, rgba(9,52,78,0.30) 62%, rgba(9,52,78,0.05) 100%)',
        }} />
        <div style={{ position: 'absolute', top: 40, right: '8%',  width: 380, height: 380, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: -10, right: '4%', width: 540, height: 540, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.03)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1280, margin: '0 auto', padding: '0 48px', width: '100%' }}>
          <div style={{ maxWidth: 660 }}>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: 'rgba(255,255,255,0.10)', border: '1px solid rgba(192,255,242,0.30)', borderRadius: 999, padding: '5px 16px', marginBottom: 20 }}>
                <img src="/icons/icon-location.svg" alt="" width={12} height={12} style={{ filter: 'brightness(0) invert(1)', opacity: 0.8 }} />
                <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 10, fontWeight: 600, color: '#C0FFF2', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Universidad San Buenaventura · Cali, Colombia
                </span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontFamily: 'Gloock, Georgia, serif', fontSize: 'clamp(36px, 5.2vw, 70px)', fontWeight: 400, color: '#ffffff', lineHeight: 1.04, marginBottom: 18, letterSpacing: '-0.01em' }}
            >
              3er Congreso<br />
              <span style={{ color: '#AEE5DA' }}>Internacional</span> de<br />
              Organizaciones Ambientales
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.80)', lineHeight: 1.65, maxWidth: 480, marginBottom: 28 }}
            >
              El mayor encuentro anual del ecosistema ambiental latinoamericano.
              Aprendizaje, conexión y colaboración entre organizaciones, universidades y comunidades.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.40 }}
              style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}
            >
              {[
                { icon: <IconCalendar size={13} color="rgba(255,255,255,0.85)" />, label: '17–19 Febrero 2027' },
                { icon: <img src="/icons/icon-location.svg" alt="" width={12} height={12} style={{ filter: 'brightness(0) invert(1)', opacity: 0.85 }} />, label: 'Cali · Colombia' },
                { icon: <img src="/icons/icon-streaming.svg" alt="" width={13} height={13} style={{ filter: 'brightness(0) invert(1)', opacity: 0.85 }} />, label: 'Presencial + Virtual' },
              ].map(c => (
                <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: 7, backgroundColor: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 999, padding: '6px 14px', fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.90)' }}>
                  {c.icon}{c.label}
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.48 }}
              style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}
            >
              <Link href="/marketing/registro" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: '#B53077', color: '#fff', fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 700, padding: '13px 30px', borderRadius: 999, textDecoration: 'none', letterSpacing: '0.05em', boxShadow: '0 4px 24px rgba(181,48,119,0.45)' }}>
                QUIERO ASISTIR →
              </Link>
              <Link href="/marketing/agenda" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: 'transparent', border: '2px solid rgba(255,255,255,0.45)', color: '#fff', fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600, padding: '12px 28px', borderRadius: 999, textDecoration: 'none', letterSpacing: '0.04em' }}>
                Ver programa
              </Link>
            </motion.div>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, lineHeight: 0, zIndex: 3 }}>
          <svg viewBox="0 0 1440 64" preserveAspectRatio="none" style={{ width: '100%', height: 64, display: 'block' }}>
            <path d="M0,40 C360,64 720,10 1080,48 C1260,62 1380,28 1440,40 L1440,64 L0,64 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          2. AGENDA OFICIAL — primera sección después del hero
          CAMBIO 1: era sección 3, ahora es la primera después del hero.
          CAMBIO 2: día 19 sin badge "etiqueta", mismo formato que los 3.
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#ffffff', padding: '72px 48px 80px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#097589', marginBottom: 12 }}>Programa Oficial · 3ICEO 2027</p>
              <h2 style={{ fontFamily: 'Gloock, Georgia, serif', fontWeight: 400, fontSize: 'clamp(28px,3.5vw,44px)', color: '#09344e', lineHeight: 1.1, marginBottom: 12 }}>
                Tres días para escuchar los territorios,<br />construir soluciones y aterrizar conclusiones
              </h2>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#5A6E77', maxWidth: 560, margin: '0 auto', lineHeight: 1.6 }}>
                Agenda preliminar basada en las líneas temáticas. El copy final podrá ajustarse más adelante.
              </p>
            </div>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="agenda-grid">
            {AGENDA_DIAS.map((dia, i) => (
              <FadeIn key={dia.dia} delay={i * 0.12}>
                <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '2px 2px 16px rgba(9,52,78,0.10)', border: '1px solid rgba(9,52,78,0.07)', display: 'flex', flexDirection: 'column', height: '100%' }}>
                  {/* Header coloreado — mismo formato los 3, sin badge */}
                  <div style={{ backgroundColor: dia.color, padding: '24px 24px 20px', flexShrink: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
                      <div>
                        <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>{dia.diasemana}</div>
                        <div style={{ fontFamily: 'Gloock, Georgia, serif', fontSize: 46, fontWeight: 400, color: '#fff', lineHeight: 1 }}>{dia.dia}</div>
                        <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.75)', marginTop: 2 }}>{dia.mes} 2027</div>
                      </div>
                    </div>
                    <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 700, color: '#fff', lineHeight: 1.3, marginTop: 4 }}>{dia.tema}</div>
                  </div>
                  {/* Cuerpo blanco */}
                  <div style={{ backgroundColor: '#fff', padding: '20px 24px', flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#5A6E77', lineHeight: 1.65 }}>{dia.desc}</p>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>
                      {dia.sesiones.map((s, si) => (
                        <li key={si} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                          <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: dia.color, flexShrink: 0, marginTop: 5 }} />
                          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#3A4E58', lineHeight: 1.5 }}>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.5}>
            <div style={{ textAlign: 'center', marginTop: 36 }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#5A6E77', marginBottom: 16, maxWidth: 560, margin: '0 auto 20px', lineHeight: 1.6 }}>
                Nota: mantener agenda en nivel alto, alineada con las líneas temáticas. No cerrar todavía ponentes, horarios definitivos ni financiadores específicos.
              </p>
              <Link href="/marketing/agenda" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '2px solid #097589', color: '#097589', fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 600, padding: '12px 30px', borderRadius: 999, textDecoration: 'none', letterSpacing: '0.04em' }}>Ver agenda completa →</Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <WaveDown from="#ffffff" to="#09344e" />

      {/* ══════════════════════════════════════════════════════════════════════
          3. LÍNEAS TEMÁTICAS
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#09344e', padding: '72px 48px 80px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#74B4A7', marginBottom: 12 }}>Ejes de trabajo · 3ICEO</p>
              <h2 style={{ fontFamily: 'Gloock, Georgia, serif', fontWeight: 400, fontSize: 'clamp(28px,3.5vw,44px)', color: '#ffffff', lineHeight: 1.1, marginBottom: 16 }}>Líneas temáticas</h2>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.60)', lineHeight: 1.7, maxWidth: 480, margin: '0 auto' }}>Cinco marcos de conversación que ordenan el conocimiento y las alianzas del congreso.</p>
            </div>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, alignItems: 'stretch' }} className="lineas-grid">
            {LINEAS.map((l, i) => (
              <FadeIn key={l.num} delay={i * 0.09} style={{ display: 'flex' }}>
                <Link href="/marketing/lineas-tematicas" style={{ textDecoration: 'none', display: 'flex', width: '100%' }}>
                  <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '2px 2px 16px rgba(0,0,0,0.20)', width: '100%', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ backgroundColor: l.color, padding: '28px 20px 20px', display: 'flex', flexDirection: 'column', gap: 12, minHeight: 120 }}>
                      <div style={{ width: 48, height: 48, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{l.icon}</div>
                      <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.1em' }}>{l.num}</div>
                    </div>
                    <div style={{ backgroundColor: 'rgba(255,255,255,0.06)', padding: '18px', borderTop: '1px solid rgba(255,255,255,0.07)', flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>{l.title}</h3>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, margin: 0 }}>{l.desc}</p>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.55}>
            <div style={{ textAlign: 'center', marginTop: 40 }}>
              <Link href="/marketing/lineas-tematicas" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '2px solid rgba(174,229,218,0.45)', color: '#AEE5DA', fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 600, padding: '12px 30px', borderRadius: 999, textDecoration: 'none', letterSpacing: '0.04em' }}>Explorar líneas temáticas →</Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <WaveUp from="#09344e" to="#ffffff" />

      {/* ══════════════════════════════════════════════════════════════════════
          4. PONENTES DESTACADOS
          CAMBIO 4: botón "Ver todos los ponentes" → /marketing/agenda#ponentes
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#ffffff', padding: '72px 48px 80px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#097589', marginBottom: 12 }}>Voces del congreso</p>
              <h2 style={{ fontFamily: 'Gloock, Georgia, serif', fontWeight: 400, fontSize: 'clamp(28px,3.5vw,44px)', color: '#09344e', lineHeight: 1.1, marginBottom: 16 }}>Ponentes destacados</h2>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#5A6E77', lineHeight: 1.7, maxWidth: 480, margin: '0 auto' }}>Líderes, investigadores y gestores ambientales de Latinoamérica y Europa que comparten su conocimiento en el 3ICEO.</p>
            </div>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 20 }} className="speakers-grid">
            {PONENTES.map((p, i) => (
              <FadeIn key={p.nombre} delay={i * 0.08}>
                <div style={{ borderRadius: 16, overflow: 'hidden', backgroundColor: '#F7F6F3', border: '1.5px solid rgba(9,52,78,0.07)', textAlign: 'center', padding: '24px 16px 20px', boxShadow: '2px 2px 8px rgba(9,52,78,0.06)' }}>
                  <div style={{ width: 72, height: 72, borderRadius: '50%', overflow: 'hidden', margin: '0 auto 12px', border: '2px solid rgba(9,117,137,0.2)', background: 'linear-gradient(135deg,#097589 0%,#09344e 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={p.foto} alt={p.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                  <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 700, color: '#09344e', lineHeight: 1.3, marginBottom: 4 }}>{p.flag} {p.nombre}</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#097589', lineHeight: 1.4, marginBottom: 4 }}>{p.org}</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10.5, color: '#5A6E77', marginBottom: 14, lineHeight: 1.3 }}>{p.rol}</div>
                  <a href={p.social} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, borderRadius: 6, textDecoration: 'none', backgroundColor: p.socialType === 'linkedin' ? '#0A66C2' : '#E1306C' }}>
                    <img src={p.socialType === 'linkedin' ? '/icons/icon_linkedin.svg' : '/icons/icon_instagram.svg'} alt="" width={13} height={13} style={{ display: 'block', filter: 'brightness(0) invert(1)' }} />
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.55}>
            <div style={{ textAlign: 'center', marginTop: 36 }}>
              {/* CAMBIO 4: lleva a /marketing/agenda#ponentes para bajar a la sección de ponentes */}
              <Link href="/marketing/agenda#ponentes" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '2px solid #097589', color: '#097589', fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 600, padding: '12px 30px', borderRadius: 999, textDecoration: 'none', letterSpacing: '0.04em' }}>Ver todos los ponentes →</Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <WaveDown from="#ffffff" to="#F0F4F7" />

      {/* ══════════════════════════════════════════════════════════════════════
          5. ALIADOS
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#F0F4F7', padding: '72px 48px 80px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#097589', marginBottom: 12 }}>Construido entre todos</p>
              <h2 style={{ fontFamily: 'Gloock, Georgia, serif', fontWeight: 400, fontSize: 'clamp(28px,3.5vw,44px)', color: '#09344e', lineHeight: 1.1 }}>Aliados del 3ICEO</h2>
            </div>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 16, marginBottom: 40 }} className="logos-grid">
            {ALIADOS_LOGOS.map((a, i) => (
              <FadeIn key={a.name} delay={i * 0.08}>
                <div style={{ borderRadius: 14, border: '1.5px solid #D9DEE2', padding: '20px 16px', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, minHeight: 110, boxShadow: '2px 2px 8px rgba(9,52,78,0.05)' }}>
                  <img src={a.src} alt={a.name} style={{ maxWidth: 80, maxHeight: 50, objectFit: 'contain', display: 'block' }} />
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 10, fontWeight: 600, color: '#5A6E77', textAlign: 'center', lineHeight: 1.3 }}>{a.name}</span>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.5}>
            <div style={{ textAlign: 'center' }}>
              <Link href="/marketing/aliados" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: '#097589', color: '#fff', fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 600, padding: '12px 30px', borderRadius: 999, textDecoration: 'none', boxShadow: '0 2px 16px rgba(9,117,137,0.30)' }}>Conocer todos los aliados →</Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <WaveUp from="#F0F4F7" to="#ffffff" />

      {/* ══════════════════════════════════════════════════════════════════════
          6. MARKETPLACE
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', overflow: 'hidden', minHeight: 480, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,#09344e 0%,#1C495C 60%,#097589 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/icons/market_ex.svg)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.35 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(100deg,rgba(9,52,78,0.88) 0%,rgba(9,52,78,0.55) 55%,rgba(9,52,78,0.20) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1280, margin: '0 auto', padding: '80px 48px', width: '100%' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="marketplace-grid">
            <FadeIn>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: 'rgba(255,255,255,0.12)', border: '1px solid rgba(192,255,242,0.30)', borderRadius: 999, padding: '5px 14px', marginBottom: 20 }}>
                <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 10, fontWeight: 700, color: '#AEE5DA', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Marketplace Circular · 3ICEO</span>
              </div>
              <h2 style={{ fontFamily: 'Gloock, Georgia, serif', fontWeight: 400, fontSize: 'clamp(30px,3.8vw,52px)', color: '#ffffff', lineHeight: 1.05, marginBottom: 20 }}>28 organizaciones ambientales esperan conectar contigo</h2>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.80)', lineHeight: 1.75, marginBottom: 16 }}>Explora el Marketplace Circular del 3ICEO: un espacio inmersivo donde puedes navegar entre stands de organizaciones ambientales, conocer sus proyectos y establecer contacto directo.</p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.60)', lineHeight: 1.7, marginBottom: 36 }}>
                Muévete con las teclas WASD o las flechas. Acércate a un stand y presiona <strong style={{ color: '#AEE5DA' }}>E</strong> para ver la información de la organización.
              </p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <Link href="/marketing/marketplace" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: '#B53077', color: '#fff', fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 700, padding: '13px 30px', borderRadius: 999, textDecoration: 'none', letterSpacing: '0.04em', boxShadow: '0 4px 20px rgba(181,48,119,0.45)' }}>Explorar el Marketplace →</Link>
                <Link href="/marketing/registro?tipo=asistencia&stand=true" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '2px solid rgba(255,255,255,0.45)', color: '#fff', fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 600, padding: '13px 26px', borderRadius: 999, textDecoration: 'none', letterSpacing: '0.04em' }}>Reserva tu stand</Link>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {[
                  { num: '28',   label: 'Organizaciones',      Icon: IconOrganizations },
                  { num: '03',   label: 'Días de feria',       Icon: IconDays          },
                  { num: '9',    label: 'Países representados', Icon: IconGlobe         },
                  { num: '100%', label: 'Economía circular',   Icon: IconRecycle       },
                ].map(s => (
                  <div key={s.label} style={{ backgroundColor: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 14, padding: '20px', display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#AEE5DA' }}>
                      <s.Icon size={22} />
                    </div>
                    <div>
                      <div style={{ fontFamily: 'Gloock, Georgia, serif', fontSize: 26, fontWeight: 400, color: '#fff', lineHeight: 1 }}>{s.num}</div>
                      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.65)', marginTop: 2 }}>{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          7. SEDE DEL EVENTO
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#E6F3EE', padding: '72px 48px 80px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#097589', marginBottom: 12 }}>Sede del evento · 3ICEO 2027</p>
              <h2 style={{ fontFamily: 'Gloock, Georgia, serif', fontWeight: 400, fontSize: 'clamp(28px,3.5vw,44px)', color: '#09344e', lineHeight: 1.1 }}>Universidad de San Buenaventura · Cali</h2>
            </div>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, alignItems: 'stretch' }} className="sede-grid">
            <FadeIn>
              <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', minHeight: 400, background: 'linear-gradient(135deg,#09344e 0%,#1C495C 60%,#437287 100%)', boxShadow: '4px 4px 28px rgba(9,52,78,0.18)' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=900&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.55 }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(9,52,78,0.10) 0%,rgba(9,52,78,0.80) 100%)' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, backgroundColor: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.28)', backdropFilter: 'blur(6px)', borderRadius: 999, padding: '5px 14px', marginBottom: 16 }}>
                    <img src="/icons/icon-location.svg" alt="" width={11} height={11} style={{ filter: 'brightness(0) invert(1)', opacity: 0.9 }} />
                    <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 10, fontWeight: 700, color: '#ffffff', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Cali, Colombia</span>
                  </div>
                  <h3 style={{ fontFamily: 'Gloock, Georgia, serif', fontSize: 'clamp(22px,2.5vw,30px)', fontWeight: 400, color: '#ffffff', lineHeight: 1.2, marginBottom: 10 }}>Sede del evento</h3>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.78)', lineHeight: 1.6, maxWidth: 380 }}>Conoce el entorno e instalaciones de la universidad donde nos reuniremos para celebrar este encuentro.</p>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.12}>
              <div style={{ backgroundColor: '#ffffff', borderRadius: 20, padding: '36px', boxShadow: '2px 2px 16px rgba(9,52,78,0.08)', border: '1.5px solid rgba(9,117,137,0.12)', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, backgroundColor: '#F7F6F3', borderRadius: 12, padding: '12px 18px', marginBottom: 28, border: '1.5px solid #D9DEE2', alignSelf: 'flex-start' }}>
                  <img src="/icons/logo_uni_USB.svg" alt="USB Cali" height={36} style={{ display: 'block', objectFit: 'contain' }} />
                  <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 10, fontWeight: 700, color: '#09344e', lineHeight: 1.35, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Universidad de San<br />Buenaventura</div>
                </div>
                <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 20, fontWeight: 700, color: '#09344e', marginBottom: 12 }}>Ubicación</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#5A6E77', lineHeight: 1.75, marginBottom: 22 }}>Universidad de San Buenaventura, Cali — Ubicada en zona céntrica de fácil acceso desde las avenidas principales de la ciudad, en la zona universitaria de la Avenida Cañasgordas.</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32 }}>
                  <img src="/icons/icon-location.svg" alt="" width={15} height={15} style={{ display: 'block', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600, color: '#097589' }}>C/ Doctor Torres Navas 35, Cali 76110</span>
                </div>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <a href="https://maps.google.com/?q=Universidad+San+Buenaventura+Cali" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: '#097589', color: '#fff', fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 700, padding: '12px 22px', borderRadius: 999, textDecoration: 'none', boxShadow: '0 2px 12px rgba(9,117,137,0.30)' }}>
                    <img src="/icons/icon-location.svg" alt="" width={13} height={13} style={{ filter: 'brightness(0) invert(1)' }} />
                    Ver en el mapa
                  </a>
                  <a
                  href="https://usbcali.edu.co/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    border: '1.5px solid #097589',
                    color: '#097589',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: 13,
                    fontWeight: 600,
                    padding: '12px 20px',
                    borderRadius: 999,
                    textDecoration: 'none'
                  }}
                >
                  Ir al sitio de la universidad ↗
                </a>
                </div>
                <div style={{ borderTop: '1.5px solid #E6F3EE', margin: '28px 0' }} />
                <Link href="/marketing/registro" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: '#09344e', color: '#fff', fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 700, padding: '13px 28px', borderRadius: 999, textDecoration: 'none', letterSpacing: '0.04em', alignSelf: 'flex-start', boxShadow: '0 2px 16px rgba(9,52,78,0.25)' }}>
                  QUIERO ASISTIR →
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Ola separadora: Sede (#E6F3EE) → Legado (#ffffff) */}
      <WaveDown from="#E6F3EE" to="#ffffff" />

      {/* ══════════════════════════════════════════════════════════════════════
          8. LEGADO DEL 2° ICEO
             6 tarjetas: imagen ocupa TODO el card (full-cover),
             overlay degradado abajo, número grande + label encima.
             Fondo blanco para diferenciarse de Sede (#E6F3EE).
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#ffffff', padding: '20px 48px 60px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <FadeIn delay={0.05}>
            <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 600, color: '#097589', letterSpacing: '0.14em', textTransform: 'uppercase', textAlign: 'center', marginBottom: 28 }}>
              Legado del 2° ICEO · Cali 2026
            </p>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12 }} className="stats-grid">
            {STATS.map((s, i) => (
              <FadeIn key={s.label} delay={i * 0.07}>
                {/* Tarjeta: imagen full-cover, overlay suave abajo, número + label superpuestos */}
                <div style={{
                  position: 'relative',
                  borderRadius: 14,
                  overflow: 'hidden',
                  aspectRatio: '3/4',
                  boxShadow: '2px 2px 12px rgba(9,52,78,0.12)',
                  backgroundColor: '#09344e',
                }}>
                  {/* Imagen ocupa todo el card */}
                  <img
                    src={s.image}
                    alt={s.label}
                    style={{
                      position: 'absolute', inset: 0,
                      width: '100%', height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      display: 'block',
                    }}
                  />
                  {/* Overlay degradado de abajo para legibilidad del texto */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(9,52,78,0.88) 0%, rgba(9,52,78,0.40) 50%, rgba(9,52,78,0.08) 100%)',
                  }} />
                  {/* Número + label en la parte inferior */}
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    padding: '14px 14px 16px',
                    textAlign: 'center',
                  }}>
                    <div style={{
                      fontFamily: 'Gloock, Georgia, serif',
                      fontSize: 'clamp(24px, 2.5vw, 32px)',
                      fontWeight: 400,
                      color: '#ffffff',
                      lineHeight: 1,
                      marginBottom: 4,
                      textShadow: '0 1px 6px rgba(0,0,0,0.4)',
                    }}>
                      {s.num}
                    </div>
                    <div style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 11,
                      fontWeight: 500,
                      color: 'rgba(255,255,255,0.88)',
                      lineHeight: 1.3,
                      textShadow: '0 1px 4px rgba(0,0,0,0.4)',
                    }}>
                      {s.label}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.55}>
            <div style={{ textAlign: 'center', marginTop: 28 }}>
              <Link href="/marketing/segundo-iceo" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600, color: '#097589', textDecoration: 'none', border: '1.5px solid rgba(9,117,137,0.45)', borderRadius: 999, padding: '8px 22px' }}>
                Ver memoria del 2° ICEO →
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Ola separadora: Legado (#ffffff) → Voces (#F7F6F3) */}
      <WaveDown from="#ffffff" to="#F7F6F3" />

      {/* ══════════════════════════════════════════════════════════════════════
          9. VOCES DEL 2° ICEO
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#F7F6F3', padding: '72px 48px 80px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#097589', marginBottom: 12 }}>Edición 2026 · Cali, Colombia</p>
              <h2 style={{ fontFamily: 'Gloock, Georgia, serif', fontWeight: 400, fontSize: 'clamp(28px,3.5vw,44px)', color: '#09344e', lineHeight: 1.1, marginBottom: 16 }}>Voces del 2° ICEO</h2>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#5A6E77', lineHeight: 1.7, maxWidth: 480, margin: '0 auto' }}>El 2° ICEO fue un espacio de encuentro entre organizaciones, comunidades, líderes y jóvenes que construyen soluciones desde sus territorios.</p>
            </div>
          </FadeIn>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start' }} className="voces-grid">
            <FadeIn>
              <motion.div
                key={activeVideo}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <blockquote style={{ borderLeft: '3px solid #03A383', paddingLeft: 18, margin: '0 0 16px', fontFamily: 'Inter, sans-serif', fontSize: 15, fontStyle: 'italic', color: '#5A6E77', lineHeight: 1.75 }}>
                  {ENTREVISTAS[activeVideo].quote}
                </blockquote>
                <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 700, color: '#03A383', marginBottom: 6 }}>
                  — {ENTREVISTAS[activeVideo].label}
                </p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#097589', fontWeight: 600, marginBottom: 6 }}>
                  {ENTREVISTAS[activeVideo].org}
                </p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#5A6E77', lineHeight: 1.65 }}>
                  {ENTREVISTAS[activeVideo].texto}
                </p>
              </motion.div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 14 }}>
                  {ENTREVISTAS.map((e, i) => (
                    <button
                      key={e.id}
                      onClick={() => setActiveVideo(i)}
                      style={{ padding: '8px 4px', borderRadius: 8, border: activeVideo === i ? '2px solid #03A383' : '2px solid #C3DED9', backgroundColor: activeVideo === i ? '#03A383' : '#fff', color: activeVideo === i ? '#fff' : '#5A6E77', fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', letterSpacing: '0.02em' }}
                    >
                      {e.label}
                    </button>
                  ))}
                </div>
                <div style={{ borderRadius: 14, overflow: 'hidden', boxShadow: '4px 4px 24px rgba(9,52,78,0.2)', backgroundColor: '#000', aspectRatio: '16/9' }}>
                  <video
                    key={ENTREVISTAS[activeVideo].src}
                    controls
                    style={{ width: '100%', height: '100%', display: 'block', objectFit: 'contain', backgroundColor: '#000' }}
                  >
                    <source src={ENTREVISTAS[activeVideo].src} type="video/mp4" />
                  </video>
                </div>
                <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 12, color: '#5A6E77', marginTop: 10, textAlign: 'center', letterSpacing: '0.03em' }}>
                  {ENTREVISTAS[activeVideo].label} · 2° ICEO LATAM
                </p>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.5}>
            <div style={{ textAlign: 'center', marginTop: 40 }}>
              <Link href="/marketing/segundo-iceo" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: '#09344e', color: '#fff', fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 600, padding: '12px 30px', borderRadius: 999, textDecoration: 'none', boxShadow: '0 2px 16px rgba(9,52,78,0.25)' }}>
                Ver memoria completa del 2° ICEO →
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <WaveDown from="#F7F6F3" to="#ffffff" />

      {/* ══════════════════════════════════════════════════════════════════════
          10. NOTICIAS
          CAMBIO 3: sección "Momentos que definieron el 2° ICEO" ELIMINADA.
          Las noticias van directamente después de Voces.
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#ffffff', padding: '72px 48px 80px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 44, flexWrap: 'wrap', gap: 16 }}>
              <div>
                <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#097589', marginBottom: 8 }}>Centro de comunicaciones</p>
                <h2 style={{ fontFamily: 'Gloock, Georgia, serif', fontWeight: 400, fontSize: 'clamp(26px,3vw,38px)', color: '#09344e', lineHeight: 1.15 }}>Últimas noticias</h2>
              </div>
              <Link href="/marketing/comunicaciones" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600, color: '#097589', textDecoration: 'none', border: '1.5px solid rgba(9,117,137,0.35)', borderRadius: 999, padding: '8px 20px' }}>Ver todas →</Link>
            </div>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="noticias-grid">
            {NOTICIAS.map((n, i) => (
              <FadeIn key={n.titulo} delay={i * 0.1}>
                <Link href={n.href} style={{ textDecoration: 'none' }}>
                  <div style={{ borderRadius: 16, overflow: 'hidden', backgroundColor: '#fff', boxShadow: '2px 2px 12px rgba(9,52,78,0.08)', border: '1px solid rgba(9,52,78,0.06)', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ height: 140, background: 'linear-gradient(135deg,#09344e 0%,#1C495C 60%,#097589 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src={n.img} alt="" width={52} height={52} style={{ display: 'block', filter: 'brightness(0) invert(1)', opacity: 0.45 }} />
                    </div>
                    <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'space-between' }}>
                        <span style={{ backgroundColor: `${n.tagColor}18`, color: n.tagColor, fontFamily: 'Poppins, sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', borderRadius: 999, padding: '3px 10px' }}>{n.tag}</span>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#5A6E77' }}>{n.fecha}</span>
                      </div>
                      <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 700, color: '#09344e', lineHeight: 1.35 }}>{n.titulo}</h3>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#5A6E77', lineHeight: 1.6, flex: 1 }}>{n.desc}</p>
                      <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 600, color: '#097589' }}>Leer más →</span>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <SectionDonacion
        bg="#09344e"
        theme="dark"
        showTopWave={true}
        topWaveFrom="#ffffff"
      />
      <SectionRedes bg="#ffffff" theme="light" />

      {/* ── Responsive ── */}
      <style suppressHydrationWarning>{`
        @media (max-width: 1100px) {
          .lineas-grid   { grid-template-columns: repeat(3,1fr) !important; }
          .speakers-grid { grid-template-columns: repeat(3,1fr) !important; }
          .logos-grid    { grid-template-columns: repeat(3,1fr) !important; }
          .stats-grid    { grid-template-columns: repeat(3,1fr) !important; }
        }
        @media (max-width: 900px) {
          .agenda-grid       { grid-template-columns: 1fr !important; }
          .marketplace-grid  { grid-template-columns: 1fr !important; }
          .sede-grid         { grid-template-columns: 1fr !important; }
          .noticias-grid     { grid-template-columns: 1fr !important; }
          .speakers-grid     { grid-template-columns: repeat(2,1fr) !important; }
          .voces-grid        { grid-template-columns: 1fr !important; }
          .momentos-grid     { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 640px) {
          .lineas-grid   { grid-template-columns: 1fr 1fr !important; }
          .logos-grid    { grid-template-columns: 1fr 1fr !important; }
          .stats-grid    { grid-template-columns: repeat(2,1fr) !important; }
          .speakers-grid { grid-template-columns: 1fr 1fr !important; }
          .momentos-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}