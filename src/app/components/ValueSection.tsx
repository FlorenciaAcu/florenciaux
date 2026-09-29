import { motion } from "motion/react";

const items = [
  {
    number: "01",
    title: "Producto SaaS",
    description:
      "Plataformas, dashboards y productos digitales que necesitan claridad operativa, consistencia visual y criterios de diseño escalables.",
  },
  {
    number: "02",
    title: "MVPs y primeras versiones",
    description:
      "Experiencias digitales para transformar una oportunidad de negocio en una primera versión clara, usable y funcional.",
  },
  {
    number: "03",
    title: "Webs profesionales",
    description:
      "Sitios y landing pages orientados a comunicar servicios, construir confianza y facilitar el contacto.",
  },
  {
    number: "04",
    title: "Sistemas internos",
    description:
      "Herramientas para equipos, procesos operativos y usuarios internos que necesitan mejorar tareas, permisos, información y recorridos.",
  },
  {
    number: "05",
    title: "IA aplicada al producto",
    description:
      "Uso de herramientas de IA para explorar, prototipar, construir y documentar más rápido, sin perder criterio de producto ni viabilidad técnica.",
  },
];

export function ValueSection() {
  return (
    <section id="servicios" className="relative py-20 lg:py-36 bg-[#fafafa]/90">
      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="mb-5"
        >
          <h2 className="display-section text-gray-900">Dónde puedo aportar valor</h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lead text-gray-600 max-w-3xl mb-14 lg:mb-20"
        >
          Trabajo en productos digitales que necesitan mejorar su experiencia, definir mejor sus flujos o transformar una idea en una solución clara, usable y funcional.
        </motion.p>

        {/* An open list, not cards: number, what, and why — separated by hairlines */}
        <ul className="border-t border-gray-200">
          {items.map((item, i) => (
            <motion.li
              key={item.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="grid gap-3 border-b border-gray-200 py-8 lg:grid-cols-[5rem_1fr_1.1fr] lg:items-baseline lg:gap-10 lg:py-11"
            >
              <span className="text-sm font-medium tabular-nums tracking-widest text-[#cc0058]">{item.number}</span>
              <h3 className="display-block text-gray-900">{item.title}</h3>
              <p className="text-base leading-relaxed text-gray-600">{item.description}</p>
            </motion.li>
          ))}
        </ul>

      </div>
    </section>
  );
}
