'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HeroIceo from '@/components/sections/HeroIceo'
import SectionDonacion from '@/components/sections/SectionDonacion'
import SectionRedes from '@/components/sections/SectionRedes'

function FadeIn({ children, delay = 0, style }: {
  children: React.ReactNode; delay?: number; style?: React.CSSProperties
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      style={style}
    >{children}</motion.div>
  )
}

interface Noticia {
  id:            string | number
  categoria:     string
  titulo:        string
  extracto:      string
  fecha:         string
  img:           string
  imgBg:         string
  slug:          string | number
  url_redirect:  string
  tipo_redirect: string
}

const NOTICIAS_FALLBACK: Noticia[] = [
  {
    id: 1, slug: 1,
    categoria: 'anuncio',
    titulo: '3er ICEO · Cali, 17-19 de agosto de 2026',
    extracto: 'El Tercer Congreso Internacional de Organizaciones Ambientales de Latinoamérica ya tiene fecha y sede confirmada. Tres días de conferencias, talleres y networking en la Universidad de San Buenaventura en Cali, Colombia.',
    fecha: '01/06/26',
    img: 'https://pub-94aa83314f8a41088bff3c1130d43ebd.r2.dev/general/iceo-hero.jpg',
    imgBg: 'linear-gradient(135deg, #09344e 0%, #097589 100%)',
    url_redirect: '/marketing/registro',
    tipo_redirect: 'web',
  },
  {
    id: 2, slug: 2,
    categoria: 'notas sociales',
    titulo: 'Awaq ONGD y la Universidad de San Buenaventura unen fuerzas para el 3ICEO',
    extracto: 'La alianza entre Awaq ONGD y la USB consolida el escenario perfecto para reunir a organizaciones ambientales de toda Latinoamérica y Europa en agosto de 2026.',
    fecha: '15/05/26',
    img: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80',
    imgBg: 'linear-gradient(135deg, #1C495C 0%, #74B4A7 100%)',
    url_redirect: 'https://www.instagram.com/awaqong',
    tipo_redirect: 'instagram',
  },
  {
    id: 3, slug: 3,
    categoria: 'video',
    titulo: 'Primer vídeo oficial del 3ICEO ya disponible en YouTube',
    extracto: 'Descubre qué es el Congreso Internacional de Organizaciones Ambientales de Latinoamérica y por qué esta edición en Cali será histórica.',
    fecha: '10/05/26',
    img: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80',
    imgBg: 'linear-gradient(135deg, #097589 0%, #AEE5DA 100%)',
    url_redirect: 'https://www.youtube.com/@awaqong',
    tipo_redirect: 'youtube',
  },
  {
    id: 4, slug: 4,
    categoria: 'streaming',
    titulo: 'Streaming en vivo — Apertura del 3ICEO',
    extracto: 'Sigue en directo la ceremonia de apertura del 3er Congreso Internacional de Organizaciones Ambientales.',
    fecha: '17/08/26',
    img: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80',
    imgBg: 'linear-gradient(135deg, #B53077 0%, #437287 100%)',
    url_redirect: 'N/A',
    tipo_redirect: 'N/A',
  },
]

const CATEGORIAS_FILTRO = ['Todas', 'video', 'streaming', 'notas sociales', 'anuncio']
const ORDEN_OPTIONS     = ['Más reciente', 'Más antigua', 'A-Z', 'Z-A']

const BADGE_COLOR: Record<string, string> = {
  video:            '#097589',
  streaming:        '#B53077',
  'notas sociales': '#437287',
  anuncio:          '#B58A00',
}

// ─── Iconos SVG profesionales por categoría ───────────────────────────────────
function BadgeIcon({ tipo }: { tipo: string }) {
  const icons: Record<string, JSX.Element> = {
    video: (
      <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
        <path d="M8 5v14l11-7z"/>
      </svg>
    ),
    streaming: (
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
        <circle cx="12" cy="12" r="2"/>
        <path d="M16.24 7.76a6 6 0 0 1 0 8.49M7.76 16.24a6 6 0 0 1 0-8.49M19.07 4.93a10 10 0 0 1 0 14.14M4.93 19.07a10 10 0 0 1 0-14.14"/>
      </svg>
    ),
    'notas sociales': (
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
        <path d="M18 14h-8M15 18h-5M10 6h8v4h-8z"/>
      </svg>
    ),
    anuncio: (
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
        <path d="M22 8s-4 2-8 2-8-2-8-2V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2Z"/>
        <path d="M6 8v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8"/>
        <path d="M10 12h4"/>
      </svg>
    ),
  }
  return icons[tipo] || icons['anuncio']
}

