# Auditoría del repo original

Estado de `FlorenciaAcu/MigraciNPortfolio` (commit `77e8eb2`, *Add files from Figma Make*).
El repo es un export de Figma Make, con todo lo que eso implica: código de la app mezclado
con andamiaje del template y con los archivos crudos del import.

## Lo que bloqueaba el build

### 1. `react` y `react-dom` no estaban instalables

Estaban declarados solo en `peerDependencies` y marcados como `optional: true`, así que ningún gestor
de paquetes los instalaba. La app no arrancaba en una máquina limpia.
**Arreglado:** pasaron a `dependencies` en 18.3.1.

### 2. Las imágenes nunca se commitearon — el bloqueante grande

`vite.config.ts` tiene un plugin que resuelve `figma:asset/<hash>.png` contra `src/assets/`.
Esa carpeta no existía en el repo. Tampoco existían las fotos que `AboutSection` y
`GlobalImagePreloader` importan desde `src/imports/`.

`git ls-files` del repo original devuelve **cero** archivos `.png`, `.jpg`, `.jpeg`, `.svg` o `.webp`.

Archivos que se importan y faltan:

| Dónde se importa | Cuántos | Qué son |
|---|---|---|
| `components/GlobalImagePreloader.tsx` | 12 `figma:asset/*.png` | imágenes del carrusel, precargadas |
| `components/GlobalImagePreloader.tsx` | 1 `.jpg` | `Florencia_Acu_a.jpg` (foto de perfil) |
| `components/AboutSection.tsx` | 4 `.jpg`/`.jpeg`/`.JPG` | fotos personales de la sección Sobre mí |
| `components/figma/ImageWithFallback.tsx` | 1 `figma:asset/*.png` | imagen de error del fallback |

**Estado actual:** hay 18 *placeholders* generados (fondo gris, borde violeta, la palabra
PLACEHOLDER y el nombre del archivo) en `src/assets/` y `src/imports/`, con los nombres exactos que
esperan los imports. El build pasa y `pnpm dev` levanta. **Hay que reemplazarlos por los exports
reales**: mismo nombre de archivo, misma carpeta, y el código no se toca.

### 3. `@jsr/supabase__supabase-js` rompía `pnpm install`

El registro `npm.jsr.io` pide autorización y devolvía 403, cortando la instalación antes de empezar.
Ese paquete y `hono` solo los usaba `src/app/supabase/functions/server/` — boilerplate de
Edge Functions de Deno (importa con especificadores `jsr:` y `npm:`, que Vite nunca compila) que
ningún componente de la app importaba.
**Arreglado a medias:** se sacaron las dos dependencias de `package.json`, así que `npm i` ya funciona.
La carpeta `src/app/supabase/` sigue en el repo, pero es inerte: usa especificadores `jsr:`/`npm:` de
Deno que Vite nunca resuelve, y ningún componente la importa.

## Código muerto que arrastra el export

> **Nota:** en este repo el código muerto **sigue estando** — Claude no puede borrar archivos en tu
> disco de forma remota, así que la limpieza quedó pendiente para que la hagas vos (o para hacerla
> cuando haya terminal disponible). Lo que sigue es el inventario de qué se puede sacar y por qué.

### Inventario

Se recorrió el grafo de imports desde `src/main.tsx`. De 98 archivos `.ts`/`.tsx`, solo 20 eran
alcanzables desde el punto de entrada.

| Qué | Por qué se puede borrar |
|---|---|
| `src/app/imports/` (24 archivos) | volcado crudo del import de Figma: pantallas enteras duplicadas más 11 archivos `svg-*.ts`. Nada lo importaba. Era también la fuente de la mayoría de las referencias a `figma:asset` |
| `ProjectGrid.tsx`, `ContactSection.tsx`, `TestimonialsSection.tsx`, `WritingSection.tsx` | componentes que nadie renderiza. `ProjectGrid` sumaba 6 `figma:asset` más |
| `src/app/data/caseStudies.ts` | 152 líneas de contenido sin usar. `CaseStudyPage` lee de `data/projects.ts` |
| `src/app/supabase/`, `src/app/utils/supabase/` | boilerplate del template (ver arriba) |

Conviene borrarlos en un commit propio, así volver atrás es un `git revert` y nada más.

