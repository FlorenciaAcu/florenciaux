# Portfolio | Florencia Acuña

Portfolio personal de **Florencia Acuña** — Product Designer (UX/UI).

Repo: [`FlorenciaAcu/florenciaux`](https://github.com/FlorenciaAcu/florenciaux).
El código viene de un export de Figma Make ([Migración Portfolio](https://github.com/FlorenciaAcu/MigraciNPortfolio),
que queda como respaldo en el remote `migracion`).

## Stack

| Pieza | Versión |
|---|---|
| React | 18.3.1 |
| Vite | 6.3.5 |
| Tailwind CSS | 4.1.12 |
| shadcn/ui (Radix) | varias |
| motion | 12.23.24 |
| TypeScript | 5.6.3 |

## Cómo correrlo

```bash
npm install     # o pnpm install
npm run dev     # servidor de desarrollo
npm run build   # build de producción a dist/
npm run preview # sirve el build
```

## Estructura

```
src/
  main.tsx                  punto de entrada
  styles/                   tokens, fuentes, tailwind, tema
  assets/                   imágenes que resuelve figma:asset/<hash>.png
  imports/                  fotos personales (jpg/jpeg)
  app/
    App.tsx                 router por hash
    components/             secciones de página + componentes propios
    components/ui/          shadcn/ui
    data/projects.ts        contenido de proyectos y casos
    data/experiences.ts     contenido de trayectoria
```

## Rutas

Router por hash, escrito a mano en `App.tsx`:

- `#/` — home (secciones `#/sobre-mi`, `#/proyectos`, `#/servicios`, `#/experiencia`, `#/contacto`)
- `#/proyectos/:slug`
- `#/caso/:slug`
- `#/trayectoria`

## Pendientes

El detalle está en [`docs/AUDITORIA.md`](docs/AUDITORIA.md). Los dos que más importan:

1. **Las imágenes reales no están en el repo.** 18 archivos binarios se importan pero nunca se
   commitearon. Hoy hay *placeholders* generados en `src/assets/` y `src/imports/` para que el
   proyecto corra. Hay que reemplazarlos por los exports reales: mismo nombre, misma carpeta,
   el código no se toca.
2. **El sitio está marcado `noindex, nofollow`** en `index.html`. Si va a ser público, hay que sacarlo.

## Licencias de terceros

Ver [`ATTRIBUTIONS.md`](ATTRIBUTIONS.md).
