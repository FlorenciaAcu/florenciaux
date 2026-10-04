import { motion } from "motion/react";
import { OpenCue } from "./NavArrow";
import { navigate, RETURN_PATH_KEY } from "../lib/router";
import { getExperienceBySlug } from "../data/experiences";
import { getProjectBySlug } from "../data/projects";

const cintelink = getExperienceBySlug("cintelink")!;

const secondarySlugs = ["cemico", "buscador-agricola", "juan-gas-gnc"] as const;
const secondaryProjects = secondarySlugs.map((slug) => getProjectBySlug(slug)!);

// One short line per card, all with the same shape: "lo que diseñé, para quién/qué contexto". Home-only copy: the pages keep their own taglines.
// The sector above the name already gives the industry, so these add operational or audience detail instead of repeating it.
const cardSummaries: Record<string, string> = {
  cintelink: "Plataforma y sistema de diseño para Cintelink, una solución de gestión de combustible.",
  cemico: "Productos digitales para pacientes, admisión, colaboradores y auditoría médica en Grupo CEMICO.",
  "buscador-agricola": "MVP de un marketplace especializado para conectar la oferta y la demanda del sector agrícola en Chile.",
  "juan-gas-gnc": "Web para consultar el saldo de puntos de Juan Gas GNC Club por patente.",
};

const caseFile = [
  {
    slug: cintelink.slug,
    name: cintelink.company,
    sector: cintelink.sector ?? "",
    tagline: cardSummaries[cintelink.slug],
    route: `/experiencia/${cintelink.slug}`,
  },
  ...secondaryProjects.map((project) => ({
    slug: project.slug,
    name: project.name,
    sector: project.sector,
    tagline: cardSummaries[project.slug],
    route: `/proyectos/${project.slug}`,
  })),
];

export function FeaturedProjects() {
  const openCase = (route: string) => {
    sessionStorage.setItem(RETURN_PATH_KEY, "/proyectos");
    navigate(route);
  };

  return (
    <section id="proyectos" className="relative py-20 lg:py-36 bg-surface-page/90">
      <div className="relative page-container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="mb-5"
        >
          <h2 className="type-h1 text-gray-900">Proyectos destacados</h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="type-s1 text-gray-600 mb-14 lg:mb-20"
        >
          Cómo abordo distintos problemas de producto y las decisiones de diseño detrás de cada solución.
        </motion.p>

        {/* Case file — a list, not a grid. Each case is a row, not a picture card. */}
        <div className="divide-y divide-gray-200 border-b border-gray-200">
          {caseFile.map((item, i) => (
            <motion.a
              key={item.slug}
              href={item.route}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              onClick={(e) => {
                e.preventDefault();
                openCase(item.route);
              }}
              className="group group/open cursor-pointer flex items-center gap-5 sm:gap-8 py-8 sm:py-10 lg:py-14 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-magenta-strong"
            >
              {/* Case number: purely decorative, drawn with CSS so it is not read as text */}
              <span
                aria-hidden="true"
                data-n={String(i + 1).padStart(2, "0")}
                className="shrink-0 w-14 sm:w-24 text-3xl sm:text-5xl lg:text-6xl font-light text-gray-300 group-hover:text-magenta-strong transition-colors duration-300 tabular-nums before:content-[attr(data-n)]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              />

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="type-eyebrow text-magenta-strong mb-1.5">
                  {item.sector}
                </p>
                <h3 className="type-h2 text-gray-900 mb-2 group-hover:translate-x-1 transition-transform duration-300">
                  {item.name}
                </h3>
                <p className="type-caption hidden sm:block text-gray-600">
                  {item.tagline}
                </p>
              </div>

              <OpenCue />
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}
