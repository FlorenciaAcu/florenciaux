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
