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
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1px',
        background: 'var(--paper-line)',
        border: '1px solid var(--paper-line)',
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
      }}
    >
      {rows.map((row) => (
        <div key={row.label} style={{ background: 'var(--paper)', padding: '1.25rem 1.5rem' }}>
          <div
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              marginBottom: '0.4rem',
            }}
          >
            {row.label}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '1.5rem',
              fontWeight: 600,
              color: row.tone === 'brass' ? 'var(--brass)' : 'var(--rust)',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {loading ? '···' : formatINR(row.value)}
          </div>
        </div>
      ))}
    </div>
  );
}
