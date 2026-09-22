import { useState } from "react";
import { motion } from "motion/react";
import { CalendarDays, Check, Clock, Copy, FileText, UserPlus } from "lucide-react";
import { Button } from "./Button";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { BookingModal } from "./BookingModal";
import { EMAIL, WHATSAPP_URL } from "../data/contact";
import avatar from "../../imports/Florencia_Acu_a.jpg";

export function ClosingCTA() {
  const [copied, setCopied] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section id="contacto" aria-label="Contacto" data-header-theme="dark" className="relative overflow-hidden bg-[#0a0a0a] py-16 lg:py-24">
      {/* Animated gradient blobs — same cinematic language as DetailHero */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="animate-blob-1 absolute -top-24 left-1/4 h-80 w-80 rounded-full bg-[#ff006e] opacity-[0.18] blur-[110px]" />
        <div className="animate-blob-2 absolute bottom-0 -right-24 h-96 w-96 rounded-full bg-[#00e5ff] opacity-[0.16] blur-[120px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
        >
          <p className="text-xs font-semibold text-[#ff006e] uppercase tracking-widest mb-4">Hablemos</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.05] tracking-tight">
            ¿Estás construyendo o mejorando un producto digital?
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-10 max-w-2xl mx-auto">
            Puedo ayudarte a transformar una idea, necesidad o flujo en una experiencia clara, usable y lista para probar, validar o avanzar hacia desarrollo.
          </p>
        </motion.div>

        {/* A "Share" dialog, the way a design tool would show it: invite Florencia into your project. */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto max-w-2xl rounded-3xl border border-white/15 bg-[#14141c]/90 p-5 text-left shadow-[0_24px_70px_rgba(0,0,0,0.55)] sm:p-7"
        >
          <div className="flex items-center gap-2 text-sm font-medium text-gray-200">
            <FileText className="h-4 w-4 text-[#ff006e]" aria-hidden="true" />
            Compartir “Tu próximo producto”
          </div>

          <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-gray-400">Personas con acceso</p>
          <ul className="mt-2 divide-y divide-white/10">
            <li className="flex items-center gap-3 py-3">
              <img src={avatar} alt="" className="h-11 w-11 shrink-0 rounded-full bg-[#2a2a36] object-cover" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white">Florencia Acuña</p>
                <p className="truncate text-xs text-gray-400">Product Designer · San Juan, Argentina</p>
              </div>
              <span className="shrink-0 rounded-md border border-white/15 px-2.5 py-1 text-xs text-gray-200">Diseña</span>
            </li>
            <li className="flex items-center gap-3 py-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-dashed border-white/30 text-gray-300">
                <UserPlus className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white">Vos</p>
                <p className="text-xs text-gray-400">Tenés la idea, el problema o el flujo</p>
              </div>
              <span className="shrink-0 rounded-md border border-[#ff006e]/50 px-2.5 py-1 text-xs text-[#ff7fb3]">Propone</span>
            </li>
          </ul>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Button onClick={() => setBookingOpen(true)} className="flex-1">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              Agendar videollamada
            </Button>
            <Button variant="secondary" theme="dark" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex-1">
              <WhatsAppIcon className="h-4 w-4" />
              Contactar por WhatsApp
            </Button>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-xs text-gray-300">
            <Button variant="tertiary" theme="dark" onClick={copyEmail} className="!px-0">
              {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
              {copied ? "¡Email copiado!" : `Copiar ${EMAIL}`}
            </Button>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden="true" />
              Respondo en 24–48 hs.
            </span>
          </div>
        </motion.div>
      </div>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </section>
  );
}
