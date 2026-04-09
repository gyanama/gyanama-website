import Cal from '@calcom/embed-react';
import { SITE_CONFIG } from '@/lib/constants';

interface CalEmbedProps {
  className?: string;
}

export function CalEmbed({ className }: CalEmbedProps) {
  // Cal UI theme is configured globally in App.tsx — no duplicate getCalApi() call here

  if (!SITE_CONFIG.isCalConfigured) {
    return null;
  }

  return (
    <Cal
      calLink={SITE_CONFIG.calLink}
      style={{ width: '100%', height: '100%', overflow: 'scroll' }}
      className={className}
      config={{
        layout: 'month_view',
        theme: 'light',
        name: '',
        email: '',
      }}
    />
  );
}
