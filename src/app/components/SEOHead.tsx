import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
}

const DEFAULTS = {
  title: "Florencia Acuña | Product Designer",
  description:
    "Portfolio de Florencia Acuña, Product Designer. Proyectos, experiencias y procesos de diseño de productos digitales, UX/UI e IA aplicada.",
  canonical: "https://florenciaux.com",
  ogImage: "https://florenciaux.com/og-image.png",
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

export function SEOHead({ title, description, canonical }: SEOProps) {
  const resolvedTitle = title ?? DEFAULTS.title;
  const resolvedDesc = description ?? DEFAULTS.description;
  const resolvedCanonical = canonical ?? DEFAULTS.canonical;

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
    setMeta("og:description", "Diseño productos digitales y prototipos funcionales con foco en experiencia de usuario, negocio, equipos e IA aplicada.", "property");
    setMeta("og:url", resolvedCanonical, "property");
    setMeta("og:image", DEFAULTS.ogImage, "property");
    setMeta("og:locale", "es_AR", "property");
    setMeta("og:site_name", "Florencia Acuña — Portfolio", "property");

    // Twitter/X card
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", resolvedTitle);
    setMeta("twitter:description", resolvedDesc);
    setMeta("twitter:image", DEFAULTS.ogImage);

    // Canonical
    setLink("canonical", resolvedCanonical);

    // Schema.org Person
    setJsonLd({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Florencia Acuña",
      url: "https://florenciaux.com",
      jobTitle: "Product Designer",
      description:
        "Product Designer especializada en productos digitales, plataformas SaaS, MVPs, prototipado funcional e IA aplicada al producto. Basada en San Juan, Argentina.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "San Juan",
        addressCountry: "AR",
      },
      sameAs: [
        "https://www.linkedin.com/in/florencia-acuna-ux/",
        "https://medium.com/@florenciaacuna",
      ],
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
      ],
    });
  }, [resolvedTitle, resolvedDesc, resolvedCanonical]);

  return null;
}
