import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { EditorialLink } from "./EditorialLink";
import { useI18n } from "../i18n/useI18n";

/** El texto de las cuatro etapas vive en i18n/home.ts (los dos idiomas); acá solo se numeran. */
export function ProcessSection() {
  const { home } = useI18n();
  const steps = home.process.steps;
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
          <h2 className="type-h1 text-gray-900">{home.process.title}</h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="type-s1 mb-6 text-gray-600 lg:mb-8"
        >
          {home.process.intro}
        </motion.p>

        <ol className="grid lg:grid-cols-4 lg:gap-x-20">
          {steps.map((step, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative grid grid-cols-[3.25rem_minmax(0,1fr)] gap-x-4 gap-y-3 border-b border-gray-200 py-6 last:border-b-0 lg:flex lg:flex-col lg:gap-5 lg:border-0 lg:py-0"
            >
              <span className="text-gradient-brand row-span-2 text-3xl font-light leading-none tabular-nums lg:row-auto lg:text-5xl">
                {String(i + 1).padStart(2, "0")}
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

        <EditorialLink page="ai" className="mt-10 lg:mt-12" />
      </div>
    </section>
  );
}
