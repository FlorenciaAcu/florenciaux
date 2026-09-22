import { motion } from "motion/react";
import { ArrowLeft, ArrowUpRight, MapPin } from "lucide-react";
import { ReactNode } from "react";
import { Sticker, type StickerName } from "./Stickers";

interface DetailHeroProps {
  title: string;
  tagline?: string;
  onBack: () => void;
  backLabel: string;
  /** A personal touch that sits beside the title (desktop only). */
  sticker?: StickerName;
  /** Optional plain-text references under the title. */
  location?: string;
  website?: { label: string; url: string };
  children?: ReactNode;
}

/** Detail-page header: back button + title, framed like a layer selected in a design tool (same motif as the home hero).
 *  Anything else is optional and stays plain text — no chips. */
export function DetailHero({ title, tagline, onBack, backLabel, sticker, location, website, children }: DetailHeroProps) {
  return (
    <div data-header-theme="dark" className="relative overflow-hidden bg-[#0a0a0a] pt-14 pb-16 lg:pt-20 lg:pb-24">
      {/* Dot grid + neon blobs — same dark language as the home hero */}
      <div
        className="bg-dot-grid-dark absolute inset-0"
        style={{ maskImage: "radial-gradient(ellipse 70% 80% at 25% 55%, black 25%, transparent 80%)" }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="animate-blob-1 absolute -top-32 -left-20 h-96 w-96 rounded-full bg-[#ff006e] opacity-[0.24] blur-[110px]" />
        <div className="animate-blob-2 absolute top-1/4 -right-32 h-[28rem] w-[28rem] rounded-full bg-[#00e5ff] opacity-[0.16] blur-[120px]" />
        <div className="animate-blob-3 absolute -bottom-16 left-1/3 h-72 w-72 rounded-full bg-[#ff006e] opacity-[0.14] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <button
            onClick={onBack}
            aria-label={backLabel}
            className="mb-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-gray-300 transition-colors duration-200 hover:border-[#ff006e] hover:bg-[#ff006e]/10 hover:text-white lg:mb-14"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </button>

          <div className="relative">
            <h1 className="max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
              <span className="relative inline-block">
                {title}

                {/* selection frame */}
                <motion.span
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-x-3 -inset-y-2 rounded-sm border border-[#00e5ff]"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 0.9, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  {["-left-1 -top-1", "-right-1 -top-1", "-left-1 -bottom-1", "-right-1 -bottom-1"].map((pos) => (
                    <span key={pos} className={`absolute ${pos} h-2 w-2 border border-[#00e5ff] bg-white`} />
                  ))}
                </motion.span>
              </span>
            </h1>

            {sticker && (
              <div className="pointer-events-none absolute bottom-0 right-6 hidden md:block lg:right-16" aria-hidden="true">
                <div className="pointer-events-auto">
                  <Sticker name={sticker} size={104} rotate={8} delay={0.7} />
                </div>
              </div>
            )}
          </div>

          {(location || website) && (
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-300">
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
                  className="inline-flex items-center gap-1.5 font-medium text-[#00e5ff] underline-offset-4 hover:underline"
                >
                  {website.label}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">(se abre en otra pestaña)</span>
                </a>
              )}
            </div>
          )}

          {tagline && <p className="mt-6 max-w-2xl text-base leading-relaxed text-gray-300 lg:text-lg">{tagline}</p>}

          {children}
        </motion.div>
      </div>
    </div>
  );
}
