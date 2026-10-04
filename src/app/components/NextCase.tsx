import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { getNextCase, type CaseLink } from "../data/caseOrder";
import { navigate, RETURN_PATH_KEY } from "../lib/router";

/** Closes a detail page with a way forward: the next case in the portfolio. Same row language as "Proyectos destacados". */
export function NextCase({ kind, slug }: { kind: CaseLink["kind"]; slug: string }) {
  const next = getNextCase(kind, slug);
  if (!next) return null;

  return (
    <section aria-label="Siguiente caso" className="bg-surface-page/90 py-14 lg:py-20">
      <div className="page-container">
        <motion.a
          href={next.path}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45 }}
          onClick={(e) => {
            e.preventDefault();
            sessionStorage.removeItem(RETURN_PATH_KEY);
            navigate(next.path);
          }}
          className="group flex cursor-pointer items-center justify-between gap-6 border-y border-gray-200 py-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-magenta-strong lg:py-12"
        >
          <div className="min-w-0">
            <p className="type-eyebrow text-magenta-strong">Siguiente caso · {next.kind}</p>
            <h2 className="type-h2 mt-2 text-gray-900 transition-transform duration-300 group-hover:translate-x-1">{next.title}</h2>
          </div>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-surface-page text-gray-600 transition-all duration-300 group-hover:border-magenta-strong group-hover:bg-magenta-strong group-hover:text-white group-focus-visible:border-magenta-strong group-focus-visible:bg-magenta-strong group-focus-visible:text-white">
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </motion.a>
      </div>
    </section>
  );
}
