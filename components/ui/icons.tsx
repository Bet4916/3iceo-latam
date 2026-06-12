// components/ui/icons.tsx
// Iconos del proyecto 3ICEO
// - Heroicons (chevron, search, menu, close, heart, etc) — son los mismos del Figma
// - Social media SVGs reales (Instagram, Facebook, LinkedIn, PayPal, YouTube)
// - Iconos custom del Figma (location, streaming, bed, bus, cutlery)
// Uso: import { IconSearch, IconInstagram, IconBed } from '@/components/ui/icons'

interface IconProps {
  size?: number
  color?: string
  className?: string
}

// ─── HEROICONS (mismos que en el Figma design system) ─────────────────────────

export function IconChevronDown({ size = 16, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 9l6 6 6-6"/>
    </svg>
  )
}

export function IconChevronUp({ size = 16, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 15l-6-6-6 6"/>
    </svg>
  )
}

export function IconChevronLeft({ size = 16, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 18l-6-6 6-6"/>
    </svg>
  )
}

export function IconChevronRight({ size = 16, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 18l6-6-6-6"/>
    </svg>
  )
}

export function IconSearch({ size = 20, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="11" cy="11" r="8"/>
      <path d="m21 21-4.35-4.35"/>
    </svg>
  )
}

export function IconClose({ size = 20, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 6 6 18M6 6l12 12"/>
    </svg>
  )
}

export function IconMenu({ size = 22, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="4" x2="20" y1="6" y2="6"/>
      <line x1="4" x2="20" y1="12" y2="12"/>
      <line x1="4" x2="20" y1="18" y2="18"/>
    </svg>
  )
}

export function IconArrowRight({ size = 16, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  )
}

export function IconArrowDown({ size = 16, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 5v14M5 12l7 7 7-7"/>
    </svg>
  )
}

export function IconCalendar({ size = 18, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
      <line x1="16" x2="16" y1="2" y2="6"/>
      <line x1="8" x2="8" y1="2" y2="6"/>
      <line x1="3" x2="21" y1="10" y2="10"/>
    </svg>
  )
}

export function IconFilter({ size = 18, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
    </svg>
  )
}

export function IconRefresh({ size = 18, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
      <path d="M21 3v5h-5"/>
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
      <path d="M8 16H3v5"/>
    </svg>
  )
}

export function IconExternalLink({ size = 16, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" x2="21" y1="14" y2="3"/>
    </svg>
  )
}

export function IconPDF({ size = 20, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" x2="8" y1="13" y2="13"/>
      <line x1="16" x2="8" y1="17" y2="17"/>
      <polyline points="10 9 9 9 8 9"/>
    </svg>
  )
}

// ─── ICONOS CUSTOM DEL FIGMA ──────────────────────────────────────────────────

// icon/location — pin de mapa estilo Figma
export function IconLocation({ size = 20, color = '#097589', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill={color} opacity="0.2"/>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke={color} strokeWidth="1.5" fill="none"/>
      <circle cx="12" cy="9" r="2.5" fill={color}/>
    </svg>
  )
}

// icon/streaming — play button / broadcast
export function IconStreaming({ size = 20, color = '#097589', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5"/>
      <path d="M10 8l6 4-6 4V8z" fill={color}/>
    </svg>
  )
}

// icon/bed — alojamiento
export function IconBed({ size = 20, color = '#09344e', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M3 7v11M21 7v11" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M3 16h18" stroke={color} strokeWidth="1.5"/>
      <path d="M3 10h18" stroke={color} strokeWidth="1.5"/>
      <rect x="7" y="10" width="4" height="4" rx="1" fill={color} opacity="0.5"/>
      <rect x="13" y="10" width="4" height="4" rx="1" fill={color} opacity="0.5"/>
    </svg>
  )
}

// icon/bus — transporte
export function IconBus({ size = 20, color = '#09344e', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="5" width="18" height="13" rx="2" stroke={color} strokeWidth="1.5"/>
      <path d="M3 10h18" stroke={color} strokeWidth="1.5"/>
      <circle cx="7.5" cy="19" r="1.5" fill={color}/>
      <circle cx="16.5" cy="19" r="1.5" fill={color}/>
      <path d="M3 13h18" stroke={color} strokeWidth="1.5"/>
      <path d="M8 5V3M16 5V3" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

// icon/cutlery — dieta
export function IconCutlery({ size = 20, color = '#09344e', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M3 2v7c0 1.1.9 2 2 2h1v11h2V11h1c1.1 0 2-.9 2-2V2" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M7 2v4" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M18 2a5 5 0 0 1 2 4v6h-4v8h-2V2h4z" fill={color} opacity="0.2" stroke={color} strokeWidth="1.5"/>
    </svg>
  )
}

// ─── REDES SOCIALES (logos reales) ────────────────────────────────────────────

export function IconInstagram({ size = 22, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  )
}

export function IconFacebook({ size = 22, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  )
}

export function IconLinkedin({ size = 22, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

export function IconYoutube({ size = 22, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  )
}

export function IconPaypal({ size = 22, color = 'currentColor', className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
      <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.26-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.477z"/>
    </svg>
  )
}

// ─── AWAQ LOGO (versión SVG fiel al Figma) ───────────────────────────────────

interface LogoProps {
  size?: number
  variant?: 'color' | 'white'
}

export function AwaqLogo({ size = 44, variant = 'color' }: LogoProps) {
  const textColor = variant === 'white' ? '#ffffff' : '#12303E'
  const imgSrc = variant === 'white' ? '/images/logo-awaq-white.png' : '/images/logo-awaq.png'

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {/* Intenta cargar la imagen descargada del Figma, fallback a SVG manual */}
      <img
        src={imgSrc}
        alt="AWAQ logo"
        width={size}
        height={size}
        style={{ objectFit: 'contain' }}
        onError={(e) => {
          // Fallback si no está descargado aún
          const target = e.currentTarget as HTMLImageElement
          target.style.display = 'none'
          const next = target.nextElementSibling as HTMLElement
          if (next) next.style.display = 'flex'
        }}
      />
      {/* Fallback SVG */}
      <div style={{ display: 'none', width: size, height: size, borderRadius: '50%', backgroundColor: '#E6F3EE', alignItems: 'center', justifyContent: 'center' }}>
        <svg width={size * 0.65} height={size * 0.65} viewBox="0 0 32 32" fill="none">
          <path d="M16 4C10 4 6 8.5 6 13.5c0 3 2 6 4 8.5L16 28l6-6c2-2.5 4-5.5 4-8.5C26 8.5 22 4 16 4z" fill="#03A383" opacity="0.3"/>
          <path d="M16 6c-4.4 0-8 3.6-8 8 0 2.8 1.6 5.4 3.5 7.5L16 26l4.5-4.5C22.4 19.4 24 16.8 24 14c0-4.4-3.6-8-8-8z" fill="#03A383" opacity="0.6"/>
          <path d="M16 8c-3.3 0-6 2.7-6 6 0 1.8 1 3.5 2.2 5L16 23l3.8-4c1.2-1.5 2.2-3.2 2.2-5 0-3.3-2.7-6-6-6z" fill="#097589"/>
          <circle cx="16" cy="14" r="3" fill="#AEE5DA"/>
        </svg>
      </div>
      <span style={{
        fontFamily: 'Poppins, sans-serif', fontWeight: 700,
        fontSize: size * 0.42, color: textColor,
        letterSpacing: '0.02em', lineHeight: 1,
      }}>
        AWAQ
      </span>
    </div>
  )
}
