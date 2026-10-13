// Global site data: one place for the domain and the default metadata.
import { INSTAGRAM_URL, LINKEDIN_URL, MEDIUM_URL } from "./contact";
export const SITE_URL = "https://www.florenciaux.com";
export const SITE_NAME = "Florencia Acuña";

/** The real asset lives in public/images/og-image.png. Open Graph needs an absolute URL. */
export const OG_IMAGE_PATH = "/images/og-image.png";
export const absoluteUrl = (path: string) => `${SITE_URL}${path}`;

/** Per-page metadata a project or experience can define. Everything is optional: missing fields are derived from existing content. */
export interface PageSeo {
  title?: string;
  description?: string;
  /** Site path of the page, as it will be once routes stop using the hash (e.g. "/proyectos/cemico"). */
  path?: string;
  /** Site path of a specific OG image under public/ (defaults to OG_IMAGE_PATH). */
  image?: string;
}

/** Canonical URL: every page has its own path now (the home is the site root). */
export const canonicalFor = (path?: string) => (path && path !== "/" ? absoluteUrl(path) : SITE_URL);

/** Structured data (schema.org) for search engines: who the person is, which profiles are hers, and which site is hers.
 *  One source for both the browser (SEOHead) and the build (scripts/prerender.mjs), so the HTML that crawlers read first says the same.
 *  `sameAs` is only for her own profiles; press that mentions her does not go here. */
export const structuredData = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: SITE_NAME,
      alternateName: ["Flor Acuña", "Florencia Acuna", "florenciaux"],
      url: SITE_URL,
      jobTitle: "Product Designer",
      description:
        "Product Designer especializada en productos digitales, plataformas SaaS, MVPs, prototipado funcional e IA aplicada al producto. Basada en San Juan, Argentina.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "San Juan",
        addressCountry: "AR",
      },
      sameAs: [LINKEDIN_URL, MEDIUM_URL, INSTAGRAM_URL],
      knowsAbout: [
        "Product Design",
        "UX/UI Design",
        "Diseño de productos digitales",
        "Prototipado funcional",
        "IA aplicada al producto",
        "MVPs",
        "Plataformas SaaS",
        "Design Systems",
        "Experiencia de usuario",
        "Diseño de experiencia",
        "Diseño de sitios web",
        "Diseño de apps",
        "Rediseño de apps",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Florencia Acuña — Portfolio",
      alternateName: "florenciaux",
      inLanguage: "es-AR",
      about: { "@id": `${SITE_URL}/#person` },
      author: { "@id": `${SITE_URL}/#person` },
    },
  ],
});
