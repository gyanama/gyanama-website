'use client';

import { useCallback, type MouseEvent, type ReactNode } from 'react';
import { calLink } from '@/lib/site';

export function CalPopupButton({ children, className }: { children: ReactNode; className?: string }) {
  const open = useCallback(async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { getCalApi } = await import('@calcom/embed-react');
    const cal = await getCalApi();
    cal('ui', { theme: 'light', cssVarsPerTheme: { light: { 'cal-brand': '#27187E', 'cal-brand-emphasis': '#1B1059' }, dark: { 'cal-brand': '#AEB8FE', 'cal-brand-emphasis': '#768BFE' } }, hideEventTypeDetails: false, layout: 'month_view' });
    cal('modal', { calLink, config: { layout: 'month_view', theme: 'light' } });
  }, []);

  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  );
}
