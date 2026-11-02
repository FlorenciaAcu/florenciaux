// Validador de internacionalización (`npm run check:i18n`; también corre al inicio de `npm run build`).
// Detecta traducciones faltantes ANTES de publicar, sin ningún respaldo en español:
//   1. Paridad de estructura entre el español (referencia aprobada) y el inglés: mismas claves, mismos tipos, mismas cantidades.
//   2. Textos ingleses vacíos, idénticos al español (salvo la lista de nombres propios y términos compartidos), con restos de español o con marcas [MISSING].
//   3. Que cada proyecto y experiencia de `data/` tenga su equivalencia de ruta y su traducción de la Home.
//   4. Rutas: equivalencias únicas, ida y vuelta, y que todo lo público (EN_PUBLISHED) tenga metadatos propios y todo lo que enlaza también esté publicado.
//   5. Avisos que dependen de datos: el CV en inglés, el texto de WhatsApp, etc.
// Los falsos positivos (nombres propios, marcas y términos profesionales compartidos) se declaran abajo, cada uno con su motivo.
import { build } from "esbuild";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const bundle = await build({
  stdin: {
    contents: `
      export { uiEs } from "./src/app/i18n/ui.es.ts";
      export { uiEn } from "./src/app/i18n/ui.en.ts";
      export { homeEs, homeEn, homeEnOverlay } from "./src/app/i18n/home.ts";
      export * as routes from "./src/app/i18n/routes.ts";
      export { siteEn } from "./src/app/data/en/site.en.ts";
      export { seoEn } from "./src/app/data/en/seo.en.ts";
      export { projects } from "./src/app/data/projects.ts";
      export { projectsEn } from "./src/app/data/en/projects.en.ts";
      export { experiencesEn } from "./src/app/data/en/experiences.en.ts";
      export { referenciasEs, procesoIAEs } from "./src/app/i18n/editorialData.ts";
      export { referenciasEn, procesoIAEn } from "./src/app/data/en/editorial.en.ts";
      export { localize, NON_TEXT_KEYS } from "./src/app/i18n/localize.ts";
      export { experiences } from "./src/app/data/experiences.ts";
      export { CV_BY_LANG, WHATSAPP_URL, whatsappUrl } from "./src/app/data/contact.ts";
    `,
    resolveDir: root,
    loader: "ts",
  },
  bundle: true,
  write: false,
  format: "esm",
  platform: "node",
  loader: { ".webp": "empty", ".jpg": "empty", ".jpeg": "empty", ".png": "empty", ".svg": "empty" },
  logLevel: "error",
});
const data = await import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString("base64")}`);
const { uiEs, uiEn, homeEs, homeEn, homeEnOverlay, routes, siteEn, seoEn, projects, projectsEn, experiencesEn, referenciasEs, procesoIAEs, referenciasEn, procesoIAEn, localize, NON_TEXT_KEYS, experiences, CV_BY_LANG, WHATSAPP_URL, whatsappUrl } = data;

const errors = [];
const fail = (where, message) => errors.push(`${where}: ${message}`);

/* ───────── Falsos positivos declarados ───────── */

/** Textos que son iguales en español y en inglés a propósito (nombre propio, marca o término profesional compartido). */
const SAME_ON_PURPOSE = new Map([
  ["Product Designer", "título profesional, se usa tal cual en los dos idiomas"],
  ["Florencia Acuña — Product Designer", "nombre propio + título profesional"],
  ["Error 404", "código HTTP"],
  ["Español", "nombre del idioma en su propio idioma"],
  ["English", "nombre del idioma en su propio idioma"],
  ["Pizza", "palabra compartida"],
  ["Pilates & TPA", "disciplinas, nombre propio"],
  ["Agtech", "término del sector, compartido"],
  ["Cintelink", "nombre de empresa"],
  ["Bridgenext", "nombre de empresa"],
  ["Legal", "término del sector, compartido"],
  ["Real estate", "término del sector, compartido"],
  ["Design System", "término profesional compartido"],
  ["Product Design", "término profesional compartido"],
  ["Marketplace", "término profesional compartido"],
  ["Search UX", "término profesional compartido"],
  ["MVP", "término profesional compartido"],
  ["UX/UI", "término profesional compartido"],
  ["Agro", "término del sector, compartido"],
  ["UX Designer / Product Designer", "título profesional, se usa tal cual en los dos idiomas"],
  ["Córdoba, Argentina", "ubicación (nombre propio)"],
  ["cintelink.com", "dominio"],
  ["CloudLabs", "nombre propio"],
  ["Web Folcode", "nombre propio del proyecto"],
  ["Respública", "nombre propio"],
  ["Linkin Park", "nombre propio"],
  ["Sticky notes", "término compartido (se usa en inglés en el original)"],
  ["Stickers", "término compartido"],
  ["AUDAGNO – Abogado", "nombre comercial del sitio, se conserva"],
  ["Chile", "nombre de país"],
  ["Uruguay", "nombre de país"],
  ["Neuquén, Argentina", "ubicación (nombre propio)"],
  ["San Juan, Argentina", "ubicación (nombre propio)"],
  ["La Plata, Argentina", "ubicación (nombre propio)"],
  ["CEMICO", "nombre propio"],
  ["InfoCasas", "nombre propio"],
  ["Buscador Agrícola", "nombre propio"],
  ["Juan Gas GNC Club", "nombre propio"],
  ["Microsoft Access", "herramienta"],
  ["Google Sheets", "herramienta"],
  ["Cloudflare Workers", "herramienta"],
  ["portalsalud.grupocemico.com.ar", "dominio"],
  ["buscadoragricola.cl", "dominio"],
  ["juangasgnc.vercel.app", "dominio"],
  ["audagnoabogado.com", "dominio"],
  ["infocasas.com.uy", "dominio"],
]);

/** Nombres propios y marcas: se quitan antes de buscar restos de español (llevan eñes o suenan a español sin serlo). */
const PROPER_NAMES = [
  "Florencia Acuña", "Acuña", "Grupo CEMICO", "CEMICO", "Juan Gas GNC Club", "Juan Gas", "UNSJ", "TPA", "yerbiado", "Buscador Agrícola",
  "Cintelink", "Bridgenext", "Figma Make", "Figma", "Claude", "Lovable", "Medium", "LinkedIn", "mate cocido", "Google Analytics",
  "Microsoft Clarity", "Español", "Neuquén", "La Plata", "Abogado en La Plata", "Agro360", "HitOcean", "Añelo", "Córdoba", "Respública", "YPF", "UNICCO Glifosato", "Expo Transporte", "Folcode", "Behance", "Consultar", "Microsoft Access", "Google Sheets", "Cloudflare Workers",
];

const SPANISH_ACCENTS = /[áéíóúñ¿¡]/i;
const SPANISH_WORDS = /\b(el|la|los|las|del|para|con|que|una|mi|por|y|es|se|hola|más|pero|como|cómo)\b/i;

const withoutNames = (text) => PROPER_NAMES.reduce((acc, name) => acc.split(name).join(" "), text);

/* ───────── 1 y 2. Paridad y calidad de los textos ───────── */

const kind = (value) => (Array.isArray(value) ? "array" : value === null ? "null" : typeof value);

function compare(es, en, path, skip = new Set()) {
  if (kind(es) !== kind(en)) return fail(path, `el tipo cambia (es: ${kind(es)}, en: ${kind(en)})`);
  if (typeof es === "function") {
    const sample = en("sample@x.com");
    if (typeof sample !== "string" || !sample.includes("sample@x.com")) fail(path, "la función en inglés no usa su argumento");
    return;
  }
  if (Array.isArray(es)) {
    if (es.length !== en.length) fail(path, `distinta cantidad de elementos (es: ${es.length}, en: ${en.length})`);
    es.forEach((item, i) => i < en.length && compare(item, en[i], `${path}[${i}]`, skip));
    return;
  }
  if (typeof es === "object" && es !== null) {
    for (const key of Object.keys(es)) {
      if (skip.has(key)) continue;
      if (!(key in en)) fail(`${path}.${key}`, "falta en inglés");
      else compare(es[key], en[key], `${path}.${key}`, skip);
    }
    for (const key of Object.keys(en)) if (!skip.has(key) && !(key in es)) fail(`${path}.${key}`, "sobra en inglés (no existe en español)");
    return;
  }
  if (typeof es === "string") checkEnglishText(es, en, path);
}

function checkEnglishText(es, en, path) {
  if (en.trim() === "") return fail(path, "texto inglés vacío");
  if (en.includes("[MISSING")) return fail(path, "marca [MISSING] sin resolver");
  if (en === es && !SAME_ON_PURPOSE.has(en)) return fail(path, `idéntico al español (si es un nombre propio o un término compartido, declararlo en SAME_ON_PURPOSE): "${en.slice(0, 50)}"`);
  if (SAME_ON_PURPOSE.has(en)) return;
  const rest = withoutNames(en);
  if (SPANISH_ACCENTS.test(rest)) fail(path, `restos de español (acentos): "${en.slice(0, 60)}"`);
  else if (SPANISH_WORDS.test(rest)) fail(path, `restos de español (palabras): "${en.slice(0, 60)}"`);
}

// Los controles del contenido en inglés corren solo si hay algo en inglés publicado o en revisión (en main, hasta que el inglés llegue desde develop, no hay nada).
const EN_ACTIVE = routes.EN_PUBLISHED.size > 0 || routes.EN_REVIEW.size > 0;

if (EN_ACTIVE) {
compare(uiEs, uiEn, "ui");
compare(homeEs, homeEn, "home");

/* Casos: cada texto del español tiene su traducción en la misma posición (los campos que no se traducen —imágenes, rutas, enlaces— se saltean). */
for (const project of projects) {
  const en = projectsEn[project.slug];
  if (!en) { fail(`projectsEn.${project.slug}`, "falta la traducción del caso"); continue; }
  compare(project, en, `project:${project.slug}`, NON_TEXT_KEYS);
}
for (const slug of Object.keys(projectsEn)) if (!projects.some((p) => p.slug === slug)) fail(`projectsEn.${slug}`, "traducción de un caso que no existe");
for (const experience of experiences) {
  const en = experiencesEn[experience.slug];
  if (!en) { fail(`experiencesEn.${experience.slug}`, "falta la traducción de la experiencia"); continue; }
  compare(experience, en, `experience:${experience.slug}`, NON_TEXT_KEYS);
}
for (const slug of Object.keys(experiencesEn)) if (!experiences.some((e) => e.slug === slug)) fail(`experiencesEn.${slug}`, "traducción de una experiencia que no existe");

/* Páginas editoriales */
compare(referenciasEs, referenciasEn, "referencias", NON_TEXT_KEYS);
compare(procesoIAEs, procesoIAEn, "procesoIA", NON_TEXT_KEYS);
// El modelo de proceso es uno solo: las etapas de la página de IA llevan los mismos nombres que las de "Cómo trabajo" del Home.
const homeSteps = homeEn.process.steps.map((s) => s.title).join("|");
if (procesoIAEn.AI_HERO.flow.join("|") !== homeSteps) fail("procesoIA.AI_HERO.flow", `las etapas del hero no coinciden con las de la Home (${homeSteps})`);
if (procesoIAEn.AI_STAGES.stages.map((s) => s.name).join("|") !== homeSteps) fail("procesoIA.AI_STAGES", `las etapas no coinciden con las de la Home (${homeSteps})`);
if (homeEn.process.aiLink.trim() === "") fail("home.process.aiLink", "falta el enlace a la página de IA");

/* ───────── 3. Cobertura de los datos ───────── */

const featured = ["cintelink", "cemico", "buscador-agricola", "juan-gas-gnc"];
for (const slug of featured) {
  if (!homeEs.featured.summaries[slug]) fail(`home.featured.summaries.${slug}`, "falta el resumen en español");
  const sector = homeEnOverlay.sectors[slug];
  if (!sector) fail(`homeEnOverlay.sectors.${slug}`, "falta el rubro en inglés");
  else checkEnglishText("", sector, `homeEnOverlay.sectors.${slug}`);
}
}

/* ───────── 4. Rutas y publicación ───────── */

const { STATIC_ROUTES, PROJECT_SLUGS, EXPERIENCE_SLUGS, allEsPaths, resolveLocation, toLangPath, EN_PUBLISHED, EN_REVIEW, HOME_SECTIONS } = routes;

const esPaths = allEsPaths();
const enPaths = esPaths.map((p) => toLangPath(p, "en"));
if (new Set(esPaths).size !== esPaths.length) fail("routes", "rutas españolas repetidas");
if (new Set(enPaths).size !== enPaths.length) fail("routes", "rutas inglesas repetidas");
for (const p of esPaths) {
  const back = resolveLocation(toLangPath(p, "en"));
  if (back.lang !== "en" || back.es !== p) fail("routes", `la ida y vuelta falla en ${p} → ${toLangPath(p, "en")} → ${back.es}`);
  if (!toLangPath(p, "en").startsWith("/en")) fail("routes", `${p} no queda bajo /en`);
}
for (const project of projects) if (!PROJECT_SLUGS.includes(project.slug)) fail("routes", `el proyecto "${project.slug}" no tiene equivalencia (PROJECT_SLUGS)`);
for (const slug of PROJECT_SLUGS) if (!projects.some((p) => p.slug === slug)) fail("routes", `PROJECT_SLUGS lista "${slug}", que no existe en data/projects.ts`);
for (const experience of experiences) if (!EXPERIENCE_SLUGS[experience.slug]) fail("routes", `la experiencia "${experience.slug}" no tiene equivalencia (EXPERIENCE_SLUGS)`);
for (const slug of Object.keys(EXPERIENCE_SLUGS)) if (!experiences.some((e) => e.slug === slug)) fail("routes", `EXPERIENCE_SLUGS lista "${slug}", que no existe en data/experiences.ts`);
if (resolveLocation("/en/projects/no-existe").es !== null) fail("routes", "una URL inglesa inexistente tiene que resolverse como inexistente");
if (resolveLocation("/proyectos/cemico").lang !== "es") fail("routes", "las URLs españolas no cambian");
// Las rutas españolas aprobadas no se tocan.
for (const [es, en] of [["/", "/en/"], ["/proyectos/cemico", "/en/projects/cemico"], ["/experiencia/cintelink", "/en/experience/cintelink"], ["/experiencia/consultoria", "/en/experience/consulting"], ["/como-disene-mi-portfolio", "/en/how-i-designed-my-portfolio"], ["/como-trabajo-con-ia", "/en/how-i-use-ai-in-design"]]) {
  if (toLangPath(es, "en") !== en) fail("routes", `${es} debería equivaler a ${en} y da ${toLangPath(es, "en")}`);
}

const isSection = (p) => HOME_SECTIONS.includes(p);
for (const p of [...EN_PUBLISHED, ...EN_REVIEW]) {
  if (!esPaths.includes(p)) fail("routes", `${p} está en EN_PUBLISHED/EN_REVIEW pero no es una ruta conocida`);
}
for (const p of EN_PUBLISHED) {
  if (!(p === "/" || isSection(p)) && !seoEn[p]) fail("seo.en", `${p} es público en inglés pero no tiene título y descripción propios`);
}
if (EN_ACTIVE) {
for (const [p, seo] of Object.entries(seoEn)) {
  checkEnglishText("", seo.title, `seoEn.${p}.title`);
  checkEnglishText("", seo.description, `seoEn.${p}.description`);
}
checkEnglishText("", siteEn.homeTitle, "siteEn.homeTitle");
checkEnglishText("", siteEn.homeDescription, "siteEn.homeDescription");
checkEnglishText("", siteEn.homeOgDescription, "siteEn.homeOgDescription");
checkEnglishText("", siteEn.personDescription, "siteEn.personDescription");
siteEn.knowsAbout.forEach((item, i) => SAME_ON_PURPOSE.has(item) || checkEnglishText("", item, `siteEn.knowsAbout[${i}]`));
if (siteEn.homeTitle === "Florencia Acuña | Diseño UX/UI y Product Design en Argentina") fail("siteEn.homeTitle", "igual al título en español");
}

// Una página pública en inglés no puede enlazar a una que no lo sea: el Home enlaza a todos los casos, experiencias y páginas editoriales.
if (EN_PUBLISHED.has("/")) {
  for (const p of esPaths.filter((path) => !isSection(path) && path !== "/")) {
    if (!EN_PUBLISHED.has(p)) fail("routes", `el Home inglés es público pero enlaza a ${p}, que todavía no lo es`);
  }
}

/* ───────── 5. Avisos que dependen de datos ───────── */

if (EN_ACTIVE && CV_BY_LANG.en === CV_BY_LANG.es) {
  if (!/spanish/i.test(homeEn.hero.ctaCv)) fail("home.hero.ctaCv", "el CV inglés es el documento en español: el botón tiene que decirlo");
  if (!/spanish/i.test(uiEn.footer.cv)) fail("ui.footer.cv", "el CV inglés es el documento en español: el enlace tiene que decirlo");
}
if (WHATSAPP_URL !== "https://wa.me/5492646271705?text=Hola%20Florencia%2C%20necesito%20que%20me%20ayudes%20a%20dise%C3%B1ar%20") fail("contact", "la URL de WhatsApp en español cambió");
if (whatsappUrl(uiEs.whatsapp.message) !== WHATSAPP_URL) fail("contact", "el mensaje de WhatsApp en español no coincide con WHATSAPP_URL");
if (EN_ACTIVE && !new URL(whatsappUrl(uiEn.whatsapp.message)).pathname.startsWith("/5492646271705")) fail("contact", "WhatsApp en inglés usa otro número");

if (errors.length) {
  console.error(`check:i18n — ${errors.length} problema${errors.length === 1 ? "" : "s"}:\n` + errors.map((e) => `  ✗ ${e}`).join("\n"));
  process.exit(1);
}
console.log(`check:i18n — ok (${esPaths.length} rutas, ${EN_PUBLISHED.size} páginas inglesas públicas, ${EN_REVIEW.size} en revisión)`);
