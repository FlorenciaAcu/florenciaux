import { ArrowUpRight } from "lucide-react";

/** "This opens" cue for every row or card that is a link (Proyectos destacados and Experiencia in the home, Proyectos inside a detail).
 *  A circle with an arrow, always visible (there is no hover on touch); on hover or focus it fills with magenta and the arrow turns white.
 *  The arrow never moves: it stays centered. The row or card that holds it must carry `group/open`.
 *  Not the Process Connector ("Cómo trabajo"), which is a static sequence mark without a link. */
export function OpenCue({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-surface-page text-gray-600 transition-colors duration-300 group-hover/open:border-magenta-strong group-hover/open:bg-magenta-strong group-hover/open:text-white group-focus-visible/open:border-magenta-strong group-focus-visible/open:bg-magenta-strong group-focus-visible/open:text-white group-has-[:focus-visible]/open:border-magenta-strong group-has-[:focus-visible]/open:bg-magenta-strong group-has-[:focus-visible]/open:text-white ${className}`}
    >
      <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
    </span>
  );
}
