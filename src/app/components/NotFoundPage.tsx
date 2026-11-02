import { Header } from "./Header";
import { Footer } from "./Footer";
import { Button } from "./Button";
import { navigate } from "../lib/router";
import { useI18n } from "../i18n/useI18n";

/** Shown for any address the site does not have. The server answers it with a real 404 (404.html); this is what the person sees. */
export function NotFoundPage() {
  const { ui, lp } = useI18n();
  return (
    <div className="min-h-screen bg-surface-page">
      <Header />
      <main className="pt-20">
        <div className="page-container flex flex-col items-center gap-6 py-40 text-center">
          <p className="type-eyebrow text-magenta-strong">{ui.notFound.eyebrow}</p>
          <h1 className="type-h1 text-gray-900">{ui.notFound.title}</h1>
          <p className="type-s1 max-w-xl text-gray-600">
            {ui.notFound.text}
          </p>
          <Button onClick={() => navigate(lp("/"))}>{ui.notFound.back}</Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
