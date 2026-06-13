```
# 3ICEO-LATAM — Plataforma Digital

Plataforma web modular para el Congreso Internacional de Organizaciones Ambientales de Latinoamérica, organizado por AWAQ ONGD junto a la Universidad de San Buenaventura en Cali y Humans Pro.

---

## Estructura del Proyecto

3iceo-latam/
├── frontend/                         ← Sitio web (Next.js 14)
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                  ← Redirige a marketing/home
│   │   ├── marketing/
│   │   │   ├── home/
│   │   │   ├── agenda/               ← Ponentes dinámicos desde Salesforce
│   │   │   ├── aliados/              ← Socios dinámicos desde Salesforce
│   │   │   ├── comunicaciones/       ← Noticias dinámicas desde Salesforce
│   │   │   ├── marketplace/          ← Juego Unity embebido
│   │   │   ├── patrocinadores/
│   │   │   ├── donaciones/
│   │   │   ├── registro/             ← Formulario Web-to-Case Salesforce
│   │   │   ├── contacto/
│   │   │   ├── lineas-tematicas/
│   │   │   ├── universidad/
│   │   │   └── primer-iceo/
│   │   └── api/
│   │       ├── registro/             ← Web-to-Case (formulario inscripción)
│   │       ├── contact/              ← Formulario de contacto
│   │       ├── salesforce/
│   │       │   ├── ponentes/         ← GET ponentes desde Salesforce
│   │       │   ├── socios/           ← GET socios desde Salesforce
│   │       │   ├── noticias/         ← GET noticias desde Salesforce
│   │       │   └── marketplace/      ← GET organizaciones (CORS abierto para Unity)
│   │       ├── upload/               ← Subir imágenes a Cloudflare R2
│   │       └── revalidate/           ← Forzar revalidación de caché
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── ui/                       ← Design System components
│   │   └── sections/                 ← Secciones reutilizables (HeroIceo, SectionDonacion, etc.)
│   ├── lib/
│   │   └── salesforce.ts             ← Cliente Salesforce (token + query + create)
│   ├── public/
│   │   └── unity-game/               ← Build WebGL del juego Unity
│   │       ├── Build/
│   │       └── index.html
│   ├── .env.local                    ← Variables de entorno (NO subir al repo)
│   └── package.json
├── salesforce/                       ← Documentación configuración SFDC
└── docs/

---

## Setup Local

git clone https://github.com/tu-org/3iceo-latam.git
cd 3iceo-latam/frontend
npm install
npm run dev
→ http://localhost:3000

Crear archivo frontend/.env.local con las variables listadas más abajo.

---

## Design System

Colores:
--color-navy       #09344e   Fondo hero, texto principal, botón CTA
--color-aqua       #437287   Acciones secundarias, links
--color-teal       #097589   Botones primarios, highlights
--color-green      #03A383   Acciones verdes, confirmaciones
--color-pink       #B53077   Donaciones, CTAs secundarios
--color-bg         #F7F6F3   Fondo secciones alternas
--color-text       #12303E   Texto general
--color-muted      #5A6E77   Placeholders, subtextos
--color-error      #A7170C   Errores en formularios

Tipografía:
Poppins   300/500/600/700   Headings, CTAs, labels, nav
Inter     400/500           Body text, placeholders

Sombras:
--shadow-brand: 2px 2px 8px rgba(9, 52, 78, 0.3)
--shadow-card:  2px 2px 8px rgba(9, 52, 78, 0.15)

---

## Integración Salesforce

Objetos custom creados:
- Ponente__c      → Ponentes del congreso (agenda)
- Socio__c        → Socios colaboradores (aliados)
- Noticia__c      → Noticias y comunicaciones
- MarketplaceOrg__c → Organizaciones del juego Unity
- Case            → Formulario de inscripción (Web-to-Case)

URLs para crear contenido:
Ponentes    → https://awaq.my.salesforce.com/lightning/o/Ponente__c/new
Socios      → https://awaq.my.salesforce.com/lightning/o/Socio__c/new
Noticias    → https://awaq.my.salesforce.com/lightning/o/Noticia__c/new
Marketplace → https://awaq.my.salesforce.com/lightning/o/MarketplaceOrg__c/new

Caché de las APIs:
/api/salesforce/ponentes    7 días
/api/salesforce/socios      7 días
/api/salesforce/noticias    1 hora
/api/salesforce/marketplace 5 minutos

---

## Cloudflare R2 (imágenes)

Bucket: somosawaq
URL pública base: https://pub-94aa83314f8a41088bff3c1130d43ebd.r2.dev/

Para subir imágenes:
1. Ir a dash.cloudflare.com → R2 → somosawaq → Objects → Upload
2. Subir la imagen
3. Copiar la URL pública y pegarla en Salesforce en el campo correspondiente

---

## Variables de entorno (Vercel + .env.local)

SF_INSTANCE_URL       → URL instancia Salesforce               (no sensitive)
SF_CLIENT_ID          → Consumer Key del Connected App         (no sensitive)
SF_CLIENT_SECRET      → Consumer Secret del Connected App      (SENSITIVE)
R2_ACCOUNT_ID         → ID cuenta Cloudflare                   (no sensitive)
R2_ACCESS_KEY_ID      → Access Key de Cloudflare R2            (SENSITIVE)
R2_SECRET_ACCESS_KEY  → Secret Key de Cloudflare R2            (SENSITIVE)
R2_BUCKET_NAME        → Nombre del bucket R2                   (no sensitive)
R2_PUBLIC_URL         → URL pública del bucket R2              (no sensitive)
REVALIDATE_SECRET     → Clave para revalidar caché             (SENSITIVE)
NEXT_PUBLIC_BASE_URL  → Dominio de la web                      (no sensitive)

---

## Al hacer deploy final a dominio propio

Cambiar SOLO estas 2 cosas:

1. Vercel → Settings → Environment Variables:
   NEXT_PUBLIC_BASE_URL = https://tu-dominio-final.com

2. Unity → MarketplaceManager.cs:
   public string apiUrl = "https://tu-dominio-final.com/api/salesforce/marketplace";

---

## Juego Unity (Marketplace)

El juego está en public/unity-game/ con su build WebGL.
Se comunica con la API /api/salesforce/marketplace que tiene CORS abierto,
por lo que funciona desde cualquier dominio o desde el editor de Unity.

Para desarrollo local cambiar en MarketplaceManager.cs:
public string apiUrl = "http://localhost:3000/api/salesforce/marketplace";

Para producción:
public string apiUrl = "https://3iceo-latam.vercel.app/api/salesforce/marketplace";
```