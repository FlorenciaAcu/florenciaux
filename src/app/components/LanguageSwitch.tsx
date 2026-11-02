import { currentPath, handleLinkClick } from "../lib/router";
import { isEnAvailable, isEnEnabled, resolveLocation, toLangPath, type Lang } from "../i18n/routes";
import { useI18n } from "../i18n/useI18n";

/** Selector ES · EN: texto plano, sin marco ni banderas. El idioma activo va en semibold con un punto magenta debajo (el acento del sitio, pero distinto al
 *  subrayado de los enlaces del menú, para que no se lea como otro enlace de navegación); el otro es el que se puede elegir. Cambiar de idioma lleva a la página equivalente (no al Home) y el idioma sale solo de la URL.
 *  No se muestra hasta que haya algo público en inglés (`isEnEnabled`); si la página actual todavía no tiene versión inglesa, "EN" aparece
 *  deshabilitado en lugar de llevar a un 404 o a una página a medias. `large` es la versión del menú móvil (objetivo táctil más grande). */
export function LanguageSwitch({ dark = false, large = false, className = "" }: { dark?: boolean; large?: boolean; className?: string }) {
  const { lang, ui } = useI18n();
  if (!isEnEnabled()) return null;

  const esPath = resolveLocation(currentPath()).es ?? "/";
  const items: { code: Lang; label: string; text: string }[] = [
    { code: "es", label: ui.lang.es, text: "ES" },
    { code: "en", label: ui.lang.en, text: "EN" },
  ];

  const segment = `relative flex items-center justify-center transition-colors duration-300 ${large ? "min-h-11 min-w-11 text-base" : "min-h-8 min-w-7 text-sm"}`;
  const active = dark ? "font-semibold text-white" : "font-semibold text-gray-900";
  const idle = dark ? "font-medium text-white/70 hover:text-white" : "font-medium text-gray-600 hover:text-gray-900";
  const disabled = dark ? "font-medium text-white/35" : "font-medium text-gray-400";
  const focus = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta-strong";

  return (
    <div role="group" aria-label={ui.lang.label} className={`inline-flex items-center gap-3 ${className}`}>
      {items.map((item) => {
        const target = toLangPath(esPath, item.code);
        const available = item.code === "es" || isEnAvailable(esPath);
        if (item.code === lang) {
          return (
            <span key={item.code} lang={item.code} aria-label={item.label} aria-current="true" className={`${segment} ${active}`}>
              {item.text}
              <span aria-hidden="true" className={`absolute left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-magenta-strong ${large ? "bottom-2" : "bottom-0.5"}`} />
            </span>
          );
        }
        if (available) {
          return (
            <a
              key={item.code}
              href={target}
              hrefLang={item.code === "es" ? "es-AR" : "en"}
              lang={item.code}
              aria-label={item.label}
              onClick={(e) => handleLinkClick(e, target)}
              className={`${segment} ${idle} ${focus}`}
            >
              {item.text}
            </a>
          );
        }
        return (
          <span key={item.code} lang={item.code} aria-label={`${item.label}. ${ui.lang.unavailable}`} aria-disabled="true" title={ui.lang.unavailable} className={`${segment} ${disabled}`}>
            {item.text}
          </span>
        );
      })}
    </div>
  );
}
