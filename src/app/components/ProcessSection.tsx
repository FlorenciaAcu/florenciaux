import { motion } from "motion/react";
import { ArrowDown, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Descubrir",
    description: "Relevamiento con stakeholders y usuarios para entender el contexto real y acotar el alcance.",
  },
  {
    number: "02",
    title: "Definir",
    description: "Traduzco lo relevado en arquitectura de información, flujos y story maps antes de dibujar pantallas.",
  },
  {
    number: "03",
    title: "Diseñar",
    description: "Prototipos interactivos y alta fidelidad sobre un design system. Con IA exploro y prototipo más rápido.",
  },
  {
    number: "04",
    title: "Entregar",
    description: "Documentación y acompañamiento al equipo de desarrollo durante la implementación.",
  },
];

export function ProcessSection() {
  return (
    <section id="proceso" className="relative py-20 lg:py-36 bg-[#fafafa]/90">
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="mb-5"
        >
          <h2 className="type-h1 text-gray-900">Cómo trabajo</h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="type-s1 text-gray-600 max-w-3xl mb-14 lg:mb-20"
        >
          Un proceso iterativo donde cada etapa alimenta a la siguiente: lo que sale de una es lo que entra en la próxima.
        </motion.p>

        {/* Four open columns, no cards: number, name, what happens and tools */}
        <ol className="grid gap-14 border-t border-gray-200 pt-10 lg:grid-cols-4 lg:gap-10">
          {steps.map((step, i) => (
            <motion.li
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative flex flex-col gap-5"
            >
              <span className="text-gradient-brand text-5xl font-light leading-none tabular-nums">{step.number}</span>
              <h3 className="type-h2 text-gray-900">{step.title}</h3>
              <p className="type-body text-gray-600">{step.description}</p>

              {/* Connectors sit in the gap between steps, level with the numbers. Desktop: nudged left of the gap centre so the tip keeps air before the next number. Stacked: centred in gap-14 */}
              {i < steps.length - 1 && (
                <>
                  <ArrowRight
                    aria-hidden="true"
                    className="absolute left-[calc(100%+0.5rem)] top-3 hidden h-6 w-6 -translate-x-1/2 text-[#cc0058]/60 lg:block"
                    strokeWidth={1.5}
                  />
                  <ArrowDown
                    aria-hidden="true"
                    className="absolute left-7 top-[calc(100%+1.75rem)] h-5 w-5 -translate-x-1/2 -translate-y-1/2 text-[#cc0058]/60 lg:hidden"
                    strokeWidth={1.5}
                  />
                </>
              )}
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
