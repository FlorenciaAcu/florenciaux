import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Descubrir",
    description: "Relevamiento con stakeholders y usuarios para entender el contexto real y acotar el alcance.",
  },
  {
    number: "02",
    title: "Definir",
    description: "Traduzco lo relevado en arquitectura de información, flujos y story maps antes de dibujar pantallas.",
  },
  {
    number: "03",
    title: "Diseñar",
    description: "Prototipos interactivos y alta fidelidad sobre un design system. Con IA exploro y prototipo más rápido.",
  },
  {
    number: "04",
    title: "Entregar",
    description: "Documentación y acompañamiento al equipo de desarrollo durante la implementación.",
  },
];

const desktopPath = "M 380 40 A 300 130 0 1 1 380 300 A 300 130 0 1 1 380 40 Z";
const mobilePath = "M 160 18 A 128 38 0 1 1 160 94 A 128 38 0 1 1 160 18 Z";
const stageProgress = [0, 1 / 3, 2 / 3, 1];
const pathStageProgress = [0, 0.25, 0.5, 0.75];

function getActiveStep(progress: number) {
  return stageProgress.reduce((closest, station, index) =>
    Math.abs(progress - station) < Math.abs(progress - stageProgress[closest]) ? index : closest,
  0);
}

function getPathProgress(progress: number) {
  for (let index = 0; index < stageProgress.length - 1; index += 1) {
    const start = stageProgress[index];
    const end = stageProgress[index + 1];

    if (progress <= end) {
      const segmentProgress = (progress - start) / (end - start);
      const pathStart = pathStageProgress[index];
      const pathEnd = pathStageProgress[index + 1];
      return pathStart + (pathEnd - pathStart) * segmentProgress;
    }
  }

  return pathStageProgress[pathStageProgress.length - 1];
}

type ProcessPathProps = {
  path: string;
  viewBox: string;
  className: string;
  pathRef: React.RefObject<SVGPathElement>;
  progressRef: React.RefObject<SVGPathElement>;
  markerRef: React.RefObject<SVGGElement>;
  nodeRefs: React.MutableRefObject<Array<SVGGElement | null>>;
  activeStep: number;
};

function ProcessPath({
  path,
  viewBox,
  className,
  pathRef,
  progressRef,
  markerRef,
  nodeRefs,
  activeStep,
}: ProcessPathProps) {
  return (
    <svg viewBox={viewBox} className={className} fill="none" aria-hidden="true">
      <path
        ref={pathRef}
        d={path}
        stroke="var(--color-gray-200)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        ref={progressRef}
        d={path}
        stroke="var(--brand-magenta-strong)"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {steps.map((step, index) => {
        const isActive = index === activeStep;
        const isComplete = index < activeStep;

        return (
          <g
            key={step.number}
            ref={(node) => {
              nodeRefs.current[index] = node;
            }}
          >
            <rect
              x={isActive ? -6 : -4}
              y={isActive ? -6 : -4}
              width={isActive ? 12 : 8}
              height={isActive ? 12 : 8}
              rx="1"
              fill={isComplete ? "var(--brand-magenta-strong)" : "var(--surface-page)"}
              stroke={isActive || isComplete ? "var(--brand-magenta-strong)" : "var(--color-gray-300)"}
              strokeWidth={isActive ? 2 : 1.5}
            />
          </g>
        );
      })}

      <g ref={markerRef}>
        <rect
          x="-7"
          y="-7"
          width="14"
          height="14"
          rx="1.5"
          fill="var(--brand-magenta-strong)"
          stroke="var(--surface-page)"
          strokeWidth="3"
        />
      </g>
    </svg>
  );
}

