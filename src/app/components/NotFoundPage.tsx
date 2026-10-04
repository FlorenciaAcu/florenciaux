import { Header } from "./Header";
import { Footer } from "./Footer";
import { Button } from "./Button";
import { navigate } from "../lib/router";

/** Shown for any address the site does not have. The server answers it with a real 404 (404.html); this is what the person sees. */
export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-surface-page">
      <Header />
      <main className="pt-20">
        <div className="page-container flex flex-col items-center gap-6 py-40 text-center">
          <p className="type-eyebrow text-magenta-strong">Error 404</p>
          <h1 className="type-h1 text-gray-900">Esta página no existe</h1>
          <p className="type-s1 max-w-xl text-gray-600">
            Puede que el link esté mal escrito o que la página haya cambiado de lugar.
          </p>
          <Button onClick={() => navigate("/")}>Volver al inicio</Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
