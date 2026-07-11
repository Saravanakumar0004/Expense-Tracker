import { useState } from 'react';

const EXPENSE_CATEGORIES = ['Food', 'Petrol', 'Recharge', 'Trip', 'Dress', 'Rent', 'Other'];
const INCOME_CATEGORIES = ['Salary', 'Bonus', 'Other'];

const inputClass =
  'w-full rounded-sm border border-paperLine bg-white px-3 py-2.5 text-sm text-textInk';
const labelClass =
  'mb-1.5 block text-[0.7rem] uppercase tracking-wider text-textMuted';

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
      className="rounded-sm border border-paperLine bg-paper p-5 sm:p-6"
    >
      <div className="mb-5 flex gap-2">
        {['expense', 'income'].map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => handleTypeChange(t)}
            className={`flex-1 rounded-sm border py-2.5 text-sm font-semibold capitalize transition-colors ${
              type === t
                ? t === 'expense'
                  ? 'border-transparent bg-rust text-white'
                  : 'border-transparent bg-brass text-white'
                : 'border-paperLine bg-transparent text-textInk'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={inputClass}
            required
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={inputClass}
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className={labelClass} htmlFor="amount">Amount (₹)</label>
        <input
          id="amount"
          type="number"
          min="0"
          step="1"
          placeholder="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className={`${inputClass} font-mono`}
          required
        />
      </div>

      <div className="mb-5">
        <label className={labelClass} htmlFor="note">Note (optional)</label>
        <input
          id="note"
          type="text"
          placeholder="e.g. July petrol top-up"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className={inputClass}
        />
      </div>

      {error && <div className="mb-4 text-sm text-rust">{error}</div>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-sm bg-ink900 py-3 text-sm font-semibold text-paper disabled:opacity-60"
      >
        {submitting ? 'Saving…' : 'Add entry'}
      </button>
    </form>
  );
}
