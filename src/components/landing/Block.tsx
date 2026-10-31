import type { ReactNode } from 'react';
import { Reveal } from '@/components/site/Reveal';
import { WRAP } from '@/components/site/ui';

export function Block({ id, q, a, tint = false, children }: { id?: string; q: string; a: string; tint?: boolean; children?: ReactNode }) {
  return (
    <section id={id} className={`py-12 md:py-20 ${tint ? 'bg-[#F6F6FB]' : 'bg-white'}`}>
      <div className={WRAP}>
        <Reveal className="max-w-3xl">
          <h2 className="font-fraunces text-[1.6rem] font-medium leading-[1.12] tracking-[-0.015em] text-ink md:text-[2.3rem]">{q}</h2>
          <p className="mt-4 font-inter text-[16px] leading-relaxed text-ink/80 md:text-[17px]">{a}</p>
        </Reveal>
        {children && <div className="mt-8 md:mt-10">{children}</div>}
      </div>
    </section>
  );
}
