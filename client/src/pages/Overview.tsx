import { useMemo, useState } from 'react';
import { AccountCards } from '../components/AccountCards';
import { BudgetTable } from '../components/BudgetTable';
import { DonutChart } from '../components/DonutChart';
import { Icon } from '../components/Icon';
import { MetricTile } from '../components/MetricTile';
import { Panel } from '../components/Panel';
import { TransactionTable } from '../components/TransactionTable';
import type { AppData } from '../data/appData';
import { downloadTransactionsCsv } from '../lib/csv';
import { monthLabel, shiftMonth, TODAY } from '../lib/dates';
import { formatTRY, percent } from '../lib/money';
import {
  accountBalance, budgetRows, changeVsPrevious, goalProgress, inMonth, netWorth, spendByCategory, sumKind,
} from '../lib/selectors';

const RECENT_LIMIT = 6;

interface OverviewProps {
  data: AppData;
  onShowAccount: (accountId: string) => void;
  onGoTo: (page: 'transactions' | 'budget' | 'goals') => void;
}

function Delta({ value, goodWhenUp }: { value: number | null; goodWhenUp: boolean }) {
  if (value === null) return <span className="delta">Geçen ay kayıt yok</span>;
  const up = value >= 0;
  const good = up === goodWhenUp;
  return (
    <span className="delta">
      <span className={`delta__chip ${good ? 'delta__chip--good' : 'delta__chip--bad'}`}>
        <Icon name={up ? 'trending_up' : 'trending_down'} size={14} />
        %{Math.abs(value)}
      </span>
      geçen aya göre
    </span>
  );
}

