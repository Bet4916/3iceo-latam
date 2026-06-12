'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AwaqLogo, IconInstagram, IconFacebook, IconLinkedin, IconYoutube } from '@/components/ui/icons'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const handleSend = async () => {
    if (!email.trim() || !mensaje.trim()) return
    setSending(true)
    await new Promise(r => setTimeout(r, 800))
    setSent(true)
    setSending(false)
    setTimeout(() => { setEmail(''); setMensaje(''); setSent(false) }, 4000)
  }

  return (
    <footer>
      {/* ── Waves (3 capas exactas del Figma) ──────────────────────────── */}
      <div style={{ position: 'relative', height: 96, overflow: 'hidden', lineHeight: 0 }}>
        {/* Capa 1 — azul claro (más atrás) */}
        <svg viewBox="0 0 1440 96" preserveAspectRatio="none"
          style={{ position: 'absolute', bottom: 0, width: '100%', height: '100%' }}>
          <path fill="#BED1DA" opacity="0.9"
            d="M0,55 C200,20 400,85 600,55 C800,25 1000,80 1200,52 C1320,36 1400,68 1440,55 L1440,96 L0,96 Z"/>
        </svg>
        {/* Capa 2 — azul medio */}
        <svg viewBox="0 0 1440 96" preserveAspectRatio="none"
          style={{ position: 'absolute', bottom: 0, width: '100%', height: '100%' }}>
          <path fill="#4886B5"
            d="M0,68 C240,40 480,90 720,62 C900,40 1080,82 1260,60 C1360,48 1420,72 1440,62 L1440,96 L0,96 Z"/>
        </svg>
        {/* Capa 3 — navy (frente) */}
        <svg viewBox="0 0 1440 96" preserveAspectRatio="none"
          style={{ position: 'absolute', bottom: 0, width: '100%', height: '100%' }}>
          <path fill="#12303E"
            d="M0,75 C180,52 360,90 540,70 C720,50 900,88 1080,68 C1230,52 1370,78 1440,68 L1440,96 L0,96 Z"/>
        </svg>
      </div>

      {/* ── Body ───────────────────────────────────────────────────────── */}
      <div style={{ backgroundColor: '#12303E', paddingBottom: 0 }}>
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 48px' }}>

          {/* Divider */}
          <div style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.10)', marginBottom: 40 }} />

          {/* 3 columnas */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '180px 1fr 220px',
            gap: 48,
            alignItems: 'start',
          }} className="footer-cols">

            {/* Col 1: Logo */}
            <div>
              <AwaqLogo size={44} variant="white" />
            </div>

            {/* Col 2: Escríbenos */}
            <div>
              <h4 style={{
                fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 18,
                color: '#fff', marginBottom: 6,
              }}>¡Escríbenos!</h4>
              <p style={{
                fontFamily: 'Poppins, sans-serif', fontSize: 13,
                color: 'rgba(255,255,255,0.60)', marginBottom: 18, lineHeight: 1.5,
              }}>
                Pregúntanos tus dudas o haznos llegar tu feedback.
              </p>

              {sent ? (
                <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14, color: '#76E2CC' }}>
                  ✓ Mensaje enviado. ¡Gracias!
                </p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div>
                    <label style={lblStyle}>Tu e-mail *</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                      placeholder="correo@electrónico.com" style={darkInput} />
                    <span style={hintStyle}>Requerido</span>
                  </div>
                  <div>
                    <label style={lblStyle}>Mensaje*</label>
                    <textarea value={mensaje} onChange={e => setMensaje(e.target.value)}
                      placeholder="Click para empezar a escribir"
                      rows={4}
                      style={{ ...darkInput, height: 'auto', resize: 'vertical' as const, padding: '10px 14px' }} />
                    <span style={hintStyle}>Requerido</span>
                  </div>
                  <button onClick={handleSend} disabled={sending} style={{
                    padding: '11px 0', borderRadius: 999,
                    border: '1.5px solid rgba(255,255,255,0.45)',
                    color: '#fff', backgroundColor: 'transparent',
                    fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600,
                    cursor: sending ? 'not-allowed' : 'pointer',
                    letterSpacing: '0.06em',
                    transition: 'background .2s, border-color .2s',
                    opacity: sending ? 0.7 : 1,
                  }}
                    onMouseEnter={e => { (e.currentTarget).style.backgroundColor = 'rgba(255,255,255,0.08)'; (e.currentTarget).style.borderColor = '#fff' }}
                    onMouseLeave={e => { (e.currentTarget).style.backgroundColor = 'transparent'; (e.currentTarget).style.borderColor = 'rgba(255,255,255,0.45)' }}
                  >
                    {sending ? 'ENVIANDO...' : 'ENVIAR'}
                  </button>
                </div>
              )}
            </div>

            {/* Col 3: Contacto + Streaming + RRSS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
              <div>
                <h5 style={colTitle}>Contacto</h5>
                <a href="mailto:info@somosawaq.org" style={colLink}>info@somosawaq.org</a>
              </div>
              <div>
                <h5 style={colTitle}>Streaming</h5>
                <a href="https://youtube.com/@awaqong" target="_blank" rel="noopener noreferrer"
                  style={{ ...colLink, display: 'flex', alignItems: 'center', gap: 6 }}>
                  {/* Red dot + Youtube */}
                  <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#ff4444', display: 'inline-block', flexShrink: 0 }} />
                  Youtube →
                </a>
              </div>
              <div>
                <h5 style={colTitle}>Redes Sociales</h5>
                <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
                  {[
                    { Icon: IconInstagram, href: 'https://instagram.com/awaqong',        label: 'Instagram' },
                    { Icon: IconFacebook,  href: 'https://facebook.com/awaqong',         label: 'Facebook' },
                    { Icon: IconLinkedin,  href: 'https://linkedin.com/company/awaq-ong',label: 'LinkedIn' },
                  ].map(({ Icon, href, label }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                      aria-label={label}
                      style={{ color: 'rgba(255,255,255,0.70)', transition: 'color .2s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.70)')}
                    >
                      <Icon size={22} color="currentColor" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Bottom bar ── */}
          <div style={{
            marginTop: 40,
            borderTop: '1px solid rgba(255,255,255,0.10)',
            padding: '16px 0',
            display: 'flex', flexWrap: 'wrap',
            justifyContent: 'space-between', alignItems: 'center', gap: 12,
          }}>
            <span style={{
              fontFamily: 'Poppins, sans-serif', fontSize: 12,
              color: 'rgba(255,255,255,0.35)',
            }}>
              © {new Date().getFullYear()} Awaq ONG
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
              {['Políticas de privacidad', 'Políticas de Cookies', 'Aviso Legal', 'Acuerdo de convivencia'].map(t => (
                <Link key={t} href="#" style={{
                  fontFamily: 'Poppins, sans-serif', fontSize: 12,
                  color: 'rgba(255,255,255,0.35)', textDecoration: 'none',
                  transition: 'color .2s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
                >
                  {t}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-cols { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}

// ── Estilos compartidos ───────────────────────────────────────────────────────
const lblStyle: React.CSSProperties = {
  fontFamily: 'Poppins, sans-serif', fontSize: 12,
  color: 'rgba(255,255,255,0.60)', display: 'block', marginBottom: 5,
}
const darkInput: React.CSSProperties = {
  width: '100%', padding: '10px 14px', height: 42,
  backgroundColor: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.18)',
  borderRadius: 6, color: '#fff',
  fontFamily: 'Poppins, sans-serif', fontSize: 13,
  outline: 'none', boxSizing: 'border-box',
  transition: 'border-color .2s',
}
const hintStyle: React.CSSProperties = {
  fontFamily: 'Poppins, sans-serif', fontSize: 11,
  color: '#097589', display: 'block', marginTop: 3,
}
const colTitle: React.CSSProperties = {
  fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 15,
  color: '#fff', marginBottom: 6,
}
const colLink: React.CSSProperties = {
  fontFamily: 'Poppins, sans-serif', fontSize: 14,
  color: 'rgba(255,255,255,0.65)', textDecoration: 'none',
}
