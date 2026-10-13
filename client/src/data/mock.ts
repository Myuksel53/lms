import type { Account, Budget, Category, Goal, Transaction } from './types';

// Backend bağlandığında bu dosyanın yerini bir API katmanı alacak.

export const profile = { name: 'Meryem', initials: 'M' };

export const categories: Category[] = [
  { id: 'maas', name: 'Maaş', kind: 'gelir', color: '#0F5132', icon: 'work' },
  { id: 'burs', name: 'Burs', kind: 'gelir', color: '#198754', icon: 'school' },
  { id: 'ek-gelir', name: 'Ek gelir', kind: 'gelir', color: '#49607E', icon: 'add_card' },

  { id: 'kira', name: 'Kira', kind: 'gider', color: '#0A2540', icon: 'home' },
  { id: 'market', name: 'Market', kind: 'gider', color: '#0F5132', icon: 'shopping_basket' },
  { id: 'faturalar', name: 'Faturalar', kind: 'gider', color: '#49607E', icon: 'receipt_long' },
  { id: 'ulasim', name: 'Ulaşım', kind: 'gider', color: '#D97706', icon: 'directions_bus' },
  { id: 'eglence', name: 'Eğlence', kind: 'gider', color: '#6E3900', icon: 'confirmation_number' },
  { id: 'saglik', name: 'Sağlık', kind: 'gider', color: '#198754', icon: 'medical_services' },
  { id: 'diger', name: 'Diğer', kind: 'gider', color: '#94A3B8', icon: 'category' },
];

export const accounts: Account[] = [
  {
    id: 'vadesiz',
    name: 'Vadesiz hesap',
    type: 'banka',
    institution: 'Ziraat Bankası',
    detail: 'TR12 0001 0000 •••• •••• 4821',
    openingBalance: 845_000,
    openingDate: '2026-10-01',
  },
  {
    id: 'cuzdan',
    name: 'Cüzdan',
    type: 'nakit',
    institution: 'Nakit',
    detail: 'Elde tutulan para',
    openingBalance: 65_000,
    openingDate: '2026-10-01',
  },
  {
    id: 'kart',
    name: 'Kredi kartı',
    type: 'kart',
    institution: 'Garanti BBVA',
    detail: '•••• •••• •••• 3307',
    openingBalance: -124_050,
    openingDate: '2026-10-01',
  },
  {
    id: 'birikim',
    name: 'Birikim hesabı',
    type: 'birikim',
    institution: 'Ziraat Bankası',
    detail: 'Hedeflere ayrılan para',
    openingBalance: 5_590_000,
    openingDate: '2026-10-01',
  },
];

export const budgets: Budget[] = [
  { categoryId: 'kira', limit: 900_000 },
  { categoryId: 'market', limit: 350_000 },
  { categoryId: 'faturalar', limit: 200_000 },
  { categoryId: 'ulasim', limit: 120_000 },
  { categoryId: 'eglence', limit: 150_000 },
  { categoryId: 'saglik', limit: 80_000 },
  { categoryId: 'diger', limit: 100_000 },
];

export const goals: Goal[] = [
  {
    id: 'laptop',
    name: 'Yeni dizüstü bilgisayar',
    target: 3_500_000,
    saved: 2_140_000,
    deadline: '2027-01-31',
    icon: 'laptop_mac',
  },
  {
    id: 'tatil',
    name: 'Yaz tatili',
    target: 1_800_000,
    saved: 450_000,
    deadline: '2027-07-01',
    icon: 'beach_access',
  },
  {
    id: 'acil',
    name: 'Acil durum fonu',
    target: 3_000_000,
    saved: 3_000_000,
    deadline: '2026-12-31',
    icon: 'health_and_safety',
  },
];

let seq = 0;
const tx = (
  date: string,
  kind: Transaction['kind'],
  amount: number,
  categoryId: string,
  accountId: string,
  description: string,
): Transaction => ({ id: `t${++seq}`, date, kind, amount, categoryId, accountId, description });

