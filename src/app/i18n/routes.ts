/** Idiomas y rutas equivalentes: la ÚNICA fuente de qué URL inglesa corresponde a cada URL española.
 *  El español es el idioma principal y sus URLs no cambian; el inglés vive bajo `/en/`.
 *  Los componentes siguen escribiendo la ruta española y la pasan por `toLangPath` (o `lp` del hook `useI18n`): así hay un solo mapa.
 *  Los slugs no se generan traduciendo nombres: se listan acá, uno por uno. Este archivo no importa nada del sitio (lo usa también el build en Node). */

export type Lang = "es" | "en";
export const LANGS: readonly Lang[] = ["es", "en"];

/** Casos (`/proyectos/:slug`). Son nombres propios: el slug inglés es el mismo. */
export const PROJECT_SLUGS: readonly string[] = ["cemico", "buscador-agricola", "juan-gas-gnc", "juan-audagno", "infocasas"];

/** Experiencias (`/experiencia/:slug`): slug español → slug inglés. Solo se traduce `consultoria`. */
export const EXPERIENCE_SLUGS: Readonly<Record<string, string>> = {
  consultoria: "consulting",
  cintelink: "cintelink",
  bridgenext: "bridgenext",
};

/** Páginas fijas, secciones del Home incluidas. `/en` es el Home inglés (su canónica lleva la barra final: `/en/`, ver `canonicalFor`). */
export const STATIC_ROUTES: readonly { es: string; en: string }[] = [
  { es: "/", en: "/en" },
  { es: "/sobre-mi", en: "/en/about" },
  { es: "/proyectos", en: "/en/projects" },
  { es: "/experiencia", en: "/en/experience" },
  { es: "/contacto", en: "/en/contact" },
  { es: "/como-disene-mi-portfolio", en: "/en/how-i-designed-my-portfolio" },
  { es: "/como-trabajo-con-ia", en: "/en/how-i-use-ai-in-design" },
];

/** La dirección canónica del Home inglés (la misma que `canonicalFor` publica en la canonical, el sitemap y el hreflang). */
export const EN_HOME_URL = "/en/";

/** Secciones del Home: renderizan el Home y hacen scroll. Su canónica es la del Home y no llevan hreflang propio ni entrada en el sitemap. */
export const HOME_SECTIONS: readonly string[] = ["/sobre-mi", "/proyectos", "/experiencia", "/contacto"];

const DETAIL = {
  projects: { es: "/proyectos/", en: "/en/projects/" },
  experience: { es: "/experiencia/", en: "/en/experience/" },
} as const;

/** Una ruta sin barra final (la raíz es "/"). Dos direcciones que solo difieren en la barra final son la misma página. */
export const normalizePath = (path: string) => normalize(path);

const normalize = (path: string) => {
  const p = path.replace(/\/+$/, "");
  return p === "" ? "/" : p;
};

const isSlug = (rest: string) => rest !== "" && !rest.includes("/");

const experienceEsFromEn = (en: string) => Object.keys(EXPERIENCE_SLUGS).find((es) => EXPERIENCE_SLUGS[es] === en);

/** Qué idioma es una URL y a qué ruta española equivale. `es: null` = una URL inglesa que no existe (se muestra el 404 inglés). */
export function resolveLocation(path: string): { lang: Lang; es: string | null } {
  const p = normalize(path);
  if (p !== "/en" && !p.startsWith("/en/")) return { lang: "es", es: p };

  const hit = STATIC_ROUTES.find((r) => r.en === p);
  if (hit) return { lang: "en", es: hit.es };

  if (p.startsWith(DETAIL.projects.en)) {
    const slug = p.slice(DETAIL.projects.en.length);
    return { lang: "en", es: isSlug(slug) && PROJECT_SLUGS.includes(slug) ? DETAIL.projects.es + slug : null };
  }
  if (p.startsWith(DETAIL.experience.en)) {
    const esSlug = experienceEsFromEn(p.slice(DETAIL.experience.en.length));
    return { lang: "en", es: esSlug ? DETAIL.experience.es + esSlug : null };
  }
  return { lang: "en", es: null };
}

