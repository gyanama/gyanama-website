'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import { PRODUCT_GROUPS } from '@/lib/nav';

const TOP = [
  { label: 'AI calls', href: '/voice-agent-for-schools' },
  { label: 'Plans', href: '/plans' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  const [path, setPath] = useState(pathname);
  if (path !== pathname) {
    setPath(pathname);
    setOpen(false);
    setMobile(false);
  }

  const link = 'rounded-full px-3.5 py-2 text-[14px] text-ink/70 transition hover:bg-white/70 hover:text-indigo';

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 font-inter md:px-6">
      <div
        className={`mx-auto flex max-w-[1200px] items-center justify-between rounded-2xl border px-3 py-2 transition-all duration-300 md:rounded-full md:px-4 ${
          scrolled
            ? 'border-ink/5 bg-white shadow-[0_12px_40px_-20px_rgba(39,24,126,0.35)] md:border-white/70 md:bg-white/60 md:backdrop-blur-xl md:backdrop-saturate-150'
            : 'border-transparent bg-white md:bg-transparent'
        }`}
      >
        <Link href="/" className="flex items-center gap-2" aria-label="Gyanama home">
          <Image src="/gyanama-logo-256.webp" alt="" width={32} height={32} className="h-8 w-8" />
          <span className="font-fraunces text-xl font-semibold tracking-tight text-indigo">Gyanama</span>
        </Link>
        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
          <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            <button type="button" aria-expanded={open} className={`${link} flex items-center gap-1`} onClick={() => setOpen((o) => !o)}>
              Product
              <svg width="10" height="10" viewBox="0 0 10 10" className={`transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden>
                <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
              </svg>
            </button>
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-0 top-full w-[44rem] pt-2"
                >
                  <div className="grid grid-cols-4 gap-2 rounded-3xl bg-white p-4 shadow-[0_30px_60px_-30px_rgba(39,24,126,0.45)] ring-1 ring-ink/5">
                    {PRODUCT_GROUPS.map((g) => (
                      <div key={g.title}>
                        <div className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink/45">{g.title}</div>
                        {g.links.map((l) => (
                          <Link key={l.href} href={l.href} className="block rounded-xl px-2 py-2 text-[13.5px] font-medium text-ink hover:bg-peri-wash/60">
                            {l.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {TOP.map((t) => (
            <Link key={t.href} href={t.href} className={link}>
              {t.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/book-demo" className="rounded-full bg-indigo px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-deep">
            Book a demo
          </Link>
          <button type="button" aria-label="Menu" aria-expanded={mobile} onClick={() => setMobile((m) => !m)} className="grid h-10 w-10 place-items-center rounded-xl bg-paper lg:hidden">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
              <path d={mobile ? 'M6 6l12 12M18 6L6 18' : 'M4 7h16M4 12h16M4 17h16'} />
            </svg>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {mobile && (
          <motion.nav
            aria-label="Mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mx-auto mt-2 max-h-[75vh] max-w-[1200px] overflow-y-auto rounded-3xl bg-white p-3 shadow-[0_30px_60px_-30px_rgba(39,24,126,0.45)] ring-1 ring-ink/5 lg:hidden"
          >
            {PRODUCT_GROUPS.map((g) => (
              <div key={g.title} className="pb-2">
                <div className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink/45">{g.title}</div>
                {g.links.map((l) => (
                  <Link key={l.href} href={l.href} className="block rounded-2xl px-3 py-2 text-[14px] font-medium text-ink hover:bg-peri-wash/60">
                    {l.label}
                  </Link>
                ))}
              </div>
            ))}
            <div className="border-t border-ink/[0.06] pt-2">
              {TOP.map((t) => (
                <Link key={t.href} href={t.href} className="block rounded-2xl px-3 py-2 text-[14px] font-semibold text-ink hover:bg-peri-wash/60">
                  {t.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
