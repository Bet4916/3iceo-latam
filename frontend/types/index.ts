// ─── Congreso ──────────────────────────────────────────────────

export type TipoAsistente = 'asistente' | 'ponente' | 'expositor_marketplace' | 'prensa'

export interface Speaker {
  id: string
  nombre: string
  apellido: string
  cargo: string
  organizacion: string
  pais: string
  foto?: string
  bio?: string
  lineaTematica?: LineaTematica
  sesiones?: string[]
}

export interface SesionAgenda {
  id: string
  titulo: string
  descripcion?: string
  fecha: string           // ISO date string
  horaInicio: string      // "09:00"
  horaFin: string         // "10:30"
  lugar: string
  tipo: 'conferencia' | 'taller' | 'panel' | 'inauguracion' | 'clausura'
  ponentes?: Speaker[]
  lineaTematica?: LineaTematica
}

export type LineaTematica =
  | 'biodiversidad'
  | 'cambio_climatico'
  | 'economia_circular'
  | 'educacion_ambiental'
  | 'gobernanza'
  | 'tecnologia_verde'

// ─── Formulario de inscripción ─────────────────────────────────

export interface FormInscripcionBase {
  nombres: string
  apellidos: string
  email: string
  telefono: string
  pais: string
  ciudad: string
  organizacion: string
  cargo: string
  tipo: TipoAsistente
  terminosAceptados: boolean
  politicaPrivacidad: boolean
}

export interface FormAsistente extends FormInscripcionBase {
  tipo: 'asistente'
  comoSeEntero?: string
  necesidadesEspeciales?: string
}

export interface FormPonente extends FormInscripcionBase {
  tipo: 'ponente'
  tituloProyecto: string
  lineaTematica: LineaTematica
  resumenProyecto: string
  experienciaPrevia?: string
  necesitaApoyo: boolean
}

export type FormInscripcion = FormAsistente | FormPonente

// ─── Donaciones ────────────────────────────────────────────────

export interface FormDonacion {
  monto: number | 'personalizado'
  montoPersonalizado?: number
  nombre: string
  email: string
  mensajeOpcional?: string
  anonimo: boolean
}

// ─── Patrocinadores ────────────────────────────────────────────

export type NivelPatrocinio = 'platino' | 'oro' | 'plata' | 'bronce' | 'colaborador'

export interface Patrocinador {
  id: string
  nombre: string
  logo: string
  nivel: NivelPatrocinio
  url?: string
  descripcion?: string
}

// ─── Marketplace ───────────────────────────────────────────────

export interface StandMarketplace {
  id: string
  organizacion: string
  descripcion: string
  categorias: string[]
  imagen?: string
  contacto: string
  url?: string
}

// ─── Comunicaciones ────────────────────────────────────────────

export interface Noticia {
  id: string
  titulo: string
  resumen: string
  contenido?: string
  fecha: string
  imagen?: string
  categoria: 'noticias' | 'comunicados' | 'multimedia' | 'recursos'
  autor?: string
  url?: string
}

// ─── UI genéricos ──────────────────────────────────────────────

export interface NavLink {
  label: string
  href: string
  icon?: string
}

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export type InputState = 'default' | 'focus' | 'error' | 'disabled' | 'success'
