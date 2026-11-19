import { BarChart3, Gauge, Leaf, Zap } from 'lucide-react';
import { CarbonFootprint } from '../components/CarbonFootprint';
import { Recommendations } from '../components/Recommendations';
import { SolarCalculator } from '../components/SolarCalculator';
import { WeeklyConsumptionChart } from '../components/WeeklyConsumptionChart';
import { Card } from '../components/ui/Card';
import { StatTile } from '../components/ui/StatTile';
import { RECOMMENDATIONS } from '../data/recommendations';
import { formatNumber } from '../lib/format';
import type { EnergySnapshot } from '../types/energy';

interface PersonalUsageProps {
  readonly snapshot: EnergySnapshot;
}

export default function PersonalUsage({ snapshot }: PersonalUsageProps) {
  const { metrics, weeklyConsumption, emissions } = snapshot;
  const weeklyTotal = weeklyConsumption.reduce((sum, day) => sum + day.consumption, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatTile
          label="Today's usage"
          value={formatNumber(metrics.dailyUsage)}
          unit="kWh"
          icon={Zap}
          tone="blue"
        />
        <StatTile
          label="Carbon offset"
          value={formatNumber(metrics.carbonOffset)}
          unit="kg"
          icon={Leaf}
          tone="green"
        />
        <StatTile
          label="Efficiency score"
          value={String(metrics.efficiencyScore)}
          unit="%"
          icon={Gauge}
          tone="amber"
        />
      </div>

      <Card
        title="Weekly consumption"
        description={`${formatNumber(weeklyTotal)} kWh used this week`}
        icon={BarChart3}
      >
        <WeeklyConsumptionChart days={weeklyConsumption} />
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <CarbonFootprint emissions={emissions} />
        <SolarCalculator />
      </div>

      <section aria-labelledby="recommendations-heading" className="pt-2">
        <h2 id="recommendations-heading" className="mb-4 text-lg font-semibold text-slate-900">
          Recommendations
        </h2>
        <Recommendations items={RECOMMENDATIONS} />
      </section>
    </div>
  );
}
