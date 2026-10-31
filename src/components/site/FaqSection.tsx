import { Reveal } from '@/components/site/Reveal';
import { Faq, SectionHead, WRAP } from '@/components/site/ui';
import { FAQPageSchema, type Faq as FaqItem } from '@/components/seo/JsonLd';
import { SITE } from '@/lib/site';

export function FaqSection({ items, title = 'Questions schools ask.' }: { items: FaqItem[]; title?: string }) {
  return (
    <section id="faq" className="bg-white py-14 md:py-24">
      <FAQPageSchema faqs={items} />
      <div className={`${WRAP} grid gap-10 lg:grid-cols-[0.8fr_1.2fr]`}>
        <Reveal>
          <SectionHead kicker="FAQ" title={title} />
          <p className="mt-5 font-inter text-[15.5px] text-ink/60">
            Anything else?{' '}
            <a href={SITE.whatsappUrl} className="font-semibold text-indigo underline decoration-indigo/30 underline-offset-4">
              Message us on WhatsApp
            </a>
          </p>
        </Reveal>
        <div>
          <Faq items={items} />
        </div>
      </div>
    </section>
  );
}
