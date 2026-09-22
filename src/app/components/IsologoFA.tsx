export function IsologoFA({ size = 28, variant = "dark" }: { size?: number; variant?: "dark" | "light" }) {
  const bg = variant === "dark" ? "#111111" : "#ff006e";
  const fg = variant === "dark" ? "white" : "#0a0a0a";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="FA isologo"
    >
      <rect width="28" height="28" rx="6" fill={bg} />
      <text
        x="14"
        y="20"
        textAnchor="middle"
        fontFamily="Space Grotesk, sans-serif"
        fontWeight="700"
        fontSize="13"
        fill={fg}
        letterSpacing="-0.5"
      >
        FA
      </text>
    </svg>
  );
}
