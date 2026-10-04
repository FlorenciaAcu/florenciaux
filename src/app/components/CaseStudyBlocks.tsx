import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight, Maximize2, MousePointerClick, X } from "lucide-react";
import { OpenCue } from "./NavArrow";
import type { CaseStudy, CaseStudyImage, CaseStudyScreenGroup, ExperienceProject } from "../data/experiences";

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

/** Full-size view of a case image: Esc or click outside closes it, focus goes to the close button and returns to the image. */
function Lightbox({ image, onClose }: { image: { src: string; alt: string }; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
      if (e.key === "Tab") {
        e.preventDefault();
        closeRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prevOverflow;
      opener?.focus();
    };
  }, []);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 z-[90] flex cursor-zoom-out items-center justify-center bg-black/85 p-4 sm:p-10"
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Cerrar imagen"
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <X className="h-5 w-5" aria-hidden="true" />
      </button>
      <motion.img
        initial={{ scale: 0.97 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        src={image.src}
        alt={image.alt}
        className="max-h-full max-w-full rounded-lg object-contain"
      />
    </motion.div>
  );
}

/** Honesto: nunca una imagen simulada. Dos imágenes sueltas (no en pareja), siempre en el mismo lugar en
 *  los 8 detalles por igual: la primera justo después de "Cómo trabajé", la segunda justo antes de
 *  "Qué aprendí" (exista o no el campo — el lugar es fijo). Muestra la foto real cuando existe (`images`)
 *  y el placeholder "Imagen pendiente" cuando todavía no hay una. */
