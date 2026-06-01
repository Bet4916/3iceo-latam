'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Country } from 'country-state-city'

// ─── TIPOS ────────────────────────────────────────────────────────────────────
type Form = {
  nombre: string
  apellidos: string
  email: string
  codigoPais: string
  telefono: string
  pais: string
  ciudad: string
  nombreMedio: string
  cargoRol: string
  sitioweb: string
  tipoColaboracion: string
  tipoMedio: string
  diasCobertura: string
  temasInteres: string
  comentariosAdicionales: string
  aceptaPrivacidad: boolean
  aceptaComunicaciones: boolean
}

const INITIAL: Form = {
  nombre: '', apellidos: '', email: '', codigoPais: 'MX', telefono: '',
  pais: '', ciudad: '', nombreMedio: '', cargoRol: '', sitioweb: '',
  tipoColaboracion: '', tipoMedio: '', diasCobertura: '',
  temasInteres: '', comentariosAdicionales: '',
  aceptaPrivacidad: false, aceptaComunicaciones: false,
}

const TIPOS_COLABORACION = [
  'Cobertura periodística', 'Entrevistas', 'Difusión previa del congreso',
  'Alianza de medios', 'Creación de contenido', 'Otros',
]
const TIPOS_MEDIO = [
  'Medio digital', 'Periódico / Revista impresa', 'Radio', 'Televisión',
  'Podcast', 'Blog / Newsletter', 'Agencia de noticias', 'Otro',
]
const DIAS = [
  'Día 1 (Agua y territorios)', 'Día 2 (Cooperación e innovación)',
  'Día 3 (Empresas y sostenibilidad)', 'Todos los días', 'Cobertura remota',
]

