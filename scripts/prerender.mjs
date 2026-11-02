// After `vite build`: one HTML file per case and per experience (dist/proyectos/cemico.html, served as /proyectos/cemico by vercel.json cleanUrls), with its own <title>, description, canonical and Open Graph tags
// already in the head. Crawlers that do not run JavaScript (WhatsApp, LinkedIn, Slack previews) read these, and Google gets the right
// metadata before it renders the page. The body is still the app: it takes over in the browser. Also writes sitemap.xml.
// English (/en/…): the same pages again, only for the English pages that exist (isEnAvailable in src/app/i18n/routes.ts). Nothing is published in English
// unless it is in EN_PUBLISHED; `npm run build:review` also generates the pages under review, to inspect the HTML before approving them.
import { build } from "esbuild";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");

// The content lives in TypeScript files that import images; bundle them for Node and ignore the images (only text is needed).
const bundle = await build({
  stdin: {
    contents: `
      export { projects } from "./src/app/data/projects.ts";
      export { experiences } from "./src/app/data/experiences.ts";
      export { projectSeo, experienceSeo, processSeo, aiSeo, isPagePublished } from "./src/app/data/seo.ts";
      export { SITE_URL, SITE_NAME, OG_IMAGE_PATH, absoluteUrl, canonicalFor, structuredData } from "./src/app/data/site.ts";
      export { toLangPath, isEnAvailable, allEsPaths, HOME_SECTIONS } from "./src/app/i18n/routes.ts";
      export { siteEn } from "./src/app/data/en/site.en.ts";
      export { getProject, getExperience } from "./src/app/i18n/content.ts";
      export { seoEn } from "./src/app/data/en/seo.en.ts";
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
const code = bundle.outputFiles[0].text;
const data = await import(`data:text/javascript;base64,${Buffer.from(code).toString("base64")}`);
const { projects, experiences, projectSeo, experienceSeo, processSeo, aiSeo, isPagePublished, SITE_URL, SITE_NAME, OG_IMAGE_PATH, absoluteUrl, canonicalFor, structuredData } = data;
const { toLangPath, isEnAvailable, allEsPaths, HOME_SECTIONS, siteEn, seoEn, getProject, getExperience } = data;

const template = await readFile(join(dist, "index.html"), "utf8");

const escapeAttr = (text) => text.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
/** Meta description of at most 158 characters. If the text is longer, it keeps whole sentences while they fit (a description that ends in the
 *  middle of a sentence reads as cut off in the results); when that leaves under 90 characters (too little to describe the page) it cuts at a word instead and add "…". */
const clip = (text, max = 158) => {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const sentences = clean.match(/[^.!?]+[.!?]+(?=\s|$)/g) ?? [];
  let out = "";
  for (const sentence of sentences) {
    const next = (out + " " + sentence.trim()).trim();
    if (next.length > max) break;
    out = next;
  }
  if (out.length >= 90) return out;
  return clean.slice(0, max).replace(/\s+\S*$/, "") + "…";
};

/** Person + WebSite data for search engines, written into the HTML. Same id as the one SEOHead updates in the browser, so it is replaced, not duplicated. */
const schemaTag = (lang = "es") => `<script id="schema-person" type="application/ld+json">${JSON.stringify(structuredData(lang)).replace(/</g, "\\u003c")}</script>`;
const withSchema = (html, lang = "es") => html.replace("</head>", `      ${schemaTag(lang)}\n    </head>`);

/** Reciprocal es-AR / en pair (plus x-default, the Spanish page), only for pages whose English version exists. */
// The Spanish Home is "…/" (same as its canonical and its sitemap entry): the hreflang must name exactly the canonical URL.
const esUrlOf = (esPath) => (esPath === "/" ? SITE_URL + "/" : canonicalFor(esPath));
const alternatesFor = (esPath) =>
  isEnAvailable(esPath)
    ? [
        { hreflang: "es-AR", href: esUrlOf(esPath) },
        { hreflang: "en", href: canonicalFor(toLangPath(esPath, "en")) },
        { hreflang: "x-default", href: esUrlOf(esPath) },
      ]
    : [];
const alternateLinks = (alternates) => alternates.map((a) => `<link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" />`);
/** Adds the language pair to HTML that already has its head (the Home shell). */
const withAlternates = (html, alternates, otherLocale) =>
  alternates.length === 0
    ? html
    : html
        .replace(/([ \t]*)(<meta property="og:locale" content="[^"]*" \/>)/, `$1$2\n$1<meta property="og:locale:alternate" content="${otherLocale}" />`)
        .replace("</head>", `${alternateLinks(alternates).map((line) => `      ${line}\n`).join("")}    </head>`);

/** Replaces the head tags that change per page; everything else in the template stays. */
function pageHtml({ title, description, path, image, lang = "es", alternates = [] }) {
  const url = canonicalFor(path);
  const img = absoluteUrl(image ?? OG_IMAGE_PATH);
  const head = [
    `<title>${escapeAttr(title)}</title>`,
    `<meta name="description" content="${escapeAttr(description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:title" content="${escapeAttr(title)}" />`,
    `<meta property="og:description" content="${escapeAttr(description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${img}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="${lang === "en" ? "en_US" : "es_AR"}" />`,
    ...(alternates.length ? [`<meta property="og:locale:alternate" content="${lang === "en" ? "es_AR" : "en_US"}" />`] : []),
    `<meta property="og:site_name" content="Florencia Acuña — Portfolio" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttr(title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(description)}" />`,
    `<meta name="twitter:image" content="${img}" />`,
    ...alternateLinks(alternates),
  ]
    .map((line) => `      ${line}`)
    .join("\n");

  const stripped = template
    .replace(/[ \t]*<title>[\s\S]*?<\/title>\r?\n?/i, "")
    .replace(/[ \t]*<meta\s+name="description"[^>]*>\r?\n?/gi, "")
    .replace(/[ \t]*<meta\s+property="og:[^"]*"[^>]*>\r?\n?/gi, "")
    .replace(/[ \t]*<meta\s+name="twitter:[^"]*"[^>]*>\r?\n?/gi, "")
    .replace(/[ \t]*<link\s+rel="canonical"[^>]*>\r?\n?/gi, "");
  const html = withSchema(stripped.replace("</head>", `${head}\n    </head>`), lang);
  return lang === "en" ? html.replace('<html lang="es-AR">', '<html lang="en">') : html;
}

const pages = [];
for (const project of projects) {
  const seo = projectSeo(project);
  pages.push({ path: seo.path, title: `${seo.title} | ${SITE_NAME}`, description: clip(seo.description ?? ""), image: seo.image });
}
for (const experience of experiences) {
  const seo = experienceSeo(experience);
  pages.push({ path: seo.path, title: `${seo.title} | ${SITE_NAME}`, description: clip(seo.description ?? ""), image: seo.image });
}

// Editorial pages (HTML and sitemap) only when they are published (PUBLISHED_PAGES in data/seo.ts, the same list that turns on their links).
for (const seo of [processSeo, aiSeo]) {
  if (isPagePublished(seo.path)) pages.push({ path: seo.path, title: `${seo.title} | ${SITE_NAME}`, description: clip(seo.description) });
}

for (const page of pages) {
  const file = join(dist, `${page.path}.html`);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, pageHtml({ ...page, alternates: alternatesFor(page.path) }));
}

// English pages. An English page that exists must have its own title and description: the build stops otherwise (never Spanish metadata on an English page).
const enPages = [];
for (const esPath of allEsPaths()) {
  if (esPath === "/" || HOME_SECTIONS.includes(esPath) || !isEnAvailable(esPath)) continue;
  // Cases and experiences take their English title and description from the translated data (data/en/projects.en.ts, experiences.en.ts); the other pages from data/en/seo.en.ts.
  const slug = esPath.split("/").pop();
  const seo = esPath.startsWith("/proyectos/") ? projectSeo(getProject(slug, "en")) : esPath.startsWith("/experiencia/") ? experienceSeo(getExperience(slug, "en")) : seoEn[esPath];
  if (!seo?.title || !seo?.description) throw new Error(`prerender: falta el SEO en inglés de ${esPath} (data/en/projects.en.ts o data/en/seo.en.ts)`);
  if (`${seo.title} ${seo.description}`.includes("[MISSING")) throw new Error(`prerender: el SEO en inglés de ${esPath} tiene textos sin traducir`);
  if (!pages.some((page) => page.path === esPath)) throw new Error(`prerender: ${esPath} está disponible en inglés pero no tiene versión española publicada`);
  enPages.push({ esPath, path: toLangPath(esPath, "en"), title: `${seo.title} | ${SITE_NAME}`, description: clip(seo.description) });
}
for (const page of enPages) {
  const file = join(dist, `${page.path}.html`);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, pageHtml({ ...page, lang: "en", alternates: alternatesFor(page.esPath) }));
}

// Home sections (/sobre-mi, /proyectos, ...) and unknown paths: the same app shell, as real files, so none of them depends on a rewrite rule.
// 404.html is what Vercel serves, with a 404 status, for a path that does not exist; the app then shows its own "not found" page.
for (const section of ["sobre-mi", "proyectos", "experiencia", "contacto"]) await writeFile(join(dist, `${section}.html`), withSchema(template));
// The home (index.html) carries it too, and the es-AR / en pair when the English Home exists.
await writeFile(join(dist, "index.html"), withAlternates(withSchema(template), alternatesFor("/"), "en_US"));

// English Home: /en and /en/ (dist/en.html and dist/en/index.html). Its sections (/en/about …) canonicalize to the English Home, like the Spanish ones do to "/",
// so they have no language pair of their own and no sitemap entry.
let enHomePages = 0;
if (isEnAvailable("/")) {
  const home = { title: siteEn.homeTitle, description: siteEn.homeDescription, path: "/en", lang: "en" };
  await mkdir(join(dist, "en"), { recursive: true });
  const homeHtml = pageHtml({ ...home, alternates: alternatesFor("/") });
  await writeFile(join(dist, "en.html"), homeHtml);
  await writeFile(join(dist, "en", "index.html"), homeHtml);
  enHomePages++;
  for (const section of HOME_SECTIONS) {
    if (!isEnAvailable(section)) continue;
    await writeFile(join(dist, `${toLangPath(section, "en")}.html`), pageHtml(home));
    enHomePages++;
  }
}
// 404.html is what Vercel serves with a 404 status; it must never be indexed or point to the home as its canonical.
const notFound = template
  .replace(/[ \t]*<title>[\s\S]*?<\/title>/i, `      <title>Página no encontrada | ${SITE_NAME}</title>`)
  .replace(/<meta name="robots" content="[^"]*" \/>/i, '<meta name="robots" content="noindex, nofollow" />')
  .replace(/[ \t]*<link\s+rel="canonical"[^>]*>\r?\n?/i, "");
await writeFile(join(dist, "404.html"), notFound);

// No <lastmod>: the build date is not the date the content changed, and a wrong lastmod makes search engines trust the field less.
// English pages are listed too, each pair with reciprocal xhtml:link entries; the Home sections are never listed.
const entries = [{ esPath: "/", loc: SITE_URL + "/" }, ...pages.map((page) => ({ esPath: page.path, loc: canonicalFor(page.path) }))];
const sitemapEntries = [
  ...entries,
  ...entries.filter((entry) => isEnAvailable(entry.esPath)).map((entry) => ({ esPath: entry.esPath, loc: canonicalFor(toLangPath(entry.esPath, "en")) })),
];
const urls = sitemapEntries.map((entry) => entry.loc);
const hasEnglish = sitemapEntries.length > entries.length;
const sitemapUrl = (entry) =>
  `  <url>\n    <loc>${entry.loc}</loc>\n` +
  (isEnAvailable(entry.esPath)
    ? alternatesFor(entry.esPath).map((a) => `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" />\n`).join("")
    : "") +
  `  </url>`;
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"${hasEnglish ? ' xmlns:xhtml="http://www.w3.org/1999/xhtml"' : ""}>\n` +
  sitemapEntries.map(sitemapUrl).join("\n") +
  `\n</urlset>\n`;
await writeFile(join(dist, "sitemap.xml"), sitemap);

const english = enPages.length + enHomePages;
console.log(`prerender: ${pages.length} pages + 4 home sections + 404 + sitemap (${urls.length} URLs)${english ? ` + ${english} English pages (review build)` : ""}`);
