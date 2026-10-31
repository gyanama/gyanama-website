export type ComparisonRow = { task: string; other: string; ours: string };

export function Comparison({ rows, otherLabel, oursLabel }: { rows: ComparisonRow[]; otherLabel: string; oursLabel: string }) {
  return (
    <div className="overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-ink/[0.07]">
      <table className="w-full border-collapse text-left font-inter max-md:block">
        <thead className="bg-[#F4F4FC] max-md:hidden">
          <tr>
            <th scope="col" className="w-[26%] px-6 py-4 text-[13px] font-semibold text-ink/60">Task</th>
            <th scope="col" className="w-[34%] px-6 py-4 text-[13px] font-semibold text-ink/60">{otherLabel}</th>
            <th scope="col" className="px-6 py-4 text-[13px] font-semibold text-indigo">{oursLabel}</th>
          </tr>
        </thead>
        <tbody className="max-md:block">
          {rows.map((r) => (
            <tr key={r.task} className="border-t border-ink/[0.07] first:border-t-0 max-md:block max-md:px-5 max-md:py-5 md:first:border-t">
              <th scope="row" className="px-6 py-5 align-top text-[15px] font-semibold text-ink max-md:block max-md:p-0">{r.task}</th>
              <td className="px-6 py-5 align-top text-[14.5px] leading-relaxed text-ink/60 max-md:mt-3 max-md:block max-md:p-0">
                <span className="mb-0.5 block text-[11px] font-semibold uppercase tracking-wider text-ink/40 md:hidden">{otherLabel}</span>
                {r.other}
              </td>
              <td className="px-6 py-5 align-top text-[14.5px] leading-relaxed text-ink max-md:mt-3 max-md:block max-md:p-0">
                <span className="mb-0.5 block text-[11px] font-semibold uppercase tracking-wider text-indigo/70 md:hidden">{oursLabel}</span>
                {r.ours}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
