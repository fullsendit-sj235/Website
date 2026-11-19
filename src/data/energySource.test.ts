import { describe, expect, it } from 'vitest';
import { createSimulatedEnergySource, solarOutputAt } from './energySource';

describe('solarOutputAt', () => {
  it('is zero at night and peaks at noon', () => {
    expect(solarOutputAt(2)).toBe(0);
    expect(solarOutputAt(22)).toBe(0);
    expect(solarOutputAt(12)).toBe(100);
  });
});

describe('createSimulatedEnergySource', () => {
  it('produces a full day of renewable data and a full week of usage', () => {
    const snapshot = createSimulatedEnergySource(1).initial();
    expect(snapshot.renewable).toHaveLength(24);
    expect(snapshot.weeklyConsumption.map((d) => d.day)).toEqual([
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat',
      'Sun',
    ]);
  });

  it('has a city mix that sums to 100%', () => {
    const { cityMix } = createSimulatedEnergySource(1).initial();
    expect(cityMix.reduce((sum, slice) => sum + slice.share, 0)).toBe(100);
  });

  it('is reproducible for the same seed', () => {
    const a = createSimulatedEnergySource(42).initial();
    const b = createSimulatedEnergySource(42).initial();
    expect(a.weeklyConsumption).toEqual(b.weeklyConsumption);
    expect(a.renewable).toEqual(b.renewable);
  });

  it('refreshes live values but keeps static ones', () => {
    const source = createSimulatedEnergySource(3);
    const first = source.initial();
    const second = source.next(first);
    expect(second.cityMix).toBe(first.cityMix);
    expect(second.weeklyConsumption).toBe(first.weeklyConsumption);
    expect(second.metrics.dailyUsage).toBeGreaterThanOrEqual(15);
    expect(second.metrics.dailyUsage).toBeLessThanOrEqual(20);
  });
});
