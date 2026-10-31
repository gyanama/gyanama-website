import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';
import { CalEmbed } from '@/components/scheduling/CalEmbed';
import { ICONS, Icon, Kicker, WRAP } from '@/components/site/ui';

export const metadata: Metadata = pageMetadata({
  path: '/book-demo',
  title: 'Book a Free Gyanama Demo',
  description: 'Book a 20-minute Gyanama demo. See the school app, the AI attendance calls and the fee follow-up on real screens, and get plans and pricing.',
});

const POINTS = [
  'How attendance, fees, homework and exams run in the app',
  'How the AI calls a family when attendance keeps slipping',
  'How a principal sees calls, fees due and the score for every class',
  'How we move your students, staff and timetable in from Excel',
  'Plans and pricing for your school',
];

export default function BookDemoPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Book a demo', path: '/book-demo' }]} />
      <section className="bg-[linear-gradient(180deg,#F4F4FC_0%,#FFFFFF_100%)] pb-16 pt-14 md:pb-24 md:pt-20">
        <div className={`${WRAP} grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14`}>
          <div>
            <Kicker>Book a demo</Kicker>
            <h1 className="mt-4 font-fraunces text-[2.1rem] font-medium leading-[1.08] tracking-[-0.02em] text-ink md:text-[3.2rem]">See Gyanama run on a school like yours.</h1>
            <p className="mt-4 font-inter text-[15px] leading-relaxed text-ink/65 md:text-lg">A 20-minute call with the founders, on real screens. Pick a time in the calendar that suits you.</p>
            <ul className="mt-7 space-y-3">
              {POINTS.map((p) => (
                <li key={p} className="flex items-start gap-3 font-inter text-[15px] text-ink/75">
                  <span className="mt-0.5 text-good">
                    <Icon d={ICONS.check} size={18} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[1.75rem] bg-white p-5 shadow-[0_30px_70px_-40px_rgba(39,24,126,0.5)] ring-1 ring-ink/[0.06] md:p-8">
            <h2 className="mb-4 font-fraunces text-[1.5rem] font-medium text-ink">Pick a time</h2>
            <div className="h-[620px] overflow-hidden rounded-2xl">
              <CalEmbed className="h-full w-full" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
