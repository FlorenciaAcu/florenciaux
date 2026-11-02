import { useId, useState, type KeyboardEvent } from "react";
import { Component, FileCode, FileText, LayoutTemplate, MessageCircle, MousePointerClick } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ClosingCTA } from "./ClosingCTA";
import { StickyNote } from "./StickyNote";
import { DarkBackdrop, Num, Reveal } from "./ReferencesPage";
import { navigate } from "../lib/router";
import { useI18n } from "../i18n/useI18n";
import { useProcesoIA } from "../i18n/editorial";

/** Página pública "Cómo integro la IA en mi proceso" (ruta y SEO en data/seo.ts; contenido en data/procesoIA.ts).
 *  Explica cómo aborda proyectos de clientes, no cómo se hizo el portfolio (eso es "Cómo diseñé mi portfolio"). Cinco bloques, cada uno con su propia
 *  forma según lo que explica: hero con la frase central, matriz de relevamiento, proceso en pestañas de cuaderno unidas a su panel, ecosistema de herramientas en dos
 *  columnas y entregables compactos; cierra con el contacto de la Home.
 *  Mismo ADN que el resto del sitio: hoja de cuaderno, sticky notes, pestañas, escala tipográfica del sistema. Sin logos de herramientas. */

/** Título de sección de esta página: un escalón menos que `type-h1` para que ningún título ocupe la pantalla. */
const SECTION_TITLE = "type-h2 text-gray-900";

/** Título de sección sin bajada: el componente de abajo ya explica lo que hace. */
function SectionHeader({ title }: { title: string }) {
  return <h2 className={`${SECTION_TITLE} mb-8 lg:mb-12`}>{title}</h2>;
}

/* ───────────── 1. Hero ───────────── */

