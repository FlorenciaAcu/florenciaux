import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

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
    <section id="proceso" className="relative bg-surface-page/90 py-20 lg:py-36">
      <div className="page-container">
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
          className="type-s1 mb-6 text-gray-600 lg:mb-8"
        >
          Un proceso iterativo donde cada etapa alimenta a la siguiente: lo que sale de una es lo que entra en la próxima.
        </motion.p>

        <ol className="grid lg:grid-cols-4 lg:gap-x-20">
          {steps.map((step, i) => (
            <motion.li
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative grid grid-cols-[3.25rem_minmax(0,1fr)] gap-x-4 gap-y-3 border-b border-gray-200 py-6 last:border-b-0 lg:flex lg:flex-col lg:gap-5 lg:border-0 lg:py-0"
            >
              <span className="text-gradient-brand row-span-2 text-3xl font-light leading-none tabular-nums lg:row-auto lg:text-5xl">
                {step.number}
              </span>
              <h3 className="type-h3 text-gray-900">{step.title}</h3>
              <p className="type-body col-start-2 text-gray-600 lg:col-auto">{step.description}</p>

              {/* Conector al siguiente paso: mismo círculo que OpenCue, pero fijo (no es un link) */}
              {i < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-full top-1/2 ml-4 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-surface-page text-gray-400 lg:flex"
                >
                  <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
