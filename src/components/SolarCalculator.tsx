import { Battery, Calculator, Sun } from 'lucide-react';
import { useId, useState } from 'react';
import { sizeSolarSystem } from '../lib/energy';
import { Card } from './ui/Card';

interface RangeFieldProps {
  readonly label: string;
  readonly value: number;
  readonly min: number;
  readonly max: number;
  readonly unit: string;
  readonly onChange: (value: number) => void;
}

function RangeField({ label, value, min, max, unit, onChange }: RangeFieldProps) {
  const id = useId();
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <label htmlFor={id} className="text-sm font-medium text-slate-700">
          {label}
        </label>
        <output htmlFor={id} className="text-sm font-semibold tabular-nums text-slate-900">
          {value} {unit}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => {
          onChange(Number(event.target.value));
        }}
        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-blue-600"
      />
    </div>
  );
}

export function SolarCalculator() {
  const [dailyConsumption, setDailyConsumption] = useState(30);
  const [sunHours, setSunHours] = useState(5);
  const { panelArea, batteryCapacity } = sizeSolarSystem({ dailyConsumption, sunHours });

  return (
    <Card
      title="Solar sizing calculator"
      description="Estimate the system you'd need to go solar"
      icon={Calculator}
      tone="amber"
    >
      <div className="space-y-6">
        <RangeField
          label="Daily energy use"
          value={dailyConsumption}
          min={10}
          max={100}
          unit="kWh"
          onChange={setDailyConsumption}
        />
        <RangeField
          label="Average sunlight"
          value={sunHours}
          min={3}
          max={8}
          unit="hours"
          onChange={setSunHours}
        />

        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2" aria-live="polite">
          <div className="rounded-xl bg-amber-50 p-4">
            <dt className="mb-1 flex items-center gap-2 text-sm font-medium text-amber-900">
              <Sun aria-hidden className="h-4 w-4 text-amber-600" />
              Panel area
            </dt>
            <dd className="text-2xl font-bold tabular-nums text-amber-600">{panelArea} m²</dd>
          </div>
          <div className="rounded-xl bg-blue-50 p-4">
            <dt className="mb-1 flex items-center gap-2 text-sm font-medium text-blue-900">
              <Battery aria-hidden className="h-4 w-4 text-blue-600" />
              Battery capacity
            </dt>
            <dd className="text-2xl font-bold tabular-nums text-blue-600">{batteryCapacity} kWh</dd>
          </div>
        </dl>
        <p className="text-xs text-slate-400">
          Assumes 150 W/m² effective panel output, 1.5 days of battery backup and 80% usable battery
          capacity.
        </p>
      </div>
    </Card>
  );
}
