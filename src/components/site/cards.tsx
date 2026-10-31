'use client';

import { Fragment, useState } from 'react';
import { call } from '@/content/home';
import { useStory, useTalkLines, type Phase } from '@/components/site/story';
import { CARD, ICONS, Icon } from '@/components/site/ui';

const MARK_TONE: Record<string, string> = {
  P: 'bg-[#E7F7EC] text-[#166534]',
  A: 'bg-[#FDE8E1] text-[#B4380B]',
  L: 'bg-[#EEF0FF] text-indigo',
};

function Mark({ m }: { m: string }) {
  return <span className={`grid h-[18px] w-[18px] place-items-center rounded-[5px] text-[9.5px] font-semibold ${MARK_TONE[m]}`}>{m}</span>;
}

const REGISTER = [
  { roll: '03', name: 'Ananya Gupta', marks: 'PPPPPP', pct: 96 },
  { roll: '05', name: 'Ishaan Verma', marks: 'AAPAAA', pct: 38 },
  { roll: '08', name: 'Kavya Reddy', marks: 'PPAPPP', pct: 88 },
  { roll: '11', name: 'Saanvi Nair', marks: 'PPLLPP', pct: 92 },
];

export function RegisterCard({ className = '' }: { className?: string }) {
  return (
    <div className={`${CARD} w-[20.5rem] ${className}`}>
      <div className="flex items-baseline justify-between">
        <span className="text-[13px] font-semibold text-ink">Class 7-B register</span>
        <span className="text-[11px] text-muted">This month</span>
      </div>
      <div className="mt-3 space-y-1.5">
        {REGISTER.map((r) => {
          const low = r.pct < 40;
          return (
            <div key={r.roll} className={`flex items-center gap-2 rounded-lg px-1.5 py-1 ${low ? 'bg-[#FFF4EE] ring-1 ring-[#F9CDB8]' : ''}`}>
              <span className="w-5 text-[10px] tabular-nums text-muted">{r.roll}</span>
              <span className="flex-1 truncate text-[12px] text-ink">{r.name}</span>
              <span className="flex gap-0.5">
                {r.marks.split('').map((m, i) => (
                  <Mark key={i} m={m} />
                ))}
              </span>
              <span className={`w-8 text-right text-[11px] font-semibold tabular-nums ${low ? 'text-[#B4380B]' : 'text-ink/70'}`}>{r.pct}%</span>
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex items-center gap-2 border-t border-ink/[0.06] pt-2.5 text-[11px]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#C2410C]" />
        <span className="text-ink/70">Below 40%: call between 10 am and 6 pm</span>
      </div>
      <div className="mt-1 flex items-center gap-2 text-[11px]">
        <span className="h-1.5 w-1.5 rounded-full bg-peri" />
        <span className="text-ink/70">L is approved leave. It never triggers a call.</span>
      </div>
    </div>
  );
}

const STEPS: { phase: Phase; label: string }[] = [
  { phase: 'alert', label: 'Found' },
  { phase: 'calling', label: 'Calling' },
  { phase: 'talk', label: 'On call' },
  { phase: 'logged', label: 'Logged' },
];
const ORDER: Phase[] = ['idle', 'alert', 'calling', 'talk', 'logged'];

function Fill({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\])/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith('[') ? (
          <span key={i} className="rounded-md bg-peri-wash px-1.5 py-px text-[0.92em] font-medium text-indigo">
            {p.slice(1, -1)}
          </span>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        ),
      )}
    </>
  );
}

