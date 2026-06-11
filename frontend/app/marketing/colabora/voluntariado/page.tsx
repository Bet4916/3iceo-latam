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

const PHONE_CODES: Record<string, string> = {
  MX: '52', ES: '34', CO: '57', AR: '54', PE: '51', CL: '56', VE: '58',
  EC: '593', BO: '591', PY: '595', UY: '598', CR: '506', PA: '507',
  GT: '502', HN: '504', SV: '503', NI: '505', DO: '1', CU: '53',
  US: '1', BR: '55', FR: '33', DE: '49', IT: '39', GB: '44', PT: '351',
}

// ─── SHARED STYLE SYSTEM (matches registro form) ──────────────────────────────
const S = {
  label:    { fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 500, color: '#09344e', display: 'block', marginBottom: 6 } as React.CSSProperties,
  input:    { width: '100%', height: 48, padding: '0 14px', borderRadius: 8, border: '1.5px solid #C3DED9', backgroundColor: '#fff', fontFamily: 'Poppins, sans-serif', fontSize: 15, color: '#12303E', outline: 'none', boxSizing: 'border-box' as const, transition: 'border-color 0.2s' } as React.CSSProperties,
  select:   { width: '100%', height: 48, padding: '0 14px', borderRadius: 8, border: '1.5px solid #C3DED9', backgroundColor: '#fff', fontFamily: 'Poppins, sans-serif', fontSize: 14, color: '#12303E', outline: 'none', cursor: 'pointer', boxSizing: 'border-box' as const, appearance: 'auto' as const } as React.CSSProperties,
  textarea: { width: '100%', minHeight: 110, padding: '12px 14px', borderRadius: 8, border: '1.5px solid #C3DED9', backgroundColor: '#fff', fontFamily: 'Poppins, sans-serif', fontSize: 15, color: '#12303E', outline: 'none', boxSizing: 'border-box' as const, resize: 'vertical' as const } as React.CSSProperties,
  hint:     { fontFamily: 'Poppins, sans-serif', fontSize: 11, color: '#097589', marginTop: 4, display: 'block' } as React.CSSProperties,
  optional: { fontFamily: 'Poppins, sans-serif', fontSize: 11, color: '#5A6E77', marginTop: 4, display: 'block' } as React.CSSProperties,
  error:    { fontFamily: 'Poppins, sans-serif', fontSize: 11, color: '#A7170C', marginTop: 4, display: 'block' } as React.CSSProperties,
  field:    { display: 'flex', flexDirection: 'column' as const, gap: 0 },
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 16, fontWeight: 600, color: '#09344e', marginBottom: 16, paddingLeft: 10, borderLeft: '3px solid #097589' }}>{children}</h3>
}

