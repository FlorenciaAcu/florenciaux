// `npm run build:review`: un build COMPLETO con las páginas inglesas en revisión incluidas (EN_REVIEW en src/app/i18n/routes.ts), para probar el
// sitio compilado (`npm run preview`) y revisar el HTML de /en/… antes de aprobarlo. No es el build de publicación: `npm run build` nunca incluye inglés
// que no esté en EN_PUBLISHED. Se hace con un script de Node para que las variables de entorno funcionen igual en Windows, macOS y Linux.
import { execSync } from "node:child_process";

const env = { ...process.env, I18N_PREVIEW: "1", VITE_I18N_REVIEW: "1" };
const run = (command) => execSync(command, { stdio: "inherit", env });

run("node scripts/check-i18n.mjs");
run("npx vite build");
run("node scripts/prerender.mjs");
console.log("build:review listo: dist/ incluye las páginas inglesas en revisión. No publicar este build.");
