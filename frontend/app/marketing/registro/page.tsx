'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Country, State, City } from 'country-state-city'
import { CountrySelect, PhoneCodeSelect } from '@/components/ui/CountrySelect'

type Step = 1 | 2 | 3
type TipoSolicitud = 'asistencia' | 'ponente' | 'colaboracion'
type TipoOrg =
  | 'Universidad'
  | 'Empresa privada'
  | 'Administración pública'
  | 'Persona independiente'
  | 'Asociación / ONG'
  | 'Otra organización'

interface Form {
  tipoSolicitud: TipoSolicitud | null
  quiereStand: boolean
  tituloPonencia: string
  resumenPonencia: string
  areaTematica: string
  tipoColaboracion: string
  descripcionColaboracion: string
  email: string
  nombre: string
  tipoOrg: TipoOrg | null
  tipoOrgEspecifica: string
  nombreOrg: string
  puesto: string
  codigoPais: string
  telefono: string
  ubicacionPaisCode: string
  ubicacionRegionCode: string
  ubicacionCiudad: string
  mensaje: string
  aceptaPrivacidad: boolean
  aceptaComunicaciones: boolean
}

const SOLICITUDES = [
  { id: 'asistencia' as TipoSolicitud, label: 'Quiero solicitar mi asistencia al congreso', desc: 'Solicita tu plaza para asistir como participante al 3ICEO.' },
  { id: 'ponente' as TipoSolicitud, label: 'Quiero inscribirme como ponente', desc: 'Presenta tu investigación o experiencia ante la comunidad ambiental.' },
  { id: 'colaboracion' as TipoSolicitud, label: 'Quiero proponer una colaboración | ser aliado', desc: 'Explora cómo tu organización puede asociarse con el 3ICEO.' },
]

const TIPOS_ORG: TipoOrg[] = ['Universidad', 'Empresa privada', 'Administración pública', 'Persona independiente', 'Asociación / ONG', 'Otra organización']
const AREAS_TEMATICAS = ['Biodiversidad y ecosistemas', 'Cambio climático y adaptación', 'Economía circular y residuos', 'Energías renovables', 'Agua y saneamiento', 'Educación ambiental', 'Política y legislación ambiental', 'Innovación social verde', 'Comunidades indígenas y territorio', 'Otra área temática']
const TIPOS_COLABORACION = ['Patrocinio económico', 'Patrocinio en especie', 'Alianza institucional', 'Media partner / difusión', 'Colaboración académica', 'Voluntariado organizativo', 'Otro tipo de colaboración']

const S = {
  label: { fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 500, color: '#09344e', display: 'block', marginBottom: 6 } as React.CSSProperties,
  input: { width: '100%', height: 48, padding: '0 14px', borderRadius: 8, border: '1.5px solid #C3DED9', backgroundColor: '#fff', fontFamily: 'Poppins, sans-serif', fontSize: 15, color: '#12303E', outline: 'none', boxSizing: 'border-box' as const, transition: 'border-color 0.2s' } as React.CSSProperties,
  select: { width: '100%', height: 48, padding: '0 14px', borderRadius: 8, border: '1.5px solid #C3DED9', backgroundColor: '#fff', fontFamily: 'Poppins, sans-serif', fontSize: 14, color: '#12303E', outline: 'none', cursor: 'pointer', boxSizing: 'border-box' as const, appearance: 'auto' as const } as React.CSSProperties,
  textarea: { width: '100%', minHeight: 110, padding: '12px 14px', borderRadius: 8, border: '1.5px solid #C3DED9', backgroundColor: '#fff', fontFamily: 'Poppins, sans-serif', fontSize: 15, color: '#12303E', outline: 'none', boxSizing: 'border-box' as const, resize: 'vertical' as const } as React.CSSProperties,
  hint: { fontFamily: 'Poppins, sans-serif', fontSize: 11, color: '#097589', marginTop: 4, display: 'block' } as React.CSSProperties,
  optional: { fontFamily: 'Poppins, sans-serif', fontSize: 11, color: '#5A6E77', marginTop: 4, display: 'block' } as React.CSSProperties,
  error: { fontFamily: 'Poppins, sans-serif', fontSize: 11, color: '#A7170C', marginTop: 4, display: 'block' } as React.CSSProperties,
  field: { display: 'flex', flexDirection: 'column' as const, gap: 0 },
}

