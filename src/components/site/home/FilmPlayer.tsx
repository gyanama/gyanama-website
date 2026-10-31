'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PHOTOS } from '@/components/site/primitives';

export function FilmPlayer() {
  const [on, setOn] = useState(false);
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-[1.5rem] bg-ink shadow-[0_40px_80px_-40px_rgba(39,24,126,0.6)] ring-1 ring-white/70">
      {on ? (
        <video src="/intro.mp4" controls autoPlay playsInline preload="none" className="h-full w-full bg-black object-cover" />
      ) : (
        <button type="button" onClick={() => setOn(true)} className="group absolute inset-0 text-left" aria-label="Play the 70 second Gyanama film">
          <Image src={PHOTOS.library.src} alt="" fill sizes="(min-width: 1024px) 40vw, 92vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.02]" style={{ objectPosition: PHOTOS.library.pos }} />
          <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#1B1059]/85 via-[#1B1059]/25 to-transparent" />
          <span className="absolute inset-x-5 bottom-5 flex items-center gap-4 md:inset-x-8 md:bottom-7">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white text-indigo shadow-xl transition-transform group-hover:scale-105 md:h-16 md:w-16">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="font-inter text-white">
              <span className="block text-[15px] font-semibold md:text-lg">Watch the film</span>
              <span className="block text-[13px] text-white/70">70 seconds</span>
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
