/** Contenido de la página pública "Cómo diseñé mi portfolio" (ReferencesPage.tsx, ruta en data/seo.ts). Primera persona, voz de Florencia.
 *  Fuente editorial: lo que ella escribió; no se inventan hechos, aplicaciones ni influencias.
 *  Las referencias se presentan como ideas de diseño, nunca como una lista de personas o sitios: sin nombres, marcas ni URLs de terceros.
 *  Se dice "banderitas", no "pestañas". Sin chips. Cada string de un texto es un párrafo. */

export const HERO = {
  eyebrow: "Proceso de diseño de mi portfolio",
  title: "Cómo diseñé mi portfolio",
  text: "Quería que se sintiera como mi escritorio real: cuaderno, sticky notes, banderitas y stickers. Que quien lo vea piense: “Esto es muy Flor”.",
};

export const CONVEY = {
  title: "Lo que quería transmitir",
  text: "Quería que mi portfolio mostrara mi trabajo, pero también algo de mi personalidad. Que quien lo recorriera pudiera conocer mis proyectos, encontrar pequeños detalles que hablaran de mí y hacerse una idea de cómo sería trabajar conmigo. No solo ver los resultados, sino entender las decisiones detrás de ellos.",
  items: [
    { title: "Mi escritorio real", text: "Cuaderno, sticky notes y pizarra. Elementos que forman parte de mi día a día." },
    { title: "Organizar varias tareas", text: "Banderitas para ordenar ideas, proyectos e información." },
    { title: "Personalidad", text: "Stickers y pequeños detalles que hacen que el espacio se sienta mío." },
    { title: "Pensar en sistemas", text: "No solo diseño interfaces: también pienso cómo funcionan y cómo evolucionan." },
  ],
};

export const SHAPE = {
  title: "Cómo fue tomando forma",
  text: "Empezó como una idea en Figma Make y terminó convirtiéndose en un sitio propio que sigo desarrollando.",
  ai: {
    title: "La IA también formó parte del proceso",
    text: "Utilicé herramientas de IA para explorar alternativas, organizar contenido, prototipar y trabajar sobre el código. Me ayudaron a iterar con mayor agilidad, pero las decisiones sobre la experiencia y la presentación de mi trabajo siguieron siendo mías.",
  },
  moments: [
    {
      title: "Explorar la idea",
      text: "Creé la primera versión en Figma Make, probando cómo transformar mi escritorio en una experiencia digital.",
    },
    {
      title: "Llevarlo al código",
      text: "Migré el proyecto a GitHub y empecé a desarrollarlo con Claude Code y Codex para tener más control sobre su evolución.",
    },
    {
      title: "Publicarlo y seguir mejorándolo",
      text: "Publiqué el sitio en Vercel y continúo ajustando su contenido, diseño y funcionamiento.",
    },
  ],
};

export interface MoodboardImage {
  src: string;
  /** Se escribe mirando la imagen real. */
  alt: string;
}

/** Imágenes del moodboard, en orden, una debajo de la otra. Es un collage de seis capturas de portfolios; Florencia decidió publicarlo
 *  con los nombres desenfocados (public/images/referencias/moodboard-1.jpg). */
export const MOODBOARD: MoodboardImage[] = [
  {
    src: "/images/referencias/moodboard-1.jpg",
    alt: "Collage de seis portfolios de diseño: una portada clara con la ilustración de una persona, otra con un personaje de videojuego, una vitrina de álbumes sobre fondo oscuro con un conejo 3D, un escritorio 3D con gatos y una pantalla violeta, un paisaje dorado con un anillo de luz y un cuaderno verde con stickers. Los nombres aparecen desenfocados.",
  },
];

export interface EvolutionVersion {
  /** Texto del botón que alterna la vista. */
  label: string;
  src: string;
  /** Se escribe mirando la captura real. */
  alt: string;
}

/** Comparación entre la primera versión (Figma Make) y la actual, solo con capturas reales de la presentación de los proyectos.
 *  Hasta que estén las dos capturas no se muestra nada (no se crean versiones históricas). Archivos sugeridos:
 *  public/images/referencias/evolucion-figma-make.jpg y evolucion-actual.jpg, con el mismo encuadre. */
export const EVOLUTION: { before?: EvolutionVersion; after?: EvolutionVersion } = {};

export const INSPIRED = {
  title: "Lo que me inspiró",
  text: "Exploré distintas formas de mostrar proyectos y dar personalidad a un portfolio.",
};

/** Detalle personal dentro de la idea 03 ("Construir una atmósfera propia"), donde se habla de la música. El enlace es real; no se describe su contenido. */
export const PLAYLIST = {
  url: "https://open.spotify.com/playlist/3qd2y7Jg7A1CKroCHTXW7X",
  title: "¿Qué escucho mientras diseño?",
  text: "Mi playlist para acompañar las ideas.",
  cta: "Escuchar mi playlist",
};

export interface Concept {
  title: string;
  /** Un string = un párrafo. Vacío cuando la idea se dice solo con la cita. */
  text: string[];
  /** Frase destacada (solo la 04). */
  quote?: string;
}

/** Seis ideas de diseño que encontré explorando; ninguna depende de quién las hizo. Textos directos, sin relleno. */
export const CONCEPTS: Concept[] = [
  {
    title: "El cuaderno como navegación",
    text: [
      "Me gustó cómo un objeto cotidiano puede organizar proyectos y contenidos. Esa idea conectó con mi forma de trabajar y la llevé a la presentación de mis casos.",
    ],
  },
  {
    title: "El escritorio como interfaz",
    text: [
      "Me interesó cómo una computadora puede convertirse en una experiencia de navegación. También tomé la idea de mostrar sitios y prototipos explorables dentro de los proyectos.",
    ],
  },
  {
    title: "Construir una atmósfera propia",
    text: [
      "Descubrí cómo el cine y la música pueden inspirar la identidad de un sitio. En mi portfolio, la estética de Linkin Park influyó en la elección de colores.",
    ],
  },
  {
    title: "La personalidad en los detalles",
    quote: "Un gusto personal puede convertirse en un elemento visual recurrente y hacer que un sitio resulte más reconocible.",
    text: [],
  },
  {
    title: "Una discografía como estructura de contenido",
    text: [
      "Me llamó la atención cómo algunos portfolios presentan sus proyectos como álbumes musicales, convirtiendo una referencia personal en una forma de organizar el contenido.",
      "Consideré explorar una idea similar, pero para mi portfolio prioricé una navegación más directa y fácil de recorrer.",
    ],
  },
  {
    title: "Contar el proceso, no solo mostrar las pantallas",
    text: [
      "Las referencias me hicieron revisar cómo presentaba mis casos. Quería mostrar el contexto, mi participación, las decisiones de diseño y los aprendizajes, no solo el resultado visual.",
    ],
  },
];

/** Cierre: una conclusión, no un resumen. Los aprendizajes ya están en las seis ideas. */
export const CLOSING = {
  title: "Un portfolio que se sintiera mío.",
  cta: "Explorar mis proyectos",
  quote:
    "De todas esas referencias fui encontrando mi propio equilibrio: un portfolio que se sintiera mío, pero donde lo más importante siguiera siendo poder conocer mi trabajo.",
};
