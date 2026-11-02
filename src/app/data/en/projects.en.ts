import type { ProjectDetail } from "../projects";
import type { Translated } from "../../i18n/localize";

/** Traducción de los casos al inglés, por slug. Las traducciones al inglés viven en la rama develop; en main no hay inglés publicado ni en revisión. */
export const projectsEn: Record<string, Translated<ProjectDetail>> = {};