function Hero() {
  const { ui, lp } = useI18n();
  const { AI_HERO } = useProcesoIA();
  return (
    <section data-header-theme="dark" className="relative overflow-hidden bg-surface-dark pb-14 pt-28 md:pb-[5.5rem] md:pt-32">
      <DarkBackdrop />
      <div className="page-container relative">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto] lg:gap-16">
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
            <h1 className="type-h1 mb-6 max-w-3xl !text-[2.5rem] !leading-[1.08] text-white md:!text-[4rem] md:!leading-[1.05]">{AI_HERO.title}</h1>
            <div className="space-y-4">
              {AI_HERO.text.map((p) => (
                <p key={p} className="type-s1 text-gray-300">
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* La idea central de la página, como una sticky note sobre el escritorio (el mismo componente que el resto del sitio). */}
          <Reveal>
            <StickyNote className="w-full max-w-[17rem]">{AI_HERO.highlight}</StickyNote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ───────────── 2. Todo empieza por entender el proyecto ───────────── */

/** Matriz de relevamiento: las cinco dimensiones en una sola hoja dividida por líneas finas. Las dos primeras (el negocio y las personas) son las más anchas;
 *  las otras tres, el producto, el contexto técnico y el alcance, completan la segunda fila. Responde a "qué necesito entender antes de diseñar". */
function Start() {
  const { AI_START } = useProcesoIA();
  return (
    <section className="bg-surface-subtle py-16 lg:py-28">
      <div className="page-container grid gap-10 lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-4">
          <h2 className={`${SECTION_TITLE} mb-5`}>{AI_START.title}</h2>
          <p className="type-s1 text-gray-600">{AI_START.text}</p>
          <Reveal className="mt-8 lg:mt-10">
            <StickyNote>{AI_START.goal}</StickyNote>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-8">
          <ol className="grid grid-cols-1 gap-px border border-gray-300 bg-gray-300 sm:grid-cols-6">
            {AI_START.items.map((item, i) => (
              <li key={item.title} className={`bg-white p-6 lg:p-8 ${i < 2 ? "sm:col-span-3" : "sm:col-span-2"}`}>
                <Num n={i} className="mb-5 block !text-3xl lg:!text-4xl" />
                <h3 className="type-h3 mb-2 text-gray-900">{item.title}</h3>
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

/** Las cuatro etapas como pestañas de cuaderno pegadas a su panel: la pestaña activa se funde con la hoja y las demás quedan atrás, así se ve a qué
 *  panel pertenece cada una. Los cuatro paneles ocupan la misma celda de la grilla (solo se ve el activo), por eso la altura no salta al cambiar de etapa.
 *  Accesible: roles de pestañas, flechas, Inicio y Fin; sin hover obligatorio; la transición se desactiva con movimiento reducido. La IA no es una etapa más:
 *  aparece dentro de cada una, como apoyo. El proceso es iterativo, así que las pestañas no marcan un avance obligatorio. */
function Stages() {
  const { ui } = useI18n();
  const { AI_STAGES } = useProcesoIA();
  const [active, setActive] = useState(0);
  const id = useId();
  const { stages } = AI_STAGES;

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
    <section className="bg-surface-page/90 py-16 lg:py-28">
      <div className="page-container">
        <SectionHeader title={AI_STAGES.title} />

        <div role="tablist" aria-label={ui.editorial.stagesTabs} className="relative z-10 grid grid-cols-4 gap-1 sm:gap-2 lg:w-3/4">
          {stages.map((s, i) => {
            const on = active === i;
            return (
              <button
                key={s.name}
                id={`${id}-tab-${i}`}
                role="tab"
                type="button"
                aria-selected={on}
                aria-controls={`${id}-panel-${i}`}
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={onKey}
                className={`flex min-h-14 flex-col items-start gap-1 border px-2 pb-3 pt-3 text-left transition-colors motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta-strong sm:px-5 ${
                  on
                    ? "-mb-px border-gray-300 border-b-white border-t-2 border-t-magenta-strong bg-white text-gray-900"
                    : "border-transparent bg-surface-subtle text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                }`}
              >
                <span className={`type-caption tabular-nums ${on ? "text-magenta-strong" : ""}`}>{String(i + 1).padStart(2, "0")}</span>
                <span className="type-title-compact !text-[0.875rem] !leading-tight sm:!text-[1.125rem]">{s.name}</span>
              </button>
            );
          })}
        </div>

        <div className="grid border border-gray-300 bg-white">
          {stages.map((stage, i) => {
            const on = active === i;
            return (
              <div
                key={stage.name}
                id={`${id}-panel-${i}`}
                role="tabpanel"
                aria-labelledby={`${id}-tab-${i}`}
                className={`grid gap-8 p-6 transition-opacity duration-300 [grid-area:1/1] motion-reduce:transition-none lg:grid-cols-12 lg:gap-x-12 lg:p-10 ${on ? "opacity-100" : "invisible opacity-0"}`}
              >
                <div className="lg:col-span-7">
                  <h3 className="type-h3 mb-5 text-gray-900">{stage.goal}</h3>
                  <div className="space-y-4">
                    {stage.work.map((p) => (
                      <p key={p} className="type-s1 text-gray-800">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="grid content-start gap-8 lg:col-span-5">
                  <div className="border-t-2 border-magenta-strong pt-4">
                    <p className="type-eyebrow mb-2 text-magenta-strong">{ui.editorial.aiInStage}</p>
                    <p className="type-body text-gray-700">{stage.ai}</p>
                  </div>
                  <div className="border-t border-gray-300 pt-4">
                    <p className="type-eyebrow mb-2 text-gray-600">{ui.editorial.possibleResult}</p>
                    <p className="type-body text-gray-700">{stage.result}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────────── 4. Mi ecosistema de herramientas ───────────── */

/** Cuatro grupos de herramientas en dos columnas, cada uno con su categoría y los nombres; solo una línea fina arriba de cada grupo. La frase bajo el título aclara que no es un
 *  conjunto cerrado (no se usan todas en todos los proyectos ni son las únicas), así que el diseño no necesita más explicación. Sin descripciones, íconos ni conexiones. */
function Tools() {
  const { AI_TOOLS } = useProcesoIA();
  return (
    <section className="bg-surface-subtle py-16 lg:py-24">
      <div className="page-container">
        <h2 className={`${SECTION_TITLE} mb-4`}>{AI_TOOLS.title}</h2>
        <p className="type-s1 mb-10 text-gray-600 lg:mb-12">{AI_TOOLS.text}</p>

        <ul className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
          {AI_TOOLS.groups.map((group) => (
            <li key={group.title} className="border-t border-gray-300 pt-5">
              <Reveal>
                <h3 className="type-eyebrow mb-3 text-magenta-strong">{group.title}</h3>
                <ul className="flex flex-wrap gap-x-8 gap-y-1">
                  {group.tools.map((tool) => (
                    <li key={tool} className="type-h3 text-gray-900">
                      {tool}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ───────────── 5. Qué recibe el cliente ───────────── */

/** Los entregables posibles y la comunicación durante el proyecto, uno junto al otro. Un ícono discreto por tarjeta (en el orden de los datos). */
const DELIVERABLE_ICONS = [LayoutTemplate, MousePointerClick, Component, FileText, FileCode, MessageCircle];

function Deliverables() {
  const { AI_DELIVERABLES } = useProcesoIA();
  return (
    <section className="bg-surface-page/90 py-16 lg:py-24">
      <div className="page-container grid gap-10 lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-4">
          <h2 className={`${SECTION_TITLE} mb-5`}>{AI_DELIVERABLES.title}</h2>
          <p className="type-s1 text-gray-600">{AI_DELIVERABLES.text}</p>
        </div>

        <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:col-span-8">
          {AI_DELIVERABLES.items.map((item, i) => {
            const Icon = DELIVERABLE_ICONS[i];
            return (
              <li key={item.title}>
                <Reveal>
                  <h3 className="type-title-compact mb-1 flex items-center gap-3 text-gray-900">
                    {Icon && <Icon aria-hidden="true" className="h-5 w-5 shrink-0 text-magenta-strong" strokeWidth={1.5} />}
                    {item.title}
                  </h3>
                  <p className="type-body text-gray-700">{item.text}</p>
                </Reveal>
              </li>
            );
          })}
        </ul>
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
        <Tools />
        <Deliverables />
        <ClosingCTA title={AI_CTA.title} text={AI_CTA.text} cta={AI_CTA.cta} />
      </main>
      <Footer />
    </div>
  );
}
