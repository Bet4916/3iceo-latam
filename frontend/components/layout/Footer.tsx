'use client'

import { useState } from 'react'
import Link from 'next/link'

// ─── WAVES ────────────────────────────────────────────────────────────────────
// La clave para el gap: el path inferior (#09354E) debe cubrir hasta y=109
// y el div contenedor no tiene margen ni padding entre waves y el body del footer.
function FooterWaves() {
  return (
    <div style={{ lineHeight: 0, display: 'block', marginBottom: -4, overflow: 'hidden' }}>
      <svg
        width="100%"
        height="100"
        viewBox="0 0 1440 109"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
      >
        {/* Ola trasera — azul claro */}
        <path
          d="M1440 61.7474V7.44475C1440 7.44475 1362.5 -1.7517 1311 38.0995C1259.5 77.9507 1202 46.5919 1162.5 21.4586C1123 -3.6747 1093.5 45.8108 1016 46.6867C938.5 47.5625 930 46.6867 869 11.8237C808 -23.0392 810 72.7911 735 42.3074C660 11.8237 593 60.8715 558 31.9685C523 3.0655 472.263 37.5519 429.5 35.0341C391.665 32.8064 386 6.56911 338 6.5689C290 6.56869 253.117 21.4581 212 21.4581C170.883 21.4581 161.183 7.24925 123.5 14.0136C96.8775 18.7925 87.6238 33.884 58.5 32.4067C32.5033 31.088 0 0 0 0V61.7474H1440Z"
          fill="#ADC6D9"
        />
        {/* Ola media — azul medio */}
        <path
          d="M1440 77.0755V7.00745C1440 7.00745 1374 39.4131 1316 37.6614C1258 35.9097 1242.5 3.50233 1201.5 33.2821C1160.5 63.0619 1114.5 62.6231 1114.5 62.6231C1114.5 62.6231 1029.5 58.6818 982 28.4649C934.5 -1.75191 838.5 49.9224 778.5 52.5508C718.5 55.1792 713.5 37.2243 692.5 39.851C671.5 42.4777 671.5 55.1792 651.5 52.5508C631.5 49.9224 632.5 27.1511 607 27.1511C581.5 27.1511 573.5 49.9224 542.5 63.4989C511.5 77.0755 457 24.5236 419 24.5236C381 24.5236 349 59.1197 325 63.4989C301 67.8782 280.5 18.5419 225.5 19.7064C170.5 20.8708 111.839 46.4275 98.5 47.7336C18 55.6161 0 7.00745 0 7.00745V77.0755H1440Z"
          fill="#4886B5"
        />
        {/* Ola delantera — exactamente el color del footer, sin gap */}
        <path
          d="M1440 109V67.2624C1440 67.2624 1298.5 39.242 1261.5 67.2624C1224.5 95.2829 1134.7 53.4115 1051.5 54.1315C973.136 54.8097 848 70.1321 848 70.1321C822 70.1321 815 51.8707 779 52.3937C743 52.9166 733.5 70.1321 696 72.5243C658.5 74.9165 643.5 51.3502 628 52.3937C612.5 53.4371 586 65.0655 570 59.9585C554 54.8514 485.654 37.829 423.5 59.9585C389.5 62.8281 369.5 18.6595 328.5 48.8763C287.5 79.0932 283 70.3347 227.5 52.3797C172 34.4248 149 75.1518 103 45.0894C57 15.0269 0 67.2624 0 67.2624V109H1440Z"
          fill="#09354E"
        />
      </svg>
    </div>
  )
}

// ─── INPUTS DARK ─────────────────────────────────────────────────────────────
const inputDarkStyle: React.CSSProperties = {
  width: '100%',
  display: 'block',
  boxSizing: 'border-box',
  backgroundColor: 'rgba(255,255,255,0.08)',
  border: '1.5px solid rgba(255,255,255,0.2)',
  borderRadius: 8,
  padding: '14px 16px',
  color: 'white',
  fontFamily: 'Poppins, sans-serif',
  fontSize: 15,
  outline: 'none',
  transition: 'border-color 0.2s',
}

