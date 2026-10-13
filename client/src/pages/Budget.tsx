import { useState, type FormEvent } from 'react';
import { BudgetTable } from '../components/BudgetTable';
import { Icon } from '../components/Icon';
import { MetricTile } from '../components/MetricTile';
import { Panel } from '../components/Panel';
import type { AppData } from '../data/appData';
import type { Kurus } from '../data/types';
import { monthLabel } from '../lib/dates';
import { formatTRY, parseTRY, percent, toInputValue } from '../lib/money';
import { budgetRows, inMonth, type BudgetRow } from '../lib/selectors';

interface BudgetProps {
  data: AppData;
  onLimitChange: (categoryId: string, limit: Kurus) => void;
}

function LimitEditor({ row, onSave, onCancel }: { row: BudgetRow; onSave: (v: Kurus) => void; onCancel: () => void }) {
  const [value, setValue] = useState(toInputValue(row.limit));
  const [error, setError] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const parsed = parseTRY(value);
    if (!parsed.ok) {
      setError(parsed.error);
      return;
    }
    onSave(parsed.value);
  };

  return (
    <form className="limit-editor" onSubmit={submit}>
      <label className="visually-hidden" htmlFor={`limit-${row.category.id}`}>{row.category.name} limiti</label>
      <input
        id={`limit-${row.category.id}`}
        inputMode="decimal"
        value={value}
        autoFocus
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Escape' && onCancel()}
        aria-invalid={Boolean(error)}
        title={error || undefined}
      />
      <button type="submit" className="icon-button icon-button--sm" aria-label="Limiti kaydet">
        <Icon name="check" size={18} />
      </button>
      <button type="button" className="icon-button icon-button--sm" aria-label="Vazgeç" onClick={onCancel}>
        <Icon name="close" size={18} />
      </button>
      {error && <span className="limit-editor__error" role="alert">{error}</span>}
    </form>
  );
}

export function Budget({ data, onLimitChange }: BudgetProps) {
  const { month, transactions, categories, budgets } = data;
  const [editing, setEditing] = useState<string | null>(null);

  const rows = budgetRows(budgets, categories, inMonth(transactions, month));
  const totalLimit = rows.reduce((s, r) => s + r.limit, 0);
  const totalSpent = rows.reduce((s, r) => s + r.spent, 0);
  const over = rows.filter((r) => r.state === 'asim');
  const near = rows.filter((r) => r.state === 'uyari');

  return (
    <div className="wrap stack">
      <section className="metrics metrics--three" aria-label="Bütçe özeti">
        <MetricTile accent="navy" label="Aylık toplam limit" icon="account_balance" value={formatTRY(totalLimit)}
          note={<span className="delta">{rows.length} kategori</span>} />
        <MetricTile accent="emerald" label="Harcanan" icon="shopping_cart" value={formatTRY(totalSpent)}
          note={<span className="delta">Limit kullanımı %{percent(totalSpent, totalLimit)}</span>} />
        <MetricTile
          accent={over.length ? 'danger' : 'gold'}
          label="Dikkat gereken"
          icon="warning"
          value={`${over.length + near.length} kategori`}
          note={<span className="delta">{over.length} aşıldı, {near.length} sınıra yakın</span>}
        />
      </section>

      <Panel
        title={`${monthLabel(month)} bütçesi`}
        description="Limit %80'e ulaşınca sarı, aşılınca kırmızı uyarı gösterilir. Limiti değiştirmek için kalem simgesine bas."
      >
        <BudgetTable
          rows={rows}
          caption={`${monthLabel(month)} bütçesi`}
          renderLimit={(row) =>
            editing === row.category.id ? (
              <LimitEditor
                row={row}
                onCancel={() => setEditing(null)}
                onSave={(v) => {
                  onLimitChange(row.category.id, v);
                  setEditing(null);
                }}
              />
            ) : (
              <span className="limit-cell">
                {formatTRY(row.limit)}
                <button
                  type="button"
                  className="icon-button icon-button--sm"
                  aria-label={`${row.category.name} limitini düzenle`}
                  onClick={() => setEditing(row.category.id)}
                >
                  <Icon name="edit" size={16} />
                </button>
              </span>
            )
          }
        />
      </Panel>
    </div>
  );
}
