import consolaDashboard from "../../imports/cintelink-consola-dashboard.jpg";
import consolaCampo from "../../imports/cintelink-consola-campo.jpg";
import appExpo from "../../imports/27-2022-_MG_2698.jpg";
import pantallaVistaGeneral from "../../imports/cintelink-pantalla-vista-general.jpg";
import pantallaAnalitica from "../../imports/cintelink-pantalla-analitica.jpg";
import pantallaStock from "../../imports/cintelink-pantalla-stock.jpg";
import aneloConsola from "../../imports/anelo-tablet-consola.jpg";
import aneloVale from "../../imports/anelo-tablet-vale.jpg";

export interface ExperienceProject {
  name: string;
  slug?: string;
  /** What I did (short). Also the only text shown for projects without `how`/`example`. */
  brief: string;
  /** How I approached it, from my design perspective. */
  how?: string;
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
  icon: "metrics" | "data" | "device" | "physical" | "taxonomy" | "discovery" | "evaluate" | "sides" | "contact" | "context";
  title: string;
  text: string;
}

/** Narrative blocks for an experience that deserves more than a bio + project list.
 *  Everything here is written from the designer's perspective: no internal company detail (NDA). */
export interface CaseStudy {
  /** The three things to take away, shown right under the header. Everything else is detail. */
  highlights?: { label: string; text: string }[];
  aboutTitle: string;
  /** Paragraphs separated by a blank line. Plain language: assume the reader knows nothing about the product or the industry. */
  about: string;
  challengeTitle?: string;
  challenge?: string;
  /** Only the concepts needed to follow the case. */
  terms?: { term: string; definition: string }[];
  roleTitle: string;
  role: string[];
  decisionsEyebrow: string;
  decisionsTitle: string;
  decisionsIntro: string;
  decisions: CaseStudyDecision[];
  /** A transversal solution presented as a statement, not a question (e.g. a design system shared across products). */
  transversal?: { title: string; text: string };
  decisionsImage?: CaseStudyImage;
  evidenceTitle?: string;
  evidence?: CaseStudyImage[];
  screensTitle?: string;
  screensIntro?: string;
  /** `aspect` is the frame's Tailwind aspect class, chosen so every image in the group fits at the same scale.
   *  `grid` overrides the default column layout (e.g. a single narrow image). */
  screenGroups?: { title: string; intro?: string; aspect: string; grid?: string; images: CaseStudyImage[] }[];
  /** Links to navigable prototypes, used when there are no screenshots yet. */
  prototypesTitle?: string;
  prototypesNote?: string;
  prototypes?: { label: string; url: string }[];
  result?: { title: string; text: string };
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
  bio: string[];
  projects: ExperienceProject[];
  caseStudy?: CaseStudy;
}