> Nota: `src/app/utils/supabase/info.tsx` traía hardcodeado el `projectId` y la `publicAnonKey` de un
> proyecto Supabase, en un repo público. La *anon key* está diseñada para ser pública (la protege RLS),
> así que no es una filtración — pero apuntaba a un proyecto que la app no usa. Conviene sacarlo junto con la carpeta.

`src/app/components/ui/` (52 componentes de shadcn/ui) también está casi todo sin usar, pero **no se
tocó**: es la librería base y conviene tenerla a mano para el rediseño. Vite no la mete en el bundle
si no se importa.

## Dependencias

`package.json` declaraba **110** dependencias. La mitad exacta eran auto-alias que genera Figma Make:
por cada paquete real había una entrada duplicada apuntando a sí misma.

```json
"clsx": "2.1.1",
"clsx@2.1.1": "npm:clsx@2.1.1",   ← ruido, instala el mismo paquete dos veces
```

Se verificó que los 55 alias tuvieran su contraparte real antes de sacarlos. Quedaron **56**
dependencias.

También estaban `@mui/material`, `@mui/icons-material`, `@emotion/*`, `react-slick`, `react-dnd`,
`recharts`, `react-day-picker`, `input-otp`, `embla-carousel-react`, `cmdk`, `vaul` — o sea, MUI y
shadcn/ui conviviendo, más un montón de librerías que el código no usa. **No se sacaron todavía**:
conviene decidirlo junto con el rediseño, porque algunas las usa `components/ui/`.

## Estilos: seis archivos CSS para dos que se usan

Solo `src/styles/index.css` entra al build, y solo importa `default_theme.css` y `globals.css`.

| Archivo | Estado |
|---|---|
| `src/styles/index.css` | **en uso** — punto de entrada |
| `src/styles/default_theme.css` | **en uso** — tokens de shadcn (120 líneas) |
| `src/styles/globals.css` | **en uso** — estilos propios (190 líneas) |
| `src/styles/theme.css` | sin referenciar (188 líneas) |
| `src/styles/tailwind.css` | sin referenciar (4 líneas) |
| `src/styles/fonts.css` | sin referenciar — es una sola línea de comentario |
| `default_shadcn_theme.css` (raíz) | sin referenciar y **byte a byte idéntico** a `src/styles/default_theme.css` |
| `postcss.config.mjs` | config vacía; Tailwind v4 va por el plugin de Vite |

Quedaron en su lugar por ahora — son decisiones del rediseño, no del build.

## Cosas que conviene mirar antes de publicar

1. **`index.html` tiene `<meta name="robots" content="noindex, nofollow">`.** Tiene sentido para un
   preview de Figma Make; para un portfolio público significa que Google no lo indexa. Hay que sacarlo
   cuando se publique en serio.
2. **Las fuentes se cargan con `@import url(fonts.googleapis.com)` dentro de `index.css`.** Un
   `@import` de CSS bloquea el render y encadena dos round-trips. Va mejor como `<link rel="preconnect">`
   más `<link rel="stylesheet">` en `index.html`.
3. **Microsoft Clarity está inline en el `<head>`** con el tag `tiqf6172y1`. Sin banner de consentimiento
   ni mención en el sitio. Si el portfolio va a recibir tráfico de la UE, hace falta cubrirlo.
4. **La "evidencia visual" de los casos son placeholders vacíos.** `CaseStudyPage` renderiza
   `<ImagePlaceholder />` tantas veces como diga `imageCount`. Nunca hubo imágenes reales de casos.
5. **El único `<img>` de la app no tiene `alt`.** El resto de las imágenes son fondos CSS, que tampoco
   son accesibles. Para un portfolio de UX es un detalle que se nota.
6. **El router por hash** (`#/proyectos`, `#/caso/:slug`) escrito a mano en `App.tsx` funciona, pero las
   URLs con `#` no se comparten bien ni se indexan. `react-router` ya está instalado.
7. **Contenido "próximamente".** Varios proyectos de `data/projects.ts` (CEMICO, entre otros) tienen el
   caso sin escribir.

## Verificación

```
pnpm install   ✓ 56 dependencias, sin errores de registro
pnpm build     ✓ built in 5.03s
               dist/assets/index.js   324 kB  (gzip 102 kB)
               dist/assets/index.css   99 kB  (gzip  16 kB)
```
