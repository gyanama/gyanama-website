export type SiteRoute = {
  path: string;
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority: number;
};

export const STATIC_ROUTES: SiteRoute[] = [
  { path: '/', changefreq: 'weekly', priority: 1.0 },
  { path: '/ai-systems', changefreq: 'monthly', priority: 0.8 },
  { path: '/features', changefreq: 'monthly', priority: 0.8 },
  { path: '/use-cases', changefreq: 'monthly', priority: 0.7 },
  { path: '/vs-school-management-software', changefreq: 'monthly', priority: 0.8 },
  { path: '/school-erp', changefreq: 'monthly', priority: 0.9 },
  { path: '/fee-management-system', changefreq: 'monthly', priority: 0.8 },
  { path: '/voice-agent-for-schools', changefreq: 'monthly', priority: 0.8 },
  { path: '/ai-for-schools', changefreq: 'monthly', priority: 0.9 },
  { path: '/at-risk-student-detection', changefreq: 'monthly', priority: 0.7 },
  { path: '/ai-timetable-generator', changefreq: 'monthly', priority: 0.7 },
  { path: '/ai-assignment-generator', changefreq: 'monthly', priority: 0.7 },
  { path: '/school-app', changefreq: 'monthly', priority: 0.9 },
  { path: '/school-web-app', changefreq: 'monthly', priority: 0.8 },
  { path: '/student-attendance-management', changefreq: 'monthly', priority: 0.9 },
  { path: '/report-card-generator', changefreq: 'monthly', priority: 0.8 },
  { path: '/homework-app', changefreq: 'monthly', priority: 0.7 },
  { path: '/parent-teacher-communication', changefreq: 'monthly', priority: 0.8 },
  { path: '/for-principals', changefreq: 'monthly', priority: 0.8 },
  { path: '/for-teachers', changefreq: 'monthly', priority: 0.8 },
  { path: '/for-parents', changefreq: 'monthly', priority: 0.8 },
  { path: '/cbse-school-software', changefreq: 'monthly', priority: 0.8 },
  { path: '/boards', changefreq: 'monthly', priority: 0.6 },
  { path: '/plans', changefreq: 'monthly', priority: 0.7 },
  { path: '/security', changefreq: 'monthly', priority: 0.7 },
  { path: '/about', changefreq: 'monthly', priority: 0.6 },
  { path: '/contact-us', changefreq: 'monthly', priority: 0.7 },
  { path: '/book-demo', changefreq: 'monthly', priority: 0.9 },
  { path: '/blog', changefreq: 'daily', priority: 0.8 },
  { path: '/privacy-policy', changefreq: 'yearly', priority: 0.3 },
  { path: '/terms-of-service', changefreq: 'yearly', priority: 0.3 },
];
