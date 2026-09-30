import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { CaseStudy, CaseStudyFeature, CaseStudyScreenGroup } from "../data/experiences";

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
} as const;

/** Splits a paragraph into its sentences so a long block reads as short lines (the words are not changed). */
export function splitSentences(text: string): string[] {
  return text.split(/(?<=\.)\s+(?=[A-ZÁÉÍÓÚÑ¿])/).filter(Boolean);
}

const h2 = "type-h2 text-gray-900";

/** Quick facts as a hairline key-value list (role, industry, duration…): only what is confirmed. */
function MetaList({ meta }: { meta: { label: string; value: string }[] }) {
  return (
    <motion.dl {...reveal} transition={{ duration: 0.5, delay: 0.1 }} className="type-caption self-end border-t border-gray-200">
      {meta.map((row) => (
        <div key={row.label} className="flex items-baseline justify-between gap-6 border-b border-gray-200 py-3">
          <dt className="text-gray-600">{row.label}</dt>
          <dd className="text-right font-medium text-gray-900">{row.value}</dd>
        </div>
      ))}
    </motion.dl>
  );
}

/** "Cómo trabajé" is always narrative: each item (and each blank-line break inside one) is a paragraph. Never a bulleted list. */
function WorkParagraphs({ items }: { items: string[] }) {
  return <div className="max-w-3xl space-y-4">{items.map((item) => paragraphs(item, "type-body text-gray-800"))}</div>;
}

function paragraphs(text: string, className = "type-body text-gray-700") {
  return text.split("\n\n").map((p) => (
    <p key={p} className={className}>
      {p}
    </p>
  ));
}

/** "El desafío": an h2 and its paragraphs (plus the terms needed to follow the case, when there are any). */
function ChallengeSection({ title, text, terms }: { title: string; text: string; terms?: { term: string; definition: string }[] }) {
  return (
    <motion.div {...reveal} id="desafio" className="scroll-mt-28">
      <h2 className={`${h2} mb-6`}>{title}</h2>
      <div className="max-w-3xl space-y-4">{paragraphs(text)}</div>
      {terms && (
        <dl className="type-caption mt-6 max-w-3xl space-y-2 text-gray-700">
          {terms.map((item) => (
            <div key={item.term}>
              <dt className="inline font-semibold text-gray-900">{item.term}: </dt>
              <dd className="inline">{item.definition}</dd>
            </div>
          ))}
        </dl>
      )}
    </motion.div>
  );
}

/** Same opening block for every experience and case: what it is (with the quick facts next to it), "El desafío" and "Cómo trabajé".
 *  Told from the designer's perspective — no internal detail. */
