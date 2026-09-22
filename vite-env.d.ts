/// <reference types="vite/client" />

// Figma Make resuelve `figma:asset/<hash>.png` contra `src/assets/`
// mediante el plugin `figmaAssetResolver` de vite.config.ts.
declare module "figma:asset/*" {
  const src: string;
  export default src;
}