export const experiences: Experience[] = [
  {
    slug: "consultoria",
    role: "Product Designer",
    company: "Consultoría en productos digitales",
    period: "Abril 2025 – Actualidad",
    bio: [
      "Diseño productos digitales y MVPs en etapas tempranas para clientes de España, Estados Unidos, Países Bajos y Chile, apoyándome en IA (Claude, Figma Make, Lovable) para explorar, documentar y prototipar más rápido.",
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
        brief: "Diseñé la búsqueda, la navegación y las fichas de producto del MVP de un marketplace agrícola para Chile, y la pantalla y el flujo de contacto con la empresa.",
        tags: ["Plataforma", "Agro", "Search UX"],
      },
      {
        name: "Juan Gas GNC",
        slug: "juan-gas-gnc",
        brief: "MVP de fidelización para que clientes recurrentes de una estación de GNC pudieran consultar su saldo y acceder a beneficios.",
        tags: ["MVP", "Fidelización", "UX/UI"],
      },
      {
        name: "Juan Audagno",
        slug: "juan-audagno",
        brief: "Web profesional para generar confianza y facilitar el contacto de un estudio legal.",
        tags: ["Web institucional", "Legal", "Conversión"],
      },
      {
        name: "InfoCasas",
        slug: undefined,
        brief: "Proyecto para el sector real estate. Contenido en construcción.",
        tags: ["Real estate", "SaaS"],
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
      "Diseñé la plataforma de Cintelink, la aplicación de despacho para tablet y los dashboards operativos de un producto que conecta la gestión digital del combustible con lo que ocurre físicamente en cada carga.",
    ],
    projects: [
      {
        name: "App demo para exposiciones de YPF",
        slug: undefined,
        brief: "Diseñé la app demo presentada en exposiciones, como la de minería en San Juan y la Expo Transporte, para mostrar el funcionamiento del producto.",
        how: "Simplificamos la experiencia a un recorrido corto: iniciar una transacción, completar los datos necesarios, autorizarla y pasar al despacho. El objetivo era que quien se acercaba al stand entendiera en pocos minutos la relación entre la aplicación, el despacho físico y la información que se actualizaba en pantalla.",
        tags: ["Demo", "Mobile", "Ferias"],
      },
      {
        name: "Diseño y rediseño de la plataforma",
        slug: undefined,
        brief: "Diseñé de forma progresiva distintas áreas de la plataforma, entre ellas Home, Gestión, Acuerdos y el área de Analítica y Datos, junto a negocio, usuarios y equipo técnico. Algunas eran productos nuevos y otras rediseños casi desde cero.",
        how: "No lo abordamos como un rediseño visual de una sola vez. Reorganizamos la información y los flujos según las tareas y el tipo de usuario: la plataforma concentraba muchas entidades, operaciones y datos, y cada perfil necesitaba encontrar y gestionar lo que correspondía a su operación.",
        tags: ["SaaS", "Rediseño", "Roles"],
      },
      {
        name: "Acuerdos de Consumo",
        slug: undefined,
        brief: "Diseñé la experiencia para definir las condiciones de consumo: reglas, permisos y autorizaciones.",
        how: "Una operación involucraba varios actores y conceptos (acuerdo, autorización, unidad, chofer, patio y consumo), y podía ser difícil entender qué habilitaba un despacho. Hicimos más explícita esa relación y simplificamos el recorrido para que la autorización acompañara al usuario hasta el momento de operar en la consola.",
        tags: ["Permisos", "Autorizaciones", "Roles"],
      },
      {
        name: "Dashboard para la operación de cargaderos — YPF Agro",
        slug: undefined,
        brief: "Diseñé el dashboard que acompaña a una consola física en un cargadero.",
        how: "Priorizamos la información que el operador necesitaba para saber si podía realizar una operación: estado de los tanques, producto, volumen y alertas. Antes de interactuar con la consola o realizar una acción física, podía entender rápidamente el estado de la instalación y después seguir el progreso desde la misma pantalla.",
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
        tags: ["Design System", "UX Writing", "Voz y tono", "Emailing"],
      },
    ],
    caseStudy: {
      learned:
        "Aprendí a diseñar productos digitales que forman parte de una operación física, donde entender el contexto de uso es clave para tomar decisiones de diseño.",
      highlights: [
        { label: "Rol", text: "Product Designer" },
        { label: "Qué diseñé", text: "La plataforma, la aplicación de despacho para tablet y los dashboards operativos." },
        { label: "Lo más importante", text: "Entender la relación entre la experiencia digital y una operación física real." },
      ],
      aboutTitle: "Qué es Cintelink",
      about:
        "Cintelink es una plataforma para gestionar y controlar operaciones de abastecimiento de combustible. Conecta la gestión digital con lo que ocurre físicamente durante una carga: autorizaciones, vehículos, conductores, dispositivos y transacciones.\n\nLa usan distintos perfiles de la operación y de la gestión del combustible: según el producto o el flujo, operadores, conductores y perfiles administrativos o de gestión.",
      challengeTitle: "El desafío",
      challenge:
        "La plataforma no funciona de manera aislada: lo que sucede en el sistema está conectado con personas, dispositivos y procesos de carga de combustible. Diseñar estos productos requería entender la relación entre la experiencia digital y una operación física real.",
      terms: [
        { term: "Despacho", definition: "la operación en la que se realiza una carga de combustible y queda registrada en el sistema." },
        { term: "Consola", definition: "la interfaz o dispositivo desde donde se controla o visualiza parte de la operación de carga." },
        { term: "Cargadero", definition: "el punto físico donde se realiza la carga o despacho de combustible." },
      ],
      roleTitle: "Mi trabajo",
      role: [
        "Trabajo en conjunto y constante con el equipo de desarrollo y con producto.",
        "Definición funcional junto a negocio y usuarios.",
        "Diseño de flujos e interfaces.",
        "También colaboré con el equipo de Smart Contracts en funcionalidades vinculadas a la trazabilidad y seguridad de las operaciones.",
      ],
      decisionsEyebrow: "Decisiones de diseño",
      decisionsTitle: "Diseñar pantallas que conviven con dispositivos IoT",
      decisionsIntro:
        "Mucho de lo que diseñé se usaba junto a dispositivos físicos conectados a la plataforma (dispositivos IoT). Eso cambiaba las preguntas de diseño: no alcanzaba con que la interfaz se viera bien cuando todo funcionaba. Estas son algunas de las preguntas que nos hacíamos junto al equipo.",
      decisions: [
        {
          icon: "metrics",
          title: "¿Qué datos y métricas le sirven a la operación?",
          text: "Cada industria decide con datos distintos. Antes de diseñar una pantalla definía qué información necesitaba quien trabaja ahí; el inicio de la plataforma, por ejemplo, lo pensé para que cada persona pudiera tomar decisiones en su día a día.",
        },
        {
          icon: "device",
          title: "¿Qué ve y qué hace la persona cuando un dato no llega o un dispositivo falla?",
          text: "Diseñé cada pantalla para cuando la información llega y también para cuando no: estados vacíos, de carga y de error que explican qué pasa y qué se puede hacer. Cuando un dispositivo IoT falla o pierde conexión, la experiencia no puede cortarse, así que diseñé las contingencias de forma integral, tanto lo digital (qué se ve y qué mensaje aparece) como lo físico (cómo continúa quien está operando).",
        },
        {
          icon: "physical",
          title: "¿Cómo es la experiencia física entre el operador, el dispositivo IoT y la plataforma?",
          text: "También diseñé lo que pasa fuera de la pantalla: cómo interactúa quien opera con el dispositivo IoT y con la plataforma o la app, y qué información necesita en cada momento para decidir y actuar.",
        },
      ],
      decisionsImage: {
        src: consolaDashboard,
        alt: "Consola instalada frente a una pantalla que muestra un dashboard con el nivel de cuatro tanques",
        caption: "Dashboard sobre su consola: la pantalla y el dispositivo formaban una única experiencia.",
      },
      evidenceTitle: "Cómo se veía en la práctica",
      evidence: [
        {
          src: appExpo,
          alt: "Una persona usando la app demo desde un celular, frente a una pantalla, en una feria",
          caption: "Expo Transporte: la app en el celular, donde empezaba la demo y se iniciaba la operación.",
        },
        {
          src: consolaCampo,
          alt: "Consola montada en una pared, con pantalla, teclado y lector",
          caption: "Consola en contexto operativo: parte de la experiencia se resolvía en el propio dispositivo.",
        },
      ],
      screensTitle: "Algunas pantallas",
      screenGroups: [
        {
          title: "Plataforma web",
          aspect: "aspect-[1280/989]",
          images: [
            {
              src: pantallaVistaGeneral,
              alt: "Vista general de la plataforma: mapa con el estado de las estaciones y métricas de transacciones",
              caption: "Vista general: el estado de las estaciones en el mapa y las métricas de consumo.",
            },
            {
              src: pantallaAnalitica,
              alt: "Pantalla de Transacciones de consumo con métricas, filtros, un gráfico de consumo diario por producto y el comienzo de la tabla de transacciones",
              caption: "Analítica y datos: métricas, consumo diario por producto y el detalle de las transacciones.",
            },
            {
              src: pantallaStock,
              alt: "Pantalla de Stock de productos con el nivel de cada tanque y sus alertas",
              caption: "Stock de productos: nivel de cada tanque y sus alertas, incluso cuando un dispositivo está desconectado.",
            },
          ],
        },
        {
          title: "Aplicación de despacho para tablet",
          aspect: "aspect-[8/5]",
          images: [
            {
              src: aneloConsola,
              alt: "Pantalla de la app en tablet con el mensaje Acercate a la consola para operar",
              caption: "Cuando toca operar en la consola, la pantalla lo indica.",
            },
            {
              src: aneloVale,
              alt: "Pantalla de la app en tablet con el mensaje Generando vale, esto puede tomar unos segundos",
              caption: "Estado de carga mientras se genera el vale: explica qué está pasando.",
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
    company: "Folcode (now Bridgenext)",
    period: "Enero 2020 – Marzo 2022",
    bio: [
      "Comencé como Pasante Scrum Master y evolucioné hacia UX/Product Design, liderando procesos para distintos proyectos: relevamiento con stakeholders, flujos, story maps y prototipos de alta fidelidad.",
    ],
    projects: [
      {
        name: "Web Folcode",
        slug: undefined,
        brief: "Diseño y rediseño del sitio web institucional de Folcode. Contenido en construcción.",
        tags: ["Web institucional", "UX/UI"],
      },
      {
        name: "CloudLabs",
        slug: undefined,
        brief: "Plataforma educativa gamificada para laboratorios STEM. Contenido en construcción.",
        tags: ["EdTech", "SaaS", "UX/UI"],
      },
      {
        name: "Respública",
        slug: undefined,
        brief: "Aplicación móvil de participación ciudadana organizada. Contenido en construcción.",
        tags: ["Civic tech", "Mobile", "UX/UI"],
      },
    ],
  },
];

export function getExperienceBySlug(slug: string): Experience | undefined {
  return experiences.find((e) => e.slug === slug);
}
