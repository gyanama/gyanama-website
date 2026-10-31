import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { voiceAgent as content } from '@/content/pages/voice-agent';
import { voice } from '@/content/voice';
import { call } from '@/content/home';
import { LandingPage } from '@/components/landing/LandingPage';
import { Block } from '@/components/landing/Block';
import { Transcript } from '@/components/landing/Transcript';
import { CallCardH } from '@/components/site/cards';
import { ParentAndSchool } from '@/components/site/home/Trust';

export const metadata: Metadata = pageMetadata({ path: content.path, title: content.title, description: content.description });

export default function VoiceAgentPage() {
  return (
    <LandingPage c={content}>
      <Block q="How does the voice agent decide when to call?" a="Gyanama checks attendance and fees every day. It messages the family first when attendance drops, and calls only when attendance keeps falling, drops below 40%, or a fee is overdue.">
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {voice.steps.map((s) => (
            <li key={s.n} className="rounded-[1.4rem] bg-[#F6F6FB] p-6">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-indigo font-inter text-[14px] font-semibold text-white">{s.n}</span>
              <h3 className="mt-4 font-inter text-[16px] font-semibold text-ink">{s.title}</h3>
              <p className="mt-1.5 font-inter text-[14.5px] leading-relaxed text-ink/65">{s.body}</p>
            </li>
          ))}
        </ol>
      </Block>
      <Block id="call" tint q="What does a real call sound like?" a="This is a real attendance call with the names changed. The parent explains the absence, no leave is needed, and the outcome is logged for the class teacher.">
        <div className="grid items-start gap-8 lg:grid-cols-[22rem_1fr] lg:gap-10">
          <div>
            <CallCardH full />
            <p className="mt-3 font-inter text-[13px] text-ink/55">{call.label}</p>
          </div>
          <Transcript />
        </div>
      </Block>
      <Block q="Which languages does the call use?" a={`Hindi, Hinglish or English. ${voice.languages.body}`}>
        <ul className="flex flex-wrap gap-2">
          {[...voice.languages.list, 'Marathi and Tamil in app messages'].map((l) => (
            <li key={l} className="rounded-full bg-peri-wash px-4 py-2 font-inter text-[14px] font-medium text-indigo">{l}</li>
          ))}
        </ul>
      </Block>
      <Block tint q="What is logged after each call?" a="Every call is saved against the student, so the class teacher and the principal can see what the parent said and what happens next.">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {voice.logFields.map((f) => (
            <li key={f} className="rounded-[1.2rem] bg-white px-5 py-4 font-inter text-[15px] font-medium text-ink ring-1 ring-ink/[0.07]">{f}</li>
          ))}
        </ul>
      </Block>
      <Block q="Is the call safe for parents?" a="Yes. The call only talks about attendance or an overdue fee. It never takes a payment, quotes an amount or sends a link, and the school sets the rules for who is called and when.">
        <ParentAndSchool />
      </Block>
    </LandingPage>
  );
}
