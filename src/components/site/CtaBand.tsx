import { Button, GRAIN, ICONS, Icon, WRAP } from '@/components/site/ui';
import { SITE } from '@/lib/site';

export function CtaBand({ title = 'See how Gyanama would follow up in your school.', body = 'A 20-minute call with real screens. We share plans and pricing on the call.' }: { title?: string; body?: string }) {
  return (
    <section id="demo" className="bg-white pb-16 md:pb-24">
      <div className={WRAP}>
        <div
          className="relative isolate overflow-hidden rounded-[2rem] px-6 py-12 text-white md:rounded-[2.5rem] md:px-16 md:py-24"
          style={{
            backgroundImage:
              'radial-gradient(70% 90% at 100% 100%, rgba(118,139,254,0.75) 0%, rgba(118,139,254,0) 60%), radial-gradient(50% 70% at 0% 0%, rgba(75,59,196,0.9) 0%, rgba(75,59,196,0) 70%), radial-gradient(40% 50% at 85% 10%, rgba(174,184,254,0.25) 0%, rgba(174,184,254,0) 70%), linear-gradient(160deg, #27187E 0%, #1B1059 100%)',
          }}
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-30 mix-blend-overlay" style={{ backgroundImage: GRAIN }} />
          <div className="grid items-end gap-10 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <h2 className="max-w-3xl font-fraunces text-[1.75rem] font-medium leading-[1.1] tracking-[-0.02em] md:text-[3.4rem] md:leading-[1.06]">{title}</h2>
              <p className="mt-4 font-inter text-[15px] text-white/75 md:mt-5 md:text-lg">{body}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Button href="/book-demo" variant="light" className="justify-center">
                Book a demo
                <Icon d={ICONS.arrow} size={16} />
              </Button>
              <Button href={SITE.whatsappUrl} variant="ghostDark" className="justify-center">
                Message us on WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
