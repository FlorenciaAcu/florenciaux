import { useId, useState, type KeyboardEvent } from "react";
import { motion } from "motion/react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ClosingCTA } from "./ClosingCTA";
import { DarkBackdrop, Num, Reveal } from "./ReferencesPage";
import { navigate } from "../lib/router";
import { useI18n } from "../i18n/useI18n";
import { useProcesoIA } from "../i18n/editorial";

/** Página pública "Cómo integro la IA en mi proceso" (ruta y SEO en data/seo.ts; contenido en data/procesoIA.ts).
 *  Explica cómo aborda proyectos de clientes, no cómo se hizo el portfolio (eso es "Cómo diseñé mi portfolio"). Seis bloques: hero (con las mismas cuatro etapas del Home), relevamiento
 *  inicial, las cuatro etapas (con selector), qué hace ella y qué la IA, ejemplos documentados y qué recibe el cliente; cierra con el contacto de la Home.
 *  Mismo ADN que el resto del sitio: hoja de cuaderno, sticky notes, escala tipográfica y filas con línea fina. Sin stickers ni logos de herramientas. */

const num = (n: number) => String(n + 1).padStart(2, "0");

/* ───────────── 1. Hero ───────────── */

function Hero() {
  const { ui, lp } = useI18n();
  const { AI_HERO } = useProcesoIA();
  return (
    <section data-header-theme="dark" className="relative overflow-hidden bg-surface-dark pb-14 pt-28 md:pb-[5.5rem] md:pt-32">
      <DarkBackdrop />
      <div className="page-container relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <nav aria-label={ui.case.breadcrumbLabel} className="type-caption mb-8 flex items-center gap-2 text-gray-400">
              <a
                href={lp("/")}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(lp("/"));
                }}
                className="underline-offset-4 hover:text-white hover:underline focus-visible:text-white focus-visible:underline"
              >
                {ui.nav.home}
              </a>
              <span aria-hidden="true">/</span>
              <span className="text-gray-200">{AI_HERO.eyebrow}</span>
            </nav>
            <h1 className="type-display mb-6 text-white">{AI_HERO.title}</h1>
            <div className="space-y-4">
              {AI_HERO.text.map((p) => (
                <p key={p} className="type-s1 text-gray-300">
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* La frase central, como una sticky note sobre el escritorio. */}
          <Reveal>
            <p className="type-h3 mx-auto w-full max-w-sm rotate-[0.8deg] bg-[#fff3a6] p-6 text-gray-900 shadow-[0_2px_4px_rgba(10,10,10,0.12)] lg:p-8">
              {AI_HERO.highlight}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ───────────── 2. Todo empieza por entender el proyecto ───────────── */

/** Un documento de relevamiento que se va completando: hoja rayada con cinco apartados. El renglón es 1.65rem, igual al interlineado de
 *  `type-body`: títulos, textos y espacios entre apartados son múltiplos de un renglón. Es solo una explicación, no un formulario. */
function Start() {
  const { AI_START } = useProcesoIA();
  return (
    <section className="bg-surface-page/90 py-20 lg:py-36">
      <div className="page-container grid gap-10 lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-5">
          <h2 className="type-h1 mb-5 text-gray-900">{AI_START.title}</h2>
          <p className="type-s1 text-gray-600">{AI_START.text}</p>
          <Reveal className="mt-10">
            <p className="type-title-compact -rotate-[1deg] bg-[#fff3a6] p-5 text-gray-900 shadow-[0_2px_4px_rgba(10,10,10,0.12)]">{AI_START.goal}</p>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-7">
          <ol className="bg-notebook border border-gray-200 py-[1.65rem] pl-14 pr-6 lg:pl-16 lg:pr-8">
            {AI_START.items.map((item, i) => (
              <li key={item.title} className="mb-[1.65rem] last:mb-0">
                <h3 className="type-body font-semibold text-gray-900">
                  <span className="mr-3 tabular-nums text-magenta-strong">{num(i)}</span>
                  {item.title}
                </h3>
                <p className="type-body text-gray-700">{item.text}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────── 3. De la idea a la entrega ───────────── */

/** Las cuatro etapas como una secuencia que se recorre: se elige una y se ve qué hago, cómo ayuda la IA y qué resultado produce.
 *  Pestañas accesibles (flechas, Inicio y Fin). La IA no es una etapa más: aparece dentro de cada una. */
function Stages() {
  const { ui } = useI18n();
  const { AI_STAGES } = useProcesoIA();
  const [active, setActive] = useState(0);
  const id = useId();
  const { stages } = AI_STAGES;
  const stage = stages[active];

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = stages.length - 1;
    const next =
      e.key === "ArrowRight" ? (active === last ? 0 : active + 1) : e.key === "ArrowLeft" ? (active === 0 ? last : active - 1) : e.key === "Home" ? 0 : e.key === "End" ? last : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    document.getElementById(`${id}-tab-${next}`)?.focus();
  };

  return (
    <section className="bg-surface-subtle py-20 lg:py-36">
      <div className="page-container">
        <h2 className="type-h1 mb-5 text-gray-900">{AI_STAGES.title}</h2>
        <p className="type-s1 mb-14 text-gray-600 lg:mb-20">{AI_STAGES.text}</p>

        <div role="tablist" aria-label={ui.editorial.stagesTabs} className="grid grid-cols-2 gap-x-6 gap-y-4 lg:grid-cols-4">
          {stages.map((s, i) => (
            <button
              key={s.name}
              id={`${id}-tab-${i}`}
              role="tab"
              type="button"
              aria-selected={active === i}
              aria-controls={`${id}-panel`}
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={onKey}
              className={`flex flex-col gap-2 border-t-2 pt-4 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-magenta-strong ${
                active === i ? "border-magenta-strong" : "border-gray-300 hover:border-gray-900"
              }`}
            >
              <Num n={i} className={active === i ? "" : "opacity-50"} />
              <span className={`type-h3 flex items-center gap-3 ${active === i ? "text-gray-900" : "text-gray-600"}`}>
                {s.name}
              </span>
            </button>
          ))}
        </div>

        <motion.div
          key={active}
          id={`${id}-panel`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${active}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mt-8 lg:mt-12"
        >
          <p className="type-s1 mb-8 text-gray-900">{stage.goal}</p>
          <div className="grid gap-8 lg:grid-cols-3 lg:gap-6">
            <div className="border-t border-gray-300 pt-4">
              <h3 className="type-eyebrow mb-3 text-gray-600">{ui.editorial.whatIDo}</h3>
              <div className="space-y-4">
                {stage.work.map((p) => (
                  <p key={p} className="type-body text-gray-700">
                    {p}
                  </p>
                ))}
              </div>
            </div>
            <div className="border-t border-gray-300 pt-4">
              <h3 className="type-eyebrow mb-3 text-magenta-strong">{ui.editorial.aiInStage}</h3>
              <p className="type-body text-gray-700">{stage.ai}</p>
            </div>
            <div className="border-t border-gray-300 pt-4">
              <h3 className="type-eyebrow mb-3 text-gray-600">{ui.editorial.possibleResult}</h3>
              <p className="type-body text-gray-700">{stage.result}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────── 4. Qué hago yo y en qué me ayuda la IA ───────────── */

/** Dos columnas de seis filas compartidas (subgrid): lo que depende de mi criterio y lo que le delego a la IA. Debajo, las herramientas en una sola
 *  línea (transparencia, sin tabla ni logos). */
function Roles() {
  const { AI_ROLES } = useProcesoIA();
  const { mine, ai } = AI_ROLES;
  return (
    <section className="bg-surface-page/90 py-20 lg:py-36">
      <div className="page-container">
        <h2 className="type-h1 mb-5 text-gray-900">{AI_ROLES.title}</h2>
        <p className="type-s1 mb-14 text-gray-600 lg:mb-20">{AI_ROLES.text}</p>

        <div className="grid gap-10 lg:grid-cols-2 lg:grid-rows-[repeat(7,auto)] lg:gap-x-6 lg:gap-y-0">
          {[
            { col: mine, accent: "border-gray-900" },
            { col: ai, accent: "border-magenta-strong" },
          ].map(({ col, accent }) => (
            <div key={col.title} className="grid lg:row-span-7 lg:grid-rows-subgrid">
              <h3 className={`type-h3 border-t-2 pb-4 pt-4 text-gray-900 ${accent}`}>{col.title}</h3>
              {col.items.map((item) => (
                <p key={item} className="type-body flex items-center border-t border-gray-200 py-3 text-gray-700">
                  {item}
                </p>
              ))}
            </div>
          ))}
        </div>

        <p className="type-caption mt-6 text-gray-600">{AI_ROLES.tools}</p>
      </div>
    </section>
  );
}

/* ───────────── 6. Qué recibe el cliente ───────────── */

function Deliverables() {
  const { AI_DELIVERABLES } = useProcesoIA();
  const { shared } = AI_DELIVERABLES;
  return (
    <section className="bg-surface-subtle py-20 lg:py-36">
      <div className="page-container">
        <h2 className="type-h1 mb-5 text-gray-900">{AI_DELIVERABLES.title}</h2>
        <p className="type-s1 mb-14 text-gray-600 lg:mb-20">{AI_DELIVERABLES.text}</p>
        <ul>
          {AI_DELIVERABLES.items.map((item) => (
            <li key={item.title} className="grid gap-1 border-t border-gray-300 py-4 last:border-b lg:grid-cols-12 lg:gap-6">
              <h3 className="type-title-compact text-gray-900 lg:col-span-4">{item.title}</h3>
              <p className="type-body text-gray-700 lg:col-span-8">{item.text}</p>
            </li>
          ))}
        </ul>
        <Reveal className="mt-10 lg:mt-14">
          <p className="type-body text-gray-700">
            <span className="font-semibold text-gray-900">{shared.title}. </span>
            {shared.text}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function AIProcessPage() {
  const { AI_CTA } = useProcesoIA();
  return (
    <div className="min-h-screen bg-surface-page">
      <Header />
      <main>
        <Hero />
        <Start />
        <Stages />
        <Roles />
        <Deliverables />
        <ClosingCTA title={AI_CTA.title} text={AI_CTA.text} cta={AI_CTA.cta} />
      </main>
      <Footer />
    </div>
  );
}
