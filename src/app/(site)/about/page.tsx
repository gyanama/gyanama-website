import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { SITE } from '@/lib/site';
import { about as content } from '@/content/pages/about';
import { LandingPage } from '@/components/landing/LandingPage';
import { Block } from '@/components/landing/Block';
import { StoreBadges } from '@/components/site/ui';

export const metadata: Metadata = pageMetadata({ path: content.path, title: content.title, description: content.description });

const initials = (name: string) => name.split(' ').map((w) => w[0]).join('');

export default function AboutPage() {
  return (
    <LandingPage c={content}>
      <Block tint q="Who founded Gyanama?" a={`${SITE.founders[0].name} and ${SITE.founders[1].name} founded Gyanama and run ${SITE.legalName} in Noida.`}>
        <div className="grid gap-4 md:grid-cols-2">
          {SITE.founders.map((f) => (
            <div key={f.name} className="flex items-center gap-5 rounded-[1.5rem] bg-white p-6 ring-1 ring-ink/[0.07] md:p-7">
              <span aria-hidden className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-indigo font-inter text-lg font-semibold text-white">
                {initials(f.name)}
              </span>
              <div className="font-inter">
                <h3 className="text-[17px] font-semibold text-ink">{f.name}</h3>
                <p className="mt-0.5 text-[14.5px] text-ink/60">{f.jobTitle}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <StoreBadges />
        </div>
      </Block>
    </LandingPage>
  );
}
