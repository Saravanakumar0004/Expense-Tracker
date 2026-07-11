import { useEffect, useState, useCallback } from 'react';
import { api } from './api';
import MonthPicker from './components/MonthPicker';
import SummaryStrip from './components/SummaryStrip';
import AddEntryForm from './components/AddEntryForm';
import CategoryChart from './components/CategoryChart';
import TransactionList from './components/TransactionList';

function currentMonth() {
  return new Date().toISOString().slice(0, 7); // YYYY-MM
}

export default function App() {
  const [month, setMonth] = useState(currentMonth());
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [txns, summ] = await Promise.all([
        api.getTransactions(month),
        api.getSummary(month),
      ]);
      setTransactions(txns);
      setSummary(summ);
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
    <div style={{ minHeight: '100vh', padding: '2.5rem 1.5rem' }}>
      <div style={{ maxWidth: 880, margin: '0 auto' }}>
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '1.75rem',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--brass-soft)',
                marginBottom: '0.3rem',
              }}
            >
              Personal Ledger
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2.1rem',
                fontWeight: 600,
                color: 'var(--paper)',
                margin: 0,
              }}
            >
              Where your money went
            </h1>
          </div>
          <MonthPicker month={month} onChange={setMonth} />
        </header>

        {error && (
          <div
            style={{
              background: 'var(--rust-soft)',
              color: 'var(--rust)',
              padding: '0.9rem 1.1rem',
              borderRadius: 'var(--radius)',
              marginBottom: '1.25rem',
              fontSize: '0.9rem',
            }}
          >
            {error} — check that <code>VITE_API_URL</code> points to your running backend.
          </div>
        )}

        <div style={{ marginBottom: '1.5rem' }}>
          <SummaryStrip summary={summary} loading={loading} />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 1fr)',
            gap: '1.5rem',
            marginBottom: '1.5rem',
          }}
        >
          <div>
            <SectionLabel>Add entry</SectionLabel>
            <AddEntryForm onAdd={handleAdd} />
          </div>
          <div>
            <SectionLabel>Spending by category</SectionLabel>
            <div style={{ background: 'var(--paper)', border: '1px solid var(--paper-line)', borderRadius: 'var(--radius)', padding: '1rem' }}>
              <CategoryChart byCategory={summary?.byCategory} />
            </div>
          </div>
        </div>

        <div>
          <SectionLabel>Transactions this month</SectionLabel>
          <TransactionList transactions={transactions} onDelete={handleDelete} />
        </div>

        <style>{`
          @media (max-width: 720px) {
            div[style*="grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr)"] {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.7rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'var(--brass-soft)',
        marginBottom: '0.6rem',
      }}
    >
      {children}
    </div>
  );
}
