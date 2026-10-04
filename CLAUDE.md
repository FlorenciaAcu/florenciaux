# CLAUDE.md — Portfolio | Florencia Acuña

Contexto para cualquier sesión de Claude que trabaje en este proyecto.

## Repo de referencia — una sola fuente

El repo es **`FlorenciaAcu/florenciaux`** (público). Es el único.

- No trabajar sobre `FlorenciaAcu/MigraciNPortfolio` ni sobre `FlorenciaAcu/Portfolio`.
  Ambos son exports viejos de Figma Make del mismo código y quedan como respaldo histórico.
- Si aparece una referencia a esos repos en un README, un commit o un archivo, es residuo del
  export — corregirla, no seguirla.
- Clone local: `C:\Users\fasj\Documents\florenciaux`.

## Cómo se trabaja acá

- **Todo va directo a `main`. Nunca crear ramas nuevas ni abrir PRs** (política permanente de florenciaux.com,
  decidida por Florcita el 2026-10-04). Si el entorno arranca en otra rama, pasar el trabajo a `main` y pushear ahí.

El entorno Linux de Claude en esta máquina no arranca (lo rompió una actualización de Windows del
8/9/2026), así que:

- **Claude escribe archivos directo en la carpeta** del clone. Aparecen en VS Code.
- **Los comandos de git los corre Florcita** desde la terminal de VS Code. Claude no puede ejecutar
  comandos ni borrar archivos en este disco.
- Claude tampoco puede escribir en `.git/` (bloqueado por política). Sí puede leerlo.

Cuando Claude proponga borrar archivos, tiene que pasar el comando para que lo corra Florcita.

## Stack

React 18.3.1 · Vite 6.3.5 · Tailwind CSS 4.1.12 · shadcn/ui (Radix) · motion 12.23.24 · TypeScript 5.6.3

```bash
npm install
npm run dev      # desarrollo
npm run build    # a dist/
npm run preview
```

## Estructura

```
src/
  main.tsx                  punto de entrada
  styles/index.css          único CSS que entra al build
  assets/                   imágenes que resuelve figma:asset/<hash>.png
  imports/                  fotos personales (jpg/jpeg)
  app/
    App.tsx                 router por path (History API), escrito a mano; helpers en lib/router.ts
    components/             secciones de página
    components/ui/          shadcn/ui (casi todo sin usar, pero es la librería base)
    data/projects.ts        contenido de proyectos y casos
    data/experiences.ts     contenido de trayectoria
```

Rutas (URLs reales): `/`, `/proyectos/:slug` (casos: CEMICO, Buscador Agrícola, Juan Gas, Audagno, InfoCasas),
`/experiencia/:slug` (experiencia laboral: Cintelink, Consultoría, Folcode), más secciones del home
(`/sobre-mi`, `/proyectos`, `/experiencia`, `/contacto`). Los links viejos con `#/…` se convierten solos en `lib/router.ts`.
`npm run build` corre `vite build` y después `scripts/prerender.mjs`: genera un HTML por caso (`dist/proyectos/cemico.html`)
con su título, descripción y canonical, y el `sitemap.xml`. `vercel.json` usa `cleanUrls` y reescribe el resto a `index.html`.

## Reglas del proyecto

1. **Las imágenes de `src/assets/` y `src/imports/` son placeholders.** Los archivos reales nunca se
   commitearon en el repo original. Al reemplazarlos hay que **mantener el nombre de archivo exacto y
   la carpeta** — el código importa por nombre y no se toca.
2. **No renombrar los hashes de `figma:asset/`.** `vite.config.ts` los resuelve contra `src/assets/`
   mediante el plugin `figmaAssetResolver`.
3. **`src/styles/index.css` es el único CSS que entra al build** (importa `globals.css`, donde viven los
   tokens; ver `docs/DESIGN_SYSTEM.md`). `tailwind.css` y `fonts.css` siguen sin referenciar.
4. **Los cambios de decisión se registran en `docs/`** en Markdown, no solo en el mensaje de commit.

## Reglas editoriales y de diseño (decididas por Florencia)

Son decisiones cerradas: no se reabren ni se "mejoran" sin un pedido explícito. Antes de proponer un cambio en un
texto ya aprobado hay que cumplir tres cosas: **(1)** citar la frase exacta que presenta el problema, **(2)** explicar
qué dificultad concreta genera para quien lee y **(3)** mostrar que un cambio mínimo lo resuelve sin perder información.
Si no se pueden justificar las tres, se mantiene el texto actual. No se elimina nada solo porque una idea aparezca a la
vez en un diagrama y en un párrafo: cada sección puede explicar algo distinto.

Principio general: cada detalle visual tiene que cambiar cómo se entiende el contenido. Si solo adorna, no va.

### Nunca debe mostrarse
- **Chips, pills ni etiquetas de tags** (Demo, Mobile, SaaS, Rediseño…) en ningún componente.
- **Adornos sin función:** el subrayado dibujado a mano, líneas laterales decorativas (la que se había puesto en
  "Cómo lo abordé"), la imagen que aparecía al pasar el mouse sobre "Proyectos destacados".
