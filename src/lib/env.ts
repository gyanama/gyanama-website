// Environment variable validation
// Called once at app startup to surface missing config early
// NOTE: EmailJS credentials are now server-side only (Vercel API route)

export function validateEnv(): void {
  if (!import.meta.env.DEV) return; // Only log in development

  const warnings: string[] = [];

  // Cal.com config (optional but recommended)
  if (!import.meta.env.VITE_CAL_USERNAME) {
    warnings.push(
      'VITE_CAL_USERNAME not set. Scheduling widget disabled; falling back to form-only mode.'
    );
  }

  if (warnings.length > 0) {
    console.warn(
      '%c[Env Validation] Missing optional variables:',
      'color: #f59e0b; font-weight: bold;'
    );
    warnings.forEach((w) => console.warn(`  - ${w}`));
    console.warn('Copy .env.example to .env and fill in values.');
  }
}
