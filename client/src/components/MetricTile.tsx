import type { ReactNode } from 'react';
import { Icon } from './Icon';

export type Accent = 'emerald' | 'navy' | 'gold' | 'danger';

interface MetricTileProps {
  accent: Accent;
  label: string;
  icon: string;
  value: string;
  note?: ReactNode;
  footer?: Array<[string, string]>;
}

export function MetricTile({ accent, label, icon, value, note, footer }: MetricTileProps) {
  return (
    <article className={`metric metric--${accent}`}>
      <header className="metric__head">
        <h3 className="metric__label">{label}</h3>
        <span className="metric__icon">
          <Icon name={icon} size={20} />
        </span>
      </header>
      <p className="metric__value">{value}</p>
      {note && <div className="metric__note">{note}</div>}
      {footer && (
        <dl className="metric__footer">
          {footer.map(([term, detail]) => (
            <div key={term}>
              <dt>{term}</dt>
              <dd>{detail}</dd>
            </div>
          ))}
        </dl>
      )}
    </article>
  );
}
