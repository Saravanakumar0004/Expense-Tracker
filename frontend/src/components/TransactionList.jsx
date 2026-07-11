function formatDate(d) {
  return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
}

const gridCols = 'grid-cols-[52px_1fr_78px_24px] sm:grid-cols-[70px_1fr_90px_110px_32px]';

export default function TransactionList({ transactions, onDelete }) {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="p-8 text-center text-sm text-textMuted">
        Nothing logged for this month yet. Add your first entry above.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-sm border border-paperLine">
      <div
        className={`grid ${gridCols} items-center bg-ink900 px-4 py-2 text-[0.7rem] uppercase tracking-wider text-paper`}
      >
        <span>Date</span>
        <span>Category / Note</span>
        <span className="hidden sm:block">Type</span>
        <span className="text-right">Amount</span>
        <span></span>
      </div>
      {transactions.map((t) => (
        <div
          key={t._id}
          className={`grid ${gridCols} items-center border-t border-dashed border-paperLine bg-paper px-4 py-3 text-sm`}
        >
          <span className="font-mono text-textMuted">{formatDate(t.date)}</span>
          <span className="truncate">
            {t.category}
            {t.note && <span className="text-textMuted"> — {t.note}</span>}
          </span>
          <span
            className={`hidden text-[0.7rem] uppercase sm:block ${
              t.type === 'income' ? 'text-brass' : 'text-rust'
            }`}
          >
            {t.type}
          </span>
          <span
            className={`text-right font-mono font-semibold ${
              t.type === 'income' ? 'text-brass' : 'text-rust'
            }`}
          >
            {t.type === 'income' ? '+' : '−'}₹{t.amount.toLocaleString('en-IN')}
          </span>
          <button
            onClick={() => {
              const label = t.note ? `${t.category} — ${t.note}` : t.category;
              const amount = `₹${t.amount.toLocaleString('en-IN')}`;
              if (window.confirm(`Delete this entry?\n\n${label} · ${amount}`)) {
                onDelete(t._id);
              }
            }}
            aria-label={`Delete ${t.category} entry`}
            className="justify-self-end text-base text-textMuted transition-colors hover:text-rust"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}