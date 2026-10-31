import type { FieldLayout, FieldTheme } from './StudentField';

type Props = { theme: FieldTheme; layout: FieldLayout; className?: string };

export function HeroPoster({ theme, layout, className }: Props) {
  const cols = layout === 'wide' ? 30 : 20;
  const rows = layout === 'register' ? 10 : 12;
  const alertRow = Math.floor(rows * 0.4);
  const alertCol = Math.floor(cols * 0.66);
  const w = cols * 20;
  const h = rows * 20;
  return (
    <div className={className}>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full" role="img" aria-label="Students in a school, one flagged for low attendance">
        {Array.from({ length: rows }).map((_, r) =>
          Array.from({ length: cols }).map((__, c) => {
            const alert = r === alertRow && c === alertCol;
            return (
              <circle
                key={`${r}-${c}`}
                cx={c * 20 + 10}
                cy={r * 20 + 10}
                r={alert ? 5.5 : 3.2}
                fill={alert ? theme.alert : theme.base}
                opacity={alert ? 1 : 0.35 + (r / rows) * 0.65}
              />
            );
          }),
        )}
      </svg>
    </div>
  );
}
