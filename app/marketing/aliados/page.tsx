'use client'

import { useState, useEffect } from 'react'
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
    >{children}</motion.div>
  )
}

// ─── Tipo unificado para socios ───────────────────────────────────────────────
interface Socio {
  name:     string
  desc:     string
  logo:     string
  href:     string
  accentBg: string
  isJpg:    boolean
}

// ─── Organizadores — hardcodeados, nunca cambian ──────────────────────────────
const ORGANIZADORES = [
  {
    logo:     '/icons/AWAQ_aliado.svg',
    name:     'Awaq ONGD',
    href:     'https://www.somosawaq.org/',
    desc:     'Awaq es una organización de cooperación internacional que, desde 2019, se dedica al desarrollo de proyectos de investigación científica y conservación de ecosistemas en comunidades menos favorecidas. A través de Estaciones Biológicas, Awaq implementa modelos económicos alternativos con el objetivo de mejorar la calidad de vida de los habitantes de estas comunidades.',
    accentBg: '#ADC6D9',
  },
  {
    logo:     '/icons/humans_pro.svg',
    name:     'HumansPRO®',
    href:     'https://www.humanspro.org/',
    desc:     'Como Ente de Acreditación Internacional, promovemos la confianza y la transparencia en los procesos de certificación, garantizando que nuestras acreditaciones reflejen competencia, excelencia y cumplimiento de estándares internacionales. Colaboramos con diversos sectores como industria, tecnología, educación y salud.',
    accentBg: '#4886B5',
  },
  {
    logo:     '/icons/logo_uni_USB.svg',
    name:     'Universidad de San Buenaventura',
    href:     'https://usb.edu.co/',
    desc:     'La Universidad de San Buenaventura en Cali es una institución de educación superior que se distingue por su enfoque católico y franciscano, buscando la formación integral del ser humano y la transformación de la sociedad. Fue fundada por la comunidad Franciscana y ha contribuido al desarrollo de la educación colombiana desde su creación.',
    accentBg: '#ADC6D9',
  },
]

// ─── Socios fallback hardcodeados ─────────────────────────────────────────────
const SOCIOS_FALLBACK: Socio[] = [
  { logo: '/icons/gob_valle_cauca.svg',      isJpg: false, name: 'Gobernación del Valle del Cauca',             desc: 'Máxima autoridad administrativa del departamento, promueve el desarrollo integral, la prosperidad y la preservación cultural de sus habitantes.',                              href: 'https://www.valledelcauca.gov.co/',                                    accentBg: '#097589' },
  { logo: '/icons/sc_uni_lasalle_utopia.svg', isJpg: false, name: 'Proyecto Utopía · Universidad de La Salle',   desc: 'Referente de transformación territorial y agroecología con sentido social. Modelo educativo rural orientado a la paz y la sostenibilidad.',                                   href: 'https://lasalle.edu.co/es/campus-unisalle/campus-yopal/proyecto-utopia', accentBg: '#4886B5' },
  { logo: '/icons/sc_proyecto_colombia.svg',  isJpg: false, name: 'Proyectando Colombia',                         desc: 'Integra regiones y fortalece la imagen de PMI® en Colombia, contribuyendo al desarrollo sostenible a través de la gestión de proyectos.',                                   href: 'https://www.proyectandocolombia.org/',                                  accentBg: '#ADC6D9' },
  { logo: '/icons/sc_sophic.svg',             isJpg: false, name: 'SoPhIC — Sociedad Filosófica Iberoamérica-Colombia', desc: 'Asociación gremial de doctores e investigadores de Colombia, generando impacto social, económico y científico a nivel nacional e internacional.',               href: 'https://www.sophicol.org/',                                            accentBg: '#74B4A7' },
  { logo: '/icons/sc_juanDcastellanos.jpg',   isJpg: true,  name: 'Fundación Universitaria Juan de Castellanos',  desc: 'Aliada en la articulación entre academia, sostenibilidad y acción comunitaria. Comprometida con el desarrollo rural y la conservación ambiental.',                        href: 'https://www.jdc.edu.co/',                                              accentBg: '#097589' },
]