function Divider() {
  return <div style={{ height: 1, backgroundColor: '#EFF4F7', margin: '24px -32px 24px' }} />
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function VoluntariadoPage() {
  const [form, setForm]             = useState<Form>(INITIAL)
  const [errors, setErrors]         = useState<Record<string, string>>({})
  const [submitted, setSubmitted]   = useState(false)
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
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Introduce un email válido'
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
      const phoneCode      = PHONE_CODES[form.codigoPais] ?? '34'
      const nombreCompleto = `${form.nombre.trim()} ${form.apellidos.trim()}`
      const sfData = new URLSearchParams()
      sfData.append('orgid',      '00D7Q0000092UMO')
      sfData.append('retURL',     'https://congreso.somosawaq.org/')
      sfData.append('recordType', '0127Q000000AkEQQA0')
      sfData.append('name',       nombreCompleto)
      sfData.append('email',      form.email)
      sfData.append('phone',      form.telefono)
      sfData.append('company',    form.organizacion || nombreCompleto)
      sfData.append('subject',    `3ICEO - Voluntariado Virtual - ${nombreCompleto}`)
      sfData.append('First_Name__c',        form.nombre.trim())
      sfData.append('Last_Name__c',         form.apellidos.trim() || 'NN')
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
      setSubmitError('No se pudo conectar con el servidor. Verifica tu conexión e intenta de nuevo.')
    } finally {
      setSubmitting(false)
    }
  }

  // ── SUCCESS ──────────────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#E6F3EE', paddingTop: 80 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          style={{ backgroundColor: '#fff', borderRadius: 12, padding: '56px 48px', textAlign: 'center', maxWidth: 480, boxShadow: '2px 2px 24px rgba(9,52,78,0.08)' }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
            <img src="/icons/drop_hands.svg" alt="Postulación recibida" style={{ width: 100, height: 100, objectFit: 'contain' }} />
          </div>
          <h2 style={{ fontFamily: '"Gloock", Georgia, serif', fontSize: 28, fontWeight: 400, color: '#09344e', marginBottom: 12, lineHeight: 1.2 }}>
            ¡Postulación enviada!
          </h2>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 15, color: '#437287', lineHeight: 1.7, marginBottom: 8 }}>
            Gracias por querer ser parte del voluntariado virtual del <strong style={{ color: '#09344e' }}>3ICEO LATAM 2027</strong>.
          </p>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14, color: '#5A6E77', marginBottom: 4 }}>
            Revisaremos tu solicitud y te contactaremos en los próximos días.
          </p>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 12, color: '#9EADB4', marginBottom: 32 }}>Revisa también tu carpeta de spam.</p>
          <Link href="/marketing/colabora" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 28px', borderRadius: 50, backgroundColor: '#097589', color: '#fff', fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 700, textDecoration: 'none', letterSpacing: '0.04em' }}>
            Volver a Colabora
          </Link>
        </motion.div>
      </div>
    )
  }

  // ── FORM ─────────────────────────────────────────────────────────────────────
  return (
    <div style={{ backgroundColor: '#E6F3EE', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* HERO */}
      <section style={{ paddingTop: 96, paddingBottom: 40, textAlign: 'center', background: 'linear-gradient(180deg, #E6F3EE 0%, #d8eee6 100%)', borderBottom: '1px solid rgba(9,52,78,0.06)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, backgroundColor: '#097589', color: '#fff', borderRadius: 50, padding: '5px 16px', fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '0.04em', marginBottom: 16 }}>
            Voluntariado Virtual
          </div>
          <h1 style={{ fontFamily: '"Gloock", Georgia, serif', fontSize: 'clamp(28px, 4.5vw, 44px)', fontWeight: 400, color: '#09344e', marginBottom: 16, lineHeight: 1.2 }}>
            Postulación a Voluntariado Virtual
          </h1>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 16, color: '#437287', marginBottom: 10, lineHeight: 1.6 }}>
            Completa tus datos para colaborar de forma virtual con el 3ICEO LATAM 2027 en áreas de apoyo operativo y técnico.
          </p>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 500, color: '#5A6E77', lineHeight: 1.5 }}>
            * Revisaremos tu candidatura y nos pondremos en contacto contigo a la brevedad.
          </p>
        </div>
      </section>

      {/* FORM */}
      <section style={{ flex: 1, padding: '40px 24px 80px' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>

          {/* Back link */}
          <Link href="/marketing/colabora" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'Poppins, sans-serif', fontSize: 13, color: '#437287', textDecoration: 'none', marginBottom: 24, fontWeight: 500 }}>
            <svg width={16} height={16} viewBox="0 0 16 16" fill="none"><path d="M10 3L6 8l4 5" stroke="#437287" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Volver a Colabora
          </Link>

          <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: '32px', boxShadow: '2px 2px 24px rgba(9,52,78,0.08)', marginBottom: 20 }}>

            {/* ── DATOS PERSONALES ── */}
            <SectionTitle>Datos personales</SectionTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 4 }}>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div style={S.field}>
                  <label style={S.label}>Nombre *</label>
                  <input style={{ ...S.input, borderColor: errors.nombre ? '#A7170C' : '#C3DED9' }} type="text" placeholder="Tu nombre" value={form.nombre} onChange={e => set('nombre', e.target.value)} />
                  {errors.nombre ? <span style={S.error}>{errors.nombre}</span> : <span style={S.hint}>Requerido</span>}
                </div>
                <div style={S.field}>
                  <label style={S.label}>Apellidos *</label>
                  <input style={{ ...S.input, borderColor: errors.apellidos ? '#A7170C' : '#C3DED9' }} type="text" placeholder="Tus apellidos" value={form.apellidos} onChange={e => set('apellidos', e.target.value)} />
                  {errors.apellidos ? <span style={S.error}>{errors.apellidos}</span> : <span style={S.hint}>Requerido</span>}
                </div>
              </div>

              <div style={S.field}>
                <label style={S.label}>E-mail *</label>
                <input style={{ ...S.input, borderColor: errors.email ? '#A7170C' : '#C3DED9' }} type="email" placeholder="correo@electronico.com" value={form.email} onChange={e => set('email', e.target.value)} />
                {errors.email ? <span style={S.error}>{errors.email}</span> : <span style={S.hint}>Requerido</span>}
              </div>

              <div style={S.field}>
                <label style={S.label}>Nº Teléfono *</label>
                <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: 8 }}>
                  <select value={form.codigoPais} onChange={e => set('codigoPais', e.target.value)} style={{ ...S.select }}>
                    {Object.entries(PHONE_CODES).map(([iso, code]) => (
                      <option key={iso} value={iso}>{iso} +{code}</option>
                    ))}
                  </select>
                  <input style={{ ...S.input, borderColor: errors.telefono ? '#A7170C' : '#C3DED9' }} type="tel" placeholder="000 000 0000" value={form.telefono} onChange={e => set('telefono', e.target.value)} />
                </div>
                {errors.telefono ? <span style={S.error}>{errors.telefono}</span> : <span style={S.hint}>Requerido</span>}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div style={S.field}>
                  <label style={S.label}>País *</label>
                  <select style={{ ...S.select, borderColor: errors.pais ? '#A7170C' : '#C3DED9' }} value={form.pais} onChange={e => set('pais', e.target.value)}>
                    <option value="">Selecciona tu país</option>
                    {countries.map(c => <option key={c.isoCode} value={c.name}>{c.name}</option>)}
                  </select>
                  {errors.pais ? <span style={S.error}>{errors.pais}</span> : <span style={S.hint}>Requerido</span>}
                </div>
                <div style={S.field}>
                  <label style={S.label}>Ciudad *</label>
                  <input style={{ ...S.input, borderColor: errors.ciudad ? '#A7170C' : '#C3DED9' }} type="text" placeholder="Tu ciudad" value={form.ciudad} onChange={e => set('ciudad', e.target.value)} />
                  {errors.ciudad ? <span style={S.error}>{errors.ciudad}</span> : <span style={S.hint}>Requerido</span>}
                </div>
              </div>
            </div>

            <Divider />

            {/* ── DATOS PROFESIONALES ── */}
            <SectionTitle>Datos profesionales</SectionTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 4 }}>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div style={S.field}>
                  <label style={S.label}>Organización</label>
                  <input style={S.input} type="text" placeholder="Nombre de tu organización" value={form.organizacion} onChange={e => set('organizacion', e.target.value)} />
                  <span style={S.optional}>Opcional</span>
                </div>
                <div style={S.field}>
                  <label style={S.label}>Cargo / perfil</label>
                  <input style={S.input} type="text" placeholder="Tu cargo o perfil actual" value={form.cargo} onChange={e => set('cargo', e.target.value)} />
                  <span style={S.optional}>Opcional</span>
                </div>
              </div>

              <div style={S.field}>
                <label style={S.label}>LinkedIn o portafolio</label>
                <input style={S.input} type="url" placeholder="https://linkedin.com/in/usuario" value={form.linkedin} onChange={e => set('linkedin', e.target.value)} />
                <span style={S.optional}>Opcional</span>
              </div>
            </div>

            <Divider />

            {/* ── DISPONIBILIDAD ── */}
            <SectionTitle>Disponibilidad y área</SectionTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 4 }}>

              <div style={S.field}>
                <label style={S.label}>Área de colaboración *</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {AREAS.map(a => (
                    <label key={a} onClick={() => set('areaColaboracion', a)}
                      style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', padding: '9px 12px', borderRadius: 8, border: `1.5px solid ${form.areaColaboracion === a ? '#097589' : '#EFF4F7'}`, backgroundColor: form.areaColaboracion === a ? '#f0faf8' : 'transparent', transition: 'all 0.2s' }}>
                      <input type="radio" name="areaColaboracion" value={a} checked={form.areaColaboracion === a} onChange={() => set('areaColaboracion', a)} style={{ width: 14, height: 14, accentColor: '#097589', flexShrink: 0 }} />
                      <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 13, color: '#09344e', lineHeight: 1.3 }}>{a}</span>
                    </label>
                  ))}
                </div>
                {errors.areaColaboracion ? <span style={S.error}>{errors.areaColaboracion}</span> : <span style={S.hint}>Requerido</span>}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div style={S.field}>
                  <label style={S.label}>Disponibilidad semanal *</label>
                  <select style={{ ...S.select, borderColor: errors.disponibilidadSemanal ? '#A7170C' : '#C3DED9' }} value={form.disponibilidadSemanal} onChange={e => set('disponibilidadSemanal', e.target.value)}>
                    <option value="">Selecciona tu disponibilidad</option>
                    {DISPONIBILIDADES.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                  {errors.disponibilidadSemanal ? <span style={S.error}>{errors.disponibilidadSemanal}</span> : <span style={S.hint}>Requerido</span>}
                </div>
                <div style={S.field}>
                  <label style={S.label}>Zona horaria *</label>
                  <select style={{ ...S.select, borderColor: errors.zonaHoraria ? '#A7170C' : '#C3DED9' }} value={form.zonaHoraria} onChange={e => set('zonaHoraria', e.target.value)}>
                    <option value="">Selecciona tu zona horaria</option>
                    {ZONAS.map(z => <option key={z} value={z}>{z}</option>)}
                  </select>
                  {errors.zonaHoraria ? <span style={S.error}>{errors.zonaHoraria}</span> : <span style={S.hint}>Requerido</span>}
                </div>
              </div>
            </div>

            <Divider />

            {/* ── MOTIVACIÓN ── */}
            <SectionTitle>Tu candidatura</SectionTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 4 }}>
              <div style={S.field}>
                <label style={S.label}>Experiencia previa</label>
                <textarea style={S.textarea} placeholder="Describe brevemente tu experiencia relevante para el voluntariado virtual." value={form.experienciaPrevia} onChange={e => set('experienciaPrevia', e.target.value)} />
                <span style={S.optional}>Opcional — recomendado para fortalecer tu candidatura</span>
              </div>
              <div style={S.field}>
                <label style={S.label}>Motivación para colaborar</label>
                <textarea style={S.textarea} placeholder="Cuéntanos por qué quieres ser parte del voluntariado virtual del 3ICEO LATAM 2027." value={form.motivacion} onChange={e => set('motivacion', e.target.value)} />
                <span style={S.optional}>Opcional</span>
              </div>
            </div>

            <Divider />

            {/* ── CONSENTIMIENTOS ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 4 }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', padding: '10px 12px', borderRadius: 8, border: errors.aceptaPrivacidad ? '1.5px solid #A7170C' : '1.5px solid #EFF4F7', backgroundColor: errors.aceptaPrivacidad ? '#fff8f7' : 'transparent' }}>
                <input type="checkbox" checked={form.aceptaPrivacidad} onChange={e => set('aceptaPrivacidad', e.target.checked)} style={{ width: 16, height: 16, accentColor: '#097589', flexShrink: 0, marginTop: 2 }} />
                <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 13, color: '#12303E' }}>
                  * He leído y acepto las <Link href="/privacidad" style={{ color: '#097589', fontWeight: 600 }}>políticas de privacidad.</Link> <span style={{ color: '#097589' }}>Requerido.</span>
                </span>
              </label>
              {errors.aceptaPrivacidad && <span style={{ ...S.error, marginTop: -6 }}>{errors.aceptaPrivacidad}</span>}
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #EFF4F7' }}>
                <input type="checkbox" checked={form.aceptaComunicaciones} onChange={e => set('aceptaComunicaciones', e.target.checked)} style={{ width: 16, height: 16, accentColor: '#097589', flexShrink: 0, marginTop: 2 }} />
                <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 13, color: '#12303E' }}>Acepto recibir comunicaciones de Awaq ONGD sobre el 3ICEO y futuros eventos.</span>
              </label>
            </div>

            {submitError && (
              <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                style={{ fontFamily: 'Poppins, sans-serif', fontSize: 13, color: '#A7170C', backgroundColor: '#fff8f7', border: '1px solid #f5c2c0', borderRadius: 8, padding: '10px 14px', margin: '16px 0 0' }}>
                ⚠️ {submitError}
              </motion.p>
            )}

            <div style={{ display: 'flex', gap: 12, alignItems: 'center', paddingTop: 24 }}>
              <Link href="/marketing/colabora"
                style={{ padding: '12px 20px', borderRadius: 50, border: '1.5px solid #C3DED9', color: '#097589', backgroundColor: 'transparent', fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600, cursor: 'pointer', letterSpacing: '0.03em', display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none' }}>
                Volver
              </Link>
              <button onClick={handleSubmit} disabled={submitting}
                style={{ padding: '13px 32px', borderRadius: 50, border: 'none', backgroundColor: submitting ? '#74B4A7' : '#097589', color: '#fff', fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 700, cursor: submitting ? 'not-allowed' : 'pointer', letterSpacing: '0.04em', boxShadow: submitting ? 'none' : '0 2px 12px rgba(9,117,137,0.3)', display: 'flex', alignItems: 'center', gap: 8 }}>
                {submitting ? (
                  <>
                    <span style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
                    ENVIANDO...
                  </>
                ) : 'ENVIAR POSTULACIÓN'}
              </button>
            </div>
          </div>
        </div>
      </section>

      <style suppressHydrationWarning>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}