'use client'

/**
 * SectionRedes — versión unificada basada en home/page.tsx sección 12
 * Ruta: frontend/components/sections/SectionRedes.tsx
 *
 * PROPS:
 *  bg       → color de fondo de la sección. Default: '#ffffff'
 *  theme    → 'light' | 'dark'  adapta título y párrafo al fondo
 */

import { motion } from 'framer-motion'

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
  >
    {children}
  </motion.div>
)

export interface SectionRedesProps {
  bg?: string
  theme?: 'light' | 'dark'
}

export default function SectionRedes({
  bg = '#ffffff',
  theme = 'light',
}: SectionRedesProps) {

  const title  = theme === 'light' ? '#09344e' : '#ffffff'
  const body   = theme === 'light' ? '#5A6E77' : 'rgba(255,255,255,0.65)'
  const cardBg = theme === 'light' ? '#fff'    : 'rgba(255,255,255,0.08)'
  const cardBorder = theme === 'light' ? '#D9DEE2' : 'rgba(255,255,255,0.15)'
  const cardText   = theme === 'light' ? '#12303E' : '#ffffff'
  const arrow      = theme === 'light' ? '#097589' : '#74B4A7'

  return (
    <section style={{ backgroundColor: bg, padding: '64px 48px 80px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}
          className="follow-grid"
        >
          {/* ── Izquierda: texto + botones ── */}
          <FadeIn>
            <h2 style={{
              fontFamily: 'Gloock, Georgia, serif', fontWeight: 400,
              fontSize: 'clamp(26px,3vw,38px)',
              color: title, lineHeight: 1.2, marginBottom: 12,
            }}>
              ¡Pásate por nuestras Redes Sociales y síguenos!
            </h2>
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: 14,
              color: body, lineHeight: 1.7, marginBottom: 28,
            }}>
              Publicamos contenido acerca de la labor que hacemos, podrás conocer proyectos y a nosotros más a fondo.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}>
              {[
                { label: 'Instagram', bg: '#E1306C', href: 'https://instagram.com/awaqongd',       iconSrc: 'https://pub-94aa83314f8a41088bff3c1130d43ebd.r2.dev/3ICEO/ui/instagram.svg' },
                { label: 'Facebook',  bg: '#1877F2', href: 'https://facebook.com/somosawaq',        iconSrc: 'https://pub-94aa83314f8a41088bff3c1130d43ebd.r2.dev/3ICEO/ui/facebook.svg'  },
                { label: 'LinkedIn',  bg: '#0A66C2', href: 'https://www.linkedin.com/company/awaq-ongd/', iconSrc: 'https://pub-94aa83314f8a41088bff3c1130d43ebd.r2.dev/3ICEO/ui/linkedin.svg'  },
              ].map(({ label, bg: redBg, href, iconSrc }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    backgroundColor: cardBg,
                    border: `1.5px solid ${cardBorder}`,
                    borderRadius: 10, padding: '13px 18px',
                    textDecoration: 'none',
                    boxShadow: theme === 'light' ? '2px 2px 8px rgba(9,52,78,0.06)' : 'none',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 8,
                      backgroundColor: redBg,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <img src={iconSrc} alt={label} width={18} height={18}
                        style={{ display: 'block', filter: 'brightness(0) invert(1)' }} />
                    </div>
                    <span style={{
                      fontFamily: 'Poppins, sans-serif', fontSize: 14,
                      fontWeight: 600, color: cardText,
                    }}>
                      {label}
                    </span>
                  </div>
                  <span style={{ color: arrow, fontSize: 15, fontWeight: 600 }}>→</span>
                </a>
              ))}
            </div>
          </FadeIn>

          {/* ── Derecha: caja teal con follow.svg — exactamente igual que home ── */}
          <FadeIn delay={0.12}>
            <div style={{
              borderRadius: 20, overflow: 'hidden',
              backgroundColor: '#74B4A7',
              padding: '40px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              minHeight: 280,
              boxShadow: '4px 4px 24px rgba(9,52,78,0.12)',
            }}>
              <img
                src="https://pub-94aa83314f8a41088bff3c1130d43ebd.r2.dev/3ICEO/ui/follow.svg"
                alt="Follow us on social media"
                style={{ width: '100%', maxWidth: 320, height: 'auto', display: 'block' }}
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
