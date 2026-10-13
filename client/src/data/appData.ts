import type { MonthKey } from '../lib/dates';
import type { Account, Budget, Category, Goal, Transaction } from './types';

/** Sayfaların ortak olarak kullandığı uygulama durumu */
export interface AppData {
  month: MonthKey;
  transactions: Transaction[];
  accounts: Account[];
  categories: Category[];
  budgets: Budget[];
  goals: Goal[];
}
