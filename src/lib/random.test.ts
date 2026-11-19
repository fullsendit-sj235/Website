import { describe, expect, it } from 'vitest';
import { createRandom, randomBetween } from './random';

describe('createRandom', () => {
  it('is deterministic for a given seed', () => {
    const a = createRandom(7);
    const b = createRandom(7);
    expect([a(), a(), a()]).toEqual([b(), b(), b()]);
  });

  it('stays within [0, 1)', () => {
    const random = createRandom(1);
    for (let i = 0; i < 1000; i++) {
      const value = random();
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    }
  });
});

describe('randomBetween', () => {
  it('maps into the requested range', () => {
    const random = createRandom(5);
    for (let i = 0; i < 100; i++) {
      const value = randomBetween(random, 15, 35);
      expect(value).toBeGreaterThanOrEqual(15);
      expect(value).toBeLessThan(35);
    }
  });
});
