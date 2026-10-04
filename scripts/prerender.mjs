// After `vite build`: one HTML file per case and per experience (dist/proyectos/cemico.html, served as /proyectos/cemico by vercel.json cleanUrls), with its own <title>, description, canonical and Open Graph tags
// already in the head. Crawlers that do not run JavaScript (WhatsApp, LinkedIn, Slack previews) read these, and Google gets the right
// metadata before it renders the page. The body is still the app: it takes over in the browser. Also writes sitemap.xml.
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
      export { projectSeo, experienceSeo } from "./src/app/data/seo.ts";
      export { SITE_URL, SITE_NAME, OG_IMAGE_PATH, absoluteUrl, canonicalFor } from "./src/app/data/site.ts";
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
const { projects, experiences, projectSeo, experienceSeo, SITE_URL, SITE_NAME, OG_IMAGE_PATH, absoluteUrl, canonicalFor } = data;

const template = await readFile(join(dist, "index.html"), "utf8");

const escapeAttr = (text) => text.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const clip = (text, max = 158) => {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return clean.slice(0, max).replace(/\s+\S*$/, "") + "…";
};

/** Replaces the head tags that change per page; everything else in the template stays. */
function pageHtml({ title, description, path, image }) {
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
    `<meta property="og:locale" content="es_AR" />`,
    `<meta property="og:site_name" content="Florencia Acuña — Portfolio" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttr(title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(description)}" />`,
    `<meta name="twitter:image" content="${img}" />`,
  ]
    .map((line) => `      ${line}`)
    .join("\n");

  const stripped = template
    .replace(/[ \t]*<title>[\s\S]*?<\/title>\r?\n?/i, "")
    .replace(/[ \t]*<meta\s+name="description"[^>]*>\r?\n?/gi, "")
    .replace(/[ \t]*<meta\s+property="og:[^"]*"[^>]*>\r?\n?/gi, "")
    .replace(/[ \t]*<meta\s+name="twitter:[^"]*"[^>]*>\r?\n?/gi, "")
    .replace(/[ \t]*<link\s+rel="canonical"[^>]*>\r?\n?/gi, "");
  return stripped.replace("</head>", `${head}\n    </head>`);
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

for (const page of pages) {
  const file = join(dist, `${page.path}.html`);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, pageHtml(page));
}

const today = new Date().toISOString().slice(0, 10);
const urls = [SITE_URL + "/", ...pages.map((page) => canonicalFor(page.path))];
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map((loc) => `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`).join("\n") +
  `\n</urlset>\n`;
await writeFile(join(dist, "sitemap.xml"), sitemap);

console.log(`prerender: ${pages.length} pages + sitemap (${urls.length} URLs)`);
