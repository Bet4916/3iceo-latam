// frontend/app/marketing/privacidad/page.tsx
import HeroIceo from '@/components/sections/HeroIceo'
import SectionDonacion from '@/components/sections/SectionDonacion'
import SectionRedes from '@/components/sections/SectionRedes'

const SECTIONS = [
  {
    title: 'Definiciones y Términos clave',
    content: `Para ayudar a explicar las cosas de la manera más clara posible en esta Política de privacidad, cada vez que se hace referencia a cualquiera de estos términos, se definen estrictamente como:

**Cookie:** pequeña cantidad de datos generados por un sitio web y guardados por su navegador web. Se utiliza para identificar su navegador, proporcionar análisis, recordar información sobre usted, como su preferencia de idioma o información de inicio de sesión.

**Compañía:** cuando esta política menciona "Compañía", "nosotros", "nos" o "nuestro", se refiere a Awaq Estaciones Biológicas, C/Doctor Torres Feced 20, Casa19 - 28770, responsable de su información en virtud de esta Política de privacidad.

**Plataforma:** el sitio web de Awaq en Internet (www.somosawaq.org), aplicación web o aplicación digital de cara al público.

**País:** donde se encuentra Awaq o sus propietarios / fundadores, en este caso es España.

**Datos personales:** cualquier información que directa, indirectamente o en conexión con otra información, incluido un número de identificación personal, permita la identificación de una persona física.`,
  },
  {
    title: '¿Qué información recopilamos?',
    content: `Recopilamos información suya, siempre con su autorización, cuando visita nuestra plataforma, se registra en nuestro sitio, solicita información, se suscribe a nuestro boletín, responde a una encuesta o completa un formulario. Según lo expuesto anteriormente, podremos tratar los siguientes datos:\n\n• Nombre\n• Números de teléfono\n• Correo electrónico`,
  },
  {
    title: '¿Cómo usamos la información que recopilamos?',
    content: `Cualquiera de la información que recopilamos de usted puede usarse de una de las siguientes maneras:\n\n• Para personalizar su experiencia (su información nos ayuda a responder mejor a sus necesidades individuales)\n• Para mejorar nuestra plataforma (nos esforzamos continuamente por mejorar lo que ofrece nuestra plataforma en función de la información y los comentarios que recibimos de usted)\n• Para mejorar el servicio al cliente (su información nos ayuda a responder de manera más efectiva a sus solicitudes de servicio al cliente y necesidades de soporte)\n• Para enviar correos electrónicos periódicos siempre que así lo marque en su elección`,
  },
  {
    title: '¿Cuánto tiempo conservamos su información?',
    content: `Conservaremos tu información personal el tiempo necesario o permitido en atención a los fines para los cuales se haya obtenido. Cuando ya no necesitemos usar su información y no sea necesario que la conservemos para cumplir con nuestras obligaciones legales o reglamentarias, la eliminaremos de nuestros sistemas o la despersonalizaremos para que no podamos identificarlo.`,
  },
  {
    title: '¿Cuáles son tus derechos?',
    content: `Puedes ejercitar tus derechos de acceso, rectificación, supresión y portabilidad, limitación y/u oposición al tratamiento. Esto significa que tienes derecho a:\n\n• Saber si estamos tratando tus datos o no.\n• Acceder a tus datos personales.\n• Solicitar la rectificación de tus datos si son inexactos.\n• Solicitar la supresión de tus datos si nos retiras el consentimiento otorgado.\n• Remitirte los datos que guardamos sobre ti en un formato estructurado, de uso común o lectura mecánica.\n• Revocar el consentimiento para cualquier tratamiento para el que hayas consentido, en cualquier momento.\n\nPara más información, puedes dirigirte a Awaq a través de info@somosawaq.org o ante la Agencia Española de Protección de Datos.`,
  },
  {
    title: '¿Cuándo cede Awaq la información del cliente a terceros?',
    content: `Nunca venderemos, alquilaremos o cederemos tus datos personales, pero estos podrán ser facilitados a:\n\n• Administraciones Públicas: para el cumplimiento de las obligaciones legales a las que Awaq está sujeta por su actividad.\n• Proveedores y otras Organizaciones no Gubernamentales que precisen acceder a tus datos para la prestación de servicios que Awaq haya contratado, con los cuales Awaq tiene suscritos los contratos de confidencialidad y de tratamiento de datos personales necesarios.`,
  },
  {
    title: 'Información sobre el RGPD',
    content: `Es posible que recopilemos y utilicemos información suya si pertenece al Espacio Económico Europeo (EEE). El RGPD es una ley de privacidad y protección de datos en toda la UE que regula cómo las empresas protegen los datos de los residentes de la UE y mejora el control que los residentes de la UE tienen sobre sus datos personales.\n\nLos principios de protección de datos incluyen requisitos tales como:\n\n• Los datos personales recopilados deben procesarse de manera justa, legal y transparente.\n• Los datos personales solo deben recopilarse para cumplir con un propósito específico.\n• Los datos personales no deben conservarse más tiempo del necesario para cumplir con su propósito.\n• Las personas cubiertas por el RGPD tienen derecho a acceder a sus propios datos personales.`,
  },
  {
    title: 'Contáctenos',
    content: `No dude en contactarnos si tiene alguna pregunta.\n\nA través de correo electrónico: info@somosawaq.org\n\nDirección postal:\nC/Doctor Torres Feced 20, Casa19 - 28770 Colmenar Viejo (España)`,
  },
]

