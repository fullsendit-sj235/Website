import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { formatNumber } from '../lib/format';
import type { DailyConsumption } from '../types/energy';

interface WeeklyConsumptionChartProps {
  readonly days: readonly DailyConsumption[];
}

export function WeeklyConsumptionChart({ days }: WeeklyConsumptionChartProps) {
  return (
    <div
      className="h-72 w-full"
      role="img"
      aria-label="Bar chart of energy used each day this week"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={[...days]} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="#94a3b8" />
          <YAxis unit=" kWh" width={72} tick={{ fontSize: 12 }} stroke="#94a3b8" />
          <Tooltip
            cursor={{ fill: '#f1f5f9' }}
            formatter={(value) => [`${formatNumber(Number(value))} kWh`, 'Usage']}
          />
          <Bar dataKey="consumption" fill="#3B82F6" radius={[6, 6, 0, 0]} maxBarSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
