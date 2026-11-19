import {
  RENEWABLE_SOURCES,
  type EmissionEntry,
  type EnergyMixSlice,
  type Hour,
  type Kilograms,
  type KilowattHours,
  type Percent,
} from '../types/energy';

/** Average CO₂ intensity of non-renewable grid electricity, in kg per kWh. */
export const GRID_EMISSION_FACTOR = 0.92;

/** Annual household emissions above this are flagged as above average (kg CO₂). */
export const AVERAGE_HOUSEHOLD_EMISSIONS: Kilograms = 5000;

/** Keys of `T` whose values are numbers. */
export type NumericKeys<T> = {
  [K in keyof T]-?: T[K] extends number ? K : never;
}[keyof T];

function assertNonNegative(name: string, value: number): void {
  if (!Number.isFinite(value) || value < 0) {
    throw new RangeError(`${name} must be a non-negative finite number, got ${String(value)}`);
  }
}

function assertPositive(name: string, value: number): void {
  if (!Number.isFinite(value) || value <= 0) {
    throw new RangeError(`${name} must be a positive finite number, got ${String(value)}`);
  }
}

/** Estimated CO₂ emitted by consuming `consumption` kWh of grid electricity. */
export function carbonFootprint(
  consumption: KilowattHours,
  emissionFactor: number = GRID_EMISSION_FACTOR,
): Kilograms {
  assertNonNegative('consumption', consumption);
  assertNonNegative('emissionFactor', emissionFactor);
  return consumption * emissionFactor;
}

/**
 * Converts absolute amounts into percentage shares of the total.
 * Returns all zeros when the total is zero rather than dividing by zero.
 */
export function toPercentages<K extends string>(
  amounts: Readonly<Record<K, number>>,
): Record<K, Percent> {
  const entries = Object.entries(amounts) as [K, number][];
  entries.forEach(([key, value]) => {
    assertNonNegative(key, value);
  });
  const total = entries.reduce((sum, [, value]) => sum + value, 0);
  return Object.fromEntries(
    entries.map(([key, value]) => [key, total === 0 ? 0 : (value / total) * 100]),
  ) as Record<K, Percent>;
}

/** Share of the energy mix that comes from renewable sources. */
export function renewableShare(mix: readonly EnergyMixSlice[]): Percent {
  const total = mix.reduce((sum, slice) => sum + slice.share, 0);
  if (total === 0) return 0;
  const renewable = mix
    .filter((slice) => RENEWABLE_SOURCES.has(slice.source))
    .reduce((sum, slice) => sum + slice.share, 0);
  return (renewable / total) * 100;
}

/** Sum of all emission entries. */
export function totalEmissions(entries: readonly EmissionEntry[]): Kilograms {
  return entries.reduce((sum, entry) => sum + entry.amount, 0);
}

/** Returns the hour at which `key` peaks, or `undefined` for an empty series. */
export function peakHour<T extends { readonly hour: Hour }>(
  series: readonly T[],
  key: NumericKeys<T>,
): Hour | undefined {
  let best: T | undefined;
  for (const point of series) {
    if (best === undefined || (point[key] as number) > (best[key] as number)) {
      best = point;
    }
  }
  return best?.hour;
}

export interface SolarSizingInput {
  readonly dailyConsumption: KilowattHours;
  readonly sunHours: number;
  /** Effective panel output per square metre, in watts. */
  readonly panelOutputWattsPerM2?: number;
  /** Days the battery should cover without sun. */
  readonly autonomyDays?: number;
  /** Fraction of battery capacity that can safely be used (0–1]. */
  readonly depthOfDischarge?: number;
}

export interface SolarSizing {
  /** Square metres of panel needed. */
  readonly panelArea: number;
  readonly batteryCapacity: KilowattHours;
}

/** Sizes a solar + battery system that covers a household's daily consumption. */
export function sizeSolarSystem({
  dailyConsumption,
  sunHours,
  panelOutputWattsPerM2 = 150,
  autonomyDays = 1.5,
  depthOfDischarge = 0.8,
}: SolarSizingInput): SolarSizing {
  assertNonNegative('dailyConsumption', dailyConsumption);
  assertPositive('sunHours', sunHours);
  assertPositive('panelOutputWattsPerM2', panelOutputWattsPerM2);
  assertNonNegative('autonomyDays', autonomyDays);
  if (!(depthOfDischarge > 0 && depthOfDischarge <= 1)) {
    throw new RangeError(`depthOfDischarge must be in (0, 1], got ${String(depthOfDischarge)}`);
  }

  const wattHoursPerDay = dailyConsumption * 1000;
  return {
    panelArea: Math.ceil(wattHoursPerDay / (sunHours * panelOutputWattsPerM2)),
    batteryCapacity: Math.ceil((dailyConsumption * autonomyDays) / depthOfDischarge),
  };
}

/**
 * Battery capacity needed to cover the gap between consumption and solar
 * output over `autonomyDays`. Never negative: surplus solar needs no battery.
 */
export function batteryShortfall(
  dailySolarOutput: KilowattHours,
  dailyConsumption: KilowattHours,
  autonomyDays: number,
): KilowattHours {
  assertNonNegative('dailySolarOutput', dailySolarOutput);
  assertNonNegative('dailyConsumption', dailyConsumption);
  assertNonNegative('autonomyDays', autonomyDays);
  return Math.max(0, (dailyConsumption - dailySolarOutput) * autonomyDays);
}

export interface WeatherConditions {
  /** Average solar radiation over the day. */
  readonly solarRadiation: number;
  readonly windSpeed: number;
}

export interface DailyWindows {
  readonly daylightHours: number;
  readonly windHours: number;
}

/** Scales raw solar and wind conditions by how much of the day they are available. */
export function renewablePotential(
  weather: WeatherConditions,
  windows: DailyWindows,
): { readonly solar: number; readonly wind: number } {
  for (const [name, hours] of Object.entries(windows)) {
    if (hours < 0 || hours > 24) throw new RangeError(`${name} must be between 0 and 24`);
  }
  return {
    solar: (weather.solarRadiation * windows.daylightHours) / 24,
    wind: (weather.windSpeed * windows.windHours) / 24,
  };
}

/** Years until an upfront cost is repaid by annual savings. `Infinity` if it never is. */
export function paybackYears(upfrontCost: number, annualSavings: number): number {
  assertNonNegative('upfrontCost', upfrontCost);
  if (annualSavings <= 0) return Number.POSITIVE_INFINITY;
  return upfrontCost / annualSavings;
}
