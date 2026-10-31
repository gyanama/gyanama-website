import Link from 'next/link';
import { hero } from '@/content/home';
import { HeroField } from '@/components/site/HeroField';
import { StoryProvider } from '@/components/site/story';
import { CallCard, type CallSkin } from '@/components/site/CallCard';
import { HERO_GLOW, Phone } from '@/components/site/primitives';
import { Button, ICONS, Icon, StoreBadges } from '@/components/site/ui';

const SKIN: CallSkin = {
  card: 'w-full max-w-[22rem] rounded-[1.6rem] bg-white p-5 font-inter shadow-[0_30px_60px_-30px_rgba(39,24,126,0.45)]',
  placeholder: 'rounded-full bg-paper px-2.5 py-1 text-[10px] font-medium text-ink/60',
  trigger: 'mt-1 text-xs text-muted',
  status: 'font-fraunces text-lg font-medium text-ink',
  dotAlert: 'bg-risk',
  dotGood: 'bg-good',
  school: 'rounded-2xl rounded-tl-md bg-peri-wash px-3.5 py-2.5 text-sm text-ink',
  parent: 'ml-6 rounded-2xl rounded-tr-md bg-paper px-3.5 py-2.5 text-sm text-ink/80',
  who: 'block text-[10px] font-semibold uppercase tracking-wider text-indigo/70',
  logged: 'mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-2xl bg-good-bg px-3.5 py-2.5 text-xs font-semibold text-good',
  toggle: 'rounded-full px-2.5 py-1 text-[11px] text-muted',
  toggleOn: 'bg-indigo text-white',
};

export function Hero() {
  return (
    <StoryProvider>
    <section style={HERO_GLOW} className="-mt-[76px] px-4 pb-12 pt-[100px] md:pb-16 md:pt-[118px]">
      <div className="mx-auto max-w-4xl text-center">
        <div>
          <span className="inline-block rounded-full bg-peri-wash px-3.5 py-1.5 font-inter text-xs font-semibold text-indigo">School app for CBSE, ICSE and State Board schools</span>
          <h1 className="mt-5 font-fraunces text-[2.1rem] font-medium leading-[1.1] tracking-[-0.015em] text-ink sm:text-[2.8rem] md:mt-5 md:text-[3.6rem] md:leading-[1.05]">
            When a child keeps missing school, <span className="text-indigo">Gyanama calls the parent.</span>
          </h1>
        </div>
        <div>
          <p className="mx-auto mt-4 max-w-2xl font-inter text-[15px] leading-relaxed text-ink/70 sm:hidden">
            A school app for principals, teachers, students and families. Its AI calls parents when attendance keeps slipping.
          </p>
          <p className="mx-auto mt-5 hidden max-w-2xl font-inter text-lg leading-relaxed text-ink/70 sm:block">
            Gyanama is a school app for principals, teachers, students and families. It runs attendance, fees, homework and exams, and its AI calls parents when attendance keeps slipping.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 md:mt-7 md:gap-3">
            <Button href="/book-demo" className="max-sm:px-5 max-sm:py-3 max-sm:text-[14px]">
              Book a demo
              <Icon d={ICONS.arrow} size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Link href="/voice-agent-for-schools" className="inline-flex items-center rounded-full bg-white px-5 py-3 font-inter text-[14px] font-semibold text-indigo ring-1 ring-indigo/15 transition hover:ring-indigo/35 sm:px-6 sm:py-3.5 sm:text-[15px]">
              How a call works
            </Link>
          </div>
          <div className="mt-5 hidden justify-center md:flex">
            <StoreBadges />
          </div>
        </div>
      </div>
      <div className="mx-auto mt-7 max-w-[1180px] md:mt-10">
        <div className="relative overflow-hidden rounded-[2rem] bg-white/70 ring-1 ring-white md:rounded-[2.5rem]">
          <HeroField className="absolute inset-0 h-full w-full opacity-70" />
          <div className="relative grid items-end gap-5 px-3 pb-5 pt-5 md:grid-cols-[1.3fr_1fr] md:gap-6 md:px-10 md:pb-10 md:pt-12">
            <div className="flex justify-center">
              <Phone src="/app/principal-dashboard.png" alt="Principal dashboard in the Gyanama school app" width={190} className="md:hidden" />
              <Phone src="/app/principal-dashboard.png" alt="Principal dashboard in the Gyanama school app" width={240} className="max-md:hidden" priority />
            </div>
            <div className="flex flex-col items-center gap-3 max-md:order-first md:items-end">
              <div className="hidden flex-wrap justify-end gap-2 md:flex">
                {hero.proof.map((p) => (
                  <span key={p} className="rounded-full bg-white/90 px-3.5 py-1.5 font-inter text-xs font-medium text-ink/80 shadow-sm">{p}</span>
                ))}
              </div>
              <CallCard skin={SKIN} />
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-center md:hidden">
          <StoreBadges />
        </div>
      </div>
    </section>
    </StoryProvider>
  );
}
