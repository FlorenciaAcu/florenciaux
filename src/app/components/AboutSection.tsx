import photo1 from '../../imports/27-2022-_MG_2698.jpg';
import photo2 from '../../imports/graduacion-unj-sistemas-info.jpg';
import photo4 from '../../imports/IMG_8281.jpeg';
import { motion } from 'motion/react';
import { Sticker, StickerName } from './Stickers';
import { PageLink } from './PageLink';
import { PROCESS_PATH } from '../data/seo';
import { useI18n } from '../i18n/useI18n';
import { isPageAvailable } from '../i18n/routes';

const photos = [
  { src: photo2, position: "object-[50%_55%]", zoom: "md:origin-[50%_62%] md:scale-[1.4] md:hover:scale-[1.46]", span: "hero" },
  { src: photo1, position: "object-center", zoom: "", span: "small" },
  { src: photo4, position: "object-center", zoom: "", span: "small" },
] as const;

const interests: { name: "swim" | "pilates" | "mug" | "pizza" | "cat"; rotate: number }[] = [
  { name: "swim", rotate: -6 },
  { name: "pilates", rotate: 5 },
  { name: "mug", rotate: -4 },
  { name: "pizza", rotate: 6 },
  { name: "cat", rotate: -5 },
];

export function AboutSection() {
  const { lang, home, lp } = useI18n();
  const t = home.about;
  return (
    <section id="sobre-mi" className="py-20 lg:py-36 bg-surface-page/90">
      <div className="page-container">

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Text column */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55 }}
              className="type-h1 text-gray-900 mb-10"
            >
              {t.title}
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="type-body bg-notebook space-y-[1.65rem] py-[1.65rem] pl-12 pr-6 text-gray-600 shadow-[0_2px_6px_rgba(10,10,10,0.08)]"
            >
              {t.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {/* El enlace solo aparece si esa página existe en este idioma: nunca lleva a una página sin traducir */}
              {isPageAvailable(PROCESS_PATH, lang) && (
                <p>
                  {/* -my-2 cancela el py-2 del enlace: la línea ocupa un solo renglón y el texto sigue apoyado en las líneas de la hoja */}
                  <PageLink href={lp(PROCESS_PATH)} className="-my-2">
                    {t.processLink}
                  </PageLink>
                </p>
              )}
            </motion.div>

            <div className="grid grid-cols-3 sm:grid-cols-5 gap-x-2 gap-y-7 mt-10">
              {interests.map(({ name, rotate }, i) => (
                <Sticker key={name} name={name} label={t.interests[name]} rotate={rotate} size={64} delay={i * 0.07} className="justify-self-center" />
              ))}
            </div>
          </div>

          {/* Asymmetric photo collage — one hero shot, two accents */}
          <div className="grid grid-cols-2 gap-2.5 md:grid-rows-2 md:h-[492px] lg:h-[552px]">
            {photos.map((photo, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                className={`rounded-2xl md:rounded-3xl overflow-hidden bg-gray-200 ${
                  photo.span === "hero"
                    ? "col-span-2 aspect-[16/10] md:col-span-1 md:aspect-auto md:row-span-2"
                    : "aspect-square md:aspect-auto"
                }`}
              >
                <img
                  src={photo.src}
                  alt={t.photos[i]}
                  className={`w-full h-full object-cover ${photo.position} ${photo.zoom} transition-transform duration-500 ease-out hover:scale-[1.06]`}
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
