import { WhatsAppIcon } from "./WhatsAppIcon";
import { WHATSAPP_URL } from "../data/contact";

export function WhatsAppFAB() {
  const handleClick = () => {
    window.open(WHATSAPP_URL, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20bd59] active:scale-95 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
    >
      <WhatsAppIcon className="w-6 h-6 flex-shrink-0" />
    </button>
  );
}
