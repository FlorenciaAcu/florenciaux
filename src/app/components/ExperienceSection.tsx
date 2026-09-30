import { motion, useScroll } from "motion/react";
import { useRef } from "react";
import { experiences } from "../data/experiences";
import { NavArrow } from "./NavArrow";

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
    window.location.hash = `#/experiencia/${slug}`;
    setTimeout(() => window.scrollTo(0, 0), 100);
  };

  return (
    <section id="experiencia" className="py-20 lg:py-36 bg-surface-page/90">
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="mb-5"
        >
          <h2 className="type-h1 text-gray-900">
            Experiencia
          </h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="type-s1 text-gray-600 max-w-3xl mb-14 lg:mb-20"
        >
          Más de cinco años trabajando en productos digitales, dentro de equipos de producto y desarrollo y también de forma independiente.
        </motion.p>

        <div ref={timelineRef} className="relative">
          {/* Base line */}
          <div className="absolute left-[5px] sm:left-[7px] top-2 bottom-2 w-px bg-gray-200" />
          {/* Line that draws itself as you scroll through the section */}
          <motion.div
            className="absolute left-[5px] sm:left-[7px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-magenta-strong to-cyan-strong"
            style={{ scaleY: scrollYProgress }}
          />

          <div className="space-y-2">
            {experiences.map((exp, i) => (
              <motion.a
                key={exp.slug}
                href={`#/experiencia/${exp.slug}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo(exp.slug);
                }}
                className="group relative flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6 pl-8 sm:pl-12 -mr-3 rounded-2xl cursor-pointer pr-[24px] py-[32px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta-strong"
              >
                {/* Node on the timeline */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-surface-page border-2 border-magenta-strong z-10" />

                <div className="shrink-0 w-20 pt-1">
                  <span className="text-xs font-semibold text-gray-600 tracking-wide tabular-nums">
                    {extractYears(exp.period)}
                  </span>
                </div>
                <div className="shrink-0 w-48">
                  <h3 className="type-title-compact text-gray-900 mb-0.5 transition-transform duration-300 group-hover:translate-x-1">{exp.company}</h3>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="space-y-2">
                    {exp.bio.map((line, idx) => (
                      <p key={idx} className="type-body text-gray-600">{line}</p>
                    ))}
                  </div>
                </div>
                {/* Stacked below lg: the arrow leaves the layout (no hover on touch, and it left an empty line under each bio) */}
                <NavArrow display="hidden lg:flex" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
