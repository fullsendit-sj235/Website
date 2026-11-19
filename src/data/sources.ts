import type { EmissionSource, EnergySource } from '../types/energy';

interface SourceStyle {
  readonly label: string;
  readonly color: string;
}

/** Display metadata for each energy source. `satisfies` keeps it exhaustive. */
export const ENERGY_SOURCE_STYLES = {
  coal: { label: 'Coal', color: '#475569' },
  solar: { label: 'Solar', color: '#F59E0B' },
  wind: { label: 'Wind', color: '#3B82F6' },
  hydro: { label: 'Hydro', color: '#10B981' },
  nuclear: { label: 'Nuclear', color: '#F43F5E' },
} as const satisfies Record<EnergySource, SourceStyle>;

export const EMISSION_SOURCE_STYLES = {
  grid: { label: 'Grid electricity', color: '#475569' },
  naturalGas: { label: 'Natural gas', color: '#F59E0B' },
  transport: { label: 'Transportation', color: '#3B82F6' },
} as const satisfies Record<EmissionSource, SourceStyle>;