// Ekim 2026: Market %82 (sarı), Eğlence %111 (kırmızı) olacak şekilde seçildi.
const october: Transaction[] = [
  tx('2026-10-01', 'gider', 900_000, 'kira', 'vadesiz', 'Ekim kirası'),
  tx('2026-10-02', 'gelir', 400_000, 'burs', 'vadesiz', 'KYK bursu'),
  tx('2026-10-03', 'gider', 64_235, 'market', 'kart', 'Migros haftalık alışveriş'),
  tx('2026-10-04', 'gider', 40_000, 'ulasim', 'cuzdan', 'İstanbulkart dolumu'),
  tx('2026-10-05', 'gelir', 2_200_000, 'maas', 'vadesiz', 'Ekim maaşı'),
  tx('2026-10-06', 'gider', 48_790, 'faturalar', 'vadesiz', 'Elektrik faturası'),
  tx('2026-10-07', 'gider', 31_860, 'market', 'cuzdan', 'BİM'),
  tx('2026-10-08', 'gider', 36_000, 'eglence', 'kart', 'Sinema, iki bilet'),
  tx('2026-10-09', 'gider', 44_990, 'faturalar', 'vadesiz', 'Ev interneti'),
  tx('2026-10-10', 'gider', 112_415, 'market', 'kart', 'A101 aylık temel ihtiyaç'),
  tx('2026-10-10', 'gider', 120_000, 'eglence', 'kart', 'Konser bileti'),
  tx('2026-10-11', 'gider', 78_550, 'market', 'cuzdan', 'Semt pazarı'),
  tx('2026-10-11', 'gider', 9_999, 'eglence', 'kart', 'Müzik aboneliği'),
  tx('2026-10-12', 'gelir', 150_000, 'ek-gelir', 'cuzdan', 'Özel ders'),
  tx('2026-10-12', 'gider', 18_640, 'saglik', 'cuzdan', 'Eczane'),
  tx('2026-10-13', 'gider', 24_500, 'ulasim', 'kart', 'Taksi'),
];

// Raporlar için Mayıs–Eylül 2026 özet işlemleri
const history: Array<[string, Record<string, number>]> = [
  ['2026-05', { maas: 2_000_000, burs: 400_000, kira: 900_000, market: 312_000, faturalar: 168_000, ulasim: 98_000, eglence: 124_000, saglik: 0, diger: 60_000 }],
  ['2026-06', { maas: 2_000_000, burs: 400_000, 'ek-gelir': 120_000, kira: 900_000, market: 289_000, faturalar: 159_000, ulasim: 104_000, eglence: 98_000, saglik: 45_000, diger: 35_000 }],
  ['2026-07', { maas: 2_000_000, burs: 400_000, kira: 900_000, market: 341_000, faturalar: 142_000, ulasim: 76_000, eglence: 215_000, saglik: 12_000, diger: 120_000 }],
  ['2026-08', { maas: 2_200_000, burs: 400_000, 'ek-gelir': 90_000, kira: 900_000, market: 326_000, faturalar: 151_000, ulasim: 82_000, eglence: 189_000, saglik: 0, diger: 48_000 }],
  ['2026-09', { maas: 2_200_000, burs: 400_000, 'ek-gelir': 150_000, kira: 900_000, market: 298_000, faturalar: 176_000, ulasim: 115_000, eglence: 132_000, saglik: 31_000, diger: 72_000 }],
];

const historyAccount: Record<string, string> = {
  market: 'kart', eglence: 'kart', ulasim: 'cuzdan', 'ek-gelir': 'cuzdan',
};

const historyTx: Transaction[] = history.flatMap(([month, amounts]) =>
  Object.entries(amounts)
    .filter(([, amount]) => amount > 0)
    .map(([categoryId, amount]) => {
      const category = categories.find((c) => c.id === categoryId)!;
      const day = category.kind === 'gelir' ? (categoryId === 'maas' ? '05' : '02') : '15';
      return tx(
        `${month}-${day}`,
        category.kind,
        amount,
        categoryId,
        historyAccount[categoryId] ?? 'vadesiz',
        `${category.name} (aylık toplam)`,
      );
    }),
);

export const transactions: Transaction[] = [...october, ...historyTx];
