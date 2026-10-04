# Florencia UX — Design System

Documenta las reglas **aprobadas** del portfolio (fase 1: consolidación técnica; fase 2B.1: foundations y normalización estructural de Home). Cuando algo es solo un candidato a consolidar, se marca como tal.

Fuente de verdad de los tokens: `src/styles/globals.css` (importado por `src/styles/index.css`, único CSS del build).

## Principles

> **Los componentes que cumplen la misma función deben compartir una regla visual. Las diferencias funcionales o editoriales pueden mantener tratamientos distintos de forma deliberada.**

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

#### Roles tipográficos

Cada función semántica tiene **un nombre principal**. Los tamaños cambian solo en `md` y `lg`.

| Rol | Clase | Función | Mobile → md → lg |
|---|---|---|---|
| Display | `type-display` | Título protagonista de una página | 3rem → 5rem → 6rem |
| Heading 1 | `type-h1` | Título principal de sección (Sobre mí, Proyectos destacados, Cómo trabajo, Experiencia, título del CTA) | 2.5 → 3.5 → 4.25rem |
| Heading 2 | `type-h2` | Bloques importantes dentro de una sección o caso (ítems destacados, secciones de los detalles) | 2 → 2.5 → 2.75rem |
| Heading 3 | `type-h3` | Subbloques, preguntas, títulos internos | 1.375 → 1.5 → 1.75rem |
| Compact item title | `type-title-compact` | Título de ítem dentro de una lista densa (empresas en Experiencia). Space Grotesk 1rem / 500 | 1rem |
| Lead | `type-s1` | Introducción destacada de una sección | 1.125 → 1.25rem |
| Body | `type-body` | Texto narrativo o corrido | 1rem |
| Caption / Meta | `type-caption` | Información secundaria: fechas, estados, captions, metadata | 0.875rem |
| Eyebrow | `type-eyebrow` | Ver regla abajo | 0.75rem, 500, mayúsculas |

- **Específico, no es regla global:** `hero-title` (1.875 → 3 en sm → 3.75 → 4.5rem en xl) pertenece al Hero, que está congelado hasta su propia fase.
- **Deprecated:** `type-s2` es un alias de `type-body`. Se conserva solo porque lo usan los bloques de los casos (`CaseStudyBlocks.tsx`). El código nuevo usa `type-body`.
- **Eliminados** (sin consumidores): `display-hero`, `display-section`, `display-block` y `lead`.

#### Eyebrow

**Eyebrow = categoría, clasificación o contexto breve que aporta información que el heading no contiene.** No es "texto chico arriba de un título".

- Válido: el sector sobre cada proyecto destacado ("Combustible" sobre Cintelink); etiquetas de UI que clasifican ("Personas con acceso"); agrupaciones del Footer ("Navegación", "Contacto").
- No válido: un kicker que repite o anuncia lo que dice el título (por eso se eliminó "Hablemos" del CTA).

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

- **Section spacing** (secciones editoriales principales de Home): `py-20 lg:py-36` (`--section-y` 5rem / `--section-y-lg` 9rem).
- **Section header rhythm** (cuando la sección tiene título → intro → contenido; Proyectos destacados, Cómo trabajo, Experiencia): título `mb-5`, intro `type-s1 max-w-3xl mb-14 lg:mb-20`.
- **Excepciones deliberadas:** el Hero (`min-h-screen`, ritmo propio), el CTA de cierre (`py-16 lg:py-24`, función de cierre) y el Footer (`py-16`).
- Detalles: bloques separados con `space-y-20 lg:space-y-32`; dentro de la intro, `space-y-16 lg:space-y-24`.
- Filas de decisiones: `py-10 lg:py-12`; párrafos dentro de un bloque: `space-y-4`.

### Layout

Cuatro conceptos distintos, que no se deben confundir:

| Concepto | Qué es | Implementación |
|---|---|---|
| **Full-width section** | La sección ocupa todo el ancho (fondo, blobs, tema del header) | `<section>` sin max-width |
| **PageContainer** | El único eje horizontal del sitio | Utilidad `page-container` (= `max-w-7xl mx-auto px-6`, definida con `@utility` en `globals.css`) |
| **Reading width** | Medida de lectura dentro del contenedor | `max-w-3xl` para intros; anchos centrados propios cuando la sección es centrada |
| **Component width** | Ancho propio de un componente | p. ej. el diálogo del CTA (`max-w-2xl`), la card del toggle (`max-w-md`) |

Regla: **toda sección de Home usa `page-container` como contenedor exterior**; si su contenido es más angosto o centrado, ese ancho va *adentro* del contenedor.

- CTA de cierre: `page-container` sin wrapper común; cada elemento tiene su propio ancho centrado: título `max-w-6xl` (ancho editorial; entra en 2 líneas desde ~1200px), descripción `max-w-3xl` (reading width), share card `max-w-4xl` (component width).
- DesignCodeToggle: `page-container` → ancho centrado `max-w-[39rem]` (ídem con `max-w-2xl`).
- Excepción pendiente: el Hero sigue con las clases de Tailwind escritas a mano (congelado).

