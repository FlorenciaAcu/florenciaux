/** Textos en inglés de los datos estructurados (JSON-LD) y de los metadatos de la Home. Las traducciones al inglés viven en la rama develop; en main no hay inglés publicado ni en revisión. */

export interface SiteCopy {
  /** Título y descripción de la Home (y de sus secciones, que canonicalizan a ella). */
  homeTitle: string;
  homeDescription: string;
  homeOgDescription: string;
  personDescription: string;
  knowsAbout: string[];
}

export const siteEn: SiteCopy = {
  homeTitle: "",
  homeDescription: "",
  homeOgDescription: "",
  personDescription: "",
  knowsAbout: [],
};