export function ExperienceIntro({
  data,
  period,
  intro,
  meta,
  about,
  challenge,
}: {
  data?: CaseStudy;
  period: string;
  intro: string[];
  /** "Qué es" for experiences without a written case. */
  about?: { title: string; text: string };
  /** Quick facts for experiences without a written case (cases carry their own in `data.meta`). */
  meta?: { label: string; value: string }[];
  /** "El desafío" for experiences without a written case. */
  challenge?: string;
}) {
  // Experiences without a written case: the same opening as the cases ("Qué es" + quick facts) and the same "Mi trabajo".
  if (!data) {
    return (
      <div className="space-y-16 lg:space-y-24">
        {(about || meta) && (
          <div className={`grid gap-10 lg:gap-14 ${about && meta ? "lg:grid-cols-2" : "max-w-3xl"}`}>
            {about && (
              <motion.div {...reveal} id="que-es" className="scroll-mt-28">
                <h2 className={`${h2} mb-4`}>{about.title}</h2>
                <p className="type-body text-gray-700">{about.text}</p>
              </motion.div>
            )}
            {meta && <MetaList meta={meta} />}
          </div>
        )}
        {challenge && <ChallengeSection title="El desafío" text={challenge} />}
        <motion.div {...reveal} id="como-trabaje" className="scroll-mt-28">
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h2 className={h2}>Cómo trabajé</h2>
            {!meta && <span className="text-sm text-gray-600">{period}</span>}
          </div>
          <div className="type-body max-w-3xl space-y-4 text-gray-800">
            {intro.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  // Reading order: what it is (+ quick facts) -> the challenge -> how I worked. The decisions and the evidence come next.
  return (
    <div className="space-y-16 lg:space-y-24">
      <div className={`grid gap-10 lg:gap-14 ${data.meta ? "lg:grid-cols-2" : "max-w-3xl"}`}>
        <motion.div {...reveal} id="que-es" className="scroll-mt-28">
          <h2 className={`${h2} mb-4`}>{data.aboutTitle}</h2>
          <div className="space-y-3">{paragraphs(data.about)}</div>
        </motion.div>
        {data.meta && <MetaList meta={data.meta} />}
      </div>

      {data.challenge && <ChallengeSection title={data.challengeTitle ?? "El desafío"} text={data.challenge} terms={data.terms} />}

      {data.role.length > 0 && (
        <motion.div {...reveal} id="como-trabaje" className="scroll-mt-28">
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h2 className={h2}>Cómo trabajé</h2>
            {!data.meta && <span className="text-sm text-gray-600">{period}</span>}
          </div>
          <WorkParagraphs items={data.role} />
        </motion.div>
      )}
    </div>
  );
}

type OutlineItem = { id: string; label: string; sub?: boolean };

/** The sections of a page, in the order they appear, for the sticky "on this page" index. */
export function buildOutline(data: CaseStudy | undefined, opts: { projects?: boolean; about?: string; challenge?: boolean; learned?: boolean } = {}) {
  const items: OutlineItem[] = [];
  if (data) {
    items.push({ id: "que-es", label: data.aboutTitle });
    if (data.challenge) items.push({ id: "desafio", label: data.challengeTitle ?? "El desafío" });
    if (data.role.length > 0) items.push({ id: "como-trabaje", label: "Cómo trabajé" });
    if (opts.projects) items.push({ id: "proyectos", label: "Proyectos" });
    if (data.screenGroups && data.screensTitle) items.push({ id: "pantallas", label: data.screensTitle });
    if (data.features) {
      items.push({ id: "proyectos", label: "Proyectos" });
      data.features.forEach((feature, i) => items.push({ id: `feature-${i + 1}`, label: feature.title, sub: true }));
    }
    if (data.decisions) items.push({ id: "decisiones", label: "Decisiones de diseño" });
    if (data.prototypes) items.push({ id: "prototipos", label: data.prototypesTitle ?? "Prototipos" });
    if (data.evidence) items.push({ id: "evidencia", label: data.evidenceTitle ?? "Evidencia" });
    if (data.result) items.push({ id: "resultado", label: data.result.title });
    if (data.nextStage) items.push({ id: "siguiente-etapa", label: data.nextStage.navLabel ?? data.nextStage.title });
    if (data.learned) items.push({ id: "aprendi", label: "Qué aprendí" });
  } else {
    if (opts.about) items.push({ id: "que-es", label: opts.about });
    if (opts.challenge) items.push({ id: "desafio", label: "El desafío" });
    items.push({ id: "como-trabaje", label: "Cómo trabajé" });
    if (opts.projects) items.push({ id: "proyectos", label: "Proyectos" });
    if (opts.learned) items.push({ id: "aprendi", label: "Qué aprendí" });
  }
  return items;
}

/** Sticky "on this page" index for long cases (like the outline in Google Docs): where I am, and a way to jump.
 *  Desktop only; the sections themselves carry the ids. */
export function CaseOutline({ items }: { items: OutlineItem[] }) {
  const [active, setActive] = useState(items[0].id);
  const key = items.map((item) => item.id).join();

  useEffect(() => {
    const update = () => {
      let current = items[0].id;
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= 170) current = item.id;
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const go = (id: string) => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <nav aria-label="En esta página">
      <p className="type-eyebrow mb-3 text-gray-600">En esta página</p>
      <ul className="border-l border-gray-200">
        {items.map((item) => {
          const isActive = item.id === active;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => go(item.id)}
                aria-current={isActive ? "location" : undefined}
                className={`-ml-px flex w-full gap-2.5 border-l-2 py-1.5 ${item.sub ? "pl-7" : "pl-4"} text-left text-sm leading-snug transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta-strong ${
                  isActive ? "border-magenta-strong font-medium text-gray-900" : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Groups of screens as plain images (no cards): each one opens full size. Few and representative. Shared by the case's "screens" block and by each feature's evidence. */
function ScreenGroups({ groups }: { groups: CaseStudyScreenGroup[] }) {
  return (
    <div className="space-y-16">
      {groups.map((group) => (
        <div key={group.title ?? group.images[0].caption}>
          {group.title && (
            <motion.h3 {...reveal} className={`${group.intro ? "mb-2" : "mb-5"} type-eyebrow text-magenta-strong`}>
              {group.title}
            </motion.h3>
          )}
          {group.intro && (
            <motion.p {...reveal} className="type-s2 mb-6 max-w-3xl text-gray-700">
              {group.intro}
            </motion.p>
          )}
          <div className={`grid gap-10 ${group.grid ?? `md:grid-cols-2 ${group.images.length > 2 ? "lg:grid-cols-3" : ""}`}`}>
            {group.images.map((item, i) => (
              <motion.figure key={item.caption} {...reveal} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <a href={item.src} target="_blank" rel="noopener noreferrer" className="block">
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    className={`${group.aspect} w-full rounded-xl object-contain object-top ring-1 ring-gray-200`}
                  />
                  <span className="sr-only">Ver pantalla completa (se abre en otra pestaña)</span>
                </a>
                <figcaption className="type-caption mt-4 text-gray-600">{item.caption}</figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Features told in depth: what the product needed -> what I designed -> how it evolved -> evidence -> what I learned. Open layout, no cards. */
function CaseStudyFeatures({ features }: { features: CaseStudyFeature[] }) {
  return (
    <div id="proyectos" className="scroll-mt-28">
      <motion.h2 {...reveal} className={`${h2} mb-12 lg:mb-16`}>
        Proyectos
      </motion.h2>
    <div className="space-y-20 lg:space-y-32">
      {features.map((feature, index) => (
        <section key={feature.title} id={`feature-${index + 1}`} className={`scroll-mt-28 ${index > 0 ? "border-t border-gray-200 pt-20 lg:pt-32" : ""}`}>
          <motion.h3 {...reveal} className="type-h2 text-gray-900">
            {feature.title}
          </motion.h3>
          <motion.p {...reveal} className="type-s1 mt-6 max-w-3xl text-gray-700">
            {feature.context}
          </motion.p>
          {feature.exploration && (
            <motion.div {...reveal} className="mt-6 max-w-3xl space-y-4">
              {paragraphs(feature.exploration, "type-s1 text-gray-700")}
            </motion.div>
          )}

          <motion.div {...reveal} className="mt-12 max-w-3xl">
            <h4 className="type-eyebrow text-magenta-strong">Lo que diseñé</h4>
            <ul className="mt-5 space-y-3">
              {feature.did.map((item) => (
                <li key={item} className="type-body flex gap-3 text-gray-800">
                  <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-magenta-strong" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {feature.options && (
            <div className="mt-16">
              <motion.h4 {...reveal} className="type-eyebrow text-magenta-strong">
                {feature.options.title}
              </motion.h4>
              {feature.options.intro && (
                <motion.p {...reveal} className="type-s2 mt-3 max-w-3xl text-gray-700">
                  {feature.options.intro}
                </motion.p>
              )}
              <ul className={`mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 ${feature.options.items.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
                {feature.options.items.map((item, i) => (
                  <motion.li key={item.title} {...reveal} transition={{ duration: 0.5, delay: i * 0.06 }}>
                    <h5 className="type-h3 text-gray-900">{item.title}</h5>
                    <p className="type-caption mt-2 text-gray-600">{item.text}</p>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          {feature.evolution && (
            <div className="mt-16">
              <motion.h4 {...reveal} className="type-eyebrow text-magenta-strong">
                {feature.evolutionTitle ?? "Cómo evolucionó"}
              </motion.h4>
              <ol className={`mt-8 grid gap-x-10 gap-y-8 ${feature.evolution.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
                {feature.evolution.map((step, i) => (
                  <motion.li key={step.title} {...reveal} transition={{ duration: 0.5, delay: i * 0.08 }}>
                    <span className="text-sm font-medium tabular-nums text-magenta-strong">{String(i + 1).padStart(2, "0")}</span>
                    <h5 className="type-h3 mt-2 text-gray-900">{step.title}</h5>
                    <p className="type-caption mt-2 text-gray-600">{step.text}</p>
                  </motion.li>
                ))}
              </ol>
            </div>
          )}

          {feature.evidence && feature.evidence.length > 0 && (
            <div className="mt-16">
              <ScreenGroups groups={feature.evidence} />
            </div>
          )}

          {feature.learned && (
            <motion.div {...reveal} className="mt-16 max-w-3xl">
              <h4 className="type-eyebrow text-magenta-strong">Qué aprendí</h4>
              <p className="type-s1 mt-3 text-gray-700">{feature.learned}</p>
            </motion.div>
          )}
        </section>
      ))}
    </div>
    </div>
  );
}

/** Cover image, features, my design decisions, screens, prototypes, result. Open layout: images and decisions without cards. */
export function CaseStudyDetails({ data }: { data: CaseStudy }) {
  return (
    <div className="space-y-20 lg:space-y-32">
      {/* Screenshots go together, right after the intro: the cover and the rest of the screens, one after the other */}
      {(data.cover || data.screenGroups) && (
        <div className="space-y-16">
      {data.cover && (
        <motion.figure {...reveal}>
          <img
            src={data.cover.src}
            alt={data.cover.alt}
            loading="lazy"
            decoding="async"
            className="w-full rounded-xl ring-1 ring-gray-200"
          />
          <figcaption className="type-caption mt-4 max-w-3xl text-gray-600">{data.cover.caption}</figcaption>
        </motion.figure>
      )}

      {data.screenGroups && (
        <div id="pantallas" className="scroll-mt-28">
          {/* Screenshots are figures, not a section: the title is optional and normally absent */}
          {data.screensTitle && (
            <motion.h2 {...reveal} className={`${h2} ${data.screensIntro ? "mb-4" : "mb-10"}`}>
              {data.screensTitle}
            </motion.h2>
          )}
          {data.screensIntro && (
            <motion.p {...reveal} className="type-s1 mb-10 max-w-3xl text-gray-700">
              {data.screensIntro}
            </motion.p>
          )}
          <ScreenGroups groups={data.screenGroups} />
        </div>
      )}

        </div>
      )}

      {data.features && <CaseStudyFeatures features={data.features} />}

      {/* My design decisions: same light system as the rest of the case — h2, intro, then numbered questions. No card. */}
      {data.decisions && (
        <section id="decisiones" className="scroll-mt-28">
          <div className={`grid gap-14 ${data.decisionsImage ? "lg:grid-cols-[1.25fr_1fr] lg:items-start lg:gap-20" : ""}`}>
            <div>
              <motion.div {...reveal} className="max-w-3xl">
                <h2 className={h2}>Decisiones de diseño</h2>
                {data.decisionsIntro && <p className="type-s2 mt-5 text-gray-700">{data.decisionsIntro}</p>}
              </motion.div>

              {(() => {
                // Number column: wide when the block is full width, narrow next to an image.
                const row = `grid gap-3 sm:grid-cols-[3rem_1fr] sm:gap-6 ${data.decisionsImage ? "" : "lg:grid-cols-[11rem_1fr] lg:gap-10"}`;
                return (
                  <>
                    <ol className="mt-12 divide-y divide-gray-200 border-t border-gray-200">
                      {data.decisions.map((decision, i) => {
                        return (
                          <motion.li key={decision.title} {...reveal} className={`${row} py-10 lg:py-12`}>
                            <span className="pt-1 text-sm font-medium tabular-nums text-magenta-strong" aria-hidden="true">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <div className="max-w-3xl">
                              <h3 className="type-h3 text-gray-900">{decision.title}</h3>
                              <p className="type-body mt-4 text-gray-800">{decision.text}</p>
                            </div>
                          </motion.li>
                        );
                      })}
                    </ol>

                    {/* A transversal solution, presented as a statement rather than a question */}
                    {data.transversal && (
                      <motion.div {...reveal} className={`${row} border-t border-gray-200 pt-10 lg:pt-12`}>
                        <span className="hidden sm:block" aria-hidden="true" />
                        <div className="max-w-3xl">
                          <h3 className="type-h3 text-gray-900">{data.transversal.title}</h3>
                          <p className="type-body mt-4 text-gray-800">{data.transversal.text}</p>
                        </div>
                      </motion.div>
                    )}
                  </>
                );
              })()}
            </div>

            {data.decisionsImage && (
              <motion.figure {...reveal} className="mx-auto w-full max-w-sm lg:sticky lg:top-28 lg:max-w-none">
                <img
                  src={data.decisionsImage.src}
                  alt={data.decisionsImage.alt}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[3/4] w-full rounded-xl object-cover ring-1 ring-gray-200"
                />
                <figcaption className="type-caption mt-4 text-gray-600">{data.decisionsImage.caption}</figcaption>
              </motion.figure>
            )}
          </div>
        </section>
      )}

      {/* Navigable prototypes: plain rows, not cards */}
      {data.prototypes && (
        <div id="prototipos" className="scroll-mt-28">
          <motion.h2 {...reveal} className={`${h2} ${data.prototypesNote ? "mb-4" : "mb-10"}`}>
            {data.prototypesTitle ?? "Prototipos"}
          </motion.h2>
          {data.prototypesNote && (
            <motion.div {...reveal} className="mb-10 max-w-3xl space-y-4">
              {paragraphs(data.prototypesNote, "type-s1 text-gray-700")}
            </motion.div>
          )}
          <ul className="border-t border-gray-200">
            {data.prototypes.map((item) => (
              <li key={item.url} className="border-b border-gray-200">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 py-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta-strong"
                >
                  <span className="type-h3 text-gray-900 transition-transform duration-300 group-hover:translate-x-1">{item.label}</span>
                  <ArrowUpRight
                    className="h-5 w-5 shrink-0 text-magenta-strong transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                  <span className="sr-only">(se abre en otra pestaña)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* More photo evidence (kept for completeness; cases now use few, representative images) */}
      {data.evidence && (
        <div id="evidencia" className="scroll-mt-28">
          <motion.h2 {...reveal} className={`${h2} mb-10`}>
            {data.evidenceTitle}
          </motion.h2>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {data.evidence.map((item, i) => (
              <motion.figure key={item.caption} {...reveal} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <img src={item.src} alt={item.alt} loading="lazy" decoding="async" className="aspect-[4/5] w-full rounded-xl object-cover" />
                <figcaption className="type-caption mt-4 text-gray-600">{item.caption}</figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      )}

      {/* Result */}
      {data.result && (
        <motion.div {...reveal} id="resultado" className="max-w-3xl scroll-mt-28">
          <h2 className={`${h2} mb-5`}>{data.result.title}</h2>
          <p className="type-s1 text-gray-700">{data.result.text}</p>
        </motion.div>
      )}

      {/* A later stage of the project, after the result of the first one */}
      {data.nextStage && (
        <motion.div {...reveal} id="siguiente-etapa" className="max-w-3xl scroll-mt-28">
          <h2 className={`${h2} mb-5`}>{data.nextStage.title}</h2>
          <div className="space-y-4">{paragraphs(data.nextStage.text, "type-s1 text-gray-700")}</div>
        </motion.div>
      )}
    </div>
  );
}

/** Reflection, in the designer's own words. Same shape as "Resultado": an h2 and a lead paragraph. It closes the case. */
export function CaseStudyLearned({ data }: { data: { learned?: string } }) {
  if (!data.learned) return null;
  return (
    <motion.div {...reveal} id="aprendi" className="max-w-3xl scroll-mt-28">
      <h2 className={`${h2} mb-5`}>Qué aprendí</h2>
      <div className="space-y-4">{paragraphs(data.learned, "type-s1 text-gray-700")}</div>
    </motion.div>
  );
}
