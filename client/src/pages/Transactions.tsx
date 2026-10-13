import { useMemo, useState } from 'react';
import { Icon } from '../components/Icon';
import { Panel } from '../components/Panel';
import { TransactionTable } from '../components/TransactionTable';
import type { AppData } from '../data/appData';
import type { TxKind } from '../data/types';
import { downloadTransactionsCsv } from '../lib/csv';
import { monthLabel } from '../lib/dates';
import { formatTRY } from '../lib/money';
import { inMonth, sumKind } from '../lib/selectors';

interface TransactionsProps {
  data: AppData;
  accountFilter: string;
  onAccountFilterChange: (accountId: string) => void;
}

export function Transactions({ data, accountFilter, onAccountFilterChange }: TransactionsProps) {
  const { month, transactions, categories, accounts } = data;
  const [query, setQuery] = useState('');
  const [kind, setKind] = useState<TxKind | ''>('');
  const [categoryId, setCategoryId] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase('tr');
    return inMonth(transactions, month)
      .filter((t) => (kind ? t.kind === kind : true))
      .filter((t) => (categoryId ? t.categoryId === categoryId : true))
      .filter((t) => (accountFilter ? t.accountId === accountFilter : true))
      .filter((t) => (q ? t.description.toLocaleLowerCase('tr').includes(q) : true))
      .sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id, undefined, { numeric: true }));
  }, [transactions, month, kind, categoryId, accountFilter, query]);

  const hasFilter = Boolean(query || kind || categoryId || accountFilter);
  const income = sumKind(filtered, 'gelir');
  const expense = sumKind(filtered, 'gider');
  const visibleCategories = categories.filter((c) => (kind ? c.kind === kind : true));

  const reset = () => {
    setQuery('');
    setKind('');
    setCategoryId('');
    onAccountFilterChange('');
  };

  return (
    <div className="wrap stack">
      <Panel
        title={`${monthLabel(month)} işlemleri`}
        description="Tarih, tür, kategori ve hesaba göre filtrele"
        actions={
          <button
            type="button"
            className="btn btn--outline btn--sm"
            onClick={() => downloadTransactionsCsv(filtered, categories, accounts, `kumbara-islemler-${month}.csv`)}
            disabled={filtered.length === 0}
          >
            <Icon name="download" size={18} />
            CSV indir
          </button>
        }
        footer={
          <>
            <span className="panel__count">{filtered.length} işlem listeleniyor</span>
            <dl className="totals">
              <div><dt>Gelir</dt><dd className="amount--gelir">+{formatTRY(income)}</dd></div>
              <div><dt>Gider</dt><dd className="amount--gider">−{formatTRY(expense)}</dd></div>
              <div><dt>Net</dt><dd>{formatTRY(income - expense)}</dd></div>
            </dl>
          </>
        }
      >
        <div className="filters">
          <label className="search search--grow">
            <Icon name="search" size={18} />
            <span className="visually-hidden">Açıklamada ara</span>
            <input
              type="search"
              placeholder="Açıklamada ara"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <label className="select">
            <span className="visually-hidden">Tür</span>
            <select
              value={kind}
              onChange={(e) => {
                setKind(e.target.value as TxKind | '');
                setCategoryId('');
              }}
            >
              <option value="">Tüm türler</option>
              <option value="gelir">Gelir</option>
              <option value="gider">Gider</option>
            </select>
          </label>
          <label className="select">
            <span className="visually-hidden">Kategori</span>
            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
              <option value="">Tüm kategoriler</option>
              {visibleCategories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </label>
          <label className="select">
            <span className="visually-hidden">Hesap</span>
            <select value={accountFilter} onChange={(e) => onAccountFilterChange(e.target.value)}>
              <option value="">Tüm hesaplar</option>
              {accounts.map((a) => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
          </label>
          {hasFilter && (
            <button type="button" className="link-button" onClick={reset}>
              Filtreleri temizle
            </button>
          )}
        </div>

        <TransactionTable
          transactions={filtered}
          categories={categories}
          accounts={accounts}
          caption={`${monthLabel(month)} işlemleri`}
          emptyMessage={
            hasFilter
              ? 'Bu filtrelerle eşleşen işlem yok. Filtreleri temizleyip tekrar deneyin.'
              : 'Bu ay henüz işlem yok. Üstteki butonlarla ilk gelir veya giderini ekle.'
          }
        />
      </Panel>
    </div>
  );
}
