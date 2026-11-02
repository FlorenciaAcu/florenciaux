import { Header } from "./Header";
import { Footer } from "./Footer";
import { PageLink } from "./PageLink";
import { useI18n } from "../i18n/useI18n";
import { toLangPath } from "../i18n/routes";

/** Solo se ve en revisión (desarrollo o `I18N_PREVIEW=1`): una página en inglés que todavía no está traducida. Nunca se mezcla español dentro del inglés;
 *  esta pantalla lo deja a la vista y enlaza a la versión española. No existe en lo público: ahí una URL inglesa sin traducir es un 404. */
export function PendingTranslation({ esPath }: { esPath: string }) {
  const { ui } = useI18n();
  return (
    <div className="min-h-screen bg-surface-page">
      <Header />
      <main className="pt-20">
        <div className="page-container flex flex-col items-center gap-6 py-40 text-center">
          <p className="type-eyebrow text-magenta-strong">{ui.pending.title}</p>
          <h1 className="type-h1 text-gray-900">{ui.pending.text}</h1>
          <p className="type-body text-gray-600">{esPath}</p>
          <PageLink href={toLangPath(esPath, "es")}>
            {ui.pending.link}
          </PageLink>
        </div>
      </main>
      <Footer />
    </div>
  );
}
