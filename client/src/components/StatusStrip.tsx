import { Icon } from './Icon';

interface StatusStripProps {
  todayLabel: string;
}

export function StatusStrip({ todayLabel }: StatusStripProps) {
  return (
    <div className="status-strip">
      <div className="wrap status-strip__inner">
        <span className="status-strip__item status-strip__item--live">
          <Icon name="lock" size={14} />
          Veriler bu bilgisayarda saklanıyor
        </span>
        <span className="status-strip__item status-strip__item--muted">Son yedek: bugün 09:00</span>
        <span className="status-strip__item status-strip__date">{todayLabel}</span>
      </div>
    </div>
  );
}
