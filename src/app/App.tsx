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
import { getExperience, getProject } from "./i18n/content";
import { getEditorialSeo } from "./i18n/editorialData";
import { getExperienceBySlug } from "./data/experiences";
import { AI_PROCESS_PATH, experienceSeo, LEGACY_PROCESS_PATH, PROCESS_PATH, projectSeo } from "./data/seo";
import { FixedBackdrop } from "./components/FixedBackdrop";
import { ProcessSection } from "./components/ProcessSection";
import { ClosingCTA } from "./components/ClosingCTA";
import { SplashLoader } from "./components/SplashLoader";
import { CookieConsent } from "./components/CookieConsent";
import { NotFoundPage } from "./components/NotFoundPage";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { lazy, Suspense, useState, useEffect } from "react";
import { currentPath, migrateLegacyHash, navigate, NAVIGATE_EVENT } from "./lib/router";
import { isEnAvailable, isEnEnabled, resolveLocation, type Lang } from "./i18n/routes";
import { uiFor } from "./i18n/useI18n";
import { PendingTranslation } from "./components/PendingTranslation";

const ReferencesPage = lazy(() => import("./components/ReferencesPage").then((m) => ({ default: m.ReferencesPage })));

const AIProcessPage = lazy(() => import("./components/AIProcessPage").then((m) => ({ default: m.AIProcessPage })));

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
  lang: Lang;
  /** Ruta española equivalente de una página inglesa sin traducir (solo en revisión). */
  pendingPath?: string;
}

/** La URL actual → qué página es. Las URLs inglesas (`/en/…`) se resuelven a la página española equivalente (ver i18n/routes.ts): la lógica de abajo es una sola. */
function parsePath(): Route {
  const { lang, es } = resolveLocation(currentPath());
  if (lang === "en") {
    // Sin nada público en inglés, `/en/…` es una dirección inexistente. Con inglés habilitado, una URL inglesa que no existe es el 404 inglés
    // y una página sin traducir nunca se mezcla con español: se muestra el aviso de traducción pendiente.
    if (!isEnEnabled()) return { page: "/404", lang: "es" };
    if (es === null) return { page: "/404", lang: "en" };
    if (!isEnAvailable(es)) return { page: "/pending", lang: "en", pendingPath: es };
    return { ...parseSpanishPath(es), lang: "en" };
  }
  return { ...parseSpanishPath(es ?? currentPath()), lang: "es" };
}

function parseSpanishPath(hash: string): Omit<Route, "lang"> {

  // "/proyectos/:slug" es un caso (CEMICO, Buscador Agrícola, Juan Gas, Audagno, InfoCasas).
  if (hash.startsWith("/proyectos/")) {
    return { page: "/proyectos/:slug", slug: hash.replace("/proyectos/", "") };
  }
  // "/experiencia/:slug" es el detalle de una experiencia laboral (Cintelink, Consultoría, Bridgenext).
  if (hash.startsWith("/experiencia/")) {
    return { page: "/experiencia/:slug", slug: hash.replace("/experiencia/", "") };
  }

  // "Cómo diseñé mi portfolio". La dirección de cuando era privada pasa a la pública (ver el efecto en AppRoutes).
  if (hash === PROCESS_PATH || hash === LEGACY_PROCESS_PATH) return { page: "/como-disene-mi-portfolio" };

  // "Cómo integro la IA en mi proceso de diseño".
  if (hash === AI_PROCESS_PATH) return { page: AI_PROCESS_PATH };

  // Section URLs — render home page and scroll to section
  const sectionSlug = hash.replace("/", "");
  if (sectionSlug in SECTION_MAP) {
    return { page: "/", section: sectionSlug };
  }

  return hash === "/" ? { page: "/" } : { page: "/404" };
}

// Unknown slugs fall back to the Home metadata.
// An unknown slug is a "not found" page: it takes no metadata from the Home and is never indexed.
const NOT_FOUND_SEO = { title: "Página no encontrada", noindex: true };
function seoForProject(slug: string, lang: Lang) {
  const project = getProject(slug, lang);
  return project ? projectSeo(project) : NOT_FOUND_SEO;
}
function seoForExperience(slug: string, lang: Lang) {
  const experience = getExperience(slug, lang);
  return experience ? experienceSeo(experience) : NOT_FOUND_SEO;
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
  const ui = uiFor(route.lang);

  useEffect(() => {
    const handleChange = () => setRoute(parsePath());
    window.addEventListener(NAVIGATE_EVENT, handleChange);
    window.addEventListener("popstate", handleChange);
    return () => {
      window.removeEventListener(NAVIGATE_EVENT, handleChange);
      window.removeEventListener("popstate", handleChange);
    };
  }, []);

  // La dirección anterior de "Cómo diseñé mi portfolio" nunca se publicó: si alguien la abre, se reemplaza por la pública.
  useEffect(() => {
    if (currentPath() === LEGACY_PROCESS_PATH) navigate(PROCESS_PATH, { replace: true });
  }, [route]);

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
        <SEOHead {...seoForProject(route.slug, route.lang)} />
        <CaseStudyPage slug={route.slug} />
      </>
    );
  } else if (route.page === "/experiencia/:slug" && route.slug) {
    transitionKey = `experiencia/${route.slug}`;
    content = (
      <>
        <SEOHead {...seoForExperience(route.slug, route.lang)} />
        <ExperiencePage slug={route.slug} />
      </>
    );
  } else if (route.page === "/como-disene-mi-portfolio") {
    transitionKey = "como-disene-mi-portfolio";
    content = (
      <>
        <SEOHead {...getEditorialSeo(PROCESS_PATH, route.lang)} />
        <Suspense fallback={null}>
          <ReferencesPage />
        </Suspense>
      </>
    );
  } else if (route.page === AI_PROCESS_PATH) {
    transitionKey = "como-trabajo-con-ia";
    content = (
      <>
        <SEOHead {...getEditorialSeo(AI_PROCESS_PATH, route.lang)} />
        <Suspense fallback={null}>
          <AIProcessPage />
        </Suspense>
      </>
    );
  } else if (route.page === "/pending") {
    transitionKey = `pending/${route.pendingPath}`;
    content = (
      <>
        <SEOHead title={ui.pending.title} noindex />
        <PendingTranslation esPath={route.pendingPath ?? "/"} />
      </>
    );
  } else if (route.page === "/404") {
    transitionKey = "404";
    content = (
      <>
        <SEOHead {...NOT_FOUND_SEO} title={ui.notFound.metaTitle} />
        <NotFoundPage />
      </>
    );
  } else {
    transitionKey = "/";
    content = (
      <div className="min-h-screen bg-white">
        <SEOHead alternates={!route.section} />
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
        key={route.lang === "en" ? `en:${transitionKey}` : transitionKey}
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
