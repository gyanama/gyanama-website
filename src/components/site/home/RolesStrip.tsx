import { Reveal } from '@/components/site/Reveal';
import { Photo, type PhotoName } from '@/components/site/primitives';
import { WRAP } from '@/components/site/ui';

const ROLES: { who: string; photo: PhotoName; line: string }[] = [
  { who: 'Principals and owners', photo: 'libraryWide', line: 'Live attendance, absentee calls, fees due and a score for every class.' },
  { who: 'Teachers', photo: 'bioLab', line: 'Attendance in a few taps. Gyanama calls the families of students who keep missing school.' },
  { who: 'Students', photo: 'globe', line: 'Timetable, homework, exam dates and results in one place.' },
  { who: 'Families', photo: 'smartBoard', line: 'Use the student login. Calls come 10 am to 6 pm and never ask for money.' },
];

export function RolesStrip() {
  return (
    <section className="border-y border-ink/[0.06] bg-[#FAFAFD] py-8 md:py-12">
      <div className={WRAP}>
        <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-4 md:gap-5 md:overflow-visible md:px-0 md:pb-0">
          {ROLES.map((r, i) => (
            <Reveal key={r.who} delay={i * 0.05} className="w-[72%] shrink-0 snap-start overflow-hidden rounded-[1.4rem] bg-white ring-1 ring-ink/[0.06] sm:w-[45%] md:w-auto">
              <Photo name={r.photo} sizes="(min-width: 768px) 25vw, 72vw" className="aspect-[16/10] w-full" />
              <div className="p-4 md:p-5">
                <div className="font-inter text-[15px] font-semibold text-ink">{r.who}</div>
                <p className="mt-1 font-inter text-[13.5px] leading-relaxed text-ink/65">{r.line}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
