# Auditoría SEO — florenciaux.com (2026-11-01)

Qué se revisó: código local, `origin/main`, producción (`curl` y navegador), HTML compilado (`dist/`) y DOM renderizado.
Lo que sale de Search Console o de datos de campo se marca aparte: acá no se inventó ningún dato.

## 0. Local frente a rama principal y producción
- `HEAD` local = `origin/main` (2103a65). Producción sirve el mismo build que `main`; todo lo nuevo está sin commitear.
- En producción todavía **no existen** `/como-disene-mi-portfolio` ni `/como-trabajo-con-ia` (devuelven 404, es lo esperado) y los
  encabezados `X-Frame-Options` / `frame-ancestors` aún no están. Se activan cuando se publique.
- El sitemap de producción tiene 9 URLs con `lastmod` 2026-10-13 (fecha del build, no del contenido).

## 1. Errores confirmados
| # | Problema | Evidencia | Páginas | Estado |
|---|----------|-----------|---------|--------|
| 1 | El sitemap ponía la fecha del build como `lastmod` en todas las URLs | `sitemap.xml` de producción: todas 2026-10-13 | las 9 del sitemap | **Corregido**: sin `lastmod` (`scripts/prerender.mjs`) |
| 2 | `404.html` salía con `index, follow` y canonical al home | `curl /proyectos/no-existe`: 404 + robots index + canonical `/` | toda URL inexistente | **Corregido**: `noindex, nofollow`, sin canonical, título propio |
| 3 | En el navegador, `/proyectos/slug-inexistente` tomaba título, canonical e `index` del home | DOM: title del home, robots `index, follow` | URLs inexistentes dentro de `/proyectos/` y `/experiencia/` | **Corregido** (`App.tsx`: `noindex` + "Página no encontrada") |
| 4 | Las imágenes de los casos tenían `alt=""` (el texto estaba solo en el `aria-label` del botón) | DOM: 2–3 `<img alt="">` por caso con texto existente en `projects.ts` | los 5 casos y las 3 experiencias | **Corregido** (`CaseStudyBlocks.tsx`): `alt={image.alt}`; el nombre accesible del botón no cambia |
| 5 | "Proyectos" / "Experiencia" en las migas eran `<button>`, no enlaces | DOM de `/proyectos/cemico` | 8 detalles | **Corregido** (`DetailHero.tsx`): `<a href>` real con el mismo aspecto y el mismo router |
| 6 | Descripciones cortadas a mitad de frase con "…" | `dist/proyectos/cemico.html` terminaba en "perfiles muy…" | casos y experiencias | **Mejorado** (`clip()` corta en frase completa si queda ≥ 90 caracteres) |
| 7 | El home no traía `og:url`, `og:locale`, `og:site_name` ni `twitter:title/description/image` en el HTML estático | `index.html` | `/` | **Corregido** (`index.html`) |

## 2. Lo que está bien (verificado)
- HTTP 200 en home, casos y experiencias; `robots.txt` correcto con el sitemap; `www` es el dominio canónico (308 desde apex y `http`).
- Un solo `<h1>`, un solo `<main>` y sin saltos de nivel en las 11 páginas (DOM renderizado).
- Título y descripción únicos por página, canonical absoluto y autorreferente; `/sobre-mi`, `/proyectos`, `/experiencia` y `/contacto` apuntan al home.
- Ningún `noindex` accidental en páginas públicas. Enlaces internos son `<a href>` en filas, tarjetas, menú y pie.
- Datos estructurados Person + WebSite bien formados y con la misma fuente en navegador y build.
- Sitemap: 11 URLs absolutas (home, 5 casos, 3 experiencias y las 2 páginas editoriales), sin duplicados ni 404.

## 3. Prioridad alta, requiere decisión: el contenido no está en el HTML inicial
**Evidencia:** todas las páginas de `dist/` traen `<div id="root"></div>` vacío; el `<h1>` y el texto aparecen solo tras ejecutar JavaScript.
Google renderiza JavaScript, pero con demora y sin garantía; otros rastreadores (vista previa de LinkedIn, WhatsApp, buscadores con IA) leen solo el HTML.
Hoy `prerender.mjs` solo genera metadatos, no contenido.

Alternativas, de menor a mayor riesgo:
1. **No hacer nada y medir** en Search Console (Inspección de URL → "HTML renderizado"). Riesgo nulo; depende de Google.
2. **Contenido semántico mínimo dentro de `#root` generado desde `data/`** (h1, resumen, secciones). React lo reemplaza al montar
   (`createRoot`), sin hidratación. Riesgo: si no se oculta se ve un destello sin estilo; si se oculta, Google lo trata como contenido de menor peso.
3. **Prerender real con React** (`react-dom/server` en el build, cada ruta a HTML completo). Es lo correcto, pero el código usa `window`, `sessionStorage`,
   `motion` y `lazy`: exige un entry de servidor, imágenes resueltas en Node y probar hidratación. Es un cambio de arquitectura: no se hizo.
