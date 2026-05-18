'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

/* ─────────────────────────────────────────────────────────────────────────────
   TIPOS
───────────────────────────────────────────────────────────────────────────── */
type DonationForm = {
  importe: string
  nombre: string
  email: string
  aceptaPrivacidad: boolean
  aceptaComunicaciones: boolean
}

/* ─────────────────────────────────────────────────────────────────────────────
   HELPER — Icon inline con <img> desde /public/icons/
   Todos los iconos vienen de /public/icons/ sin excepción.
───────────────────────────────────────────────────────────────────────────── */
function Icon({
  src,
  size = 20,
  filter,
  style,
  alt = '',
}: {
  src: string
  size?: number
  filter?: string
  style?: React.CSSProperties
  alt?: string
}) {
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      style={{ display: 'block', flexShrink: 0, filter, ...style }}
    />
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   DATOS ESTÁTICOS
───────────────────────────────────────────────────────────────────────────── */
const TAGS = [
  { label: 'Alojamiento', icon: '/icons/icon_bed.svg'       },
  { label: 'Transporte',  icon: '/icons/icon_transport.svg' },
  { label: 'Dieta',       icon: '/icons/icon_food.svg'      },
]

const IMPACTOS = [
  {
    label: 'Mayor acceso a recursos tecnológicos',
    image: '/icons/donaciones_ti.svg',
    bg:    'linear-gradient(160deg, #1C495C 0%, #097589 100%)',
  },
  {
    label: 'Mayor representación en administraciones públicas',
    image: '/icons/donaciones_admin_publicas.svg',
    bg:    'linear-gradient(160deg, #09344e 0%, #437287 100%)',
  },
  {
    label: 'Mayor respaldo de empresas privadas',
    image: '/icons/donaciones_empresas.svg',
    bg:    'linear-gradient(160deg, #074954 0%, #74B4A7 100%)',
  },
  {
    label: 'Mayor acceso a financiaciones',
    image: '/icons/donaciones_finanzas.svg',
    bg:    'linear-gradient(160deg, #437287 0%, #AEE5DA 100%)',
  },
]

const FAQS = [
  {
    q: '¿A qué se destinan las donaciones?',
    a: 'El 100% de las donaciones se destina íntegramente a cubrir los gastos de logística (alojamiento, transporte y dieta) de organizaciones ambientales sin recursos para que puedan participar en el 3ICEO.',
  },
  {
    q: '¿Cómo se realiza el pago?',
    a: 'El pago se realiza de forma segura a través de PayPal. Serás redirigido a su plataforma para completar la transacción. No almacenamos ningún dato financiero en nuestras bases de datos.',
  },
  {
    q: '¿En qué moneda puedo donar?',
    a: 'Las donaciones se realizan en USD. PayPal te mostrará el equivalente en tu moneda local antes de confirmar la transacción.',
  },
  {
    q: '¿Recibiré un comprobante de mi donación?',
    a: 'Sí. PayPal genera automáticamente un recibo de la transacción que podrás descargar desde tu cuenta. Además, te enviaremos un correo de agradecimiento con los detalles de tu aportación.',
  },
]

const SOCIAL = [
  { src: '/icons/icon_instagram.svg', href: 'https://instagram.com/somosawaq',        label: 'Instagram' },
  { src: '/icons/icon_facebook.svg',  href: 'https://facebook.com/somosawaq',         label: 'Facebook'  },
  { src: '/icons/icon_linkedin.svg',  href: 'https://linkedin.com/company/somosawaq', label: 'LinkedIn'  },
]

const INITIAL: DonationForm = {
  importe: '', nombre: '', email: '',
  aceptaPrivacidad: false, aceptaComunicaciones: false,
}

/* ─────────────────────────────────────────────────────────────────────────────
   FadeIn — envuelve cualquier elemento con entrada suave
───────────────────────────────────────────────────────────────────────────── */
function FadeIn({
  children,
  delay = 0,
  y = 20,
}: {
  children: React.ReactNode
  delay?: number
  y?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   COMPONENTE PRINCIPAL
───────────────────────────────────────────────────────────────────────────── */
export default function DonacionesPage() {
  const [form, setForm]             = useState<DonationForm>(INITIAL)
  const [errors, setErrors]         = useState<Record<string, string>>({})
  const [faqOpen, setFaqOpen]       = useState<number | null>(null)
  const [submitted, setSubmitted]   = useState(false)
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

      {/* ════════════════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ paddingTop: 100, backgroundColor: '#fff' }}>
        <div
          className="container-brand"
          style={{ padding: '48px 48px 0' }}
        >
          <div
            className="donaciones-hero-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: 64,
              alignItems: 'center',
            }}
          >
            {/* ── LEFT ─────────────────────────────────────────────────── */}
            <FadeIn>
              {/* Eyebrow */}
              <p style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 12, fontWeight: 600, letterSpacing: '0.14em',
                color: '#097589', textTransform: 'uppercase', marginBottom: 14,
              }}>
                AWAQ ONGD · 3ICEO LATAM
              </p>

              {/* Title */}
              <h1 style={{
                fontFamily: 'Gloock, Georgia, serif',
                fontSize: 'clamp(44px, 5.5vw, 72px)', fontWeight: 400,
                color: '#09344e', marginBottom: 22, lineHeight: 1.04,
              }}>
                Donaciones
              </h1>

              {/* Description */}
              <p style={{
                fontFamily: 'Poppins, sans-serif', fontSize: 16,
                color: '#12303E', lineHeight: 1.65, marginBottom: 28, maxWidth: 480,
              }}>
                Las donaciones se destinan íntegramente a cubrir la logística de
                organizaciones ambientales sin recursos para que puedan participar en el 3ICEO.
              </p>

              {/* Tags — icon + label, sin emojis */}
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 36 }}>
                {TAGS.map(tag => (
                  <span
                    key={tag.label}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      border: '1.5px solid #C3DED9', borderRadius: 50,
                      padding: '8px 18px',
                      fontFamily: 'Poppins, sans-serif', fontSize: 13,
                      color: '#09344e', fontWeight: 500,
                      backgroundColor: '#F5FBFA',
                    }}
                  >
                    <Icon src={tag.icon} size={16} />
                    {tag.label}
                  </span>
                ))}
              </div>

              {/* CTA — botón DONAR con icon_paypal */}
              <button
                onClick={handleDonar}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  backgroundColor: '#B53077', color: '#fff', border: 'none',
                  borderRadius: 50, padding: '14px 32px',
                  fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 700,
                  cursor: 'pointer', letterSpacing: '0.06em',
                  boxShadow: '0 4px 16px rgba(181,48,119,0.3)',
                  transition: 'background-color 0.2s, transform 0.15s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = '#802254'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = '#B53077'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                DONAR
                <Icon
                  src="/icons/icon_paypal.svg"
                  size={20}
                />
              </button>
            </FadeIn>

            {/* ── RIGHT — ilustración donaciones_abrazo_azul ───────────── */}
            <FadeIn delay={0.12}>
              <div style={{ position: 'relative', flexShrink: 0 }}>
                {/* Decorative bg blob */}
                <div style={{
                  position: 'absolute', inset: -18,
                  background: 'linear-gradient(135deg, #DAEBF2 0%, #AEE5DA 60%, #C0FFF2 100%)',
                  borderRadius: 24, opacity: 0.55, zIndex: 0,
                  filter: 'blur(2px)',
                }} />
                <div style={{
                  position: 'relative', zIndex: 1,
                  borderRadius: 18,
                  overflow: 'hidden',
                  boxShadow: '4px 4px 32px rgba(9,52,78,0.14)',
                  background: 'linear-gradient(135deg, #DAEBF2 0%, #AEE5DA 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 372, height: 213,
                }}>
                  <Icon
                    src="/icons/donaciones_abrazo_azul.svg"
                    size={372}
                    style={{ width: 372, height: 213, objectFit: 'cover' }}
                    alt="Ilustración de donaciones"
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          DESCRIPCIÓN + FORMULARIO DE DONACIÓN
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '72px 0 80px', backgroundColor: '#fff' }}>
        <div className="container-brand" style={{ padding: '0 48px' }}>
          <div
            className="donaciones-form-grid"
            style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 64, alignItems: 'flex-start' }}
          >
            {/* ── LEFT — descripción larga ─────────────────────────────── */}
            <FadeIn>
              <h2 style={{
                fontFamily: 'Gloock, Georgia, serif', fontSize: 'clamp(22px, 2.8vw, 32px)',
                fontWeight: 400, color: '#09344e', marginBottom: 20, lineHeight: 1.2,
              }}>
                Por qué tu aportación importa
              </h2>
              <p style={{
                fontFamily: 'Poppins, sans-serif', fontSize: 15,
                color: '#5A6E77', lineHeight: 1.8, marginBottom: 20,
              }}>
                Tu aporte permitirá que organizaciones ambientales que no cuentan con recursos puedan
                asistir al 3º ICEO y formar parte de un espacio de aprendizaje, conexión y colaboración único.
              </p>
              <p style={{
                fontFamily: 'Poppins, sans-serif', fontSize: 15,
                color: '#5A6E77', lineHeight: 1.8, marginBottom: 28,
              }}>
                Con tu apoyo contribuimos a cubrir la logística necesaria para su participación,
                asegurando que tengan acceso a talleres, networking, exposiciones y todas las experiencias
                que el congreso ofrece.
              </p>

              {/* Bloque de impacto — stats visuales */}
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 1,
                borderRadius: 14, overflow: 'hidden',
                border: '1.5px solid #C3DED9',
                marginTop: 8,
              }}>
                {[
                  { num: '100%', desc: 'va a logística de organizaciones sin recursos' },
                  { num: '+40',  desc: 'países representados en el 3ICEO' },
                  { num: '3ª',   desc: 'edición del congreso ambiental más grande de LATAM' },
                ].map((stat, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '22px 18px',
                      backgroundColor: i === 1 ? '#09344e' : '#F5FBFA',
                      borderRight: i < 2 ? '1.5px solid #C3DED9' : 'none',
                      display: 'flex', flexDirection: 'column', gap: 6,
                    }}
                  >
                    <span style={{
                      fontFamily: 'Gloock, Georgia, serif',
                      fontSize: 28, fontWeight: 400,
                      color: i === 1 ? '#AEE5DA' : '#09344e',
                      lineHeight: 1,
                    }}>
                      {stat.num}
                    </span>
                    <span style={{
                      fontFamily: 'Poppins, sans-serif', fontSize: 12,
                      color: i === 1 ? 'rgba(255,255,255,0.7)' : '#5A6E77',
                      lineHeight: 1.5,
                    }}>
                      {stat.desc}
                    </span>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* ── RIGHT — caja de donación (navy) ─────────────────────── */}
            <FadeIn delay={0.1}>
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    style={{
                      backgroundColor: '#09344e', borderRadius: 16,
                      padding: '32px 28px 28px', color: '#fff',
                      boxShadow: '4px 4px 32px rgba(9,52,78,0.22)',
                    }}
                  >
                    <h3 style={{
                      fontFamily: 'Poppins, sans-serif', fontSize: 17, fontWeight: 700,
                      color: '#fff', marginBottom: 6,
                    }}>
                      Introduce el importe a donar
                    </h3>
                    <p style={{
                      fontFamily: 'Poppins, sans-serif', fontSize: 13,
                      color: 'rgba(255,255,255,0.65)', marginBottom: 24, lineHeight: 1.55,
                    }}>
                      Al clicar en donar, serás redirigido a PayPal para el proceso de pago.
                    </p>

                    {/* Importe */}
                    <div style={{ marginBottom: 18 }}>
                      <label style={{
                        fontFamily: 'Poppins, sans-serif', fontSize: 12,
                        color: 'rgba(255,255,255,0.65)', display: 'block', marginBottom: 7,
                      }}>
                        Introduce tu aporte aquí
                      </label>
                      <div style={{ position: 'relative' }}>
                        <span style={{
                          position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
                          color: 'rgba(255,255,255,0.45)', fontSize: 15, pointerEvents: 'none',
                          fontFamily: 'Poppins, sans-serif',
                        }}>
                          $
                        </span>
                        <input
                          type="number" min="1" placeholder="0"
                          value={form.importe}
                          onChange={e => set('importe', e.target.value)}
                          style={{
                            width: '100%', height: 46, paddingLeft: 30, paddingRight: 14,
                            borderRadius: 8,
                            border: `1.5px solid ${errors.importe ? '#ff6b6b' : 'rgba(255,255,255,0.2)'}`,
                            backgroundColor: 'rgba(255,255,255,0.08)', color: '#fff',
                            fontFamily: 'Poppins, sans-serif', fontSize: 15,
                            outline: 'none', boxSizing: 'border-box', transition: 'border-color .2s',
                          }}
                        />
                      </div>
                      {errors.importe && (
                        <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, color: '#ff6b6b', marginTop: 4, display: 'block' }}>
                          {errors.importe}
                        </span>
                      )}
                    </div>

                    {/* Nombre */}
                    <div style={{ marginBottom: 18 }}>
                      <label style={{
                        fontFamily: 'Poppins, sans-serif', fontSize: 12,
                        color: 'rgba(255,255,255,0.65)', display: 'block', marginBottom: 7,
                      }}>
                        Nombre completo
                      </label>
                      <input
                        type="text" placeholder="Tu nombre"
                        value={form.nombre}
                        onChange={e => set('nombre', e.target.value)}
                        style={{
                          width: '100%', height: 46, padding: '0 14px', borderRadius: 8,
                          border: '1.5px solid rgba(255,255,255,0.2)',
                          backgroundColor: 'rgba(255,255,255,0.08)', color: '#fff',
                          fontFamily: 'Poppins, sans-serif', fontSize: 14,
                          outline: 'none', boxSizing: 'border-box',
                        }}
                      />
                    </div>

                    {/* Email */}
                    <div style={{ marginBottom: 20 }}>
                      <label style={{
                        fontFamily: 'Poppins, sans-serif', fontSize: 12,
                        color: 'rgba(255,255,255,0.65)', display: 'block', marginBottom: 7,
                      }}>
                        Correo electrónico
                      </label>
                      <input
                        type="email" placeholder="tu@correo.com"
                        value={form.email}
                        onChange={e => set('email', e.target.value)}
                        style={{
                          width: '100%', height: 46, padding: '0 14px', borderRadius: 8,
                          border: '1.5px solid rgba(255,255,255,0.2)',
                          backgroundColor: 'rgba(255,255,255,0.08)', color: '#fff',
                          fontFamily: 'Poppins, sans-serif', fontSize: 14,
                          outline: 'none', boxSizing: 'border-box',
                        }}
                      />
                    </div>

                    {/* Privacidad */}
                    <label style={{
                      display: 'flex', alignItems: 'flex-start', gap: 10,
                      cursor: 'pointer', marginBottom: errors.aceptaPrivacidad ? 4 : 16,
                    }}>
                      <input
                        type="checkbox"
                        checked={form.aceptaPrivacidad}
                        onChange={e => set('aceptaPrivacidad', e.target.checked)}
                        style={{ width: 14, height: 14, accentColor: '#B53077', flexShrink: 0, marginTop: 2 }}
                      />
                      <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
                        Acepto las{' '}
                        <Link href="/privacidad" style={{ color: '#AEE5DA' }}>
                          políticas de privacidad
                        </Link>.{' '}
                        <span style={{ color: '#AEE5DA' }}>Requerido.</span>
                      </span>
                    </label>
                    {errors.aceptaPrivacidad && (
                      <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, color: '#ff6b6b', display: 'block', marginBottom: 10 }}>
                        {errors.aceptaPrivacidad}
                      </span>
                    )}

                    {/* Comunicaciones */}
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', marginBottom: 24 }}>
                      <input
                        type="checkbox"
                        checked={form.aceptaComunicaciones}
                        onChange={e => set('aceptaComunicaciones', e.target.checked)}
                        style={{ width: 14, height: 14, accentColor: '#B53077', flexShrink: 0, marginTop: 2 }}
                      />
                      <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
                        Acepto recibir comunicaciones sobre el 3ICEO y AWAQ ONGD.
                      </span>
                    </label>

                    {/* Botón DONAR */}
                    <button
                      onClick={handleDonar}
                      disabled={submitting}
                      style={{
                        width: '100%', padding: '14px', borderRadius: 50, border: 'none',
                        backgroundColor: submitting ? '#802254' : '#B53077', color: '#fff',
                        fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 700,
                        cursor: submitting ? 'not-allowed' : 'pointer',
                        letterSpacing: '0.06em', marginBottom: 16,
                        transition: 'background-color 0.2s',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                      }}
                    >
                      {submitting ? (
                        <span className="spinner" />
                      ) : (
                        <>
                          DONAR
                          <Icon src="/icons/icon_paypal.svg" size={18} />
                        </>
                      )}
                    </button>

                    {/* Seguridad */}
                    <p style={{
                      fontFamily: 'Poppins, sans-serif', fontSize: 10,
                      color: 'rgba(255,255,255,0.4)', textAlign: 'center', lineHeight: 1.6,
                    }}>
                      Pago seguro a través de PayPal. No almacenamos datos financieros.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                      backgroundColor: '#09344e', borderRadius: 16,
                      padding: '40px 28px', textAlign: 'center',
                      boxShadow: '4px 4px 32px rgba(9,52,78,0.22)',
                    }}
                  >
                    <div style={{
                      width: 72, height: 72, borderRadius: '50%',
                      backgroundColor: 'rgba(174,229,218,0.15)',
                      border: '2px solid rgba(174,229,218,0.4)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      margin: '0 auto 20px',
                    }}>
                      <Icon
                        src="/icons/drop_hands.svg"
                        size={40}
                        filter="brightness(0) saturate(100%) invert(75%) sepia(30%) saturate(400%) hue-rotate(120deg)"
                      />
                    </div>
                    <h3 style={{
                      fontFamily: 'Poppins, sans-serif', fontSize: 18, fontWeight: 700,
                      color: '#fff', marginBottom: 10,
                    }}>
                      ¡Gracias por tu donación!
                    </h3>
                    <p style={{
                      fontFamily: 'Poppins, sans-serif', fontSize: 13,
                      color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, marginBottom: 24,
                    }}>
                      Serás redirigido a PayPal para completar el pago de{' '}
                      <strong style={{ color: '#AEE5DA' }}>${form.importe} USD</strong>.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setForm(INITIAL) }}
                      style={{
                        padding: '10px 28px', borderRadius: 50, border: 'none',
                        backgroundColor: '#B53077', color: '#fff',
                        fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      Hacer otra donación
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          CON NUESTRA UNIÓN, HACEMOS POSIBLE — 4 tarjetas de impacto
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '80px 0', backgroundColor: '#F5FBFA' }}>
        <div className="container-brand" style={{ padding: '0 48px' }}>
          <FadeIn>
            <h2 style={{
              fontFamily: 'Gloock, Georgia, serif',
              fontSize: 'clamp(22px, 2.8vw, 36px)', fontWeight: 400,
              color: '#09344e', textAlign: 'center', marginBottom: 56,
            }}>
              Con nuestra unión, hacemos posible
            </h2>
          </FadeIn>

          <div
            className="impactos-grid"
            style={{
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24,
            }}
          >
            {IMPACTOS.map((imp, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div
                  style={{
                    borderRadius: 16, overflow: 'hidden',
                    boxShadow: '2px 4px 20px rgba(9,52,78,0.18)',
                    transition: 'transform 0.25s, box-shadow 0.25s',
                    cursor: 'default',
                    position: 'relative',
                    /* altura fija igual para todas */
                    height: 300,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-6px)'
                    e.currentTarget.style.boxShadow = '4px 10px 32px rgba(9,52,78,0.28)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '2px 4px 20px rgba(9,52,78,0.18)'
                  }}
                >
                  {/* Imagen — ocupa todo el card */}
                  <img
                    src={imp.image}
                    alt={imp.label}
                    style={{
                      position: 'absolute', inset: 0,
                      width: '100%', height: '100%',
                      objectFit: 'cover', objectPosition: 'center',
                      display: 'block',
                    }}
                  />
                  {/* Overlay degradado desde abajo */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: `linear-gradient(to top, ${
                      ['rgba(9,52,78,0.92) 0%, rgba(9,52,78,0.3) 55%, transparent 100%',
                       'rgba(9,52,78,0.92) 0%, rgba(9,52,78,0.3) 55%, transparent 100%',
                       'rgba(7,73,84,0.88) 0%, rgba(7,73,84,0.25) 55%, transparent 100%',
                       'rgba(67,114,135,0.88) 0%, rgba(67,114,135,0.25) 55%, transparent 100%',
                      ][i]
                    })`,
                  }} />
                  {/* Label — fijo en la parte inferior */}
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    padding: '20px 20px 22px',
                  }}>
                    <p style={{
                      fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 600,
                      color: '#fff', lineHeight: 1.4, margin: 0,
                      textShadow: '0 1px 4px rgba(0,0,0,0.3)',
                    }}>
                      {imp.label}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          FAQ — con icon_questionmark_selected / no_selected
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '80px 0', backgroundColor: '#fff' }}>
        <div className="container-brand" style={{ padding: '0 48px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'flex-start' }}>
            {/* Left — headline */}
            <FadeIn>
              <p style={{
                fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 600,
                letterSpacing: '0.14em', color: '#097589', textTransform: 'uppercase',
                marginBottom: 14,
              }}>
                PREGUNTAS FRECUENTES
              </p>
              <h2 style={{
                fontFamily: 'Gloock, Georgia, serif',
                fontSize: 'clamp(22px, 2.8vw, 36px)', fontWeight: 400,
                color: '#09344e', marginBottom: 20, lineHeight: 1.15,
              }}>
                Todo lo que necesitas saber antes de donar
              </h2>
              <p style={{
                fontFamily: 'Poppins, sans-serif', fontSize: 14,
                color: '#5A6E77', lineHeight: 1.75, maxWidth: 340,
              }}>
                Queremos que tu proceso de donación sea completamente transparente y seguro.
                Aquí resolvemos las dudas más comunes.
              </p>

              {/* drop_hands decorativo */}
              <div style={{ marginTop: 36 }}>
                <Icon
                  src="/icons/drop_hands.svg"
                  size={100}
                  alt="Manos de apoyo"
                  style={{ width: 100, height: 'auto', opacity: 0.85 }}
                />
              </div>
            </FadeIn>

            {/* Right — accordeon */}
            <FadeIn delay={0.1}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {FAQS.map((faq, i) => {
                  const open = faqOpen === i
                  return (
                    <div
                      key={i}
                      style={{
                        borderBottom: '1.5px solid #E6F3EE',
                        paddingBottom: open ? 16 : 0,
                      }}
                    >
                      <button
                        onClick={() => setFaqOpen(open ? null : i)}
                        style={{
                          width: '100%', display: 'flex', alignItems: 'center',
                          justifyContent: 'space-between', gap: 16,
                          background: 'none', border: 'none', cursor: 'pointer',
                          padding: '18px 0', textAlign: 'left',
                        }}
                      >
                        <span style={{
                          fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 600,
                          color: '#09344e', lineHeight: 1.4, flex: 1,
                        }}>
                          {faq.q}
                        </span>
                        {/* Icono alterna entre selected y no_selected */}
                        <Icon
                          src={open
                            ? '/icons/icon_questionmark_selcted.svg'
                            : '/icons/icon_questionmark_no_selcted.svg'
                          }
                          size={22}
                          style={{ flexShrink: 0, transition: 'transform 0.2s' }}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {open && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28, ease: 'easeOut' }}
                            style={{ overflow: 'hidden' }}
                          >
                            <p style={{
                              fontFamily: 'Poppins, sans-serif', fontSize: 13,
                              color: '#5A6E77', lineHeight: 1.75,
                              paddingBottom: 8,
                            }}>
                              {faq.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          REDES SOCIALES — follow.svg + iconos + drop_hands
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '80px 0 90px', backgroundColor: '#09344e' }}>
        <div className="container-brand" style={{ padding: '0 48px' }}>
          <div
            className="rrss-grid"
            style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64,
              alignItems: 'center',
            }}
          >
            {/* Left — follow badge grande, sin texto redundante */}
            <FadeIn>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon
                  src="/icons/follow.svg"
                  alt="Follow us on social media"
                  style={{ width: '100%', maxWidth: 380, height: 'auto' }}
                />
              </div>
            </FadeIn>

            {/* Right — texto + botones RRSS */}
            <FadeIn delay={0.1}>
              <h3 style={{
                fontFamily: 'Poppins, sans-serif', fontSize: 22, fontWeight: 700,
                color: '#fff', marginBottom: 12, lineHeight: 1.3,
              }}>
                ¡Pásate por nuestras Redes Sociales y síguenos!
              </h3>
              <p style={{
                fontFamily: 'Poppins, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.65)',
                lineHeight: 1.75, marginBottom: 32, maxWidth: 460,
              }}>
                Publicamos contenido acerca de la labor que hacemos. Podrás conocer
                nuestros proyectos y a nosotros más a fondo.
              </p>

              {/* Social icon buttons con icon_instagram, icon_facebook, icon_linkedin */}
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {SOCIAL.map(({ src, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    style={{
                      width: 48, height: 48, borderRadius: '50%',
                      backgroundColor: '#09344e',
                      border: '1.5px solid rgba(255,255,255,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'background .2s, transform .2s, border-color .2s',
                    }}
                    onMouseEnter={e => {
                      const a = e.currentTarget as HTMLAnchorElement
                      a.style.backgroundColor = '#097589'
                      a.style.transform = 'scale(1.1)'
                      a.style.borderColor = '#097589'
                    }}
                    onMouseLeave={e => {
                      const a = e.currentTarget as HTMLAnchorElement
                      a.style.backgroundColor = '#09344e'
                      a.style.transform = 'scale(1)'
                      a.style.borderColor = 'rgba(255,255,255,0.2)'
                    }}
                  >
                    <img
                      src={src}
                      alt={label}
                      width={22}
                      height={22}
                      style={{ filter: 'brightness(0) invert(1)', display: 'block' }}
                    />
                  </a>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          CTA FINAL — drop_hands + acción
      ════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: '80px 0', backgroundColor: '#F5FBFA' }}>
        <div className="container-brand" style={{ padding: '0 48px' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 220px', gap: 48,
            alignItems: 'center',
            backgroundColor: '#fff', borderRadius: 20,
            overflow: 'hidden',
            boxShadow: '2px 2px 24px rgba(9,52,78,0.1)',
          }}>
            {/* Text */}
            <div style={{ padding: '44px 44px 44px 0', paddingLeft: 44 }}>
              <h3 style={{
                fontFamily: 'Gloock, Georgia, serif', fontSize: 'clamp(20px, 2.2vw, 28px)',
                fontWeight: 400, color: '#09344e', marginBottom: 14, lineHeight: 1.2,
              }}>
                ¡Gracias a tu donación, nadie se queda fuera!
              </h3>
              <p style={{
                fontFamily: 'Poppins, sans-serif', fontSize: 14,
                color: '#437287', marginBottom: 28, lineHeight: 1.75,
              }}>
                El importe irá íntegramente destinado a cubrir alojamiento, transporte y dieta.
              </p>
              <button
                onClick={handleDonar}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  backgroundColor: '#B53077', color: '#fff', border: 'none',
                  borderRadius: 50, padding: '13px 28px',
                  fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 700,
                  cursor: 'pointer', letterSpacing: '0.05em',
                  boxShadow: '0 4px 16px rgba(181,48,119,0.28)',
                  transition: 'background-color 0.2s, transform 0.15s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = '#802254'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = '#B53077'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                DONAR AHORA
                <Icon src="/icons/icon_paypal.svg" size={18} />
              </button>
            </div>

            {/* drop_hands imagen */}
            <div style={{
              height: '100%', minHeight: 200,
              background: 'linear-gradient(135deg, #AEE5DA 0%, #74B4A7 50%, #097589 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: 24,
            }}>
              <Icon
                src="/icons/drop_hands.svg"
                alt="Manos de apoyo"
                style={{ width: 100, height: 'auto', opacity: 0.9 }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────
          RESPONSIVE overrides
      ──────────────────────────────────────────────────────────────────── */}
      <style suppressHydrationWarning>{`
        @keyframes spin { to { transform: rotate(360deg); } }

        @media (max-width: 1100px) {
          .impactos-grid   { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 900px) {
          .donaciones-hero-grid  { grid-template-columns: 1fr !important; }
          .donaciones-form-grid  { grid-template-columns: 1fr !important; }
          .rrss-grid             { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .impactos-grid   { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
