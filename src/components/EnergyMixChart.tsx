import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { ENERGY_SOURCE_STYLES } from '../data/sources';
import type { EnergyMixSlice } from '../types/energy';

interface EnergyMixChartProps {
  readonly mix: readonly EnergyMixSlice[];
}

export function EnergyMixChart({ mix }: EnergyMixChartProps) {
  const data = mix.map((slice) => ({
    name: ENERGY_SOURCE_STYLES[slice.source].label,
    value: slice.share,
    color: ENERGY_SOURCE_STYLES[slice.source].color,
  }));

  return (
    <div className="h-72 w-full" role="img" aria-label="Donut chart of the city's energy mix">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius="58%"
            outerRadius="80%"
            paddingAngle={3}
            stroke="none"
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${String(value)}%`} />
          <Legend iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
