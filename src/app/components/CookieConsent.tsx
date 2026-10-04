import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "./Button";
import { useSplashDone } from "./SplashLoader";
import { clearAnalyticsCookies, getConsent, loadAnalytics, OPEN_CONSENT_EVENT, setConsent, type Consent } from "../lib/consent";

/** Analytics only after an explicit yes. Accept and reject look the same and take one click each; the footer link reopens it. */
export function CookieConsent() {
  const splashDone = useSplashDone();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (getConsent() === "granted") loadAnalytics();
  }, []);

  useEffect(() => {
    if (splashDone && getConsent() === null) setOpen(true);
  }, [splashDone]);

  useEffect(() => {
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  const choose = (value: Consent) => {
    const previous = getConsent();
    setConsent(value);
    setOpen(false);
    if (value === "granted") {
      loadAnalytics();
    } else if (previous === "granted") {
      // The scripts are already running in this page: clear what they stored and reload without them.
      clearAnalyticsCookies();
      window.location.reload();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="region"
          aria-label="Cookies y analítica"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-4 bottom-4 z-[80] flex flex-col gap-4 rounded-3xl border border-white/15 bg-[#14141c]/95 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.55)] backdrop-blur sm:inset-x-auto sm:bottom-6 sm:right-6 sm:max-w-2xl sm:flex-row sm:items-center sm:gap-6 sm:px-6 sm:py-5"
        >
          <p className="text-sm leading-relaxed text-gray-300">
            <span className="font-semibold text-white">Sobre las cookies. </span>
            Uso Google Analytics y Microsoft Clarity para entender cómo se recorre este sitio y mejorarlo. Solo se activan si aceptás, y podés cambiarlo cuando quieras desde el pie de página.
          </p>
          <div className="flex gap-3 sm:shrink-0">
            <Button variant="secondary" theme="dark" onClick={() => choose("granted")} className="flex-1 !px-5 !py-2.5">
              Aceptar
            </Button>
            <Button variant="secondary" theme="dark" onClick={() => choose("denied")} className="flex-1 !px-5 !py-2.5">
              Rechazar
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
