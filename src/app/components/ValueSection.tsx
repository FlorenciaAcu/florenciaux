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
    <section id="servicios" className="relative py-12 lg:py-20 bg-[#fafafa]/90">
      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="mb-5"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">Dónde puedo aportar valor</h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-gray-600 leading-relaxed mb-8 lg:mb-10"
        >
          Trabajo en productos digitales que necesitan mejorar su experiencia, definir mejor sus flujos o transformar una idea en una solución clara, usable y funcional.
        </motion.p>

        {/* System diagram — nodes connected by a spine, not generic cards */}
        <div className="relative mb-8 lg:mb-12">
          {/* Spine: vertical on mobile, horizontal on desktop */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-[#cc0058]/40 via-gray-300 to-[#00b8d4]/40 lg:left-0 lg:right-0 lg:top-[7px] lg:bottom-auto lg:h-px lg:w-auto lg:bg-gradient-to-r" />

          <div className="flex flex-col gap-8 lg:flex-row lg:gap-4">
            {items.map((item, i) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="relative flex gap-4 pl-0 lg:flex-1 lg:flex-col lg:gap-0 lg:pl-0"
              >
                {/* Node */}
                <div className="relative z-10 shrink-0 lg:mb-5">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.35, delay: i * 0.08 + 0.15, type: "spring", stiffness: 300 }}
                    className="w-4 h-4 rounded-full bg-[#fafafa] border-2 border-[#cc0058]"
                  />
                </div>

                <motion.div
                  whileHover={{ y: -4 }}
                  className="glass-panel flex-1 rounded-2xl p-6 flex flex-col gap-3 hover:border-[#cc0058]/40 hover:shadow-lg transition-[border-color,box-shadow] duration-200"
                >
                  <span className="text-xs font-semibold tracking-widest text-[#cc0058] uppercase">
                    {item.number}
                  </span>
                  <h3 className="text-base font-bold text-gray-900 tracking-tight">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
