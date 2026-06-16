// ============================================================================
// masterclassCopy.ts — Fuente ÚNICA de verdad para la landing de la masterclass
// ----------------------------------------------------------------------------
// La masterclass cambia todos los miércoles. Aquí vive TODO el copy de las 3
// versiones (v1/v2/v3), cada una con un ÁNGULO de copywriting distinto, más su
// configuración visual (fuente, fondo animado, acento, intensidad de motion).
//
// Para publicar la versión que ven los visitantes esta semana:
//   → cambia ACTIVE_VERSION (abajo) y vuelve a desplegar.
// El equipo puede previsualizar cualquier versión con ?v=1|2|3 y abrir el
// panel de control interno con ?panel=1.
//
// Los 3 ángulos:
//   v1 · TRANSFORMACIÓN  → el resultado: tu negocio vendiendo en piloto automático
//   v2 · DOLOR           → el costo de no actuar: los leads que se te escapan hoy
//   v3 · AUTORIDAD       → la prueba: el sistema exacto de +500 empresas
// ============================================================================

export type MasterclassVersionId = "v1" | "v2" | "v3";

export type AccentKey = "brand" | "amber";
export type HeroLayout = "centered" | "split";
export type HeroBackgroundMotif = "growth" | "funnel" | "blueprint";

export interface Chip {
  icon: string;
  label: string;
}

export interface LearnBlock {
  num: string;
  icon: string;
  title: string;
  description: string;
  outcome: string;
}

export interface Testimonial {
  stars: number;
  text: string;
  initials: string;
  name: string;
  role: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface StatItem {
  value: number;
  prefix: string;
  suffix: string;
  description: string;
}

export type AuroraIntensity = "soft" | "medium" | "strong";

export interface MasterclassBannerAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface MasterclassBannerSet {
  horizontal: MasterclassBannerAsset;
  vertical: MasterclassBannerAsset;
}

export interface MasterclassMotionVideoAsset {
  src: string;
  width: number;
  height: number;
  durationSeconds: number;
}

export interface VersionVisual {
  /** Familias tipográficas inyectadas como CSS vars (--font-mc-display/body). */
  font: { display: string; body: string };
  /** Acento secundario para indicadores "en vivo"/urgencia. */
  accent: AccentKey;
  /** Aurora minimalista (celeste/azul) — intensidad distinta por versión. */
  aurora: { intensity: AuroraIntensity };
  heroBackground: {
    imageSrc: string;
    motif: HeroBackgroundMotif;
    opacityMobile: number;
    opacityDesktop: number;
  };
}

export interface MasterclassCopy {
  /** Metadatos para el panel interno y el selector público. */
  angle: { id: MasterclassVersionId; name: string; shortLabel: string; tagline: string; description: string };
  visual: VersionVisual;

  ribbon: {
    tone: "alert" | "brand";
    live: string;
    schedule: string;
    badge: string;
    scarcity: string;
  };

  navbar: { kicker: string; badge: string };

  hero: {
    layout: HeroLayout;
    eyebrow: string;
    headline: { lead: string; highlight: string; tail: string };
    subhead: string;
    chips: Chip[];
    countdownLabel: string;
    cta: string;
    ctaNote: string;
    /** Tarjeta lateral (layouts split v2/v3). */
    card: { title: string; subtitle: string };
  };

  stats: StatItem[];

  learn: {
    kicker: string;
    heading: string;
    sub: string;
    blocks: LearnBlock[];
    /** CTA opcional bajo la grilla (la usa el layout centrado v1). */
    underCta?: { text: string; button: string };
  };

  audience: {
    kicker: string;
    heading: string;
    sub: string;
    yesTitle: string;
    yes: string[];
    noTitle: string;
    no: string[];
  };

  mentor: {
    kicker: string;
    name: string;
    role: string;
    company: string;
    bio: string[];
    stats: { value: number; suffix: string; label: string }[];
  };

  testimonials: {
    kicker: string;
    heading: string;
    sub: string;
    list: Testimonial[];
  };

  urgency: {
    eyebrow: string;
    title: string;
    description: string;
    badge: string;
    button: string;
    note: string;
  };

  faq: {
    kicker: string;
    heading: string;
    items: FaqItem[];
  };

