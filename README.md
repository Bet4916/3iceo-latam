# 3ICEO-LATAM — Plataforma Digital

Plataforma web del **3.er Congreso Internacional de Organizaciones Ambientales de
Latinoamérica (3ICEO)**, organizado por AWAQ ONGD junto a la Universidad de San
Buenaventura (Cali) y Humans Pro.

Stack: **Next.js 14 (App Router) + TypeScript**, contenido dinámico desde
**Salesforce**, imágenes en **Cloudflare R2**, tres experiencias **Unity (WebGL)**
embebidas y despliegue en **Vercel**.

---

## Estructura del proyecto

> El repositorio **es** la app Next.js (no hay carpeta `frontend/` anidada).

```
.
├── app/
│   ├── layout.tsx                   # Root layout: <html>, fuentes, metadata/SEO
│   ├── page.tsx                     # Redirige a /marketing/home
│   ├── marketing/
│   │   ├── layout.tsx               # Navbar + Footer + GoogleTranslate
│   │   ├── home/                    # Portada + mundo Unity (EcoWorldMundo)
│   │   ├── agenda/                  # Programa por días (provisional, ver Pendientes)
│   │   ├── lineas-tematicas/        # Contenido temático REAL del congreso
│   │   ├── aliados/                 # Socios dinámicos (Salesforce)
│   │   ├── comunicaciones/          # Noticias dinámicas (Salesforce)
│   │   ├── marketplace/             # Mundo Unity de organizaciones (EcoWorldEmbed)
│   │   ├── universidad/             # Sede + recorrido virtual Unity (sede)
│   │   ├── donaciones/              # Pago vía PayPal
│   │   ├── segundo-iceo/            # Memoria del 2.º ICEO
│   │   └── colabora/
│   │       ├── prensa/              # Formulario de prensa / medios
│   │       └── voluntariado/        # Formulario de voluntariado
│   └── api/
│       ├── registro/                # POST → Salesforce Web-to-Case (inscripción)
│       ├── contact/                 # POST → Web-to-Case (formulario del footer)
│       ├── prensa/                  # POST → Web-to-Case (formulario de prensa)
│       ├── voluntariado/            # POST → Web-to-Case (formulario de voluntariado)
│       ├── salesforce/
│       │   ├── ponentes/            # GET ponentes (Ponente__c)
│       │   ├── socios/              # GET socios (Socio__c)
│       │   ├── noticias/            # GET noticias (Noticia__c)
│       │   └── marketplace/         # GET organizaciones (CORS abierto para Unity)
│       ├── upload/                  # POST → subir imágenes a Cloudflare R2
│       └── revalidate/              # POST → forzar revalidación de caché (con secret)
├── components/
│   ├── GoogleTranslate.tsx          # Widget oculto de traducción ES/EN
│   ├── layout/                      # Navbar, Footer
│   ├── ui/                          # icons, CountrySelect, EcoWorldEmbed, EcoWorldMundo
│   └── sections/                    # HeroIceo, SectionDonacion, SectionRedes, etc.
├── lib/
│   └── salesforce.ts                # Cliente Salesforce (token + query)
├── public/
│   └── unity-game/                  # Builds WebGL (3 experiencias)
│       ├── mundo/                   # → Home  (EcoWorldMundo)
│       ├── marketplace/             # → Marketplace (EcoWorldEmbed, lee de Salesforce)
│       └── sede/                    # → Universidad (recorrido del campus)
├── styles/
│   └── globals.css                  # Tokens de color/tipografía + utilidades
├── types/
│   └── index.ts
├── validaciones.test.js             # Pruebas unitarias (Jest)
├── globals.d.ts                     # declare module '*.css' (silencia ts(2882))
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
└── tsconfig.json
```

---

## Setup local

```bash
git clone https://github.com/tu-org/3iceo-latam.git
cd 3iceo-latam
npm install
npm run dev          # http://localhost:3000
```

Crea un archivo `.env.local` en la raíz con las variables de la sección de abajo.

Scripts: `npm run dev`, `npm run build`, `npm run start`, `npm run lint`.
Tests: `npx jest`.

---

## Variables de entorno (`.env.local` y Vercel)

| Variable | Descripción | Sensible |
|---|---|---|
| `SF_INSTANCE_URL` | URL de la instancia de Salesforce | No |
| `SF_CLIENT_ID` | Consumer Key del Connected App | No |
| `SF_CLIENT_SECRET` | Consumer Secret del Connected App | **Sí** |
| `R2_ACCOUNT_ID` | ID de cuenta de Cloudflare | No |
| `R2_ACCESS_KEY_ID` | Access Key de R2 | **Sí** |
| `R2_SECRET_ACCESS_KEY` | Secret Key de R2 | **Sí** |
| `R2_BUCKET_NAME` | Nombre del bucket | No |
| `R2_PUBLIC_URL` | URL pública del bucket | No |
| `REVALIDATE_SECRET` | Clave para `/api/revalidate` | **Sí** |
| `NEXT_PUBLIC_BASE_URL` | Dominio público del sitio | No |

