import { ReactNode } from "react";
import { motion } from "motion/react";

const INK = "#1b1030";

// Layers, back to front: a dark offset copy (shadow), a fat white copy (sticker border), the artwork.
// Pure vector — CSS filters on these SVGs hang the renderer, so none are used.

const line = { stroke: INK, strokeWidth: 3, strokeLinejoin: "round", strokeLinecap: "round" } as const;

const art: Record<string, ReactNode> = {
  cat: (
    <g {...line}>
      <path d="M17 46 L20 12 L44 30 Z" fill="#f4a259" />
      <path d="M83 46 L80 12 L56 30 Z" fill="#f4a259" />
      <path d="M24 37 L25 21 L36 30 Z" fill="#ffb5c8" stroke="none" />
      <path d="M76 37 L75 21 L64 30 Z" fill="#ffb5c8" stroke="none" />
      <ellipse cx="50" cy="58" rx="36" ry="31" fill="#f4a259" />
      <path d="M50 30 L50 40 M40 32 L42 40 M60 32 L58 40" fill="none" stroke="#c9691c" />
      <ellipse cx="50" cy="69" rx="14" ry="10" fill="#ffe8cf" stroke="none" />
      <ellipse cx="36" cy="56" rx="4.5" ry="6" fill={INK} stroke="none" />
      <ellipse cx="64" cy="56" rx="4.5" ry="6" fill={INK} stroke="none" />
      <circle cx="37.6" cy="54" r="1.7" fill="#fff" stroke="none" />
      <circle cx="65.6" cy="54" r="1.7" fill="#fff" stroke="none" />
      <path d="M46 65 L54 65 L50 70 Z" fill="#ff6b8b" stroke="none" />
      <path d="M50 70 Q50 76 44 76 M50 70 Q50 76 56 76" fill="none" strokeWidth={2.5} />
      <path d="M13 62 L30 66 M13 72 L30 71 M87 62 L70 66 M87 72 L70 71" fill="none" strokeWidth={2} />
      <ellipse cx="26" cy="68" rx="5" ry="3" fill="#ff8fab" opacity={0.6} stroke="none" />
      <ellipse cx="74" cy="68" rx="5" ry="3" fill="#ff8fab" opacity={0.6} stroke="none" />
    </g>
  ),
  mug: (
    <g {...line}>
      <path d="M36 26 Q30 19 36 13 Q42 8 36 3" fill="none" />
      <path d="M52 26 Q46 19 52 13 Q58 8 52 3" fill="none" />
      <path d="M74 44 H83 Q92 44 92 54 Q92 66 80 66 H73" fill="none" />
      <path d="M22 34 H74 V64 Q74 88 48 88 Q22 88 22 64 Z" fill="#ff006e" />
      <ellipse cx="48" cy="34" rx="26" ry="5.5" fill="#8b5a2b" />
      <path d="M60 36 L67 21" fill="none" strokeWidth={2} />
      <rect x="63" y="13" width="12" height="12" rx="2" fill="#fff" transform="rotate(14 69 19)" />
      <path d="M48 76 C36 68 34 58 42 56 C46 55 48 58 48 60 C48 58 50 55 54 56 C62 58 60 68 48 76 Z" fill="#fff" stroke="none" />
    </g>
  ),
  pizza: (
    <g {...line}>
      <path d="M10 26 Q50 8 90 26 L50 94 Z" fill="#ffc84a" />
      <path d="M8 27 Q50 6 92 27 Q92 35 85 34 Q50 20 15 34 Q8 35 8 27 Z" fill="#e5a04b" />
      <circle cx="38" cy="46" r="7" fill="#d7263d" strokeWidth={2.5} />
      <circle cx="63" cy="48" r="7" fill="#d7263d" strokeWidth={2.5} />
      <circle cx="50" cy="69" r="6" fill="#d7263d" strokeWidth={2.5} />
    </g>
  ),
  fries: (
    <g {...line}>
      <rect x="24" y="14" width="10" height="46" rx="3" fill="#ffd23f" transform="rotate(-14 29 60)" />
      <rect x="34" y="8" width="10" height="52" rx="3" fill="#ffd23f" transform="rotate(-6 39 60)" />
      <rect x="45" y="6" width="10" height="54" rx="3" fill="#ffd23f" />
      <rect x="56" y="10" width="10" height="50" rx="3" fill="#ffd23f" transform="rotate(7 61 60)" />
      <rect x="66" y="16" width="10" height="44" rx="3" fill="#ffd23f" transform="rotate(15 71 60)" />
      <path d="M20 52 H80 L73 91 Q72.6 94 70 94 H30 Q27.4 94 27 91 Z" fill="#e63946" />
      <path d="M24 66 H76 L74 79 H26 Z" fill="#fff" stroke="none" />
    </g>
  ),
  swim: (
    <g {...line}>
      <path d="M15 50 Q3 52 4 66" fill="none" stroke="#263159" strokeWidth={6} />
      <path d="M85 50 Q97 52 96 66" fill="none" stroke="#263159" strokeWidth={6} />
      <rect x="45" y="46" width="10" height="7" rx="2.5" fill="#263159" strokeWidth={2} />
      <ellipse cx="32" cy="50" rx="19" ry="15" fill="#00c2e0" stroke="#263159" strokeWidth={4} />
      <ellipse cx="68" cy="50" rx="19" ry="15" fill="#00c2e0" stroke="#263159" strokeWidth={4} />
      <path d="M21 45 Q26 39 34 40 M57 45 Q62 39 70 40" fill="none" stroke="#fff" strokeWidth={3} />
      <path d="M8 80 Q18 72 28 80 T48 80 T68 80 T88 80" fill="none" stroke="#00b8d4" strokeWidth={5} />
      <path d="M8 92 Q18 84 28 92 T48 92 T68 92 T88 92" fill="none" stroke="#7fe3f2" strokeWidth={5} />
    </g>
  ),
  pilates: (
    <g {...line}>
      <circle cx="50" cy="46" r="32" fill="#b388ff" />
      <path d="M50 14 Q28 46 50 78 M50 14 Q72 46 50 78 M18 46 Q50 56 82 46" fill="none" strokeWidth={2.5} />
      <path d="M30 32 Q36 24 46 22" fill="none" stroke="#fff" strokeWidth={4} opacity={0.85} />
      <rect x="12" y="82" width="76" height="12" rx="6" fill="#ff006e" />
      <path d="M22 88 H78" fill="none" stroke="#fff" strokeWidth={2.5} opacity={0.7} />
    </g>
  ),
  laptop: (
    <g {...line}>
      <rect x="14" y="20" width="72" height="48" rx="5" fill="#2b2b3a" />
      <path d="M6 72 H94 L88 80 Q87 82 84 82 H16 Q13 82 12 80 Z" fill="#c8ccd6" />
      <g stroke="none">
        <path d="M50 28 H45 A5 5 0 0 0 45 38 H50 Z" fill="#f24e1e" />
        <path d="M50 28 H55 A5 5 0 0 1 55 38 H50 Z" fill="#ff7262" />
        <path d="M50 38 H45 A5 5 0 0 0 45 48 H50 Z" fill="#a259ff" />
        <circle cx="55" cy="43" r="5" fill="#1abcfe" />
        <path d="M45 48 A5 5 0 0 0 45 58 A5 5 0 0 0 50 53 V48 Z" fill="#0acf83" />
      </g>
    </g>
  ),
  flag: (
    <g {...line}>
      <rect x="6" y="14" width="4" height="74" rx="2" fill="#5b4636" />
      <path d="M10 22 Q30 12 50 22 T90 22 V62 Q70 72 50 62 T10 62 Z" fill="#74acdf" />
      <path d="M10 35 Q30 25 50 35 T90 35 V49 Q70 59 50 49 T10 49 Z" fill="#fff" stroke="none" />
      <path d="M10 22 Q30 12 50 22 T90 22 V62 Q70 72 50 62 T10 62 Z" fill="none" />
      <circle cx="50" cy="42" r="5" fill="#f6b40e" strokeWidth={1.5} stroke="#85340a" />
    </g>
  ),

  // Client / project stickers (used on the detail pages)
  pump: (
    <g {...line}>
      <path d="M62 24 Q76 10 90 24" fill="none" stroke="#00b8d4" strokeWidth={4} />
      <path d="M68 30 Q76 22 84 30" fill="none" stroke="#00b8d4" strokeWidth={4} />
      <circle cx="76" cy="37" r="3.5" fill="#00b8d4" strokeWidth={2} />
      <path d="M60 52 Q80 52 80 68 V78" fill="none" strokeWidth={4.5} />
      <rect x="73" y="76" width="14" height="14" rx="3" fill="#ffd23f" />
      <rect x="14" y="20" width="46" height="70" rx="6" fill="#ff006e" />
      <rect x="21" y="28" width="32" height="18" rx="3" fill="#0a0a0a" />
      <path d="M26 37 H48" fill="none" stroke="#00e5ff" strokeWidth={3} />
      <rect x="21" y="54" width="32" height="8" rx="2" fill="#fff" />
      <rect x="8" y="86" width="58" height="9" rx="3" fill="#2b2b3a" />
    </g>
  ),
  code: (
    <g {...line}>
      <rect x="8" y="14" width="84" height="72" rx="12" fill="#2b2b3a" />
      <circle cx="21" cy="27" r="3.5" fill="#ff006e" strokeWidth={1.5} />
      <circle cx="32" cy="27" r="3.5" fill="#ffd23f" strokeWidth={1.5} />
      <circle cx="43" cy="27" r="3.5" fill="#0acf83" strokeWidth={1.5} />
      <path d="M36 47 L23 59 L36 71" fill="none" stroke="#00e5ff" strokeWidth={6} />
      <path d="M64 47 L77 59 L64 71" fill="none" stroke="#ff006e" strokeWidth={6} />
      <path d="M55 43 L45 75" fill="none" stroke="#fff" strokeWidth={5} />
    </g>
  ),
  health: (
    <g {...line}>
      <path d="M50 90 C8 62 6 30 29 23 C41 20 50 29 50 36 C50 29 59 20 71 23 C94 30 92 62 50 90 Z" fill="#ff006e" />
      <path d="M44 40 H56 V50 H66 V62 H56 V72 H44 V62 H34 V50 H44 Z" fill="#fff" stroke="none" />
      <path d="M20 38 Q22 31 30 30" fill="none" stroke="#fff" strokeWidth={4} opacity={0.7} />
    </g>
  ),
  agro: (
    <g {...line}>
      <path d="M64 64 L88 88" fill="none" stroke={INK} strokeWidth={13} />
      <path d="M64 64 L88 88" fill="none" stroke="#c9691c" strokeWidth={7} />
      <circle cx="42" cy="42" r="30" fill="#c8f0b0" />
      <path d="M42 66 V28" fill="none" stroke="#5b8c2a" strokeWidth={3} />
      <g fill="#e5a04b" strokeWidth={2}>
        <ellipse cx="42" cy="22" rx="4" ry="7" />
        <ellipse cx="34" cy="34" rx="4" ry="7" transform="rotate(-32 34 34)" />
        <ellipse cx="50" cy="34" rx="4" ry="7" transform="rotate(32 50 34)" />
        <ellipse cx="34" cy="47" rx="4" ry="7" transform="rotate(-32 34 47)" />
        <ellipse cx="50" cy="47" rx="4" ry="7" transform="rotate(32 50 47)" />
      </g>
      <path d="M22 30 Q26 21 34 18" fill="none" stroke="#fff" strokeWidth={3.5} opacity={0.85} />
    </g>
  ),
  cylinder: (
    <g {...line}>
      <rect x="44" y="8" width="12" height="16" rx="3" fill="#c8ccd6" />
      <path d="M38 8 H62" fill="none" strokeWidth={4} />
      <path d="M30 42 Q30 22 50 22 Q70 22 70 42 V78 Q70 94 50 94 Q30 94 30 78 Z" fill="#29b6f6" />
      <rect x="30" y="48" width="40" height="24" fill="#fff" />
      <text
        x="50"
        y="66"
        textAnchor="middle"
        fontSize="16"
        fontWeight="800"
        fill={INK}
        stroke="none"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        GNC
      </text>
      <path d="M37 34 Q38 28 44 26" fill="none" stroke="#fff" strokeWidth={3.5} opacity={0.8} />
    </g>
  ),
  scales: (
    <g {...line}>
      <path d="M20 34 L8 60 M20 34 L32 60 M80 34 L68 60 M80 34 L92 60" fill="none" strokeWidth={2.5} />
      <rect x="46" y="20" width="8" height="62" fill="#ffc84a" />
      <rect x="12" y="26" width="76" height="9" rx="4.5" fill="#ffc84a" />
      <circle cx="50" cy="18" r="6.5" fill="#ffc84a" />
      <path d="M6 60 H34 Q34 75 20 75 Q6 75 6 60 Z" fill="#ff006e" />
      <path d="M66 60 H94 Q94 75 80 75 Q66 75 66 60 Z" fill="#00b8d4" />
      <rect x="28" y="80" width="44" height="11" rx="3.5" fill="#ffc84a" />
    </g>
  ),
};

