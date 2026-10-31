import Image from 'next/image';
import type { CSSProperties, ReactNode } from 'react';

const NOISE = `url("data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.15 0 0 0 0 0.09 0 0 0 0 0.49 0 0 0 0.09 0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>",
)}")`;

export function Grain({ className = '' }: { className?: string }) {
  return <div aria-hidden className={`pointer-events-none absolute inset-0 mix-blend-multiply ${className}`} style={{ backgroundImage: NOISE }} />;
}

export function mesh(a: string, b: string, base: [string, string]) {
  return `radial-gradient(72% 68% at 98% 2%, ${a} 0%, transparent 72%), radial-gradient(62% 62% at 0% 100%, ${b} 0%, transparent 70%), radial-gradient(45% 40% at 42% 42%, rgba(255,255,255,0.55) 0%, transparent 72%), linear-gradient(160deg, ${base[0]} 0%, ${base[1]} 100%)`;
}

export function cssVars(v: Record<string, string | number>) {
  return v as CSSProperties;
}

const PATHS: Record<string, ReactNode> = {
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />,
  message: <path d="M4 5h16v11H9l-5 4zM8 9.5h8M8 12.5h5" />,
  rupee: <path d="M7 5h10M7 9h10M7 5h3a4 4 0 0 1 0 8H7l7 7" />,
  score: <path d="M4 19V11M10 19V5M16 19v-6M22 19H2" />,
  book: <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5zM4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M9 8h7M9 11h5" />,
  grid: <path d="M3 5h18v15H3zM3 10h18M8 5v15M3 15h18" />,
  register: <path d="M9 4h6v3H9zM6 5.5H5v15h14v-15h-1M8.5 13l2 2 4-4.5" />,
  leave: <path d="M4 6h16v14H4zM4 10h16M9 3v5M15 3v5M10 14l4 4M14 14l-4 4" />,
  clock: <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2" />,
  eye: <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />,
  check: <path d="M5 12.5l4.5 4.5L19 7" />,
  shield: <path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6zM8.5 12l2.5 2.5 4.5-5" />,
  server: <path d="M4 4h16v6H4zM4 14h16v6H4zM8 7h.01M8 17h.01" />,
  backup: <path d="M4 12a8 8 0 0 1 14-5.3L20 9M20 4v5h-5M20 12a8 8 0 0 1-14 5.3L4 15M4 20v-5h5" />,
  ban: <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM5.6 5.6l12.8 12.8" />,
  lock: <path d="M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  lang: <path d="M4 5h9M8.5 3v2M6 5c.5 3 2.5 5.5 5.5 7M11 5c-.8 3.6-3 6.4-6.5 8M13 21l4-10 4 10M14.5 17.5h5" />,
  pencil: <path d="M4 20h4L19 9l-4-4L4 16zM13.5 6.5l4 4" />,
  flag: <path d="M5 21V4M5 4h11l-2 4 2 4H5" />,
  doc: <path d="M6 3h8l4 4v14H6zM14 3v4h4M9 12h6M9 16h6" />,
  people: <path d="M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM2.5 20c.4-3.6 3.1-6 6.5-6s6.1 2.4 6.5 6M16 4.5a3.5 3.5 0 0 1 0 6.5M18 14c2 .7 3.3 2.9 3.5 6" />,
};

export type IconName = keyof typeof PATHS;

export function RouteIcon({ name, size = 20, className = '', stroke = 1.7 }: { name: IconName; size?: number; className?: string; stroke?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      {PATHS[name]}
    </svg>
  );
}


export function Phone({ src, alt, width = 250, className = '', priority = false }: { src: string; alt: string; width?: number; className?: string; priority?: boolean }) {
  return (
    <div className={`relative shrink-0 rounded-[2.4rem] bg-ink p-[6px] shadow-[0_30px_70px_-25px_rgba(39,24,126,0.45)] ${className}`} style={{ width }}>
      <div className="relative overflow-hidden rounded-[2rem] bg-paper" style={{ aspectRatio: '393 / 852' }}>
        <Image src={src} alt={alt} fill sizes={`${width}px`} priority={priority} className="object-cover object-top" />
      </div>
    </div>
  );
}

export const HERO_GLOW: CSSProperties = {
  backgroundImage:
    'radial-gradient(900px 520px at 78% -8%, rgba(174,184,254,0.95) 0%, rgba(174,184,254,0.35) 45%, transparent 75%), radial-gradient(700px 420px at -5% 20%, rgba(118,139,254,0.22) 0%, transparent 70%)',
};

export const PHOTOS = {
  smartBoard: { src: '/photos/smart-board.webp', alt: 'Students in maroon school blazers following a lesson on the classroom smart board', pos: '50% 40%' },
  bioLab: { src: '/photos/biology-lab.webp', alt: 'A teacher showing her class an anatomy model in the school biology lab', pos: '40% 50%' },
  globe: { src: '/photos/globe.webp', alt: 'Students in school blazers finding places on a globe in the school library', pos: '50% 35%' },
  library: { src: '/photos/library.webp', alt: 'Students reading in a bright school library', pos: '50% 65%' },
  libraryWide: { src: '/photos/library-wide.webp', alt: 'A student reading in the school library while the librarian works at her desk', pos: '60% 60%' },
  teacherBoard: { src: '/photos/teacher-whiteboard.webp', alt: 'A teacher working through an equation on the whiteboard while a student raises a hand', pos: '55% 40%' },
} as const;

export type PhotoName = keyof typeof PHOTOS;

export function Photo({ name, className = '', sizes = '(min-width: 1024px) 33vw, 90vw', priority = false }: { name: PhotoName; className?: string; sizes?: string; priority?: boolean }) {
  const p = PHOTOS[name];
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image src={p.src} alt={p.alt} fill sizes={sizes} priority={priority} className="object-cover" style={{ objectPosition: p.pos }} />
    </div>
  );
}
