export default function MonthPicker({ month, onChange }) {
  return (
    <input
      type="month"
      value={month}
      onChange={(e) => onChange(e.target.value)}
      style={{
        background: 'transparent',
        border: `1px solid var(--paper-line)`,
        borderRadius: 'var(--radius)',
        padding: '0.5rem 0.75rem',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.9rem',
        color: 'var(--text-ink)',
      }}
      aria-label="Select month"
    />
  );
}
