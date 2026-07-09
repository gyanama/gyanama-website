// One phone frame for the whole site. The product screenshots have varying
// heights (393x852 .. 393x1291), so we lock a phone aspect and crop from the
// top: every device renders identically and no image causes layout shift.
const ASPECT = '393 / 852';

interface PhoneFrameProps {
  src: string;
  alt: string;
  /** Rendered width in px. */
  width?: number;
  /** Above-the-fold images should load eagerly. */
  eager?: boolean;
  className?: string;
}

export function PhoneFrame({ src, alt, width = 220, eager = false, className = '' }: PhoneFrameProps) {
  return (
    <div
      className={`rounded-[2rem] border border-white/60 bg-white shadow-glass-lg p-1.5 ${className}`}
      style={{ width }}
    >
      <div className="rounded-[1.6rem] overflow-hidden bg-muted" style={{ aspectRatio: ASPECT }}>
        <img
          src={src}
          alt={alt}
          width={393}
          height={852}
          loading={eager ? 'eager' : 'lazy'}
          decoding={eager ? 'sync' : 'async'}
          className="w-full h-full object-cover object-top block"
        />
      </div>
    </div>
  );
}
