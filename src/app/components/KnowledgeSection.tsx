import { motion } from "motion/react";

interface KnowledgeCard {
  title: string;
  category: string;
  description: string;
  cta?: string;
  link?: string;
  comingSoon?: boolean;
}

const cards: KnowledgeCard[] = [
  {
    title: "Diseñar para escalar: aprendizajes sobre sistemas de diseño en la ConfOps 2025",
    category: "DesignOps · Design Systems",
    description:
      "Aprendizajes sobre cómo los sistemas de diseño pueden ayudar a escalar decisiones, criterios y formas de trabajo dentro de equipos de producto.",
    cta: "Leer artículo",
    link: "https://medium.com/designops-latam/dise%C3%B1ar-para-escalar-aprendizajes-sobre-sistemas-de-dise%C3%B1o-en-la-confops-2025-31cb22dbfccb",
  },
  {
    title: "Cuando construir deja de ser el principal desafío",
    category: "IA aplicada al diseño · Product Design · Delivery",
    description:
      "Una reflexión sobre cómo cambia el rol de diseño cuando prototipar y construir se vuelve más rápido, y el valor pasa a estar en decidir mejor qué vale la pena crear.",
    comingSoon: true,
  },
  {
    title: "Tecnología, UX y mujeres en informática",
    category: "Prensa · UX · Tecnología",
    description:
      "Entrevista en Canal 13 San Juan sobre mi recorrido en tecnología, experiencia de usuario y participación de mujeres en informática.",
    cta: "Leer nota",
    link: "https://www.canal13sanjuan.com/san-juan/-nuestro-trabajo-es-el-futuro-e-impacta-en-todo---el-relato-de-una-joven-programadora_a66aaf26c3ed2a6010d85e053",
  },
];

export function KnowledgeSection() {
  return (
    <section id="conocimiento" className="py-32 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="mb-5"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
            Lo que aprendo, lo comparto.
          </h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-gray-600 leading-relaxed mb-20"
        >
          Artículos, aprendizajes y referencias sobre diseño de producto, DesignOps, sistemas de diseño, IA aplicada al diseño y formas de trabajo.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col gap-5 bg-[#f0f0f0] rounded-3xl p-8"
            >
              <span className="text-xs font-semibold text-[#cc0058] tracking-wide">
                {card.category}
              </span>
              <h3 className="text-base font-bold text-gray-900 leading-snug tracking-tight flex-1">
                {card.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {card.description}
              </p>
              {card.comingSoon ? (
                <span className="self-start text-xs font-medium text-gray-400 bg-[#fafafa] px-3 py-1.5 rounded-full">
                  Próximamente
                </span>
              ) : card.link && card.cta ? (
                <a
                  href={card.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="self-start text-sm font-semibold text-[#cc0058] hover:underline underline-offset-4 transition-all mt-auto"
                >
                  {card.cta} →
                </a>
              ) : null}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
