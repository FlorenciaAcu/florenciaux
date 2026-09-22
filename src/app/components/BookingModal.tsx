import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { ExternalLink, Loader2, X } from "lucide-react";
import { BOOKING_EMBED_URL, SCHEDULE_URL } from "../data/contact";

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
}

/** Google Calendar booking page inside a dialog, so the visitor never leaves the site. */
export function BookingModal({ open, onClose }: BookingModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!open) return;
    setLoaded(false);
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>("a[href], button");
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      root.style.overflow = prevOverflow;
      previouslyFocused?.focus();
    };
  }, [open]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="booking"
          className="fixed inset-0 z-[90] flex items-end justify-center bg-black/70 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => onCloseRef.current()}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
            onClick={(e) => e.stopPropagation()}
            className="flex h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl border border-white/15 bg-[#14141c] shadow-[0_24px_70px_rgba(0,0,0,0.6)] sm:h-[min(86vh,720px)] sm:rounded-3xl"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
              <h2 id="booking-title" className="text-base font-semibold text-white">
                Agendar videollamada
              </h2>
              <div className="flex items-center gap-3">
                <a
                  href={SCHEDULE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-gray-300 underline-offset-4 hover:text-white hover:underline"
                >
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  Abrir en otra pestaña
                </a>
                <button
                  ref={closeRef}
                  onClick={() => onCloseRef.current()}
                  aria-label="Cerrar agenda"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-gray-200 transition-colors hover:border-[#ff006e] hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="relative flex-1 bg-white">
              {!loaded && (
                <div
                  role="status"
                  className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#14141c] px-6 text-center text-sm text-gray-300"
                >
                  <Loader2 className="h-6 w-6 animate-spin text-[#ff006e] motion-reduce:animate-none" aria-hidden="true" />
                  <p>Cargando la agenda…</p>
                  <a
                    href={SCHEDULE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-gray-400 underline underline-offset-4 hover:text-white"
                  >
                    ¿Tarda mucho? Abrila en otra pestaña
                  </a>
                </div>
              )}
              <iframe
                src={BOOKING_EMBED_URL}
                title="Agenda de la videollamada inicial con Florencia Acuña"
                onLoad={() => setLoaded(true)}
                className="absolute inset-0 h-full w-full border-0 bg-white"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
