import { Check } from 'lucide-react';
import type { Recommendation } from '../data/recommendations';
import { assertNever } from '../lib/assertNever';
import { paybackYears } from '../lib/energy';
import { formatCurrency, formatYears } from '../lib/format';
import { TONES } from './ui/tones';

function RecommendationDetails({ recommendation }: { readonly recommendation: Recommendation }) {
  switch (recommendation.kind) {
    case 'investment': {
      const { upfrontCost, annualSavings } = recommendation;
      const rows = [
        ['Upfront cost', formatCurrency(upfrontCost)],
        ['Annual savings', formatCurrency(annualSavings)],
        ['Payback', formatYears(paybackYears(upfrontCost, annualSavings))],
      ] as const;
      return (
        <dl className="space-y-2 text-sm">
          {rows.map(([label, value]) => (
            <div key={label} className="flex justify-between">
              <dt className="text-slate-500">{label}</dt>
              <dd className="font-semibold tabular-nums text-slate-900">{value}</dd>
            </div>
          ))}
        </dl>
      );
    }
    case 'tips':
      return (
        <ul className="space-y-2 text-sm text-slate-600">
          {recommendation.tips.map((tip) => (
            <li key={tip} className="flex gap-2">
              <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
              {tip}
            </li>
          ))}
        </ul>
      );
    default:
      return assertNever(recommendation);
  }
}

interface RecommendationsProps {
  readonly items: readonly Recommendation[];
}

export function Recommendations({ items }: RecommendationsProps) {
  return (
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <li
            key={item.id}
            className="flex flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm"
          >
            <span className={`w-fit rounded-xl p-3 ${TONES[item.tone].badge}`}>
              <Icon aria-hidden className={`h-6 w-6 ${TONES[item.tone].text}`} />
            </span>
            <h3 className="mb-1 mt-4 text-base font-semibold text-slate-900">{item.title}</h3>
            <p className="mb-5 text-sm text-slate-500">{item.summary}</p>
            <div className="mt-auto border-t border-slate-100 pt-4">
              <RecommendationDetails recommendation={item} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