const PHONE_CODES: Record<string, string> = {
  MX: '52', ES: '34', CO: '57', AR: '54', PE: '51', CL: '56', VE: '58',
  EC: '593', BO: '591', PY: '595', UY: '598', CR: '506', PA: '507',
  GT: '502', HN: '504', SV: '503', NI: '505', DO: '1', CU: '53',
  US: '1', BR: '55', FR: '33', DE: '49', IT: '39', GB: '44', PT: '351',
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

const inputStyle = (error?: string): React.CSSProperties => ({
  width: '100%', display: 'block', boxSizing: 'border-box',
  border: `1.5px solid ${error ? '#A7170C' : '#D1D9DD'}`,
  borderRadius: 10, padding: '12px 14px',
  fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#12303E',
  outline: 'none', backgroundColor: '#fff', transition: 'border-color 0.2s',
})

const labelStyle: React.CSSProperties = {
  fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600,
  color: '#09344e', display: 'block', marginBottom: 6,
}

function FieldGroup({ children, half }: { children: React.ReactNode; half?: boolean }) {
  return <div style={{ gridColumn: half ? 'span 1' : 'span 2' }}>{children}</div>
}

function ErrorMsg({ msg }: { msg?: string }) {
  return msg
    ? <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#A7170C', marginTop: 4 }}>{msg}</p>
    : null
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function PrensaPage() {
  const [form, setForm]         = useState<Form>(INITIAL)
  const [errors, setErrors]     = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const countries = Country.getAllCountries()

  const set = (k: keyof Form, v: string | boolean) => {
    setForm(p => ({ ...p, [k]: v }))
    setErrors(p => { const e = { ...p }; delete e[k]; return e })
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.nombre.trim())    e.nombre    = 'El nombre es requerido'
    if (!form.apellidos.trim()) e.apellidos = 'Los apellidos son requeridos'
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email no válido'
    if (!form.telefono.trim())  e.telefono  = 'El teléfono es requerido'
    if (!form.pais)             e.pais      = 'Selecciona tu país'
    if (!form.ciudad.trim())    e.ciudad    = 'La ciudad es requerida'
    if (!form.nombreMedio.trim()) e.nombreMedio = 'El nombre del medio es requerido'
    if (!form.cargoRol.trim())  e.cargoRol  = 'El cargo es requerido'
    if (!form.tipoColaboracion) e.tipoColaboracion = 'Selecciona el tipo de colaboración'
    if (!form.tipoMedio)        e.tipoMedio = 'Selecciona el tipo de medio'
    if (!form.diasCobertura)    e.diasCobertura = 'Selecciona los días de cobertura'
    if (!form.aceptaPrivacidad) e.aceptaPrivacidad = 'Debes aceptar las políticas de privacidad'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return
    setSubmitting(true)
    setSubmitError(null)

    try {
      const phoneCode = PHONE_CODES[form.codigoPais] ?? '34'
      const nombreCompleto = `${form.nombre.trim()} ${form.apellidos.trim()}`

      const sfData = new URLSearchParams()
      sfData.append('orgid',      '00D7Q0000092UMO')
      sfData.append('retURL',     'https://congreso.somosawaq.org/')
      sfData.append('recordType', '0127Q000000AkEQQA0')
      sfData.append('name',       nombreCompleto)
      sfData.append('email',      form.email)
      sfData.append('phone',      form.telefono)
      sfData.append('company',    form.nombreMedio)
      sfData.append('subject',    `3ICEO - Prensa y Medios - ${nombreCompleto}`)
      sfData.append('First_Name__c',        form.nombre.trim())
      sfData.append('Last_Name__c',         form.apellidos.trim() || 'NN')
      sfData.append('Phone__c',             form.telefono)
      sfData.append('Organization_Name__c', form.nombreMedio)
      sfData.append('Country__c',           form.pais)
      sfData.append('City__c',              form.ciudad)
      sfData.append('Country_Code__c',      `+${phoneCode}`)
      sfData.append('Registration_Type__c', 'Medio')
      sfData.append('Role__c',              form.cargoRol)
      sfData.append('Privacy_Consent__c',   form.aceptaPrivacidad ? 'true' : 'false')
      sfData.append('Marketing_consent__c', form.aceptaComunicaciones ? 'true' : 'false')
      sfData.append('description', [
        `Tipo de colaboración: ${form.tipoColaboracion}`,
        `Tipo de medio: ${form.tipoMedio}`,
        `Días de cobertura: ${form.diasCobertura}`,
        form.sitioweb ? `Sitio web: ${form.sitioweb}` : null,
        form.temasInteres ? `Temas de interés: ${form.temasInteres}` : null,
        form.comentariosAdicionales ? `Comentarios: ${form.comentariosAdicionales}` : null,
      ].filter(Boolean).join('\n'))

      await fetch(
        'https://webto.salesforce.com/servlet/servlet.WebToCase?encoding=UTF-8&orgId=00D7Q0000092UMO',
        { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: sfData.toString() }
      )
      setSubmitted(true)
    } catch {
      setSubmitError('No se pudo enviar. Verifica tu conexión e intenta de nuevo.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F5FBFA', paddingTop: 80 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{ backgroundColor: '#fff', borderRadius: 24, padding: '56px 48px', textAlign: 'center', maxWidth: 480, boxShadow: '4px 8px 40px rgba(9,52,78,0.12)' }}
        >
          <div style={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: '#437287', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>
          <h2 style={{ fontFamily: 'Gloock, Georgia, serif', fontSize: 28, fontWeight: 400, color: '#09344e', marginBottom: 12 }}>
            ¡Solicitud enviada!
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#5A6E77', lineHeight: 1.7, marginBottom: 32 }}>
            Hemos recibido tu solicitud de acreditación. El equipo de comunicaciones del 3ICEO LATAM 2027 se pondrá en contacto contigo a la brevedad.
          </p>
          <Link href="/marketing/colabora" style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: '#09344e', color: '#fff', fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 700, padding: '12px 28px', borderRadius: 999, textDecoration: 'none', letterSpacing: '0.04em' }}>
            Volver a Colabora
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: '#F5FBFA', minHeight: '100vh', paddingTop: 80 }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px 80px' }}>

        {/* Back */}
        <FadeIn>
          <Link href="/marketing/colabora" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'Poppins, sans-serif', fontSize: 13, color: '#437287', textDecoration: 'none', marginBottom: 32, fontWeight: 500 }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none"><path d="M10 3L6 8l4 5" stroke="#437287" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Volver a Colabora
          </Link>
        </FadeIn>

        <FadeIn delay={0.05}>
          <div style={{ backgroundColor: '#fff', borderRadius: 24, padding: '48px 44px', boxShadow: '2px 4px 32px rgba(9,52,78,0.09)', border: '1px solid #E4EAED' }}>

            {/* Badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: 'rgba(67,114,135,0.08)', border: '1px solid rgba(67,114,135,0.22)', borderRadius: 999, padding: '4px 12px', marginBottom: 20 }}>
              <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 10, fontWeight: 700, color: '#437287', letterSpacing: '0.12em', textTransform: 'uppercase' }}>FORMULARIO NUEVO</span>
            </div>

            <h1 style={{ fontFamily: 'Gloock, Georgia, serif', fontWeight: 400, fontSize: 'clamp(24px,3.5vw,34px)', color: '#09344e', marginBottom: 10, lineHeight: 1.1 }}>
              Solicitud de acreditación · Prensa y Medios
            </h1>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#5A6E77', lineHeight: 1.7, marginBottom: 36 }}>
              Completa tus datos para solicitar acreditación o proponer una colaboración de difusión para el 3ICEO LATAM 2027.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 24px' }}>

              <FieldGroup half>
                <label style={labelStyle}>1. Nombre</label>
                <input type="text" placeholder="Ingresa tu nombre" value={form.nombre} onChange={e => set('nombre', e.target.value)} style={inputStyle(errors.nombre)} />
                <ErrorMsg msg={errors.nombre} />
              </FieldGroup>

              <FieldGroup half>
                <label style={labelStyle}>2. Apellidos</label>
                <input type="text" placeholder="Ingresa tus apellidos" value={form.apellidos} onChange={e => set('apellidos', e.target.value)} style={inputStyle(errors.apellidos)} />
                <ErrorMsg msg={errors.apellidos} />
              </FieldGroup>

              <FieldGroup half>
                <label style={labelStyle}>3. Correo electrónico</label>
                <input type="email" placeholder="ejemplo@correo.com" value={form.email} onChange={e => set('email', e.target.value)} style={inputStyle(errors.email)} />
                <ErrorMsg msg={errors.email} />
              </FieldGroup>

              <FieldGroup half>
                <label style={labelStyle}>4. Código país &nbsp;&nbsp; 5. Teléfono</label>
                <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: 8 }}>
                  <select value={form.codigoPais} onChange={e => set('codigoPais', e.target.value)} style={{ ...inputStyle(), padding: '12px 8px' }}>
                    {Object.entries(PHONE_CODES).map(([iso, code]) => (
                      <option key={iso} value={iso}>+{code}</option>
                    ))}
                  </select>
                  <input type="tel" placeholder="Número de teléfono" value={form.telefono} onChange={e => set('telefono', e.target.value)} style={inputStyle(errors.telefono)} />
                </div>
                <ErrorMsg msg={errors.telefono} />
              </FieldGroup>

              <FieldGroup half>
                <label style={labelStyle}>6. País</label>
                <select value={form.pais} onChange={e => set('pais', e.target.value)} style={inputStyle(errors.pais)}>
                  <option value="">Selecciona tu país</option>
                  {countries.map(c => <option key={c.isoCode} value={c.name}>{c.name}</option>)}
                </select>
                <ErrorMsg msg={errors.pais} />
              </FieldGroup>

              <FieldGroup half>
                <label style={labelStyle}>7. Ciudad</label>
                <input type="text" placeholder="Ingresa tu ciudad" value={form.ciudad} onChange={e => set('ciudad', e.target.value)} style={inputStyle(errors.ciudad)} />
                <ErrorMsg msg={errors.ciudad} />
              </FieldGroup>

              <FieldGroup half>
                <label style={labelStyle}>8. Nombre del medio / organización</label>
                <input type="text" placeholder="Nombre del medio u organización" value={form.nombreMedio} onChange={e => set('nombreMedio', e.target.value)} style={inputStyle(errors.nombreMedio)} />
                <ErrorMsg msg={errors.nombreMedio} />
              </FieldGroup>

              <FieldGroup half>
                <label style={labelStyle}>9. Cargo o rol</label>
                <input type="text" placeholder="Tu cargo o rol actual" value={form.cargoRol} onChange={e => set('cargoRol', e.target.value)} style={inputStyle(errors.cargoRol)} />
                <ErrorMsg msg={errors.cargoRol} />
              </FieldGroup>

              <FieldGroup half>
                <label style={labelStyle}>10. Sitio web o perfil profesional</label>
                <input type="url" placeholder="https://sitio-web.com o @usuario" value={form.sitioweb} onChange={e => set('sitioweb', e.target.value)} style={inputStyle()} />
              </FieldGroup>

              <FieldGroup half>
                <label style={labelStyle}>11. Tipo de colaboración</label>
                <select value={form.tipoColaboracion} onChange={e => set('tipoColaboracion', e.target.value)} style={inputStyle(errors.tipoColaboracion)}>
                  <option value="">Selecciona el tipo</option>
                  {TIPOS_COLABORACION.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <ErrorMsg msg={errors.tipoColaboracion} />
              </FieldGroup>

              <FieldGroup half>
                <label style={labelStyle}>12. Tipo de medio</label>
                <select value={form.tipoMedio} onChange={e => set('tipoMedio', e.target.value)} style={inputStyle(errors.tipoMedio)}>
                  <option value="">Selecciona el tipo de medio</option>
                  {TIPOS_MEDIO.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <ErrorMsg msg={errors.tipoMedio} />
              </FieldGroup>

              <FieldGroup half>
                <label style={labelStyle}>13. Días de cobertura</label>
                <select value={form.diasCobertura} onChange={e => set('diasCobertura', e.target.value)} style={inputStyle(errors.diasCobertura)}>
                  <option value="">Selecciona los días</option>
                  {DIAS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                <ErrorMsg msg={errors.diasCobertura} />
              </FieldGroup>

              <FieldGroup half>
                <label style={labelStyle}>14. Temas de interés</label>
                <textarea rows={4} placeholder="Describe los temas que te interesan cubrir durante el 3ICEO LATAM 2027." value={form.temasInteres} onChange={e => set('temasInteres', e.target.value)} style={{ ...inputStyle(), resize: 'vertical' }} />
              </FieldGroup>

              <FieldGroup half>
                <label style={labelStyle}>15. Comentarios adicionales</label>
                <textarea rows={4} placeholder="Cualquier información adicional que consideres relevante." value={form.comentariosAdicionales} onChange={e => set('comentariosAdicionales', e.target.value)} style={{ ...inputStyle(), resize: 'vertical' }} />
              </FieldGroup>

            </div>

            {/* Checkboxes */}
            <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { key: 'aceptaPrivacidad' as const,     label: <>Acepto la <a href="/privacidad" style={{ color: '#437287' }}>política de privacidad</a>.</> },
                { key: 'aceptaComunicaciones' as const,  label: 'Acepto recibir comunicaciones sobre mi solicitud.' },
              ].map(({ key, label }) => (
                <label key={key} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer' }}>
                  <input type="checkbox" checked={form[key] as boolean} onChange={e => set(key, e.target.checked)} style={{ marginTop: 3, accentColor: '#437287', width: 16, height: 16, flexShrink: 0 }} />
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#12303E', lineHeight: 1.5 }}>{label}</span>
                </label>
              ))}
              <ErrorMsg msg={errors.aceptaPrivacidad} />
            </div>

            {submitError && (
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#A7170C', marginTop: 16, padding: '10px 14px', backgroundColor: '#FFF0EE', borderRadius: 8 }}>
                {submitError}
              </p>
            )}

            <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 700, color: '#fff', backgroundColor: submitting ? '#437287' : '#09344e', border: 'none', borderRadius: 999, padding: '13px 32px', cursor: submitting ? 'not-allowed' : 'pointer', letterSpacing: '0.03em', transition: 'background .2s' }}
              >
                {submitting ? 'Enviando...' : 'Solicitar acreditación'}
              </button>
              <Link href="/marketing/colabora" style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 600, color: '#437287', border: '1.5px solid #C3DED9', borderRadius: 999, padding: '13px 32px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
                Volver
              </Link>
            </div>
          </div>
        </FadeIn>

        {/* Nota */}
        <FadeIn delay={0.15}>
          <div style={{ marginTop: 24, backgroundColor: 'rgba(67,114,135,0.06)', border: '1px solid rgba(67,114,135,0.18)', borderRadius: 12, padding: '14px 20px', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
              <circle cx="12" cy="12" r="10" stroke="#437287" strokeWidth="1.8"/>
              <path d="M12 16v-4M12 8h.01" stroke="#437287" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 12, color: '#09344e', lineHeight: 1.6 }}>
              <strong>Campo nuevo clave:</strong> desplegable 'Tipo de colaboración' para identificar si la solicitud es de cobertura periodística, entrevistas, difusión previa, alianza de medios, creación de contenido u otros.
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}
