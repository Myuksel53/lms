import type { Account, Category, Transaction } from '../data/types';
import { formatDate } from './dates';

function cell(value: string): string {
  return /[";\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}

/**
 * İşlemleri CSV olarak indirir (FG-44). Excel'in Türkçe yerel ayarı için
 * ayırıcı noktalı virgül, ondalık ayırıcı virgüldür; BOM ile UTF-8 açılır.
 */
export function downloadTransactionsCsv(
  txs: Transaction[],
  categories: Category[],
  accounts: Account[],
  fileName: string,
): void {
  const header = ['Tarih', 'Tür', 'Kategori', 'Hesap', 'Açıklama', 'Tutar (TL)'];
  const rows = [...txs]
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((t) => [
      formatDate(t.date),
      t.kind === 'gelir' ? 'Gelir' : 'Gider',
      categories.find((c) => c.id === t.categoryId)?.name ?? '',
      accounts.find((a) => a.id === t.accountId)?.name ?? '',
      t.description,
      ((t.kind === 'gelir' ? t.amount : -t.amount) / 100).toFixed(2).replace('.', ','),
    ]);

  const csv = [header, ...rows].map((r) => r.map(cell).join(';')).join('\r\n');
  const blob = new Blob(['﻿', csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}
