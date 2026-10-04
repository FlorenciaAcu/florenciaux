import { experiences, getExperienceBySlug } from "./experiences";
import { getProjectBySlug } from "./projects";

export interface CaseLink {
  key: string;
  title: string;
  kind: "Proyecto" | "Experiencia";
  path: string;
}

// Same reading order as the site: the experiences as they appear in "Experiencia" (oldest first), and each experience's projects
// right after it, in the order its page lists them. It follows the data, so a new experience or project lands in the chain by itself.
const cases: CaseLink[] = [...experiences].reverse().flatMap((experience) => [
  {
    key: `Experiencia/${experience.slug}`,
    kind: "Experiencia" as const,
    title: getExperienceBySlug(experience.slug)?.company ?? experience.slug,
    path: `/experiencia/${experience.slug}`,
  },
  ...experience.projects.flatMap((project) => {
    const detail = project.slug ? getProjectBySlug(project.slug) : undefined;
    return detail
      ? [{ key: `Proyecto/${detail.slug}`, kind: "Proyecto" as const, title: detail.name, path: `/proyectos/${detail.slug}` }]
      : [];
  }),
]);

/** The case that follows the current one; the last one wraps to the first. */
export function getNextCase(kind: CaseLink["kind"], slug: string): CaseLink | undefined {
  const i = cases.findIndex((c) => c.key === `${kind}/${slug}`);
  if (i === -1) return undefined;
  return cases[(i + 1) % cases.length];
}
