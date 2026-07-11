import { useState } from 'react';

const EXPENSE_CATEGORIES = ['Food', 'Petrol', 'Recharge', 'Trip', 'Dress', 'Rent', 'Other'];
const INCOME_CATEGORIES = ['Salary', 'Bonus', 'Other'];

const inputStyle = {
  width: '100%',
  padding: '0.6rem 0.7rem',
  border: '1px solid var(--paper-line)',
  borderRadius: 'var(--radius)',
  background: '#fff',
  fontSize: '0.9rem',
  color: 'var(--text-ink)',
};

const labelStyle = {
  display: 'block',
  fontSize: '0.7rem',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: 'var(--text-muted)',
  marginBottom: '0.35rem',
};

export default function AddEntryForm({ onAdd }) {
  const todayStr = new Date().toISOString().slice(0, 10);
  const [type, setType] = useState('expense');
  const [date, setDate] = useState(todayStr);
  const [category, setCategory] = useState(EXPENSE_CATEGORIES[0]);
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const categories = type === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  function handleTypeChange(newType) {
    setType(newType);
    setCategory(newType === 'expense' ? EXPENSE_CATEGORIES[0] : INCOME_CATEGORIES[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!amount || Number(amount) <= 0) {
      setError('Enter an amount greater than zero.');
      return;
    }

    setSubmitting(true);
    try {
      await onAdd({ date, type, category, amount: Number(amount), note });
      setAmount('');
      setNote('');
    } catch (err) {
      setError(err.message || 'Could not save entry.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: 'var(--paper)',
        border: '1px solid var(--paper-line)',
        borderRadius: 'var(--radius)',
        padding: '1.5rem',
      }}
    >
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
        {['expense', 'income'].map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => handleTypeChange(t)}
            style={{
              flex: 1,
              padding: '0.55rem',
              borderRadius: 'var(--radius)',
              border: `1px solid ${type === t ? 'transparent' : 'var(--paper-line)'}`,
              background: type === t ? (t === 'expense' ? 'var(--rust)' : 'var(--brass)') : 'transparent',
              color: type === t ? '#fff' : 'var(--text-ink)',
              fontWeight: 600,
              fontSize: '0.85rem',
              textTransform: 'capitalize',
              transition: 'background 0.15s ease',
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.9rem', marginBottom: '0.9rem' }}>
        <div>
          <label style={labelStyle} htmlFor="date">Date</label>
          <input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} style={inputStyle} required />
        </div>
        <div>
          <label style={labelStyle} htmlFor="category">Category</label>
          <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} style={inputStyle}>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ marginBottom: '0.9rem' }}>
        <label style={labelStyle} htmlFor="amount">Amount (₹)</label>
        <input
          id="amount"
          type="number"
          min="0"
          step="1"
          placeholder="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ ...inputStyle, fontFamily: 'var(--font-mono)' }}
          required
        />
      </div>

      <div style={{ marginBottom: '1.1rem' }}>
        <label style={labelStyle} htmlFor="note">Note (optional)</label>
        <input
          id="note"
          type="text"
          placeholder="e.g. July petrol top-up"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          style={inputStyle}
        />
      </div>

      {error && (
        <div style={{ color: 'var(--rust)', fontSize: '0.85rem', marginBottom: '0.9rem' }}>{error}</div>
      )}

      <button
        type="submit"
        disabled={submitting}
        style={{
          width: '100%',
          padding: '0.7rem',
          background: 'var(--ink-900)',
          color: 'var(--paper)',
          border: 'none',
          borderRadius: 'var(--radius)',
          fontWeight: 600,
          fontSize: '0.9rem',
          opacity: submitting ? 0.6 : 1,
        }}
      >
        {submitting ? 'Saving…' : 'Add entry'}
      </button>
    </form>
  );
}