export default function PrivacidadPage() {
  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <HeroIceo
        badge="Awaq ONGD · Legal"
        title={<>Política de <span style={{ color: '#ffffff' }}>Privacidad</span></>}
        description={<>Transparencia sobre cómo recopilamos, usamos<br />y protegemos tu información personal</>}
        cta={{ label: 'CONTACTAR →', href: 'mailto:info@somosawaq.org' }}
        image="/icons/lineas_tematicas.svg"
        imageAlt="Política de privacidad"
        imageScale={1.30}
        waveVariant="default"
        waveColor="#ffffff"
      />

      <section style={{ backgroundColor: '#ffffff', padding: '72px 48px 96px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>

          {/* Intro */}
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, color: '#5A6E77', lineHeight: 1.8, marginBottom: 48, borderLeft: '3px solid #097589', paddingLeft: 20 }}>
            Awaq ("nosotros", "nuestro" o "nos") se compromete a proteger su privacidad. Esta Política de privacidad explica cómo Awaq recopila, usa y divulga su información personal en relación con el sitio web <strong>www.somosawaq.org</strong> y sus subdominios asociados.
          </p>

          {SECTIONS.map((s, i) => (
            <div key={i} style={{ marginBottom: 52 }}>
              <h2 style={{
                fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(18px, 2vw, 22px)',
                fontWeight: 700, color: '#09344e', marginBottom: 16,
                paddingBottom: 12, borderBottom: '1.5px solid #E6F3EE',
              }}>
                {s.title}
              </h2>
              {s.content.split('\n\n').map((para, j) => (
                <p key={j} style={{
                  fontFamily: 'Inter, sans-serif', fontSize: 15,
                  color: '#3A4E58', lineHeight: 1.8, marginBottom: 14,
                  whiteSpace: 'pre-line',
                }}>
                  {para.replace(/\*\*(.*?)\*\*/g, '$1')}
                </p>
              ))}
            </div>
          ))}

          <div style={{ backgroundColor: '#E6F3EE', borderRadius: 12, padding: '24px 28px', marginTop: 40 }}>
            <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 600, color: '#097589', marginBottom: 6 }}>
              Ley que Rige
            </p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#3A4E58', lineHeight: 1.7 }}>
              Esta Política de privacidad se rige por las leyes de España. La relación entre Awaq y el usuario se regirá por la normativa española vigente y cualquier controversia se someterá a los Juzgados y Tribunales de la ciudad de Madrid.
            </p>
          </div>
        </div>
      </section>

      <SectionDonacion bg="#09344e" theme="dark" showTopWave topWaveFrom="#ffffff" waveColor="#ffffff" showWave />
      
      <SectionRedes bg="#ffffff" theme="light" />
      
    </div>
  )
}
