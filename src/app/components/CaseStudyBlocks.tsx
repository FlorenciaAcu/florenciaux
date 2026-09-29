import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Activity, ArrowRight, ArrowUpRight, Compass, Cpu, FileSearch, LayoutDashboard, Layers, MessageSquare, Store, Terminal, Users, WifiOff } from "lucide-react";
import type { CaseStudy, CaseStudyDecision, CaseStudyFeature, CaseStudyScreenGroup } from "../data/experiences";

const decisionIcons: Record<CaseStudyDecision["icon"], typeof LayoutDashboard> = {
  metrics: Activity,
  data: LayoutDashboard,
  device: WifiOff,
  physical: Cpu,
  taxonomy: Layers,
  discovery: Compass,
  evaluate: FileSearch,
  sides: Store,
  contact: MessageSquare,
  context: Users,
  build: Terminal,
};

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

/** One labelled row of "Mi trabajo": the label on the left, the content on the right. The vertical rhythm alone separates rows: no hairlines. */
function WorkRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-4 py-8 lg:grid-cols-[11rem_1fr] lg:gap-10 lg:py-10">
      <dt className="type-eyebrow pt-1 text-[#cc0058]">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

function WorkList({ items }: { items: string[] }) {
  // A bullet only makes sense when there is something to list: a single item reads as plain text.
  if (items.length === 1) {
    return <p className="type-body max-w-3xl text-gray-800">{items[0]}</p>;
  }
  return (
    <ul className="max-w-3xl space-y-3">
      {items.map((item) => (
        <li key={item} className="type-body flex gap-3 text-gray-800">
          <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[#cc0058]" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Same opening block for every experience and case: what it is (with the quick facts next to it), the problem, and "Mi trabajo".
 *  Told from the designer's perspective — no internal detail. */
export function ExperienceIntro({
  data,
  period,
  intro,
  meta,
  about,
}: {
  data?: CaseStudy;
  period: string;
  intro: string[];
  /** "Qué es" for experiences without a written case. */
  about?: { title: string; text: string };
  /** Quick facts for experiences without a written case (cases carry their own in `data.meta`). */
  meta?: { label: string; value: string }[];
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
        <motion.div {...reveal} id="mi-trabajo" className="scroll-mt-28">
          <div className="mb-8 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h2 className={h2}>Mi trabajo</h2>
            {!meta && <span className="text-sm text-gray-600">{period}</span>}
          </div>
          <dl>
            <WorkRow label="Qué hice">
              <div className="type-body max-w-3xl space-y-4 text-gray-800">
                {intro.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </WorkRow>
          </dl>
        </motion.div>
      </div>
    );
  }

  const paragraphs = (text: string) =>
    text.split("\n\n").map((p) => (
      <p key={p} className="type-body text-gray-700">
        {p}
      </p>
    ));

  // Reading order: what it is (+ quick facts) -> the problem -> my work. The decisions and the evidence come next.
  return (
    <div className="space-y-16 lg:space-y-24">
      <div className={`grid gap-10 lg:gap-14 ${data.meta ? "lg:grid-cols-2" : "max-w-3xl"}`}>
        <motion.div {...reveal} id="que-es" className="scroll-mt-28">
          <h2 className={`${h2} mb-4`}>{data.aboutTitle}</h2>
          <div className="space-y-3">{paragraphs(data.about)}</div>
        </motion.div>
        {data.meta && <MetaList meta={data.meta} />}
      </div>

      {(data.challenge || data.designed || data.role.length > 0) && (
        <motion.div {...reveal} id="mi-trabajo" className="scroll-mt-28">
          <div className="mb-8 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h2 className={h2}>{data.roleTitle}</h2>
            {!data.meta && <span className="text-sm text-gray-600">{period}</span>}
          </div>
          {/* One section, three labelled rows: the challenge, what I designed, how I worked. Each idea appears once. */}
          <dl>
            {data.challenge && (
              <WorkRow label={data.challengeTitle ?? "El desafío"}>
                <div className="max-w-3xl space-y-4">{paragraphs(data.challenge)}</div>
                {data.terms && (
                  <dl className="type-caption mt-6 max-w-3xl space-y-2 text-gray-700">
                    {data.terms.map((item) => (
                      <div key={item.term}>
                        <dt className="inline font-semibold text-gray-900">{item.term}: </dt>
                        <dd className="inline">{item.definition}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </WorkRow>
            )}
            {data.designed && (
              <WorkRow label="Qué diseñé">
                <WorkList items={data.designed} />
              </WorkRow>
            )}
            {data.role.length > 0 && (
              <WorkRow label={data.roleLabel ?? (data.designed ? "Cómo trabajé" : "Qué hice")}>
                <WorkList items={data.role} />
              </WorkRow>
            )}
          </dl>
        </motion.div>
      )}
    </div>
  );
}

/** The sections of a page, in the order they appear, for the sticky "on this page" index. */
export function buildOutline(data: CaseStudy | undefined, opts: { projects?: boolean; about?: string } = {}) {
  const items: { id: string; label: string; n?: string }[] = [];
  if (data) {
    items.push({ id: "que-es", label: data.aboutTitle });
    if (data.challenge || data.designed || data.role.length > 0) items.push({ id: "mi-trabajo", label: data.roleTitle });
    if (opts.projects) items.push({ id: "proyectos", label: "Proyectos" });
    if (data.screenGroups && data.screensTitle) items.push({ id: "pantallas", label: data.screensTitle });
    data.features?.forEach((feature, i) => items.push({ id: `feature-${i + 1}`, label: feature.title, n: String(i + 1).padStart(2, "0") }));
    if (data.decisions) items.push({ id: "decisiones", label: data.decisionsEyebrow ?? "Decisiones de diseño" });
    if (data.prototypes) items.push({ id: "prototipos", label: data.prototypesTitle ?? "Prototipos" });
    if (data.evidence) items.push({ id: "evidencia", label: data.evidenceTitle ?? "Evidencia" });
    if (data.result) items.push({ id: "resultado", label: data.result.title });
    if (data.learned) items.push({ id: "aprendi", label: "Qué aprendí" });
  } else {
    if (opts.about) items.push({ id: "que-es", label: opts.about });
    items.push({ id: "mi-trabajo", label: "Mi trabajo" });
    if (opts.projects) items.push({ id: "proyectos", label: "Proyectos" });
  }
  return items;
}

/** Sticky "on this page" index for long cases (like the outline in Google Docs): where I am, and a way to jump.
 *  Desktop only; the sections themselves carry the ids. */
export function CaseOutline({ items }: { items: { id: string; label: string; n?: string }[] }) {
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
                className={`-ml-px flex w-full gap-2.5 border-l-2 py-1.5 pl-4 text-left text-sm leading-snug transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#cc0058] ${
                  isActive ? "border-[#cc0058] font-medium text-gray-900" : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                {item.n && <span className="shrink-0 tabular-nums text-gray-600">{item.n}</span>}
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
            <motion.h3 {...reveal} className={`${group.intro ? "mb-2" : "mb-5"} type-eyebrow text-[#cc0058]`}>
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
    <div className="space-y-20 lg:space-y-32">
      {features.map((feature, index) => (
        <section key={feature.title} id={`feature-${index + 1}`} className={`scroll-mt-28 ${index > 0 ? "border-t border-gray-200 pt-20 lg:pt-32" : ""}`}>
          <motion.div {...reveal} className="flex items-baseline gap-5">
            {/* Decorative numeral drawn with CSS so it stays out of the accessibility tree */}
            <span
              aria-hidden="true"
              data-n={String(index + 1).padStart(2, "0")}
              className="text-4xl font-light leading-none text-[#cc0058] before:content-[attr(data-n)] lg:text-5xl"
            />
            <h3 className="type-h2 text-gray-900">{feature.title}</h3>
          </motion.div>
          <motion.p {...reveal} className="type-s1 mt-6 max-w-3xl text-gray-700">
            {feature.context}
          </motion.p>

          <motion.div {...reveal} className="mt-12 max-w-3xl">
            <h4 className="type-eyebrow text-[#cc0058]">Lo que diseñé</h4>
            <ul className="mt-5 space-y-3">
              {feature.did.map((item) => (
                <li key={item} className="type-body flex gap-3 text-gray-800">
                  <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[#cc0058]" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {feature.options && (
            <div className="mt-16">
              <motion.h4 {...reveal} className="type-eyebrow text-[#cc0058]">
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
              <motion.h4 {...reveal} className="type-eyebrow text-[#cc0058]">
                {feature.evolutionTitle ?? "Cómo evolucionó"}
              </motion.h4>
              <ol className={`mt-8 grid gap-x-10 gap-y-8 ${feature.evolution.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
                {feature.evolution.map((step, i) => (
                  <motion.li key={step.title} {...reveal} transition={{ duration: 0.5, delay: i * 0.08 }}>
                    <span className="text-sm font-medium tabular-nums text-[#cc0058]">{String(i + 1).padStart(2, "0")}</span>
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

          <motion.div {...reveal} className="mt-16 max-w-3xl">
            <h4 className="type-eyebrow text-[#cc0058]">Qué aprendí</h4>
            <p className="type-s1 mt-3 text-gray-700">{feature.learned}</p>
          </motion.div>
        </section>
      ))}
    </div>
  );
}

/** Cover image, features, my design decisions, screens, prototypes, result. Open layout: images without cards, the decisions in one dark band. */
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

      {/* My design decisions: one dark band; the questions are open items, not cards */}
      {data.decisions && (
        <motion.section
          {...reveal}
          id="decisiones"
          data-header-theme="dark"
          className="relative scroll-mt-28 overflow-hidden rounded-3xl bg-[#0a0a0a] p-8 sm:p-12 lg:p-16"
        >
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="animate-blob-1 absolute -top-24 -left-16 h-72 w-72 rounded-full bg-[#ff006e] opacity-[0.14] blur-[100px]" />
            <div className="animate-blob-2 absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-[#00e5ff] opacity-[0.1] blur-[110px]" />
          </div>

          <div className={`relative grid gap-14 ${data.decisionsImage ? "lg:grid-cols-[1.25fr_1fr] lg:items-start lg:gap-20" : ""}`}>
            <div>
              <p className="type-eyebrow mb-4 text-[#ff006e]">{data.decisionsEyebrow}</p>
              <h2 className="type-h2 text-white">{data.decisionsTitle}</h2>
              <p className="type-s2 mt-5 max-w-xl text-gray-300">{data.decisionsIntro}</p>

              <ul className="mt-12 divide-y divide-white/10 border-t border-white/10">
                {data.decisions.map((decision) => {
                  const Icon = decisionIcons[decision.icon];
                  return (
                    <li key={decision.title} className="grid gap-4 py-8 sm:grid-cols-[2rem_1fr] sm:gap-6">
                      <Icon className="mt-1 h-5 w-5 text-[#00e5ff]" aria-hidden="true" />
                      <div>
                        <h3 className="type-h3 text-white">{decision.title}</h3>
                        {(() => {
                          const sentences = splitSentences(decision.text);
                          // A single sentence reads as a paragraph, not a one-bullet list.
                          if (sentences.length === 1) {
                            return <p className="mt-4 text-sm leading-relaxed text-gray-300">{sentences[0]}</p>;
                          }
                          return (
                            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-gray-300">
                              {sentences.map((sentence) => (
                                <li key={sentence} className="flex gap-2.5">
                                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#00e5ff]" aria-hidden="true" />
                                  {sentence}
                                </li>
                              ))}
                            </ul>
                          );
                        })()}
                      </div>
                    </li>
                  );
                })}
              </ul>

              {/* A transversal solution, presented as a statement rather than a question */}
              {data.transversal && (
                <div className="border-t border-[#00e5ff]/30 pt-8">
                  <h3 className="type-h3 text-white">{data.transversal.title}</h3>
                  <p className="type-caption mt-3 text-gray-300">{data.transversal.text}</p>
                </div>
              )}
            </div>

            {data.decisionsImage && (
              <figure className="mx-auto w-full max-w-sm lg:sticky lg:top-28 lg:max-w-none">
                <img
                  src={data.decisionsImage.src}
                  alt={data.decisionsImage.alt}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[3/4] w-full rounded-xl object-cover"
                />
                <figcaption className="type-caption mt-4 text-gray-300">{data.decisionsImage.caption}</figcaption>
              </figure>
            )}
          </div>
        </motion.section>
      )}

      {/* Navigable prototypes: plain rows, not cards */}
      {data.prototypes && (
        <div id="prototipos" className="scroll-mt-28">
          <motion.h2 {...reveal} className={`${h2} ${data.prototypesNote ? "mb-4" : "mb-10"}`}>
            {data.prototypesTitle ?? "Prototipos"}
          </motion.h2>
          {data.prototypesNote && (
            <motion.p {...reveal} className="type-s1 mb-10 max-w-3xl text-gray-700">
              {data.prototypesNote}
            </motion.p>
          )}
          <ul className="border-t border-gray-200">
            {data.prototypes.map((item) => (
              <li key={item.url} className="border-b border-gray-200">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 py-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#cc0058]"
                >
                  <span className="type-h3 text-gray-900 transition-transform duration-300 group-hover:translate-x-1">{item.label}</span>
                  <ArrowUpRight
                    className="h-5 w-5 shrink-0 text-[#cc0058] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
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
    </div>
  );
}

/** Reflection, in the designer's own words. Same shape as "Resultado": an h2 and a lead paragraph. It closes the case. */
export function CaseStudyLearned({ data }: { data: CaseStudy }) {
  if (!data.learned) return null;
  return (
    <motion.div {...reveal} id="aprendi" className="max-w-3xl scroll-mt-28">
      <h2 className={`${h2} mb-5`}>Qué aprendí</h2>
      <p className="type-s1 text-gray-700">{data.learned}</p>
    </motion.div>
  );
}
