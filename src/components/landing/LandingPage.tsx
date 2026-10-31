import Link from 'next/link';
import type { ReactNode } from 'react';
import type { LandingContent, Section } from '@/content/pages/types';
import { PAGE_INDEX } from '@/lib/pages';
import { BreadcrumbSchema, MobileApplicationSchema, SoftwareApplicationSchema, WebPageSchema } from '@/components/seo/JsonLd';
import { Button, Crafted, Device, ICONS, Icon, Kicker, StoreBadges, WRAP } from '@/components/site/ui';
import { Reveal } from '@/components/site/Reveal';
import { FaqSection } from '@/components/site/FaqSection';
import { CtaBand } from '@/components/site/CtaBand';
import { CARDS } from './Cards';

function Visual({ screen, alt, tone, card, priority = false }: { screen: string; alt: string; tone: LandingContent['heroTone']; card?: Section['card']; priority?: boolean }) {
  const Card = card ? CARDS[card] : null;
  return (
    <Crafted tone={tone} className="relative flex justify-center overflow-hidden rounded-[1.75rem] px-4 pt-8 md:rounded-[2.25rem] md:pt-12">
      <div className="relative translate-y-6">
        <Device src={screen} alt={alt} width={230} className="md:hidden" />
        <Device src={screen} alt={alt} width={260} className="max-md:hidden" />
        {Card && (
          <div className="absolute -left-24 bottom-16 hidden lg:block" data-priority={priority || undefined}>
            <Card />
          </div>
        )}
      </div>
    </Crafted>
  );
}

function SectionBlock({ s, i }: { s: Section; i: number }) {
  const flip = i % 2 === 1 && Boolean(s.screen);
  return (
    <section className="py-10 md:py-16">
      <div className={`${WRAP} grid items-center gap-8 lg:gap-16 ${s.screen ? 'lg:grid-cols-2' : ''}`}>
        <Reveal className={`${flip ? 'lg:order-2' : ''} ${s.screen ? '' : 'max-w-3xl'}`}>
          <h2 className="font-fraunces text-[1.6rem] font-medium leading-[1.12] tracking-[-0.015em] text-ink md:text-[2.3rem]">{s.q}</h2>
          <p className="mt-4 font-inter text-[16px] leading-relaxed text-ink/80 md:text-[17px]">{s.a}</p>
          {s.body && <p className="mt-3 font-inter text-[15px] leading-relaxed text-ink/65 md:text-base">{s.body}</p>}
          {s.points && (
            <ul className="mt-5 space-y-2.5">
              {s.points.map((p) => (
                <li key={p} className="flex items-start gap-3 font-inter text-[15px] text-ink/75">
                  <span className="mt-0.5 text-good">
                    <Icon d={ICONS.check} size={18} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          )}
          {s.link && (
            <Link href={s.link.href} className="mt-5 inline-flex items-center gap-1.5 font-inter text-[14px] font-semibold text-indigo underline decoration-indigo/30 underline-offset-4 hover:decoration-indigo">
              {s.link.label}
              <Icon d={ICONS.arrow} size={14} />
            </Link>
          )}
        </Reveal>
        {s.screen && (
          <Reveal delay={0.08} className={flip ? 'lg:order-1' : ''}>
            <Visual screen={s.screen} alt={s.alt ?? ''} tone={s.tone ?? 'peri'} card={s.card} />
          </Reveal>
        )}
      </div>
    </section>
  );
}

export function Related({ paths }: { paths: string[] }) {
  return (
    <section className="bg-[#F6F6FB] py-14 md:py-20">
      <div className={WRAP}>
        <h2 className="font-fraunces text-[1.6rem] font-medium tracking-[-0.015em] text-ink md:text-[2.2rem]">Related pages</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {paths.map((p) => {
            const meta = PAGE_INDEX[p];
            if (!meta) return null;
            return (
              <Link key={p} href={p} className="group rounded-[1.4rem] bg-white p-5 ring-1 ring-ink/[0.06] transition hover:ring-indigo/30">
                <div className="flex items-center justify-between font-inter text-[15.5px] font-semibold text-ink">
                  {meta.label}
                  <Icon d={ICONS.arrow} size={16} className="text-indigo transition-transform group-hover:translate-x-0.5" />
                </div>
                <p className="mt-1.5 font-inter text-[14px] leading-relaxed text-ink/60">{meta.line}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function LandingPage({ c, children }: { c: LandingContent; children?: ReactNode }) {
  const secondary = c.secondary ?? { label: 'How the AI call works', href: '/voice-agent-for-schools' };
  return (
    <>
      <BreadcrumbSchema items={[{ name: c.breadcrumb, path: c.path }]} />
      <WebPageSchema path={c.path} name={c.title} description={c.description} dateModified={c.updated} />
      {c.schema === 'mobile' && <MobileApplicationSchema />}
      {c.schema === 'software' && <SoftwareApplicationSchema />}
      <section className="bg-[linear-gradient(180deg,#F4F4FC_0%,#FFFFFF_100%)] pb-12 pt-12 md:pb-20 md:pt-20">
        <div className={`${WRAP} grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14`}>
          <div>
            <Kicker>{c.kicker}</Kicker>
            <h1 className="mt-4 font-fraunces text-[2.1rem] font-medium leading-[1.08] tracking-[-0.02em] text-ink md:text-[3.3rem]">{c.h1}</h1>
            <p className="mt-5 font-inter text-[16px] leading-relaxed text-ink/75 md:text-lg">{c.summary}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/book-demo">
                Book a demo
                <Icon d={ICONS.arrow} size={16} />
              </Button>
              <Button href={secondary.href} variant="soft">
                {secondary.label}
              </Button>
            </div>
            {c.schema === 'mobile' && (
              <div className="mt-6">
                <StoreBadges />
              </div>
            )}
          </div>
          <Visual screen={c.heroScreen} alt={c.heroAlt} tone={c.heroTone} card={c.heroCard} priority />
        </div>
        {c.facts && (
          <div className={`${WRAP} mt-12 grid grid-cols-2 gap-3 md:mt-16 lg:grid-cols-4`}>
            {c.facts.map((f) => (
              <div key={f.k} className="rounded-[1.25rem] bg-white p-4 ring-1 ring-ink/[0.06] md:p-5">
                <div className="font-fraunces text-[1.35rem] font-medium leading-tight text-indigo md:text-[1.6rem]">{f.k}</div>
                <div className="mt-1 font-inter text-[13.5px] leading-snug text-ink/65">{f.v}</div>
              </div>
            ))}
          </div>
        )}
      </section>
      {children}
      {c.sections.map((s, i) => (
        <SectionBlock key={s.q} s={s} i={i} />
      ))}
      <FaqSection items={c.faqs} />
      <Related paths={c.related} />
      <CtaBand title={c.cta?.title} body={c.cta?.body} />
    </>
  );
}
