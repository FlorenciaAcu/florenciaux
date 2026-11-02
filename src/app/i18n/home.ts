import { EDITORIAL_LINKS } from "../data/seo";

/** Contenido propio de la Home (y de sus secciones) en los dos idiomas. El español son las mismas palabras que estaban dentro de los componentes
 *  (aprobadas, no se tocan); el inglés tiene que tener exactamente la misma forma (`HomeCopy`). Lo que la Home toma de `data/projects.ts` y
 *  `data/experiences.ts` en español (nombres de empresas, resúmenes) se traduce en `homeEnOverlay`, abajo. */

export const homeEs = {
  hero: {
    badge: "Florencia Acuña — Product Designer",
    titleA: "Transformo ideas en",
    titleB: "sistemas que escalan.",
    subtitle: "Investigo, defino y diseño con criterio de producto, y complemento mi trabajo con IA.",
    ctaProjects: "Ver proyectos",
    ctaCv: "Ver CV",
    photoAlt: "Florencia Acuña trabajando en su notebook al aire libre",
    available: "Disponible para nuevos proyectos",
    scroll: "Descubrir más",
  },
  about: {
    title: "Sobre mí",
    paragraphs: [
      "Soy Product Designer con más de cinco años de experiencia en plataformas web, aplicaciones y MVPs.",
      "Trabajé dentro de equipos de producto y desarrollo, y también como consultora independiente. Me interesa entender cómo funciona cada producto, desde las necesidades de las personas hasta las reglas y los procesos que condicionan su diseño.",
      "Cuando no estoy diseñando, me encontrás nadando, en Pilates o TPA, tomando un mate cocido —acá le decimos \"yerbiado\"— o pidiendo pizza.",
    ],
    processLink: "Cómo diseñé este portfolio",
    photos: [
      "Florencia recibiéndose como Técnica en Sistemas de Información en la UNSJ",
      "Demo de app en evento",
      "Reunión remota con el equipo",
    ],
    interests: { swim: "Natación", pilates: "Pilates & TPA", mug: "Mucho tecito", pizza: "Pizza", cat: "Gatos" },
  },
  featured: {
    title: "Proyectos destacados",
    intro: "Cómo abordo distintos problemas de producto y las decisiones de diseño detrás de cada solución.",
    summaries: {
      cintelink: "Plataforma y sistema de diseño para Cintelink, una solución de gestión de combustible.",
      cemico: "Productos digitales para pacientes, admisión, colaboradores y auditoría médica en Grupo CEMICO.",
      "buscador-agricola": "MVP de un marketplace especializado para conectar la oferta y la demanda del sector agrícola en Chile.",
      "juan-gas-gnc": "Web para consultar el saldo de puntos de Juan Gas GNC Club por patente.",
    },
  },
  process: {
    title: "Cómo trabajo",
    intro: "Un proceso iterativo donde cada etapa alimenta a la siguiente: lo que sale de una es lo que entra en la próxima.",
    steps: [
      { title: "Descubrir", description: "Relevamiento con stakeholders y usuarios para entender el contexto real y acotar el alcance." },
      { title: "Definir", description: "Traduzco lo relevado en arquitectura de información, flujos y story maps antes de dibujar pantallas." },
      { title: "Diseñar", description: "Prototipos interactivos y alta fidelidad sobre un design system. Con IA exploro y prototipo más rápido." },
      { title: "Entregar", description: "Documentación y acompañamiento al equipo de desarrollo durante la implementación." },
    ],
    aiLink: EDITORIAL_LINKS.ai.title,
  },
  experience: {
    title: "Experiencia",
    intro: "Más de cinco años trabajando en productos digitales, dentro de equipos de producto y desarrollo y también de forma independiente.",
    /** Cómo se escribe "hasta hoy" en el rango de años de cada experiencia ("2025 – Hoy"). */
    present: "Hoy",
  },
  closing: {
    title: "Las buenas ideas necesitan claridad para avanzar.",
    text: "Si estás creando un producto digital o mejorando uno que ya existe, puedo ayudarte a darle forma y convertirlo en una experiencia clara, usable y lista para validar o llevar a desarrollo.",
    cta: "Agendar videollamada",
  },
};

export type HomeCopy = typeof homeEs;

/** Home en inglés. Las traducciones al inglés viven en la rama develop; en main no hay inglés publicado ni en revisión. Mientras tanto devuelve el español y nunca se muestra. */
export const homeEn: HomeCopy = homeEs;

/** Rubros de las tarjetas de "Proyectos destacados" en inglés, por slug. Vacío en main (ver develop). */
export const homeEnOverlay = {
  sectors: {} as Record<string, string>,
};

/** Marca visible para un dato inglés que falta: nunca se rellena con el español. El validador también lo detecta. */
export const enMissing = (key: string) => `[MISSING EN: ${key}]`;
