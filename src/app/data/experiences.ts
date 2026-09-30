import consolaDashboard from "../../imports/cintelink-consola-dashboard.jpg";
import pantallaVistaGeneral from "../../imports/cintelink-pantalla-vista-general.jpg";
import aneloConsola from "../../imports/anelo-tablet-consola.jpg";

export interface ExperienceProject {
  name: string;
  slug?: string;
  externalLink?: { label: string; url: string };
  /** What I did (short). Also the only text shown for projects without `how`/`example`. */
  brief: string;
  /** How I approached it, from my design perspective. */
  how?: string;
  /** `how` is written as team work (first person plural): labelled "Cómo lo abordamos" instead of "Cómo lo abordé". */
  howCollective?: boolean;
  /** One concrete example. */
  example?: string;
  tags: string[];
}

export interface CaseStudyImage {
  src: string;
  alt: string;
  caption: string;
}

export interface CaseStudyDecision {
  /** Legacy: no longer rendered. */
  icon?: "metrics" | "data" | "device" | "physical" | "taxonomy" | "discovery" | "evaluate" | "sides" | "contact" | "context" | "build";
  title: string;
  text: string;
}

/** `aspect` is the frame's Tailwind aspect class, chosen so every image in the group fits at the same scale.
 *  `grid` overrides the default column layout (e.g. a single narrow image). */
export interface CaseStudyScreenGroup {
  title?: string;
  intro?: string;
  aspect: string;
  grid?: string;
  images: CaseStudyImage[];
}

/** One feature told in depth inside a case: what the product needed, what was already defined, what I designed,
 *  how the solution evolved, and the evidence. Empty `evidence` renders nothing (no placeholders). */
export interface CaseStudyFeature {
  title: string;
  /** What the product needed to solve. */
  context: string;
  /** How the solution was explored and iterated, told briefly. Paragraphs separated by a blank line. Shown right after `context`. */
  exploration?: string;
  /** What the designer designed to solve it inside the experience. */
  did: string[];
  /** A set of alternatives or states worth showing as small cards (e.g. four interaction models). */
  options?: { title: string; intro?: string; items: { title: string; text: string }[] };
  evolutionTitle?: string;
  evolution?: { title: string; text: string }[];
  evidence?: CaseStudyScreenGroup[];
  /** Optional: projects inside an experience usually leave the learning to the experience as a whole. */
  learned?: string;
}

/** Narrative blocks for an experience that deserves more than a bio + project list.
 *  Everything here is written from the designer's perspective: no internal company detail (NDA). */
export interface CaseStudy {
  /** The three things to take away, shown right under the header. Everything else is detail. */
  /** Quick facts (industry, company, platforms…) as a hairline key-value list next to "what it is". Only what is confirmed. */
  meta?: { label: string; value: string }[];
  aboutTitle: string;
  /** Paragraphs separated by a blank line. Plain language: assume the reader knows nothing about the product or the industry. */
  about: string;
  challengeTitle?: string;
  challenge?: string;
  /** Only the concepts needed to follow the case. */
  terms?: { term: string; definition: string }[];
  /** "Cómo trabajé": my contribution and process. */
  role: string[];
  /** Secondary projects can skip the decisions block entirely: don't invent decisions to fill it. */
  decisionsIntro?: string;
  decisions?: CaseStudyDecision[];
  /** A transversal solution presented as a statement, not a question (e.g. a design system shared across products). */
  transversal?: { title: string; text: string };
  decisionsImage?: CaseStudyImage;
  /** One representative image, full width, right after the intro (few and strategic: no galleries). */
  cover?: CaseStudyImage;
  evidenceTitle?: string;
  evidence?: CaseStudyImage[];
  screensTitle?: string;
  screensIntro?: string;
  screenGroups?: CaseStudyScreenGroup[];
  /** Features told in depth, for secondary projects built around a few concrete pieces of work. */
  features?: CaseStudyFeature[];
  /** Links to navigable prototypes, used when there are no screenshots yet. */
  prototypesTitle?: string;
  prototypesNote?: string;
  prototypes?: { label: string; url: string }[];
  result?: { title: string; text: string };
  /** A later stage of the project, told after "Resultado" (e.g. work still in progress). Paragraphs separated by a blank line.
   *  `navLabel` is the shorter label for the "on this page" index. */
  nextStage?: { title: string; navLabel?: string; text: string };
  /** A short reflection in the designer's own words. */
  learned?: string;
}

