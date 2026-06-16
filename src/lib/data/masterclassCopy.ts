// ============================================================================
// masterclassCopy.ts — Fuente ÚNICA de verdad para la landing de la masterclass
// ----------------------------------------------------------------------------
// Arquitectura de DOS EJES independientes (elegibles con un clic):
//   • COPY  (texto)        → 4 opciones: c1/c2/c3/c4   (ver COPIES)
//   • VISUAL (presentación) → 3 modos:    m1/m2/m3      (ver VISUALS)
// Cualquier copy se puede ver en cualquier modo visual: 4 × 3 = 12 combinaciones.
//
// Para publicar lo que ven los visitantes por defecto:
//   → cambia ACTIVE_COPY y ACTIVE_VISUAL (abajo) y vuelve a desplegar.
// Previsualización: ?copy=1..4 y ?visual=1..3 (acepta c1/m1). Compat: ?v=1|2|3.
// Panel de control interno: ?panel=1.
//
// Los 4 copys:
//   c1 · TRANSFORMACIÓN  → el resultado: tu negocio vendiendo en piloto automático
//   c2 · DOLOR           → el costo de no actuar: los leads que se te escapan hoy
//   c3 · AUTORIDAD       → la prueba: el sistema exacto de +500 empresas
//   c4 · DE CERO A $50K  → copy aprobado (fusión fiel de los 2 HTML); no se edita
//
// Los 3 modos visuales (extraídos tal cual de los visuales originales v1/v2/v3):
//   m1 · Crecimiento  → Syne, acento brand, fondo growth, learn en tarjetas
//   m2 · Embudo       → Fraunces, acento amber, fondo funnel, learn en lista
//   m3 · Blueprint    → Fraunces, acento brand, fondo blueprint, learn en tarjetas
//
// Brief de copy (voz, ICP, oferta, límites de longitud, estado de claims):
//   .claude/product-marketing.md  ← leer antes de editar este copy.
// ============================================================================

export type CopyId = "c1" | "c2" | "c3" | "c4";
export type VisualId = "m1" | "m2" | "m3";

export type AccentKey = "brand" | "amber";
export type HeroBackgroundMotif = "growth" | "funnel" | "blueprint";
export type AuroraIntensity = "soft" | "medium" | "strong";
export type RibbonTone = "alert" | "brand";
export type NavbarBadgeStyle = "soft" | "outline" | "filled";
export type LearnLayout = "cards" | "list";

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

export interface GhostActivityCopy {
  names: string[];
  message: string;
}

export interface MasterclassReplayCopy {
  kicker: string;
  title: string;
  description: string;
  placeholderLabel: string;
  videoSrc?: string;
}

// ----------------------------------------------------------------------------
// EJE 1 · COPY (solo texto, sin presentación)
// ----------------------------------------------------------------------------

export interface MasterclassCopy {
  /** Metadatos para el panel interno y el selector público. */
  angle: { id: CopyId; name: string; shortLabel: string; tagline: string; description: string };

  ribbon: {
    live: string;
    schedule: string;
    badge: string;
    scarcity: string;
  };

  navbar: { kicker: string; badge: string };

  hero: {
    eyebrow: string;
    headline: { lead: string; highlight: string; tail: string };
    subhead: string;
    chips: Chip[];
    countdownLabel: string;
    cta: string;
    ctaNote: string;
    /** Tarjeta lateral (se muestra en modos con layout split). */
    card: { title: string; subtitle: string };
  };

  stats: StatItem[];

