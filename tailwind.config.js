/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── CTAs
        cta: {
          DEFAULT: '#B53077',
          hover:   '#802254',
          light:   '#E0B6CD',
        },
        // ── Actions
        action: {
          DEFAULT: '#097589',
          dark:    '#074954',
          light:   '#ADD2D9',
        },
        // ── Navy
        navy: {
          DEFAULT: '#09344e',
          dark:    '#12303E',
          medium:  '#1C495C',
        },
        // ── Aquamarina
        aqua: {
          bg:      '#E6F3EE',
          50:      '#C0FFF2',
          100:     '#AEE5DA',
          200:     '#76E2CC',
          300:     '#74B4A7',
          400:     '#03A383',
          500:     '#097589',
          600:     '#3C625B',
          700:     '#004A3B',
        },
        // ── Blue
        brand: {
          50:      '#DAEBF2',
          100:     '#D4ECFF',
          200:     '#BED1DA',
          300:     '#8CCDFF',
          400:     '#4886B5',
          500:     '#1894F2',
        },
        // ── Neutrals
        neutral: {
          bg:      '#F7F6F3',
          200:     '#D9DEE2',
          400:     '#5A6E77',
          800:     '#12303E',
        },
        // ── States
        error: '#A7170C',
      },
      fontFamily: {
        gloock:  ['Gloock', 'Georgia', 'serif'],
        poppins: ['Poppins', 'sans-serif'],
        inter:   ['Inter', 'sans-serif'],
      },
      fontSize: {
        'display': ['clamp(32px,4.5vw,48px)', { lineHeight: '1.15', fontWeight: '400' }],
        'h1':      ['36px',  { lineHeight: '1.2', fontWeight: '700' }],
        'h2':      ['28px',  { lineHeight: '1.2', fontWeight: '600' }],
        'h3':      ['20px',  { lineHeight: '1.3', fontWeight: '500' }],
        'ui-base': ['15px',  { lineHeight: '1.5', fontWeight: '400' }],
        'ui-sm':   ['13px',  { lineHeight: '1.5', fontWeight: '400' }],
        'ui-xs':   ['11px',  { lineHeight: '1.4', fontWeight: '400' }],
      },
      boxShadow: {
        'light':  '2px 2px 8px rgba(18,48,62,0.15)',
        'dark':   '2px 2px 8px rgba(18,48,62,0.30)',
        'focus':  '0 0 0 3px rgba(14,123,102,0.12)',
      },
      borderRadius: {
        'brand': '8px',
        'pill':  '999px',
      },
    },
  },
  plugins: [],
}
