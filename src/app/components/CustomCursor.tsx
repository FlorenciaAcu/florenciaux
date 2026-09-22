import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { PawPrint } from "lucide-react";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [overIframe, setOverIframe] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 1200, damping: 50, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 1200, damping: 50, mass: 0.2 });

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-active");

    // Position tracking stays lightweight — no DOM traversal here, so it never drops frames
    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    // Hover detection runs separately, only when the pointer enters a new element
    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Over an embedded page (booking iframe) the browser stops sending us mouse moves, so hide the paw and let the native cursor take over.
      setOverIframe(target.tagName === "IFRAME");
      setIsHovering(!!target.closest('a, button, [role="button"], [class*="cursor-pointer"]'));
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mouseover", handleOver, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999]"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%", opacity: overIframe ? 0 : 1 }}
    >
      <motion.div
        animate={{ scale: isHovering ? 1.4 : 1, rotate: isHovering ? -12 : 0 }}
        transition={{ type: "spring", stiffness: 350, damping: 18 }}
      >
        <PawPrint
          size={26}
          fill={isHovering ? "#a80048" : "#ff006e"}
          stroke="white"
          strokeWidth={1.5}
          style={{
            transition: "fill 150ms ease",
            filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.35))",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
