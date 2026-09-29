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
          <h2 className="display-section text-gray-900">Cómo trabajo</h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lead text-gray-600 max-w-3xl mb-14 lg:mb-20"
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
              <h3 className="display-block text-gray-900">{step.title}</h3>
              <p className="text-base leading-relaxed text-gray-600">{step.description}</p>

              {i < steps.length - 1 && (
                <>
                  <span
                    aria-hidden="true"
                    className="absolute -right-[38px] top-1 hidden h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-cyan-300 shadow-sm lg:flex"
                  >
                    <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-10 left-3 flex h-7 w-7 items-center justify-center rounded-full bg-gray-900 text-cyan-300 shadow-sm lg:hidden"
                  >
                    <ArrowDown className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </span>
                </>
              )}
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
