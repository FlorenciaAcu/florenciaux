import { Header } from "./Header";
import { Footer } from "./Footer";
import { DetailHero } from "./DetailHero";
import { detailSticker } from "./Stickers";
import { ClosingCTA } from "./ClosingCTA";
import { NextCase } from "./NextCase";
import { buildOutline, CaseOutline, CaseStudyDetails, CaseStudyLearned, ExperienceIntro } from "./CaseStudyBlocks";
import { getProjectBySlug } from "../data/projects";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";

function ImagePlaceholder({ wide = false }: { wide?: boolean }) {
  return (
    <div
      className={`w-full bg-[#E8E8ED] rounded-2xl flex items-center justify-center ${
        wide ? "aspect-[21/9]" : "aspect-[16/9]"
      }`}
    >
      <p className="text-xs text-gray-700 font-medium">Imagen pendiente</p>
    </div>
  );
}

interface Props {
  slug: string;
}

export function CaseStudyPage({ slug }: Props) {
  const project = getProjectBySlug(slug);

  const handleBack = () => {
    const returnHash = sessionStorage.getItem("caseReturnHash");
    if (returnHash) {
      sessionStorage.removeItem("caseReturnHash");
      window.location.hash = returnHash;
    } else {
      window.history.back();
    }
  };

  const handleBackToProjects = () => {
    window.location.hash = "#/proyectos";
  };

  // Every case gets the sticky "on this page" index.
  const outline = project?.caseStudy ? buildOutline(project.caseStudy) : null;

  if (!project) {
    return (
      <div className="min-h-screen bg-surface-page">
        <Header />
        <main className="pt-20">
          <div className="page-container py-40 flex flex-col items-center gap-6 text-center">
            <p className="text-gray-600">Proyecto no encontrado.</p>
            <button
              onClick={handleBackToProjects}
              aria-label="Volver a proyectos"
              className="shrink-0 w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 bg-surface-page text-gray-600 hover:text-gray-900 hover:border-gray-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-page">
      <Header />

      <main className="px-[0px] pt-[64px] pb-[0px]">
        <DetailHero
          title={project.name}
          tagline={project.caseStudy ? undefined : project.tagline}
          onBack={handleBack}
          backLabel="Volver"
          sticker={detailSticker(project.slug)}
          location={project.location}
          website={project.website}
        />

        {project.caseStudy ? (
          /* Same structure as the experience pages: the intro sections first, then the case blocks. */
          <div className={`page-container pt-12 pb-28 lg:pb-44 ${outline ? "lg:grid lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-14" : ""}`}>
            {outline && (
              <aside className="hidden lg:block">
                <div className="sticky top-28">
                  <CaseOutline items={outline} />
                </div>
              </aside>
            )}
            <div className="min-w-0 space-y-20 lg:space-y-32">
              <ExperienceIntro data={project.caseStudy} period={project.duration ?? ""} intro={project.roleIntro ?? []} />
              <CaseStudyDetails data={project.caseStudy} />
              <CaseStudyLearned data={project.caseStudy} />
            </div>
          </div>
        ) : (
          <>
        {/* Main image */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="page-container pt-8 pb-2"
        >
          <ImagePlaceholder wide />
        </motion.div>

        {/* Content sections */}
        <div className="max-w-3xl mx-auto px-6 py-10 space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <p className="type-eyebrow text-magenta-strong mb-3">
              Contexto
            </p>
            <p className="type-body text-gray-700">
              {project.context}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <p className="type-eyebrow text-magenta-strong mb-3">
              Problema o reto
            </p>
            <p className="type-body text-gray-700">
              {project.challenge}
            </p>
          </motion.div>

          <ImagePlaceholder />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <p className="type-eyebrow text-magenta-strong mb-3">
              Mi rol
            </p>
            <p className="type-body text-gray-700">
              {project.role}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <p className="type-eyebrow text-magenta-strong mb-3">
              Solución
            </p>
            <p className="type-body text-gray-700">
              {project.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <p className="type-eyebrow text-magenta-strong mb-5">
              Evidencia visual
            </p>
            <div className="space-y-4">
              {Array.from({ length: project.imageCount }).map((_, i) => (
                <ImagePlaceholder key={i} />
              ))}
            </div>
          </motion.div>
        </div>
          </>
        )}

      </main>

      <NextCase kind="Proyecto" slug={slug} />
      <ClosingCTA />

      <Footer />
    </div>
  );
}
