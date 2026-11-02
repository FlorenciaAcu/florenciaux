import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { OpenCue } from "./NavArrow";
import { Sticker } from "./Stickers";
import { handleLinkClick, navigate } from "../lib/router";
import { useI18n } from "../i18n/useI18n";
import type { Concept, MoodboardImage } from "../data/referencias";
import { useReferencias } from "../i18n/editorial";

/** Página pública "Cómo diseñé mi portfolio" (ruta y SEO en data/seo.ts). Cinco secciones: hero, lo que quería transmitir, cómo fue tomando forma,
 *  lo que me inspiró (moodboard, playlist y seis ideas) y el cierre. Las referencias son ideas de diseño, nunca personas ni sitios con nombre.
 *  Mismo ADN que la Home: fondos oscuros con manchas y puntos, hoja de cuaderno, stickers, escala tipográfica del sitio.
 *  El contenido vive en data/referencias.ts. */

const num = (n: number) => String(n + 1).padStart(2, "0");

/** Aparece al entrar en pantalla; sin movimiento si la persona lo pidió. */
export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Número con degradado, el mismo de "Cómo trabajo". */
export function Num({ n, dark = false, className = "" }: { n: number; dark?: boolean; className?: string }) {
  return <span className={`${dark ? "text-gradient-brand-dark" : "text-gradient-brand"} text-3xl font-light leading-none tabular-nums lg:text-5xl ${className}`}>{num(n)}</span>;
}

/** Fondo oscuro de la Home: manchas de color y retícula de puntos. */
export function DarkBackdrop() {
  return (
    <>
      <div className="bg-dot-grid-dark absolute inset-0" style={{ maskImage: "radial-gradient(ellipse 70% 60% at 30% 40%, black 30%, transparent 80%)" }} aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="animate-blob-1 absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-magenta opacity-[0.2] blur-[110px]" />
        <div className="animate-blob-2 absolute -right-32 top-1/3 h-[30rem] w-[30rem] rounded-full bg-cyan opacity-[0.14] blur-[120px]" />
      </div>
    </>
  );
}

/* ───────────── 1. Hero ───────────── */

/** Composición de escritorio: hoja de cuaderno con la lista, sticky notes, banderitas y stickers. Decorativa: el texto ya está en el hero.
 *  Pesa menos que el título: más chica, con sombras suaves y stickers de tamaño medio. */
function Desk() {
  const { ui } = useI18n();
  return (
    <div aria-hidden="true" className="relative mx-auto h-[19rem] w-full max-w-[28rem] sm:h-[22rem]">
      <div className="bg-notebook absolute left-2 top-6 w-[74%] -rotate-[1deg] py-[1.65rem] pl-14 pr-4 shadow-[0_2px_6px_rgba(10,10,10,0.08)] sm:left-3">
        <ul className="type-body text-gray-800">
          {ui.editorial.desk.items.map((l) => (
            <li key={l} className="h-[1.65rem]">
              {l}
            </li>
          ))}
          <li className="h-[1.65rem]" />
          <li className="h-[1.65rem]" />
        </ul>
      </div>
      <div className="absolute right-0 top-0 w-32 rotate-[0.8deg] bg-[#fff3a6] p-3 shadow-[0_2px_4px_rgba(10,10,10,0.12)] sm:w-36">
        <p className="type-title-compact text-gray-900">{ui.editorial.desk.sticky}</p>
      </div>
      <div className="absolute bottom-20 right-2 w-32 -rotate-[1deg] bg-[#ffd6e3] p-3 shadow-[0_2px_4px_rgba(10,10,10,0.12)] sm:w-36">
        <p className="type-caption text-gray-900">{ui.editorial.desk.flags}</p>
      </div>
      <Sticker name="banderitas" size={84} rotate={-8} className="absolute left-0 top-[8.5rem]" />
      <Sticker name="laptop" size={88} rotate={7} className="absolute bottom-0 right-6" />
    </div>
  );
}

function Hero() {
  const { ui, lp } = useI18n();
  const { HERO } = useReferencias();
  return (
    <section data-header-theme="dark" className="relative overflow-hidden bg-surface-dark pb-14 pt-28 md:pb-[5.5rem] md:pt-32">
      <DarkBackdrop />
      <div className="page-container relative grid items-center gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
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
            <span className="text-gray-200">{HERO.eyebrow}</span>
          </nav>
          <h1 className="type-display mb-6 text-white">{HERO.title}</h1>
          <p className="type-s1 text-gray-300">{HERO.text}</p>
        </div>
        <Desk />
      </div>
    </section>
  );
}

