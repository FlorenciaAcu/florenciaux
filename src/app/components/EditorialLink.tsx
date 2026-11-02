import { motion } from "motion/react";
import { PageLink } from "./PageLink";
import { EDITORIAL_LINKS, isPagePublished, type EditorialPage } from "../data/seo";
import { isPageAvailable } from "../i18n/routes";
import { useI18n } from "../i18n/useI18n";

/** Acceso editorial compacto a una página de profundización: solo el enlace de texto del sitio (PageLink, el mismo de los detalles de proyecto).
 *  Sin etiqueta, descripción, líneas ni círculo: pesa menos que las etapas que lo preceden. Si la página de destino todavía no existe no se muestra:
 *  nunca hay un enlace roto (ver `PUBLISHED_PAGES` en data/seo.ts). */
export function EditorialLink({ page, className = "" }: { page: EditorialPage; className?: string }) {
  const { lang, home, lp } = useI18n();
  const link = EDITORIAL_LINKS[page];
  // Nunca un enlace roto: la página tiene que estar publicada y, en inglés, tener también su versión inglesa.
  if (!isPagePublished(link.path) || !isPageAvailable(link.path, lang)) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      <PageLink href={lp(link.path)}>{lang === "en" ? home.process.aiLink : link.title}</PageLink>
    </motion.div>
  );
}
