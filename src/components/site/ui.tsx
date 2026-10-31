import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import { SITE } from '@/lib/site';

export const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.15 0 0 0 0 0.1 0 0 0 0 0.45 0 0 0 .55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export type ToneKey = 'peri' | 'apricot' | 'sky' | 'marigold' | 'rose' | 'lilac' | 'sea';

export const TONES: Record<ToneKey, { bg: string; chip: string; ink: string }> = {
  peri: {
    bg: 'radial-gradient(110% 85% at 100% 0%, #C3CBFF 0%, rgba(195,203,255,0) 58%), radial-gradient(80% 70% at 0% 100%, #E4DCFF 0%, rgba(228,220,255,0) 62%), radial-gradient(55% 50% at 92% 100%, #FFE6D6 0%, rgba(255,230,214,0) 70%), linear-gradient(165deg, #F5F6FF 0%, #ECEEFF 100%)',
    chip: '#E4E8FF',
    ink: '#27187E',
  },
  apricot: {
    bg: 'radial-gradient(105% 80% at 100% 0%, #FFD7BD 0%, rgba(255,215,189,0) 58%), radial-gradient(85% 75% at 0% 100%, #DFD8FF 0%, rgba(223,216,255,0) 62%), linear-gradient(165deg, #FFF7F1 0%, #F8F1FF 100%)',
    chip: '#FFE6D6',
    ink: '#9A3412',
  },
  sky: {
    bg: 'radial-gradient(105% 80% at 100% 0%, #C2D9FF 0%, rgba(194,217,255,0) 58%), radial-gradient(85% 75% at 0% 100%, #DCD5FF 0%, rgba(220,213,255,0) 62%), linear-gradient(165deg, #F2F7FF 0%, #EEF0FF 100%)',
    chip: '#DCE8FF',
    ink: '#1E3A8A',
  },
  marigold: {
    bg: 'radial-gradient(100% 80% at 100% 0%, #FFE0A3 0%, rgba(255,224,163,0) 58%), radial-gradient(85% 75% at 0% 100%, #E6DFFF 0%, rgba(230,223,255,0) 62%), linear-gradient(165deg, #FFFAF0 0%, #FBF3FF 100%)',
    chip: '#FFEFC7',
    ink: '#92400E',
  },
  rose: {
    bg: 'radial-gradient(100% 80% at 100% 0%, #FFD0DC 0%, rgba(255,208,220,0) 58%), radial-gradient(85% 75% at 0% 100%, #DCDAFF 0%, rgba(220,218,255,0) 62%), linear-gradient(165deg, #FFF6F8 0%, #F5F2FF 100%)',
    chip: '#FFE1E8',
    ink: '#9F1239',
  },
  lilac: {
    bg: 'radial-gradient(100% 80% at 100% 0%, #D9C8FF 0%, rgba(217,200,255,0) 58%), radial-gradient(85% 75% at 0% 100%, #C9D5FF 0%, rgba(201,213,255,0) 62%), linear-gradient(165deg, #F8F4FF 0%, #F0F2FF 100%)',
    chip: '#EDE4FF',
    ink: '#5B21B6',
  },
  sea: {
    bg: 'radial-gradient(100% 80% at 100% 0%, #C4E8EE 0%, rgba(196,232,238,0) 58%), radial-gradient(85% 75% at 0% 100%, #D8DCFF 0%, rgba(216,220,255,0) 62%), linear-gradient(165deg, #F2FAFB 0%, #F0F2FF 100%)',
    chip: '#D8F0F3',
    ink: '#155E75',
  },
};

export function Crafted({ tone, className = '', children, style }: { tone: ToneKey; className?: string; children?: ReactNode; style?: CSSProperties }) {
  return (
    <div className={`relative isolate overflow-hidden ${className}`} style={{ backgroundImage: TONES[tone].bg, ...style }}>
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-[0.22] mix-blend-multiply" style={{ backgroundImage: GRAIN }} />
      <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/70" />
      {children}
    </div>
  );
}

export const CARD = 'rounded-[1.15rem] bg-white/95 p-4 font-inter ring-1 ring-[#27187E]/[0.06] shadow-[0_28px_56px_-28px_rgba(39,24,126,0.42),0_2px_6px_-2px_rgba(39,24,126,0.08)] backdrop-blur';

export function Device({ src, alt, width = 260, className = '' }: { src: string; alt: string; width?: number; className?: string }) {
  return (
    <div
      className={`relative shrink-0 rounded-[2.7rem] bg-[#0E1022] p-[7px] shadow-[0_50px_90px_-40px_rgba(39,24,126,0.6),0_0_0_1px_rgba(255,255,255,0.08)_inset] ${className}`}
      style={{ width }}
    >
      <div className="relative overflow-hidden rounded-[2.25rem] bg-paper" style={{ aspectRatio: '393 / 852' }}>
        <Image src={src} alt={alt} fill sizes={`${width}px`} className="object-cover object-top" />
      </div>
    </div>
  );
}

export function Icon({ d, size = 20, className = '' }: { d: string; size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d={d} />
    </svg>
  );
}

