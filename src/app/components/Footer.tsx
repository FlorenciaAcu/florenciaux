import { IsologoFA } from "./IsologoFA";
import { Heart, Coffee } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const go = (hash: string) => {
    window.location.hash = hash;
  };

  return (
    <footer data-header-theme="dark" className="bg-[#0a0a0a] py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <IsologoFA size={28} variant="light" />
              <p className="font-semibold text-white">Florencia Acuña</p>
            </div>
            <p className="text-sm text-gray-400">Product Designer · San Juan, Argentina</p>
          </div>

          {/* Nav */}
          <div className="space-y-3">
            <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-4">
              Navegación
            </p>
            <ul className="space-y-2">
              {[
                { label: "Inicio", action: () => go("#/") },
                { label: "Sobre mí", action: () => go("#/sobre-mi") },
                { label: "Proyectos", action: () => go("#/proyectos") },
                { label: "Servicios", action: () => go("#/servicios") },
                { label: "Experiencia", action: () => go("#/experiencia") },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={item.action}
                    className="text-sm text-gray-400 hover:text-[#ff006e] transition-colors text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div className="space-y-3">
            <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-4">
              Contacto
            </p>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:contact@florenciaux.com"
                  className="text-sm text-gray-400 hover:text-[#ff006e] transition-colors"
                >
                  contact@florenciaux.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/florencia-acuna-ux/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-[#ff006e] transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://medium.com/@florenciaacuna"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-[#ff006e] transition-colors"
                >
                  Medium
                </a>
              </li>
              <li>
                <a
                  href="https://docs.google.com/document/d/1O70FGTcqo2q0tnwgErOQUlcODUc8LEDuZI0w3G4l9do/edit?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-[#ff006e] transition-colors"
                >
                  CV
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <p className="text-xs text-gray-400">
              © {currentYear} Florencia Acuña. Todos los derechos reservados.
            </p>
            <p className="text-xs text-gray-400">Diseñado con criterios de accesibilidad WCAG AA.</p>
          </div>
          <p className="inline-flex items-center gap-1 text-xs text-gray-400">
            Hecho con <Heart className="w-3.5 h-3.5 text-[#ff006e] fill-[#ff006e]" /> y mucho tecito <Coffee className="w-3.5 h-3.5 text-[#ff006e]" />
          </p>
        </div>
      </div>
    </footer>
  );
}
