'use client';

import type { CSSProperties } from 'react';
import { useStory, type Phase } from './story';

const DOT = 26;

const PLANE: CSSProperties = {
  backgroundImage: 'radial-gradient(circle, #768BFE 2.2px, transparent 2.8px)',
  backgroundSize: `${DOT}px ${DOT}px`,
};

const ALERT_DOT: Record<Phase, string> = {
  idle: 'scale-100 bg-peri',
  alert: 'scale-[1.9] bg-risk',
  calling: 'scale-[1.9] bg-risk',
  talk: 'scale-[1.9] bg-risk',
  logged: 'scale-[1.7] bg-good',
};

export function HeroField({ className = '' }: { className?: string }) {
  const { phase } = useStory();
  const ringing = phase === 'alert' || phase === 'calling' || phase === 'talk';
  return (
    <div aria-hidden className={`pointer-events-none overflow-hidden ${className}`}>
      <div className="absolute -bottom-[8%] left-1/2 h-[125%] w-[1560px] -translate-x-1/2 [perspective:1400px]">
        <div className="h-full w-full origin-bottom [mask-image:linear-gradient(to_bottom,transparent,black_45%)] [transform:rotateX(42deg)]">
          <div className="field-drift relative h-full w-full" style={PLANE}>
            <span className="absolute left-[949px] top-[325px] h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 md:left-[871px]">
              {ringing && (
                <>
                  <span className="field-ping absolute inset-0 rounded-full bg-risk" />
                  <span className="field-ping absolute inset-0 rounded-full bg-risk [animation-delay:0.6s]" />
                </>
              )}
              <span className={`absolute inset-0 rounded-full transition-[transform,background-color] duration-500 ${ALERT_DOT[phase]}`} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
