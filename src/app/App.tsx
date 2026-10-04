import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { ThinkingSection } from "./components/ThinkingSection";
import { FeaturedProjects } from "./components/FeaturedProjects";
import { ExperienceSection } from "./components/ExperienceSection";
import { KnowledgeSection } from "./components/KnowledgeSection";
import { Footer } from "./components/Footer";
import { ExperiencePage } from "./components/ExperiencePage";
import { CaseStudyPage } from "./components/CaseStudyPage";
import { SEOHead } from "./components/SEOHead";
import { getProjectBySlug } from "./data/projects";
import { getExperienceBySlug } from "./data/experiences";
import { experienceSeo, projectSeo } from "./data/seo";
import { FixedBackdrop } from "./components/FixedBackdrop";
import { ProcessSection } from "./components/ProcessSection";
import { ClosingCTA } from "./components/ClosingCTA";
import { SplashLoader } from "./components/SplashLoader";
import { CookieConsent } from "./components/CookieConsent";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { useState, useEffect } from "react";
import { currentPath, migrateLegacyHash, NAVIGATE_EVENT } from "./lib/router";

migrateLegacyHash();

// Mapping from URL slug to DOM element ID
const SECTION_MAP: Record<string, string> = {
  "sobre-mi": "sobre-mi",
  "proyectos": "proyectos",
  "experiencia": "experiencia",
  "contacto": "contacto",
};

interface Route {
  page: string;
  slug?: string;
  section?: string;
}

function parsePath(): Route {
  const hash = currentPath();

  // "/proyectos/:slug" es un caso (CEMICO, Buscador Agrícola, Juan Gas, Audagno, InfoCasas).
  if (hash.startsWith("/proyectos/")) {
    return { page: "/proyectos/:slug", slug: hash.replace("/proyectos/", "") };
  }
  // "/experiencia/:slug" es el detalle de una experiencia laboral (Cintelink, Consultoría, Folcode).
  if (hash.startsWith("/experiencia/")) {
    return { page: "/experiencia/:slug", slug: hash.replace("/experiencia/", "") };
  }

  // Section URLs — render home page and scroll to section
  const sectionSlug = hash.replace("/", "");
  if (sectionSlug in SECTION_MAP) {
    return { page: "/", section: sectionSlug };
  }

  return { page: "/" };
}

// Unknown slugs fall back to the Home metadata.
function seoForProject(slug: string) {
  const project = getProjectBySlug(slug);
  return project ? projectSeo(project) : {};
}
function seoForExperience(slug: string) {
  const experience = getExperienceBySlug(slug);
  return experience ? experienceSeo(experience) : {};
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <SplashLoader />
      <FixedBackdrop />
      <AppRoutes />
      <CookieConsent />
    </MotionConfig>
  );
}

function AppRoutes() {
  const [route, setRoute] = useState<Route>(() => parsePath());

  useEffect(() => {
    const handleChange = () => setRoute(parsePath());
    window.addEventListener(NAVIGATE_EVENT, handleChange);
    window.addEventListener("popstate", handleChange);
    return () => {
      window.removeEventListener(NAVIGATE_EVENT, handleChange);
      window.removeEventListener("popstate", handleChange);
    };
  }, []);

  // Al cambiar de página arranca arriba — salvo que el destino sea una sección del home,
  // que ya se encarga el efecto de abajo con su propio scroll suave.
  useEffect(() => {
    if (route.page !== "/" || !route.section) {
      window.scrollTo(0, 0);
    }
  }, [route]);

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

  // La clave identifica la "página" (home vs. un caso vs. una experiencia), no la sección dentro
  // del home — moverse entre secciones no debe disparar la transición, solo cambiar de página sí.
  let transitionKey: string;
  let content: React.ReactNode;

  if (route.page === "/proyectos/:slug" && route.slug) {
    transitionKey = `proyectos/${route.slug}`;
    content = (
      <>
        <SEOHead {...seoForProject(route.slug)} />
        <CaseStudyPage slug={route.slug} />
      </>
    );
  } else if (route.page === "/experiencia/:slug" && route.slug) {
    transitionKey = `experiencia/${route.slug}`;
    content = (
      <>
        <SEOHead {...seoForExperience(route.slug)} />
        <ExperiencePage slug={route.slug} />
      </>
    );
  } else {
    transitionKey = "/";
    content = (
      <div className="min-h-screen bg-white">
        <SEOHead />
        <Header />
        <main>
          <HeroSection />
          <AboutSection />
          <FeaturedProjects />
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

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={transitionKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {content}
      </motion.div>
    </AnimatePresence>
  );
}
