# Mutamba Capoeira Rosario — web

Landing estática (Astro, sin backend). Objetivo principal: que la gente reserve una clase de prueba por WhatsApp.
Objetivo secundario: difundir el encuentro anual de la escuela (batizado y troca de cordas; cada edición tiene su nombre, la de 2026 fue "Ginga Capoeira").

## Desarrollo

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # genera dist/
npm run preview   # sirve dist/
```

## Deploy en Vercel

Importar el repo en Vercel: detecta Astro solo (build `npm run build`, output `dist`). No hace falta configurar nada.
Si se conecta un dominio propio, definir la variable de entorno `SITE_URL` (ej. `https://mutambarosario.com.ar`)
para que el canonical y la imagen de Open Graph usen ese dominio.

## Dónde se edita cada cosa

Todo el contenido vive en **`src/data/site.ts`**:

| Qué | Dónde |
| --- | --- |
| Teléfono / WhatsApp, Instagram | `contacto` |
| Mensajes pre-cargados de WhatsApp | `mensajesWhatsApp` |
| Direcciones y lugar de cada sede | `sedes` (`lugar` y `rubro`: dónde se dan las clases, ej. "Forja") |
| Clases, horarios, textos y foto de cada clase | `clases` (`horario` es el texto que se ve; el de adultos mayores también aparece en su sección) |
| Profes | `profes` (fotos en `src/assets/profes/`, cuadradas; la de Vero es provisoria) |
| Videos de alumnas (adultos mayores) | `videos` |
| Encuentro anual (batizado) | `encuentro` |
| Otras actividades del año | `actividades` |
| Preguntas frecuentes | `faqs` |

### Encuentro anual (batizado y troca de cordas)

`encuentro.estado` cambia cómo se ve la sección:

- `'pasado'` (actual): la última edición (programa, invitados, galería) + "la fecha la vamos a publicar en Instagram".
- `'proximo'`: misma estructura, pero con botón de inscripción (`encuentro.inscripcion`, link al Google Form).

Cuando se anuncie la próxima edición: actualizar `nombre` (cada año cambia), `edicion`, `fechas`, `inicio` y `fin`
(las mismas fechas en formato estándar, para que Google muestre el evento), `lugar`, `invitados`, `programa`,
`inscripcion` y pasar `estado` a `'proximo'`. Las fotos de la galería se cambian en `src/components/Encuentro.astro`.

### Fotos

Van en `src/assets/fotos/` (JPG, idealmente ≤ 2000px de lado). Astro las convierte a AVIF/WebP en varios tamaños al
hacer build. Se referencian por nombre de archivo sin extensión (ej. `nombre="clase-adultos"`).

### Sedes: foto de la entrada y mapa

Cada sede muestra una foto de la entrada y un mapa, que se buscan por el `id` de la sede (`roca`, `mendoza`):

- Foto: `src/assets/fotos/sede-<id>.jpg` (cuadrada o casi; se recorta al centro).
- Mapa: `src/assets/mapas/<id>.png`, una imagen fija hecha con OpenStreetMap y centrada en la dirección (por eso el
  pin va en el medio). Al tocarla se abre Google Maps.

Si cambia una dirección o se agrega una sede, hay que volver a generar el mapa:

```bash
node scripts/mapa-sede.mjs <id> <lat> <lon>
# ej.: node scripts/mapa-sede.mjs roca -32.9530591 -60.6471295
```

Las coordenadas se sacan de Google Maps: clic derecho sobre el lugar y clic en la primera línea del menú, que las
copia. El crédito «© OpenStreetMap» que aparece sobre el mapa lo pide la licencia: no hay que sacarlo.

### Logo

`src/assets/marca/` tiene el logo oficial vectorizado (SVG) a partir de
capoeiramutamba.com/img/logos/mutamba-logo-slim.jpg, en dos variantes: `logo-mutamba.svg` (fondos claros) y
`logo-mutamba-claro.svg` (fondos oscuros: textos en blanco y rojos un poco más claros para que se lean). Si la escuela
pasa el archivo vectorial original, reemplazar estos dos archivos.

### Favicon

`public/favicon.svg` (un berimbau), con `favicon.ico` y `apple-touch-icon.png` como respaldo para navegadores viejos y
para el ícono del iPhone. Si se cambia el SVG, hay que regenerar los otros dos. `icon-192.png`, `icon-512.png` y
`site.webmanifest` son para cuando alguien agrega la web a la pantalla de inicio en Android.

### SEO y vista previa al compartir

- `/sitemap.xml` y `/robots.txt` se generan solos con la URL del sitio (`SITE_URL` o el dominio de producción de Vercel).
- Los datos estructurados para Google están en `src/layouts/Base.astro`: la escuela, las dos sedes y las preguntas
  frecuentes. Con `encuentro.estado = 'proximo'` también se publica el evento.
- La imagen que aparece al compartir el link es `src/assets/og/og-mutamba.jpg` (1200×630). WhatsApp y Facebook guardan
  la vista previa un tiempo; para forzar que tomen una nueva: https://developers.facebook.com/tools/debug/
- `public/logo-mutamba.png` es el logo que Google puede mostrar junto a la escuela.
- Después de publicar: dar de alta el sitio en Google Search Console y enviar el sitemap.
# mutamba
