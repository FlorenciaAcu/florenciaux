import type { MouseEvent } from "react";

/** Fired after every in-app navigation (history.pushState does not emit an event by itself). */
export const NAVIGATE_EVENT = "fa-navigate";

/** Where "Volver" returns to when a case was opened from a list: a site path, kept for the session. */
export const RETURN_PATH_KEY = "caseReturnPath";

export function currentPath() {
  const path = window.location.pathname.replace(/\/+$/, "");
  return path === "" ? "/" : path;
}

export function navigate(path: string, { replace = false }: { replace?: boolean } = {}) {
  window.history[replace ? "replaceState" : "pushState"]({}, "", path);
  window.dispatchEvent(new Event(NAVIGATE_EVENT));
}

/** Click handler for real links: modified clicks (new tab, new window) keep the browser's default behavior. */
export function handleLinkClick(event: MouseEvent, path: string, onNavigate?: () => void) {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  onNavigate?.();
  navigate(path);
}

/** Links shared before the site had real URLs ("/#/proyectos/cemico") keep working: the hash becomes the path. */
export function migrateLegacyHash() {
  if (typeof window === "undefined") return;
  const { hash } = window.location;
  if (hash.startsWith("#/")) window.history.replaceState({}, "", hash.slice(1));
}
