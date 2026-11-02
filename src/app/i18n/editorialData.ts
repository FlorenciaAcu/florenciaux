import { CLOSING, CONCEPTS, CONVEY, EVOLUTION, HERO, INSPIRED, MOODBOARD, PLAYLIST, SHAPE } from "../data/referencias";
import { AI_CTA, AI_DELIVERABLES, AI_HERO, AI_ROLES, AI_STAGES, AI_START } from "../data/procesoIA";
import { aiSeo, AI_PROCESS_PATH, PROCESS_PATH, processSeo } from "../data/seo";
import { referenciasEn, procesoIAEn } from "../data/en/editorial.en";
import { seoEn } from "../data/en/seo.en";
import type { PageSeo } from "../data/site";
import { localize } from "./localize";
import type { Lang } from "./routes";

/** Las dos páginas editoriales: el español aprobado (data/referencias.ts y data/procesoIA.ts, que no se tocan) y su traducción (data/en/editorial.en.ts).
 *  Sin React: lo usan los componentes (vía `useReferencias` / `useProcesoIA`), el build y el validador. */

export const referenciasEs = { HERO, CONVEY, SHAPE, MOODBOARD, EVOLUTION, INSPIRED, PLAYLIST, CONCEPTS, CLOSING };
export type ReferenciasEs = typeof referenciasEs;

export const procesoIAEs = { AI_HERO, AI_START, AI_STAGES, AI_ROLES, AI_DELIVERABLES, AI_CTA };
export type ProcesoIAEs = typeof procesoIAEs;

/** El contenido en el idioma pedido. Lo que no se traduce (imágenes, enlaces) viene del español; un texto inglés que falta queda `[MISSING EN: …]`. */
export const getReferencias = (lang: Lang): ReferenciasEs => (lang === "en" ? localize(referenciasEs, referenciasEn, "referencias") : referenciasEs);
export const getProcesoIA = (lang: Lang): ProcesoIAEs => (lang === "en" ? localize(procesoIAEs, procesoIAEn, "procesoIA") : procesoIAEs);

/** Título y descripción de una página editorial (ruta española) en el idioma pedido. */
export function getEditorialSeo(esPath: string, lang: Lang): PageSeo {
  const base = esPath === AI_PROCESS_PATH ? aiSeo : processSeo;
  if (esPath !== PROCESS_PATH && esPath !== AI_PROCESS_PATH) return base;
  return lang === "en" ? localize(base, seoEn[esPath], `seo:${esPath}`) : base;
}
