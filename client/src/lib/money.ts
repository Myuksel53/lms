import type { Kurus } from '../data/types';

const tryFormatter = new Intl.NumberFormat('tr-TR', {
  style: 'currency',
  currency: 'TRY',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const compactFormatter = new Intl.NumberFormat('tr-TR', {
  maximumFractionDigits: 0,
});

/** 123456 → "₺1.234,56" */
export function formatTRY(kurus: Kurus): string {
  return tryFormatter.format(kurus / 100);
}

/** 123456 → "1.235 ₺" (grafik etiketleri için yuvarlanmış) */
export function formatTRYShort(kurus: Kurus): string {
  return `${compactFormatter.format(Math.round(kurus / 100))} ₺`;
}

/** İşaretli gösterim: gelir "+₺…", gider "−₺…" */
export function formatSigned(kurus: Kurus, kind: 'gelir' | 'gider'): string {
  return `${kind === 'gelir' ? '+' : '−'}${formatTRY(Math.abs(kurus))}`;
}

export type ParseResult = { ok: true; value: Kurus } | { ok: false; error: string };

/**
 * Kullanıcı girdisini kuruşa çevirir. "1.234,56", "1234,5" ve "1234.56" kabul edilir.
 * Tutar sıfırdan büyük olmalı ve en fazla 2 ondalık basamak içermeli (FOG-13).
 */
export function parseTRY(input: string): ParseResult {
  const raw = input.trim().replace(/\s|₺/g, '');
  if (raw === '') return { ok: false, error: 'Tutar girin.' };

  let normalized: string;
  if (raw.includes(',')) {
    // Türkçe biçim: nokta binlik ayırıcı, virgül ondalık
    normalized = raw.replace(/\./g, '').replace(',', '.');
  } else {
    // Tek nokta ve ardından 1–2 basamak varsa ondalık; aksi halde binlik ayırıcı
    normalized = /^\d+\.\d{1,2}$/.test(raw) ? raw : raw.replace(/\./g, '');
  }

  if (!/^\d+(\.\d+)?$/.test(normalized)) {
    return { ok: false, error: 'Tutar yalnızca rakam ve virgül içermeli.' };
  }
  const [whole, fraction = ''] = normalized.split('.');
  if (fraction.length > 2) {
    return { ok: false, error: 'En fazla 2 ondalık basamak girebilirsiniz.' };
  }
  const value = Number(whole) * 100 + Number(fraction.padEnd(2, '0'));
  if (value <= 0) return { ok: false, error: 'Tutar sıfırdan büyük olmalı.' };
  return { ok: true, value };
}

/** Kuruşu form alanında gösterilecek metne çevirir: 123456 → "1234,56" */
export function toInputValue(kurus: Kurus): string {
  return (kurus / 100).toFixed(2).replace('.', ',');
}

export function percent(part: number, whole: number): number {
  if (whole <= 0) return 0;
  return Math.round((part / whole) * 100);
}
