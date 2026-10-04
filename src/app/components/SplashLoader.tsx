import { useEffect, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";

const SEEN_KEY = "fa-splash-seen";
const WORDS = ["FLOR", "ACUÑA"];
const LETTER_COUNT = WORDS.join("").length;
// #ff006e -> #00e5ff, one solid stop per letter across both words
const LETTER_COLORS = Array.from({ length: LETTER_COUNT }, (_, i) => {
  const t = i / (LETTER_COUNT - 1);
  const channel = (from: number, to: number) => Math.round(from + (to - from) * t);
  return `rgb(${channel(255, 0)}, ${channel(0, 229)}, ${channel(110, 255)})`;
});

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
    // ?splash=hold keeps the intro on screen until a click or a key, to look at it in detail
    const hold = window.location.search.includes("splash=hold");
    const timer = hold ? undefined : window.setTimeout(finish, 1500);
    if (hold) {
      window.addEventListener("click", finish, { once: true });
      window.addEventListener("keydown", finish, { once: true });
    }
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("click", finish);
      window.removeEventListener("keydown", finish);
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
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="animate-blob-1 absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-[#ff006e] opacity-[0.2] blur-[110px]" />
            <div className="animate-blob-2 absolute -bottom-32 -right-24 h-[30rem] w-[30rem] rounded-full bg-[#00e5ff] opacity-[0.16] blur-[120px]" />
          </div>

          {/* One line at every width: the size follows the screen (about 13% of its width) between a floor and a cap */}
          <div
            className="relative flex justify-center gap-[0.32em] whitespace-nowrap font-bold uppercase leading-none tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2.5rem, 13vw, 11rem)" }}
            aria-hidden="true"
          >
            {WORDS.map((word, w) => {
              const offset = WORDS.slice(0, w).join("").length;
              return (
                <span key={word} className="flex">
                  {word.split("").map((letter, i) => (
                    <span key={i} className="-mt-[0.22em] overflow-hidden pb-[0.06em] pt-[0.22em]">
                      <motion.span
                        className="inline-block"
                        style={{ color: LETTER_COLORS[offset + i] }}
                        initial={{ y: "110%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 + (offset + i) * 0.055, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {letter}
                      </motion.span>
                    </span>
                  ))}
                </span>
              );
            })}
          </div>

          <motion.p
            className="relative mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-gray-400 sm:text-xs"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
          >
            Product Designer
          </motion.p>

          <motion.div
            className="absolute bottom-0 left-0 h-[3px] w-full origin-left bg-gradient-to-r from-[#ff006e] to-[#00e5ff]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.3, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