/** La ruta de `esPath` en el idioma pedido. `esPath` es siempre la ruta española (la que escriben los componentes).
 *  Una ruta que no existe cae en el Home del idioma. */
export function toLangPath(esPath: string, lang: Lang): string {
  const p = normalize(esPath);
  if (lang === "es") return p;

  const hit = STATIC_ROUTES.find((r) => r.es === p);
  // El Home inglés se enlaza con su dirección canónica ("/en/", con barra final); "/en" sigue funcionando y resuelve a la misma página.
  if (hit) return hit.es === "/" ? EN_HOME_URL : hit.en;
  if (p.startsWith(DETAIL.projects.es)) {
    const slug = p.slice(DETAIL.projects.es.length);
    if (isSlug(slug) && PROJECT_SLUGS.includes(slug)) return DETAIL.projects.en + slug;
  }
  if (p.startsWith(DETAIL.experience.es)) {
    const slug = p.slice(DETAIL.experience.es.length);
    if (EXPERIENCE_SLUGS[slug]) return DETAIL.experience.en + EXPERIENCE_SLUGS[slug];
  }
  return EN_HOME_URL;
}

/** Todas las rutas españolas que tienen equivalente (para el sitemap, el validador y los tests). */
export function allEsPaths(): string[] {
  return [
    ...STATIC_ROUTES.map((r) => r.es),
    ...PROJECT_SLUGS.map((s) => DETAIL.projects.es + s),
    ...Object.keys(EXPERIENCE_SLUGS).map((s) => DETAIL.experience.es + s),
  ];
}

/* ───────────── Qué páginas inglesas existen ───────────── */

/** Páginas inglesas PÚBLICAS (ruta española equivalente). Vacío hasta que Florencia apruebe cada una: ninguna URL inglesa se publica antes.
 *  Una página entra acá solo cuando está traducida completa y revisada, y ya pueden publicarse también las páginas a las que enlaza. */
export const EN_PUBLISHED: ReadonlySet<string> = new Set<string>([]);

/** Páginas con traducción lista para REVISAR, solo en local (`npm run dev`) o en un build de revisión (`npm run build:review`).
 *  Nunca se publican por estar acá. */
export const EN_REVIEW: ReadonlySet<string> = new Set<string>([]);

const viteEnv = (import.meta as { env?: { DEV?: boolean; VITE_I18N_REVIEW?: string } }).env;
const nodeEnv = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env;

/** Modo de revisión: servidor de desarrollo (`npm run dev`) o `npm run build:review` (que fija `I18N_PREVIEW` y `VITE_I18N_REVIEW`). En el build normal es falso. */
export const REVIEW_MODE: boolean = viteEnv?.DEV === true || viteEnv?.VITE_I18N_REVIEW === "1" || nodeEnv?.I18N_PREVIEW === "1";

/** ¿Existe la versión inglesa de esta página (ruta española)? Sin respaldo: si no está lista, no hay inglés. */
export const isEnAvailable = (esPath: string, review: boolean = REVIEW_MODE) =>
  EN_PUBLISHED.has(normalize(esPath)) || (review && EN_REVIEW.has(normalize(esPath)));

/** ¿Hay algo en inglés que mostrar? Si no, el selector no aparece y las URLs `/en/…` son un 404. */
export const isEnEnabled = (review: boolean = REVIEW_MODE) => (review && EN_REVIEW.size > 0) || EN_PUBLISHED.size > 0;

/** ¿La página (ruta española) puede enlazarse desde una página en este idioma? En español siempre. */
export const isPageAvailable = (esPath: string, lang: Lang) => lang === "es" || isEnAvailable(esPath);