4. **Instantánea con navegador headless** (Playwright) al compilar. Fiel a lo que se ve, pero agrega una dependencia pesada al build de Vercel.

**Recomendación:** primero la opción 1 (con Search Console). Si "HTML renderizado" sale vacío o incompleto, ir por la 3 en una iteración aparte.

## 4. Oportunidades (no implementadas)
**Metadatos de proyectos.** Hoy el título es solo el nombre y no dice qué se diseñó. Propuesta con datos que ya existen (se aplicaría en `seo.title` / `seo.description` de cada
proyecto, sin tocar textos visibles; el título lleva además " | Florencia Acuña", así que conviene que no pase de ~40 caracteres):

| Página | Título propuesto | Descripción propuesta |
|---|---|---|
| CEMICO | CEMICO: productos digitales de salud | Diseño de productos digitales para pacientes, personal de admisión, colaboradores y auditores externos dentro del ecosistema de salud de Grupo CEMICO. |
| Buscador Agrícola | Buscador Agrícola: marketplace | Diseño del MVP de un marketplace multitienda que conecta a productores, proveedores y profesionales del sector agropecuario chileno. |
| Juan Gas GNC Club | Juan Gas GNC Club: programa de puntos | Diseño e implementación de la consulta de puntos del programa de fidelización de Juan Gas GNC Club, conectada con los datos de la estación. |
| AUDAGNO | AUDAGNO: sitio web de un estudio jurídico | Diseño e implementación del sitio web profesional de un abogado de La Plata, para presentar sus servicios y facilitar el contacto. |
| InfoCasas | InfoCasas: suscripciones y publicaciones | Diseño de flujos de suscripciones, planes y publicaciones para la web y la app de InfoCasas, plataforma inmobiliaria de Uruguay, como Product Designer para HitOcean. |
| Cintelink | Cintelink: gestión de combustible | Product Designer en Cintelink, plataforma para gestionar y controlar operaciones de abastecimiento de combustible. |
| Consultoría | Consultoría en productos digitales | Product Designer independiente: diseño productos digitales y MVPs con clientes y equipos, en distintas etapas del producto. |
| Bridgenext (antes Folcode) | Bridgenext: UX y Product Design | UX Designer y Product Designer en Bridgenext, que adquirió Folcode, empresa tecnológica de San Juan: CloudLabs, Respública y un sitio institucional. |

**Datos estructurados.** Revisar con Florencia: `description` y `knowsAbout` mencionan "plataformas SaaS", "Design Systems" y "Rediseño de apps";
"SaaS" solo aparece en `site.ts` y en un componente sin uso, no en el contenido público. Conviene quitarlo o respaldarlo.
`BreadcrumbList` se evaluó y **no se agregó**: la miga visible es "Proyectos / Caso" y su padre (`/proyectos`) declara como canonical al home;
el beneficio en un portfolio chico es bajo.

**Enlaces.** El logo del menú (`Header.tsx`) es un `<button>`, no un enlace al home. No se tocó el header por la regla del proyecto; si se autoriza, pasarlo a `<a href="/">`.

**Palabras clave.** Temas iniciales (no volúmenes confirmados): Product Design, diseño UX/UI, productos digitales, MVPs, consultoría de diseño, prototipado
funcional, IA aplicada al proceso, UX/UI en salud, operaciones y marketplaces. Ya aparecen de forma natural en el home y en los casos; la página
`/como-trabajo-con-ia` cubre IA y prototipado. No se tocaron títulos visibles para introducir palabras clave.

**Rendimiento (producción, una medición de laboratorio en escritorio, sin throttling):** FCP 1,14 s · LCP 1,29 s (imagen del hero, 155 KB) · CLS 0,018 ·
TTFB 0,44 s · JavaScript inicial 131 KB (gzip) · CSS 23 KB. Dentro de los umbrales. Oportunidades:
- La hoja de fuentes de Google (`index.html`) bloquea el render: probar `preload` + `media="print" onload` o alojar las fuentes. Mantiene la estética.
- `public/images/referencias/arc.jpg`, `mariel.jpg` y `bunny.jpg` no se usan y se publicarían: borrarlas.
- `public/sitemap.xml` es un resto que el build sobrescribe: se puede borrar.
- El hero no usa `fetchpriority="high"`; mejora marginal.

## 5. Necesita Google Search Console
- Qué URLs están indexadas y cuáles "Descubiertas, sin indexar".
- "HTML renderizado" de un caso (decide la sección 3).
- Core Web Vitals de campo (LCP/INP/CLS reales en móvil): no se pudo medir INP ni móvil desde acá.
- Enviar el sitemap y las dos páginas editoriales nuevas cuando se publiquen.
- Reemplazo de títulos/descripciones en resultados tras aplicar la sección 4.
