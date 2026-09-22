# Sistema de diseño y decisiones — Portfolio Florencia Acuña

Fuente de verdad de los criterios visuales. Si se cambia una decisión, se actualiza acá.

## Identidad
Negro profundo + magenta/cian neón, sensación "premium tech". Diferencial: pensar en **sistemas**, no solo pantallas. Toques personales (gatos, tecito, natación, pilates, pizza) con humor, sin perder profesionalismo.

## Colores (tokens en `src/styles/globals.css`)
| Uso | Valor |
|---|---|
| Tinta / fondos oscuros | `#0a0a0a` |
| Magenta sobre fondo **oscuro** | `#ff006e` (5.2:1 sobre negro) |
| Magenta sobre fondo **claro** (texto/botón) | `#cc0058` (5.7:1 sobre blanco) |
| Cian sobre oscuro / sobre claro | `#00e5ff` / `#00b8d4` |
| Superficie clara | `#fafafa` (secciones `/90` para dejar ver el fondo fijo) |

Regla de contraste (WCAG AA): `#ff006e` **no** se usa como texto sobre blanco; usar `#cc0058`. Texto secundario mínimo `text-gray-600` sobre claro, `text-gray-300` sobre oscuro. Evitar `gray-400/500` para texto importante.

## Tipografía (solo 2)
- **Space Grotesk** — h1/h2/h3.
- **IBM Plex Sans** — todo lo demás.

## Botones (`components/Button.tsx`)
Props `variant` (`primary` | `secondary` | `tertiary`) y `theme` (`light` | `dark`, según el fondo donde vive).
- **primary**: magenta sólido, sirve en ambos fondos.
- **secondary**: vidrio con borde; **pasar `theme="dark"` sobre fondos negros**.
- **tertiary**: solo texto magenta con subrayado al hover.
- Sin efecto magnético (movía el botón y costaba clickear).
- Textos siempre en **infinitivo**: Ver proyectos, Ver CV, Ver detalle, Contactar, Agendar videollamada, Contactar por WhatsApp, Copiar email.

## Liquid glass (`globals.css`)
`.glass-panel` (cards), `.glass-pill` (chips/toggle), `.glass-header` / `.glass-header-dark` (header).
- El header **cambia de tinte** según lo que tiene detrás: las secciones oscuras llevan `data-header-theme="dark"` (Hero, ClosingCTA, Footer, DetailHero). Una sección oscura nueva **debe** llevar ese atributo o el nav queda ilegible. El tema se decide según lo que hay detrás del **punto medio** del header (no del borde), se calcula antes de pintar (sin parpadeo) y también cambia el isologo (chip magenta sobre oscuro) y el ícono del menú mobile.
- El blur está en 16px a propósito: más es pesado en celulares.
- Los chips de adentro de una card de vidrio llevan fondo blanco + borde (`border-gray-300`) para que se distingan.

## Stickers (`components/Stickers.tsx`)
Ilustraciones SVG propias. Personales (home): `cat`, `mug`, `pizza`, `fries`, `swim`, `pilates`, `laptop`, `flag`. De cliente/proyecto (páginas de detalle): `pump`, `code`, `health`, `agro`, `cylinder`, `scales`. Borde blanco = copia gruesa del dibujo detrás; sombra = copia oscura desplazada.
**No usar `filter`/`drop-shadow` CSS sobre los SVG**: cuelga el render. Para sumar uno nuevo: dibujarlo en `viewBox 0 0 100 100` y agregarlo al mapa `art`.

## Hero
Oscuro, `min-h-screen`, foto (`src/imports/hero-flor.jpg`, 1100px optimizada desde `DSC_9404.JPG`) con marco de degradé neón. El titular simula una capa de texto seleccionada en una herramienta de diseño (marco de selección y cursor "Florencia"; decorativo, `aria-hidden`, el cursor solo ≥ md). La toolbar tipo editor de texto se probó y se sacó: no quedaba bien en desktop. Botón "Descubrí más" scrollea a la sección siguiente con 96px de aire.

## Loader (`components/SplashLoader.tsx`)
"ACUÑA" con degradé por letra, ~2 s, **una vez por sesión** (`sessionStorage: fa-splash-seen`). Se omite con `prefers-reduced-motion`. Para verlo: abrir con `?splash` en la URL (`http://localhost:5173/?splash#/`). El hero espera al loader (`useSplashDone`) para animar su entrada.

