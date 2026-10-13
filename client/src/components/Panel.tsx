import type { ReactNode } from 'react';

interface PanelProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export function Panel({ title, description, actions, children, footer, className = '' }: PanelProps) {
  return (
    <section className={`panel ${className}`}>
      <header className="panel__head">
        <div>
          <h2 className="panel__title">{title}</h2>
          {description && <p className="panel__desc">{description}</p>}
        </div>
        {actions && <div className="panel__actions">{actions}</div>}
      </header>
      <div className="panel__body">{children}</div>
      {footer && <footer className="panel__foot">{footer}</footer>}
    </section>
  );
}
