import { useEffect, useState } from 'react';
import { createSimulatedEnergySource, type EnergyDataSource } from '../data/energySource';
import type { EnergySnapshot } from '../types/energy';

const defaultSource = createSimulatedEnergySource();

export interface UseEnergyDataOptions {
  /** Defaults to the simulated source. Must be stable across renders. */
  readonly source?: EnergyDataSource;
  /** How often to pull a new snapshot, in milliseconds. 0 disables refreshing. */
  readonly refreshMs?: number;
}

/** Subscribes to an energy data source and returns the latest snapshot. */
export function useEnergyData({
  source = defaultSource,
  refreshMs = 5000,
}: UseEnergyDataOptions = {}): EnergySnapshot {
  const [snapshot, setSnapshot] = useState<EnergySnapshot>(() => source.initial());

  useEffect(() => {
    if (refreshMs <= 0) return;
    const id = window.setInterval(() => {
      setSnapshot((previous) => source.next(previous));
    }, refreshMs);
    return () => {
      window.clearInterval(id);
    };
  }, [source, refreshMs]);

  return snapshot;
}
