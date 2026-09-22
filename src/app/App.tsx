import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { DesignCodeToggle } from "./components/DesignCodeToggle";
import { AboutSection } from "./components/AboutSection";
import { ThinkingSection } from "./components/ThinkingSection";
import { ValueSection } from "./components/ValueSection";
import { FeaturedProjects } from "./components/FeaturedProjects";
import { ExperienceSection } from "./components/ExperienceSection";
import { KnowledgeSection } from "./components/KnowledgeSection";
import { Footer } from "./components/Footer";
import { ProyectosPage } from "./components/ProyectosPage";
import { ExperiencePage } from "./components/ExperiencePage";
import { CaseStudyPage } from "./components/CaseStudyPage";
import { GlobalImagePreloader } from "./components/GlobalImagePreloader";
import { SEOHead } from "./components/SEOHead";
import { FixedBackdrop } from "./components/FixedBackdrop";
import { ProcessSection } from "./components/ProcessSection";
import { ClosingCTA } from "./components/ClosingCTA";
import { SplashLoader } from "./components/SplashLoader";
import { MotionConfig } from "motion/react";
import { useState, useEffect } from "react";

// Mapping from URL slug to DOM element ID
const SECTION_MAP: Record<string, string> = {
  "sobre-mi": "sobre-mi",
  "proyectos": "proyectos",
  "servicios": "servicios",
  "experiencia": "experiencia",
  "contacto": "contacto",
};

interface Route {
  page: string;
  slug?: string;
  section?: string;
}

function parseHash(): Route {
  const hash = window.location.hash.replace("#", "") || "/";

  if (hash.startsWith("/caso/")) {
    return { page: "/caso/:slug", slug: hash.replace("/caso/", "") };
  }
  if (hash.startsWith("/proyectos/")) {
    return { page: "/proyectos/:slug", slug: hash.replace("/proyectos/", "") };
  }
  if (hash === "/trayectoria") return { page: "/trayectoria" };

  // Section URLs — render home page and scroll to section
  const sectionSlug = hash.replace("/", "");
  if (sectionSlug in SECTION_MAP) {
    return { page: "/", section: sectionSlug };
  }

  return { page: "/" };
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <SplashLoader />
      <AppRoutes />
    </MotionConfig>
  );
}

function AppRoutes() {
  const [route, setRoute] = useState<Route>(() => parseHash());

  useEffect(() => {
    const handleChange = () => setRoute(parseHash());
    window.addEventListener("hashchange", handleChange);
    window.addEventListener("popstate", handleChange);
    return () => {
      window.removeEventListener("hashchange", handleChange);
      window.removeEventListener("popstate", handleChange);
    };
  }, []);

  // Scroll to section when navigating to a section URL
  useEffect(() => {
    if (route.page === "/" && route.section) {
      const domId = SECTION_MAP[route.section] || route.section;
      const timer = setTimeout(() => {
        const el = document.getElementById(domId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [route]);

  if (route.page === "/caso/:slug" && route.slug) {
    return (
      <>
        <SEOHead />
        <GlobalImagePreloader />
        <FixedBackdrop />
        <CaseStudyPage slug={route.slug} />
      </>
    );
  }

  if (route.page === "/proyectos/:slug" && route.slug) {
    return (
      <>
        <SEOHead />
        <GlobalImagePreloader />
        <FixedBackdrop />
        <ExperiencePage slug={route.slug} />
      </>
    );
  }

  if (route.page === "/trayectoria") {
    return (
      <>
        <SEOHead
          title="Trayectoria — Florencia Acuña, Product Designer"
          description="Experiencia profesional y proyectos de Florencia Acuña: consultoría en productos digitales, Cintelink y Folcode."
        />
        <GlobalImagePreloader />
        <FixedBackdrop />
        <ProyectosPage />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <SEOHead />
      <GlobalImagePreloader />
      <FixedBackdrop />
      <Header />
      <main>
        <HeroSection />
        <DesignCodeToggle />
        <AboutSection />
        <FeaturedProjects />
        <ValueSection />
        <ProcessSection />
        <ExperienceSection />
        <ClosingCTA />
        {/* <ThinkingSection /> */}
        {/* <KnowledgeSection /> */}
      </main>
      <Footer />
    </div>
  );
}
