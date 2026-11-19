import { describe, expect, it } from 'vitest';
import {
  GRID_EMISSION_FACTOR,
  batteryShortfall,
  carbonFootprint,
  paybackYears,
  peakHour,
  renewablePotential,
  renewableShare,
  sizeSolarSystem,
  toPercentages,
  totalEmissions,
} from './energy';

describe('carbonFootprint', () => {
  it('uses the grid emission factor by default', () => {
    expect(carbonFootprint(100)).toBeCloseTo(100 * GRID_EMISSION_FACTOR);
  });

  it('accepts a custom emission factor', () => {
    expect(carbonFootprint(100, 0.5)).toBe(50);
  });

  it('rejects negative consumption', () => {
    expect(() => carbonFootprint(-1)).toThrow(RangeError);
  });
});

describe('toPercentages', () => {
  it('converts amounts into shares that sum to 100', () => {
    const shares = toPercentages({ solar: 30, wind: 10 });
    expect(shares).toEqual({ solar: 75, wind: 25 });
  });

  it('returns zeros instead of dividing by zero', () => {
    expect(toPercentages({ solar: 0, wind: 0 })).toEqual({ solar: 0, wind: 0 });
  });
});

describe('renewableShare', () => {
  it('counts solar, wind and hydro as renewable', () => {
    expect(
      renewableShare([
        { source: 'coal', share: 30 },
        { source: 'solar', share: 25 },
        { source: 'wind', share: 20 },
        { source: 'hydro', share: 15 },
        { source: 'nuclear', share: 10 },
      ]),
    ).toBe(60);
  });

  it('is zero for an empty mix', () => {
    expect(renewableShare([])).toBe(0);
  });
});

describe('totalEmissions', () => {
  it('sums every entry', () => {
    expect(
      totalEmissions([
        { source: 'grid', amount: 4000 },
        { source: 'transport', amount: 700 },
      ]),
    ).toBe(4700);
  });
});

describe('peakHour', () => {
  const series = [
    { hour: 9, solar: 70, wind: 40 },
    { hour: 12, solar: 100, wind: 30 },
    { hour: 21, solar: 0, wind: 65 },
  ];

  it('finds the hour with the highest value for the chosen key', () => {
    expect(peakHour(series, 'solar')).toBe(12);
    expect(peakHour(series, 'wind')).toBe(21);
  });

  it('returns undefined for an empty series', () => {
    expect(peakHour<{ hour: number; solar: number }>([], 'solar')).toBeUndefined();
  });
});

describe('sizeSolarSystem', () => {
  it('sizes panels and battery with the default assumptions', () => {
    expect(sizeSolarSystem({ dailyConsumption: 30, sunHours: 5 })).toEqual({
      panelArea: 40,
      batteryCapacity: 57,
    });
  });

  it('needs less panel area with more sun', () => {
    const cloudy = sizeSolarSystem({ dailyConsumption: 30, sunHours: 3 });
    const sunny = sizeSolarSystem({ dailyConsumption: 30, sunHours: 8 });
    expect(sunny.panelArea).toBeLessThan(cloudy.panelArea);
  });

  it('rejects zero sun hours and invalid depth of discharge', () => {
    expect(() => sizeSolarSystem({ dailyConsumption: 30, sunHours: 0 })).toThrow(RangeError);
    expect(() =>
      sizeSolarSystem({ dailyConsumption: 30, sunHours: 5, depthOfDischarge: 1.5 }),
    ).toThrow(RangeError);
  });
});

describe('batteryShortfall', () => {
  it('covers the gap between consumption and solar', () => {
    expect(batteryShortfall(10, 25, 2)).toBe(30);
  });

  it('is never negative when solar exceeds consumption', () => {
    expect(batteryShortfall(40, 25, 2)).toBe(0);
  });
});

describe('renewablePotential', () => {
  it('scales conditions by their daily availability', () => {
    expect(
      renewablePotential(
        { solarRadiation: 240, windSpeed: 12 },
        { daylightHours: 12, windHours: 6 },
      ),
    ).toEqual({ solar: 120, wind: 3 });
  });

  it('rejects windows outside a day', () => {
    expect(() =>
      renewablePotential({ solarRadiation: 1, windSpeed: 1 }, { daylightHours: 25, windHours: 1 }),
    ).toThrow(RangeError);
  });
});

describe('paybackYears', () => {
  it('divides cost by annual savings', () => {
    expect(paybackYears(12_000, 1_800)).toBeCloseTo(6.67, 2);
  });

  it('never pays back without savings', () => {
    expect(paybackYears(8_000, 0)).toBe(Number.POSITIVE_INFINITY);
  });
});
