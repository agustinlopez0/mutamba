// Genera el mapa de una sede (src/assets/mapas/<id>.png) con OpenStreetMap: centrado en la dirección
// (por eso el pin de la web va en el medio) y con los colores de la web.
// Se usa cuando cambia una dirección o se agrega una sede.
//
// Uso:  node scripts/mapa-sede.mjs <id> <lat> <lon>
// Ej.:  node scripts/mapa-sede.mjs roca -32.9530591 -60.6471295
//
// Usa sharp, que viene con Astro (es lo mismo que optimiza las fotos de la web).
// En la web el mapa lleva el crédito «© OpenStreetMap»: lo pide la licencia, no hay que sacarlo.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const id = process.argv[2];
const lat = Number(process.argv[3]);
const lon = Number(process.argv[4]);
if (!id || !process.argv[3] || !process.argv[4] || Number.isNaN(lat) || Number.isNaN(lon)) {
  console.error('Uso: node scripts/mapa-sede.mjs <id> <lat> <lon>');
  process.exit(1);
}

const ZOOM = 16; // unas 6 cuadras de lado
const LADO = 360; // px: en la web se ve más o menos a este tamaño, así las calles se leen
const raiz = fileURLToPath(new URL('..', import.meta.url));
const cache = `${raiz}node_modules/.cache/mapas-osm`;
mkdirSync(cache, { recursive: true });

// Posición del punto en píxeles del mapa del mundo (la proyección que usa OpenStreetMap).
const n = 2 ** ZOOM;
const px = ((lon + 180) / 360) * n * 256;
const rad = (lat * Math.PI) / 180;
const py = ((1 - Math.asinh(Math.tan(rad)) / Math.PI) / 2) * n * 256;
const x0 = Math.round(px - LADO / 2);
const y0 = Math.round(py - LADO / 2);
const tx0 = Math.floor(x0 / 256);
const ty0 = Math.floor(y0 / 256);
const tx1 = Math.floor((x0 + LADO - 1) / 256);
const ty1 = Math.floor((y0 + LADO - 1) / 256);

// Baja los tiles que hacen falta (o reusa los que ya bajó) y los pega en una sola imagen.
const tiles = [];
for (let ty = ty0; ty <= ty1; ty++) {
  for (let tx = tx0; tx <= tx1; tx++) {
    const archivo = `${cache}/${ZOOM}-${tx}-${ty}.png`;
    if (!existsSync(archivo)) {
      const r = await fetch(`https://tile.openstreetmap.org/${ZOOM}/${tx}/${ty}.png`, {
        headers: { 'User-Agent': 'sede-mapa-estatico/1.0 (uso puntual)' },
      });
      if (!r.ok) throw new Error(`No se pudo bajar el tile ${ZOOM}/${tx}/${ty} (${r.status})`);
      writeFileSync(archivo, Buffer.from(await r.arrayBuffer()));
      await new Promise((listo) => setTimeout(listo, 250)); // sin apurar al servidor de OpenStreetMap
    }
    tiles.push({ input: readFileSync(archivo), left: (tx - tx0) * 256, top: (ty - ty0) * 256 });
  }
}
const mosaico = await sharp({
  create: { width: (tx1 - tx0 + 1) * 256, height: (ty1 - ty0 + 1) * 256, channels: 3, background: '#ffffff' },
})
  .composite(tiles)
  .png()
  .toBuffer();

// Recorte centrado en la dirección y colores de la web: casi sin saturación y con un velo color papel.
const recorte = await sharp(mosaico)
  .extract({ left: x0 - tx0 * 256, top: y0 - ty0 * 256, width: LADO, height: LADO })
  .modulate({ saturation: 0.22 })
  .png()
  .toBuffer();
const velo = await sharp({
  create: { width: LADO, height: LADO, channels: 4, background: { r: 239, g: 232, b: 220, alpha: 0.24 } },
})
  .png()
  .toBuffer();
const salida = `${raiz}src/assets/mapas/${id}.png`;
await sharp(recorte).composite([{ input: velo }]).png().toFile(salida);
console.log(`Listo: ${salida}`);
