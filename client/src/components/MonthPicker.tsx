import { monthLabel, shiftMonth, type MonthKey } from '../lib/dates';
import { Icon } from './Icon';

interface MonthPickerProps {
  month: MonthKey;
  max: MonthKey;
  min: MonthKey;
  onChange: (month: MonthKey) => void;
}

export function MonthPicker({ month, max, min, onChange }: MonthPickerProps) {
  return (
    <div className="month-picker" role="group" aria-label="Ay seçimi">
      <button
        type="button"
        className="month-picker__step"
        onClick={() => onChange(shiftMonth(month, -1))}
        disabled={month <= min}
        aria-label="Önceki ay"
      >
        <Icon name="chevron_left" size={18} />
      </button>
      <span className="month-picker__label">
        <Icon name="calendar_today" size={16} />
        {monthLabel(month)}
      </span>
      <button
        type="button"
        className="month-picker__step"
        onClick={() => onChange(shiftMonth(month, 1))}
        disabled={month >= max}
        aria-label="Sonraki ay"
      >
        <Icon name="chevron_right" size={18} />
      </button>
    </div>
  );
}
