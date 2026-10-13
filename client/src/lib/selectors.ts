import type {
  Account, AppNotification, Budget, Category, Goal, Kurus, Transaction,
} from '../data/types';
import { monthKey, monthsBetween, type MonthKey } from './dates';
import { formatTRY, percent } from './money';

export function inMonth(txs: Transaction[], month: MonthKey): Transaction[] {
  return txs.filter((t) => monthKey(t.date) === month);
}

export function sumKind(txs: Transaction[], kind: Transaction['kind']): Kurus {
  return txs.reduce((s, t) => (t.kind === kind ? s + t.amount : s), 0);
}

/** Hesap bakiyesi = açılış bakiyesi + açılış tarihinden sonraki işlemler (FG-09) */
export function accountBalance(account: Account, txs: Transaction[]): Kurus {
  return txs
    .filter((t) => t.accountId === account.id && t.date >= account.openingDate)
    .reduce((bal, t) => bal + (t.kind === 'gelir' ? t.amount : -t.amount), account.openingBalance);
}

/** Toplam varlık; kart borcu negatif bakiye olarak düşülür (FG-11) */
export function netWorth(accounts: Account[], txs: Transaction[]): Kurus {
  return accounts.reduce((s, a) => s + accountBalance(a, txs), 0);
}

export interface CategorySpend {
  category: Category;
  amount: Kurus;
  share: number;
}

export function spendByCategory(
  txs: Transaction[],
  categories: Category[],
): CategorySpend[] {
  const expenses = txs.filter((t) => t.kind === 'gider');
  const total = sumKind(expenses, 'gider');
  return categories
    .filter((c) => c.kind === 'gider')
    .map((category) => {
      const amount = expenses
        .filter((t) => t.categoryId === category.id)
        .reduce((s, t) => s + t.amount, 0);
      return { category, amount, share: percent(amount, total) };
    })
    .filter((row) => row.amount > 0)
    .sort((a, b) => b.amount - a.amount);
}

export type BudgetState = 'normal' | 'uyari' | 'asim';

export interface BudgetRow {
  category: Category;
  limit: Kurus;
  spent: Kurus;
  remaining: Kurus;
  usage: number;
  state: BudgetState;
}

/** %80'de uyarı, %100'ün üstünde aşım (FG-28) */
export function budgetState(usage: number): BudgetState {
  if (usage > 100) return 'asim';
  if (usage >= 80) return 'uyari';
  return 'normal';
}

export function budgetRows(
  budgets: Budget[],
  categories: Category[],
  monthTxs: Transaction[],
): BudgetRow[] {
  return budgets.map((b) => {
    const category = categories.find((c) => c.id === b.categoryId)!;
    const spent = monthTxs
      .filter((t) => t.kind === 'gider' && t.categoryId === b.categoryId)
      .reduce((s, t) => s + t.amount, 0);
    const usage = percent(spent, b.limit);
    return { category, limit: b.limit, spent, remaining: b.limit - spent, usage, state: budgetState(usage) };
  });
}

export interface GoalProgress {
  goal: Goal;
  progress: number;
  remaining: Kurus;
  monthsLeft: number;
  monthlyNeeded: Kurus;
  done: boolean;
}

/** İlerleme %, kalan tutar ve hedef tarihe yetişmek için gereken aylık tutar (FG-32) */
export function goalProgress(goal: Goal, today: string): GoalProgress {
  const remaining = Math.max(goal.target - goal.saved, 0);
  const monthsLeft = Math.max(monthsBetween(today, goal.deadline), 1);
  return {
    goal,
    progress: Math.min(percent(goal.saved, goal.target), 100),
    remaining,
    monthsLeft,
    monthlyNeeded: Math.ceil(remaining / monthsLeft),
    done: goal.saved >= goal.target,
  };
}

/** Bütçe ve hedef durumlarından uygulama içi bildirimler üretir (FG-40, FG-41) */
export function buildNotifications(rows: BudgetRow[], goals: GoalProgress[]): AppNotification[] {
  const budgetNotes: AppNotification[] = rows
    .filter((r) => r.state !== 'normal')
    .map((r) => ({
      id: `butce-${r.category.id}`,
      tone: r.state === 'asim' ? 'asim' : 'uyari',
      title: r.state === 'asim'
        ? `${r.category.name} bütçesi aşıldı`
        : `${r.category.name} bütçesi %${r.usage} doldu`,
      body: r.state === 'asim'
        ? `Limitin ${formatTRY(-r.remaining)} üzerindesin.`
        : `Bu ay için ${formatTRY(r.remaining)} kaldı.`,
    }));

  const goalNotes: AppNotification[] = goals
    .filter((g) => !g.done && g.monthsLeft <= 4 && g.progress < 75)
    .map((g) => ({
      id: `hedef-${g.goal.id}`,
      tone: 'bilgi',
      title: `${g.goal.name} hedefi geride`,
      body: `Hedef tarihe yetişmek için ayda ${formatTRY(g.monthlyNeeded)} ayırman gerekiyor.`,
    }));

  return [...budgetNotes, ...goalNotes];
}

export interface MonthTotals {
  month: MonthKey;
  income: Kurus;
  expense: Kurus;
}

export function monthlyTotals(txs: Transaction[], months: MonthKey[]): MonthTotals[] {
  return months.map((month) => {
    const list = inMonth(txs, month);
    return { month, income: sumKind(list, 'gelir'), expense: sumKind(list, 'gider') };
  });
}

/** Geçen aya göre değişim yüzdesi; geçen ay 0 ise null */
export function changeVsPrevious(current: Kurus, previous: Kurus): number | null {
  if (previous === 0) return null;
  return Math.round(((current - previous) / previous) * 100);
}
