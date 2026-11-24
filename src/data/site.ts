// ─────────────────────────────────────────────────────────────
// Contenido de la web. Casi todo lo editable vive acá.
// ─────────────────────────────────────────────────────────────

export const contacto = {
  // (0341) 15 570-8406 → formato internacional para WhatsApp
  whatsapp: '5493415708406',
  telefonoVisible: '341 570-8406',
  instagram: 'mutambacapoeirarosario',
  instagramGrupo: 'capoeira_mutamba',
  webGrupo: 'https://www.capoeiramutamba.com/',
};

// Mensaje que aparece escrito al abrir WhatsApp desde cada botón.
export const mensajesWhatsApp = {
  general: 'Hola, quería consultar por las clases de capoeira.',
  adultos: 'Hola, quería consultar por las clases de capoeira para adultos.',
  infantil: 'Hola, quería consultar por las clases de capoeira para chicos.',
  mayores: 'Hola, quería consultar por las clases de capoeira para adultos mayores.',
} as const;

export type MensajeKey = keyof typeof mensajesWhatsApp;

export const waLink = (key: MensajeKey = 'general') =>
  `https://wa.me/${contacto.whatsapp}?text=${encodeURIComponent(mensajesWhatsApp[key])}`;

export const igLink = (user = contacto.instagram) => `https://www.instagram.com/${user}/`;

export const sedes = {
  roca: {
    id: 'roca',
    direccion: 'Pte. Roca 1436',
  },
  mendoza: {
    id: 'mendoza',
    direccion: 'Mendoza 5395',
  },
} as const;

export type SedeId = keyof typeof sedes;

export const mapsLink = (sede: SedeId) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${sedes[sede].direccion}, Rosario, Santa Fe, Argentina`,
  )}`;

export const mapsEmbed = (sede: SedeId) =>
  `https://maps.google.com/maps?q=${encodeURIComponent(
    `${sedes[sede].direccion}, Rosario, Santa Fe, Argentina`,
  )}&z=15&output=embed`;

// `horario` es el texto que se ve en la web.
// `grilla` (dia: 0 = lunes … 5 = sábado) se usa para los datos estructurados que lee Google.
// (  = espacio que no corta: evita que "hs" quede solo en un renglón)
export const clases = [
  {
    id: 'adultos',
    titulo: 'Adultos',
    descripcion:
      'Entrenamos ginga, patadas, esquivas y acrobacias, paso a paso. También aprendemos a tocar el berimbau y el pandeiro, y a cantar. Se puede empezar sin experiencia.',
    horario: 'Lunes, miércoles y viernes, de 20 a 21 hs',
    grilla: [
      { dia: 0, hora: '20:00' },
      { dia: 2, hora: '20:00' },
      { dia: 4, hora: '20:00' },
    ],
    sede: 'roca' as SedeId,
    foto: 'clase-adultos',
    fotoAlt: 'Dos capoeiristas jugando en la roda mientras el grupo toca y canta alrededor',
    whatsapp: 'adultos' as MensajeKey,
  },
  {
    id: 'infantil',
    titulo: 'Infantil',
    descripcion: 'Para chicos de 8 a 14 años. Aprenden capoeira jugando: movimientos, acrobacias, música y canto.',
    horario: 'Viernes a las 20 hs y sábados a las 10 hs',
    grilla: [
      { dia: 4, hora: '20:00' },
      { dia: 5, hora: '10:00' },
    ],
    sede: 'roca' as SedeId,
    foto: 'clase-infantil',
    fotoAlt: 'Un profesor y una nena entrenando juntos un movimiento de capoeira',
    whatsapp: 'infantil' as MensajeKey,
  },
  {
    id: 'mayores',
    titulo: 'Adultos mayores',
    descripcion:
      'Capoeira adaptada. Trabajamos movilidad, equilibrio y coordinación, y también tocamos instrumentos y cantamos.',
    horario: 'Martes y jueves a las 11 hs',
    grilla: [
      { dia: 1, hora: '11:00' },
      { dia: 3, hora: '11:00' },
    ],
    sede: 'mendoza' as SedeId,
    foto: 'clase-adultos-mayores',
    fotoAlt: 'Una alumna del grupo de adultos mayores abrazada a su profesor',
    whatsapp: 'mayores' as MensajeKey,
  },
] as const;

export const profes = [
  {
    nombre: 'Profesor Nico',
    rol: 'A cargo de Mutamba Rosario',
    texto: 'Profesor de Educación Física. En 2026 cumplió 20 años compartiendo capoeira.',
    instagram: 'profnicomacdonald',
    foto: 'nico',
  },
  {
    nombre: 'Graduada Vero',
    rol: 'Mutamba Rosario',
    texto: '',
    instagram: 'capellovero',
    // foto provisoria, recortada de una foto grupal
    foto: 'vero',
  },
  {
    nombre: 'Mestre Javali',
    rol: 'Fundador de Capoeira Mutamba',
    texto:
      'Empezó a entrenar en 1986 en el nordeste de Brasil y formó grupos en distintos países de Sudamérica. Ya instalado en Estados Unidos, fundó Capoeira Mutamba.',
    instagram: 'capoeira_mutamba',
    foto: 'javali',
  },
] as const;

