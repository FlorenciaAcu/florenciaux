import { IsologoFA } from "./IsologoFA";
import { Heart, Coffee } from "lucide-react";
import { CV_URL, EMAIL, LINKEDIN_URL, MEDIUM_URL } from "../data/contact";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const go = (hash: string) => {
    window.location.hash = hash;
  };

  return (
    <footer data-header-theme="dark" className="bg-surface-dark py-16">
      <div className="page-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <IsologoFA size={28} variant="light" />
              <p className="font-semibold text-white">Florencia Acuña</p>
            </div>
            <p className="text-sm text-gray-400">Product Designer · San Juan, Argentina</p>
          </div>

          {/* Nav: a labelled navigation landmark; the group label keeps its small eyebrow look */}
          <nav className="space-y-3" aria-labelledby="footer-nav-title">
            <p id="footer-nav-title" className="type-eyebrow text-gray-400 mb-4">
              Navegación
            </p>
            <ul className="space-y-2">
              {[
                { label: "Inicio", hash: "#/" },
                { label: "Sobre mí", hash: "#/sobre-mi" },
                { label: "Proyectos", hash: "#/proyectos" },
                { label: "Experiencia", hash: "#/experiencia" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.hash}
                    onClick={(e) => {
                      e.preventDefault();
                      go(item.hash);
                    }}
                    className="text-sm text-gray-400 hover:text-magenta transition-colors text-left"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Links */}
          <div className="space-y-3">
            <p id="footer-contact-title" className="type-eyebrow text-gray-400 mb-4">
              Contacto
            </p>
            <ul className="space-y-2" aria-labelledby="footer-contact-title">
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-sm text-gray-400 hover:text-magenta transition-colors"
                >
                  {EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-magenta transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={MEDIUM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-magenta transition-colors"
                >
                  Medium
                </a>
              </li>
              <li>
                <a
                  href={CV_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-magenta transition-colors"
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
            <p className="text-xs text-gray-400">Diseñado teniendo en cuenta criterios de accesibilidad.</p>
          </div>
          <p className="inline-flex items-center gap-1 text-xs text-gray-400">
            Hecho con <Heart className="w-3.5 h-3.5 text-magenta fill-magenta" /> y mucho tecito <Coffee className="w-3.5 h-3.5 text-magenta" />
          </p>
        </div>
      </div>
    </footer>
  );
}
