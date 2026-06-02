'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import HeroIceo from '@/components/sections/HeroIceo'
import SectionDonacion from '@/components/sections/SectionDonacion'
import SectionRedes from '@/components/sections/SectionRedes'

// ─── TIPOS ────────────────────────────────────────────────────────────────────
interface Noticia {
  id: number
  categoria: string
  titulo: string
  extracto: string
  fecha: string
  img: string
  imgBg: string
}

// ─── DATOS MOCK ───────────────────────────────────────────────────────────────
const NOTICIAS: Noticia[] = [
  {
    id: 1,
    categoria: 'video',
    titulo: 'Comienza el camino hacia el 3º ICEO- Latam.',
    extracto: 'Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de bocetos po...',
    fecha: '28/09/25',
    img: '🎥',
    imgBg: 'linear-gradient(135deg, #09344e 0%, #437287 100%)',
  },
  {
    id: 2,
    categoria: 'streaming',
    titulo: 'Comienza el camino hacia el 3º ICEO- Latam.',
    extracto: 'Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de bocetos po...',
    fecha: '28/09/25',
    img: '📡',
    imgBg: 'linear-gradient(135deg, #1C495C 0%, #74B4A7 100%)',
  },
  {
    id: 3,
    categoria: 'notas sociales',
    titulo: 'Comienza el camino hacia el 3º ICEO- Latam.',
    extracto: 'Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de bocetos po...',
    fecha: '28/09/25',
    img: '📰',
    imgBg: 'linear-gradient(135deg, #097589 0%, #AEE5DA 100%)',
  },
  {
    id: 4,
    categoria: 'streaming',
    titulo: 'Comienza el camino hacia el 3º ICEO- Latam.',
    extracto: 'Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de bocetos po...',
    fecha: '28/09/25',
    img: '🎬',
    imgBg: 'linear-gradient(135deg, #437287 0%, #09344e 100%)',
  },
  {
    id: 5,
    categoria: 'video',
    titulo: 'Comienza el camino hacia el 3º ICEO- Latam.',
    extracto: 'Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de bocetos po...',
    fecha: '28/09/25',
    img: '🌿',
    imgBg: 'linear-gradient(135deg, #03A383 0%, #004A3B 100%)',
  },
  {
    id: 6,
    categoria: 'notas sociales',
    titulo: 'Comienza el camino hacia el 3º ICEO- Latam.',
    extracto: 'Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de bocetos po...',
    fecha: '28/09/25',
    img: '🏛️',
    imgBg: 'linear-gradient(135deg, #4886B5 0%, #12303E 100%)',
  },
]

const CATEGORIAS = ['Cantidad', 'video', 'streaming', 'notas sociales']
const TEMAS      = ['Mas',      'video', 'streaming', 'notas sociales']