function OrgCard({ org, delay = 0 }: { org: typeof ORGANIZADORES[0]; delay?: number }) {
  return (
    <FadeIn delay={delay} style={{ flex: '1 1 0', minWidth: 260, maxWidth: 360, height: '100%' }}>
      <div style={{ position: 'relative', height: '100%' }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: '48px 8px 48px 8px', backgroundColor: org.accentBg, transform: 'translate(10px, 10px)', zIndex: 0 }} />
        <div style={{ position: 'relative', zIndex: 1, height: '100%', borderRadius: '48px 8px 48px 8px', backgroundColor: '#ffffff', padding: '28px 26px 26px', boxShadow: '0 4px 20px rgba(9,52,78,0.10)', display: 'flex', flexDirection: 'column', transition: 'transform 0.22s', boxSizing: 'border-box' }}
          onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)'}
          onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'}
        >
          <div style={{ width: '100%', height: 148, flexShrink: 0, borderRadius: '32px 4px 20px 4px', border: '2px solid #AEE5DA', backgroundColor: '#F8FDFC', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 24px', marginBottom: 22, overflow: 'hidden' }}>
            <img src={org.logo} alt={org.name} style={{ maxWidth: '100%', maxHeight: 100, objectFit: 'contain', display: 'block' }} />
          </div>
          <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 17, fontWeight: 700, color: '#09344e', lineHeight: 1.25, marginBottom: 12, flexShrink: 0 }}>{org.name}</h3>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13.5, color: '#12303E', lineHeight: 1.7, flex: 1, marginBottom: 18 }}>{org.desc}</p>
          <a href={org.href} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'Poppins, sans-serif', fontSize: 13.5, fontWeight: 600, color: '#097589', textDecoration: 'none', transition: 'gap 0.2s', flexShrink: 0 }}
            onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.gap = '10px'}
            onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.gap = '6px'}
          >
            Saber más
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M10 5l3 3-3 3" stroke="#097589" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>
      </div>
    </FadeIn>
  )
}

function SocioCard({ socio, index }: { socio: Socio; index: number }) {
  return (
    <FadeIn delay={index * 0.06} style={{ height: '100%' }}>
      <div style={{ position: 'relative', height: '100%' }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: '32px 6px 32px 6px', backgroundColor: socio.accentBg, opacity: 0.35, transform: 'translate(6px, 6px)', zIndex: 0 }} />
        <div style={{ position: 'relative', zIndex: 1, height: '100%', borderRadius: '32px 6px 32px 6px', backgroundColor: '#ffffff', padding: '22px 20px 20px', boxShadow: '0 2px 14px rgba(9,52,78,0.09)', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s', boxSizing: 'border-box' }}
          onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'}
          onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'}
        >
          <div style={{ width: '100%', height: 100, flexShrink: 0, borderRadius: '22px 4px 14px 4px', border: `2px solid ${socio.accentBg}55`, backgroundColor: '#F8FDFC', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '14px 16px', marginBottom: 16, overflow: 'hidden' }}>
            <img src={socio.logo} alt={socio.name} style={{ maxWidth: '100%', maxHeight: 72, objectFit: 'contain', display: 'block', borderRadius: socio.isJpg ? 6 : 0 }} />
          </div>
          <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 700, color: '#09344e', lineHeight: 1.3, marginBottom: 8, flexShrink: 0 }}>{socio.name}</h3>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12.5, color: '#5A6E77', lineHeight: 1.65, flex: 1, marginBottom: 14 }}>{socio.desc}</p>
          <a href={socio.href} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: 'Poppins, sans-serif', fontSize: 12.5, fontWeight: 600, color: '#097589', textDecoration: 'none', transition: 'gap 0.2s', flexShrink: 0 }}
            onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.gap = '9px'}
            onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.gap = '5px'}
          >
            Saber más
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M10 5l3 3-3 3" stroke="#097589" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>
      </div>
    </FadeIn>
  )
}

