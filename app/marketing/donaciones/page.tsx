'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import HeroIceo from '@/components/sections/HeroIceo'
import SectionRedes from '@/components/sections/SectionRedes'
import SectionDonacion from '@/components/sections/SectionDonacion'

// ─── TYPES ────────────────────────────────────────────────────────────────────
type DonationForm = {
  importe: string
  nombre: string
  email: string
  aceptaPrivacidad: boolean
  aceptaComunicaciones: boolean
}

// ▼▼▼ ÚNICO DATO A CONFIGURAR ▼▼▼
const PAYPAL_EMAIL = 'TU_CORREO@AWAQ.ORG'
// ▲▲▲ aquí el correo de la cuenta PayPal de AWAQ ONGD ▲▲▲

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

// ─── CONSTS ───────────────────────────────────────────────────────────────────
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

const INITIAL: DonationForm = {
  importe: '', nombre: '', email: '',
  aceptaPrivacidad: false, aceptaComunicaciones: false,
}

// ─── FadeIn ───────────────────────────────────────────────────────────────────
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

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function DonacionesPage() {
  const [form, setForm]             = useState<DonationForm>(INITIAL)
  const [errors, setErrors]         = useState<Record<string, string>>({})
  const [faqOpen, setFaqOpen]       = useState<number | null>(null)
  const [submitted, setSubmitted]   = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const formRef = useRef<HTMLDivElement>(null)

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

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

  // ▼▼▼ AQUÍ ES DONDE SE USA EL CORREO DE PAYPAL ▼▼▼
  const handleDonar = async () => {
    if (!validate()) return
    setSubmitting(true)

    const params = new URLSearchParams({
      cmd:           '_donations',
      business:      PAYPAL_EMAIL,           // ← correo de la cuenta PayPal receptora
      item_name:     '3ICEO - Donación logística organizaciones ambientales',
      amount:        form.importe,           // ← importe que introdujo el usuario
      currency_code: 'USD',
      no_note:       '0',
    })

    const paypalUrl = `https://www.paypal.com/donate/?${params.toString()}`

    setSubmitted(true)
    setSubmitting(false)

    // Abre PayPal en nueva pestaña para completar el pago
    window.open(paypalUrl, '_blank')
  }
  // ▲▲▲ ──────────────────────────────────────────── ▲▲▲

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>

      <HeroIceo
        badge="AWAQ ONGD · 3ICEO LATAM"
        title={<>Donaciones</>}
        description={
          <>
            Las donaciones se destinan íntegramente a cubrir la logística de
            organizaciones ambientales sin recursos para que puedan participar en el 3ICEO.
          </>
        }
        cta={{
          label: 'DONAR',
          href:  '#form-donacion',
          icon:  '/icons/icon_paypal.svg',
          onClick: (e: React.MouseEvent) => {
            e.preventDefault()
            scrollToForm()
          },
        }}
        image="/icons/donaciones_abrazo_azul.svg"
        imageAlt="Ilustración de donaciones"
        imageLabel="3° ICEO · Donaciones"
        waveVariant="default"
        imageScale={1.1}
        waveColor="#fff"
      />

      <section id="form-donacion" style={{ padding: '72px 0 80px', backgroundColor: '#fff' }}>
        <div className="container-brand" style={{ padding: '0 48px' }}>
          <div
            className="donaciones-form-grid"
            style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 64, alignItems: 'flex-start' }}
          >
            {/* ── LEFT ─────────────────────────────────────────────────── */}
            <FadeIn>
              <h2 style={{
                fontFamily: 'Gloock, Georgia, serif', fontSize: 'clamp(22px, 2.8vw, 32px)',
                fontWeight: 400, color: '#09344e', marginBottom: 16, lineHeight: 1.2,
              }}>
                Por qué tu aportación importa
              </h2>
              <p style={{
                fontFamily: 'Poppins, sans-serif', fontSize: 15,
                color: '#5A6E77', lineHeight: 1.8, marginBottom: 16,
              }}>
                Tu aporte permitirá que organizaciones ambientales que no cuentan con recursos puedan
                asistir al 3º ICEO y formar parte de un espacio de aprendizaje, conexión y colaboración único.
              </p>
              <p style={{
                fontFamily: 'Poppins, sans-serif', fontSize: 15,
                color: '#5A6E77', lineHeight: 1.8, marginBottom: 24,
              }}>
                Con tu apoyo contribuimos a cubrir la logística necesaria para su participación,
                asegurando que tengan acceso a talleres, networking, exposiciones y todas las experiencias
                que el congreso ofrece.
              </p>

              <p style={{
                fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 700,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: '#097589', marginBottom: 10,
              }}>
                Tu donación cubre
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 32 }}>
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

              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 1,
                borderRadius: 14, overflow: 'hidden',
                border: '1.5px solid #C3DED9',
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

            {/* ── RIGHT — formulario ────────────────────────────────────── */}
            <FadeIn delay={0.1}>
              <div ref={formRef} style={{ scrollMarginTop: 40 }} />

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
                      Se ha abierto PayPal para completar el pago de{' '}
                      <strong style={{ color: '#AEE5DA' }}>${form.importe} USD</strong>.
                      Si no se abrió automáticamente, revisa que tu navegador no haya bloqueado la ventana emergente.
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

      {/* ── Impactos ─────────────────────────────────────────────────────── */}
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
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}
          >
            {IMPACTOS.map((imp, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div
                  style={{
                    borderRadius: 16, overflow: 'hidden',
                    boxShadow: '2px 4px 20px rgba(9,52,78,0.18)',
                    transition: 'transform 0.25s, box-shadow 0.25s',
                    cursor: 'default', position: 'relative', height: 300,
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
                  <img
                    src={imp.image} alt={imp.label}
                    style={{
                      position: 'absolute', inset: 0,
                      width: '100%', height: '100%',
                      objectFit: 'cover', objectPosition: 'center', display: 'block',
                    }}
                  />
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
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 20px 22px' }}>
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

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section style={{ padding: '80px 0', backgroundColor: '#fff' }}>
        <div className="container-brand" style={{ padding: '0 48px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'flex-start' }}>
            <FadeIn>
              <p style={{
                fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 600,
                letterSpacing: '0.14em', color: '#097589', textTransform: 'uppercase', marginBottom: 14,
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
              <div style={{ marginTop: 36 }}>
                <Icon
                  src="/icons/drop_hands.svg" size={100} alt="Manos de apoyo"
                  style={{ width: 100, height: 'auto', opacity: 0.85 }}
                />
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {FAQS.map((faq, i) => {
                  const open = faqOpen === i
                  return (
                    <div key={i} style={{ borderBottom: '1.5px solid #E6F3EE', paddingBottom: open ? 16 : 0 }}>
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
                              color: '#5A6E77', lineHeight: 1.75, paddingBottom: 8,
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

      <SectionDonacion
        bg="#09344e"
        theme="dark"
        showTopWave={true}
        topWaveFrom="#E6F3EE"
        waveColor="#ffffff"
        showWave={true}
      />

      <SectionRedes bg="#ffffff" theme="light" />

      <style suppressHydrationWarning>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner {
          display: inline-block;
          width: 18px; height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @media (max-width: 1100px) {
          .impactos-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 900px) {
          .donaciones-form-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .impactos-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}