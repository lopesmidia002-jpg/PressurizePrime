export interface SiteSettings {
  site_name: string;
  logo_url: string;
  logo_vertical_url?: string;
  primary_color: string;
  secondary_color: string;
  whatsapp_number: string;
  whatsapp_raw: string;
  phone_number: string;
  phone_raw: string;
  business_hours: string;
  address_coverage: string[];
  footer?: {
    footer_logo_url?: string;
    top_banner_title1?: string;
    top_banner_desc1?: string;
    top_banner_title2?: string;
    top_banner_desc2?: string;
    top_banner_title3?: string;
    top_banner_desc3?: string;
    about_text?: string;
    contact_text?: string;
    brands?: string[];
  };
}
export interface SeoMeta {
  page_slug: string;
  meta_title: string;
  meta_description: string;
  keywords?: string;
  canonical_url?: string;
  og_title?: string;
  og_description?: string;
  og_image?: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  full_description?: string;
  icon_name: string;
  image_url?: string;
  features?: string[];
  order: number;
  is_active: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface PageSection {
  id: string;
  section_key: string;
  title?: string;
  subtitle?: string;
  content: any;
  order: number;
  is_active: boolean;
}

export interface PageData {
  id: string;
  slug: string;
  title: string;
  hero_title: string;
  hero_subtitle: string;
  hero_cta_primary: string;
  hero_cta_secondary: string;
  microcopy?: string;
  sections?: Record<string, any>;
  seo?: SeoMeta;
}

export interface LeadFormData {
  name: string;
  whatsapp: string;
  neighborhood: string;
  service_category?: string;
  problem_description: string;
  origin_url?: string;
}

export interface Lead extends LeadFormData {
  id: string | number;
  status: 'novo' | 'em_atendimento' | 'concluido' | 'arquivado';
  created_at: string;
}

export interface User {
  id: string | number;
  name: string;
  email: string;
  role: string;
}

