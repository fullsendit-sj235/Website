import type { LucideIcon } from 'lucide-react';
import { TONES, type Tone } from './tones';

interface StatTileProps {
  readonly label: string;
  readonly value: string;
  readonly unit?: string;
  readonly hint?: string;
  readonly icon: LucideIcon;
  readonly tone: Tone;
}

export function StatTile({ label, value, unit, hint, icon: Icon, tone }: StatTileProps) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
      <span className={`rounded-xl p-3 ${TONES[tone].badge}`}>
        <Icon aria-hidden className={`h-6 w-6 ${TONES[tone].text}`} />
      </span>
      <dl>
        <dt className="text-sm text-slate-500">{label}</dt>
        <dd className="text-2xl font-semibold tabular-nums text-slate-900">
          {value}
          {unit && <span className="ml-1 text-base font-medium text-slate-500">{unit}</span>}
        </dd>
        {hint && <dd className="text-xs text-slate-400">{hint}</dd>}
      </dl>
    </div>
  );
}
