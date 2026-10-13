// Tüm tutarlar kuruş cinsinden tamsayıdır (FOG-12).
export type Kurus = number;

export type TxKind = 'gelir' | 'gider';

export type AccountType = 'banka' | 'nakit' | 'kart' | 'birikim';

export interface Account {
  id: string;
  name: string;
  type: AccountType;
  institution: string;
  detail: string;
  /** 1 Ekim 2026 itibarıyla bakiye. Kredi kartında borç negatiftir. */
  openingBalance: Kurus;
  openingDate: string;
}

export interface Category {
  id: string;
  name: string;
  kind: TxKind;
  color: string;
  icon: string;
}

export interface Transaction {
  id: string;
  date: string; // YYYY-MM-DD
  kind: TxKind;
  amount: Kurus; // her zaman pozitif
  categoryId: string;
  accountId: string;
  description: string;
}

export interface Budget {
  categoryId: string;
  limit: Kurus;
}

export interface Goal {
  id: string;
  name: string;
  target: Kurus;
  saved: Kurus;
  deadline: string;
  icon: string;
}

export interface AppNotification {
  id: string;
  tone: 'uyari' | 'asim' | 'bilgi';
  title: string;
  body: string;
}