  learn: {
    kicker: string;
    heading: string;
    sub: string;
    blocks: LearnBlock[];
    /** CTA opcional bajo la grilla. */
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
  ghostActivity?: GhostActivityCopy;
  replay?: MasterclassReplayCopy;
}

// ----------------------------------------------------------------------------
// EJE 2 · VISUAL (solo presentación: tipografía, color, fondo, banner, layout)
// ----------------------------------------------------------------------------

export interface MasterclassVisual {
  /** Metadatos para el panel interno y el selector público. */
  id: VisualId;
  name: string;
  shortLabel: string;
  description: string;
  /** Familias tipográficas inyectadas como CSS vars (--font-mc-display/body). */
  font: { display: string; body: string };
  /** Acento secundario para indicadores "en vivo"/urgencia. */
  accent: AccentKey;
  /** Aurora minimalista (celeste/azul) — intensidad por modo. */
  aurora: { intensity: AuroraIntensity };
  heroBackground: {
    imageSrc: string;
    motif: HeroBackgroundMotif;
    opacityMobile: number;
    opacityDesktop: number;
  };
  banner: MasterclassBannerSet;
  motionVideo: MasterclassMotionVideoAsset;
  /** Tono del ribbon superior (color del punto/badge "en vivo"). */
  ribbonTone: RibbonTone;
  /** Estilo del badge del navbar. */
  navbarBadge: NavbarBadgeStyle;
  /** Layout de la grilla "Lo que aprenderás". */
  learnLayout: LearnLayout;
}

// ----------------------------------------------------------------------------
// CONTENIDO COMPARTIDO (factual / no cambia entre copys)
// ----------------------------------------------------------------------------

const CHIPS: Chip[] = [
  { icon: "📅", label: "Miércoles" },
  { icon: "🕗", label: "8 PM EST · 7 CST · 5 PT" },
  { icon: "⏱", label: "60 min en vivo" },
  { icon: "💻", label: "Zoom" },
];

// Los 8 bloques enseñan lo mismo en cualquier copy (es el temario real de la
// clase). Lo que cambia por copy es el encuadre de la sección (kicker/heading/sub).
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

// CLAIM PENDIENTE DE EVIDENCIA — testimonios de muestra. Reemplázalos por
// testimonios reales aprobados antes de publicar (ver .claude/product-marketing.md §6
// y docs/CLAIMS_APPROVAL_REGISTER.md).
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
      "Regístrate igual. Te enviamos el resumen de herramientas y la fecha de la próxima sesión en vivo. Si hay grabación disponible, también te avisamos.",
  },
  {
    question: "¿Ofrecen planes de acompañamiento después de la clase?",
    answer:
      "Sí. En AD Media Solution diseñamos planes a la medida de cada empresa para estructurar embudos, automatizar workflows y entrenar a tu equipo. Puedes agendar una sesión privada al término de la clase.",
  },
];

// CLAIM PENDIENTE DE EVIDENCIA — validar bio y cifras de Danger antes de publicar
// (ver .claude/product-marketing.md §6 y docs/CLAIMS_APPROVAL_REGISTER.md).
const MENTOR_BIO: string[] = [
  "Ingeniero de software convertido en estratega de marketing y automatización. Creó la metodología de escalamiento con CRM que hoy aplican más de 500 empresas en EE.UU. — desde negocios locales hasta agencias con múltiples clientes.",
  "No da teoría: comparte el sistema exacto que opera a diario para su propia agencia y sus clientes, en vivo, paso a paso y sin rodeos.",
];

// CLAIM PENDIENTE DE EVIDENCIA — "+500 empresas" / "+30 industrias" pendientes de
// validar (ver .claude/product-marketing.md §6). Mantener, no inflar el número.
const MENTOR_STATS = [
  { value: 500, suffix: "+", label: "empresas" },
  { value: 30, suffix: "+", label: "industrias" },
  { value: 100, suffix: "%", label: "práctico" },
];

const REGISTER_MASTERCLASS_CTA = "✅ Registrarme a la masterclass";

const GHOST_ACTIVITY_NAMES = [
  "Maria R.",
  "Carlos M.",
  "Andrea P.",
  "Luis G.",
  "Valeria S.",
  "Jorge T.",
  "Paola C.",
  "Daniel F.",
];

const REPLAY_PLACEHOLDER: MasterclassReplayCopy = {
  kicker: "Momentos de la clase",
  title: "Así se viven nuestras masterclass",
  description: "Un vistazo a los mejores momentos, energía y práctica en vivo.",
  placeholderLabel: "Video de mejores momentos próximamente",
};

