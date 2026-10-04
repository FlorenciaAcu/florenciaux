import { Header } from "./Header";
import { Footer } from "./Footer";
import { DetailHero } from "./DetailHero";
import { detailSticker } from "./Stickers";
import { ClosingCTA } from "./ClosingCTA";
import { NextCase } from "./NextCase";
import { buildOutline, CaseImage, CaseOutline, CaseStudyDetails, CaseStudyLearned, ExperienceIntro, ProjectList } from "./CaseStudyBlocks";
import { getExperienceBySlug } from "../data/experiences";
import { ArrowLeft } from "lucide-react";

interface Props {
  slug: string;
}

export function ExperiencePage({ slug }: Props) {
  const experience = getExperienceBySlug(slug);

  const handleBack = () => {
    // Vuelve a donde estaba antes de entrar (tarjeta de "Proyectos destacados" o fila de "Experiencia"); si no hay registro, a la sección Experiencia.
    const returnHash = sessionStorage.getItem("caseReturnHash");
    if (returnHash) {
      sessionStorage.removeItem("caseReturnHash");
      window.location.hash = returnHash;
    } else {
      window.location.hash = "#/experiencia";
    }
  };

  const navigateToCase = (caseSlug: string) => {
    sessionStorage.setItem("caseReturnHash", `/experiencia/${slug}`);
    window.location.hash = `#/proyectos/${caseSlug}`;
  };

  if (!experience) {
    return (
      <div className="min-h-screen bg-surface-page">
        <Header />
        <main className="pt-20">
          <div className="page-container py-40 flex flex-col items-center gap-6 text-center">
            <p className="text-gray-600">Experiencia no encontrada.</p>
            <button
              onClick={handleBack}
              aria-label="Volver a experiencia"
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
          title={experience.company}
          onBack={handleBack}
          backLabel="Volver a experiencia"
          sticker={detailSticker(experience.slug)}
          location={experience.location}
          website={experience.website}
        />

        {/* Same structure for every experience: "El desafío" and "Cómo trabajé", then the projects, then the case blocks if there are any (decisions, screens, result), and "Qué aprendí" last.
            Like the cases, it has the sticky "on this page" index on desktop. */}
        <div className="page-container pt-12 pb-28 lg:pb-44 lg:grid lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-14">
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <CaseOutline items={buildOutline(experience.caseStudy, { projects: true, about: experience.aboutTitle, challenge: !!experience.challenge, learned: !!experience.learned })} />
            </div>
          </aside>
          <div className="min-w-0">
        <div className="space-y-20 lg:space-y-32">
          <ExperienceIntro
            data={experience.caseStudy}
            period={experience.period}
            intro={experience.workText ?? experience.bio}
            about={experience.about && experience.aboutTitle ? { title: experience.aboutTitle, text: experience.about } : undefined}
            challenge={experience.challenge}
            images={experience.images}
            meta={[
              { label: "Rol", value: experience.role },
              { label: "Período", value: experience.period },
            ]}
          />

        {/* Projects: right after "Cómo se conecta" / "Cómo trabajé", same block as the projects inside a project */}
        <ProjectList projects={experience.projects} onOpen={navigateToCase} />

        {experience.caseStudy && <CaseStudyDetails data={experience.caseStudy} />}
        {/* Sin caseStudy, CaseStudyDetails no se llama: la segunda imagen va justo antes de "Qué aprendí"
            para que el lugar siga siendo fijo. */}
        {!experience.caseStudy && <CaseImage image={experience.images?.[1]} />}
        {experience.caseStudy && <CaseStudyLearned data={experience.caseStudy} />}
        {!experience.caseStudy && <CaseStudyLearned data={experience} />}
        </div>
          </div>
        </div>

      </main>

      <NextCase kind="Experiencia" slug={slug} />
      <ClosingCTA />

      <Footer />
    </div>
  );
}
