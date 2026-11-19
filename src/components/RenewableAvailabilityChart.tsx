import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ENERGY_SOURCE_STYLES } from '../data/sources';
import { formatHour } from '../lib/format';
import type { HourlyRenewableOutput } from '../types/energy';

interface RenewableAvailabilityChartProps {
  readonly series: readonly HourlyRenewableOutput[];
}

const SERIES = [
  { key: 'solar', ...ENERGY_SOURCE_STYLES.solar },
  { key: 'wind', ...ENERGY_SOURCE_STYLES.wind },
] as const;

export function RenewableAvailabilityChart({ series }: RenewableAvailabilityChartProps) {
  return (
    <div
      className="h-72 w-full"
      role="img"
      aria-label="Area chart of solar and wind output across the day"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={[...series]} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <defs>
            {SERIES.map(({ key, color }) => (
              <linearGradient key={key} id={`fill-${key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.35} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis
            dataKey="hour"
            tickFormatter={formatHour}
            interval={5}
            tick={{ fontSize: 12 }}
            stroke="#94a3b8"
          />
          <YAxis unit="%" domain={[0, 100]} tick={{ fontSize: 12 }} stroke="#94a3b8" />
          <Tooltip
            labelFormatter={(hour) => formatHour(Number(hour))}
            formatter={(value) => `${String(value)}%`}
          />
          <Legend iconType="circle" />
          {SERIES.map(({ key, label, color }) => (
            <Area
              key={key}
              type="monotone"
              dataKey={key}
              name={label}
              stroke={color}
              strokeWidth={2}
              fill={`url(#fill-${key})`}
              isAnimationActive={false}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
