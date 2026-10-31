import Image from 'next/image';
import Link from 'next/link';
import { SITE } from '@/lib/site';
import { PRODUCT_GROUPS } from '@/lib/nav';
import { StoreBadges } from './ui';

const COMPANY = [
  { label: 'About', href: '/about' },
  { label: 'Plans', href: '/plans' },
  { label: 'Security', href: '/security' },
  { label: 'Boards', href: '/boards' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact-us' },
  { label: 'Book a demo', href: '/book-demo' },
];

const MORE = [
  { label: 'Features', href: '/features' },
  { label: 'How Gyanama works', href: '/ai-systems' },
  { label: 'AI for schools', href: '/ai-for-schools' },
  { label: 'School ERP', href: '/school-erp' },
  { label: 'Gyanama vs school software', href: '/vs-school-management-software' },
  { label: 'Use cases', href: '/use-cases' },
];

const SOCIAL = [
  { label: 'LinkedIn', href: SITE.linkedIn, d: 'M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8.25h4.52V23H.24zM8.08 8.25h4.33v2h.06c.6-1.14 2.08-2.35 4.28-2.35 4.58 0 5.42 3.01 5.42 6.93V23h-4.51v-7.18c0-1.71-.03-3.92-2.39-3.92-2.39 0-2.76 1.87-2.76 3.8V23H8.08z' },
  { label: 'Instagram', href: SITE.instagram, d: 'M12 2.2c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95C23.73 2.7 21.31.27 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z' },
  { label: 'X', href: SITE.twitter, d: 'M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23zm-1.16 17.52h1.83L7.08 4.13H5.12z' },
  { label: 'Facebook', href: SITE.facebook, d: 'M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z' },
];

function Column({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <div className="text-[12px] font-semibold uppercase tracking-[0.12em] text-ink/45">{title}</div>
      <ul className="mt-3 space-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-[14px] text-ink/70 hover:text-indigo">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const year = 2026;
  return (
    <footer className="border-t border-ink/[0.06] bg-white pb-12 pt-14 font-inter">
      <div className="mx-auto max-w-[1200px] px-4 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2.8fr]">
          <div>
            <Link href="/" className="flex items-center gap-2" aria-label="Gyanama home">
              <Image src="/gyanama-logo-256.webp" alt="" width={28} height={28} className="h-7 w-7" />
              <span className="font-fraunces text-lg font-semibold text-indigo">Gyanama</span>
            </Link>
            <p className="mt-3 max-w-xs text-[14px] leading-relaxed text-ink/60">A school app for principals, teachers, students and families.</p>
            <div className="mt-5">
              <StoreBadges />
            </div>
            <div className="mt-5 space-y-1 text-[14px] text-ink/70">
              <a href={`tel:${SITE.phoneRaw}`} className="block hover:text-indigo">{SITE.phone}</a>
              <a href={`mailto:${SITE.email}`} className="block hover:text-indigo">{SITE.email}</a>
              <a href={SITE.whatsappUrl} className="block hover:text-indigo">WhatsApp</a>
            </div>
            <div className="mt-5 flex gap-2">
              {SOCIAL.map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label} className="grid h-9 w-9 place-items-center rounded-xl bg-paper text-ink/70 hover:text-indigo" rel="noopener noreferrer" target="_blank">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d={s.d} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {PRODUCT_GROUPS.map((g) => (
              <Column key={g.title} title={g.title} links={g.links} />
            ))}
            <div className="space-y-8">
              <Column title="Company" links={COMPANY} />
            </div>
          </div>
        </div>
        <div className="mt-10 grid gap-8 border-t border-ink/[0.06] pt-8 md:grid-cols-[2fr_1fr]">
          <Column title="More" links={MORE} />
        </div>
        <div className="mt-10 flex flex-col justify-between gap-3 border-t border-ink/[0.06] pt-6 text-[12.5px] text-ink/50 md:flex-row">
          <p>
            © {year} {SITE.legalName}. {SITE.address.streetAddress}, {SITE.address.addressLocality} {SITE.address.postalCode}, {SITE.address.addressRegion}, India.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-indigo">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-indigo">Terms of Service</Link>
          </div>
        </div>
        <p className="mt-3 text-[12.5px] text-ink/40">{SITE.tagline}</p>
      </div>
    </footer>
  );
}
