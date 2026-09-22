import { ReactNode, useRef, MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function TiltCard({ children, className = "", onClick }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const hovering = useMotionValue(0);

  const rotateX = useSpring(useTransform(py, [0, 1], [7, -7]), { stiffness: 250, damping: 22 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-7, 7]), { stiffness: 250, damping: 22 });
  const lift = useSpring(useTransform(hovering, [0, 1], [0, -8]), { stiffness: 250, damping: 22 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseEnter = () => hovering.set(1);
  const handleMouseLeave = () => {
    hovering.set(0);
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, y: lift, transformPerspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