// ─── Iconos SVG profesionales por red social ──────────────────────────────────
const REDIRECT_INFO: Record<string, { color: string; label: string; svg: JSX.Element }> = {
  instagram: {
    color: '#E1306C', label: 'Ver en Instagram',
    svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="#E1306C"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="white" strokeWidth="2" strokeLinecap="round"/><rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="white" strokeWidth="1.5"/><circle cx="12" cy="12" r="4" fill="none" stroke="white" strokeWidth="1.5"/><circle cx="17.5" cy="6.5" r="1" fill="white"/></svg>,
  },
  youtube: {
    color: '#FF0000', label: 'Ver en YouTube',
    svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.965C5.12 20 12 20 12 20s6.88 0 8.59-.455a2.78 2.78 0 0 0 1.95-1.965A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#FF0000"/></svg>,
  },
  twitter: {
    color: '#1DA1F2', label: 'Ver en Twitter',
    svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>,
  },
  facebook: {
    color: '#1877F2', label: 'Ver en Facebook',
    svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
  },
  linkedin: {
    color: '#0A66C2', label: 'Ver en LinkedIn',
    svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
  },
  streaming: {
    color: '#B53077', label: 'Ver streaming',
    svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49M7.76 16.24a6 6 0 0 1 0-8.49"/></svg>,
  },
  web: {
    color: '#097589', label: 'Visitar web',
    svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  },
}

function RedirectBtn({ url, tipo, small = false }: {
  url: string; tipo: string; small?: boolean
}) {
  if (!url || url === 'N/A' || url === 'n/a') return null
  const info = REDIRECT_INFO[tipo] || REDIRECT_INFO['web']

  if (small) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer"
        style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 600, color: info.color, textDecoration: 'none', transition: 'gap 0.2s' }}
        onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.gap = '8px'}
        onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.gap = '5px'}
      >
        {info.label} →
      </a>
    )
  }

  return (
    <a href={url} target="_blank" rel="noopener noreferrer"
      style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: info.color, color: '#fff', fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 700, padding: '10px 20px', borderRadius: 999, textDecoration: 'none', letterSpacing: '0.03em', transition: 'opacity 0.2s' }}
      onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.opacity = '0.85'}
      onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.opacity = '1'}
    >
      {info.svg}
      {info.label}
    </a>
  )
}

