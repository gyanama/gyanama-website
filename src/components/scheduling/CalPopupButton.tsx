import { useCallback, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Button, type ButtonProps } from '@/components/ui/button';
import { SITE_CONFIG, ROUTES } from '@/lib/constants';

interface CalPopupButtonProps extends ButtonProps {
  children: ReactNode;
}

export function CalPopupButton({ children, className, onClick, ...props }: CalPopupButtonProps) {
  // Lazy-load Cal API on click to avoid duplicate custom element registration
  const handleClick = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    const { getCalApi } = await import('@calcom/embed-react');
    const cal = await getCalApi();
    cal('ui', {
      theme: 'light',
      cssVarsPerTheme: { light: { 'cal-brand': '#2563eb', 'cal-brand-emphasis': '#1d4ed8' } },
      hideEventTypeDetails: false,
      layout: 'month_view',
    });
    cal('modal', { calLink: SITE_CONFIG.calLink, config: { layout: 'month_view', theme: 'light' } });
  }, [onClick]);

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
      onClick={handleClick}
      {...props}
    >
      {children}
    </Button>
  );
}
