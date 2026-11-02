/** Contenido de "Cómo integro la IA en mi proceso de diseño" (ruta y SEO en data/seo.ts). Solo lo confirmado por Florencia o documentado en
 *  los casos del portfolio: no hay métricas, plazos ni cantidades inventadas. Lo que falta (el documento real de relevamiento, más ejemplos
 *  con evidencia) se suma acá sin tocar el componente: cada lista admite más elementos. */

export const AI_HERO = {
  eyebrow: "Mi forma de trabajar",
  title: "Cómo integro la IA en mi proceso de diseño",
  text: [
    "Cada proyecto comienza por entender el problema, el negocio y las personas que van a utilizar el producto.",
    "A partir de ahí defino qué necesitamos resolver, diseño las soluciones y utilizo herramientas de IA para explorar alternativas, documentar y prototipar con mayor agilidad.",
  ],
  highlight: "La IA me ayuda a explorar posibilidades. Mi criterio define cuáles tienen sentido.",
  /** Las mismas cuatro etapas que "Cómo trabajo" del Home y que AI_STAGES: un solo modelo de proceso. */
  flow: ["Descubrir", "Definir", "Diseñar", "Entregar"],
};

export const AI_START = {
  title: "Todo empieza por entender el proyecto",
  text: "Antes de diseñar, necesito conocer el negocio, qué problema queremos resolver y qué espera conseguir el cliente. Para eso comienzo con un relevamiento inicial que me permite organizar la información y definir las prioridades.",
  items: [
    { title: "El negocio", text: "Qué hace la empresa, qué ofrece y qué objetivo busca alcanzar." },
    { title: "Las personas", text: "Quiénes van a utilizar el producto, qué necesitan y en qué contexto lo harán." },
    { title: "El producto", text: "Qué existe actualmente, qué funcionalidades se necesitan y cuáles son los recorridos prioritarios." },
    { title: "El contexto técnico", text: "Qué sistemas, herramientas, recursos o restricciones tenemos que considerar." },
    { title: "El alcance", text: "Qué vamos a diseñar, cuáles son las prioridades y qué se espera entregar." },
  ],
  goal: "El objetivo de esta etapa es que tengamos una comprensión compartida del problema antes de comenzar a diseñar.",
};

export interface AiStage {
  name: string;
  goal: string;
  /** Qué hago. */
  work: string[];
  /** IA en esta etapa. */
  ai: string;
  /** Resultado posible. */
  result: string;
}

export const AI_STAGES = {
  title: "De la idea a la entrega",
  text: "Trabajo de manera iterativa: cada etapa aporta información a la siguiente y, cuando es necesario, vuelvo sobre decisiones anteriores para mejorarlas.",
  stages: [
    {
      name: "Descubrir",
      goal: "Entender antes de diseñar.",
      work: [
        "Parto del relevamiento inicial y de la información disponible. Según el proyecto, reviso documentación y converso con stakeholders o usuarios para comprender mejor el contexto y definir el alcance.",
      ],
      ai: "Me ayuda a organizar notas, estructurar información y detectar preguntas pendientes.",
      result: "Una definición más clara de las necesidades, los objetivos y el problema que queremos resolver.",
    },
    {
      name: "Definir",
      goal: "Convertir lo aprendido en una propuesta.",
      work: [
        "Organizo la información, identifico prioridades y defino cómo debería funcionar la experiencia.",
        "Puedo trabajar en arquitectura de información, flujos, requerimientos, estados y alcance funcional.",
      ],
      ai: "Me ayuda a explorar alternativas, comparar recorridos y organizar documentación.",
      result: "Una estructura de producto y una definición funcional para avanzar hacia el diseño.",
    },
    {
      name: "Diseñar",
      goal: "De los recorridos a una experiencia que se puede explorar.",
      work: [
        "Diseño interfaces, componentes y prototipos para representar cómo funcionará el producto.",
        "Según el alcance, puedo utilizar Figma, prototipos interactivos o herramientas para construir versiones funcionales.",
      ],
      ai: "Me permite explorar propuestas, prototipar y trabajar sobre determinadas interacciones con mayor agilidad.",
      result: "Una solución visual e interactiva que se puede revisar antes de su implementación.",
    },
    {
      name: "Entregar",
      goal: "Preparar el diseño para su siguiente etapa.",
      work: [
        "Organizo los archivos, componentes y documentación acordados para que el cliente o el equipo de desarrollo puedan continuar.",
        "También acompaño revisiones y ajustes cuando forman parte del alcance.",
      ],
      ai: "Puede ayudarme a organizar documentación, revisar consistencia y detectar información pendiente.",
      result: "Una entrega preparada según las necesidades del proyecto.",
    },
  ] as AiStage[],
};

