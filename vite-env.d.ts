/// <reference types="vite/client" />

declare module "*.md?raw" {
  const text: string;
  export default text;
}

// Figma Make resuelve `figma:asset/<hash>.png` contra `src/assets/`
// mediante el plugin `figmaAssetResolver` de vite.config.ts.
declare module "figma:asset/*" {
  const src: string;
  export default src;
}