/* ───────────── Tarjeta de idea: el mismo patrón en todas las secciones ───────────── */

/** Número, título y descripción, siempre en ese orden y alineados al mismo borde. Lo único que cambia entre tarjetas es el fondo y,
 *  en pocas, un sticker. Mismo padding (p-6 / lg:p-8) y misma separación interna en todas. */
function IdeaCard({
  n,
  title,
  className = "",
  dark = false,
  accent = false,
  sticker,
  children,
}: {
  n: number;
  title: string;
  className?: string;
  dark?: boolean;
  /** Número en magenta liso, para fondos donde el degradado no se lee (amarillo). */
  accent?: boolean;
  sticker?: ReactNode;
  children: ReactNode;
}) {
  return (
    <Reveal className={`relative flex flex-col gap-4 overflow-hidden p-6 lg:p-8 ${className}`}>
      {dark && <div className="bg-dot-grid-dark absolute inset-0" aria-hidden="true" />}
      {accent ? (
        <span className="relative text-3xl font-light leading-none tabular-nums text-magenta-strong lg:text-5xl">{num(n)}</span>
      ) : (
        <Num n={n} className="relative" />
      )}
      <h3 className={`type-h3 relative ${dark ? "text-white" : "text-gray-900"}`}>{title}</h3>
      <div className={`relative space-y-4 ${dark ? "text-gray-300" : "text-gray-700"}`}>{children}</div>
      {sticker}
    </Reveal>
  );
}

/* ───────────── 2. Lo que quería transmitir ───────────── */