const MODAL = {
  badge: "Paso 1 de 2 · Registro gratis",
  title: "Reserva tu acceso a Zoom",
  subtitle:
    "Completa tus datos para recibir el enlace de acceso directo y los materiales complementarios de la clase.",
  labels: { name: "Nombre completo", email: "Correo electrónico", phone: "Teléfono / WhatsApp" },
  placeholders: { name: "Ej. Juan Pérez", email: "juan@ejemplo.com", phone: "Ej. +1 (555) 123-4567" },
  security: "Tus datos están protegidos. Cero spam.",
  submit: "Confirmar mi registro a la masterclass",
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
  cta: "Registrarme gratis →",
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
const BANNER_BASE = {
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

function createBannerSet(suffix: string): MasterclassBannerSet {
  return {
    horizontal: { ...BANNER_BASE.horizontal, src: `/brand/masterclass/banner-${suffix}-horizontal.png` },
    vertical: { ...BANNER_BASE.vertical, src: `/brand/masterclass/banner-${suffix}-vertical.png` },
  };
}

function motionVideo(suffix: string, durationSeconds: number): MasterclassMotionVideoAsset {
  return {
    src: `/brand/masterclass/videos/video-${suffix}-horizontal.mp4`,
    width: 1280,
    height: 720,
    durationSeconds,
  };
}

const SANS = { display: "'Fraunces', Georgia, serif", body: "'DM Sans', system-ui, sans-serif" };
const SYNE = { display: "'Syne', sans-serif", body: "'Inter', sans-serif" };

// ----------------------------------------------------------------------------
// LOS 3 MODOS VISUALES (extraídos tal cual de los visuales originales v1/v2/v3)
// ----------------------------------------------------------------------------

export const VISUALS: Record<VisualId, MasterclassVisual> = {
  // m1 — del visual original v1: Syne, acento brand, fondo growth, hero centrado, learn en tarjetas.
  m1: {
    id: "m1",
    name: "Crecimiento",
    shortLabel: "Crecimiento",
    description: "Syne + Inter · acento azul · fondo de crecimiento · learn en tarjetas.",
    font: SYNE,
    accent: "brand",
    aurora: { intensity: "soft" },
    heroBackground: {
      imageSrc: "/masterclass/backgrounds/hero-v1-resultado.png",
      motif: "growth",
      opacityMobile: 0.17,
      opacityDesktop: 0.34,
    },
    banner: createBannerSet("v1"),
    motionVideo: motionVideo("v1", 8),
    ribbonTone: "alert",
    navbarBadge: "soft",
    learnLayout: "cards",
  },
  // m2 — del visual original v2: Fraunces, acento amber, fondo funnel, learn en lista.
  m2: {
    id: "m2",
    name: "Embudo",
    shortLabel: "Embudo",
    description: "Fraunces + DM Sans · acento ámbar · fondo de flujo · learn en lista.",
    font: SANS,
    accent: "amber",
    aurora: { intensity: "medium" },
    heroBackground: {
      imageSrc: "/masterclass/backgrounds/hero-v2-dolor.png",
      motif: "funnel",
      opacityMobile: 0.15,
      opacityDesktop: 0.32,
    },
    banner: createBannerSet("v2"),
    motionVideo: motionVideo("v2", 4),
    ribbonTone: "brand",
    navbarBadge: "outline",
    learnLayout: "list",
  },
  // m3 — del visual original v3: Fraunces, acento brand, fondo blueprint, learn en tarjetas.
  m3: {
    id: "m3",
    name: "Blueprint",
    shortLabel: "Blueprint",
    description: "Fraunces + DM Sans · acento azul · fondo de red · learn en tarjetas.",
    font: SANS,
    accent: "brand",
    aurora: { intensity: "strong" },
    heroBackground: {
      imageSrc: "/masterclass/backgrounds/hero-v3-autoridad.png",
      motif: "blueprint",
      opacityMobile: 0.18,
      opacityDesktop: 0.36,
    },
    banner: createBannerSet("v3"),
    motionVideo: motionVideo("v3", 4),
    ribbonTone: "brand",
    navbarBadge: "filled",
    learnLayout: "cards",
  },
};

// ----------------------------------------------------------------------------
// LOS 4 COPYS (solo texto)
// ----------------------------------------------------------------------------

export const COPIES: Record<CopyId, MasterclassCopy> = {
  // ==========================================================================
  // c1 · TRANSFORMACIÓN — el resultado, el "después".
  // ==========================================================================
  c1: {
    angle: {
      id: "c1",
      name: "Transformación",
      shortLabel: "Resultado",
      tagline: "El resultado / piloto automático",
      description: "Vende la transformación: dónde estará tu negocio después de implementar.",
    },
    ribbon: {
      live: "EN VIVO",
      schedule: "Miércoles · 8 PM EST · Zoom",
      badge: "100% GRATIS",
      scarcity: "Cupos limitados",
    },
    navbar: { kicker: "Danger Fernández en vivo", badge: "Masterclass Gratuita" },
    hero: {
      eyebrow: "Masterclass en vivo · Este miércoles",
      headline: {
        lead: "Aprende el sistema que escala empresas",
        highlight: "con CRM",
        tail: "y ventas automáticas",
      },
      subhead:
        "En 60 minutos montamos, en vivo, el sistema de CRM y automatización que capta leads, agenda, cobra y cierra por ti. Sin experiencia técnica, sin contratar a nadie.",
      chips: CHIPS,
      countdownLabel: "La sesión comienza en",
      cta: REGISTER_MASTERCLASS_CTA,
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
      heading: "8 bloques. 60 minutos.\nTu negocio empieza a venderse solo.",
      sub: "Todo lo que siempre quisiste automatizar — en una sola sesión en vivo, paso a paso, sin jerga técnica.",
      blocks: LEARN_BLOCKS,
      underCta: { text: "Todo esto en 60 minutos, en vivo, gratis.", button: REGISTER_MASTERCLASS_CTA },
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
      heading: "Lo que dicen quienes ya tomaron la clase",
      sub: "Profesionales que pasaron de hacer todo a mano a un negocio que trabaja por ellos.",
      list: TESTIMONIALS,
    },
    urgency: {
      eyebrow: "Tu próximo movimiento",
      title: "Tu negocio puede empezar a vender solo\neste mismo miércoles.",
      description:
        "Cada miércoles los cupos de Zoom se llenan con días de anticipación. Reserva ahora y empieza a montar tu sistema esta misma semana — gratis.",
      badge: "Cupos limitados — se agotan rápido",
      button: REGISTER_MASTERCLASS_CTA,
      note: "Sin costo · Sin tarjeta de crédito · Confirmación inmediata",
    },
    faq: { kicker: "Dudas frecuentes", heading: "Preguntas frecuentes", items: FAQ_ITEMS },
    modal: MODAL,
    mobileBar: MOBILE_BAR,
    footer: FOOTER,
    ghostActivity: {
      names: GHOST_ACTIVITY_NAMES,
      message: "se registró a la masterclass del miércoles por Zoom.",
    },
    replay: REPLAY_PLACEHOLDER,
  },

  // ==========================================================================
  // c2 · DOLOR — el costo de no actuar.
  // ==========================================================================
  c2: {
    angle: {
      id: "c2",
      name: "Dolor",
      shortLabel: "Dolor",
      tagline: "El costo de no actuar",
      description: "Aversión a la pérdida: lo que se te escapa cada día que sigues manual.",
    },
    ribbon: {
      live: "En vivo este miércoles",
      schedule: "8 PM EST — Zoom",
      badge: "100% Gratis",
      scarcity: "Cupos limitados",
    },
    navbar: { kicker: "Danger Fernández en vivo", badge: "Masterclass Gratuita" },
    hero: {
      eyebrow: "Masterclass en vivo · Este miércoles",
      headline: {
        lead: "Aprende el sistema que escala empresas",
        highlight: "sin perder leads",
        tail: "usando CRM",
      },
      subhead:
        "Mientras haces todo a mano, los leads se enfrían y se van. En 60 minutos te mostramos cómo frenar la fuga con CRM y automatización — sin experiencia técnica, sin contratar a nadie.",
      chips: CHIPS,
      countdownLabel: "La sesión comienza en",
      cta: REGISTER_MASTERCLASS_CTA,
      ctaNote: "Sin costo · Sin tarjeta · Solo tu nombre y correo",
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
      heading: "Lo que dicen quienes ya tomaron la clase",
      sub: "Dejaron de perder leads y empezaron a cerrar lo que antes se les escapaba.",
      list: TESTIMONIALS,
    },
    urgency: {
      eyebrow: "El costo de esperar",
      title: "Cada semana que esperas,\notra ronda de leads se enfría.",
      description:
        "Mientras lo piensas, tu competencia ya responde en segundos. La sala de Zoom tiene cupo limitado y el evento es 100% gratuito.",
      badge: "Cupos limitados por Zoom — se agotan rápido",
      button: REGISTER_MASTERCLASS_CTA,
      note: "Sin costo · Sin tarjeta de crédito · Confirmación inmediata",
    },
    faq: { kicker: "Preguntas frecuentes", heading: "Todo lo que necesitas saber", items: FAQ_ITEMS },
    modal: MODAL,
    mobileBar: MOBILE_BAR,
    footer: FOOTER,
    ghostActivity: {
      names: GHOST_ACTIVITY_NAMES,
      message: "se registró para frenar la fuga de leads este miércoles.",
    },
    replay: REPLAY_PLACEHOLDER,
  },

  // ==========================================================================
  // c3 · AUTORIDAD — la prueba, el sistema probado.
  // ==========================================================================
  c3: {
    angle: {
      id: "c3",
      name: "Autoridad",
      shortLabel: "Autoridad",
      tagline: "La prueba / sistema probado",
      description: "Prueba social y especificidad: el sistema exacto que ya opera para +500 empresas.",
    },
    ribbon: {
      live: "En vivo este miércoles",
      schedule: "8:00 PM EST (7 PM CST / 5 PM PT)",
      badge: "Zoom 100% Gratis",
      scarcity: "Cupos limitados",
    },
    navbar: { kicker: "Danger Fernández en vivo", badge: "Masterclass Gratuita" },
    hero: {
      eyebrow: "Danger Fernández · En vivo este miércoles",
      // CLAIM PENDIENTE — "+500 empresas" y "$50K/mes" son aspiracionales: mantener
      // como meta alcanzable, nunca como garantía (ver .claude/product-marketing.md §6).
      headline: {
        lead: "Aprende el sistema que lleva empresas a",
        highlight: "$50K al mes",
        tail: "con un CRM",
      },
      subhead:
        "No es teoría. Danger te muestra en vivo, paso a paso, el mismo sistema de CRM y automatización que opera a diario para +500 empresas en +30 industrias.",
      chips: CHIPS,
      countdownLabel: "La sesión comienza en",
      cta: REGISTER_MASTERCLASS_CTA,
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
      heading: "Lo que dicen quienes ya tomaron la clase",
      sub: "Empresarios y profesionales que automatizaron sus procesos con el mismo sistema.",
      list: TESTIMONIALS,
    },
    urgency: {
      eyebrow: "Asegura tu lugar",
      title: "Tu competencia ya está automatizando.\n¿Y tú?",
      description:
        "Es el mismo sistema que ya opera para +500 empresas. Los cupos de Zoom se llenan antes del miércoles y entrar es gratis.",
      badge: "Cupos limitados por Zoom — se agotan rápido",
      button: REGISTER_MASTERCLASS_CTA,
      note: "Sin costo de registro · Sin tarjeta de crédito · Confirmación inmediata",
    },
    faq: { kicker: "Dudas frecuentes", heading: "Preguntas frecuentes", items: FAQ_ITEMS },
    modal: MODAL,
    mobileBar: MOBILE_BAR,
    footer: FOOTER,
    ghostActivity: {
      names: GHOST_ACTIVITY_NAMES,
      message: "se registró para ver el sistema CRM en vivo.",
    },
    replay: REPLAY_PLACEHOLDER,
  },

  // ==========================================================================
  // c4 · DE CERO A $50K — copy aprobado, fusión FIEL de los 2 HTML.
  // Texto verbatim de los archivos aprobados; NO aplicar los 7 barridos.
  // ==========================================================================
  c4: {
    angle: {
      id: "c4",
      name: "De cero a $50K",
      shortLabel: "$50K",
      tagline: "De 0 a $50K/mes con CRM",
      description: "Copy aprobado (HTML): el sistema que lleva de 0 a $50K/mes con CRM y automatización.",
    },
    ribbon: {
      live: "En vivo este miércoles",
      schedule: "8 PM EST — Zoom",
      badge: "100% Gratis",
      scarcity: "Cupos limitados",
    },
    navbar: { kicker: "Danger Fernández en vivo", badge: "Masterclass Gratuita" },
    hero: {
      eyebrow: "En vivo este miércoles — Zoom",
      // CLAIM PENDIENTE — "$50K/mes" / "+500 empresas" aspiracionales (copy aprobado en HTML).
      headline: {
        lead: "Aprende el sistema que escala empresas a",
        highlight: "$50K/mes",
        tail: "con CRM",
      },
      subhead:
        "En 60 minutos te mostramos el sistema exacto que usamos para captar leads, cerrar ventas y escalar empresas — sin experiencia técnica, sin contratar a nadie.",
      chips: CHIPS,
      countdownLabel: "La sesión comienza en",
      cta: REGISTER_MASTERCLASS_CTA,
      ctaNote: "Sin costo · Sin tarjeta de crédito · Solo tu nombre y correo",
      card: {
        title: "Reserva tu lugar ahora — es gratis",
        subtitle:
          "Zoom tiene límite de participantes. Las últimas ediciones se llenaron antes del miércoles.",
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
      underCta: { text: "Todo esto en 60 minutos, en vivo, gratis.", button: REGISTER_MASTERCLASS_CTA },
    },
    audience: {
      kicker: "¿Es para ti?",
      heading: "Diseñado para quienes ya están listos para escalar",
      sub: "No para todos. Para los que están hartos de hacer todo manual y perder leads todos los días.",
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
      heading: "Lo que dijeron los que ya asistieron",
      sub: "Profesionales que automatizaron sus procesos con el mismo sistema.",
      list: TESTIMONIALS,
    },
    urgency: {
      eyebrow: "Asegura tu lugar",
      title: "Tu competencia ya está automatizando.\n¿Y tú?",
      description:
        "Zoom tiene límite de participantes. Las últimas ediciones se llenaron antes del miércoles. Es gratis, pero los cupos no son infinitos.",
      badge: "Cupos disponibles — se llenan rápido",
      button: REGISTER_MASTERCLASS_CTA,
      note: "Sin costo · Sin tarjeta de crédito · Solo tu nombre y correo",
    },
    faq: { kicker: "Preguntas frecuentes", heading: "Todo lo que necesitas saber", items: FAQ_ITEMS },
    modal: MODAL,
    mobileBar: MOBILE_BAR,
    footer: FOOTER,
    ghostActivity: {
      names: GHOST_ACTIVITY_NAMES,
      message: "se registró a la masterclass del miércoles por Zoom.",
    },
    replay: REPLAY_PLACEHOLDER,
  },
};

// ----------------------------------------------------------------------------
// PUBLICACIÓN
// ----------------------------------------------------------------------------

/** Copy y modo visual que ven los visitantes por defecto. Cámbialos cada miércoles. */
export const ACTIVE_COPY: CopyId = "c3";
export const ACTIVE_VISUAL: VisualId = "m3";

export const COPY_IDS: CopyId[] = ["c1", "c2", "c3", "c4"];
export const VISUAL_IDS: VisualId[] = ["m1", "m2", "m3"];

/** Compat con links viejos ?v=1|2|3 → par (copy, visual). */
export const LEGACY_VERSION_MAP: Record<string, { copy: CopyId; visual: VisualId }> = {
  "1": { copy: "c1", visual: "m1" },
  v1: { copy: "c1", visual: "m1" },
  "2": { copy: "c2", visual: "m2" },
  v2: { copy: "c2", visual: "m2" },
  "3": { copy: "c3", visual: "m3" },
  v3: { copy: "c3", visual: "m3" },
};

/** Normaliza un parámetro de copy ("1".."4" o "c1".."c4") a un CopyId válido. */
export function toCopyId(id?: string | null): CopyId | null {
  if (!id) return null;
  const v = id.startsWith("c") ? id : `c${id}`;
  return v === "c1" || v === "c2" || v === "c3" || v === "c4" ? (v as CopyId) : null;
}

/** Normaliza un parámetro de modo visual ("1".."3" o "m1".."m3") a un VisualId válido. */
export function toVisualId(id?: string | null): VisualId | null {
  if (!id) return null;
  const v = id.startsWith("m") ? id : `m${id}`;
  return v === "m1" || v === "m2" || v === "m3" ? (v as VisualId) : null;
}

/** Devuelve un copy (con fallback al activo). */
export function getCopy(id?: string | null): MasterclassCopy {
  return COPIES[toCopyId(id) ?? ACTIVE_COPY];
}

/** Devuelve un modo visual (con fallback al activo). */
export function getVisual(id?: string | null): MasterclassVisual {
  return VISUALS[toVisualId(id) ?? ACTIVE_VISUAL];
}
