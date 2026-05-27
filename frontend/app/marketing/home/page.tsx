'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

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

// ─── INLINE ICON HELPERS ──────────────────────────────────────────────────────
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

const STATS = [
  { num: '1.209+', label: 'Asistentes',        icon: '/icons/icon_asistentes.svg'       },
  { num: '192',    label: 'Organizaciones',     icon: '/icons/icon_organizaciones.svg'   },
  { num: '30',     label: 'Panelistas',         icon: '/icons/panelistas.svg'            },
  { num: '17',     label: 'Entidades aliadas',  icon: '/icons/ent_aliados.svg'           },
  { num: '14',     label: 'Conferencias',       icon: '/icons/conferencias.svg'          },
  { num: '28',     label: 'Stands Marketplace', icon: '/icons/org_marletplace.svg'       },
]

const MOMENTOS = [
  { num: '30', label: 'Panelistas',                        image: '/icons/panelistas.svg',              bg: 'linear-gradient(135deg,#09344e 0%,#1C495C 100%)' },
  { num: '14', label: 'Conferencias',                      image: '/icons/conferencias.svg',            bg: 'linear-gradient(135deg,#097589 0%,#09344e 100%)' },
  { num: '02', label: 'Conversatorios',                    image: '/icons/conversatorios.svg',          bg: 'linear-gradient(135deg,#4886B5 0%,#12303E 100%)' },
  { num: '28', label: 'Organizaciones en el Marketplace',  image: '/icons/org_marletplace.svg',         bg: 'linear-gradient(135deg,#03A383 0%,#09344e 100%)' },
  { num: '02', label: 'Convenios',                         image: '/icons/convenios.svg',               bg: 'linear-gradient(135deg,#1C495C 0%,#097589 100%)' },
  { num: '05', label: 'Talleres',                          image: '/icons/talleres.svg',                bg: 'linear-gradient(135deg,#12303E 0%,#4886B5 100%)' },
  { num: '17', label: 'Entidades aliadas',                 image: '/icons/ent_aliados.svg',             bg: 'linear-gradient(135deg,#09344e 0%,#03A383 100%)' },
  { num: '03', label: 'Días de Marketplace',               image: '/icons/dias_marletplace.svg',        bg: 'linear-gradient(135deg,#097589 0%,#4886B5 100%)' },
  { num: '09', label: 'Universidades aliadas',             image: '/icons/uni_aliadas.svg',             bg: 'linear-gradient(135deg,#1C495C 0%,#09344e 100%)' },
]