## Contacto
Constantes en `src/app/data/contact.ts` (mail, WhatsApp, CV, agenda).
- **Agenda:** "Agendar videollamada" abre `BookingModal`: la página de reservas de Google Calendar ("Videollamada inicial", 30 min) dentro de una ventana, sin sacar al visitante del sitio. Tiene enlace "Abrir en otra pestaña" (`SCHEDULE_URL`) por si el navegador bloquea el iframe. La disponibilidad, duración y textos se editan en Google Calendar, no en el código.
- El botón "Contactar" del header lleva al bloque `#contacto` (`ClosingCTA`), que va al final del home, antes del footer.
- `ClosingCTA` = ventana tipo "Compartir" de Figma ("Compartir «Tu próximo producto»", personas con acceso: Florencia y Vos).

## Estructura del home
Hero → DesignCodeToggle → Sobre mí → Proyectos → Servicios → **Cómo trabajo** → Experiencia → **Contacto** → Footer.

## Cómo trabajo (`ProcessSection.tsx`)
4 etapas encadenadas (Descubrir → **Definir** → Diseñar → Entregar; "Definir" reemplazó a "Estructurar" para alinearse con Design Thinking / doble diamante); cada una muestra `input` / `output` en una mini caja tipo código (lenguaje dev, conecta con el toggle "Modo código") para reforzar la idea de sistema. El contenido sale de los bios de `experiences.ts`: ajustar si el proceso real difiere.

## Cursor de patita (desactivado)
`components/CustomCursor.tsx` está guardado pero **no se monta** en `App.tsx`: se sacó por el momento para aliviar la web. Para reactivarlo, importarlo y renderizar `<CustomCursor />` en cada rama de `AppRoutes`. Ya oculta la patita sobre iframes (ej. la agenda).

## Encabezado de páginas de detalle (`DetailHero`)
**Minimalista pero con vida: botón de volver (ícono redondo, sin texto visible; el `aria-label` sí lo lleva) + título (h1) enmarcado como una capa seleccionada en una herramienta de diseño** (marco cian con 4 manijas: el mismo recurso del hero del home) **+ un sticker a un costado en desktop, distinto en cada página** (**relacionado con el cliente o el proyecto**; mapa `detailStickers` en `Stickers.tsx`: Cintelink → surtidor con señal IoT, Consultoría → laptop con Figma, Folcode → ventana con `</>`, CEMICO → corazón con cruz, Buscador Agrícola → lupa sobre una espiga, Juan Gas → garrafa GNC, Juan Audagno → balanza de la justicia; el gato queda como reserva. Al sumar una página, dibujarle su sticker y agregarlo al mapa) sobre fondo negro con grilla de puntos y blobs neón. Opcionales, siempre como **texto simple, sin chips ni píldoras**: ubicación y sitio web de la empresa (`location`/`website` en `Experience`) y la descripción (`max-w-2xl`). Se probó un chip con el período/rubro y se descartó. Si hay logo del cliente, va en ese mismo lugar. Lo usan `ExperiencePage` y `CaseStudyPage`.
- **Todas las experiencias tienen la misma estructura**, estén o no en Proyectos destacados: encabezado (solo ícono + título) → tarjeta **"Mi trabajo"** (`ExperienceIntro`: descripción, y el período chico y gris arriba a la derecha, sin destacar) → bloques del caso solo si hay `caseStudy` (`CaseStudyDetails`, y "Qué es…" al lado de "Mi trabajo") → proyectos. No hacer variantes según tenga o no caso.

