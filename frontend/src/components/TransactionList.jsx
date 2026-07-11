function formatDate(d) {
  return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
}

export default function TransactionList({ transactions, onDelete }) {
  if (!transactions || transactions.length === 0) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        Nothing logged for this month yet. Add your first entry above.
      </div>
    );
  }

  return (
    <div style={{ border: '1px solid var(--paper-line)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '70px 1fr 90px 110px 32px',
          padding: '0.6rem 1rem',
          background: 'var(--ink-900)',
          color: 'var(--paper)',
          fontSize: '0.7rem',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}
      >
        <span>Date</span>
        <span>Category / Note</span>
        <span>Type</span>
        <span style={{ textAlign: 'right' }}>Amount</span>
        <span></span>
      </div>
      {transactions.map((t) => (
        <div
          key={t._id}
          style={{
            display: 'grid',
            gridTemplateColumns: '70px 1fr 90px 110px 32px',
            padding: '0.7rem 1rem',
            borderTop: '1px dashed var(--paper-line)',
            background: 'var(--paper)',
            alignItems: 'center',
            fontSize: '0.85rem',
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
            {formatDate(t.date)}
          </span>
          <span>
            {t.category}
            {t.note && <span style={{ color: 'var(--text-muted)' }}> — {t.note}</span>}
          </span>
          <span
            style={{
              fontSize: '0.7rem',
              textTransform: 'uppercase',
              color: t.type === 'income' ? 'var(--brass)' : 'var(--rust)',
            }}
          >
            {t.type}
          </span>
          <span
            style={{
              textAlign: 'right',
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
              color: t.type === 'income' ? 'var(--brass)' : 'var(--rust)',
            }}
          >
            {t.type === 'income' ? '+' : '−'}₹{t.amount.toLocaleString('en-IN')}
          </span>
          <button
            onClick={() => onDelete(t._id)}
            aria-label={`Delete ${t.category} entry`}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              fontSize: '1rem',
              justifySelf: 'end',
            }}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
