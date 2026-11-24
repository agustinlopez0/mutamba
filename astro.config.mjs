// @ts-check
import { defineConfig } from 'astro/config';
import process from 'node:process';

// URL pública: se usa para canonical y Open Graph.
// En Vercel se toma sola del dominio de producción; si conectan un dominio propio,
// definir SITE_URL en las variables de entorno del proyecto (ej. https://mutambarosario.com.ar).
const site =
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:4321');

export default defineConfig({
  site,
  output: 'static',
  build: { inlineStylesheets: 'auto' },
});