## Cintelink (página de detalle)
Datos en `src/app/data/experiences.ts` (`caseStudy` y `projects`), bloques en `components/CaseStudyBlocks.tsx`; `ExperiencePage` los muestra solo si la experiencia trae `caseStudy`. Orden: qué es Cintelink + mi trabajo → "Diseñar pantallas que conviven con dispositivos IoT" (cuatro preguntas de diseño —datos y métricas, datos ausentes, contingencias, experiencia física operador/IoT/plataforma— y foto de consola + dashboard) → cómo se veía en la práctica (3 fotos) → proyectos.
- **Hay contrato de confidencialidad: todo se cuenta desde el aporte de UX/Product Design, nunca desde el funcionamiento interno de la empresa.** No describir arquitectura, autorizaciones/tokens, hardware específico, clientes ni procesos internos. Se sacó una versión anterior con un "recorrido del sistema" y "patrones" por ese motivo.
- **Cada proyecto se cuenta con `brief` (qué hice), `how` (cómo lo abordé) y, opcional, `example`.** Los seis textos actuales salen del relato propio de Florencia (no de documentos internos). Los ejemplos que había escrito yo se sacaron porque no eran correctos. **Solo volver a agregar un `example` si sale de ella** (una decisión de diseño concreta, sin datos internos de la empresa).
- La tarjeta de la plataforma se llama "Diseño y rediseño de la plataforma" (no solo "Rediseño"): antes no había una home/dashboard y algunas áreas eran productos nuevos y otras rediseños casi desde cero. Por eso no lleva "ejemplo antes/después".
- **Decisiones destacadas:** datos y métricas que sirven a la operación, qué mostrar cuando un dato no está, contingencias cuando falla un dispositivo IoT, y la experiencia física operador–IoT–plataforma.
- **Persona gramatical:** todo fue una construcción conjunta: Florencia trabajaba siempre con el equipo de desarrollo y con producto (sin detallar cuántas personas ni sus cargos: se probó y no aporta), dicho como primer punto de "Mi trabajo". Por eso **"Qué hice" va en singular** (lo que diseñó Florencia: "Diseñé…") y **"Cómo lo abordamos" va en plural** (las decisiones: "Priorizamos…", "Simplificamos…"). También protege de sobreatribuir.
- **Redacción:** solo responsabilidades confirmadas ("trabajé en", "diseñé"). Sin métricas ni resultados inventados. Se evitó "lideré" (no está confirmado).
- **Pantallas ("Algunas pantallas"):** 3 de la plataforma web (`cintelink-pantalla-vista-general/analitica/stock.jpg`) y 2 de la app de Añelo en tablet (`anelo-tablet-consola/vale.jpg`), pasadas por Florencia. Se recortó el marco del navegador y la barra de Windows; "Transacciones de consumo" y "Stock de productos" se recortaron al **mismo alto** (1280×989); en Transacciones se ve el comienzo de la tabla con las columnas **Estación, Flota y Operador desenfocadas**, y en Stock la columna **Estación** también (tenían nombres de estaciones, empresas y personas; desenfoque gaussiano fuerte, ilegible). Cada grupo tiene su proporción de recuadro (`aspect` en `screenGroups`) para que todas las imágenes se vean a la misma escala y pegadas arriba. Los datos parecen de ejemplo, pero **hay que confirmar que se pueden publicar** (NDA) antes de subirlas. Los pies de foto describen solo lo que se ve en la pantalla. Cada imagen abre completa en otra pestaña. Para sacarlas: borrar `screensTitle` y `screenGroups` de `caseStudy`.
- **Fotos:** `cintelink-consola-dashboard.jpg` (sin personas), `cintelink-consola-campo.jpg` (recortada para no mostrar datos de un proveedor externo) y la de la app demo en Expo Transporte. La foto del tótem en la expo de minería de San Juan (`cintelink-totem-expo.jpg`) se sacó de la página a pedido de Florencia; el archivo quedó sin usar en `src/imports/`. Eventos públicos. Confirmar con la empresa antes de sumar más.
- **Ubicación y sitio:** "Córdoba, Argentina" y el link `cintelink.com` van bajo el título del encabezado (campos `location` y `website` de la experiencia). El link apunta a `https://cintelink.com/views/login`, tal como lo pasó Florencia (es la pantalla de login).
- El texto del home (Proyectos destacados y Experiencia) sale del mismo `experiences.ts`.

## Storytelling de los casos (reglas de Florencia)
- **Asumir que quien lee no conoce el producto, la industria ni lo que hizo** (RR. HH., UX lead, CTO, CPO), pero **sin convertir el caso en documentación técnica**: se explica solo lo necesario para entender el problema y las decisiones.
- **Orden de lectura:** Qué es → El problema/desafío → Mi trabajo → Decisiones de diseño → Evidencia (pantallas, fotos, proyectos) → Resultado → Qué aprendí. (En Cintelink, "Qué aprendí" va al final, después de la lista de proyectos.)
- **La apertura no habla de tecnología** (IoT, machine learning, blockchain, Smart Contracts): esas palabras aparecen recién cuando hacen falta para explicar una solución concreta. Se explica qué hace el producto y quién lo usa.
- **Glosario mínimo** (`caseStudy.terms`): solo los conceptos necesarios (en Cintelink: despacho, consola, cargadero), con las definiciones de Florencia.
- **Nombres internos sin contexto no van** ("Dashboard Pedestal", "Añelo", "YPF UNICCO"): los proyectos se titulan por lo que resolvían. Si se quieren mostrar, explicar primero qué resolvían.
- **Nada de impacto cuantitativo inventado.** Sin métricas, se muestran resultados verificables: qué se diseñó, qué llegó a producción, qué problema resolvía cada parte. **Si falta el porqué de una decisión, se marca y se completa con ella antes de escribirlo como hecho**; nunca justificar con supuestos sobre usuarios sin documentar.
- **"Lo más importante"** es una idea de diseño, no un eslogan, y va **en infinitivo** en todos los casos (Cintelink: "Entender la relación entre la experiencia digital y una operación física real."; Buscador: "Facilitar la búsqueda y el contacto entre quienes buscan y quienes ofrecen.").
- **Necesidades del producto** (ej. registrar usuarios para construir una base de oferta y demanda) se cuentan como **necesidad del producto que condicionó una decisión de UX**, nunca como estrategia que definió ella.

