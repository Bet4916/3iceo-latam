'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
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
  organizacion: string
  cargo: string
  linkedin: string
  areaColaboracion: string
  disponibilidadSemanal: string
  zonaHoraria: string
  experienciaPrevia: string
  motivacion: string
  aceptaPrivacidad: boolean
  aceptaComunicaciones: boolean
}

const INITIAL: Form = {
  nombre: '', apellidos: '', email: '', codigoPais: 'MX', telefono: '',
  pais: '', ciudad: '', organizacion: '', cargo: '', linkedin: '',
  areaColaboracion: '', disponibilidadSemanal: '', zonaHoraria: '',
  experienciaPrevia: '', motivacion: '',
  aceptaPrivacidad: false, aceptaComunicaciones: false,
}

const AREAS = ['Comunicaciones', 'Marketing', 'Ingeniería de Sistemas', 'Diseño Gráfico', 'Coordinación de Eventos', 'Traducción / Idiomas', 'Otros']
const DISPONIBILIDADES = ['1-3 horas/semana', '4-6 horas/semana', '7-10 horas/semana', 'Más de 10 horas/semana']
const ZONAS = ['UTC-5 (Colombia, Perú, Ecuador)', 'UTC-6 (México Centro)', 'UTC-3 (Argentina, Brasil)', 'UTC-4 (Venezuela, Bolivia)', 'UTC+1 (España)', 'Otra']

// ─── PHONE CODES ──────────────────────────────────────────────────────────────
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
  outline: 'none', backgroundColor: '#fff',
  transition: 'border-color 0.2s',
})

const labelStyle: React.CSSProperties = {
  fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600,
  color: '#09344e', display: 'block', marginBottom: 6,
}

function FieldGroup({ children, half }: { children: React.ReactNode; half?: boolean }) {
  return (
    <div style={{ gridColumn: half ? 'span 1' : 'span 2' }}>
      {children}
    </div>
  )
}

