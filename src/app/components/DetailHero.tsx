import { motion } from "motion/react";
import { ArrowLeft, ArrowUpRight, ChevronRight, MapPin } from "lucide-react";
import { ReactNode } from "react";
import { Sticker, type StickerName } from "./Stickers";

interface DetailHeroProps {
  title: string;
  tagline?: string;
  onBack: () => void;
  backLabel: string;
  /** Path to this page, like the breadcrumb of a code editor ("Experiencia / Cintelink"). The last one is the current page. */
  crumbs?: { label: string; onClick?: () => void }[];
  /** A personal touch that sits beside the title (desktop only). */
  sticker?: StickerName;
  /** Optional plain-text references under the title. */
  location?: string;
  website?: { label: string; url: string };
  children?: ReactNode;
}

/** Detail-page header: back button + project canvas. Optional references stay plain text — no chips. */
export function DetailHero({ title, tagline, onBack, backLabel, crumbs, sticker, location, website, children }: DetailHeroProps) {
  return (
    <div data-header-theme="dark" className="relative overflow-hidden bg-[#0a0a0a] pt-12 pb-14 md:pt-16 md:pb-[5.5rem]">
      {/* Dot grid + neon blobs — same dark language as the home hero */}
      <div
        className="bg-dot-grid-dark absolute inset-0 opacity-[0.48]"
        style={{ maskImage: "radial-gradient(ellipse 70% 80% at 25% 55%, black 25%, transparent 80%)" }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.48]" aria-hidden="true">
        <div className="animate-blob-1 absolute -top-32 -left-20 h-96 w-96 rounded-full bg-[#ff006e] opacity-[0.24] blur-[110px]" />
        <div className="animate-blob-2 absolute top-1/4 -right-32 h-[28rem] w-[28rem] rounded-full bg-[#00e5ff] opacity-[0.16] blur-[120px]" />
        <div className="animate-blob-3 absolute -bottom-16 left-1/3 h-72 w-72 rounded-full bg-[#ff006e] opacity-[0.14] blur-[100px]" />
      </div>

      <div className="page-container relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <div className="mb-6 flex items-center gap-4 md:mb-7">
            <button
              onClick={onBack}
              aria-label={backLabel}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-gray-300 transition-colors duration-200 hover:border-[#ff006e] hover:bg-[#ff006e]/10 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </button>

            {crumbs && (
              <nav aria-label="Ruta" className="min-w-0">
                <ol className="type-caption flex items-center gap-2 text-gray-400">
                  {crumbs.map((crumb, i) => {
                    const last = i === crumbs.length - 1;
                    return (
                      <li key={crumb.label} className="flex min-w-0 items-center gap-2">
                        {i > 0 && <ChevronRight className="h-3 w-3 shrink-0 text-gray-500" aria-hidden="true" />}
                        {crumb.onClick && !last ? (
                          <button type="button" onClick={crumb.onClick} className="py-1.5 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00e5ff]">
                            {crumb.label}
                          </button>
                        ) : (
                          <span aria-current={last ? "page" : undefined} className={`truncate ${last ? "text-white" : ""}`}>
                            {crumb.label}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ol>
              </nav>
            )}
          </div>

          <div className="relative border border-white/[0.18] bg-white/[0.025] px-5 pt-8 pb-9 md:pt-12 md:pr-48 md:pb-11 md:pl-12">
            {["-left-1 -top-1", "-right-1 -top-1", "-bottom-1 -left-1", "-bottom-1 -right-1"].map((position) => (
              <span key={position} className={`pointer-events-none absolute h-2 w-2 border border-[#00e5ff] bg-white ${position}`} aria-hidden="true" />
            ))}

            <h1 className="type-h1 max-w-3xl !text-[2.5rem] !leading-[1.08] text-white md:!text-[4rem] md:!leading-[1.05]">
              {title}
            </h1>

            {sticker && (
              <div className="pointer-events-none absolute right-8 top-6 hidden origin-top-right scale-[0.78] md:block" aria-hidden="true">
                <div className="pointer-events-auto">
                  <Sticker name={sticker} size={104} rotate={8} delay={0.7} />
                </div>
              </div>
            )}
          </div>

          {(location || website) && (
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border border-t-0 border-white/[0.18] bg-black/[0.16] px-5 py-4 text-sm text-gray-300 md:px-12 md:pb-[1.125rem]">
              {location && (
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#ff006e]" aria-hidden="true" />
                  {location}
                </span>
              )}
              {website && (
                <a
                  href={website.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 py-1.5 font-medium text-[#00e5ff] underline underline-offset-4"
                >
                  {website.label}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">(se abre en otra pestaña)</span>
                </a>
              )}
            </div>
          )}

          {tagline && <p className="type-s1 mt-6 max-w-2xl text-gray-300">{tagline}</p>}

          {children}
        </motion.div>
      </div>
    </div>
  );
}