## Cómo se lee un caso: fraccionar, no recortar
Criterio de Florencia: una persona que quiere contratarla lee poco tiempo, pero quien quiere profundizar sigue scrolleando. **No se elimina información importante: se parte en piezas** con distintos elementos, y **lo más importante va en la primera pantalla**.
- **Resumen arriba de todo** (`caseStudy.highlights`, tres bloques bajo el encabezado) **siempre con los mismos tres, en todos los casos: Rol, Qué diseñé y Lo más importante** (consistencia; no poner "Con quién trabajé"). "Rol" va solo con "Product Designer". "Lo más importante" **lo dice Florencia**: en Buscador, "Que contactar a la empresa sea sencillo"; en Cintelink se usó su propia frase de presentación ("Experiencias digitales integradas con dispositivos IoT") hasta que ella diga otra. Sale de textos que ya estaban en la página (no se inventa nada).
- **Tarjetas de proyecto:** "Qué hice" en un párrafo corto; "Cómo lo abordamos" (y "Un ejemplo") **partido en oraciones cortas con viñetas** (función `splitSentences`: no cambia las palabras) y separado por una línea.
- **"Qué aprendí"** (`caseStudy.learned`): reflexión de una o dos líneas **con las palabras exactas de Florencia**, al final del caso (después de "Resultado"), en una cita con línea magenta. No redactarla ni "mejorarla": es suya.
- **Panel de decisiones (mismo en todos los casos):** eyebrow fijo "Decisiones de diseño" + título (el desafío) + una línea de introducción + **tres tarjetas** (una por decisión) con ícono, **la pregunta** como título y la respuesta en oraciones cortas con viñetas + la imagen a la derecha, fija (`sticky`) mientras se leen las tarjetas. **Sin numeración** (no aporta y ocupa lugar) y **sin resaltar una decisión** (eso ya lo dice "Lo más importante").
- **Cómo se escriben las preguntas** (de "El arte de las preguntas poderosas", que pasó Florencia): abiertas, que empiecen con **Qué / Cómo** (evitar sí/no y preguntas vagas como "¿Qué pasa entre explorar y contactar?"); con **alcance preciso** (nombrar de qué se trata: "¿Qué información necesita alguien antes de escribirle a una empresa?"); y **sin supuestos escondidos**. La respuesta nombra el entregable (pantalla, flujo, ficha, filtros, estados) y nunca dice algo obvio ("organicé la información para poder evaluar"). **Máximo tres decisiones por caso**: si hay más, unir las que hablan de lo mismo.
- **Orden de los bloques:** resumen → Qué es + Mi trabajo → decisiones → **pantallas** → fotos → proyectos. Lo más visual va antes que las fotos de contexto.
- Al escribir un caso nuevo: primero redactar las tres frases del resumen, después el detalle.

## Cómo se redacta cada proyecto (misma voz que Cintelink)
- **Todo se cuenta en primera persona, como lo diría Florencia**: lo que hice ("Diseñé", "Organicé"), lo que me fijé ("Me fijé en que…") y las preguntas que me hice. Tiene que notarse que ella lo escribe. Nunca en tercera persona ni con tono de descripción comercial del producto.
- **Mismo enfoque en todos los proyectos:** solo su aporte como UX/Product Designer; una frase de contexto; decisiones como **preguntas** ("¿Cómo…?", "¿Qué pasa cuando…?") con la respuesta desde su diseño; tarjeta "Mi trabajo"; capturas que muestran cada decisión. Si el proyecto es de equipo, ver la regla del plural más arriba.
- **Nada inventado:** ni motivos de los usuarios, ni métricas, ni tareas. Si hay una duda, mirar el producto en producción (ella dejó el link) o preguntarle.

