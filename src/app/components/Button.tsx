import { ReactNode } from "react";
import { motion } from "motion/react";

interface BaseProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "tertiary";
  /** Which background this button sits on. Only affects "secondary" and "tertiary" — "primary" is solid magenta and reads fine anywhere. */
  theme?: "light" | "dark";
  className?: string;
}

interface ButtonAsButton extends BaseProps {
  onClick?: () => void;
  href?: undefined;
}

interface ButtonAsLink extends BaseProps {
  href: string;
  target?: string;
  rel?: string;
  onClick?: undefined;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const base =
  "inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-[background-color,border-color,box-shadow] duration-200";

const variants = {
  primary: {
    light: "bg-[#cc0058] text-white hover:bg-[#a80048] hover:shadow-[0_4px_20px_rgba(204,0,88,0.4)]",
    dark: "bg-[#cc0058] text-white hover:bg-[#a80048] hover:shadow-[0_4px_20px_rgba(204,0,88,0.4)]",
  },
  secondary: {
    light:
      "border border-white/60 bg-white/30 backdrop-blur-md text-gray-800 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:border-[#cc0058]/50 hover:bg-white/50",
    dark:
      "border border-white/25 bg-white/10 backdrop-blur-md text-white shadow-[0_2px_12px_rgba(0,0,0,0.2)] hover:border-[#ff006e]/60 hover:bg-white/15",
  },
  tertiary: {
    light: "bg-transparent text-[#cc0058] px-2 hover:underline underline-offset-4",
    dark: "bg-transparent text-[#ff006e] px-2 hover:underline underline-offset-4",
  },
};

export function Button({ children, variant = "primary", theme = "light", className = "", ...props }: ButtonProps) {
  const classes = `${base} ${variants[variant][theme]} ${className}`;

  if ("href" in props && props.href) {
    return (
      <motion.a
        href={props.href}
        target={props.target}
        rel={props.rel}
        className={classes}
        whileTap={{ scale: 0.96 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={"onClick" in props ? props.onClick : undefined}
      className={classes}
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </motion.button>
  );
}
