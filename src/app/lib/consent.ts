const KEY = "fa-consent";
const GA_ID = "G-K0C4D7W7SH";
const CLARITY_ID = "tiqf6172y1";

export type Consent = "granted" | "denied";

/** The footer link fires this to reopen the banner. */
export const OPEN_CONSENT_EVENT = "fa-open-consent";

export function getConsent(): Consent | null {
  try {
    const value = localStorage.getItem(KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function setConsent(value: Consent) {
  try {
    localStorage.setItem(KEY, value);
  } catch {
    /* storage can be unavailable (private mode): the choice just won't be remembered */
  }
}

let loaded = false;

/** Adds a tracking script once: if it is already in the page (for instance after a hot reload, which resets `loaded`), it is not added again. */
function addScriptOnce(src: string) {
  if (document.querySelector(`script[src="${src}"]`)) return;
  const script = document.createElement("script");
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

/** Google Analytics (gtag.js) and Microsoft Clarity. Nothing from either is requested before this runs, and it only runs after the visitor accepts.
 *  There is no Google Tag Manager here: gtag.js is Google Analytics' own library (it is served from googletagmanager.com, but it is not a GTM container). */
export function loadAnalytics() {
  if (loaded) return;
  loaded = true;

  const w = window as any;

  // A person who had refused and then accepts: the switch that turned Analytics off (see revokeAnalytics) goes back to on.
  w[`ga-disable-${GA_ID}`] = false;
  addScriptOnce(`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`);
  w.dataLayer = w.dataLayer || [];
  w.gtag = function () {
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer.push(arguments);
  };
  w.gtag("js", new Date());
  w.gtag("config", GA_ID);

  w.clarity =
    w.clarity ||
    function () {
      // eslint-disable-next-line prefer-rest-params
      (w.clarity.q = w.clarity.q || []).push(arguments);
    };
  addScriptOnce(`https://www.clarity.ms/tag/${CLARITY_ID}`);
}

/** Where a cookie set by the tools can live: the page's own host and every parent domain ("www.florenciaux.com", "florenciaux.com", with and without
 *  the leading dot). Google Analytics sets its cookies on the parent domain, so deleting them needs that same `domain`; without it the delete does nothing. */
export function cookieDomains(hostname: string): (string | undefined)[] {
  const parts = hostname.split(".");
  const domains: (string | undefined)[] = [undefined];
  if (parts.length < 2 || /^\d+(\.\d+){3}$/.test(hostname)) return domains; // localhost, an IP: only host-only cookies
  for (let i = 0; i <= parts.length - 2; i++) {
    const domain = parts.slice(i).join(".");
    domains.push(domain, `.${domain}`);
  }
  return domains;
}

const isAnalyticsCookie = (name: string) =>
  name.startsWith("_ga") || name === "_gid" || name.startsWith("_clck") || name.startsWith("_clsk") || name === "CLID" || name === "MUID";

/** Best effort: removes the cookies both tools set for this site, on the host and on its parent domains. (`CLID` / `MUID` belong to Microsoft's own domain, which a
 *  site cannot delete from; they are listed in case they ever appear here.) Used when someone refuses or withdraws consent. */
export function clearAnalyticsCookies() {
  const names = document.cookie.split(";").map((c) => c.split("=")[0].trim()).filter(isAnalyticsCookie);
  for (const name of names) {
    for (const domain of cookieDomains(window.location.hostname)) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0; path=/${domain ? `; domain=${domain}` : ""}`;
    }
  }
}

/** Withdrawing consent from a page where the tools are already running: tell both to stop right away (Google's per-property "disable" switch;
 *  Clarity's consent API, which also erases its cookies) and delete what they stored. The page is reloaded afterwards so neither script stays loaded. */
export function revokeAnalytics() {
  const w = window as any;
  w[`ga-disable-${GA_ID}`] = true;
  try {
    w.clarity?.("consent", false);
  } catch {
    /* Clarity may not have finished loading: the reload that follows leaves it unloaded anyway */
  }
  clearAnalyticsCookies();
}