export function Overview({ data, onShowAccount, onGoTo }: OverviewProps) {
  const { month, transactions, accounts, categories, budgets, goals } = data;
  const [query, setQuery] = useState('');

  const monthTxs = useMemo(() => inMonth(transactions, month), [transactions, month]);
  const prevTxs = useMemo(() => inMonth(transactions, shiftMonth(month, -1)), [transactions, month]);

  const income = sumKind(monthTxs, 'gelir');
  const expense = sumKind(monthTxs, 'gider');
  const balances = accounts.map((account) => ({ account, balance: accountBalance(account, transactions) }));
  const total = netWorth(accounts, transactions);
  const cardDebt = balances.filter((b) => b.account.type === 'kart').reduce((s, b) => s + b.balance, 0);

  const spend = spendByCategory(monthTxs, categories);
  const rows = budgetRows(budgets, categories, monthTxs);
  const goalStats = goals.map((g) => goalProgress(g, TODAY));
  const goalSaved = goals.reduce((s, g) => s + g.saved, 0);
  const goalTarget = goals.reduce((s, g) => s + g.target, 0);
  const totalLimit = budgets.reduce((s, b) => s + b.limit, 0);

  const recent = useMemo(() => {
    const q = query.trim().toLocaleLowerCase('tr');
    return [...transactions]
      .filter((t) => {
        if (!q) return true;
        const cat = categories.find((c) => c.id === t.categoryId)?.name ?? '';
        return `${t.description} ${cat}`.toLocaleLowerCase('tr').includes(q);
      })
      .sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id, undefined, { numeric: true }))
      .slice(0, RECENT_LIMIT);
  }, [transactions, categories, query]);

  const label = monthLabel(month);

  return (
    <div className="wrap stack">
      <section className="metrics" aria-label="Özet göstergeler">
        <MetricTile
          accent="emerald"
          label="Toplam bakiye"
          icon="account_balance_wallet"
          value={formatTRY(total)}
          note={<span className="delta">{accounts.length} hesap, kart borcu düşülmüş</span>}
          footer={[
            ['Kart borcu', formatTRY(Math.abs(cardDebt))],
            ['Birikim', formatTRY(balances.find((b) => b.account.type === 'birikim')?.balance ?? 0)],
          ]}
        />
        <MetricTile
          accent="navy"
          label={`${label} geliri`}
          icon="south_west"
          value={formatTRY(income)}
          note={<Delta value={changeVsPrevious(income, sumKind(prevTxs, 'gelir'))} goodWhenUp />}
          footer={[
            ['Kayıt', `${monthTxs.filter((t) => t.kind === 'gelir').length} gelir`],
            ['Net', formatTRY(income - expense)],
          ]}
        />
        <MetricTile
          accent="danger"
          label={`${label} gideri`}
          icon="north_east"
          value={formatTRY(expense)}
          note={<Delta value={changeVsPrevious(expense, sumKind(prevTxs, 'gider'))} goodWhenUp={false} />}
          footer={[
            ['Bütçe', formatTRY(totalLimit)],
            ['Kullanım', `%${percent(expense, totalLimit)}`],
          ]}
        />
        <MetricTile
          accent="gold"
          label="Birikim hedefleri"
          icon="flag"
          value={`%${percent(goalSaved, goalTarget)}`}
          note={<span className="delta">{formatTRY(goalSaved)} / {formatTRY(goalTarget)}</span>}
          footer={[
            ['Hedef', `${goals.length} hedef`],
            ['Tamamlanan', `${goalStats.filter((g) => g.done).length}`],
          ]}
        />
      </section>

      <div className="split">
        <Panel
          className="split__narrow"
          title="Harcama dağılımı"
          description={`${label} giderlerinin kategorilere göre dağılımı`}
        >
          {spend.length === 0 ? (
            <div className="empty">
              <Icon name="donut_large" size={28} />
              <p>Bu ay henüz gider yok. İlk harcamanı eklediğinde dağılım burada görünür.</p>
            </div>
          ) : (
            <div className="distribution">
              <DonutChart
                segments={spend.map((s) => ({
                  id: s.category.id, label: s.category.name, value: s.amount, color: s.category.color,
                }))}
                centerLabel="Toplam gider"
                centerValue={formatTRY(expense)}
                centerNote={`${spend.length} kategori`}
              />
              <ul className="legend">
                {spend.map((s) => (
                  <li key={s.category.id} className="legend__row">
                    <span className="legend__swatch" style={{ background: s.category.color }} aria-hidden="true" />
                    <span className="legend__name">{s.category.name}</span>
                    <span className="legend__amount">{formatTRY(s.amount)}</span>
                    <span className="legend__share">%{s.share}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Panel>

        <Panel
          className="split__wide"
          title="Bütçe durumu"
          description="Kategori limitlerine göre bu ayki harcaman"
          actions={
            <button type="button" className="btn btn--outline btn--sm" onClick={() => onGoTo('budget')}>
              <Icon name="tune" size={18} />
              Limitleri düzenle
            </button>
          }
        >
          <BudgetTable rows={rows} caption={`${label} bütçe durumu`} />
        </Panel>
      </div>

      <Panel
        title="Hesaplarım"
        description="Banka, nakit ve kart hesaplarının güncel bakiyeleri"
      >
        <AccountCards accounts={balances} onShowTransactions={onShowAccount} />
      </Panel>

      <Panel
        title="Son işlemler"
        description="Tüm hesaplardaki en yeni gelir ve giderler"
        actions={
          <label className="search">
            <Icon name="search" size={18} />
            <span className="visually-hidden">İşlemlerde ara</span>
            <input
              type="search"
              placeholder="Açıklama veya kategori ara"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        }
        footer={
          <>
            <span className="panel__count">
              {query ? `Aramayla eşleşen son ${recent.length} işlem` : `Toplam ${transactions.length} kayıt içinden son ${recent.length} işlem`}
            </span>
            <div className="panel__foot-actions">
              <button
                type="button"
                className="btn btn--outline btn--sm"
                onClick={() => downloadTransactionsCsv(monthTxs, categories, accounts, `kumbara-${month}.csv`)}
              >
                <Icon name="download" size={18} />
                {label} CSV indir
              </button>
              <button type="button" className="btn btn--navy btn--sm" onClick={() => onGoTo('transactions')}>
                Tüm işlemler
              </button>
            </div>
          </>
        }
      >
        <TransactionTable
          transactions={recent}
          categories={categories}
          accounts={accounts}
          caption="Son işlemler"
          emptyMessage={`"${query}" ile eşleşen işlem yok. Farklı bir kelime deneyin.`}
        />
      </Panel>
    </div>
  );
}
