import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { IsologoFA } from "./IsologoFA";
import { Button } from "./Button";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Layout effect: pick the right theme before the first paint (no flash of a light header over the dark hero).
  useLayoutEffect(() => {
    // Dark when a dark section sits behind the header's vertical midpoint — i.e. behind most of it, not just grazing its edge.
    const checkTheme = () => {
      const mid = (headerRef.current?.offsetHeight ?? 64) / 2;
      const darkSections = document.querySelectorAll('[data-header-theme="dark"]');
      let dark = false;
      darkSections.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= mid && rect.bottom > mid) dark = true;
      });
      setIsDark(dark);
    };
    checkTheme();
    window.addEventListener("scroll", checkTheme, { passive: true });
    window.addEventListener("resize", checkTheme);
    return () => {
      window.removeEventListener("scroll", checkTheme);
      window.removeEventListener("resize", checkTheme);
    };
  }, []);

  const go = (hash: string) => {
    window.location.hash = hash;
    setIsMobileMenuOpen(false);
  };

  // Contact options (video call / WhatsApp) live at the bottom of the page; on pages without that block, go home and scroll there.
  const goContact = () => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById("contacto");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else window.location.hash = "#/contacto";
  };

  const navItems = [
    { label: "Inicio", hash: "#/" },
    { label: "Sobre mí", hash: "#/sobre-mi" },
    { label: "Proyectos", hash: "#/proyectos" },
    { label: "Servicios", hash: "#/servicios" },
    { label: "Experiencia", hash: "#/experiencia" },
  ];

  return (
    <header ref={headerRef} className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${isDark ? "glass-header-dark" : "glass-header"}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => go("#/")}
          className="flex items-center gap-2.5 rounded-full hover:opacity-80 transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff006e] focus-visible:ring-offset-2"
          aria-label="Ir al inicio"
        >
          <IsologoFA variant={isDark ? "light" : "dark"} />
          <span className={`font-medium text-base transition-colors duration-300 ${isDark ? "text-white" : "text-gray-900"}`}>
            Florencia Acuña
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => go(item.hash)}
              className={`group relative py-1 text-sm transition-colors duration-300 ${
                isDark ? "text-white/90 hover:text-white" : "text-gray-700 hover:text-gray-900"
              }`}
            >
              {item.label}
              <span className="absolute left-0 -bottom-0.5 h-[2px] w-full origin-left scale-x-0 bg-[#cc0058] transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </button>
          ))}
          <Button onClick={goContact}>
            Contactar
          </Button>
        </nav>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden relative z-50 transition-colors duration-300 ${
            isDark && !isMobileMenuOpen ? "text-white" : "text-gray-900"
          }`}
          aria-label="Toggle mobile menu"
        >
          <svg
            className={`w-6 h-6 transition-transform duration-300 ${isMobileMenuOpen ? "rotate-90" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen z-40 bg-[#fafafa] transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="pt-20 px-6">
          <nav className="flex flex-col">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => go(item.hash)}
                className="text-left py-5 border-b border-gray-100 text-gray-700 text-lg font-medium hover:text-[#cc0058] transition-colors"
              >
                {item.label}
              </button>
            ))}
            <div className="pt-6">
              <Button onClick={goContact} className="w-full">
                Contactar
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
