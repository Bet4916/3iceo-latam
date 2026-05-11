# 3ICEO-LATAM — Plataforma Digital

Plataforma web modular para el Congreso Internacional de Organizaciones Ambientales de Latinoamérica, organizado por **AWAQ ONGD** junto a la Universidad de San Buenaventura en Cali y Humans Pro.

---

##Estructura del Proyecto

```
3iceo-latam/
│
├── frontend/                    ← Sitio web (Next.js 14 + Tailwind)
│   ├── app/
│   │   ├── layout.tsx           ← Layout raíz (fuentes, metadata)
│   │   ├── page.tsx             ← Home (redirige a marketing/home)
│   │   ├── marketing/           ← Páginas públicas del congreso
│   │   │   ├── home/
│   │   │   ├── agenda/
│   │   │   ├── patrocinadores/
│   │   │   ├── marketplace/
│   │   │   ├── donaciones/
│   │   │   ├── registro/
│   │   │   ├── contacto/
│   │   │   ├── lineas-tematicas/
│   │   │   ├── universidad/
│   │   │   ├── comunicaciones/
│   │   │   └── iceo-anterior/   ← Memoria 2ICEO
│   │   └── api/                 ← API Routes (Salesforce Web-to-Case, etc.)
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx       
│   │   │   └── Footer.tsx       
│   │   ├── ui/                  ← Componentes reutilizables del Design System
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Badge.tsx
│   │   │   └── ...
│   │   └── sections/            ← Secciones grandes (Hero, Speakers, etc.)
│   │       ├── HeroSection.tsx
│   │       ├── SpeakersSection.tsx
│   │       ├── AgendaSection.tsx
│   │       └── ...
│   │
│   ├── styles/
│   │   └── globals.css          
│   │
│   ├── lib/                     ← Utilidades, helpers, fetch functions
│   │   └── utils.ts
│   │
│   ├── types/                   ← TypeScript types compartidos
│   │   └── index.ts
│   │
│   ├── public/
│   │   ├── images/              ← Fotos, ilustraciones
│   │   ├── icons/               ← SVG icons
│   │   └── fonts/               ← Si se usan fuentes locales
│   │
│   ├── tailwind.config.js       
│   ├── package.json             
│   └── next.config.js
│
├── salesforce/                  ← Configuración SFDC
│   ├── web-to-case/             ← Formularios HTML conectados
│   ├── flows/                   ← Documentación de flows y automations
│   └── dashboard/               ← Capturas y config del dashboard
│
├── gamification/                ← Proyecto Unity (WebGL)
│   └── README.md                ← Instrucciones de build y embed en Next.js
│
└── docs/                        ← Documentación técnica
    ├── design-system.md         ← Guía de uso del Design System
    ├── onboarding.md            ← Guía para nuevos colaboradores
    └── salesforce-setup.md      ← Guía de integración SFDC
```

---

##Design System (tokens del Figma)

### Colores

| Token                  | Valor     | Uso |
|------------------------|-----------|-----|
| `--color-navy`         | `#09344e` | Fondo hero, texto principal, botón CTA |
| `--color-aqua`         | `#437287` | Acciones secundarias, links, focus |
| `--color-pink`         | `#e0b5cc` | Decoraciones, ilustraciones |
| `--color-bg`           | `#F7F6F3` | Fondo de secciones alternas |
| `--color-text`         | `#12303E` | Texto general |
| `--color-text-muted`   | `#5A6E77` | Placeholders, subtextos |
| `--color-error`        | `#A7170C` | Errores en formularios |

### Tipografía

| Fuente    | Pesos       | Uso |
|-----------|-------------|-----|
| Poppins   | 300/600/700 | Headings, CTAs, labels, nav |
| Inter     | 400/500     | Body text, placeholders, inputs |

### Sombras (Figma: X:2 Y:2 Blur:8)

```css
--shadow-brand: 2px 2px 8px rgba(9, 52, 78, 0.3);
--shadow-card:  2px 2px 8px rgba(9, 52, 78, 0.15);
--shadow-focus: 0 0 0 2px #437287;
```

---

## Setup Local

```bash
# 1. Clonar el repo
git clone https://github.com/tu-org/3iceo-latam.git
cd 3iceo-latam/frontend

# 2. Instalar dependencias
npm install

# 3. Correr en desarrollo
npm run dev
# → http://localhost:3000
```

## 🔗 Integración Unity (Gamificación)

El módulo de gamificación se desarrolla en Unity con export **WebGL**.  
Se embebe en Next.js como un iframe o componente dedicado en la ruta `/experiencia`.

Ver `/gamification/README.md` para instrucciones de build.

---