export const ICONS = {
  call: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2',
  rupee: 'M6 4h12M6 9h12M6 4h3a5 5 0 0 1 0 10H6l8 7',
  score: 'M4 16a8 8 0 1 1 16 0M12 16l4-5M3 20h18',
  book: 'M4 5a2 2 0 0 1 2-2h13v15H6a2 2 0 0 0-2 2zM4 20V5M9 8h6M9 11.5h4',
  grid: 'M3 5h18v15H3zM3 10h18M9 5v15M15 5v15',
  register: 'M10 6h10M10 12h10M10 18h10M4 6l1.2 1.2L7.5 5M4 12l1.2 1.2L7.5 11M4 18l1.2 1.2L7.5 17',
  chat: 'M4 5h16v10H9l-5 4zM8 9h8M8 12h5',
  shield: 'M12 3l7 3v6c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6zM9 12l2 2 4-4',
  sliders: 'M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0M16 4v4M10 10v4M18 16v4',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  server: 'M4 4h16v6H4zM4 14h16v6H4zM8 7h.01M8 17h.01',
  cloud: 'M7 18a4 4 0 0 1-.6-8A6 6 0 0 1 18 9a4.5 4.5 0 0 1-.5 9z',
  lock: 'M6 11h12v9H6zM8.5 11V8a3.5 3.5 0 0 1 7 0v3',
  sheet: 'M5 3h10l4 4v14H5zM15 3v4h4M8 12h8M8 16h8M12 9v10',
};

export function Button({ children, href, variant = 'solid', className = '' }: { children: ReactNode; href: string; variant?: 'solid' | 'soft' | 'light' | 'ghostDark'; className?: string }) {
  const map = {
    solid: 'bg-indigo text-white shadow-[0_12px_24px_-12px_rgba(39,24,126,0.8)] hover:bg-indigo-deep',
    soft: 'bg-white text-indigo ring-1 ring-indigo/15 hover:ring-indigo/35',
    light: 'bg-white text-indigo hover:bg-peri-wash',
    ghostDark: 'bg-white/10 text-white ring-1 ring-white/25 hover:bg-white/15',
  };
  const cls = `group inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-inter text-[15px] font-semibold transition ${map[variant]} ${className}`;
  if (href.startsWith('/')) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={cls}>
      {children}
    </a>
  );
}

export function SectionHead({ kicker, title, lead, rest, align = 'left', className = '' }: { kicker?: string; title: ReactNode; lead?: string; rest?: string; align?: 'left' | 'center'; className?: string }) {
  return (
    <div className={`${align === 'center' ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      {kicker && <div className="font-inter text-[13px] font-semibold tracking-wide text-peri">{kicker}</div>}
      <h2 className="mt-3 font-fraunces text-[1.75rem] font-medium leading-[1.1] tracking-[-0.02em] text-ink md:text-[3.1rem] md:leading-[1.08]">{title}</h2>
      {(lead || rest) && (
        <p className="mt-4 font-inter text-[15px] leading-relaxed md:mt-5 md:text-xl">
          {lead && <span className="text-ink">{lead} </span>}
          {rest && <span className="text-ink/50">{rest}</span>}
        </p>
      )}
    </div>
  );
}

export function StoreBadges({ dark = false }: { dark?: boolean }) {
  const cls = dark ? 'bg-white text-ink' : 'bg-ink text-white';
  return (
    <div className="flex flex-wrap gap-2.5">
      <a href={SITE.playStore} className={`inline-flex items-center gap-2.5 rounded-xl px-4 py-2 font-inter ${cls}`}>
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
          <path d="M4 3.5v17l9.2-8.5z" fill="#34A853" />
          <path d="M4 3.5l12.3 6.8-3.1 2.2z" fill="#4285F4" />
          <path d="M4 20.5l12.3-6.8-3.1-1.2z" fill="#EA4335" />
          <path d="M16.3 10.3L20 12.4l-3.7 1.3-3.1-1.2z" fill="#FBBC04" />
        </svg>
        <span className="leading-none">
          <span className="block text-[9px] uppercase tracking-wider opacity-70">Get it on</span>
          <span className="block text-sm font-semibold">Google Play</span>
        </span>
      </a>
      <a href={SITE.appStore} className={`inline-flex items-center gap-2.5 rounded-xl px-4 py-2 font-inter ${cls}`}>
        <svg width="18" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M16.4 12.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8 1.6 0 2 .8 3.4.8 1.4 0 2.3-1.3 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9 0 0-2.7-1-2.7-4.1zM13.9 4.9c.7-.9 1.2-2 1-3.2-1 0-2.3.7-3 1.6-.7.8-1.3 2-1.1 3.1 1.2.1 2.3-.6 3.1-1.5z" />
        </svg>
        <span className="leading-none">
          <span className="block text-[9px] uppercase tracking-wider opacity-70">Download on the</span>
          <span className="block text-sm font-semibold">App Store</span>
        </span>
      </a>
    </div>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-ink/[0.08] rounded-[1.75rem] bg-white px-6 ring-1 ring-ink/[0.06] md:px-8">
      {items.map((f) => (
        <details key={f.q} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-inter text-[17px] font-semibold text-ink">
            {f.q}
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-paper text-indigo transition-transform group-open:rotate-45">
              <Icon d="M12 5v14M5 12h14" size={16} />
            </span>
          </summary>
          <p className="mt-3 max-w-2xl font-inter leading-relaxed text-ink/65">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export const WRAP = 'mx-auto max-w-[1200px] px-4 md:px-8';

export function Kicker({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`flex items-center gap-2 font-inter text-[13px] font-semibold text-indigo/80 ${className}`}>
      <span className="h-px w-6 bg-indigo/40" />
      {children}
    </div>
  );
}
