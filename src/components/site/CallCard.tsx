'use client';

import { useEffect, useRef, useState } from 'react';
import { call } from '@/content/home';
import { useStory, useTalkLines, type Phase } from './story';

export type CallSkin = {
  card: string;
  placeholder: string;
  trigger: string;
  status: string;
  dotAlert: string;
  dotGood: string;
  school: string;
  parent: string;
  who: string;
  logged: string;
  toggle: string;
  toggleOn: string;
};

const STATUS_INDEX: Record<Phase, number> = { idle: -1, alert: 0, calling: 1, talk: 2, logged: 3 };

const WAITING: Record<Phase, string> = {
  idle: 'Checking monthly attendance',
  alert: 'Starting a call to the family',
  calling: 'Ringing the family',
  talk: '',
  logged: '',
};

export function CallCard({ skin }: { skin: CallSkin }) {
  const { phase, cycle } = useStory();
  const [lang, setLang] = useState<'english' | 'hinglish'>('hinglish');
  const transcript = call.transcript[lang];
  const lines = useTalkLines(phase, cycle, transcript.length);
  const chat = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = chat.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [lines, lang]);

  const statusIndex = STATUS_INDEX[phase];
  const statusText = statusIndex >= 0 ? call.status[statusIndex] : 'Watching attendance';

  return (
    <div className={skin.card}>
      <div className="flex items-center justify-between gap-3">
        <span className={skin.placeholder}>{call.label}</span>
        <div className="flex shrink-0">
          {(['english', 'hinglish'] as const).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              className={`${skin.toggle} ${lang === l ? skin.toggleOn : ''}`}
            >
              {l === 'english' ? 'English' : 'Hinglish'}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <span
          className={`inline-block h-2.5 w-2.5 rounded-full ${phase === 'logged' ? skin.dotGood : phase === 'idle' ? 'bg-current opacity-30' : skin.dotAlert} ${phase === 'calling' ? 'animate-pulse' : ''}`}
        />
        <span key={statusText} className={`rise ${skin.status}`}>
          {statusText}
        </span>
      </div>
      <p className={skin.trigger}>{call.trigger}</p>

      <div ref={chat} className="mt-4 h-[13rem] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_2rem)] md:h-[16rem]">
        <div className="flex min-h-full flex-col justify-end gap-2">
          {lines === 0 && <p className="pb-6 text-center text-[13px] text-muted">{WAITING[phase]}</p>}
          {transcript.slice(0, lines).map((line) => (
            <div key={`${lang}-${line.text}`} className={`rise ${line.who === 'Parent' ? skin.parent : skin.school}`}>
              <span className={skin.who}>{line.who}</span>
              {line.text}
            </div>
          ))}
        </div>
      </div>

      <div className={`${skin.logged} ${phase === 'logged' ? 'rise' : 'invisible'}`}>
        <span aria-hidden>✓</span>
        <span>Logged</span>
        {call.logged.map((f) => (
          <span key={f.k} className="opacity-80">
            {f.k}: {f.v}
          </span>
        ))}
      </div>
    </div>
  );
}
