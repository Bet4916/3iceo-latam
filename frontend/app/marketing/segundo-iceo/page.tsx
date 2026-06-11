'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { IconLinkedin, IconInstagram, IconFacebook, IconYoutube } from '@/components/ui/icons'
import HeroIceo from '@/components/sections/HeroIceo'
import SectionDonacion from '@/components/sections/SectionDonacion'
import SectionRedes from '@/components/sections/SectionRedes'

// ─── FADE IN ──────────────────────────────────────────────────────────────────
const FadeIn = ({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
    style={style}
  >{children}</motion.div>
)

// ─── DATA ─────────────────────────────────────────────────────────────────────

// Imágenes LOCALES por ahora. Cuando tengas las fotos en Cloudflare R2,
// solo reemplaza cada "image" por su URL (mismo orden, mismo num/label).
const MOMENTOS = [
  { num: '30', label: 'Panelistas',                       image: '/icons/panelistas.svg'       },
  { num: '14', label: 'Conferencias',                     image: '/icons/conferencias.svg'     },
  { num: '02', label: 'Conversatorios',                   image: '/icons/conversatorios.svg'   },
  { num: '28', label: 'Organizaciones en el Marketplace', image: '/icons/org_marletplace.svg'  },
  { num: '02', label: 'Convenios',                        image: '/icons/convenios.svg'        },
  { num: '05', label: 'Talleres',                         image: '/icons/talleres.svg'         },
  { num: '17', label: 'Entidades aliadas',                image: '/icons/ent_aliados.svg'      },
  { num: '03', label: 'Días de Marketplace',              image: '/icons/dias_marletplace.svg' },
  { num: '09', label: 'Universidades aliadas',            image: '/icons/uni_aliadas.svg'      },
]

const IMPACTO = [
  { num: '1209', label: 'Asistentes Presenciales y Virtuales', icon: '/icons/icon_asistentes.svg'                   },
  { num: '192',  label: 'Organizaciones Ambientales',          icon: '/icons/icon_organizaciones.svg'               },
  { num: '06',   label: 'Entidades Públicas',                  icon: '/icons/icon_ent_pub.svg'                      },
  { num: '+135', label: 'Estudiantes Universitarios',          icon: '/icons/icon_estudiantes.svg'                  },
  { num: '31',   label: 'Participantes Independientes',        icon: '/icons/icon_participantes_independientes.svg' },
]

const REDES_STATS = [
  { num: '7784+', label: 'Interacciones en los contenidos de la plataforma', bg: 'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)', Icon: IconInstagram },
  { num: '6511+', label: 'Interacciones en los contenidos de la plataforma', bg: '#1877F2', Icon: IconFacebook  },
  { num: '851',   label: 'Asistentes al streaming virtual',                  bg: '#FF0000', Icon: IconYoutube   },
  { num: '1502',  label: 'Interacciones en los videos del congreso',         bg: '#0A66C2', Icon: IconLinkedin  },
]

const PERSONALIDADES = [
  { name: 'José Serrano Serna',                flag: '🇪🇸', org: 'Awaq ONGD',                   rol: 'CEO-Presidente Awaq ONGD · Promotor y Sponsor del 2ICEO-LATAM',         ponencia: 'Apertura en nombre de la organización promotora y sponsor del 2ICEO-LATAM. Presentación del Programa Awaq-BioTech.', li: 'https://www.linkedin.com/in/jsserna5575/', liType: 'linkedin' as const, img: '/icons/jose_serrano.svg',                            countryCode: 'ES' },
  { name: 'Luis Alfonso Aguirre',              flag: '🇨🇴', org: 'PMI® Colombia',                 rol: 'Program Manager PMI® Colombia · Promotor y Sponsor del 2ICEO-LATAM',    ponencia: 'Taller: Proyectos que dejan huella – "Formulación de Proyectos Sociales Sostenibles".', li: 'https://www.linkedin.com/in/luis-alfonso-aguirre-montealegre-0770a91a/', liType: 'linkedin' as const, img: '/icons/luis_alfonso.svg',                          countryCode: 'CO' },
  { name: 'Begoña de la Hera',                flag: '🇪🇸', org: 'Awaq ONGD',                   rol: 'Directora Programa TEDI Awaq ONGD · Directora Proyecto ABT 2025-2028',  ponencia: 'Presentación resultados parciales del proyecto ABT 2025 – Hoja de Ruta 2026-2027.', li: 'https://www.linkedin.com/in/bego%C3%B1a-de-la-hera-25ba801a/', liType: 'linkedin' as const, img: '/icons/begona_hera.svg',                              countryCode: 'ES' },
  { name: 'Rolando Evelio Pérez Versón',      flag: '🇲🇽', org: 'Tecnológico de Monterrey',      rol: 'Profesor Planta · Director Técnico ABT 2025-2028',                       ponencia: 'Presentación componentes tecnológicos IA, Programa ABT.', li: 'https://www.linkedin.com/in/rolando-evelio-p%C3%A9rez-vers%C3%B3n-4137a8264/', liType: 'linkedin' as const, img: '/icons/rolando_evelio.jpg',                          countryCode: 'MX' },
  { name: 'Hno. Camilo Andrés Aguilar Gómez', flag: '🇨🇴', org: 'Universidad de La Salle',       rol: 'Coordinador Universidad de La Salle · Coordinador de Utopía',           ponencia: 'UTOPÍA: Un horizonte educativo para el cuidado, la sostenibilidad y la ecología integra.', li: 'https://www.linkedin.com/in/camilo-andr%C3%A9s-aguilar-g%C3%B3mez-437a32258/', liType: 'linkedin' as const, img: '/images/ponentes_Camilo_Andrés_Aguilar.jpeg',  countryCode: 'CO' },
  { name: 'Mtro. Gustavo Herrera Caballero',  flag: '🇨🇴', org: 'SELA',                          rol: 'Coordinador SELA · Coordinador Desarrollo Social',                       ponencia: 'La experiencia del SELA en la implementación de la Agenda 2030.', li: 'https://www.linkedin.com/in/gustavo-herrera-3528a979/', liType: 'linkedin' as const, img: '/images/ponentes_Gustavo_Herrera.jpeg',                countryCode: 'CO' },
  { name: 'Liza Rodríguez Galvis',            flag: '🇨🇴', org: 'Gobernación Valle del Cauca',   rol: 'Secretaria General de la Gobernación del Valle del Cauca',              ponencia: 'Mujeres en biodiversidad y fortalecimiento institucional: un camino para transformar realidades.', li: 'https://www.instagram.com/lizarodriguez18?igsh=dHYzaml4NG02bGoy', liType: 'instagram' as const, img: '/images/ponentes_Liza_Rodriguez_Galvis.jpeg',  countryCode: 'CO' },
  { name: 'Nasly Fernanda Gonzales Vidales',  flag: '🇨🇴', org: 'Secretaría Ambiente Valle',      rol: 'Subsecretaria de Desarrollo Sostenible',                                ponencia: 'El papel de las mujeres en el cambio climático.', li: 'https://www.linkedin.com/in/nasly-fernanda-vidales-gonz%C3%A1lez-1080b5b6/', liType: 'linkedin' as const, img: '/images/ponentes_Nasly_Vidales.jpeg',                 countryCode: 'CO' },
  { name: 'Jhonatan Alexander Becerra',       flag: '🇨🇴', org: 'U. Juan de Castellanos',        rol: 'Líder Desarrollo Tecnológico',                                           ponencia: 'Alianza Universidad Juan de Castellanos | Proyecto ABT.', li: 'https://www.linkedin.com/in/jhonatan-alexander-becerra-duitama/', liType: 'linkedin' as const, img: '/images/ponentes_Jhonatan_Alexander_Becerra.jpeg', countryCode: 'CO' },
  { name: 'William Fernando Bernal Suárez',   flag: '🇨🇴', org: 'U. Juan de Castellanos',        rol: 'Líder Desarrollo Tecnológico',                                           ponencia: 'Alianza Universidad Juan de Castellanos | Proyecto ABT.', li: 'https://www.linkedin.com/in/william-bernal-13457b60/', liType: 'linkedin' as const, img: '/images/ponentes_William_Fernando_Bernal.jpeg',   countryCode: 'CO' },
  { name: 'Magda Lorena Pineda Rodríguez',    flag: '🇨🇴', org: 'U. Juan de Castellanos',        rol: 'Líder Desarrollo Tecnológico',                                           ponencia: 'Alianza Universidad Juan de Castellanos | Proyecto ABT.', li: 'https://www.linkedin.com/in/magda-pineda-rodriguez/', liType: 'linkedin' as const, img: '/images/ponentes_Magda_Lorena_Pineda.jpeg',         countryCode: 'CO' },
  { name: 'John Cristhian Fernández',         flag: '🇨🇴', org: 'U. Juan de Castellanos',        rol: 'Líder Desarrollo Tecnológico',                                           ponencia: 'Alianza Universidad Juan de Castellanos | Proyecto ABT.', li: 'https://www.linkedin.com/in/john-cristhian-fernandez-lizarazo-a7230047/', liType: 'linkedin' as const, img: '/images/ponente_Cristhian_Utopía.jpeg',        countryCode: 'CO' },
  { name: 'Santiago Granados Gutiérrez',      flag: '🇨🇴', org: 'CEPAL-ONU',                     rol: 'Consultor',                                                              ponencia: 'Legados y desafíos de la COP16.', li: 'https://www.linkedin.com/in/santiago-granados-guti%C3%A9rrez-94a65a21/', liType: 'linkedin' as const, img: '/images/ponentes_Santiago_Granados.jpg',              countryCode: 'CO' },
]

// Banderas como imágenes SVG de flagcdn — funciona en todos los navegadores y SO
// sin depender de emojis de sistema
function FlagImg({ code, size = 20 }: { code: string; size?: number }) {
  return (
    <img
      src={`https://flagcdn.com/w40/${code.toLowerCase()}.png`}
      srcSet={`https://flagcdn.com/w80/${code.toLowerCase()}.png 2x`}
      width={size}
      height={Math.round(size * 0.75)}
      alt={code}
      style={{ display: 'inline-block', borderRadius: 2, objectFit: 'cover', flexShrink: 0 }}
    />
  )
}

const ENTREVISTAS = [
  {
    id: 1,
    label: 'Carolina Acosta',
    org: 'Emprendimiento Linsalde',
    src: 'https://pub-94aa83314f8a41088bff3c1130d43ebd.r2.dev/2%20ICEO/Mermoria%202ICEO/Carolina%20Acosta%20-%20Negocio%20Verde%20(1).mp4',
    quote: '"Estamos rodeados de naturaleza, de un ambiente muy natural… Es un espacio muy importante para las mujeres y para todos en general, de poder visibilizar cada uno de los esfuerzos y proyectos que tenemos para ayudar a mantener el medio ambiente."',
    texto: 'Carolina transforma envases plásticos en bolsos artesanales, conectando recicladores, artesanos y economía circular en una sola iniciativa.',
  },
  {
    id: 2,
    label: 'Franklin Corrales',
    org: 'Mesa Amplia de Jóvenes Ambientalistas',
    src: 'https://pub-94aa83314f8a41088bff3c1130d43ebd.r2.dev/2%20ICEO/Mermoria%202ICEO/Entrevista%20editada_Franklin%20Corrales%20-%20jovenes%20ambientalistas-2o%20ICEO.mp4',
    quote: '"Desde la academia se puede seguir construyendo y dando conocimiento a todo el mundo de qué es lo que estamos haciendo en nuestros territorios para replicar estos casos de éxito."',
    texto: 'Franklin representa a la juventud ambientalista del Valle del Cauca, convencido de que el territorio sostenible también genera ingresos y procesos sociales.',
  },
  {
    id: 3,
    label: 'Pablo Javier Rojas',
    org: 'Universidad San Buenaventura Cali',
    src: 'https://pub-94aa83314f8a41088bff3c1130d43ebd.r2.dev/2%20ICEO/Mermoria%202ICEO/Entrevista%20editada_Pablo%20Javier%20Rojas%20-%20USBC--2o%20ICEO.mp4',
    quote: '"Ese compartir de experiencias y de saberes es muy importante para lograr impulsar el territorio, involucrando a una serie de actores, de tecnologías, de experiencias."',
    texto: 'Pablo trabaja en el Centro Interdisciplinario de Estudios Humanísticos de la USB Cali, tejiendo alianzas entre academia, sociedad civil y territorios.',
  },
  {
    id: 4,
    label: 'Mónica Castillo',
    org: 'Parques Nacionales Naturales de Colombia',
    src: 'https://pub-94aa83314f8a41088bff3c1130d43ebd.r2.dev/2%20ICEO/Mermoria%202ICEO/Entrevista%20editada_M%C3%B3nica%20Castillo-Parques%20Naturales%20de%20Colombia-2o%20ICEO.mp4',
    quote: '"Este congreso es muy importante porque logra unir esas iniciativas comunitarias pero también institucionales en un espacio académico que es fundamental."',
    texto: 'Parques Nacionales administra 65 áreas estratégicas en todo Colombia. Mónica destaca cómo el ICEO conecta lo institucional con lo comunitario.',
  },
]

// ─── FIGMA CARD — esquinas asimétricas según los SVG del Figma ───────────────
// Rectangle_4507: top-left=48 top-right=8 bottom-right=48 bottom-left=8  → color #ADC6D9
// Rectangle_4509: mismo shape → color #4886B5
// Se alternan: par → #ADC6D9, impar → #4886B5
function MomentoCard({ num, label, image, index }: { num: string; label: string; image: string; index: number }) {
  const accentColor = index % 2 === 0 ? '#ADC6D9' : '#4886B5'
  return (
    <FadeIn delay={index * 0.05}>
      <div style={{ position: 'relative' }}>
        {/* Sombra decorativa desplazada — el rectángulo de color del Figma */}
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '48px 8px 48px 8px',
          backgroundColor: accentColor,
          transform: 'translate(8px, 8px)',
          zIndex: 0,
        }} />
        {/* Card principal con foto */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          borderRadius: '48px 8px 48px 8px',
          overflow: 'hidden',
          aspectRatio: '1 / 1',
          boxShadow: '0 4px 20px rgba(9,52,78,0.18)',
        }}>
          <img
            src={image}
            alt={label}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            onError={(e) => {
              // Si la imagen no carga, pone un fondo degradado
              const el = e.currentTarget as HTMLImageElement
              el.style.display = 'none'
              if (el.parentElement) {
                el.parentElement.style.background = index % 2 === 0
                  ? 'linear-gradient(135deg,#09344e 0%,#1C495C 100%)'
                  : 'linear-gradient(135deg,#097589 0%,#09344e 100%)'
              }
            }}
          />
          {/* Overlay degradado inferior — más oscuro y alto para que el texto SIEMPRE se lea */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            background: 'linear-gradient(0deg, rgba(9,52,78,0.97) 0%, rgba(9,52,78,0.72) 32%, rgba(9,52,78,0.25) 62%, transparent 100%)',
            padding: '60px 20px 20px',
            display: 'flex', alignItems: 'flex-end', gap: 10,
          }}>
            <span style={{
              fontFamily: 'Poppins, sans-serif', fontSize: 46, fontWeight: 800,
              color: '#AEE5DA', lineHeight: 0.92,
              textShadow: '0 2px 12px rgba(0,0,0,0.55)',
            }}>{num}</span>
            <span style={{
              fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 600,
              color: '#ffffff', lineHeight: 1.3, paddingBottom: 5, maxWidth: 130,
              textShadow: '0 1px 6px rgba(0,0,0,0.75)',
            }}>{label}</span>
          </div>
        </div>
      </div>
    </FadeIn>
  )
}