  modal: typeof MODAL;
  mobileBar: typeof MOBILE_BAR;
  footer: typeof FOOTER;
  banner: MasterclassBannerSet;
  motionVideo: MasterclassMotionVideoAsset;
}

// ----------------------------------------------------------------------------
// CONTENIDO COMPARTIDO (factual / no cambia entre ángulos)
// ----------------------------------------------------------------------------

const CHIPS: Chip[] = [
  { icon: "📅", label: "Miércoles" },
  { icon: "🕗", label: "8 PM EST · 7 CST · 5 PT" },
  { icon: "⏱", label: "60 min en vivo" },
  { icon: "💻", label: "Zoom" },
];

// Los 8 bloques enseñan lo mismo en cualquier ángulo (es el temario real de la
// clase). Lo que cambia por versión es el encuadre de la sección (kicker/heading/sub).
const LEARN_BLOCKS: LearnBlock[] = [
  {
    num: "01",
    icon: "⚙️",
    title: "CRM configurado y listo para vender — desde cero",
    description:
      "Sin experiencia técnica y sin contratar a nadie. Al terminar esta sección tienes un sistema activo y estructurado, no una demo.",
    outcome: "Tu CRM funcionando el mismo día",
  },
  {
    num: "02",
    icon: "🚀",
    title: "Tu landing page profesional en menos de 10 minutos",
    description:
      "Sin diseñador ni programador. Una página de conversión orientada a capturar leads desde el primer día.",
    outcome: "Landing activa capturando prospectos",
  },
  {
    num: "03",
    icon: "📥",
    title: "Leads que se capturan solos — las 24 horas",
    description:
      "Cada persona que llega a tu negocio queda registrada al instante. Nunca más pierdes un lead por no estar disponible.",
    outcome: "Cero leads perdidos, ni de noche ni en fin de semana",
  },
  {
    num: "04",
    icon: "📅",
    title: "Agenda que se llena sola — sin perseguir a nadie",
    description:
      "El CRM reserva la cita, envía la confirmación y manda recordatorios automáticos. Tú solo apareces a cerrar.",
    outcome: "Menos inasistencias, más cierres",
  },
  {
    num: "05",
    icon: "💳",
    title: "Cobros automáticos — sin perseguir pagos",
    description:
      "Configura tu sistema de cobro una sola vez. El CRM factura, cobra y hace seguimiento sin que toques nada.",
    outcome: "Flujo de caja predecible sin estrés",
  },
  {
    num: "06",
    icon: "✍️",
    title: "Propuestas con firma digital — cierra en minutos",
    description:
      "Se acabó el ir y venir de PDFs por correo. Envías, el cliente firma y el acuerdo queda registrado al instante.",
    outcome: "De semanas a minutos por contrato cerrado",
  },
  {
    num: "07",
    icon: "🤖",
    title: "Onboarding automático — escala sin contratar",
    description:
      "Cada cliente nuevo recibe lo que necesita, en el orden correcto, sin que muevas un dedo. Sirves a 5 o a 500 con el mismo esfuerzo.",
    outcome: "Experiencia premium sin costo operativo extra",
  },
  {
    num: "08",
    icon: "⭐",
    title: "Reseñas reales — sin pedirlas tú mismo",
    description:
      "El sistema detecta al cliente satisfecho y le pide la reseña en Google en el momento perfecto. Tu reputación crece sola.",
    outcome: "Más reseñas, más confianza, más ventas",
  },
];

const AUDIENCE_YES: string[] = [
  "Tienes un negocio o servicio y quieres más clientes sin trabajar más horas",
  "Estás cansado de perder leads y ventas por falta de seguimiento o respuestas tardías",
  "Quieres automatizar tus ventas y operaciones pero no sabes por dónde empezar a nivel técnico",
  "No tienes página web ni CRM de ventas — partimos desde cero contigo en la clase",
  "Estás en EE.UU. y buscas un sistema de escalamiento probado en el mercado hispano",
];

const AUDIENCE_NO: string[] = [
  "Buscas fórmulas mágicas de enriquecimiento rápido sin implementar ningún sistema",
  "Ya tienes captación y cierre 100% automatizados funcionando y no quieres escalarlos",
  "Aún no tienes un negocio activo, ni una idea de servicio, ni clientes definidos",
];

// NOTA: testimonios de muestra. Reemplázalos por textos/capturas reales de
// participantes anteriores antes de publicar (ver punto de honestidad del plan).
const TESTIMONIALS: Testimonial[] = [
  {
    stars: 5,
    text: "En 60 minutos entendí más sobre CRM y flujos automáticos que en meses de videos. Danger va directo a la práctica y sin rodeos.",
    initials: "MG",
    name: "María González",
    role: "Consultora — Miami, FL",
  },
  {
    stars: 5,
    text: "Yo no tenía web ni sistema. Salí de la masterclass con mi landing configurada y capturando mi primer prospecto el mismo día.",
    initials: "RM",
    name: "Ricardo Molina",
    role: "Agente de seguros — Texas",
  },
  {
    stars: 5,
    text: "Llevaba dos años perdiendo oportunidades. Implementé lo aprendido y en solo tres semanas firmé cuatro contratos nuevos.",
    initials: "CV",
    name: "Carolina Vega",
    role: "Dueña de salón — Nueva York",
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "¿Necesito tener página web o un CRM activo para asistir?",
    answer:
      "No. Partimos completamente desde cero. Si no tienes sistemas implementados, es el mejor escenario: verás cómo diseñar la estructura correcta de forma directa.",
  },
  {
    question: "¿Cuánto cuesta el CRM GoHighLevel después de la masterclass?",
    answer:
      "Puedes adquirir tu cuenta directa desde $97/mes, o acceder a través de los planes de implementación de AD Media Solution. En la clase analizamos qué opción conviene según tu modelo.",
  },
  {
    question: "¿Es realmente gratis o me venderán algo al final?",
    answer:
      "La masterclass es 100% gratuita y de alto valor práctico. Al finalizar presentamos una opción de acompañamiento para quienes deseen que nuestro equipo implemente el sistema. Asistir no te obliga a nada.",
  },
  {
    question: "¿En qué zona horaria se transmite?",
    answer:
      "Todos los miércoles a las 8:00 PM EST (este de EE.UU.), lo que equivale a las 7:00 PM CST (centro) y a las 5:00 PM PT (pacífico).",
  },
  {
    question: "¿Qué ocurre si me registro pero no puedo asistir en vivo?",
    answer:
      "Regístrate de igual modo. Te enviaremos información sobre disponibilidad de grabaciones, resúmenes de herramientas y la programación de las próximas fechas en vivo.",
  },
  {
    question: "¿Ofrecen planes de acompañamiento después de la clase?",
    answer:
      "Sí. En AD Media Solution diseñamos planes a la medida de cada empresa para estructurar embudos, automatizar workflows y entrenar a tu equipo. Puedes agendar una sesión privada al término de la clase.",
  },
];

const MENTOR_BIO: string[] = [
  "Ingeniero de software convertido en estratega de marketing y automatización. Creó la metodología de escalamiento con CRM que hoy aplican más de 500 empresas en EE.UU. — desde negocios locales hasta agencias con múltiples clientes.",
  "No da teoría: comparte el sistema exacto que opera a diario para su propia agencia y sus clientes, en vivo, paso a paso y sin rodeos.",
];

const MENTOR_STATS = [
  { value: 500, suffix: "+", label: "empresas" },
  { value: 30, suffix: "+", label: "industrias" },
  { value: 100, suffix: "%", label: "práctico" },
];

const MODAL = {
  badge: "Paso 1 de 2 · Registro gratis",
  title: "Reserva tu acceso a Zoom",
  subtitle:
    "Completa tus datos para recibir el enlace de acceso directo y los materiales complementarios de la clase.",
  labels: { name: "Nombre completo", email: "Correo electrónico", phone: "Teléfono / WhatsApp" },
  placeholders: { name: "Ej. Juan Pérez", email: "juan@ejemplo.com", phone: "Ej. +1 (555) 123-4567" },
  security: "Tus datos están protegidos. Cero spam.",
  submit: "Confirmar mi reserva gratis",
  submitting: "Procesando...",
  successBadge: "¡Lugar asegurado!",
  successTitle: "¡Tu cupo está reservado!",
  successText:
    "Te acabamos de enviar un correo con los detalles y el enlace de acceso a la sala de Zoom para este miércoles a las 8:00 PM EST.",
  close: "Entendido, cerrar",
  summary: { attendee: "Asistente:", email: "Correo:", whatsapp: "WhatsApp:" },
  toasts: {
    incomplete: "Por favor completa todos los campos.",
    success: "¡Registro completado con éxito!",
    error: "Hubo un error al procesar tu registro. Por favor intenta de nuevo.",
  },
};

const MOBILE_BAR = {
  badge: "Masterclass Gratuita",
  schedule: "Miércoles · 8 PM EST",
  cta: "Reservar Gratis →",
};

const FOOTER = {
  copyright: "© 2026 AD Media Solution. Todos los derechos reservados.",
  links: [
    { label: "Privacidad", href: "#" },
    { label: "Términos", href: "#" },
    { label: "Contacto", href: "#" },
  ],
};

// Banner promocional. Coloca los archivos en public/brand/.
// Si faltan, MasterclassBanner no renderiza nada (degradación elegante).
const BANNER = {
  horizontal: {
    src: "/brand/masterclass/banner-v3-horizontal.png",
    alt: "Masterclass gratis con Danger Fernández — próximo miércoles 8 PM (Miami) por Zoom",
    width: 1672,
    height: 941,
  },
  vertical: {
    src: "/brand/masterclass/banner-v3-vertical.png",
    alt: "Masterclass gratis con Danger Fernández — próximo miércoles 8 PM (Miami) por Zoom",
    width: 1122,
    height: 1402,
  },
};

function createBannerSet(version: MasterclassVersionId): MasterclassBannerSet {
  return {
    horizontal: {
      ...BANNER.horizontal,
      src: `/brand/masterclass/banner-${version}-horizontal.png`,
    },
    vertical: {
      ...BANNER.vertical,
      src: `/brand/masterclass/banner-${version}-vertical.png`,
    },
  };
}

const BANNERS: Record<MasterclassVersionId, MasterclassBannerSet> = {
  v1: createBannerSet("v1"),
  v2: createBannerSet("v2"),
  v3: BANNER,
};

const MOTION_VIDEOS: Record<MasterclassVersionId, MasterclassMotionVideoAsset> = {
  v1: {
    src: "/brand/masterclass/videos/video-v1-horizontal.mp4",
    width: 1280,
    height: 720,
    durationSeconds: 8,
  },
  v2: {
    src: "/brand/masterclass/videos/video-v2-horizontal.mp4",
    width: 1280,
    height: 720,
    durationSeconds: 4,
  },
  v3: {
    src: "/brand/masterclass/videos/video-v3-horizontal.mp4",
    width: 1280,
    height: 720,
    durationSeconds: 4,
  },
};

const SANS = { display: "'Fraunces', Georgia, serif", body: "'DM Sans', system-ui, sans-serif" };

// ----------------------------------------------------------------------------
// LAS 3 VERSIONES
// ----------------------------------------------------------------------------

export const VERSIONS: Record<MasterclassVersionId, MasterclassCopy> = {
  // ==========================================================================
  // v1 · TRANSFORMACIÓN — el resultado, el "después". Layout centrado, Syne.
  // ==========================================================================
  v1: {
    angle: {
      id: "v1",
      name: "Transformación",
      shortLabel: "Resultado",
      tagline: "El resultado / piloto automático",
      description:
        "Hero centrado (Syne) + fondo de crecimiento. Vende la transformación: dónde estará tu negocio después de implementar.",
    },
    visual: {
      font: { display: "'Syne', sans-serif", body: "'Inter', sans-serif" },
      accent: "brand",
      aurora: { intensity: "soft" },
      heroBackground: {
        imageSrc: "/masterclass/backgrounds/hero-v1-resultado.png",
        motif: "growth",
        opacityMobile: 0.17,
        opacityDesktop: 0.34,
      },
    },
    ribbon: {
      tone: "alert",
      live: "EN VIVO",
      schedule: "Miércoles · 8 PM EST · Zoom",
      badge: "100% GRATIS",
      scarcity: "Cupos limitados",
    },
    navbar: { kicker: "Danger Fernández en vivo", badge: "Masterclass Gratuita" },
    hero: {
      layout: "centered",
      eyebrow: "Masterclass en vivo · Este miércoles",
      headline: {
        lead: "Sal de esta clase con un negocio que",
        highlight: "vende en piloto automático",
        tail: "",
      },
      subhead:
        "En 60 minutos montamos, en vivo, el sistema de CRM y automatización que capta leads, agenda, cobra y cierra por ti. Sin experiencia técnica, sin contratar a nadie.",
      chips: CHIPS,
      countdownLabel: "La sesión comienza en",
      cta: "✅ Quiero mi sistema funcionando",
      ctaNote: "Sin costo · Sin tarjeta de crédito · Solo tu nombre y correo",
      card: {
        title: "Reserva tu lugar — empieza a automatizar hoy",
        subtitle:
          "La sala de Zoom tiene cupo limitado. Las últimas ediciones se llenaron antes del miércoles.",
      },
    },
    stats: [
      { value: 500, prefix: "+", suffix: "", description: "empresas escaladas" },
      { value: 30, prefix: "+", suffix: "", description: "industrias transformadas" },
      { value: 50, prefix: "$", suffix: "K", description: "al mes es alcanzable" },
      { value: 100, prefix: "", suffix: "%", description: "online y en vivo" },
    ],
    learn: {
      kicker: "Lo que aprenderás",
      heading: "8 bloques. 60 minutos.\nTu negocio nunca vuelve a ser el mismo.",
      sub: "Todo lo que siempre quisiste automatizar — en una sola sesión en vivo, paso a paso, sin jerga técnica.",
      blocks: LEARN_BLOCKS,
      underCta: { text: "Todo esto en 60 minutos, en vivo, gratis.", button: "✅ Quiero aprender esto gratis" },
    },
    audience: {
      kicker: "¿Es para ti?",
      heading: "Diseñado para quienes ya están listos para escalar",
      sub: "No para todos. Para quienes están listos para que su negocio trabaje sin ellos.",
      yesTitle: "✅ Sí es para ti si…",
      yes: AUDIENCE_YES,
      noTitle: "❌ No es para ti si…",
      no: AUDIENCE_NO,
    },
    mentor: {
      kicker: "Tu mentor",
      name: "Danger Fernández",
      role: "CEO & Fundador",
      company: "AD Media Solution",
      bio: MENTOR_BIO,
      stats: MENTOR_STATS,
    },
    testimonials: {
      kicker: "Edición anterior",
      heading: "Lo que opinan los asistentes anteriores",
      sub: "Profesionales que pasaron de hacer todo a mano a un negocio que trabaja por ellos.",
      list: TESTIMONIALS,
    },
    urgency: {
      eyebrow: "Tu próximo movimiento",
      title: "Tu negocio puede empezar a vender solo\neste mismo miércoles.",
      description:
        "La sala de Zoom tiene cupo limitado y las sesiones se llenan con días de anticipación. El evento es 100% gratuito.",
      badge: "Cupos limitados — se agotan rápido",
      button: "✅ Quiero mi sistema funcionando",
      note: "Sin costo · Sin tarjeta de crédito · Confirmación inmediata",
    },
    faq: { kicker: "Dudas frecuentes", heading: "Preguntas frecuentes", items: FAQ_ITEMS },
    modal: MODAL,
    mobileBar: MOBILE_BAR,
    footer: FOOTER,
    banner: BANNERS.v1,
    motionVideo: MOTION_VIDEOS.v1,
  },

  // ==========================================================================
  // v2 · DOLOR — el costo de no actuar. Layout split, Fraunces, fondo de flujo.
  // ==========================================================================
  v2: {
    angle: {
      id: "v2",
      name: "Dolor",
      shortLabel: "Dolor",
      tagline: "El costo de no actuar",
      description:
        "Hero split (Fraunces) + fondo de flujo de leads. Aversión a la pérdida: lo que se te escapa cada día que sigues manual.",
    },
    visual: {
      font: SANS,
      accent: "amber",
      aurora: { intensity: "medium" },
      heroBackground: {
        imageSrc: "/masterclass/backgrounds/hero-v2-dolor.png",
        motif: "funnel",
        opacityMobile: 0.15,
        opacityDesktop: 0.32,
      },
    },
    ribbon: {
      tone: "brand",
      live: "En vivo este miércoles",
      schedule: "8 PM EST — Zoom",
      badge: "100% Gratis",
      scarcity: "Cupos limitados",
    },
    navbar: { kicker: "Danger Fernández en vivo", badge: "Masterclass Gratuita" },
    hero: {
      layout: "split",
      eyebrow: "Masterclass en vivo · Este miércoles",
      headline: {
        lead: "Cada lead que no respondes a tiempo",
        highlight: "lo cierra tu competencia",
        tail: "",
      },
      subhead:
        "Mientras haces todo a mano, los leads se enfrían y se van. En 60 minutos te mostramos cómo frenar la fuga con CRM y automatización — sin experiencia técnica, sin contratar a nadie.",
      chips: CHIPS,
      countdownLabel: "La sesión comienza en",
      cta: "✅ Quiero dejar de perder clientes",
      ctaNote: "Sin costo · Sin tarjeta de crédito",
      card: {
        title: "Frena la fuga de leads — empieza este miércoles",
        subtitle:
          "La sala de Zoom tiene cupo limitado. Las últimas ediciones se llenaron antes del miércoles.",
      },
    },
    stats: [
      { value: 500, prefix: "+", suffix: "", description: "empresas escaladas" },
      { value: 30, prefix: "+", suffix: "", description: "industrias transformadas" },
      { value: 60, prefix: "", suffix: "", description: "minutos para frenar la fuga" },
      { value: 100, prefix: "", suffix: "%", description: "online y en vivo" },
    ],
    learn: {
      kicker: "Lo que vas a tapar",
      heading: "8 fugas de dinero.\nUna por una, en 60 minutos.",
      sub: "Cada bloque cierra una grieta por donde hoy se te escapan clientes y horas. En vivo, paso a paso.",
      blocks: LEARN_BLOCKS,
    },
    audience: {
      kicker: "¿Es para ti?",
      heading: "Diseñado para quienes ya están listos para escalar",
      sub: "No para todos. Para quienes están hartos de ver cómo se les escapan los clientes.",
      yesTitle: "✅ Sí es para ti si…",
      yes: AUDIENCE_YES,
      noTitle: "❌ No es para ti si…",
      no: AUDIENCE_NO,
    },
    mentor: {
      kicker: "Tu mentor",
      name: "Danger Fernández",
      role: "CEO & Fundador",
      company: "AD Media Solution",
      bio: MENTOR_BIO,
      stats: MENTOR_STATS,
    },
    testimonials: {
      kicker: "Edición anterior",
      heading: "Lo que opinan los asistentes anteriores",
      sub: "Dejaron de perder leads y empezaron a cerrar lo que antes se les escapaba.",
      list: TESTIMONIALS,
    },
    urgency: {
      eyebrow: "El costo de esperar",
      title: "Cada semana que esperas,\notra ronda de leads se enfría.",
      description:
        "Mientras lo piensas, tu competencia ya responde en segundos. La sala de Zoom tiene cupo limitado y el evento es 100% gratuito.",
      badge: "Cupos limitados por Zoom — se agotan rápido",
      button: "✅ Quiero dejar de perder clientes",
      note: "Sin costo · Sin tarjeta de crédito · Confirmación inmediata",
    },
    faq: { kicker: "Preguntas frecuentes", heading: "Todo lo que necesitas saber", items: FAQ_ITEMS },
    modal: MODAL,
    mobileBar: MOBILE_BAR,
    footer: FOOTER,
    banner: BANNERS.v2,
    motionVideo: MOTION_VIDEOS.v2,
  },

  // ==========================================================================
  // v3 · AUTORIDAD — la prueba, el sistema probado. Split, Fraunces, red de nodos.
  // ==========================================================================
  v3: {
    angle: {
      id: "v3",
      name: "Autoridad",
      shortLabel: "Autoridad",
      tagline: "La prueba / sistema probado",
      description:
        "Hero split (Fraunces) + fondo de red. Prueba social y especificidad: el sistema exacto que ya opera para +500 empresas.",
    },
    visual: {
      font: SANS,
      accent: "brand",
      aurora: { intensity: "strong" },
      heroBackground: {
        imageSrc: "/masterclass/backgrounds/hero-v3-autoridad.png",
        motif: "blueprint",
        opacityMobile: 0.18,
        opacityDesktop: 0.36,
      },
    },
    ribbon: {
      tone: "brand",
      live: "En vivo este miércoles",
      schedule: "8:00 PM EST (7 PM CST / 5 PM PT)",
      badge: "Zoom 100% Gratis",
      scarcity: "Cupos limitados",
    },
    navbar: { kicker: "Danger Fernández en vivo", badge: "Masterclass Gratuita" },
    hero: {
      layout: "split",
      eyebrow: "Danger Fernández · En vivo este miércoles",
      headline: {
        lead: "El sistema exacto que aplican +500 empresas para escalar a",
        highlight: "$50K/mes",
        tail: "",
      },
      subhead:
        "No es teoría. Danger te muestra en vivo, paso a paso, el mismo sistema de CRM y automatización que opera a diario para +500 empresas en +30 industrias.",
      chips: CHIPS,
      countdownLabel: "La sesión comienza en",
      cta: "✅ Ver el sistema en vivo",
      ctaNote: "Sin costo · Sin tarjeta de crédito · Registro inmediato",
      card: {
        title: "Asegura tu cupo — el sistema probado, en vivo",
        subtitle:
          "La sala de Zoom tiene un límite estricto de participantes. Las últimas ediciones se llenaron antes del inicio.",
      },
    },
    stats: [
      { value: 500, prefix: "+", suffix: "", description: "empresas escaladas" },
      { value: 30, prefix: "+", suffix: "", description: "industrias transformadas" },
      { value: 60, prefix: "", suffix: "", description: "minutos del sistema en vivo" },
      { value: 100, prefix: "", suffix: "%", description: "online y en vivo" },
    ],
    learn: {
      kicker: "El sistema, por dentro",
      heading: "Los 8 bloques del sistema\nque ya opera para +500 empresas.",
      sub: "El mismo método que Danger implementa a diario — en una sola sesión práctica, paso a paso, sin tecnicismos.",
      blocks: LEARN_BLOCKS,
    },
    audience: {
      kicker: "¿Es para ti?",
      heading: "Diseñado para quienes ya están listos para escalar",
      sub: "No para todos. Para quienes buscan un sistema probado, no otra teoría.",
      yesTitle: "✅ Sí es para ti si…",
      yes: AUDIENCE_YES,
      noTitle: "❌ No es para ti si…",
      no: AUDIENCE_NO,
    },
    mentor: {
      kicker: "Tu mentor",
      name: "Danger Fernández",
      role: "CEO & Fundador",
      company: "AD Media Solution",
      bio: MENTOR_BIO,
      stats: MENTOR_STATS,
    },
    testimonials: {
      kicker: "Testimonios",
      heading: "Lo que opinan los asistentes anteriores",
      sub: "Empresarios y profesionales que automatizaron sus procesos con el mismo sistema.",
      list: TESTIMONIALS,
    },
    urgency: {
      eyebrow: "Asegura tu lugar",
      title: "Tu competencia ya está automatizando.\n¿Y tú?",
      description:
        "La sala de Zoom tiene un límite estricto de accesos y las sesiones se llenan con días de anticipación. El evento es 100% gratuito.",
      badge: "Cupos limitados por Zoom — se agotan rápido",
      button: "✅ Reservar mi cupo gratuito",
      note: "Sin costo de registro · Sin tarjeta de crédito · Confirmación inmediata",
    },
    faq: { kicker: "Dudas frecuentes", heading: "Preguntas frecuentes", items: FAQ_ITEMS },
    modal: MODAL,
    mobileBar: MOBILE_BAR,
    footer: FOOTER,
    banner: BANNERS.v3,
    motionVideo: MOTION_VIDEOS.v3,
  },
};

// ----------------------------------------------------------------------------
// PUBLICACIÓN
// ----------------------------------------------------------------------------

/** Versión que ven los visitantes por defecto. Cámbiala cada miércoles. */
export const ACTIVE_VERSION: MasterclassVersionId = "v3";

export const VERSION_IDS: MasterclassVersionId[] = ["v1", "v2", "v3"];

/** Devuelve el copy de una versión (con fallback a la activa). */
export function getVersion(id?: string | null): MasterclassCopy {
  if (id === "v1" || id === "v2" || id === "v3") return VERSIONS[id];
  return VERSIONS[ACTIVE_VERSION];
}
