export default function MonthPicker({ month, onChange }) {
  return (
    <input
      type="month"
      value={month}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Select month"
      className="min-w-[160px] w-auto rounded-sm border border-paperLine bg-white px-3 py-2 font-mono text-sm text-textInk"
    />
  );
}