const INITIAL_FORM: Form = {
  tipoSolicitud: null, quiereStand: false, tituloPonencia: '', resumenPonencia: '', areaTematica: '',
  tipoColaboracion: '', descripcionColaboracion: '', email: '', nombre: '', tipoOrg: null,
  tipoOrgEspecifica: '', nombreOrg: '', puesto: '',
  codigoPais: 'CO',   // ← Colombia por defecto
  telefono: '',
  ubicacionPaisCode: '', ubicacionRegionCode: '', ubicacionCiudad: '',
  mensaje: '', aceptaPrivacidad: false, aceptaComunicaciones: false,
}

// Icono de ubicación reutilizable
function LocationIcon({ size = 14 }: { size?: number }) {
  return (
    <img
      src="/icons/icon-location.svg"
      alt=""
      width={size}
      height={size}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
    />
  )
}

export default function RegistroPage() {
  const [step, setStep] = useState<Step>(1)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState<Form>(INITIAL_FORM)
  const formRef = useRef<HTMLDivElement>(null)

  const regions = form.ubicacionPaisCode ? State.getStatesOfCountry(form.ubicacionPaisCode) : []
  const cities = form.ubicacionPaisCode && form.ubicacionRegionCode
    ? City.getCitiesOfState(form.ubicacionPaisCode, form.ubicacionRegionCode) : []

  const handleCountryChange = (isoCode: string) => {
    setForm(p => ({ ...p, ubicacionPaisCode: isoCode, ubicacionRegionCode: '', ubicacionCiudad: '', codigoPais: isoCode }))
  }

  const set = (k: keyof Form, v: string | boolean) => {
    setForm(p => ({ ...p, [k]: v }))
    setErrors(p => { const e = { ...p }; delete e[k]; return e })
  }

  const handleTipoChange = (tipo: TipoSolicitud) => {
    setForm(p => ({ ...p, tipoSolicitud: tipo, tituloPonencia: '', resumenPonencia: '', areaTematica: '', tipoColaboracion: '', descripcionColaboracion: '', quiereStand: false }))
    setErrors({})
  }

  const scrollToForm = () => setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)

  const validateStep1 = () => {
    if (!form.tipoSolicitud) { setErrors({ tipoSolicitud: 'Por favor selecciona una opción para continuar.' }); return false }
    return true
  }

  const validateStep2 = () => {
    const e: Record<string, string> = {}
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Introduce un email válido'
    if (!form.nombre.trim()) e.nombre = 'El nombre es requerido'
    if (!form.tipoOrg) e.tipoOrg = 'Selecciona el tipo de organización'
    if (form.tipoOrg === 'Otra organización' && !form.tipoOrgEspecifica.trim()) e.tipoOrgEspecifica = 'Especifica el tipo'
    if (!form.nombreOrg.trim()) e.nombreOrg = 'El nombre de la organización es requerido'
    if (!form.puesto.trim()) e.puesto = 'Tu puesto es requerido'
    if (!form.telefono.trim()) e.telefono = 'El teléfono es requerido'
    if (form.tipoSolicitud === 'ponente') {
      if (!form.tituloPonencia.trim()) e.tituloPonencia = 'El título de la ponencia es requerido'
      if (!form.areaTematica) e.areaTematica = 'Selecciona el área temática'
    }
    if (form.tipoSolicitud === 'colaboracion' && !form.tipoColaboracion) e.tipoColaboracion = 'Selecciona el tipo de colaboración'
    if (!form.aceptaPrivacidad) e.aceptaPrivacidad = 'Debes aceptar las políticas de privacidad'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async () => {
    if (!validateStep2()) return
    setSubmitting(true)
    try {
      await new Promise(r => setTimeout(r, 1200))
      setStep(3)
      scrollToForm()
    } finally { setSubmitting(false) }
  }

  const heroTitle = { asistencia: 'Solicitud de asistencia al Congreso', ponente: 'Inscripción como Ponente', colaboracion: 'Propuesta de Colaboración / Alianza' }
  const heroBadge = { asistencia: 'Asistencia', ponente: 'Ponente', colaboracion: 'Colaboración' }

  return (
    <div style={{ backgroundColor: '#E6F3EE', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* HERO */}
      <section style={{ paddingTop: 96, paddingBottom: 40, textAlign: 'center', background: 'linear-gradient(180deg, #E6F3EE 0%, #d8eee6 100%)', borderBottom: '1px solid rgba(9,52,78,0.06)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 24px' }}>
          <AnimatePresence>
            {form.tipoSolicitud && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, backgroundColor: '#097589', color: '#fff', borderRadius: 50, padding: '5px 16px', fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 600, letterSpacing: '0.04em', marginBottom: 16 }}>
                {heroBadge[form.tipoSolicitud]}
              </motion.div>
            )}
          </AnimatePresence>
          <h1 style={{ fontFamily: '"Gloock", Georgia, serif', fontSize: 'clamp(28px, 4.5vw, 44px)', fontWeight: 400, color: '#09344e', marginBottom: 16, lineHeight: 1.2 }}>
            <AnimatePresence mode="wait">
              <motion.span key={form.tipoSolicitud || 'default'} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} style={{ display: 'block' }}>
                {form.tipoSolicitud ? heroTitle[form.tipoSolicitud] : 'Formulario de Inscripción'}
              </motion.span>
            </AnimatePresence>
          </h1>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 16, color: '#437287', marginBottom: 10, lineHeight: 1.6 }}>
            Rellena los siguientes datos para formalizar tu solicitud ante el equipo del 3ICEO.
          </p>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 500, color: '#5A6E77', lineHeight: 1.5 }}>
            * El aforo es limitado. La solicitud no garantiza la plaza. Recibirás confirmación en 24h vía e-mail.
          </p>
        </div>
      </section>

      {/* FORM */}
      <section id="formulario-inscripcion" ref={formRef} style={{ flex: 1, padding: '40px 24px 80px' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <AnimatePresence mode="wait">

            {/* ── PASO 1 ── */}
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                <Card>
                  <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 22, fontWeight: 600, color: '#09344e', marginBottom: 6 }}>¿Qué necesitas?</h2>
                  <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 13, color: '#5A6E77', marginBottom: 24 }}>Selecciona una de estas opciones *</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {SOLICITUDES.map(s => (
                      <label key={s.id} onClick={() => handleTipoChange(s.id)}
                        style={{ display: 'flex', alignItems: 'flex-start', gap: 14, cursor: 'pointer', padding: '16px 18px', borderRadius: 10, border: `2px solid ${form.tipoSolicitud === s.id ? '#097589' : '#EFF4F7'}`, backgroundColor: form.tipoSolicitud === s.id ? '#f0faf8' : '#FAFCFC', transition: 'all 0.2s' }}>
                        <input type="radio" name="tipo" value={s.id} checked={form.tipoSolicitud === s.id} onChange={() => handleTipoChange(s.id)}
                          style={{ width: 18, height: 18, accentColor: '#097589', cursor: 'pointer', flexShrink: 0, marginTop: 2 }} />
                        <div>
                          <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 15, fontWeight: 500, color: '#09344e', marginBottom: 3 }}>{s.label}</div>
                          <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 12, color: '#5A6E77' }}>{s.desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.tipoSolicitud && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ ...S.error, marginTop: 12 }}>{errors.tipoSolicitud}</motion.span>}
                  <div style={{ marginTop: 28 }}>
                    <button onClick={() => { if (validateStep1()) { setStep(2); scrollToForm() } }}
                      style={{ padding: '13px 32px', borderRadius: 50, border: 'none', backgroundColor: '#097589', color: '#fff', fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8, letterSpacing: '0.04em', boxShadow: '0 2px 12px rgba(9,117,137,0.3)' }}
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#074954')}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#097589')}>
                      CONTINUAR
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5l7 7-7 7M5 12h14"/></svg>
                    </button>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* ── PASO 2 ── */}
            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                <Card>
                  <div style={{ marginBottom: 28 }}>
                    <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 18, fontWeight: 600, color: '#09344e', marginBottom: 10 }}>¿Qué necesitas?</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {SOLICITUDES.map(s => (
                        <label key={s.id} onClick={() => handleTipoChange(s.id)}
                          style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', padding: '10px 14px', borderRadius: 8, border: `1.5px solid ${form.tipoSolicitud === s.id ? '#097589' : '#EFF4F7'}`, backgroundColor: form.tipoSolicitud === s.id ? '#f0faf8' : 'transparent', transition: 'all 0.2s' }}>
                          <input type="radio" name="tipo2" value={s.id} checked={form.tipoSolicitud === s.id} onChange={() => handleTipoChange(s.id)}
                            style={{ width: 16, height: 16, accentColor: '#097589', flexShrink: 0 }} />
                          <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14, color: '#09344e', fontWeight: form.tipoSolicitud === s.id ? 500 : 400 }}>{s.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <Divider />

                  {/* Campos específicos por tipo */}
                  <AnimatePresence mode="wait">
                    {form.tipoSolicitud === 'asistencia' && (
                      <motion.div key="asistencia-fields" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                        <SectionTitle>Detalles de asistencia</SectionTitle>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', padding: '12px 14px', borderRadius: 8, border: '1.5px solid #EFF4F7', backgroundColor: form.quiereStand ? '#f0faf8' : 'transparent', marginBottom: 20 }}>
                          <input type="checkbox" checked={form.quiereStand} onChange={e => set('quiereStand', e.target.checked)} style={{ width: 16, height: 16, accentColor: '#097589', flexShrink: 0 }} />
                          <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 500, color: '#09344e' }}>Quiero solicitar un stand en el marketplace.</span>
                        </label>
                        <Divider />
                      </motion.div>
                    )}
                    {form.tipoSolicitud === 'ponente' && (
                      <motion.div key="ponente-fields" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                        <SectionTitle>Información de tu ponencia</SectionTitle>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 20 }}>
                          <div style={S.field}>
                            <label style={S.label}>Título de la ponencia *</label>
                            <input style={{ ...S.input, borderColor: errors.tituloPonencia ? '#A7170C' : '#C3DED9' }} type="text" placeholder="Ej: Restauración de ecosistemas en zonas áridas" value={form.tituloPonencia} onChange={e => set('tituloPonencia', e.target.value)} />
                            {errors.tituloPonencia ? <span style={S.error}>{errors.tituloPonencia}</span> : <span style={S.hint}>Requerido</span>}
                          </div>
                          <div style={S.field}>
                            <label style={S.label}>Área temática *</label>
                            <select style={{ ...S.select, borderColor: errors.areaTematica ? '#A7170C' : '#C3DED9' }} value={form.areaTematica} onChange={e => set('areaTematica', e.target.value)}>
                              <option value="">Selecciona un área temática</option>
                              {AREAS_TEMATICAS.map(a => <option key={a} value={a}>{a}</option>)}
                            </select>
                            {errors.areaTematica ? <span style={S.error}>{errors.areaTematica}</span> : <span style={S.hint}>Requerido</span>}
                          </div>
                          <div style={S.field}>
                            <label style={S.label}>Resumen de la ponencia</label>
                            <textarea style={{ ...S.textarea, minHeight: 130 }} placeholder="Describe brevemente el contenido, objetivos y relevancia..." value={form.resumenPonencia} onChange={e => set('resumenPonencia', e.target.value)} />
                            <span style={S.optional}>Opcional — recomendado para fortalecer tu candidatura</span>
                          </div>
                        </div>
                        <Divider />
                      </motion.div>
                    )}
                    {form.tipoSolicitud === 'colaboracion' && (
                      <motion.div key="colaboracion-fields" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                        <SectionTitle>Detalles de la colaboración</SectionTitle>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 20 }}>
                          <div style={S.field}>
                            <label style={S.label}>Tipo de colaboración *</label>
                            <select style={{ ...S.select, borderColor: errors.tipoColaboracion ? '#A7170C' : '#C3DED9' }} value={form.tipoColaboracion} onChange={e => set('tipoColaboracion', e.target.value)}>
                              <option value="">Selecciona el tipo de colaboración</option>
                              {TIPOS_COLABORACION.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                            {errors.tipoColaboracion ? <span style={S.error}>{errors.tipoColaboracion}</span> : <span style={S.hint}>Requerido</span>}
                          </div>
                          <div style={S.field}>
                            <label style={S.label}>Descripción de la propuesta</label>
                            <textarea style={{ ...S.textarea, minHeight: 130 }} placeholder="Describe qué ofrece tu organización y cómo imaginas esta colaboración..." value={form.descripcionColaboracion} onChange={e => set('descripcionColaboracion', e.target.value)} />
                            <span style={S.optional}>Opcional</span>
                          </div>
                        </div>
                        <Divider />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Datos de contacto */}
                  <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 18, fontWeight: 600, color: '#09344e', marginBottom: 6, textAlign: 'center' }}>Déjanos tus datos de contacto</h2>
                  <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 12, color: '#5A6E77', textAlign: 'center', marginBottom: 24 }}>Para ponernos en contacto contigo</p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                    <div style={S.field}>
                      <label style={S.label}>E-mail *</label>
                      <input style={{ ...S.input, borderColor: errors.email ? '#A7170C' : '#C3DED9' }} type="email" placeholder="correo@electronico.com" value={form.email} onChange={e => set('email', e.target.value)} />
                      {errors.email ? <span style={S.error}>{errors.email}</span> : <span style={S.hint}>Requerido</span>}
                    </div>

                    <div style={S.field}>
                      <label style={S.label}>Nombre y apellidos *</label>
                      <input style={{ ...S.input, borderColor: errors.nombre ? '#A7170C' : '#C3DED9' }} type="text" placeholder="Tu nombre completo" value={form.nombre} onChange={e => set('nombre', e.target.value)} />
                      {errors.nombre ? <span style={S.error}>{errors.nombre}</span> : <span style={S.hint}>Requerido</span>}
                    </div>

                    <div style={S.field}>
                      <label style={S.label}>Tipo de organización *</label>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                        {TIPOS_ORG.map(t => (
                          <label key={t} onClick={() => set('tipoOrg', t)}
                            style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', padding: '9px 12px', borderRadius: 8, border: `1.5px solid ${form.tipoOrg === t ? '#097589' : '#EFF4F7'}`, backgroundColor: form.tipoOrg === t ? '#f0faf8' : 'transparent', transition: 'all 0.2s' }}>
                            <input type="radio" name="tipoOrg" value={t} checked={form.tipoOrg === t} onChange={() => set('tipoOrg', t)} style={{ width: 14, height: 14, accentColor: '#097589', flexShrink: 0 }} />
                            <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 13, color: '#09344e', lineHeight: 1.3 }}>{t}</span>
                          </label>
                        ))}
                      </div>
                      {errors.tipoOrg ? <span style={S.error}>{errors.tipoOrg}</span> : <span style={S.hint}>Requerido</span>}
                      <AnimatePresence>
                        {form.tipoOrg === 'Otra organización' && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ marginTop: 10 }}>
                            <input style={S.input} type="text" placeholder="Especifica el tipo de organización" value={form.tipoOrgEspecifica} onChange={e => set('tipoOrgEspecifica', e.target.value)} />
                            {errors.tipoOrgEspecifica && <span style={S.error}>{errors.tipoOrgEspecifica}</span>}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div style={S.field}>
                      <label style={S.label}>Nombre de tu organización *</label>
                      <input style={{ ...S.input, borderColor: errors.nombreOrg ? '#A7170C' : '#C3DED9' }} type="text" placeholder="Ej: Universidad San Buenaventura" value={form.nombreOrg} onChange={e => set('nombreOrg', e.target.value)} />
                      {errors.nombreOrg ? <span style={S.error}>{errors.nombreOrg}</span> : <span style={S.hint}>Requerido</span>}
                    </div>

                    <div style={S.field}>
                      <label style={S.label}>Tu puesto dentro de la organización *</label>
                      <input style={{ ...S.input, borderColor: errors.puesto ? '#A7170C' : '#C3DED9' }} type="text" placeholder="Ej: Directora de Proyectos Ambientales" value={form.puesto} onChange={e => set('puesto', e.target.value)} />
                      {errors.puesto ? <span style={S.error}>{errors.puesto}</span> : <span style={S.hint}>Requerido</span>}
                    </div>

                    {/* Teléfono — Colombia por defecto */}
                    <div style={S.field}>
                      <label style={S.label}>Nº Teléfono *</label>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <PhoneCodeSelect value={form.codigoPais} onChange={v => set('codigoPais', v)} />
                        <input
                          style={{ ...S.input, borderColor: errors.telefono ? '#A7170C' : '#C3DED9', flex: 1, width: 'auto' }}
                          type="tel" placeholder="000 000 0000"
                          value={form.telefono} onChange={e => set('telefono', e.target.value)}
                        />
                      </div>
                      {errors.telefono ? <span style={S.error}>{errors.telefono}</span> : <span style={S.hint}>Requerido</span>}
                    </div>

                    {/* Ubicación — icon-location.svg en cada selector */}
                    <div style={S.field}>
                      <label style={S.label}>Ubicación</label>

                      {/* País */}
                      <CountrySelect
                        value={form.ubicacionPaisCode}
                        onChange={v => handleCountryChange(v)}
                        hasError={false}
                      />

                      <AnimatePresence>
                        {form.ubicacionPaisCode && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8 }}>

                            {/* Región / Estado */}
                            <div>
                              <div style={{ position: 'relative' }}>
                                <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', zIndex: 1, display: 'flex' }}>
                                  <LocationIcon size={14} />
                                </span>
                                <select
                                  value={form.ubicacionRegionCode}
                                  onChange={e => { set('ubicacionRegionCode', e.target.value); set('ubicacionCiudad', '') }}
                                  style={{ ...S.select, fontSize: 13, paddingLeft: 30 }}
                                  disabled={regions.length === 0}
                                >
                                  <option value="">Región / Estado</option>
                                  {regions.map(r => <option key={r.isoCode} value={r.isoCode}>{r.name}</option>)}
                                </select>
                              </div>
                              <span style={S.hint}>Requerido</span>
                            </div>

                            {/* Localidad */}
                            <div>
                              {form.ubicacionRegionCode ? (
                                cities.length > 0 ? (
                                  <div style={{ position: 'relative' }}>
                                    <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', zIndex: 1, display: 'flex' }}>
                                      <LocationIcon size={14} />
                                    </span>
                                    <select
                                      value={form.ubicacionCiudad}
                                      onChange={e => set('ubicacionCiudad', e.target.value)}
                                      style={{ ...S.select, fontSize: 13, width: '100%', paddingLeft: 30 }}
                                    >
                                      <option value="">Localidad</option>
                                      {cities.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                                    </select>
                                  </div>
                                ) : (
                                  <div style={{ position: 'relative' }}>
                                    <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', zIndex: 1, display: 'flex' }}>
                                      <LocationIcon size={14} />
                                    </span>
                                    <input
                                      type="text"
                                      value={form.ubicacionCiudad}
                                      onChange={e => set('ubicacionCiudad', e.target.value)}
                                      placeholder="Ciudad / Localidad"
                                      style={{ ...S.input, fontSize: 13, paddingLeft: 30 }}
                                    />
                                  </div>
                                )
                              ) : (
                                <div style={{ height: 48, display: 'flex', alignItems: 'center', gap: 8, padding: '0 12px', borderRadius: 8, border: '1.5px solid #E0E6E9', backgroundColor: '#F7F6F3', fontFamily: 'Poppins, sans-serif', fontSize: 13, color: '#9EADB4' }}>
                                  <LocationIcon size={14} />
                                  Primero elige región
                                </div>
                              )}
                              <span style={S.hint}>Requerido</span>
                            </div>

                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div style={S.field}>
                      <label style={S.label}>Mensaje adicional</label>
                      <textarea style={S.textarea}
                        placeholder={form.tipoSolicitud === 'asistencia' ? 'Alguna necesidad especial o comentario' : form.tipoSolicitud === 'ponente' ? 'Algo más que el comité deba saber' : 'Información adicional sobre tu propuesta'}
                        value={form.mensaje} onChange={e => set('mensaje', e.target.value)} />
                      <span style={S.optional}>Opcional</span>
                    </div>

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

                    <div style={{ display: 'flex', gap: 12, alignItems: 'center', paddingTop: 8 }}>
                      <button onClick={() => { setStep(1); scrollToForm() }}
                        style={{ padding: '12px 20px', borderRadius: 50, border: '1.5px solid #C3DED9', color: '#097589', backgroundColor: 'transparent', fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600, cursor: 'pointer', letterSpacing: '0.03em', display: 'flex', alignItems: 'center', gap: 6 }}>
                        Anterior
                      </button>
                      <button onClick={handleSubmit} disabled={submitting}
                        style={{ padding: '13px 32px', borderRadius: 50, border: 'none', backgroundColor: submitting ? '#74B4A7' : '#097589', color: '#fff', fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 700, cursor: submitting ? 'not-allowed' : 'pointer', letterSpacing: '0.04em', boxShadow: submitting ? 'none' : '0 2px 12px rgba(9,117,137,0.3)', display: 'flex', alignItems: 'center', gap: 8 }}>
                        {submitting ? (
                          <>
                            <span style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
                            ENVIANDO...
                          </>
                        ) : 'ENVIAR SOLICITUD'}
                      </button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* ── PASO 3 — Confirmación ── */}
            {step === 3 && (
              <motion.div key="s3" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
                <Card>
                  {/* Ilustración drop_hands + mensaje principal */}
                  <div style={{ textAlign: 'center', padding: '16px 16px 32px' }}>

                    {/* Imagen principal del Figma */}
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
                      <img
                        src="/icons/drop_hands.svg"
                        alt="Solicitud recibida"
                        style={{ width: 120, height: 120, objectFit: 'contain' }}
                      />
                    </div>

                    <h1 style={{ fontFamily: '"Gloock", Georgia, serif', fontSize: 'clamp(22px, 4vw, 34px)', fontWeight: 400, color: '#09344e', marginBottom: 16, lineHeight: 1.25 }}>
                      ¡Solicitud enviada con éxito!
                    </h1>
                    <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 16, color: '#437287', marginBottom: 8, lineHeight: 1.6 }}>
                      Hemos recibido tu solicitud de <strong style={{ color: '#09344e' }}>{form.tipoSolicitud === 'asistencia' ? 'asistencia' : form.tipoSolicitud === 'ponente' ? 'ponencia' : 'colaboración'}</strong>.
                    </p>
                    <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 15, color: '#437287', marginBottom: 4 }}>
                      Te hemos enviado una confirmación a{' '}
                      <strong style={{ color: '#097589' }}>{form.email}</strong>
                    </p>
                    <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14, color: '#5A6E77', marginBottom: 4 }}>
                      Te responderemos en un plazo aproximado de 24–48h.
                    </p>
                    <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 12, color: '#9EADB4', marginBottom: 32 }}>
                      Revisa también tu carpeta de spam.
                    </p>

                    {/* CTA principal */}
                    <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 17, fontWeight: 600, color: '#09344e', marginBottom: 20 }}>
                      Gracias por tu interés y ser parte del 3ICEO
                    </p>
                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 40 }}>
                      <Link href="/"
                        style={{ padding: '12px 24px', borderRadius: 50, border: '1.5px solid #C3DED9', color: '#097589', fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 600, textDecoration: 'none', letterSpacing: '0.03em' }}>
                        Volver al inicio
                      </Link>
                      <Link href="/marketing/donaciones"
                        style={{ padding: '12px 24px', borderRadius: 50, border: 'none', backgroundColor: '#B53077', color: '#fff', fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 700, textDecoration: 'none', letterSpacing: '0.03em', boxShadow: '0 2px 12px rgba(181,48,119,0.3)' }}>
                        Apoya el congreso
                      </Link>
                    </div>

                    {/* Divider */}
                    <div style={{ height: 1, backgroundColor: '#EFF4F7', margin: '0 -32px 32px' }} />

                    {/* Sección: Síguenos — follow.svg + RRSS */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
                      <img
                        src="/icons/follow.svg"
                        alt="Síguenos"
                        style={{ width: 80, height: 'auto', objectFit: 'contain' }}
                      />
                      <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 15, fontWeight: 600, color: '#09344e', margin: 0 }}>
                        Síguenos en redes para no perderte nada
                      </p>
                      <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                        {[
                          { src: '/icons/icon_instagram.svg', href: 'https://instagram.com/awaqong',          label: 'Instagram' },
                          { src: '/icons/icon_facebook.svg',  href: 'https://facebook.com/awaqong',           label: 'Facebook'  },
                          { src: '/icons/icon_linkedin.svg',  href: 'https://linkedin.com/company/awaq-ong',  label: 'LinkedIn'  },
                        ].map(({ src, href, label }) => (
                          <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                            style={{ width: 44, height: 44, borderRadius: '50%', backgroundColor: '#09344e', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background .2s, transform .2s' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#097589'; (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.1)' }}
                            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#09344e'; (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)' }}
                          >
                            <img src={src} alt={label} width={22} height={22} style={{ filter: 'brightness(0) invert(1)', display: 'block' }} />
                          </a>
                        ))}
                      </div>
                    </div>

                  </div>
                </Card>

                {/* Banner donación */}
                <div style={{ marginTop: 24, borderRadius: 12, overflow: 'hidden', backgroundColor: '#fff', display: 'grid', gridTemplateColumns: '1fr 200px', boxShadow: '2px 2px 16px rgba(9,52,78,0.1)' }} className="donation-banner">
                  <div style={{ padding: '36px 32px' }}>
                    <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 20, fontWeight: 700, color: '#09344e', marginBottom: 14, lineHeight: 1.3 }}>
                      ¡Gracias a tu donación, nadie se queda fuera!
                    </h3>
                    <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14, color: '#437287', marginBottom: 24, lineHeight: 1.7 }}>
                      El importe irá íntegramente destinado a cubrir alojamiento, transporte y dietas.
                    </p>
                    <Link href="/marketing/donaciones"
                      style={{ display: 'inline-block', padding: '11px 28px', borderRadius: 50, backgroundColor: '#B53077', color: '#fff', fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 700, textDecoration: 'none', letterSpacing: '0.04em' }}>
                      DONAR
                    </Link>
                  </div>
                  <div style={{ background: 'linear-gradient(135deg, #AEE5DA 0%, #74B4A7 50%, #097589 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src="/icons/drop_hands.svg" alt="" style={{ width: 80, height: 80, objectFit: 'contain', opacity: 0.85 }} />
                  </div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <style suppressHydrationWarning>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 600px) {
          .donation-banner { grid-template-columns: 1fr !important; }
          .donation-banner > div:last-child { display: none !important; }
        }
      `}</style>
    </div>
  )
}

function Card({ children }: { children: React.ReactNode }) {
  return <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: '32px', boxShadow: '2px 2px 24px rgba(9,52,78,0.08)', marginBottom: 20 }}>{children}</div>
}
function Divider() {
  return <div style={{ height: 1, backgroundColor: '#EFF4F7', margin: '24px -32px 24px' }} />
}
function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 16, fontWeight: 600, color: '#09344e', marginBottom: 16, paddingLeft: 10, borderLeft: '3px solid #097589' }}>{children}</h3>
}
