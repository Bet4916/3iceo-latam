'use client'

import { useState } from 'react'

export default function EcoWorldEmbed() {
  const [loaded, setLoaded] = useState(false)

  return (
    <div style={{ width: '100%', position: 'relative' }}>
      
      {/* Mensaje de carga mientras el iframe no termina */}
      {!loaded && (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#09344e',
          color: '#fff',
          fontFamily: 'Poppins, sans-serif',
          fontSize: 16,
          gap: 16,
          minHeight: 500,
        }}>
          <div>🌿 Cargando EcoWorld...</div>
          <div style={{ fontSize: 13, color: '#AEE5DA' }}>
            Esto puede tardar hasta 8 segundos
          </div>
        </div>
      )}

      <iframe
        src="/unity-game/index.html"
        width="100%"
        height="600px"
        style={{
          border: 'none',
          borderRadius: 12,
          display: loaded ? 'block' : 'none',
        }}
        onLoad={() => setLoaded(true)}
        allow="fullscreen"
        title="EcoWorld Marketplace"
      />
    </div>
  )
}