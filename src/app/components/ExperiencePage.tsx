import { Header } from "./Header";
import { Footer } from "./Footer";
import { DetailHero } from "./DetailHero";
import { detailSticker } from "./Stickers";
import { ClosingCTA } from "./ClosingCTA";
import { CaseStudyDetails, CaseStudyLearned, ExperienceIntro, splitSentences } from "./CaseStudyBlocks";
import { getExperienceBySlug } from "../data/experiences";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";

interface Props {
  slug: string;
}

export function ExperiencePage({ slug }: Props) {
  const experience = getExperienceBySlug(slug);

  const handleBack = () => {
    window.location.hash = "#/experiencia";
    setTimeout(() => window.scrollTo(0, 0), 100);
  };

  const navigateToCase = (caseSlug: string) => {
    sessionStorage.setItem("caseReturnHash", `/proyectos/${slug}`);
    window.location.hash = `#/caso/${caseSlug}`;
    setTimeout(() => window.scrollTo(0, 0), 100);
  };

  if (!experience) {
    return (
      <div className="min-h-screen bg-[#fafafa]">
        <Header />
        <main className="pt-20">
          <div className="max-w-7xl mx-auto px-6 py-40 flex flex-col items-center gap-6 text-center">
            <p className="text-gray-600">Experiencia no encontrada.</p>
            <button
              onClick={handleBack}
              aria-label="Volver a experiencia"
              className="shrink-0 w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 bg-[#fafafa] text-gray-600 hover:text-gray-900 hover:border-gray-300 transition-colors"
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
    <div className="min-h-screen bg-[#fafafa]">
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

        {/* Same structure for every experience: "Mi trabajo" first, then the case study blocks if there are any. */}
        <div className="max-w-7xl mx-auto px-6 pt-12 space-y-12 lg:space-y-16">
          <ExperienceIntro data={experience.caseStudy} period={experience.period} intro={experience.bio} />
          {experience.caseStudy && <CaseStudyDetails data={experience.caseStudy} />}
        </div>

        {/* Projects */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight mb-8"
          >
            Algunos de los proyectos en los que participé
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {experience.projects.map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="glass-panel rounded-3xl p-7 flex flex-col gap-4"
              >
                <h3 className="text-base font-bold text-gray-900">
                  {project.name}
                </h3>
                {project.how ? (
                  <dl className="flex-1 space-y-4 text-sm leading-relaxed">
                    {[
                      { label: "Qué hice", text: project.brief },
                      { label: "Cómo lo abordamos", text: project.how },
                      ...(project.example ? [{ label: "Un ejemplo", text: project.example }] : []),
                    ].map((row, index) => (
                      <div key={row.label} className={index > 0 ? "border-t border-gray-200 pt-4" : ""}>
                        <dt className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-[#cc0058]">{row.label}</dt>
                        {index === 0 ? (
                          <dd className="text-gray-800">{row.text}</dd>
                        ) : (
                          <dd>
                            <ul className="space-y-2 text-gray-700">
                              {splitSentences(row.text).map((sentence) => (
                                <li key={sentence} className="flex gap-2.5">
                                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#cc0058]" aria-hidden="true" />
                                  {sentence}
                                </li>
                              ))}
                            </ul>
                          </dd>
                        )}
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className="text-sm text-gray-600 leading-relaxed flex-1">
                    {project.brief}
                  </p>
                )}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium text-gray-700 bg-white border border-gray-300 px-2.5 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {project.slug && (
                  <button
                    onClick={() => navigateToCase(project.slug!)}
                    className="self-start text-sm font-semibold text-[#cc0058] hover:underline underline-offset-4 transition-all mt-1"
                  >
                    Ver detalle →
                  </button>
                )}
              </motion.div>
            ))}
          </div>

          {experience.caseStudy && (
            <div className="mt-12 lg:mt-16">
              <CaseStudyLearned data={experience.caseStudy} />
            </div>
          )}
        </div>

      </main>

      {/* Bottom CTA — solo Cintelink */}
      {slug === "cintelink" && <ClosingCTA />}

      <Footer />
    </div>
  );
}
