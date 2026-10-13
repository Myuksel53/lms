import type { ReactNode } from 'react';
import { formatTRY } from '../lib/money';
import type { BudgetRow } from '../lib/selectors';
import { Icon } from './Icon';
import { ProgressBar } from './ProgressBar';
import { StatusChip } from './StatusChip';

export function BudgetStatus({ row }: { row: BudgetRow }) {
  if (row.state === 'asim') return <StatusChip tone="danger" dot>Aşıldı</StatusChip>;
  if (row.state === 'uyari') return <StatusChip tone="warning" dot>Sınıra yakın</StatusChip>;
  return <StatusChip tone="positive" dot>Yolunda</StatusChip>;
}

interface BudgetTableProps {
  rows: BudgetRow[];
  /** Limit hücresini özelleştirmek için (Bütçe sayfasında satır içi düzenleme) */
  renderLimit?: (row: BudgetRow) => ReactNode;
  caption: string;
}

export function BudgetTable({ rows, renderLimit, caption }: BudgetTableProps) {
  return (
    <div className="table-scroll">
      <table className="data-table budget-table">
        <caption className="visually-hidden">{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Kategori</th>
            <th scope="col" className="num">Limit</th>
            <th scope="col" className="num">Harcanan</th>
            <th scope="col" className="num">Kalan</th>
            <th scope="col" className="budget-table__usage">Kullanım</th>
            <th scope="col">Durum</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.category.id} className={`budget-row budget-row--${row.state}`}>
              <th scope="row">
                <span className="cat">
                  <span className="cat__icon" style={{ color: row.category.color }}>
                    <Icon name={row.category.icon} size={18} />
                  </span>
                  {row.category.name}
                </span>
              </th>
              <td className="num">{renderLimit ? renderLimit(row) : formatTRY(row.limit)}</td>
              <td className="num">{formatTRY(row.spent)}</td>
              <td className={`num ${row.remaining < 0 ? 'amount--negative' : ''}`}>
                {row.remaining < 0 ? `−${formatTRY(-row.remaining)}` : formatTRY(row.remaining)}
              </td>
              <td className="budget-table__usage">
                <div className="usage">
                  <ProgressBar value={row.usage} state={row.state} label={`${row.category.name} bütçe kullanımı`} />
                  <span className="usage__pct">%{row.usage}</span>
                </div>
              </td>
              <td><BudgetStatus row={row} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
