function formatINR(n) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(n || 0);
}

export default function SummaryStrip({ summary, loading }) {
  const rows = [
    { label: 'Income', value: summary?.income, tone: 'brass' },
    { label: 'Expenses', value: summary?.expense, tone: 'rust' },
    { label: 'Saved', value: summary?.savings, tone: summary?.savings >= 0 ? 'brass' : 'rust' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-px overflow-hidden rounded-sm border border-paperLine bg-paperLine">
      {rows.map((row) => (
        <div key={row.label} className="bg-paper px-6 py-5">
          <div className="mb-1 text-[0.7rem] uppercase tracking-wider text-textMuted">
            {row.label}
          </div>
          <div
            className={`font-mono text-2xl font-semibold tabular-nums ${
              row.tone === 'brass' ? 'text-brass' : 'text-rust'
            }`}
          >
            {loading ? '···' : formatINR(row.value)}
          </div>
        </div>
      ))}
    </div>
  );
}
