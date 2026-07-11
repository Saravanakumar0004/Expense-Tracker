import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';

function formatMonthLabel(monthStr) {
  const [year, mon] = monthStr.split('-').map(Number);
  return new Date(year, mon - 1, 1).toLocaleDateString('en-IN', {
    month: 'short',
    year: '2-digit',
  });
}

export default function MonthComparisonChart({ monthly }) {
  if (!monthly || monthly.length === 0) {
    return (
      <div className="p-8 text-center text-sm text-textMuted">
        No data yet — add entries across a couple of months to compare them here.
      </div>
    );
  }

  const data = monthly.map((m) => ({
    ...m,
    label: formatMonthLabel(m.month),
  }));

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 4 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#ddd4bd" vertical={false} />
        <XAxis
          dataKey="label"
          tick={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: 12, fill: '#241f16' }}
          axisLine={{ stroke: '#ddd4bd' }}
          tickLine={false}
        />
        <YAxis
          tick={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 11, fill: '#6b6555' }}
          axisLine={false}
          tickLine={false}
          width={56}
        />
        <Tooltip
          formatter={(value, name) => [`₹${value.toLocaleString('en-IN')}`, name]}
          contentStyle={{
            background: '#f6f1e4',
            border: '1px solid #ddd4bd',
            borderRadius: 3,
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: 12,
          }}
        />
        <Legend wrapperStyle={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: 12 }} />
        <Bar dataKey="income" name="Income" fill="#a9821f" radius={[3, 3, 0, 0]} />
        <Bar dataKey="expense" name="Expenses" fill="#a2503f" radius={[3, 3, 0, 0]} />
        <Bar dataKey="savings" name="Saved" fill="#5c7a6b" radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
