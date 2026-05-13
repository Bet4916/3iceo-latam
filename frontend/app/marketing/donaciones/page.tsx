'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

type DonationForm = {
  importe: string
  nombre: string
  email: string
  aceptaPrivacidad: boolean
  aceptaComunicaciones: boolean
}

// Icon helper — SVGs desde /public/icons/
function Icon({ src, size = 20, filter, style }: {
  src: string
  size?: number
  filter?: string
  style?: React.CSSProperties
}) {
  return (
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      style={{ display: 'block', flexShrink: 0, filter, ...style }}
    />
  )
}

const IMPACTOS = [
  {
    label: 'Mayor acceso a recursos tecnológicos',
    icon: '/icons/icon_search.svg',
    bg: 'linear-gradient(135deg, #1C495C 0%, #097589 100%)',
  },
  {
    label: 'Mayor representación en administraciones públicas',
    icon: '/icons/icon_PDF.svg',
    bg: 'linear-gradient(135deg, #09344e 0%, #437287 100%)',
  },
  {
    label: 'Mayor respaldo de empresas privadas',
    icon: '/icons/icon_start_selected.svg',
    bg: 'linear-gradient(135deg, #074954 0%, #74B4A7 100%)',
  },
  {
    label: 'Mayor acceso a financiaciones',
    icon: '/icons/icon_heart_selected.svg',
    bg: 'linear-gradient(135deg, #437287 0%, #AEE5DA 100%)',
  },
]

const TAGS = ['Alojamiento', 'Transporte', 'Dieta']

const SOCIAL = [
  { src: '/icons/icon_instagram.svg', href: 'https://instagram.com/somosawaq',          label: 'Instagram' },
  { src: '/icons/icon_facebook.svg',  href: 'https://facebook.com/somosawaq',           label: 'Facebook'  },
  { src: '/icons/icon_linkedin.svg',  href: 'https://linkedin.com/company/somosawaq',   label: 'LinkedIn'  },
]

const INITIAL: DonationForm = {
  importe: '', nombre: '', email: '',
  aceptaPrivacidad: false, aceptaComunicaciones: false,
}

