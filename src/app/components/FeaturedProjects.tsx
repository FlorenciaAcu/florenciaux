import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { getExperienceBySlug } from "../data/experiences";
import { getProjectBySlug } from "../data/projects";

const cintelink = getExperienceBySlug("cintelink")!;

const secondarySlugs = ["cemico", "buscador-agricola", "juan-gas-gnc"] as const;
const secondaryProjects = secondarySlugs.map((slug) => getProjectBySlug(slug)!);

// One short, explanatory line per card, all with the same shape: what I designed. Home-only copy: the pages keep their own taglines.
// The sector above the name already gives the context, so it is not repeated here.
const cardSummaries: Record<string, string> = {
  cintelink: "Plataforma, aplicación de despacho, dashboards operativos y Design System de una operación de abastecimiento.",
  cemico: "Productos digitales para pacientes, personal de admisión, colaboradores y auditores externos.",
  "buscador-agricola": "MVP de un marketplace agrícola: búsqueda, fichas de producto y contacto con empresas.",
  "juan-gas-gnc": "Consulta de saldo de puntos de un club de fidelización, del diseño a la implementación.",
};

const caseFile = [
  {
    slug: cintelink.slug,
    name: cintelink.company,
    sector: cintelink.sector ?? "",
    tagline: cardSummaries[cintelink.slug],
    route: `#/experiencia/${cintelink.slug}`,
  },
  ...secondaryProjects.map((project) => ({
    slug: project.slug,
    name: project.name,
    sector: project.sector,
    tagline: cardSummaries[project.slug],
    route: `#/proyectos/${project.slug}`,
  })),
];

export function FeaturedProjects() {
  const navigate = (route: string) => {
    sessionStorage.setItem("caseReturnHash", "/proyectos");
    window.location.hash = route.replace("#", "");
    setTimeout(() => window.scrollTo(0, 0), 100);
  };

  return (
    <section id="proyectos" className="relative py-20 lg:py-36 bg-[#fafafa]/90">
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="mb-5"
        >
          <h2 className="display-section text-gray-900">Proyectos destacados</h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lead text-gray-600 max-w-3xl mb-14 lg:mb-20"
        >
          Cómo abordo distintos problemas de producto y las decisiones de diseño detrás de cada solución.
        </motion.p>

        {/* Case file — a list, not a grid. Each case is a row, not a picture card. */}
        <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
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
                navigate(item.route);
              }}
              className="group cursor-pointer flex items-center gap-5 sm:gap-8 py-8 sm:py-10 lg:py-14 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#cc0058]"
            >
              {/* Case number: purely decorative, drawn with CSS so it is not read as text */}
              <span
                aria-hidden="true"
                data-n={String(i + 1).padStart(2, "0")}
                className="shrink-0 w-14 sm:w-24 text-3xl sm:text-5xl lg:text-6xl font-light text-gray-300 group-hover:text-[#cc0058] transition-colors duration-300 tabular-nums before:content-[attr(data-n)]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              />

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-[#cc0058] uppercase tracking-widest mb-1.5">
                  {item.sector}
                </p>
                <h3 className="display-block text-gray-900 mb-2 group-hover:translate-x-1 transition-transform duration-300">
                  {item.name}
                </h3>
                <p className="hidden sm:block text-sm text-gray-600 leading-relaxed max-w-2xl">
                  {item.tagline}
                </p>
              </div>

              {/* Arrow — hidden by default, slides in on hover (same behavior as ExperienceSection) */}
              <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full border border-gray-200 bg-[#fafafa] text-gray-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-white group-hover:bg-[#cc0058] group-hover:border-[#cc0058] group-focus-visible:opacity-100 group-focus-visible:translate-x-0 transition-all duration-300 ease-out">
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}