export default function ComunicacionesPage() {
  const [noticias, setNoticias] = useState<Noticia[]>(NOTICIAS_FALLBACK)
  const [filtro,   setFiltro]   = useState('Todas')
  const [busqueda, setBusqueda] = useState('')
  const [orden,    setOrden]    = useState('Más reciente')

  useEffect(() => {
    fetch('/api/salesforce/noticias')
      .then(r => r.json())
      .then(data => {
        if (data.noticias?.length > 0) setNoticias(data.noticias)
      })
      .catch(() => {})
  }, [])

  const noticiasFiltradas = useMemo(() => {
    let result = noticias.filter(n => {
      const pasaCat = filtro === 'Todas' || n.categoria === filtro
      const pasaQ   = !busqueda || n.titulo.toLowerCase().includes(busqueda.toLowerCase())
      return pasaCat && pasaQ
    })

    // Ordenar
    result = [...result].sort((a, b) => {
      if (orden === 'Más reciente') return b.fecha.localeCompare(a.fecha)
      if (orden === 'Más antigua')  return a.fecha.localeCompare(b.fecha)
      if (orden === 'A-Z')          return a.titulo.localeCompare(b.titulo)
      if (orden === 'Z-A')          return b.titulo.localeCompare(a.titulo)
      return 0
    })

    return result
  }, [noticias, filtro, busqueda, orden])

  const resetFiltros = () => { setFiltro('Todas'); setBusqueda(''); setOrden('Más reciente') }
  const destacada    = noticiasFiltradas[0]
  const resto        = noticiasFiltradas.slice(1)

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>

      <HeroIceo
        badge="Centro de Comunicaciones ICEO"
        title={<>Noticias{' '}<span style={{ color: '#ffffff' }}>3er ICEO</span></>}
        description="Descubre las últimas noticias, vídeos y notas del congreso."
        cta={{ label: 'Ver noticias →', href: '#noticias' }}
        ctaSecondary={{ label: 'Síguenos', href: '#redes' }}
        image="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=640&q=80"
        imageAlt="Redacción periodística"
        imageLabel="Comunicaciones ICEO"
        waveVariant="default"
        waveColor="#F0F4F7"
      />

      <section id="noticias" style={{ padding: '64px 0 80px', backgroundColor: '#F0F4F7' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>

          {/* ── Filtros + búsqueda + orden ── */}
          <FadeIn>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40, flexWrap: 'wrap', justifyContent: 'space-between' }}>

              {/* Pills categoría */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {CATEGORIAS_FILTRO.map(cat => (
                  <button key={cat} onClick={() => setFiltro(cat)} style={{
                    fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 600,
                    padding: '8px 18px', borderRadius: 999, border: 'none', cursor: 'pointer',
                    backgroundColor: filtro === cat ? '#09344e' : '#ffffff',
                    color:           filtro === cat ? '#ffffff' : '#5A6E77',
                    boxShadow:       filtro === cat ? '0 2px 12px rgba(9,52,78,0.25)' : '0 1px 4px rgba(9,52,78,0.08)',
                    transition: 'all 0.2s',
                  }}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>

              {/* Búsqueda + Orden */}
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>

                {/* Buscador */}
                <div style={{ position: 'relative' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9EADB4" strokeWidth="2.5" strokeLinecap="round"
                    style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                  </svg>
                  <input type="text" placeholder="Buscar noticia..."
                    value={busqueda} onChange={e => setBusqueda(e.target.value)}
                    style={{ height: 38, paddingLeft: 32, paddingRight: 14, borderRadius: 999, border: '1.5px solid #D9DEE2', backgroundColor: '#fff', fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#12303E', outline: 'none', width: 200 }}
                  />
                </div>

                {/* Ordenar */}
                <div style={{ position: 'relative' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9EADB4" strokeWidth="2.5" strokeLinecap="round"
                    style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                    <path d="M3 6h18M7 12h10M11 18h2"/>
                  </svg>
                  <select value={orden} onChange={e => setOrden(e.target.value)}
                    style={{ height: 38, paddingLeft: 32, paddingRight: 14, borderRadius: 999, border: '1.5px solid #D9DEE2', backgroundColor: '#fff', fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#12303E', outline: 'none', cursor: 'pointer', appearance: 'none', width: 160 }}
                  >
                    {ORDEN_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>

                {/* Reset */}
                <button onClick={resetFiltros} title="Limpiar filtros"
                  style={{ width: 38, height: 38, borderRadius: 999, border: '1.5px solid #D9DEE2', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#097589', transition: 'all 0.2s', flexShrink: 0 }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#097589'; (e.currentTarget as HTMLElement).style.color = '#fff' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#fff'; (e.currentTarget as HTMLElement).style.color = '#097589' }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M1 4v6h6M23 20v-6h-6"/>
                    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15"/>
                  </svg>
                </button>
              </div>
            </div>
          </FadeIn>

          <AnimatePresence mode="wait">
            {noticiasFiltradas.length > 0 ? (
              <motion.div key="contenido" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

                {/* ── Noticia destacada ── */}
                {destacada && (
                  <FadeIn>
                    <div style={{ display: 'grid', gridTemplateColumns: '480px 1fr', height: 380, borderRadius: 20, overflow: 'hidden', boxShadow: '0 4px 24px rgba(9,52,78,0.12)', marginBottom: 32 }} className="noticia-destacada">

                      {/* Imagen fija */}
                      <div style={{ position: 'relative', overflow: 'hidden', background: destacada.imgBg, flexShrink: 0 }}>
                      <img src={destacada.img} alt={destacada.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    </div>

                      {/* Contenido */}
                      <div style={{ backgroundColor: '#ffffff', padding: '40px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden' }}>
                        <div>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, backgroundColor: BADGE_COLOR[destacada.categoria] || '#097589', color: '#fff', fontFamily: 'Poppins, sans-serif', fontSize: 10, fontWeight: 700, padding: '4px 12px', borderRadius: 50, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>
                            <BadgeIcon tipo={destacada.categoria} />
                            {destacada.categoria}
                          </span>
                          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(17px, 1.8vw, 24px)', fontWeight: 700, color: '#09344e', lineHeight: 1.3, marginBottom: 14 }}>
                            {destacada.titulo}
                          </h2>
                          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#5A6E77', lineHeight: 1.75, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical' as const }}>
                            {destacada.extracto}
                          </p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 20, borderTop: '1px solid #EFF4F7' }}>
                          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#9EADB4' }}>{destacada.fecha}</span>
                          <RedirectBtn url={destacada.url_redirect} tipo={destacada.tipo_redirect} />
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                )}

                {/* ── Grid resto ── */}
                {resto.length > 0 && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="news-grid">
                    {resto.map((n, i) => (
                      <motion.article key={n.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06, duration: 0.3 }}
                        style={{ borderRadius: 14, overflow: 'hidden', backgroundColor: '#fff', boxShadow: '2px 2px 12px rgba(9,52,78,0.07)', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s, box-shadow 0.2s' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLElement).style.boxShadow = '4px 8px 24px rgba(9,52,78,0.14)' }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = '2px 2px 12px rgba(9,52,78,0.07)' }}
                      >
                        {/* Imagen */}
                        <div style={{ height: 180, background: n.imgBg, flexShrink: 0, overflow: 'hidden', position: 'relative' }}>
                      <img src={n.img} alt={n.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      <span style={{ position: 'absolute', top: 12, left: 12, display: 'inline-flex', alignItems: 'center', gap: 4, backgroundColor: BADGE_COLOR[n.categoria] || '#097589', color: '#fff', fontFamily: 'Poppins, sans-serif', fontSize: 9, fontWeight: 700, padding: '3px 9px', borderRadius: 50, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                            <BadgeIcon tipo={n.categoria} />
                            {n.categoria}
                          </span>
                        </div>

                        {/* Contenido */}
                        <div style={{ padding: '18px 18px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                          <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 700, color: '#09344e', lineHeight: 1.35, marginBottom: 8, flex: 1 }}>
                            {n.titulo}
                          </h3>
                          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#5A6E77', lineHeight: 1.6, marginBottom: 14, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' as const }}>
                            {n.extracto}
                          </p>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, borderTop: '1px solid #EFF4F7' }}>
                            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#9EADB4' }}>{n.fecha}</span>
                            <RedirectBtn url={n.url_redirect} tipo={n.tipo_redirect} small />
                          </div>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div key="empty" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                style={{ textAlign: 'center', padding: '64px 24px 80px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}
              >
                <div style={{ width: 80, height: 80, borderRadius: '50%', backgroundColor: '#E6F3EE', border: '2px solid #AEE5DA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#097589" strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 18, fontWeight: 700, color: '#09344e' }}>Sin resultados</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#5A6E77', lineHeight: 1.6, maxWidth: 360 }}>
                  No hay noticias con ese filtro. Prueba con otra categoría o borra los filtros.
                </p>
                <button onClick={resetFiltros}
                  style={{ marginTop: 8, padding: '11px 28px', borderRadius: 50, border: '1.5px solid #097589', color: '#097589', backgroundColor: 'transparent', fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#097589'; (e.currentTarget as HTMLElement).style.color = '#fff' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#097589' }}
                >
                  BORRAR FILTROS
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <SectionDonacion bg="#09344e" theme="dark" waveColor="#ffffff" showWave showTopWave topWaveFrom="#F0F4F7" />
      <SectionRedes bg="#F7F6F3" theme="light" />

      <style suppressHydrationWarning>{`
        @media (max-width: 1024px) {
          .noticia-destacada { grid-template-columns: 1fr !important; height: auto !important; }
        }
        @media (max-width: 900px) {
          .news-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .news-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}