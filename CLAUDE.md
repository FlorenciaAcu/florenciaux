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
    App.tsx                 router por hash, escrito a mano
    components/             secciones de página
    components/ui/          shadcn/ui (casi todo sin usar, pero es la librería base)
    data/projects.ts        contenido de proyectos y casos
    data/experiences.ts     contenido de trayectoria
```

Rutas: `#/`, `#/proyectos/:slug`, `#/caso/:slug`, `#/trayectoria`, más secciones del home
(`#/sobre-mi`, `#/proyectos`, `#/servicios`, `#/experiencia`, `#/contacto`).

## Reglas del proyecto

1. **Las imágenes de `src/assets/` y `src/imports/` son placeholders.** Los archivos reales nunca se
   commitearon en el repo original. Al reemplazarlos hay que **mantener el nombre de archivo exacto y
   la carpeta** — el código importa por nombre y no se toca.
2. **No renombrar los hashes de `figma:asset/`.** `vite.config.ts` los resuelve contra `src/assets/`
   mediante el plugin `figmaAssetResolver`.
3. **`src/styles/index.css` es el único CSS que entra al build.** `theme.css`, `tailwind.css`,
   `fonts.css` y `default_shadcn_theme.css` (raíz) están sin referenciar.
4. **Los cambios de decisión se registran en `docs/`** en Markdown, no solo en el mensaje de commit.

## Pendientes conocidos

Detalle completo en [`docs/AUDITORIA.md`](docs/AUDITORIA.md).

- Reemplazar los 18 placeholders por los exports reales de Figma.
- Borrar el código muerto del export: `src/app/imports/` (24 archivos), `ProjectGrid.tsx`,
  `ContactSection.tsx`, `TestimonialsSection.tsx`, `WritingSection.tsx`, `data/caseStudies.ts`,
  `src/app/supabase/`, `src/app/utils/supabase/`. De 98 archivos `.ts`/`.tsx`, solo 20 se alcanzan
  desde `main.tsx`.
- Sacar `<meta name="robots" content="noindex, nofollow">` de `index.html` cuando el sitio sea público.
- Mover la carga de fuentes de `@import url(...)` en CSS a `<link>` en `index.html`.
- Microsoft Clarity está inline en el `<head>` sin aviso de consentimiento.
- Escribir los casos que hoy dicen "próximamente" en `data/projects.ts`.
- La "evidencia visual" de los casos son `<ImagePlaceholder />` vacíos, nunca hubo imágenes reales.
