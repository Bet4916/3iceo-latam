'use client'
import { useEffect } from 'react'

export default function GoogleTranslate() {
  useEffect(() => {
    if (document.getElementById('google-translate-script')) return

    ;(window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        { pageLanguage: 'es', includedLanguages: 'en,es', autoDisplay: false },
        'google_translate_element'
      )
    }

    const s = document.createElement('script')
    s.id = 'google-translate-script'
    s.src =
      'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    document.body.appendChild(s)
  }, [])

  return (
    <>
      <div id="google_translate_element" style={{ display: 'none' }} />
      <style jsx global>{`
        .goog-te-banner-frame,
        .goog-te-banner-frame.skiptranslate,
        iframe.goog-te-banner-frame,
        .skiptranslate iframe,
        iframe.skiptranslate {
          display: none !important;
          visibility: hidden !important;
          height: 0 !important;
        }
        body {
          top: 0 !important;
          position: static !important;
        }
        #goog-gt-tt, .goog-te-balloon-frame { display: none !important; }
        .goog-text-highlight {
          background: none !important;
          box-shadow: none !important;
        }
      `}</style>
    </>
  )
}