| Token | Valor | Tailwind actual |
|---|---|---|
| `--content-wide` | 80rem | `max-w-7xl` / `page-container` |
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

### Iconography

- **Lucide** es el sistema base para iconografía funcional (acciones, información, navegación). Íconos decorativos junto a un texto o dentro de un control con nombre accesible llevan `aria-hidden="true"`.
- **SVG propio** solo cuando hay una razón: marca (`IsologoFA`), ilustración (stickers, cursor del Hero) o íconos de marca de terceros (`WhatsAppIcon`).
- **Navigation Arrow** (`NavArrow.tsx`): lleva al contenido detallado desde una fila (Proyectos destacados, Experiencia). Lucide `ArrowRight` 16px, stroke por defecto (2), en un círculo de 40px con borde gris; aparece en hover/focus de la fila (`group`), se desliza y se rellena de magenta.
- **Process Connector** (Cómo trabajo): marca de secuencia, no de navegación. Sin círculo, más liviano (stroke 1.5, magenta al 60 %), estático; `ArrowRight` desde `lg`, `ArrowDown` cuando las etapas se apilan.

### Motion

Coherencia por función: interacciones con la misma función comparten comportamiento (p. ej. la Navigation Arrow); no hace falta que interacciones distintas tengan valores idénticos. Toda animación cumple una función (narrativa, orientación o feedback) — nunca es decorativa sin propósito.

**Escala de duración** (candidata a token; hoy son valores literales en cada componente, documentados acá como referencia única):

| Nombre | Valor | Uso |
|---|---|---|
| Instant | 150ms | feedback de tap/click (`whileTap`) |
| Fast | 250ms | cambios de estado de UI: hover, focus, toggle |
| Base | 450–550ms | entradas `whileInView` estándar (reveal de secciones) |
| Slow | 700–800ms | momentos narrativos puntuales: splash, dibujo de un diagrama al entrar |

**Easing:** `[0.16, 1, 0.3, 1]` (expo-out) es el estándar de facto para toda entrada — usarlo como token, no reescribirlo a mano por componente. Loops (`repeat: Infinity`) solo con `easeInOut`, y solo para elementos ya aceptados como movimiento continuo (p. ej. el cursor del bloque de código).

Patrones que existen (librería `motion`):

- **Reveal al entrar en viewport:** `opacity 0 → 1`, `y 20 → 0`, duration *Base*, `viewport once`.
- **Stagger:** `delay: i * 0.05–0.1` en listas.
- **Tap feedback:** `whileTap={{ scale: 0.96 }}` en todos los botones (`Button.tsx`).
- **Crossfade de contenido:** `AnimatePresence mode="wait"` al cambiar de estado sin desmontar el layout (`DesignCodeToggle`).
- **Blobs** de fondo con keyframes CSS largos (16–24 s).

**`prefers-reduced-motion`, en dos capas** (antes solo cubría una):
1. `MotionConfig reducedMotion="user"` en `App.tsx` — cubre toda animación hecha con `motion/react` (reveals, crossfades, el marcador del círculo de "Cómo trabajo").
2. `@media (prefers-reduced-motion: reduce)` en `globals.css` — cubre las animaciones en **CSS puro** que `MotionConfig` no alcanza: `.animate-blob-1/2/3` y `.animate-pulse` se congelan en vez de girar o titilar. Sin esta capa, alguien con la preferencia activada igual veía las manchas de fondo moviéndose sin parar.

## Components

| Componente | Estado | Notas |
|---|---|---|
| `Button` | Existente / reutilizable | |
| `NavArrow` | Existente / reutilizable | Navigation Arrow de las filas de Proyectos destacados y Experiencia |
| `page-container` (utilidad) | Existente / reutilizable | Contenedor de página de Home |
| `Header` | Existente / reutilizable | Cambia a `glass-header-dark` sobre secciones con `data-header-theme="dark"` |
| `Footer` | Existente / reutilizable | Links desde `data/contact.ts` |
| `ClosingCTA` | Existente / reutilizable | Email y WhatsApp desde `data/contact.ts`; la agenda vive en `BookingModal` |
| `SEOHead` | Existente / reutilizable | Ver "Metadata" |
| Encabezados de sección (`type-h1` + intro `type-s1` + section header rhythm) | Patrón, no componente | Candidato a componente (`SectionHeader`) |
| Fila de proyecto destacado (`FeaturedProjects`) | Existente / específico | |
| Fila de experiencia (`ExperienceSection`) | Existente / específico | |
| `DetailHero` | Existente / específico | Apertura Product / Interface: frame general con handles, título limpio, sticker y metadata inferior. No es regla global del sistema |
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
