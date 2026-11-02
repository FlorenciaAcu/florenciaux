import type { Lang } from "../i18n/routes";

export const EMAIL = "contact@florenciaux.com";

/** Mismo número en los dos idiomas; el texto con el que se abre el chat se adapta al idioma (`ui.whatsapp.message`). */
export const whatsappUrl = (message: string) => `https://wa.me/5492646271705?text=${encodeURIComponent(message)}`;
export const WHATSAPP_URL = whatsappUrl("Hola Florencia, necesito que me ayudes a diseñar ");

// Agenda de citas de Google Calendar ("Videollamada inicial").
// Link corto: se abre en otra pestaña. Embed: se muestra dentro de la ventana (BookingModal).
export const SCHEDULE_URL = "https://calendar.app.google/kbahgZmfJ5vtMnam9";
export const BOOKING_EMBED_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ1oInnMbdW9TrECZ7LDhkcEojnVptsMT5TTYty75mK1soFnIIK2syHxrgdbydSxz7tGoivLukAO?gv=true";

export const CV_URL =
  "https://docs.google.com/document/d/1O70FGTcqo2q0tnwgErOQUlcODUc8LEDuZI0w3G4l9do/edit?usp=sharing";

/** CV por idioma. Por ahora el de inglés es el mismo documento en español (los textos en inglés avisan "in Spanish"). Cuando exista un CV en inglés
 *  se cambia solo la URL de `en` acá y el aviso en `ui.en.ts` / `home.ts`: los componentes no cambian. */
export const CV_BY_LANG: Record<Lang, string> = { es: CV_URL, en: CV_URL };

export const LINKEDIN_URL = "https://www.linkedin.com/in/florencia-acuna-ux/";
export const MEDIUM_URL = "https://medium.com/@florenciaacuna";
export const INSTAGRAM_URL = "https://www.instagram.com/madebyflors/";