// ─── FOOTER COMPONENT ─────────────────────────────────────────────────────────
export default function Footer() {
  const [email,   setEmail]   = useState('')
  const [mensaje, setMensaje] = useState('')
  const [sent,    setSent]    = useState(false)
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
      <FooterWaves />

      {/* ── Cuerpo del footer — sin separación con las waves ── */}
      <div style={{ backgroundColor: '#09354E', marginTop: 0 }}>

        {/* ── Contenido principal ── */}
        <div
          className="container-brand footer-grid"
          style={{
            padding: '56px 48px 0',
            display: 'grid',
            gridTemplateColumns: '200px 1fr 260px',
            gap: 64,
            alignItems: 'start',
          }}
        >

          {/* Col 1 — Logo */}
          <div>
            <img
              src="/icons/logo-awaq-white.svg"
              alt="AWAQ"
              style={{ width: 156, height: 'auto', display: 'block' }}
              onError={e => {
                // Fallback si no está el SVG
                const el = e.currentTarget as HTMLImageElement
                el.style.display = 'none'
                const fallback = document.createElement('span')
                fallback.style.cssText = 'font-family:Poppins,sans-serif;font-weight:700;font-size:28px;color:white'
                fallback.textContent = 'AWAQ'
                el.parentElement?.appendChild(fallback)
              }}
            />
          </div>

          {/* Col 2 — ¡Escríbenos! */}
          <div>
            <p style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 24,           // ← más A3D7FF
              fontWeight: 600,
              color: '#A3D7FF',
              marginBottom: 10,
            }}>
              ¡Escríbenos!
            </p>
            <p style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 16,           // ← más A3D7FF
              fontWeight: 400,
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.6,
              marginBottom: 28,
            }}>
              Pregúntanos tus dudas o haznos llegar tu feedback.
            </p>

            {sent ? (
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 16, color: '#A3D7FF' }}>
                ✓ Mensaje enviado. ¡Gracias!
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div>
                  <label style={lblStyle}>Tu e-mail *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="correo@electrónico.com"
                    style={inputDarkStyle}
                  />
                  <span style={hintStyle}>Requerido</span>
                </div>
                <div>
                  <label style={lblStyle}>Mensaje *</label>
                  <textarea
                    value={mensaje}
                    onChange={e => setMensaje(e.target.value)}
                    placeholder="Click para empezar a escribir"
                    rows={5}
                    style={{ ...inputDarkStyle, resize: 'vertical' }}
                  />
                  <span style={hintStyle}>Requerido</span>
                </div>
                <button
                  onClick={handleSend}
                  disabled={sending}
                  style={{
                    width: '100%',
                    padding: '15px 0',        // ← más alto
                    borderRadius: 50,
                    border: '1.5px solid rgba(255,255,255,0.4)',
                    backgroundColor: 'transparent',
                    color: 'white',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: 15,             // ← más A3D7FF
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    cursor: sending ? 'not-allowed' : 'pointer',
                    opacity: sending ? 0.7 : 1,
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    if (!sending) (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.1)'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'
                  }}
                >
                  {sending ? 'ENVIANDO...' : 'ENVIAR'}
                </button>
              </div>
            )}
          </div>

          {/* Col 3 — Contacto / Streaming / Redes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
            <div>
              <p style={colTitleStyle}>Contacto</p>
              <a href="mailto:info@somosawaq.org" style={colLinkStyle}
                onMouseEnter={e => (e.currentTarget.style.color = 'white')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
              >
                info@somosawaq.org
              </a>
            </div>

            <div>
              <p style={colTitleStyle}>Streaming</p>
              <a
                href="https://youtube.com/@awaqong"
                target="_blank" rel="noopener noreferrer"
                style={{ ...colLinkStyle, display: 'flex', alignItems: 'center', gap: 8 }}
                onMouseEnter={e => (e.currentTarget.style.color = 'white')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
              >
                <img
                  src="/icons/icon-streaming.svg" alt=""
                  width={14} height={14}
                  style={{ flexShrink: 0 }}
                  onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                />
                Youtube →
              </a>
            </div>

            <div>
              <p style={colTitleStyle}>Redes Sociales</p>
              <div style={{ display: 'flex', gap: 20, alignItems: 'center', marginTop: 10 }}>
                {[
                  { src: '/icons/icon_instagram.svg', href: 'https://instagram.com/awaqong',         label: 'Instagram' },
                  { src: '/icons/icon_facebook.svg',  href: 'https://facebook.com/awaqong',          label: 'Facebook'  },
                  { src: '/icons/icon_linkedin.svg',  href: 'https://linkedin.com/company/awaq-ong', label: 'LinkedIn'  },
                ].map(({ src, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    aria-label={label}
                    style={{ opacity: 0.65, transition: 'opacity .2s', lineHeight: 0, display: 'block' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = '1')}
                    onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = '0.65')}
                  >
                    <img
                      src={src} alt={label}
                      width={28} height={28}   // ← más A3D7FFs
                      style={{ filter: 'brightness(0) invert(1)', display: 'block' }}
                      onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', marginTop: 56 }}>
          <div className="container-brand" style={{ padding: '20px 48px 36px' }}>
            <div style={{
              display: 'flex', flexWrap: 'wrap',
              justifyContent: 'space-between', alignItems: 'center', gap: 16,
            }}>
              <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.35)' }}>
                © {new Date().getFullYear()} Awaq ONG
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center' }}>
                {['Políticas de privacidad', 'Políticas de Cookies', 'Aviso Legal', 'Acuerdo de convivencia'].map(t => (
                  <Link key={t} href="#"
                    style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.35)', textDecoration: 'none', transition: 'color .2s' }}
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
      </div>

      <style suppressHydrationWarning>{`
        @media (max-width: 767px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 40px !important; padding: 40px 24px 0 !important; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .footer-grid { grid-template-columns: 160px 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </footer>
  )
}

// ─── Tokens locales ───────────────────────────────────────────────────────────
const lblStyle: React.CSSProperties = {
  fontFamily: 'Poppins, sans-serif',
  fontSize: 14,                       // ← más A3D7FF
  fontWeight: 500,
  color: 'rgba(255,255,255,0.7)',
  display: 'block',
  marginBottom: 8,
}
const hintStyle: React.CSSProperties = {
  fontFamily: 'Poppins, sans-serif',
  fontSize: 12,
  color: 'rgba(255,255,255,0.35)',
  marginTop: 4,
  display: 'block',
}
const colTitleStyle: React.CSSProperties = {
  fontFamily: 'Poppins, sans-serif',
  fontSize: 20,                       // ← más A3D7FF
  fontWeight: 600,
  color: '#A3D7FF',
  marginBottom: 10,
}
const colLinkStyle: React.CSSProperties = {
  fontFamily: 'Poppins, sans-serif',
  fontSize: 15,                       // ← más A3D7FF
  fontWeight: 400,
  color: 'rgba(255,255,255,0.6)',
  textDecoration: 'none',
  transition: 'color .2s',
}
