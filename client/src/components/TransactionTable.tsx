import type { Account, Category, Transaction } from '../data/types';
import { formatDate, formatDayMonth } from '../lib/dates';
import { formatSigned } from '../lib/money';
import { Icon } from './Icon';
import { StatusChip } from './StatusChip';

interface TransactionTableProps {
  transactions: Transaction[];
  categories: Category[];
  accounts: Account[];
  caption: string;
  emptyMessage: string;
}

export function TransactionTable({ transactions, categories, accounts, caption, emptyMessage }: TransactionTableProps) {
  if (transactions.length === 0) {
    return (
      <div className="empty">
        <Icon name="search_off" size={28} />
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="table-scroll">
      <table className="data-table tx-table">
        <caption className="visually-hidden">{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Tarih</th>
            <th scope="col">Açıklama ve kategori</th>
            <th scope="col">Tür</th>
            <th scope="col">Hesap</th>
            <th scope="col" className="num">Tutar</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => {
            const category = categories.find((c) => c.id === t.categoryId);
            const account = accounts.find((a) => a.id === t.accountId);
            return (
              <tr key={t.id}>
                <td className="tx-table__date">
                  <time dateTime={t.date} title={formatDate(t.date)}>{formatDayMonth(t.date)}</time>
                </td>
                <td>
                  <span className="cat">
                    <span className="cat__icon" style={{ color: category?.color }}>
                      <Icon name={category?.icon ?? 'category'} size={18} />
                    </span>
                    <span className="tx-table__text">
                      <span className="tx-table__desc">{t.description}</span>
                      <span className="tx-table__cat">{category?.name}</span>
                    </span>
                  </span>
                </td>
                <td>
                  <StatusChip tone={t.kind === 'gelir' ? 'positive' : 'neutral'}>
                    {t.kind === 'gelir' ? 'Gelir' : 'Gider'}
                  </StatusChip>
                </td>
                <td className="tx-table__account">{account?.name}</td>
                <td className={`num tx-table__amount amount--${t.kind}`}>{formatSigned(t.amount, t.kind)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