## Buscador Agrícola (caso completo)
Datos en `src/app/data/projects.ts` (`caseStudy`, `duration`, `roleIntro`, `location`, `website`). Usa la **misma estructura que las experiencias**: encabezado → "Qué es…" + tarjeta "Mi trabajo" (`ExperienceIntro`) → panel oscuro de decisiones con la Home a la derecha → pantallas → resultado (`CaseStudyDetails`). Los proyectos sin `caseStudy` (Juan Gas, Audagno) siguen con el diseño provisorio "próximamente".
- **Alcance confirmado por Florencia** (último documento): Product Designer en el **MVP**, 2 meses, cliente Agro360 (Chile). Arquitectura de información, búsqueda y navegación, categorías, filtros por cultivo y ubicación (Región → Ciudad → Comuna), resultados en listado y en mapa, fichas de productos, listado y perfil de empresas y la **pantalla y el flujo de contacto** con la empresa (nunca decir "diseñé el contacto") (confirmado: diseñó todo lo que ve la persona que busca).
- **No atribuirle:** gestión de publicaciones, suscripciones, publicidad, estrategia comercial, modelo de negocio, pricing, ventas ni gestión comercial de empresas. "Perfil comercial" era un error de redacción: es el perfil de la empresa, que sí diseñó.
- **La decisión clave (dicha por Florencia): que contactar a la empresa sea sencillo.** **No nombrar el registro** en el caso: depende del usuario. La lógica de negocio de captar usuarios registrados es contexto interno; no atribuirle la estrategia ni contarla. Antes se había escrito una versión sobre "registro y captación de demanda" y ella la descartó dos veces.
- **No decir:** que las empresas tienen un perfil abierto con todos sus datos; que el objetivo era mostrar quién está detrás de cada publicación; que es un directorio abierto ni un ecommerce; motivos psicológicos de los usuarios ("algunos saben qué quieren y otros no") ni sistemas de atributos distintos por categoría (sin research o evidencia); métricas de usuarios, empresas o publicaciones; "vendedores verificados" ni valoraciones; los números de la waitlist; nombres, precios o reglas de planes.
- **No decir que "no hay carrito, checkout ni pago"**: es cierto solo de esta primera versión y puede cambiar. Se habla del MVP sin afirmar lo que no tiene.
- **Voz:** singular ("Organicé", "Diseñé", "trabajé") para lo que ella confirmó; aún no dijo cómo fue el trabajo con el equipo en este proyecto.
- **Imágenes:** la **Home** (`buscador-home.jpg`) va dentro del panel oscuro, como la foto de Cintelink. "Algunas pantallas" lleva el **listado de empresas** y el **perfil de una empresa**, grandes (`max-w-5xl`). Los pies describen solo lo que se ve. Todas están recortadas **sin el footer** (tiene el mail y el teléfono del cliente); en el perfil se desenfocaron los datos de contacto. `buscador-waitlist-mobile.jpg` (178 px de ancho) quedó sin usar. Faltan capturas de resultados con filtros, la ficha de producto y mobile; una captura del paso de registro para contactar sería la mejor evidencia de la decisión clave.
- **"Antes del lanzamiento" (bloque `prototypes`, el mismo que en CEMICO):** una tarjeta con link a `buscadoragricolacl.figma.site`, la landing/waitlist que Florencia hizo con Figma Make antes del lanzamiento del MVP. Va después de "Algunas pantallas" y antes de "Resultado".

