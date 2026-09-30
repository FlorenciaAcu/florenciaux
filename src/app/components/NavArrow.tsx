import { ArrowRight } from "lucide-react";

/** Navigation Arrow: the "go to the detail" cue at the end of a row link (Proyectos destacados, Experiencia).
 *  Hidden until the parent `group` is hovered or focused; then it slides in and fills with magenta.
 *  Not the Process Connector ("Cómo trabajo"), which is a static sequence mark without a circle. */
export function NavArrow({ display = "flex" }: { display?: string }) {
  // `display` lets the consuming row decide when the arrow takes part in the layout (e.g. "hidden sm:flex"); the arrow itself has no breakpoints.
  return (
    <span className={`${display} shrink-0 w-10 h-10 items-center justify-center rounded-full border border-gray-200 bg-surface-page text-gray-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-white group-hover:bg-magenta-strong group-hover:border-magenta-strong group-focus-visible:opacity-100 group-focus-visible:translate-x-0 transition-all duration-300 ease-out`}>
      <ArrowRight className="w-4 h-4" aria-hidden="true" />
    </span>
  );
}
