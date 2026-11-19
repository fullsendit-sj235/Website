import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle2, Leaf } from 'lucide-react';
import { EMISSION_SOURCE_STYLES } from '../data/sources';
import { AVERAGE_HOUSEHOLD_EMISSIONS, totalEmissions } from '../lib/energy';
import { formatInteger } from '../lib/format';
import type { EmissionEntry } from '../types/energy';
import { Card } from './ui/Card';

interface CarbonFootprintProps {
  readonly emissions: readonly EmissionEntry[];
}

export function CarbonFootprint({ emissions }: CarbonFootprintProps) {
  const total = totalEmissions(emissions);
  const aboveAverage = total > AVERAGE_HOUSEHOLD_EMISSIONS;

  return (
    <Card
      title="Carbon footprint"
      description="Annual household emissions"
      icon={Leaf}
      tone="green"
    >
      <div className="mb-6 flex items-end justify-between gap-4">
        <p>
          <span className="text-4xl font-bold tabular-nums text-slate-900">
            {formatInteger(total)}
          </span>
          <span className="ml-2 text-sm text-slate-500">kg CO₂ / year</span>
        </p>
        {aboveAverage ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700">
            <AlertTriangle aria-hidden className="h-4 w-4" />
            Above average
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
            <CheckCircle2 aria-hidden className="h-4 w-4" />
            At or below average
          </span>
        )}
      </div>

      <ul className="space-y-4">
        {emissions.map((entry, index) => {
          const style = EMISSION_SOURCE_STYLES[entry.source];
          const share = total === 0 ? 0 : (entry.amount / total) * 100;
          return (
            <li key={entry.source} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">{style.label}</span>
                <span className="font-medium tabular-nums text-slate-900">
                  {formatInteger(entry.amount)} kg
                </span>
              </div>
              <div
                className="h-2 overflow-hidden rounded-full bg-slate-100"
                role="progressbar"
                aria-label={`${style.label} share of emissions`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(share)}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${String(share)}%` }}
                  transition={{ duration: 0.8, delay: index * 0.15, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: style.color }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
