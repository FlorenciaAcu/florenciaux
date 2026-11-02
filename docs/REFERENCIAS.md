# Cómo diseñé mi portfolio: dónde está el contenido

Página pública `/como-disene-mi-portfolio` (segunda iteración, 2026-10-30). Contenido en
[`src/app/data/referencias.ts`](../src/app/data/referencias.ts), página en `src/app/components/ReferencesPage.tsx`,
ruta y metadatos en `src/app/data/seo.ts` (`PROCESS_PATH`, `processSeo`).

## Estructura (cinco secciones, no se agregan más)
1. Cómo diseñé mi portfolio (hero con composición de escritorio).
2. Lo que quería transmitir (cuatro módulos asimétricos).
3. Cómo fue tomando forma (tres momentos y una nota sobre la IA, que no es una cuarta etapa).
4. Lo que me inspiró (moodboard de una imagen y seis ideas; la playlist vive dentro de la idea 03).
5. De las referencias a mi portfolio (cuatro ideas y la frase final).

## Reglas
- Las referencias son **ideas de diseño**, nunca personas ni sitios: sin nombres, marcas, URLs ni "Referencia 01".
  Tampoco se dice que fueron cinco.
- Primera persona, voz de Florencia, tono semiformal, sin chips. Se dice "banderitas", no "pestañas".
- No se inventan entrevistas, investigaciones, resultados ni influencias. No se afirma que se aplicó una metodología única.
- Linkin Park, Slipknot, Bring Me The Horizon e Interstellar aparecen como parte de su identidad, sin volver temático el sitio.
  Stickers originales (`vinyl`, `pick`): nada con logos ni personajes de terceros.
- La playlist ("¿Qué escucho mientras diseño?") es un enlace real a Spotify dentro de la idea 03, sin reproductor ni autoplay, y no se describe su contenido.

## Ruta y SEO
- `/como-disene-mi-portfolio` es indexable, con canónica propia, título "Cómo diseñé mi portfolio | Florencia Acuña", y está
  prerenderizada y en el sitemap (`scripts/prerender.mjs`). Se enlaza desde "Cómo trabajo" en el home.
- `/referencias-oowrobkusi23tdjo` (dirección de cuando era privada, nunca publicada) redirige a la nueva en el router.
- Una URL difícil de adivinar no era protección real; si algo debe ser privado, no va en este sitio.

## Moodboard
Hoy es una sola imagen: `public/images/referencias/moodboard-1.jpg`, un collage de seis capturas de portfolios. Florencia decidió
publicarlo con los **nombres desenfocados** (2026-11-01); las ilustraciones y obras de terceros que aparecen siguen siendo de sus
autores. Para sumar otra imagen, agregarla a `MOODBOARD` con un `alt` escrito mirando la imagen real. Van una debajo de la otra, sin
marco, con ampliación en `<dialog>`. Cualquier imagen nueva con material de terceros requiere decisión de Florencia.

## Evidencias reales (pendientes)
- **Comparación de versiones** (`EVOLUTION` en `referencias.ts`): dos capturas reales con el mismo encuadre, una de la primera versión en
  Figma Make y otra de la actual, mostrando la presentación de los proyectos. Van en `public/images/referencias/` y se alternan con
  pestañas accesibles (flechas, Inicio y Fin). Hasta que estén las dos, la sección no muestra nada. No se crean versiones históricas.
- **Derechos de uso:** las dos imágenes del moodboard pueden contener material de terceros. Se revisan antes de publicar; no se borra ni
  se retoca nada dentro de ellas sin decisión de Florencia.
- **Ejemplos que se pueden verificar en el sitio:** la hoja de cuaderno existe en "Sobre mí" (`AboutSection.tsx`) y los casos tienen
  "Prototipos" explorables dentro (`PrototypeRow` en `CaseStudyBlocks.tsx`). Si se quieren mostrar como ejemplos de las ideas 01 y 02,
  usar capturas propias exportadas a buena resolución. Los proyectos del home hoy NO se presentan como cuadernos: no afirmarlo en imágenes.

## Cierre
"De las referencias al resultado": título "Un portfolio que se sintiera mío.", la frase final sobre la hoja de cuaderno y "Explorar mis proyectos"
(lleva a `/proyectos`). No resume los aprendizajes: ya están en las seis ideas. El orden de las ideas se mantiene (01 a 06); por tema son
organización de la experiencia (01, 02, 05), identidad personal (03, 04) y presentación del trabajo (06).