export interface Experience {
  slug: string;
  role: string;
  company: string;
  period: string;
  /** Where the company is based. Shown under the title of the detail page. */
  location?: string;
  /** Company website. Shown under the title of the detail page. */
  website?: { label: string; url: string };
  tagline?: string;
  sector?: string;
  /** Home summary (and, when there is no `workText`, the text of "Cómo trabajé"). */
  bio: string[];
  /** Short "what it is", shown like "Qué es Cintelink" in the cases. */
  aboutTitle?: string;
  about?: string;
  /** Text of "Cómo trabajé" on the experience page, when it must differ from the home summary. */
  workText?: string[];
  /** "El desafío" for experiences without a written case. Paragraphs separated by a blank line. */
  challenge?: string;
  /** "Qué aprendí" for experiences without a written case. Paragraphs separated by a blank line. */
  learned?: string;
  projects: ExperienceProject[];
  caseStudy?: CaseStudy;
}

export const experiences: Experience[] = [
  {
    slug: "consultoria",
    role: "Product Designer",
    company: "Consultoría en productos digitales",
    aboutTitle: "Qué es la consultoría",
    about: "Es mi trabajo independiente diseñando productos digitales y MVPs, en colaboración con clientes y equipos, en distintas etapas del producto.",
    challenge:
      "Trabajar de forma independiente implicó adaptarme a clientes, negocios y productos muy distintos, muchas veces con la necesidad de avanzar en poco tiempo. Cada proyecto requiere entender rápido cómo funciona el negocio, qué necesita resolver y qué es realmente prioritario antes de empezar a diseñar.\n\nAl mismo tiempo, empecé a gestionar reuniones, prioridades y entregas de varios proyectos en paralelo. Ese contexto me llevó a revisar mi propio proceso y buscar formas de entregar valor más rápido sin perder criterio de producto ni calidad en el diseño.",
    workText: [
      "En cada proyecto parto de entender el negocio, el problema y el contexto antes de definir la solución. A partir de ahí organizo el alcance, priorizo lo necesario y avanzo desde la definición hacia flujos, interfaces y prototipos.",
      "También incorporé IA como parte de este proceso, combinando herramientas como ChatGPT, Claude y Figma según la necesidad de cada etapa. Las uso para investigar, ordenar información, explorar alternativas, documentar y acelerar la creación de prototipos.",
    ],
    learned:
      "Trabajar de forma independiente me enseñó a mirar cada proyecto de una manera más integral: no solo desde el diseño, sino también desde el negocio, las prioridades y la gestión del trabajo.\n\nAprendí a llevar varios proyectos y clientes en paralelo, organizar entregas y adaptar mi proceso según cada contexto. También aprendí a integrar la IA de forma más intencional, como una herramienta que complementa mi trabajo y me permite avanzar con mayor autonomía sin delegar el criterio de diseño.",
    period: "Abril 2025 – Actualidad",
    bio: [
      "Diseño productos digitales y MVPs de forma independiente, colaborando con clientes y equipos en distintas etapas del producto. Además, incorporo herramientas como Claude, Figma Make y Lovable para explorar alternativas, documentar y crear prototipos funcionales.",
    ],
    projects: [
      {
        name: "CEMICO",
        slug: "cemico",
        brief: "Diseñé productos digitales para pacientes, personal de admisión, colaboradores y auditores externos, dentro del ecosistema de salud de Grupo CEMICO.",
        tags: ["Salud", "Design System", "Product Design"],
      },
      {
        name: "Buscador Agrícola",
        slug: "buscador-agricola",
        brief: "Diseñé el MVP de un marketplace especializado para conectar la oferta y la demanda del sector agrícola en Chile.",
        tags: ["Plataforma", "Agro", "Search UX"],
      },
      {
        name: "Juan Gas GNC",
        slug: "juan-gas-gnc",
        brief: "Diseñé e implementé la consulta de puntos de Juan Gas GNC Club, conectando la experiencia digital con los datos que ya existían en la estación.",
        tags: ["MVP", "Fidelización", "Product Design", "Implementación"],
      },
      {
        name: "AUDAGNO – Abogado",
        slug: "juan-audagno",
        brief: "Diseñé e implementé el sitio web de un estudio jurídico de La Plata, con contacto por WhatsApp y un formulario de consultas que llega por correo.",
        tags: ["Sitio web", "Legal", "UX/UI", "Implementación"],
      },
      {
        name: "InfoCasas",
        slug: "infocasas",
        brief: "Diseñé flujos vinculados a suscripciones, planes y productos para la plataforma web y la app, como Product Designer para HitOcean.",
        tags: ["Real estate", "Suscripciones", "UX/UI"],
      },
    ],
  },
  {
    slug: "cintelink",
    role: "Product Designer",
    company: "Cintelink",
    period: "Junio 2022 – Marzo 2025",
    location: "Córdoba, Argentina",
    website: { label: "cintelink.com", url: "https://cintelink.com/views/login" },
    tagline: "Plataforma para gestionar y controlar operaciones de abastecimiento de combustible.",
    sector: "Combustible",
    bio: [
      "Diseñé la plataforma de Cintelink y su versión responsive, la aplicación de despacho para tablet, los dashboards operativos y la app demo de las exposiciones, y construí el Design System con su manual de voz y tono: un producto que conecta la gestión digital del combustible con lo que ocurre físicamente en cada carga.",
    ],
    projects: [
      {
        name: "App demo para exposiciones de YPF",
        slug: undefined,
        brief: "Diseñé la app demo presentada en exposiciones, como la de minería en San Juan y la Expo Transporte, para mostrar el funcionamiento del producto.",
        how: "Simplificamos la experiencia a un recorrido corto: iniciar una transacción, completar los datos necesarios, autorizarla y pasar al despacho. El objetivo era que quien se acercaba al stand entendiera en pocos minutos la relación entre la aplicación, el despacho físico y la información que se actualizaba en pantalla.",
        howCollective: true,
        tags: ["Demo", "Mobile", "Ferias"],
      },
      {
        name: "Diseño y rediseño de la plataforma",
        slug: undefined,
        brief: "Diseñé de forma progresiva distintas áreas de la plataforma, entre ellas Home, Gestión, Acuerdos y el área de Analítica y Datos, junto a negocio, usuarios y equipo técnico. Algunas eran productos nuevos y otras rediseños casi desde cero.",
        how: "No lo abordamos como un rediseño visual de una sola vez. Reorganizamos la información y los flujos según las tareas y el tipo de usuario: la plataforma concentraba muchas entidades, operaciones y datos, y cada perfil necesitaba encontrar y gestionar lo que correspondía a su operación.",
        howCollective: true,
        tags: ["SaaS", "Rediseño", "Roles"],
      },
      {
        name: "Acuerdos de Consumo",
        slug: undefined,
        brief: "Diseñé la experiencia para definir las condiciones de consumo: reglas, permisos y autorizaciones.",
        how: "Una operación involucraba varios actores y conceptos (acuerdo, autorización, unidad, chofer, patio y consumo), y podía ser difícil entender qué habilitaba un despacho. Hicimos más explícita esa relación y simplificamos el recorrido para que la autorización acompañara al usuario hasta el momento de operar en la consola.",
        howCollective: true,
        tags: ["Permisos", "Autorizaciones", "Roles"],
      },
      {
        name: "Dashboard para la operación de cargaderos — YPF Agro",
        slug: undefined,
        brief: "Diseñé el dashboard que acompaña a una consola física en un cargadero.",
        how: "Priorizamos la información que el operador necesitaba para saber si podía realizar una operación: estado de los tanques, producto, volumen y alertas. Antes de interactuar con la consola o realizar una acción física, podía entender rápidamente el estado de la instalación y después seguir el progreso desde la misma pantalla.",
        howCollective: true,
        tags: ["Dashboard", "Hardware", "Estados"],
      },
      {
        name: "Digitalización del despacho y remitos — Añelo",
        slug: undefined,
        brief: "Trabajé sobre el recorrido que conecta la autorización de una entrega con lo que el chofer hace en campo.",
        how: "La experiencia evolucionó para que, desde una tablet, el chofer pudiera seleccionar la entrega, enviar la autorización a la consola, realizar el despacho y recuperar después los datos de la operación para generar el comprobante y continuar el registro digital.",
        tags: ["Journey", "Campo", "Contingencias"],
      },
      {
        name: "Design System y UX Writing",
        slug: undefined,
        brief: "Construí y mantuve el Design System de Cintelink, redacté su manual de voz y tono y diseñé los emails y otras comunicaciones del producto.",
        how: "Una decisión importante fue no pensar el sistema solo para la plataforma desktop, porque Cintelink tenía distintos productos y contextos de uso. Trabajamos en patrones y criterios que mantuvieran la consistencia entre la plataforma, su versión responsive, la aplicación de despacho para tablet y los dashboards operativos, y extendimos esa lógica al lenguaje mediante el manual de voz y tono y el sistema de comunicaciones.",
        howCollective: true,
        tags: ["Design System", "UX Writing", "Voz y tono", "Emailing"],
      },
    ],
    caseStudy: {
      learned:
        "Aprendí a diseñar productos digitales que forman parte de una operación física, donde entender el contexto de uso es clave para tomar decisiones de diseño.",
      meta: [
        { label: "Rol", value: "Product Designer" },
        { label: "Industria", value: "Combustible" },
        { label: "Período", value: "Junio 2022 – Marzo 2025" },
      ],
      aboutTitle: "Qué es Cintelink",
      about:
        "Cintelink es una plataforma para gestionar y controlar operaciones de abastecimiento de combustible. Conecta la gestión digital con lo que ocurre físicamente durante una carga: autorizaciones, vehículos, conductores, dispositivos y transacciones.",
      challengeTitle: "El desafío",
      challenge:
        "La plataforma no funciona de manera aislada: lo que sucede en el sistema está conectado con personas, dispositivos y procesos de carga de combustible.",
      role: [
        "Trabajé de forma constante con los equipos de producto y desarrollo, participando en la definición de funcionalidades junto a negocio y usuarios. Ese trabajo implicaba entender tanto lo que ocurría dentro de la plataforma como el contexto operativo en el que se utilizaba.",
        "También colaboré con el equipo de Smart Contracts en funcionalidades vinculadas a la trazabilidad y seguridad de las operaciones.",
      ],
      decisionsIntro:
        "Los dispositivos IoT son dispositivos físicos conectados a la plataforma. Eso cambiaba las preguntas de diseño: no alcanzaba con que la interfaz se viera bien cuando todo funcionaba. Estas son algunas de las preguntas que nos hacíamos junto al equipo.",
      decisions: [
        {
          icon: "metrics",
          title: "¿Qué datos y métricas le sirven a la operación?",
          text: "Cada industria decide con datos distintos. Antes de diseñar una pantalla definía qué información necesitaba quien trabaja ahí; el inicio de la plataforma, por ejemplo, lo pensé para que cada persona pudiera tomar decisiones en su día a día.",
        },
        {
          icon: "device",
          title: "¿Qué ve y qué hace la persona cuando un dato no llega o un dispositivo falla?",
          text: "Diseñé cada pantalla para cuando la información llega y también para cuando no: estados vacíos, de carga y de error que explican qué pasa y qué se puede hacer. Cuando un dispositivo IoT falla o pierde conexión, la experiencia no puede cortarse. Diseñé los estados y mensajes necesarios para esos casos considerando también cómo debía continuar quien estaba operando.",
        },
        {
          icon: "physical",
          title: "¿Cómo es la experiencia física entre el operador, el dispositivo IoT y la plataforma?",
          text: "También tuve que considerar lo que pasaba fuera de la pantalla: cómo interactuaba quien operaba con el dispositivo IoT y con la plataforma o la app, y qué información necesitaba en cada momento para decidir y actuar.",
        },
      ],
      decisionsImage: {
        src: consolaDashboard,
        alt: "Consola instalada frente a una pantalla que muestra un dashboard con el nivel de cuatro tanques",
        caption: "Dashboard sobre su consola: la pantalla y el dispositivo formaban una única experiencia.",
      },
      cover: {
        src: pantallaVistaGeneral,
        alt: "Vista general de la plataforma: mapa con el estado de las estaciones y métricas de transacciones",
        caption: "Vista general de la plataforma: el estado de las estaciones en el mapa y las métricas de consumo.",
      },
      screenGroups: [
        {
          aspect: "aspect-[8/5]",
          grid: "max-w-3xl",
          images: [
            {
              src: aneloConsola,
              alt: "Pantalla de la app en tablet con el mensaje Acercate a la consola para operar",
              caption: "Aplicación de despacho, en la tablet: cuando toca operar en la consola, la pantalla lo indica.",
            },
          ],
        },
      ],
      result: {
        title: "Resultado",
        text: "Durante mi etapa en Cintelink, varios de los productos y funcionalidades en los que trabajé llegaron a implementarse en contextos reales de operación. Entre ellos, el rediseño de la plataforma, la app demo utilizada en exposiciones de YPF y soluciones para digitalizar procesos de despacho y remitos y acompañar la operación de cargaderos de YPF Agro.",
      },
    },
  },
  {
    slug: "folcode",
    role: "UX Designer / Product Designer",
    company: "Folcode",
    aboutTitle: "Qué es Folcode",
    about: "Folcode fue una empresa tecnológica de San Juan, Argentina, especializada en el desarrollo de productos y servicios digitales para distintos clientes. Durante mi etapa allí trabajé en proyectos como CloudLabs, Respública y el rediseño del sitio institucional de Folcode.",
    challenge:
      "Entré a Folcode como Pasante Scrum Master, trabajando con backlog, priorización, requerimientos y ceremonias del equipo. Con el tiempo empecé a involucrarme cada vez más en la definición de los productos y encontré en UX/Product Design un rol desde el que podía conectar mejor las necesidades del cliente, las personas usuarias y el equipo de desarrollo.\n\nEse cambio también implicó aprender a moverme entre proyectos con contextos y necesidades diferentes, entendiendo cada problema antes de llevarlo a flujos e interfaces.",
    workText: [
      "Participé en proyectos desde etapas tempranas de definición, trabajando con stakeholders para entender necesidades y ordenar requerimientos antes de diseñar. Según el proyecto, trabajé con entrevistas, workshops, personas, story maps y flujos para estructurar la experiencia.",
      "A partir de esa definición avanzaba hacia prototipos interactivos e interfaces de alta fidelidad, trabajando en conjunto con el equipo de desarrollo y ajustando las soluciones a partir del feedback y las validaciones realizadas.",
    ],
    learned:
      "Folcode fue donde empecé a entender el diseño como parte de un proceso de producto y no solamente como la construcción de una interfaz. Haber comenzado desde Scrum me ayudó a comprender cómo se organiza el trabajo, cómo se prioriza y cómo las decisiones de diseño conviven con las necesidades del negocio y del equipo técnico.\n\nTambién aprendí a adaptar mi proceso a productos y contextos diferentes, eligiendo las herramientas y el nivel de profundidad necesarios para cada proyecto.",
    period: "Enero 2020 – Marzo 2022",
    location: "San Juan, Argentina",
    bio: [
      "Comencé como Pasante Scrum Master y evolucioné hacia UX/Product Design, liderando procesos para distintos proyectos: relevamiento con stakeholders, flujos, story maps y prototipos de alta fidelidad.",
    ],
    projects: [
      {
        name: "CloudLabs",
        slug: undefined,
        externalLink: {
          label: "Ver proyecto en Behance",
          url: "https://www.behance.net/gallery/138977137/CLOUDLABS-DISENO-DE-PRODUCTO",
        },
        brief: "Trabajé en el rediseño de CloudLabs, una plataforma educativa de laboratorios gamificados para áreas STEM.",
        how: "El proyecto buscaba unificar en un mismo sistema la experiencia de estudiantes, docentes e instituciones, contemplando mobile, tablet y desktop.",
        tags: ["EdTech", "Rediseño de producto", "Mobile", "Tablet", "Desktop"],
      },
      {
        name: "Respública",
        slug: undefined,
        externalLink: {
          label: "Ver proyecto en Behance",
          url: "https://www.behance.net/gallery/120346403/RESPUBLICA-DISENO-DE-PRODUCTO",
        },
        brief: "Participé en el diseño de una aplicación móvil orientada a la participación ciudadana y el debate digital.",
        how: "El desafío fue diseñar una aplicación que permitiera crear espacios de debate digital y medir y monitorear la participación. El proyecto incluyó flujos de creación de debates y participación, interfaces móviles, estados vacíos, validaciones, microinteracciones y prototipado. También se realizó validación con usuarios.",
        tags: ["Participación ciudadana", "Diseño desde cero", "App móvil", "Debate digital"],
      },
      {
        name: "Web Folcode",
        slug: undefined,
        externalLink: {
          label: "Ver proyecto en Behance",
          url: "https://www.behance.net/gallery/154113155/Web-Folcode-Diseno-de-producto",
        },
        brief: "Trabajé en el proyecto de rediseño del sitio institucional de Folcode.",
        how: "El objetivo fue renovar el sitio para reflejar la nueva identidad de marca, presentar sus servicios y casos de éxito, y generar confianza para captar clientes. El proyecto contempló una experiencia responsive.",
        tags: ["Web institucional", "Casos de éxito", "Responsive Design", "Servicios"],
      },
    ],
  },
];

export function getExperienceBySlug(slug: string): Experience | undefined {
  return experiences.find((e) => e.slug === slug);
}