export function CallCardH({ className = '', full = false }: { className?: string; full?: boolean }) {
  const story = useStory();
  const phase: Phase = full ? 'logged' : story.phase;
  const [lang, setLang] = useState<'english' | 'hinglish'>('hinglish');
  const transcript = call.transcript[lang];
  const lines = useTalkLines(phase, story.cycle, transcript.length, full);

  const at = ORDER.indexOf(phase);

  return (
    <div className={`${CARD} w-full max-w-[22rem] p-5 ${className}`}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-indigo text-white">
            <Icon d={ICONS.call} size={16} />
          </span>
          <div className="leading-tight">
            <div className="text-[13px] font-semibold text-ink">AI call for the school</div>
            <div className="text-[11px] text-muted">{call.trigger}</div>
          </div>
        </div>
        <div className="flex shrink-0 rounded-full bg-paper p-0.5">
          {(['hinglish', 'english'] as const).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition ${lang === l ? 'bg-white text-indigo shadow-sm' : 'text-muted'}`}
            >
              {l === 'english' ? 'English' : 'Hinglish'}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-1.5">
        {STEPS.map((s, i) => {
          const on = at >= i + 1;
          return (
            <div key={s.phase}>
              <div className="h-1 overflow-hidden rounded-full bg-paper">
                <div className={`h-full origin-left rounded-full transition-transform duration-500 ${on ? 'scale-x-100' : 'scale-x-0'} ${s.phase === 'logged' ? 'bg-good' : 'bg-indigo'}`} />
              </div>
              <div className={`mt-1.5 text-[10px] font-medium ${on ? 'text-ink' : 'text-ink/35'}`}>{s.label}</div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 min-h-[9.5rem] space-y-2">
        {transcript.slice(0, lines).map((line) => (
          <div
            key={`${lang}-${line.text}`}
            className={
              line.who === 'Parent'
                ? 'rise ml-8 rounded-2xl rounded-tr-md bg-paper px-3.5 py-2.5 text-[13px] leading-snug text-ink/80'
                : 'rise mr-4 rounded-2xl rounded-tl-md bg-[#EEF0FF] px-3.5 py-2.5 text-[13px] leading-snug text-ink'
            }
          >
            <span className="mb-0.5 block text-[10px] font-semibold uppercase tracking-wider text-indigo/60">{line.who}</span>
            <Fill text={line.text} />
          </div>
        ))}
        {lines === 0 && (
          <div className="flex h-[9.5rem] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-ink/10 text-center text-[12px] text-muted">
            <span className={`h-2 w-2 rounded-full ${phase === 'idle' ? 'bg-ink/20' : 'animate-pulse bg-[#C2410C]'}`} />
            {phase === 'idle' ? 'Checking monthly attendance' : phase === 'alert' ? 'Attendance drop found' : 'Calling the family'}
          </div>
        )}
      </div>

      <div className={`mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl px-3.5 py-2.5 text-[11px] font-medium transition-colors ${phase === 'logged' ? 'bg-good-bg text-good' : 'bg-paper text-ink/40'}`}>
        <Icon d={ICONS.check} size={14} />
        <span>Logged for the class teacher</span>
        {call.logged.map((f) => (
          <span key={f.k} className="opacity-80">
            {f.k}: {f.v.startsWith('[') ? <Fill text={f.v} /> : f.v}
          </span>
        ))}
      </div>
    </div>
  );
}

export function CallLogCard() {
  const rows = [
    { name: 'Ishaan Verma', cls: '7-B', status: 'Call done', tone: 'bg-good-bg text-good' },
    { name: 'Riya Sharma', cls: '9-A', status: 'Message sent', tone: 'bg-peri-wash text-indigo' },
    { name: 'Aditya Singh', cls: '6-C', status: 'No answer', tone: 'bg-watch-bg text-watch' },
  ];
  return (
    <div className={`${CARD} w-[16.5rem]`}>
      <div className="text-[13px] font-semibold text-ink">Today&apos;s follow-ups</div>
      <div className="mt-2.5 space-y-2">
        {rows.map((r) => (
          <div key={r.name} className="flex items-center gap-2 text-[12px]">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-paper text-[9px] font-semibold text-ink/60">
              {r.name.split(' ').map((w) => w[0]).join('')}
            </span>
            <span className="flex-1 text-ink">{r.name}</span>
            <span className="text-[10px] text-muted">{r.cls}</span>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${r.tone}`}>{r.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LoggedCard() {
  const rows = call.logged.map(({ k, v }) => [k, v]);
  return (
    <div className={`${CARD} w-[16rem]`}>
      <div className="flex items-center gap-2">
        <span className="grid h-5 w-5 place-items-center rounded-full bg-good text-white">
          <Icon d={ICONS.check} size={12} />
        </span>
        <span className="text-[13px] font-semibold text-ink">Call logged</span>
      </div>
      <dl className="mt-2.5 space-y-1.5 text-[11px]">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-3">
            <dt className="text-muted">{k}</dt>
            <dd className="text-right font-medium text-ink">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function ReceiptCard() {
  return (
    <div className={`${CARD} w-[15.5rem]`}>
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-semibold text-ink">Fee receipt</span>
        <span className="rounded-full bg-good-bg px-2 py-0.5 text-[10px] font-semibold text-good">Paid</span>
      </div>
      <div className="mt-2.5 space-y-1 text-[11px] text-ink/65">
        <div className="flex justify-between"><span>Receipt No.</span><span className="font-medium tabular-nums text-ink">0142</span></div>
        <div className="flex justify-between"><span>Quarter 4 · Jan to Mar</span><span className="font-medium tabular-nums text-ink">₹14,550</span></div>
      </div>
      <div className="mt-2.5 flex items-center gap-2 rounded-lg border border-ink/10 px-2.5 py-1.5 text-[11px] text-ink/70">
        <Icon d={ICONS.sheet} size={13} />
        Receipt-0142.pdf
      </div>
    </div>
  );
}

export function FeeReminderCard() {
  return (
    <div className={`${CARD} w-[15rem]`}>
      <div className="flex items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-[#FFE6D6] text-[#9A3412]">
          <Icon d={ICONS.call} size={14} />
        </span>
        <span className="text-[13px] font-semibold text-ink">Fee reminder call</span>
      </div>
      <p className="mt-2 text-[11px] leading-snug text-ink/60">Goes out the day after the due date. It only reminds: no amounts, no links, no payments.</p>
    </div>
  );
}

const PILLARS = [
  { name: 'Attendance', w: 35 },
  { name: 'Academics', w: 30 },
  { name: 'Homework', w: 20 },
  { name: 'Behaviour', w: 15 },
];

export function PillarsCard() {
  return (
    <div className={`${CARD} w-[15.5rem]`}>
      <div className="text-[13px] font-semibold text-ink">What goes into the score</div>
      <div className="mt-3 space-y-2">
        {PILLARS.map((p) => (
          <div key={p.name} className="text-[11px]">
            <div className="flex justify-between">
              <span className="text-ink">{p.name}</span>
              <span className="tabular-nums text-muted">{p.w}%</span>
            </div>
            <div className="mt-1 h-1.5 rounded-full bg-paper">
              <div className="h-1.5 rounded-full bg-gradient-to-r from-indigo to-peri" style={{ width: `${p.w * 2.5}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 text-[10px] text-muted">Recomputed every night</div>
    </div>
  );
}

export function ReasonsCard() {
  return (
    <div className={`${CARD} w-[16.5rem]`}>
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-semibold text-ink">Riya Sharma · 9-A</span>
        <span className="rounded-full bg-watch-bg px-2 py-0.5 text-[10px] font-semibold text-watch">Slipping</span>
      </div>
      <div className="mt-2.5 space-y-2">
        {[
          ['Homework', '3 of the last 8 not submitted', 'text-[#B4380B]'],
          ['Attendance', 'Missed 4 days this month', 'text-[#B4380B]'],
          ['Academics', 'Steady in unit tests', 'text-good'],
        ].map(([k, v, t]) => (
          <div key={k} className="flex gap-2.5 border-l-[3px] border-peri-soft pl-2.5">
            <div className="flex-1">
              <div className="text-[11px] font-semibold text-indigo">{k}</div>
              <div className={`text-[10px] ${t}`}>{v}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function QuizSourceCard() {
  return (
    <div className={`${CARD} w-[16rem]`}>
      <div className="text-[13px] font-semibold text-ink">New question paper</div>
      <div className="mt-2.5 rounded-xl bg-paper px-3 py-2 text-[11px]">
        <div className="text-muted">Source</div>
        <div className="font-medium text-ink">NCERT Science, Class 9 · Chapter 9</div>
      </div>
      <div className="mt-2.5 flex flex-wrap gap-1">
        {['MCQ', 'True or false', 'Fill in the blank', 'Short answer', 'Long answer'].map((t) => (
          <span key={t} className="rounded-full bg-[#FFEFC7] px-2 py-0.5 text-[10px] font-medium text-[#92400E]">{t}</span>
        ))}
      </div>
      <div className="mt-2.5 flex gap-1 text-[10px]">
        <span className="rounded-full bg-ink px-2 py-0.5 text-white">English</span>
        <span className="rounded-full bg-paper px-2 py-0.5 text-ink/60">Hindi</span>
      </div>
    </div>
  );
}

export function QuizOutputCard() {
  return (
    <div className={`${CARD} w-[15rem]`}>
      <div className="flex gap-2 border-l-[3px] border-[#F5A524] pl-2.5">
        <div className="flex-1 text-[12px] leading-snug text-ink">State Newton&apos;s second law of motion.</div>
        <span className="text-[10px] font-medium text-muted">Edit</span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-1.5 text-[10px]">
        <span className="rounded-lg border border-ink/10 px-2 py-1.5 text-center text-ink/70">Question paper</span>
        <span className="rounded-lg border border-ink/10 px-2 py-1.5 text-center text-ink/70">Answer key</span>
      </div>
    </div>
  );
}

export function TimetableCard() {
  const rows = [
    ['1', 'Physics', 'Mr. Rakesh Jain'],
    ['2', 'Mathematics', 'Ms. Pooja Iyer'],
    ['3', 'English', 'Mrs. Neha Kapoor'],
  ];
  return (
    <div className={`${CARD} w-[16.5rem]`}>
      <div className="flex items-baseline justify-between">
        <span className="text-[13px] font-semibold text-ink">Class 10-B · Monday</span>
        <span className="text-[10px] text-muted">Draft</span>
      </div>
      <div className="mt-2.5 space-y-1.5">
        {rows.map(([n, s, t]) => (
          <div key={n} className="flex items-center gap-2 text-[11px]">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-[#FFE1E8] text-[10px] font-semibold text-[#9F1239]">{n}</span>
            <span className="flex-1 font-medium text-ink">{s}</span>
            <span className="text-muted">{t}</span>
          </div>
        ))}
      </div>
      <div className="mt-2.5 rounded-lg bg-good-bg px-2 py-1.5 text-center text-[10px] font-semibold text-good">No clashes found · Review before saving</div>
    </div>
  );
}

export function TeacherCheckCard() {
  return (
    <div className={`${CARD} w-[14rem]`}>
      <div className="text-[13px] font-semibold text-ink">Checked for every teacher</div>
      <div className="mt-2 space-y-1 text-[11px] text-ink/65">
        <div className="flex items-center gap-1.5"><Icon d={ICONS.check} size={12} className="text-good" /> No teacher in two classes at once</div>
        <div className="flex items-center gap-1.5"><Icon d={ICONS.check} size={12} className="text-good" /> Subjects spread across the week</div>
      </div>
    </div>
  );
}

export function MarkedCard() {
  return (
    <div className={`${CARD} w-[15rem]`}>
      <div className="flex items-center gap-2">
        <span className="grid h-5 w-5 place-items-center rounded-full bg-good text-white">
          <Icon d={ICONS.check} size={12} />
        </span>
        <span className="text-[13px] font-semibold text-ink">Attendance saved</span>
      </div>
      <p className="mt-2 text-[11px] leading-snug text-ink/60">Today&apos;s absences go into the daily check of each student&apos;s monthly attendance.</p>
    </div>
  );
}

export function LeaveCard() {
  return (
    <div className={`${CARD} w-[15.5rem]`}>
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-semibold text-ink">Leave request</span>
        <span className="rounded-full bg-good-bg px-2 py-0.5 text-[10px] font-semibold text-good">Approved</span>
      </div>
      <div className="mt-2 text-[12px] font-medium text-ink">Vivaan Kumar · 3 days</div>
      <div className="text-[11px] text-muted">Family function</div>
      <div className="mt-2.5 rounded-lg bg-peri-wash/70 px-2 py-1.5 text-[10px] font-medium text-indigo">These days never trigger an absence call</div>
    </div>
  );
}

export function PtmCard() {
  return (
    <div className={`${CARD} w-[15rem]`}>
      <div className="text-[13px] font-semibold text-ink">PTM scheduled</div>
      <div className="mt-2 space-y-1 text-[11px] text-ink/65">
        <div className="flex justify-between"><span>Teacher</span><span className="font-medium text-ink">Mr. Rakesh Jain</span></div>
        <div className="flex justify-between"><span>Topic</span><span className="font-medium text-ink">Unit test results</span></div>
      </div>
    </div>
  );
}

export function DoubtCard() {
  return (
    <div className={`${CARD} w-[15.5rem]`}>
      <div className="flex items-center justify-between text-[11px]">
        <span className="font-semibold text-indigo">Reply to a doubt</span>
        <span className="rounded-full bg-good-bg px-2 py-0.5 text-[10px] font-medium text-good">Answered</span>
      </div>
      <p className="mt-1.5 text-[12px] leading-snug text-ink">We will go over Q3 in tomorrow&apos;s class. Bring your notebook.</p>
      <div className="mt-2 text-[10px] text-muted">Mr. Rakesh Jain · Mathematics</div>
    </div>
  );
}
