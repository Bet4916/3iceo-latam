'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

// ─── TIPOS ────────────────────────────────────────────────────────────────────
type Categoria = 'video' | 'streaming' | 'notas sociales' | 'video' | string

interface Noticia {
  id: number
  categoria: string
  titulo: string
  extracto: string
  fecha: string
  img: string // emoji placeholder — en prod: ruta /public/images/...
  imgBg: string
}

// ─── DATOS MOCK (en prod vendrían de API/CMS) ─────────────────────────────────
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
const TEMAS = ['Mas', 'video', 'streaming', 'notas sociales']

// Color de badge por categoría — igual que el Figma
const BADGE_COLOR: Record<string, string> = {
  'video':          '#097589',
  'streaming':      '#B53077',
  'notas sociales': '#437287',
}

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────
export default function ComunicacionesPage() {
  const [filtroCategoria, setFiltroCategoria] = useState('Cantidad')
  const [filtroTema, setFiltroTema] = useState('Mas')

  // Filtrado reactivo
  const noticiasFiltradas = useMemo(() => {
    return NOTICIAS.filter(n => {
      const pasaCat =
        filtroCategoria === 'Cantidad' || n.categoria === filtroCategoria
      const pasaTema =
        filtroTema === 'Mas' || n.categoria === filtroTema
      return pasaCat && pasaTema
    })
  }, [filtroCategoria, filtroTema])

  const resetFiltros = () => {
    setFiltroCategoria('Cantidad')
    setFiltroTema('Mas')
  }

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>

      {/* ══════════════════════════════════════════════════════════════════
          HERO — "Noticias" + foto derecha
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ paddingTop: 96, backgroundColor: '#fff' }}>
        <div className="container-brand" style={{ padding: '48px 48px 0' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: 48,
              alignItems: 'flex-start',
            }}
            className="hero-grid"
          >
            {/* Columna izquierda */}
            <div>
              <h1 style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: 'clamp(40px, 5.5vw, 64px)',
                fontWeight: 700, color: '#09344e',
                marginBottom: 16, lineHeight: 1.05,
              }}>
                Noticias
              </h1>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: 15,
                color: '#5A6E77', lineHeight: 1.7, maxWidth: 400,
              }}>
                Descubre lo que dicen de nosotros en nuestro Centro
                de ICEO de Comunicaciones y Repositorio Multimedia
              </p>
            </div>

            {/* Foto decorativa derecha */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div style={{
                position: 'absolute', bottom: -16, right: -16,
                width: 200, height: 150, borderRadius: 12,
                background: 'linear-gradient(135deg, #8CCDFF 0%, #4886B5 100%)',
                opacity: 0.5, zIndex: 0,
              }} />
              <div style={{
                position: 'relative', zIndex: 1,
                width: 260, height: 180, borderRadius: 12,
                overflow: 'hidden',
                background: 'linear-gradient(135deg, #AEE5DA 0%, #097589 60%, #09344e 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 56,
                boxShadow: '4px 4px 24px rgba(9,52,78,0.2)',
              }}>
                📰
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECCIÓN NOTICIAS — título + filtros + grid
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '56px 0 72px', backgroundColor: '#fff' }}>
        <div className="container-brand" style={{ padding: '0 48px' }}>

          {/* Título sección */}
          <h2 style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: 'clamp(18px, 2.5vw, 24px)',
            fontWeight: 700, color: '#09344e',
            textAlign: 'center', marginBottom: 32,
          }}>
            Enterate de las últimas noticias
          </h2>

          {/* ── Filtros (Figma: "Filtrar por: Cantidad | Mas + ícono reset") ── */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            marginBottom: 32, flexWrap: 'wrap',
          }}>
            <span style={{
              fontFamily: 'Inter, sans-serif', fontSize: 13,
              color: '#5A6E77', whiteSpace: 'nowrap',
            }}>
              Filtrar por:
            </span>

            {/* Select categoría */}
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

            {/* Select tema */}
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

            {/* Botón reset */}
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
              {/* Ícono refresh */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M1 4v6h6M23 20v-6h-6"/>
                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15"/>
              </svg>
            </button>
          </div>

          {/* ── Grid de noticias / estado vacío ── */}
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
                    {/* Imagen */}
                    <div style={{
                      height: 160, background: n.imgBg,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 48, flexShrink: 0,
                    }}>
                      {n.img}
                      {/* En prod: <Image src={n.imgSrc} fill style={{objectFit:'cover'}} alt={n.titulo} /> */}
                    </div>

                    {/* Contenido */}
                    <div style={{ padding: '16px 18px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      {/* Badge categoría */}
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

                      {/* Footer de card: fecha + link */}
                      <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        paddingTop: 12, borderTop: '1px solid #EFF4F7',
                      }}>
                        <span style={{
                          fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#9EADB4',
                        }}>
                          {n.fecha}
                        </span>
                        <Link href={`/marketing/comunicaciones/${n.id}`} style={{
                          fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 600,
                          color: '#097589', textDecoration: 'none',
                          display: 'flex', alignItems: 'center', gap: 4,
                          transition: 'color 0.2s',
                        }}>
                          ver noticia →
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            ) : (
              /* Estado vacío — igual al Figma */
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
                {/* Ícono AWAQ con interrogación */}
                <div style={{
                  width: 80, height: 80, borderRadius: '50%',
                  backgroundColor: '#E6F3EE', border: '2px solid #AEE5DA',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 36, marginBottom: 8,
                }}>
                  🌿
                </div>
                <h3 style={{
                  fontFamily: 'Poppins, sans-serif', fontSize: 18, fontWeight: 700,
                  color: '#09344e',
                }}>
                  Sin resultados
                </h3>
                <p style={{
                  fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#5A6E77',
                  lineHeight: 1.6, maxWidth: 360,
                }}>
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
                    cursor: 'pointer', letterSpacing: '0.04em',
                    transition: 'all 0.2s',
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

          {/* ══════════════════════════════════════════════════════════════
              FOLLOW US BANNER (igual que Sprint 2, reutilizado)
          ══════════════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              gap: 40,
              alignItems: 'center',
              backgroundColor: '#E6F3EE',
              borderRadius: 16,
              padding: '40px 48px',
            }}
            className="follow-grid"
          >
            {/* Badge FOLLOW US */}
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute', top: -16, left: -16,
                width: 180, height: 130, borderRadius: 8,
                background: 'linear-gradient(135deg, #AEE5DA 0%, #8CCDFF 100%)',
                transform: 'rotate(-3deg)', opacity: 0.45,
              }} />
              <div style={{
                position: 'relative',
                background: 'linear-gradient(135deg, #4886B5 0%, #097589 100%)',
                borderRadius: 10, padding: '18px 24px',
                textAlign: 'center', transform: 'rotate(-2deg)',
                boxShadow: '4px 4px 20px rgba(9,52,78,0.2)',
              }}>
                <div style={{
                  fontFamily: 'Poppins, sans-serif', fontSize: 24, fontWeight: 900,
                  color: '#fff', letterSpacing: '0.05em', lineHeight: 1, marginBottom: 4,
                }}>
                  FOLLOW US!
                </div>
                <div style={{
                  fontFamily: 'Poppins, sans-serif', fontSize: 10, fontWeight: 600,
                  color: 'rgba(255,255,255,0.85)', letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}>
                  ON SOCIAL MEDIA
                </div>
              </div>
            </div>

            {/* Texto + links RRSS */}
            <div>
              <h3 style={{
                fontFamily: 'Poppins, sans-serif', fontSize: 18, fontWeight: 700,
                color: '#09344e', marginBottom: 10,
              }}>
                ¡Pásate por nuestras Redes Sociales y síguenos!
              </h3>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#5A6E77',
                lineHeight: 1.7, marginBottom: 20, maxWidth: 460,
              }}>
                Publicamos contenido a cerca de la labor que hacemos, podrás conocer nuestros
                proyectos y a nosotros más a fondo.
              </p>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                {[
                  { name: 'Instagram', href: 'https://instagram.com/somosawaq' },
                  { name: 'Facebook',  href: 'https://facebook.com/somosawaq' },
                  { name: 'LinkedIn',  href: 'https://linkedin.com/company/somosawaq' },
                ].map(s => (
                  <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 7,
                      fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 500,
                      color: '#09344e', textDecoration: 'none',
                      padding: '8px 16px', border: '1.5px solid #C3DED9',
                      borderRadius: 50, backgroundColor: '#fff', transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = '#09344e'
                      ;(e.currentTarget as HTMLElement).style.color = '#fff'
                      ;(e.currentTarget as HTMLElement).style.borderColor = '#09344e'
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = '#fff'
                      ;(e.currentTarget as HTMLElement).style.color = '#09344e'
                      ;(e.currentTarget as HTMLElement).style.borderColor = '#C3DED9'
                    }}
                  >
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <style suppressHydrationWarning>{`
        @media (max-width: 900px) {
          .hero-grid  { grid-template-columns: 1fr !important; }
          .hero-grid > div:last-child { display: none; }
          .news-grid  { grid-template-columns: repeat(2, 1fr) !important; }
          .follow-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 560px) {
          .news-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
