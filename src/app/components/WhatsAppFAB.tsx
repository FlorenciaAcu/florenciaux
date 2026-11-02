import { WhatsAppIcon } from "./WhatsAppIcon";
import { whatsappUrl } from "../data/contact";
import { useI18n } from "../i18n/useI18n";

export function WhatsAppFAB() {
  const { ui } = useI18n();
  const handleClick = () => {
    window.open(whatsappUrl(ui.whatsapp.message), "_blank");
  };

  return (
    <button
      onClick={handleClick}
      aria-label={ui.whatsapp.ariaLabel}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20bd59] active:scale-95 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
    >
      <WhatsAppIcon className="w-6 h-6 flex-shrink-0" />
    </button>
  );
}
