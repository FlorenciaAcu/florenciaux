import { getProjectBySlug, type ProjectDetail } from "../data/projects";
import { getExperienceBySlug, type Experience } from "../data/experiences";
import { experiencesEn } from "../data/en/experiences.en";
import type { CaseLink } from "../data/caseOrder";
import { projectsEn } from "../data/en/projects.en";
import { enMissing } from "./home";
import { localize } from "./localize";
import type { Lang } from "./routes";

/** Un caso en el idioma pedido. En español es el dato tal cual; en inglés, el mismo dato con los textos de `data/en/projects.en.ts`. */
export function getProject(slug: string, lang: Lang): ProjectDetail | undefined {
  const es = getProjectBySlug(slug);
  if (!es || lang === "es") return es;
  return localize(es, projectsEn[slug], `project:${slug}`);
}

/** Una experiencia en el idioma pedido (misma lógica que `getProject`). La Home también lee de acá el nombre y el resumen de cada tarjeta. */
export function getExperience(slug: string, lang: Lang): Experience | undefined {
  const es = getExperienceBySlug(slug);
  if (!es || lang === "es") return es;
  return localize(es, experiencesEn[slug], `experience:${slug}`);
}

/** Título de un caso en la cadena "Siguiente caso". */
export function caseTitle(link: CaseLink, lang: Lang): string {
  if (lang === "es") return link.title;
  const slug = link.path.split("/").pop() ?? "";
  if (link.kind === "Proyecto") return getProject(slug, "en")?.name ?? enMissing(link.key);
  return getExperience(slug, "en")?.company ?? enMissing(link.key);
}
