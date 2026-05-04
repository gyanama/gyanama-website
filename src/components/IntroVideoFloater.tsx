import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, Minimize2, Volume2, VolumeX, X } from 'lucide-react';

export function IntroVideoFloater() {
  const [hovered, setHovered] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [muted, setMuted] = useState(true);
  const [dismissed, setDismissed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const expanded = hovered || fullscreen;

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = muted;
    if (!muted) {
      v.play().catch(() => setMuted(true));
    }
  }, [muted]);

  useEffect(() => {
    const lock = fullscreen && !dismissed;
    if (!lock) {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFullscreen(false);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [fullscreen, dismissed]);

  if (dismissed) return null;

  const sizeWhenFloating = {
    width: hovered ? 'min(480px, 90vw)' : 176,
    height: hovered ? 'min(270px, 50.625vw)' : 99,
  };
  const sizeWhenFullscreen = {
    width: 'min(1100px, 92vw)',
    height: 'min(620px, 75vh)',
  };

  return (
    <>
      <AnimatePresence>
        {fullscreen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setFullscreen(false)}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-md"
          />
        )}
      </AnimatePresence>

      <motion.div
        drag={!fullscreen}
        dragMomentum={false}
        dragElastic={0.1}
        dragConstraints={{
          top: -window.innerHeight + 200,
          left: -window.innerWidth + 200,
          right: 16,
          bottom: 16,
        }}
        onMouseEnter={() => !fullscreen && setHovered(true)}
        onMouseLeave={() => {
          if (fullscreen) return;
          setHovered(false);
          setMuted(true);
        }}
        animate={
          fullscreen
            ? {
                ...sizeWhenFullscreen,
                top: `calc(50vh - (${sizeWhenFullscreen.height}) / 2)`,
                left: `calc(50vw - (${sizeWhenFullscreen.width}) / 2)`,
                right: 'auto',
                bottom: 'auto',
                x: 0,
                y: 0,
              }
            : {
                ...sizeWhenFloating,
                top: 'auto',
                left: 'auto',
                right: 16,
                bottom: 16,
                x: 0,
                y: 0,
              }
        }
        transition={{ type: 'spring', stiffness: 220, damping: 26 }}
        className={`fixed z-[70] overflow-hidden rounded-xl bg-black shadow-2xl ring-1 ring-black/10 ${
          fullscreen ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'
        }`}
      >
        <video
          ref={videoRef}
          src="/intro.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="pointer-events-none h-full w-full object-cover"
        />

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black/60 via-transparent to-black/40 p-3"
            >
              <button
                type="button"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  setMuted((m) => !m);
                }}
                aria-label={muted ? 'Unmute intro video' : 'Mute intro video'}
                className="flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-sm font-medium text-black shadow transition hover:bg-white"
              >
                {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                {muted ? 'Unmute' : 'Mute'}
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    setFullscreen((f) => !f);
                    setHovered(false);
                  }}
                  aria-label={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                  className="rounded-full bg-white/90 p-1.5 text-black shadow transition hover:bg-white"
                >
                  {fullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </button>
                <button
                  type="button"
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    setDismissed(true);
                  }}
                  aria-label="Close intro video"
                  className="rounded-full bg-white/90 p-1.5 text-black shadow transition hover:bg-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
