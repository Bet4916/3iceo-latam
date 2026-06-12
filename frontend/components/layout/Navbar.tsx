'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Agenda',       href: '/marketing/agenda' },
  { label: 'Temáticas',    href: '/marketing/lineas-tematicas' },
  { label: 'Aliados',      href: '/marketing/aliados' },
  { label: 'Segundo ICEO', href: '/marketing/segundo-iceo' },
  { label: 'Marketplace',  href: '/marketing/marketplace' },
  { label: 'Sede',         href: '/marketing/universidad' },
  { label: 'Prensa',       href: '/marketing/comunicaciones' },
  { label: 'Colabora',     href: '/marketing/colabora' },
]

const IconChevron = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)
const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 8h8M9 5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen]     = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const fn = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => setMenuOpen(false), [pathname])

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <>
      {/* ── CSS puro para el hover del logo — sin estado React ── */}
      <style>{`
        .navbar-logo {
          transition: transform 0.22s ease, box-shadow 0.22s ease;
        }
        .navbar-logo:hover,
        .navbar-logo:focus-visible {
          transform: translateY(4px) scale(1.22);
          box-shadow: 0 6px 20px rgba(9,52,78,0.22) !important;
        }
      `}</style>

      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          overflow: 'visible',
          backgroundColor: 'transparent',
        }}
      >
        <div
          style={{
            backgroundColor: '#ffffff',
            boxShadow: isScrolled ? '0 2px 20px rgba(9,52,78,0.10)' : '0 1px 0 rgba(9,52,78,0.06)',
            transition: 'box-shadow 0.3s',
            borderBottomLeftRadius: 24,
          }}
        >
          <div
            style={{
              padding: '0 28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: 68,
              overflow: 'visible',
            }}
          >
            {/* ── BLOQUE ÚNICO: logo + nav todo junto ── */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>

              {/* LOGO — hover 100% CSS, sin estado */}
              <Link href="/" style={{ outline: 'none', flexShrink: 0 }}>
                <div
                  className="navbar-logo"
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 2px 12px rgba(9,52,78,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  <Image
                    src="/icons/logo-awaq.svg"
                    alt="AWAQ Logo"
                    width={42}
                    height={42}
                    style={{ objectFit: 'contain', display: 'block' }}
                    priority
                  />
                </div>
              </Link>

              {/* NAV — pegado al logo, todo junto */}
              <nav
                className="hidden xl:flex items-center"
                style={{ gap: 44 }}
              >
                {NAV_LINKS.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: 19,
                      fontWeight: isActive(link.href) ? 600 : 400,
                      color: isActive(link.href) ? '#09344e' : '#12303E',
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                      borderBottom: isActive(link.href) ? '2px solid #097589' : '2px solid transparent',
                      paddingBottom: 2,
                      transition: 'color 0.2s, border-color 0.2s',
                    }}
                    onMouseEnter={e => {
                      if (!isActive(link.href))
                        (e.currentTarget as HTMLAnchorElement).style.color = '#097589'
                    }}
                    onMouseLeave={e => {
                      if (!isActive(link.href))
                        (e.currentTarget as HTMLAnchorElement).style.color = '#12303E'
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* ── CTAs ── */}
            <div
              className="hidden xl:flex items-center"
              style={{ gap: 12, flexShrink: 0 }}
            >
              <button
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 500,
                  color: '#097589', background: 'transparent',
                  border: '1.5px solid #C3DED9', borderRadius: 50,
                  padding: '8px 16px', cursor: 'pointer',
                }}
              >
                ES <IconChevron />
              </button>

              <Link
                href="/marketing/donaciones"
                style={{
                  fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 700,
                  color: '#B53077', backgroundColor: 'transparent',
                  border: '2px solid #B53077', borderRadius: 50,
                  padding: '8px 24px', textDecoration: 'none', letterSpacing: '0.04em',
                  transition: 'background-color 0.2s, color 0.2s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.backgroundColor = '#B53077'
                  el.style.color = '#ffffff'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.backgroundColor = 'transparent'
                  el.style.color = '#B53077'
                }}
              >
                DONAR
              </Link>

              <Link
                href="/marketing/registro"
                style={{
                  fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 700,
                  color: '#ffffff', backgroundColor: '#B53077',
                  borderRadius: 50, padding: '10px 24px',
                  textDecoration: 'none', letterSpacing: '0.04em',
                  transition: 'background-color 0.2s, box-shadow 0.2s',
                  boxShadow: '0 2px 12px rgba(181,48,119,0.25)',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#802254'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#B53077'
                }}
              >
                QUIERO ASISTIR
              </Link>
            </div>

            {/* ── MOBILE ── */}
            <div className="xl:hidden flex items-center" style={{ gap: 12 }}>
              <Link
                href="/marketing/registro"
                style={{
                  fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 700,
                  color: '#ffffff', backgroundColor: '#B53077',
                  borderRadius: 50, padding: '8px 16px',
                  textDecoration: 'none', whiteSpace: 'nowrap',
                }}
              >
                QUIERO ASISTIR
              </Link>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600,
                  color: '#09344e', background: 'none', border: 'none', cursor: 'pointer',
                }}
              >
                MENÚ
                <img
                  src={menuOpen ? '/icons/icon-close.svg' : '/icons/icon-menu.svg'}
                  alt=""
                  width={20}
                  height={20}
                  onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ── MOBILE SLIDE-IN PANEL ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.26 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 40,
              display: 'flex', justifyContent: 'flex-end',
            }}
          >
            <div
              style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(9,52,78,0.45)' }}
              onClick={() => setMenuOpen(false)}
            />
            <div
              style={{
                position: 'relative', width: 300, maxWidth: '100%', height: '100%',
                backgroundColor: '#ffffff', overflowY: 'auto',
                paddingTop: 80, paddingBottom: 32, paddingLeft: 24, paddingRight: 24,
                display: 'flex', flexDirection: 'column',
              }}
            >
              <button
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  width: '100%', fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 500,
                  color: '#097589', background: 'transparent', border: '1.5px solid #C3DED9',
                  borderRadius: 50, padding: '10px 20px', cursor: 'pointer', marginBottom: 24,
                }}
              >
                ESPAÑOL <IconChevron />
              </button>

              <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 32 }}>
                {NAV_LINKS.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      fontFamily: 'Poppins, sans-serif', fontSize: 16,
                      fontWeight: isActive(link.href) ? 600 : 400,
                      color: isActive(link.href) ? '#097589' : '#09344e',
                      textDecoration: 'none', padding: '12px 0',
                      borderBottom: '1px solid #EFF4F7',
                    }}
                  >
                    {link.label} <IconArrow />
                  </Link>
                ))}
              </nav>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Link
                  href="/marketing/donaciones"
                  style={{
                    textAlign: 'center', fontFamily: 'Poppins, sans-serif',
                    fontSize: 14, fontWeight: 700, color: '#B53077',
                    border: '2px solid #B53077', borderRadius: 50,
                    padding: '12px 24px', textDecoration: 'none',
                  }}
                >
                  DONAR
                </Link>
                <Link
                  href="/marketing/registro"
                  style={{
                    textAlign: 'center', fontFamily: 'Poppins, sans-serif',
                    fontSize: 14, fontWeight: 700, color: '#ffffff',
                    backgroundColor: '#B53077', borderRadius: 50,
                    padding: '12px 24px', textDecoration: 'none',
                  }}
                >
                  QUIERO ASISTIR
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}