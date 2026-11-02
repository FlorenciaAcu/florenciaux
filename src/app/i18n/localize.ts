import { enMissing } from "./home";

/** Campos que NO se traducen (ni se piden en el inglés): rutas, imágenes, enlaces, íconos y clases de maquetación. Todo lo demás, sí. */
export const NON_TEXT_KEYS: ReadonlySet<string> = new Set(["slug", "src", "url", "icon", "aspect", "grid", "imageCount", "year", "path", "image", "howCollective", "href"]);

type NonTextKey = "slug" | "src" | "url" | "icon" | "aspect" | "grid" | "imageCount" | "year" | "path" | "image" | "howCollective" | "href";

/** La forma del texto traducible de un dato: la misma que el español, sin los campos que no se traducen. Un campo que falta en el inglés rompe `tsc`
 *  (los opcionales los revisa el validador: `npm run check:i18n`). */
export type Translated<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? Translated<U>[]
    : T extends object
      ? { [K in keyof T as K extends NonTextKey ? never : K]: Translated<T[K]> }
      : T;

/** El dato en español con sus textos reemplazados por los del inglés, en la misma posición. Lo que no se traduce (imágenes, rutas, enlaces) se toma del
 *  español. Un texto inglés que falta NO se completa con el español: queda `[MISSING EN: ruta]`, visible en pantalla y detectado por el validador. */
export function localize<T>(es: T, en: unknown, path = ""): T {
  if (typeof es === "string") return (typeof en === "string" ? en : enMissing(path)) as T;
  if (Array.isArray(es)) {
    const list = Array.isArray(en) ? en : [];
    return es.map((item, i) => localize(item, list[i], `${path}[${i}]`)) as T;
  }
  if (es && typeof es === "object") {
    const source = (en && typeof en === "object" ? en : {}) as Record<string, unknown>;
    const out: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(es as Record<string, unknown>)) {
      out[key] = NON_TEXT_KEYS.has(key) ? value : localize(value, source[key], path ? `${path}.${key}` : key);
    }
    return out as T;
  }
  return es;
}
