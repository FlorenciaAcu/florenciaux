import { useRef } from "react";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { Button } from "./Button";
import { Sticker } from "./Stickers";
import { useSplashDone } from "./SplashLoader";
import { CV_URL } from "../data/contact";
import heroPhoto from "../../imports/hero-flor.jpg";

/* Decorative collaborator cursor: the headline reads as a text layer someone just selected in a design tool. */
function CollaboratorCursor() {
  return (
    <div aria-hidden="true" className="pointer-events-none hidden md:flex items-start gap-0">
      <svg width="18" height="20" viewBox="0 0 18 20" className="-mr-1 mt-0.5 shrink-0">
        <path d="M2 1.5 L2 16 L6 12.2 L9 18.5 L11.6 17.3 L8.7 11 L14.2 11 Z" fill="#00e5ff" stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
      <span
        className="mt-4 rounded-full rounded-tl-sm bg-[#00e5ff] px-3 py-1 text-[13px] font-semibold leading-normal tracking-wide text-[#0a0a0a]"
        style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
      >
        Florencia
      </span>
    </div>
  );
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const ready = useSplashDone();

  const handleVerProyectos = () => {
    const el = document.getElementById("proyectos");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollDown = () => {
    const next = sectionRef.current?.nextElementSibling as HTMLElement | undefined;
    if (!next) return;
    const targetY = next.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="inicio"
      data-header-theme="dark"
      className="relative min-h-screen flex flex-col justify-center pt-20 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Dot-grid texture + vivid neon blobs — the same dark language as the CTA/detail sections */}
      <div className="bg-dot-grid-dark absolute inset-0" style={{ maskImage: "radial-gradient(ellipse 70% 60% at 30% 40%, black 30%, transparent 80%)" }} />
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="animate-blob-1 absolute -top-40 -left-32 h-[32rem] w-[32rem] rounded-full bg-[#ff006e] opacity-[0.22] blur-[110px]" />
        <div className="animate-blob-2 absolute top-1/4 -right-40 h-[36rem] w-[36rem] rounded-full bg-[#00e5ff] opacity-[0.16] blur-[120px]" />
        <div className="animate-blob-3 absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-[#ff006e] opacity-[0.14] blur-[110px]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-8 pb-24 lg:py-12">
        <div className="grid items-center gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-10">
          {/* Copy */}
          <div className="flex flex-col gap-5 sm:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-300 bg-white/5 border border-white/10 rounded-full px-4 py-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-[#ff006e] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff006e]" />
                </span>
                Florencia Acuña — Product Designer
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.15 }}
              className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.25] md:leading-[1.1] tracking-tight md:mb-8"
            >
              Transformo ideas en{" "}
              <span className="relative mt-3 inline-block whitespace-nowrap">
                <span className="text-gradient-brand-dark">sistemas que escalan.</span>

                {/* selection frame */}
                <motion.span
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-x-3 -inset-y-1 rounded-sm border border-[#00e5ff]"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={ready ? { opacity: 0.9, scale: 1 } : {}}
                  transition={{ delay: 1.1, duration: 0.4 }}
                >
                  {["-left-1 -top-1", "-right-1 -top-1", "-left-1 -bottom-1", "-right-1 -bottom-1"].map((pos) => (
                    <span key={pos} className={`absolute ${pos} h-2 w-2 border border-[#00e5ff] bg-white`} />
                  ))}
                </motion.span>

                <motion.span
                  aria-hidden="true"
                  className="absolute right-0 top-full -mr-3 mt-1 hidden md:block"
                  initial={{ opacity: 0, x: -30, y: -20 }}
                  animate={ready ? { opacity: 1, x: 0, y: 0 } : {}}
                  transition={{ delay: 1.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <CollaboratorCursor />
                </motion.span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.35 }}
              className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-xl"
            >
              Investigo, defino y diseño con criterio de producto, y complemento mi trabajo con IA.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Button onClick={handleVerProyectos}>Ver proyectos</Button>
              <Button variant="secondary" theme="dark" href={CV_URL} target="_blank" rel="noopener noreferrer">
                Ver CV
              </Button>
            </motion.div>
          </div>

          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: 5 }}
            animate={ready ? { opacity: 1, y: 0, rotate: 2 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-full max-w-[300px] sm:max-w-[340px] lg:ml-auto lg:mr-0 lg:max-w-[420px]"
          >
            <div className="pointer-events-none absolute -inset-8 -z-10 rounded-full bg-[#ff006e]/25 blur-3xl" aria-hidden="true" />
            <div className="rounded-[2rem] bg-gradient-to-br from-[#ff006e] via-[#ff006e]/25 to-[#00e5ff] p-[2px]">
              <div className="relative h-[210px] overflow-hidden rounded-[calc(2rem-2px)] bg-[#111] sm:h-[260px] lg:h-[min(54vh,500px)]">
                <img
                  src={heroPhoto}
                  alt="Florencia Acuña trabajando en su notebook al aire libre"
                  className="h-full w-full object-cover object-[50%_28%]"
                  decoding="async"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
                <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/55 px-3 py-1.5 text-xs font-medium text-white">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-[#00e5ff] opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00e5ff]" />
                  </span>
                  Disponible para nuevos proyectos
                </span>
              </div>
            </div>

            <Sticker name="cat" size={72} rotate={9} active={ready} delay={1.0} className="absolute -top-7 -right-3 sm:-right-6" />
            <Sticker name="laptop" size={84} rotate={-8} active={ready} delay={1.2} className="absolute -bottom-7 -right-3 sm:-right-8" />
          </motion.div>
        </div>
      </div>

      {/* Scroll cue — invites the visitor to keep exploring */}
      <motion.button
        onClick={handleScrollDown}
        aria-label="Ver más"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-gray-300 hover:text-[#ff006e] transition-colors"
      >
        <span className="text-xs font-medium tracking-wide">Descubrí más</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.button>
    </section>
  );
}
