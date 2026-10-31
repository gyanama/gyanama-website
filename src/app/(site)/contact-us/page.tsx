import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { SITE } from '@/lib/site';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';
import { CalPopupButton } from '@/components/scheduling/CalPopupButton';
import { ICONS, Icon, Kicker, WRAP } from '@/components/site/ui';

export const metadata: Metadata = pageMetadata({
  path: '/contact-us',
  title: 'Contact Gyanama: Talk to the Team',
  description: 'Call, email or WhatsApp the Gyanama team, or book a 20-minute demo of the school app. Our registered office is in Sector 63, Noida.',
});

const CHANNELS = [
  { label: 'Email', value: SITE.email, href: `mailto:${SITE.email}`, icon: ICONS.chat },
  { label: 'Call', value: SITE.phone, href: `tel:${SITE.phoneRaw}`, icon: ICONS.call },
  { label: 'WhatsApp', value: SITE.phone, href: SITE.whatsappUrl, icon: ICONS.chat },
  { label: 'LinkedIn', value: 'GYANAMA', href: SITE.linkedIn, icon: ICONS.arrow },
];

export default function ContactPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Contact', path: '/contact-us' }]} />
      <section className="bg-[linear-gradient(180deg,#F4F4FC_0%,#FFFFFF_100%)] pb-16 pt-14 md:pb-24 md:pt-20">
        <div className={WRAP}>
          <Kicker>Contact</Kicker>
          <h1 className="mt-4 max-w-3xl font-fraunces text-[2.1rem] font-medium leading-[1.08] tracking-[-0.02em] text-ink md:text-[3.2rem]">Talk to the Gyanama team.</h1>
          <p className="mt-4 max-w-2xl font-inter text-[15px] leading-relaxed text-ink/65 md:text-lg">Questions about the school app, the AI calls or moving your school&apos;s data in? Reach the founders directly, or book a demo to see Gyanama on real screens.</p>
          <div className="mt-10 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
            <div className="grid gap-3 sm:grid-cols-2">
              {CHANNELS.map((c) => (
                <a key={c.label} href={c.href} className="flex items-center gap-4 rounded-[1.4rem] bg-white p-5 ring-1 ring-ink/[0.07] transition hover:ring-indigo/30" target={c.href.startsWith('http') ? '_blank' : undefined} rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-peri-wash text-indigo">
                    <Icon d={c.icon} size={20} />
                  </span>
                  <span className="font-inter">
                    <span className="block text-[13px] text-ink/55">{c.label}</span>
                    <span className="block text-[15.5px] font-semibold text-ink">{c.value}</span>
                  </span>
                </a>
              ))}
              <div className="rounded-[1.4rem] bg-white p-5 font-inter ring-1 ring-ink/[0.07] sm:col-span-2">
                <span className="block text-[13px] text-ink/55">Registered office</span>
                <span className="mt-1 block text-[15px] text-ink">
                  {SITE.legalName}, {SITE.address.streetAddress}, {SITE.address.addressLocality} {SITE.address.postalCode}, {SITE.address.addressRegion}, India
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-between rounded-[1.75rem] p-7 text-white md:p-9" style={{ backgroundImage: 'linear-gradient(160deg, #27187E 0%, #1B1059 100%)' }}>
              <div>
                <h2 className="font-fraunces text-[1.6rem] font-medium leading-tight md:text-[2rem]">Book a 20-minute demo</h2>
                <p className="mt-3 font-inter text-[15px] leading-relaxed text-white/75">See attendance, fees, homework and the AI calls on real screens. We share plans and pricing on the call.</p>
              </div>
              <CalPopupButton className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 font-inter text-[15px] font-semibold text-indigo transition hover:bg-peri-wash">
                Pick a time
              </CalPopupButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