const BADGE_COLOR: Record<string, string> = {
  'video':          '#097589',
  'streaming':      '#B53077',
  'notas sociales': '#437287',
}

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────
export default function ComunicacionesPage() {
  const [filtroCategoria, setFiltroCategoria] = useState('Cantidad')
  const [filtroTema,      setFiltroTema]      = useState('Mas')

  const noticiasFiltradas = useMemo(() => {
    return NOTICIAS.filter(n => {
      const pasaCat  = filtroCategoria === 'Cantidad' || n.categoria === filtroCategoria
      const pasaTema = filtroTema      === 'Mas'      || n.categoria === filtroTema
      return pasaCat && pasaTema
    })
  }, [filtroCategoria, filtroTema])

  const resetFiltros = () => {
    setFiltroCategoria('Cantidad')
    setFiltroTema('Mas')
  }

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>

      {/* ════════════════════════════════════════════════════════════════
          HERO — componente unificado igual que Colabora / otras páginas
      ════════════════════════════════════════════════════════════════ */}
      <HeroIceo
        badge="Centro de Comunicaciones ICEO"
        title={<>Noticias · <span style={{ color: '#ffffff' }}>3° ICEO</span></>}
        description="Descubre lo que dicen de nosotros en nuestro Centro de ICEO de Comunicaciones y Repositorio Multimedia."
        cta={{ label: 'Ver noticias', href: '#noticias' }}
        ctaSecondary={{ label: 'Síguenos', href: '#redes' }}
        // Imagen de redacción periodística real (Unsplash / libre de derechos)
        image="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=640&q=80"
        imageAlt="Redacción periodística"
        imageLabel="Comunicaciones ICEO"
        waveVariant="default"
        waveColor="#ffffff"
      />

      {/* ════════════════════════════════════════════════════════════════
          SECCIÓN NOTICIAS — filtros + grid
      ════════════════════════════════════════════════════════════════ */}
      <section id="noticias" style={{ padding: '56px 0 72px', backgroundColor: '#fff' }}>
        <div className="container-brand" style={{ padding: '0 48px' }}>

          <h2 style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: 'clamp(18px, 2.5vw, 24px)',
            fontWeight: 700, color: '#09344e',
            textAlign: 'center', marginBottom: 32,
          }}>
            Enterate de las últimas noticias
          </h2>

          {/* Filtros */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            marginBottom: 32, flexWrap: 'wrap',
          }}>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#5A6E77', whiteSpace: 'nowrap' }}>
              Filtrar por:
            </span>

            <select
              value={filtroCategoria}
              onChange={e => setFiltroCategoria(e.target.value)}
              style={{
                height: 36, padding: '0 12px', borderRadius: 6,
                border: '1.5px solid #C3DED9', backgroundColor: '#fff',
                fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#12303E',
                cursor: 'pointer', outline: 'none', minWidth: 120,
              }}
            >
              {CATEGORIAS.map(c => (
                <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
              ))}
            </select>

            <select
              value={filtroTema}
              onChange={e => setFiltroTema(e.target.value)}
              style={{
                height: 36, padding: '0 12px', borderRadius: 6,
                border: '1.5px solid #C3DED9', backgroundColor: '#fff',
                fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#12303E',
                cursor: 'pointer', outline: 'none', minWidth: 100,
              }}
            >
              {TEMAS.map(t => (
                <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
              ))}
            </select>

            <button
              onClick={resetFiltros}
              title="Limpiar filtros"
              style={{
                width: 36, height: 36, borderRadius: 6,
                border: '1.5px solid #C3DED9', backgroundColor: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#097589', transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.backgroundColor = '#097589'
                ;(e.currentTarget as HTMLElement).style.color = '#fff'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.backgroundColor = '#fff'
                ;(e.currentTarget as HTMLElement).style.color = '#097589'
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M1 4v6h6M23 20v-6h-6"/>
                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15"/>
              </svg>
            </button>
          </div>

          {/* Grid / estado vacío */}
          <AnimatePresence mode="wait">
            {noticiasFiltradas.length > 0 ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 24,
                  marginBottom: 56,
                }}
                className="news-grid"
              >
                {noticiasFiltradas.map((n, i) => (
                  <motion.article
                    key={n.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                    style={{
                      borderRadius: 10, overflow: 'hidden',
                      border: '1px solid #EFF4F7',
                      boxShadow: '2px 2px 10px rgba(9,52,78,0.07)',
                      backgroundColor: '#fff',
                      display: 'flex', flexDirection: 'column',
                      transition: 'box-shadow 0.2s, transform 0.2s',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.boxShadow = '4px 4px 20px rgba(9,52,78,0.14)'
                      ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.boxShadow = '2px 2px 10px rgba(9,52,78,0.07)'
                      ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                    }}
                  >
                    <div style={{
                      height: 160, background: n.imgBg,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 48, flexShrink: 0,
                    }}>
                      {n.img}
                    </div>

                    <div style={{ padding: '16px 18px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <span style={{
                        display: 'inline-block',
                        backgroundColor: BADGE_COLOR[n.categoria] || '#097589',
                        color: '#fff',
                        fontFamily: 'Poppins, sans-serif', fontSize: 10, fontWeight: 600,
                        padding: '3px 10px', borderRadius: 50,
                        letterSpacing: '0.06em', textTransform: 'uppercase',
                        marginBottom: 10, alignSelf: 'flex-start',
                      }}>
                        {n.categoria}
                      </span>

                      <h3 style={{
                        fontFamily: 'Poppins, sans-serif', fontSize: 15, fontWeight: 700,
                        color: '#09344e', marginBottom: 8, lineHeight: 1.3,
                      }}>
                        {n.titulo}
                      </h3>

                      <p style={{
                        fontFamily: 'Inter, sans-serif', fontSize: 13,
                        color: '#5A6E77', lineHeight: 1.6, flex: 1, marginBottom: 14,
                      }}>
                        {n.extracto}
                      </p>

                      <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        paddingTop: 12, borderTop: '1px solid #EFF4F7',
                      }}>
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#9EADB4' }}>
                          {n.fecha}
                        </span>
                        <Link href={`/marketing/comunicaciones/${n.id}`} style={{
                          fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 600,
                          color: '#097589', textDecoration: 'none',
                          display: 'flex', alignItems: 'center', gap: 4,
                        }}>
                          ver noticia →
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  textAlign: 'center', padding: '64px 24px 80px',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', gap: 16,
                }}
              >
                <div style={{
                  width: 80, height: 80, borderRadius: '50%',
                  backgroundColor: '#E6F3EE', border: '2px solid #AEE5DA',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 36, marginBottom: 8,
                }}>
                  🌿
                </div>
                <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 18, fontWeight: 700, color: '#09344e' }}>
                  Sin resultados
                </h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#5A6E77', lineHeight: 1.6, maxWidth: 360 }}>
                  Parece que no tenemos ninguna noticia con los filtros seleccionados.
                  Prueba a eliminarlos o introdúcelos de otro modo.
                </p>
                <button
                  onClick={resetFiltros}
                  style={{
                    marginTop: 8, padding: '11px 28px', borderRadius: 50,
                    border: '1.5px solid #097589', color: '#097589',
                    backgroundColor: 'transparent',
                    fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600,
                    cursor: 'pointer', letterSpacing: '0.04em', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = '#097589'
                    ;(e.currentTarget as HTMLElement).style.color = '#fff'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'
                    ;(e.currentTarget as HTMLElement).style.color = '#097589'
                  }}
                >
                  BORRAR FILTROS
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          DONACIÓN + REDES — igual que Colabora
      ════════════════════════════════════════════════════════════════ */}
      <SectionDonacion bg="#09344e" theme="dark" waveColor="#ffffff" showWave />
      <SectionRedes    bg="#F7F6F3" theme="light" />

      <style suppressHydrationWarning>{`
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