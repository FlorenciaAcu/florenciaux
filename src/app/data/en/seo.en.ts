/** Título y descripción en inglés de las páginas editoriales. Las traducciones al inglés viven en la rama develop; en main no hay inglés publicado ni en revisión. */

export interface PageSeoEn {
  /** Sin el nombre del sitio: el build y SEOHead agregan " | Florencia Acuña". */
  title: string;
  description: string;
}

export const seoEn: Record<string, PageSeoEn> = {};
