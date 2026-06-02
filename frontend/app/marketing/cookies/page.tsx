// frontend/app/marketing/cookies/page.tsx
import HeroIceo from '@/components/sections/HeroIceo'
import SectionDonacion from '@/components/sections/SectionDonacion'
import SectionRedes from '@/components/sections/SectionRedes'

const COOKIES_TABLE = [
  { nombre: 'cf_clearance', tipo: 'Propia', duracion: '1 año', finalidad: 'Seguridad y verificación de navegador.' },
  { nombre: 'hasConsent',   tipo: 'Técnica', duracion: '1 año', finalidad: 'Almacena el consentimiento del usuario sobre el uso de cookies.' },
]

const BROWSERS = [
  { nombre: 'Firefox',          url: 'http://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-que-los-sitios-we' },
  { nombre: 'Google Chrome',    url: 'https://support.google.com/chrome/answer/95647?hl=es' },
  { nombre: 'Internet Explorer',url: 'https://support.microsoft.com/es-es/help/17442/windows-internet-explorer-delete-manage-cookies' },
  { nombre: 'Microsoft Edge',   url: 'https://support.microsoft.com/es-es/help/4468242/microsoft-edge-browsing-data-and-privacy' },
  { nombre: 'Safari',           url: 'http://support.apple.com/kb/HT1677?viewlocale=es_ES' },
]

export default function CookiesPage() {
  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <HeroIceo
        badge="Awaq ONGD · Legal"
        title={<>Política de <span style={{ color: '#ffffff' }}>Cookies</span></>}
        description={<>Información sobre las cookies que utilizamos<br />y cómo puedes gestionarlas</>}
        cta={{ label: 'CONTACTAR →', href: 'mailto:info@somosawaq.org' }}
        image="/icons/lineas_tematicas.svg"
        imageAlt="Política de cookies"
        imageScale={1.30}
        waveVariant="default"
        waveColor="#ffffff"
      />

      <section style={{ backgroundColor: '#ffffff', padding: '72px 48px 96px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>

          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, color: '#5A6E77', lineHeight: 1.8, marginBottom: 48, borderLeft: '3px solid #097589', paddingLeft: 20 }}>
            En cumplimiento con el artículo 22 de la Ley 34/2002 (LSSI), el Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD), Awaq pone a disposición de los usuarios la Política de recogida y tratamiento de cookies del sitio Web.
          </p>

          {/* ¿Qué son las cookies? */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(18px, 2vw, 22px)', fontWeight: 700, color: '#09344e', marginBottom: 16, paddingBottom: 12, borderBottom: '1.5px solid #E6F3EE' }}>
              ¿Qué son las Cookies?
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#3A4E58', lineHeight: 1.8 }}>
              Una Cookie es un fichero que se descarga en su ordenador al entrar a determinadas páginas web. Las cookies permiten a una página web, entre otras cosas, almacenar y recuperar información sobre sus hábitos de navegación y —dependiendo de la información que contengan y de la forma en que utilice su equipo— pueden utilizarse para identificarle.
            </p>
          </div>

          {/* Tipos */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(18px, 2vw, 22px)', fontWeight: 700, color: '#09344e', marginBottom: 16, paddingBottom: 12, borderBottom: '1.5px solid #E6F3EE' }}>
              Cookies utilizadas en el sitio Web
            </h2>
            {[
              { subtitle: 'Según la entidad que las gestiona', items: [
                '**Cookies propias:** Son aquellas enviadas y gestionadas directamente por Awaq.',
                '**Cookies de terceros:** Instaladas por un dominio/servidor de terceros. Tienen múltiples finalidades, como hacer un seguimiento de las actividades de navegación de los usuarios.',
              ]},
              { subtitle: 'Según su finalidad', items: [
                '**Cookies técnicas:** Permiten a los usuarios registrados navegar a través del sitio Web y a utilizar sus diferentes funciones.',
                '**Cookies de personalización:** Permiten a los usuarios acceder al Servicio con algunas características de carácter general predefinidas.',
              ]},
              { subtitle: 'Según su duración', items: [
                '**Cookies de sesión:** Diseñadas para recabar y almacenar datos mientras el usuario accede al sitio Web.',
                '**Cookies persistentes:** Los datos siguen almacenados en el terminal del usuario y pueden ser accedidos durante un período definido.',
              ]},
            ].map((g, i) => (
              <div key={i} style={{ marginBottom: 24 }}>
                <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 15, fontWeight: 600, color: '#097589', marginBottom: 10 }}>{g.subtitle}</h3>
                {g.items.map((item, j) => (
                  <p key={j} style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#3A4E58', lineHeight: 1.7, marginBottom: 8, paddingLeft: 12 }}>
                    {item.replace(/\*\*(.*?)\*\*/g, '$1')}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {/* Tabla de cookies */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(18px, 2vw, 22px)', fontWeight: 700, color: '#09344e', marginBottom: 16, paddingBottom: 12, borderBottom: '1.5px solid #E6F3EE' }}>
              Listado de cookies utilizadas
            </h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Inter, sans-serif', fontSize: 14 }}>
                <thead>
                  <tr style={{ backgroundColor: '#09344e' }}>
                    {['Nombre', 'Tipo', 'Duración', 'Finalidad'].map(h => (
                      <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: '#fff', fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 13 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COOKIES_TABLE.map((row, i) => (
                    <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#F7F6F3' : '#ffffff' }}>
                      <td style={{ padding: '12px 16px', color: '#09344e', fontWeight: 600 }}>{row.nombre}</td>
                      <td style={{ padding: '12px 16px', color: '#5A6E77' }}>{row.tipo}</td>
                      <td style={{ padding: '12px 16px', color: '#5A6E77' }}>{row.duracion}</td>
                      <td style={{ padding: '12px 16px', color: '#3A4E58' }}>{row.finalidad}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Eliminación de cookies */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(18px, 2vw, 22px)', fontWeight: 700, color: '#09344e', marginBottom: 16, paddingBottom: 12, borderBottom: '1.5px solid #E6F3EE' }}>
              Eliminación de cookies
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#3A4E58', lineHeight: 1.8, marginBottom: 20 }}>
              Usted puede aceptar, bloquear o eliminar las cookies instaladas en su equipo mediante la configuración de las opciones del navegador, pero parte del sitio no funcionará correctamente o su calidad puede verse afectada.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {BROWSERS.map(b => (
                <a key={b.nombre} href={b.url} target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14, color: '#097589', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}
                >
                  <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#097589', flexShrink: 0, display: 'inline-block' }} />
                  {b.nombre}
                </a>
              ))}
            </div>
          </div>

          <div style={{ backgroundColor: '#E6F3EE', borderRadius: 12, padding: '24px 28px' }}>
            <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600, color: '#097589', marginBottom: 6 }}>Contacto</p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#3A4E58', lineHeight: 1.7 }}>
              Awaq ONGD · C/Doctor Torres Feced 20, casa 19 – 28770 Colmenar Viejo (España)<br />
              info@somosawaq.org
            </p>
          </div>
        </div>
      </section>

      {/* ══ 4. DONACIÓN ═══════════════════════════════════════════════════════ */}
            <SectionDonacion bg="#09344e" theme="dark" showTopWave={true} topWaveFrom="#ffffff" waveColor="#ffffff" showWave={true} />
            
      {/* ══ 5. REDES ══════════════════════════════════════════════════════════ */}
      <SectionRedes bg="#ffffff" theme="light" />
    </div>
  )
}
