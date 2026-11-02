import { useSyncExternalStore } from "react";
import { currentPath, NAVIGATE_EVENT } from "../lib/router";
import { homeEn, homeEs } from "./home";
import { isEnEnabled, resolveLocation, toLangPath, type Lang } from "./routes";
import { uiEn } from "./ui.en";
import { uiEs } from "./ui.es";

export const uiFor = (lang: Lang) => (lang === "en" ? uiEn : uiEs);
export const homeFor = (lang: Lang) => (lang === "en" ? homeEn : homeEs);

/** El idioma sale SOLO de la URL (`/en/…` es inglés; todo lo demás, español). Sin redirecciones por ubicación ni por el idioma del navegador.
 *  Si todavía no hay nada público en inglés, una URL `/en/…` se trata como cualquier dirección inexistente (404 en español). */
export const langFromLocation = (): Lang => (resolveLocation(currentPath()).lang === "en" && isEnEnabled() ? "en" : "es");

function subscribe(callback: () => void) {
  window.addEventListener(NAVIGATE_EVENT, callback);
  window.addEventListener("popstate", callback);
  return () => {
    window.removeEventListener(NAVIGATE_EVENT, callback);
    window.removeEventListener("popstate", callback);
  };
}

export function useLang(): Lang {
  return useSyncExternalStore(subscribe, langFromLocation, () => "es" as Lang);
}

/** Idioma actual, textos de interfaz, contenido de la Home y `lp`: la ruta española → la del idioma actual (`lp("/proyectos/cemico")`). */
export function useI18n() {
  const lang = useLang();
  return { lang, ui: uiFor(lang), home: homeFor(lang), lp: (esPath: string) => toLangPath(esPath, lang) };
}
