import { useEffect, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";

const SEEN_KEY = "fa-splash-seen";
const LETTERS = ["A", "C", "U", "Ñ", "A"];
// #ff006e -> #00e5ff, one solid stop per letter
const LETTER_COLORS = ["#ff006e", "#bf3992", "#8073b7", "#40acdb", "#00e5ff"];

function shouldSkip() {
  if (typeof window === "undefined") return true;
  try {
    // ?splash in the URL forces the intro (handy to preview it)
    if (window.location.search.includes("splash")) return false;
    return (
      sessionStorage.getItem(SEEN_KEY) === "1" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  } catch {
    return false;
  }
}

let done = shouldSkip();
const listeners = new Set<() => void>();

function finish() {
  done = true;
  try {
    sessionStorage.setItem(SEEN_KEY, "1");
  } catch {
    /* sessionStorage can be unavailable (private mode) */
  }
  listeners.forEach((l) => l());
}

/** true once the intro splash is gone (immediately when it is skipped) — lets the hero start its entrance animation on cue. */
export function useSplashDone() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => done,
    () => true
  );
}

export function SplashLoader() {
  const finished = useSplashDone();

  useEffect(() => {
    if (finished) return;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    const timer = window.setTimeout(finish, 2000);
    return () => {
      window.clearTimeout(timer);
      root.style.overflow = prevOverflow;
    };
  }, [finished]);

  return (
    <AnimatePresence>
      {!finished && (
        <motion.div
          key="splash"
          role="status"
          aria-label="Cargando el portfolio de Florencia Acuña"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a]"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="animate-blob-1 absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-[#ff006e] opacity-[0.2] blur-[110px]" />
            <div className="animate-blob-2 absolute -bottom-32 -right-24 h-[30rem] w-[30rem] rounded-full bg-[#00e5ff] opacity-[0.16] blur-[120px]" />
          </div>

          <div
            className="relative flex font-bold uppercase leading-none tracking-tight text-[22vw] sm:text-[17vw] lg:text-[14rem]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            aria-hidden="true"
          >
            {LETTERS.map((letter, i) => (
              <span key={i} className="-mt-[0.22em] overflow-hidden pb-[0.06em] pt-[0.22em]">
                <motion.span
                  className="inline-block"
                  style={{ color: LETTER_COLORS[i] }}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.15 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                >
                  {letter}
                </motion.span>
              </span>
            ))}
          </div>

          <motion.p
            className="relative mt-2 text-xs font-semibold uppercase tracking-[0.35em] text-gray-400 sm:text-sm"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.85 }}
          >
            Florencia · Product Designer
          </motion.p>

          <motion.div
            className="absolute bottom-0 left-0 h-[3px] w-full origin-left bg-gradient-to-r from-[#ff006e] to-[#00e5ff]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.7, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
