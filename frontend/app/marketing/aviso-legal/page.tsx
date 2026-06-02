// frontend/app/marketing/aviso-legal/page.tsx
import HeroIceo from '@/components/sections/HeroIceo'
import SectionDonacion from '@/components/sections/SectionDonacion'
import SectionRedes from '@/components/sections/SectionRedes'

const SECTIONS = [
  {
    title: 'Datos identificativos',
    content: `En cumplimiento con el deber de información recogido en artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico, la empresa titular de dominio web es Awaq ONGD, con domicilio a estos efectos en c/Doctor Torres Feced 20, casa 19 – 28770 Colmenar Viejo (España), número de C.I.F.: G-54253885, inscrita en el Registro Nacional de Asociaciones con el nº 58891 del Ministerio del Interior, Gobierno de España.

Correo electrónico de contacto: info@somosawaq.org`,
  },
  {
    title: 'Usuarios',
    content: `El acceso y/o uso de este portal de Awaq atribuye la condición de USUARIO, que acepta, desde dicho acceso y/o uso, las Condiciones Generales de Uso aquí reflejadas. La utilización del sitio Web le otorga la condición de Usuario, e implica la aceptación completa de todas las cláusulas y condiciones de uso incluidas en las páginas de Aviso legal, Política de privacidad y Política de cookies.`,
  },
  {
    title: 'Uso del portal',
    content: `www.somosawaq.org proporciona el acceso a multitud de informaciones, servicios, programas o datos en Internet pertenecientes a Awaq o a sus licenciantes. El USUARIO asume la responsabilidad del uso del portal, comprometiéndose a hacer un uso adecuado de los contenidos y servicios y a no emplearlos para (i) incurrir en actividades ilícitas, ilegales o contrarias a la buena fe y al orden público; (ii) difundir contenidos o propaganda de carácter racista, xenófobo, pornográfico-ilegal, de apología del terrorismo o atentatorio contra los derechos humanos; (iii) provocar daños en los sistemas físicos y lógicos de Awaq, de sus proveedores o de terceras personas.`,
  },
  {
    title: 'Contenidos',
    content: `El Titular ha obtenido la información, el contenido multimedia y los materiales incluidos en el sitio Web de fuentes que considera fiables, pero, si bien ha tomado todas las medidas razonables para asegurar que la información contenida es correcta, el Titular no garantiza que sea exacta, completa o actualizada. Queda prohibido transmitir o enviar a través del sitio Web cualquier contenido ilegal o ilícito, virus informáticos, o mensajes que afecten o violen derechos del Titular o de terceros.`,
  },
  {
    title: 'Propiedad intelectual e industrial',
    content: `Awaq por sí o como cesionaria, es titular de todos los derechos de propiedad intelectual e industrial de su página web, así como de los elementos contenidos en la misma: a título enunciativo, imágenes, sonido, audio, vídeo, software o textos; marcas o logotipos, combinaciones de colores, estructura y diseño. Todos los derechos reservados.

Queda expresamente prohibida la reproducción, la distribución y la comunicación pública, incluida su modalidad de puesta a disposición, de la totalidad o parte de los contenidos de esta página web, con fines comerciales, en cualquier soporte y por cualquier medio técnico, sin la autorización de Awaq.`,
  },
  {
    title: 'Exclusión de garantías y responsabilidad',
    content: `Awaq no se hace responsable, en ningún caso, de los daños y perjuicios de cualquier naturaleza que pudieran ocasionar: errores u omisiones en los contenidos, falta de disponibilidad del portal o la transmisión de virus o programas maliciosos o lesivos en los contenidos, caídas de la red, pérdidas de negocio a consecuencia de dichas caídas, suspensiones temporales de fluido eléctrico o cualquier otro tipo de daño indirecto causado por causas ajenas al Titular.`,
  },
  {
    title: 'Legislación aplicable y jurisdicción',
    content: `La relación entre Awaq y el USUARIO se regirá por la normativa española vigente y cualquier controversia se someterá a los Juzgados y Tribunales de la ciudad de Madrid.

Awaq ONGD, domicilio en c/Doctor Torres Feced 20, casa 19 – 28770 Colmenar Viejo (España), inscrita en el Registro Nacional de Asociaciones con el nº 58891 del Ministerio del Interior, Gobierno de España. Inscrita en el registro de ONGDs de la AECID con el número nº 3288.`,
  },
]

export default function AvisoLegalPage() {
  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <HeroIceo
        badge="Awaq ONGD · Legal"
        title={<>Aviso <span style={{ color: '#ffffff' }}>Legal</span></>}
        description={<>Condiciones generales de uso del sitio web<br />www.somosawaq.org y sus subdominios</>}
        cta={{ label: 'CONTACTAR →', href: 'mailto:info@somosawaq.org' }}
        image="/icons/lineas_tematicas.svg"
        imageAlt="Aviso legal"
        imageScale={1.30}
        waveVariant="default"
        waveColor="#ffffff"
      />

      <section style={{ backgroundColor: '#ffffff', padding: '72px 48px 96px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          {SECTIONS.map((s, i) => (
            <div key={i} style={{ marginBottom: 52 }}>
              <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(18px, 2vw, 22px)', fontWeight: 700, color: '#09344e', marginBottom: 16, paddingBottom: 12, borderBottom: '1.5px solid #E6F3EE', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {s.title}
              </h2>
              {s.content.split('\n\n').map((para, j) => (
                <p key={j} style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#3A4E58', lineHeight: 1.8, marginBottom: 14, whiteSpace: 'pre-line' }}>
                  {para}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ══ 4. DONACIÓN ═══════════════════════════════════════════════════════ */}
            <SectionDonacion bg="#09344e" theme="dark" showTopWave={true} topWaveFrom="#ffffff" waveColor="#ffffff" showWave={true} />
            
            {/* ══ 5. REDES ══════════════════════════════════════════════════════════ */}
           <SectionRedes bg="#ffffff" theme="light" />
    </div>
  )
}
