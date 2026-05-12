import dynamic from 'next/dynamic'

// Importante: el iframe no funciona en SSR, necesita 'ssr: false'
const EcoWorldEmbed = dynamic(
  () => import('@/components/ui/EcoWorldEmbed'),
  { ssr: false }
)

export default function MarketplacePage() {
  return (
    <div>
      {/* Tu sección de hero/descripción del marketplace arriba */}
      
      <section style={{ padding: '48px' }}>
        <h2 style={{ fontFamily: 'Poppins', color: '#09344e', marginBottom: 24 }}>
          Explora EcoWorld
        </h2>
        <p style={{ fontFamily: 'Poppins', color: '#437287', marginBottom: 32 }}>
          Muévete con las teclas WASD o las flechas del teclado. 
          Acércate a un stand y presiona E para ver la información de la organización.
        </p>
        
        <EcoWorldEmbed />
      </section>

      {/* El resto de tu página abajo */}
    </div>
  )
}