import photo1 from '../../imports/27-2022-_MG_2698.jpg';
import photo2 from '../../imports/graduacion-unj-sistemas-info.jpg';
import photo4 from '../../imports/IMG_8281.jpeg';
import { motion } from 'motion/react';
import { Sticker, StickerName } from './Stickers';

const photos = [
  { src: photo2, alt: "Florencia recibiéndose como Técnica en Sistemas de Información en la UNJ", position: "object-[50%_55%]", zoom: "md:origin-[50%_62%] md:scale-[1.4] md:hover:scale-[1.46]", span: "hero" },
  { src: photo1, alt: "Demo de app en evento", position: "object-center", zoom: "", span: "small" },
  { src: photo4, alt: "Reunión remota con el equipo", position: "object-center", zoom: "", span: "small" },
] as const;

const interests: { name: StickerName; label: string; rotate: number }[] = [
  { name: "swim", label: "Natación", rotate: -6 },
  { name: "pilates", label: "Pilates & TPA", rotate: 5 },
  { name: "mug", label: "Mucho tecito", rotate: -4 },
  { name: "pizza", label: "Pizza & papas", rotate: 6 },
  { name: "cat", label: "Gatos", rotate: -5 },
];

export function AboutSection() {
  return (
    <section id="sobre-mi" className="py-12 lg:py-20 bg-[#fafafa]/90">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Text column */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55 }}
              className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8 tracking-tight"
            >
              Sobre mí
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-5 text-gray-600 text-base leading-relaxed"
            >
              <p>
                Product Designer con más de 5 años de experiencia en productos digitales, plataformas web, SaaS y MVPs. Trabajo desde la investigación y definición del problema hasta el diseño de flujos, interfaces y prototipos funcionales.
              </p>
              <p>
                Me enfoco en transformar necesidades complejas en soluciones claras, usables y accionables, colaborando con equipos de producto, negocio y tecnología.
              </p>
              <p>
                Uso herramientas de IA —Claude, Figma Make, Lovable— para explorar, prototipar y construir primeras versiones más rápido, sin perder criterio de producto ni viabilidad técnica.
              </p>
              <p>
                Cuando no estoy diseñando, me encontrás nadando, en Pilates o TPA, tomando un mate cocido —acá le decimos "yerbiado"— o pidiendo pizza con papas fritas.
              </p>
            </motion.div>

            <div className="grid grid-cols-3 sm:grid-cols-5 gap-x-2 gap-y-7 mt-10">
              {interests.map(({ name, label, rotate }, i) => (
                <Sticker key={name} name={name} label={label} rotate={rotate} size={64} delay={i * 0.07} className="justify-self-center" />
              ))}
            </div>
          </div>

          {/* Asymmetric photo collage — one hero shot, two accents */}
          <div className="grid grid-cols-2 gap-2.5 md:grid-rows-2 md:h-[440px] lg:h-[500px]">
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
                  alt={photo.alt}
                  className={`w-full h-full object-cover ${photo.position} ${photo.zoom} transition-transform duration-500 ease-out hover:scale-[1.06]`}
                  loading="eager"
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
