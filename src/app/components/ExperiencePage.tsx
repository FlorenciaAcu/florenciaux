import { Header } from "./Header";
import { Footer } from "./Footer";
import { DetailHero } from "./DetailHero";
import { detailSticker } from "./Stickers";
import { ClosingCTA } from "./ClosingCTA";
import { buildOutline, CaseOutline, CaseStudyDetails, CaseStudyLearned, ExperienceIntro } from "./CaseStudyBlocks";
import { getExperienceBySlug } from "../data/experiences";
import { motion } from "motion/react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

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
    setTimeout(() => window.scrollTo(0, 0), 100);
  };

  const navigateToCase = (caseSlug: string) => {
    sessionStorage.setItem("caseReturnHash", `/experiencia/${slug}`);
    window.location.hash = `#/proyectos/${caseSlug}`;
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

        {/* Same structure for every experience: "El desafío" and "Cómo trabajé", then the projects, then the case blocks if there are any (decisions, screens, result), and "Qué aprendí" last.
            Like the cases, it has the sticky "on this page" index on desktop. */}
        <div className="max-w-7xl mx-auto px-6 pt-12 pb-28 lg:pb-44 lg:grid lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-14">
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
            meta={[
              { label: "Rol", value: experience.role },
              { label: "Período", value: experience.period },
            ]}
          />

        {/* Projects: right after "Cómo trabajé", because they are the body of the work; the case blocks (decisions, screens, result) follow */}
        <div id="proyectos" className="scroll-mt-28">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="type-h2 mb-10 text-gray-900"
          >
            Proyectos
          </motion.h2>

          {/* Open rows, not cards: name and tags on the left, what I did on the right. Vertical rhythm alone separates rows: no hairlines. */}
          <div>
            {experience.projects.map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="grid gap-6 py-10 lg:grid-cols-[1fr_2fr] lg:gap-14"
              >
                <div>
                  <h3 className="type-h3 text-gray-900">{project.name}</h3>
                </div>
                <div>
                  {project.how ? (
                    <dl className="space-y-6 text-base leading-relaxed">
                      {[
                        { label: "Qué hice", text: project.brief },
                        { label: project.howCollective ? "Cómo lo abordamos" : "Cómo lo abordé", text: project.how },
                        ...(project.example ? [{ label: "Un ejemplo", text: project.example }] : []),
                      ].map((row, index) => (
                        <div key={row.label}>
                          <dt className="type-eyebrow mb-2 text-[#cc0058]">{row.label}</dt>
                          {/* Narrative, not a list: one paragraph per row */}
                          <dd className={index === 0 ? "text-gray-800" : "text-gray-700"}>{row.text}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : (
                    <p className="type-body text-gray-700">{project.brief}</p>
                  )}
                  {project.slug && (
                    <button
                      onClick={() => navigateToCase(project.slug!)}
                      className="mt-5 text-sm font-semibold text-[#cc0058] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#cc0058]"
                    >
                      Ver detalle →
                    </button>
                  )}
                  {project.externalLink && (
                    <a
                      href={project.externalLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#cc0058] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#cc0058]"
                    >
                      {project.externalLink.label}
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      <span className="sr-only">(se abre en otra pestaña)</span>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {experience.caseStudy && <CaseStudyDetails data={experience.caseStudy} />}
        {experience.caseStudy && <CaseStudyLearned data={experience.caseStudy} />}
        {!experience.caseStudy && <CaseStudyLearned data={experience} />}
        </div>
          </div>
        </div>

      </main>

      {/* Bottom CTA — solo Cintelink */}
      {slug === "cintelink" && <ClosingCTA />}

      <Footer />
    </div>
  );
}