// Videos de alumnas del grupo de adultos mayores, publicados en el Instagram de la escuela.
export const videos = [
  { nombre: 'Esther', edad: 90, post: 'https://www.instagram.com/p/DY0PuUTpRO3/' },
  { nombre: 'Rosa', edad: 67, post: 'https://www.instagram.com/p/DXPzsGdiWlf/' },
  { nombre: 'Patricia', edad: 61, post: 'https://www.instagram.com/p/DXug96ACTgf/' },
] as const;

// ─────────────────────────────────────────────────────────────
// Encuentro anual: batizado y troca de cordas.
// Cada edición tiene su propio nombre (2026: "Ginga Capoeira").
//
// estado: 'pasado'  → muestra la última edición + galería + "la fecha la publicamos en Instagram"
//         'proximo' → muestra fecha, lugar, programa, invitados y botón de inscripción
// ─────────────────────────────────────────────────────────────
export const encuentro = {
  estado: 'pasado' as 'pasado' | 'proximo',
  nombre: 'Ginga Capoeira',
  edicion: 2026,
  fechas: '13 y 14 de noviembre',
  // Las mismas fechas en formato estándar, para Google (inicio con hora de Argentina).
  inicio: '2026-11-13T19:00:00-03:00',
  fin: '2026-11-14',
  lugar: 'Mendoza 4357, Rosario',
  inscripcion: 'https://forms.gle/d74nxBRqDtUEL5Km9',
  invitados: [
    { nombre: 'Mestre Biriba', grupo: 'Berimbau Arte Brasil' },
    { nombre: 'Contramestre Congo', grupo: 'Ganga Zumbi' },
    { nombre: 'Contramestre Malicia', grupo: 'Beribazu' },
    { nombre: 'Contramestre Emanuel', grupo: 'Projete Liberdade' },
    { nombre: 'Contramestre Grosso', grupo: 'Mutamba Buenos Aires' },
    { nombre: 'Professor Keke', grupo: 'Capoeira Brasil' },
    { nombre: 'Professor Queixada', grupo: 'Ganga Zumbi' },
    { nombre: 'Instrutor Carneiro', grupo: 'Mutamba Buenos Aires' },
  ],
  programa: [
    { dia: 'Viernes 13', items: [['19:00', 'Taller'], ['20:30', 'Roda abierta']] },
    {
      dia: 'Sábado 14',
      items: [
        ['10:00', 'Taller'],
        ['12:00', 'Almuerzo'],
        ['14:00', 'Taller'],
        ['19:00', 'Batizado y troca de cordas'],
      ],
    },
  ],
};

// Otras actividades del año. Se muestran debajo del encuentro.
export const actividades = [
  {
    fecha: 'Mayo 2026',
    titulo: 'Los 20 años de Profesor Nico',
    texto:
      'Para festejar sus 20 años compartiendo capoeira hicimos una semana de clases gratuitas para los tres grupos. Hubo talleres con Contramestre Congo y Professor Queixada, de Ganga Zumbi.',
  },
  {
    fecha: 'Agosto 2026',
    titulo: 'Visita de Contramestre Alexandre',
    texto: 'Vino desde Brasnorte, Mato Grosso (Brasil), y entrenó con los tres grupos.',
  },
] as const;

export const faqs = [
  {
    q: '¿Puedo ir a probar una clase?',
    a: 'Sí, y la primera clase es gratis. Escribinos por WhatsApp y te decimos qué día venir.',
  },
  {
    q: '¿Necesito experiencia o estar en forma?',
    a: 'No. Se empieza por lo básico y cada uno avanza a su ritmo.',
  },
  {
    q: '¿Desde qué edad pueden venir los chicos?',
    a: 'Desde los 8 años. El grupo infantil va de los 8 a los 14.',
  },
  {
    q: '¿Qué ropa llevo?',
    a: 'Un pantalón largo y cómodo, que te deje moverte bien, y una remera.',
  },
  {
    q: '¿Hay clases en verano?',
    a: 'Sí, las clases siguen en enero y febrero.',
  },
  {
    q: '¿Cuánto cuesta?',
    a: 'Te pasamos los valores por WhatsApp.',
  },
  {
    q: '¿Tengo que saber portugués?',
    a: 'No. Las canciones y los nombres de los movimientos están en portugués y se van aprendiendo en las clases.',
  },
  {
    q: '¿Hay golpes?',
    a: 'En las clases las patadas se tiran con control, para que el compañero las esquive.',
  },
] as const;