## CEMICO (caso completo)
Datos en `src/app/data/projects.ts` (`caseStudy`). Misma estructura que Buscador Agrícola, pero **sin capturas todavía** (`decisionsImage`/`screenGroups` sin usar) y con un bloque nuevo, `transversal`: una solución transversal presentada como afirmación, no como pregunta (recuadro cian claro dentro del panel oscuro, sin ícono). Se usa para el Design System, que no tiene una pregunta de diseño propia.
- **Fuente:** documento maestro de Florencia sobre CEMICO (Grupo CEMICO, industria salud). **Alcance confirmado, cinco frentes:** Design System, Anunciador de Pacientes, Auditoría Médica Externa, Portal del Paciente, Portal Institucional. La gestión de turnos es parte del Portal del Paciente, **no un proyecto aparte** ("Turnero"). No incluir App de Enfermería ni Reporte de Incidentes: no están confirmados.
- **Tres decisiones + 1 transversal** (no 5, para no forzar una decisión por producto): Anunciador (continuidad entre tótem → Admisión → TV, con múltiples motivos como evidencia de complejidad dentro de esa misma decisión, sin justificar por qué "ausente" tiene prioridad visual porque no está confirmado), Portal del Paciente (paciente activo cuando una cuenta gestiona a más de una persona, sin inventar el origen de la solución), Auditoría (acceso unificado a información que antes dependía de sistemas y clínicas distintas; la diferencia entre cuenta genérica e individual es una regla del producto, no de Florencia), y el Design System como bloque transversal, no como decisión con pregunta.
- **"Lo más importante"** pasó por tres versiones antes de esta: "Experiencias digitales integradas con dispositivos IoT" (descartada, era un eslogan), "Diseñar experiencias consistentes para usuarios y contextos muy diferentes" (descartada: pone el foco en la consistencia, que es más bien el objetivo del Design System) → **"Entender cómo lo digital forma parte de una experiencia de salud que también sucede fuera de la pantalla."** No dice que diseñó el servicio presencial completo, solo que necesitó entenderlo para diseñar la parte digital.
- **Resultado:** cierra el caso en un párrafo, no una lista de entregables. Sin decir "llegó a producción": eso se confirma producto por producto y todavía no está confirmado.
- **No hay `learned` ("Qué aprendí") todavía**: pendiente de que Florencia lo escriba, como en Cintelink y Buscador.
- **Sin capturas todavía, pero con evidencia real:** un bloque nuevo, "Prototipos" (`prototypes`/`prototypesTitle`/`prototypesNote` en `CaseStudy`), muestra tarjetas con links a los prototipos navegables que Florencia hizo con **Figma Make** (Portal del Paciente, Portal Institucional, Auditoría Médica Externa), publicados como Figma Sites. La nota deja claro que **no son necesariamente la versión final implementada**. El archivo de Figma del Anunciador no se linkeó: es un archivo de diseño editable, no una URL pública confirmada (según su propio documento).
- **Ubicación y sitio:** "Neuquén, Argentina" y el link a `portalsalud.grupocemico.com.ar` (la pantalla de login del portal **real y existente**, que fue contexto de análisis para el rediseño — no confundir con los prototipos de Florencia, que son otra cosa).
- Cuando haya capturas: priorizar el Anunciador (tótem + dashboard + TV juntos, para mostrar que son el mismo sistema) y el Portal del Paciente (cambio de paciente activo).

## Accesibilidad (WCAG AA): cómo se verificó
- **Auditoría automática con axe-core** (reglas WCAG 2.0/2.1/2.2 A y AA + buenas prácticas) sobre **todas las páginas**: home, Cintelink, Buscador Agrícola, Folcode, Consultoría, CEMICO, Juan Gas, Juan Audagno, Trayectoria y Proyectos, más el **menú del celular** y la **ventana de agenda**. Resultado final: **0 violaciones**. (Se cargó axe desde el navegador de prueba; no es una dependencia del proyecto.) Una herramienta automática no cubre todo: la nota del footer dice "criterios de accesibilidad WCAG AA", no "cumple".
- **Problemas reales que apareció y se corrigieron:** números grandes de Proyectos con contraste 1.19:1 (ahora son decorativos, dibujados con CSS y ocultos a lectores de pantalla); fechas de Experiencia y textos del footer con gray-400/500 sobre fondos que no llegaban a 4.5:1; **filas de Proyectos y Experiencia clicables solo con mouse** (ahora son enlaces reales, con foco visible); el bloque de contacto sin zona de navegación (`aria-label="Contacto"`); título "Mi trabajo" que saltaba un nivel de encabezados; "Imagen pendiente" con poco contraste.
- **Regla:** texto secundario sobre claro = `text-gray-600` como mínimo (se reemplazó todo `text-gray-500`); sobre oscuro = `text-gray-400` o más claro. **Toda fila o tarjeta clicable debe ser un `<a>` o `<button>`**, nunca un `<div onClick>`.
- Para volver a auditar: cargar `https://cdn.jsdelivr.net/npm/axe-core@4.10.0/axe.min.js` en la consola de la página y correr `axe.run()` en cada ruta.

## Notas de trabajo
- Fotos: `src/imports/` conserva los **nombres exactos** de archivo (ver CLAUDE.md). Las fotos pesadas (>1 MB) conviene optimizarlas antes de usarlas en el home.
- El navegador de vista previa de Claude renderiza por software: con muchos `backdrop-filter` las capturas pueden salir en blanco o desfasadas. No es un bug de la página.
