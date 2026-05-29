'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { IconLinkedin, IconInstagram, IconFacebook, IconYoutube } from '@/components/ui/icons'

const FadeIn = ({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
    style={style}
  >{children}</motion.div>
)

const MOMENTOS = [
  { num: '30', label: 'Panelistas',                       bg: 'linear-gradient(135deg,#09344e 0%,#1C495C 100%)', image: '/icons/panelistas.svg'       },
  { num: '14', label: 'Conferencias',                     bg: 'linear-gradient(135deg,#097589 0%,#09344e 100%)', image: '/icons/conferencias.svg'     },
  { num: '02', label: 'Conversatorios',                   bg: 'linear-gradient(135deg,#4886B5 0%,#12303E 100%)', image: '/icons/conversatorios.svg'   },
  { num: '28', label: 'Organizaciones en el Marketplace', bg: 'linear-gradient(135deg,#03A383 0%,#09344e 100%)', image: '/icons/org_marletplace.svg'  },
  { num: '02', label: 'Convenios',                        bg: 'linear-gradient(135deg,#1C495C 0%,#097589 100%)', image: '/icons/convenios.svg'        },
  { num: '05', label: 'Talleres',                         bg: 'linear-gradient(135deg,#12303E 0%,#4886B5 100%)', image: '/icons/talleres.svg'         },
  { num: '17', label: 'Entidades aliadas',                bg: 'linear-gradient(135deg,#09344e 0%,#03A383 100%)', image: '/icons/ent_aliados.svg'      },
  { num: '03', label: 'Días de Marketplace',              bg: 'linear-gradient(135deg,#097589 0%,#4886B5 100%)', image: '/icons/dias_marletplace.svg' },
  { num: '09', label: 'Universidades aliadas',            bg: 'linear-gradient(135deg,#1C495C 0%,#09344e 100%)', image: '/icons/uni_aliadas.svg'      },
]
const IMPACTO = [
  { num: '1209', label: 'Asistentes Presenciales y Virtuales', icon: '/icons/icon_asistentes.svg'                   },
  { num: '192',  label: 'Organizaciones Ambientales',          icon: '/icons/icon_organizaciones.svg'               },
  { num: '06',   label: 'Entidades Públicas',                  icon: '/icons/icon_ent_pub.svg'                      },
  { num: '+135', label: 'Estudiantes Universitarios',          icon: '/icons/icon_estudiantes.svg'                  },
  { num: '31',   label: 'Participantes Independientes',        icon: '/icons/icon_participantes_independientes.svg' },
]
const REDES = [
  { num: '7784+', label: 'Interacciones en los contenidos de la plataforma', bg: 'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)', Icon: IconInstagram },
  { num: '6511+', label: 'Interacciones en los contenidos de la plataforma', bg: '#1877F2', Icon: IconFacebook  },
  { num: '851',   label: 'Asistentes al streaming virtual',                  bg: '#FF0000', Icon: IconYoutube   },
  { num: '1502',  label: 'Interacciones en los videos del congreso',         bg: '#0A66C2', Icon: IconLinkedin  },
]
const PERSONALIDADES = [
  { name: 'José Serrano Serna',                flag: '🇪🇸', org: 'Awaq ONGD',                                                 rol: 'CEO-Presidente Awaq ONGD · Promotor y Sponsor del 2ICEO-LATAM',         ponencia: 'Apertura en nombre de la organización promotora y sponsor del 2ICEO-LATAM. Presentación del Programa Awaq-BioTech.', li: 'https://www.linkedin.com/in/jsserna5575/', liType: 'linkedin' as const, img: '/icons/jose_serrano.svg' },
  { name: 'Luis Alfonso Aguirre',              flag: '🇨🇴', org: 'PMI® Colombia',                                             rol: 'Program Manager PMI® Colombia · Promotor y Sponsor del 2ICEO-LATAM',    ponencia: 'Taller: Proyectos que dejan huella – "Formulación de Proyectos Sociales Sostenibles".', li: 'https://www.linkedin.com/in/luis-alfonso-aguirre-montealegre-0770a91a/', liType: 'linkedin' as const, img: '/icons/luis_alfonso.svg' },
  { name: 'Begoña de la Hera',                flag: '🇪🇸', org: 'Awaq ONGD',                                                 rol: 'Directora Programa TEDI Awaq ONGD · Directora Proyecto ABT 2025-2028',  ponencia: 'Presentación resultados parciales del proyecto ABT 2025 – Hoja de Ruta 2026-2027.', li: 'https://www.linkedin.com/in/bego%C3%B1a-de-la-hera-25ba801a/', liType: 'linkedin' as const, img: '/icons/begona_hera.svg' },
  { name: 'Rolando Evelio Pérez Versón',      flag: '🇲🇽', org: 'Tecnológico de Monterrey',                                  rol: 'Profesor Planta · Director Técnico ABT 2025-2028',                       ponencia: 'Presentación componentes tecnológicos IA, Programa ABT.', li: 'https://www.linkedin.com/in/rolando-evelio-p%C3%A9rez-vers%C3%B3n-4137a8264/', liType: 'linkedin' as const, img: '/icons/rolando_evelio.jpg' },
  { name: 'Hno. Camilo Andrés Aguilar Gómez', flag: '🇨🇴', org: 'Universidad de La Salle',                                   rol: 'Coordinador Universidad de La Salle · Coordinador de Utopía',           ponencia: 'UTOPÍA: Un horizonte educativo para el cuidado, la sostenibilidad y la ecología integra.', li: 'https://www.linkedin.com/in/camilo-andr%C3%A9s-aguilar-g%C3%B3mez-437a32258/', liType: 'linkedin' as const, img: '/images/ponentes_Camilo_Andrés_Aguilar.jpeg' },
  { name: 'Mtro. Gustavo Herrera Caballero',  flag: '🇨🇴', org: 'SELA',                                                       rol: 'Coordinador SELA · Coordinador Desarrollo Social',                       ponencia: 'La experiencia del SELA en la implementación de la Agenda 2030.', li: 'https://www.linkedin.com/in/gustavo-herrera-3528a979/', liType: 'linkedin' as const, img: '/images/ponentes_Gustavo_Herrera.jpeg' },
  { name: 'Liza Rodríguez Galvis',            flag: '🇨🇴', org: 'Gobernación del Valle del Cauca',                           rol: 'Secretaria General de la Gobernación del Valle del Cauca',              ponencia: 'Mujeres en biodiversidad y fortalecimiento institucional: un camino para transformar realidades.', li: 'https://www.instagram.com/lizarodriguez18?igsh=dHYzaml4NG02bGoy', liType: 'instagram' as const, img: '/images/ponentes_Liza_Rodriguez_Galvis.jpeg' },
  { name: 'Nasly Fernanda Gonzales Vidales',  flag: '🇨🇴', org: 'Secretaría de Ambiente y Desarrollo Sostenible del Valle del Cauca', rol: 'Subsecretaria de Desarrollo Sostenible', ponencia: 'El papel de las mujeres en el cambio climático.', li: 'https://www.linkedin.com/in/nasly-fernanda-vidales-gonz%C3%A1lez-1080b5b6/', liType: 'linkedin' as const, img: '/images/ponentes_Nasly_Vidales.jpeg' },
  { name: 'Jhonatan Alexander Becerra Duitama', flag: '🇨🇴', org: 'Fundación Universitaria Juan de Castellanos', rol: 'Líder Desarrollo Tecnológico', ponencia: 'Alianza Universidad Juan de Castellanos | Proyecto ABT.', li: 'https://www.linkedin.com/in/jhonatan-alexander-becerra-duitama/', liType: 'linkedin' as const, img: '/images/ponentes_Jhonatan_Alexander_Becerra.jpeg' },
  { name: 'William Fernando Bernal Suárez',   flag: '🇨🇴', org: 'Fundación Universitaria Juan de Castellanos', rol: 'Líder Desarrollo Tecnológico', ponencia: 'Alianza Universidad Juan de Castellanos | Proyecto ABT.', li: 'https://www.linkedin.com/in/william-bernal-13457b60/', liType: 'linkedin' as const, img: '/images/ponentes_William_Fernando_Bernal.jpeg' },
  { name: 'Magda Lorena Pineda Rodríguez',    flag: '🇨🇴', org: 'Fundación Universitaria Juan de Castellanos', rol: 'Líder Desarrollo Tecnológico', ponencia: 'Alianza Universidad Juan de Castellanos | Proyecto ABT.', li: 'https://www.linkedin.com/in/magda-pineda-rodriguez/', liType: 'linkedin' as const, img: '/images/ponentes_Magda_Lorena_Pineda.jpeg' },
  { name: 'John Cristhian Fernández Lizarazo', flag: '🇨🇴', org: 'Fundación Universitaria Juan de Castellanos', rol: 'Líder Desarrollo Tecnológico', ponencia: 'Alianza Universidad Juan de Castellanos | Proyecto ABT.', li: 'https://www.linkedin.com/in/john-cristhian-fernandez-lizarazo-a7230047/', liType: 'linkedin' as const, img: '/images/ponente_Cristhian_Utopía.jpeg' },
  { name: 'Santiago Granados Gutiérrez',      flag: '🇨🇴', org: 'CEPAL-ONU', rol: 'Consultor', ponencia: 'Legados y desafíos de la COP16.', li: 'https://www.linkedin.com/in/santiago-granados-guti%C3%A9rrez-94a65a21/', liType: 'linkedin' as const, img: '/images/ponentes_Santiago_Granados.jpg' },
]
const ENTREVISTAS = [
  { id: 1, label: 'Carolina Acosta',    src: 'https://pub-94aa83314f8a41088bff3c1130d43ebd.r2.dev/2%20ICEO/Mermoria%202ICEO/Carolina%20Acosta%20-%20Negocio%20Verde%20(1).mp4' },
  { id: 2, label: 'Franklin Corrales',  src: 'https://pub-94aa83314f8a41088bff3c1130d43ebd.r2.dev/2%20ICEO/Mermoria%202ICEO/Entrevista%20editada_Franklin%20Corrales%20-%20jovenes%20ambientalistas-2o%20ICEO.mp4' },
  { id: 3, label: 'Pablo Javier Rojas', src: 'https://pub-94aa83314f8a41088bff3c1130d43ebd.r2.dev/2%20ICEO/Mermoria%202ICEO/Entrevista%20editada_Pablo%20Javier%20Rojas%20-%20USBC--2o%20ICEO.mp4' },
  { id: 4, label: 'Mónica Castillo',    src: 'https://pub-94aa83314f8a41088bff3c1130d43ebd.r2.dev/2%20ICEO/Mermoria%202ICEO/Entrevista%20editada_M%C3%B3nica%20Castillo-Parques%20Naturales%20de%20Colombia-2o%20ICEO.mp4' },
]

function PersonalidadesCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [scrollPos, setScrollPos] = useState(0)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const startScroll = useRef(0)
  const CARD_W = 300 + 48
  const scrollTo = (dir: 1 | -1) => { const el = trackRef.current; if (!el) return; el.scrollTo({ left: Math.max(0, Math.min(el.scrollLeft + dir * CARD_W * 3, el.scrollWidth - el.clientWidth)), behavior: 'smooth' }) }
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
      <div ref={trackRef} onScroll={onScroll} onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseLeave={onMouseUp} onMouseMove={onMouseMove} style={{ display: 'flex', gap: 48, overflowX: 'auto', paddingBottom: 8, scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch', cursor: 'grab', userSelect: 'none', alignItems: 'stretch' }}>
        {PERSONALIDADES.map((p, i) => (
          <div key={i} style={{ width: 300, flexShrink: 0, backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 20, border: '1px solid rgba(255,255,255,0.12)', padding: '28px 22px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'background-color 0.2s' }} onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.backgroundColor = 'rgba(255,255,255,0.11)'} onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.backgroundColor = 'rgba(255,255,255,0.07)'}>
            <div style={{ position: 'relative', width: 130, height: 130, marginBottom: 20, flexShrink: 0 }}>
              <div style={{ position: 'absolute', inset: -5, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(3,163,131,0.45) 0%, rgba(9,117,137,0.2) 100%)' }} />
              <div style={{ position: 'relative', width: 130, height: 130, borderRadius: '50%', overflow: 'hidden', border: '3px solid rgba(255,255,255,0.25)', boxShadow: '0 4px 20px rgba(0,0,0,0.35)' }}><img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} /></div>
              {p.liType === 'instagram'
                ? <a href={p.li} target="_blank" rel="noopener noreferrer" style={{ position: 'absolute', bottom: 4, right: 4, width: 28, height: 28, borderRadius: '50%', backgroundColor: '#E1306C', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.35)', border: '2px solid #09344e', textDecoration: 'none', transition: 'transform 0.15s' }} onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.12)'} onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)'}><svg width="13" height="13" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" stroke="white" strokeWidth="1.8"/><circle cx="12" cy="12" r="4" stroke="white" strokeWidth="1.8"/><circle cx="17.5" cy="6.5" r="1" fill="white"/></svg></a>
                : <a href={p.li} target="_blank" rel="noopener noreferrer" style={{ position: 'absolute', bottom: 4, right: 4, width: 28, height: 28, borderRadius: '50%', backgroundColor: '#0A66C2', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.35)', border: '2px solid #09344e', textDecoration: 'none', transition: 'transform 0.15s' }} onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.12)'} onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)'}><IconLinkedin size={13} color="white" /></a>}
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: 7, marginBottom: 6, width: '100%' }}><span style={{ fontSize: 16, lineHeight: 1.4, flexShrink: 0, marginTop: 2 }}>{p.flag}</span><span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 700, color: '#ffffff', textAlign: 'center', lineHeight: 1.3 }}>{p.name}</span></div>
            <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 600, color: '#76E2CC', textAlign: 'center', lineHeight: 1.4, marginBottom: 5 }}>{p.org}</p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.50)', textAlign: 'center', lineHeight: 1.4, marginBottom: 14 }}>{p.rol}</p>
            <div style={{ width: '55%', borderTop: '1.5px dashed rgba(255,255,255,0.18)', marginBottom: 14 }} />
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.75)', textAlign: 'center', lineHeight: 1.6, flex: 1 }}>{p.ponencia}</p>
          </div>
        ))}
      </div>
      {canPrev && <button onClick={() => scrollTo(-1)} aria-label="Anterior" style={{ position: 'absolute', top: '40%', left: -22, transform: 'translateY(-50%)', width: 44, height: 44, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.12)', border: '1.5px solid rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 3, transition: 'background-color 0.2s' }} onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.22)'} onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.12)'}><svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M10 3L6 8l4 5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></button>}
      {canNext && <button onClick={() => scrollTo(1)} aria-label="Siguiente" style={{ position: 'absolute', top: '40%', right: -22, transform: 'translateY(-50%)', width: 44, height: 44, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.12)', border: '1.5px solid rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 3, transition: 'background-color 0.2s' }} onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.22)'} onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.12)'}><svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M6 3l4 5-4 5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></button>}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 32 }}>{Array.from({ length: totalDots }).map((_, i) => (<button key={i} onClick={() => { const el = trackRef.current; if (!el) return; el.scrollTo({ left: (i / (totalDots - 1)) * (el.scrollWidth - el.clientWidth), behavior: 'smooth' }) }} aria-label={`Página ${i + 1}`} style={{ width: i === activeDot ? 24 : 8, height: 8, borderRadius: 999, backgroundColor: i === activeDot ? '#03A383' : 'rgba(255,255,255,0.25)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.3s ease' }} />))}</div>
      <style suppressHydrationWarning>{`div::-webkit-scrollbar{display:none}`}</style>
    </div>
  )
}

