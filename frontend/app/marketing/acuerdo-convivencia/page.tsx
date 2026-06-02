// frontend/app/marketing/acuerdo-convivencia/page.tsx
import HeroIceo from '@/components/sections/HeroIceo'
import SectionDonacion from '@/components/sections/SectionDonacion'
import SectionRedes from '@/components/sections/SectionRedes'

const PRINCIPIOS = [
  { title: 'Respeto mutuo', desc: 'El fomentar el respeto mutuo entre los participantes y el personal de operaciones de AWAQ ONGD es el pilar fundamental para el desarrollo del congreso. Quienes se dirigirán hacia todos los participantes, ponentes y organizadores con respeto y consideración, independientemente de su cargo, origen étnico, género, orientación sexual, edad o afiliación institucional.' },
  { title: 'Escucha Activa', desc: 'Bajo el entendido de que todas las personas tienen el derecho a que se les brinde máxima atención al hablar, las participantes escucharán atentamente a los demás, respetando sus opiniones, incluso si difieren de la propia, y no interrumpirán mientras hablan siempre esperando el turno para expresar ideas adicionales.' },
  { title: 'Inclusión', desc: 'Es el objetivo del Congreso integrar a la mayor cantidad de perfiles y diversidades posible, por lo que se fomentará la diversidad e inclusión, reconociendo y valorando las diferentes perspectivas y experiencias de los participantes.' },
  { title: 'Puntualidad', desc: 'El ser puntuales en todas las actividades y sesiones programadas del congreso, demostrando así respeto por el tiempo de los demás y para no interrumpir el flujo del evento.' },
  { title: 'Participación Activa', desc: 'A beneficio de todas y todos los involucrados la participación activa será la meta, con el objetivo de promover un enriquecedor intercambio de ideas y debate constructivo.' },
  { title: 'Uso adecuado de las instalaciones', desc: 'El utilizar las instalaciones del congreso de manera adecuada, cuidando de las mismas y manteniendo un ambiente limpio y ordenado.' },
  { title: 'Colaboración', desc: 'Fomentar la colaboración entre organizaciones y participantes, estableciendo contactos de manera profesional y buscando oportunidades para crecer y trabajar juntos en iniciativas comunes.' },
  { title: 'Confidencialidad', desc: 'Es posible que durante el evento información sensible sea compartida. Como parte de la actitud integral de todos los involucrados, existe el compromiso a respetar la confidencialidad a la información delicada, sensible y/o privada.' },
  { title: 'Uso responsable de la tecnología', desc: 'El utilizar de manera adecuada los dispositivos electrónicos (teléfonos móviles, cámaras fotográficas o de video) de manera responsable durante las sesiones para no distraer ni interrumpir.' },
  { title: 'Vestimenta apropiada', desc: 'Se espera que todas y todos los participantes vistan al evento de manera apropiada portando prendas consideradas de carácter profesional y formal de acuerdo con los estándares de los congresos internacionales.' },
  { title: 'Cumplimiento de normativas', desc: 'Es imperativo el cumplimiento con el reglamento interno de la institución anfitriona del evento, las leyes y regulaciones del país anfitrión y las demás normativas internacionales aplicables.' },
]

export default function AcuerdoConvivenciaPage() {
  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <HeroIceo
        badge="2° ICEO LATAM · Convivencia"
        title={<>Acuerdo de <span style={{ color: '#ffffff' }}>Convivencia</span></>}
        description={<>Principios que garantizan un ambiente respetuoso,<br />colaborativo y productivo en el congreso</>}
        cta={{ label: 'VER AGENDA →', href: '/marketing/agenda' }}
        image="/icons/lineas_tematicas.svg"
        imageAlt="Acuerdo de convivencia"
        imageScale={1.30}
        waveVariant="default"
        waveColor="#ffffff"
      />

      <section style={{ backgroundColor: '#ffffff', padding: '72px 48px 96px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>

          {/* Preámbulo */}
          <div style={{ backgroundColor: '#E6F3EE', borderRadius: 16, padding: '28px 32px', marginBottom: 56 }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, color: '#09344e', lineHeight: 1.8 }}>
              Unidos en la búsqueda de un objetivo común como lo es la protección del medioambiente, las y los participantes del <strong>"2ndo Congreso Internacional de Organizaciones Ambientales 2025"</strong> se comprometen a comportarse con el máximo apego a los principios plasmados en el presente Acuerdo de Convivencia, los cuales son fundamentales para garantizar un ambiente respetuoso, colaborativo y productivo.
            </p>
          </div>

          {/* Principios */}
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(20px, 2.2vw, 26px)', fontWeight: 700, color: '#09344e', marginBottom: 36, paddingBottom: 12, borderBottom: '1.5px solid #E6F3EE' }}>
            Principios de Convivencia
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 56 }}>
            {PRINCIPIOS.map((p, i) => (
              <div key={i} style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: '#097589', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 700, color: '#fff' }}>{i + 1}</span>
                </div>
                <div>
                  <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 16, fontWeight: 700, color: '#09344e', marginBottom: 6 }}>{p.title}</h3>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#5A6E77', lineHeight: 1.75 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Consecuencias */}
          <div style={{ backgroundColor: '#F7F6F3', borderRadius: 16, padding: '28px 32px', marginBottom: 40, borderLeft: '4px solid #B53077' }}>
            <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 16, fontWeight: 700, color: '#09344e', marginBottom: 12 }}>
              Consecuencias por incumplimiento
            </h3>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#5A6E77', lineHeight: 1.75 }}>
              De presentarse conductas contrarias a los principios previamente establecidos en este Acuerdo de Convivencia, se tendrá que proceder con las consecuencias que podrán oscilar desde la llamada de atención por parte del personal del evento hasta la expulsión del congreso, dependiendo de la gravedad de la situación; en caso de ser aplicable también se pudiera optar por el llamamiento a las autoridades locales.
            </p>
          </div>

          {/* Compromiso */}
          <div style={{ textAlign: 'center', padding: '32px', backgroundColor: '#09344e', borderRadius: 16 }}>
            <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 16, fontWeight: 600, color: '#AEE5DA', lineHeight: 1.6 }}>
              "Al aceptar este acuerdo me comprometo a cumplir con las normas de convivencia establecidas para el congreso."
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
