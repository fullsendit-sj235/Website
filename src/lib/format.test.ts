import { describe, expect, it } from 'vitest';
import { formatCurrency, formatHour, formatYears } from './format';

describe('formatters', () => {
  it('formats hours on a 12-hour clock', () => {
    expect(formatHour(0)).toBe('12 AM');
    expect(formatHour(12)).toBe('12 PM');
    expect(formatHour(15)).toBe('3 PM');
  });

  it('formats currency without cents', () => {
    expect(formatCurrency(12_000)).toBe('$12,000');
  });

  it('describes a payback that never happens', () => {
    expect(formatYears(Number.POSITIVE_INFINITY)).toBe('Never');
    expect(formatYears(6.6667)).toBe('6.7 years');
  });
});
