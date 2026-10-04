import { ArrowUpRight } from "lucide-react";
import { experiences } from "../data/experiences";
import { navigate } from "../lib/router";

const journey = [...experiences].reverse();

function extractYears(period: string): string {
  const parts = period.split("–").map((part) => part.trim());
  const startYear = parts[0].split(" ").pop() ?? "";
  const end = parts[1] ?? "";
  const endYear = end === "Actualidad" ? "Hoy" : end.split(" ").pop() ?? end;
  return `${startYear} – ${endYear}`;
}

const handles = [
  "-left-1 -top-1",
  "-right-1 -top-1",
  "-bottom-1 -left-1",
  "-bottom-1 -right-1",
];

export function ExperienceSection() {
  const navigateTo = (slug: string) => {
    navigate(`/experiencia/${slug}`);
  };

  return (
    <section id="experiencia" className="bg-surface-page/90 pb-20 pt-12 lg:pb-36">
      <div className="page-container">
        <div className="mb-5">
          <h2 className="type-h1 text-gray-900">Experiencia</h2>
        </div>

        <p className="type-s1 mb-14 text-gray-600 lg:mb-20">
          Más de cinco años trabajando en productos digitales, dentro de equipos de producto y desarrollo y también de forma independiente.
        </p>

        <div className="group/canvas relative border border-gray-300 transition-colors duration-300 hover:border-gray-400 focus-within:border-gray-400">
          {handles.map((position) => (
            <span
              key={position}
              aria-hidden="true"
              className={`absolute z-20 h-2 w-2 border border-gray-400 bg-surface-page transition-colors duration-300 group-hover/canvas:border-cyan-strong group-focus-within/canvas:border-cyan-strong ${position}`}
            />
          ))}

          <div className="grid lg:grid-cols-3">
            {journey.map((experience, index) => (
              <a
                key={experience.slug}
                href={`/experiencia/${experience.slug}`}
                onClick={(event) => {
                  event.preventDefault();
                  navigateTo(experience.slug);
                }}
                className="group/item relative flex flex-col py-6 pl-14 pr-4 focus-visible:z-10 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-magenta-strong sm:py-7 sm:pl-20 sm:pr-8 lg:min-h-[22rem] lg:justify-start lg:px-8 lg:pb-10 lg:pt-28"
              >
                <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-0 w-14 sm:w-20 lg:hidden">
                  {index < journey.length - 1 && (
                    <span className="absolute left-1/2 top-8 h-full w-px -translate-x-1/2 bg-gray-300" />
                  )}

                  <span
                    className="absolute left-1/2 top-8 z-10 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 border-2 border-gray-400 bg-surface-page transition-all duration-200 group-active/item:scale-125 group-active/item:border-magenta-strong group-focus-visible/item:scale-125 group-focus-visible/item:border-magenta-strong"
                  />
                </div>

                {index < journey.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-16 hidden h-px w-full -translate-y-1/2 bg-gray-300 lg:block"
                  />
                )}

                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-16 z-10 hidden h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 border-2 border-gray-400 bg-surface-page transition-all duration-200 group-hover/item:scale-125 group-hover/item:border-magenta-strong group-focus-visible/item:scale-125 group-focus-visible/item:border-magenta-strong lg:block"
                />

                <div className="flex items-start justify-between gap-5">
                  <span className="type-caption font-medium tabular-nums text-gray-600">{extractYears(experience.period)}</span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-gray-500 transition-transform duration-200 group-hover/item:translate-x-1 group-hover/item:-translate-y-1 group-hover/item:text-magenta-strong group-focus-visible/item:translate-x-1 group-focus-visible/item:-translate-y-1 group-focus-visible/item:text-magenta-strong"
                    strokeWidth={1.5}
                  />
                </div>

                <h3 className="type-h3 mt-3 text-gray-900">{experience.company}</h3>
                <div className="mt-5 max-w-md space-y-2">
                  {experience.bio.map((line, index) => (
                    <p key={index} className="type-body text-gray-600">
                      {line}
                    </p>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
