import { useEffect } from "react";
import { LINKEDIN_URL, MEDIUM_URL } from "../data/contact";
import { absoluteUrl, canonicalFor, OG_IMAGE_PATH, SITE_NAME, SITE_URL, structuredData } from "../data/site";
import { siteEn } from "../data/en/site.en";
import { isEnAvailable, resolveLocation, toLangPath } from "../i18n/routes";
import { useLang } from "../i18n/useI18n";

interface SEOProps {
  /** Page title without the site name: "CEMICO" becomes "CEMICO | Florencia Acuña". Omit it for Home. */
  title?: string;
  description?: string;
  /** Site path of the page IN SPANISH (the equivalent in the current language is derived from it; see i18n/routes.ts). Omit it for Home. */
  path?: string;
  /** Site path of the OG image under public/. */
  image?: string;
  /** Pages that must not appear in search results (the private references page). */
  noindex?: boolean;
  /** Whether the page has a language alternate (hreflang). Home sections canonicalize to the Home, so they say `false`. Default: true. */
  alternates?: boolean;
}

const DEFAULTS = {
  title: "Florencia Acuña | Diseño UX/UI y Product Design en Argentina",
  description:
    "Product Designer en Argentina. Diseño UX/UI de sitios web, apps y rediseño de productos digitales, con foco en experiencia de usuario, negocio y equipos.",
  ogDescription:
    "Diseño UX/UI de sitios web, apps y rediseño de productos digitales, con foco en experiencia de usuario, negocio, equipos e IA aplicada.",
};

function setMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function removeMeta(name: string, attr: "name" | "property" = "name") {
  document.querySelector(`meta[${attr}="${name}"]`)?.remove();
}

/** Language alternates (hreflang): replaces whatever is there, so a page never keeps the previous page's. */
function setAlternates(items: { hreflang: string; href: string }[]) {
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
  for (const { hreflang, href } of items) {
    const el = document.createElement("link");
    el.setAttribute("rel", "alternate");
    el.setAttribute("hreflang", hreflang);
    el.setAttribute("href", href);
    document.head.appendChild(el);
  }
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function setJsonLd(data: object) {
  const id = "schema-person";
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.id = id;
    el.type = "application/ld+json";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export function SEOHead({ title, description, path, image, noindex, alternates = true }: SEOProps) {
  const lang = useLang();
  const en = lang === "en";
  const esPath = path ?? "/";
  const homeTitle = en ? siteEn.homeTitle : DEFAULTS.title;
  const resolvedTitle = title ? `${title} | ${SITE_NAME}` : homeTitle;
  const resolvedDesc = description ?? (en ? siteEn.homeDescription : DEFAULTS.description);
  // Home keeps its own OG description; inner pages share their page description.
  const resolvedOgDesc = description ?? (en ? siteEn.homeOgDescription : DEFAULTS.ogDescription);
  const resolvedCanonical = canonicalFor(en ? toLangPath(esPath, "en") : path);
  const resolvedImage = absoluteUrl(image ?? OG_IMAGE_PATH);
  // Reciprocal es-AR / en pair, only when the English page really exists (see isEnAvailable) and the page is not a Home section.
  const hasPair = alternates && !noindex && isEnAvailable(resolveLocation(esPath).es ?? esPath);
  // The Spanish Home's canonical in the HTML is "…/": the hreflang names exactly that URL.
  const esUrl = esPath === "/" ? `${SITE_URL}/` : canonicalFor(path);
  const enUrl = canonicalFor(toLangPath(esPath, "en"));

  useEffect(() => {
    // lang
    document.documentElement.lang = en ? "en" : "es-AR";

    // title
    document.title = resolvedTitle;

    // basic meta
    setMeta("description", resolvedDesc);
    setMeta("robots", noindex ? "noindex, nofollow" : "index, follow");
    setMeta("author", "Florencia Acuña");

    // Open Graph
    setMeta("og:type", "website", "property");
    setMeta("og:title", resolvedTitle, "property");
    setMeta("og:description", resolvedOgDesc, "property");
    setMeta("og:url", resolvedCanonical, "property");
    setMeta("og:image", resolvedImage, "property");
    setMeta("og:locale", en ? "en_US" : "es_AR", "property");
    if (hasPair) setMeta("og:locale:alternate", en ? "es_AR" : "en_US", "property");
    else removeMeta("og:locale:alternate", "property");
    setMeta("og:site_name", "Florencia Acuña — Portfolio", "property");

    // Twitter/X card
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", resolvedTitle);
    setMeta("twitter:description", resolvedDesc);
    setMeta("twitter:image", resolvedImage);

    // Canonical (always the page itself, in its own language) and the language pair
    setLink("canonical", resolvedCanonical);
    setAlternates(hasPair ? [{ hreflang: "es-AR", href: esUrl }, { hreflang: "en", href: enUrl }, { hreflang: "x-default", href: esUrl }] : []);

    // Schema.org: Person + WebSite (the same data the build writes into the HTML)
    setJsonLd(structuredData(lang));
  }, [lang, en, hasPair, esUrl, enUrl, noindex, resolvedTitle, resolvedDesc, resolvedOgDesc, resolvedCanonical, resolvedImage]);

  return null;
}
