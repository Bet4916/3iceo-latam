'use client'

import { useEffect, useRef, useState } from 'react'

// Tamaño nativo con el que el juego de Unity fue diseñado (no tocar)
const GAME_W = 960
const GAME_H = 600

export default function EcoWorldEmbed() {
  // started: el iframe NO existe (ni descarga ni suena) hasta que el usuario pulsa "Iniciar".
  // Al detener volvemos a false -> se desmonta el iframe y se libera memoria/audio/CPU.
  const [started, setStarted] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [scale, setScale] = useState(1)

  const wrapperRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Escala el juego (960x600 nativo) para que entre COMPLETO en pantalla, sin recortes
  useEffect(() => {
    const update = () => {
      const cw = wrapperRef.current?.clientWidth ?? GAME_W
      const byWidth = cw / GAME_W
      const byHeight = (window.innerHeight * 0.78) / GAME_H // no ocupar mas del 78% del alto
      setScale(Math.min(byWidth, byHeight, 1)) // nunca mayor que el nativo -> siempre nitido
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [started])

  const goFullscreen = () => {
    const win = iframeRef.current?.contentWindow as any
    if (win?.unityInstance?.SetFullscreen) {
      win.unityInstance.SetFullscreen(1) // fullscreen NATIVO de Unity -> no se pone negro
    } else if (iframeRef.current?.requestFullscreen) {
      iframeRef.current.requestFullscreen() // respaldo
    }
  }

  const stop = () => {
    // Desmontar el iframe descarga la instancia de Unity: detiene render, audio y libera RAM
    setLoaded(false)
    setStarted(false)
  }

  return (
    <div
      ref={wrapperRef}
      style={{
        position: 'relative',
        width: '100%',
        height: started ? GAME_H * scale : undefined,
        aspectRatio: started ? undefined : '16 / 10',
        backgroundColor: '#09344e',
        borderRadius: 12,
        overflow: 'hidden',
      }}
    >
      {/* -- 1. PORTADA (click-to-start) -- el juego NO carga ni suena hasta aqui -- */}
      {!started && (
        <button
          onClick={() => setStarted(true)}
          aria-label="Iniciar EcoWorld"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 14,
            color: '#fff',
            background: 'radial-gradient(circle at 50% 42%, #0d4663 0%, #09344e 70%)',
          }}
        >
          <span
            style={{
              width: 76,
              height: 76,
              borderRadius: '50%',
              backgroundColor: '#097589',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 32px rgba(9,117,137,0.5)',
            }}
          >
            <svg width={30} height={30} viewBox="0 0 24 24" fill="#fff">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 18, fontWeight: 700, letterSpacing: '0.02em' }}>
            Iniciar EcoWorld
          </span>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>
            La experiencia se carga al pulsar - usa audio
          </span>
        </button>
      )}

      {/* -- 2. CARGANDO (tras pulsar, mientras el iframe termina de cargar) -- */}
      {started && !loaded && (
        <div
          style={{
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
            gap: 12,
            zIndex: 2,
          }}
        >
          <div>Cargando EcoWorld...</div>
          <div style={{ fontSize: 13, color: '#AEE5DA' }}>Esto puede tardar unos segundos la primera vez</div>
        </div>
      )}

      {/* -- 3. JUEGO: iframe a tamano NATIVO 960x600, escalado en bloque para verse completo -- */}
      {started && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            marginLeft: -(GAME_W / 2), // centra el box de 960 de ancho
            width: GAME_W,
            height: GAME_H,
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
          }}
        >
          <iframe
            ref={iframeRef}
            src="/unity-game/marketplace/index.html"
            onLoad={() => setLoaded(true)}
            allow="fullscreen; autoplay; gamepad; xr-spatial-tracking"
            title="EcoWorld Marketplace"
            style={{ width: GAME_W, height: GAME_H, border: 'none', display: 'block' }}
          />
        </div>
      )}

      {/* -- 4. CONTROLES (arriba a la derecha) -- visibles una vez iniciado -- */}
      {started && (
        <div style={{ position: 'absolute', top: 16, right: 16, zIndex: 3, display: 'flex', gap: 10 }}>
          {/* Detener: desmonta el juego y libera recursos */}
          <button
            onClick={stop}
            aria-label="Detener juego"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              backgroundColor: 'rgba(146,30,30,0.82)',
              backdropFilter: 'blur(6px)',
              border: '1.5px solid rgba(255,180,180,0.45)',
              color: '#fff',
              fontFamily: 'Poppins, sans-serif',
              fontSize: 15,
              fontWeight: 700,
              padding: '12px 20px',
              borderRadius: 999,
              cursor: 'pointer',
              boxShadow: '0 4px 18px rgba(0,0,0,0.35)',
            }}
            onMouseEnter={e => {
              ;(e.currentTarget as HTMLButtonElement).style.backgroundColor = '#b53030'
            }}
            onMouseLeave={e => {
              ;(e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(146,30,30,0.82)'
            }}
          >
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none">
              <rect x="6" y="6" width="12" height="12" rx="2" fill="#fff" />
            </svg>
            Detener
          </button>

          {/* Pantalla completa: usa el fullscreen nativo de Unity */}
          <button
            onClick={goFullscreen}
            aria-label="Pantalla completa"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              backgroundColor: 'rgba(9,52,78,0.82)',
              backdropFilter: 'blur(6px)',
              border: '1.5px solid rgba(174,229,218,0.45)',
              color: '#fff',
              fontFamily: 'Poppins, sans-serif',
              fontSize: 15,
              fontWeight: 700,
              padding: '12px 22px',
              borderRadius: 999,
              cursor: 'pointer',
              boxShadow: '0 4px 18px rgba(0,0,0,0.35)',
            }}
            onMouseEnter={e => {
              ;(e.currentTarget as HTMLButtonElement).style.backgroundColor = '#097589'
            }}
            onMouseLeave={e => {
              ;(e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(9,52,78,0.82)'
            }}
          >
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none">
              <path
                d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"
                stroke="#AEE5DA"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Pantalla completa
          </button>
        </div>
      )}
    </div>
  )
}