> Las variables sensibles nunca se suben a Git (`.env.local` está en `.gitignore`).
> Si alguna se expone, **rótala** desde Cloudflare R2 / Salesforce y actualízala en
> `.env.local` y en Vercel.

---

## Integración Salesforce

Objetos custom: `Ponente__c`, `Socio__c`, `Noticia__c`, `MarketplaceOrg__c`, y `Case`
(formularios vía Web-to-Case: inscripción, contacto, prensa y voluntariado).

Crear contenido nuevo:

| Contenido | URL |
|---|---|
| Ponentes | `https://awaq.my.salesforce.com/lightning/o/Ponente__c/new` |
| Socios | `https://awaq.my.salesforce.com/lightning/o/Socio__c/new` |
| Noticias | `https://awaq.my.salesforce.com/lightning/o/Noticia__c/new` |
| Marketplace | `https://awaq.my.salesforce.com/lightning/o/MarketplaceOrg__c/new` |

Caché de las lecturas: ponentes 7 días · socios 7 días · noticias 1 h · marketplace 5 min.
Para refrescar de inmediato tras un cambio:
`POST /api/revalidate?secret=REVALIDATE_SECRET`.

---

## Juegos Unity (WebGL)

Hay **tres** experiencias, cada una en su carpeta dentro de `public/unity-game/`:

| Carpeta | Página | Componente | Notas |
|---|---|---|---|
| `mundo/` | Home | `EcoWorldMundo` | Mundo navegable de bienvenida |
| `marketplace/` | Marketplace | `EcoWorldEmbed` | Lee organizaciones desde `/api/salesforce/marketplace` |
| `sede/` | Universidad | iframe directo | Recorrido virtual del campus |

Solo el juego de **marketplace** consume datos de Salesforce. Para reemplazar un build,
sustituye el contenido de su carpeta manteniendo el `index.html` con el mismo nombre.

---

## Cloudflare R2 (imágenes)

Bucket público en `R2_PUBLIC_URL`. Para añadir imágenes: subirlas en
**dash.cloudflare.com → R2 → bucket → Upload**, copiar la URL pública y pegarla en el
campo correspondiente de Salesforce. (También existe `/api/upload` para subidas
programáticas: JPG/PNG/WebP/SVG, máx. 5 MB.)

---

## ⚠️ Pendientes del cliente (cambiar cuando estén definidos)

Estos datos no fueron entregados por el cliente al cierre del proyecto. El código queda
listo con un valor temporal; solo hay que sustituirlo cuando lo definan.

**1. Correo de PayPal (donaciones).**
Archivo: `app/marketing/donaciones/page.tsx`. Cambiar la constante:
```ts
const PAYPAL_EMAIL = 'TU_CORREO@AWAQ.ORG'   // ← poner el correo real de la cuenta PayPal de AWAQ
```
Hasta que se cambie, el botón de donar abre PayPal con un correo de ejemplo.

**2. Agenda oficial: fechas, horarios y contenido por día.**
Archivo: `app/marketing/agenda/page.tsx`. La agenda actual es **provisional/hardcode**
(el congreso aún no tiene programa oficial). Cuando llegue:
- Actualizar el array `DIAS` (fechas, día de la semana, sesiones y horas).
- Unificar mes/año con la tarjeta de agenda de `app/marketing/home/page.tsx`.
- El contenido temático definitivo ya vive en `app/marketing/lineas-tematicas/`.

**3. PDF oficial de horarios.**
Archivo: `app/marketing/agenda/page.tsx`, en el botón "Descargar horarios PDF".
Hoy apunta a la memoria del 2.º ICEO (o está oculto). Reemplazar el `href` por la URL
del PDF oficial del 3ICEO cuando exista.

---

## Deploy a dominio propio (Vercel)

Al pasar al dominio final, cambiar **solo** dos cosas:

1. **Vercel → Settings → Environment Variables:**
   `NEXT_PUBLIC_BASE_URL = https://tu-dominio-final.com`

2. **Unity → `MarketplaceManager.cs`** (apiUrl del juego de marketplace):
   ```csharp
   public string apiUrl = "https://tu-dominio-final.com/api/salesforce/marketplace";
   ```
   (Local: `http://localhost:3000/api/salesforce/marketplace`)

La API de marketplace tiene CORS abierto, así que el juego funciona desde cualquier
dominio o desde el editor de Unity.

---

## Design System (referencia rápida)

Colores: navy `#09344e` · aqua `#437287` · teal `#097589` · green `#03A383` ·
pink `#B53077` · bg `#F7F6F3` · text `#12303E` · muted `#5A6E77` · error `#A7170C`.
Tipografía: **Poppins** (headings/UI), **Inter** (texto), **Gloock** (display).
Los tokens viven en `styles/globals.css`.