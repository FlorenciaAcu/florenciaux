import type { CaseStudy } from "./experiences";
import type { PageSeo } from "./site";
import buscadorHome from "../../imports/buscador-home.jpg";
import buscadorPerfil from "../../imports/buscador-perfil-empresa.jpg";
import juangasQrEnEstacion from "../../imports/juangas-qr-en-estacion.jpg";
import juangasCartelQr from "../../imports/juangas-cartel-qr.png";
import juangasConsultaMobile from "../../imports/juangas-consulta-mobile.png";
import audagnoDesktopHome from "../../imports/audagno-desktop-home.jpg";
import audagnoDesktopContacto from "../../imports/audagno-desktop-contacto.jpg";

export interface ProjectDetail {
  /** Optional metadata overrides. Without them, data/seo.ts derives title and description from the existing content. */
  seo?: PageSeo;
  /** Full case written from the designer's perspective. Projects without it use the placeholder layout. */
  caseStudy?: CaseStudy;
  /** Shown under the title when a case study exists. */
  duration?: string;
  /** Opening lines of the role (not used by pages with a case study). */
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
  year?: string;
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
    role: "Product Designer. Trabajé en cinco frentes del ecosistema: design system, anunciador de pacientes, módulo de auditoría médica externa, portal del paciente y portal institucional.",
    description:
      "Diseñé flujos, estados e interfaces para cada producto, y un design system compartido para mantener criterios comunes entre ellos sin perder las particularidades de cada contexto.",
    tags: ["Salud", "Design System", "Product Design", "Consultoría"],
    year: "2025",
    imageCount: 2,
    location: "Neuquén, Argentina",
    website: { label: "portalsalud.grupocemico.com.ar", url: "https://portalsalud.grupocemico.com.ar/#/auth/login" },
    caseStudy: {
      meta: [
        { label: "Rol", value: "Product Designer" },
        { label: "Industria", value: "Salud" },
      ],
      aboutTitle: "Qué es CEMICO",
      about:
        "CEMICO es un grupo de clínicas de Neuquén, Argentina, que reúne distintos productos digitales dentro de su ecosistema de salud. Conviven ahí perfiles muy distintos: pacientes, personal de admisión y recepción, colaboradores internos y auditores médicos externos de obras sociales y prepagas.",
      challengeTitle: "El desafío",
      challenge:
        "En CEMICO, la experiencia no termina en la interfaz. Muchos de los productos digitales forman parte de servicios que continúan dentro de las clínicas, en los que participan pacientes, personal de admisión, profesionales y otras áreas.\n\nPor eso hubo que considerar qué ocurre antes, durante y después de cada interacción digital: un turno termina en una atención presencial, y la llegada a la clínica conecta un tótem con admisión y una sala de espera.",
      role: [
        "Definí la arquitectura de información, los flujos y los estados de los distintos productos del ecosistema. También documenté su funcionamiento para acompañar la implementación, incluyendo comportamientos, reglas, estados y mensajes del sistema.",
        "Además, preparé manuales y guías de uso para distintos perfiles y construí prototipos funcionales para explorar los flujos, validar cómo se conectaban las distintas partes de la experiencia y comunicar las soluciones antes de avanzar hacia su implementación.",
      ],
      decisionsIntro:
        "Estas son algunas de las preguntas que me hice al diseñar estos productos.",
      decisions: [
        {
          icon: "physical",
          title: "¿Cómo conectar un proceso que sucede entre un tótem, admisión y la sala de espera?",
          text: "Diseñé el anunciador de pacientes como un mismo proceso que atraviesa tres interfaces: un tótem donde la persona se anuncia al llegar, un dashboard desde el que admisión gestiona esos registros en tiempo real y una pantalla de sala de espera donde se comunica el llamado. Lo que sucede en una interfaz afecta a las demás, así que pensé el recorrido como un sistema continuo y no como pantallas aisladas. Esa continuidad también tenía que sostener casos más complejos: una misma persona podía anunciarse por más de un motivo, cada uno con su propio estado, y la fila del dashboard no se consideraba resuelta hasta completarlos todos.",
        },
        {
          icon: "context",
          title: "¿Cómo mantener claro quién es el paciente activo cuando una cuenta permite gestionar a más de una persona?",
          text: "En el portal del paciente, una misma cuenta puede actuar en nombre propio o de una persona a cargo, y todas las acciones posteriores —consultar información, gestionar turnos— corresponden a esa persona. Diseñé la experiencia para que el paciente activo quedara siempre visible, evitando que alguien confundiera el contexto en el que está actuando.",
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
        "Durante el proyecto utilicé Figma Make para crear estos prototipos:\n\nNo representan necesariamente la versión final implementada en producción.",
      prototypes: [
        { label: "Portal del paciente", url: "https://portal-paciente.figma.site" },
        { label: "Portal institucional", url: "https://portal-cemico.figma.site" },
        { label: "Módulo de auditoría médica externa", url: "https://modulo-auditoria-externa.figma.site" },
      ],
      learned:
        "Trabajar en distintos productos dentro de un mismo ecosistema me ayudó a mirar cada flujo no solo de forma individual, sino también por cómo se conecta con otros usuarios, interfaces y procesos.",
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
    role: "Product Designer. Me encargué del diseño de la experiencia de búsqueda y navegación, la arquitectura de información, la estructura de resultados, las fichas de publicación y la pantalla y el flujo de contacto del MVP.",
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
        "Este proyecto reforzó la importancia de entender el contexto y el negocio para definir el alcance de un producto. Eso me ayudó a priorizar qué funcionalidades eran necesarias para el MVP y cuáles podían quedar para etapas posteriores.",
      meta: [
        { label: "Rol", value: "Product Designer" },
        { label: "Industria", value: "Agtech" },
        { label: "Duración", value: "2 meses" },
        { label: "Para", value: "Agro360" },
      ],
      aboutTitle: "Qué es Buscador Agrícola",
      about:
        "Buscador Agrícola es un marketplace especializado en el sector agrícola chileno: reúne en un solo lugar productos, insumos, semillas, maquinaria, servicios y terrenos.\n\nFue un MVP para Agro360, una organización chilena vinculada al sector agrícola, pensado para quienes buscan oferta especializada y para quienes la ofrecen.",
      challenge:
        "La oferta estaba dispersa y no había un espacio común y especializado donde buscar productos, insumos, maquinaria, servicios y otras soluciones del agro con criterios propios del sector, como categoría, cultivo o ubicación. Había que diseñar una experiencia de búsqueda para esa oferta amplia y especializada.",
      role: [
        "Trabajé en la arquitectura de información, la búsqueda y la navegación del marketplace. Organicé las categorías y los filtros por cultivo y ubicación, y diseñé la exploración de resultados tanto en listado como en mapa.",
        "También diseñé las fichas de publicación, el perfil de las empresas y el flujo de contacto con el proveedor, conectando las distintas partes del recorrido desde la búsqueda hasta el contacto.",
      ],
      decisionsIntro:
        "Estas son algunas de las decisiones que tomé al diseñar la experiencia de Buscador Agrícola.",
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
          text: "El contacto era una acción central del MVP, pero mostrar todos los datos del proveedor desde el primer momento permitía que la interacción continuara por fuera de la plataforma sin identificar a la persona interesada. Por eso trabajé el acceso al contacto junto con el registro, buscando facilitar la conexión sin perder la posibilidad de captar esa demanda dentro de Buscador Agrícola.",
        },
      ],
      cover: {
        src: buscadorHome,
        alt: "Home de Buscador Agrícola: el buscador, empresas, categorías destacadas y los últimos productos agregados",
        caption: "Home: el buscador es lo primero; debajo, empresas, categorías destacadas y los últimos productos agregados.",
      },
      screenGroups: [
        {
          aspect: "aspect-[1200/1167]",
          grid: "max-w-5xl",
          images: [
            {
              src: buscadorPerfil,
              alt: "Perfil de una empresa en Buscador Agrícola: información y ubicación, botón de contacto, filtros y los productos que ofrece",
              caption: "Perfil de una empresa: su información, ubicación y cobertura, el acceso al contacto y los productos que ofrece, con filtros por categoría, estado y región.",
            },
          ],
        },
      ],
      prototypesTitle: "Prototipos",
      prototypesNote:
        "Mientras se desarrollaba el MVP, construí esta landing con Figma Make para presentar la propuesta y captar interés.",
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
    tagline: "Diseñé e implementé la consulta de puntos de Juan Gas GNC Club, conectando la experiencia digital con los datos que ya existían en la estación.",
    context:
      "Juan Gas GNC Club es el programa de fidelización de Juan Gas GNC, una estación de servicio de San Juan, Argentina. Los clientes acumulan puntos por cada carga y los canjean por premios; los puntos no vencen.",
    sector: "Combustible",
    challenge:
      "El Club ya existía, pero los clientes no tenían una forma simple de consultar sus puntos, y esa información vivía en una herramienta interna de la estación, no en algo pensado para que la vieran ellos.",
    role: "Product Designer. Diseñé la experiencia de consulta, y también implementé la integración de datos y la aplicación web.",
    description:
      "Diseñé una consulta de saldo por patente, pensada para mobile y con acceso por QR desde la estación, y desarrollé la integración que conecta esa consulta con los datos existentes del negocio.",
    tags: ["MVP", "Fidelización", "Product Design", "Implementación"],
    year: "2025",
    imageCount: 2,
    location: "San Juan, Argentina",
    website: { label: "juangasgnc.vercel.app", url: "https://juangasgnc.vercel.app/" },
    duration: "2 semanas",
    caseStudy: {
      learned:
        "Este proyecto reforzó la importancia de entender cómo funciona el negocio, con qué recursos cuenta y qué datos ya tiene disponibles. Trabajar con información real de consumo y comportamiento de los clientes me ayudó a pensar no solo en la experiencia del usuario, sino también en cómo esos datos pueden convertirse en información útil para entender mejor la operación y tomar decisiones.",
      meta: [
        { label: "Rol", value: "Product Designer · Diseño e implementación" },
        { label: "Industria", value: "Combustible" },
        { label: "Estado", value: "En curso" },
        { label: "Etapa 1 · Consulta de saldo", value: "2 semanas" },
      ],
      aboutTitle: "Qué es Juan Gas GNC Club",
      about:
        "Juan Gas GNC es una estación de servicio de GNC en San Juan, Argentina. Juan Gas GNC Club es su programa de fidelización: los clientes acumulan puntos por cada carga de GNC y los canjean por premios. Los puntos no vencen, y la patente del vehículo funciona como identificador para consultar el saldo.",
      challengeTitle: "El desafío",
      challenge:
        "El Club ya existía, pero los clientes no tenían una forma simple de consultar sus puntos: esa información estaba en Microsoft Access, una herramienta interna de la estación. Había que llevar esos datos existentes a una experiencia que el cliente pudiera consultar por sí mismo, desde el celular y con la menor cantidad de pasos.",
      role: [
        "En este proyecto trabajé desde el diseño de la experiencia hasta la implementación. Definí el flujo de consulta de saldo y diseñé una interfaz pensada principalmente para mobile y para el acceso desde la estación.",
        "También resolví la integración con los datos existentes: desarrollé un script en Python para sincronizar Microsoft Access con Google Sheets, desplegué la aplicación web y diseñé la cartelería con QR para facilitar el acceso.",
      ],
      decisionsIntro:
        "Estas son algunas de las decisiones que tomé para convertir el programa de fidelización de Juan Gas en una experiencia digital simple de usar en la estación.",
      decisions: [
        {
          icon: "data",
          title: "¿Cómo consultar un dato que ya vivía en otro sistema?",
          text: "La estación ya tenía la información de sus clientes en Microsoft Access. Para no partir de cero, desarrollé un script en Python que sincroniza esos datos con Google Sheets, y la web consulta esa fuente cuando alguien ingresa su patente.",
        },
        {
          icon: "physical",
          title: "¿Cómo diseñar una consulta con la menor fricción posible?",
          text: "Diseñé la experiencia para resolver una sola acción —consultar el saldo— con el menor número de pasos: ingresar, escribir la patente y ver el saldo. La experiencia fue pensada principalmente para mobile, con acceso mediante códigos QR ubicados en la estación.",
        },
      ],
      decisionsImage: {
        src: juangasQrEnEstacion,
        alt: "Pilar de la estación de servicio con un cartel que dice «Escaneá y consultá tu saldo» y un código QR, junto al surtidor de GNC",
        caption: "La cartelería con el código QR, ubicada en la estación junto al surtidor.",
      },
      screenGroups: [
        {
          aspect: "aspect-[591/838]",
          grid: "grid-cols-2 max-w-xl",
          images: [
            {
              src: juangasConsultaMobile,
              alt: "Pantalla de consulta de saldo vista desde el navegador del celular: «Consultá el saldo», un campo para ingresar la patente sin espacios y el botón Consultar",
              caption: "Consulta de saldo por patente, resuelta en una única acción.",
            },
            {
              src: juangasCartelQr,
              alt: "Cartel «Escaneá y consultá tu saldo» de Juan Gas GNC Club con un código QR y la dirección de la web",
              caption: "Cartel con el código QR que lleva a la web de Consulta saldo.",
            },
          ],
        },
      ],
      result: {
        title: "Resultado",
        text: "La solución quedó implementada y en funcionamiento. Los clientes pueden acceder desde la web o escaneando el QR en la estación, ingresar su patente y consultar su saldo de puntos.",
      },
      nextStage: {
        title: "Etapa 2 · Datos para la operación",
        navLabel: "Datos para la operación",
        text: "Con la consulta de saldo en funcionamiento, empecé a trabajar con los datos que la estación ya registraba sobre cargas, clientes y canjes. Analicé patrones de consumo, frecuencia de carga, evolución mensual y canjes de premios para entender mejor la operación.\n\nA partir de este análisis estoy diseñando un dashboard operativo, actualmente en desarrollo, para organizar y consultar esta información de forma más simple.",
      },
    },
  },
  {
    slug: "juan-audagno",
    name: "AUDAGNO – Abogado",
    tagline: "Sitio web profesional para un estudio jurídico, diseñado e implementado de punta a punta.",
    context:
      "AUDAGNO – Abogado es el sitio web de un abogado de La Plata que trabaja, entre otras áreas, derecho laboral, civil y penal.",
    sector: "Legal",
    challenge: "Presentar sus servicios y ofrecer vías claras para realizar una consulta.",
    role: "Product Designer. Diseñé e implementé el sitio.",
    description: "Sitio web con formulario de consulta y contacto por WhatsApp, publicado en audagnoabogado.com.",
    tags: ["Sitio web", "Legal", "UX/UI", "Implementación"],
    year: "2026",
    imageCount: 0,
    location: "La Plata, Argentina",
    website: { label: "audagnoabogado.com", url: "https://audagnoabogado.com" },
    duration: "2 semanas",
    caseStudy: {
      meta: [
        { label: "Rol", value: "Product Designer" },
        { label: "Industria", value: "Legal" },
        { label: "Duración", value: "2 semanas" },
      ],
      aboutTitle: "Quién es Juan Audagno",
      about:
        "Juan Audagno es un abogado de La Plata que trabaja en distintas áreas del derecho, entre ellas derecho laboral, civil y penal. El proyecto consistió en diseñar e implementar su sitio web profesional para presentar sus servicios y facilitar el contacto con potenciales clientes.",
      challenge:
        "El desafío era transformar la información sobre sus servicios en un sitio claro y fácil de recorrer, donde una persona pudiera entender rápidamente en qué áreas trabaja y encontrar una forma directa de contactarlo.\n\nAl tratarse de un servicio profesional, también era importante construir una presencia visual que transmitiera seriedad y confianza sin sobrecargar la experiencia.",
      // Two paragraphs, not a list: one item with a blank line renders as paragraphs.
      role: [
        "Organicé la arquitectura y la jerarquía del contenido a partir de las áreas de práctica y las principales necesidades de contacto. Diseñé la experiencia y la interfaz responsive, definiendo una identidad visual basada en azul navy, dorado y blanco.\n\nAdemás del diseño, implementé y publiqué el sitio. Integré el contacto por WhatsApp y un formulario conectado mediante Cloudflare Workers para que las consultas pudieran enviarse directamente desde la web.",
      ],
      decisions: [
        {
          title: "¿Cómo hacer que alguien que busca un abogado en La Plata pueda llegar al sitio?",
          text: "Trabajé el contenido y el SEO del sitio incorporando palabras clave relacionadas con sus áreas de práctica y su ubicación, como “Abogado en La Plata”. La intención era que la web no funcionara solo como una presentación profesional, sino también como un punto de entrada para personas que estuvieran buscando servicios jurídicos en la zona.",
        },
        {
          title: "¿Cómo hacer que alguien encuentre rápidamente el servicio que necesita?",
          text: "Organicé el contenido alrededor de las áreas de práctica y trabajé la jerarquía para que la persona pudiera identificar rápidamente si su consulta estaba dentro de los servicios ofrecidos, sin tener que recorrer grandes bloques de texto.",
        },
        {
          title: "¿Cómo facilitar el contacto sin depender de un único canal?",
          text: "Incorporé WhatsApp como una acción visible durante el recorrido y un formulario como alternativa para quienes prefirieran dejar su consulta desde el sitio.",
        },
        {
          title: "¿Cómo construir una identidad profesional sin caer en una estética jurídica genérica?",
          text: "Trabajé con una paleta navy, dorado y blanco, combinando tipografía serif en títulos con sans serif en textos para construir una identidad sobria y contemporánea manteniendo una lectura clara.",
        },
      ],
      cover: {
        src: audagnoDesktopHome,
        alt: "Inicio del sitio de AUDAGNO – Abogado en desktop: título, texto de presentación, botones para agendar una consulta y contactar por WhatsApp, y una foto del profesional",
        caption: "Inicio: presentación del estudio y accesos directos a la consulta y a WhatsApp.",
      },
      screenGroups: [
        {
          aspect: "aspect-[1440/900]",
          grid: "max-w-5xl",
          images: [
            {
              src: audagnoDesktopContacto,
              alt: "Sección de contacto en desktop: datos del estudio a la izquierda y formulario de consulta a la derecha, con el botón flotante de WhatsApp",
              caption: "Contacto: datos del estudio, formulario de consulta y botón flotante de WhatsApp.",
            },
          ],
        },
      ],
      result: {
        title: "Resultado",
        text: "El proyecto terminó con un sitio responsive diseñado, implementado y publicado, con acceso directo a WhatsApp y un formulario de contacto funcional.",
      },
      learned:
        "Este proyecto me ayudó a entender la importancia de construir una presencia digital clara para un profesional independiente. No alcanza solo con tener una web: también es importante comunicar sus áreas de trabajo, facilitar el contacto y pensar cómo las personas pueden encontrarlo en buscadores. Trabajar el contenido y el posicionamiento desde el diseño me permitió entender mejor cómo una experiencia digital también puede ayudar a conectar a un profesional con potenciales clientes.",
    },
  },
  {
    slug: "infocasas",
    name: "InfoCasas",
    tagline: "Diseñé flujos de suscripciones, planes y publicaciones para la plataforma web y la app, como Product Designer para HitOcean.",
    context:
      "InfoCasas es una plataforma inmobiliaria uruguaya para buscar y publicar propiedades, con presencia en distintos mercados de Latinoamérica.",
    sector: "Real estate",
    challenge: "Diseñar cambios sobre un producto que ya estaba en evolución.",
    role: "Product Designer, para HitOcean.",
    description: "Flujos de suscripciones, planes, publicaciones y gestión de inmuebles, en la plataforma web y la app.",
    tags: ["Real estate", "Suscripciones", "UX/UI"],
    imageCount: 0,
    location: "Uruguay",
    website: { label: "infocasas.com.uy", url: "https://www.infocasas.com.uy/" },
    caseStudy: {
      meta: [
        { label: "Rol", value: "Product Designer" },
        { label: "Trabajé para", value: "HitOcean" },
        { label: "Industria", value: "Real estate" },
        { label: "Plataformas", value: "Web y app" },
      ],
      aboutTitle: "Qué es InfoCasas",
      about:
        "InfoCasas es una plataforma inmobiliaria de Uruguay que conecta a personas y profesionales con propiedades en venta y alquiler. Trabajé en el producto como Product Designer para HitOcean, participando en distintos proyectos de la plataforma web y la app.",
      challenge:
        "Trabajé en proyectos relacionados con planes, suscripciones y productos dentro de InfoCasas. Cada uno tenía reglas, estados y recorridos diferentes que necesitaba entender antes de llevarlos a una solución de diseño.\n\nEl desafío transversal fue incorporar estas nuevas experiencias dentro de un producto existente, respetando sus patrones y contemplando tanto las necesidades del usuario como las del negocio.",
      // Two paragraphs, not a list: one item with a blank line renders as paragraphs.
      role: [
        "En cada proyecto partí de entender el flujo existente, las reglas de negocio y los estados que podían atravesar los usuarios. A partir de ese contexto trabajé alternativas de experiencia, flujos e interfaces, reutilizando patrones del producto siempre que era posible.\n\nLas propuestas se revisaban e iteraban con el equipo antes de profundizar la solución. Según el problema, exploré distintas variantes para comparar recorridos y encontrar una forma clara de integrar la nueva funcionalidad sin romper la experiencia existente.",
      ],
      features: [
        {
          title: "Productos sueltos",
          context:
            "La funcionalidad de Productos sueltos permitía adquirir un producto o promoción para un inmueble de manera puntual cuando los cupos incluidos en el plan no alcanzaban.",
          did: [
            "Trabajé sobre Administrar inmuebles: cómo acceder a estos productos, aplicarlos y representar los que estaban activos en cada inmueble.",
            "Separé una acción genérica de «Asignar productos» en tres intenciones más claras: Destacar, Impulsar y Etiquetar.",
            "Diseñé una estructura común para comparar las distintas opciones y entender su disponibilidad.",
          ],
        },
        {
          title: "Mejora de plan",
          context:
            "El objetivo era que una cuenta pudiera mejorar su plan por sí misma, especialmente cuando los cupos disponibles ya no acompañaban su uso.",
          exploration:
            "Exploré cuatro modelos de interacción para comparar distintas formas de mostrar los cupos disponibles y las opciones para mejorar el plan. Después de revisar las alternativas con el equipo, profundicé las dos que mejor resolvían el recorrido.\n\nA partir del feedback, seguí iterando para simplificar la comparación entre planes y hacer más clara la relación entre el plan actual, los cupos disponibles y las opciones para pasar a uno superior.",
          did: [
            "Trabajé las interfaces para consultar el plan y los cupos, comparar alternativas y avanzar hacia la mejora del plan.",
            "También diseñé el checkout, manteniendo visibles el plan, los cupos y el ciclo de facturación.",
          ],
        },
        {
          title: "Cancelación y reactivación",
          context:
            "El requerimiento incluía un flujo de cancelación con distintas instancias de retención antes de completar la baja.",
          did: [
            "Diseñé el flujo de cancelación, su microcopy y los distintos estados que podía atravesar una suscripción después de la baja.",
            "Trabajé la jerarquía de las acciones para que cancelar no compitiera con acciones principales y reactivar ganara relevancia cuando correspondía.",
            "Para la reactivación diseñé una pantalla completa que recupera el plan anterior, el método de pago y el resumen, reutilizando patrones existentes del producto. También mantuve la posibilidad de mejorar el plan en lugar de reactivar el mismo.",
          ],
        },
      ],
      learned:
        "Trabajar en InfoCasas me ayudó a entender mejor cómo el modelo de negocio y las estrategias comerciales influyen en las decisiones de diseño. Al trabajar sobre un producto existente, con reglas, planes y objetivos ya definidos, aprendí a profundizar más en ese contexto y a trabajar junto al equipo de producto para diseñar experiencias que redujeran fricciones para el usuario sin perder de vista las necesidades del negocio.",
    },
  },
];

export function getProjectBySlug(slug: string): ProjectDetail | undefined {
  return projects.find((p) => p.slug === slug);
}
