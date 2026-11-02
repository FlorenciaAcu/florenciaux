import { useState } from "react";
import { motion } from "motion/react";
import { CalendarDays, Check, Clock, Copy, FileText, UserPlus } from "lucide-react";
import { Button } from "./Button";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { BookingModal } from "./BookingModal";
import { EMAIL, whatsappUrl } from "../data/contact";
import { useI18n } from "../i18n/useI18n";
import avatar from "../../imports/Florencia_Acu_a.jpg";

/** Cierre de contacto de la Home. Otras páginas lo reutilizan cambiando solo el título, la bajada y el texto del botón principal
 *  (los textos por defecto están en i18n/home.ts, en los dos idiomas; los de la tarjeta, en i18n/ui.*.ts). */
export function ClosingCTA({ title, text, cta }: { title?: string; text?: string; cta?: string } = {}) {
  const { ui, home } = useI18n();
  const heading = title ?? home.closing.title;
  const body = text ?? home.closing.text;
  const buttonLabel = cta ?? home.closing.cta;
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
    <section id="contacto" aria-label={ui.closing.ariaLabel} data-header-theme="dark" className="relative overflow-hidden bg-surface-dark py-16 lg:py-24">
      {/* Animated gradient blobs — same cinematic language as DetailHero */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="animate-blob-1 absolute -top-24 left-1/4 h-80 w-80 rounded-full bg-magenta opacity-[0.18] blur-[110px]" />
        <div className="animate-blob-2 absolute bottom-0 -right-24 h-96 w-96 rounded-full bg-cyan opacity-[0.16] blur-[120px]" />
      </div>

      {/* Page container (shared axis). Each element keeps its own centred width: heading = editorial width (max-w-6xl fits it in two lines from ~1200px), description = reading width, share card = component width */}
      <div className="relative page-container text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
        >
          <h2 className="type-h1 text-white mb-6 max-w-6xl mx-auto">
            {heading}
          </h2>
          <p className="type-s1 text-gray-300 mb-10 max-w-3xl mx-auto">
            {body}
          </p>
        </motion.div>

        {/* A "Share" dialog, the way a design tool would show it: you share your project with Florencia. Roles read as permissions, not buttons. */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto max-w-4xl rounded-3xl border border-white/15 bg-[#14141c]/90 p-5 text-left shadow-[0_24px_70px_rgba(0,0,0,0.55)] sm:p-7"
        >
          <div className="flex items-center gap-2 text-[15px] font-medium text-white">
            <FileText className="h-4 w-4 text-magenta" aria-hidden="true" />
            {ui.closing.share}
          </div>

          <p className="type-eyebrow mt-5 text-gray-400">{ui.closing.peopleWithAccess}</p>
          <ul className="mt-1">
            <li className="flex items-center gap-3 py-3.5">
              <img src={avatar} alt="" className="h-11 w-11 shrink-0 rounded-full bg-[#2a2a36] object-cover" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white">Florencia Acuña</p>
                <p className="mt-0.5 text-[13px] text-gray-400">Product Designer</p>
              </div>
              <span className="shrink-0 rounded-md bg-white/[0.07] px-2.5 py-1 text-xs text-gray-300">{ui.closing.role}</span>
            </li>
            <li className="flex items-center gap-3 py-3.5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-dashed border-white/30 text-gray-300">
                <UserPlus className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white">{ui.closing.you}</p>
                <p className="mt-0.5 text-[13px] text-gray-400">{ui.closing.youDescription}</p>
              </div>
              <span className="shrink-0 rounded-md bg-magenta/[0.14] px-2.5 py-1 text-xs text-[#ff7fb3]">{ui.closing.youRole}</span>
            </li>
          </ul>

          <div className="mt-2 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row">
            <Button onClick={() => setBookingOpen(true)} className="flex-1 !py-3 border border-transparent">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              {buttonLabel}
            </Button>
            {/* Secondary action, outlined: it must not compete with the primary one */}
            <Button
              variant="secondary"
              theme="dark"
              href={whatsappUrl(ui.whatsapp.message)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 !py-3 !bg-transparent !shadow-none !backdrop-blur-none"
            >
              <WhatsAppIcon className="h-4 w-4" />
              {ui.closing.whatsapp}
            </Button>
          </div>

          <div className="mt-3.5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-xs text-gray-400">
            <Button variant="tertiary" theme="dark" onClick={copyEmail} className="!px-0 !py-1 !text-gray-300 !font-normal">
              {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
              {copied ? ui.closing.emailCopied : ui.closing.copyEmail(EMAIL)}
            </Button>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {ui.closing.reply}
            </span>
          </div>
        </motion.div>
      </div>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </section>
  );
}
