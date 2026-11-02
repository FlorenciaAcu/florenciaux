import type { Experience } from "../experiences";
import type { Translated } from "../../i18n/localize";

/** Traducción de las experiencias al inglés, por slug. Las traducciones al inglés viven en la rama develop; en main no hay inglés publicado ni en revisión. */
export const experiencesEn: Record<string, Translated<Experience>> = {};
