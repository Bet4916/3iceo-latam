// Usa este mismo contenido para todas las páginas no desarrolladas.
// Cambia SOLO el título según la página.

export default function PlaceholderPage() {
  return (
    <div style={{
      minHeight: '80vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: 16,
      paddingTop: 80, textAlign: 'center', padding: '80px 24px',
    }}>
      <div style={{
        width: 64, height: 64, borderRadius: '50%',
        backgroundColor: '#E6F3EE', border: '2px solid #AEE5DA',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
            stroke="#097589" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      </div>
      <h1 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 28, fontWeight: 600, color: '#09344e', margin: 0 }}>
        Próximamente
      </h1>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 16, color: '#5A6E77', maxWidth: 400, margin: 0, lineHeight: 1.6 }}>
        Esta sección está en desarrollo. Vuelve pronto para conocer más sobre el 3ICEO LATAM.
      </p>
      <a href="/marketing/home" style={{
        marginTop: 8, fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 600,
        color: '#097589', textDecoration: 'none', borderBottom: '1px solid #097589',
        paddingBottom: 2,
      }}>
        ← Volver al inicio
      </a>
    </div>
  )
}
