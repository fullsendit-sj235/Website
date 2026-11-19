/** A function returning a pseudo-random float in [0, 1). */
export type RandomSource = () => number;

/**
 * Small, fast seeded PRNG (mulberry32). Seeding makes the simulated data
 * reproducible, which keeps tests deterministic.
 */
export function createRandom(seed: number): RandomSource {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Uniform float in [min, max). */
export function randomBetween(random: RandomSource, min: number, max: number): number {
  return min + random() * (max - min);
}
