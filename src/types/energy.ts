/**
 * Domain types for EnergyVision.
 *
 * Units are plain numbers at runtime; the aliases below document intent at
 * every call site so a reader never has to guess whether a value is kWh or kg.
 */

/** Energy in kilowatt-hours. */
export type KilowattHours = number;
/** Mass in kilograms (used for CO₂ emissions). */
export type Kilograms = number;
/** A value in the range 0–100. */
export type Percent = number;
/** Hour of the day, 0–23. */
export type Hour = number;

export const ENERGY_SOURCES = ['coal', 'solar', 'wind', 'hydro', 'nuclear'] as const;
export type EnergySource = (typeof ENERGY_SOURCES)[number];

export const RENEWABLE_SOURCES: ReadonlySet<EnergySource> = new Set<EnergySource>([
  'solar',
  'wind',
  'hydro',
]);

export const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;
export type Weekday = (typeof WEEKDAYS)[number];

export const EMISSION_SOURCES = ['grid', 'naturalGas', 'transport'] as const;
export type EmissionSource = (typeof EMISSION_SOURCES)[number];

export interface EnergyMixSlice {
  readonly source: EnergySource;
  readonly share: Percent;
}

export interface HourlyRenewableOutput {
  readonly hour: Hour;
  /** Solar output as a percentage of installed capacity. */
  readonly solar: Percent;
  /** Wind output as a percentage of installed capacity. */
  readonly wind: Percent;
}

export interface DailyConsumption {
  readonly day: Weekday;
  readonly consumption: KilowattHours;
}

export interface UsageMetrics {
  readonly dailyUsage: KilowattHours;
  readonly carbonOffset: Kilograms;
  readonly efficiencyScore: Percent;
}

export interface EmissionEntry {
  readonly source: EmissionSource;
  readonly amount: Kilograms;
}

/** Everything the UI needs to render, captured at a single point in time. */
export interface EnergySnapshot {
  readonly cityMix: readonly EnergyMixSlice[];
  readonly renewable: readonly HourlyRenewableOutput[];
  readonly weeklyConsumption: readonly DailyConsumption[];
  readonly metrics: UsageMetrics;
  /** Annual household emissions, by source. */
  readonly emissions: readonly EmissionEntry[];
  readonly updatedAt: Date;
}
