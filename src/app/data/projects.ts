import type { CaseStudy } from "./experiences";
import buscadorHome from "../../imports/buscador-home.jpg";
import buscadorPerfil from "../../imports/buscador-perfil-empresa.jpg";
import juangasQrEnEstacion from "../../imports/juangas-qr-en-estacion.jpg";
import juangasCartelQr from "../../imports/juangas-cartel-qr.png";
import juangasConsultaMobile from "../../imports/juangas-consulta-mobile.png";
import audagnoDesktopHome from "../../imports/audagno-desktop-home.jpg";
import audagnoDesktopContacto from "../../imports/audagno-desktop-contacto.jpg";

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
      designed: [
        "Un design system compartido.",
        "El anunciador de pacientes.",
        "El módulo de auditoría médica externa.",
        "El portal del paciente.",
        "El portal institucional.",
      ],
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
      roleTitle: "Mi trabajo",
      role: [
        "Definí la arquitectura de información, los flujos y los estados de cada producto.",
        "Documenté el funcionamiento para acompañar la implementación: comportamientos, reglas, estados y mensajes del sistema.",
        "Preparé manuales y guías de uso para distintos perfiles, incluyendo personal de admisión, pacientes y colaboradores.",
        "Construí prototipos funcionales y navegables con Figma Make, publicados para que pudieran recorrerse y probarse antes de la implementación.",
      ],
      decisionsEyebrow: "Decisiones de diseño",
      decisionsTitle: "Diseñar para un mismo ecosistema, con contextos muy distintos",
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
        "Construí estos prototipos con Figma Make para que pudieran recorrerse y probarse antes de la implementación. No representan necesariamente la versión final implementada en producción.",
      prototypes: [
        { label: "Portal del paciente", url: "https://portal-paciente.figma.site" },
        { label: "Portal institucional", url: "https://portal-cemico.figma.site" },
        { label: "Módulo de auditoría médica externa", url: "https://modulo-auditoria-externa.figma.site" },
      ],
      result: {
        title: "Qué quedó definido",
        text: "El trabajo dejó definida una base común para los distintos productos, junto con los flujos, los estados y los comportamientos de cada experiencia. Esas definiciones quedaron documentadas para acompañar su implementación, y los prototipos permitieron recorrer varias de ellas antes de implementarlas.",
      },
      learned:
        "Aprendí a diseñar productos digitales de salud entendiendo que la experiencia no termina en la pantalla, sino que continúa en distintos momentos del servicio presencial.",
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
        "Aprendí a diseñar un marketplace para una industria específica, donde entender cómo se organiza y se busca la oferta es parte central de la experiencia.",
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
      roleTitle: "Mi trabajo",
      role: [
        "Diseñé la arquitectura de información, la búsqueda y la navegación.",
        "Diseñé las categorías y los filtros por cultivo y ubicación, y los resultados en listado y en mapa.",
        "Diseñé las fichas de publicación y el perfil de las empresas.",
        "Diseñé la pantalla y el flujo de contacto con el proveedor.",
      ],
      decisionsEyebrow: "Decisiones de diseño",
      decisionsTitle: "Un mismo buscador para una oferta muy distinta",
      decisionsIntro:
        "Estas son algunas de las preguntas que me hice al diseñarlo.",
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
        "Aprendí a llevar una solución desde el diseño hasta su implementación, entendiendo también cómo conectar la experiencia con los datos y herramientas que ya utilizaba el negocio.",
      meta: [
        { label: "Rol", value: "Product Designer" },
        { label: "Industria", value: "Combustible" },
        { label: "Duración", value: "2 semanas" },
      ],
      aboutTitle: "Qué es Juan Gas GNC Club",
      about:
        "Juan Gas GNC es una estación de servicio de GNC en San Juan, Argentina. Juan Gas GNC Club es su programa de fidelización: los clientes acumulan puntos por cada carga de GNC y los canjean por premios. Los puntos no vencen, y la patente del vehículo funciona como identificador para consultar el saldo.",
      challengeTitle: "El desafío",
      challenge:
        "El Club ya existía, pero los clientes no tenían una forma simple de consultar sus puntos: esa información estaba en Microsoft Access, una herramienta interna de la estación. Había que llevar esos datos existentes a una experiencia que el cliente pudiera consultar por sí mismo, desde el celular y con la menor cantidad de pasos.",
      roleTitle: "Mi trabajo",
      role: [
        "En este proyecto trabajé desde UX/UI hasta la implementación: diseño de la experiencia, integración de datos y despliegue del producto.",
        "Diseñé la experiencia de consulta de saldo: el flujo, la interfaz y una experiencia pensada para mobile.",
        "Desarrollé un script en Python que sincroniza la información de Microsoft Access con Google Sheets, la fuente que consulta la web.",
        "Desplegué la aplicación web.",
        "Diseñé la cartelería con el código QR que se ubica en la estación, para que los clientes accedan rápido a la web.",
      ],
      decisionsEyebrow: "Decisiones de diseño",
      decisionsTitle: "Del diseño a una solución funcionando",
      decisionsIntro:
        "Estas son algunas de las preguntas que me hice para llevarlo a una experiencia digital.",
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
    location: "Buenos Aires, Argentina",
    website: { label: "audagnoabogado.com", url: "https://audagnoabogado.com" },
    duration: "2 semanas",
    caseStudy: {
      meta: [
        { label: "Rol", value: "Product Designer" },
        { label: "Industria", value: "Legal" },
        { label: "Duración", value: "2 semanas" },
      ],
      aboutTitle: "Qué es AUDAGNO – Abogado",
      about:
        "AUDAGNO – Abogado es el sitio web de un abogado de La Plata que trabaja, entre otras áreas, derecho laboral, civil y penal.",
      challenge: "El objetivo fue presentar los servicios del estudio y ofrecer vías claras para realizar una consulta.",
      roleTitle: "Mi trabajo",
      role: [
        "Definí la estructura y la jerarquía del contenido, para que se entienda rápido quién es el profesional, qué áreas trabaja y cómo contactarlo.",
        "Diseñé la interfaz y definí la propuesta visual del sitio, trabajando con azul navy y dorado, serif en títulos y sans serif en textos.",
        "Diseñé el acceso a WhatsApp, con un botón flotante siempre disponible, y el formulario de consulta.",
        "Diseñé el sitio para que funcione bien en mobile y desktop.",
        "Implementé el sitio y lo publiqué en audagnoabogado.com.",
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
        text: "El sitio está publicado en audagnoabogado.com. El contacto por WhatsApp está activo y el formulario funciona: las consultas se procesan con Cloudflare Workers y llegan por correo, con la configuración de correo del dominio incluida.",
      },
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
        "InfoCasas es una plataforma inmobiliaria uruguaya para buscar y publicar propiedades, con presencia en distintos mercados de Latinoamérica.\n\nElegí contar tres de las funcionalidades en las que trabajé, relacionadas con monetización y gestión de suscripciones.",
      roleTitle: "Mi trabajo",
      challenge: "Diseñar cambios sobre un producto que ya estaba en evolución: cada nueva solución tenía que convivir con reglas, estados y flujos que ya formaban parte del producto.",
      roleLabel: "Cómo trabajé",
      role: [
        "El proceso era iterativo: proponía alternativas, las revisábamos con el equipo y ajustaba flujos e interfaces a partir del feedback.",
      ],
      features: [
        {
          title: "Productos sueltos",
          context:
            "La funcionalidad de Productos sueltos permitía adquirir un producto o promoción para un inmueble de manera puntual cuando los cupos incluidos en el plan no alcanzaban.",
          did: [
            "Trabajé sobre Administrar inmuebles: cómo acceder a estos productos, cómo aplicarlos y cómo se representan en cada inmueble.",
            "En una de las primeras exploraciones separé un «Asignar productos» genérico en tres intenciones más claras: Destacar, Impulsar y Etiquetar.",
            "Diseñé las cards de Black, Gold y Silver con una misma estructura para poder compararlas: nombre, disponibilidad según cupos, duración, beneficios, estado y CTA.",
            "El CTA cambiaba según la disponibilidad: con cupo, aplicar el producto; sin cupo, ir a la compra individual.",
            "Después de aplicar un producto, la acción no desaparecía: el inmueble tenía que dejar ver qué extras tenía activos y sus vencimientos, y diferenciar los del plan de las compras individuales.",
          ],
          evolution: [
            {
              title: "Una exploración más estructural",
              text: "La primera propuesta introducía cambios más profundos en Administrar inmuebles. Los estados se mostraban con badges cargados de información, y esa representación no funcionaba visualmente.",
            },
            {
              title: "Feedback y restricciones",
              text: "Apareció una restricción importante: preservar la interfaz existente y no modificar flujos que ya funcionaban cuando no era necesario.",
            },
            {
              title: "Integración sobre lo existente",
              text: "La solución se volvió más contenida: chips más compactos debajo de cada inmueble, para que el listado siguiera siendo fácil de escanear.",
            },
          ],
          learned:
            "Trabajar con productos que podían provenir del plan o de una compra individual me obligó a entender primero sus estados y reglas antes de resolver cómo mostrarlos en la interfaz. También confirmé que mostrar más información no necesariamente mejora la comprensión: una primera solución cargaba demasiado los estados y terminó en una representación más simple y escaneable.",
        },
        {
          title: "Self-service Upselling",
          context:
            "El objetivo era que una cuenta pudiera mejorar su plan por sí misma, especialmente cuando los cupos disponibles ya no acompañaban su uso.",
          did: [
            "Diseñé el flujo «Mejorar mi plan»: configuración de cupos, comparación y selección de planes, y elección entre modalidad mensual y anual.",
            "Diseñé los estados de las cards de plan: plan actual, recomendado y seleccionado.",
            "Diseñé el checkout, con el plan, los cupos y el ciclo a la vista.",
            "Exploré distintos puntos de entrada al upgrade: en el Dashboard, un banner, una card adicional y un mensaje contextual sobre el rendimiento, que después se unificaron en una solución más integrada dentro de Vista rápida; también, entradas desde Administrar inmuebles.",
          ],
          options: {
            title: "Cuatro modelos de interacción",
            intro:
              "Para resolver la configuración de plan y cupos exploré cuatro modelos de interacción distintos. No eran cuatro variaciones visuales: eran cuatro formas diferentes de resolver la interacción.",
            items: [
              { title: "Privy", text: "Un dropdown combinado con un slider." },
              { title: "Aircall", text: "Una combinación de toggle e input." },
              { title: "Zendesk", text: "Un enfoque más cercano a una tabla de comparación." },
              { title: "Modern", text: "El slider con más protagonismo." },
            ],
          },
          evolution: [
            { title: "Cuatro alternativas", text: "Revisé las cuatro propuestas con el equipo." },
            { title: "Dos alternativas", text: "Después de esa revisión continuaron dos: Aircall y Modern." },
            {
              title: "Una variante refinada",
              text: "Trabajé sobre una Variante 2: tabs tipo pill para Mensual y Anual, slider discreto, representación de los cupos y una recomendación asociada al nivel de cupos. La arquitectura se consolidó alrededor de tier + cupos, dos dimensiones relacionadas pero distintas: el plan y la capacidad.",
            },
          ],
          learned:
            "Explorar distintos modelos de interacción antes de converger me permitió comparar soluciones concretas con el equipo y refinar la configuración de a poco. Trabajar el upselling dentro de una tarea existente me ayudó a pensar cómo incorporar una necesidad comercial sin desplazar la acción principal que la persona estaba intentando completar.",
        },
        {
          title: "Self-service Churn Prevention",
          context:
            "El requerimiento incluía un flujo de cancelación con distintas instancias de retención antes de completar la baja.",
          did: [
            "Diseñé el flujo de cancelación y la jerarquía de la acción «Cancelar suscripción».",
            "Diseñé los estados posteriores de la suscripción, incluido el detalle de un plan cancelado.",
            "Diseñé la reactivación: método de pago, resumen y consistencia del flujo con los componentes existentes.",
            "Redacté el microcopy de todo el flujo.",
            "«Cancelar suscripción» quedó como acción secundaria dentro de un menú de tres puntos, para que no compitiera con acciones principales como mejorar el plan. Cuando la suscripción está cancelada, reactivar gana relevancia.",
            "Reactivar no abre un modal: diseñé una pantalla completa que recupera el plan anterior, el método de pago y el resumen de la reactivación, reutilizando patrones existentes del producto. También mantuve la posibilidad de «Mejorar mi plan» en lugar de reactivar el mismo.",
          ],
          options: {
            title: "Tres estados de la suscripción",
            items: [
              {
                title: "Activa",
                text: "El detalle normal del plan. Cancelar tiene menos prominencia que acciones principales como mejorar el plan.",
              },
              {
                title: "Cancelada pero todavía vigente",
                text: "Reutilicé el layout del Detalle de plan para comunicar que la suscripción está cancelada, que sigue activa hasta una fecha y que después se pierde el acceso a las funciones premium. Desde este estado se puede reactivar.",
              },
              {
                title: "Expirada o sin plan activo",
                text: "Se comunica que ya no hay un plan activo ni acceso premium. La posibilidad de reactivar sigue disponible.",
              },
            ],
          },
          evolution: [
            {
              title: "Un flujo de baja",
              text: "La primera estructura iba de la cancelación a distintas instancias de retención, la encuesta y la confirmación. Después se ajustó para confirmar la intención de cancelar antes de mostrar las alternativas de retención, y se trabajó el microcopy de la encuesta, que sonaba demasiado duro.",
            },
            {
              title: "Un escenario que faltaba",
              text: "Durante las revisiones apareció un escenario que todavía no estaba contemplado: la reactivación.",
            },
            {
              title: "El ciclo de vida de la suscripción",
              text: "El trabajo pasó de resolver una baja a resolver qué le ocurre a la suscripción antes, durante y después de cancelarla.",
            },
          ],
          learned:
            "Este trabajo me ayudó a pensar el ciclo de vida completo de una suscripción: resolver la cancelación no era suficiente, porque durante las revisiones aparecieron estados posteriores que también necesitaban una respuesta dentro del producto. También aprendí que «cancelada» y «sin acceso» no siempre significan lo mismo: una suscripción podía estar cancelada y seguir vigente hasta una fecha, y esa diferencia tenía que quedar clara en la experiencia.",
        },
      ],
    },
  },
];

export function getProjectBySlug(slug: string): ProjectDetail | undefined {
  return projects.find((p) => p.slug === slug);
}