// ─── PERSONALIDADES CAROUSEL ──────────────────────────────────────────────────
function PersonalidadesCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [scrollPos, setScrollPos] = useState(0)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const startScroll = useRef(0)
  const CARD_W = 300 + 48
  const scrollTo = (dir: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    el.scrollTo({ left: Math.max(0, Math.min(el.scrollLeft + dir * CARD_W * 3, el.scrollWidth - el.clientWidth)), behavior: 'smooth' })
  }
  const onScroll = () => { if (trackRef.current) setScrollPos(trackRef.current.scrollLeft) }
  const onMouseDown = (e: React.MouseEvent) => { isDragging.current = true; startX.current = e.pageX; startScroll.current = trackRef.current?.scrollLeft ?? 0; if (trackRef.current) trackRef.current.style.cursor = 'grabbing' }
  const onMouseUp = () => { isDragging.current = false; if (trackRef.current) trackRef.current.style.cursor = 'grab' }
  const onMouseMove = (e: React.MouseEvent) => { if (!isDragging.current || !trackRef.current) return; e.preventDefault(); trackRef.current.scrollLeft = startScroll.current - (e.pageX - startX.current) }
  const canPrev = scrollPos > 10
  const canNext = trackRef.current ? scrollPos < trackRef.current.scrollWidth - trackRef.current.clientWidth - 10 : true
  const totalDots = Math.ceil(PERSONALIDADES.length / 3)
  const activeDot = trackRef.current ? Math.round(scrollPos / (trackRef.current.scrollWidth - trackRef.current.clientWidth) * (totalDots - 1)) : 0

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 80, zIndex: 2, background: 'linear-gradient(to left, #09344e 0%, transparent 100%)', pointerEvents: 'none', opacity: canNext ? 1 : 0, transition: 'opacity 0.3s' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 80, zIndex: 2, background: 'linear-gradient(to right, #09344e 0%, transparent 100%)', pointerEvents: 'none', opacity: canPrev ? 1 : 0, transition: 'opacity 0.3s' }} />
      <div
        ref={trackRef}
        onScroll={onScroll} onMouseDown={onMouseDown} onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp} onMouseMove={onMouseMove}
        style={{ display: 'flex', gap: 48, overflowX: 'auto', paddingBottom: 8, scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch', cursor: 'grab', userSelect: 'none', alignItems: 'stretch' }}
      >
        {PERSONALIDADES.map((p, i) => (
          <div
            key={i}
            style={{ width: 300, flexShrink: 0, backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 20, border: '1px solid rgba(255,255,255,0.12)', padding: '28px 22px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'background-color 0.2s' }}
            onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.backgroundColor = 'rgba(255,255,255,0.11)'}
            onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.backgroundColor = 'rgba(255,255,255,0.07)'}
          >
            <div style={{ position: 'relative', width: 130, height: 130, marginBottom: 20, flexShrink: 0 }}>
              <div style={{ position: 'absolute', inset: -5, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(3,163,131,0.45) 0%, rgba(9,117,137,0.2) 100%)' }} />
              <div style={{ position: 'relative', width: 130, height: 130, borderRadius: '50%', overflow: 'hidden', border: '3px solid rgba(255,255,255,0.25)', boxShadow: '0 4px 20px rgba(0,0,0,0.35)' }}>
                <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
              </div>
              {/* Bandera como imagen — funciona en todos los navegadores y SO */}
              <div style={{ position: 'absolute', bottom: 4, left: 4, width: 28, height: 28, borderRadius: '50%', backgroundColor: 'rgba(9,52,78,0.85)', border: '2px solid #09344e', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.35)' }}>
                <FlagImg code={p.countryCode} size={28} />
              </div>
              {p.liType === 'instagram'
                ? <a href={p.li} target="_blank" rel="noopener noreferrer" style={{ position: 'absolute', bottom: 4, right: 4, width: 28, height: 28, borderRadius: '50%', backgroundColor: '#E1306C', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.35)', border: '2px solid #09344e', textDecoration: 'none', transition: 'transform 0.15s' }} onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.12)'} onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)'}><svg width="13" height="13" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" stroke="white" strokeWidth="1.8"/><circle cx="12" cy="12" r="4" stroke="white" strokeWidth="1.8"/><circle cx="17.5" cy="6.5" r="1" fill="white"/></svg></a>
                : <a href={p.li} target="_blank" rel="noopener noreferrer" style={{ position: 'absolute', bottom: 4, right: 4, width: 28, height: 28, borderRadius: '50%', backgroundColor: '#0A66C2', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.35)', border: '2px solid #09344e', textDecoration: 'none', transition: 'transform 0.15s' }} onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.12)'} onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)'}><IconLinkedin size={13} color="white" /></a>}
            </div>
            <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 700, color: '#ffffff', textAlign: 'center', lineHeight: 1.3, marginBottom: 6 }}>{p.name}</span>
            <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 600, color: '#76E2CC', textAlign: 'center', lineHeight: 1.4, marginBottom: 5 }}>{p.org}</p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.50)', textAlign: 'center', lineHeight: 1.4, marginBottom: 14 }}>{p.rol}</p>
            <div style={{ width: '55%', borderTop: '1.5px dashed rgba(255,255,255,0.18)', marginBottom: 14 }} />
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.75)', textAlign: 'center', lineHeight: 1.6, flex: 1 }}>{p.ponencia}</p>
          </div>
        ))}
      </div>
      {canPrev && (
        <button onClick={() => scrollTo(-1)} aria-label="Anterior" style={{ position: 'absolute', top: '40%', left: -22, transform: 'translateY(-50%)', width: 44, height: 44, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.12)', border: '1.5px solid rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 3, transition: 'background-color 0.2s' }} onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.22)'} onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.12)'}>
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M10 3L6 8l4 5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      )}
      {canNext && (
        <button onClick={() => scrollTo(1)} aria-label="Siguiente" style={{ position: 'absolute', top: '40%', right: -22, transform: 'translateY(-50%)', width: 44, height: 44, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.12)', border: '1.5px solid rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 3, transition: 'background-color 0.2s' }} onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.22)'} onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.12)'}>
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M6 3l4 5-4 5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      )}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 32 }}>
        {Array.from({ length: totalDots }).map((_, i) => (
          <button
            key={i}
            onClick={() => { const el = trackRef.current; if (!el) return; el.scrollTo({ left: (i / (totalDots - 1)) * (el.scrollWidth - el.clientWidth), behavior: 'smooth' }) }}
            aria-label={`Página ${i + 1}`}
            style={{ width: i === activeDot ? 24 : 8, height: 8, borderRadius: 999, backgroundColor: i === activeDot ? '#03A383' : 'rgba(255,255,255,0.25)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.3s ease' }}
          />
        ))}
      </div>
      <style suppressHydrationWarning>{`div::-webkit-scrollbar{display:none}`}</style>
    </div>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function SegundoIceoPage() {
  const [activeVideo, setActiveVideo] = useState(0)

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>

      {/* ══ HERO ════════════════════════════════════════════════════════════════ */}
      <HeroIceo
        badge="Edición 2026 · Cali, Colombia"
        title={<>Memoria <span style={{ color: '#ffffff' }}>2do ICEO</span></>}
        description={<>Descubre el impacto de la segunda edición del congreso<br />y el movimiento que transforma territorios en LATAM</>}
        cta={{ label: 'VER MEMORIA →', href: '/docs/memoria_2iceo.pdf', target: '_blank' }}
        image="/icons/2do_iceo.svg"
        imageAlt="2° ICEO LATAM · Cali 2026"
        imageLabel="2° ICEO · 2026 · Cali"
        imageScale={1.40}
        waveVariant="default"
        waveColor="#ffffff"
      />

      {/* ══ MOMENTOS ══════════════════════════════════════════════════════════════
          Cards con esquinas asimétricas del Figma:
          border-radius: 48px 8px 48px 8px (top-left top-right bottom-right bottom-left)
          Sombra decorativa desplazada con color alternado: #ADC6D9 / #4886B5
      ════════════════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#fff', padding: '80px 0' }}>
        <div className="container-brand" style={{ padding: '0 48px' }}>
          <FadeIn>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 28, fontWeight: 600, color: '#09344e', textAlign: 'center', marginBottom: 56 }}>
              Momentos que definieron el congreso
            </h2>
          </FadeIn>
          {/* padding extra para que las sombras desplazadas no se corten */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, padding: '0 8px 16px' }} className="momentos-grid">
            {MOMENTOS.map((m, i) => (
              <MomentoCard key={i} num={m.num} label={m.label} image={m.image} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ IMPACTO ═══════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#F7F6F3', padding: '80px 0' }}>
        <div className="container-brand" style={{ padding: '0 48px' }}>
          <FadeIn>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 28, fontWeight: 600, color: '#09344e', textAlign: 'center', marginBottom: 48 }}>
              Impacto del evento
            </h2>
          </FadeIn>
          {/* Grid de 5 columnas iguales → todas las cards tienen exactamente el mismo tamaño */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 20 }} className="impacto-grid">
            {IMPACTO.map((item, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div style={{ background: '#fff', borderRadius: 12, padding: '28px 16px', textAlign: 'center', boxShadow: '2px 2px 8px rgba(18,48,62,0.10)', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <img src={item.icon} alt={item.label} width={36} height={36} style={{ display: 'block' }} />
                  <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 34, fontWeight: 700, color: '#03A383', lineHeight: 1 }}>{item.num}</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#5A6E77', lineHeight: 1.4 }}>{item.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ REDES ═════════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#fff', padding: '80px 0' }}>
        <div className="container-brand" style={{ padding: '0 48px' }}>
          <FadeIn>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 28, fontWeight: 600, color: '#09344e', textAlign: 'center', marginBottom: 48 }}>
              Alcance en Redes Sociales
            </h2>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }} className="redes-grid">
            {REDES_STATS.map((r, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                {/* height: 100% + flex aseguran que todos tengan la misma altura */}
                <div style={{ background: r.bg, borderRadius: 14, padding: '28px 20px', textAlign: 'center', color: '#fff', boxShadow: '2px 2px 12px rgba(18,48,62,0.15)', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, boxSizing: 'border-box' }}>
                  <r.Icon size={32} color="white" />
                  <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 30, fontWeight: 700, lineHeight: 1 }}>{r.num}</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, opacity: 0.9, lineHeight: 1.4 }}>{r.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <div style={{ lineHeight: 0, backgroundColor: '#fff' }}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: '100%', height: 60, display: 'block' }}>
          <path d="M0,20 C480,60 960,0 1440,20 L1440,60 L0,60 Z" fill="#09344e" />
        </svg>
      </div>

      {/* ══ PERSONALIDADES ════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#09344e', padding: '80px 0' }}>
        <div className="container-brand" style={{ padding: '0 48px' }}>
          <FadeIn>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 28, fontWeight: 600, color: '#fff', textAlign: 'center', marginBottom: 12 }}>Personalidades destacadas</h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.40)', textAlign: 'center', marginBottom: 56, letterSpacing: '0.03em' }}>{PERSONALIDADES.length} ponentes · desliza para ver todos →</p>
          </FadeIn>
          <div style={{ position: 'relative', padding: '0 28px' }}>
            <PersonalidadesCarousel />
          </div>
        </div>
      </section>

      <div style={{ lineHeight: 0, backgroundColor: '#09344e' }}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: '100%', height: 60, display: 'block' }}>
          <path d="M0,40 C360,0 1080,60 1440,20 L1440,60 L0,60 Z" fill="#F7F6F3" />
        </svg>
      </div>

      {/* ══ VOCES DEL CONGRESO ═════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#F7F6F3', padding: '80px 0' }}>
        <div className="container-brand" style={{ padding: '0 48px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start' }} className="voces-grid">

            {/* Izquierda — cambia con el video activo */}
            <FadeIn>
              <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 28, fontWeight: 600, color: '#09344e', marginBottom: 16 }}>
                Voces del Congreso
              </h2>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#5A6E77', lineHeight: 1.75, marginBottom: 20 }}>
                El 2° ICEO fue un espacio de encuentro entre organizaciones, comunidades, líderes y jóvenes que construyen soluciones desde sus territorios.
              </p>
              {/* Quote dinámica con transición suave */}
              <motion.div
                key={activeVideo}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <blockquote style={{ borderLeft: '3px solid #03A383', paddingLeft: 18, margin: '0 0 16px', fontFamily: 'Inter, sans-serif', fontSize: 14, fontStyle: 'italic', color: '#5A6E77', lineHeight: 1.75 }}>
                  {ENTREVISTAS[activeVideo].quote}
                </blockquote>
                <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 700, color: '#03A383', marginBottom: 8 }}>
                  — {ENTREVISTAS[activeVideo].label}
                </p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#097589', fontWeight: 600, marginBottom: 4 }}>
                  {ENTREVISTAS[activeVideo].org}
                </p>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#5A6E77', lineHeight: 1.65 }}>
                  {ENTREVISTAS[activeVideo].texto}
                </p>
              </motion.div>
            </FadeIn>

            {/* Derecha — selector de video */}
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
        </div>
      </section>

      {/* ══ RELEVANCIA ════════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#09344e', padding: '80px 0', overflow: 'hidden' }}>
        <div className="container-brand" style={{ padding: '0 48px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 60, alignItems: 'center' }} className="relevancia-grid">
            <FadeIn>
              <div style={{ borderRadius: 14, overflow: 'hidden', aspectRatio: '4/3', boxShadow: '8px 8px 40px rgba(0,0,0,0.3)', backgroundColor: '#09344e' }}>
                <img
                  src="/icons/2do_iceo.svg"
                  alt="Relevancia e Impacto 2° ICEO"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: 'scale(1.40)', transformOrigin: 'center center' }}
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 28, fontWeight: 600, color: '#fff', marginBottom: 16, lineHeight: 1.25 }}>
                Relevancia e impacto en la <span style={{ color: '#76E2CC' }}>comunidad ambiental</span>
              </h2>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.75, marginBottom: 14 }}>
                El 2° ICEO LATAM se consolidó como un espacio clave para visibilizar el trabajo de organizaciones y tecnólogos que movilizamos permanentemente.
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.75, marginBottom: 28 }}>
                Su impacto se refleja en nuevas alianzas, intercambio de saberes y fortalecimiento de iniciativas ambientales en toda la región.
              </p>
              <Link
                href="/docs/memoria_2iceo.pdf"
                target="_blank"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: '#74B4A7', color: '#fff', fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600, padding: '12px 28px', borderRadius: 999, textDecoration: 'none', letterSpacing: '0.04em', textTransform: 'uppercase', transition: 'background-color 0.2s' }}
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#3C625B')}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#74B4A7')}
              >
                Conocer más →
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══ CTA MEMORIA ═══════════════════════════════════════════════════════════ */}
      <section style={{ background: 'linear-gradient(135deg, #03A383 0%, #3C625B 100%)', padding: '72px 48px', textAlign: 'center' }}>
        <FadeIn>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 28, fontWeight: 600, color: '#fff', marginBottom: 28 }}>
            Lee la memoria del 2° ICEO completa
          </h2>
          <Link href="/docs/memoria_2iceo.pdf" target="_blank"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, backgroundColor: '#fff', color: '#03A383', fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 700, padding: '13px 32px', borderRadius: 999, textDecoration: 'none', letterSpacing: '0.04em', textTransform: 'uppercase', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#03A383" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 2v6h6M9 13h6M9 17h4" stroke="#03A383" strokeWidth="1.8" strokeLinecap="round"/>
              <path d="M7 9h2" stroke="#03A383" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            Descargar Memoria PDF
          </Link>
        </FadeIn>
      </section>

      {/* ══ DONACIÓN — componente unificado ══════════════════════════════════════ */}
      <SectionDonacion
        bg="#F7F6F3"
        theme="light"
        showWave={false}
      />

      {/* ══ REDES SOCIALES — componente unificado ════════════════════════════════ */}
      <SectionRedes bg="#FFFFFF" theme="light" />

      {/* ── Responsive ── */}
      <style suppressHydrationWarning>{`
        @media (max-width: 900px) {
          .momentos-grid   { grid-template-columns: repeat(2,1fr) !important; }
          .impacto-grid    { grid-template-columns: repeat(2,1fr) !important; }
          .redes-grid      { grid-template-columns: repeat(2,1fr) !important; }
          .voces-grid      { grid-template-columns: 1fr !important; }
          .relevancia-grid { grid-template-columns: 1fr !important; }
          .follow-grid     { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 580px) {
          .momentos-grid { grid-template-columns: 1fr !important; }
          .impacto-grid  { grid-template-columns: repeat(2,1fr) !important; }
          .redes-grid    { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  )
}