export function CaseImage({ image }: { image?: { src: string; alt: string } }) {
  const [open, setOpen] = useState(false);

  return image ? (
    <>
      <motion.button
        {...reveal}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Ampliar imagen: ${image.alt}`}
        className="group relative block w-full cursor-zoom-in rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-magenta-strong"
      >
        <img src={image.src} alt="" loading="lazy" decoding="async" className="w-full rounded-xl object-cover ring-1 ring-gray-200" />
        <span
          aria-hidden="true"
          className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          <Maximize2 className="h-4 w-4" />
        </span>
      </motion.button>
      {open && <Lightbox image={image} onClose={() => setOpen(false)} />}
    </>
  ) : (
    <div className="flex aspect-[16/9] items-center justify-center rounded-xl bg-gray-200 ring-1 ring-gray-200">
      <p className="type-caption font-medium text-gray-600">Imagen pendiente</p>
    </div>
  );
}

/** Quick facts as a hairline key-value list (role, industry, duration…): only what is confirmed. Keys in the site's own caption type, like everything else. */
function MetaList({ meta }: { meta: { label: string; value: string }[] }) {
  return (
    <motion.dl {...reveal} transition={{ duration: 0.5, delay: 0.1 }} className="type-caption self-end border-t border-gray-200">
      {meta.map((row) => (
        <div key={row.label} className="flex items-baseline justify-between gap-6 border-b border-gray-200 py-3">
          <dt className="type-caption text-gray-600">{row.label}</dt>
          <dd className="text-right font-medium text-gray-900">{row.value}</dd>
        </div>
      ))}
    </motion.dl>
  );
}

/** Sticky notes, like the ones of a FigJam board: the steps of "Cómo se conecta". Same colors in the same order and the same slight tilt in every detail. */
const NOTE_COLORS = ["bg-[#fff3a6]", "bg-[#ffd6e3]", "bg-[#d3f3fa]"];
const NOTE_TILTS = ["-1deg", "0.8deg", "-0.6deg"];

/** "Cómo trabajé" is always narrative: each item (and each blank-line break inside one) is a paragraph. Never a bulleted list. */
function WorkParagraphs({ items }: { items: string[] }) {
  return <div className="space-y-4">{items.map((item) => paragraphs(item, "type-body text-gray-800"))}</div>;
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
      <div className="space-y-4">{paragraphs(text)}</div>
      {terms && (
        <dl className="type-caption mt-6 space-y-2 text-gray-700">
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
  challengeTitle,
  images,
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
  /** Title of the "challenge" block, when "El desafío" does not describe it. */
  challengeTitle?: string;
  /** The first of the two images (right after "Cómo trabajé"), for experiences without a written case
   *  (cases carry their own in `data.images`). The second lives in `CaseStudyDetails`, before "Qué aprendí". */
  images?: CaseStudyImage[];
}) {
  // Experiences without a written case: the same opening as the cases ("Qué es" + quick facts) and the same "Mi trabajo".
  if (!data) {
    return (
      <div className="space-y-16 lg:space-y-24">
        {(about || meta) && (
          <div className="space-y-10">

            {about && (
              <motion.div {...reveal} id="que-es" className="scroll-mt-28">
                <h2 className={`${h2} mb-4`}>{about.title}</h2>
                <p className="type-body text-gray-700">{about.text}</p>
              </motion.div>
            )}
            {meta && <MetaList meta={meta} />}
          </div>
        )}
        {challenge && <ChallengeSection title={challengeTitle ?? "El desafío"} text={challenge} />}
        <motion.div {...reveal} id="como-trabaje" className="scroll-mt-28">
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h2 className={h2}>Cómo trabajé</h2>
            {!meta && <span className="text-sm text-gray-600">{period}</span>}
          </div>
          <div className="type-body space-y-4 text-gray-800">
            {intro.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </motion.div>
        <CaseImage image={images?.[0]} />
      </div>
    );
  }

  // Reading order: what it is (+ quick facts) -> the challenge -> how I worked. The decisions and the evidence come next.
  return (
    <div className="space-y-16 lg:space-y-24">
      <div className="space-y-10">
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
          {data.workSubsection && (
            <div className="mt-10">
              <h3 className="type-h3 text-gray-900">{data.workSubsection.title}</h3>
              <p className="type-body mt-4 text-gray-800">{data.workSubsection.text}</p>
            </div>
          )}
        </motion.div>
      )}

      <CaseImage image={data.images?.[0]} />

      {/* Siempre justo después de "Cómo trabajé" y su imagen, también en las experiencias (donde "Proyectos" viene después) */}
      {data.systemMap && <SystemMap map={data.systemMap} />}
    </div>
  );
}

type OutlineItem = { id: string; label: string; sub?: boolean };

/** The sections of a page, in the order they appear, for the sticky "on this page" index. */
export function buildOutline(data: CaseStudy | undefined, opts: { projects?: boolean; about?: string; challenge?: string; learned?: boolean } = {}) {
  const items: OutlineItem[] = [];
  if (data) {
    items.push({ id: "que-es", label: data.aboutTitle });
    if (data.challenge) items.push({ id: "desafio", label: data.challengeTitle ?? "El desafío" });
    if (data.role.length > 0) items.push({ id: "como-trabaje", label: "Cómo trabajé" });
    if (data.systemMap) items.push({ id: "sistema", label: "Cómo se conecta" });
    if (opts.projects) items.push({ id: "proyectos", label: "Proyectos" });
    if (data.screenGroups && data.screensTitle) items.push({ id: "pantallas", label: data.screensTitle });
    if (data.projects) items.push({ id: "proyectos", label: "Proyectos" });
    if (data.decisions) items.push({ id: "decisiones", label: "Decisiones de diseño" });
    if (data.prototypes) items.push({ id: "prototipos", label: data.prototypesTitle ?? "Prototipos" });
    if (data.evidence) items.push({ id: "evidencia", label: data.evidenceTitle ?? "Evidencia" });
    if (data.nextStage) items.push({ id: "siguiente-etapa", label: data.nextStage.navLabel ?? data.nextStage.title });
    if (data.learned) items.push({ id: "aprendi", label: "Qué aprendí" });
  } else {
    if (opts.about) items.push({ id: "que-es", label: opts.about });
    if (opts.challenge) items.push({ id: "desafio", label: opts.challenge });
    items.push({ id: "como-trabaje", label: "Cómo trabajé" });
    if (opts.projects) items.push({ id: "proyectos", label: "Proyectos" });
    if (opts.learned) items.push({ id: "aprendi", label: "Qué aprendí" });
  }
  return items;
}

/** Page flags like the ones used to mark a notebook: a pastel strip per section, always the same colors in the same order. */
const FLAG_COLORS = ["bg-[#c8f0e0]", "bg-[#bfe0f2]", "bg-[#b4cdd3]", "bg-[#f2d3e6]", "bg-[#f3a5c0]"];

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
      {/* Page flags on the edge of a sheet: each section is a colored strip; the one you are on is the one that sticks out. */}
      <ul className="space-y-1.5 border-r border-gray-300">
        {items.map((item, index) => {
          const isActive = item.id === active;
          return (
            <li key={item.id} className="-mr-px">
              <button
                type="button"
                onClick={() => go(item.id)}
                aria-current={isActive ? "location" : undefined}
                className={`block w-full py-2 pr-3 ${item.sub ? "pl-7" : "pl-4"} text-left text-sm leading-snug text-gray-900 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta-strong ${FLAG_COLORS[index % FLAG_COLORS.length]} ${
                  isActive
                    ? "font-medium shadow-[0_2px_4px_rgba(10,10,10,0.15)]"
                    : "ml-4 w-[calc(100%-1rem)] opacity-75 hover:ml-2 hover:w-[calc(100%-0.5rem)] hover:opacity-100"
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

/** "Cómo se conecta": the pieces of the system as a sequence of nodes. Each connector draws in when it enters the viewport, then a dot keeps
 *  travelling along it (CSS, so reduced motion can switch it off). Vertical below xl, horizontal from xl. */
function SystemMap({ map }: { map: NonNullable<CaseStudy["systemMap"]> }) {
  const handles = ["-left-1 -top-1", "-right-1 -top-1", "-bottom-1 -left-1", "-bottom-1 -right-1"];
  const shadow = "shadow-[0_2px_4px_rgba(10,10,10,0.12)]";

  // Each step is a card with its number, title and description inside. On desktop the flow is always horizontal, never vertical:
  // 3 steps from lg, 4 or 5 from xl. Below that it collapses to one wide card per step. Classes are written out whole so Tailwind finds them.
  const count = map.steps.length;
  const from = count <= 3 ? "lg" : "xl";
  const v = {
    lg: {
      ol: "lg:flex-row lg:items-stretch",
      li: "lg:block lg:min-w-0 lg:flex-1",
      tilt: "lg:rotate-[var(--tilt)]",
      title: "lg:mt-2",
      text: "lg:mt-3",
      line: "lg:mx-0 lg:h-px lg:w-9 lg:self-center",
      fill: "lg:origin-left",
      down: "lg:hidden",
      right: "hidden lg:block",
    },
    xl: {
      ol: "xl:flex-row xl:items-stretch",
      li: "xl:block xl:min-w-0 xl:flex-1",
      tilt: "xl:rotate-[var(--tilt)]",
      title: "xl:mt-2",
      text: "xl:mt-3",
      line: "xl:mx-0 xl:h-px xl:w-9 xl:self-center",
      fill: "xl:origin-left",
      down: "xl:hidden",
      right: "hidden xl:block",
    },
  }[from];

  return (
    <section id="sistema" className="scroll-mt-28">
      <motion.h2 {...reveal} className={`${h2} ${map.intro ? "mb-4" : "mb-10"}`}>
        Cómo se conecta
      </motion.h2>
      {map.intro && (
        <motion.p {...reveal} className="type-s1 mb-10 text-gray-700">
          {map.intro}
        </motion.p>
      )}

      {/* A flow as it would look in FigJam: a frame (corner handles) over a dot grid, cards joined by connectors with an arrowhead. */}
      <motion.div
        {...reveal}
        className="group/canvas bg-dot-grid relative border border-gray-300 bg-surface-page p-5 transition-colors duration-300 hover:border-gray-400 sm:p-8"
      >
        {handles.map((position) => (
          <span
            key={position}
            aria-hidden="true"
            className={`absolute h-2 w-2 border border-gray-400 bg-surface-page transition-colors duration-300 group-hover/canvas:border-cyan-strong ${position}`}
          />
        ))}

        <ol className={`flex flex-col ${v.ol}`}>
          {map.steps.flatMap((step, i) => {
            const items = [
              <motion.li
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.22 }}
                style={{ "--tilt": NOTE_TILTS[i % NOTE_TILTS.length] } as CSSProperties}
                className={`rotate-[var(--tilt)] px-5 py-5 ${shadow} transition-transform duration-200 ${NOTE_COLORS[i % NOTE_COLORS.length]} md:rotate-0 ${v.tilt} hover:rotate-0 md:grid md:grid-cols-[2rem_13rem_minmax(0,1fr)] md:items-baseline md:gap-x-4 ${v.li}`}
              >
                <span className="type-eyebrow text-gray-700" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className={`type-title-compact mt-2 text-gray-900 md:mt-0 ${v.title}`}>{step.title}</h3>
                <p className={`type-caption mt-2 text-gray-700 md:mt-0 ${v.text}`}>{step.text}</p>
              </motion.li>,
            ];

            if (i < count - 1) {
              items.push(
                <li
                  key={`${step.title}-next`}
                  aria-hidden="true"
                  className={`relative mx-auto block h-12 w-px flex-none bg-gray-300 ${v.line}`}
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: i * 0.22 + 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className={`absolute inset-0 origin-top bg-magenta-strong ${v.fill}`}
                  />
                  {/* Arrowhead: down in the vertical flow, to the right in the horizontal one */}
                  <span className={`absolute -bottom-px left-1/2 -translate-x-1/2 border-x-[5px] border-t-[8px] border-x-transparent border-t-magenta-strong ${v.down}`} />
                  <span className={`absolute -right-px top-1/2 -translate-y-1/2 border-y-[5px] border-l-[8px] border-y-transparent border-l-magenta-strong ${v.right}`} />
                  <span data-from={from} className="system-flow-dot h-2 w-2 rounded-full bg-cyan-strong" style={{ animationDelay: `${i * 0.5 + 1}s` }} />
                </li>
              );
            }
            return items;
          })}
        </ol>
      </motion.div>
    </section>
  );
}

/** A prototype you can try without leaving the case. The iframe only loads on click, so the page stays light; the link to open it in its own tab is always there. */
function PrototypeRow({ item }: { item: { label: string; url: string } }) {
  const [open, setOpen] = useState(false);
  const linkClass =
    "inline-flex items-center gap-1.5 py-2 text-sm font-semibold text-magenta-strong underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-magenta-strong";

  return (
    <li className="border-b border-gray-200 py-6">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <span className="type-h3 text-gray-900">{item.label}</span>
        <div className="flex items-center gap-6">
          <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} className={linkClass.replace("inline-flex", "hidden md:inline-flex")}>
            <MousePointerClick className="h-4 w-4" aria-hidden="true" />
            {open ? "Cerrar prototipo" : "Probar acá"}
          </button>
          <a href={item.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
            Abrir en otra pestaña
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">(se abre en otra pestaña)</span>
          </a>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 hidden overflow-hidden rounded-xl bg-white ring-1 ring-gray-200 md:block"
        >
          <div className="flex items-center gap-1.5 border-b border-gray-200 bg-gray-50 px-4 py-2.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
            <span className="ml-3 truncate text-xs text-gray-500">{item.url.replace("https://", "")}</span>
          </div>
          <iframe
            src={item.url}
            title={`Prototipo interactivo: ${item.label}`}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            className="block h-[70vh] min-h-[28rem] w-full"
          />
        </motion.div>
      )}
    </li>
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
            <motion.p {...reveal} className="type-s2 mb-6 text-gray-700">
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

/** Projects of an experience, or projects inside a project, with the same structure everywhere ("Qué hice" / "Cómo lo abordé" / "Un ejemplo").
 *  A field that is missing is simply not shown. Every project is the same row (hairline on top); the arrow at the top right marks the ones that open. */
export function ProjectList({ projects, onOpen }: { projects: ExperienceProject[]; onOpen?: (slug: string) => void }) {
  // Same cue as the cards of "Experiencia" (OpenCue): the whole row is the link (a stretched link, so there is one tab stop per project).
  const stretch = "after:absolute after:inset-0 after:content-[''] focus-visible:outline-none";

  return (
    <div id="proyectos" className="scroll-mt-28">
      <motion.h2 {...reveal} className={`${h2} mb-10`}>
        Proyectos
      </motion.h2>

      <ol className="space-y-10 lg:space-y-12">
        {projects.map((project, i) => {
          const rows = [
            { label: "Qué hice", text: project.brief },
            ...(project.how ? [{ label: project.howCollective ? "Cómo lo abordamos" : "Cómo lo abordé", text: project.how }] : []),
            ...(project.example ? [{ label: "Un ejemplo", text: project.example }] : []),
          ];

          // The selection frame means "you can click this" (same as the rows of Experiencia in the home). Projects with nowhere to go are plain rows.
          const linkable = !!((project.slug && onOpen) || project.externalLink);

          return (
            <motion.li
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className={`group/open relative border-t border-gray-200 pt-8 lg:pt-10 ${
                linkable ? "cursor-pointer has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-magenta-strong" : ""
              }`}
            >
              <div className="grid gap-8 xl:grid-cols-[1fr_2fr] xl:gap-14">
                <header>
                  <span className="text-gradient-brand text-3xl font-light leading-none tabular-nums" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="type-h3 mt-4 text-gray-900 transition-colors duration-300 group-hover/open:text-magenta-strong">{project.name}</h3>
                </header>

                <div className="lg:pr-14">
                  <dl className="space-y-6">
                    {rows.map((row, index) => (
                      <div key={row.label}>
                        <dt className="type-eyebrow mb-2 text-magenta-strong">{row.label}</dt>
                        <dd className="space-y-3">{paragraphs(row.text, index === 0 ? "type-body text-gray-900" : "type-body text-gray-700")}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              {project.slug && onOpen ? (
                <button type="button" onClick={() => onOpen(project.slug!)} className={stretch}>
                  <OpenCue className="absolute right-0 top-6 lg:top-8" />
                  <span className="sr-only">Ver detalle de {project.name}</span>
                </button>
              ) : project.externalLink ? (
                <a href={project.externalLink.url} target="_blank" rel="noopener noreferrer" title={project.externalLink.label} className={stretch}>
                  <OpenCue className="absolute right-0 top-6 lg:top-8" />
                  <span className="sr-only">
                    {project.externalLink.label} (se abre en otra pestaña)
                  </span>
                </a>
              ) : null}
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}

/** Cover image, projects, my design decisions, screens, prototypes. Open layout: images and decisions without cards. */
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
          <figcaption className="type-caption mt-4 text-gray-600">{data.cover.caption}</figcaption>
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
            <motion.p {...reveal} className="type-s1 mb-10 text-gray-700">
              {data.screensIntro}
            </motion.p>
          )}
          <ScreenGroups groups={data.screenGroups} />
        </div>
      )}

        </div>
      )}

      {data.projects && <ProjectList projects={data.projects} />}

      {/* My design decisions: same light system as the rest of the case — h2, intro, then numbered questions. No card. */}
      {data.decisions && (
        <section id="decisiones" className="scroll-mt-28">
          <div className={`grid gap-14 ${data.decisionsImage ? "xl:grid-cols-[1.25fr_1fr] xl:items-start xl:gap-20" : ""}`}>
            <div>
              <motion.div {...reveal}>
                <h2 className={h2}>Decisiones de diseño</h2>
                {data.decisionsIntro && <p className="type-s2 mt-5 text-gray-700">{data.decisionsIntro}</p>}
              </motion.div>

              {(() => {
                // Number column: wide when the block is full width, narrow next to an image.
                const row = `grid gap-3 sm:grid-cols-[3rem_1fr] sm:gap-6 ${data.decisionsImage ? "" : "xl:grid-cols-[11rem_1fr] xl:gap-10"}`;
                return (
                  <ol className="mt-12 divide-y divide-gray-200 border-t border-gray-200">
                    {data.decisions.map((decision, i) => {
                      return (
                        <motion.li key={decision.title} {...reveal} className={`${row} py-10 lg:py-12`}>
                          <span className="pt-1 text-sm font-medium tabular-nums text-magenta-strong" aria-hidden="true">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <div>
                            <h3 className="type-h3 text-gray-900">{decision.title}</h3>
                            <p className="type-body mt-4 text-gray-800">{decision.text}</p>
                          </div>
                        </motion.li>
                      );
                    })}
                  </ol>
                );
              })()}
            </div>

            {data.decisionsImage && (
              <motion.figure {...reveal} className="mx-auto w-full max-w-sm xl:sticky xl:top-28 xl:max-w-none">
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
            <motion.div {...reveal} className="mb-10 space-y-4">
              {paragraphs(data.prototypesNote, "type-s1 text-gray-700")}
            </motion.div>
          )}
          <ul className="border-t border-gray-200">
            {data.prototypes.map((item) => (
              <PrototypeRow key={item.url} item={item} />
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

      {/* La segunda de las dos imágenes del detalle: siempre acá, justo antes de "Qué aprendí" */}
      <CaseImage image={data.images?.[1]} />

      {/* Result */}

      {/* A later stage of the project, after the main content */}
      {data.nextStage && (
        <motion.div {...reveal} id="siguiente-etapa" className="scroll-mt-28">
          <h2 className={`${h2} mb-5`}>{data.nextStage.title}</h2>
          <div className="space-y-4">{paragraphs(data.nextStage.text, "type-s1 text-gray-700")}</div>
        </motion.div>
      )}
    </div>
  );
}

/** Reflection, in the designer's own words: an h2 and a lead paragraph. It closes the case. */
export function CaseStudyLearned({ data }: { data: { learned?: string } }) {
  if (!data.learned) return null;
  return (
    <motion.div {...reveal} id="aprendi" className="scroll-mt-28 border-t border-gray-200 pt-12 lg:pt-16">
      <h2 className={`${h2} mb-5`}>Qué aprendí</h2>
      <div className="space-y-4">{paragraphs(data.learned, "type-s1 text-gray-700")}</div>
    </motion.div>
  );
}
