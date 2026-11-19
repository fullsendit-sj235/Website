import { createRandom, randomBetween, type RandomSource } from '../lib/random';
import {
  WEEKDAYS,
  type EnergySnapshot,
  type HourlyRenewableOutput,
  type Percent,
} from '../types/energy';

/**
 * Where the dashboard gets its data. The app only depends on this interface,
 * so the simulated source below can be swapped for a real API client without
 * touching any component.
 */
export interface EnergyDataSource {
  /** Initial data to render. */
  initial(): EnergySnapshot;
  /** Produces the next snapshot from the previous one. */
  next(previous: EnergySnapshot): EnergySnapshot;
}

const round1 = (value: number): number => Math.round(value * 10) / 10;

/** Solar output follows the sun: zero at night, peaking at noon. */
export function solarOutputAt(hour: number): Percent {
  if (hour < 6 || hour > 18) return 0;
  return round1(Math.max(0, Math.sin(((hour - 6) * Math.PI) / 12) * 100));
}

function simulateRenewable(random: RandomSource): HourlyRenewableOutput[] {
  return Array.from({ length: 24 }, (_, hour) => ({
    hour,
    solar: solarOutputAt(hour),
    wind: round1(randomBetween(random, 40, 70)),
  }));
}

/** Simulated data with realistic shapes. Pass a seed for reproducible output. */
export function createSimulatedEnergySource(seed = 2024): EnergyDataSource {
  const random = createRandom(seed);

  return {
    initial: () => ({
      cityMix: [
        { source: 'coal', share: 30 },
        { source: 'solar', share: 25 },
        { source: 'wind', share: 20 },
        { source: 'hydro', share: 15 },
        { source: 'nuclear', share: 10 },
      ],
      renewable: simulateRenewable(random),
      weeklyConsumption: WEEKDAYS.map((day) => ({
        day,
        consumption: round1(randomBetween(random, 15, 35)),
      })),
      metrics: { dailyUsage: 17.8, carbonOffset: 12.5, efficiencyScore: 85 },
      emissions: [
        { source: 'grid', amount: 4000 },
        { source: 'naturalGas', amount: 1500 },
        { source: 'transport', amount: 700 },
      ],
      updatedAt: new Date(),
    }),

    next: (previous) => ({
      ...previous,
      renewable: simulateRenewable(random),
      metrics: { ...previous.metrics, dailyUsage: round1(randomBetween(random, 15, 20)) },
      updatedAt: new Date(),
    }),
  };
}
