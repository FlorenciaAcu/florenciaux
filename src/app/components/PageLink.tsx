import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { handleLinkClick } from "../lib/router";

/** Estilo del enlace de texto del sitio (el de "Abrir en otra pestaña" en los Prototipos de los detalles). Lo usan PageLink y CaseStudyBlocks. */
export const TEXT_LINK_CLASS =
  "inline-flex items-center gap-1.5 py-2 text-sm font-semibold text-magenta-strong underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-magenta-strong";

/** Enlace de texto del sitio: el mismo de los detalles de proyecto ("Abrir en otra pestaña" en Prototipos): texto chico en semibold, magenta, subrayado
 *  y la flecha arriba a la derecha pegada. Este es para ir a otra página del sitio (usa el router y se abre en la misma pestaña), por eso no
 *  lleva el aviso de "otra pestaña". Un solo estilo: si cambia en los detalles, cambia acá. */
export function PageLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a
      href={href}
      onClick={(e) => handleLinkClick(e, href)}
      className={`${TEXT_LINK_CLASS} ${className}`}
    >
      {children}
      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}
