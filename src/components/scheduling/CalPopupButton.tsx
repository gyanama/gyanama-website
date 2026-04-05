import { useEffect, type ReactNode } from 'react';
import { getCalApi } from '@calcom/embed-react';
import { Link } from 'react-router-dom';
import { Button, type ButtonProps } from '@/components/ui/button';
import { SITE_CONFIG, ROUTES } from '@/lib/constants';

interface CalPopupButtonProps extends ButtonProps {
  children: ReactNode;
}

export function CalPopupButton({ children, className, ...props }: CalPopupButtonProps) {
  useEffect(() => {
    if (!SITE_CONFIG.isCalConfigured) return;

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

  // Graceful fallback: if Cal.com is not configured, link to the BookDemo page
  if (!SITE_CONFIG.isCalConfigured) {
    return (
      <Link to={ROUTES.bookDemo}>
        <Button className={className} {...props}>
          {children}
        </Button>
      </Link>
    );
  }

  return (
    <Button
      className={className}
      data-cal-link={SITE_CONFIG.calLink}
      data-cal-config='{"layout":"month_view","theme":"light"}'
      {...props}
    >
      {children}
    </Button>
  );
}
