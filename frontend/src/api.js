// Set VITE_API_URL in your frontend Vercel project env vars once the backend is deployed,
// e.g. https://your-backend.vercel.app
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}/api${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const message = body.details
      ? `${body.error || 'Request failed'}: ${body.details}`
      : body.error || `Request failed: ${res.status}`;
    throw new Error(message);
  }
  return res.json();
}

export const api = {
  getTransactions: (month) => request(`/transactions${month ? `?month=${month}` : ''}`),
  getSummary: (month) => request(`/transactions/summary?month=${month}`),
  getMonthlySummary: () => request('/transactions/monthly-summary'),
  addTransaction: (data) =>
    request('/transactions', { method: 'POST', body: JSON.stringify(data) }),
  updateTransaction: (id, data) =>
    request(`/transactions/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteTransaction: (id) => request(`/transactions/${id}`, { method: 'DELETE' }),
};