'use client'


import { useEffect, useRef, useState } from 'react'

const GAME_W = 960
const GAME_H = 600

export default function EcoWorldMundo() {
  const [started, setStarted] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [scale, setScale] = useState(1)

  const wrapperRef = useRef<HTMLDivElement>(null)
const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const update = () => {
      const cw = wrapperRef.current?.clientWidth ?? GAME_W
      const byWidth = cw / GAME_W
      const byHeight = (window.innerHeight * 0.78) / GAME_H
      setScale(Math.min(byWidth, byHeight, 1))
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [started])

  const goFullscreen = () => {
  const win = iframeRef.current?.contentWindow as any
  if (win?.unityInstance?.SetFullscreen) {
    win.unityInstance.SetFullscreen(1)
  } else if (iframeRef.current?.requestFullscreen) {
    iframeRef.current.requestFullscreen()
  }
}

  const stop = () => {
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
      {!started && (
        <button
          onClick={() => setStarted(true)}
          aria-label="Iniciar EcoWorld Mundo"
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            border: 'none', cursor: 'pointer', display: 'flex',
            flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: 14, color: '#fff',
            background: 'radial-gradient(circle at 50% 42%, #0d4663 0%, #09344e 70%)',
          }}
        >
          <span style={{
            width: 76, height: 76, borderRadius: '50%', backgroundColor: '#097589',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 32px rgba(9,117,137,0.5)',
          }}>
            <svg width={30} height={30} viewBox="0 0 24 24" fill="#fff">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 18, fontWeight: 700, letterSpacing: '0.02em' }}>
            Iniciar EcoWorld Mundo
          </span>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>
            La experiencia se carga al pulsar - usa audio
          </span>
        </button>
      )}

      {started && !loaded && (
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', backgroundColor: '#09344e',
          color: '#fff', fontFamily: 'Poppins, sans-serif', fontSize: 16, gap: 12, zIndex: 2,
        }}>
          <div>Cargando EcoWorld Mundo...</div>
          <div style={{ fontSize: 13, color: '#AEE5DA' }}>Esto puede tardar unos segundos la primera vez</div>
        </div>
      )}

      {started && (
        <div style={{
          position: 'absolute', top: 0, left: '50%',
          marginLeft: -(GAME_W / 2),
          width: GAME_W, height: GAME_H,
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
        }}>
          <iframe
            ref={iframeRef}
            src="/unity-game/mundo/index.html"
            onLoad={() => setLoaded(true)}
            allow="fullscreen; autoplay; gamepad; xr-spatial-tracking"
            title="EcoWorld Mundo"
            style={{ width: GAME_W, height: GAME_H, border: 'none', display: 'block' }}
          />
        </div>
      )}

      {started && (
        <div style={{ position: 'absolute', top: 16, right: 16, zIndex: 3, display: 'flex', gap: 10 }}>
          <button
            onClick={stop}
            aria-label="Detener juego"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              backgroundColor: 'rgba(146,30,30,0.82)', backdropFilter: 'blur(6px)',
              border: '1.5px solid rgba(255,180,180,0.45)', color: '#fff',
              fontFamily: 'Poppins, sans-serif', fontSize: 15, fontWeight: 700,
              padding: '12px 20px', borderRadius: 999, cursor: 'pointer',
              boxShadow: '0 4px 18px rgba(0,0,0,0.35)',
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#b53030'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(146,30,30,0.82)'}
          >
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none">
              <rect x="6" y="6" width="12" height="12" rx="2" fill="#fff" />
            </svg>
            Detener
          </button>

          <button
            onClick={goFullscreen}
            aria-label="Pantalla completa"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              backgroundColor: 'rgba(9,52,78,0.82)', backdropFilter: 'blur(6px)',
              border: '1.5px solid rgba(174,229,218,0.45)', color: '#fff',
              fontFamily: 'Poppins, sans-serif', fontSize: 15, fontWeight: 700,
              padding: '12px 22px', borderRadius: 999, cursor: 'pointer',
              boxShadow: '0 4px 18px rgba(0,0,0,0.35)',
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#097589'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(9,52,78,0.82)'}
          >
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none">
              <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"
                stroke="#AEE5DA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Pantalla completa
          </button>
        </div>
      )}
    </div>
  )
}