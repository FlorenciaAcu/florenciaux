# Florencia UX — Design System

Documenta lo que **existe hoy** en el portfolio, después de la consolidación técnica de la fase 1. No propone un rediseño: cuando algo es un candidato a consolidar, se marca como tal.

Fuente de verdad de los tokens: `src/styles/globals.css` (importado por `src/styles/index.css`, único CSS del build).

## Principles

- **Claridad:** cada sección cumple una función editorial y tiene un solo nombre.
- **Jerarquía:** título → pregunta o subtítulo → texto → elementos de orientación (números, eyebrows, flechas).
- **Contenido primero:** el texto narrativo se muestra como párrafos; las listas solo cuando el contenido es una enumeración real.
- **Consistencia:** una sección con el mismo nombre cumple la misma función en todas las páginas.
- **Responsive:** los tamaños cambian solo en breakpoints (`sm` 40rem, `md` 48rem, `lg` 64rem, `xl` 80rem).
- **Accesibilidad:** foco visible en magenta, decoraciones con `aria-hidden`, `prefers-reduced-motion` respetado (`MotionConfig reducedMotion="user"`).

## Foundations

### Typography

Dos familias, cargadas desde Google Fonts en `index.css`:

- **Space Grotesk:** display, headings (`h1`–`h3`) y la utilidad `font-mono` (detalles "de código" y números).
- **Manrope:** texto y UI. Peso base 300; texto chico 400; `font-medium` → 400, `font-semibold`/`font-bold` → 500.

Escala compartida (clases en `globals.css`; los tamaños cambian en `md` y `lg`):

| Clase | Uso | Mobile → md → lg |
|---|---|---|
| `type-display` / `display-hero` | Display | 3rem → 5rem → 6rem |
| `hero-title` | Título del Hero (específico) | 1.875 → 3 (sm) → 3.75 → 4.5rem (xl) |
| `type-h1` | Título de sección de Home | 2.5 → 3.5 → 4.25rem |
| `type-h2` | Título de sección en detalles | 2 → 2.5 → 2.75rem |
| `type-h3` | Subtítulos, preguntas de decisiones, nombres de proyectos | 1.375 → 1.5 → 1.75rem |
| `type-s1` / `lead` | Texto destacado (contexto, resultado, aprendizaje) | 1.125 → 1.25rem |
| `type-body` / `type-s2` | Texto corrido | 1rem |
| `type-caption` | Captions, metadata | 0.875rem |
| `type-eyebrow` | Labels en mayúsculas | 0.75rem, 500 |

### Color

| Token | Valor | Uso |
|---|---|---|
| `--brand-magenta` | `#ff006e` | Marca, CTAs, acento sobre fondo oscuro |
| `--brand-magenta-strong` | `#cc0058` | Acento accesible sobre fondo claro: eyebrows, links, numeración, bullets |
| `--brand-cyan` | `#00e5ff` | Detalles puntuales |
| `--brand-cyan-strong` | `#00b8d4` | Cian del degradado sobre fondo claro |
| `--gradient-brand` | magenta-strong → cyan-strong | `.text-gradient-brand` (números 01–04, etc.) |
| `--gradient-brand-dark` | magenta → cyan | `.text-gradient-brand-dark` |
| `--text-primary` / `--text-secondary` / `--text-muted` | gray-900 / gray-700 / gray-600 | Alias de los grises de Tailwind que usan los componentes |
| `--text-inverse` | `#ffffff` | Texto sobre fondo oscuro |
| `--text-accent` / `--text-accent-inverse` | magenta-strong / magenta | Acento según el fondo |
| `--border-subtle` | gray-200 | Divisores y bordes neutros |

Utilidades de Tailwind: `text-magenta`, `text-magenta-strong`, `bg-cyan`, `bg-surface-page`, `bg-surface-dark`, etc. (definidas en `@theme inline`).

Los nombres anteriores (`--brand-primary`, `--brand-primary-dark`, `--brand-accent`, `--brand-ink`, `--brand-surface`, `--brand-surface-alt`) quedan como alias de los nuevos, porque el mapeo de shadcn (`--primary`, `--background`, `--ring`…) los usa.

### Surfaces

| Token | Valor | Uso |
|---|---|---|
| `--surface-page` | `#fafafa` | Fondo de página |
| `--surface-subtle` | `#f0f0f0` | Fondo secundario (cards, badges) |
| `--surface-elevated` | `#ffffff` | Superficies blancas |
| `--surface-dark` | `#0a0a0a` | Footer, secciones oscuras |
| `--surface-glass` | blanco 55 % | `.glass-panel` |

Efectos de vidrio existentes: `.glass-panel`, `.glass-header`, `.glass-header-dark`, `.glass-pill`. Fondos decorativos: `.bg-dot-grid`, `.bg-dot-grid-dark`, blobs animados (`.animate-blob-1/2/3`).

### Spacing

- Secciones de Home: `py-20 lg:py-36` (`--section-y` 5rem / `--section-y-lg` 9rem).
- Detalles: bloques separados con `space-y-20 lg:space-y-32`; dentro de la intro, `space-y-16 lg:space-y-24`.
- Filas de decisiones: `py-10 lg:py-12`; párrafos dentro de un bloque: `space-y-4`.

### Layout

| Token | Valor | Tailwind actual |
|---|---|---|
| `--content-wide` | 80rem | `max-w-7xl` (contenedor de página, `px-6`) |
| `--content-reading` | 48rem | `max-w-3xl` (medida de lectura) |
| `--content-narrow` | 42rem | `max-w-2xl` |

