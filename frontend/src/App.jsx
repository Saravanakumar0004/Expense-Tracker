import { useEffect, useState, useCallback } from 'react';
import { api } from './api';
import MonthPicker from './components/MonthPicker';
import SummaryStrip from './components/SummaryStrip';
import AddEntryForm from './components/AddEntryForm';
import CategoryChart from './components/CategoryChart';
import TransactionList from './components/TransactionList';
import MonthComparisonChart from './components/MonthComparisonChart';

function currentMonth() {
  return new Date().toISOString().slice(0, 7); // YYYY-MM
}

export default function App() {
  const [month, setMonth] = useState(currentMonth());
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState(null);
  const [monthly, setMonthly] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [txns, summ, monthlySumm] = await Promise.all([
        api.getTransactions(month),
        api.getSummary(month),
        api.getMonthlySummary(),
      ]);
      setTransactions(txns);
      setSummary(summ);
      setMonthly(monthlySumm);
    } catch (err) {
      setError(err.message || 'Could not reach the server.');
    } finally {
      setLoading(false);
    }
  }, [month]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleAdd(entry) {
    await api.addTransaction(entry);
    await load();
  }

  async function handleDelete(id) {
    await api.deleteTransaction(id);
    await load();
  }

  return (
    <div className="min-h-screen bg-ink900 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-[880px]">
        <header className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="mb-1 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-brassSoft">
              Personal Ledger
            </div>
            <h1 className="m-0 font-display text-[1.6rem] font-semibold text-paper sm:text-[2.1rem]">
              Where your money went
            </h1>
          </div>
          <MonthPicker month={month} onChange={setMonth} />
        </header>

        {error && (
          <div className="mb-5 rounded-sm bg-rustSoft px-4 py-3 text-sm text-rust">
            {error} — check that <code>VITE_API_URL</code> points to your running backend.
          </div>
        )}

        <div className="mb-6">
          <SummaryStrip summary={summary} loading={loading} />
        </div>

        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <SectionLabel>Add entry</SectionLabel>
            <AddEntryForm onAdd={handleAdd} />
          </div>
          <div>
            <SectionLabel>Spending by category</SectionLabel>
            <div className="rounded-sm border border-paperLine bg-paper p-4">
              <CategoryChart byCategory={summary?.byCategory} />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <SectionLabel>Transactions this month</SectionLabel>
          <TransactionList transactions={transactions} onDelete={handleDelete} />
        </div>

        <div>
          <SectionLabel>Compare months</SectionLabel>
          <div className="rounded-sm border border-paperLine bg-paper p-4">
            <MonthComparisonChart monthly={monthly} />
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="mb-2 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-brassSoft">
      {children}
    </div>
  );
}
