import { call } from '@/content/home';

const LANGS = [
  { key: 'hinglish', label: 'Hinglish, as spoken' },
  { key: 'english', label: 'In English' },
] as const;

export function Transcript() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {LANGS.map((l) => (
        <figure key={l.key} className="rounded-[1.5rem] bg-white p-6 ring-1 ring-ink/[0.07] md:p-7">
          <figcaption className="font-inter text-[12px] font-semibold uppercase tracking-wider text-indigo/70">{l.label}</figcaption>
          <dl className="mt-4 space-y-3 font-inter text-[15px] leading-relaxed">
            {call.transcript[l.key].map((line, i) => (
              <div key={i} className="grid grid-cols-[4.5rem_1fr] gap-3">
                <dt className={`font-semibold ${line.who === 'Parent' ? 'text-ink/50' : 'text-indigo'}`}>{line.who}</dt>
                <dd className="text-ink/80">{line.text.replace(/\[([^\]]+)\]/g, '$1')}</dd>
              </div>
            ))}
          </dl>
        </figure>
      ))}
    </div>
  );
}
