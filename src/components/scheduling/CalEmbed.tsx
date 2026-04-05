import { useEffect } from 'react';
import Cal, { getCalApi } from '@calcom/embed-react';
import { SITE_CONFIG } from '@/lib/constants';

interface CalEmbedProps {
  className?: string;
}

export function CalEmbed({ className }: CalEmbedProps) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal('ui', {
        theme: 'light',
        cssVarsPerTheme: {
          light: {
            'cal-brand': '#2563eb',
            'cal-brand-emphasis': '#1d4ed8',
          },
        },
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    })();
  }, []);

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