function ErrorMsg({ msg }: { msg?: string }) {
  return msg
    ? <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#A7170C', marginTop: 4 }}>{msg}</p>
    : null
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function VoluntariadoPage() {
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
    if (!form.areaColaboracion) e.areaColaboracion = 'Selecciona un área'
    if (!form.disponibilidadSemanal) e.disponibilidadSemanal = 'Selecciona tu disponibilidad'
    if (!form.zonaHoraria)      e.zonaHoraria = 'Selecciona tu zona horaria'
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
      const primerNombre   = form.nombre.trim()
      const apellido       = form.apellidos.trim() || 'NN'

      const sfData = new URLSearchParams()
      sfData.append('orgid',      '00D7Q0000092UMO')
      sfData.append('retURL',     'https://congreso.somosawaq.org/')
      sfData.append('recordType', '0127Q000000AkEQQA0')
      sfData.append('name',       `${nombreCompleto}`)
      sfData.append('email',      form.email)
      sfData.append('phone',      form.telefono)
      sfData.append('company',    form.organizacion || nombreCompleto)
      sfData.append('subject',    `3ICEO - Voluntariado Virtual - ${nombreCompleto}`)
      sfData.append('First_Name__c',        primerNombre)
      sfData.append('Last_Name__c',         apellido)
      sfData.append('Phone__c',             form.telefono)
      sfData.append('Organization_Name__c', form.organizacion || nombreCompleto)
      sfData.append('Country__c',           form.pais)
      sfData.append('City__c',              form.ciudad)
      sfData.append('Country_Code__c',      `+${phoneCode}`)
      sfData.append('Registration_Type__c', 'Colaborador')
      sfData.append('Role__c',              form.cargo)
      sfData.append('Privacy_Consent__c',   form.aceptaPrivacidad ? 'true' : 'false')
      sfData.append('Marketing_consent__c', form.aceptaComunicaciones ? 'true' : 'false')
      sfData.append('description', [
        `Área de colaboración: ${form.areaColaboracion}`,
        `Disponibilidad: ${form.disponibilidadSemanal}`,
        `Zona horaria: ${form.zonaHoraria}`,
        form.linkedin ? `LinkedIn/Portfolio: ${form.linkedin}` : null,
        form.experienciaPrevia ? `Experiencia: ${form.experienciaPrevia}` : null,
        form.motivacion ? `Motivación: ${form.motivacion}` : null,
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
          style={{
            backgroundColor: '#fff', borderRadius: 24, padding: '56px 48px',
            textAlign: 'center', maxWidth: 480,
            boxShadow: '4px 8px 40px rgba(9,52,78,0.12)',
          }}
        >
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            backgroundColor: '#097589',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 24px',
          }}>
            <svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>
          <h2 style={{ fontFamily: 'Gloock, Georgia, serif', fontSize: 28, fontWeight: 400, color: '#09344e', marginBottom: 12 }}>
            ¡Postulación enviada!
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#5A6E77', lineHeight: 1.7, marginBottom: 32 }}>
            Gracias por querer ser parte del voluntariado virtual del 3ICEO LATAM 2027. Revisaremos tu solicitud y te contactaremos en los próximos días.
          </p>
          <Link href="/marketing/colabora" style={{
            display: 'inline-flex', alignItems: 'center',
            backgroundColor: '#09344e', color: '#fff',
            fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 700,
            padding: '12px 28px', borderRadius: 999, textDecoration: 'none',
            letterSpacing: '0.04em',
          }}>
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
          <Link href="/marketing/colabora" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontFamily: 'Poppins, sans-serif', fontSize: 13, color: '#097589',
            textDecoration: 'none', marginBottom: 32, fontWeight: 500,
          }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
              <path d="M10 3L6 8l4 5" stroke="#097589" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Volver a Colabora
          </Link>
        </FadeIn>

        {/* Form card */}
        <FadeIn delay={0.05}>
          <div style={{
            backgroundColor: '#fff', borderRadius: 24, padding: '48px 44px',
            boxShadow: '2px 4px 32px rgba(9,52,78,0.09)',
            border: '1px solid #E4EAED',
          }}>
            {/* Badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center',
              backgroundColor: 'rgba(9,117,137,0.08)',
              border: '1px solid rgba(9,117,137,0.22)',
              borderRadius: 999, padding: '4px 12px', marginBottom: 20,
            }}>
              <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 10, fontWeight: 700, color: '#097589', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                FORMULARIO NUEVO
              </span>
            </div>

            <h1 style={{ fontFamily: 'Gloock, Georgia, serif', fontWeight: 400, fontSize: 'clamp(26px,3.5vw,36px)', color: '#09344e', marginBottom: 10, lineHeight: 1.1 }}>
              Postulación a Voluntariado Virtual
            </h1>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#5A6E77', lineHeight: 1.7, marginBottom: 36 }}>
              Completa tus datos para colaborar de forma virtual con el 3ICEO LATAM 2027 en áreas de apoyo operativo y técnico.
            </p>

            {/* Grid de campos */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 24px' }}>

              {/* 1. Nombre */}
              <FieldGroup half>
                <label style={labelStyle}>1. Nombre</label>
                <input
                  type="text" placeholder="Ingresa tu nombre"
                  value={form.nombre}
                  onChange={e => set('nombre', e.target.value)}
                  style={inputStyle(errors.nombre)}
                />
                <ErrorMsg msg={errors.nombre} />
              </FieldGroup>

              {/* 2. Apellidos */}
              <FieldGroup half>
                <label style={labelStyle}>2. Apellidos</label>
                <input
                  type="text" placeholder="Ingresa tus apellidos"
                  value={form.apellidos}
                  onChange={e => set('apellidos', e.target.value)}
                  style={inputStyle(errors.apellidos)}
                />
                <ErrorMsg msg={errors.apellidos} />
              </FieldGroup>

              {/* 3. Email */}
              <FieldGroup half>
                <label style={labelStyle}>3. Correo electrónico</label>
                <input
                  type="email" placeholder="ejemplo@correo.com"
                  value={form.email}
                  onChange={e => set('email', e.target.value)}
                  style={inputStyle(errors.email)}
                />
                <ErrorMsg msg={errors.email} />
              </FieldGroup>

              {/* 4+5. Código país + Teléfono */}
              <FieldGroup half>
                <label style={labelStyle}>4. Código país &nbsp;&nbsp; 5. Teléfono</label>
                <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: 8 }}>
                  <select
                    value={form.codigoPais}
                    onChange={e => set('codigoPais', e.target.value)}
                    style={{ ...inputStyle(), padding: '12px 8px' }}
                  >
                    {Object.entries(PHONE_CODES).map(([iso, code]) => (
                      <option key={iso} value={iso}>+{code}</option>
                    ))}
                  </select>
                  <input
                    type="tel" placeholder="Ingresa tu número"
                    value={form.telefono}
                    onChange={e => set('telefono', e.target.value)}
                    style={inputStyle(errors.telefono)}
                  />
                </div>
                <ErrorMsg msg={errors.telefono} />
              </FieldGroup>

              {/* 6. País */}
              <FieldGroup half>
                <label style={labelStyle}>6. País</label>
                <select
                  value={form.pais}
                  onChange={e => set('pais', e.target.value)}
                  style={inputStyle(errors.pais)}
                >
                  <option value="">Selecciona tu país</option>
                  {countries.map(c => <option key={c.isoCode} value={c.name}>{c.name}</option>)}
                </select>
                <ErrorMsg msg={errors.pais} />
              </FieldGroup>

              {/* 7. Ciudad */}
              <FieldGroup half>
                <label style={labelStyle}>7. Ciudad</label>
                <input
                  type="text" placeholder="Ingresa tu ciudad"
                  value={form.ciudad}
                  onChange={e => set('ciudad', e.target.value)}
                  style={inputStyle(errors.ciudad)}
                />
                <ErrorMsg msg={errors.ciudad} />
              </FieldGroup>

              {/* 8. Organización */}
              <FieldGroup half>
                <label style={labelStyle}>8. Organización <span style={{ color: '#5A6E77', fontWeight: 400 }}>(opcional)</span></label>
                <input
                  type="text" placeholder="Nombre de tu organización"
                  value={form.organizacion}
                  onChange={e => set('organizacion', e.target.value)}
                  style={inputStyle()}
                />
              </FieldGroup>

              {/* 9. Cargo */}
              <FieldGroup half>
                <label style={labelStyle}>9. Cargo / perfil <span style={{ color: '#5A6E77', fontWeight: 400 }}>(opcional)</span></label>
                <input
                  type="text" placeholder="Tu cargo o perfil actual"
                  value={form.cargo}
                  onChange={e => set('cargo', e.target.value)}
                  style={inputStyle()}
                />
              </FieldGroup>

              {/* 10. LinkedIn */}
              <FieldGroup half>
                <label style={labelStyle}>10. LinkedIn o portafolio <span style={{ color: '#5A6E77', fontWeight: 400 }}>(opcional)</span></label>
                <input
                  type="url" placeholder="https://linkedin.com/in/usuario"
                  value={form.linkedin}
                  onChange={e => set('linkedin', e.target.value)}
                  style={inputStyle()}
                />
              </FieldGroup>

              {/* 11. Área de colaboración */}
              <FieldGroup half>
                <label style={labelStyle}>11. Área de colaboración</label>
                <select
                  value={form.areaColaboracion}
                  onChange={e => set('areaColaboracion', e.target.value)}
                  style={inputStyle(errors.areaColaboracion)}
                >
                  <option value="">Selecciona un área</option>
                  {AREAS.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
                <ErrorMsg msg={errors.areaColaboracion} />
              </FieldGroup>

              {/* 12. Disponibilidad */}
              <FieldGroup half>
                <label style={labelStyle}>12. Disponibilidad semanal</label>
                <select
                  value={form.disponibilidadSemanal}
                  onChange={e => set('disponibilidadSemanal', e.target.value)}
                  style={inputStyle(errors.disponibilidadSemanal)}
                >
                  <option value="">Selecciona tu disponibilidad</option>
                  {DISPONIBILIDADES.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                <ErrorMsg msg={errors.disponibilidadSemanal} />
              </FieldGroup>

              {/* 13. Zona horaria */}
              <FieldGroup>
                <label style={labelStyle}>13. Zona horaria</label>
                <select
                  value={form.zonaHoraria}
                  onChange={e => set('zonaHoraria', e.target.value)}
                  style={inputStyle(errors.zonaHoraria)}
                >
                  <option value="">Selecciona tu zona horaria</option>
                  {ZONAS.map(z => <option key={z} value={z}>{z}</option>)}
                </select>
                <ErrorMsg msg={errors.zonaHoraria} />
              </FieldGroup>

              {/* 14. Experiencia */}
              <FieldGroup half>
                <label style={labelStyle}>14. Experiencia previa</label>
                <textarea
                  rows={4}
                  placeholder="Describe brevemente tu experiencia relevante para el voluntariado virtual."
                  value={form.experienciaPrevia}
                  onChange={e => set('experienciaPrevia', e.target.value)}
                  style={{ ...inputStyle(), resize: 'vertical' }}
                />
              </FieldGroup>

              {/* 15. Motivación */}
              <FieldGroup half>
                <label style={labelStyle}>15. Motivación para colaborar</label>
                <textarea
                  rows={4}
                  placeholder="Cuéntanos por qué quieres ser parte del voluntariado virtual del 3ICEO LATAM 2027."
                  value={form.motivacion}
                  onChange={e => set('motivacion', e.target.value)}
                  style={{ ...inputStyle(), resize: 'vertical' }}
                />
              </FieldGroup>

            </div>

            {/* Checkboxes */}
            <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { key: 'aceptaPrivacidad' as const,     label: <>Acepto la <a href="/privacidad" style={{ color: '#097589' }}>política de privacidad</a>.</> },
                { key: 'aceptaComunicaciones' as const,  label: 'Acepto recibir comunicaciones sobre mi solicitud.' },
              ].map(({ key, label }) => (
                <label key={key} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={form[key] as boolean}
                    onChange={e => set(key, e.target.checked)}
                    style={{ marginTop: 3, accentColor: '#097589', width: 16, height: 16, flexShrink: 0 }}
                  />
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#12303E', lineHeight: 1.5 }}>{label}</span>
                </label>
              ))}
              <ErrorMsg msg={errors.aceptaPrivacidad} />
            </div>

            {/* Error global */}
            {submitError && (
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#A7170C', marginTop: 16, padding: '10px 14px', backgroundColor: '#FFF0EE', borderRadius: 8 }}>
                {submitError}
              </p>
            )}

            {/* Botones */}
            <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                style={{
                  fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 700,
                  color: '#fff', backgroundColor: submitting ? '#437287' : '#097589',
                  border: 'none', borderRadius: 999, padding: '13px 32px',
                  cursor: submitting ? 'not-allowed' : 'pointer', letterSpacing: '0.03em',
                  transition: 'background .2s',
                }}
              >
                {submitting ? 'Enviando...' : 'Enviar postulación'}
              </button>
              <Link href="/marketing/colabora" style={{
                fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 600,
                color: '#437287', border: '1.5px solid #C3DED9', borderRadius: 999,
                padding: '13px 32px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center',
              }}>
                Volver
              </Link>
            </div>
          </div>
        </FadeIn>

        {/* Nota informativa */}
        <FadeIn delay={0.15}>
          <div style={{
            marginTop: 24, backgroundColor: 'rgba(9,117,137,0.06)',
            border: '1px solid rgba(9,117,137,0.18)', borderRadius: 12, padding: '14px 20px',
            display: 'flex', alignItems: 'flex-start', gap: 10,
          }}>
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
              <circle cx="12" cy="12" r="10" stroke="#097589" strokeWidth="1.8"/>
              <path d="M12 16v-4M12 8h.01" stroke="#097589" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 12, color: '#09344e', lineHeight: 1.6 }}>
              <strong>Campo nuevo clave:</strong> desplegable 'Área de colaboración' para clasificar el voluntariado virtual en Comunicaciones, Marketing, Ingeniería de Sistemas u Otros.
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}
