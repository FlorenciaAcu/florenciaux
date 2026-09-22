import { motion } from "motion/react";
import { ArrowDown, ArrowRight } from "lucide-react";

// Each stage takes the previous stage's output as its input — the process is a small system, not a checklist.
const steps = [
  {
    number: "01",
    title: "Descubrir",
    input: "Una idea o un problema",
    description: "Relevamiento con stakeholders y usuarios para entender el contexto real y acotar el alcance.",
    tools: ["Stakeholders", "Discovery", "Alcance"],
    output: "Alcance claro",
  },
  {
    number: "02",
    title: "Definir",
    input: "Alcance claro",
    description: "Traduzco lo relevado en arquitectura de información, flujos y story maps antes de dibujar pantallas.",
    tools: ["Arquitectura de información", "Flujos", "Story maps"],
    output: "Flujos y estructura",
  },
  {
    number: "03",
    title: "Diseñar",
    input: "Flujos y estructura",
    description: "Prototipos interactivos y alta fidelidad sobre un Design System. Con IA exploro y prototipo más rápido.",
    tools: ["Figma", "Design System", "IA aplicada"],
    output: "Prototipo listo para probar",
  },
  {
    number: "04",
    title: "Entregar",
    input: "Prototipo validado",
    description: "Documentación y acompañamiento al equipo de desarrollo durante la implementación.",
    tools: ["Handoff", "Documentación", "Iteración"],
    output: "Listo para desarrollo",
  },
];

export function ProcessSection() {
  return (
    <section id="proceso" className="relative py-12 lg:py-20 bg-[#fafafa]/90">
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="mb-5"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">Cómo trabajo</h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-gray-600 leading-relaxed mb-10 lg:mb-12"
        >
          Un proceso iterativo donde cada etapa alimenta a la siguiente: lo que sale de una es lo que entra en la próxima.
        </motion.p>

        <div className="grid gap-4 lg:grid-cols-4 lg:gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative flex flex-col"
            >
              <div className="glass-panel flex h-full flex-col gap-4 overflow-hidden rounded-3xl p-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-gradient-brand text-4xl font-bold leading-none">{step.number}</span>
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight">{step.title}</h3>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>

                <div className="flex flex-wrap gap-1.5">
                  {step.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full border border-gray-300 bg-white px-2.5 py-1 text-xs font-medium text-gray-700"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                <dl className="-mx-6 -mb-6 mt-auto h-24 space-y-1.5 bg-[#0a0a0a] px-6 py-4 font-mono text-xs leading-relaxed">
                  <div className="flex gap-2">
                    <dt className="w-[3.25rem] shrink-0 text-gray-400">input</dt>
                    <dd className="text-gray-100">{step.input}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="w-[3.25rem] shrink-0 text-[#ff006e]">output</dt>
                    <dd className="font-semibold text-[#00e5ff]">{step.output}</dd>
                  </div>
                </dl>
              </div>

              {i < steps.length - 1 && (
                <>
                  <span
                    aria-hidden="true"
                    className="absolute -right-6 bottom-[30px] z-10 hidden h-9 w-9 items-center justify-center rounded-full border-2 border-[#fafafa] bg-[#0a0a0a] text-[#00e5ff] lg:flex"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </span>
                  <span aria-hidden="true" className="flex justify-center pt-4 text-[#cc0058] lg:hidden">
                    <ArrowDown className="h-5 w-5" />
                  </span>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
