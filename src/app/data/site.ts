// Global site data: one place for the domain and the default metadata.
export const SITE_URL = "https://florenciaux.com";
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

/**
 * Canonical URL. The site still routes with the hash (#/proyectos/…): a fragment is not part of the URL for crawlers,
 * so every page is served from the same document and a canonical can't point at an inner page.
 * Until routes are real paths, every page declares the site root on purpose. After the migration: return absoluteUrl(path).
 */
export const canonicalFor = (_path?: string) => SITE_URL;