export default function DonacionesPage() {
  const [form, setForm]           = useState<DonationForm>(INITIAL)
  const [errors, setErrors]       = useState<Record<string, string>>({})
  const [faqOpen, setFaqOpen]     = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const set = (k: keyof DonationForm, v: string | boolean) => {
    setForm(p => ({ ...p, [k]: v }))
    setErrors(p => { const e = { ...p }; delete e[k]; return e })
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.importe || isNaN(Number(form.importe)) || Number(form.importe) <= 0)
      e.importe = 'Introduce un importe válido'
    if (!form.aceptaPrivacidad)
      e.aceptaPrivacidad = 'Debes aceptar las políticas de privacidad'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleDonar = async () => {
    if (!validate()) return
    setSubmitting(true)
    await new Promise(r => setTimeout(r, 900))
    setSubmitted(true)
    setSubmitting(false)
  }

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section style={{ paddingTop: 96, backgroundColor: '#fff' }}>
        <div className="container-brand" style={{ padding: '48px 48px 0' }}>
          <div
            className="hero-grid"
            style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'flex-start' }}
          >
            {/* Izquierda */}
            <div>
              <h1 style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: 'clamp(40px, 5.5vw, 64px)', fontWeight: 700,
                color: '#09344e', marginBottom: 20, lineHeight: 1.05,
              }}>
                Donaciones
              </h1>
              <p style={{
                fontFamily: 'Poppins, sans-serif', fontSize: 16,
                color: '#12303E', lineHeight: 1.6, marginBottom: 20, maxWidth: 420,
              }}>
                Las donaciones se destinan íntegramente a cubrir la logística de organizaciones sin recursos:
              </p>

              {/* Tags — sin emojis, con icono plus como bullet */}
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 32 }}>
                {TAGS.map(tag => (
                  <span key={tag} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    border: '1.5px solid #C3DED9', borderRadius: 50, padding: '7px 16px',
                    fontFamily: 'Poppins, sans-serif', fontSize: 13, color: '#09344e', fontWeight: 500,
                    backgroundColor: '#F5FBFA',
                  }}>
                    <Icon src="/icons/icon_plus.svg" size={12} filter="invert(24%) sepia(60%) saturate(500%) hue-rotate(155deg)" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Botón DONAR con icon_paypal */}
              <button
                onClick={handleDonar}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  backgroundColor: '#B53077', color: '#fff', border: 'none',
                  borderRadius: 50, padding: '13px 28px',
                  fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 700,
                  cursor: 'pointer', letterSpacing: '0.05em',
                  boxShadow: '0 2px 12px rgba(181,48,119,0.3)',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#802254')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#B53077')}
              >
                DONAR
                <Icon src="/icons/icon_paypal.svg" size={18} filter="brightness(0) invert(1)" />
              </button>
            </div>

            {/* Decoración derecha — gradiente + icon_heart */}
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
                background: 'linear-gradient(135deg, #AEE5DA 0%, #097589 60%, #09344e 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '4px 4px 24px rgba(9,52,78,0.2)',
              }}>
                {/* drop_hands si existe, si no icon_heart_selected escalado */}
                <img
                  src="/icons/icon_heart_selected.svg"
                  alt=""
                  width={80}
                  height={80}
                  style={{ filter: 'brightness(0) invert(1)', opacity: 0.85 }}
                  onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TEXTO + CAJA DONACIÓN ─────────────────────────────────────────────── */}
      <section style={{ padding: '56px 0 64px' }}>
        <div className="container-brand" style={{ padding: '0 48px' }}>
          <div
            className="content-grid"
            style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 48, alignItems: 'flex-start' }}
          >
            {/* Izquierda — texto */}
            <div>
              {/* Icono agua decorativo */}
              <div style={{ marginBottom: 16 }}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path d="M24 6C24 6 10 20 10 30a14 14 0 0 0 28 0C38 20 24 6 24 6z" fill="url(#dg)"/>
                  <defs>
                    <linearGradient id="dg" x1="10" y1="6" x2="38" y2="44" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#8CCDFF"/>
                      <stop offset="100%" stopColor="#097589"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <h2 style={{
                fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(20px, 2.5vw, 28px)',
                fontWeight: 700, color: '#09344e', marginBottom: 14, lineHeight: 1.2,
              }}>
                ¡Gracias a ti, nadie se queda fuera! Dona ahora. Es el momento.
              </h2>
              <p style={{
                fontFamily: 'Poppins, sans-serif', fontSize: 15,
                color: '#12303E', marginBottom: 16, lineHeight: 1.7, fontWeight: 600,
              }}>
                Tu apoyo fortalece el congreso y permite que todos participen.
              </p>
              <p style={{
                fontFamily: 'Poppins, sans-serif', fontSize: 14,
                color: '#5A6E77', lineHeight: 1.8,
              }}>
                Tu aporte permitirá que organizaciones ambientales que no cuentan con recursos puedan asistir al 3º ICEO y formar parte de un espacio de aprendizaje, conexión y colaboración única. Con tu apoyo contribuimos a cubrir la logística necesaria para su participación, asegurando que tengan acceso a talleres, networking, exposiciones y todas las experiencias que el congreso ofrece.
              </p>
            </div>

            {/* Derecha — caja de donación */}
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  style={{ backgroundColor: '#09344e', borderRadius: 12, padding: '28px 28px 24px', color: '#fff' }}
                >
                  <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 8 }}>
                    Introduce el importe a donar
                  </h3>
                  <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 20, lineHeight: 1.5 }}>
                    Al clicar en donar, serás redirigido a PayPal para el proceso de pago.
                  </p>

                  {/* Importe */}
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ fontFamily: 'Poppins, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: 6 }}>
                      Introduce tu aporte aquí
                    </label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.5)', fontSize: 15, pointerEvents: 'none' }}>
                        $
                      </span>
                      <input
                        type="number" min="1" placeholder="0"
                        value={form.importe}
                        onChange={e => set('importe', e.target.value)}
                        style={{
                          width: '100%', height: 44, paddingLeft: 28, paddingRight: 14,
                          borderRadius: 6,
                          border: `1.5px solid ${errors.importe ? '#ff6b6b' : 'rgba(255,255,255,0.2)'}`,
                          backgroundColor: 'rgba(255,255,255,0.08)', color: '#fff',
                          fontFamily: 'Poppins, sans-serif', fontSize: 15,
                          outline: 'none', boxSizing: 'border-box',
                        }}
                      />
                    </div>
                    {errors.importe && (
                      <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, color: '#ff6b6b', marginTop: 4, display: 'block' }}>
                        {errors.importe}
                      </span>
                    )}
                  </div>

                  {/* Privacidad */}
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: 8, cursor: 'pointer', marginBottom: 16 }}>
                    <input
                      type="checkbox"
                      checked={form.aceptaPrivacidad}
                      onChange={e => set('aceptaPrivacidad', e.target.checked)}
                      style={{ width: 14, height: 14, accentColor: '#B53077', flexShrink: 0, marginTop: 2 }}
                    />
                    <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>
                      Acepto las <Link href="/privacidad" style={{ color: '#AEE5DA' }}>políticas de privacidad</Link>. <span style={{ color: '#AEE5DA' }}>Requerido.</span>
                    </span>
                  </label>
                  {errors.aceptaPrivacidad && (
                    <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, color: '#ff6b6b', display: 'block', marginTop: -10, marginBottom: 10 }}>
                      {errors.aceptaPrivacidad}
                    </span>
                  )}

                  {/* Botón DONAR */}
                  <button
                    onClick={handleDonar}
                    disabled={submitting}
                    style={{
                      width: '100%', padding: '13px', borderRadius: 50, border: 'none',
                      backgroundColor: submitting ? '#802254' : '#B53077', color: '#fff',
                      fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 700,
                      cursor: submitting ? 'not-allowed' : 'pointer', letterSpacing: '0.05em',
                      marginBottom: 16, transition: 'background-color 0.2s',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                    }}
                  >
                    {submitting ? 'Procesando…' : (
                      <>
                        DONAR
                        <Icon src="/icons/icon_paypal.svg" size={18} filter="brightness(0) invert(1)" />
                      </>
                    )}
                  </button>

                  {/* FAQ */}
                  <button
                    onClick={() => setFaqOpen(!faqOpen)}
                    style={{
                      width: '100%', background: 'none', border: 'none',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      cursor: 'pointer', padding: '8px 0',
                      borderTop: '1px solid rgba(255,255,255,0.12)',
                    }}
                  >
                    <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
                      ¿Cómo funciona la transacción con PayPal?
                    </span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                      style={{ transform: faqOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', flexShrink: 0 }}>
                      <path d="M3 5l4 4 4-4" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                  <AnimatePresence>
                    {faqOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }} style={{ overflow: 'hidden' }}
                      >
                        <div style={{ padding: '12px 0 4px', fontFamily: 'Poppins, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
                          El valor de tu donación es en dólares americanos (USD). PayPal te mostrará un estimado en tu moneda local antes de confirmar la transacción.<br /><br />
                          Tus transacciones se realizan de manera segura a través de PayPal, al cual serás redirigido una vez hagas clic en el botón "DONAR".<br /><br />
                          En nuestras bases de datos NO almacenamos datos financieros.
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                  style={{ backgroundColor: '#09344e', borderRadius: 12, padding: '36px 28px', textAlign: 'center' }}
                >
                  {/* icon_heart_selected como confirmación */}
                  <div style={{
                    width: 72, height: 72, borderRadius: '50%',
                    backgroundColor: 'rgba(174,229,218,0.15)',
                    border: '2px solid rgba(174,229,218,0.4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 20px',
                  }}>
                    <Icon src="/icons/icon_heart_selected.svg" size={36} filter="brightness(0) saturate(100%) invert(85%) sepia(30%) saturate(400%) hue-rotate(120deg)" />
                  </div>
                  <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 10 }}>
                    ¡Gracias por tu donación!
                  </h3>
                  <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, marginBottom: 20 }}>
                    Serás redirigido a PayPal para completar el pago de{' '}
                    <strong style={{ color: '#AEE5DA' }}>${form.importe} USD</strong>.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm(INITIAL) }}
                    style={{
                      padding: '10px 24px', borderRadius: 50, border: 'none',
                      backgroundColor: '#B53077', color: '#fff',
                      fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                    }}
                  >
                    Hacer otra donación
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── CON NUESTRA UNIÓN ─────────────────────────────────────────────────── */}
      <section style={{ padding: '64px 0', backgroundColor: '#F5FBFA' }}>
        <div className="container-brand" style={{ padding: '0 48px' }}>
          <h2 style={{
            fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(20px, 2.5vw, 28px)',
            fontWeight: 700, color: '#09344e', textAlign: 'center', marginBottom: 48,
          }}>
            Con nuestra unión, hacemos posible
          </h2>
          <div className="impact-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {IMPACTOS.map((imp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                style={{ borderRadius: 10, overflow: 'hidden', boxShadow: '2px 2px 12px rgba(9,52,78,0.1)', border: '1px solid #EFF4F7' }}
              >
                {/* Área de color con icono SVG */}
                <div style={{
                  height: 130, background: imp.bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon
                    src={imp.icon}
                    size={52}
                    filter="brightness(0) invert(1)"
                    style={{ opacity: 0.9 }}
                  />
                </div>
                <div style={{ padding: '16px', backgroundColor: '#fff' }}>
                  <p style={{
                    fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 500,
                    color: '#09344e', lineHeight: 1.4, textAlign: 'center',
                  }}>
                    {imp.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOLLOW US ─────────────────────────────────────────────────────────── */}
      <section style={{ padding: '72px 0' }}>
        <div className="container-brand" style={{ padding: '0 48px' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="follow-grid"
            style={{
              display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 40,
              alignItems: 'center', backgroundColor: '#E6F3EE',
              borderRadius: 16, padding: '40px 48px',
            }}
          >
            {/* Tarjeta "Follow Us" — usando follow.svg si existe */}
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute', top: -16, left: -16, width: 180, height: 130,
                borderRadius: 8, background: 'linear-gradient(135deg, #AEE5DA 0%, #8CCDFF 100%)',
                transform: 'rotate(-3deg)', opacity: 0.45,
              }} />
              <div style={{
                position: 'relative',
                background: 'linear-gradient(135deg, #4886B5 0%, #097589 100%)',
                borderRadius: 10, padding: '18px 24px', textAlign: 'center',
                transform: 'rotate(-2deg)', boxShadow: '4px 4px 20px rgba(9,52,78,0.2)',
              }}>
                <div style={{
                  fontFamily: 'Poppins, sans-serif', fontSize: 24, fontWeight: 900,
                  color: '#fff', letterSpacing: '0.05em', lineHeight: 1, marginBottom: 4,
                }}>
                  FOLLOW US!
                </div>
                <div style={{
                  fontFamily: 'Poppins, sans-serif', fontSize: 10, fontWeight: 600,
                  color: 'rgba(255,255,255,0.85)', letterSpacing: '0.12em', textTransform: 'uppercase',
                }}>
                  ON SOCIAL MEDIA
                </div>
              </div>
            </div>

            {/* Texto + botones RRSS con iconos SVG */}
            <div>
              <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 18, fontWeight: 700, color: '#09344e', marginBottom: 10 }}>
                ¡Pásate por nuestras Redes Sociales y síguenos!
              </h3>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14, color: '#5A6E77', lineHeight: 1.7, marginBottom: 24, maxWidth: 460 }}>
                Publicamos contenido acerca de la labor que hacemos. Podrás conocer nuestros proyectos y a nosotros más a fondo.
              </p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                {SOCIAL.map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 9,
                      fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 500,
                      color: '#09344e', textDecoration: 'none',
                      padding: '9px 18px',
                      border: '1.5px solid #C3DED9', borderRadius: 50,
                      backgroundColor: '#fff', transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#09344e'
                      ;(e.currentTarget as HTMLAnchorElement).style.borderColor = '#09344e'
                      ;(e.currentTarget as HTMLAnchorElement).style.color = '#fff'
                      const img = (e.currentTarget as HTMLAnchorElement).querySelector('img') as HTMLImageElement
                      if (img) img.style.filter = 'brightness(0) invert(1)'
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#fff'
                      ;(e.currentTarget as HTMLAnchorElement).style.borderColor = '#C3DED9'
                      ;(e.currentTarget as HTMLAnchorElement).style.color = '#09344e'
                      const img = (e.currentTarget as HTMLAnchorElement).querySelector('img') as HTMLImageElement
                      if (img) img.style.filter = 'none'
                    }}
                  >
                    <img src={s.src} alt="" width={16} height={16} style={{ display: 'block', transition: 'filter 0.2s' }} />
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <style suppressHydrationWarning>{`
        @media (max-width: 900px) {
          .hero-grid    { grid-template-columns: 1fr !important; }
          .hero-grid > div:last-child { display: none !important; }
          .content-grid { grid-template-columns: 1fr !important; }
          .impact-grid  { grid-template-columns: repeat(2,1fr) !important; }
          .follow-grid  { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .impact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}