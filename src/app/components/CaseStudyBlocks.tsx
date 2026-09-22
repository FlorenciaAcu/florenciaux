import { motion } from "motion/react";
import { Activity, ArrowUpRight, Compass, Cpu, FileSearch, LayoutDashboard, Layers, MessageSquare, Store, Users, WifiOff } from "lucide-react";
import type { CaseStudy, CaseStudyDecision } from "../data/experiences";

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

const h2 = "text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight";

/** Same opening block for every experience: "Mi trabajo" (period + intro, plus bullets when there is a case study),
 *  next to "about the company" when the experience has one. Told from the designer's perspective — no internal detail. */
export function ExperienceIntro({ data, period, intro }: { data?: CaseStudy; period: string; intro: string[] }) {
  // Experiences without a written case: just the "Mi trabajo" card.
  if (!data) {
    return (
      <motion.div {...reveal} className="glass-panel max-w-3xl rounded-3xl p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[#cc0058]">Mi trabajo</h2>
          <span className="text-xs text-gray-600">{period}</span>
        </div>
        {intro.map((line) => (
          <p key={line} className="mt-4 text-sm leading-relaxed text-gray-700">
            {line}
          </p>
        ))}
      </motion.div>
    );
  }

  const paragraphs = (text: string) =>
    text.split("\n\n").map((p) => (
      <p key={p} className="text-base leading-relaxed text-gray-700">
        {p}
      </p>
    ));

  // Reading order: what it is -> the problem -> my work. The decisions and the evidence come next.
  return (
    <div className="space-y-12 lg:space-y-14">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <motion.div {...reveal}>
          <h2 className={`${h2} mb-4`}>{data.aboutTitle}</h2>
          <div className="space-y-3">{paragraphs(data.about)}</div>
        </motion.div>

        {data.challenge && (
          <motion.div {...reveal} transition={{ duration: 0.5, delay: 0.1 }}>
            <h2 className={`${h2} mb-4`}>{data.challengeTitle ?? "El desafío"}</h2>
            <div className="space-y-3">{paragraphs(data.challenge)}</div>
            {data.terms && (
              <dl className="mt-5 space-y-2 border-t border-gray-200 pt-4 text-sm leading-relaxed text-gray-700">
                {data.terms.map((item) => (
                  <div key={item.term}>
                    <dt className="inline font-semibold text-gray-900">{item.term}: </dt>
                    <dd className="inline">{item.definition}</dd>
                  </div>
                ))}
              </dl>
            )}
          </motion.div>
        )}
      </div>

      <motion.div {...reveal}>
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h2 className={h2}>{data.roleTitle}</h2>
          <span className="text-sm text-gray-600">{period}</span>
        </div>
        <div className="glass-panel overflow-hidden rounded-3xl">
          {data.highlights && (
            <dl className="grid divide-y divide-gray-200 md:grid-cols-3 md:divide-x md:divide-y-0">
              {data.highlights.map((item) => (
                <div key={item.label} className="p-6">
                  <dt className="text-xs font-semibold uppercase tracking-widest text-[#cc0058]">{item.label}</dt>
                  <dd className="mt-2 text-base font-medium leading-snug text-gray-900">{item.text}</dd>
                </div>
              ))}
            </dl>
          )}
          {data.role.length > 0 && (
            <ul className="space-y-2.5 border-t border-gray-200 p-6">
              {data.role.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-gray-700">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#cc0058]" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
    </div>
  );
}

/** My design decisions between screen and device, and photo evidence. */
export function CaseStudyDetails({ data }: { data: CaseStudy }) {
  return (
    <div className="space-y-12 lg:space-y-16">
      {/* My design decisions between screen and device */}
      <motion.section
        {...reveal}
        data-header-theme="dark"
        className="relative overflow-hidden rounded-3xl bg-[#0a0a0a] p-6 sm:p-10 lg:p-12"
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="animate-blob-1 absolute -top-24 -left-16 h-72 w-72 rounded-full bg-[#ff006e] opacity-[0.16] blur-[100px]" />
          <div className="animate-blob-2 absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-[#00e5ff] opacity-[0.12] blur-[110px]" />
        </div>

        <div className={`relative grid gap-10 ${data.decisionsImage ? "lg:grid-cols-[1.15fr_1fr] lg:items-start lg:gap-14" : ""}`}>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#ff006e]">{data.decisionsEyebrow}</p>
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-white lg:text-4xl">{data.decisionsTitle}</h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-300">{data.decisionsIntro}</p>

            {/* One card per decision: the question, then the answer in short lines */}
            <ul className={`mt-8 ${data.decisionsImage ? "space-y-4" : "grid gap-4 md:grid-cols-2"}`}>
              {data.decisions.map((decision) => {
                const Icon = decisionIcons[decision.icon];
                return (
                  <li key={decision.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                    <div className="flex items-start gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#00e5ff]/50 bg-[#00e5ff]/10 text-[#00e5ff]">
                        <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                      </span>
                      <h3 className="pt-1.5 font-semibold leading-snug text-white">{decision.title}</h3>
                    </div>
                    <ul className="mt-3 space-y-1.5 pl-12 text-sm leading-relaxed text-gray-300">
                      {splitSentences(decision.text).map((sentence) => (
                        <li key={sentence} className="flex gap-2.5">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#00e5ff]" aria-hidden="true" />
                          {sentence}
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>

            {/* A transversal solution, presented as a statement rather than a question */}
            {data.transversal && (
              <div className="mt-4 rounded-2xl border border-[#00e5ff]/25 bg-[#00e5ff]/[0.04] p-5">
                <h3 className="font-semibold leading-snug text-white">{data.transversal.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-300">{data.transversal.text}</p>
              </div>
            )}
          </div>

          {data.decisionsImage && (
            <figure className="mx-auto w-full max-w-sm lg:sticky lg:top-28 lg:max-w-none">
              <div className="rounded-3xl bg-gradient-to-br from-[#ff006e] via-[#ff006e]/25 to-[#00e5ff] p-[2px]">
                <img
                  src={data.decisionsImage.src}
                  alt={data.decisionsImage.alt}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[3/4] w-full rounded-[calc(1.5rem-2px)] object-cover"
                />
              </div>
              <figcaption className="mt-3 text-sm leading-relaxed text-gray-300">{data.decisionsImage.caption}</figcaption>
            </figure>
          )}
        </div>
      </motion.section>

      {/* Screens */}
      {data.screenGroups && (
        <div>
          <motion.h2 {...reveal} className={`${h2} ${data.screensIntro ? "mb-3" : "mb-6"}`}>
            {data.screensTitle}
          </motion.h2>
          {data.screensIntro && (
            <motion.p {...reveal} className="mb-8 max-w-3xl text-base leading-relaxed text-gray-700">
              {data.screensIntro}
            </motion.p>
          )}
          <div className="space-y-10">
            {data.screenGroups.map((group) => (
              <div key={group.title}>
                <motion.h3 {...reveal} className={`${group.intro ? "mb-2" : "mb-4"} text-xs font-semibold uppercase tracking-widest text-[#cc0058]`}>
                  {group.title}
                </motion.h3>
                {group.intro && (
                  <motion.p {...reveal} className="mb-5 max-w-3xl text-base leading-relaxed text-gray-700">
                    {group.intro}
                  </motion.p>
                )}
                <div className={`grid gap-6 ${group.grid ?? `md:grid-cols-2 ${group.images.length > 2 ? "lg:grid-cols-3" : ""}`}`}>
                  {group.images.map((item, i) => (
                    <motion.figure key={item.caption} {...reveal} transition={{ duration: 0.5, delay: i * 0.1 }}>
                      <a
                        href={item.src}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                      >
                        <img
                          src={item.src}
                          alt={item.alt}
                          loading="lazy"
                          decoding="async"
                          className={`${group.aspect} w-full object-contain object-top`}
                        />
                        <span className="sr-only">Ver pantalla completa (se abre en otra pestaña)</span>
                      </a>
                      <figcaption className="mt-3 text-sm leading-relaxed text-gray-600">{item.caption}</figcaption>
                    </motion.figure>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigable prototypes, used in place of screenshots when there are none yet */}
      {data.prototypes && (
        <div>
          <motion.h2 {...reveal} className={`${h2} ${data.prototypesNote ? "mb-3" : "mb-6"}`}>
            {data.prototypesTitle ?? "Prototipos"}
          </motion.h2>
          {data.prototypesNote && (
            <motion.p {...reveal} className="mb-6 max-w-3xl text-base leading-relaxed text-gray-700">
              {data.prototypesNote}
            </motion.p>
          )}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.prototypes.map((item) => (
              <motion.a
                key={item.url}
                {...reveal}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white p-5 transition-colors hover:border-[#cc0058]/40"
              >
                <span className="font-semibold text-gray-900">{item.label}</span>
                <ArrowUpRight
                  className="h-4 w-4 shrink-0 text-[#cc0058] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
                <span className="sr-only">(se abre en otra pestaña)</span>
              </motion.a>
            ))}
          </div>
        </div>
      )}

      {/* More photo evidence */}
      {data.evidence && (
      <div>
        <motion.h2 {...reveal} className={`${h2} mb-6`}>
          {data.evidenceTitle}
        </motion.h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.evidence.map((item, i) => (
            <motion.figure key={item.caption} {...reveal} transition={{ duration: 0.5, delay: i * 0.1 }}>
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full rounded-3xl object-cover"
              />
              <figcaption className="mt-3 text-sm leading-relaxed text-gray-600">{item.caption}</figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
      )}

      {/* Result */}
      {data.result && (
        <motion.div {...reveal} className="max-w-3xl">
          <h2 className={`${h2} mb-3`}>{data.result.title}</h2>
          <p className="text-base leading-relaxed text-gray-700">{data.result.text}</p>
        </motion.div>
      )}
    </div>
  );
}

/** Reflection, in the designer's own words. It closes the case, after the result and the projects. */
export function CaseStudyLearned({ data }: { data: CaseStudy }) {
  if (!data.learned) return null;
  return (
    <motion.figure {...reveal} className="max-w-3xl border-l-2 border-[#cc0058] pl-6">
      <figcaption className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#cc0058]">Qué aprendí</figcaption>
      <blockquote className="text-lg font-medium leading-relaxed text-gray-900">{data.learned}</blockquote>
    </motion.figure>
  );
}
