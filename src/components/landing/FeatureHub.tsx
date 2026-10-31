import Link from 'next/link';
import { PAGE_INDEX } from '@/lib/pages';
import { ICONS, Icon } from '@/components/site/ui';
import { Block } from './Block';

export function FeatureHub({ groups }: { groups: { title: string; q: string; a: string; links: string[] }[] }) {
  return (
    <>
      {groups.map((g, i) => (
        <Block key={g.title} q={g.q} a={g.a} tint={i % 2 === 1}>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {g.links.map((href) => {
              const meta = PAGE_INDEX[href];
              if (!meta) return null;
              return (
                <li key={href}>
                  <Link href={href} className="group flex h-full flex-col rounded-[1.4rem] bg-white p-5 ring-1 ring-ink/[0.07] transition hover:ring-indigo/30">
                    <span className="flex items-center justify-between font-inter text-[15.5px] font-semibold text-ink">
                      {meta.label}
                      <Icon d={ICONS.arrow} size={16} className="text-indigo transition-transform group-hover:translate-x-0.5" />
                    </span>
                    <span className="mt-1.5 font-inter text-[14px] leading-relaxed text-ink/60">{meta.line}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Block>
      ))}
    </>
  );
}
