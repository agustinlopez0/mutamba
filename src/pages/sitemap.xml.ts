// Mapa del sitio para buscadores: /sitemap.xml
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const inicio = new URL('/', site).href;
  const hoy = new Date().toISOString().slice(0, 10);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${inicio}</loc>
    <lastmod>${hoy}</lastmod>
  </url>
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
