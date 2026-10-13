import { useCallback, useEffect, useMemo, useState } from 'react';
import { AddTransactionModal } from './components/AddTransactionModal';
import { AppHeader, NAV_ITEMS, type PageId } from './components/AppHeader';
import { Icon } from './components/Icon';
import { MonthPicker } from './components/MonthPicker';
import { PageHeader } from './components/PageHeader';
import { StatusStrip } from './components/StatusStrip';
import { Toast } from './components/Toast';
import type { AppData } from './data/appData';
import * as mock from './data/mock';
import type { Budget as BudgetType, Goal, Kurus, Transaction, TxKind } from './data/types';
import { monthKey, monthLabel, TODAY } from './lib/dates';
import { formatTRY } from './lib/money';
import { budgetRows, buildNotifications, goalProgress, inMonth } from './lib/selectors';
import { Budget } from './pages/Budget';
import { Goals } from './pages/Goals';
import { Overview } from './pages/Overview';
import { Reports } from './pages/Reports';
import { Transactions } from './pages/Transactions';

const CURRENT_MONTH = monthKey(TODAY);
const FIRST_MONTH = mock.transactions.reduce((min, t) => (t.date < min ? t.date : min), TODAY).slice(0, 7);

const SUBTITLES: Record<PageId, (month: string) => string> = {
  overview: (m) => `${m} için gelir, gider ve bütçe durumun`,
  transactions: (m) => `${m} içindeki tüm gelir ve giderlerin`,
  budget: (m) => `${m} için kategori limitleri ve kalan tutarlar`,
  goals: () => 'Biriktirdiğin para ve hedeflerine ne kadar kaldığı',
  reports: (m) => `${m} ve önceki aylara ait özet ve grafikler`,
};

const PAGE_HASH: Record<PageId, string> = {
  overview: '', transactions: 'islemler', budget: 'butce', goals: 'hedefler', reports: 'raporlar',
};

function pageFromHash(): PageId {
  const hash = window.location.hash.replace(/^#\/?/, '');
  return (Object.keys(PAGE_HASH) as PageId[]).find((id) => PAGE_HASH[id] === hash) ?? 'overview';
}

const todayLabel = new Intl.DateTimeFormat('tr-TR', {
  day: 'numeric', month: 'long', year: 'numeric', weekday: 'long',
}).format(new Date(`${TODAY}T12:00:00`));

export function App() {
  const [page, setPage] = useState<PageId>(pageFromHash);
  const [month, setMonth] = useState(CURRENT_MONTH);
  const [transactions, setTransactions] = useState<Transaction[]>(mock.transactions);
  const [budgets, setBudgets] = useState<BudgetType[]>(mock.budgets);
  const [goals, setGoals] = useState<Goal[]>(mock.goals);
  const [modalKind, setModalKind] = useState<TxKind | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [accountFilter, setAccountFilter] = useState('');

  const data: AppData = {
    month, transactions, budgets, goals, accounts: mock.accounts, categories: mock.categories,
  };

  // Bildirimler her zaman içinde bulunulan aya göre hesaplanır (FG-39–41)
  const notifications = useMemo(
    () => buildNotifications(
      budgetRows(budgets, mock.categories, inMonth(transactions, CURRENT_MONTH)),
      goals.map((g) => goalProgress(g, TODAY)),
    ),
    [budgets, transactions, goals],
  );

  const clearToast = useCallback(() => setToast(null), []);

  useEffect(() => {
    const onHash = () => setPage(pageFromHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const showPage = (next: PageId) => {
    setPage(next);
    window.history.replaceState(null, '', next === 'overview' ? window.location.pathname : `#/${PAGE_HASH[next]}`);
    window.scrollTo({ top: 0 });
  };

  const navigate = (next: PageId) => {
    if (next !== 'transactions') setAccountFilter('');
    showPage(next);
  };

  const addTransaction = (tx: Omit<Transaction, 'id'>) => {
    setTransactions((list) => [{ ...tx, id: `t-new-${Date.now()}` }, ...list]);
    setModalKind(null);
    setMonth(monthKey(tx.date));
    setToast(`${tx.kind === 'gider' ? 'Gider' : 'Gelir'} kaydedildi: ${formatTRY(tx.amount)}`);
  };

  const changeLimit = (categoryId: string, limit: Kurus) => {
    setBudgets((list) => list.map((b) => (b.categoryId === categoryId ? { ...b, limit } : b)));
    const name = mock.categories.find((c) => c.id === categoryId)?.name;
    setToast(`${name} limiti güncellendi: ${formatTRY(limit)}`);
  };

  const contribute = (goalId: string, amount: Kurus) => {
    setGoals((list) => list.map((g) => (g.id === goalId ? { ...g, saved: g.saved + amount } : g)));
    setToast(`Hedefe ${formatTRY(amount)} eklendi`);
  };

  const createGoal = (goal: Omit<Goal, 'id'>) => {
    setGoals((list) => [...list, { ...goal, id: `g-${Date.now()}` }]);
    setToast(`"${goal.name}" hedefi oluşturuldu`);
  };

  const title = NAV_ITEMS.find((n) => n.id === page)!.label;
  const showMonth = page !== 'goals';

  return (
    <>
      <a className="skip-link" href="#main">İçeriğe geç</a>
      <StatusStrip todayLabel={todayLabel} />
      <AppHeader page={page} onNavigate={navigate} notifications={notifications} profile={mock.profile} />

      <main id="main" className="main">
        <PageHeader
          title={title}
          subtitle={SUBTITLES[page](monthLabel(month))}
          actions={
            <>
              {showMonth && <MonthPicker month={month} min={FIRST_MONTH} max={CURRENT_MONTH} onChange={setMonth} />}
              <button type="button" className="btn btn--outline" onClick={() => setModalKind('gelir')}>
                <Icon name="add" size={18} />
                Gelir ekle
              </button>
              <button type="button" className="btn btn--primary" onClick={() => setModalKind('gider')}>
                <Icon name="remove" size={18} />
                Gider ekle
              </button>
            </>
          }
        />

        {page === 'overview' && (
          <Overview
            data={data}
            onGoTo={navigate}
            onShowAccount={(id) => {
              setAccountFilter(id);
              showPage('transactions');
            }}
          />
        )}
        {page === 'transactions' && (
          <Transactions data={data} accountFilter={accountFilter} onAccountFilterChange={setAccountFilter} />
        )}
        {page === 'budget' && <Budget data={data} onLimitChange={changeLimit} />}
        {page === 'goals' && <Goals data={data} onContribute={contribute} onCreate={createGoal} />}
        {page === 'reports' && <Reports data={data} />}
      </main>

      <footer className="app-footer">
        <div className="wrap app-footer__inner">
          <span className="app-footer__brand">Kumbara</span>
          <span>Kişisel bütçe uygulaması. Tüm veriler bu bilgisayarda tutulur.</span>
        </div>
      </footer>

      {modalKind && (
        <AddTransactionModal
          initialKind={modalKind}
          categories={mock.categories}
          accounts={mock.accounts}
          onSave={addTransaction}
          onClose={() => setModalKind(null)}
        />
      )}
      <Toast message={toast} onDone={clearToast} />
    </>
  );
}