export type StickerName = keyof typeof art;

/** Each detail page gets a sticker about its client or project, so none repeats (the cat stays for the home hero). */
const detailStickers: Record<string, StickerName> = {
  cintelink: "pump", // fuel dispenser with an IoT signal
  consultoria: "laptop", // laptop with Figma
  folcode: "code", // software company
  cemico: "health", // health sector
  "buscador-agricola": "agro", // agro search: wheat under a magnifier
  "juan-gas-gnc": "cylinder", // GNC cylinder
  "juan-audagno": "scales", // law firm
};

export function detailSticker(slug: string): StickerName {
  return detailStickers[slug] ?? "cat";
}

interface StickerProps {
  name: StickerName;
  size?: number;
  rotate?: number;
  label?: string;
  className?: string;
  delay?: number;
  /** When set, the sticker pops in when this turns true instead of on scroll-into-view (used to wait for the splash). */
  active?: boolean;
}

export function Sticker({ name, size = 84, rotate = 0, label, className = "", delay = 0, active }: StickerProps) {
  const shown = { opacity: 1, scale: 1, rotate };
  const trigger = active === undefined ? { whileInView: shown } : { animate: active ? shown : undefined };
  return (
    <motion.figure
      initial={{ opacity: 0, scale: 0.6, rotate: rotate - 14 }}
      {...trigger}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ type: "spring", stiffness: 260, damping: 15, delay }}
      whileHover={{ rotate: rotate + 9, scale: 1.12 }}
      className={`m-0 inline-flex flex-col items-center gap-2 select-none ${className}`}
    >
      <svg viewBox="-8 -8 116 120" width={size} height={(size * 120) / 116} aria-hidden="true">
        <g className="sticker-shadow" transform="translate(0 5)">{art[name]}</g>
        <g className="sticker-outline">{art[name]}</g>
        {art[name]}
      </svg>
      {label && <figcaption className="text-xs font-medium text-gray-700 text-center leading-tight">{label}</figcaption>}
    </motion.figure>
  );
}
