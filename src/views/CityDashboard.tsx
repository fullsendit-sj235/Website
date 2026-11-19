import { Leaf, Sun, Wind, Zap } from 'lucide-react';
import { EnergyMixChart } from '../components/EnergyMixChart';
import { RenewableAvailabilityChart } from '../components/RenewableAvailabilityChart';
import { Card } from '../components/ui/Card';
import { StatTile } from '../components/ui/StatTile';
import { peakHour, renewableShare } from '../lib/energy';
import { formatHour, formatNumber } from '../lib/format';
import type { EnergySnapshot } from '../types/energy';

interface CityDashboardProps {
  readonly snapshot: EnergySnapshot;
}

export default function CityDashboard({ snapshot }: CityDashboardProps) {
  const { cityMix, renewable } = snapshot;
  const solarPeak = peakHour(renewable, 'solar');
  const averageWind =
    renewable.reduce((sum, point) => sum + point.wind, 0) / Math.max(renewable.length, 1);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatTile
          label="Renewable share"
          value={formatNumber(renewableShare(cityMix))}
          unit="%"
          hint="Solar, wind and hydro"
          icon={Leaf}
          tone="green"
        />
        <StatTile
          label="Peak solar"
          value={solarPeak === undefined ? '—' : formatHour(solarPeak)}
          hint="Highest output today"
          icon={Sun}
          tone="amber"
        />
        <StatTile
          label="Average wind output"
          value={formatNumber(averageWind)}
          unit="%"
          hint="Of installed capacity"
          icon={Wind}
          tone="blue"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card title="Energy mix" description="Where the city's power comes from" icon={Zap}>
          <EnergyMixChart mix={cityMix} />
        </Card>
        <Card
          title="Renewable availability"
          description="Output across the day, % of capacity"
          icon={Sun}
          tone="amber"
        >
          <RenewableAvailabilityChart series={renewable} />
        </Card>
      </div>
    </div>
  );
}
