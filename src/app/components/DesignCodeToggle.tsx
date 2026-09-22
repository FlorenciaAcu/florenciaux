import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Palette, Code2, Sparkles } from "lucide-react";
import { Sticker } from "./Stickers";

type Mode = "design" | "code";

// One source of truth: "Modo diseño" and "Modo código" render the exact same profile.
const profile = {
  name: "Florencia Acuña",
  role: "Product Designer",
  focus: "Diseño pensando en sistemas completos: cómo un producto puede crecer, escalar y sostener nuevas soluciones en el tiempo.",
  skills: ["Product Design", "Design Systems", "Discovery", "Prototipado", "IA aplicada"],
};

export function DesignCodeToggle() {
  const [mode, setMode] = useState<Mode>("design");

  return (
    <section className="relative py-14 lg:py-20 bg-[#fafafa]/90">
      <div className="relative max-w-2xl mx-auto px-6">
        <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden="true">
          <Sticker name="flag" size={58} rotate={-8} className="absolute -left-12 top-0 lg:-left-28" />
          <Sticker name="mug" size={54} rotate={7} delay={0.1} className="absolute -left-4 top-16 lg:-left-14" />
          <Sticker name="pizza" size={56} rotate={9} delay={0.05} className="absolute -right-12 top-0 lg:-right-28" />
          <Sticker name="fries" size={54} rotate={-6} delay={0.15} className="absolute -right-4 top-16 lg:-right-14" />
        </div>

        {/* Intro line */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
            Diseño conectando{" "}
            <span className="text-gradient-brand">experiencia, negocio y tecnología.</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-gray-600">
            Estudié programación, y esa base me ayuda a entender los productos de forma más integral y a diseñar con una mirada técnica.
          </p>
        </motion.div>

        {/* Toggle switch */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <div className="glass-pill inline-flex items-center gap-1 rounded-full p-1 shadow-sm">
            <button
              onClick={() => setMode("design")}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                mode === "design" ? "bg-[#cc0058] text-white shadow-sm" : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              Modo diseño
            </button>
            <button
              onClick={() => setMode("code")}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                mode === "code" ? "bg-[#0a0a0a] text-white shadow-sm" : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              Modo código
            </button>
          </div>
        </motion.div>

        {/* Content */}
        <div className="relative min-h-[280px]">
          <AnimatePresence mode="wait">
            {mode === "design" ? (
              <motion.div
                key="design"
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="glass-panel rounded-3xl p-8 lg:p-10 text-center"
              >
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#cc0058] uppercase tracking-widest mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  {profile.name}
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight mb-4">
                  {profile.role}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6 max-w-md mx-auto">
                  {profile.focus}
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {profile.skills.map((tag) => (
                    <span key={tag} className="glass-pill text-xs font-medium text-gray-600 rounded-full px-3 py-1.5">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="code"
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#0a0a0a] rounded-3xl p-6 lg:p-8 overflow-x-auto"
              >
                {/* Fake window chrome */}
                <div className="flex items-center gap-1.5 mb-5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                  <span className="ml-3 text-xs text-gray-400 font-mono">florencia.ts</span>
                </div>

                <pre className="font-mono text-[13px] sm:text-sm leading-relaxed whitespace-pre-wrap">
                  <span className="text-gray-400">{"// el mismo perfil, escrito en código"}</span>
                  {"\n"}
                  <span className="text-[#c586c0]">const</span> <span className="text-[#4fc1ff]">florencia</span> = {"{"}
                  {"\n  "}
                  <span className="text-[#9cdcfe]">nombre</span>: <span className="text-[#ce9178]">"{profile.name}"</span>,
                  {"\n  "}
                  <span className="text-[#9cdcfe]">rol</span>: <span className="text-[#ce9178]">"{profile.role}"</span>,
                  {"\n  "}
                  <span className="text-[#9cdcfe]">enfoque</span>: <span className="text-[#ce9178]">"{profile.focus}"</span>,
                  {"\n  "}
                  <span className="text-[#9cdcfe]">skills</span>: [
                  {profile.skills.map((skill, i) => (
                    <span key={skill}>
                      <span className="text-[#ce9178]">"{skill}"</span>
                      {i < profile.skills.length - 1 ? ", " : ""}
                    </span>
                  ))}
                  ],
                  {"\n"}
                  {"};"}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                    className="inline-block w-2 h-4 bg-[#00e5ff] ml-1 align-middle"
                  />
                </pre>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
