// Centralized configuration and constants
// All hardcoded values (email, phones, routes) live here as single source of truth

export const SITE_CONFIG = {
  name: 'GYANAMA',
  email: 'gyanamaedu@gmail.com',
  phone: '+91 93528 51376',
  phoneRaw: '+919352851376',
  whatsapp: '+919352851376',
  get whatsappUrl() {
    return `https://wa.me/${this.whatsapp.replace('+', '')}`;
  },
  linkedIn: 'https://www.linkedin.com/company/gyanama/',
  calUsername: import.meta.env.VITE_CAL_USERNAME || '',
  calEventSlug: import.meta.env.VITE_CAL_EVENT_SLUG || '15min-demo',
  get calLink() {
    if (!this.calUsername) return '';
    return `${this.calUsername}/${this.calEventSlug}`;
  },
  get isCalConfigured() {
    return !!this.calUsername;
  },
} as const;

// EmailJS credentials are now server-side only (Vercel API route)
// No EMAILJS config exposed to the client bundle

export const ROUTES = {
  home: '/',
  aiSystems: '/ai-systems',
  features: '/features',
  useCases: '/use-cases',
  about: '/about',
  contactUs: '/contact-us',
  bookDemo: '/book-demo',
  privacyPolicy: '/privacy-policy',
  termsOfService: '/terms-of-service',
} as const;
