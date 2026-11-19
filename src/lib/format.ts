const numberFormat = new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 });
const integerFormat = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
const currencyFormat = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});
const timeFormat = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: '2-digit',
  second: '2-digit',
});

export const formatNumber = (value: number): string => numberFormat.format(value);
export const formatInteger = (value: number): string => integerFormat.format(value);
export const formatCurrency = (value: number): string => currencyFormat.format(value);
export const formatTime = (date: Date): string => timeFormat.format(date);

export function formatYears(value: number): string {
  return Number.isFinite(value) ? `${formatNumber(value)} years` : 'Never';
}

/** Formats an hour of the day (0–23) as e.g. "12 PM". */
export function formatHour(hour: number): string {
  const suffix = hour < 12 ? 'AM' : 'PM';
  const display = hour % 12 === 0 ? 12 : hour % 12;
  return `${String(display)} ${suffix}`;
}
