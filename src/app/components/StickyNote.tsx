import type { ReactNode } from "react";

/** Sombra de las sticky notes del sitio (la misma que usan las notas del diagrama "Cómo se conecta"). */
export const STICKY_SHADOW = "shadow-[0_2px_4px_rgba(10,10,10,0.12)]";

/** La sticky note amarilla del sitio. Un solo estilo para todas: mismo amarillo, padding, sombra, inclinación y texto. Lo único que se decide en cada uso es el ancho
 *  y el lugar donde va (`className`), nunca el aspecto. Si hay que cambiar cómo se ve una sticky note amarilla, se cambia acá. */
export function StickyNote({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`type-title-compact -rotate-[1deg] bg-[#fff3a6] p-5 text-gray-900 ${STICKY_SHADOW} ${className}`}>{children}</p>;
}
