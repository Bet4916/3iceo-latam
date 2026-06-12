'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { AwaqLogo, IconChevronDown, IconMenu, IconClose } from '@/components/ui/icons'

const NAV_LINKS = [
  { label: 'Agenda',             href: '/marketing/agenda' },
  { label: 'Líneas temáticas',   href: '/marketing/lineas-tematicas' },
  { label: 'Aliados',            href: '/marketing/patrocinadores' },
  { label: '⭐ Manifiesto IICEO', href: '/marketing/iceo-anterior' },
  { label: 'Marketplace',        href: '/marketing/marketplace' },
  { label: 'Sede del evento',    href: '/marketing/universidad' },
  { label: 'Prensa',             href: '/marketing/comunicaciones' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        backgroundColor: '#fff',
        boxShadow: scrolled ? '0 2px 16px rgba(18,48,62,0.12)' : '0 1px 0 rgba(18,48,62,0.07)',
        transition: 'box-shadow 0.3s ease',
      }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto',
          padding: '0 32px', height: 72,
          display: 'flex', alignItems: 'center', gap: 24,
        }}>

          {/* ── Logo ── */}
          <Link href="/marketing/home" style={{ textDecoration: 'none', flexShrink: 0 }}>
            <AwaqLogo size={44} variant="color" />
          </Link>

          {/* ── Desktop nav ── */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 18, flex: 1, justifyContent: 'center' }}
            className="nav-desktop">
            {NAV_LINKS.map(link => {
              const active = pathname === link.href
              return (
                <Link key={link.href} href={link.href} style={{
                  fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 400,
                  color: active ? '#12303E' : '#5A6E77',
                  textDecoration: 'none', whiteSpace: 'nowrap',
                  borderBottom: active ? '2px solid #097589' : '2px solid transparent',
                  paddingBottom: 2,
                  transition: 'color .2s, border-color .2s',
                }}
                  onMouseEnter={e => { if (!active) (e.currentTarget as HTMLAnchorElement).style.color = '#12303E' }}
                  onMouseLeave={e => { if (!active) (e.currentTarget as HTMLAnchorElement).style.color = '#5A6E77' }}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* ── Desktop right: ES + CTA ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}
            className="nav-desktop">
            <button style={{
              display: 'flex', alignItems: 'center', gap: 5,
              fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 400,
              color: '#5A6E77', background: '#fff',
              border: '1px solid #D9DEE2', borderRadius: 999,
              padding: '7px 12px', cursor: 'pointer',
            }}>
              ES <IconChevronDown size={12} color="#5A6E77" />
            </button>
            <Link href="/marketing/registro" style={{
              fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 700,
              color: '#fff', backgroundColor: '#B53077',
              borderRadius: 999, padding: '10px 22px',
              textDecoration: 'none', whiteSpace: 'nowrap',
              transition: 'background-color .2s',
              letterSpacing: '0.03em',
            }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#802254')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#B53077')}
            >
              QUIERO ASISTIR
            </Link>
          </div>

          {/* ── Mobile: CTA + MENÚ ── */}
          <div style={{ display: 'none', alignItems: 'center', gap: 10, marginLeft: 'auto' }}
            className="nav-mobile">
            <Link href="/marketing/registro" style={{
              fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 700,
              color: '#fff', backgroundColor: '#B53077',
              borderRadius: 999, padding: '9px 18px', textDecoration: 'none',
            }}>
              QUIERO ASISTIR
            </Link>
            <button onClick={() => setOpen(!open)} style={{
              display: 'flex', alignItems: 'center', gap: 6,
              fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 500,
              color: '#12303E', background: 'none',
              border: '1px solid #D9DEE2', borderRadius: 8,
              padding: '8px 12px', cursor: 'pointer',
            }}>
              {open
                ? <IconClose size={18} color="#12303E" />
                : <IconMenu size={18} color="#12303E" />
              }
              <span>{open ? 'CERRAR' : 'MENÚ'}</span>
            </button>
          </div>
        </div>

        {/* ── Mobile menu ── */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22 }}
              style={{ backgroundColor: '#fff', borderTop: '1px solid #D9DEE2', overflow: 'hidden' }}
            >
              <div style={{ padding: '16px 24px 24px' }}>
                {/* Selector idioma */}
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '12px 16px', marginBottom: 16,
                  border: '1px solid #097589', borderRadius: 999,
                  fontFamily: 'Poppins, sans-serif', fontSize: 14, color: '#097589',
                  cursor: 'pointer',
                }}>
                  ESPAÑOL <IconChevronDown size={14} color="#097589" />
                </div>

                {/* Links */}
                {NAV_LINKS.map(link => (
                  <Link key={link.href} href={link.href} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '14px 0', borderBottom: '1px solid #F7F6F3',
                    fontFamily: 'Poppins, sans-serif', fontSize: 15,
                    color: '#12303E', textDecoration: 'none',
                  }}>
                    {link.label}
                    <IconChevronRight size={16} color="#5A6E77" />
                  </Link>
                ))}

                {/* CTAs */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 20 }}>
                  <Link href="/marketing/donaciones" style={{
                    display: 'block', textAlign: 'center', padding: '13px',
                    borderRadius: 999, border: '2px solid #B53077', color: '#B53077',
                    fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 700,
                    textDecoration: 'none', letterSpacing: '0.04em',
                  }}>
                    DONAR
                  </Link>
                  <Link href="/marketing/registro" style={{
                    display: 'block', textAlign: 'center', padding: '13px',
                    borderRadius: 999, backgroundColor: '#B53077', color: '#fff',
                    fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 700,
                    textDecoration: 'none', letterSpacing: '0.04em',
                  }}>
                    QUIERO ASISTIR
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <style>{`
        .nav-desktop { display: flex !important; }
        .nav-mobile  { display: none !important; }
        @media (max-width: 1024px) {
          .nav-desktop { display: none !important; }
          .nav-mobile  { display: flex !important; }
        }
      `}</style>
    </>
  )
}

// Needed for mobile chevron right
function IconChevronRight({ size = 16, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l6-6-6-6"/>
    </svg>
  )
}
interface IconProps { size?: number; color?: string }