export default function AliadosPage() {
  const [socios, setSocios] = useState<Socio[]>(SOCIOS_FALLBACK)

  // ── Carga socios desde Salesforce, combina con fallback ──
  useEffect(() => {
    fetch('/api/salesforce/socios')
      .then(r => r.json())
      .then(data => {
        if (data.socios?.length > 0) {
          setSocios(prev => {
            const sfNombres = new Set(data.socios.map((s: Socio) => s.name))
            const soloFallback = prev.filter(s => !sfNombres.has(s.name))
            return [...soloFallback, ...data.socios]
          })
        }
      })
      .catch(() => { /* mantiene fallback */ })
  }, [])

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>

      <HeroIceo
        badge="3ICEO · LATAM"
        title={<>Aliados{' '}<span style={{ color: '#ffffff', fontVariantNumeric: 'lining-nums' }}>3er ICEO</span></>}
        description={<>Una red de instituciones y organizaciones comprometidas<br />con el futuro de las fuentes hídricas</>}
        cta={{ label: 'QUIERO ASISTIR →', href: '/marketing/registro' }}
        ctaSecondary={{ label: 'Ver programa', href: '/marketing/agenda' }}
        image="/icons/aliados.svg"
        imageAlt="Red de aliados ICEO LATAM"
        imageLabel="3° ICEO · Aliados · 2027"
        waveVariant="default"
        imageScale={1.40}
        waveColor="#F0F4F7"
      />

      {/* ══ ORGANIZADORES — hardcodeados, nunca cambian ══════════════════════ */}
      <section style={{ backgroundColor: '#F0F4F7', padding: '80px 48px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <FadeIn>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(24px,2.8vw,32px)', fontWeight: 700, color: '#09344e', textAlign: 'center', marginBottom: 56 }}>
              Organizadores
            </h2>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, alignItems: 'stretch', padding: '0 8px 16px' }} className="org-grid">
            {ORGANIZADORES.map((org, i) => <OrgCard key={org.name} org={org} delay={i * 0.1} />)}
          </div>
        </div>
      </section>

      <div style={{ lineHeight: 0, backgroundColor: '#F0F4F7' }}>
        <svg viewBox="0 0 1440 56" preserveAspectRatio="none" style={{ width: '100%', height: 56, display: 'block' }}>
          <path d="M0,56 C240,0 480,56 720,28 C960,0 1200,48 1440,20 L1440,56 L0,56 Z" fill="#ffffff" />
        </svg>
      </div>

      {/* ══ SOCIOS COLABORADORES — dinámicos desde Salesforce ════════════════ */}
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28, alignItems: 'stretch', padding: '0 8px 16px' }} className="socios-grid">
            {socios.map((socio, i) => <SocioCard key={socio.name} socio={socio} index={i} />)}
          </div>
        </div>
      </section>

      {/* ══ LLAMADO A ALIADOS ════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#E6F3EE', padding: '72px 48px 80px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="cta-aliados-grid" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'center' }}>
            <FadeIn>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#097589', marginBottom: 12 }}>
                LLAMADA A ALIADOS
              </p>
              <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(24px, 2.8vw, 36px)', fontWeight: 700, color: '#09344e', lineHeight: 1.2, marginBottom: 16 }}>
                ¿Tu organización quiere ser parte del 3ICEO?
              </h2>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#5A6E77', lineHeight: 1.7, marginBottom: 32, maxWidth: 540 }}>
                El 3ICEO busca aliados institucionales, académicos y organizaciones de cooperación comprometidas con la protección de las fuentes hídricas y los territorios vivos de Latinoamérica. Únete a la red y construye junto a nosotros.
              </p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <Link href="/marketing/registro?tipo=colaboracion"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: '#097589', color: '#ffffff', fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 700, padding: '12px 28px', borderRadius: 999, textDecoration: 'none', letterSpacing: '0.05em', boxShadow: '0 2px 16px rgba(9,117,137,0.30)', transition: 'background-color 0.2s, transform 0.15s' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.backgroundColor = '#074954'; el.style.transform = 'translateY(-1px)' }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.backgroundColor = '#097589'; el.style.transform = 'translateY(0)' }}
                >
                  QUIERO SER ALIADO →
                </Link>
                <Link href="/marketing/agenda"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: 'transparent', color: '#09344e', fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600, padding: '11px 24px', borderRadius: 999, border: '1.5px solid rgba(9,52,78,0.30)', textDecoration: 'none', letterSpacing: '0.04em', transition: 'border-color 0.2s, background-color 0.2s' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = '#097589'; el.style.backgroundColor = 'rgba(9,117,137,0.07)' }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = 'rgba(9,52,78,0.30)'; el.style.backgroundColor = 'transparent' }}
                >
                  Ver programa →
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={0.12}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flexShrink: 0 }} className="aliados-beneficios">
                {[
                  { label: 'Visibilidad institucional ante más de 1.000 asistentes',    icon: <svg width={16} height={16} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="#fff" strokeWidth="1.8"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/></svg> },
                  { label: 'Red de cooperación Europa–Latinoamérica',                   icon: <svg width={16} height={16} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#fff" strokeWidth="1.8"/><path d="M12 3C12 3 8 8 8 12s4 9 4 9M12 3c0 0 4 5 4 9s-4 9-4 9M3 12h18" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/></svg> },
                  { label: 'Espacio en agenda: paneles, talleres o conferencias',        icon: <svg width={16} height={16} viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="17" rx="2" stroke="#fff" strokeWidth="1.8"/><path d="M16 2v4M8 2v4M3 10h18" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/></svg> },
                  { label: 'Stand en el Marketplace Territorial',                        icon: <svg width={16} height={16} viewBox="0 0 24 24" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round"/><path d="M9 22V12h6v10" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/></svg> },
                  { label: 'Difusión en redes y comunicaciones del congreso',            icon: <svg width={16} height={16} viewBox="0 0 24 24" fill="none"><path d="M22 4s-3 3-8 3-9 2-9 7 4 7 8 7c2 0 4-.5 5-1" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/><circle cx="5" cy="19" r="2" stroke="#fff" strokeWidth="1.8"/><path d="M14 9c0 0-4 1-6 5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/></svg> },
                ].map((b, i) => (
                  <div key={i} style={{ backgroundColor: '#fff', border: '1.5px solid #AEE5DA', borderRadius: 12, padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 12, boxShadow: '2px 2px 8px rgba(9,52,78,0.06)', minWidth: 280 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, flexShrink: 0, backgroundColor: '#097589', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {b.icon}
                    </div>
                    <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 500, color: '#09344e', lineHeight: 1.35 }}>{b.label}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <SectionDonacion bg="#09344e" theme="dark" showWave={false} showTopWave topWaveFrom="#E6F3EE" />
      <SectionRedes bg="#ffffff" theme="light" />

      <style suppressHydrationWarning>{`
        @media (max-width: 900px) {
          .org-grid           { grid-template-columns: 1fr !important; }
          .socios-grid        { grid-template-columns: repeat(2,1fr) !important; }
          .cta-aliados-grid   { grid-template-columns: 1fr !important; }
          .aliados-beneficios { display: none !important; }
          .follow-grid        { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 580px) {
          .socios-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}