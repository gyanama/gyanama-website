import { Reveal } from '@/components/site/Reveal';
import { Crafted, ICONS, Icon } from '@/components/site/ui';
import { Kicker, WRAP } from '@/components/site/ui';

const ITEMS = [
  { icon: ICONS.server, k: 'Servers in India', v: "Your school's data is stored on servers in India." },
  { icon: ICONS.cloud, k: 'Backups 3 times a day', v: 'The database is backed up three times every day.' },
  { icon: ICONS.lock, k: 'OTP login', v: 'Every login needs a one-time code. It expires in 5 minutes and allows 3 tries.' },
  { icon: ICONS.sliders, k: 'Access by role', v: 'Principal, coordinator, manager, teacher and student each get their own access.' },
  { icon: ICONS.sheet, k: 'Every action logged', v: 'Each request to the system is recorded in an audit log.' },
  { icon: ICONS.call, k: 'You decide who is called', v: 'Numbers on your Do Not Call list are never called.' },
];

export function Security() {
  return (
    <section id="security" className="bg-white pb-14 pt-6 md:pb-20 md:pt-8">
      <div className={WRAP}>
        <Crafted tone="sea" className="rounded-[2rem] p-6 md:rounded-[2.5rem] md:p-12">
          <div className="grid gap-7 md:gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            <Reveal>
              <Kicker>
                                Security
              </Kicker>
              <h2 className="mt-4 font-fraunces text-[1.75rem] font-medium leading-[1.1] tracking-[-0.02em] text-ink md:text-[2.8rem]">Your school&apos;s data stays in India.</h2>
              <p className="mt-4 font-inter text-[15px] leading-relaxed text-ink/65 md:text-lg">
                Student records, marks and phone numbers are stored in India and backed up three times a day. Inside the app, each person sees only what their role allows.
              </p>
              <a href="https://gyanama.com/privacy-policy" className="mt-5 inline-flex items-center gap-1.5 font-inter text-[14px] font-semibold text-indigo underline decoration-indigo/30 underline-offset-4 hover:decoration-indigo">
                Read how calls and data are handled
                <Icon d={ICONS.arrow} size={14} />
              </a>
            </Reveal>
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              {ITEMS.map((x, i) => (
                <Reveal key={x.k} delay={i * 0.05} className="rounded-[1.2rem] bg-white/90 p-3.5 ring-1 ring-ink/[0.05] sm:rounded-[1.4rem] sm:p-5">
                  <span className="grid h-8 w-8 place-items-center rounded-xl bg-paper text-indigo sm:h-9 sm:w-9">
                    <Icon d={x.icon} size={17} />
                  </span>
                  <div className="mt-2.5 font-inter text-[13.5px] font-semibold leading-snug text-ink sm:mt-3 sm:text-[15px]">{x.k}</div>
                  <p className="mt-1 hidden font-inter text-[13.5px] leading-relaxed text-ink/65 sm:block">{x.v}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </Crafted>
      </div>
    </section>
  );
}
