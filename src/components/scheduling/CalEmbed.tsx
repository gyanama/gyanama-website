'use client';

import Cal from '@calcom/embed-react';
import { calLink } from '@/lib/site';

export function CalEmbed({ className }: { className?: string }) {
  return (
    <Cal
      calLink={calLink}
      style={{ width: '100%', height: '100%', overflow: 'scroll' }}
      className={className}
      config={{ layout: 'month_view', theme: 'light', name: '', email: '' }}
    />
  );
}
