export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  avatarUrl: string;
  feedbackText: string;
  rating?: number;
  btlConcept?: string; // Concepto Below The Line asociado
}

export type VideoOrientation = "vertical" | "horizontal";

export interface TestimonialVideo {
  id: string;
  client: string;
  category: string;
  duration: string;
  durationSeconds: number;
  orientation: VideoOrientation;
  poster: string;
  videoSrc: string;
  featured: boolean;
}

export interface FeatureItem {
  text: string;
  included: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string; // Puede ser "$500/mes" o "$1500 pago único"
  description?: string;
  features: FeatureItem[];
  isPopular?: boolean;
  highlightText?: string; // Ej. "Más Popular", "Consultoría Premium"
}

export interface ServiceDetail {
  id: string;
  title: string;
  description: string;
  icon?: string;
  plans: PricingPlan[];
  nichos?: string[]; // Nichos específicos
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: 'Dirección' | 'Marketing' | 'Comercial' | 'Desarrollo' | 'Producción';
  bio: string;
  photoUrl: string;
}

export interface CommunityEvent {
  id: string;
  title: string;
  videoUrl?: string;
  date?: string;
  description?: string;
}
