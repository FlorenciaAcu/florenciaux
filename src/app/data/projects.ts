import type { CaseStudy } from "./experiences";
import buscadorHome from "../../imports/buscador-home.jpg";
import buscadorListado from "../../imports/buscador-listado-empresas.jpg";
import buscadorPerfil from "../../imports/buscador-perfil-empresa.jpg";

export interface ProjectDetail {
  /** Full case written from the designer's perspective. Projects without it use the placeholder layout. */
  caseStudy?: CaseStudy;
  /** Shown in the "Mi trabajo" card and under the title when a case study exists. */
  duration?: string;
  /** Opening lines of the "Mi trabajo" card. */
  roleIntro?: string[];
  location?: string;
  website?: { label: string; url: string };
  slug: string;
  name: string;
  tagline: string;
  context: string;
  sector: string;
  challenge: string;
  role: string;
  description: string;
  tags: string[];
  year: string;
  imageCount: number;
}

export const projects: ProjectDetail[] = [
  {
    slug: "cemico",
    name: "CEMICO",
    tagline: "Diseñé productos digitales para pacientes, personal de admisión, colaboradores y auditores externos, dentro del ecosistema de salud de Grupo CEMICO.",
    context:
      "CEMICO es un grupo de clínicas que reúne distintos productos digitales dentro de su ecosistema de salud, para perfiles muy distintos: pacientes, personal de admisión, colaboradores y auditores médicos externos.",
    sector: "Salud",
    challenge:
      "La experiencia no termina en la interfaz: muchos de los productos forman parte de servicios que continúan dentro de las clínicas, antes, durante y después de cada interacción digital.",
    role: "Product Designer. Trabajé en cinco frentes del ecosistema: Design System, Anunciador de Pacientes, Auditoría Médica Externa, Portal del Paciente y Portal Institucional.",
    description:
      "Diseñé flujos, estados e interfaces para cada producto, y un Design System compartido para mantener criterios comunes entre ellos sin perder las particularidades de cada contexto.",
    tags: ["Salud", "Design System", "Product Design", "Consultoría"],
    year: "2025",
    imageCount: 2,
    location: "Neuquén, Argentina",
    website: { label: "portalsalud.grupocemico.com.ar", url: "https://portalsalud.grupocemico.com.ar/#/auth/login" },
    caseStudy: {
      highlights: [
        { label: "Rol", text: "Product Designer" },
        { label: "Qué diseñé", text: "Productos digitales para pacientes, personal de admisión, colaboradores y auditores externos, dentro del ecosistema de Grupo CEMICO." },
        { label: "Lo más importante", text: "Entender cómo lo digital forma parte de una experiencia de salud que también sucede fuera de la pantalla." },
      ],
      aboutTitle: "Qué es CEMICO",
      about:
        "CEMICO es un grupo de clínicas de Neuquén, Argentina, que reúne distintos productos digitales dentro de su ecosistema de salud. Conviven ahí perfiles muy distintos: pacientes, personal de admisión y recepción, colaboradores internos y auditores médicos externos de obras sociales y prepagas.",
      challengeTitle: "El desafío",
      challenge:
        "En CEMICO, la experiencia no termina en la interfaz. Muchos de los productos digitales forman parte de servicios que continúan dentro de las clínicas, en los que participan pacientes, personal de admisión, profesionales y otras áreas.\n\nPor eso, al diseñar estos productos fue necesario considerar no solamente qué sucede en pantalla, sino también qué ocurre antes, durante y después de cada interacción digital. Un turno termina en una atención presencial, una llegada a la clínica conecta un tótem con Admisión y una sala de espera, y distintos procesos clínicos y administrativos generan la información que después aparece en las interfaces.",
      roleTitle: "Mi trabajo",
      role: [
        "Product Designer en cinco frentes del ecosistema: Design System, Anunciador de Pacientes, Auditoría Médica Externa, Portal del Paciente y Portal Institucional.",
        "Arquitectura de información, flujos y definición de estados para cada producto.",
        "Documentación funcional para acompañar la implementación: comportamientos, reglas, estados y mensajes del sistema.",
        "Prototipos funcionales y navegables con Figma Make, publicados para que pudieran recorrerse y probarse antes de la implementación.",
      ],
      decisionsEyebrow: "Decisiones de diseño",
      decisionsTitle: "Diseñar para un mismo ecosistema, con contextos muy distintos",
      decisionsIntro:
        "CEMICO reúne productos para pacientes, personal de admisión, colaboradores y auditores externos. Estas son algunas de las preguntas que me hice al diseñarlos.",
      decisions: [
        {
          icon: "physical",
          title: "¿Cómo conectar un proceso que sucede entre un tótem, Admisión y la sala de espera?",
          text: "Diseñé el Anunciador de Pacientes como un mismo proceso que atraviesa tres interfaces: un tótem donde la persona se anuncia al llegar, un dashboard desde el que Admisión gestiona esos registros en tiempo real y una pantalla de sala de espera donde se comunica el llamado. Lo que sucede en una interfaz afecta a las demás, así que pensé el recorrido como un sistema continuo y no como pantallas aisladas. Esa continuidad también tenía que sostener casos más complejos: una misma persona podía anunciarse por más de un motivo, cada uno con su propio estado, y la fila del dashboard no se consideraba resuelta hasta completarlos todos.",
        },
        {
          icon: "context",
          title: "¿Cómo mantener claro quién es el paciente activo cuando una cuenta permite gestionar a más de una persona?",
          text: "En el Portal del Paciente, una misma cuenta puede actuar en nombre propio o de una persona a cargo, y todas las acciones posteriores —consultar información, gestionar turnos— corresponden a esa persona. Diseñé la experiencia para que el paciente activo quedara siempre visible, evitando que alguien confundiera el contexto en el que está actuando.",
        },
        {
          icon: "data",
          title: "¿Cómo organizar una experiencia común cuando la información proviene de distintos sistemas y clínicas?",
          text: "Antes, el acceso de los auditores dependía de distintos sistemas de historia clínica y la experiencia variaba según la institución. Trabajé en una experiencia unificada para acceder a esa información, respetando las clínicas y los permisos de cada auditor. El producto distingue cuentas genéricas —compartidas por varios auditores de una obra social— de cuentas individuales, una regla que condicionó cómo diseñé los permisos y las acciones disponibles en cada caso.",
        },
      ],
      transversal: {
        title: "Una base común para productos diferentes",
        text: "Definí y documenté componentes, estados y patrones compartidos para mantener criterios comunes entre los distintos productos, sin perder las particularidades de cada contexto.",
      },
      prototypesTitle: "Prototipos",
      prototypesNote:
        "Construí estos prototipos con Figma Make para que pudieran recorrerse y probarse antes de la implementación. No representan necesariamente la versión final implementada en producción.",
      prototypes: [
        { label: "Portal del Paciente", url: "https://portal-paciente.figma.site" },
        { label: "Portal Institucional", url: "https://portal-cemico.figma.site" },
        { label: "Auditoría Médica Externa", url: "https://modulo-auditoria-externa.figma.site" },
      ],
      result: {
        title: "Resultado",
        text: "De este trabajo salieron un Design System compartido, los flujos y las interfaces del Anunciador de Pacientes, de la Auditoría Médica Externa y del Portal del Paciente, además de la documentación funcional que acompañó su implementación —comportamientos, estados, reglas y mensajes del sistema— y manuales y guías para quienes iban a usar cada producto.",
      },
    },
  },
  {
    slug: "buscador-agricola",
    name: "Buscador Agrícola",
    tagline: "Marketplace multitienda para conectar productores, proveedores y profesionales del sector agropecuario chileno en un solo lugar.",
    context:
      "Buscador Agrícola es una plataforma digital chilena que nace de la necesidad de centralizar la oferta del sector agropecuario. Productores, proveedores y profesionales operaban de forma dispersa, sin un canal digital común que facilitara la búsqueda y el contacto entre ellos.",
    sector: "Agtech",
    challenge:
      "Diseñar una experiencia de búsqueda que funcione para perfiles muy distintos —productores, compradores, proveedores de servicios— y que permita encontrar productos, maquinaria, servicios y terrenos con filtros especializados y búsqueda por ubicación geográfica, sin perder simplicidad.",
    role: "Product Designer. Me encargué del diseño de la experiencia de búsqueda y navegación, la arquitectura de información, la estructura de resultados, las fichas de producto y la pantalla y el flujo de contacto del MVP.",
    description:
      "Diseñé el MVP de un marketplace multitienda donde los usuarios buscan por categorías, filtros especializados y ubicación geográfica, exploran la oferta, consultan cada producto en su ficha y contactan a la empresa a través de una pantalla y un flujo de contacto.",
    tags: ["Marketplace", "Agro", "Search UX", "Consultoría"],
    year: "2025",
    imageCount: 2,
    duration: "2 meses",
    roleIntro: ["Product Designer en el MVP de un proyecto para Agro360, una organización chilena vinculada al sector agrícola."],
    location: "Chile",
    website: { label: "buscadoragricola.cl", url: "https://buscadoragricola.cl/" },
    caseStudy: {
      learned:
        "Aprendí a diseñar un marketplace para una industria específica, donde entender cómo se organiza y se busca la oferta es parte central de la experiencia.",
      highlights: [
        { label: "Rol", text: "Product Designer" },
        { label: "Qué diseñé", text: "La búsqueda y la navegación, las fichas de producto y el flujo de contacto con el proveedor." },
        { label: "Lo más importante", text: "Facilitar la búsqueda y el contacto entre quienes buscan y quienes ofrecen." },
      ],
      aboutTitle: "Qué es Buscador Agrícola",
      about:
        "Buscador Agrícola es un marketplace especializado en el sector agrícola chileno: reúne en un solo lugar productos, insumos, semillas, maquinaria, servicios y terrenos.\n\nEstá pensado para quienes necesitan encontrar oferta especializada —como productores, proveedores y profesionales del sector— y para quienes la ofrecen. Fue un MVP para Agro360, una organización chilena vinculada al sector agrícola.",
      challengeTitle: "El problema",
      challenge:
        "La oferta estaba dispersa y no había un espacio común y especializado donde buscar productos, insumos, maquinaria, servicios y otras soluciones del agro con criterios propios del sector, como categoría, cultivo o ubicación. El desafío fue diseñar una experiencia de búsqueda para esa oferta amplia y especializada.",
      roleTitle: "Mi trabajo",
      role: [
        "Arquitectura de información, búsqueda y navegación.",
        "Categorías y filtros por cultivo y ubicación, y resultados en listado y en mapa.",
        "Fichas de productos y perfil de las empresas.",
        "Pantalla y flujo de contacto con el proveedor.",
      ],
      decisionsEyebrow: "Decisiones de diseño",
      decisionsTitle: "Un mismo buscador para una oferta muy distinta",
      decisionsIntro:
        "Buscador Agrícola reúne productos, maquinaria, servicios y terrenos en una misma plataforma. Estas son algunas de las preguntas que me hice al diseñarlo.",
      decisions: [
        {
          icon: "discovery",
          title: "¿Cómo se diseña la búsqueda para una oferta tan variada?",
          text: "Además de organizar el catálogo por categorías, incorporé cultivo y ubicación como criterios propios del sector agrícola para refinar la búsqueda. La ubicación se estructuró por Región, Ciudad y Comuna y se integró a la exploración de resultados, que se pueden ver en listado o en mapa.",
        },
        {
          icon: "evaluate",
          title: "¿Qué información necesita alguien antes de escribirle a una empresa?",
          text: "Organicé la ficha con imágenes, especificaciones, información técnica y ubicación, para poder evaluar el producto antes de contactar.",
        },
        {
          icon: "contact",
          title: "¿Cómo hacer que contactar a una empresa sea simple?",
          text: "El producto necesitaba captar e identificar tanto la demanda como la oferta, así que parte de la información del proveedor se muestra recién al registrarse. Mi trabajo fue resolver desde UX cómo incorporar el registro dentro del recorrido hacia el contacto, sin perder de vista que la persona había llegado para encontrar una solución.",
        },
      ],
      decisionsImage: {
        src: buscadorHome,
        alt: "Home de Buscador Agrícola: buscador principal, empresas, categorías destacadas y últimos productos agregados",
        caption: "Home: el buscador es lo primero; debajo, empresas, categorías destacadas y los últimos productos agregados.",
      },
      screensTitle: "Algunas pantallas",
      screenGroups: [
        {
          title: "Listado de empresas",
          aspect: "aspect-[1200/747]",
          grid: "max-w-5xl",
          images: [
            {
              src: buscadorListado,
              alt: "Listado de empresas de Buscador Agrícola, con un buscador por nombre, filtros por categoría y región de cobertura y una grilla de empresas con su logo",
              caption: "Se puede buscar por nombre y filtrar por categoría y región de cobertura.",
            },
          ],
        },
        {
          title: "Perfil de una empresa",
          aspect: "aspect-[1200/1167]",
          grid: "max-w-5xl",
          images: [
            {
              src: buscadorPerfil,
              alt: "Perfil de una empresa en Buscador Agrícola: información y ubicación, botón de contacto, filtros y los productos que ofrece",
              caption: "Su información, ubicación y cobertura, el acceso al contacto y los productos que ofrece, con filtros por categoría, estado y región.",
            },
          ],
        },
      ],
      prototypesTitle: "Antes del lanzamiento",
      prototypesNote:
        "Antes del lanzamiento del MVP, construí esta landing con Figma Make para presentar la propuesta y captar interés mientras se desarrollaba el producto.",
      prototypes: [{ label: "Waitlist de Buscador Agrícola", url: "https://buscadoragricolacl.figma.site" }],
      result: {
        title: "Resultado",
        text: "El MVP se desarrolló y hoy Buscador Agrícola está en producción, disponible en buscadoragricola.cl.",
      },
    },
  },
  {
    slug: "juan-gas-gnc",
    name: "Juan Gas GNC Club",
    tagline: "Diseñé e implementé JuanGas GNC Club, un sistema de fidelización que automatiza la gestión de puntos y permite a los clientes consultar su saldo ingresando la patente de su vehículo, integrándose con el sistema que ya utilizaba la estación.",
    context:
      "Juan Gas GNC Club es una iniciativa de fidelización de una estación de servicio de GNC. Los clientes recurrentes cargaban combustible frecuentemente pero no tenían visibilidad de los beneficios acumulados ni una forma de acceder a ellos fácilmente. La oportunidad era crear un primer producto digital que acercara esa información y fortaleciera la relación entre la estación y sus clientes.",
    sector: "Combustible",
    challenge:
      "El negocio necesitaba una solución simple, funcional y rápida de implementar. No era el momento para una plataforma compleja: era el momento para un MVP claro que resolviera lo esencial — consultar saldo, entender beneficios y sentir que el programa tiene valor — sin fricción.",
    role: "Product Designer. Trabajé en la definición del alcance del MVP, los flujos principales, el diseño de interfaz y el prototipado para validar que fuera clara y usable por el perfil de usuarios reales.",
    description:
      "Opté por una interfaz muy simple y directa: pocas pantallas, jerarquía clara, lenguaje cercano. El saldo debía ser lo primero que el usuario ve. Los beneficios debían explicarse en lenguaje cotidiano, no técnico. La experiencia funciona bien en mobile, dado que la mayoría de los clientes accederían desde el celular.",
    tags: ["MVP", "Fidelización", "UX/UI", "Service Design"],
    year: "2025",
    imageCount: 2,
  },
  {
    slug: "juan-audagno",
    name: "AUDAGNO – Abogado",
    tagline: "Diseñé y desarrollé el sitio web de este estudio jurídico en La Plata: diseño UX, identidad visual digital, SEO local, integración con WhatsApp, formularios de consulta y herramientas de medición para fortalecer su presencia online y generar nuevas consultas.",
    context:
      "Juan Audagno es un abogado que necesitaba una presencia digital profesional para presentar sus servicios, generar confianza y facilitar el contacto con potenciales clientes. No tenía sitio web propio y su posicionamiento dependía de referencias personales.",
    sector: "Legal",
    challenge:
      "Comunicar servicios legales de forma clara, accesible y confiable, sin caer en un tono frío o corporativo. Los potenciales clientes necesitan entender qué hace, cómo pueden contactarlo y sentir que están en buenas manos — todo en pocos segundos.",
    role: "Product Designer. Definí la estructura de contenido, jerarquía visual, identidad sobria y revisé el lenguaje para hacerlo profesional pero accesible.",
    description:
      "Diseñé un sitio en una sola página con scroll fluido, donde el CTA de contacto aparece en múltiples puntos estratégicos sin ser invasivo. La paleta neutra y la tipografía clara transmiten seriedad sin rigidez.",
    tags: ["Web institucional", "Legal", "Conversión", "UX/UI"],
    year: "2024",
    imageCount: 2,
  },
];

export function getProjectBySlug(slug: string): ProjectDetail | undefined {
  return projects.find((p) => p.slug === slug);
}