export default function SegundoIceoPage() {
  const [activeVideo, setActiveVideo]   = useState(0)
  const [imageHovered, setImageHovered] = useState(false)

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      <section style={{ backgroundColor: '#74B4A7', paddingTop: 120, paddingBottom: 0, position: 'relative', overflow: 'hidden' }}>

        {/* ── Dot grid (original) ── */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'radial-gradient(circle, rgba(9,52,78,0.9) 1px, transparent 1px)', backgroundSize: '26px 26px', pointerEvents: 'none' }} />
        {/* ── Original glows ── */}
        <div style={{ position: 'absolute', top: -80, right: -80, width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle, rgba(9,52,78,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 60, left: -60, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(9,52,78,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        {/* ── GLOSSY / SATIN LAYERS ── */}
        {/* Diagonal satin highlight sweep top-left */}
        <div style={{ position: 'absolute', top: -120, left: '-5%', width: '65%', height: '85%', background: 'linear-gradient(118deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.04) 40%, transparent 65%)', transform: 'rotate(-6deg)', pointerEvents: 'none', borderRadius: '50%' }} />
        {/* Soft specular shine bottom-right */}
        <div style={{ position: 'absolute', bottom: 0, right: '-5%', width: '50%', height: '70%', background: 'linear-gradient(305deg, rgba(255,255,255,0.09) 0%, transparent 55%)', pointerEvents: 'none', borderRadius: '50%' }} />
        {/* Teal-bright center shimmer */}
        <div style={{ position: 'absolute', top: '10%', left: '30%', width: '40%', height: '60%', background: 'radial-gradient(ellipse at 50% 40%, rgba(255,255,255,0.10) 0%, transparent 65%)', pointerEvents: 'none' }} />
        {/* Warm highlight top-right accent */}
        <div style={{ position: 'absolute', top: 0, right: '15%', width: '30%', height: '45%', background: 'radial-gradient(ellipse at 60% 20%, rgba(174,229,218,0.18) 0%, transparent 60%)', pointerEvents: 'none' }} />

        <div className="container-brand" style={{ padding: '0 48px 88px', position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="hero-iceo-grid">

            {/* ── TEXTO ── */}
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: 'rgba(9,52,78,0.14)', border: '1px solid rgba(9,52,78,0.22)', borderRadius: 999, padding: '6px 16px', marginBottom: 24 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#09344e', opacity: 0.65, flexShrink: 0, display: 'inline-block' }} />
                <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 600, color: '#09344e', letterSpacing: '0.10em', textTransform: 'uppercase' }}>Edición 2026 · Cali, Colombia</span>
              </div>

              <h1 style={{ fontFamily: 'Gloock, Georgia, serif', fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 400, color: '#09344e', lineHeight: 1.08, marginBottom: 24, letterSpacing: '-0.01em' }}>
                Memoria del<br /><span style={{ color: '#ffffff' }}>2° ICEO</span>
              </h1>

              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: 'rgba(9,52,78,0.72)', lineHeight: 1.75, maxWidth: 440, marginBottom: 36 }}>
                Descubre el impacto que logramos en la segunda edición del congreso en 2026 y aprende más sobre este movimiento que transforma organizaciones ambientales en Latinoamérica.
              </p>

              <Link href="/docs/memoria_2iceo.pdf" target="_blank" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: '#09344e', color: '#fff', fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 700, padding: '13px 30px', borderRadius: 999, textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase', boxShadow: '0 4px 22px rgba(9,52,78,0.38)', transition: 'background-color 0.2s, transform 0.15s' }} onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.backgroundColor = '#1C495C'; el.style.transform = 'translateY(-1px)' }} onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.backgroundColor = '#09344e'; el.style.transform = 'translateY(0)' }}>
                Ver Memoria →
              </Link>
            </motion.div>

            {/* ══════════════════════════════════════════════════════════
                IMAGEN — stacked cards AJUSTADO
                Cambios clave:
                1. padding: 40→22px (rectángulos menos protuberantes)
                2. Card media: #AEE5DA → #4886B5 (Brand Blue oficial)
                   Jerarquía de color clara:
                     Fondo teal #74B4A7
                     └─ Navy back  #09344e  (oscurísimo, máx contraste)
                        └─ Blue-600 #4886B5  (azul medio, oficial)
                           └─ Foto  (sin borde de color)
                3. Imagen: sin border, solo shadow limpia
                4. Rotaciones moderadas: navy +5°, blue -3°, img -1.5°
            ══════════════════════════════════════════════════════════ */}
              <motion.div
                initial={{ opacity: 0, x: 32 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
                onMouseEnter={() => setImageHovered(true)}
                onMouseLeave={() => setImageHovered(false)}
                style={{
                  position: 'relative',
                  /*
                  * ✅ Padding reducido vs v3 (40px→22px) para que los
                  * rectángulos se asomen menos alrededor de la imagen.
                  * El asimetría vertical (top pequeño, bottom un poco mayor)
                  * da más espacio al label inferior.
                  */
                  padding: '14px 18px 22px 13px',
                  cursor: 'default',
                }}
              >
                  {/* ── CAPA 0 · NAVY #09344e · trasera ──────────────────── */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    backgroundColor: '#09344e',
                    borderRadius: 20,
                    transform: `rotate(${imageHovered ? 1.5 : 5}deg) scale(${imageHovered ? 1 : 1.01})`,
                    transition: 'transform 0.55s cubic-bezier(0.22,1,0.36,1)',
                    zIndex: 0,
                    boxShadow: '4px 14px 48px rgba(9,52,78,0.60)',
                    willChange: 'transform',
                    overflow: 'hidden',   // ← necesario para que el brillo no se salga
                  }}>
                    {/* Brillo glossy capa 0 */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 40%, transparent 65%)',
                      borderRadius: 'inherit',
                      pointerEvents: 'none',
                    }} />
                    {/* Specular spot top-right */}
                    <div style={{
                      position: 'absolute', top: '-20%', right: '-10%',
                      width: '60%', height: '60%',
                      background: 'radial-gradient(ellipse at 60% 30%, rgba(72,134,181,0.35) 0%, transparent 65%)',
                      pointerEvents: 'none',
                    }} />
                  </div>

                  {/* ── CAPA 1 · #ADD2D9 · intermedia ────────── */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    backgroundColor: '#ADD2D9',
                    borderRadius: 16,
                    transform: `rotate(${imageHovered ? -1 : -3}deg) scale(${imageHovered ? 1 : 1.005})`,
                    transition: 'transform 0.55s cubic-bezier(0.22,1,0.36,1)',
                    zIndex: 1,
                    willChange: 'transform',
                    overflow: 'hidden',   // ← necesario
                  }}>
                    {/* Brillo glossy capa 1 */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(118deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 35%, transparent 60%)',
                      borderRadius: 'inherit',
                      pointerEvents: 'none',
                    }} />
                    {/* Shimmer bottom-right */}
                    <div style={{
                      position: 'absolute', bottom: '-15%', right: '-5%',
                      width: '55%', height: '55%',
                      background: 'radial-gradient(ellipse at 55% 65%, rgba(174,229,218,0.40) 0%, transparent 65%)',
                      pointerEvents: 'none',
                    }} />
                  </div>

                {/* ── CAPA 2 · IMAGEN · frontal ─────────────────────────── */}
                <div style={{
                  position: 'relative', zIndex: 2,
                  borderRadius: 14,
                  overflow: 'hidden',
                  transform: `rotate(${imageHovered ? 0 : -1.5}deg)`,
                  transition: 'transform 0.55s cubic-bezier(0.22,1,0.36,1)',
                  boxShadow: '0 16px 56px rgba(0,0,0,0.38)',
                  willChange: 'transform',
                  isolation: 'isolate',
                  backgroundColor: '#000',
                }}>
                  <img
                  src="/icons/2do_iceo.svg"
                  alt="2° ICEO LATAM · Cali 2026"
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover', 
                    display: 'block',
                    transform: 'scale(1.30)', 
                  }}
                />
                </div>

                {/* ── LABEL flotante — desaparece en hover ─────────────── */}
                <div style={{
                  position: 'absolute',
                  bottom: 10, left: 18,
                  zIndex: 3,
                  display: 'flex', alignItems: 'center', gap: 6,
                  backgroundColor: 'rgba(9,52,78,0.82)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: 999,
                  padding: '4px 12px',
                  border: '1px solid rgba(72,134,181,0.45)',
                  opacity: imageHovered ? 0 : 1,
                  transition: 'opacity 0.3s ease',
                  pointerEvents: 'none',
                }}>
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 10, fontWeight: 700, color: '#AEE5DA', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    2° ICEO · 2026 · Cali
                  </span>
                </div>

              </motion.div>
          </div>
        </div>

        {/* Ola inferior */}
        <div style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: '100%', height: 60, display: 'block' }}>
            <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,20 1440,30 L1440,60 L0,60 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* ══ MOMENTOS ══════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#fff', padding: '80px 0' }}>
        <div className="container-brand" style={{ padding: '0 48px' }}>
          <FadeIn><h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 28, fontWeight: 600, color: '#09344e', textAlign: 'center', marginBottom: 48 }}>Momentos que definieron el congreso</h2></FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="momentos-grid">
            {MOMENTOS.map((m, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div style={{ borderRadius: 12, overflow: 'hidden', boxShadow: '2px 2px 8px rgba(18,48,62,0.15)', position: 'relative', aspectRatio: '4/3' }}>
                  <img src={m.image} alt={m.label} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(0deg,rgba(9,52,78,0.95) 0%,transparent 100%)', padding: '32px 16px 14px', display: 'flex', alignItems: 'flex-end', gap: 10 }}>
                    <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 40, fontWeight: 700, color: '#fff', lineHeight: 1 }}>{m.num}</span>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.9)', lineHeight: 1.3, paddingBottom: 4, maxWidth: 100 }}>{m.label}</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ IMPACTO ═══════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#F7F6F3', padding: '80px 0' }}>
        <div className="container-brand" style={{ padding: '0 48px' }}>
          <FadeIn><h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 28, fontWeight: 600, color: '#09344e', textAlign: 'center', marginBottom: 48 }}>Impacto del evento</h2></FadeIn>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'center' }}>
            {IMPACTO.map((item, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div style={{ background: '#fff', borderRadius: 12, padding: '28px 24px', textAlign: 'center', minWidth: 160, flex: '1 1 160px', maxWidth: 200, boxShadow: '2px 2px 8px rgba(18,48,62,0.10)' }}>
                  <div style={{ marginBottom: 8, display: 'flex', justifyContent: 'center' }}><img src={item.icon} alt={item.label} width={36} height={36} style={{ display: 'block' }} /></div>
                  <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 34, fontWeight: 700, color: '#03A383', lineHeight: 1 }}>{item.num}</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#5A6E77', marginTop: 8, lineHeight: 1.4 }}>{item.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ REDES ═════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#fff', padding: '80px 0' }}>
        <div className="container-brand" style={{ padding: '0 48px' }}>
          <FadeIn><h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 28, fontWeight: 600, color: '#09344e', textAlign: 'center', marginBottom: 48 }}>Alcance en Redes Sociales</h2></FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }} className="redes-grid">
            {REDES.map((r, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div style={{ background: r.bg, borderRadius: 14, padding: '28px 20px', textAlign: 'center', color: '#fff', boxShadow: '2px 2px 12px rgba(18,48,62,0.15)' }}>
                  <div style={{ marginBottom: 8 }}><r.Icon size={32} color="white" /></div>
                  <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 30, fontWeight: 700, lineHeight: 1 }}>{r.num}</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, marginTop: 8, opacity: 0.9, lineHeight: 1.4 }}>{r.label}</div>
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

      {/* ══ PERSONALIDADES ════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#09344e', padding: '80px 0' }}>
        <div className="container-brand" style={{ padding: '0 48px' }}>
          <FadeIn>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 28, fontWeight: 600, color: '#fff', textAlign: 'center', marginBottom: 12 }}>Personalidades destacadas</h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.40)', textAlign: 'center', marginBottom: 56, letterSpacing: '0.03em' }}>{PERSONALIDADES.length} ponentes · desliza para ver todos →</p>
          </FadeIn>
          <div style={{ position: 'relative', padding: '0 28px' }}><PersonalidadesCarousel /></div>
        </div>
      </section>

      <div style={{ lineHeight: 0, backgroundColor: '#09344e' }}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: '100%', height: 60, display: 'block' }}>
          <path d="M0,40 C360,0 1080,60 1440,20 L1440,60 L0,60 Z" fill="#F7F6F3" />
        </svg>
      </div>

      {/* ══ VOCES ═════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#F7F6F3', padding: '80px 0' }}>
        <div className="container-brand" style={{ padding: '0 48px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start' }} className="voces-grid">
            <FadeIn>
              <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 28, fontWeight: 600, color: '#09344e', marginBottom: 16 }}>Voces del Congreso</h2>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#5A6E77', lineHeight: 1.75, marginBottom: 16 }}>El 2° ICEO fue un espacio de encuentro entre organizaciones, comunidades, líderes y jóvenes que construyen soluciones desde sus territorios.</p>
              <blockquote style={{ borderLeft: '3px solid #03A383', paddingLeft: 18, margin: '24px 0', fontFamily: 'Inter, sans-serif', fontSize: 14, fontStyle: 'italic', color: '#5A6E77', lineHeight: 1.75 }}>"El 2° ICEO LATAM fue un espacio enriquecedor entre organizaciones ambientales y tecnológicas que movilizamos permanentemente."</blockquote>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 600, color: '#03A383', marginBottom: 24 }}>— Participante destacado, 2° ICEO</p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 14 }}>
                  {ENTREVISTAS.map((e, i) => (<button key={e.id} onClick={() => setActiveVideo(i)} style={{ padding: '8px 4px', borderRadius: 8, border: activeVideo === i ? '2px solid #03A383' : '2px solid #C3DED9', backgroundColor: activeVideo === i ? '#03A383' : '#fff', color: activeVideo === i ? '#fff' : '#5A6E77', fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', letterSpacing: '0.02em' }}>{e.label}</button>))}
                </div>
                <div style={{ borderRadius: 14, overflow: 'hidden', boxShadow: '4px 4px 24px rgba(9,52,78,0.2)', backgroundColor: '#000', aspectRatio: '16/9' }}>
                  <video key={ENTREVISTAS[activeVideo].src} controls style={{ width: '100%', height: '100%', display: 'block', objectFit: 'contain', backgroundColor: '#000' }} poster="">
                    <source src={ENTREVISTAS[activeVideo].src} type="video/mp4" />
                  </video>
                </div>
                <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 12, color: '#5A6E77', marginTop: 10, textAlign: 'center', letterSpacing: '0.03em' }}>{ENTREVISTAS[activeVideo].label} · 2° ICEO LATAM</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══ RELEVANCIA ════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#09344e', padding: '80px 0', overflow: 'hidden' }}>
        <div className="container-brand" style={{ padding: '0 48px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 60, alignItems: 'center' }} className="relevancia-grid">
            <FadeIn><div style={{ borderRadius: 14, overflow: 'hidden', aspectRatio: '4/3', boxShadow: '8px 8px 40px rgba(0,0,0,0.3)' }}><img src="/icons/2do_iceo.svg" alt="Relevancia e Impacto 2° ICEO" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /></div></FadeIn>
            <FadeIn delay={0.15}>
              <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 28, fontWeight: 600, color: '#fff', marginBottom: 16, lineHeight: 1.25 }}>Relevancia e impacto en la <span style={{ color: '#76E2CC' }}>comunidad ambiental</span></h2>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.75, marginBottom: 14 }}>El 2° ICEO LATAM se consolidó como un espacio clave para visibilizar el trabajo de organizaciones y tecnólogos que movilizamos permanentemente.</p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.75, marginBottom: 28 }}>Su impacto se refleja en nuevas alianzas, intercambio de saberes y fortalecimiento de iniciativas ambientales en toda la región.</p>
              <Link href="/docs/memoria_2iceo.pdf" target="_blank" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: '#74B4A7', color: '#fff', fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600, padding: '12px 28px', borderRadius: 999, textDecoration: 'none', letterSpacing: '0.04em', textTransform: 'uppercase', transition: 'background-color 0.2s' }} onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#3C625B')} onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#74B4A7')}>Conocer más →</Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══ CTA MEMORIA ═══════════════════════════════════════════════ */}
      <section style={{ background: 'linear-gradient(135deg, #03A383 0%, #3C625B 100%)', padding: '72px 48px', textAlign: 'center' }}>
        <FadeIn>
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 28, fontWeight: 600, color: '#fff', marginBottom: 28 }}>Lee la memoria del 2° ICEO completa</h2>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/docs/memoria_2iceo.pdf" target="_blank" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: '#fff', color: '#03A383', fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 700, padding: '13px 32px', borderRadius: 999, textDecoration: 'none', letterSpacing: '0.04em', textTransform: 'uppercase', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>↓ Descargar memoria</Link>
            <Link href="/docs/memoria_2iceo.pdf" target="_blank" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: 'transparent', color: '#fff', border: '2px solid rgba(255,255,255,0.8)', fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 700, padding: '11px 32px', borderRadius: 999, textDecoration: 'none', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Ver memoria</Link>
          </div>
        </FadeIn>
      </section>

      {/* ══ DONACIÓN ══════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#fff', padding: '80px 0' }}>
        <div className="container-brand" style={{ padding: '0 48px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="donacion-grid">
            <FadeIn>
              <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 28, fontWeight: 600, color: '#09344e', marginBottom: 14, lineHeight: 1.25 }}>¡Gracias a tu donación, nadie se queda fuera!</h2>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#5A6E77', lineHeight: 1.75, marginBottom: 12 }}>Tu ayuda garantiza que organizaciones ambientales que no cuentan con recursos puedan asistir al 2° ICEO y formar parte de un espacio de aprendizaje, colaboración y transformación climática.</p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#5A6E77', lineHeight: 1.6, marginBottom: 28, opacity: 0.8 }}>El importe irá íntegramente destinado a cubrir alojamiento, manutención, transporte y tasas.</p>
              <Link href="/marketing/donaciones" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: '#B53077', color: '#fff', fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 700, padding: '13px 32px', borderRadius: 999, textDecoration: 'none', letterSpacing: '0.04em', boxShadow: '0 2px 16px rgba(181,48,119,0.30)', textTransform: 'uppercase' }}>Dona ahora →</Link>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div style={{ borderRadius: 14, overflow: 'hidden', aspectRatio: '4/3', boxShadow: '4px 4px 24px rgba(9,52,78,0.12)' }}>
                <img src="/icons/planta_donacion.svg" alt="Donación 2° ICEO" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══ REDES SOCIALES ════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#F7F6F3', padding: '80px 0' }}>
        <div className="container-brand" style={{ padding: '0 48px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }} className="follow-grid">
            <FadeIn><div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img src="/icons/follow.svg" alt="Follow us on social media" style={{ width: '100%', maxWidth: 380, height: 'auto', display: 'block' }} /></div></FadeIn>
            <FadeIn delay={0.15}>
              <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 22, fontWeight: 600, color: '#09344e', marginBottom: 12 }}>¡Pásate por nuestras Redes Sociales y síguenos!</h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#5A6E77', lineHeight: 1.75, marginBottom: 24 }}>Publicamos contenido acerca de la labor que hacemos, podrás conocer proyectos y a nosotros más a fondo.</p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {[{ label: 'Instagram', bg: '#E1306C', Icon: IconInstagram }, { label: 'Facebook', bg: '#1877F2', Icon: IconFacebook }, { label: 'LinkedIn', bg: '#0A66C2', Icon: IconLinkedin }].map(({ label, bg, Icon }) => (
                  <Link key={label} href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: bg, color: '#fff', fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 600, padding: '8px 18px', borderRadius: 999, textDecoration: 'none' }}><Icon size={14} color="white" />{label}</Link>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <style suppressHydrationWarning>{`
        @media (max-width: 900px) {
          .hero-iceo-grid  { grid-template-columns: 1fr !important; }
          .momentos-grid   { grid-template-columns: repeat(2,1fr) !important; }
          .redes-grid      { grid-template-columns: repeat(2,1fr) !important; }
          .voces-grid      { grid-template-columns: 1fr !important; }
          .relevancia-grid { grid-template-columns: 1fr !important; }
          .donacion-grid   { grid-template-columns: 1fr !important; }
          .follow-grid     { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 580px) {
          .momentos-grid { grid-template-columns: 1fr !important; }
          .redes-grid    { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  )
}