/** Las dos columnas de "Qué hago yo…" comparten seis filas (grilla de 7 con el título): si cambia la cantidad, se ajusta en AIProcessPage. */
export const AI_ROLES = {
  title: "Qué hago yo y en qué me ayuda la IA",
  text: "Uso la IA como apoyo en tareas concretas del proceso. Las decisiones sobre qué se diseña, para quién y por qué siguen siendo mías.",
  mine: {
    title: "Mi criterio",
    items: [
      "Entender el problema y las necesidades.",
      "Definir prioridades.",
      "Evaluar alternativas.",
      "Tomar decisiones de diseño.",
      "Revisar la calidad del resultado.",
      "Comunicar las decisiones al cliente.",
    ],
  },
  ai: {
    title: "IA como herramienta",
    items: [
      "Organizar información.",
      "Estructurar documentación y revisar textos.",
      "Explorar propuestas.",
      "Generar primeras versiones.",
      "Construir prototipos.",
      "Asistir en determinadas tareas de código.",
    ],
  },
  /** Transparencia sobre las herramientas en una sola línea (lo documentado en los casos), sin tabla ni logos. */
  tools: "Herramientas que uso: ChatGPT y Claude para organizar y documentar, Figma y Figma Make para diseñar y prototipar, Lovable según el proyecto, y Claude Code y Codex para el código.",
  /** La frase y su contexto van juntos: es lo que más pesa de la sección. */
  quote: "No se trata de aceptar la primera respuesta, sino de saber qué conservar, qué corregir y qué descartar.",
  review:
    "Reviso que lo que propone la IA sea coherente con el problema, los requerimientos, la arquitectura, los componentes y el lenguaje del producto. Lo ajusto, lo corrijo o lo descarto antes de compartirlo.",
};

export interface AiExample {
  name: string;
  /** Qué necesitaba resolver o explorar. */
  need: string;
  /** Cómo usé IA. */
  ai: string;
  /** Mi trabajo: lo que definí, diseñé o decidí yo (no lo que hizo la herramienta). */
  mine: string;
  href: string;
}

/** Solo ejemplos con evidencia en los casos del portfolio (y en "Cómo diseñé mi portfolio"). Sin resultados ni métricas, y sin afirmar revisiones
 *  que no están documentadas: "mine" apunta a trabajo de diseño que el caso describe. */
export const AI_EXAMPLES = {
  title: "Dónde lo apliqué",
  text: "Tres proyectos documentados en este portfolio.",
  needLabel: "Qué necesitaba",
  aiLabel: "Cómo usé IA",
  mineLabel: "Mi trabajo",
  items: [
    {
      name: "CEMICO",
      need: "Explorar los flujos de tres productos y comunicar cómo funcionarían las soluciones.",
      ai: "Con Figma Make construí prototipos funcionales del portal del paciente, el portal institucional y el módulo de auditoría médica externa. No representan necesariamente las versiones finales implementadas.",
      mine: "Definí los flujos, los permisos, los componentes y los estados, como detalla el caso.",
      href: "/proyectos/cemico",
    },
    {
      name: "Buscador Agrícola",
      need: "Diseñar el MVP de un marketplace agropecuario y, mientras se desarrollaba, presentar la propuesta y captar interés.",
      ai: "Con Figma Make construí la landing de lista de espera.",
      mine: "Diseñé el MVP: la experiencia de búsqueda, las fichas de publicación y el recorrido de contacto, como detalla el caso.",
      href: "/proyectos/buscador-agricola",
    },
    {
      name: "Este portfolio",
      need: "Pasar de una primera idea a un sitio propio que pudiera seguir evolucionando.",
      ai: "Figma Make para explorar una primera versión; después, Claude Code y Codex para desarrollar el sitio en código.",
      mine: "Las decisiones sobre la experiencia, la identidad visual y la presentación de mi trabajo.",
      href: "/como-disene-mi-portfolio",
    },
  ] as AiExample[],
};

export const AI_DELIVERABLES = {
  title: "Qué recibe el cliente",
  text: "El alcance y los entregables se definen antes de comenzar. Según el trabajo acordado, una entrega puede incluir:",
  items: [
    { title: "Diseño de interfaces", text: "Pantallas y recorridos según las funcionalidades definidas." },
    { title: "Prototipo navegable", text: "Una versión para explorar los principales recorridos e interacciones." },
    { title: "Componentes", text: "Elementos reutilizables y criterios visuales para mantener consistencia." },
    { title: "Documentación", text: "Reglas funcionales, estados, comportamientos y decisiones para comprender la solución." },
    { title: "Material para desarrollo", text: "Archivos y especificaciones para acompañar la implementación." },
  ],
  shared: {
    title: "Un proceso compartido",
    text: "Durante el proyecto comparto avances y revisamos las propuestas juntos, para que las decisiones se tomen con información clara.",
  },
};

export const AI_CTA = {
  title: "¿Tenés un proyecto en mente?",
  text: "Podemos conversar sobre lo que necesitás resolver y definir cómo puedo ayudarte desde el diseño de producto.",
  cta: "Hablemos de tu proyecto",
};