export function ProcessSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const desktopPathRef = useRef<SVGPathElement>(null);
  const desktopProgressRef = useRef<SVGPathElement>(null);
  const desktopMarkerRef = useRef<SVGGElement>(null);
  const desktopNodeRefs = useRef<Array<SVGGElement | null>>([]);
  const mobilePathRef = useRef<SVGPathElement>(null);
  const mobileProgressRef = useRef<SVGPathElement>(null);
  const mobileMarkerRef = useRef<SVGGElement>(null);
  const mobileNodeRefs = useRef<Array<SVGGElement | null>>([]);
  const [activeStep, setActiveStep] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(media.matches);
    media.addEventListener("change", updatePreference);
    return () => media.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    const sticky = stickyRef.current;

    if (!track || !sticky || reducedMotion) return;

    let frame = 0;
    let currentStep = 0;

    const preparePath = (
      path: SVGPathElement | null,
      progressPath: SVGPathElement | null,
      nodes: Array<SVGGElement | null>,
    ) => {
      if (!path || !progressPath) return 0;

      const length = path.getTotalLength();
      progressPath.style.strokeDasharray = `${length}`;

      nodes.forEach((node, index) => {
        if (!node) return;
        const nodePoint = path.getPointAtLength(length * pathStageProgress[index]);
        node.setAttribute("transform", `translate(${nodePoint.x} ${nodePoint.y})`);
      });

      return length;
    };

    const updatePath = (
      path: SVGPathElement | null,
      progressPath: SVGPathElement | null,
      marker: SVGGElement | null,
      length: number,
      progress: number,
    ) => {
      if (!path || !progressPath || !marker || !length) return;

      const point = path.getPointAtLength(length * progress);
      progressPath.style.strokeDashoffset = `${length * (1 - progress)}`;
      marker.setAttribute("transform", `translate(${point.x} ${point.y})`);
    };

    const desktopLength = preparePath(desktopPathRef.current, desktopProgressRef.current, desktopNodeRefs.current);
    const mobileLength = preparePath(mobilePathRef.current, mobileProgressRef.current, mobileNodeRefs.current);
    let stickyTop = 0;
    let distance = 1;

    const measure = () => {
      stickyTop = Number.parseFloat(window.getComputedStyle(sticky).top) || 0;
      distance = Math.max(track.offsetHeight - sticky.offsetHeight, 1);
    };

    const paint = () => {
      frame = 0;
      const rect = track.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, (stickyTop - rect.top) / distance));
      const pathProgress = getPathProgress(progress);
      const nextStep = getActiveStep(progress);

      updatePath(
        desktopPathRef.current,
        desktopProgressRef.current,
        desktopMarkerRef.current,
        desktopLength,
        pathProgress,
      );
      updatePath(
        mobilePathRef.current,
        mobileProgressRef.current,
        mobileMarkerRef.current,
        mobileLength,
        pathProgress,
      );

      if (nextStep !== currentStep) {
        currentStep = nextStep;
        setActiveStep(nextStep);
      }
    };

    const requestPaint = () => {
      if (!frame) frame = window.requestAnimationFrame(paint);
    };

    const handleResize = () => {
      measure();
      requestPaint();
    };

    measure();
    paint();
    window.addEventListener("scroll", requestPaint, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", requestPaint);
      window.removeEventListener("resize", handleResize);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  const active = steps[activeStep];

  return (
    <section id="proceso" className="relative bg-surface-page/90 pb-0 pt-20 lg:pt-36">
      <div className="page-container">
        <div
          ref={trackRef}
          className={reducedMotion ? "hidden" : "relative h-[270svh] md:h-[250svh] lg:h-[250vh]"}
        >
          <div ref={stickyRef} className="sticky top-16 overflow-hidden py-4 lg:top-20 lg:py-6">
            <div className="mb-5">
              <h2 className="type-h1 text-gray-900">Cómo trabajo</h2>
            </div>

            <p className="type-s1 mb-4 max-w-3xl text-gray-600 sm:mb-6 lg:mb-8">
              Un proceso iterativo donde cada etapa alimenta a la siguiente: lo que sale de una es lo que entra en la próxima.
            </p>

            <ol className="sr-only">
              {steps.map((step) => (
                <li key={step.number}>
                  {step.number} · {step.title}. {step.description}
                </li>
              ))}
            </ol>

            <div className="grid w-full items-center gap-0 md:gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)] lg:gap-14">
              <div className="order-2 min-w-0 lg:order-1">
                <ProcessPath
                  path={desktopPath}
                  viewBox="0 0 760 340"
                  className="hidden aspect-[38/17] w-full md:block"
                  pathRef={desktopPathRef}
                  progressRef={desktopProgressRef}
                  markerRef={desktopMarkerRef}
                  nodeRefs={desktopNodeRefs}
                  activeStep={activeStep}
                />
              </div>

              <div className="order-1 flex flex-col justify-center md:min-h-52 lg:order-2 lg:min-h-72" aria-hidden="true">
                <div className="min-h-52 md:min-h-0">
                  <p className="text-gradient-brand text-5xl font-light leading-none tabular-nums lg:text-7xl">{active.number}</p>
                  <h3 className="type-h2 mt-3 text-gray-900 lg:mt-5">{active.title}</h3>
                  <p className="type-body mt-4 max-w-md text-gray-600 lg:mt-5">{active.description}</p>
                </div>

                <ProcessPath
                  path={mobilePath}
                  viewBox="0 0 320 112"
                  className="mt-1 h-28 w-full md:hidden"
                  pathRef={mobilePathRef}
                  progressRef={mobileProgressRef}
                  markerRef={mobileMarkerRef}
                  nodeRefs={mobileNodeRefs}
                  activeStep={activeStep}
                />
              </div>
            </div>
          </div>
        </div>

        {reducedMotion && (
          <>
            <div className="mb-5">
              <h2 className="type-h1 text-gray-900">Cómo trabajo</h2>
            </div>

            <p className="type-s1 mb-6 max-w-3xl text-gray-600 lg:mb-8">
              Un proceso iterativo donde cada etapa alimenta a la siguiente: lo que sale de una es lo que entra en la próxima.
            </p>

            <ol className="grid border-y border-gray-200 lg:grid-cols-4 lg:gap-10 lg:border-b-0 lg:pt-10">
              {steps.map((step) => (
                <li
                  key={step.number}
                  className="grid grid-cols-[3.25rem_minmax(0,1fr)] gap-x-4 gap-y-3 border-b border-gray-200 py-6 last:border-b-0 lg:flex lg:flex-col lg:gap-5 lg:border-0 lg:py-0"
                >
                  <span className="text-gradient-brand row-span-2 text-3xl font-light leading-none tabular-nums lg:row-auto lg:text-5xl">
                    {step.number}
                  </span>
                  <h3 className="type-h3 text-gray-900">{step.title}</h3>
                  <p className="type-body col-start-2 text-gray-600 lg:col-auto">{step.description}</p>
                </li>
              ))}
            </ol>
          </>
        )}
      </div>
    </section>
  );
}
