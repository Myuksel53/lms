import { useEffect, useRef, useState } from 'react';
import { monthShort, monthLabel } from '../lib/dates';
import { formatTRY, formatTRYShort } from '../lib/money';
import type { MonthTotals } from '../lib/selectors';

interface BarChartProps {
  data: MonthTotals[];
  activeMonth: string;
}

const H = 260;
const PAD = { top: 16, right: 8, bottom: 32, left: 64 };

function niceMax(value: number): number {
  const step = 10 ** Math.floor(Math.log10(value));
  return Math.ceil(value / step) * step;
}

export function BarChart({ data, activeMonth }: BarChartProps) {
  // SVG'yi ölçeklemek yazıları büyüttüğü için genişlik kapsayıcıdan ölçülür
  const ref = useRef<HTMLDivElement>(null);
  const [W, setW] = useState(720);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setW(Math.max(Math.round(entry.contentRect.width), 280)));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const max = niceMax(Math.max(...data.flatMap((d) => [d.income, d.expense]), 1));
  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;
  const group = plotW / data.length;
  const barW = Math.min(28, group / 3.2);
  const y = (v: number) => PAD.top + plotH - (v / max) * plotH;
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => t * max);

  return (
    <div className="bar-chart" ref={ref}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby="bar-chart-title bar-chart-desc">
        <title id="bar-chart-title">Son {data.length} ayın gelir ve gideri</title>
        <desc id="bar-chart-desc">
          {data.map((d) => `${monthLabel(d.month)}: gelir ${formatTRY(d.income)}, gider ${formatTRY(d.expense)}`).join('. ')}
        </desc>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={PAD.left} x2={W - PAD.right} y1={y(t)} y2={y(t)} className="bar-chart__grid" />
            <text x={PAD.left - 10} y={y(t)} className="bar-chart__tick" textAnchor="end" dominantBaseline="middle">
              {formatTRYShort(t)}
            </text>
          </g>
        ))}
        {data.map((d, i) => {
          const cx = PAD.left + group * i + group / 2;
          const active = d.month === activeMonth;
          return (
            <g key={d.month} className={active ? 'bar-chart__group is-active' : 'bar-chart__group'}>
              <rect
                className="bar-chart__bar bar-chart__bar--income"
                x={cx - barW - 2}
                y={y(d.income)}
                width={barW}
                height={Math.max(PAD.top + plotH - y(d.income), 0)}
                rx={2}
              >
                <title>{`${monthLabel(d.month)} geliri: ${formatTRY(d.income)}`}</title>
              </rect>
              <rect
                className="bar-chart__bar bar-chart__bar--expense"
                x={cx + 2}
                y={y(d.expense)}
                width={barW}
                height={Math.max(PAD.top + plotH - y(d.expense), 0)}
                rx={2}
              >
                <title>{`${monthLabel(d.month)} gideri: ${formatTRY(d.expense)}`}</title>
              </rect>
              <text x={cx} y={H - 10} className="bar-chart__month" textAnchor="middle">
                {monthShort(d.month)}
              </text>
            </g>
          );
        })}
      </svg>
      <ul className="legend-inline" aria-hidden="true">
        <li><span className="swatch swatch--income" />Gelir</li>
        <li><span className="swatch swatch--expense" />Gider</li>
      </ul>
    </div>
  );
}
