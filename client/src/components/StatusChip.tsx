import type { ReactNode } from 'react';

export type ChipTone = 'positive' | 'warning' | 'danger' | 'neutral' | 'info';

interface StatusChipProps {
  tone: ChipTone;
  children: ReactNode;
  dot?: boolean;
}

export function StatusChip({ tone, children, dot = false }: StatusChipProps) {
  return (
    <span className={`chip chip--${tone}`}>
      {dot && <span className="chip__dot" aria-hidden="true" />}
      {children}
    </span>
  );
}
