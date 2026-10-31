import Link from 'next/link';
import { Reveal } from '@/components/site/Reveal';
import { ICONS, Icon, SectionHead, WRAP } from '@/components/site/ui';
import { SITE } from '@/lib/site';

const PARENT_POINTS = [
  'It only talks about attendance or an overdue fee.',
  'It never takes payments, quotes amounts or sends links.',
  'Approved leave never triggers a call.',
  'Calls only come between 10 am and 6 pm.',
  'Ask for the class teacher and a callback is logged.',
];

const SCHOOL_POINTS = [
  ['Thresholds', 'Attendance limits are set for your school'],
  ['Call hours', '10 am to 6 pm only'],
  ['Daily limit', 'Up to 50 calls a day by default'],
  ['Do Not Call list', 'Numbers you add are never called'],
  ['After a call', 'Callback requests land with the class teacher'],
];

export function ParentAndSchool() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <Reveal className="rounded-[1.75rem] bg-white p-7 ring-1 ring-ink/[0.06] md:p-10">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-good-bg text-good">
          <Icon d={ICONS.shield} size={22} />
        </span>
        <h3 className="mt-6 font-fraunces text-[1.4rem] font-medium leading-tight tracking-[-0.015em] text-ink md:text-[1.75rem]">For parents: a call from Gyanama is a call from your school.</h3>
        <ul className="mt-6 space-y-3">
          {PARENT_POINTS.map((p) => (
            <li key={p} className="flex items-start gap-3 font-inter text-[15.5px] text-ink/75">
              <span className="mt-0.5 text-good">
                <Icon d={ICONS.check} size={18} />
              </span>
              {p}
            </li>
          ))}
        </ul>
        <Link href="/privacy-policy" className="mt-6 inline-flex items-center gap-1.5 font-inter text-[14px] font-semibold text-indigo underline decoration-indigo/30 underline-offset-4 hover:decoration-indigo">
          How calls and data are handled
          <Icon d={ICONS.arrow} size={14} />
        </Link>
      </Reveal>
      <Reveal delay={0.08} className="rounded-[1.75rem] bg-white p-7 ring-1 ring-ink/[0.06] md:p-10">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-peri-wash text-indigo">
          <Icon d={ICONS.sliders} size={22} />
        </span>
        <h3 className="mt-6 font-fraunces text-[1.4rem] font-medium leading-tight tracking-[-0.015em] text-ink md:text-[1.75rem]">For your school: you set the rules.</h3>
        <dl className="mt-6 divide-y divide-ink/[0.07]">
          {SCHOOL_POINTS.map(([k, v]) => (
            <div key={k} className="flex flex-col gap-0.5 py-3 font-inter sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <dt className="text-[14px] font-semibold text-ink">{k}</dt>
              <dd className="text-[14.5px] text-ink/65 sm:text-right">{v}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </div>
  );
}

export function Founders() {
  return (
    <Reveal className="flex flex-col gap-6 rounded-[1.75rem] bg-white p-7 ring-1 ring-ink/[0.06] md:flex-row md:items-center md:p-10">
      <div className="flex -space-x-2">
        {['YB', 'RM'].map((n) => (
          <span key={n} className="grid h-12 w-12 place-items-center rounded-full bg-indigo font-inter text-sm font-semibold text-white ring-4 ring-white">
            {n}
          </span>
        ))}
      </div>
      <div>
        <h3 className="font-fraunces text-[1.45rem] font-medium leading-tight tracking-[-0.015em] text-ink">Built by people who watched schools run on registers and Excel.</h3>
        <p className="mt-2 font-inter text-[15px] leading-relaxed text-ink/65">
          {SITE.founders[0].name} and {SITE.founders[1].name} built Gyanama after watching teachers lose their evenings to paper registers and fee calls. It is a working product, running in a partner school today.
        </p>
      </div>
    </Reveal>
  );
}

export function TrustSection() {
  return (
    <section id="trust" className="bg-[#F6F6FB] py-14 md:py-20">
      <div className={WRAP}>
        <Reveal>
          <SectionHead kicker="Trust" title="Safe for parents. Controlled by your school." />
        </Reveal>
        <div className="mt-10 md:mt-12">
          <ParentAndSchool />
        </div>
        <div className="mt-5">
          <Founders />
        </div>
      </div>
    </section>
  );
}
