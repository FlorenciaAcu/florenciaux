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

/** Google Analytics and Microsoft Clarity. Nothing from either is requested before this runs, and it only runs after the visitor accepts. */
export function loadAnalytics() {
  if (loaded) return;
  loaded = true;

  const w = window as any;

  const ga = document.createElement("script");
  ga.async = true;
  ga.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(ga);
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
  const clarity = document.createElement("script");
  clarity.async = true;
  clarity.src = `https://www.clarity.ms/tag/${CLARITY_ID}`;
  document.head.appendChild(clarity);
}

/** Best effort: removes the cookies both tools set on this domain. Used when someone who had accepted changes their mind. */
export function clearAnalyticsCookies() {
  const names = document.cookie.split(";").map((c) => c.split("=")[0].trim());
  names
    .filter((name) => name.startsWith("_ga") || name === "_gid" || name.startsWith("_clck") || name.startsWith("_clsk") || name === "CLID" || name === "MUID")
    .forEach((name) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    });
}
