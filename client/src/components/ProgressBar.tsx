import type { BudgetState } from '../lib/selectors';

interface ProgressBarProps {
  value: number;
  state?: BudgetState | 'goal';
  label: string;
}

export function ProgressBar({ value, state = 'normal', label }: ProgressBarProps) {
  return (
    <div
      className={`progress progress--${state}`}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.min(value, 100)}
      aria-label={label}
    >
      <span className="progress__fill" style={{ width: `${Math.min(value, 100)}%` }} />
    </div>
  );
}
