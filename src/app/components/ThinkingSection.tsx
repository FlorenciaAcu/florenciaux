import { motion } from "motion/react";

const cards = [
  {
    number: "01",
    title: "Entender",
    description:
      "Investigo el contexto antes de diseñar. Entiendo usuarios, objetivos de negocio y restricciones del producto para tomar mejores decisiones.",
    skills: ["Product Discovery", "Entrevistas", "User Journey Map", "Problem Framing", "JTBD"],
  },
  {
    number: "02",
    title: "Diseñar",
    description:
      "Transformo lo aprendido en flujos, interfaces y prototipos claros, con foco en usabilidad, jerarquía y consistencia.",
    skills: ["UX/UI Design", "Wireframes", "Prototipos interactivos", "Design Systems", "Handoff"],
  },
  {
    number: "03",
    title: "Construir",
    description:
      "Uso IA, low-code y programación asistida para acercar la solución a una versión funcional que pueda validarse o avanzar hacia desarrollo.",
    skills: ["Prototipado funcional", "Figma Make", "Claude · Lovable", "Primeras versiones", "Delivery"],
  },
  {
    number: "04",
    title: "Acompañar",
    description:
      "Colaboro con equipos de producto, negocio y tecnología para que la solución avance con claridad, criterio y buena documentación.",
    skills: ["User Stories", "Roadmap funcional", "Design QA", "Documentación", "Handoff a dev"],
  },
];

export function ThinkingSection() {
  return (
    <section className="py-12 lg:py-20 bg-[#f0f0f0]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="mb-5"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight">Cómo trabajo y qué puedo hacer</h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-gray-600 leading-relaxed mb-8 lg:mb-12"
        >
          Proceso, criterio y herramientas que aplico en cada proyecto.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card, i) => (
            <motion.div
              key={card.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-[#fafafa] rounded-3xl p-8 flex flex-col gap-5"
            >
              <span className="text-xs font-semibold tracking-widest text-[#cc0058] uppercase">
                {card.number}
              </span>
              <h3 className="text-xl font-bold text-gray-900 tracking-tight">{card.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm flex-1">{card.description}</p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {card.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs text-gray-600 bg-[#f0f0f0] px-2.5 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
