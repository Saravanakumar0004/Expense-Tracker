import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const COLORS = ['#a9821f', '#a2503f', '#5c7a6b', '#7a5c8a', '#4a6b8a', '#8a6b4a'];

export default function CategoryChart({ byCategory }) {
  const data = Object.entries(byCategory || {})
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);

  if (data.length === 0) {
    return (
      <div className="p-8 text-center text-sm text-textMuted">
        No expenses logged for this month yet.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={Math.max(180, data.length * 44)}>
      <BarChart data={data} layout="vertical" margin={{ top: 4, right: 24, left: 8, bottom: 4 }}>
        <XAxis type="number" hide />
        <YAxis
          type="category"
          dataKey="category"
          width={90}
          tick={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: 12, fill: '#241f16' }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Spent']}
          contentStyle={{
            background: '#f6f1e4',
            border: '1px solid #ddd4bd',
            borderRadius: 3,
            fontFamily: '"IBM Plex Mono", "Courier New", monospace',
            fontSize: 12,
          }}
        />
        <Bar dataKey="amount" radius={[0, 3, 3, 0]} barSize={18}>
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
