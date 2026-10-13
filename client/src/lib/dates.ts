const MONTHS = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık',
];

/** Uygulamanın "bugün"ü. Sahte veri bu tarihe göre üretildi. */
export const TODAY = '2026-10-13';

/** "2026-10" biçiminde ay anahtarı */
export type MonthKey = string;

export function monthKey(date: string): MonthKey {
  return date.slice(0, 7);
}

export function monthLabel(key: MonthKey): string {
  const [y, m] = key.split('-').map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

export function monthShort(key: MonthKey): string {
  const m = Number(key.split('-')[1]);
  return MONTHS[m - 1].slice(0, 3);
}

export function shiftMonth(key: MonthKey, delta: number): MonthKey {
  const [y, m] = key.split('-').map(Number);
  const d = new Date(Date.UTC(y, m - 1 + delta, 1));
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
}

/** Son n ayı eskiden yeniye döndürür. */
export function lastMonths(end: MonthKey, n: number): MonthKey[] {
  return Array.from({ length: n }, (_, i) => shiftMonth(end, i - (n - 1)));
}

/** "2026-10-05" → "05.10.2026" (FOG-15) */
export function formatDate(date: string): string {
  const [y, m, d] = date.split('-');
  return `${d}.${m}.${y}`;
}

/** "2026-10-05" → "5 Eki" */
export function formatDayMonth(date: string): string {
  const [, m, d] = date.split('-').map(Number);
  return `${d} ${MONTHS[m - 1].slice(0, 3)}`;
}

export function monthsBetween(from: string, to: string): number {
  const [fy, fm] = from.split('-').map(Number);
  const [ty, tm] = to.split('-').map(Number);
  return (ty - fy) * 12 + (tm - fm);
}
