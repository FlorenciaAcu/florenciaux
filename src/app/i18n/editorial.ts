import { useMemo } from "react";
import { getProcesoIA, getReferencias } from "./editorialData";
import { useLang } from "./useI18n";

/** El contenido de «Cómo diseñé mi portfolio» y de «Cómo integro la IA en mi proceso» en el idioma de la URL. */
export function useReferencias() {
  const lang = useLang();
  return useMemo(() => getReferencias(lang), [lang]);
}

export function useProcesoIA() {
  const lang = useLang();
  return useMemo(() => getProcesoIA(lang), [lang]);
}
