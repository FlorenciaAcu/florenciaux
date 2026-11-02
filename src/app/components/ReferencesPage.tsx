import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Disc3, X } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Sticker } from "./Stickers";
import { navigate } from "../lib/router";
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

/** El cuaderno, como único protagonista visual: una hoja con lo que cuenta cada caso del portfolio (contexto, participación, decisiones y aprendizajes).
 *  La hoja de las decisiones va marcada con resaltador y una banderita, porque es lo que más quería mostrar. Es solo ilustración: el texto ya está en la página, así que queda
 *  fuera del árbol de accesibilidad. El renglón es 1.65rem, igual al interlineado de `type-body`, y las líneas de texto apoyan sobre la hoja. */
const MARKED = 2;

function Notebook() {
  const { HERO } = useReferencias();
  return (
    <div aria-hidden="true" className="w-full max-w-[24rem] pr-10 lg:ml-auto">
      <div className="bg-notebook -rotate-[1deg] py-[1.65rem] pl-14 pr-5 shadow-[0_2px_6px_rgba(10,10,10,0.08)]">
        <ul className="type-body">
          {HERO.notebook.map((line, i) => (
            <li key={line} className={`relative h-[1.65rem] ${i > 0 ? "mt-[0.4rem] sm:mt-[1.65rem]" : ""}`}>
              {i === MARKED ? (
                <>
                  <span className="-mx-1 bg-[rgba(255,0,110,0.16)] px-1 font-medium text-gray-900">{line}</span>
                  <span className="absolute left-full top-1/2 ml-5 h-4 w-10 -translate-y-1/2 bg-magenta" />
                </>
              ) : (
                <span className="text-gray-700">{line}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Hero() {
  const { ui, lp } = useI18n();
  const { HERO } = useReferencias();
  return (
    <section data-header-theme="dark" className="relative overflow-hidden bg-surface-dark pb-14 pt-28 md:pb-[5.5rem] md:pt-32">
      <DarkBackdrop />
      <div className="page-container relative grid items-center gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
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
          <h1 className="type-h1 mb-6 max-w-3xl !text-[2.5rem] !leading-[1.08] text-white md:!text-[4rem] md:!leading-[1.05]">{HERO.title}</h1>
          <p className="type-s1 text-gray-300">{HERO.text}</p>
        </div>
        <Notebook />
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
    <section className="bg-surface-page/90 py-16 lg:py-28">
      <div className="page-container">
        <h2 className="type-h2 mb-5 text-gray-900">{CONVEY.title}</h2>
        <p className="type-s1 mb-10 text-gray-600 lg:mb-14">{CONVEY.text}</p>
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
    <section className="bg-surface-subtle py-16 lg:py-28">
      <div className="page-container">
        <h2 className="type-h2 mb-5 text-gray-900">{SHAPE.title}</h2>
        <p className="type-s1 mb-10 text-gray-600 lg:mb-14">{SHAPE.text}</p>
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
    <section className="bg-surface-page/90 py-16 lg:py-28">
      <div className="page-container">
        <div className="mb-10 lg:mb-14">
          <h2 className="type-h2 mb-5 text-gray-900">{INSPIRED.title}</h2>
          <p className="type-s1 text-gray-600">{INSPIRED.text}</p>
        </div>
        <Moodboard images={MOODBOARD} />
        <div className="mt-10 lg:mt-14">
          <Concepts />
        </div>
      </div>
    </section>
  );
}

/* ───────────── 5. De las referencias al resultado ───────────── */

/** Cierre: una conclusión, sin llamada a la acción. La frase final va sobre la hoja de cuaderno, que es lo que más pesa en la sección, y debajo, como un detalle personal,
 *  el acceso a la playlist (enlace real que abre Spotify en otra pestaña). La frase es un poco más grande que el texto del cuaderno pero conserva su renglón (1.65rem),
 *  así sigue apoyada en las líneas. */
function Closing() {
  const { ui } = useI18n();
  const { CLOSING, PLAYLIST } = useReferencias();
  return (
    <section data-header-theme="dark" className="relative overflow-hidden bg-surface-dark py-16 lg:py-24">
      <DarkBackdrop />
      <div className="page-container relative">
        <h2 className="type-h2 mb-10 text-white lg:mb-14">{CLOSING.title}</h2>

        <Reveal>
          <figure className="-rotate-1 bg-notebook py-[3.3rem] pl-14 pr-8 shadow-[0_2px_6px_rgba(10,10,10,0.08)] lg:max-w-4xl lg:pl-16 lg:pr-16">
            <blockquote className="type-s1 !font-normal !leading-[1.65rem] text-gray-900">{CLOSING.quote}</blockquote>
          </figure>
        </Reveal>

        <a
          href={PLAYLIST.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group/open type-caption mt-10 inline-flex items-center gap-2 text-gray-300 transition-colors hover:text-cyan focus-visible:text-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan"
        >
          <Disc3 className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          <span className="underline underline-offset-4">{PLAYLIST.text}</span>
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          <span className="sr-only">{ui.case.opensInNewTab}</span>
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