/** Grilla de 12 columnas: dos filas de 7/5 y 5/7. Mismo patrón de tarjeta; varían el ancho y el fondo. Un solo sticker. */
function Convey() {
  const { CONVEY } = useReferencias();
  const cards = [
    { span: "lg:col-span-7", bg: "bg-notebook border border-gray-200 pl-14 lg:pl-16", dark: false },
    { span: "lg:col-span-5", bg: "border border-gray-300 bg-white", dark: false },
    { span: "lg:col-span-5", bg: "bg-surface-dark", dark: true },
    { span: "lg:col-span-7", bg: "border border-gray-300 bg-white", dark: false },
  ];
  return (
    <section className="bg-surface-page/90 py-20 lg:py-36">
      <div className="page-container">
        <h2 className="type-h1 mb-5 text-gray-900">{CONVEY.title}</h2>
        <p className="type-s1 mb-14 text-gray-600 lg:mb-20">{CONVEY.text}</p>
        <div className="grid gap-4 lg:grid-cols-12 lg:gap-6">
          {CONVEY.items.map((item, i) => (
            <IdeaCard
              key={item.title}
              n={i}
              title={item.title}
              dark={cards[i].dark}
              className={`${cards[i].bg} ${cards[i].span}`}
              sticker={i === 1 ? <Sticker name="banderitas" size={56} rotate={-8} className="absolute right-6 top-6" /> : undefined}
            >
              <p className="type-body">{item.text}</p>
            </IdeaCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── 3. Cómo fue tomando forma ───────────── */

const SHAPE_CARDS = [
  "bg-notebook border border-gray-300 pl-14 lg:pl-16",
  "bg-surface-dark border border-surface-dark",
  "border border-gray-900 bg-white",
];

/** Comparación entre la primera versión y la actual: dos pestañas accesibles (flechas, Inicio y Fin) que alternan la misma captura. Solo se muestra con las dos capturas reales. */
function Evolution() {
  const { ui } = useI18n();
  const { EVOLUTION } = useReferencias();
  const { before, after } = EVOLUTION;
  const [active, setActive] = useState<0 | 1>(1);
  const id = useId();
  if (!before || !after) return null;
  const versions = [before, after];

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const next = e.key === "ArrowRight" || e.key === "ArrowLeft" ? ((active + 1) % 2) as 0 | 1 : e.key === "Home" ? 0 : e.key === "End" ? 1 : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    document.getElementById(`${id}-tab-${next}`)?.focus();
  };

  return (
    <div className="mt-10 lg:mt-14">
      <div role="tablist" aria-label={ui.editorial.evolutionTabs} className="mb-4 flex gap-8 border-b border-gray-300">
        {versions.map((v, i) => (
          <button
            key={v.label}
            id={`${id}-tab-${i}`}
            role="tab"
            type="button"
            aria-selected={active === i}
            aria-controls={`${id}-panel`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i as 0 | 1)}
            onKeyDown={onKey}
            className={`type-title-compact -mb-px border-b-2 py-3 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta-strong ${
              active === i ? "border-magenta-strong text-gray-900" : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>
      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${active}`}>
        <img src={versions[active].src} alt={versions[active].alt} loading="lazy" className="h-auto w-full border border-gray-300" />
      </div>
    </div>
  );
}

/** Tres momentos en tres columnas iguales, con la misma altura y el número y el título en la misma posición.
 *  La nota de la IA es información de apoyo: su título ocupa la primera columna y su texto las otras dos. */
function Shape() {
  const { SHAPE } = useReferencias();
  return (
    <section className="bg-surface-subtle py-20 lg:py-36">
      <div className="page-container">
        <h2 className="type-h1 mb-5 text-gray-900">{SHAPE.title}</h2>
        <p className="type-s1 mb-14 text-gray-600 lg:mb-20">{SHAPE.text}</p>
        <ol className="grid gap-4 lg:grid-cols-3 lg:gap-6">
          {SHAPE.moments.map((m, i) => (
            <li key={m.title} className="flex flex-col">
              <IdeaCard n={i} title={m.title} dark={i === 1} className={`flex-1 ${SHAPE_CARDS[i]}`}>
                <p className="type-body">{m.text}</p>
              </IdeaCard>
            </li>
          ))}
        </ol>

        <Evolution />

        <aside className="mt-8 grid gap-2 border-t border-gray-300 pt-6 lg:mt-10 lg:grid-cols-3 lg:gap-6">
          <h3 className="type-title-compact text-gray-900">{SHAPE.ai.title}</h3>
          <p className="type-body text-gray-600 lg:col-span-2">{SHAPE.ai.text}</p>
        </aside>
      </div>
    </section>
  );
}

/* ───────────── 4. Lo que me inspiró ───────────── */

/** Las dos imágenes del moodboard, una debajo de la otra y sin marco, con una vista ampliada accesible (<dialog>: Escape, foco y teclado). */
function Moodboard({ images, aside }: { images: MoodboardImage[]; aside?: ReactNode }) {
  const { ui } = useI18n();
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const [current, setCurrent] = useState<MoodboardImage | null>(null);

  if (images.length === 0) return null;

  const open = (img: MoodboardImage, el: HTMLElement) => {
    opener.current = el;
    setCurrent(img);
    dialog.current?.showModal();
  };

  return (
    <div className="mb-12 lg:mb-16">
      <div className="space-y-3 lg:space-y-4">
        {images.map((img) => (
          <button
            key={img.src}
            type="button"
            onClick={(e) => open(img, e.currentTarget)}
            aria-label={ui.case.enlargeImage(img.alt)}
            className="block w-full cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-magenta-strong"
          >
            <img src={img.src} alt={img.alt} loading="lazy" className="h-auto w-full" />
          </button>
        ))}
      </div>
      {aside && <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">{aside}</div>}

      <dialog
        ref={dialog}
        aria-label={ui.editorial.moodboardDialog}
        onClose={() => {
          setCurrent(null);
          opener.current?.focus();
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
        className="fixed inset-0 m-0 h-full max-h-none w-full max-w-none items-center justify-center bg-black/85 p-4 backdrop:bg-black/60 open:flex"
      >
        {current && <img src={current.src} alt={current.alt} className="max-h-[92vh] max-w-full object-contain" />}
        <button
          type="button"
          onClick={() => dialog.current?.close()}
          className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
        >
          <X className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
          <span className="sr-only">{ui.editorial.closeEnlarged}</span>
        </button>
      </dialog>
    </div>
  );
}

/** La playlist, como un detalle dentro de la idea 03 (la de la música). Una línea fina la separa del texto; sin tarjeta propia, sin reproductor ni autoplay.
 *  Enlace real que abre Spotify en otra pestaña. */
function PlaylistLink() {
  const { ui } = useI18n();
  const { PLAYLIST } = useReferencias();
  return (
    <a
      href={PLAYLIST.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group/open mt-5 block border-t border-white/20 pt-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan"
    >
      <span className="type-title-compact block text-white">{PLAYLIST.title}</span>
      <span className="type-caption mt-1 block text-gray-300">{PLAYLIST.text}</span>
      <span className="type-caption mt-3 inline-flex items-center gap-1.5 font-medium text-white underline underline-offset-4 transition-colors group-hover/open:text-cyan group-focus-visible/open:text-cyan">
        {PLAYLIST.cta}
        <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
        <span className="sr-only">{ui.case.opensInNewTab}</span>
      </span>
    </a>
  );
}

/** Las seis ideas en la grilla de 12 columnas: 6/6, 6/6 y 7/5 (la última fila lleva el texto más largo en la columna ancha), ordenadas por número. Todas con el mismo patrón de tarjeta;
 *  varían los fondos. Cada fila junta tarjetas de largo parecido, así que las alturas se parecen sin forzarlas. El único sticker es el de la 04. */
function Concepts() {
  const { CONCEPTS } = useReferencias();
  const [c1, c2, c3, c4, c5, c6] = CONCEPTS as [Concept, Concept, Concept, Concept, Concept, Concept];
  const body = (c: Concept) => c.text.map((p) => <p key={p} className="type-body">{p}</p>);
  return (
    <div className="grid gap-4 lg:grid-cols-12 lg:gap-6">
      <IdeaCard n={0} title={c1.title} className="bg-notebook border border-gray-200 pl-14 lg:col-span-6 lg:pl-16">
        {body(c1)}
      </IdeaCard>
      <IdeaCard n={1} title={c2.title} className="border border-gray-300 bg-white lg:col-span-6">
        {body(c2)}
      </IdeaCard>
      <IdeaCard n={2} title={c3.title} dark className="bg-surface-dark lg:col-span-6">
        {body(c3)}
        <PlaylistLink />
      </IdeaCard>
      <IdeaCard
        n={3}
        title={c4.title}
        accent
        className="border border-gray-300 bg-[#fff3a6] lg:col-span-6"
        sticker={<Sticker name="cat" size={56} rotate={-6} className="absolute bottom-6 right-6" />}
      >
        <p className="type-s1 pr-16 text-gray-900">{c4.quote}</p>
      </IdeaCard>
      <IdeaCard n={4} title={c5.title} className="border border-gray-300 bg-white lg:col-span-7">
        {body(c5)}
      </IdeaCard>
      <IdeaCard n={5} title={c6.title} className="border border-gray-900 bg-white lg:col-span-5">
        {body(c6)}
      </IdeaCard>
    </div>
  );
}

function Inspired() {
  const { INSPIRED, MOODBOARD } = useReferencias();
  return (
    <section className="bg-surface-page/90 py-20 lg:py-36">
      <div className="page-container">
        <div className="mb-14 lg:mb-20">
          <h2 className="type-h1 mb-5 text-gray-900">{INSPIRED.title}</h2>
          <p className="type-s1 text-gray-600">{INSPIRED.text}</p>
        </div>
        <Moodboard images={MOODBOARD} />
        <div className="mt-14 lg:mt-20">
          <Concepts />
        </div>
      </div>
    </section>
  );
}

/* ───────────── 5. De las referencias al resultado ───────────── */

/** Cierre: una conclusión. La frase final va sobre la hoja de cuaderno, que es lo que más pesa en la sección, y debajo el camino a los proyectos.
 *  La frase es un poco más grande que el texto del cuaderno pero conserva su renglón (1.65rem), así sigue apoyada en las líneas. */
function Closing() {
  const { lp } = useI18n();
  const { CLOSING } = useReferencias();
  return (
    <section data-header-theme="dark" className="relative overflow-hidden bg-surface-dark py-16 lg:py-24">
      <DarkBackdrop />
      <div className="page-container relative">
        <h2 className="type-h1 mb-10 text-white lg:mb-14">{CLOSING.title}</h2>

        <Reveal>
          <figure className="-rotate-1 bg-notebook py-[3.3rem] pl-14 pr-8 shadow-[0_2px_6px_rgba(10,10,10,0.08)] lg:max-w-4xl lg:pl-16 lg:pr-16">
            <blockquote className="type-s1 !font-normal !leading-[1.65rem] text-gray-900">{CLOSING.quote}</blockquote>
          </figure>
        </Reveal>

        <a
          href={lp("/proyectos")}
          onClick={(e) => handleLinkClick(e, lp("/proyectos"))}
          className="group/open mt-10 flex items-center justify-between gap-6 border-y border-white/20 py-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan lg:mt-14"
        >
          <span className="type-h3 text-white transition-colors duration-300 group-hover/open:text-cyan">{CLOSING.cta}</span>
          <OpenCue />
        </a>
      </div>
    </section>
  );
}

export function ReferencesPage() {
  return (
    <div className="min-h-screen bg-surface-page">
      <Header />
      <main>
        <Hero />
        <Convey />
        <Shape />
        <Inspired />
        <Closing />
      </main>
      <Footer />
    </div>
  );
}
