import { BarChart } from '../components/BarChart';
import { DonutChart } from '../components/DonutChart';
import { Icon } from '../components/Icon';
import { MetricTile } from '../components/MetricTile';
import { Panel } from '../components/Panel';
import type { AppData } from '../data/appData';
import { lastMonths, monthLabel } from '../lib/dates';
import { formatTRY, percent } from '../lib/money';
import { budgetRows, inMonth, monthlyTotals, spendByCategory } from '../lib/selectors';

const MONTHS_SHOWN = 6;

export function Reports({ data }: { data: AppData }) {
  const { month, transactions, categories, budgets } = data;
  const months = lastMonths(month, MONTHS_SHOWN);
  const totals = monthlyTotals(transactions, months);
  const filled = totals.filter((t) => t.income || t.expense);
  const avgIncome = filled.length ? Math.round(filled.reduce((s, t) => s + t.income, 0) / filled.length) : 0;
  const avgExpense = filled.length ? Math.round(filled.reduce((s, t) => s + t.expense, 0) / filled.length) : 0;

  const monthTxs = inMonth(transactions, month);
  const spend = spendByCategory(monthTxs, categories);
  const rows = budgetRows(budgets, categories, monthTxs);
  const expense = spend.reduce((s, x) => s + x.amount, 0);
  const top = spend[0];
  const maxBar = Math.max(...rows.map((r) => Math.max(r.limit, r.spent)), 1);

  return (
    <div className="wrap stack">
      <section className="metrics metrics--three" aria-label="Rapor özeti">
        <MetricTile accent="navy" label="Ortalama aylık gelir" icon="south_west" value={formatTRY(avgIncome)}
          note={<span className="delta">Son {filled.length} ay</span>} />
        <MetricTile accent="danger" label="Ortalama aylık gider" icon="north_east" value={formatTRY(avgExpense)}
          note={<span className="delta">Gelirin %{percent(avgExpense, avgIncome)} kadarı</span>} />
        <MetricTile accent="emerald" label="Ortalama aylık birikim" icon="savings" value={formatTRY(avgIncome - avgExpense)}
          note={<span className="delta">Gelir ile gider farkı</span>} />
      </section>

      <Panel
        title="Gelir ve gider karşılaştırması"
        description={`${monthLabel(months[0])} ile ${monthLabel(month)} arası`}
      >
        <BarChart data={totals} activeMonth={month} />
      </Panel>

      <div className="split">
        <Panel
          className="split__narrow"
          title="Kategori dağılımı"
          description={top ? `${monthLabel(month)} içinde en çok ${top.category.name} için harcadın` : monthLabel(month)}
        >
          {spend.length === 0 ? (
            <div className="empty">
              <Icon name="donut_large" size={28} />
              <p>Bu ay gider yok.</p>
            </div>
          ) : (
            <div className="distribution distribution--stacked">
              <DonutChart
                size={200}
                segments={spend.map((s) => ({ id: s.category.id, label: s.category.name, value: s.amount, color: s.category.color }))}
                centerLabel="Toplam gider"
                centerValue={formatTRY(expense)}
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
          title="Bütçe ve gerçekleşen"
          description="Her kategoride limit ile harcamanın karşılaştırması"
        >
          <ul className="versus">
            {rows.map((r) => (
              <li key={r.category.id} className={`versus__row versus__row--${r.state}`}>
                <span className="versus__name">{r.category.name}</span>
                <div className="versus__bars" aria-hidden="true">
                  <span className="versus__bar versus__bar--limit" style={{ width: `${(r.limit / maxBar) * 100}%` }} />
                  <span className="versus__bar versus__bar--spent" style={{ width: `${(r.spent / maxBar) * 100}%` }} />
                </div>
                <span className="versus__nums">
                  {formatTRY(r.spent)}
                  <span className="versus__limit"> / {formatTRY(r.limit)}</span>
                </span>
              </li>
            ))}
          </ul>
          <ul className="legend-inline" aria-hidden="true">
            <li><span className="swatch swatch--limit" />Limit</li>
            <li><span className="swatch swatch--spent" />Harcanan</li>
          </ul>
        </Panel>
      </div>
    </div>
  );
}