Detalles de proyecto y experiencia: grilla `lg:grid-cols-[13rem_minmax(0,1fr)]` con el índice lateral a la izquierda.

### Radius

| Token | Valor | Uso |
|---|---|---|
| `--radius-pill` | 999px | Botones y badges (`rounded-full`, el más usado) |
| `--radius-media` | 0.75rem | Imágenes y capturas (`rounded-xl`) |
| `--radius` | 1.25rem | Base de shadcn (`components/ui`) |

También se usan `rounded-2xl` y `rounded-3xl` en paneles puntuales; candidato a consolidación futura.

### Motion

Patrones que existen (librería `motion`):

- **Reveal al entrar en viewport:** `opacity 0 → 1`, `y 20 → 0`, `duration 0.5` (variantes de 0.45–0.55), `viewport once`.
- **Stagger:** `delay: i * 0.05–0.1` en listas.
- **Blobs** de fondo con keyframes largos (16–24 s).
- `prefers-reduced-motion` respetado globalmente.

## Components

| Componente | Estado | Notas |
|---|---|---|
| `Button` | Existente / reutilizable | |
| `Header` | Existente / reutilizable | Cambia a `glass-header-dark` sobre secciones con `data-header-theme="dark"` |
| `Footer` | Existente / reutilizable | Links desde `data/contact.ts` |
| `ClosingCTA` | Existente / reutilizable | Email y WhatsApp desde `data/contact.ts`; la agenda vive en `BookingModal` |
| `SEOHead` | Existente / reutilizable | Ver "Metadata" |
| Encabezados de sección (`type-h1`/`type-h2` + intro `type-s1`) | Patrón, no componente | Candidato a componente |
| Fila de proyecto destacado (`FeaturedProjects`) | Existente / específico | |
| Fila de experiencia (`ExperienceSection`) | Existente / específico | |
| `DetailHero` | Existente / específico | Incluye el selection frame alrededor del título. No es regla global del sistema |
| `CaseOutline` + `buildOutline` | Existente / reutilizable | Índice "En esta página", solo desde `lg` |
| `ExperienceIntro` | Existente / reutilizable | Qué es + metadata, El desafío, Cómo trabajé |
| `MetaList` | Existente / reutilizable | Metadata clave-valor con hairlines |
| `WorkParagraphs` | Existente / reutilizable | "Cómo trabajé" siempre en párrafos |
| Bloque de decisiones (`CaseStudyDetails`) | Existente / reutilizable | Número magenta + pregunta `type-h3` + párrafo; imagen opcional al costado |
| `ScreenGroups` (evidencia + captions) | Existente / reutilizable | `figure` + `figcaption`, `rounded-xl` + `ring-1 ring-gray-200` |
| Links de prototipos | Existente / reutilizable | Filas con `border-b` y flecha |
| `CaseStudyFeatures` (proyectos internos de InfoCasas) | Existente / específico | Contexto, exploración opcional, "Lo que diseñé" |
| `CaseStudyLearned` | Existente / reutilizable | Cierre de la página |
| Selection frame / cursor del Hero | Existente / específico | En revisión aparte. No usarlo como base del sistema |

## Patterns

### Home

Hero → DesignCodeToggle → Sobre mí → Proyectos destacados → Cómo trabajo → Experiencia → CTA de cierre → Footer.

### Project case study (`#/proyectos/:slug`)

1. Qué es (o Quién es, cuando el proyecto es la presencia de una persona)
2. El desafío
3. Cómo trabajé (párrafos)
4. Evidencia (cover y pantallas), cuando existe
5. Proyectos internos, cuando existen (InfoCasas)
6. Decisiones de diseño, cuando corresponde (pregunta + párrafo; intro opcional)
7. Prototipos, cuando existen
8. Resultado, solo con un resultado real y verificable
9. Etapas posteriores (`nextStage`), cuando existen (Juan Gas: "Etapa 2 · Datos para la operación")
10. Qué aprendí, al final

### Experience (`#/experiencia/:slug`)

1. Qué es
2. El desafío
3. Cómo trabajé
4. Proyectos (filas: "Qué hice" + "Cómo lo abordé/abordamos", link a caso o a Behance)
5. Bloques adicionales cuando corresponde (evidencia, decisiones, resultado)
6. Qué aprendí, al final

## Metadata

- Datos del sitio en `src/app/data/site.ts` (`SITE_URL`, `OG_IMAGE_PATH`, `canonicalFor`).
- Cada proyecto y experiencia acepta un campo opcional `seo` (`title`, `description`, `path`, `image`). Sin él, `src/app/data/seo.ts` deriva el título del nombre ("CEMICO | Florencia Acuña") y la descripción del primer párrafo de "Qué es".
- OG image: `public/images/og-image.png`, publicada como URL absoluta.
- **Canonical y hash routing:** el fragmento (`#/…`) no forma parte de la URL para los buscadores, así que todas las páginas son el mismo documento. Hasta migrar a rutas reales, todas declaran la raíz como canonical a propósito (`canonicalFor`). Cuando las rutas sean paths reales: `canonicalFor(path)` debe devolver `absoluteUrl(path)`, y `og:url` pasa a ser específico de cada página.

## Future patterns

Solo mencionados, sin implementar:

- **Article / Note**
- **Landing page**