- **Pies de foto** en las imágenes de los detalles: solo la imagen.
- **Una sección "Resultado"** en los detalles, ni resultados, métricas o afirmaciones que no estén documentados.
- **"San Juan, Argentina" junto a "Product Designer"** (pie de página y similares): solo "Product Designer". La ubicación
  que va bajo el título de cada detalle sí se muestra: es la del proyecto o la empresa.
- **Filas "Para" / "Trabajé para" ni "Plataformas"** en los datos rápidos: para quién se trabajó ya se dice en "Qué es".
- **"Imagen pendiente"** en una página publicada. Cada detalle lleva exactamente 2 imágenes: una después de
  "Cómo trabajé" y otra justo antes de "Qué aprendí".
- **Frases de relleno:** "Participé en otros proyectos que no se detallan aquí", "A continuación, algunos de los
  proyectos…", "Es una selección…", "input/output" en las etapas de "Cómo trabajo".
- **Enlaces de texto** tipo "Ver detalle →" o "Ver proyecto en Behance" dentro de las tarjetas de proyecto: la tarjeta
  entera es el enlace y lleva la flecha arriba a la derecha (`ArrowUpRight`), igual que las de Experiencia.
- **Tono informal** ("che", "pibe"): el tono es semiformal. Los botones y enlaces van en infinitivo ("Ver proyectos",
  "Descubrir más").
- **Una franja de credibilidad** (cifras, logos) bajo el hero.

### Estructura y diseño
- **Una sola estructura:** si falta un dato, se oculta el campo. Nunca se arma una estructura alternativa para ese caso.
- **Anchos:** los textos de los detalles y los subtítulos de la home ocupan todo el ancho (sin `max-w-*` en párrafos).
  El encabezado y el contenido de los detalles usan el mismo `page-container`.
- **"Cómo trabajo"** es la grilla tradicional de 4 etapas, sin círculo ni animación atada al scroll.
- **Divisores** con criterio, no por defecto.
- **Diagramas "Cómo se conecta":** se conservan en todos los casos donde existen y van justo después de "Cómo trabajé"
  y su imagen.
- **Títulos de sección:** pueden responder a su contenido. AUDAGNO es "Quién es Juan Audagno" y Folcode es "Mi
  recorrido"; no se normalizan a "Qué es…" / "El desafío".
- **"Decisiones de diseño":** sin cantidad fija. Solo decisiones concretas con problema, intervención y valor; sin
  justificaciones, investigaciones ni métricas inventadas; una regla de negocio no es automáticamente una decisión de
  diseño. Si una decisión solo vuelve a describir el diagrama, no va (en CEMICO se quitó la del anunciador).
- **Aprobados y no se tocan:** el titular del hero ("Transformo ideas en sistemas que escalan."), "Sobre mí" (incluido el
  párrafo personal) y el "Qué aprendí" de Consultoría.

### Imágenes
- Cada texto alternativo se escribe **mirando la imagen real**, no por el nombre del archivo.
- Cuando Florencia manda imágenes para un caso, se usan exactamente esas. Los archivos nuevos van en `src/imports/` y
  los viejos que queden sin uso se informan para que ella los borre.

### Privacidad y analítica
- Google Analytics, Tag Manager y Clarity **solo cargan después de "Aceptar"** (`src/app/lib/consent.ts`). Nunca se
  pegan en `index.html` ni se agrega el `<noscript>` con iframe. "Aceptar" y "Rechazar" se ven iguales.

### Cómo se trabajan los cambios
- **No hacer commit ni push sin autorización de Florencia.** Commits separados por tema; el push lo hace ella.
- No aprovechar un pedido para modificar otras secciones, decisiones o diagramas.

## Pendientes conocidos

Detalle completo en [`docs/AUDITORIA.md`](docs/AUDITORIA.md).

- Reemplazar los 18 placeholders por los exports reales de Figma.
- Borrar el código muerto del export: `src/app/imports/` (24 archivos), `ProjectGrid.tsx`,
  `ContactSection.tsx`, `TestimonialsSection.tsx`, `WritingSection.tsx`, `data/caseStudies.ts`,
  `src/app/supabase/`, `src/app/utils/supabase/`. De 98 archivos `.ts`/`.tsx`, solo 20 se alcanzan
  desde `main.tsx`.
- Sacar `<meta name="robots" content="noindex, nofollow">` de `index.html` cuando el sitio sea público.
- Mover la carga de fuentes de `@import url(...)` en CSS a `<link>` en `index.html`.
- Clarity y Google Analytics ya cargan solo con consentimiento (`src/app/lib/consent.ts`, banner
  `CookieConsent.tsx`). Falta una página de política de privacidad a la que enlazar.
- Para ver el splash de inicio: `/?splash` lo fuerza y `/?splash=hold` lo deja quieto hasta un clic o tecla.
- Escribir los casos que hoy dicen "próximamente" en `data/projects.ts`.
- La "evidencia visual" de los casos son `<ImagePlaceholder />` vacíos, nunca hubo imágenes reales.
