import { useEffect } from "react";
import { LINKEDIN_URL, MEDIUM_URL } from "../data/contact";
import { absoluteUrl, canonicalFor, OG_IMAGE_PATH, SITE_NAME, SITE_URL } from "../data/site";

interface SEOProps {
  /** Page title without the site name: "CEMICO" becomes "CEMICO | Florencia Acuña". Omit it for Home. */
  title?: string;
  description?: string;
  /** Site path of the page (see canonicalFor in data/site.ts). */
  path?: string;
  /** Site path of the OG image under public/. */
  image?: string;
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

export function SEOHead({ title, description, path, image }: SEOProps) {
  const resolvedTitle = title ? `${title} | ${SITE_NAME}` : DEFAULTS.title;
  const resolvedDesc = description ?? DEFAULTS.description;
  // Home keeps its own OG description; inner pages share their page description.
  const resolvedOgDesc = description ?? DEFAULTS.ogDescription;
  const resolvedCanonical = canonicalFor(path);
  const resolvedImage = absoluteUrl(image ?? OG_IMAGE_PATH);

  useEffect(() => {
    // lang
    document.documentElement.lang = "es";

    // title
    document.title = resolvedTitle;

    // basic meta
    setMeta("description", resolvedDesc);
    setMeta("robots", "index, follow");
    setMeta("author", "Florencia Acuña");

    // Open Graph
    setMeta("og:type", "website", "property");
    setMeta("og:title", resolvedTitle, "property");
    setMeta("og:description", resolvedOgDesc, "property");
    setMeta("og:url", resolvedCanonical, "property");
    setMeta("og:image", resolvedImage, "property");
    setMeta("og:locale", "es_AR", "property");
    setMeta("og:site_name", "Florencia Acuña — Portfolio", "property");

    // Twitter/X card
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", resolvedTitle);
    setMeta("twitter:description", resolvedDesc);
    setMeta("twitter:image", resolvedImage);

    // Canonical
    setLink("canonical", resolvedCanonical);

    // Schema.org Person
    setJsonLd({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Florencia Acuña",
      url: SITE_URL,
      jobTitle: "Product Designer",
      description:
        "Product Designer especializada en productos digitales, plataformas SaaS, MVPs, prototipado funcional e IA aplicada al producto. Basada en San Juan, Argentina.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "San Juan",
        addressCountry: "AR",
      },
      sameAs: [LINKEDIN_URL, MEDIUM_URL],
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
    });
  }, [resolvedTitle, resolvedDesc, resolvedOgDesc, resolvedCanonical, resolvedImage]);

  return null;
}
