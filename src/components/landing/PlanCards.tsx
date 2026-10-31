import { Button, ICONS, Icon } from '@/components/site/ui';

type Tier = { name: string; line: string; groups: { title: string; items: string[] }[] };

export function PlanCards({ tiers }: { tiers: Tier[] }) {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {tiers.map((t, i) => (
        <article key={t.name} className={`flex flex-col rounded-[1.75rem] p-7 ring-1 md:p-8 ${i === 1 ? 'bg-[#F4F4FC] ring-indigo/20' : 'bg-white ring-ink/[0.07]'}`}>
          <h3 className="font-fraunces text-[1.6rem] font-medium tracking-[-0.015em] text-ink">{t.name}</h3>
          <p className="mt-2 font-inter text-[15px] leading-relaxed text-ink/65">{t.line}</p>
          <div className="mt-6 flex-1 space-y-6">
            {t.groups.map((g) => (
              <div key={g.title}>
                <div className="font-inter text-[12px] font-semibold uppercase tracking-wider text-indigo/70">{g.title}</div>
                <ul className="mt-3 space-y-2.5">
                  {g.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 font-inter text-[14.5px] text-ink/80">
                      <span className="mt-0.5 text-good">
                        <Icon d={ICONS.check} size={17} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Button href="/book-demo" variant={i === 1 ? 'solid' : 'soft'} className="mt-8 justify-center">
            Talk to us for pricing
          </Button>
        </article>
      ))}
    </div>
  );
}
