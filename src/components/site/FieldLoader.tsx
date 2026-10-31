'use client';

import dynamic from 'next/dynamic';
import { HeroPoster } from './HeroPoster';
import type { FieldLayout, FieldTheme } from './StudentField';

const StudentField = dynamic(() => import('./StudentField').then((m) => m.StudentField), {
  ssr: false,
  loading: () => <HeroPoster theme={POSTER_THEME} layout="field" className="absolute inset-0 h-full w-full opacity-70" />,
});

const POSTER_THEME: FieldTheme = { base: '#768BFE', alert: '#C2410C', good: '#15803D', arc: '#27187E' };

export function FieldLoader({ theme, layout = 'field', className }: { theme: FieldTheme; layout?: FieldLayout; className?: string }) {
  return <StudentField theme={theme} layout={layout} className={className} />;
}
