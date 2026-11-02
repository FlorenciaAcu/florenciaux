import type { Experience } from "./experiences";
import type { ProjectDetail } from "./projects";
import type { PageSeo } from "./site";

/** First paragraph of a text whose paragraphs are separated by a blank line. */
const firstParagraph = (text?: string) => text?.split("\n\n")[0];

/** Project metadata: explicit `seo` fields win; otherwise the name and the approved "Qué es" of the case. No new copy. */
export function projectSeo(project: ProjectDetail): PageSeo {
  return {
    title: project.seo?.title ?? project.name,
    description: project.seo?.description ?? firstParagraph(project.caseStudy?.about) ?? project.tagline,
    path: project.seo?.path ?? `/proyectos/${project.slug}`,
    image: project.seo?.image,
  };
}

/** Experience metadata: same rule, from the company name and its "Qué es". */
export function experienceSeo(experience: Experience): PageSeo {
  return {
    title: experience.seo?.title ?? experience.company,
    description:
      experience.seo?.description ??
      firstParagraph(experience.caseStudy?.about) ??
      firstParagraph(experience.about) ??
      experience.bio[0],
    path: experience.seo?.path ?? `/experiencia/${experience.slug}`,
    image: experience.seo?.image,
  };
}

/** "Cómo diseñé mi portfolio": the public page about the ideas and decisions behind this site. */
export const PROCESS_PATH = "/como-disene-mi-portfolio";

/** Address the page had while it was private. It was never published; if someone opens it, it moves to the public one. */
export const LEGACY_PROCESS_PATH = "/referencias-oowrobkusi23tdjo";

export const processSeo: PageSeo = {
  title: "Cómo diseñé mi portfolio",
  description: "Cómo diseñé FlorenciaUX: las ideas, referencias y decisiones que dieron forma a mi portfolio profesional.",
  path: PROCESS_PATH,
};

/** "Cómo integro la IA en mi proceso": cómo aborda proyectos de clientes y en qué momentos usa IA. */
export const AI_PROCESS_PATH = "/como-trabajo-con-ia";

export const aiSeo: PageSeo = {
  title: "Cómo integro la IA en mi proceso",
  description:
    "Conocé cómo abordo proyectos de diseño de producto, desde el relevamiento inicial hasta la entrega, y cómo incorporo herramientas de IA en distintas etapas.",
  path: AI_PROCESS_PATH,
};

/** Páginas editoriales con destino real. Un acceso (EditorialLink) solo se muestra si su ruta está acá: nunca hay un enlace roto. */
export const PUBLISHED_PAGES: ReadonlySet<string> = new Set([PROCESS_PATH, AI_PROCESS_PATH]);
export const isPagePublished = (path: string) => PUBLISHED_PAGES.has(path);

export type EditorialPage = "ai";

/** Accesos editoriales en bloque (hoy solo el de "Cómo trabajo"). El de "Sobre mí" es un enlace de una línea dentro del cuaderno. */
export const EDITORIAL_LINKS: Record<EditorialPage, { path: string; title: string }> = {
  ai: {
    path: AI_PROCESS_PATH,
    title: "Cómo integro la IA en mi proceso",
  },
};
