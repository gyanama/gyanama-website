import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Button, type ButtonProps } from '@/components/ui/button';
import { SITE_CONFIG, ROUTES } from '@/lib/constants';

interface CalPopupButtonProps extends ButtonProps {
  children: ReactNode;
}

export function CalPopupButton({ children, className, ...props }: CalPopupButtonProps) {
  // Cal UI theme is configured globally in App.tsx — no duplicate getCalApi() call here

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
