import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { getExperienceBySlug } from "../data/experiences";
import { getProjectBySlug } from "../data/projects";

const cintelink = getExperienceBySlug("cintelink")!;

const secondarySlugs = ["cemico", "buscador-agricola", "juan-gas-gnc"] as const;
const secondaryProjects = secondarySlugs.map((slug) => getProjectBySlug(slug)!);

const caseFile = [
  {
    slug: cintelink.slug,
    name: cintelink.company,
    sector: cintelink.sector ?? "",
    tagline: cintelink.tagline ?? cintelink.bio[0],
    route: `#/proyectos/${cintelink.slug}`,
  },
  ...secondaryProjects.map((project) => ({
    slug: project.slug,
    name: project.name,
    sector: project.sector,
    tagline: project.tagline,
    route: `#/caso/${project.slug}`,
  })),
];

export function FeaturedProjects() {
  const navigate = (route: string) => {
    sessionStorage.setItem("caseReturnHash", "/proyectos");
    window.location.hash = route.replace("#", "");
    setTimeout(() => window.scrollTo(0, 0), 100);
  };

  return (
    <section id="proyectos" className="relative py-12 lg:py-20 bg-[#fafafa]/90">
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="mb-5"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">Proyectos destacados</h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-gray-600 leading-relaxed mb-10 lg:mb-14"
        >
          Una selección de proyectos que muestran cómo abordo distintos problemas de producto y las decisiones de diseño detrás de cada solución.
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
              className="group cursor-pointer flex items-center gap-5 sm:gap-8 py-6 sm:py-8 lg:py-10 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#cc0058]"
            >
              {/* Case number: purely decorative, drawn with CSS so it is not read as text */}
              <span
                aria-hidden="true"
                data-n={String(i + 1).padStart(2, "0")}
                className="shrink-0 w-14 sm:w-24 text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-200 group-hover:text-[#cc0058] transition-colors duration-300 tabular-nums before:content-[attr(data-n)]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              />

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-[#cc0058] uppercase tracking-widest mb-1.5">
                  {item.sector}
                </p>
                <h3 className="text-lg sm:text-2xl font-bold text-gray-900 tracking-tight mb-1.5 group-hover:translate-x-1 transition-transform duration-300">
                  {item.name}
                </h3>
                <p className="hidden sm:block text-sm text-gray-600 leading-relaxed max-w-xl">
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