const AGENDA_DIAS = [
  { dia: '17', mes: 'FEB', diasemana: 'Martes',    tema: 'Análisis de la COP', color: '#097589',
    desc: 'Resultados, legados y desafíos de la última COP desde la perspectiva latinoamericana.', sesiones: 6 },
  { dia: '18', mes: 'FEB', diasemana: 'Miércoles', tema: 'Agua y Territorios', color: '#09344e',
    desc: 'Protección de fuentes hídricas, cuencas vivas, biodiversidad y comunidades.', sesiones: 7 },
  { dia: '19', mes: 'FEB', diasemana: 'Jueves',    tema: 'Cooperación e Innovación', color: '#4886B5',
    desc: 'Alianzas Europa–LATAM, transferencia tecnológica y modelos rurales sostenibles.', sesiones: 5 },
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

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>

      {/* ══════════════════════════════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', minHeight: 680, overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,#09344e 0%,#1C495C 55%,#437287 100%)' }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/icons/ubicacion_home.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center 45%', opacity: 0.55,
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(100deg,rgba(9,52,78,0.80) 0%,rgba(9,52,78,0.50) 55%,rgba(9,52,78,0.15) 100%)' }} />
        <div style={{ position: 'absolute', top: 60, right: '10%', width: 360, height: 360, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 20, right: '6%',  width: 520, height: 520, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.03)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1280, margin: '0 auto', padding: '120px 48px 100px', width: '100%' }}>
          <div style={{ maxWidth: 720 }}>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: 'rgba(255,255,255,0.10)', border: '1px solid rgba(192,255,242,0.30)', borderRadius: 999, padding: '6px 18px', marginBottom: 28 }}>
                <img src="/icons/icon-location.svg" alt="" width={13} height={13} style={{ filter: 'brightness(0) invert(1)', opacity: 0.8 }} />
                <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 600, color: '#C0FFF2', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Universidad San Buenaventura · Cali, Colombia
                </span>
              </div>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontFamily: 'Gloock, Georgia, serif', fontSize: 'clamp(44px, 6vw, 82px)', fontWeight: 400, color: '#ffffff', lineHeight: 1.04, marginBottom: 24, letterSpacing: '-0.01em' }}>
              3er Congreso<br />
              <span style={{ color: '#AEE5DA' }}>Internacional</span> de<br />
              Organizaciones Ambientales
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
              style={{ fontFamily: 'Inter, sans-serif', fontSize: 17, color: 'rgba(255,255,255,0.78)', lineHeight: 1.7, maxWidth: 520, marginBottom: 40 }}>
              El mayor encuentro anual del ecosistema ambiental latinoamericano.
              Aprendizaje, conexión y colaboración entre organizaciones, universidades y comunidades.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.42 }}
              style={{ display: 'flex', gap: 10, marginBottom: 40, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, backgroundColor: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 999, padding: '7px 16px', fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.90)' }}>
                <IconCalendar size={14} color="rgba(255,255,255,0.85)" />
                17–19 Febrero 2027
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, backgroundColor: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 999, padding: '7px 16px', fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.90)' }}>
                <img src="/icons/icon-location.svg" alt="" width={13} height={13} style={{ filter: 'brightness(0) invert(1)', opacity: 0.85 }} />
                Cali · Colombia
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, backgroundColor: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 999, padding: '7px 16px', fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.90)' }}>
                <img src="/icons/icon-streaming.svg" alt="" width={14} height={14} style={{ filter: 'brightness(0) invert(1)', opacity: 0.85 }} />
                Presencial + Virtual
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.5 }}
              style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link href="/marketing/registro" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: '#B53077', color: '#fff', fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 700, padding: '14px 34px', borderRadius: 999, textDecoration: 'none', letterSpacing: '0.05em', boxShadow: '0 4px 24px rgba(181,48,119,0.45)' }}>
                QUIERO ASISTIR →
              </Link>
              <Link href="/marketing/agenda" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: 'transparent', border: '2px solid rgba(255,255,255,0.5)', color: '#fff', fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 600, padding: '14px 32px', borderRadius: 999, textDecoration: 'none', letterSpacing: '0.04em' }}>
                Ver programa
              </Link>
            </motion.div>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, lineHeight: 0, zIndex: 3 }}>
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ width: '100%', height: 80, display: 'block' }}>
            <path d="M0,40 C360,80 720,10 1080,55 C1260,70 1380,30 1440,45 L1440,80 L0,80 Z" fill="#E6F3EE" />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          2. STATS BAR
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#E6F3EE', padding: '20px 48px 60px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <FadeIn delay={0.05}>
            <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 600, color: '#097589', letterSpacing: '0.14em', textTransform: 'uppercase', textAlign: 'center', marginBottom: 28 }}>
              Legado del 2° ICEO · Cali 2026
            </p>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12 }} className="stats-grid">
            {STATS.map((s, i) => (
              <FadeIn key={s.label} delay={i * 0.07}>
                <div style={{ textAlign: 'center', padding: '22px 12px', borderRadius: 14, backgroundColor: '#ffffff', border: '1.5px solid rgba(9,117,137,0.12)', boxShadow: '2px 2px 8px rgba(9,52,78,0.06)' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg,#E6F3EE 0%,#AEE5DA 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
                    <img src={s.icon} alt="" width={20} height={20} style={{ display: 'block' }} />
                  </div>
                  <div style={{ fontFamily: 'Gloock, Georgia, serif', fontSize: 26, fontWeight: 400, color: '#097589', lineHeight: 1, marginBottom: 4 }}>{s.num}</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#5A6E77', lineHeight: 1.35 }}>{s.label}</div>
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

      <WaveDown from="#E6F3EE" to="#ffffff" />

      {/* ══════════════════════════════════════════════════════════════════════
          3. MOMENTOS 2° ICEO
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#ffffff', padding: '72px 48px 80px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#097589', marginBottom: 12 }}>
                Edición 2026 · Cali, Colombia
              </p>
              <h2 style={{ fontFamily: 'Gloock, Georgia, serif', fontWeight: 400, fontSize: 'clamp(28px,3.5vw,44px)', color: '#09344e', lineHeight: 1.1, marginBottom: 16 }}>
                Momentos que definieron el 2° ICEO
              </h2>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#5A6E77', lineHeight: 1.7, maxWidth: 480, margin: '0 auto' }}>
                Revive el impacto del congreso anterior y conoce lo que el 3ICEO tiene preparado para superar esos números.
              </p>
            </div>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="momentos-grid">
            {MOMENTOS.map((m, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div style={{ borderRadius: 14, overflow: 'hidden', position: 'relative', aspectRatio: '4/3', boxShadow: '2px 2px 8px rgba(18,48,62,0.15)' }}>
                  <div style={{ position: 'absolute', inset: 0, background: m.bg }} />
                  <img src={m.image} alt={m.label} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: 0.35 }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(0deg,rgba(9,52,78,0.92) 0%,transparent 100%)', padding: '32px 18px 16px', display: 'flex', alignItems: 'flex-end', gap: 10 }}>
                    <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 42, fontWeight: 700, color: '#fff', lineHeight: 1 }}>{m.num}</span>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.88)', lineHeight: 1.35, paddingBottom: 5, maxWidth: 110 }}>{m.label}</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.5}>
            <div style={{ textAlign: 'center', marginTop: 36 }}>
              <Link href="/marketing/segundo-iceo" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: '#09344e', color: '#fff', fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 600, padding: '12px 30px', borderRadius: 999, textDecoration: 'none', boxShadow: '0 2px 16px rgba(9,52,78,0.25)' }}>
                Ver memoria completa del 2° ICEO →
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <WaveDown from="#ffffff" to="#F7F6F3" />

      {/* ══════════════════════════════════════════════════════════════════════
          4. AGENDA
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#F7F6F3', padding: '72px 48px 80px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#097589', marginBottom: 12 }}>Programa Oficial · 3ICEO 2027</p>
              <h2 style={{ fontFamily: 'Gloock, Georgia, serif', fontWeight: 400, fontSize: 'clamp(28px,3.5vw,44px)', color: '#09344e', lineHeight: 1.1, marginBottom: 16 }}>Tres días que transforman</h2>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#5A6E77', lineHeight: 1.7, maxWidth: 480, margin: '0 auto' }}>Del análisis de la COP a los territorios vivos: un programa construido desde y para Latinoamérica.</p>
            </div>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="agenda-grid">
            {AGENDA_DIAS.map((dia, i) => (
              <FadeIn key={dia.dia} delay={i * 0.12}>
                <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '2px 2px 16px rgba(9,52,78,0.10)', border: '1px solid rgba(9,52,78,0.07)' }}>
                  <div style={{ backgroundColor: dia.color, padding: '28px 28px 24px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>{dia.diasemana}</div>
                      <div style={{ fontFamily: 'Gloock, Georgia, serif', fontSize: 52, fontWeight: 400, color: '#fff', lineHeight: 1 }}>{dia.dia}</div>
                      <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.75)', marginTop: 2 }}>{dia.mes} 2027</div>
                    </div>
                    <div style={{ backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 8, padding: '6px 12px', marginTop: 4, fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 600, color: '#fff' }}>{dia.sesiones} sesiones</div>
                  </div>
                  <div style={{ backgroundColor: '#fff', padding: '24px 28px' }}>
                    <div style={{ display: 'inline-block', backgroundColor: `${dia.color}18`, borderRadius: 999, padding: '3px 12px', marginBottom: 12, fontFamily: 'Poppins, sans-serif', fontSize: 10, fontWeight: 700, color: dia.color, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{dia.tema}</div>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#5A6E77', lineHeight: 1.65 }}>{dia.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.5}>
            <div style={{ textAlign: 'center', marginTop: 36 }}>
              <Link href="/marketing/agenda" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '2px solid #097589', color: '#097589', fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 600, padding: '12px 30px', borderRadius: 999, textDecoration: 'none', letterSpacing: '0.04em' }}>Ver agenda completa →</Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <WaveDown from="#F7F6F3" to="#09344e" />

      {/* ══════════════════════════════════════════════════════════════════════
          5. LÍNEAS TEMÁTICAS
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }} className="lineas-grid">
            {LINEAS.map((l, i) => (
              <FadeIn key={l.num} delay={i * 0.09}>
                <Link href="/marketing/lineas-tematicas" style={{ textDecoration: 'none' }}>
                  <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '2px 2px 16px rgba(0,0,0,0.20)' }}>
                    <div style={{ backgroundColor: l.color, padding: '28px 20px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                      <div style={{ width: 48, height: 48, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{l.icon}</div>
                      <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.1em' }}>{l.num}</div>
                    </div>
                    <div style={{ backgroundColor: 'rgba(255,255,255,0.06)', padding: '18px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                      <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 700, color: '#fff', lineHeight: 1.3, marginBottom: 8 }}>{l.title}</h3>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>{l.desc}</p>
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
          6. PONENTES DESTACADOS
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
              <Link href="/marketing/agenda" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '2px solid #097589', color: '#097589', fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 600, padding: '12px 30px', borderRadius: 999, textDecoration: 'none', letterSpacing: '0.04em' }}>Ver todos los ponentes →</Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <WaveDown from="#ffffff" to="#F0F4F7" />

      {/* ══════════════════════════════════════════════════════════════════════
          7. ALIADOS
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
          8. MARKETPLACE
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
                <Link href="/marketing/registro" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '2px solid rgba(255,255,255,0.45)', color: '#fff', fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 600, padding: '13px 26px', borderRadius: 999, textDecoration: 'none', letterSpacing: '0.04em' }}>Reserva tu stand</Link>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {[
                  { num: '28', label: 'Organizaciones', icon: '/icons/org_marletplace.svg' },
                  { num: '03', label: 'Días de feria',  icon: '/icons/dias_marletplace.svg' },
                  { num: '9',  label: 'Países representados', icon: '/icons/uni_aliadas.svg' },
                  { num: '100%', label: 'Economía circular', icon: '/icons/conferencias.svg' },
                ].map(s => (
                  <div key={s.label} style={{ backgroundColor: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 14, padding: '20px', display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <img src={s.icon} alt="" width={20} height={20} style={{ display: 'block', filter: 'brightness(0) invert(1)', opacity: 0.85 }} />
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
          9. SEDE DEL EVENTO — ✅ ACTUALIZADO
             Card izquierda: imagen universidad con overlay (estilo screenshot 1)
             Card derecha: logo USB + ubicación + dirección + botones
             Sin instalaciones ni servicios (simplificado al máximo)
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#E6F3EE', padding: '72px 48px 80px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>

          {/* Título de sección */}
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#097589', marginBottom: 12 }}>
                Sede del evento · 3ICEO 2027
              </p>
              <h2 style={{ fontFamily: 'Gloock, Georgia, serif', fontWeight: 400, fontSize: 'clamp(28px,3.5vw,44px)', color: '#09344e', lineHeight: 1.1 }}>
                Universidad de San Buenaventura · Cali
              </h2>
            </div>
          </FadeIn>

          {/* Grid 2 columnas: imagen (izq) + info (der) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, alignItems: 'stretch' }} className="sede-grid">

            {/* ── IZQUIERDA: card con imagen de la universidad + overlay ── */}
            <FadeIn>
              <div style={{
                position: 'relative',
                borderRadius: 20, overflow: 'hidden',
                minHeight: 400,
                background: 'linear-gradient(135deg,#09344e 0%,#1C495C 60%,#437287 100%)',
                boxShadow: '4px 4px 28px rgba(9,52,78,0.18)',
              }}>
                {/* Foto del campus */}
                <div style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: 'url(https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=900&q=80)',
                  backgroundSize: 'cover', backgroundPosition: 'center',
                  opacity: 0.55,
                }} />
                {/* Overlay degradado inferior para legibilidad del texto */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(180deg,rgba(9,52,78,0.10) 0%,rgba(9,52,78,0.80) 100%)',
                }} />

                {/* Contenido sobre la imagen */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px' }}>
                  {/* Badge "CALI, COLOMBIA" */}
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    backgroundColor: 'rgba(255,255,255,0.18)',
                    border: '1px solid rgba(255,255,255,0.28)',
                    backdropFilter: 'blur(6px)',
                    borderRadius: 999, padding: '5px 14px', marginBottom: 16,
                  }}>
                    <img src="/icons/icon-location.svg" alt="" width={11} height={11}
                      style={{ filter: 'brightness(0) invert(1)', opacity: 0.9 }} />
                    <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 10, fontWeight: 700, color: '#ffffff', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                      Cali, Colombia
                    </span>
                  </div>

                  <h3 style={{
                    fontFamily: 'Gloock, Georgia, serif', fontSize: 'clamp(22px,2.5vw,30px)',
                    fontWeight: 400, color: '#ffffff', lineHeight: 1.2, marginBottom: 10,
                  }}>
                    Sede del evento
                  </h3>
                  <p style={{
                    fontFamily: 'Inter, sans-serif', fontSize: 14,
                    color: 'rgba(255,255,255,0.78)', lineHeight: 1.6, maxWidth: 380,
                  }}>
                    Conoce el entorno e instalaciones de la universidad donde nos reuniremos para celebrar este encuentro.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* ── DERECHA: logo USB + ubicación + dirección + botones ── */}
            <FadeIn delay={0.12}>
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: 20, padding: '36px',
                boxShadow: '2px 2px 16px rgba(9,52,78,0.08)',
                border: '1.5px solid rgba(9,117,137,0.12)',
                display: 'flex', flexDirection: 'column', justifyContent: 'center',
                height: '100%',
              }}>

                {/* Logo USB */}
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 12,
                  backgroundColor: '#F7F6F3', borderRadius: 12,
                  padding: '12px 18px', marginBottom: 28,
                  border: '1.5px solid #D9DEE2',
                  alignSelf: 'flex-start',
                }}>
                  <img src="/icons/logo_uni_USB.svg" alt="USB Cali" height={36}
                    style={{ display: 'block', objectFit: 'contain' }} />
                  <div style={{
                    fontFamily: 'Poppins, sans-serif', fontSize: 10, fontWeight: 700,
                    color: '#09344e', lineHeight: 1.35, textTransform: 'uppercase', letterSpacing: '0.04em',
                  }}>
                    Universidad de San<br />Buenaventura
                  </div>
                </div>

                {/* Título Ubicación */}
                <h3 style={{
                  fontFamily: 'Poppins, sans-serif', fontSize: 20, fontWeight: 700,
                  color: '#09344e', marginBottom: 12,
                }}>
                  Ubicación
                </h3>

                {/* Descripción */}
                <p style={{
                  fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#5A6E77',
                  lineHeight: 1.75, marginBottom: 22,
                }}>
                  Universidad de San Buenaventura, Cali — Ubicada en una zona céntrica y de fácil acceso, donde podrás llegar desde las avenidas principales de la ciudad, como la Carrera 122 y la Calle 10, en la zona universitaria de la Avenida Cañasgordas.
                </p>

                {/* Dirección con ícono */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32,
                }}>
                  <img src="/icons/icon-location.svg" alt="" width={15} height={15}
                    style={{ display: 'block', flexShrink: 0 }} />
                  <span style={{
                    fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600, color: '#097589',
                  }}>
                    C/ Doctor Torres Navas 35, Cali 76110
                  </span>
                </div>

                {/* Botones */}
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <a href="https://maps.google.com/?q=Universidad+San+Buenaventura+Cali"
                    target="_blank" rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      backgroundColor: '#097589', color: '#fff',
                      fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 700,
                      padding: '12px 22px', borderRadius: 999, textDecoration: 'none',
                      boxShadow: '0 2px 12px rgba(9,117,137,0.30)',
                    }}>
                    <img src="/icons/icon-location.svg" alt="" width={13} height={13}
                      style={{ filter: 'brightness(0) invert(1)' }} />
                    Ver en el mapa
                  </a>

                  <Link href="/marketing/universidad" style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    border: '1.5px solid #097589', color: '#097589',
                    fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600,
                    padding: '12px 20px', borderRadius: 999, textDecoration: 'none',
                  }}>
                    Ir al sitio de la universidad ↗
                  </Link>
                </div>

                {/* Separador */}
                <div style={{ borderTop: '1.5px solid #E6F3EE', margin: '28px 0' }} />

                {/* CTA principal QUIERO ASISTIR */}
                <Link href="/marketing/registro" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  backgroundColor: '#09344e', color: '#fff',
                  fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 700,
                  padding: '13px 28px', borderRadius: 999, textDecoration: 'none',
                  letterSpacing: '0.04em', alignSelf: 'flex-start',
                  boxShadow: '0 2px 16px rgba(9,52,78,0.25)',
                }}>
                  QUIERO ASISTIR →
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <WaveUp from="#E6F3EE" to="#ffffff" />

      {/* ══════════════════════════════════════════════════════════════════════
          10. NOTICIAS
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

      <WaveDown from="#ffffff" to="#09344e" />

      {/* ══════════════════════════════════════════════════════════════════════
          11. DONACIONES
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#09344e', padding: '80px 48px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="donacion-grid">
            <FadeIn>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#74B4A7', marginBottom: 16 }}>Nadie se queda fuera</p>
              <h2 style={{ fontFamily: 'Gloock, Georgia, serif', fontWeight: 400, fontSize: 'clamp(28px,3.5vw,48px)', color: '#ffffff', lineHeight: 1.1, marginBottom: 20 }}>¡Gracias a ti, construimos el futuro ambiental de LATAM!</h2>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, marginBottom: 36, maxWidth: 480 }}>
                Tu donación permite que organizaciones ambientales sin recursos puedan asistir al 3ICEO. El importe irá íntegramente destinado a cubrir alojamiento, transporte y dietas.
              </p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <Link href="/marketing/donaciones" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: '#B53077', color: '#fff', fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 700, padding: '14px 34px', borderRadius: 999, textDecoration: 'none', letterSpacing: '0.05em', boxShadow: '0 4px 24px rgba(181,48,119,0.45)' }}>DONA AHORA →</Link>
                <Link href="/marketing/registro" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '2px solid rgba(255,255,255,0.4)', color: '#fff', fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 600, padding: '14px 30px', borderRadius: 999, textDecoration: 'none', letterSpacing: '0.04em' }}>Inscribirme al congreso</Link>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', boxShadow: '4px 4px 32px rgba(0,0,0,0.3)' }}>
                <img src="/icons/planta_donacion.svg" alt="Donación — planta en manos" style={{ width: '100%', height: 'auto', display: 'block', maxHeight: 360, objectFit: 'cover' }} />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Triple wave navy → white */}
      <div style={{ position: 'relative', height: 96, overflow: 'hidden', lineHeight: 0, backgroundColor: '#09344e' }}>
        <svg viewBox="0 0 1440 96" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0, width: '100%', height: '100%' }}>
          <path fill="#BED1DA" opacity="0.9" d="M0,55 C200,20 400,85 600,55 C800,25 1000,80 1200,52 C1320,36 1400,68 1440,55 L1440,96 L0,96 Z"/>
        </svg>
        <svg viewBox="0 0 1440 96" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0, width: '100%', height: '100%' }}>
          <path fill="#4886B5" d="M0,68 C240,40 480,90 720,62 C900,40 1080,82 1260,60 C1360,48 1420,72 1440,62 L1440,96 L0,96 Z"/>
        </svg>
        <svg viewBox="0 0 1440 96" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0, width: '100%', height: '100%' }}>
          <path fill="#ffffff" d="M0,75 C180,52 360,90 540,70 C720,50 900,88 1080,68 C1230,52 1370,78 1440,68 L1440,96 L0,96 Z"/>
        </svg>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          12. REDES SOCIALES — Fondo blanco, sin conflicto con footer
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#ffffff', padding: '64px 48px 80px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="follow-grid">
            <FadeIn>
              <h2 style={{ fontFamily: 'Gloock, Georgia, serif', fontWeight: 400, fontSize: 'clamp(26px,3vw,38px)', color: '#09344e', lineHeight: 1.2, marginBottom: 12 }}>¡Pásate por nuestras Redes Sociales y síguenos!</h2>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#5A6E77', lineHeight: 1.7, marginBottom: 28 }}>Publicamos contenido acerca de la labor que hacemos, podrás conocer proyectos y a nosotros más a fondo.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}>
                {[
                  { label: 'Instagram', bg: '#E1306C', href: 'https://instagram.com/awaqongd',      iconSrc: '/icons/icon_instagram.svg' },
                  { label: 'Facebook',  bg: '#1877F2', href: 'https://facebook.com/somosawaq',       iconSrc: '/icons/icon_facebook.svg'  },
                  { label: 'LinkedIn',  bg: '#0A66C2', href: 'https://linkedin.com/company/awaq-ong', iconSrc: '/icons/icon_linkedin.svg'  },
                ].map(({ label, bg, href, iconSrc }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', border: '1.5px solid #D9DEE2', borderRadius: 10, padding: '13px 18px', textDecoration: 'none', boxShadow: '2px 2px 8px rgba(9,52,78,0.06)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={iconSrc} alt={label} width={18} height={18} style={{ display: 'block', filter: 'brightness(0) invert(1)' }} />
                      </div>
                      <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 600, color: '#12303E' }}>{label}</span>
                    </div>
                    <span style={{ color: '#097589', fontSize: 15, fontWeight: 600 }}>→</span>
                  </a>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.12}>
              <div style={{ borderRadius: 20, overflow: 'hidden', backgroundColor: '#74B4A7', padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 280, boxShadow: '4px 4px 24px rgba(9,52,78,0.12)' }}>
                <img src="/icons/follow.svg" alt="Follow us on social media" style={{ width: '100%', maxWidth: 320, height: 'auto', display: 'block' }} />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Responsive ── */}
      <style>{`
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
          .donacion-grid     { grid-template-columns: 1fr !important; }
          .follow-grid       { grid-template-columns: 1fr !important; }
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