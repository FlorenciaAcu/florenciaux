import { motion, useScroll } from "motion/react";
import { useRef } from "react";
import { experiences } from "../data/experiences";
import { ArrowRight } from "lucide-react";

function extractYears(period: string): string {
  const parts = period.split("–").map((s) => s.trim());
  const startYear = parts[0].split(" ").pop() ?? "";
  const end = parts[1] ?? "";
  const endYear = end === "Actualidad" ? "Hoy" : end.split(" ").pop() ?? end;
  return `${startYear} – ${endYear}`;
}

export function ExperienceSection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 40%"],
  });

  const navigateTo = (slug: string) => {
    window.location.hash = `#/proyectos/${slug}`;
    setTimeout(() => window.scrollTo(0, 0), 100);
  };

  return (
    <section id="experiencia" className="py-12 lg:py-20 bg-[#fafafa]/90">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="mb-5"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
            Experiencia
          </h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-gray-600 leading-relaxed mb-8 lg:mb-12"
        >
          Más de cinco años trabajando en equipos de producto, consultando con clientes de distintas industrias y construyendo desde el problema hasta la solución.
        </motion.p>

        <div ref={timelineRef} className="relative">
          {/* Base line */}
          <div className="absolute left-[5px] sm:left-[7px] top-2 bottom-2 w-px bg-gray-200" />
          {/* Line that draws itself as you scroll through the section */}
          <motion.div
            className="absolute left-[5px] sm:left-[7px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-[#cc0058] to-[#00b8d4]"
            style={{ scaleY: scrollYProgress }}
          />

          <div className="space-y-2">
            {experiences.map((exp, i) => (
              <motion.a
                key={exp.slug}
                href={`#/proyectos/${exp.slug}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                whileHover={{ x: 4 }}
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo(exp.slug);
                }}
                className="group relative flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pl-8 sm:pl-12 -mr-3 rounded-2xl cursor-pointer transition-colors duration-150 hover:bg-[#f5f5f5] pr-[24px] py-[32px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#cc0058]"
              >
                {/* Node on the timeline */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-[#fafafa] border-2 border-[#cc0058] z-10" />

                <div className="shrink-0 w-20 pt-1">
                  <span className="text-xs font-semibold text-gray-600 tracking-wide tabular-nums">
                    {extractYears(exp.period)}
                  </span>
                </div>
                <div className="shrink-0 w-48">
                  <h3 className="text-base font-semibold text-gray-900 mb-0.5">{exp.company}</h3>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="space-y-2">
                    {exp.bio.map((line, idx) => (
                      <p key={idx} className="text-gray-600 text-sm leading-relaxed">{line}</p>
                    ))}
                  </div>
                </div>
                <div className="shrink-0 w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 bg-[#fafafa] text-gray-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-white group-hover:bg-[#cc0058] group-hover:border-[#cc0058] group-focus-visible:opacity-100 group-focus-visible:translate-x-0 transition-all duration-300 ease-out">
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
